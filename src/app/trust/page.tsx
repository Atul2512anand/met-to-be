import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import VerificationBadges from "@/components/VerificationBadges";
import { trustItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Trust & Safety",
  description:
    "Identity verification, liveness checks, in-app communication and safer first meetings. Verification reduces uncertainty — it never promises certainty.",
};

export default function TrustPage() {
  return (
    <>
      <section className="bg-sand py-20">
        <div className="container-x max-w-3xl">
          <SectionHeading
            eyebrow="Trust & safety"
            title={
              <>
                Verified reduces uncertainty.
                <br />
                It never <em className="text-clay italic">promises certainty</em>.
              </>
            }
            subtitle="We will never tell you verification makes a person completely safe. It lowers risk. Your judgment, our tools, and real-world settings do the rest."
          />
        </div>
      </section>

      <VerificationBadges />

      <section className="pb-24">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustItems.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.08}>
                <div className="card h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:border-clay hover:shadow-[0_20px_50px_-30px_rgba(196,100,62,0.5)]">
                  <h2 className="font-display text-xl font-medium">{item.title}</h2>
                  <p className="mt-2 text-sm text-mocha">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 rounded-2xl border-l-4 border-clay bg-sand p-8">
              <p className="font-display max-w-3xl text-xl italic leading-relaxed">
                “Verification reduces uncertainty but does not eliminate risk.
                Anyone who tells you otherwise is selling you something.”
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 grid items-center gap-10 rounded-2xl bg-ink p-8 text-cream lg:grid-cols-[1.3fr_1fr] lg:p-12">
              <div>
                <p className="eyebrow !text-peach">First meetings</p>
                <h2 className="font-display text-3xl font-medium leading-tight">
                  Designed for safer first meetings
                </h2>
                <p className="mt-4 max-w-lg text-cream/70">
                  Public-venue recommendations, optional meeting-detail sharing
                  with a trusted contact, and private post-meeting feedback on
                  every date and event.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  "Curated public venues",
                  "Trusted-contact alerts",
                  "Private post-meeting feedback",
                  "Human moderation review",
                ].map((item) => (
                  <li
                    key={item}
                    className="relative rounded-xl border border-cream/15 bg-cream/5 px-6 py-3.5 pl-11 text-sm"
                  >
                    <span className="absolute left-5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-peach" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
