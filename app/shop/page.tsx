import type { Metadata } from "next";
import { business } from "../../lib/business";
import { getListings } from "../../lib/listings";
import ShopClient from "../../components/ShopClient";

export const metadata: Metadata = {
  title: "Shop | Factory Seconds & New Appliances — Adams Appliances",
  description: "Browse factory-second and new whitegoods, TVs and appliances in Sydney. Filter by category, brand, condition and price. Tested, warranty-backed — same appliance, significantly less.",
  alternates: { canonical: `${business.domain}/shop` },
};

export const revalidate = 300;

export default async function ShopPage() {
  const items = await getListings();
  return (
    <main>
      <section className="hero" style={{ paddingBottom: 6 }}>
        <div className="wrap">
          <div className="kicker">New &amp; factory seconds</div>
          <h1 className="h1">Shop</h1>
          <p className="sub">Save hundreds on whitegoods, TVs and appliances — all tested, all warranty-backed. Tap any item to reserve or enquire.</p>
        </div>
      </section>
      <ShopClient items={items} />
    </main>
  );
}
