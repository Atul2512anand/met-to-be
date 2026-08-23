import Link from "next/link";
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
          <p className="eyebrow">Launch strategy</p>
          <h2 className="font-display text-[clamp(1.9rem,3.8vw,3rem)] leading-tight font-medium">
            We start with one city.
            <br />
            And a Founding 100.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-cream/70">
            The first 100 verified members shape everything — the events, the
            culture, the community. Invitation-led, density-first, one city at a
            time.
          </p>
          <Link href="/join" className="btn btn-light mt-8">
            Request an invite
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
