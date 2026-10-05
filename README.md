# ARCHERA — Luxury Real Estate & Exclusive Estates

An ultra-luxury full-stack real estate web application inspired by the architectural aesthetic of `theminearch.vercel.app`, built with **React.js (Vite)**, **Express.js**, and **Supabase (with local dual-mode fallback)**.

---

## ✨ Design & Architecture Highlights

- **Visual Theme**: Deep obsidian `#141414` / `#1b1b1b`, warm architectural gold `#e8a849`, crisp white typography.
- **Typography**: Headings in **Yeseva One** (serif), body in **Roboto**, accent script in **Mr De Haviland**.
- **Layout & Structure**:
  - **Fixed Header**: 80px high with ARCHERA brand mark, uppercase navigation links, and direct telephone contact.
  - **Desktop Left Rail**: 60px fixed vertical bar with brand indicator and social links.
  - **1. Hero Section**: "ARCHERA / REAL ESTATE / PORTFOLIO" with dark living room background and warm gradient overlay.
  - **2. Property Types Section**: Replaces services with **8+ Years of Excellence** and 4 categories:
    - **Apartment** — Skyline penthouses & urban duplexes
    - **Land** — Prime developmental parcels, coastal bluffs & vineyard acreage
    - **House** — Architectural modern villas & coastal residences
    - **Mansion** — Gated compounds & waterfront superyacht estates
  - **3. Projects Section (Sold Portfolio with Red Location Markers)**:
    - Interactive Leaflet map with dark CARTO tiles.
    - **Red Pins (`#ef4444`)** show sold properties and lands with closing valuations.
    - **Gold Pins (`#e8a849`)** show active offerings.
    - Featured sold estate slider with details and closing date.
  - **4. About Section**: Real estate agency heritage, team architectural review imagery, and benchmark statistics (**12 Awards Won**, **8 Years Experience**, **56 Properties Sold**).
  - **5. Testimonials**: Completely removed as requested.
  - **6. Latest & Most Expensive Section**: Curated collections with tabs for "Latest Acquisitions" and "Highest Valuation Trophy Estates".
  - **7. Contact Section**: Reference Melbourne address (`69 Queen St, Melbourne, Australia`), direct phone (`(+706) 898-0751`), email (`contact@archera.com`), and functional contact inquiry form connected to `/api/contact`.

---

## 🗺️ Dedicated Pages

- `/` — **Home Page**: Full landing page with all 7 sections above.
- `/about` — **About Archera**: History, philosophy, leadership partners, and awards.
- `/properties` — **Properties Catalog**: Multi-parameter filtering (Apartment, Land, House, Mansion), search, price sort, and Grid/Map toggle.
- `/properties/:id` — **Property Details**: Gallery, architectural overview, amenities, advisor contact, interactive location map, and private showing modal.
- `/projects` — **Sold Portfolio & Land Map**: Dedicated map view where every sold property/land is highlighted with a **red marker**.
- `/latest` — **Latest & Exclusive**: Newly listed acquisitions and highest-valuation estates.
- `/contact` — **Contact & Melbourne Office**: Address, phone, interactive office map, and consultation form.
- `/admin` — **Admin Console**: Property listing manager, one-click "Mark as Sold" toggle, Tour inquiries, Contact messages, and Supabase cloud sync.

---

## 🚀 Running Locally

```bash
# Terminal 1: Backend Server (Port 5000)
cd backend
node server.js

# Terminal 2: React Frontend (Port 3000)
cd frontend
npm run dev
```

Visit: **[http://localhost:3000](http://localhost:3000)**

---

## ☁️ Deployment on Vercel

The application is configured for seamless Vercel deployment:
- `vercel.json` configures the frontend build (`frontend/dist`) and routes API requests to `api/index.js`.
- Root `package.json` contains `"type": "module"` for ES Module compatibility.
- Supabase credentials can be configured via environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) or in the Admin Dashboard.
