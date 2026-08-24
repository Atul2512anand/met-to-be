export const trustLayers = [
  {
    title: "Identity",
    description:
      "Government ID and liveness verification with clear verified status before discovery opens.",
  },
  {
    title: "Privacy",
    description:
      "Documents stay private forever. Only badges are visible — never government ID or sensitive files.",
  },
  {
    title: "Communication",
    description:
      "Conversations stay in-app until members themselves choose to move elsewhere.",
  },
  {
    title: "Events",
    description:
      "Managed venues, host-led check-in and on-ground support at every experience.",
  },
  {
    title: "Safety tools",
    description:
      "Report, block and moderation workflows backed by human review.",
  },
  {
    title: "Post-event",
    description:
      "Private post-experience feedback and a real escalation path when something feels off.",
  },
];

export const familyPoints = [
  "Hosted family lunches at neutral venues — never home pressure",
  "Your host briefs both families beforehand",
  "The couple initiates this stage. Families never control discovery or decisions",
  "A distinctive progression: Met → Connected → Met again → Introduced → Wed",
];

export const audiencePoints = [
  "You want marriage, not another chat that goes nowhere",
  "You dislike traditional matrimonial experiences",
  "You are tired of unclear intentions on dating apps",
  "You value family input — on your terms, at your pace",
  "You would rather meet over brunch than over two hundred messages",
];

export const stageLadder = [
  { stage: "Discover", experience: "Visitor sees Bengaluru experiences." },
  { stage: "Explore", experience: "Opens an experience and sees who attends." },
  { stage: "Join", experience: "Creates account and confirms marriage intent." },
  { stage: "Profile", experience: "Adds personal, lifestyle and marriage details." },
  { stage: "Verify", experience: "Completes identity verification." },
  { stage: "Membership", experience: "Chooses the Met & Wed Pass." },
  { stage: "Meet", experience: "Books an experience or sends a Meet request." },
  { stage: "Connect", experience: "Mutual interest unlocks communication." },
  { stage: "Experience", experience: "Meets in a real-world setting." },
  { stage: "Continue", experience: "Chooses another meeting or conversation." },
  { stage: "Family", experience: "Optional family involvement when ready." },
  { stage: "Marriage", experience: "The couple makes the decision together." },
];

export const faqs = [
  {
    q: "Is this a dating app?",
    a: "No. Met & Wed is a city events platform for people ready for marriage. Every member verifies identity, declares intent, and meets in curated real-world settings instead of swiping.",
  },
  {
    q: "What does the ₹3,999 Pass include?",
    a: "The Met & Wed Pass gives you verified access to the Bengaluru community: profiles, I’d Like To Meet requests and member pricing on experiences. Individual experience tickets are priced separately. Final launch pricing and inclusions are confirmed by the team before you pay.",
  },
  {
    q: "Do you use AI matchmaking?",
    a: "Never. No soulmate scores, no compatibility percentages. We create better opportunities to meet genuine, marriage-minded people — you choose the person.",
  },
  {
    q: "Does verification guarantee safety?",
    a: "We will never claim that. Verification establishes identity and supports a safer experience; it does not eliminate risk. Your judgment, our hosts, and managed venues do the rest.",
  },
  {
    q: "When do other cities launch?",
    a: "Bengaluru first. Mumbai, Delhi NCR, Hyderabad, Pune and Chennai open only after enough verified members and successful experiences in the current city — density before expansion. Join a city waitlist to be first in line.",
  },
];

export type QuizStyleKey = "coffee" | "activity" | "dining" | "escape";

export const quizStyleMeta: Record<
  QuizStyleKey,
  { title: string; tagline: string; description: string; formats: string[] }
> = {
  coffee: {
    title: "The Easy Conversationalist",
    tagline: "Small groups, filter kapi, easy talk.",
    description:
      "You connect in calm, small-group rooms where conversation happens naturally — no spotlight, no performance.",
    formats: ["Coffee & Conversations", "Paws & People"],
  },
  activity: {
    title: "The After-Hours Pro",
    tagline: "Better after clock-out, together.",
    description:
      "You open up side by side — walk-and-talks, rooftop evenings and shared plans beat formal sit-downs every time.",
    formats: ["After Hours", "Paws & People"],
  },
  dining: {
    title: "The Long-Table Regular",
    tagline: "Stories stretch past dessert.",
    description:
      "You fall for good conversation across a good table. Long brunches and slower meals are where you shine.",
    formats: ["Brunches", "Family Table"],
  },
  escape: {
    title: "The Weekend Escaper",
    tagline: "Change the scene, change everything.",
    description:
      "A change of scenery lets your guard down. Curated weekend turns strangers into easy company fast.",
    formats: ["The Weekend", "Brunches"],
  },
};

export const formatLabels: Record<QuizStyleKey, string> = {
  coffee: "coffee & conversations",
  activity: "after-hours experiences",
  dining: "brunches & long lunches",
  escape: "weekend escapes",
};

export const quizQuestions: {
  question: string;
  options: { label: string; style: QuizStyleKey }[];
}[] = [
  {
    question: "Your ideal first meeting looks like…",
    options: [
      { label: "Filter coffee with four people", style: "coffee" },
      { label: "A Saturday morning dog-park walk", style: "activity" },
      { label: "A long-table Sunday brunch", style: "dining" },
      { label: "An overnight resort escape", style: "escape" },
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
      { label: "A circle of ten or fewer", style: "coffee" },
      { label: "Moving around, not seated", style: "activity" },
      { label: "A lively table of sixteen", style: "dining" },
      { label: "Fourteen people and one bonfire", style: "escape" },
    ],
  },
  {
    question: "A great conversation usually ends with…",
    options: [
      { label: "“Same table next week?”", style: "coffee" },
      { label: "“So… what do we do next?”", style: "activity" },
      { label: "Dessert and another round of chai", style: "dining" },
      { label: "A group photo and a plan", style: "escape" },
    ],
  },
  {
    question: "Conversations about marriage should…",
    options: [
      { label: "Happen early and honestly", style: "coffee" },
      { label: "Grow naturally over shared wins", style: "activity" },
      { label: "Eventually include the families", style: "dining" },
      { label: "Wait until the trip photos exist", style: "escape" },
    ],
  },
];
