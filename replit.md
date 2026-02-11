# DMAC Lifestyle Centre Website

## Overview
A 4-page website for DMAC Lifestyle Centre, a holistic wellness and fitness centre based in Harare, Zimbabwe. Features Paynow Zimbabwe payment gateway integration for the shop.

## Architecture
- **Frontend**: React + TypeScript + Vite + TailwindCSS + shadcn/ui
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Payment**: Paynow Zimbabwe payment gateway (npm: paynow)
- **Routing**: wouter (frontend), Express (backend API)

## Pages
1. **Home** (`/`) - Hero section, featured services, about preview, testimonials, CTA
2. **Services** (`/services`) - All services by category with pricing and details
3. **About Us** (`/about`) - Company story, mission/vision, team, Google Maps location
4. **Shop** (`/shop`) - Products with cart, Paynow checkout

## Key Features
- WhatsApp floating button (bottom-right) with two contact numbers: +263776937172 and +263778598381
- Paynow Zimbabwe payment gateway for product checkout
- Google Maps embedded on About page
- Responsive design with dark/light mode support
- SEO meta tags

## Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection string (auto-configured)
- `PAYNOW_INTEGRATION_ID` - Paynow merchant Integration ID (secret)
- `PAYNOW_INTEGRATION_KEY` - Paynow merchant Integration Key (secret)

## Project Structure
- `client/src/pages/` - 4 main pages (home, services, about, shop)
- `client/src/components/` - Shared components (navbar, footer, whatsapp-button)
- `server/routes.ts` - API endpoints
- `server/storage.ts` - Database storage interface
- `server/seed.ts` - Seed data for services, products, testimonials
- `shared/schema.ts` - Database schema and types

## User Preferences
- Company: DMAC Lifestyle Centre, Harare, Zimbabwe
- Brand colors: Navy blue, gold/amber, green, red (from logo)
- Font: Poppins
- Contact: WhatsApp (+263776937172, +263778598381)
