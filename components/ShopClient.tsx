"use client";

import { useMemo, useState } from "react";
import { Listing } from "../lib/listings";
import { ProductCard } from "./ProductCard";

const BANDS: { label: string; test: ((p: number) => boolean) | null }[] = [
  { label: "All prices", test: null },
  { label: "Under $500", test: (p) => p < 500 },
  { label: "$500 – $1,000", test: (p) => p >= 500 && p < 1000 },
  { label: "$1,000 – $2,000", test: (p) => p >= 1000 && p < 2000 },
  { label: "$2,000+", test: (p) => p >= 2000 },
];

export default function ShopClient({ items }: { items: Listing[] }) {
  const [cat, setCat] = useState("All");
  const [brand, setBrand] = useState("All");
  const [cond, setCond] = useState("All");
  const [band, setBand] = useState(0);
  const [sort, setSort] = useState("featured");

  const cats = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.category))).sort()], [items]);
  const brands = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.brand))).sort()], [items]);

  const filtered = useMemo(() => {
    const test = BANDS[band].test;
    let out = items.filter(
      (i) =>
        (cat === "All" || i.category === cat) &&
        (brand === "All" || i.brand === brand) &&
        (cond === "All" || i.condition === cond) &&
        (!test || test(i.price))
    );
    if (sort === "low") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "high") out = [...out].sort((a, b) => b.price - a.price);
    return out;
  }, [items, cat, brand, cond, band, sort]);

  const isDefault = cat === "All" && brand === "All" && cond === "All" && band === 0;

  return (
    <>
      <div className="filters">
        <div className="wrap">
          <div className="toolbar">
            <div className="count">{filtered.length} item{filtered.length === 1 ? "" : "s"}</div>
            <div className="sortwrap">
              <label htmlFor="sort">Sort</label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="frow"><span className="flabel">Category</span>{cats.map((c) => <button key={c} className={`fchip ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{c}</button>)}</div>
          <div className="frow"><span className="flabel">Brand</span>{brands.map((b) => <button key={b} className={`fchip ${brand === b ? "active" : ""}`} onClick={() => setBrand(b)}>{b}</button>)}</div>
          <div className="frow"><span className="flabel">Condition</span>{["All", "New", "Factory Second"].map((c) => <button key={c} className={`fchip ${cond === c ? "active" : ""}`} onClick={() => setCond(c)}>{c}</button>)}</div>
          <div className="frow"><span className="flabel">Price</span>{BANDS.map((b, i) => <button key={b.label} className={`fchip ${band === i ? "active" : ""}`} onClick={() => setBand(i)}>{b.label}</button>)}</div>
          {!isDefault && <button className="clear" onClick={() => { setCat("All"); setBrand("All"); setCond("All"); setBand(0); }}>× Clear all filters</button>}
        </div>
      </div>

      <div className="wrap">
        {filtered.length ? (
          <div className="cards">{filtered.map((i) => <ProductCard key={i.id} item={i} />)}</div>
        ) : (
          <div className="empty">Nothing matches those filters right now. Try clearing one, or call us — new stock arrives regularly.</div>
        )}
        <div style={{ height: 40 }} />
      </div>
    </>
  );
}
