// ---------------------------------------------------------------------------
// Per-brand repair page content.
//
// To CLONE a new brand page:
//   1. Copy one of the brand objects below, rename it.
//   2. Change the fields (slug, appliance type, problems, ranges, FAQ, meta).
//   3. Create app/<slug>/page.tsx (copy an existing page, swap one import).
// Layout, styling, schema and ACL guardrails are shared.
//
// ⚠️ ACL rules baked in and non-negotiable:
//   - Only set `authorised: true` for brands Adams is genuinely authorised for
//     (De'Longhi, Kenwood, Braun, Sunbeam). NEVER add Breville.
//   - Sunbeam is authorised but low-volume → supportingLine: true.
//   - Keep every brand to coffee / small kitchen appliances. No large whitegoods.
//
// NOTE ON ACCURACY: model ranges and common faults below were written from
// current AU product info + repairer sources, but Ali should sanity-check that
// each list matches the work Adams actually does before publishing.
// ---------------------------------------------------------------------------

import { Metadata } from "next";
import { business } from "./business";

export type FaqItem = { q: string; a: string };

export type BrandRepair = {
  slug: string;                 // e.g. "delonghi-repairs-sydney"
  name: string;                 // "De'Longhi"
  authorised: boolean;          // true only if genuinely authorised
  supportingLine?: boolean;     // true for low-volume brands (e.g. Sunbeam)
  applianceType: string;        // singular, must read after "a"/"your"
  applianceTypePlural: string;  // plural, reads after the brand name

  heroKicker: string;
  heroLede: string;

  authorisedPoints: { title: string; body: string }[];
  problems: { title: string; body: string }[];
  ranges: string[];
  rangesNote: string;
  faqs: FaqItem[];
  meta: { title: string; description: string };
};

// =========================================================================
//  DE'LONGHI — coffee machines (volume focus)
// =========================================================================
export const delonghi: BrandRepair = {
  slug: "delonghi-repairs-sydney",
  name: "De'Longhi",
  authorised: true,
  applianceType: "coffee machine",
  applianceTypePlural: "coffee machines",

  heroKicker: "Manufacturer-authorised · Punchbowl, Sydney",
  heroLede:
    "A broken De'Longhi is an expensive thing to hand to a stranger. Adams is an authorised De'Longhi repairer — genuine parts, factory-trained, and your manufacturer warranty stays intact.",

  authorisedPoints: [
    { title: "Genuine De'Longhi parts", body: "As an authorised repairer we fit real De'Longhi components — not generic substitutes that fail again in six months." },
    { title: "Your warranty stays intact", body: "Authorised repairs don't void your manufacturer warranty. A back-shed fix can. That difference matters on a machine worth thousands." },
    { title: "Factory-trained on the range", body: "We work on De'Longhi machines every week — from the Dedica up to the PrimaDonna — so most faults are diagnosed the same day." },
  ],

  problems: [
    { title: "Won't pump or dispense water", body: "Usually a blocked or worn pump, a clogged flow path, or a failed solenoid. We test pressure and replace the faulty part with a genuine one." },
    { title: "Grinder jammed or not grinding", body: "Foreign objects, worn burrs or a seized grinder motor. We clear, re-set the grind and replace burrs where needed." },
    { title: "Leaking water underneath", body: "Perished seals, a cracked tank valve or a split hose inside the housing. We open it up, find the source and re-seal properly." },
    { title: "Weak, cold or no crema", body: "Often temperature, pressure or a grinder that's drifted out of spec. We tune the machine back to how it brewed new." },
    { title: "Error codes / won't start", body: "We read the fault, check the board, thermoblock and sensors, and tell you honestly whether it's worth repairing." },
    { title: "Overdue descale & full service", body: "Scale is the number-one killer of these machines. A proper service clears it and resets the machine's lifespan." },
  ],

  ranges: [
    "Magnifica / Magnifica S / Magnifica Evo",
    "Dinamica & Dinamica Plus",
    "Eletta & Eletta Explore",
    "PrimaDonna (Class / Elite / Soul)",
    "La Specialista (Arte / Maestro)",
    "Dedica & Dedica Arte",
    "Autentica",
  ],
  rangesNote:
    "Automatic bean-to-cup, manual espresso and pump machines. If your model isn't listed, ask — we almost certainly service it.",

  faqs: [
    { q: "Are you an authorised De'Longhi repairer?", a: "Yes. Adams is a manufacturer-authorised repairer for De'Longhi, which means genuine parts, factory-backed procedures, and repairs that keep your warranty intact." },
    { q: "How much does a De'Longhi repair cost?", a: "It depends on the fault. We diagnose the machine first and give you a clear price before any work starts — no surprises, and no charge for advice on whether a repair is worth it." },
    { q: "How long does a repair take?", a: "Many faults are diagnosed the same day. Turnaround then depends on parts, but common De'Longhi jobs are usually back with you within the week." },
    { q: "Do I need to book, or can I just drop it in?", a: "You're welcome to walk in during opening hours at 95 Wattle St, Punchbowl. A quick call first means we can have the right parts ready." },
    { q: "Do you use genuine De'Longhi parts?", a: "Always. As an authorised repairer we fit genuine components, which is what keeps the repair reliable and your warranty valid." },
    { q: "My machine is out of warranty — can you still help?", a: "Yes. We repair in-warranty and out-of-warranty De'Longhi machines, and we'll tell you honestly if a machine isn't worth fixing." },
  ],

  meta: {
    title: "De'Longhi Repairs Sydney | Authorised Coffee Machine Repairer — Adams Appliances",
    description: "Authorised De'Longhi coffee machine repairs in Sydney. Genuine parts, warranty-safe, factory-trained. Same-day diagnosis at Punchbowl. Magnifica, Dinamica, PrimaDonna & more.",
  },
};

// =========================================================================
//  KENWOOD — stand mixers & kitchen machines
// =========================================================================
export const kenwood: BrandRepair = {
  slug: "kenwood-repairs-sydney",
  name: "Kenwood",
  authorised: true,
  applianceType: "kitchen machine",
  applianceTypePlural: "kitchen machines",

  heroKicker: "Manufacturer-authorised · Punchbowl, Sydney",
  heroLede:
    "A Kenwood Chef is built to last decades — but only if it's repaired properly. Adams is an authorised Kenwood repairer: genuine parts, factory-trained, and your manufacturer warranty stays intact.",

  authorisedPoints: [
    { title: "Genuine Kenwood parts", body: "Authorised means real Kenwood gears, boards and seals — the parts that let a Chef keep going for another decade, not generic ones that strip again." },
    { title: "Your warranty stays intact", body: "An authorised repair keeps your manufacturer warranty valid. On a Cooking Chef that's a serious investment worth protecting." },
    { title: "Factory-trained on the range", body: "From the classic Chef and Major to the Cooking Chef XL and kMix, we service the whole Kenwood range every week." },
  ],

  problems: [
    { title: "Grinding or noisy gearbox", body: "The classic Chef fault — worn planetary gears. We strip the head, replace the gears and re-grease so it runs quietly again." },
    { title: "Head won't lift, lock or wobbles", body: "A worn head-release, tired hinge or loose outlet. We rebuild the head so attachments seat and lock the way they should." },
    { title: "Won't turn on or cuts out mid-mix", body: "Usually motor brushes, the speed-control board or a tripped thermal cutout. We test each and replace what's failed." },
    { title: "Speed control erratic or stuck", body: "A worn speed board or potentiometer makes the mixer surge or stick on one speed. We replace the control and re-calibrate." },
    { title: "Grease leaking from the head", body: "Perished internal seals let grease seep into the bowl. We re-seal and give the gearbox a full service." },
    { title: "Cooking Chef not heating", body: "The induction heating, sensor or board on a Cooking Chef can fail. We diagnose the heating system and repair it properly." },
  ],

  ranges: [
    "Chef & Chef XL / Major",
    "Cooking Chef & Cooking Chef XL",
    "Titanium Chef Baker / Patissier XL",
    "kMix stand mixers",
    "Prospero+ / Prospero",
    "MultiPro food processors",
    "Hand mixers & attachments",
  ],
  rangesNote:
    "Stand mixers, kitchen machines, food processors and their attachments. If your model isn't listed, ask — we almost certainly service it.",

  faqs: [
    { q: "Are you an authorised Kenwood repairer?", a: "Yes. Adams is a manufacturer-authorised repairer for Kenwood — genuine parts, factory-backed procedures, and repairs that keep your warranty intact." },
    { q: "My Kenwood Chef is grinding — is it worth fixing?", a: "Almost always. Worn planetary gears are a common, repairable fault, and a properly re-geared Chef can run for years more. We'll confirm once we've looked at it." },
    { q: "How much does a Kenwood repair cost?", a: "It depends on the fault. We diagnose the machine first and give you a clear price before any work starts — no surprises." },
    { q: "How long does a repair take?", a: "Many faults are diagnosed the same day. Turnaround then depends on parts, but common Kenwood jobs are usually back with you within the week." },
    { q: "Can you fix a Cooking Chef that's stopped heating?", a: "Yes. Heating faults on the Cooking Chef range are one of the jobs we handle — we diagnose the induction system and repair it with genuine parts." },
    { q: "My machine is out of warranty — can you still help?", a: "Yes. We repair in-warranty and out-of-warranty Kenwood machines, and we'll tell you honestly if one isn't worth fixing." },
  ],

  meta: {
    title: "Kenwood Repairs Sydney | Authorised Stand Mixer & Kitchen Machine Repairer — Adams Appliances",
    description: "Authorised Kenwood repairs in Sydney. Genuine parts, warranty-safe, factory-trained. Chef, Cooking Chef, kMix & food processors. Same-day diagnosis at Punchbowl.",
  },
};

// =========================================================================
//  BRAUN — hand blenders & food processors
// =========================================================================
export const braun: BrandRepair = {
  slug: "braun-repairs-sydney",
  name: "Braun",
  authorised: true,
  applianceType: "kitchen appliance",
  applianceTypePlural: "kitchen appliances",

  heroKicker: "Manufacturer-authorised · Punchbowl, Sydney",
  heroLede:
    "Whether it's a MultiQuick that's stopped or a food processor that won't run, Adams is an authorised Braun repairer — genuine parts, done properly, and your manufacturer warranty stays intact.",

  authorisedPoints: [
    { title: "Genuine Braun parts", body: "As an authorised repairer we fit real Braun couplings, blades and seals — so the fix lasts, rather than failing again the next time you use it." },
    { title: "Your warranty stays intact", body: "Authorised repairs keep your manufacturer warranty valid — and keep a good appliance out of landfill." },
    { title: "Factory-trained on the range", body: "We service the Braun kitchen range regularly, from MultiQuick hand blenders to food processors and their attachments." },
  ],

  problems: [
    { title: "Motor won't run at all", body: "Often the power lead, the trigger switch or the motor itself. We test the circuit and replace the faulty part." },
    { title: "Speed button not responding", body: "The SmartSpeed / variable-speed switch wears with use. We replace the control so it responds smoothly again." },
    { title: "Blade or shaft won't spin", body: "A stripped coupling, worn gear or seized shaft. We replace the drive parts so it blends with full power." },
    { title: "Food processor won't start", body: "Usually the lid safety interlock or a bowl that isn't seating. We repair the interlock and the gearbox underneath." },
    { title: "Leaking or overheating", body: "Perished seals let liquid in; a tired motor overheats and cuts out. We re-seal and address the cause, not just the symptom." },
    { title: "Attachment won't click on", body: "A worn EasyClick coupling stops attachments locking. We replace the coupling so the system fits together properly." },
  ],

  ranges: [
    "MultiQuick 9 / 7 / 5 / 3 hand blenders",
    "MultiQuick chopper & food-processor attachments",
    "Braun food processors",
    "Braun hand mixers",
    "Braun coffee grinders",
  ],
  rangesNote:
    "Hand blenders, food processors and small kitchen appliances. If your model isn't listed, ask — we almost certainly service it.",

  faqs: [
    { q: "Are you an authorised Braun repairer?", a: "Yes. Adams is a manufacturer-authorised repairer for Braun — genuine parts, factory-backed procedures, and repairs that keep your warranty intact." },
    { q: "How much does a Braun repair cost?", a: "It depends on the fault. We diagnose the appliance first and give you a clear price before any work starts, including honest advice on whether a repair is worth it versus replacing." },
    { q: "How long does a repair take?", a: "Many faults are diagnosed the same day. Turnaround then depends on parts, but common Braun jobs are usually back with you within the week." },
    { q: "Do you use genuine Braun parts?", a: "Always. As an authorised repairer we fit genuine components, which is what keeps the repair reliable and your warranty valid." },
    { q: "Is my MultiQuick worth repairing, or should I replace it?", a: "We'll tell you honestly. If the fix costs more than it's worth we'll say so — but many MultiQuick faults are a cheap coupling or switch, well worth repairing." },
    { q: "My appliance is out of warranty — can you still help?", a: "Yes. We repair in-warranty and out-of-warranty Braun appliances." },
  ],

  meta: {
    title: "Braun Repairs Sydney | Authorised MultiQuick & Food Processor Repairer — Adams Appliances",
    description: "Authorised Braun repairs in Sydney. Genuine parts, warranty-safe, factory-trained. MultiQuick hand blenders, food processors & more. Same-day diagnosis at Punchbowl.",
  },
};

// =========================================================================
//  SUNBEAM — authorised but LOW-VOLUME supporting line (honest by design)
// =========================================================================
export const sunbeam: BrandRepair = {
  slug: "sunbeam-repairs-sydney",
  name: "Sunbeam",
  authorised: true,
  supportingLine: true,
  applianceType: "machine",
  applianceTypePlural: "appliances",

  heroKicker: "Manufacturer-authorised · Punchbowl, Sydney",
  heroLede:
    "From Mixmaster stand mixers to Café Series coffee machines, Adams is an authorised Sunbeam repairer. We diagnose the fault and tell you honestly whether it's worth fixing — with genuine parts where they're available.",

  authorisedPoints: [
    { title: "Genuine parts where available", body: "We fit genuine Sunbeam parts when they're still made. For older models where parts are discontinued, we'll tell you upfront rather than waste your money." },
    { title: "Your warranty stays intact", body: "Authorised repairs keep your manufacturer warranty valid on current Sunbeam models." },
    { title: "Honest diagnosis first", body: "Some older Mixmasters aren't economical to repair. We check, we're straight with you, and there's no charge for the advice." },
  ],

  problems: [
    { title: "Mixmaster grinding or stripped gears", body: "The common Mixmaster fault — a worn drive gear or worm wheel. We assess it and replace the gears where parts are still available." },
    { title: "Won't turn or cuts out", body: "Motor overheating, a tripped thermal cutout or a failed speed board. We test each and repair what's fixable." },
    { title: "Head won't lift or lock", body: "A worn head-release or hinge stops the head seating. We repair the mechanism so it locks safely again." },
    { title: "Coffee machine won't pump", body: "On Café Series machines, usually a worn pump, blocked flow path or perished seals. We test pressure and re-seal." },
    { title: "Coffee machine not heating", body: "A failed thermoblock or thermostat. We diagnose the heating circuit and repair it with genuine parts." },
    { title: "Erratic speed or blank display", body: "A worn speed control or LCD board. We replace the control and re-check the machine end to end." },
  ],

  ranges: [
    "Mixmaster Café Series Planetary",
    "Mixmaster stand mixers (MXM series)",
    "Mixmaster HeatSoft hand mixers",
    "Café Series espresso machines",
    "Sunbeam food processors",
  ],
  rangesNote:
    "Mainly Mixmaster mixers and Café Series coffee machines. Ask about your model — parts for some older Sunbeam appliances are discontinued, and we'll tell you upfront.",

  faqs: [
    { q: "Are you an authorised Sunbeam repairer?", a: "Yes. Adams is a manufacturer-authorised repairer for Sunbeam — genuine parts, factory-backed procedures, and repairs that keep your warranty intact on current models." },
    { q: "Can you still get parts for my old Mixmaster?", a: "Sometimes. Sunbeam has discontinued parts for some older Mixmasters, so we check availability first and tell you honestly before you spend anything." },
    { q: "How much does a Sunbeam repair cost?", a: "It depends on the fault and whether parts are available. We diagnose first and give you a clear price before any work starts." },
    { q: "How long does a repair take?", a: "Many faults are diagnosed the same day. Turnaround then depends on parts availability, which we'll confirm with you." },
    { q: "Is it worth repairing, or should I replace it?", a: "We'll give you a straight answer. If a repair costs more than the appliance is worth, we'll tell you rather than sell you a job." },
    { q: "My appliance is out of warranty — can you still help?", a: "Yes, where parts are available. We repair in-warranty and out-of-warranty Sunbeam appliances." },
  ],

  meta: {
    title: "Sunbeam Repairs Sydney | Authorised Mixmaster & Coffee Machine Repairer — Adams Appliances",
    description: "Authorised Sunbeam repairs in Sydney. Genuine parts where available, honest diagnosis. Mixmaster stand mixers & Café Series coffee machines. Punchbowl workshop.",
  },
};

// =========================================================================
//  NESPRESSO — pod coffee machines (authorised). No Breville/Sage naming.
// =========================================================================
export const nespresso: BrandRepair = {
  slug: "nespresso-repairs-sydney",
  name: "Nespresso",
  authorised: true,
  applianceType: "coffee machine",
  applianceTypePlural: "coffee machines",

  heroKicker: "Manufacturer-authorised · Punchbowl, Sydney",
  heroLede:
    "A Nespresso should be quick, hot and reliable. When it isn't, Adams is an authorised Nespresso repairer — genuine parts, warranty-safe, and most faults sorted fast.",

  authorisedPoints: [
    { title: "Genuine Nespresso parts", body: "As an authorised repairer we fit genuine Nespresso components — the parts that keep your machine sealed, hot and pumping properly." },
    { title: "Your warranty stays intact", body: "Authorised repairs don't void your manufacturer warranty. We keep it valid while we fix the fault." },
    { title: "Across the range", body: "We service the Nespresso range — from the compact Essenza and Pixie to Vertuo and the Lattissima milk machines." },
  ],

  problems: [
    { title: "Won't pump or no water", body: "Usually scale build-up, an air-locked pump or a blocked flow path. We clear it, test pressure and get the flow back." },
    { title: "Not piercing the pod / weak coffee", body: "A worn piercing plate or clogged head. We service the brew unit so it extracts properly again." },
    { title: "Leaking water underneath", body: "Perished seals or a cracked tank valve. We find the source and re-seal properly." },
    { title: "Not heating or lukewarm coffee", body: "A failing thermoblock or thermostat. We diagnose the heating circuit and repair it." },
    { title: "Blinking lights / won't start", body: "We read the fault, check the board and sensors, and tell you honestly whether it's worth repairing." },
    { title: "Descale overdue / full service", body: "Scale is the number-one killer of these machines. A proper descale and service resets its lifespan." },
  ],

  ranges: [
    "Vertuo / Vertuo Next / Vertuo Plus",
    "Essenza Mini",
    "Pixie",
    "CitiZ",
    "Inissia",
    "Lattissima (One / Touch / Pro)",
    "Creatista",
  ],
  rangesNote:
    "Original and Vertuo pod machines, plus the Lattissima and Creatista milk range. If your model isn't listed, ask.",

  faqs: [
    { q: "Are you an authorised Nespresso repairer?", a: "Yes. Adams is a manufacturer-authorised repairer for Nespresso — genuine parts, factory-backed procedures, and repairs that keep your warranty intact." },
    { q: "Which Nespresso machines do you repair?", a: "Both Original and Vertuo pod machines, plus the Lattissima and Creatista milk machines. Ask if yours isn't listed." },
    { q: "My machine won't pump — is that fixable?", a: "Usually yes. It's often scale or an air-locked pump, which we can clear and service." },
    { q: "How much does a repair cost?", a: "We diagnose first and give you a clear price before any work starts — no surprises." },
    { q: "How long does it take?", a: "Many faults are diagnosed the same day; common jobs are usually back within the week." },
    { q: "My machine is out of warranty — can you still help?", a: "Yes, we repair in-warranty and out-of-warranty Nespresso machines." },
  ],

  meta: {
    title: "Nespresso Repairs Sydney | Authorised Nespresso Repairer — Adams Appliances",
    description: "Authorised Nespresso repairs in Sydney. Genuine parts, warranty-safe. Original & Vertuo pod machines, Lattissima & Creatista. Punchbowl workshop, same-day diagnosis.",
  },
};

// Registry — add new brands here.
export const brands = { delonghi, nespresso, kenwood, braun, sunbeam } as const;
export type BrandKey = keyof typeof brands;

// Shared metadata builder — consistent, canonical SEO tags on every page.
export function metadataFor(brand: BrandRepair): Metadata {
  const url = `${business.domain}/${brand.slug}`;
  return {
    title: brand.meta.title,
    description: brand.meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: brand.meta.title,
      description: brand.meta.description,
      url,
      siteName: business.name,
      type: "website",
      locale: "en_AU",
    },
    robots: { index: true, follow: true },
  };
}
