import type { Metadata } from "next";
import Script from "next/script";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { business } from "../lib/business";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AlexWidget from "../components/AlexWidget";
import "./globals.css";

const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(business.domain),
  title: {
    default: "Adams Appliances | Sydney's Trusted Appliance Store & Authorised Repairer",
    template: "%s | Adams Appliances",
  },
  description:
    "New whitegoods, TVs and factory second appliances at unbeatable prices in Sydney, plus authorised coffee machine repairs for De'Longhi, Kenwood, Braun, Sunbeam & Nespresso. 5.0★ from 284+ Google reviews.",
  keywords: [
    "factory seconds sydney", "whitegoods sydney", "appliances sydney",
    "coffee machine repairs sydney", "delonghi repairs sydney", "nespresso repairs sydney", "authorised appliance repairer",
  ],
  alternates: { canonical: business.domain },
  openGraph: {
    title: "Adams Appliances | Sydney's Trusted Appliance Store",
    description:
      "New and factory second appliances at honest prices, plus authorised coffee machine repairs. 5.0★, 284+ Google reviews. Punchbowl, Sydney.",
    url: business.domain,
    siteName: business.name,
    locale: "en_AU",
    type: "website",
  },
  robots: { index: true, follow: true },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const THEME_INIT = `(function(){try{var t=localStorage.getItem('adams-theme')||((window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

function OrgSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${business.domain}/#business`,
    name: business.name,
    url: business.domain,
    telephone: business.phoneDisplay,
    foundingDate: String(business.foundingYear),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street,
      addressLocality: business.suburb,
      addressRegion: business.state,
      postalCode: business.postcode,
      addressCountry: "AU",
    },
    areaServed: { "@type": "City", name: "Sydney" },
    sameAs: [business.facebookUrl, business.googleReviewsUrl].filter(Boolean),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.reviewRating,
      reviewCount: business.reviewCount,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <OrgSchema />
        <SiteHeader />
        {children}
        <SiteFooter />
        <AlexWidget />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
