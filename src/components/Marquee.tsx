const phrases = ["Maybe you haven’t met them yet.", "Meet. Connect. Choose."];

export default function Marquee() {
  return (
    <div className="overflow-hidden bg-ink py-4 text-cream" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {Array.from({ length: 4 }).flatMap((_, round) =>
              phrases.map((phrase, i) => (
                <span
                  key={`${round}-${i}`}
                  className={`font-display px-3 text-lg tracking-[0.14em] ${
                    i === 1 ? "text-clay" : "text-cream"
                  }`}
                >
                  {phrase.toUpperCase()}
                  <span className="pl-6 text-clay">·</span>
                </span>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
