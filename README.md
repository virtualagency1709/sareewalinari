# Saree Wali Nari — Premium Indian Fashion & Fine Jewelry E-Commerce

> **"Drape your dreams"**  
> An editorial, luxury digital flagship atelier celebrating authentic handloom sarees and handcrafted Indian jewelry.

---

## 1. Visual Identity & Brand System

- **Brand Logo:** Authentic brand emblem integrated across storefront navigation, invoices, and the director's portal (`/public/images/logo.png`).
- **Color Palette:**
  - Deep Crimson & Royal Maroon (`#8B1E3F`, `#70152B`, `#A51D36`)
  - Warm Ivory & Champagne (`#FFF9F7`, `#FAF5F2`, `#F3E5AB`)
  - Antique Gold & Zari Accents (`#D4AF37`)
  - Charcoal (`#171316`)
- **Typography:**
  - Headings: *Playfair Display* (Editorial luxury serif)
  - Body: *Plus Jakarta Sans* (High-legibility modern sans-serif)

---

## 2. Technology Stack

- **Framework:** Next.js (App Router) with React 19 & TypeScript
- **Styling:** Tailwind CSS with luxury tokens and custom scrollbars
- **Motion & Interactions:** Framer Motion (animated hero slider with staggered entrance, carousel indicators, touch swipe support)
- **Icons:** Lucide React
- **Database & Auth:** Supabase PostgreSQL with Row Level Security (RLS) + Local Persistence Provider fallback for seamless zero-config evaluation
- **Commerce:** INR (₹) formatting, Razorpay server-side verification with interactive sandbox mode, and Cash on Delivery
- **Celebration:** Canvas Confetti on successful order placement

---

## 3. Product Catalog (Exactly 30 Demo Products)

The catalog is pre-seeded with 30 luxury pieces following the exact distribution:

1. **Banarasi Sarees (4):** Royal Crimson Kadhwa Silk, Emerald Green Jangla, Rani Pink Tanchoi, Gulabi Pastel Shikargah
2. **Silk Sarees (4):** Kanjivaram Temple Border, Tussar Raw Silk Kalamkari, Chanderi Pattu Silk, Paithani Silk with Peacock Pallu
3. **Organza Sarees (3):** Scallop Cutwork Blush Organza, Hand-Painted Floral Sage Green, Metallic Tissue Gold
4. **Georgette Sarees (3):** Chikankari Mukaish Pure Georgette, Midnight Navy Bandhani, Crimson Ombre Sequin
5. **Printed Sarees (3):** Ajrakh Modal Silk Block Print, Vintage Rose Crepe, Kalamkari Dabu Mulmul
6. **Bridal Sarees (3):** Maroon Zardozi Velvet Border, Heritage Gotapatti Scarlet Silk, Champagne Crystal Tissue
7. **Earrings (3):** Heritage Kundan Pearl Chaandbaali, Temple Nakshi Peacock Jhumka, Polki Uncut Solitaire Studs
8. **Necklaces (2):** Kundan Meenakari Bridal Hasli Choker, Rani Haar Layered Gutapusalu Pearl Necklace
9. **Bangles & Kadas (2):** Jadau Kundan Openable Kada (Pair), Ghungroo Temple Embossed Gold Kada
10. **Pendants (1):** Mayur Kundan Enamel Pendant with Chain
11. **Jewelry Sets (2):** Navratna Gemstone Grand Bridal Choker Set, Rajputana Polki Choker & Earrings Set

---

## 4. Key Application Features

### Customer Storefront
- **Global Header:** Sticky navigation with verified logo, mega menus for Sarees and Jewelry, live search modal with auto-focus, live cart & wishlist counters.
- **Hero Slider:** Framer Motion 3-slide editorial carousel with autoplay, pause-on-hover, dot pagination, and CTA buttons.
- **Shop by Category:** 12 category tiles linking to dynamic filtered collection views.
- **Shop the Look:** Interactive lookbook pairing a royal saree with matching jewelry.
- **Product Collection Pages (`/collections/[slug]`, `/sarees`, `/jewelry`, `/new-arrivals`, `/bestsellers`):** Real catalog filters by subcategory, price slider, color palette, in-stock toggle, and sorting (popularity, price, newest).
- **Product Details Page (`/products/[slug]`):** Multi-image gallery with zoom lightbox, specifications, fabric details, care instructions, reviews list, review submission form, and related items.
- **Shopping Bag & Slide-Over Drawer:** Real-time quantity adjustments, free shipping progress bar, promo voucher engine (`UTSAV15` for 15% off, `FIRST10` for 10% off).
- **Secure Checkout (`/checkout`):** Server-side price recalculation, address form, Razorpay online gateway simulator, and COD option.
- **Order Success (`/order-success/[id]`):** Confetti celebration, itemized invoice breakdown, and 4-stage delivery timeline.

### Customer Authentication & Account (`/account`)
- Real authentication with session persistence.
- `/account`: Account overview with welcome banner.
- `/account/orders`: Full order history with line items and tracking status.
- `/account/wishlist`: Saved pieces with 1-click Move-to-Bag.
- `/account/addresses`: Address book manager.
- `/account/settings`: Profile details editor.

### Independent Admin Dashboard (`/admin`)
- **Access Guard:** Role-based protection requiring `admin` role. Includes a top-bar role switcher for evaluator convenience.
- **Overview:** KPIs for Total Verified Revenue (INR), Total Orders, Pending Fulfillments, and Low Stock Alerts (&le; 5 units).
- **Product Management (`/admin/products`):** Create new products (`/admin/products/new`), edit existing items (`/admin/products/[id]/edit`), adjust stock in-line, delete/archive, and toggle Bestseller/Featured flags.
- **Order Management (`/admin/orders`):** Filter by status (Processing, Shipped, Delivered, Cancelled), add tracking numbers & courier names, and inspect customer shipping destinations.
- **Content Management (`/admin/content`):** Edit the 3 hero carousel slides and announcement bar text.
- **Clientele Directory (`/admin/customers`):** Directory of patrons with order counts and lifetime value.
- **Store Settings (`/admin/settings`):** Configure free shipping threshold and toggle Razorpay test sandbox.

---

## 5. Security & First Admin Setup

1. **Public Registrations:** The `/register` endpoint always assigns the `customer` role to prevent privilege escalation.
2. **First Admin Bootstrap:**
   - In Supabase: Run the following SQL to assign administrator rights:
     ```sql
     UPDATE public.profiles
     SET role = 'admin'
     WHERE email = 'admin@sareewalinari.com';
     ```
   - In Local Demo Mode: Click the **"Role: Customer (Switch)"** button in the announcement bar or sign in with `admin@sareewalinari.com` to test all administrative operations.

---

## 6. Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run local development server:**
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.

---

## 7. Supabase Database Deployment

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste and run `supabase/migrations/001_initial_schema.sql`.
4. Paste and run `supabase/seed.sql` to populate initial demo records.
5. In your project settings, copy `URL` and `Anon Key` into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
