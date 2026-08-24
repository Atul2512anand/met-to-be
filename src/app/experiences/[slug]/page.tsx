import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Check, MapPin, ShieldCheck, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import ExperienceCard, { toneCover } from "@/components/ExperienceCard";
import { categoryLabels, experiences, getExperience } from "@/lib/events";

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/experiences/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) return {};
  return {
    title: `${experience.name} · ${experience.area}`,
    description: experience.tagline,
  };
}

export default async function ExperienceDetailPage({
  params,
}: PageProps<"/experiences/[slug]">) {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) notFound();

  const others = experiences.filter((e) => e.slug !== experience.slug).slice(0, 3);
  const lowSpots = experience.spotsLeft <= 5;

  return (
    <>
      <article>
        <header className={`relative overflow-hidden ${toneCover[experience.tone]} py-16 text-white lg:py-20`}>
          <div className="container-x relative z-10 max-w-4xl">
            <Link
              href="/experiences"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft size={16} /> All experiences
            </Link>
            <p className="mt-7 inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] backdrop-blur-sm">
              {categoryLabels[experience.category]}
            </p>
            <h1 className="font-display mt-4 text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-tight">
              {experience.name}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-white/90">{experience.tagline}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-white/90">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={15} /> {experience.dateLabel}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} /> {experience.area}, Bengaluru
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users size={15} /> Ages {experience.ageRange}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={15} /> Verified members only
              </span>
            </div>
          </div>
        </header>

        <div className="container-x max-w-5xl py-16">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <Reveal>
              <section>
                <h2 className="font-display text-2xl font-medium">What you’ll experience</h2>
                <ul className="mt-5 space-y-3">
                  {experience.whatYoullExperience.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-mocha">
                      <Check size={18} className="mt-0.5 shrink-0 text-clay" />
                      {item}
                    </li>
                  ))}
                </ul>

                <h2 className="font-display mt-12 text-2xl font-medium">
                  Who will be there?
                </h2>
                <p className="mt-4 leading-relaxed text-mocha">{experience.whoWillBeThere}</p>

                <h2 className="font-display mt-12 text-2xl font-medium">What to know</h2>
                <dl className="mt-5 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-[#FFFDF9] px-6">
                  {Object.entries(experience.whatToKnow).map(([key, value]) => (
                    <div key={key} className="flex flex-col gap-0.5 py-3.5 sm:flex-row sm:gap-6">
                      <dt className="shrink-0 text-xs font-semibold uppercase tracking-[0.1em] text-clay sm:w-32 sm:pt-0.5">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </dt>
                      <dd className="text-sm text-mocha">{value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </Reveal>

            <aside>
              <Reveal delay={0.1}>
                <div className="card sticky top-24 p-7">
                  <p className="font-display text-3xl font-semibold">
                    ₹{experience.price.toLocaleString("en-IN")}
                    {experience.priceNote ? (
                      <span className="ml-1.5 text-sm font-normal text-mocha">
                        {experience.priceNote}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-sm text-mocha">
                    {experience.totalSpots - experience.spotsLeft} of{" "}
                    {experience.totalSpots} seats booked
                  </p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-linen">
                    <div
                      className={`h-full rounded-full ${lowSpots ? "bg-rose" : "bg-sage"}`}
                      style={{
                        width: `${((experience.totalSpots - experience.spotsLeft) / experience.totalSpots) * 100}%`,
                      }}
                    />
                  </div>
                  <p
                    className={`mt-2 text-xs font-semibold ${
                      lowSpots ? "text-rose-deep" : "text-sage-deep"
                    }`}
                  >
                    {lowSpots
                      ? `Only ${experience.spotsLeft} spots left`
                      : `${experience.spotsLeft} spots available`}
                  </p>
                  <Link href={`/book/${experience.slug}`} className="btn btn-solid mt-6 w-full">
                    Reserve my spot
                  </Link>
                  <p className="mt-3 text-center text-xs text-mocha">
                    Membership verification required before check-in.
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </article>

      <section className="pb-24">
        <div className="container-x">
          <h2 className="font-display text-2xl font-medium">More ways to meet</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 0.08}>
                <ExperienceCard experience={other} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
