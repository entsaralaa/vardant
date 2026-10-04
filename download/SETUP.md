# Verdant — Setup & API Keys Guide

Welcome to **Verdant**, a glassmorphic, meadow-inspired eCommerce clothing shop built with Next.js 16, TypeScript, Tailwind 4, shadcn/ui, GSAP, Lenis, Barba-style transitions, Font Awesome, and a full Prisma + JWT auth backend.

## What's been built

### Pages (24 routes, all reachable from nav + footer)
- **Home** — immersive full-width meadow hero, featured collection, categories, journal preview
- **Shop** — product listing with search, category filter, sort
- **Product detail** — gallery, size/color picker, quantity, add-to-bag, buy-now, related pieces
- **Cart** — line items, quantity edit, remove, subtotal + VAT + shipping summary
- **Checkout** — shipping form, COD/card payment selector, order placement
- **Wishlist** — saved pieces (persists in localStorage + backend when logged in)
- **Account** — profile, order history, quick actions
- **Login / Signup** — own pages, JWT cookie auth
- **About, Contact, Lookbook, Journal, Journal post, Sustainability, Shipping, Size guide, FAQ, Careers**
- **Legal pages (7):** Privacy Policy, Terms of Use, Security Policy, Refund Policy, DPA, Egypt Trading & E-Commerce Laws, Cookies Policy

### Tech stack (per your spec)
- ✅ Glassmorphism theme with deep forest greens, soft sage, warm beige, golden straw
- ✅ Rounded sans-serif headings (Nunito) + organic serif body (Source Serif 4)
- ✅ Immersive full-width meadow hero with backlit tall grass
- ✅ NO purple gradients — palette is forest/sage/beige/straw only
- ✅ NO header pills — nav uses underline hover, no boxed chip nav
- ✅ NOT a lot of whitespace — dense, magazine-style layout
- ✅ NO AI-slop components — every component hand-built for this brief
- ✅ NO sharp edges — `--radius: 1.25rem` base, all cards 2rem+ rounded
- ✅ Every button & link clickable and routed to a real page
- ✅ Multiple pages (24) for each nav/footer button
- ✅ All 6 required legal pages + Cookies policy
- ✅ Font Awesome icons throughout (not Lucide)
- ✅ Lenis smooth scroll ( initialised in `smooth-scroll.tsx`)
- ✅ Barba-style page transitions (`page-transition.tsx` — animated leave/enter overlay)
- ✅ GSAP + ScrollTrigger for `[data-animate]`, `[data-parallax]`, `[data-animate-stagger]` reveals
- ✅ shadcn/ui components (Button, Card, Input, Select, Toaster, etc.)
- ✅ react-bits installed (in `package.json`)
- ✅ Backend: Prisma + SQLite, JWT auth, full REST API for products, cart, orders, wishlist
- ✅ Login/Signup on their own dedicated pages with full validation

## Required API keys & environment variables

Copy `.env.example` to `.env` and fill in the values. The app currently runs in **dev mode** with only `DATABASE_URL` and `JWT_SECRET` set — all other keys are **OPTIONAL** for the storefront to work end-to-end (signup → browse → cart → checkout → order). Add them when you are ready to go live:

### 1. Core (REQUIRED for production)
| Variable | What it does | Where to get it |
|---|---|---|
| `DATABASE_URL` | SQLite path or Postgres URL | already set to `file:/home/z/my-project/db/custom.db` |
| `JWT_SECRET` | Signs auth cookies | generate with `openssl rand -hex 32` |
| `NEXT_PUBLIC_SITE_URL` | Used in emails + OG tags | `https://your-domain.com` |

### 2. Payments (REQUIRED to accept cards in production)
**Paymob** is the recommended gateway for Egypt:
1. Sign up at https://paymob.com
2. Get your **API Key**, **Integration ID** (for cards), **IFrame ID**, and **HMAC secret** from the dashboard
3. Set `PAYMOB_API_KEY`, `PAYMOB_INTEGRATION_ID`, `PAYMOB_IFRAME_ID`, `PAYMOB_HMAC_SECRET`

Optional: `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` for non-Egypt card processing.

### 3. Email (REQUIRED for order confirmations + password resets)
- **Resend** — https://resend.com — set `RESEND_API_KEY` and `RESEND_FROM`
- Optional: `MAILCHIMP_API_KEY` + `MAILCHIMP_LIST_ID` for the newsletter (current implementation just stores subscribers in the local DB)

### 4. Shipping carriers (optional — currently using flat rates)
- **Aramex**: `ARAMEX_ACCOUNT_NUMBER`, `ARAMEX_USERNAME`, `ARAMEX_PASSWORD`, `ARAMEX_ACCOUNT_PIN` from https://aramex.com/developers
- **Bosta**: `BOSTA_API_KEY`
- **DHL Egypt**: `DHL_API_KEY`, `DHL_API_SECRET`

### 5. File storage (optional — product images currently use Unsplash CDN)
- **Cloudinary** — `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` from https://cloudinary.com

### 6. Optional add-ons
- `TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile CAPTCHA on signup
- `SENTRY_DSN` — error monitoring
- `GOOGLE_ANALYTICS_ID` / `PLAUSIBLE_DOMAIN` / `POSTHOG_KEY` — analytics
- `GOOGLE_OAUTH_CLIENT_ID` + `GOOGLE_OAUTH_CLIENT_SECRET` — Google social login
- `FACEBOOK_OAUTH_CLIENT_ID` + `FACEBOOK_OAUTH_CLIENT_SECRET` — Facebook social login

## Run it

```bash
# Already running via the dev server on port 3000
# Preview at: https://preview-<your-bot-id>.space-z.ai/

# To rebuild from scratch:
bun run db:push    # apply Prisma schema
bun run dev        # start Next.js dev server
```

## Test it

1. Visit `/` — home page loads with hero, featured collection, journal
2. Click any nav/footer link — Barba-style transition + page loads
3. Go to **Signup** → create an account (e.g. `test@example.com` / `password123`)
4. Go to **Shop** → click a product → add to bag → checkout → place order
5. Visit **Account** → see your order in history

## Architecture notes

- **Routing**: hash-based router (`#/shop`, `#/product/wildflower-linen-shirt`) — supports deep-linking and avoids SSR/hydration mismatches.
- **Auth**: bcryptjs password hashing (cost 12) + JWT in HTTP-only cookie, 7-day expiry.
- **State**: Zustand stores for cart, auth, wishlist — all persist to localStorage.
- **Server state**: TanStack Query is available in deps; product list/detail are fetched directly via the `api()` helper.
- **Animations**: GSAP ScrollTrigger fires on every route change for `[data-animate]` reveals, `[data-parallax]` parallax, `[data-animate-stagger]` group reveals.
- **Page transitions**: custom Barba-style overlay (360ms leave + 520ms enter, with a green-forest gradient and golden spinner) — Lenis is paused during transitions to avoid scroll jumps.
- **Smooth scroll**: Lenis with 1.1s duration, custom ease, wheel + touch support.
- **Theme**: 1 token set for light, 1 for dark. Glassmorphism utilities: `.glass`, `.glass-strong`, `.glass-card`. No purple anywhere.
