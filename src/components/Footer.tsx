import Link from "next/link";
import Logo from "./Logo";
import { navLinks, site } from "@/lib/site";

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
              MET&nbsp;TO&nbsp;BE
            </span>
          </Link>
          <p className="font-display mt-4 text-sm uppercase tracking-[0.14em] text-clay">
            Check. Connect. Choose.
          </p>
          <p className="mt-2 max-w-xs text-sm italic">
            “You don’t know if someone is Met To Be until you meet them.”
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-display mb-4 text-base font-medium text-cream">Platform</h3>
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-1.5 text-sm transition-colors hover:text-clay"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/quiz" className="block py-1.5 text-sm transition-colors hover:text-clay">
              Style Quiz
            </Link>
            <Link href="/journal" className="block py-1.5 text-sm transition-colors hover:text-clay">
              Journal
            </Link>
          </div>
          <div>
            <h3 className="font-display mb-4 text-base font-medium text-cream">Company</h3>
            <Link href="/membership" className="block py-1.5 text-sm transition-colors hover:text-clay">
              Membership
            </Link>
            <Link href="/join" className="block py-1.5 text-sm transition-colors hover:text-clay">
              Founding 100
            </Link>
          </div>
          <div>
            <h3 className="font-display mb-4 text-base font-medium text-cream">Contact</h3>
            <a
              href={`mailto:${site.email}`}
              className="block py-1.5 text-sm transition-colors hover:text-clay"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="select-none overflow-hidden">
        <p
          className="font-display bg-clip-text whitespace-nowrap text-center font-semibold leading-none tracking-tight text-transparent bg-[linear-gradient(90deg,rgba(196,100,62,0.22),rgba(242,168,61,0.22),rgba(226,121,144,0.22))]"
          style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
        >
          MET TO BE
        </p>
      </div>

      <div className="container-x flex flex-col justify-between gap-2 py-6 text-xs text-cream/40 sm:flex-row">
        <p>
          © {new Date().getFullYear()} Met To Be. Two people, two paths, one meeting.
        </p>
        <p>{site.positioning}</p>
      </div>
    </footer>
  );
}
