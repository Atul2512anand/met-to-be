import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Experience, Tone } from "@/lib/events";

export const toneCover: Record<Tone, string> = {
  clay: "bg-[linear-gradient(135deg,#d2703f,#a94f2d)]",
  marigold: "bg-[linear-gradient(135deg,#f2b04a,#c98220)]",
  sage: "bg-[linear-gradient(135deg,#8fae83,#56794b)]",
  rose: "bg-[linear-gradient(135deg,#e88aa0,#c25e76)]",
};

export default function ExperienceCard({ experience }: { experience: Experience }) {
  const lowSpots = experience.spotsLeft <= 5;

  return (
    <Link
      href={`/experiences/${experience.slug}`}
      className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-clay hover:shadow-[0_20px_50px_-30px_rgba(196,100,62,0.55)]"
    >
      <div
        className={`relative flex h-36 items-end p-5 ${toneCover[experience.tone]}`}
      >
        <span className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/85">
          {experience.dateLabel}
        </span>
        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wide ${
            lowSpots ? "bg-espresso/80 text-peach" : "bg-white/20 text-white backdrop-blur-sm"
          }`}
        >
          {lowSpots ? `Only ${experience.spotsLeft} spots left` : `${experience.spotsLeft} spots left`}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-medium leading-snug transition-colors group-hover:text-clay">
          {experience.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-mocha">{experience.tagline}</p>

        <div className="mt-4 space-y-1.5 text-sm text-mocha">
          <p className="flex items-center gap-1.5">
            <MapPin size={14} className="shrink-0 text-clay" />
            {experience.area}, Bengaluru · {experience.ageRange}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="font-display text-lg font-semibold">
            ₹{experience.price.toLocaleString("en-IN")}
            {experience.priceNote ? (
              <span className="ml-1 text-xs font-normal text-mocha">{experience.priceNote}</span>
            ) : null}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-clay">
            View Experience
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
