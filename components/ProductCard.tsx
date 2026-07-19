import Link from "next/link";
import { Listing, priceAUD } from "../lib/listings";
import ApplianceGlyph from "./ApplianceGlyph";

export function ProductCard({ item }: { item: Listing }) {
  return (
    <Link href={`/product/${item.id}`} className="card" style={item.reserved ? { opacity: 0.6 } : undefined}>
      <div className="cimg">
        <span className={`ctag ${item.condition === "New" ? "nw" : ""}`}>{item.reserved ? "Reserved" : item.condition}</span>
        {item.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.images[0]} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <ApplianceGlyph category={item.category} style={{ width: 58, height: 58 }} />
        )}
      </div>
      <div className="cbody">
        <div className="ckick">{item.brand} · {item.category}</div>
        <div className="ctitle">{item.title}</div>
        <div className="prow">
          <span className="price">{priceAUD(item.price)}</span>
          {item.wasPrice ? <span className="was">{priceAUD(item.wasPrice)}</span> : null}
        </div>
      </div>
    </Link>
  );
}

export function ProductGrid({ items }: { items: Listing[] }) {
  return <div className="cards">{items.map((item) => <ProductCard key={item.id} item={item} />)}</div>;
}
