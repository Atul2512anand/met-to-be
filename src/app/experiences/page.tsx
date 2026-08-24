import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import ExperienceBrowser from "@/components/ExperienceBrowser";
import { experiences } from "@/lib/events";

export const metadata: Metadata = {
  title: "Experiences in Bengaluru",
  description:
    "Brunches, coffee conversations, after-hours evenings, dog-park mornings and curated weekend escapes — meet verified, marriage-minded people in real life.",
};

export default async function ExperiencesPage({
  searchParams,
}: PageProps<"/experiences">) {
  const { category } = await searchParams;

  return (
    <>
      <section className="bg-sand py-20">
        <div className="container-x max-w-3xl">
          <SectionHeading
            eyebrow="Bengaluru · Verified members only"
            title={
              <>
                Experiences in{" "}
                <em className="text-clay italic">Bengaluru</em>
              </>
            }
            subtitle="Every seat is verified members only, hosted, and deliberately small. Find one that fits your life."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <Reveal>
            <ExperienceBrowser
              events={experiences}
              initialCategory={typeof category === "string" ? category : undefined}
            />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
