import { Link } from "wouter";
import { MapPin, Phone, Mail, Shield } from "lucide-react";
import { SiWhatsapp, SiFacebook, SiInstagram } from "react-icons/si";
import logoPath from "@assets/dmac_logo_1770835060703.jpeg";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoPath} alt="DMAC" className="h-12 w-auto rounded-md" />
              <div>
                <span className="font-bold text-lg block">DMAC</span>
                <span className="text-xs opacity-80 block">Lifestyle Centre</span>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Your premier destination for world-class corporate functions, conferences, weddings, and events in Harare, Zimbabwe.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-base mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Home</Link>
              <Link href="/services" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Services</Link>
              <Link href="/about" className="text-sm opacity-80 hover:opacity-100 transition-opacity">About Us</Link>
              <Link href="/packages" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Packages</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-base mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 opacity-80" />
                <div className="text-sm opacity-80">
                  <p>+263 77 693 7172</p>
                  <p>+263 77 859 8381</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 opacity-80" />
                <p className="text-sm opacity-80">40 James Martin Drive, Lochinvar, Harare</p>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 opacity-80" />
                <p className="text-sm opacity-80">info@dmaclifestyle.com</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-base mb-4">Follow Us</h4>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/DMACLifestyleCentre/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" data-testid="link-facebook" aria-label="Facebook">
                <SiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" data-testid="link-instagram" aria-label="Instagram">
                <SiInstagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/263776937172" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" data-testid="link-whatsapp" aria-label="WhatsApp">
                <SiWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 mt-10 pt-6 flex flex-col items-center gap-2">
          <p className="text-xs opacity-60">&copy; {new Date().getFullYear()} DMAC Lifestyle Centre. All rights reserved.</p>
          <p className="text-xs opacity-50">Designed and created by <a href="https://tishanyq.co.zw" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80 transition-opacity">Tishanyq Digital</a></p>
          <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs opacity-40 hover:opacity-60 transition-opacity mt-1" data-testid="link-admin">
            <Shield className="w-3 h-3" />
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
