import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import { plans, faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Core membership, Met To Be Plus, paid experiences and human-led concierge. Illustrative launch pricing, validated city by city.",
};

export default function MembershipPage() {
  return (
    <>
      <section className="bg-sand py-20">
        <div className="container-x max-w-3xl">
          <SectionHeading
            eyebrow="Membership"
            title={
              <>
                Choose how you want to <em className="text-clay italic">meet</em>
              </>
            }
            subtitle="Illustrative pricing for testing — final pricing is validated city by city as we grow."
          />
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan, i) => {
              const accents = ["border-t-clay", "", "border-t-marigold", "border-t-sage"];
              return (
                <Reveal key={plan.name} delay={i * 0.08}>
                  <article
                    className={`relative flex h-full flex-col rounded-2xl p-8 ${
                      plan.featured
                        ? "bg-ink text-cream shadow-[0_20px_50px_-30px_rgba(35,28,22,0.5)]"
                        : `card border-t-4 ${accents[i]}`
                    }`}
                  >
                  {plan.badge ? (
                    <span className="absolute -top-3 right-6 rounded-full bg-clay px-4 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white">
                      {plan.badge}
                    </span>
                  ) : null}
                  <h2 className="font-display text-xl font-medium">{plan.name}</h2>
                  <p className="font-display mt-4 text-[1.55rem] font-semibold">{plan.price}</p>
                  <p
                    className={`mt-1 text-sm ${
                      plan.featured ? "text-cream/60" : "text-mocha"
                    }`}
                  >
                    {plan.per}
                  </p>
                  <ul className="mt-auto pt-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="chip-dot relative py-2 pl-6 text-sm before:top-[1.05rem]"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
                </Reveal>
                );
              })}
          </div>

          <Reveal>
            <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-mocha">
              Every membership includes verification, discovery and one event or
              date credit. Experience prices vary by venue and format.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Frequently asked" align="center" />
          <Reveal delay={0.1} className="mt-12">
            <FaqAccordion faqs={faqs} />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
