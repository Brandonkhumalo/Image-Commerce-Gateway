import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const contacts = [
  { name: "Sales & Enquiries", number: "+263776937172", display: "+263 77 693 7172" },
  { name: "Support & Bookings", number: "+263778598381", display: "+263 77 859 8381" },
];

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  const openWhatsApp = (number: string) => {
    const cleaned = number.replace(/\s/g, "");
    window.open(`https://wa.me/${cleaned.replace("+", "")}`, "_blank");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <Card className="p-4 w-72 animate-in slide-in-from-bottom-2 fade-in duration-200">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <SiWhatsapp className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="font-semibold text-sm">Chat with us</span>
            </div>
            <Button size="icon" variant="ghost" onClick={() => setOpen(false)} data-testid="button-close-whatsapp">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Choose a number to start chatting on WhatsApp</p>
          <div className="flex flex-col gap-2">
            {contacts.map((c) => (
              <button
                key={c.number}
                onClick={() => openWhatsApp(c.number)}
                className="flex items-center gap-3 p-3 rounded-md bg-green-50 dark:bg-green-950/30 hover-elevate active-elevate-2 text-left transition-colors"
                data-testid={`button-whatsapp-${c.number}`}
              >
                <Phone className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.display}</p>
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
        data-testid="button-whatsapp-toggle"
        aria-label="Chat on WhatsApp"
      >
        <SiWhatsapp className="w-7 h-7" />
      </button>
    </div>
  );
}
