import type { CSSProperties } from "react";

function paths(category: string) {
  const c = category.toLowerCase();
  if (c.includes("coffee")) return <><path d="M13 18h18v8a9 9 0 0 1-18 0z" /><path d="M31 20h4a4 4 0 0 1 0 8h-2" /><path d="M17 10v3M22 9v4M27 10v3" /></>;
  if (c.includes("fridge")) return <><rect x="12" y="4" width="24" height="40" rx="3" /><line x1="12" y1="20" x2="36" y2="20" /><line x1="30" y1="10" x2="30" y2="15" /><line x1="30" y1="26" x2="30" y2="34" /></>;
  if (c.includes("freezer")) return <><rect x="12" y="4" width="24" height="40" rx="3" /><path d="M24 14v16M18 18l12 8M30 18l-12 8" /></>;
  if (c.includes("wash")) return <><rect x="8" y="6" width="32" height="36" rx="3" /><circle cx="24" cy="26" r="9" /><circle cx="14" cy="12" r="1.5" /><circle cx="20" cy="12" r="1.5" /></>;
  if (c.includes("dry")) return <><rect x="8" y="6" width="32" height="36" rx="3" /><circle cx="24" cy="26" r="9" /><circle cx="24" cy="26" r="4" /><circle cx="14" cy="12" r="1.5" /></>;
  if (c.includes("dish")) return <><rect x="10" y="6" width="28" height="36" rx="2" /><line x1="10" y1="15" x2="38" y2="15" /><circle cx="15" cy="10.5" r="1.3" /><circle cx="20" cy="10.5" r="1.3" /></>;
  if (c.includes("cooktop")) return <><rect x="7" y="12" width="34" height="24" rx="3" /><circle cx="17" cy="20" r="4" /><circle cx="31" cy="20" r="4" /><circle cx="17" cy="30" r="4" /><circle cx="31" cy="30" r="4" /></>;
  if (c.includes("rangehood")) return <><path d="M8 30 L14 16 H34 L40 30 Z" /><line x1="8" y1="30" x2="40" y2="30" /><line x1="20" y1="36" x2="28" y2="36" /></>;
  if (c.includes("cooker")) return <><rect x="9" y="6" width="30" height="10" rx="2" /><circle cx="16" cy="11" r="2" /><circle cx="24" cy="11" r="2" /><circle cx="32" cy="11" r="2" /><rect x="9" y="18" width="30" height="24" rx="2" /><line x1="9" y1="26" x2="39" y2="26" /></>;
  if (c.includes("oven")) return <><rect x="7" y="8" width="34" height="32" rx="2" /><line x1="7" y1="17" x2="41" y2="17" /><line x1="14" y1="12.5" x2="20" y2="12.5" /><rect x="13" y="22" width="22" height="13" rx="1" /></>;
  if (c.includes("tv") || c.includes("entertain")) return <><rect x="5" y="10" width="38" height="24" rx="2" /><line x1="20" y1="40" x2="28" y2="40" /><line x1="24" y1="34" x2="24" y2="40" /></>;
  return <><rect x="12" y="4" width="24" height="40" rx="3" /><line x1="12" y1="20" x2="36" y2="20" /></>;
}

export default function ApplianceGlyph({ category, className = "appl", style }: { category: string; className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      {paths(category)}
    </svg>
  );
}
