import RepairPageTemplate from "../_repairs/RepairPageTemplate";
import { metadataFor, nespresso } from "../../lib/repair-brands";

export const metadata = metadataFor(nespresso);
export const revalidate = 3600;

export default function Page() {
  return <RepairPageTemplate brand={nespresso} />;
}
