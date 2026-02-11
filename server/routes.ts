import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { seedDatabase } from "./seed";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await seedDatabase();

  app.get("/api/services", async (_req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.get("/api/services/:id", async (req, res) => {
    const service = await storage.getService(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  });

  app.get("/api/products", async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const product = await storage.getProduct(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  app.get("/api/testimonials", async (_req, res) => {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  });

  app.post("/api/orders/checkout", async (req, res) => {
    try {
      const { customerName, customerEmail, customerPhone, items } = req.body;

      if (!customerName || !customerEmail || !customerPhone || !items?.length) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const totalAmount = items.reduce(
        (sum: number, item: any) => sum + Number(item.price) * item.quantity,
        0
      );

      const order = await storage.createOrder({
        customerName,
        customerEmail,
        customerPhone,
        totalAmount: totalAmount.toFixed(2),
      });

      for (const item of items) {
        await storage.createOrderItem({
          orderId: order.id,
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
        });
      }

      try {
        const { Paynow } = require("paynow");

        const integrationId = process.env.PAYNOW_INTEGRATION_ID;
        const integrationKey = process.env.PAYNOW_INTEGRATION_KEY;

        if (!integrationId || !integrationKey) {
          await storage.updateOrder(order.id, { status: "pending_payment" });
          return res.json({
            orderId: order.id,
            error: "Payment gateway not configured. Please contact us via WhatsApp to complete your order.",
          });
        }

        const paynow = new Paynow(integrationId, integrationKey);
        paynow.resultUrl = `${req.protocol}://${req.get("host")}/api/orders/paynow-result`;
        paynow.returnUrl = `${req.protocol}://${req.get("host")}/shop?order=${order.id}`;

        const payment = paynow.createPayment(`Order-${order.id}`, customerEmail);

        for (const item of items) {
          payment.add(item.productName, Number(item.price) * item.quantity);
        }

        const response = await paynow.send(payment);

        if (response.success) {
          await storage.updateOrder(order.id, {
            status: "awaiting_payment",
            pollUrl: response.pollUrl,
            paynowReference: response.pollUrl,
          });

          return res.json({
            orderId: order.id,
            redirectUrl: response.redirectUrl,
            pollUrl: response.pollUrl,
          });
        } else {
          await storage.updateOrder(order.id, { status: "payment_failed" });
          return res.json({
            orderId: order.id,
            error: response.error || "Payment initiation failed. Please try again.",
          });
        }
      } catch (paymentError: any) {
        console.error("Paynow error:", paymentError);
        await storage.updateOrder(order.id, { status: "pending_payment" });
        return res.json({
          orderId: order.id,
          error: "Payment gateway unavailable. Please contact us via WhatsApp to complete your order.",
        });
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      return res.status(500).json({ error: "Failed to process order" });
    }
  });

  app.post("/api/orders/paynow-result", async (req, res) => {
    try {
      const { pollurl, status } = req.body;
      if (pollurl) {
        const allOrders = await storage.getOrders();
        const order = allOrders.find((o) => o.pollUrl === pollurl);
        if (order) {
          const newStatus = status?.toLowerCase() === "paid" ? "paid" : status?.toLowerCase() || "unknown";
          await storage.updateOrder(order.id, { status: newStatus });
        }
      }
      res.sendStatus(200);
    } catch (error) {
      console.error("Paynow result error:", error);
      res.sendStatus(500);
    }
  });

  app.get("/api/orders/:id/status", async (req, res) => {
    const order = await storage.getOrder(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.pollUrl && order.status === "awaiting_payment") {
      try {
        const { Paynow } = require("paynow");
        const paynow = new Paynow(
          process.env.PAYNOW_INTEGRATION_ID || "",
          process.env.PAYNOW_INTEGRATION_KEY || ""
        );
        const status = await paynow.pollTransaction(order.pollUrl);
        if (status.paid()) {
          await storage.updateOrder(order.id, { status: "paid" });
          order.status = "paid";
        }
      } catch (e) {
        console.error("Poll error:", e);
      }
    }

    res.json({ status: order.status });
  });

  return httpServer;
}
