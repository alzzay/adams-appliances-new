// app/delonghi-repairs-sydney/page.tsx
//
// This is the whole page. Everything lives in the template + config, so this
// file is deliberately tiny — which is exactly what makes it clonable.
//
// TO CLONE FOR ANOTHER BRAND:
//   1. Copy this folder → app/kenwood-repairs-sydney/  (see the example alongside)
//   2. Swap `delonghi` for the brand key in both the import and the two uses.
//   3. Fill that brand's config in lib/repair-brands.ts.

import RepairPageTemplate from "../_repairs/RepairPageTemplate";
import { metadataFor, delonghi } from "../../lib/repair-brands";

export const metadata = metadataFor(delonghi);

// Static + revalidate: page is prebuilt for SEO/speed, refreshes hourly.
export const revalidate = 3600;

export default function Page() {
  return <RepairPageTemplate brand={delonghi} />;
}
