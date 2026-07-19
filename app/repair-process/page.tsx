import type { Metadata } from "next";
import Link from "next/link";
import { business } from "../../lib/business";

export const metadata: Metadata = {
  title: "The Repair Process | Adams Appliances — Authorised Repairs Sydney",
  description:
    "How Adams Appliances repairs your coffee machine: same-day diagnosis, a clear quote before any work, genuine-parts repair, and honest advice. Walk in at Punchbowl or call first.",
  alternates: { canonical: `${business.domain}/repair-process` },
};

const steps = [
  { n: "01", title: "Drop in or call", body: `Bring your machine to ${business.street}, ${business.suburb} during trading hours, or call ${business.phoneDisplay} first so we can have the right parts ready. No appointment needed.` },
  { n: "02", title: "Same-day diagnosis", body: "We find the fault, usually the same day, and call you with a clear report and a quote before any work starts. There's no charge for honest advice on whether a repair is worth it." },
  { n: "03", title: "Genuine-parts repair", body: "As an authorised repairer we fix it with genuine parts, test it properly, and — where it applies — keep your manufacturer warranty intact." },
  { n: "04", title: "Pick up & enjoy", body: "Most common jobs are back with you within the week, many the same or next day. You collect a machine that runs like new." },
];

const heroStyle: React.CSSProperties = {
  background: "radial-gradient(120% 80% at 85% -10%, rgba(193,144,47,0.18), transparent 60%), var(--ink)",
  color: "#f4f0e8", paddingBlock: "clamp(52px, 8vw, 92px)",
};

export default function Page() {
  return (
    <main>
      <section style={heroStyle}>
        <div className="wrap">
          <span className="mono" style={{ color: "var(--brass-hi)", display: "block", marginBottom: 18 }}>The repair process</span>
          <h1 className="display" style={{ fontWeight: 800, fontSize: "clamp(2.3rem,6vw,3.6rem)", lineHeight: 1.02, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
            What to expect when you bring it in.
          </h1>
          <p style={{ color: "var(--ink-70)", fontSize: "1.1rem", maxWidth: "38em", margin: 0 }}>
            No mystery, no runaround. Here&apos;s exactly how a repair works at Adams.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div style={{ display: "grid", gap: "0", gridTemplateColumns: "1fr" }}>
            {steps.map((s) => (
              <div key={s.n} style={{ borderTop: "2px solid var(--ink)", padding: "28px 0", display: "grid", gap: "8px", gridTemplateColumns: "auto 1fr", alignItems: "start", columnGap: "26px" }}>
                <span className="mono" style={{ color: "var(--brass)", fontSize: "1.1rem", paddingTop: 2 }}>{s.n}</span>
                <div>
                  <h2 className="display" style={{ fontSize: "1.4rem", fontWeight: 800, margin: "0 0 6px" }}>{s.title}</h2>
                  <p style={{ margin: 0, color: "var(--slate)", maxWidth: "48em" }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 34, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href={business.phoneTel} className="btn btn-primary">Call {business.phoneDisplay}</a>
            <Link href="/coffee-machine-repairs-sydney" className="btn btn-ghost-light">See repair services</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
