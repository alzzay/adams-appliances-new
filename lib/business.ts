// ---------------------------------------------------------------------------
// Adams Appliances — shared business facts (single source of truth).
// Values below were taken from the live site (adamsappliances.com.au) + public
// listings on 2026-07-09. Keep the review count/rating in sync with Google.
// ---------------------------------------------------------------------------

export const business = {
  name: "Adams Appliances",
  domain: "https://adamsappliances.com.au",
  tagline: "Smart Choices, Reliable Repairs",

  // --- Contact (verified from live site) ---
  phoneDisplay: "(02) 8764 8621",
  phoneTel: "tel:0287648621",
  email: "info@adamsappliances.com.au", // TODO confirm — not shown on live site

  // Optional WhatsApp Business number for Reserve/Enquire (a landline can't take
  // SMS well). Digits only, international format, no + or spaces. Leave "" to hide.
  whatsappNumber: "61424612927", // confirmed — AU mobile 0424 612 927 in wa.me format

  // --- Address ---
  street: "95 Wattle St",
  suburb: "Punchbowl",
  state: "NSW",
  postcode: "2196",
  region: "Sydney",
  mapsUrl: "https://maps.google.com/?q=95+Wattle+St+Punchbowl+NSW+2196",
  googleReviewsUrl: "https://www.google.com/search?q=adams+appliances+punchbowl",
  leaveReviewUrl: "https://g.page/r/CSc2ag_Hq7EvEAI/review",
  facebookUrl: "https://www.facebook.com/profile.php?id=100057438468469",
  blogUrl: "https://adamsappliances.com.au/blog",

  // --- Trust numbers ---
  foundingYear: 2000,        // "Est 2000" per live site
  yearsClaim: "20+",         // Keep the conservative claim the business already uses
  reviewCount: 284,          // Keep in sync with live Google count
  reviewRating: 5.0,         // 5.0 on Google

  safetyLine: "Factory seconds are tested and tagged to AS/NZS electrical safety standards.",

  // Authorised to REPAIR. Safe to state in full anywhere.
  // ⚠️ NEVER add Breville — Adams is NOT a Breville authorised repairer.
  authorisedBrands: ["De'Longhi", "Kenwood", "Braun", "Sunbeam", "Nespresso"],

  // Brands STOCKED / sold (from live site).
  stockedBrands: [
    "De'Longhi", "Kenwood", "Braun", "Nespresso", "Sunbeam", "Electrolux",
    "Westinghouse", "Kelvinator", "Chef", "AEG", "Daniella Appliances", "Gorenje", "Samsung",
  ],
  // Retailers we carry out extended-warranty repairs for (confirmed current).
  extendedWarrantyPartners: [
    "The Good Guys", "Harvey Norman", "Bing Lee", "Myer", "JB Hi-Fi",
  ],

  // Repair scope guardrail (ACL). Repairs = coffee / small appliances only.
  scopeNote:
    "We repair coffee and small kitchen appliances only — not fridges, ovens, cooktops, washing machines or dryers.",

  hours: [
    { days: "Mon – Fri", time: "9:00am – 5:00pm" },
    { days: "Saturday", time: "9:00am – 2:00pm" },
    { days: "Sunday", time: "Closed" },
  ],

  // Real De'Longhi-relevant Google reviews (trimmed), used on repair pages.
  reviews: [
    {
      quote:
        "Referred by De'Longhi for a warranty assessment. Knowledgeable, professional and fast — a positive experience from start to finish.",
      author: "Yvonne Thompson",
      context: "De'Longhi warranty repair",
    },
    {
      quote:
        "De'Longhi recommended Adams to service our machine. Ali was courteous and knowledgeable, and the issue was resolved within two hours.",
      author: "Cathy Spatino",
      context: "De'Longhi service",
    },
  ],
} as const;

export type Business = typeof business;

export function yearsOperating(b: Business = business): number {
  return new Date().getFullYear() - b.foundingYear;
}
