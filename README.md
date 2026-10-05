# AuraEstates — Premier American Real Estate Portal

A full-stack, enterprise luxury real estate web application engineered from Google Stitch designs, powered by **React.js**, **Express.js**, and **Supabase**.

---

## 🎨 Implemented Stitch Design Screens

All 10 screens and design tokens from Google Stitch have been faithfully transformed into interactive full-stack components:

| Stitch Screen Title | Resolution / Type | Implementation in App |
| :--- | :--- | :--- |
| **Home - AuraEstates** (`ca23390dc5374d51abd39e5a9171127e`) | Desktop (2560 × 9054) | `HomePage.jsx` — Cinematic twilight luxury hero, multi-parameter search, curated portfolio, typology categories, market stats. |
| **Properties - AuraEstates** (`2583ced3060e4af6aaee212bad66fbd5`) | Desktop (2560 × 1671) | `PropertiesPage.jsx` — Dynamic grid view, keyword search, filters for city, price, beds, property type, and sort. |
| **Property Details with Interactive Map** (`c09a32abb3594e818efb106cc8b92413`) | Desktop (2560 × 4868) | `InteractiveMap.jsx` & `PropertyDetailsPage.jsx` — Live clickable parcel marker, coordinates sync, neighborhood bounds. |
| **Property Details - AuraEstates** (`c76acfe59db248ebbdd51a4246cf04d2`) | Desktop (2560 × 4868) | `PropertyDetailsPage.jsx` — Architectural narrative, luxury amenity chips, live mortgage calculator, advisor sidebar. |
| **Home - AuraEstates Mobile** (`17becc99e18045ada7d85eac6ac77d5a`) | Mobile (780 × 3864) | Responsive mobile drawer, touch-optimized hero search, compact layout. |
| **Properties - AuraEstates Mobile** (`27f0a2a0472844699c7fcae5351fe5b1`) | Mobile (780 × 3752) | Responsive grid/map toggle, mobile filters, card spec pills. |
| **Property Details - AuraEstates Mobile** (`a7e711e2949547b4b1f421ed1b84cca8`) | Mobile (780 × 3276) | Single-column luxury specs, responsive mortgage sliders, floating action buttons. |
| **Admin Dashboard - AuraEstates Mobile** (`6f80ad108781446f88457886dc2c29d2`) | Mobile (780 × 2368) | `AdminDashboardPage.jsx` — Active portfolio manager, tour booking leads, and new listing publishing. |
| **AuraEstates Logo** (`3ecad5b331e449ada446f149a70c5641`) | Asset (1024 × 1024) | High-resolution logo mark integrated into header navigation and brand identity. |
| **Design System Tokens** (`assets_e6dff6bdf8d64c2e992b6f0e27733766`) | Design Tokens | `tailwind.config.js` & `index.css` — Primary slate `#0f172a`, emerald accent `#10b981`, Inter typography, and spacing scale. |

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS, Google Material Symbols, Google Fonts Inter
- **Backend**: Express.js REST API, CORS, dotenv
- **Database**: Supabase PostgreSQL (`@supabase/supabase-js`) with built-in instant local database fallback
- **Features**:
  - Live Mortgage Payment Estimator with amortization formula
  - Interactive Neighborhood Pinpoint Map with dynamic coordinates
  - Private Showing & Tour Booking modal with backend lead logging
  - Executive Brokerage Admin Dashboard for publishing and managing properties
  - Full CRUD capabilities for properties and client inquiries

---

## 🚀 Quick Start Guide

### 1. Launch with One Click (Windows)
Double-click `start-app.bat` in the project root directory.

### 2. Launch Manually via Terminal

```bash
# Terminal 1: Start Backend Server
cd backend
npm start
# Server runs on http://localhost:5000

# Terminal 2: Start React Frontend
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

Open your browser to: **[http://localhost:3000](http://localhost:3000)**

---

## 🗄️ Supabase Setup (Optional)

The application includes an instant local store seeded with real Stitch data so it runs immediately out of the box with zero configuration.

To connect your own **Supabase** project:
1. Log into [supabase.com](https://supabase.com) and create a project.
2. Go to **SQL Editor** in your Supabase dashboard and run the script in `supabase/schema.sql`.
3. Copy your **Project URL** and **anon public key** from Project Settings > API.
4. Add them to `backend/.env`:
   ```env
   PORT=5000
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-public-key
   ```
5. Restart the backend server. The server will automatically connect to Supabase.

---

## 📡 API Endpoints

- `GET /api/properties` — Filter properties by `search`, `city`, `property_type`, `minPrice`, `maxPrice`, `beds`, and `sort`
- `GET /api/properties/:id` — Get full property details
- `POST /api/properties` — Create a new property listing
- `PUT /api/properties/:id` — Update an existing property
- `DELETE /api/properties/:id` — Remove a property listing
- `GET /api/inquiries` — Fetch all customer tour requests & messages
- `POST /api/inquiries` — Submit a tour booking or buyer question
- `PATCH /api/inquiries/:id` — Update inquiry status (`New`, `Contacted`, `Scheduled`, `Closed`)
- `GET /api/stats` — Fetch portfolio volume, views, active counts for the Admin Dashboard
- `GET /api/health` — Service health & database status
