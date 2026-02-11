import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Leaf, Heart, Star, Users, Sparkles, Shield } from "lucide-react";
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

  const featuredServices = services?.filter((s) => s.featured)?.slice(0, 3) || [];

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
              <Leaf className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium text-sm tracking-wide uppercase">Welcome to DMAC</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Transform Your
              <span className="block text-amber-400">Lifestyle Today</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-lg leading-relaxed">
              Discover holistic wellness, premium fitness programs, and personalised lifestyle coaching at Harare's leading wellness centre.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/services">
                <Button size="lg" className="bg-amber-500 border-amber-600 text-black font-semibold" data-testid="button-explore-services">
                  Explore Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" variant="outline" className="text-white border-white/30 backdrop-blur-sm bg-white/10" data-testid="button-shop-now">
                  Shop Products
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
              { icon: Heart, title: "Holistic Health", desc: "Complete mind, body, and spirit wellness programs" },
              { icon: Users, title: "Expert Team", desc: "Certified trainers and wellness professionals" },
              { icon: Sparkles, title: "Premium Quality", desc: "Top-tier facilities and organic products" },
              { icon: Shield, title: "Trusted Results", desc: "Proven track record of transforming lives" },
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
            <p className="text-muted-foreground max-w-2xl mx-auto">Experience world-class wellness services designed to rejuvenate your body, sharpen your mind, and nourish your soul.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicesLoading
              ? Array.from({ length: 3 }).map((_, i) => (
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
                      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">${service.price}</span>
                      </div>
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
              <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-6">Your Journey to Wellness Starts Here</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                At DMAC Lifestyle Centre, we believe in a holistic approach to health and well-being. Our state-of-the-art facility in Harare offers a comprehensive range of wellness services, from personal fitness training to spa treatments and nutritional guidance.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our team of certified professionals is dedicated to helping you achieve your health goals through personalised programs designed around your unique needs.
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
                alt="DMAC Centre"
                className="rounded-md w-full object-cover h-80 lg:h-96"
              />
              <div className="absolute -bottom-4 -left-4 bg-amber-500 text-black p-5 rounded-md">
                <p className="text-3xl font-bold">5+</p>
                <p className="text-sm font-medium">Years of Excellence</p>
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
          <img src="/images/service-group.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Start Your Transformation?</h2>
          <p className="text-gray-300 mb-8 text-lg">Join hundreds of satisfied clients who have transformed their lives with DMAC Lifestyle Centre.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/services">
              <Button size="lg" className="bg-amber-500 border-amber-600 text-black font-semibold" data-testid="button-cta-services">
                Get Started Today
              </Button>
            </Link>
            <Link href="/shop">
              <Button size="lg" variant="outline" className="text-white border-white/30 backdrop-blur-sm bg-white/10" data-testid="button-cta-shop">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
