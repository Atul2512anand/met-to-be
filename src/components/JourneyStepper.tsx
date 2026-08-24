import { HeartHandshake, MessagesSquare, SearchCheck } from "lucide-react";
import Reveal from "./Reveal";
import { journeySteps } from "@/lib/events";

const icons = [SearchCheck, MessagesSquare, HeartHandshake] as const;

const nodeTones = [
  "border-clay/40 bg-peach-soft text-clay",
  "border-marigold/50 bg-butter-soft text-marigold-deep",
  "border-sage/50 bg-mint-soft text-sage-deep",
];

const mobileDots = ["bg-clay", "bg-marigold", "bg-sage"];

export default function JourneyStepper() {
  return (
    <>
      <Reveal className="mt-16 hidden md:block">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-[17%] right-[17%] top-8 h-0.5 bg-gradient-to-r from-transparent via-clay/50 to-transparent"
          />
          <ol className="relative grid grid-cols-3 gap-6">
            {journeySteps.map((step, i) => {
              const Icon = icons[i];
              return (
                <li key={step.title} className="flex flex-col items-center text-center">
                  <span className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border shadow-sm ${nodeTones[i]}`}>
                    <Icon size={26} />
                  </span>
                  <p className="font-display mt-4 text-sm tracking-[0.18em] text-mocha">
                    {String(i + 1).padStart(2, "0")} — {step.title.toUpperCase()}
                  </p>
                  <p className="mt-1 max-w-xs text-sm">{step.tagline}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </Reveal>

      <Reveal className="mt-12 md:hidden">
        <ol className="relative space-y-8 border-l-2 border-dashed border-clay/40 pl-8">
          {journeySteps.map((step, i) => {
            const Icon = icons[i];
            return (
              <li key={step.title} className="relative">
                <span className={`absolute -left-12 flex h-8 w-8 items-center justify-center rounded-full text-white ${mobileDots[i]}`}>
                  <Icon size={15} />
                </span>
                <p className="font-display text-sm tracking-[0.18em] text-mocha">
                  {String(i + 1).padStart(2, "0")} — {step.title.toUpperCase()}
                </p>
                <p className="mt-1 text-sm">{step.tagline}</p>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </>
  );
}
