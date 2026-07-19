import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { business } from "../../../lib/business";
import { getListing, getListings, priceAUD } from "../../../lib/listings";
import { ProductCard } from "../../../components/ProductCard";
import ApplianceGlyph from "../../../components/ApplianceGlyph";

export const revalidate = 300;

export async function generateStaticParams() {
  const all = await getListings();
  return all.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const item = await getListing(params.id);
  if (!item) return { title: "Item not found" };
  return {
    title: `${item.title} — ${item.condition}`,
    description: `${item.title} at Adams Appliances, ${business.suburb}. ${item.condition}, ${priceAUD(item.price)}. Reserve or enquire in store, by phone or WhatsApp.`,
    alternates: { canonical: `${business.domain}/product/${item.id}` },
  };
}

const Chev = () => (<svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>);
const Tick = () => (<svg className="tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>);

export default async function Page({ params }: { params: { id: string } }) {
  const item = await getListing(params.id);
  if (!item) notFound();

  const ref = `${item.title} — stock ID ${item.id}`;
  const msg = `Hi Adams, I'd like to reserve/enquire about: ${ref} (${priceAUD(item.price)}). Is it still available?`;
  const mailto = `mailto:${business.email}?subject=${encodeURIComponent(`Enquiry: ${item.title} (${item.id})`)}&body=${encodeURIComponent(msg)}`;
  const waHref = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(msg)}`;

  const save = item.wasPrice ? item.wasPrice - item.price : 0;
  const pct = item.wasPrice ? Math.round((save / item.wasPrice) * 100) : 0;

  const all = await getListings();
  const related = all.filter((l) => l.id !== item.id && !l.reserved);
  const alike = related.filter((l) => l.category === item.category).slice(0, 3);
  const goesWith = related.filter((l) => l.category !== item.category).slice(0, 3);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.title,
    brand: { "@type": "Brand", name: item.brand },
    category: item.category,
    itemCondition: item.condition === "New" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
    description: item.description,
    offers: { "@type": "Offer", price: item.price, priceCurrency: "AUD", availability: item.reserved ? "https://schema.org/OutOfStock" : "https://schema.org/InStock" },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <div className="wrap"><div className="crumb"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / {item.category} / {item.title}</div></div>

      <div className="wrap">
        <div className="pgrid">
          {/* gallery */}
          <div>
            <div className="plarge">
              <span className="ctag">{item.reserved ? "Reserved" : item.condition}</span>
              {item.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.images[0]} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 16 }} />
              ) : (
                <><ApplianceGlyph category={item.category} style={{ width: 120, height: 120 }} /><span className="photonote">Photo coming soon</span></>
              )}
            </div>
          </div>

          {/* details */}
          <div>
            <div className="pk">{item.brand} · {item.category}</div>
            <h1 className="ph1">{item.title}</h1>
            <div className="badges"><span className="badge fs">{item.condition}</span><span className="badge tag">Tested &amp; tagged</span><span className="badge tag">Warranty</span></div>
            <div className="pricebox"><span className="bigprice">{priceAUD(item.price)}</span>{item.wasPrice ? <span className="bigwas">{priceAUD(item.wasPrice)}</span> : null}</div>
            {save > 0 && <span className="save">You save {priceAUD(save)} ({pct}%)</span>}
            <p className="pdesc">{item.description}</p>

            {item.reserved ? (
              <p className="ref" style={{ fontWeight: 700, color: "var(--text)" }}>This item is currently reserved. Call us to check availability or ask about similar stock.</p>
            ) : (
              <>
                <div className="buyrow">
                  <a className="b wa" href={waHref} target="_blank" rel="noopener noreferrer">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20z" /></svg>
                    Reserve on WhatsApp
                  </a>
                  <a className="b call" href={business.phoneTel}>Call the store</a>
                  <a className="b email" href={mailto}>Email us</a>
                </div>
                <p className="ref">Reserving quotes stock ID <b>{item.id}</b> so we know the exact unit. No online payment — reserve it and collect in store at {business.suburb}.</p>
              </>
            )}

            <ul className="trustlist">
              <li><Tick /><span>Tested and tagged to AS/NZS electrical safety standards before sale.</span></li>
              <li><Tick /><span>Backed by manufacturer warranty — ask us for the exact terms on this unit.</span></li>
              <li><Tick /><span>Local Sydney delivery available, or collect in store — just ask.</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* accordions */}
      <div className="wrap" style={{ paddingTop: 26, paddingBottom: 8 }}>
        <div className="acc">
          <details open><summary>Description<Chev /></summary><div className="body"><p>{item.description}</p></div></details>
          <details><summary>Specifications<Chev /></summary><div className="body">
            <div className="spec"><span>Brand</span><span>{item.brand}</span></div>
            <div className="spec"><span>Model / stock ID</span><span>{item.id}</span></div>
            <div className="spec"><span>Category</span><span>{item.category}</span></div>
            <div className="spec"><span>Condition</span><span>{item.condition}</span></div>
            <div className="spec"><span>Price</span><span>{priceAUD(item.price)}</span></div>
          </div></details>
          <details><summary>What&rsquo;s a factory second?<Chev /></summary><div className="body"><p>An appliance with a small cosmetic mark — a minor scratch or dent — but fully functional, unused and tested before sale. The mark usually ends up out of sight, and the savings stay in your pocket. Everything else is exactly as it left the manufacturer.</p></div></details>
          <details><summary>Reviews<Chev /></summary><div className="body">
            <p><span className="stars">★★★★★</span> <strong style={{ color: "var(--text)" }}>{business.reviewRating.toFixed(1)}</strong> from {business.reviewCount}+ Google reviews</p>
            <p>&ldquo;Great prices on quality appliances and genuinely helpful in store. Wouldn&rsquo;t shop anywhere else for whitegoods.&rdquo; — Rachel</p>
          </div></details>
          <details><summary>Frequently asked<Chev /></summary><div className="body">
            <div className="qa"><div className="q">Is the cosmetic mark noticeable?</div>It&rsquo;s minor — ask us and we&rsquo;ll tell you exactly where it is on this unit, or come see it in store.</div>
            <div className="qa"><div className="q">Does it come with warranty?</div>Yes — ask us for the exact terms on this unit.</div>
            <div className="qa"><div className="q">Can you deliver it?</div>Yes — local Sydney delivery, or collect in store at {business.suburb}.</div>
          </div></details>
        </div>
      </div>

      {goesWith.length > 0 && (
        <section className="sec" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="wrap"><h2 className="h2">Goes well with</h2><div className="simcards">{goesWith.map((l) => <ProductCard key={l.id} item={l} />)}</div></div>
        </section>
      )}
      {alike.length > 0 && (
        <section className="sec" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="wrap"><h2 className="h2">You might also like</h2><div className="simcards">{alike.map((l) => <ProductCard key={l.id} item={l} />)}</div></div>
        </section>
      )}
    </main>
  );
}
