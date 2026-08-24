import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, ShieldCheck, Users } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import Reveal from "@/components/Reveal";
import { experiences, getExperience } from "@/lib/events";

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/book/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) return {};
  return {
    title: `Book — ${experience.name}`,
    description: `Reserve your seat at ${experience.name} · ${experience.dateLabel} · ${experience.area}, Bengaluru.`,
  };
}

export default async function BookPage({
  params,
}: PageProps<"/book/[slug]">) {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) notFound();

  return (
    <section className="bg-sand py-16 lg:py-20">
      <div className="container-x max-w-4xl">
        <Link
          href={`/experiences/${experience.slug}`}
          className="text-sm font-medium text-mocha transition-colors hover:text-clay"
        >
          ← Back to {experience.name}
        </Link>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="eyebrow">Reserve your seat</p>
            <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-tight">
              {experience.name}
            </h1>
            <div className="mt-5 space-y-2 text-mocha">
              <p className="flex items-center gap-2">
                <CalendarDays size={16} className="text-clay" />
                {experience.dateLabel}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-clay" />
                {experience.area}, Bengaluru
              </p>
              <p className="flex items-center gap-2">
                <Users size={16} className="text-clay" />
                Ages {experience.ageRange} · Verified members only
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-clay" />
                Host present throughout
              </p>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-mocha">
              Seats are small and go quickly. Your booking includes the full
              curated experience; membership verification is completed at check-in.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="card p-7 lg:p-9">
              <BookingForm
                slug={experience.slug}
                experienceName={experience.name}
                price={experience.price}
                spotsLeft={experience.spotsLeft}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
