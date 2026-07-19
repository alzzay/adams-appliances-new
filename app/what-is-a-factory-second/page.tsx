import type { Metadata } from "next";
import Link from "next/link";
import { business } from "../../lib/business";

export const metadata: Metadata = {
  title: "What Is a Factory Second? | Adams Appliances",
  description: "A factory second is an appliance with a minor cosmetic mark — fully functional, tested and warranty-backed. Same appliance, significantly less. Here's how it works.",
  alternates: { canonical: `${business.domain}/what-is-a-factory-second` },
};

const FAQS = [
  { q: "Are factory seconds safe?", a: "Yes. Factory seconds sold in NSW must meet electrical safety standards, and before resale they're inspected, tested and tagged. The imperfection is cosmetic, not electrical." },
  { q: "Do they come with a warranty?", a: "Factory seconds typically carry a manufacturer's warranty, though terms vary by product. Ask us about the item you're interested in and we'll tell you exactly what it comes with." },
  { q: "What's the difference between new and factory second?", a: "New appliances are retail-ready with no marks. Factory seconds have a minor cosmetic mark but are fully functional and unused. Both perform the same." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Page() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="hero">
        <div className="wrap">
          <div className="kicker">Buy smarter</div>
          <h1 className="h1">What is a<br /><span>factory second?</span></h1>
          <p className="sub">Same appliance. Significantly less. The only difference is a mark you&rsquo;ll probably never notice.</p>
          <div className="btns"><Link className="btn p" href="/shop">Shop factory seconds</Link></div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap" style={{ maxWidth: "44em" }}>
          <p style={{ fontSize: "1.12rem", lineHeight: 1.7, marginBottom: 20 }}>A factory second is an appliance with a small cosmetic imperfection — a minor scratch, dent or mark that happened during manufacturing or transport. Everything else is exactly as it left the manufacturer: fully functional, unused, and tested before it&rsquo;s sold. Because of that one cosmetic mark, it&rsquo;s often hundreds of dollars cheaper than the same model at full retail.</p>
          <p style={{ fontSize: "1.12rem", lineHeight: 1.7 }}>In other words, you&rsquo;re paying for the appliance, not the packaging. For most people the mark ends up against a wall or under a benchtop where nobody ever sees it — and the savings stay in your pocket.</p>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <div className="eye">The details</div>
          <h2 className="h2">Honest answers</h2>
          <div className="acc" style={{ maxWidth: 820 }}>
            {FAQS.map((f, i) => (
              <details key={i} open={i === 0}><summary>{f.q}<svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg></summary><div className="body"><p>{f.a}</p></div></details>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="band center">
            <h2>Same appliance. Significantly less.</h2>
            <p>See what&rsquo;s in stock right now, or come have a look in store at {business.suburb}.</p>
            <div className="row">
              <Link className="btn" style={{ background: "#fff", color: "var(--blue-deep)" }} href="/shop">Browse the catalogue</Link>
              <a className="btn" style={{ border: "1px solid rgba(255,255,255,.4)", color: "#fff" }} href={business.phoneTel}>Call {business.phoneDisplay}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
