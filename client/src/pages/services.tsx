import { useQuery } from "@tanstack/react-query";
import { Clock, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Service } from "@/types";

export default function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const categories = Array.from(new Set(services?.map((s) => s.category) || []));

  return (
    <div>
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/service-corporate.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-amber-400 font-medium text-sm uppercase tracking-wide">Our Offerings</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">Our Services</h1>
          <p className="text-gray-300 max-w-xl text-lg">World-class hospitality services for corporate functions, conferences, weddings, academic events, and more.</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-52 w-full" />
                  <div className="p-5">
                    <Skeleton className="h-5 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            categories.map((category) => (
              <div key={category} className="mb-16 last:mb-0">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-8 bg-amber-500 rounded-full" />
                  <h2 className="text-2xl sm:text-3xl font-bold" data-testid={`text-category-${category}`}>{category}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services
                    ?.filter((s) => s.category === category)
                    .map((service) => (
                      <Card key={service.id} className="overflow-hidden hover-elevate group" data-testid={`card-service-detail-${service.id}`}>
                        <div className="relative overflow-hidden">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {service.featured && (
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-amber-500 text-white border-amber-500 text-xs">Featured</Badge>
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">{service.description}</p>
                          <div className="flex items-center gap-4 flex-wrap">
                            {service.duration && (
                              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4 shrink-0" />
                                <span>{service.duration}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Users className="w-4 h-4 shrink-0" />
                              <span>Contact for pricing</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/service-social.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Plan Your Event With Us</h2>
          <p className="text-gray-300 mb-6">Contact us via WhatsApp to discuss your event requirements. Our experienced team will help you create an unforgettable experience.</p>
          <a
            href="https://wa.me/263776937172?text=Hello%20DMAC!%20I%20would%20like%20to%20enquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-md font-semibold transition-colors" data-testid="button-book-whatsapp">
              Enquire via WhatsApp
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}
