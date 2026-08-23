"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { formatLabels, type QuizStyleKey } from "@/lib/data";

const cities = [
  "Bengaluru",
  "Mumbai",
  "Delhi NCR",
  "Hyderabad",
  "Pune",
  "Another city",
];

const timelines = [
  "Within a year",
  "In one to two years",
  "When it feels right — intentionally exploring",
];

type Fields = {
  name: string;
  email: string;
  city: string;
  timeline: string;
  consent: boolean;
};

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-full border border-cream/25 bg-cream/10 px-6 py-3.5 text-cream placeholder:text-cream/40 focus:border-clay focus:outline-none transition-colors";

export default function ApplicationForm({
  recommended,
}: {
  recommended?: QuizStyleKey;
}) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    city: "",
    timeline: "",
    consent: false,
  });

  const steps = ["You", "Intent", "Review"];

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(current: number): boolean {
    const next: Partial<Record<string, string>> = {};
    if (current === 0) {
      if (fields.name.trim().length < 2) next.name = "Please share your first name.";
      if (!/^\S+@\S+\.\S+$/.test(fields.email.trim()))
        next.email = "Please enter a valid email address.";
      if (!fields.city) next.city = "Please select your city.";
    }
    if (current === 1) {
      if (!fields.timeline) next.timeline = "Please choose a timeline.";
    }
    if (current === 2 && !fields.consent) {
      next.consent = "We need your confirmation to review the application.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit() {
    if (!validate(2)) return;
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim().toLowerCase(),
          city: fields.city,
          timeline: fields.timeline,
        }),
      });
      const json: { ok: boolean; error?: string; reference?: string } =
        await res.json();
      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMessage(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setReference(json.reference ?? "");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <CheckCircle2 size={52} className="mx-auto text-clay" />
        <h3 className="font-display mt-5 text-2xl font-medium">Application received</h3>
        <p className="mt-3 text-cream/70">
          Reference{" "}
          <span className="font-display font-semibold text-peach">{reference}</span>
          {" "}— reviewed by humans within 48 hours.
        </p>
        <ul className="mt-7 space-y-0 text-left">
          {[
            "Team reviews your application and quiz result",
            "You receive an identity verification invitation",
            "Founding 100 onboarding and first event access",
          ].map((line, i) => (
            <li
              key={line}
              className="relative border-b border-cream/10 py-3.5 pl-11 text-sm text-cream/80 last:border-b-0"
            >
              <span className="font-display absolute left-1 top-1/2 -translate-y-1/2 text-sm font-semibold text-clay">
                {i + 1}
              </span>
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs leading-relaxed text-cream/50">
          Applications are read by people, not scored by software. Not everyone is
          admitted — that is what keeps the room worth being in.
        </p>
        <Link href="/quiz" className="btn btn-outline mt-7 !border-cream/25 !text-cream hover:!border-clay">
          Take the style quiz while you wait
        </Link>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="py-8 text-center">
        <p className="text-peach">{errorMessage}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-light mt-6"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      {recommended ? (
        <div className="mb-6 rounded-2xl border border-peach/40 bg-peach/10 px-5 py-4 text-sm leading-relaxed text-peach">
          Based on your style quiz, we suggest starting with{" "}
          <strong>{formatLabels[recommended]}</strong>. We will factor this into your
          event invitations.
        </div>
      ) : null}

      <ol className="mb-8 flex items-center gap-2">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                i <= step ? "bg-clay text-white" : "bg-cream/15 text-cream/50"
              }`}
            >
              {i + 1}
            </span>
            <span
              className={`text-xs font-semibold uppercase tracking-[0.08em] ${
                i <= step ? "text-cream" : "text-cream/40"
              }`}
            >
              {label}
            </span>
            {i < steps.length - 1 ? (
              <span className={`h-px flex-1 ${i < step ? "bg-clay" : "bg-cream/20"}`} />
            ) : null}
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <div className="grid gap-4">
          <div>
            <input
              aria-label="First name"
              placeholder="First name"
              value={fields.name}
              onChange={(e) => update("name", e.target.value)}
              maxLength={60}
              className={inputClass}
            />
            {errors.name ? <p className="mt-1.5 pl-4 text-xs text-peach">{errors.name}</p> : null}
          </div>
          <div>
            <input
              aria-label="Email address"
              type="email"
              placeholder="Email address"
              value={fields.email}
              onChange={(e) => update("email", e.target.value)}
              maxLength={120}
              className={inputClass}
            />
            {errors.email ? <p className="mt-1.5 pl-4 text-xs text-peach">{errors.email}</p> : null}
          </div>
          <div>
            <select
              aria-label="Your city"
              value={fields.city}
              onChange={(e) => update("city", e.target.value)}
              className={`${inputClass} appearance-none [&>option]:text-ink`}
            >
              <option value="" disabled>
                Select your city
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city ? <p className="mt-1.5 pl-4 text-xs text-peach">{errors.city}</p> : null}
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="grid gap-4">
          <p className="text-sm leading-relaxed text-cream/60">
            Everyone on Met To Be wants marriage. Knowing your timeline helps us pace
            introductions honestly.
          </p>
          {timelines.map((timeline) => (
            <label
              key={timeline}
              className={`flex cursor-pointer items-center gap-3.5 rounded-2xl border px-5 py-4 text-sm transition-colors ${
                fields.timeline === timeline
                  ? "border-clay bg-clay/15 text-cream"
                  : "border-cream/20 bg-cream/5 text-cream/75 hover:border-cream/40"
              }`}
            >
              <input
                type="radio"
                name="timeline"
                value={timeline}
                checked={fields.timeline === timeline}
                onChange={() => update("timeline", timeline)}
                className="accent-[#C4643E]"
              />
              {timeline}
            </label>
          ))}
          {errors.timeline ? (
            <p className="pl-4 text-xs text-peach">{errors.timeline}</p>
          ) : null}
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-4">
          <dl className="rounded-2xl border border-cream/15 bg-cream/5 px-6 py-5 text-sm">
            {[
              ["Name", fields.name],
              ["Email", fields.email],
              ["City", fields.city],
              ["Timeline", fields.timeline],
              ...(recommended
                ? [["Starting format", formatLabels[recommended]] as [string, string]]
                : []),
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-6 border-b border-cream/10 py-2.5 last:border-b-0"
              >
                <dt className="text-cream/50">{label}</dt>
                <dd className="text-right font-medium text-cream">{value}</dd>
              </div>
            ))}
          </dl>
          <div>
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-cream/70">
              <input
                type="checkbox"
                checked={fields.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-1 accent-[#C4643E]"
              />
              I confirm my details are accurate and I consent to identity verification as
              part of the application.
            </label>
            {errors.consent ? (
              <p className="mt-1.5 text-xs text-peach">{errors.consent}</p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center gap-1 text-sm font-medium text-cream/60 transition-colors hover:text-cream"
          >
            <ChevronLeft size={16} /> Back
          </button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <button
            type="button"
            onClick={() => {
              if (validate(step)) setStep(step + 1);
            }}
            className="btn btn-light !px-6 !py-3"
          >
            Continue <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={status === "loading"}
            className="btn btn-light !px-6 !py-3 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Submitting…" : "Submit application"}
          </button>
        )}
      </div>
    </div>
  );
}
