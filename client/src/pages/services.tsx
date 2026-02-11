import { useQuery } from "@tanstack/react-query";
import { Clock, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Service } from "@shared/schema";

export default function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const categories = [...new Set(services?.map((s) => s.category) || [])];

  return (
    <div>
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/service-yoga.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-amber-400 font-medium text-sm uppercase tracking-wide">Our Offerings</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">Our Services</h1>
          <p className="text-gray-300 max-w-xl text-lg">Comprehensive wellness solutions tailored to your unique journey. Discover the perfect programme to transform your lifestyle.</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-visible">
                  <div className="flex flex-col sm:flex-row">
                    <Skeleton className="h-48 sm:h-auto sm:w-48 rounded-t-md sm:rounded-l-md sm:rounded-tr-none shrink-0" />
                    <div className="p-5 flex-1">
                      <Skeleton className="h-5 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-4" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            categories.map((category) => (
              <div key={category} className="mb-14 last:mb-0">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-8 bg-amber-500 rounded-full" />
                  <h2 className="text-2xl sm:text-3xl font-bold" data-testid={`text-category-${category}`}>{category}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services
                    ?.filter((s) => s.category === category)
                    .map((service) => (
                      <Card key={service.id} className="overflow-visible hover-elevate group" data-testid={`card-service-detail-${service.id}`}>
                        <div className="flex flex-col sm:flex-row">
                          <div className="overflow-hidden sm:w-48 shrink-0 rounded-t-md sm:rounded-l-md sm:rounded-tr-none">
                            <img
                              src={service.image}
                              alt={service.name}
                              className="h-48 sm:h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                              <h3 className="font-semibold text-lg">{service.name}</h3>
                              {service.featured && <Badge variant="secondary" className="text-xs">Featured</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">{service.description}</p>
                            <div className="flex items-center gap-4 flex-wrap">
                              <div className="flex items-center gap-1.5 text-sm">
                                <DollarSign className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                <span className="font-semibold">${service.price}</span>
                              </div>
                              {service.duration && (
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  <span>{service.duration}</span>
                                </div>
                              )}
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
          <img src="/images/service-spa.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Book Your Session Today</h2>
          <p className="text-gray-300 mb-6">Contact us via WhatsApp to book any of our services. Our team is ready to help you get started on your wellness journey.</p>
          <a
            href="https://wa.me/263776937172?text=Hello%20DMAC%20Lifestyle%20Centre!%20I%20would%20like%20to%20book%20a%20session."
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-md font-semibold transition-colors" data-testid="button-book-whatsapp">
              Book via WhatsApp
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}
