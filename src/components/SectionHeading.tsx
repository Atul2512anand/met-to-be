import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  num?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  num,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "text-center" : undefined}>
      <p className="eyebrow">
        {num ? (
          <span className="font-display mr-2.5 inline-block rounded-full border border-clay/40 px-2.5 py-0.5 text-[0.7rem] tracking-normal">
            {num}
          </span>
        ) : null}
        {eyebrow}
      </p>
      <h2 className="font-display text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.12] font-medium tracking-tight">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 max-w-2xl text-mocha text-lg ${
            centered ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
