import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Notes on modern marriage — philosophy, brand stories and safety playbooks from the team building Met To Be.",
};

export default function JournalPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="bg-sand py-20">
        <div className="container-x max-w-3xl">
          <SectionHeading
            eyebrow="The Journal"
            title={
              <>
                Notes on <em className="text-clay italic">modern marriage</em>
              </>
            }
            subtitle="Essays on intent, trust and real-world connection — written by the team building Met To Be."
          />
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <Reveal>
            <Link
              href={`/journal/${featured.slug}`}
              className="group block rounded-3xl bg-ink p-8 text-cream transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(35,28,22,0.5)] lg:p-14"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-clay px-4 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white">
                  {featured.category}
                </span>
                <span className="text-xs tracking-wide text-cream/50">
                  {featured.date} · {featured.readTime}
                </span>
              </div>
              <h2 className="font-display mt-6 max-w-3xl text-[clamp(1.7rem,3.2vw,2.6rem)] font-medium leading-tight transition-colors group-hover:text-peach">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-2xl text-cream/70">{featured.excerpt}</p>
              <span className="mt-8 inline-flex items-center gap-2 font-medium text-peach">
                Read the essay <ArrowRight size={18} className="arrow" />
              </span>
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <Link
                  href={`/journal/${post.slug}`}
                  className="card group block h-full p-8 transition-all duration-300 hover:-translate-y-1 hover:border-clay hover:shadow-[0_20px_50px_-30px_rgba(196,100,62,0.5)]"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-linen px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-mocha">
                      {post.category}
                    </span>
                    <span className="text-xs text-mocha/70">
                      {post.date} · {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-2xl font-medium leading-snug transition-colors group-hover:text-clay">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mocha">{post.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-clay">
                    Read more <ArrowRight size={16} className="arrow" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
