import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function JournalPostPage({
  params,
}: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <article>
        <header className="bg-sand py-20">
          <div className="container-x max-w-3xl">
            <Link
              href="/journal"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-mocha transition-colors hover:text-clay"
            >
              <ArrowLeft size={16} /> The Journal
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-clay px-4 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white">
                {post.category}
              </span>
              <span className="text-xs text-mocha">
                {post.date} · {post.readTime}
              </span>
            </div>
            <h1 className="font-display mt-6 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.15]">
              {post.title}
            </h1>
          </div>
        </header>

        <div className="container-x max-w-2xl py-16 lg:py-20">
          {post.body.map((paragraph, i) => (
            <Reveal key={i}>
              <p
                className={`mb-7 text-[1.06rem] leading-[1.85] text-mocha ${
                  i === 0 ? "founder-dropcap" : ""
                }`}
              >
                {paragraph}
              </p>
            </Reveal>
          ))}
          <Reveal>
            <p className="mt-12 border-t border-ink/10 pt-6 text-sm italic text-mocha">
              Written by the Met To Be founding team — building a marriage-intent
              platform where humans decide.
            </p>
          </Reveal>
        </div>
      </article>

      <section className="pb-24">
        <div className="container-x">
          <h2 className="font-display text-2xl font-medium">Keep reading</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 0.08}>
                <Link
                  href={`/journal/${other.slug}`}
                  className="card group block h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:border-clay"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-clay">
                    {other.category}
                  </span>
                  <h3 className="font-display mt-3 text-xl font-medium leading-snug transition-colors group-hover:text-clay">
                    {other.title}
                  </h3>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-mocha transition-colors group-hover:text-clay">
                    Read <ArrowRight size={16} />
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
