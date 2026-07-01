"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/capabilities", label: "Capabilities" },
  { href: "/sockets", label: "Sockets & Packages" },
  { href: "/parts", label: "Parts Under Test" },
  { href: "/dashboard", label: "Live Dashboard" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/85 backdrop-blur border-b border-line">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 font-[var(--font-display)] font-semibold tracking-tight">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="1" y="1" width="22" height="22" rx="2" stroke="#FFB300" strokeWidth="1.4" />
            <rect x="6" y="6" width="4" height="4" fill="#C97C4A" />
            <rect x="11" y="11" width="4" height="4" fill="#FFB300" />
          </svg>
          IONFORGE <span className="text-ink-dim font-normal">TEST LABS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-ink-dim">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-ink transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden md:inline-flex font-[var(--font-mono)] text-sm border border-amber text-amber px-4 py-2 rounded-[2px] hover:bg-amber hover:text-bg transition-colors"
        >
          Request Test Quote
        </Link>

        <button
          className="md:hidden text-2xl"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-bg">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 border-b border-line text-sm text-ink-dim"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
