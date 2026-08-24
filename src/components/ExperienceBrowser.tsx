"use client";

import { useMemo, useState } from "react";
import ExperienceCard from "./ExperienceCard";
import { categories, type Experience, type ExperienceCategory } from "@/lib/events";

type Props = {
  events: Experience[];
  initialCategory?: string;
};

export default function ExperienceBrowser({ events, initialCategory }: Props) {
  const [category, setCategory] = useState<ExperienceCategory | "all">(
    (categories.some((c) => c.key === initialCategory)
      ? (initialCategory as ExperienceCategory)
      : "all")
  );
  const [area, setArea] = useState<string>("all");
  const [availableOnly, setAvailableOnly] = useState(false);

  const areas = useMemo(
    () => Array.from(new Set(events.map((e) => e.area))).sort(),
    [events]
  );

  const filtered = events.filter(
    (e) =>
      (category === "all" || e.category === category) &&
      (area === "all" || e.area === area) &&
      (!availableOnly || e.spotsLeft > 3)
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            category === "all"
              ? "border-clay bg-clay text-white"
              : "border-ink/15 bg-[#FFFDF9] text-mocha hover:border-clay hover:text-clay"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setCategory(c.key)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              category === c.key
                ? "border-clay bg-clay text-white"
                : "border-ink/15 bg-[#FFFDF9] text-mocha hover:border-clay hover:text-clay"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <label className="text-sm font-medium text-mocha">
          Area
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="ml-2 rounded-full border border-ink/15 bg-[#FFFDF9] px-4 py-2 text-sm text-ink focus:border-clay focus:outline-none"
          >
            <option value="all">All areas</option>
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>

        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-mocha">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
            className="accent-[#C4643E]"
          />
          Plenty of spots left
        </label>

        <span className="ml-auto text-sm text-mocha">
          {filtered.length} experience{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((experience) => (
          <ExperienceCard key={experience.slug} experience={experience} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card mt-8 p-12 text-center">
          <p className="font-display text-xl font-medium">
            Nothing here right now.
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-mocha">
            New experiences drop every month. Clear the filters or tell us your
            city and we’ll bring Met &amp; Wed to you.
          </p>
        </div>
      ) : null}
    </div>
  );
}
