// app/braun-repairs-sydney/page.tsx
import RepairPageTemplate from "../_repairs/RepairPageTemplate";
import { metadataFor, braun } from "../../lib/repair-brands";

export const metadata = metadataFor(braun);
export const revalidate = 3600;

export default function Page() {
  return <RepairPageTemplate brand={braun} />;
}
