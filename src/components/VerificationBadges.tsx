import { ClipboardCheck, GraduationCap, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const badges = [
  {
    icon: ShieldCheck,
    title: "Identity Verified",
    status: "Required",
    description:
      "Government ID and a liveness check completed before anyone can browse members. The foundation of every profile on Met To Be.",
    circle: "bg-peach-soft text-clay",
    pill: "bg-clay text-white",
  },
  {
    icon: ClipboardCheck,
    title: "Profile Verified",
    status: "Required",
    description:
      "The structured profile is reviewed against community guidelines — complete, accurate and written with effort.",
    circle: "bg-butter-soft text-marigold-deep",
    pill: "bg-marigold-deep text-white",
  },
  {
    icon: GraduationCap,
    title: "Claim Verified",
    status: "Optional",
    description:
      "Members can additionally verify education, profession or other specific claims. More proof, more confidence — always your choice.",
    circle: "bg-mint-soft text-sage-deep",
    pill: "bg-mint-soft text-sage-deep",
  },
];

export default function VerificationBadges() {
  return (
    <section className="pb-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Verification"
          align="center"
          title="Three badges. One standard."
          subtitle="Every badge is earned through documents and checks — never self-declared. Private documents stay private; only the badge is visible."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {badges.map((badge, i) => (
            <Reveal key={badge.title} delay={i * 0.08}>
              <div className="card h-full p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-clay hover:shadow-[0_20px_50px_-30px_rgba(196,100,62,0.5)]">
                <span className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${badge.circle}`}>
                  <badge.icon size={26} />
                </span>
                <h3 className="font-display mt-5 text-xl font-medium">{badge.title}</h3>
                <span
                  className={`mt-2 inline-block rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-[0.08em] ${badge.pill}`}
                >
                  {badge.status}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-mocha">{badge.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
