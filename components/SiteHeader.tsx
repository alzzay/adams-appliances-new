"use client";

import { useState } from "react";
import Link from "next/link";
import { business } from "../lib/business";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/coffee-machine-repairs-sydney", label: "Repairs" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Find Us" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="hd">
      <div className="hdin">
        <Link href="/" className="brand" aria-label="Adams Appliances — home" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-onlight" src="/adams-logo-onlight.png" alt="Adams Appliances" width={140} height={92} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-ondark" src="/adams-logo-ondark.png" alt="Adams Appliances" width={140} height={92} />
        </Link>

        <nav className="nav" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </nav>

        <div className="hd-actions">
          <ThemeToggle />
          <a href={business.phoneTel} className="callb">
            <span className="callFull">Call {business.phoneDisplay}</span>
            <span className="callShort">Call</span>
          </a>
          <button
            type="button"
            className="menuBtn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menuBar" /><span className="menuBar" /><span className="menuBar" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobilePanel" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
