import { business } from "../../lib/business";
import type { BrandRepair } from "../../lib/repair-brands";

const REVIEWS = [
  { q: "Adam and his son Ali diagnosed the problem in five minutes and had it working in ten. Old-school professionalism and manners.", by: "Tony Trad · Repair" },
  { q: "Handled professionally, promptly and with genuine care. Clear communication and a quick turnaround.", by: "Rhett Thomas · Service" },
  { q: "Amazing customer service. Ali went above and beyond — wouldn't go anywhere else.", by: "Rachel" },
];

function Seal() {
  return (
    <div className="sealbox">
      <svg className="seal" viewBox="0 0 200 200" aria-hidden="true">
        <circle className="sealc" cx="100" cy="100" r="90" />
        <circle className="sealr" cx="100" cy="100" r="90" />
        <circle className="sealr2" cx="100" cy="100" r="74" />
        <path className="sealchk" d="M74 100 l16 17 l34 -40" />
        <text className="sealt" x="100" y="150">Manufacturer</text>
        <text className="sealt" x="100" y="164">Authorised</text>
      </svg>
    </div>
  );
}

function WaButton({ href }: { href: string }) {
  return (
    <a className="btn wa" href={href} target="_blank" rel="noopener noreferrer">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20z" />
      </svg>
      WhatsApp us
    </a>
  );
}

const Chev = () => (
  <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
);

export default function RepairPageTemplate({ brand }: { brand: BrandRepair }) {
  const waMsg = `Hi Adams, I'd like to book a ${brand.name} repair. My ${brand.applianceType} is [model] and the issue is [describe].`;
  const waHref = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(waMsg)}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: brand.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* hero */}
      <section className="hero">
        <div className="wrap">
          <div className="herogrid">
            <div>
              <div className="kicker">{brand.heroKicker}</div>
              <h1 className="h1">{brand.name}<br /><span>repairs, Sydney.</span></h1>
              <p className="sub">{brand.heroLede}</p>
              <div className="btns">
                <a className="btn p" href={business.phoneTel}>Call {business.phoneDisplay}</a>
                <WaButton href={waHref} />
              </div>
              <div className="trust">
                <span><b>{brand.name}</b> authorised</span>
                <span><b>{business.reviewRating.toFixed(1)}★</b> Google</span>
                <span><b>{business.reviewCount}+</b> reviews</span>
                <span>AS/NZS safety</span>
              </div>
            </div>
            <Seal />
          </div>
        </div>
      </section>

      {/* why authorised */}
      <section className="sec">
        <div className="wrap">
          <div className="eye">Why authorised matters</div>
          <h2 className="h2">An authorised repair protects the machine you paid for</h2>
          <p className="lede">Anyone can open a {brand.applianceType}. Being a manufacturer-authorised {brand.name} repairer means Adams does it the way {brand.name} intends — with the right parts and your warranty intact.</p>
          <div className="proof">
            {brand.authorisedPoints.map((p, i) => (
              <div className="pcard" key={i}><div className="n">0{i + 1}</div><h3>{p.title}</h3><p>{p.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* problems */}
      <section className="sec alt">
        <div className="wrap">
          <div className="eye">Common faults</div>
          <h2 className="h2">{brand.name} problems we fix</h2>
          <p className="lede">If your {brand.applianceType} is doing one of these, it&rsquo;s almost certainly repairable. Bring it in and we&rsquo;ll tell you honestly what&rsquo;s worth doing.</p>
          <div className="probs">
            {brand.problems.map((p, i) => (
              <div className="prob" key={i}><h3>{p.title}</h3><p>{p.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* ranges */}
      <section className="sec">
        <div className="wrap">
          <div className="eye">The range</div>
          <h2 className="h2">{brand.name} machines we service</h2>
          <div className="chips" style={{ marginBottom: 8 }}>
            {brand.ranges.map((r) => <span className="chip" key={r}>{r}</span>)}
          </div>
          <div className="scope">{brand.rangesNote} We repair coffee &amp; small appliances only.</div>
        </div>
      </section>

      {/* how it works */}
      <section className="sec alt">
        <div className="wrap">
          <div className="eye">How it works</div>
          <h2 className="h2">Three steps, no mystery</h2>
          <div className="steps">
            <div className="step"><div className="stepn">01</div><h3>Drop in or call</h3><p>Bring your {brand.name} to {business.street}, {business.suburb}, or call first so we have the right parts ready.</p></div>
            <div className="step"><div className="stepn">02</div><h3>Same-day diagnosis</h3><p>We find the fault and give you a clear price before any work starts. No charge for honest advice.</p></div>
            <div className="step"><div className="stepn">03</div><h3>Genuine-parts repair</h3><p>We fix it with genuine {brand.name} parts, test it, and hand back a machine that runs like new.</p></div>
          </div>
        </div>
      </section>

      {/* reviews */}
      <section className="sec">
        <div className="wrap">
          <div className="eye">Customer reviews</div>
          <h2 className="h2">Sydney trusts Adams</h2>
          <div className="revs">
            {REVIEWS.map((r, i) => (
              <div className="rev" key={i}><p>&ldquo;{r.q}&rdquo;</p><div className="by">{r.by}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="sec alt">
        <div className="wrap">
          <div className="eye">Questions</div>
          <h2 className="h2">{brand.name} repairs — the honest answers</h2>
          <div className="acc">
            {brand.faqs.map((f, i) => (
              <details key={i} open={i === 0}>
                <summary>{f.q}<Chev /></summary>
                <div className="body"><p>{f.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* cta band */}
      <section className="sec">
        <div className="wrap">
          <div className="band center">
            <h2>Trust it to the authorised {brand.name} specialist</h2>
            <p>Same-day diagnosis, genuine parts, over 20 years serving Sydney. Call the store or send us the details on WhatsApp.</p>
            <div className="row">
              <a className="btn" style={{ background: "#fff", color: "var(--blue-deep)" }} href={business.phoneTel}>Call {business.phoneDisplay}</a>
              <WaButton href={waHref} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
