# DMAC Lifestyle Centre Website

## Overview
A 4-page website for DMAC Lifestyle Centre, a holistic wellness and fitness centre based in Harare, Zimbabwe. Features Paynow Zimbabwe payment gateway integration for the shop.

## Architecture
- **Frontend**: React + TypeScript + Vite + TailwindCSS + shadcn/ui
- **Backend**: Python Flask with SQLite (in `backend/` folder)
- **Dev Server**: Express.js proxies API requests to Flask during development
- **Payment**: Paynow Zimbabwe payment gateway (Python paynow package)
- **Routing**: wouter (frontend), Flask (backend API)

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
- `PAYNOW_INTEGRATION_ID` - Paynow merchant Integration ID (secret)
- `PAYNOW_INTEGRATION_KEY` - Paynow merchant Integration Key (secret)

## Project Structure

### Backend (Python Flask)
- `backend/app.py` - Flask application with API routes, database models, seed data, Paynow integration
- `backend/requirements.txt` - Python dependencies (flask, flask-cors, paynow)
- `backend/dmac.db` - SQLite database file (auto-created on first run)

### Frontend (React + TypeScript)
- `client/src/pages/` - 4 main pages (home, services, about, shop)
- `client/src/components/` - Shared components (navbar, footer, whatsapp-button)
- `client/src/types.ts` - TypeScript type definitions for API data
- `client/public/images/` - Product and service images

### Dev Server (Express proxy)
- `server/routes.ts` - Starts Flask subprocess and proxies /api/* requests to Flask on port 5001
- `server/index.ts` - Express entry point, Vite dev middleware
- `server/vite.ts` - Vite dev server setup (DO NOT EDIT)
- `server/static.ts` - Production static file serving

### Database Tables (SQLite)
- `services` - Fitness, wellness, nutrition, coaching services
- `products` - Shop products (oils, protein, yoga mat, tea, skincare, smoothie mix)
- `orders` - Customer orders with Paynow payment status
- `order_items` - Individual items in each order
- `testimonials` - Client testimonials with ratings

## Deployment
- Frontend and backend can be deployed separately
- Backend: Run `python3 backend/app.py` (serves API and can serve built frontend)
- Frontend: Build with `npm run build`, output in `client/dist/`

## User Preferences
- Company: DMAC Lifestyle Centre, Harare, Zimbabwe
- Brand colors: Navy blue, gold/amber, green, red (from logo)
- Font: Poppins
- Contact: WhatsApp (+263776937172, +263778598381)
