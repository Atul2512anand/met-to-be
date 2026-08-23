"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

type Faq = { q: string; a: string };

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-[#FFFDF9]">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div key={faq.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-display text-lg font-medium">{faq.q}</span>
              <span className="text-clay">
                {open ? <Minus size={20} /> : <Plus size={20} />}
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-mocha">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
