const phrases = ["Don’t swipe.", "Meet."];

export default function Marquee() {
  return (
    <div className="overflow-hidden bg-ink py-4 text-cream" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {Array.from({ length: 6 }).flatMap((_, round) =>
              phrases.map((phrase, i) => (
                <span
                  key={`${round}-${i}`}
                  className={`font-display px-2 text-lg tracking-[0.16em] ${
                    phrase === "Meet." ? "text-clay" : "text-cream"
                  }`}
                >
                  {phrase.toUpperCase()}
                </span>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
