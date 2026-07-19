import Link from "next/link";
import { business } from "../lib/business";

function andList(items: readonly string[]) {
  if (items.length <= 1) return items.join("");
  return items.slice(0, -1).join(", ") + " & " + items[items.length - 1];
}

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="grid">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/adams-logo-ondark.png" alt="Adams Appliances" width={150} height={99} />
            <p className="fp">
              Sydney&rsquo;s trusted appliance store since {business.foundingYear}. New &amp; factory-second whitegoods,
              TVs and appliances at honest prices &mdash; plus authorised coffee &amp; small-appliance repairs.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link href="/shop">Shop all</Link>
            <Link href="/factory-seconds">Factory seconds</Link>
            <Link href="/what-is-a-factory-second">What is a factory second?</Link>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact &amp; find us</Link>
          </div>
          <div>
            <h4>Repairs</h4>
            <Link href="/coffee-machine-repairs-sydney">Coffee machine repairs</Link>
            <Link href="/delonghi-repairs-sydney">De&rsquo;Longhi</Link>
            <Link href="/nespresso-repairs-sydney">Nespresso</Link>
            <Link href="/kenwood-repairs-sydney">Kenwood</Link>
            <Link href="/braun-repairs-sydney">Braun</Link>
            <Link href="/sunbeam-repairs-sydney">Sunbeam</Link>
          </div>
        </div>
        <div className="bottom">
          All brand names and logos are the property of their respective owners and their use does not imply
          affiliation or endorsement. Adams Appliances is a manufacturer-authorised repairer for {andList(business.authorisedBrands)}.
          &copy; {year} {business.name} &middot; {business.street}, {business.suburb} {business.state} {business.postcode} &middot; {business.phoneDisplay}
        </div>
      </div>
    </footer>
  );
}
