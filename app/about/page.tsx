import type { Metadata } from "next";
import Link from "next/link";
import { business } from "../../lib/business";

export const metadata: Metadata = {
  title: "About Adams Appliances | Family-run in Sydney since 2000",
  description: "Adams Appliances has been family-run since 2000 — Bankstown to Kingsgrove to Punchbowl. New & factory-second appliances plus authorised repairs. Honest prices, genuine expertise, 5.0★.",
  alternates: { canonical: `${business.domain}/about` },
};

export default function AboutPage() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div className="kicker">Family-run · Serving Sydney · Since {business.foundingYear}</div>
          <h1 className="h1">The Adams<br /><span>story.</span></h1>
          <p className="sub">Two things we&rsquo;ve always believed: nobody should overpay for a good appliance, and nobody should hand an expensive machine to someone they can&rsquo;t trust. That&rsquo;s kept Sydney coming back to us for over 20 years.</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="story">
            <p className="first">Adams Appliances opened its doors in Sydney back in {business.foundingYear}. Over the years we&rsquo;ve grown and moved along with our customers — starting out in Bankstown, then Kingsgrove, and today trading from our home in {business.suburb} — but the way we do things has never changed: treat people fairly and do the job properly.</p>
            <p>That idea grew into the two things we do best. On one side, new and factory-second whitegoods, TVs and appliances — the same brands the big retailers sell, without the markup. A factory second is just an appliance with a small cosmetic mark; everything else is exactly as it left the manufacturer. Same appliance, significantly less.</p>
            <p>On the other side, repairs. As a manufacturer-authorised repairer for De&rsquo;Longhi, Kenwood, Braun, Sunbeam and Nespresso, we fix the coffee machines and kitchen appliances people rely on — with genuine parts, done right, warranty intact. Over the years that&rsquo;s earned us something we&rsquo;re genuinely proud of: a {business.reviewRating.toFixed(1)}-star rating from more than {business.reviewCount} reviews, and customers the manufacturers themselves send our way.</p>
            <div className="callout">We&rsquo;ve always tried to give back to the community that&rsquo;s backed us — from supporting the Hurstville Police Charity Ball in aid of the Children&rsquo;s Hospital at Westmead, to lending a hand to local schools like Regents Park Public. Small things, but they matter to us.</div>
            <p>Today you&rsquo;ll usually find Adam and his son Ali behind the counter. We&rsquo;re not a chain and we&rsquo;re not a faceless warehouse — we&rsquo;re the people who&rsquo;ll give you an honest answer, a fair price, and take the time to get it right. That&rsquo;s the whole story, and it always has been.</p>
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <div className="eye">What we stand for</div>
          <h2 className="h2">The way we do things</h2>
          <div className="proof">
            <div className="pcard"><div className="n">01</div><h3>Honest pricing</h3><p>No inflated tickets, no pressure. Fair prices on great appliances — and a straight answer on whether a repair&rsquo;s worth it.</p></div>
            <div className="pcard"><div className="n">02</div><h3>Genuine expertise</h3><p>Manufacturer-authorised repairs, decades of hands-on knowledge and genuine parts. We actually know these machines.</p></div>
            <div className="pcard"><div className="n">03</div><h3>Family service</h3><p>You&rsquo;ll deal with Adam or Ali, not a call centre. We treat every customer the way we&rsquo;d want to be treated.</p></div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="band">
            <div className="statstrip">
              <div className="stat"><b>{business.foundingYear}</b><span>Established</span></div>
              <div className="stat"><b>{business.reviewRating.toFixed(1)}★</b><span>Google rating</span></div>
              <div className="stat"><b>{business.reviewCount}+</b><span>Reviews</span></div>
              <div className="stat"><b>{business.authorisedBrands.length}</b><span>Brands authorised</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="band center">
            <h2>Come say hello</h2>
            <p>Pop into the store at {business.suburb} or give us a call — we&rsquo;ll look after you.</p>
            <div className="row">
              <a className="btn" style={{ background: "#fff", color: "var(--blue-deep)" }} href={business.phoneTel}>Call {business.phoneDisplay}</a>
              <Link className="btn" style={{ border: "1px solid rgba(255,255,255,.4)", color: "#fff" }} href="/contact">Find us</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
