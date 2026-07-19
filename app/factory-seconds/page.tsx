import type { Metadata } from "next";
import Link from "next/link";
import { business } from "../../lib/business";
import { getListings } from "../../lib/listings";
import { ProductGrid } from "../../components/ProductCard";

export const metadata: Metadata = {
  title: "Factory Seconds Sydney | Whitegoods & Appliances — Adams Appliances",
  description: "Factory-second whitegoods, TVs and appliances in Sydney at unbeatable prices. Tested, tagged and warranty-backed. Same appliance, significantly less. Punchbowl.",
  alternates: { canonical: `${business.domain}/factory-seconds` },
};

export const revalidate = 300;

export default async function Page() {
  const items = (await getListings()).filter((l) => l.condition === "Factory Second" && !l.reserved).slice(0, 8);
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div className="kicker">Factory seconds · Sydney</div>
          <h1 className="h1">Same appliance.<br /><span>Significantly less.</span></h1>
          <p className="sub">Factory-second whitegoods, TVs and appliances — the same brands the big retailers sell, minus the markup. All tested, tagged and warranty-backed.</p>
          <div className="btns"><Link className="btn p" href="/shop">Shop all stock</Link><Link className="btn s" href="/what-is-a-factory-second">What is a factory second?</Link></div>
        </div>
      </section>
      <section className="sec alt">
        <div className="wrap">
          <div className="sechd"><div><div className="eye">In stock now</div><h2 className="h2">Latest factory seconds</h2></div><Link className="viewall" href="/shop">View all →</Link></div>
          <ProductGrid items={items} />
        </div>
      </section>
    </main>
  );
}
