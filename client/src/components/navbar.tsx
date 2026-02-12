import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/dmac_logo_1770835060703.jpeg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About Us" },
  { href: "/packages", label: "Packages" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer" data-testid="link-home-logo">
              <img src={logoPath} alt="DMAC Lifestyle Centre" className="h-12 sm:h-14 w-auto rounded-md" />
              <div className="hidden sm:block">
                <span className="font-bold text-lg leading-tight block text-foreground">DMAC</span>
                <span className="text-xs text-muted-foreground leading-tight block">Lifestyle Centre</span>
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={location === link.href ? "default" : "ghost"}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Link href="/admin">
              <Button
                variant={location === "/admin" ? "default" : "outline"}
                size="sm"
                data-testid="link-nav-admin"
              >
                <Shield className="w-4 h-4 mr-1" />
                Admin
              </Button>
            </Link>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={location === link.href ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Link href="/admin">
              <Button
                variant={location === "/admin" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setMobileOpen(false)}
                data-testid="link-mobile-admin"
              >
                <Shield className="w-4 h-4 mr-1" />
                Admin
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
