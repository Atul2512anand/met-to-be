import Link from "next/link";
import { MapPin } from "lucide-react";
import Reveal from "./Reveal";

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#2a211a_0%,#191310_55%,#231c16_100%)] py-24 text-cream">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-clay/30 blur-3xl" />
        <div className="floaty absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-rose/20 blur-3xl" />
        <div className="absolute left-1/3 top-0 h-40 w-40 rounded-full bg-marigold/15 blur-3xl" />
      </div>
      <div className="container-x relative z-10 max-w-3xl text-center">
        <Reveal>
          <p className="eyebrow">Launch city</p>
          <h2 className="font-display text-[clamp(1.9rem,3.8vw,3rem)] leading-tight font-medium">
            Bengaluru is live.
            <br />
            Your table is waiting.
          </h2>
          <p className="mx-auto mt-5 max-w-xl flex items-center justify-center gap-1.5 text-cream/70">
            <MapPin size={16} className="shrink-0 text-peach" />
            Currently in Bengaluru — Mumbai, Delhi NCR, Hyderabad, Pune and
            Chennai are coming soon.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/experiences" className="btn btn-light">
              See this month’s experiences
            </Link>
            <Link
              href="/cities"
              className="inline-flex items-center rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-clay hover:text-peach"
            >
              Join a city waitlist
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
