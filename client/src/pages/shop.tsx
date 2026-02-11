import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Product } from "@/types";

interface CartItem {
  product: Product;
  quantity: number;
}

export default function Shop() {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentResult, setPaymentResult] = useState<{ success: boolean; redirectUrl?: string; error?: string } | null>(null);
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "", phone: "" });

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const categories = Array.from(new Set(products?.map((p) => p.category) || []));

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast({ title: `${product.name} added to cart` });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalAmount = cart.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/orders/checkout", {
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        items: cart.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.redirectUrl) {
        setPaymentResult({ success: true, redirectUrl: data.redirectUrl });
      } else if (data.error) {
        setPaymentResult({ success: false, error: data.error });
      }
    },
    onError: (error: Error) => {
      setPaymentResult({ success: false, error: error.message });
    },
  });

  const handleCheckout = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    checkoutMutation.mutate();
  };

  return (
    <div>
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/product-oils.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-amber-400 font-medium text-sm uppercase tracking-wide">Premium Products</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">Our Shop</h1>
          <p className="text-gray-300 max-w-xl text-lg">Curated wellness products to support your healthy lifestyle journey. All products are carefully selected for quality.</p>
        </div>
      </section>

      {cartCount > 0 && (
        <div className="sticky top-16 sm:top-20 z-40 bg-amber-50 dark:bg-amber-900/20 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="font-medium text-sm" data-testid="text-cart-count">{cartCount} item{cartCount !== 1 ? "s" : ""} in cart</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">${totalAmount.toFixed(2)}</span>
            </div>
            <Button onClick={() => setCheckoutOpen(true)} data-testid="button-open-checkout">
              <CreditCard className="w-4 h-4 mr-2" />
              Checkout
            </Button>
          </div>
        </div>
      )}

      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-visible">
                  <Skeleton className="h-56 w-full rounded-t-md rounded-b-none" />
                  <div className="p-5">
                    <Skeleton className="h-5 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-9 w-full mt-4" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            categories.map((category) => (
              <div key={category} className="mb-14 last:mb-0">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-8 bg-amber-500 rounded-full" />
                  <h2 className="text-2xl sm:text-3xl font-bold" data-testid={`text-shop-category-${category}`}>{category}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products
                    ?.filter((p) => p.category === category)
                    .map((product) => {
                      const inCart = cart.find((item) => item.product.id === product.id);
                      return (
                        <Card key={product.id} className="overflow-visible group hover-elevate" data-testid={`card-product-${product.id}`}>
                          <div className="overflow-hidden rounded-t-md relative">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {!product.inStock && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Badge variant="destructive">Out of Stock</Badge>
                              </div>
                            )}
                          </div>
                          <div className="p-5">
                            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="text-xl font-bold text-amber-600 dark:text-amber-400" data-testid={`text-price-${product.id}`}>
                                ${product.price}
                              </span>
                              {inCart ? (
                                <div className="flex items-center gap-2">
                                  <Button size="icon" variant="outline" onClick={() => updateQuantity(product.id, -1)} data-testid={`button-decrease-${product.id}`}>
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <span className="font-semibold w-8 text-center" data-testid={`text-quantity-${product.id}`}>{inCart.quantity}</span>
                                  <Button size="icon" variant="outline" onClick={() => updateQuantity(product.id, 1)} data-testid={`button-increase-${product.id}`}>
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  onClick={() => addToCart(product)}
                                  disabled={!product.inStock}
                                  data-testid={`button-add-to-cart-${product.id}`}
                                >
                                  <Plus className="w-4 h-4 mr-1" /> Add to Cart
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {paymentResult ? (paymentResult.success ? "Payment Ready" : "Payment Error") : "Checkout"}
            </DialogTitle>
          </DialogHeader>

          {paymentResult ? (
            <div className="py-6 text-center">
              {paymentResult.success ? (
                <>
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Order Created Successfully</h3>
                  <p className="text-sm text-muted-foreground mb-6">Click below to complete your payment via Paynow.</p>
                  <a href={paymentResult.redirectUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full" data-testid="button-pay-now">
                      <CreditCard className="w-4 h-4 mr-2" /> Pay Now
                    </Button>
                  </a>
                  <Button
                    variant="ghost"
                    className="w-full mt-2"
                    onClick={() => {
                      setPaymentResult(null);
                      setCheckoutOpen(false);
                      setCart([]);
                      setCustomerInfo({ name: "", email: "", phone: "" });
                    }}
                    data-testid="button-close-checkout"
                  >
                    Close
                  </Button>
                </>
              ) : (
                <>
                  <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Payment Error</h3>
                  <p className="text-sm text-muted-foreground mb-6">{paymentResult.error || "Something went wrong. Please try again or contact us via WhatsApp."}</p>
                  <Button onClick={() => setPaymentResult(null)} className="w-full" data-testid="button-try-again">
                    Try Again
                  </Button>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-md object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">${item.product.price} x {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold shrink-0">${(Number(item.product.price) * item.quantity).toFixed(2)}</span>
                    <Button size="icon" variant="ghost" onClick={() => removeFromCart(item.product.id)} data-testid={`button-remove-${item.product.id}`}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 mb-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold text-amber-600 dark:text-amber-400" data-testid="text-checkout-total">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                    data-testid="input-checkout-name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    data-testid="input-checkout-email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="0771234567"
                    data-testid="input-checkout-phone"
                  />
                </div>
              </div>

              <Button
                className="w-full mt-6"
                onClick={handleCheckout}
                disabled={checkoutMutation.isPending}
                data-testid="button-submit-checkout"
              >
                {checkoutMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" /> Pay with Paynow - ${totalAmount.toFixed(2)}
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Secure payment powered by Paynow Zimbabwe
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
