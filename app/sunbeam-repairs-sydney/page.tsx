// app/sunbeam-repairs-sydney/page.tsx
import RepairPageTemplate from "../_repairs/RepairPageTemplate";
import { metadataFor, sunbeam } from "../../lib/repair-brands";

export const metadata = metadataFor(sunbeam);
export const revalidate = 3600;

export default function Page() {
  return <RepairPageTemplate brand={sunbeam} />;
}
