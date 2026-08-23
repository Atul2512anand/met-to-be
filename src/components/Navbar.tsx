"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { navLinks, site } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled || open
          ? "border-ink/10 bg-cream/85 shadow-[0_10px_30px_-25px_rgba(35,28,22,0.4)]"
          : "border-transparent bg-cream/70"
      }`}
    >
      <div className="container-x flex h-[74px] items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2.5 text-ink" aria-label={site.name}>
          <Logo />
          <span className="font-display text-lg font-semibold tracking-[0.08em]">
            MET&nbsp;TO&nbsp;BE
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={pathname.startsWith(link.href)}
              className={`nav-link text-sm font-medium transition-colors hover:text-ink ${
                pathname.startsWith(link.href) ? "text-clay" : "text-mocha"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/join" className="btn btn-solid !px-6 !py-2.5 !text-sm">
            Join the Founding 100
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 p-2 lg:hidden"
        >
          <span
            className={`h-0.5 w-6 rounded bg-ink transition-transform duration-300 ${
              open ? "translate-y-1 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded bg-ink transition-transform duration-300 ${
              open ? "-translate-y-1 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-ink/10 transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="container-x flex flex-col py-3" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b border-ink/10 py-3.5 text-base font-medium ${
                pathname.startsWith(link.href) ? "text-clay" : "text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/join" className="btn btn-solid mt-5 w-full">
            Join the Founding 100
          </Link>
        </nav>
      </div>
    </header>
  );
}
