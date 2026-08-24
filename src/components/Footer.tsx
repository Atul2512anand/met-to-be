import Link from "next/link";
import Logo from "./Logo";
import { navLinks, site } from "@/lib/site";
import { cities } from "@/lib/events";

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream/70">
      <div
        aria-hidden="true"
        className="h-1.5 w-full bg-[linear-gradient(90deg,#c4643e,#f2a83d,#e27990,#7d9e71)]"
      />
      <div className="container-x grid gap-12 border-b border-cream/10 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 text-cream" aria-label={site.name}>
            <Logo />
            <span className="font-display text-lg font-semibold tracking-[0.08em]">
              MET&nbsp;&amp;&nbsp;WED
            </span>
          </Link>
          <p className="font-display mt-4 text-sm uppercase tracking-[0.14em] text-clay">
            Maybe you haven’t met them yet.
          </p>
          <p className="mt-2 max-w-xs text-sm italic">
            “You can’t know who you’ll marry until you meet them.”
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-display mb-4 text-base font-medium text-cream">Explore</h3>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-1.5 text-sm transition-colors hover:text-clay"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/quiz" className="block py-1.5 text-sm transition-colors hover:text-clay">
              Experience Quiz
            </Link>
          </div>
          <div>
            <h3 className="font-display mb-4 text-base font-medium text-cream">Company</h3>
            <Link href="/cities" className="block py-1.5 text-sm transition-colors hover:text-clay">
              Cities
            </Link>
            <Link href="/journal" className="block py-1.5 text-sm transition-colors hover:text-clay">
              Journal
            </Link>
            <Link href="/join" className="block py-1.5 text-sm transition-colors hover:text-clay">
              Join Met &amp; Wed
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="block py-1.5 text-sm transition-colors hover:text-clay"
            >
              Contact
            </a>
          </div>
          <div>
            <h3 className="font-display mb-4 text-base font-medium text-cream">Locations</h3>
            {cities.map((city) => (
              <Link
                key={city.name}
                href="/cities"
                className="block py-1.5 text-sm transition-colors hover:text-clay"
              >
                {city.name}
                {city.status === "coming-soon" ? (
                  <span className="text-cream/40"> · Coming Soon</span>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="select-none overflow-hidden">
        <p
          className="font-display bg-clip-text whitespace-nowrap text-center font-semibold leading-none tracking-tight text-transparent bg-[linear-gradient(90deg,rgba(196,100,62,0.22),rgba(242,168,61,0.22),rgba(226,121,144,0.22))]"
          style={{ fontSize: "clamp(3.5rem, 15vw, 11rem)" }}
        >
          MET &amp; WED
        </p>
      </div>

      <div className="container-x flex flex-col justify-between gap-2 py-6 text-xs text-cream/40 sm:flex-row">
        <p>© {new Date().getFullYear()} Met &amp; Wed. We create the opportunity. You choose the person.</p>
        <p>{site.positioning}</p>
      </div>
    </footer>
  );
}
