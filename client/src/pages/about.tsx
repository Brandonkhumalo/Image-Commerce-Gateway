import { Target, Eye, Award, Users, Lightbulb, Handshake, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import logoPath from "@assets/dmac_logo_1770835060703.jpeg";

const values = [
  { icon: Award, title: "Excellence", desc: "We deliver the highest quality hospitality services that meet global standards.", image: "/images/value-excellence.png" },
  { icon: Lightbulb, title: "Innovation", desc: "Continuously evolving our offerings to create unique, memorable experiences.", image: "/images/value-innovation.png" },
  { icon: Handshake, title: "Integrity", desc: "Building trust through honest, transparent business practices.", image: "/images/value-integrity.png" },
  { icon: Users, title: "Teamwork", desc: "Collaborative effort to ensure every event exceeds expectations.", image: "/images/value-teamwork.png" },
];

const csrProjects = [
  {
    title: "Igniting the Future Through Education",
    desc: "One of DMAC's core CSR commitments is in children's education. We helped source primary and secondary school textbooks for Mutimusakwa School in Mhondoro, resulting in remarkable improvement in school results."
  },
  {
    title: "A Commitment to Public Health",
    desc: "During the peak of the Covid health crisis, DMAC in conjunction with the Zimbabwe National Army mobilised resources to ensure community safety through free vaccinations, providing essential COVID-19 testing and health education."
  },
  {
    title: "Honouring Our Heroes",
    desc: "Between 2019 and 2021, DMAC spearheaded the exhumation and reburial of 120 bodies of ex-freedom fighters found in a disused shaft in the Odzi area of Mutare. The entire exercise, costing US$350,000, was fully funded by DMAC Zimbabwe."
  },
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
          <p className="text-gray-300 max-w-xl text-lg">A premier hospitality and events centre offering sustainable, world-class services in the heart of Zimbabwe.</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img src={logoPath} alt="DMAC" className="h-20 w-auto rounded-md" />
                <div>
                  <h2 className="text-2xl font-bold">DMAC Zimbabwe Pvt Ltd</h2>
                  <p className="text-muted-foreground">40 James Martin Drive, Lochinvar, Harare</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                DMAC Zimbabwe is a subsidiary of DMAC Dubai focusing mainly in the hospitality and mining sectors of Zimbabwe. In Dubai, DMAC placed itself as a bridge for the movement of capital and technology from the developed world into Africa and the reverse movement of finished products from Africa to the global markets.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                DMAC Lifestyle Centre is the hospitality flagship of DMAC Zimbabwe Private Limited with its main branch at number 40 James Martin Drive, Lochinvar, Harare. In Harare, DMAC has 7 beautiful function halls of different capacities ranging from 50 people to 1000 people seated on tables.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                DMAC is currently finishing its Mhondoro Conference Centre. In Malaysia, DMAC has also started putting a big hospitality centre covering accommodation, restaurants and events. Our setting up in global destinations like Malaysia, Dubai and Rwanda shall also help local Zimbabwean employees have global experience through our interchange program.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-md text-center">
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">7</p>
                <p className="text-sm text-muted-foreground mt-1">Function Halls</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-md text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">1000+</p>
                <p className="text-sm text-muted-foreground mt-1">Guest Capacity</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-md text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">3</p>
                <p className="text-sm text-muted-foreground mt-1">Global Locations</p>
              </div>
              <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-md text-center">
                <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">2000</p>
                <p className="text-sm text-muted-foreground mt-1">Cinema Setup</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 dark:text-amber-400 font-medium text-sm uppercase tracking-wide">Strategic Foundations</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">Vision & Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="relative rounded-md overflow-hidden group min-h-[280px]">
              <img src="/images/value-vision.png" alt="Our Vision" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/25" />
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-md bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <Eye className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Our Vision</h3>
                </div>
                <p className="text-gray-200 leading-relaxed italic text-lg">
                  "To become a leader in offering sustainable unique total hospitality service to our clients."
                </p>
              </div>
            </div>
            <div className="relative rounded-md overflow-hidden group min-h-[280px]">
              <img src="/images/value-sustainability.png" alt="Sustainability" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/25" />
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-md bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Sustainability Statement</h3>
                </div>
                <p className="text-gray-200 leading-relaxed">
                  Sustainability is the foundation of all DMAC's planning and corporate actions. We believe strongly that our business has an inseparable symbiotic relationship with our environment and our community. Doing business with us is helping our communities and our environment.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="relative rounded-md overflow-hidden group h-64">
                <img src={v.image} alt={v.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
                <div className="relative z-10 h-full flex flex-col items-center justify-end p-6 text-center">
                  <div className="w-11 h-11 mb-3 rounded-md bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <v.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-base text-white mb-1.5" data-testid={`text-value-${v.title.toLowerCase()}`}>{v.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 dark:text-amber-400 font-medium text-sm uppercase tracking-wide">CEO Message</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">From Our Leadership</h2>
          </div>

          <Card className="p-8 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-20 h-20 rounded-md bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
                <Users className="w-10 h-10 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Vimbai Chakanetsa</h3>
                <p className="text-sm text-muted-foreground mb-4">Chief Executive Officer</p>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  "DMAC Zimbabwe Private Limited is the embodiment of sustainable business practice in Zimbabwe. Working with ZNA nurses, the organisation played a key role during Covid pandemic offering free vaccination to all southern suburbs and industries in Harare."
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  "Our actions are guided by our philosophy of 'living today for tomorrow'. Tourism is one sector that can be used as an agent for economic development and transformation because of its linkages to many sectors. As DMAC we shall endeavour to tap the vast untapped tourism potential in a sustainable way, minimising negative social, cultural and environmental impacts."
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 dark:text-amber-400 font-medium text-sm uppercase tracking-wide">Giving Back</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">Major CSR Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our commitment to our communities and our environment drives everything we do.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {csrProjects.map((project) => (
              <Card key={project.title} className="p-6">
                <div className="w-12 h-12 mb-4 rounded-md bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-base mb-3" data-testid={`text-csr-${project.title.toLowerCase().replace(/\s/g, "-").slice(0, 20)}`}>{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-amber-600 dark:text-amber-400 font-medium text-sm uppercase tracking-wide">Find Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">Our Location</h2>
            <p className="text-muted-foreground">Visit us at 40 James Martin Drive, Lochinvar, Harare</p>
          </div>

          <Card className="overflow-visible">
            <div className="overflow-hidden rounded-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.5!2d31.0!3d-17.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a4e706b17161%3A0x2968e0e3f4084c07!2sLochinvar%2C%20Harare%2C%20Zimbabwe!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DMAC Lifestyle Centre - 40 James Martin Drive, Lochinvar, Harare"
                data-testid="map-location"
                className="rounded-md"
              />
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <Card className="p-5 text-center">
              <h4 className="font-semibold mb-1">Address</h4>
              <p className="text-sm text-muted-foreground">40 James Martin Drive, Lochinvar, Harare</p>
            </Card>
            <Card className="p-5 text-center">
              <h4 className="font-semibold mb-1">Phone</h4>
              <p className="text-sm text-muted-foreground">+263 77 693 7172 / +263 77 859 8381</p>
            </Card>
            <Card className="p-5 text-center">
              <h4 className="font-semibold mb-1">Email</h4>
              <p className="text-sm text-muted-foreground">dmaczimbabwe@gmail.com</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
