# Adams Appliances — Website

Next.js 14 (App Router) + TypeScript, built to deploy on **Vercel**. Implements the
two-engine strategy: **Engine 1 — factory seconds that sell themselves** and
**Engine 2 — manufacturer-authorised repair authority**.

> Heads up: this is a **fresh, complete rebuild** assembled from the live site's content
> and the project brief — not a copy of your existing private repo. You can deploy it as-is
> to a preview URL, or lift individual pages into your current repo.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

Requires Node 18.17+ (Node 20 recommended).

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **New Project → import the repo**. Framework preset auto-detects **Next.js** —
   no build settings to change (build `next build`, output handled automatically).
3. Deploy. You'll get a `*.vercel.app` preview URL immediately.
4. When happy, add the domain `adamsappliances.com.au` under **Project → Settings → Domains**.

No environment variables are required for the current build. (The Phase-2 Google Sheet
catalogue uses one — see below.)

## Before going live — check these

Everything editable lives in **`lib/business.ts`**:
- `email` — the only value not confirmed from the live site (add the real enquiries inbox).
- `reviewCount` / `reviewRating` — keep in sync with Google (currently 284 / 5.0).
- `foundingYear` (2000) and `yearsClaim` ("20+") — the site uses the conservative claim.
- `whatsappNumber` — add your WhatsApp Business number (digits only) to enable WhatsApp buttons; leave "" to hide them.
- `leaveReviewUrl` — **set this to your real Google "leave a review" link** (the `/review` page and QR card bounce customers to it). Get it from your Google Business Profile → Ask for reviews → copy link.

The **repair page content** (`lib/repair-brands.ts`) was drafted from current AU product
info — sanity-check each brand's fault list and model ranges. **Never add Breville.**

Add real image assets under `public/` (logo, storefront, product photos). The site builds
fine without them — the header uses a text wordmark and product cards fall back to a
branded placeholder when `images` is empty. The favicon and social-share image are
generated automatically (no files needed).

## Optional environment variables (Vercel → Settings → Environment Variables)

| Variable | What it does |
|---|---|
| `LISTINGS_CSV_URL` | Turns on the live catalogue from your Google Sheet (see Phase 2 below). |
| `NEXT_PUBLIC_GA_ID` | Google Analytics (e.g. `G-XXXXXXX`). Tracking stays off until this is set. |
| `GOOGLE_SITE_VERIFICATION` | Verifies the site in Google Search Console. |

All three are optional — the site runs fine without them.

## Handy pages

- `/contact` — contact form (opens a prefilled email; WhatsApp button if configured).
- `/review` — bounces customers to your Google review link. Put it on receipts.
- `/review-card` — a printable QR card for the counter (open it and print; it hides the
  site header/footer when printing). The QR points to `/review`.

## Structure

```
app/
  layout.tsx                     Root layout: fonts, nav/footer, LocalBusiness JSON-LD
  page.tsx                       Home (dual hero → Shop | Repairs, reviews, FAQ, find us)
  globals.css                    Design tokens shared site-wide
  factory-seconds/               Engine 1 landing + live catalogue
  shop/                          Full catalogue grid with brand/category filters
  product/[id]/                  One page per unit + Reserve/Enquire + Product schema
  what-is-a-factory-second/      SEO trust page
  coffee-machine-repairs-sydney/ Engine 2 repair hub
  repair-process/                How a repair works
  delonghi-repairs-sydney/       ┐
  kenwood-repairs-sydney/        │ Authorised repair pages (one template, four configs)
  braun-repairs-sydney/          │
  sunbeam-repairs-sydney/        ┘
  _repairs/                      Shared repair-page template + styles (not a route)
  sitemap.ts, robots.ts, not-found.tsx
components/                      SiteHeader, SiteFooter, ProductCard
lib/
  business.ts                    Single source of truth for business facts
  repair-brands.ts               Per-brand repair content
  listings.ts                    Catalogue data (swap SAMPLE → Google Sheet in Phase 2)
```

## Phase 2 — wire the catalogue to your Google Sheet

This is already built and turnkey. `lib/listings.ts` returns sample stock **until** you set
`LISTINGS_CSV_URL`, at which point it reads your published Google Sheet instead — no code
changes. In the sheet: **File → Share → Publish to web → the stock tab → CSV → Publish**,
then paste that URL into the `LISTINGS_CSV_URL` env var in Vercel and redeploy.

Expected column headers (first row, any order, case-insensitive):
`id, title, brand, category, condition, price, wasprice, description, images, reserved`
(`condition` = "New" or "Factory Second"; `images` = URLs separated by `|`; `reserved` =
yes/true/1). Edit the sheet and the site refreshes within ~5 minutes. If the sheet is ever
unreachable, the site safely falls back to sample data rather than breaking. The same sheet
can later feed eBay from its titles/prices.
