"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

const stats = [
  {
    to: 100,
    suffix: "%",
    label: "of members identity-verified before they can browse",
    card: "bg-peach-soft border-clay/20",
    num: "text-clay",
  },
  {
    to: 20,
    suffix: "",
    label: "maximum seats at any curated experience",
    card: "bg-butter-soft border-marigold/30",
    num: "text-marigold-deep",
  },
  {
    to: 6,
    suffix: "",
    label: "experience formats every month in Bengaluru",
    card: "bg-mint-soft border-sage/30",
    num: "text-sage-deep",
  },
  {
    to: 0,
    suffix: "",
    label: "algorithms deciding who you should meet",
    card: "bg-blossom-soft border-rose/30",
    num: "text-rose-deep",
  },
];

export default function TrustStatsBand() {
  return (
    <section className="py-16">
      <div className="container-x">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl border px-7 py-8 text-center transition-transform duration-300 hover:-translate-y-1 ${stat.card}`}
            >
              <p className={`font-display text-5xl font-semibold ${stat.num}`}>
                <CountUp to={stat.to} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-sm leading-relaxed text-mocha">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
