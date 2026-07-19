import type { Metadata } from "next";
import Link from "next/link";
import { business } from "../../lib/business";
import { brands } from "../../lib/repair-brands";

export const metadata: Metadata = {
  title: "Coffee Machine Repairs Sydney | Authorised De'Longhi, Nespresso, Kenwood, Braun & Sunbeam",
  description:
    "Authorised coffee machine & small appliance repairs in Sydney. Genuine parts, warranty-safe, factory-trained. De'Longhi, Nespresso, Kenwood, Braun & Sunbeam. Same-day diagnosis at Punchbowl.",
  alternates: { canonical: `${business.domain}/coffee-machine-repairs-sydney` },
};

const blurb: Record<string, string> = {
  delonghi: "Coffee machines — our biggest line",
  nespresso: "Original & Vertuo pod machines",
  kenwood: "Chef, Cooking Chef, kMix & food processors",
  braun: "MultiQuick blenders & food processors",
  sunbeam: "Mixmaster mixers & Café Series coffee",
};

const waHref = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
  "Hi Adams, I'd like to book a repair. My machine is [brand/model] and the issue is [describe]."
)}`;

const REVIEWS = [
  { q: "Referred by De'Longhi for a warranty assessment. Knowledgeable, professional and fast from start to finish.", by: "Yvonne Thompson · De'Longhi" },
  { q: "Adam and his son Ali diagnosed the problem in five minutes and had it working in ten. Old-school professionalism.", by: "Tony Trad · Repair" },
  { q: "De'Longhi recommended Adams. Ali was courteous and knowledgeable, and the issue was resolved within two hours.", by: "Cathy Spatino · Service" },
];

export default function Page() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div className="herogrid">
            <div>
              <div className="kicker">Manufacturer-authorised · Punchbowl, Sydney</div>
              <h1 className="h1">Coffee machine<br /><span>repairs, Sydney.</span></h1>
              <p className="sub">The machines you rely on, fixed right. Adams is a manufacturer-authorised repairer trusted by the brands themselves — genuine parts, warranty-safe, and most faults diagnosed the same day.</p>
              <div className="btns">
                <a className="btn p" href={business.phoneTel}>Call {business.phoneDisplay}</a>
                <a className="btn wa" href={waHref} target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20z" /></svg>
                  WhatsApp us
                </a>
              </div>
              <div className="trust"><span>Authorised repairer</span><span><b>{business.reviewRating.toFixed(1)}★</b> Google</span><span><b>{business.reviewCount}+</b> reviews</span><span>Since {business.foundingYear}</span></div>
            </div>
            <div className="sealbox">
              <svg className="seal" viewBox="0 0 200 200" aria-hidden="true">
                <circle className="sealc" cx="100" cy="100" r="90" /><circle className="sealr" cx="100" cy="100" r="90" /><circle className="sealr2" cx="100" cy="100" r="74" /><path className="sealchk" d="M74 100 l16 17 l34 -40" /><text className="sealt" x="100" y="150">Manufacturer</text><text className="sealt" x="100" y="164">Authorised</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="eye">By brand</div>
          <h2 className="h2">Choose your brand</h2>
          <p className="lede">We&rsquo;re authorised for the brands below — genuine parts, warranty-safe, factory-trained. Tap yours to see faults we fix and machines we service.</p>
          <div className="bcards">
            {Object.values(brands).map((b) => (
              <Link className="bcard" key={b.slug} href={`/${b.slug}`}>
                <b>{b.name}</b><span>{blurb[b.slug.split("-")[0]] ?? b.applianceTypePlural}</span>
              </Link>
            ))}
          </div>
          <div className="scope">We repair coffee and small kitchen appliances only — not fridges, ovens, cooktops, washing machines or dryers.</div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <div className="eye">How it works</div>
          <h2 className="h2">Three steps, no mystery</h2>
          <div className="steps">
            <div className="step"><div className="stepn">01</div><h3>Drop in or call</h3><p>Bring your machine to {business.street}, {business.suburb}, or call first so we have the right parts ready.</p></div>
            <div className="step"><div className="stepn">02</div><h3>Same-day diagnosis</h3><p>We find the fault, usually the same day, and give you a clear price before any work starts.</p></div>
            <div className="step"><div className="stepn">03</div><h3>Genuine-parts repair</h3><p>We fix it with genuine parts, test it, and keep your manufacturer warranty intact.</p></div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="eye">Customer reviews</div>
          <h2 className="h2">Trusted with expensive machines</h2>
          <div className="revs">
            {REVIEWS.map((r, i) => (<div className="rev" key={i}><p>&ldquo;{r.q}&rdquo;</p><div className="by">{r.by}</div></div>))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="band center">
            <h2>Trusted with the machines that matter</h2>
            <p>Manufacturer-authorised, genuine parts, same-day diagnosis. Call the store or send us the details on WhatsApp.</p>
            <div className="row">
              <a className="btn" style={{ background: "#fff", color: "var(--blue-deep)" }} href={business.phoneTel}>Call {business.phoneDisplay}</a>
              <a className="btn wa" href={waHref} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
