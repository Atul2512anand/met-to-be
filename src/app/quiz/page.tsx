import type { Metadata } from "next";
import StyleQuiz from "@/components/StyleQuiz";

export const metadata: Metadata = {
  title: "Meeting Style Quiz",
  description:
    "Five questions, sixty seconds. Find out which Met To Be experience fits the way you connect — coffee tables, cooking classes, long dinners or weekend escapes.",
};

export default function QuizPage() {
  return (
    <section className="bg-sand py-20 lg:py-24">
      <div className="container-x max-w-2xl text-center">
        <p className="eyebrow">Don’t swipe. Meet.</p>
        <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-medium leading-[1.12]">
          What’s your meeting style?
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-mocha">
          Some people connect over coffee, others over a shared task or a crowded
          table. Answer five questions and find the room where you connect best.
        </p>
      </div>
      <div className="container-x mt-14 max-w-2xl">
        <StyleQuiz />
      </div>
    </section>
  );
}
