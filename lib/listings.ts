// ---------------------------------------------------------------------------
// Engine 1 — the catalogue data layer ("one source, many channels").
//
// RIGHT NOW: returns the sample array below so the shop builds and renders.
//
// PHASE 2 (per the brief): make the Listings Tracker Google Sheet the single
// source of truth. Publish the sheet as CSV/JSON and fetch it here — the whole
// catalogue + every product page then updates itself when you edit the sheet.
// See fetchFromSheet() below for exactly where to plug it in.
// ---------------------------------------------------------------------------

export type Condition = "New" | "Factory Second";

export type Listing = {
  id: string;          // stock ID — also the /product/[id] slug
  title: string;       // e.g. "Samsung 8.5kg Front Load Washer"
  brand: string;
  category: string;    // "Washing Machines", "Fridges", "Coffee Machines", ...
  condition: Condition;
  price: number;       // BIN price (AUD)
  wasPrice?: number;   // optional RRP for a strike-through
  description: string;
  images: string[];    // URLs (Drive / image host). Empty → placeholder shown.
  reserved?: boolean;  // true → badged & greyed, still visible but not orderable
};

// --- SAMPLE DATA (replace with the sheet) ----------------------------------
const SAMPLE: Listing[] = [
  { id: "WM-SAM-8501", title: "Samsung 8.5kg Front Load Washing Machine", brand: "Samsung", category: "Washing Machines", condition: "Factory Second", price: 749, wasPrice: 1099, description: "Minor cosmetic mark on the side panel — sits against the wall, you'll never see it. Fully functional, tested and tagged. EcoBubble front loader.", images: [] },
  { id: "FR-ELE-4402", title: "Electrolux 460L Bottom Mount Fridge", brand: "Electrolux", category: "Fridges & Freezers", condition: "Factory Second", price: 899, wasPrice: 1349, description: "Small dent to the lower kick panel. Full cooling performance, frost-free, tested before sale.", images: [] },
  { id: "TV-SAM-6503", title: "Samsung 65\" 4K Smart TV", brand: "Samsung", category: "TVs & Entertainment", condition: "New", price: 995, wasPrice: 1295, description: "Brand new, boxed. Latest model 4K UHD with smart apps built in. Always in stock — call to confirm current model.", images: [] },
  { id: "DW-AEG-6004", title: "AEG 60cm Stainless Dishwasher", brand: "AEG", category: "Dishwashers", condition: "Factory Second", price: 679, wasPrice: 949, description: "Light scratch to the stainless door. 14 place settings, quiet operation. Tested and tagged to AS/NZS.", images: [] },
  { id: "CM-DEL-1105", title: "De'Longhi Magnifica S Coffee Machine", brand: "De'Longhi", category: "Coffee Machines", condition: "Factory Second", price: 549, wasPrice: 899, description: "Ex-display bean-to-cup machine, fully serviced by our authorised techs. Damaged box, machine as-new. 2-year manufacturer warranty.", images: [], reserved: true },
  { id: "DR-WES-7006", title: "Westinghouse 7kg Vented Dryer", brand: "Westinghouse", category: "Dryers", condition: "New", price: 449, wasPrice: 599, description: "Brand new, sensor drying, reverse tumble. Ready to take home today.", images: [] },
];

// --- PHASE 2: live Google Sheet catalogue -----------------------------------
// HOW TO TURN IT ON (no code changes needed):
//   1. In your Listings Tracker sheet: File → Share → Publish to web →
//      choose the sheet/tab → Comma-separated values (.csv) → Publish. Copy the URL.
//   2. In Vercel → Project → Settings → Environment Variables, add:
//        LISTINGS_CSV_URL = <that published CSV url>
//   3. Redeploy. The site now reads the sheet and refreshes every ~5 minutes.
//
// EXPECTED COLUMN HEADERS (first row of the sheet; case-insensitive, any order):
//   id | title | brand | category | condition | price | wasprice | description | images | reserved
//   - condition: "New" or "Factory Second"
//   - images: one or more URLs separated by a pipe |  (leave blank for placeholder)
//   - reserved: yes / true / 1  → badged & greyed
//
// If the env var is missing or the fetch fails, we fall back to SAMPLE so the
// site always renders.

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c === "\r") { /* ignore */ }
    else field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

function rowsToListings(rows: string[][]): Listing[] {
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const idx = (name: string) => headers.indexOf(name);
  const truthy = (v: string) => /^(yes|true|1|reserved)$/i.test(v.trim());

  return rows.slice(1).map((r) => {
    const get = (name: string) => (idx(name) >= 0 ? (r[idx(name)] ?? "").trim() : "");
    const rawCondition = get("condition").toLowerCase();
    const condition: Condition = rawCondition.includes("new") ? "New" : "Factory Second";
    const price = parseFloat(get("price").replace(/[^0-9.]/g, "")) || 0;
    const wasRaw = parseFloat(get("wasprice").replace(/[^0-9.]/g, ""));
    return {
      id: get("id") || get("title").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40),
      title: get("title"),
      brand: get("brand"),
      category: get("category"),
      condition,
      price,
      wasPrice: Number.isFinite(wasRaw) && wasRaw > 0 ? wasRaw : undefined,
      description: get("description"),
      images: get("images").split("|").map((s) => s.trim()).filter(Boolean),
      reserved: truthy(get("reserved")),
    };
  }).filter((l) => l.title && l.id);
}

export async function getListings(): Promise<Listing[]> {
  const url = process.env.LISTINGS_CSV_URL;
  if (!url) return SAMPLE;
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return SAMPLE;
    const listings = rowsToListings(parseCsv(await res.text()));
    return listings.length ? listings : SAMPLE;
  } catch {
    return SAMPLE;
  }
}

export async function getListing(id: string): Promise<Listing | undefined> {
  const all = await getListings();
  return all.find((l) => l.id === id);
}

export function priceAUD(n: number): string {
  return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
}
