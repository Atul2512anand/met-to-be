"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-full border border-ink/15 bg-white px-5 py-3 text-base text-ink placeholder:text-mocha/60 focus:border-clay focus:outline-none transition-colors";

export default function CityWaitlistForm({ city }: { city: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          city,
          timeline: `City waitlist — ${city}`,
        }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("done");
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <p className="rounded-full bg-mint-soft px-6 py-3 text-center text-sm font-medium text-sage-deep">
        You’re on the {city} waitlist. We’ll write the moment doors open.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        required
        maxLength={60}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="First name"
        aria-label={`First name for ${city} waitlist`}
        className={inputClass}
      />
      <input
        type="email"
        required
        maxLength={120}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        aria-label={`Email for ${city} waitlist`}
        className={inputClass}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-solid shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Adding…" : "Join waitlist"}
      </button>
    </form>
  );
}
