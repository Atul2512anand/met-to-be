import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import JourneyStepper from "@/components/JourneyStepper";
import CtaBand from "@/components/CtaBand";
import { journeySteps, familyPoints } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Journey",
  description:
    "Check who is joining. Connect with intention. Choose for yourself. The three-step Met To Be journey moves you from screen to real life.",
};

export default function JourneyPage() {
  return (
    <>
      <section className="bg-sand py-20">
        <div className="container-x max-w-3xl">
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                Check. Connect. <em className="text-clay italic">Choose.</em>
              </>
            }
            subtitle="Technology should create a trusted environment — not decide who someone should marry. Every step of the journey is built around that belief."
          />
        </div>
      </section>

      <section className="pb-0 pt-16">
        <div className="container-x">
          <JourneyStepper />
        </div>
      </section>

      {journeySteps.map((step, i) => (
        <section key={step.title} className={i % 2 === 1 ? "py-24" : "py-24 pt-0"}>
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
                    <p className="mb-4 font-medium text-mocha">After a conversation or event, choose your next step:</p>
                    <ul className="flex flex-wrap gap-3">
                      {step.options.map((option) => (
                        <li
                          key={option}
                          className="rounded-full border border-ink/15 bg-cream px-5 py-2.5 text-sm"
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
          <Reveal>
            <div className="rounded-2xl bg-ink p-8 text-cream lg:p-12">
              <p className="eyebrow !text-peach">The family layer</p>
              <h2 className="font-display max-w-xl text-3xl font-medium leading-tight">
                Marriage often involves more than two individuals.
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {familyPoints.map((point) => (
                  <p
                    key={point}
                    className="relative rounded-xl border border-cream/15 bg-cream/5 px-6 py-4 pl-12"
                  >
                    <span className="absolute left-5 top-5 h-2 w-2 rounded-full bg-clay" />
                    {point}
                  </p>
                ))}
              </div>
              <p className="mt-6 max-w-xl text-sm text-cream/60">
                Family enters only when both people choose — through neutral,
                low-pressure experiences hosted by Met To Be.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
