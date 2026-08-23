import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import { eventTypes, eventFlow } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Curated Events",
  description:
    "Small curated meetups, brunches, dinners, activity experiences and resort weekends — the offline heart of Met To Be.",
};

export default function EventsPage() {
  const numberTones = ["text-clay", "text-marigold-deep", "text-sage-deep", "text-rose-deep"];
  const flowTones = ["bg-clay", "bg-marigold", "bg-sage", "bg-rose"];

  return (
    <>
      <section className="bg-sand py-20">
        <div className="container-x max-w-3xl">
          <SectionHeading
            eyebrow="The offline moat"
            title={
              <>
                Events aren’t a side feature.
                <br />
                They’re the product.
              </>
            }
            subtitle="The app gets people to the right room. The humans take it from there. Every experience is verified-members-only and deliberately small."
          />
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {eventTypes.map((event, i) => (
              <Reveal key={event.title} delay={(i % 4) * 0.08}>
                <div className="card group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-clay hover:shadow-[0_20px_50px_-30px_rgba(196,100,62,0.5)]">
                  <span
                    className={`font-display block text-lg font-semibold tracking-[0.1em] ${numberTones[i % 4]}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display mt-2 pr-20 text-lg font-medium">{event.title}</h2>
                  <p className="mt-1 text-sm text-mocha">{event.description}</p>
                  <div className="mt-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                        event.hot ? "bg-clay text-white" : "bg-linen text-mocha"
                      }`}
                    >
                      {event.hot ? "Waitlist only" : event.seats}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="How an event works"
            title="From ticket to real conversation"
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {eventFlow.map((flow, i) => (
              <Reveal key={flow.step} delay={i * 0.1}>
                <div className="relative h-full rounded-2xl bg-[#FFFDF9] p-6 border border-ink/10">
                  <span className={`font-display flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white ${flowTones[i % 4]}`}>
                    {i + 1}
                  </span>
                  <h3 className="font-display mt-4 text-lg font-medium">{flow.step}</h3>
                  <p className="mt-1 text-sm text-mocha">{flow.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#d2703f_0%,#bc5631_50%,#a94f2d_100%)] px-8 py-12 text-white lg:flex-row lg:p-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-marigold/30 blur-3xl"
              />
              <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <p className="eyebrow !text-white/70">Partnerships</p>
                  <h2 className="font-display text-3xl font-medium leading-tight">
                    Own a café, restaurant or resort?
                  </h2>
                  <p className="mt-3 leading-relaxed text-white/85">
                    Venues, chefs, studios and brands help us create the rooms where
                    members meet. Host a Met To Be experience — we bring verified,
                    intentional company to your best tables.
                  </p>
                </div>
                <a
                  href={`mailto:${site.email}?subject=Hosting%20a%20Met%20To%20Be%20experience`}
                  className="btn btn-light shrink-0"
                >
                  Partner with us
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
