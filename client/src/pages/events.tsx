import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Calendar, Clock, MapPin, Users, DollarSign, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Event } from "@/types";

function EventImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  if (!images.length) {
    return (
      <div className="h-56 sm:h-64 bg-muted flex items-center justify-center">
        <Calendar className="w-12 h-12 text-muted-foreground/40" />
      </div>
    );
  }

  return (
    <div className="relative h-56 sm:h-64 overflow-hidden">
      <img
        src={images[current]}
        alt={`${title} - Image ${current + 1}`}
        className="w-full h-full object-cover"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + images.length) % images.length); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            data-testid={`button-prev-image-${title}`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % images.length); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            data-testid={`button-next-image-${title}`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
}

function formatTime(time: string) {
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

export default function Events() {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const categories = Array.from(new Set(events?.map((e) => e.category) || []));
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? events : events?.filter((e) => e.category === filter);

  return (
    <div>
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/service-social.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-amber-400 font-medium text-sm uppercase tracking-wide">What's Happening</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">Upcoming Events</h1>
          <p className="text-gray-300 max-w-xl text-lg">Discover exciting events at DMAC Lifestyle Centre. From corporate galas to social celebrations, there is always something happening.</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.length > 0 && (
            <div className="flex items-center gap-2 mb-10 flex-wrap">
              <Button
                variant={filter === "All" ? "default" : "outline"}
                onClick={() => setFilter("All")}
                data-testid="button-filter-all"
              >
                All Events
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={filter === cat ? "default" : "outline"}
                  onClick={() => setFilter(cat)}
                  data-testid={`button-filter-${cat.toLowerCase()}`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-56 w-full" />
                  <div className="p-5">
                    <Skeleton className="h-5 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filtered && filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event) => (
                <Card key={event.id} className="overflow-hidden hover-elevate group" data-testid={`card-event-${event.id}`}>
                  <EventImageCarousel images={event.images} title={event.title} />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                      <h3 className="font-semibold text-lg" data-testid={`text-event-title-${event.id}`}>{event.title}</h3>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        <Tag className="w-3 h-3 mr-1" />
                        {event.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">{event.description}</p>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                        <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-4 flex-wrap">
                        {event.ticketPrice > 0 && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 shrink-0 text-green-600 dark:text-green-400" />
                            <span className="font-semibold text-foreground">${event.ticketPrice.toLocaleString()}</span>
                          </div>
                        )}
                        {event.ticketPrice === 0 && (
                          <Badge variant="secondary" className="text-xs">Free Entry</Badge>
                        )}
                        {event.capacity > 0 && (
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 shrink-0" />
                            <span>{event.capacity} guests</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Upcoming Events</h3>
              <p className="text-muted-foreground max-w-md mx-auto">Stay tuned for exciting events at DMAC Lifestyle Centre. Contact us via WhatsApp to enquire about upcoming activities.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
