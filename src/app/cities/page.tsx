import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import CityWaitlistForm from "@/components/CityWaitlistForm";
import { cities } from "@/lib/events";

export const metadata: Metadata = {
  title: "Cities",
  description:
    "Met & Wed is live in Bengaluru. Mumbai, Delhi NCR, Hyderabad, Pune and Chennai are coming soon — join your city’s waitlist.",
};

const comingSoon = cities.filter((c) => c.status === "coming-soon");

export default function CitiesPage() {
  return (
    <>
      <section className="bg-sand py-20">
        <div className="container-x max-w-3xl">
          <SectionHeading
            eyebrow="City expansion"
            title={
              <>
                One city at a time,{" "}
                <em className="text-clay italic">done properly</em>
              </>
            }
            subtitle="We don’t expand because of downloads alone. The next city opens only after Bengaluru has enough verified members, successful experiences and real meetings."
          />
        </div>
      </section>

      <section className="pb-24 pt-16">
        <div className="container-x">
          <Reveal>
            <Link
              href="/experiences"
              className="group flex flex-col items-start justify-between gap-6 rounded-3xl bg-[linear-gradient(135deg,#d2703f,#a94f2d)] p-10 text-white transition-all duration-300 hover:-translate-y-1 lg:flex-row lg:items-center lg:p-12"
            >
              <div>
                <p className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] backdrop-blur-sm">
                  <MapPin size={13} /> Live now
                </p>
                <h2 className="font-display mt-4 text-4xl font-medium">Bengaluru</h2>
                <p className="mt-2 max-w-md text-white/85">
                  Experiences are running this month across Indiranagar,
                  Koramangala, Malleshwaram and beyond.
                </p>
              </div>
              <span className="btn btn-light shrink-0">See experiences</span>
            </Link>
          </Reveal>

          <div className="mt-14 space-y-14">
            {comingSoon.map((city) => (
              <Reveal key={city.name}>
                <div className="grid items-center gap-8 rounded-3xl border border-ink/10 bg-sand/60 p-8 lg:grid-cols-[1.2fr_1.4fr] lg:p-12">
                  <div>
                    <p className="eyebrow">Coming soon</p>
                    <h2 className="font-display text-3xl font-medium leading-tight">
                      Met &amp; Wed is coming to{" "}
                      <span className="text-clay">{city.name}</span>.
                    </h2>
                    <p className="mt-3 max-w-md leading-relaxed text-mocha">
                      We’re building the next city for people who are ready to meet
                      differently. Waitlist members get first invitations.
                    </p>
                  </div>
                  <CityWaitlistForm city={city.name} />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mx-auto mt-16 max-w-2xl text-center font-display text-xl italic text-mocha">
              Bengaluru → prove the model → Mumbai → Delhi NCR → Hyderabad → Pune →
              Chennai
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
