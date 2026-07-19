// app/kenwood-repairs-sydney/page.tsx
import RepairPageTemplate from "../_repairs/RepairPageTemplate";
import { metadataFor, kenwood } from "../../lib/repair-brands";

export const metadata = metadataFor(kenwood);
export const revalidate = 3600;

export default function Page() {
  return <RepairPageTemplate brand={kenwood} />;
}
