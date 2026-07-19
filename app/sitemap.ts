import type { MetadataRoute } from "next";
import { business } from "../lib/business";
import { brands } from "../lib/repair-brands";
import { getListings } from "../lib/listings";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = business.domain;
  const now = new Date();

  const staticRoutes = [
    "", "/factory-seconds", "/shop", "/what-is-a-factory-second",
    "/coffee-machine-repairs-sydney", "/repair-process",
  ].map((path) => ({ url: `${base}${path}`, lastModified: now, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.8 }));

  const repairRoutes = Object.values(brands).map((b) => ({
    url: `${base}/${b.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9,
  }));

  const products = await getListings();
  const productRoutes = products.map((p) => ({
    url: `${base}/product/${p.id}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6,
  }));

  return [...staticRoutes, ...repairRoutes, ...productRoutes];
}
