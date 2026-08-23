import Link from "next/link";
import { ArrowRight, Heart, Quote } from "lucide-react";
import Marquee from "@/components/Marquee";
import TrustStatsBand from "@/components/TrustStatsBand";
import HeroPaths from "@/components/HeroPaths";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import Logo from "@/components/Logo";
import { compareColumns, eventTypes, journeySteps } from "@/lib/data";
import { posts } from "@/lib/posts";

const heroFacts = [
  { strong: "No AI matchmaking", span: "Humans decide" },
  { strong: "Verified members", span: "Identity-checked profiles" },
  { strong: "Curated events", span: "Real life comes first" },
];

const eventTones = ["text-clay", "text-marigold-deep", "text-sage-deep", "text-rose-deep"];

const journalCatTones: Record<string, string> = {
  Philosophy: "text-clay border-clay/70",
  Brand: "text-marigold-deep border-marigold/70",
  Safety: "text-sage-deep border-sage/70",
};

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[radial-gradient(55%_80%_at_82%_12%,rgba(242,168,61,0.22),transparent_60%),radial-gradient(45%_70%_at_10%_85%,rgba(226,121,144,0.18),transparent_60%),radial-gradient(35%_55%_at_28%_15%,rgba(125,158,113,0.16),transparent_60%)] py-24 lg:py-32">
        <HeroPaths />
        <div
          aria-hidden="true"
          className="floaty pointer-events-none absolute -left-20 top-24 h-60 w-60 rounded-full bg-marigold/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="floaty-delay pointer-events-none absolute -right-12 bottom-8 h-72 w-72 rounded-full bg-rose/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[22%] top-[52%] h-44 w-44 rounded-full bg-sage/20 blur-3xl"
        />
        <div className="container-x relative z-10 mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow">A marriage-intent relationship platform</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[1.1] font-medium tracking-tight">
              Too modern for <em className="highlight">matrimony</em>.
              <br />
              Too intentional for <em className="highlight">dating</em>.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-mocha">
              Met To Be is a verified, offline-first platform for people who are
              serious about finding a life partner — without dating-app culture,
              and without biodata-style transactions.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap justify-center gap-3" aria-hidden="true">
              {["MEET.", "CONNECT.", "CHOOSE."].map((tag, i) => {
                const tones = [
                  "border-marigold bg-marigold",
                  "border-clay bg-clay",
                  "border-sage bg-sage",
                ];
                return (
                  <span
                    key={tag}
                    className={`font-display rounded-full border px-5 py-2 text-sm font-semibold tracking-[0.18em] text-white ${
                      tones[i] ?? "border-ink/15 bg-[#FFFDF9]"
                    }`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/join" className="btn btn-solid">
                Request an invite
              </Link>
              <Link href="/journey" className="btn btn-outline">
                See how it works
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-6 border-t border-ink/10 pt-8 sm:grid-cols-3">
              {heroFacts.map((fact) => (
                <li key={fact.strong}>
                  <strong className="font-display block text-lg font-semibold">
                    {fact.strong}
                  </strong>
                  <span className="text-sm text-mocha">{fact.span}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Marquee />

      <TrustStatsBand />

      <section id="why" className="scroll-mt-24 py-24">
        <div className="container-x">
          <SectionHeading
            num="01"
            eyebrow="The gap we fill"
            title={
              <>
                Stuck between <em className="text-clay italic">two worlds</em>
              </>
            }
            subtitle="People looking for marriage increasingly sit between two unsatisfying experiences. Met To Be is built for exactly that space."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {compareColumns.map((col, i) => (
              <Reveal key={col.title} delay={i * 0.1}>
                <article
                  className={`h-full rounded-2xl p-8 ${
                    col.featured
                      ? "bg-ink text-cream shadow-[0_20px_50px_-30px_rgba(35,28,22,0.5)]"
                      : "card"
                  }`}
                >
                  <header className="mb-5 flex items-center gap-2.5">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        col.featured ? "bg-clay" : "bg-linen"
                      }`}
                    />
                    <h3 className="font-display text-xl font-medium">{col.title}</h3>
                  </header>
                  <ul>
                    {col.points.map((point) => (
                      <li
                        key={point}
                        className="relative py-2.5 pl-5 text-[0.95rem] before:absolute before:left-0 before:top-4 before:h-1.5 before:w-1.5 before:rounded-full last:border-b-0 border-b border-dashed border-ink/10"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#d2703f_0%,#bc5631_45%,#a94f2d_100%)] py-24 text-white">
        <Quote
          aria-hidden="true"
          size={230}
          strokeWidth={1}
          className="absolute -left-10 -top-10 rotate-180 text-marigold/25"
        />
        <Quote
          aria-hidden="true"
          size={190}
          strokeWidth={1}
          className="absolute -bottom-8 right-4 text-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-marigold/20 blur-3xl"
        />
        <div className="container-x relative z-10 max-w-3xl text-center">
          <Reveal>
            <Logo className="mx-auto mb-8 h-13 w-13 opacity-80" />
            <blockquote className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-tight font-medium">
              “We don’t find your soulmate. We help you meet the people you
              might choose.”
            </blockquote>
            <p className="mx-auto mt-6 max-w-xl text-white/85">
              No AI soulmate scores. No compatibility percentages. Technology
              should create a trusted environment — the person, not an
              algorithm, makes the decision.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading
            num="02"
            eyebrow="How it works"
            title={
              <>
                Check. Connect. <em className="text-clay italic">Choose.</em>
              </>
            }
            subtitle="A simple three-step journey designed to move you from screen to real life."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {journeySteps.map((step, i) => {
              const tones = [
                {
                  pill: "bg-peach-soft text-clay",
                  hover: "hover:border-clay",
                  glow: "hover:shadow-[0_20px_50px_-30px_rgba(196,100,62,0.5)]",
                },
                {
                  pill: "bg-butter-soft text-marigold-deep",
                  hover: "hover:border-marigold",
                  glow: "hover:shadow-[0_20px_50px_-30px_rgba(242,168,61,0.5)]",
                },
                {
                  pill: "bg-mint-soft text-sage-deep",
                  hover: "hover:border-sage",
                  glow: "hover:shadow-[0_20px_50px_-30px_rgba(125,158,113,0.5)]",
                },
              ];
              return (
                <Reveal key={step.title} delay={i * 0.1}>
                  <article
                    className={`card group flex h-full flex-col p-8 transition-all duration-300 hover:-translate-y-1 ${tones[i].hover} ${tones[i].glow}`}
                  >
                    <span
                      className={`font-display inline-block self-start rounded-full px-3.5 py-1 text-sm tracking-[0.14em] ${tones[i].pill}`}
                    >
                      {step.num}
                    </span>
                    <h3 className="font-display mt-4 text-3xl font-medium uppercase tracking-wide">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-mocha">{step.tagline}</p>
                    <p className="mt-4 text-sm text-mocha">{step.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <Link
                href="/journey"
                className="inline-flex items-center gap-2 font-medium text-clay transition-colors hover:text-clay-dark"
              >
                Explore the full journey <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-[linear-gradient(135deg,#fcf0d8_0%,#fce9dc_100%)] px-8 py-14 text-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-marigold/25 blur-2xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-rose/20 blur-2xl"
              />
              <p className="eyebrow relative z-10">60-second quiz</p>
              <h2 className="font-display relative z-10 mx-auto max-w-xl text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-tight">
                What’s your <span className="highlight">meeting style</span>?
              </h2>
              <p className="relative z-10 mx-auto mt-4 max-w-xl text-mocha">
                Coffee tables, cooking classes, long dinners or weekend escapes —
                answer five questions and find the room where you connect best.
              </p>
              <Link href="/quiz" className="btn btn-solid relative z-10 mt-7">
                Take the style quiz
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 pt-0">
        <div className="container-x">
          <SectionHeading
            num="03"
            eyebrow="The offline moat"
            title={
              <>
                Events aren’t a side feature.
                <br />
                They’re the product.
              </>
            }
            subtitle="Met To Be makes it easier and safer to meet in real life — small rooms, real conversations, zero pressure."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {eventTypes.slice(0, 8).map((event, i) => (
              <Reveal key={event.title} delay={(i % 4) * 0.08}>
                <div className="card group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-clay hover:shadow-[0_20px_50px_-30px_rgba(196,100,62,0.5)]">
                  <span
                    className={`font-display block text-lg font-semibold tracking-[0.1em] ${eventTones[i % 4]}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-2 pr-20 text-lg font-medium">{event.title}</h3>
                  <p className="mt-1 text-sm text-mocha">{event.description}</p>
                  <div className="mt-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                        event.hot ? "bg-clay text-white" : "bg-linen text-mocha"
                      }`}
                    >
                      {event.hot ? "Waitlist only" : event.seats}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="font-display mt-16 text-center text-[clamp(1.3rem,2.4vw,1.8rem)]">
              “The app gets people to the right room. The humans take it from there.”
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <figure className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-ink/10 bg-sand px-8 py-12 sm:px-14">
              <Quote
                aria-hidden="true"
                size={140}
                strokeWidth={1}
                className="absolute -right-4 -top-6 text-rose/25"
              />
              <figcaption className="eyebrow">From the founder’s desk</figcaption>
              <blockquote>
                <p className="founder-dropcap relative z-10 text-lg leading-relaxed">
                  Somewhere along the way, finding a life partner became either a game
                  of swipes or a transaction of biodata. We refused both. Met To Be
                  exists because this decision deserves better rooms, better questions
                  and better company — verified people, small tables and conversations
                  that actually go somewhere.
                </p>
                <p className="relative z-10 mt-5 leading-relaxed text-mocha">
                  Technology will never choose your partner. It will verify the room
                  you walk into, introduce you well — then step back. What happens next
                  belongs to two humans.
                </p>
              </blockquote>
              <p className="font-display mt-8 text-lg italic">
                <Heart
                  aria-hidden="true"
                  size={15}
                  className="mr-1.5 inline -translate-y-px fill-rose text-rose"
                />
                The founding team
              </p>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 pt-0">
        <div className="container-x">
          <SectionHeading
            eyebrow="The Journal"
            title={
              <>
                Notes on <em className="text-clay italic">modern marriage</em>
              </>
            }
          />
          <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <Link href={`/journal/${post.slug}`} className={`group block h-full border-t-2 pt-5 transition-transform duration-300 hover:-translate-y-1 ${journalCatTones[post.category]?.split(" ")[1] ?? "border-clay/70"}`}>
                  <span className={`text-xs font-semibold uppercase tracking-[0.14em] ${journalCatTones[post.category]?.split(" ")[0] ?? "text-clay"}`}>
                    {post.category}
                  </span>
                  <h3 className="font-display mt-2.5 text-xl font-medium leading-snug transition-colors group-hover:text-clay">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-mocha">{post.excerpt}</p>
                  <span className="mt-3 block text-xs text-mocha/70">
                    {post.date} · {post.readTime}
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
