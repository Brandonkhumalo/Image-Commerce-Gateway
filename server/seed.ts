import { storage } from "./storage";
import { db } from "./db";
import { services, products, testimonials } from "@shared/schema";

export async function seedDatabase() {
  const existingServices = await storage.getServices();
  if (existingServices.length > 0) return;

  console.log("Seeding database...");

  await db.insert(services).values([
    {
      name: "Personal Fitness Training",
      description: "One-on-one sessions with our certified personal trainers. Get a customised workout plan designed to help you reach your specific fitness goals, whether it's weight loss, muscle building, or improving overall health.",
      shortDescription: "Customised one-on-one training sessions with certified professionals.",
      price: "45.00",
      duration: "60 min",
      image: "/images/service-fitness.png",
      category: "Fitness",
      featured: true,
    },
    {
      name: "Group Fitness Classes",
      description: "Join our energising group classes including HIIT, Zumba, aerobics, and circuit training. Perfect for those who thrive in a motivating group environment with expert-led routines.",
      shortDescription: "High-energy group workouts led by expert instructors.",
      price: "15.00",
      duration: "45 min",
      image: "/images/service-group.png",
      category: "Fitness",
      featured: false,
    },
    {
      name: "Yoga & Meditation",
      description: "Find inner peace and flexibility with our yoga and meditation sessions. From beginner Hatha yoga to advanced Vinyasa flows, our instructors guide you through mindful practices for mental clarity and physical wellness.",
      shortDescription: "Mindful yoga and meditation for inner peace and flexibility.",
      price: "25.00",
      duration: "60 min",
      image: "/images/service-yoga.png",
      category: "Wellness",
      featured: true,
    },
    {
      name: "Spa & Massage Therapy",
      description: "Relax and rejuvenate with our premium spa treatments. Choose from Swedish massage, deep tissue therapy, hot stone treatments, and aromatherapy sessions designed to melt away stress.",
      shortDescription: "Premium spa treatments and therapeutic massage sessions.",
      price: "65.00",
      duration: "90 min",
      image: "/images/service-spa.png",
      category: "Wellness",
      featured: true,
    },
    {
      name: "Nutritional Counselling",
      description: "Work with our certified nutritionists to develop a personalised eating plan. Whether you want to lose weight, manage a health condition, or simply eat healthier, we'll guide you every step of the way.",
      shortDescription: "Personalised meal plans and nutritional guidance.",
      price: "35.00",
      duration: "45 min",
      image: "/images/service-nutrition.png",
      category: "Nutrition",
      featured: false,
    },
    {
      name: "Lifestyle Coaching",
      description: "Our certified life coaches help you set and achieve meaningful goals. From career transitions to personal development, gain the tools and strategies needed to create the life you envision.",
      shortDescription: "Goal-setting and personal development coaching.",
      price: "55.00",
      duration: "60 min",
      image: "/images/service-coaching.png",
      category: "Coaching",
      featured: false,
    },
  ]);

  await db.insert(products).values([
    {
      name: "Premium Essential Oils Set",
      description: "A curated collection of 6 therapeutic essential oils including lavender, eucalyptus, peppermint, tea tree, lemon, and frankincense. Perfect for aromatherapy and self-care.",
      price: "42.00",
      image: "/images/product-oils.png",
      category: "Wellness",
      inStock: true,
    },
    {
      name: "Organic Protein Blend",
      description: "Plant-based protein powder made from pea, rice, and hemp proteins. 25g protein per serving. Vanilla flavour. No artificial additives.",
      price: "38.00",
      image: "/images/product-protein.png",
      category: "Nutrition",
      inStock: true,
    },
    {
      name: "Premium Yoga Mat",
      description: "Non-slip, eco-friendly yoga mat with alignment markings. Extra thick 6mm cushioning for joint comfort. Comes with carrying strap.",
      price: "55.00",
      image: "/images/product-yogamat.png",
      category: "Fitness",
      inStock: true,
    },
    {
      name: "Organic Herbal Tea Collection",
      description: "A selection of 5 premium herbal teas: chamomile calm, green detox, ginger immunity, rooibos energy, and hibiscus beauty. 20 bags each.",
      price: "28.00",
      image: "/images/product-tea.png",
      category: "Nutrition",
      inStock: true,
    },
    {
      name: "Natural Skincare Set",
      description: "Complete organic skincare routine with cleanser, toner, serum, and moisturiser. Made with natural ingredients. Suitable for all skin types.",
      price: "68.00",
      image: "/images/product-skincare.png",
      category: "Wellness",
      inStock: true,
    },
    {
      name: "Superfood Smoothie Bowl Mix",
      description: "Blend of acai, spirulina, maca, and mixed berries. Just add your favourite milk and toppings for a nutritious breakfast bowl. 15 servings.",
      price: "32.00",
      image: "/images/product-smoothie.png",
      category: "Nutrition",
      inStock: true,
    },
  ]);

  await db.insert(testimonials).values([
    {
      name: "Tatenda Mhizha",
      role: "Fitness Client",
      content: "DMAC has completely transformed my approach to health. The personal training sessions are incredible, and I've lost 15kg in just 6 months. The team truly cares about your progress.",
      rating: 5,
    },
    {
      name: "Rumbidzai Choto",
      role: "Wellness Member",
      content: "The yoga and spa services are world-class. I come here every week for my meditation sessions and leave feeling completely refreshed. It's my sanctuary in Harare.",
      rating: 5,
    },
    {
      name: "Farai Dube",
      role: "Nutrition Client",
      content: "The nutritional counselling changed my life. My energy levels are through the roof and I feel healthier than ever. The team creates plans that actually work for real Zimbabwean diets.",
      rating: 5,
    },
  ]);

  console.log("Database seeded successfully!");
}
