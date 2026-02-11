import { Heart, Target, Eye, Award, Users, Leaf } from "lucide-react";
import { Card } from "@/components/ui/card";
import logoPath from "@assets/dmac_logo_1770835060703.jpeg";

const team = [
  { name: "Dr. David Makoni", role: "Founder & Wellness Director", image: "/images/service-coaching.png" },
  { name: "Grace Chikwanha", role: "Head Fitness Trainer", image: "/images/service-fitness.png" },
  { name: "Tendai Moyo", role: "Nutrition Specialist", image: "/images/service-nutrition.png" },
  { name: "Ruth Ncube", role: "Spa & Relaxation Lead", image: "/images/service-spa.png" },
];

const values = [
  { icon: Heart, title: "Compassion", desc: "We genuinely care about every client's well-being and personal journey." },
  { icon: Target, title: "Excellence", desc: "Committed to delivering the highest quality services and results." },
  { icon: Leaf, title: "Holistic Approach", desc: "Addressing mind, body, and spirit for complete wellness." },
  { icon: Award, title: "Integrity", desc: "Building trust through honest, transparent practices." },
];

export default function About() {
  return (
    <div>
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/about-building.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-amber-400 font-medium text-sm uppercase tracking-wide">Our Story</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">About DMAC</h1>
          <p className="text-gray-300 max-w-xl text-lg">A premier lifestyle centre dedicated to transforming lives through holistic wellness in the heart of Zimbabwe.</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img src={logoPath} alt="DMAC" className="h-20 w-auto rounded-md" />
                <div>
                  <h2 className="text-2xl font-bold">DMAC Lifestyle Centre</h2>
                  <p className="text-muted-foreground">Harare, Zimbabwe</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Founded with a vision to provide Zimbabweans with world-class wellness services, DMAC Lifestyle Centre has grown to become one of Harare's most trusted destinations for health, fitness, and personal transformation.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Our comprehensive approach combines modern fitness training, traditional wellness practices, expert nutritional guidance, and rejuvenating spa treatments to help our clients achieve optimal health and balance.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every day, our dedicated team of certified professionals works tirelessly to ensure that each client receives personalised attention and achieves measurable results on their wellness journey.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-md text-center">
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">500+</p>
                <p className="text-sm text-muted-foreground mt-1">Happy Clients</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-md text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">5+</p>
                <p className="text-sm text-muted-foreground mt-1">Years Experience</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-md text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">15+</p>
                <p className="text-sm text-muted-foreground mt-1">Expert Staff</p>
              </div>
              <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-md text-center">
                <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">20+</p>
                <p className="text-sm text-muted-foreground mt-1">Services Offered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 dark:text-amber-400 font-medium text-sm uppercase tracking-wide">What Drives Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">Our Mission & Vision</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-md bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-bold">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To empower individuals to achieve their health and wellness goals through expert guidance, state-of-the-art facilities, and a supportive community. We strive to make holistic wellness accessible to everyone in Zimbabwe.
              </p>
            </Card>
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-md bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading lifestyle and wellness centre in Southern Africa, recognised for our innovative approach to holistic health, exceptional service quality, and positive impact on communities.
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <Card key={v.title} className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-md bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                  <v.icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-semibold text-base mb-2" data-testid={`text-value-${v.title.toLowerCase()}`}>{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 dark:text-amber-400 font-medium text-sm uppercase tracking-wide">Our People</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our team of certified professionals is passionate about helping you achieve your wellness goals.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="overflow-visible group hover-elevate" data-testid={`card-team-${member.name.toLowerCase().replace(/\s/g, "-")}`}>
                <div className="overflow-hidden rounded-t-md">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-amber-600 dark:text-amber-400 font-medium text-sm uppercase tracking-wide">Find Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">Our Location</h2>
            <p className="text-muted-foreground">Visit us at our centre in Harare, Zimbabwe</p>
          </div>

          <Card className="overflow-visible">
            <div className="overflow-hidden rounded-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04302284025!2d30.95!3d-17.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a4e706b17161%3A0x2968e0e3f4084c07!2sHarare%2C%20Zimbabwe!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DMAC Lifestyle Centre Location"
                data-testid="map-location"
                className="rounded-md"
              />
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <Card className="p-5 text-center">
              <h4 className="font-semibold mb-1">Address</h4>
              <p className="text-sm text-muted-foreground">Harare, Zimbabwe</p>
            </Card>
            <Card className="p-5 text-center">
              <h4 className="font-semibold mb-1">Phone</h4>
              <p className="text-sm text-muted-foreground">+263 77 693 7172 / +263 77 859 8381</p>
            </Card>
            <Card className="p-5 text-center">
              <h4 className="font-semibold mb-1">Hours</h4>
              <p className="text-sm text-muted-foreground">Mon-Fri: 6AM-9PM | Sat-Sun: 7AM-6PM</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
