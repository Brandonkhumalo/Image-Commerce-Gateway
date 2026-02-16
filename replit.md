# DMAC Lifestyle Centre Website

## Overview
A 6-page website for DMAC Lifestyle Centre, a hospitality and events company based at 40 James Martin Drive, Lochinvar, Harare, Zimbabwe. DMAC Zimbabwe is a subsidiary of DMAC Dubai. Features Paynow Zimbabwe payment gateway integration for event package bookings, WhatsApp contact with two phone numbers, Google Maps location display, and an admin-managed Events system with image uploads.

## Architecture
- **Frontend**: React + TypeScript + Vite + TailwindCSS + shadcn/ui
- **Backend**: Python Flask with SQLite (in `backend/` folder)
- **Dev Server**: Express.js proxies API requests to Flask during development
- **Payment**: Paynow Zimbabwe payment gateway (Python paynow package)
- **Routing**: wouter (frontend), Flask (backend API)

## Pages
1. **Home** (`/`) - Hero section, featured services, about preview, testimonials, CTA
2. **Services** (`/services`) - All services by category: Corporate, Academic, Social, Hospitality
3. **Events** (`/events`) - Upcoming events with image carousels, category filters, auto-cleanup of past events
4. **About Us** (`/about`) - Company profile (subsidiary of DMAC Dubai), CEO message (Vimbai Chakanetsa), vision/values, CSR projects, Google Maps location
5. **Packages** (`/packages`) - Event packages (Silver/Gold/Platinum wedding, corporate conference, team building, graduation) with cart and Paynow checkout
6. **Admin** (`/admin`) - Password-protected admin panel for event CRUD with image uploads (max 5 per event)

## Key Features
- WhatsApp floating button (bottom-right) with two contact numbers: +263776937172 and +263778598381
- Paynow Zimbabwe payment gateway for event package booking
- Google Maps embedded on About page (Lochinvar, Harare)
- Events management with admin panel (session-based auth, image uploads, auto-delete expired events)
- Responsive design with dark/light mode support
- SEO meta tags

## Admin Panel
- Access via footer "Admin" link or `/admin` URL
- Default credentials: username `dmac`, password `dmac@admin` (configurable via ADMIN_USERNAME and ADMIN_PASSWORD env vars)
- Session-based authentication with server-side tokens (8-hour expiry)
- CRUD operations for events with up to 5 image uploads per event
- Events auto-delete when their end date/time has passed

## Company Information (from PDF)
- **CEO**: Vimbai Chakanetsa
- **Vision**: "To become a leader in offering sustainable unique total hospitality service"
- **Core Values**: Excellence, Innovation, Integrity, Teamwork
- **Services**: Corporate Functions, Conferencing, Academic Functions, Social Functions (weddings), Team Building, Restaurant, Accommodation
- **Venues**: 7 function halls, capacities 50-1000 seated, up to 2000 cinema setup
- **Address**: 40 James Martin Drive, Lochinvar, Harare
- **Email**: info@dmaclifestyle.com
- **Global presence**: Dubai, Malaysia, Rwanda

## Environment Variables Required
- `PAYNOW_INTEGRATION_ID` - Paynow merchant Integration ID (secret)
- `PAYNOW_INTEGRATION_KEY` - Paynow merchant Integration Key (secret)
- `ADMIN_PASSWORD` - Admin panel password (optional, defaults to DMAC@admin2026)
- `SESSION_SECRET` - Server session secret (auto-generated if not set)

## Project Structure

### Backend (Python Flask)
- `backend/app.py` - Flask application with API routes, database models, seed data, Paynow integration, events CRUD, admin auth
- `backend/requirements.txt` - Python dependencies (flask, flask-cors, paynow)
- `backend/dmac.db` - SQLite database file (auto-created on first run)

### Frontend (React + TypeScript)
- `client/src/pages/home.tsx` - Home page with hero, featured services, about preview, testimonials
- `client/src/pages/services.tsx` - Services page by category
- `client/src/pages/events.tsx` - Events page with upcoming events, category filters, image carousels
- `client/src/pages/about.tsx` - About page with company profile, CEO, CSR, map
- `client/src/pages/shop.tsx` - Packages page (event packages with Paynow checkout)
- `client/src/pages/admin.tsx` - Admin panel with login, event CRUD, image uploads
- `client/src/components/` - Shared components (navbar, footer, whatsapp-button)
- `client/src/types.ts` - TypeScript type definitions for API data
- `client/public/images/` - Generated venue and event images
- `client/public/uploads/` - User-uploaded event images

### Dev Server (Express proxy)
- `server/routes.ts` - Starts Flask subprocess and proxies /api/* requests to Flask on port 5001
- `server/index.ts` - Express entry point, Vite dev middleware
- `server/vite.ts` - Vite dev server setup (DO NOT EDIT)
- `server/static.ts` - Production static file serving

### Database Tables (SQLite)
- `services` - Hospitality services (corporate, conferencing, academic, social, team building, restaurant, accommodation)
- `products` - Event packages (Silver/Gold/Platinum wedding, corporate conference, team building, graduation)
- `orders` - Customer bookings with Paynow payment status
- `order_items` - Individual packages in each booking
- `testimonials` - Client testimonials with ratings
- `events` - Upcoming events with title, description, venue, date, times, category, price, capacity, images (JSON array)

## Deployment
- Frontend and backend can be deployed separately
- Backend: Run `python3 backend/app.py` (serves API and can serve built frontend)
- Frontend: Build with `npm run build`, output in `client/dist/`

## User Preferences
- Company: DMAC Lifestyle Centre, Harare, Zimbabwe
- Brand colors: Navy blue, gold/amber, green, red (from logo)
- Font: Poppins
- Contact: WhatsApp (+263776937172, +263778598381)
- Email: dmaczimbabwe@gmail.com
- Footer credit: "Designed and created by Tishanyq Digital" (tishanyq.co.zw)
