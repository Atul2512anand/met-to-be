export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "no-compatibility-scores",
    title: "Why we will never build a compatibility score.",
    category: "Philosophy",
    date: "August 18, 2026",
    readTime: "4 min read",
    excerpt:
      "Every platform wants to grade your love life with a percentage. Here is why Met To Be refuses — and what we offer instead.",
    body: [
      "Somewhere in every dating app’s roadmap sits the same seductive idea: reduce a human being to a vector, compare vectors, print a percentage. “You two are an 89% match.” It feels scientific. It photographs well in pitch decks. And it quietly tells two adults that a formula knows their future better than they do.",
      "Let us be clear about what we are not arguing. Information matters. Verification matters. Knowing that someone wants marriage within two years, that they love trekking on weekends, that family will eventually matter to them — all of that is useful context before you agree to meet. Context is a gift; a score is an instruction. People optimise for numbers — they message the 92% and ignore the 71% — and the number was never a promise. It was a rounding error wearing a lab coat.",
      "Marriage decisions get made on things no questionnaire has ever captured: how someone treats a waiter when the kitchen gets an order wrong, whether your humour survives a delayed flight together, how you both behave when a parent falls ill. These are discovered in rooms, across tables, over time — which is exactly why our product is built around real meetings instead of longer questionnaires.",
      "So here is our honest offer. We will tell you who joined and what they intend, because intent is verified. We will curate rooms of ten to twenty people who are actually looking for marriage, because density beats volume. We will hand you conversation starters and safer settings for first meetings. What we will never do is finish the sentence “you are X percent compatible” — because the people in the story hold the pen, not the platform.",
      "Humans decide. That is not a limitation of our technology. It is the entire point of our product.",
    ],
  },
  {
    slug: "dont-swipe-meet",
    title: "The story behind “Don’t swipe. Meet.”",
    category: "Brand",
    date: "August 9, 2026",
    readTime: "3 min read",
    excerpt:
      "Our campaign line is not a slogan against technology — it is a verdict on what eight years of swiping taught us about intention.",
    body: [
      "Every brand has one sentence it would defend in a blackout. Ours is four words long: don’t swipe, meet. People assume it is marketing against dating apps. It is not. It is marketing against a specific behaviour — judging a whole person in half a second — that swiping trained into an entire generation.",
      "Swiping solved distribution, not intention. It gave millions of people access to infinite profiles, and left many of them lonelier than before. Infinite choice produced paralysis; rejection at a thumb’s distance made everyone feel disposable, including the person doing the rejecting. The technology was brilliant. The culture it produced was exhausting.",
      "Meanwhile, the traditional matrimonial aisle had its own problems: PDF biodatas, filters for salary and surname, families negotiating like procurement teams. Marriage treated as paperwork. Two broken systems, one shared flaw — nobody was designing for the moment two people actually meet.",
      "“Don’t swipe. Meet.” is our bridge between those worlds. Modern product experience without swipe culture. Explicit marriage intent without transactions. In practice: meet requests instead of endless likes, mutual intent confirmed before deeper messaging, and curated rooms of ten to twenty verified people where chemistry is allowed to be accidental again.",
      "If you remember one thing from our campaign, let it be this: the app’s job ends where the room begins. The humans take it from there.",
    ],
  },
  {
    slug: "safer-first-meetings",
    title: "What actually makes a first meeting feel safe?",
    category: "Safety",
    date: "July 28, 2026",
    readTime: "5 min read",
    excerpt:
      "Verification lowers risk; design removes friction from caution. The practical playbook we build into every introduction and event.",
    body: [
      "Most safety advice fails because it treats caution and romance as opposites. Either you relax and hope for the best, or you spend the evening running background checks from the bathroom. We think that is a false choice — the job of a well-designed platform is to make caution feel like hospitality rather than homework.",
      "Layer one is identity. Every member completes government ID verification with a liveness check before they can browse anyone at all. Selected claims — education, profession — can carry additional verification badges. Your documents stay private forever; only the badge is visible. You can judge the badge without ever seeing someone’s paperwork, and they can keep their paperwork while still being trusted.",
      "Layer two is environment defaults. First meetings happen in public venues — we recommend curated cafés and formats designed for daylight hours. Meeting details can be shared with a trusted contact in two taps, so someone always knows where you are without you having to explain why you are asking. At events, rooms are small and hosted; leaving early never requires an excuse.",
      "Layer three is feedback loops. After every introduction and event we invite private signals — discreet, reviewed by humans, acted on quickly. Blocking works everywhere in the product at once, and moderation does not sleep because reports queue for days. Patterns get caught; accounts disappear; the community stays worth belonging to.",
      "One honest caveat, because trust dies in fine print: verification reduces uncertainty, it never eliminates risk. Anyone promising total safety is selling certainty that does not exist. Our promise is narrower and more useful — real identities, intentional company, humane defaults, and fast humans when something feels off.",
    ],
  },
];
