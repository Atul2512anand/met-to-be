import Link from "next/link";
import { ArrowRight, Heart, MapPin, Quote } from "lucide-react";
import Marquee from "@/components/Marquee";
import TrustStatsBand from "@/components/TrustStatsBand";
import HeroPaths from "@/components/HeroPaths";
import ExperienceCard from "@/components/ExperienceCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import Logo from "@/components/Logo";
import { categories, featuredExperiences, journeySteps } from "@/lib/events";
import { posts } from "@/lib/posts";

const journalCatTones: Record<string, string> = {
  Philosophy: "text-clay border-clay/70",
  Brand: "text-marigold-deep border-marigold/70",
  Safety: "text-sage-deep border-sage/70",
};

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[radial-gradient(55%_80%_at_82%_12%,rgba(242,168,61,0.22),transparent_60%),radial-gradient(45%_70%_at_10%_85%,rgba(226,121,144,0.18),transparent_60%),radial-gradient(35%_55%_at_28%_15%,rgba(125,158,113,0.16),transparent_60%)] py-20 lg:py-28">
        <HeroPaths />
        <div
          aria-hidden="true"
          className="floaty pointer-events-none absolute -left-20 top-24 h-60 w-60 rounded-full bg-marigold/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="floaty-delay pointer-events-none absolute -right-12 bottom-8 h-72 w-72 rounded-full bg-rose/20 blur-3xl"
        />
        <div className="container-x relative z-10 mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="inline-flex items-center gap-1.5 rounded-full border border-clay/30 bg-[#FFFDF9] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-mocha">
              <MapPin size={13} className="text-clay" />
              Currently in Bengaluru · Other cities coming soon
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-7 text-[clamp(2.5rem,6vw,4.8rem)] font-medium leading-[1.08] tracking-tight">
              Maybe you haven’t
              <br />
              <span className="highlight">met them</span> yet.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-mocha">
              A modern way to meet people who are ready for marriage.
              <br className="hidden sm:block" />
              No endless swiping. No biodata hunting. No algorithm deciding your
              future.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link href="/experiences" className="btn btn-solid">
                Explore Bengaluru experiences
              </Link>
              <Link href="/how-it-works" className="btn btn-outline">
                How Met &amp; Wed works
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee />

      <section className="pb-4 pt-16">
        <div className="container-x">
          <SectionHeading
            num="01"
            eyebrow="Event discovery"
            title={
              <>
                What’s happening in{" "}
                <em className="text-clay italic">Bengaluru?</em>
              </>
            }
            subtitle="Find an experience. Meet verified people. See where it goes."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredExperiences.map((experience, i) => (
              <Reveal key={experience.slug} delay={(i % 4) * 0.08}>
                <ExperienceCard experience={experience} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 text-center">
              <Link
                href="/experiences"
                className="inline-flex items-center gap-2 font-medium text-clay transition-colors hover:text-clay-dark"
              >
                Explore all experiences <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
              <Reveal key={category.key} delay={(i % 3) * 0.06}>
                <Link
                  href={`/experiences?category=${category.key}`}
                  className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-[#FFFDF9] px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-clay"
                >
                  <span>
                    <span className="font-display block text-base font-semibold uppercase tracking-wide">
                      {category.label}
                    </span>
                    <span className="text-sm text-mocha">{category.blurb}</span>
                  </span>
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-clay transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TrustStatsBand />

      <section className="py-24 pt-8">
        <div className="container-x max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow">Why Met &amp; Wed</p>
            <h2 className="font-display text-[clamp(1.9rem,3.8vw,3rem)] font-medium leading-tight">
              Not dating. Not matrimony.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-mocha">
              Dating apps were built around endless choice. Matrimonial platforms
              were built around biodata and families. Met &amp; Wed is built around{" "}
              <strong className="text-ink">meeting</strong> — because you cannot
              know whether someone could be your life partner from a profile alone.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-3">
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
          <Reveal>
            <div className="mt-10 text-center">
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 font-medium text-clay transition-colors hover:text-clay-dark"
              >
                See the full journey <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
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
        <div className="container-x relative z-10 grid items-center gap-10 lg:grid-cols-[auto_1fr]">
          <Reveal>
            <Logo className="h-24 w-24 opacity-90" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow !text-white/70">The no-algorithm promise</p>
            <blockquote className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-tight font-medium">
              We don’t choose your person. And we don’t want to.
            </blockquote>
            <p className="mt-5 max-w-2xl text-white/85">
              No soulmate score. No “92% compatible”. We believe you know yourself
              better than a machine does. Our job is to create the opportunity —
              genuine, marriage-minded people in rooms worth being in.
            </p>
            <p className="font-display mt-6 text-xl italic text-marigold">
              You choose the person. We create the opportunity.
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
                  of swipes or a transaction of biodata. We refused both. Met &amp;
                  Wed exists because this decision deserves better rooms, better
                  questions and better company — verified people, small tables and
                  conversations that actually go somewhere.
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
