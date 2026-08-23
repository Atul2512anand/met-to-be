export const compareColumns = [
  {
    title: "Dating apps",
    points: [
      "Modern and easy to use",
      "Often unclear intentions",
      "Endless swiping",
      "Online-first",
      "Trust varies",
    ],
  },
  {
    title: "Traditional matrimony",
    points: [
      "Marriage-oriented",
      "Profile and biodata driven",
      "Large databases",
      "Family- and profile-first",
      "Verification varies",
    ],
  },
  {
    title: "Met To Be",
    featured: true,
    points: [
      "Modern and marriage-oriented",
      "Explicit marriage intent",
      "Curated discovery",
      "Real-life meetings",
      "Verification as a core trust layer",
      "Events are part of the product",
    ],
  },
];

export const journeySteps = [
  {
    num: "01",
    title: "Check",
    tagline: "Know who is joining",
    description:
      "Every member completes a structured profile and the platform verification process before discovery begins.",
    points: [
      "Structured profiles — age, location, profession, education, height",
      "Lifestyle — interests, travel, food, fitness, pets, social habits",
      "Marriage expectations — timeline, children, relocation, family involvement",
      "Verification indicators — identity verified and profile verified badges",
      "Privacy controls — sensitive documents are never displayed publicly",
    ],
  },
  {
    num: "02",
    title: "Connect",
    tagline: "Move from screen to real life",
    description:
      "Instead of optimizing for endless chat, Met To Be creates a path toward a real meeting.",
    points: [
      "Meet requests instead of endless likes and swipes",
      "Mutual connection required before deeper communication",
      "In-app chat, voice and video with meeting coordination",
      "Safety tools, reporting and blocking built in",
      "Curated events where members can meet naturally",
    ],
  },
  {
    num: "03",
    title: "Choose",
    tagline: "Decide for yourself",
    description:
      "After a conversation or an event, you choose the next step. No algorithm decides for you.",
    options: [
      "I’d like to meet again",
      "I’d like to continue talking",
      "I’d like to involve family later",
      "I’m unsure",
      "I’m not interested",
    ],
  },
];

export const eventTypes = [
  {
    title: "Small curated meetups",
    description: "Intentional rooms of 10–20 verified members.",
    seats: "12 seats",
  },
  {
    title: "Brunches and dinners",
    description: "Long-table conversations over good food.",
    seats: "16 seats",
  },
  {
    title: "Coffee and conversation",
    description: "Low-pressure formats designed for real talk.",
    seats: "10 seats",
    hot: true,
  },
  {
    title: "Activity-based experiences",
    description: "Art, cooking and outdoor events that break the ice.",
    seats: "8 pairs",
  },
  {
    title: "Pet-friendly experiences",
    description: "Because lifestyle compatibility shows up early.",
    seats: "14 seats",
  },
  {
    title: "Resort weekends",
    description: "Premium curated escapes for deeper connection.",
    seats: "20 rooms",
    hot: true,
  },
  {
    title: "Community-specific events",
    description: "Shared culture when it matters to you.",
    seats: "18 seats",
  },
  {
    title: "Inter-community events",
    description: "Rooms built on openness and shared intent.",
    seats: "24 seats",
  },
];

export const eventFlow = [
  {
    step: "Register",
    description: "Browse verified-member-only events and reserve a seat.",
  },
  {
    step: "Get your ticket",
    description: "Your ticket includes your event credit or experience fee.",
  },
  {
    step: "Meet in real life",
    description: "Small rooms, light structure, zero pressure to perform.",
  },
  {
    step: "Share private feedback",
    description: "Discreet post-event signals improve every future room.",
  },
];

export const trustItems = [
  {
    title: "Identity + liveness verification",
    description: "Every member is checked before discovery access opens.",
  },
  {
    title: "Optional claim verification",
    description: "Education, profession and other profile claims can be additionally verified.",
  },
  {
    title: "Clear badges, private documents",
    description: "Status is visible. Your sensitive documents never are.",
  },
  {
    title: "In-app communication",
    description: "No pressure to exchange personal numbers before you are ready.",
  },
  {
    title: "Report, block and moderation",
    description: "Fast workflows backed by human review.",
  },
  {
    title: "Safer first meetings",
    description: "Public-venue recommendations and trusted-contact safety options.",
  },
];

export const familyPoints = [
  "Family brunches and dinners hosted by Met To Be",
  "Neutral-location family experiences without home pressure",
  "Optional participation only after the relationship progresses",
  "Controlled family access in future — never parent-controlled accounts",
];

export const audiencePoints = [
  "You want marriage, not another chat that goes nowhere",
  "You dislike traditional matrimonial experiences",
  "You are tired of unclear intentions on dating apps",
  "You value family input — on your terms, at your pace",
  "You would rather meet over coffee than over two hundred messages",
];

export const plans = [
  {
    name: "Core Membership",
    price: "₹3,000–₹4,000",
    per: "per membership cycle",
    features: [
      "Verified profile and discovery",
      "Connections and communication",
      "One event or date credit included",
    ],
  },
  {
    name: "Met To Be Plus",
    price: "₹7,999–₹12,999",
    per: "for three months",
    badge: "Most chosen",
    featured: true,
    features: [
      "Priority access to new members",
      "Premium event invitations",
      "Additional services and credits",
    ],
  },
  {
    name: "Paid Experiences",
    price: "₹999–₹15,000+",
    per: "per experience",
    features: [
      "Brunches, dinners and activities",
      "Resort and weekend experiences",
      "Always small and curated group sizes",
    ],
  },
  {
    name: "Concierge",
    price: "₹25,000–₹75,000+",
    per: "human-led programme",
    features: [
      "Assisted introductions",
      "Dedicated relationship support",
      "Completely human-led, no algorithms",
    ],
  },
];

export const faqs = [
  {
    q: "Is this a dating app?",
    a: "No. Met To Be is a marriage-intent relationship platform. Every member declares serious intent, verification is mandatory, and the product is designed to move you from screen to real life — not to keep you scrolling.",
  },
  {
    q: "Do you use AI matchmaking?",
    a: "Never. We provide information, context, verification and opportunities to meet. The person — not an algorithm — makes the relationship decision.",
  },
  {
    q: "Does verification guarantee safety?",
    a: "We will never claim that. Verification reduces uncertainty; it does not eliminate risk. Your judgment, our safety tools and real-world settings do the rest.",
  },
  {
    q: "Where does Met To Be launch first?",
    a: "One city at a time, density-first. Our Founding 100 members shape the culture and events of the launch city before we expand anywhere else.",
  },
  {
    q: "Are families involved?",
    a: "Only when you choose. Family can enter the journey after a relationship has progressed — through neutral-location experiences, never parent-controlled accounts.",
  },
];

export type QuizStyleKey = "coffee" | "activity" | "dining" | "escape";

export const quizStyleMeta: Record<
  QuizStyleKey,
  { title: string; tagline: string; description: string; formats: string[] }
> = {
  coffee: {
    title: "The Deep Talker",
    tagline: "Coffee first, phones away.",
    description:
      "You connect through unhurried, one-on-one conversation. Low-key rooms, real eye contact, and the freedom to talk about what actually matters.",
    formats: ["Coffee and conversation experiences", "Small curated meetups"],
  },
  activity: {
    title: "The Doer",
    tagline: "Better together, doing something.",
    description:
      "You open up when you are making, building or trying something side by side. Shared experiences beat interviews — cook, paint, hike, laugh, repeat.",
    formats: ["Activity-based experiences", "Pet-friendly experiences"],
  },
  dining: {
    title: "The Long-Table Conversationalist",
    tagline: "Stories stretch past dessert.",
    description:
      "You fall for good conversation across a good table. Long meals, many voices, and the kind of evening that turns strangers into friends.",
    formats: ["Brunches and dinners", "Community-specific events"],
  },
  escape: {
    title: "The Weekend Explorer",
    tagline: "Change the scene, change everything.",
    description:
      "You need a change of scenery to let your guard down. Curated escapes turn guarded hellos into easy company faster than anything else.",
    formats: ["Resort and weekend escapes", "Inter-community events"],
  },
};

export const formatLabels: Record<QuizStyleKey, string> = {
  coffee: "coffee and conversation",
  activity: "activity experiences",
  dining: "brunches and dinners",
  escape: "resort weekends",
};

export const quizQuestions: {
  question: string;
  options: { label: string; style: QuizStyleKey }[];
}[] = [
  {
    question: "Your ideal first meeting looks like…",
    options: [
      { label: "A quiet café on a Sunday afternoon", style: "coffee" },
      { label: "A pottery or cooking class", style: "activity" },
      { label: "A long-table dinner with new faces", style: "dining" },
      { label: "A Saturday drive somewhere scenic", style: "escape" },
    ],
  },
  {
    question: "You break the ice by…",
    options: [
      { label: "Asking the question nobody else does", style: "coffee" },
      { label: "Suggesting you try it together", style: "activity" },
      { label: "Sharing a story over something delicious", style: "dining" },
      { label: "Pointing at the horizon and planning ahead", style: "escape" },
    ],
  },
  {
    question: "The room that suits you best…",
    options: [
      { label: "Just the two of us", style: "coffee" },
      { label: "A small circle of four to six", style: "activity" },
      { label: "A lively table of ten", style: "dining" },
      { label: "Twenty people and one bonfire", style: "escape" },
    ],
  },
  {
    question: "A great conversation usually ends with…",
    options: [
      { label: "“Same time next week?”", style: "coffee" },
      { label: "“So… what do we try next?”", style: "activity" },
      { label: "Dessert and another round of chai", style: "dining" },
      { label: "A group photo and a plan", style: "escape" },
    ],
  },
  {
    question: "Conversations about marriage should…",
    options: [
      { label: "Happen early and honestly", style: "coffee" },
      { label: "Grow naturally over shared wins", style: "activity" },
      { label: "Eventually include the family", style: "dining" },
      { label: "Wait until the trip photos exist", style: "escape" },
    ],
  },
];
