"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import {
  formatLabels,
  quizQuestions,
  quizStyleMeta,
  type QuizStyleKey,
} from "@/lib/data";

const order: QuizStyleKey[] = ["coffee", "activity", "dining", "escape"];

const resultTones: Record<QuizStyleKey, { soft: string; deep: string; bar: string }> = {
  coffee: { soft: "bg-peach-soft text-clay border-transparent", deep: "text-clay", bar: "bg-clay" },
  activity: { soft: "bg-mint-soft text-sage-deep border-transparent", deep: "text-sage-deep", bar: "bg-sage" },
  dining: { soft: "bg-butter-soft text-marigold-deep border-transparent", deep: "text-marigold-deep", bar: "bg-marigold" },
  escape: { soft: "bg-blossom-soft text-rose-deep border-transparent", deep: "text-rose-deep", bar: "bg-rose" },
};

export default function StyleQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<QuizStyleKey, number>>({
    coffee: 0,
    activity: 0,
    dining: 0,
    escape: 0,
  });
  const [finished, setFinished] = useState(false);
  const [winner, setWinner] = useState<QuizStyleKey>("coffee");

  function choose(style: QuizStyleKey) {
    const next = { ...scores, [style]: scores[style] + 1 };
    setScores(next);
    if (step + 1 >= quizQuestions.length) {
      let best: QuizStyleKey = "coffee";
      for (const key of order) {
        if (next[key] > next[best]) best = key;
      }
      setWinner(best);
      setFinished(true);
    } else {
      setStep(step + 1);
    }
  }

  function reset() {
    setStep(0);
    setScores({ coffee: 0, activity: 0, dining: 0, escape: 0 });
    setFinished(false);
  }

  const progress = finished
    ? 100
    : (step / quizQuestions.length) * 100;

  return (
    <div className="rounded-3xl border border-ink/10 bg-[#FFFDF9] p-8 shadow-[0_20px_50px_-30px_rgba(35,28,22,0.3)] sm:p-10">
      <div className="h-1.5 overflow-hidden rounded-full bg-linen">
        <div
          className={`h-full rounded-full transition-all duration-500 ${finished ? resultTones[winner].bar : "bg-clay"}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {!finished ? (
        <div className="mt-8 min-h-[340px]">
          <p className="font-display text-sm tracking-[0.14em] text-clay">
            QUESTION {step + 1} OF {quizQuestions.length}
          </p>
          <h2 className="font-display mt-3 text-2xl font-medium sm:text-3xl">
            {quizQuestions[step].question}
          </h2>
          <div className="mt-7 grid gap-3">
            {quizQuestions[step].options.map((option, oi) => {
              const optionTones = [
                "hover:border-clay hover:bg-peach-soft",
                "hover:border-sage hover:bg-mint-soft",
                "hover:border-marigold hover:bg-butter-soft",
                "hover:border-rose hover:bg-blossom-soft",
              ];
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => choose(option.style)}
                  className={`rounded-xl border border-ink/15 bg-white px-5 py-4 text-left text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${optionTones[oi]}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-mocha transition-colors hover:text-clay"
            >
              <ArrowLeft size={16} /> Previous question
            </button>
          ) : null}
        </div>
      ) : (
        <div className="mt-10 min-h-[340px] text-center">
          <p className="font-display text-sm tracking-[0.14em] text-clay">YOUR STYLE</p>
          <h2 className={`font-display mt-3 text-3xl font-medium sm:text-4xl ${resultTones[winner].deep}`}>
            {quizStyleMeta[winner].title}
          </h2>
          <p className="mt-2 italic text-mocha">{quizStyleMeta[winner].tagline}</p>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-mocha">
            {quizStyleMeta[winner].description}
          </p>

          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.12em] text-mocha">
            Start with these experiences
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2.5">
            {quizStyleMeta[winner].formats.map((format) => (
              <span
                key={format}
                className={`rounded-full border px-4 py-2 text-sm ${resultTones[winner].soft}`}
              >
                {format}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={`/join?format=${winner}`} className="btn btn-solid">
              Apply to join Met To Be
            </Link>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-mocha transition-colors hover:text-clay"
            >
              <RotateCcw size={16} /> Retake
            </button>
          </div>

          <p className="mt-6 text-xs text-mocha">
            Your result travels with your application — no account needed.
          </p>
        </div>
      )}

      {!finished ? (
        <p className="mt-6 text-center text-xs text-mocha">
          Five questions. Sixty seconds.{" "}
          <span className="capitalize">{formatLabels.coffee}</span>, classes, dinners or
          escapes — find the room where you connect best.
        </p>
      ) : null}
    </div>
  );
}
