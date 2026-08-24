import type { Metadata } from "next";
import { Heart } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import JourneyStepper from "@/components/JourneyStepper";
import CtaBand from "@/components/CtaBand";
import Logo from "@/components/Logo";
import { journeySteps } from "@/lib/events";
import { familyPoints, stageLadder } from "@/lib/data";

export const metadata: Metadata = {
  title: "How Met & Wed Works",
  description:
    "Check who is joining. Connect with an I’d Like To Meet request. Meet in real life at curated Bengaluru experiences — then decide for yourself.",
};

const profileFacts = [
  ["Bengaluru", "Profession · Education · Height"],
  ["Loves", "Weekend treks, filter kapi, indie music"],
  ["Looking for", "A life partner who values family and ambition equally"],
  ["Marriage means", "Building a home, not just a wedding"],
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-sand py-20">
        <div className="container-x max-w-3xl">
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                Check. Connect. <em className="text-clay italic">Meet.</em>
              </>
            }
            subtitle="We create the opportunity. You choose the person. The whole product is designed to move you from a profile to a real table in Bengaluru."
          />
        </div>
      </section>

      <section className="pb-0 pt-16">
        <div className="container-x">
          <JourneyStepper />
        </div>
      </section>

      {journeySteps.map((step, i) => (
        <section key={step.title} className={i === 0 ? "py-24 pt-0" : "py-24"}>
          <div className="container-x">
            <Reveal>
              <div
                className={`card grid gap-10 p-8 lg:grid-cols-[1fr_1.4fr] lg:p-12 ${
                  step.options ? "lg:grid-cols-[1fr_1.2fr]" : ""
                }`}
              >
                <div>
                  <span className="font-display text-sm tracking-[0.14em] text-clay">
                    {step.num}
                  </span>
                  <h2 className="font-display mt-2 text-4xl font-medium uppercase tracking-wide">
                    {step.title}
                  </h2>
                  <p className="mt-2 font-medium text-mocha">{step.tagline}</p>
                  <p className="mt-5 text-mocha">{step.description}</p>
                </div>

                {step.points ? (
                  <ul>
                    {step.points.map((point) => (
                      <li
                        key={point}
                        className="chip-dot relative border-b border-dashed border-ink/10 py-3 pl-6 last:border-b-0"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {step.options ? (
                  <div>
                    <p className="mb-4 font-medium text-mocha">
                      After every meeting, you choose your pace:
                    </p>
                    <ul className="flex flex-wrap gap-3">
                      {step.options.map((option) => (
                        <li
                          key={option}
                          className={`rounded-full border px-5 py-2.5 text-sm ${
                            option === "Not interested"
                              ? "border-ink/15 bg-[#FFFDF9] text-mocha"
                              : "border-sage/40 bg-mint-soft text-sage-deep"
                          }`}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="pb-24">
        <div className="container-x">
          <SectionHeading
            num="12"
            eyebrow="The full journey"
            align="center"
            title={
              <>
                From curiosity to <em className="text-clay italic">commitment</em>
              </>
            }
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stageLadder.map((stage, i) => (
              <Reveal key={stage.stage} delay={(i % 3) * 0.06}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-ink/10 bg-[#FFFDF9] px-5 py-4">
                  <span className="font-display mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-peach-soft text-sm font-semibold text-clay">
                    {i + 1}
                  </span>
                  <span>
                    <span className="font-display block font-medium">{stage.stage}</span>
                    <span className="text-sm leading-snug text-mocha">{stage.experience}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="font-display mt-10 text-center text-lg italic text-mocha">
              Met → Connected → Met again → Introduced → Wed
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Member profiles"
              title={
                <>
                  “Would I like to meet this person?”
                </>
              }
              subtitle="Profiles answer that question — not biodata checklists. And one button starts everything:"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 font-semibold text-white shadow-[0_18px_40px_-18px_rgba(196,100,62,0.7)]">
                <Heart size={17} className="fill-white" /> I’d Like To Meet
              </p>
              <p className="mt-4 text-sm italic text-mocha">
                Never “like”. Never swipe. Never “match”.
              </p>
            </Reveal>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative mx-auto max-w-md rounded-3xl border border-ink/10 bg-[#FFFDF9] p-8 shadow-[0_20px_50px_-30px_rgba(35,28,22,0.35)]">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f2b04a,#c98220)]">
                  <Logo className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold">
                    Aarohi, 29{" "}
                    <span className="ml-1 inline-block rounded-full bg-clay px-2 py-0.5 align-middle text-[0.62rem] font-semibold uppercase tracking-wide text-white">
                      Verified
                    </span>
                  </p>
                  <p className="text-sm text-mocha">Bengaluru · Architect</p>
                </div>
              </div>
              <dl className="mt-6 space-y-3">
                {profileFacts.map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-sand px-4 py-3">
                    <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-clay">
                      {label}
                    </dt>
                    <dd className="mt-0.5 text-sm">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-center text-xs text-mocha">
                Sample profile for illustration.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <div className="rounded-2xl bg-ink p-8 text-cream lg:p-12">
              <p className="eyebrow !text-peach">The family stage</p>
              <h2 className="font-display max-w-xl text-3xl font-medium leading-tight">
                Because marriage is bigger than two profiles.
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {familyPoints.map((point) => (
                  <p
                    key={point}
                    className="relative rounded-xl border border-cream/15 bg-cream/5 px-6 py-4 pl-12 text-sm leading-relaxed"
                  >
                    <span className="absolute left-5 top-[1.15rem] h-2 w-2 rounded-full bg-peach" />
                    {point}
                  </p>
                ))}
              </div>
              <p className="mt-6 max-w-xl text-sm text-cream/60">
                We don’t promise the ending. We create better beginnings.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
