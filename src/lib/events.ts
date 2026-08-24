export type ExperienceCategory =
  | "brunches"
  | "coffee"
  | "after-hours"
  | "paws"
  | "weekend"
  | "family-table";

export type Tone = "clay" | "marigold" | "sage" | "rose";

export type Experience = {
  slug: string;
  name: string;
  tagline: string;
  category: ExperienceCategory;
  area: string;
  dateLabel: string;
  ageRange: string;
  price: number;
  priceNote?: string;
  spotsLeft: number;
  totalSpots: number;
  tone: Tone;
  whatYoullExperience: string[];
  whoWillBeThere: string;
  whatToKnow: {
    venue: string;
    duration: string;
    dressCode: string;
    accessibility: string;
    checkIn: string;
    safety: string;
    cancellation: string;
  };
};

export const categories: {
  key: ExperienceCategory;
  label: string;
  blurb: string;
}[] = [
  { key: "brunches", label: "Brunches", blurb: "Meet over good food." },
  {
    key: "coffee",
    label: "Coffee & Conversations",
    blurb: "Small groups. Easy conversations.",
  },
  {
    key: "after-hours",
    label: "After Hours",
    blurb: "For Bengaluru’s working professionals.",
  },
  { key: "paws", label: "Paws & People", blurb: "Because lifestyle matters too." },
  { key: "weekend", label: "The Weekend", blurb: "Curated resort experiences." },
  {
    key: "family-table",
    label: "Family Table",
    blurb: "For when the relationship moves forward.",
  },
];

export const categoryLabels: Record<ExperienceCategory, string> = Object.fromEntries(
  categories.map((c) => [c.key, c.label])
) as Record<ExperienceCategory, string>;

const baseKnow = {
  venue: "Shared privately after registration",
  duration: "About two and a half hours",
  dressCode: "Smart casual",
  accessibility: "Ground-floor, step-free seating",
  checkIn: "Carry your confirmation reference",
  safety: "Host present throughout · verified attendees only",
  cancellation: "Full refund up to 72 hours before the experience",
};

export const experiences: Experience[] = [
  {
    slug: "the-first-table",
    name: "The First Table",
    tagline:
      "A curated Sunday brunch for people who are ready to meet someone seriously.",
    category: "brunches",
    area: "Indiranagar",
    dateLabel: "Sun · 11:00 AM",
    ageRange: "25–35",
    price: 1499,
    spotsLeft: 18,
    totalSpots: 25,
    tone: "clay",
    whatYoullExperience: [
      "A long Sunday table at a handpicked Indiranagar café",
      "Chef-special brunch menu — veg and non-veg",
      "Gentle conversation prompts, zero icebreaker games",
      "A host who keeps the room warm and unhurried",
    ],
    whoWillBeThere:
      "Verified members aged 25–35 who joined because they are open to marriage and ready to meet in real life.",
    whatToKnow: baseKnow,
  },
  {
    slug: "off-the-clock",
    name: "Off The Clock",
    tagline: "After-work conversations for Bengaluru professionals.",
    category: "after-hours",
    area: "Koramangala",
    dateLabel: "Fri · 7:30 PM",
    ageRange: "28–38",
    price: 999,
    spotsLeft: 12,
    totalSpots: 20,
    tone: "rose",
    whatYoullExperience: [
      "A relaxed rooftop evening in Koramangala",
      "Small rotating circles instead of one awkward mixer",
      "Light snacks and a paid bar counter",
      "Leave-when-you-want energy, no last-minute pressure",
    ],
    whoWillBeThere:
      "Working professionals aged 28–38 who want marriage intent without matrimonial energy.",
    whatToKnow: baseKnow,
  },
  {
    slug: "paws-and-people",
    name: "Paws & People",
    tagline: "A relaxed morning for people who love dogs.",
    category: "paws",
    area: "Cubbon Park",
    dateLabel: "Sat · 9:00 AM",
    ageRange: "25–40",
    price: 499,
    spotsLeft: 20,
    totalSpots: 24,
    tone: "sage",
    whatYoullExperience: [
      "A guided Cubbon Park walk with the city’s friendliest dogs",
      "Filter coffee and bites at a pet-friendly café after",
      "Lifestyle-first conversation — no interview mode",
      "Welcome with or without your own dog",
    ],
    whoWillBeThere:
      "Dog people aged 25–40. Because lifestyle compatibility shows up early.",
    whatToKnow: { ...baseKnow, duration: "About two hours" },
  },
  {
    slug: "the-long-lunch",
    name: "The Long Lunch",
    tagline: "A slower, more intentional way to meet.",
    category: "brunches",
    area: "Central Bengaluru",
    dateLabel: "Sat · 12:30 PM",
    ageRange: "30–42",
    price: 1799,
    spotsLeft: 4,
    totalSpots: 16,
    tone: "marigold",
    whatYoullExperience: [
      "One long table, one unhurried afternoon",
      "A multi-course meal built for conversation",
      "Phones away by choice — the room does the work",
      "Eight-to-sixteen seats only, always curated",
    ],
    whoWillBeThere:
      "Members aged 30–42 who prefer depth over volume and are done rushing.",
    whatToKnow: baseKnow,
  },
  {
    slug: "filter-kapi-real-talk",
    name: "Filter Kapi, Real Talk",
    tagline: "Small groups. Easy conversations over real filter coffee.",
    category: "coffee",
    area: "Malleshwaram",
    dateLabel: "Sat · 5:00 PM",
    ageRange: "25–34",
    price: 299,
    spotsLeft: 6,
    totalSpots: 10,
    tone: "marigold",
    whatYoullExperience: [
      "Ten seats around a legacy Malleshwaram coffee house",
      "Two easy conversation rounds picked by your host",
      "Filter kapi, bajjis, and zero performance pressure",
    ],
    whoWillBeThere:
      "A tight circle of verified members aged 25–34 who prefer calm rooms.",
    whatToKnow: { ...baseKnow, duration: "About ninety minutes" },
  },
  {
    slug: "the-weekend-retreat",
    name: "The Weekend Retreat",
    tagline: "A curated resort escape on the edge of the city.",
    category: "weekend",
    area: "Nandi Hills foothills",
    dateLabel: "Sat–Sun",
    ageRange: "27–39",
    price: 6999,
    spotsLeft: 5,
    totalSpots: 14,
    tone: "clay",
    whatYoullExperience: [
      "An overnight resort stay with shared activities",
      "Nature walk, games evening and a bonfire dinner",
      "Twin-sharing stay with same-gender roommates",
      "The format where guarded hellos become easy company",
    ],
    whoWillBeThere:
      "Fourteen verified members aged 27–39 selected for balance and intent.",
    whatToKnow: {
      ...baseKnow,
      duration: "One night, two days",
      cancellation: "Full refund up to 7 days before · 50% up to 72 hours",
    },
  },
  {
    slug: "family-table",
    name: "Family Table",
    tagline: "For when the relationship is ready for both families.",
    category: "family-table",
    area: "Central Bengaluru",
    dateLabel: "On request",
    ageRange: "By invitation",
    price: 999,
    priceNote: "per couple",
    spotsLeft: 8,
    totalSpots: 8,
    tone: "sage",
    whatYoullExperience: [
      "A neutral, hosted family lunch — no home-court pressure",
      "Your host briefs both families beforehand",
      "The couple decides when this stage happens. Not before.",
    ],
    whoWillBeThere:
      "One couple, their parents, and a Met & Wed host keeping it human.",
    whatToKnow: {
      ...baseKnow,
      checkIn: "Booked together as a couple after mutual interest",
      cancellation: "Reschedule anytime up to 48 hours before",
    },
  },
];

export const cities = [
  { name: "Bengaluru", status: "live" as const },
  { name: "Mumbai", status: "coming-soon" as const },
  { name: "Delhi NCR", status: "coming-soon" as const },
  { name: "Hyderabad", status: "coming-soon" as const },
  { name: "Pune", status: "coming-soon" as const },
  { name: "Chennai", status: "coming-soon" as const },
];

export function getExperience(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}

export const featuredExperiences = [
  "the-first-table",
  "off-the-clock",
  "paws-and-people",
  "the-long-lunch",
].map((slug) => getExperience(slug)!);

export const journeySteps = [
  {
    num: "01",
    title: "Check",
    tagline: "See who is joining",
    description:
      "Every member completes a structured profile and identity verification before discovery begins.",
    points: [
      "Structured profiles — age, area, profession, education",
      "Lifestyle — interests, food, fitness, pets, social habits",
      "Marriage expectations — timeline, family involvement",
      "Verified badges — never documents",
    ],
  },
  {
    num: "02",
    title: "Connect",
    tagline: "Choose who you would like to meet",
    description:
      "Send an I’d Like To Meet request instead of swiping. Mutual interest unlocks conversation.",
    points: [
      "I’d Like To Meet — never like, swipe or match",
      "Mutual interest unlocks in-app chat",
      "Meet requests over endless messaging",
      "Report, block and moderation built in",
    ],
  },
  {
    num: "03",
    title: "Meet",
    tagline: "Meet in real life and decide for yourself",
    description:
      "Book an experience or plan a safe first meeting. Then choose your pace:",
    options: [
      "Meet again",
      "Keep talking",
      "Involve families later",
      "Not interested",
    ],
  },
];
