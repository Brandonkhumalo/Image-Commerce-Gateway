import type { Express, Request, Response } from "express";
import { type Server } from "http";
import { spawn } from "child_process";
import http from "http";

let flaskProcess: ReturnType<typeof spawn> | null = null;

function startFlask(): Promise<void> {
  return new Promise((resolve, reject) => {
    const flaskPort = "5001";
    const env = { ...process.env, FLASK_PORT: flaskPort };

    flaskProcess = spawn("python3", ["backend/app.py"], {
      env,
      stdio: ["pipe", "pipe", "pipe"],
    });

    flaskProcess.stdout?.on("data", (data: Buffer) => {
      const msg = data.toString().trim();
      if (msg) console.log(`[flask] ${msg}`);
    });

    flaskProcess.stderr?.on("data", (data: Buffer) => {
      const msg = data.toString().trim();
      if (msg) console.log(`[flask] ${msg}`);
    });

    flaskProcess.on("error", (err) => {
      console.error("[flask] Failed to start:", err.message);
      reject(err);
    });

    flaskProcess.on("exit", (code) => {
      console.log(`[flask] Process exited with code ${code}`);
    });

    const checkFlask = (attempts: number) => {
      if (attempts <= 0) {
        reject(new Error("Flask failed to start"));
        return;
      }
      const req = http.get(`http://127.0.0.1:${flaskPort}/api/services`, (res) => {
        res.resume();
        resolve();
      });
      req.on("error", () => {
        setTimeout(() => checkFlask(attempts - 1), 500);
      });
      req.end();
    };

    setTimeout(() => checkFlask(20), 1000);
  });
}

function proxyToFlask(req: Request, res: Response) {
  const options: http.RequestOptions = {
    hostname: "127.0.0.1",
    port: 5001,
    path: req.originalUrl,
    method: req.method,
    headers: {
      ...req.headers,
      host: "127.0.0.1:5001",
    },
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on("error", (err) => {
    console.error("[proxy] Error:", err.message);
    if (!res.headersSent) {
      res.status(502).json({ error: "Flask backend unavailable" });
    }
  });

  if (req.body && Object.keys(req.body).length > 0) {
    const bodyStr = JSON.stringify(req.body);
    proxyReq.setHeader("Content-Type", "application/json");
    proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyStr));
    proxyReq.write(bodyStr);
  }

  proxyReq.end();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await startFlask();
  console.log("[flask] Backend ready on port 5001");

  app.get("/api/services", proxyToFlask);
  app.get("/api/services/:id", proxyToFlask);
  app.get("/api/products", proxyToFlask);
  app.get("/api/products/:id", proxyToFlask);
  app.get("/api/testimonials", proxyToFlask);
  app.post("/api/orders/checkout", proxyToFlask);
  app.post("/api/orders/paynow-result", proxyToFlask);
  app.get("/api/orders/:id/status", proxyToFlask);

  return httpServer;
}
