import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ApplicationForm from "@/components/ApplicationForm";
import { audiencePoints, formatLabels, type QuizStyleKey } from "@/lib/data";
import { getExperience } from "@/lib/events";

export const metadata: Metadata = {
  title: "Join Met & Wed",
  description:
    "Membership at Met & Wed is applied for, reviewed by humans and verified. Join Bengaluru's marriage-first community.",
};

const pillars = [
  {
    title: "Identity",
    description:
      "Every applicant completes government ID and liveness verification. Anonymity is not part of the experience.",
  },
  {
    title: "Intent",
    description:
      "Everyone here wants marriage — we ask for your timeline so introductions are paced honestly.",
  },
  {
    title: "Effort",
    description:
      "Complete profiles, real conversations, feedback after meetings. Low-effort members do not stay.",
  },
];

const processSteps = [
  "Submit your application below — two minutes, no payment",
  "A human reviews it within 48 hours (not a scoring model)",
  "Accepted applicants complete identity verification",
  "Choose the Met & Wed Pass and book your first experience",
];

export default async function JoinPage({
  searchParams,
}: PageProps<"/join">) {
  const { format, experience } = await searchParams;
  const recommended =
    typeof format === "string" && format in formatLabels
      ? (format as QuizStyleKey)
      : undefined;
  const experienceName =
    typeof experience === "string" ? getExperience(experience)?.name : undefined;

  return (
    <section className="relative overflow-hidden bg-ink bg-[radial-gradient(70%_120%_at_80%_0%,rgba(196,100,62,0.3),transparent_60%)] py-24 text-cream">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="floaty absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-marigold/15 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-rose/15 blur-3xl">
        </div>
      </div>
      <div className="container-x relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">By application · Bengaluru first</p>
          <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-medium leading-[1.12]">
            Membership is earned,
            <br />
            not swiped for.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-cream/70">
            Met &amp; Wed is a curated community of verified, marriage-minded
            people in Bengaluru. We read every application ourselves — because the
            quality of the room is the product.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-cream/15 bg-cream/5 px-7 py-6">
                <span className="font-display text-sm tracking-[0.14em] text-peach">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display mt-1.5 text-xl font-medium">{pillar.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <h2 className="font-display text-2xl font-medium">How applications work</h2>
            <ol className="mt-6 space-y-0">
              {processSteps.map((line, i) => (
                <li
                  key={line}
                  className="flex items-start gap-5 border-b border-cream/10 py-4 last:border-b-0"
                >
                  <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-clay text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-1.5 text-sm text-cream/80">{line}</span>
                </li>
              ))}
            </ol>

            <p className="mt-8 rounded-2xl border-l-4 border-clay bg-cream/5 px-5 py-4 text-sm italic leading-relaxed text-cream/70">
              Not everyone will be accepted — that is the point. A curated few beats
              an endless crowd.
            </p>

            <h3 className="font-display mt-10 text-xl font-medium">Who it’s for</h3>
            <ul className="mt-3 space-y-0">
              {audiencePoints.slice(0, 4).map((point) => (
                <li
                  key={point}
                  className="relative border-b border-cream/10 py-3 pl-8 text-sm text-cream/75 last:border-b-0"
                >
                  <span className="absolute left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-peach" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-cream/15 bg-espresso/60 p-8 backdrop-blur-sm lg:p-10">
              <h2 className="font-display text-2xl font-medium">Your application</h2>
              <p className="mb-7 mt-1.5 text-sm text-cream/55">
                Three short steps. No payment, no commitment.
              </p>
              <ApplicationForm
                recommended={recommended}
                experienceName={experienceName}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
