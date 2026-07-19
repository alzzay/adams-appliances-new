import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section">
      <div className="wrap" style={{ textAlign: "center", paddingBlock: "40px" }}>
        <span className="mono eyebrow">404</span>
        <h1 className="h2" style={{ marginInline: "auto" }}>We couldn&apos;t find that page.</h1>
        <p className="lede" style={{ marginInline: "auto" }}>It may have sold or moved. Try the catalogue or our repair services.</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 10 }}>
          <Link href="/factory-seconds" className="btn btn-primary">Shop factory seconds</Link>
          <Link href="/coffee-machine-repairs-sydney" className="btn btn-ghost-light">Repairs</Link>
        </div>
      </div>
    </main>
  );
}
