import type { Metadata } from "next";
import { Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "The Met & Wed Pass — ₹3,999. Verified access to the Bengaluru community, I’d Like To Meet requests and member pricing on experiences.",
};

const passIncludes = [
  "Verified access to the Bengaluru community",
  "Structured profiles and discovery",
  "I’d Like To Meet requests and in-app chat",
  "Member pricing on every experience",
  "Host support and safety tools at all events",
];

export default function MembershipPage() {
  return (
    <>
      <section className="bg-sand py-20">
        <div className="container-x max-w-3xl">
          <SectionHeading
            eyebrow="Membership"
            title={
              <>
                Your Met &amp; Wed{" "}
                <em className="text-clay italic">Pass</em>
              </>
            }
            subtitle="Access to a trusted community and its experiences — never a payment for a promise of marriage."
          />
        </div>
      </section>

      <section className="py-24">
        <div className="container-x max-w-3xl">
          <Reveal>
            <article className="relative overflow-hidden rounded-3xl bg-ink p-10 text-cream shadow-[0_20px_50px_-30px_rgba(35,28,22,0.5)] lg:p-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-clay/30 blur-3xl"
              />
              <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
                <div>
                  <p className="eyebrow !text-peach">One pass. Everything.</p>
                  <p className="font-display text-6xl font-semibold">₹3,999</p>
                  <p className="mt-2 text-sm text-cream/60">
                    *Final launch pricing and inclusions are configured by the team
                    before you pay.
                  </p>
                  <a href="/join" className="btn btn-light mt-8 w-full sm:w-auto">
                    Get the Pass
                  </a>
                </div>
                <ul className="space-y-3.5">
                  {passIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-cream/85">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-clay/30">
                        <Check size={13} className="text-peach" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Reveal delay={0.08}>
              <div className="card h-full border-t-4 border-t-marigold p-7">
                <h2 className="font-display text-lg font-medium">
                  Experience tickets
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-mocha">
                  Priced individually per experience — brunches from ₹299 to curated
                  weekend retreats. Pass members always pay member pricing.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="card h-full border-t-4 border-t-sage p-7">
                <h2 className="font-display text-lg font-medium">Coming later</h2>
                <p className="mt-2 text-sm leading-relaxed text-mocha">
                  Concierge-style assisted introductions and Family Table hosting for
                  couples who reach that stage — announced as Bengaluru grows.
                </p>
              </div>
            </Reveal>
          </div>
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
