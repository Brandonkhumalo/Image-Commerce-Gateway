import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Star, Users, Building2, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Service, Testimonial } from "@/types";

export default function Home() {
  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: testimonials, isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const featuredServices = services?.filter((s) => s.featured)?.slice(0, 4) || [];

  return (
    <div>
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.png"
            alt="DMAC Lifestyle Centre"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-medium text-sm tracking-wide uppercase">Welcome to DMAC</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Your Premier
              <span className="block text-amber-400">Hospitality Venue</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-lg leading-relaxed">
              World-class corporate functions, conferences, weddings, and events at Harare's leading lifestyle centre. 7 function halls seating up to 1000 guests.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/services">
                <Button size="lg" className="bg-amber-500 border-amber-600 text-black font-semibold" data-testid="button-explore-services">
                  Explore Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/packages">
                <Button size="lg" variant="outline" className="text-white border-white/30 backdrop-blur-sm bg-white/10" data-testid="button-view-packages">
                  View Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: "7 Function Halls", desc: "Capacities from 50 to 1000 guests seated on tables" },
              { icon: Globe, title: "Global Standards", desc: "World-class setup comparable to any venue globally" },
              { icon: Users, title: "Expert Team", desc: "Experienced event professionals at your service" },
              { icon: Award, title: "Trusted Excellence", desc: "Zimbabwe's leading corporate event destination" },
            ].map((item) => (
              <Card key={item.title} className="p-6 text-center hover-elevate">
                <div className="w-12 h-12 mx-auto mb-4 rounded-md bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-semibold text-base mb-2" data-testid={`text-feature-${item.title.toLowerCase().replace(/\s/g, "-")}`}>{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 dark:text-amber-400 font-medium text-sm uppercase tracking-wide">What We Offer</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">Our Featured Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From corporate conferences to dream weddings, DMAC Lifestyle Centre delivers unforgettable events with world-class hospitality.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="overflow-visible">
                    <Skeleton className="h-52 w-full rounded-t-md rounded-b-none" />
                    <div className="p-5">
                      <Skeleton className="h-5 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </Card>
                ))
              : featuredServices.map((service) => (
                  <Card key={service.id} className="overflow-visible hover-elevate group" data-testid={`card-service-${service.id}`}>
                    <div className="overflow-hidden rounded-t-md">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{service.shortDescription}</p>
                      <Link href="/services">
                        <Button variant="outline" size="sm" data-testid={`button-learn-more-${service.id}`}>
                          Learn More <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services">
              <Button data-testid="button-view-all-services">
                View All Services <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-600 dark:text-amber-400 font-medium text-sm uppercase tracking-wide">About Us</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-6">Sustainable Hospitality Excellence</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                DMAC Zimbabwe is a subsidiary of DMAC Dubai, focusing mainly in the hospitality and mining sectors of Zimbabwe. DMAC Lifestyle Centre is the hospitality flagship with its main branch at 40 James Martin Drive, Lochinvar, Harare.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Sustainability is the foundation of all our planning and corporate actions. We believe strongly that our business has an inseparable symbiotic relationship with our environment and our community. Doing business with us is helping our communities and our environment.
              </p>
              <Link href="/about">
                <Button data-testid="button-learn-about-us">
                  Learn More About Us <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="/images/about-building.png"
                alt="DMAC Lifestyle Centre"
                className="rounded-md w-full object-cover h-80 lg:h-96"
              />
              <div className="absolute -bottom-4 -left-4 bg-amber-500 text-black p-5 rounded-md">
                <p className="text-3xl font-bold">7</p>
                <p className="text-sm font-medium">Function Halls</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 dark:text-amber-400 font-medium text-sm uppercase tracking-wide">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="p-6">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2" />
                  </Card>
                ))
              : testimonials?.slice(0, 3).map((t) => (
                  <Card key={t.id} className="p-6" data-testid={`card-testimonial-${t.id}`}>
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">"{t.content}"</p>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      {t.role && <p className="text-xs text-muted-foreground">{t.role}</p>}
                    </div>
                  </Card>
                ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/service-corporate.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Host Your Next Event?</h2>
          <p className="text-gray-300 mb-8 text-lg">From corporate conferences to dream weddings, let DMAC Lifestyle Centre make your event unforgettable.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/packages">
              <Button size="lg" className="bg-amber-500 border-amber-600 text-black font-semibold" data-testid="button-cta-packages">
                View Packages
              </Button>
            </Link>
            <a
              href="https://wa.me/263776937172?text=Hello%20DMAC!%20I%20would%20like%20to%20enquire%20about%20hosting%20an%20event."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="text-white border-white/30 backdrop-blur-sm bg-white/10" data-testid="button-cta-whatsapp">
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
