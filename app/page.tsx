import Link from "next/link";
import { business } from "../lib/business";
import { getListings } from "../lib/listings";
import { ProductGrid } from "../components/ProductCard";

export const revalidate = 300;

function andList(items: string[]) {
  if (items.length <= 1) return items.join("");
  return items.slice(0, -1).join(", ") + " & " + items[items.length - 1];
}

const waHref = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent("Hi Adams, I'd like to enquire about an appliance / repair.")}`;

const FEATURES = [
  { h: `${business.reviewRating.toFixed(1)}★ rated`, p: `${business.reviewCount}+ five-star Google reviews. People who find a shop they trust tell everyone.` },
  { h: "Factory-second savings", p: "Same appliance, significantly less. The only difference is a mark you'll likely never see." },
  { h: "New brands too", p: "Latest models from Samsung, Electrolux, Westinghouse, AEG and more — always in stock." },
  { h: "Family-run, local", p: `Serving Sydney since ${business.foundingYear}. Not a chain — people who know appliances.` },
];

const FAQS = [
  { q: "What is a factory second?", a: "An appliance with a small cosmetic mark — a minor scratch or dent — but fully functional, unused and tested before sale. Same appliance, often hundreds cheaper than retail." },
  { q: "What are your trading hours?", a: "Mon–Fri 9am–5pm and Sat 9am–2pm. Closed Sundays and public holidays. Call to check before you visit." },
  { q: "Do you deliver?", a: "Yes, across Sydney through our local courier partner. Fees vary by suburb — give us a call or ask in store." },
  { q: "Do you repair appliances?", a: "Yes. As an authorised repair agent we specialise in De'Longhi, Kenwood, Braun, Sunbeam and Nespresso coffee and small kitchen appliances. We do not repair fridges, ovens, cooktops, washing machines or dryers." },
];

export default async function Home() {
  const listings = await getListings();
  const latest = listings.filter((l) => !l.reserved).slice(0, 4);
  const reviews = business.reviews.slice(0, 3);

  return (
    <main>
      {/* hero */}
      <section className="hero">
        <div className="wrap">
          <div className="kicker">Est {business.foundingYear} · {business.suburb}, Sydney</div>
          <h1 className="h1">Smarter to buy.<br /><span>Trusted to fix.</span></h1>
          <p className="sub">Factory-second whitegoods, TVs and appliances at prices that make sense — plus authorised coffee-machine repairs Sydney actually trusts. One family-run shop, two ways we save you money.</p>
          <div className="btns">
            <Link className="btn p" href="/shop">Shop factory seconds</Link>
            <Link className="btn s" href="/coffee-machine-repairs-sydney">Book a repair</Link>
          </div>
          <div className="trust"><span><b>{business.reviewRating.toFixed(1)}★</b> Google rating</span><span><b>{business.reviewCount}+</b> reviews</span><span>Authorised repairer</span><span>Family-run since {business.foundingYear}</span></div>
        </div>
      </section>

      {/* latest stock */}
      <section className="sec alt">
        <div className="wrap">
          <div className="sechd"><div><div className="eye">In stock now</div><h2 className="h2">Latest factory seconds</h2></div><Link className="viewall" href="/shop">View all stock →</Link></div>
          <ProductGrid items={latest} />
        </div>
      </section>

      {/* why adams */}
      <section className="sec">
        <div className="wrap">
          <div className="eye">Why Adams</div>
          <h2 className="h2" style={{ marginBottom: 24 }}>Why Sydney families trust us</h2>
          <div className="feats">
            {FEATURES.map((f) => (<div className="feat" key={f.h}><h3>{f.h}</h3><p>{f.p}</p></div>))}
          </div>
        </div>
      </section>

      {/* repairs band */}
      <section className="sec alt">
        <div className="wrap">
          <div className="band">
            <div className="eye">Authorised repairs</div>
            <h2>The machines you rely on, fixed right</h2>
            <p>Manufacturer-authorised for {andList(business.authorisedBrands)}. Genuine parts, warranty-safe, most faults diagnosed the same day.</p>
            <div className="chips">{business.authorisedBrands.map((b) => <span className="chip" key={b}>{b}</span>)}</div>
            <Link className="btn p" style={{ marginTop: 22, position: "relative" }} href="/coffee-machine-repairs-sydney">See repair services</Link>
          </div>
        </div>
      </section>

      {/* brands we work with */}
      <section className="sec">
        <div className="wrap">
          <div className="eye">Brands we work with</div>
          <h2 className="h2">The names you know, in-store</h2>
          <p className="lede">We stock, sell and service a huge range of trusted appliance brands.</p>
          <div className="brandwall">{business.stockedBrands.map((b) => <span className="bchip" key={b}>{b}</span>)}</div>
          <p className="note"><b>Manufacturer-authorised for repairs:</b> {andList(business.authorisedBrands)}.</p>
        </div>
      </section>

      {/* authorised & approved */}
      <section className="sec alt">
        <div className="wrap">
          <div className="eye">Trusted &amp; approved</div>
          <h2 className="h2">Authorised &amp; approved</h2>
          <div className="approved">
            <div className="acol"><h3>Manufacturer-authorised repairs</h3><p>Factory-authorised repairer with genuine parts and warranty-safe service for:</p><div className="lst">{business.authorisedBrands.map((b) => <span key={b}>{b}</span>)}</div></div>
            <div className="acol"><h3>Extended-warranty service agent</h3><p>We carry out extended-warranty repairs on behalf of major retailers:</p><div className="lst">{business.extendedWarrantyPartners.map((b) => <span key={b}>{b}</span>)}</div></div>
          </div>
        </div>
      </section>

      {/* reviews */}
      <section className="sec" id="reviews">
        <div className="wrap">
          <div className="eye">Customer reviews</div>
          <h2 className="h2">{business.reviewRating.toFixed(1)} <span className="stars">★★★★★</span> from {business.reviewCount}+ reviews</h2>
          <div className="revs">
            {reviews.map((r, i) => (<div className="rev" key={i}><p>&ldquo;{r.quote}&rdquo;</p><div className="by">{r.author}{r.context ? ` · ${r.context}` : ""}</div></div>))}
          </div>
        </div>
      </section>

      {/* find us */}
      <section className="sec alt" id="find-us">
        <div className="wrap">
          <div className="eye">Visit us</div>
          <h2 className="h2" style={{ marginBottom: 24 }}>Find Adams Appliances</h2>
          <div className="finds">
            <div className="fcard"><h3>Address</h3><address>{business.street}<br />{business.suburb} {business.state} {business.postcode}</address><p style={{ marginTop: 12 }}><a style={{ color: "var(--blue)", fontWeight: 700 }} href={`https://maps.google.com/?q=${encodeURIComponent(`${business.street} ${business.suburb} ${business.state} ${business.postcode}`)}`} target="_blank" rel="noopener noreferrer">Get directions →</a></p></div>
            <div className="fcard"><h3>Phone</h3><p style={{ fontSize: "1.15rem", fontWeight: 700 }}><a href={business.phoneTel}>{business.phoneDisplay}</a></p><p style={{ color: "var(--muted)", fontSize: ".9rem", marginTop: 6 }}>Call us during trading hours.</p></div>
            <div className="fcard"><h3>Trading hours</h3><ul className="hours">{business.hours.map((h) => (<li key={h.days}><span>{h.days}</span><span>{h.time}</span></li>))}</ul></div>
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="sec">
        <div className="wrap">
          <div className="eye">FAQ</div>
          <h2 className="h2" style={{ marginBottom: 20 }}>Frequently asked</h2>
          <div className="acc">
            {FAQS.map((f, i) => (
              <details key={i} open={i === 0}>
                <summary>{f.q}<svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg></summary>
                <div className="body"><p>{f.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* final cta */}
      <section className="sec">
        <div className="wrap">
          <div className="band center">
            <h2>Smart choices. Reliable repairs.</h2>
            <p>Visit us in store at {business.suburb} or give us a call — we&rsquo;ll take care of you.</p>
            <div className="row">
              <a className="btn" style={{ background: "#fff", color: "var(--blue-deep)" }} href={business.phoneTel}>Call {business.phoneDisplay}</a>
              <Link className="btn" style={{ border: "1px solid rgba(255,255,255,.4)", color: "#fff" }} href="/shop">Shop factory seconds</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
