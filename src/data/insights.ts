/**
 * Editorial highlights and recaps - surfaced on /insights and the Events "Past events" strip.
 */
export type InsightHighlight = {
  slug: string;
  title: string;
  schedule: string;
  location: string;
  detail: string;
  image: string;
  /** Primary CTA target (internal routes or trusted external recaps). */
  href: string;
  ctaLabel?: string;
};

export const INSIGHT_HIGHLIGHTS: InsightHighlight[] = [
  {
    slug: "connect-charting-the-capital-of-you",
    title: "Connect: Charting the Capital of You.",
    schedule: "Friday 26, Sep 2025, 2PM - 6PM",
    location: "LaunchPad Coworking, Westlands Avenue",
    detail:
      "Flagship youth culture and policy forum bringing creators, leaders, and partners together.",
    image: "/images/event-energy-networking.png",
    href: "/ventures/connect",
    ctaLabel: "Explore Connect",
  },
  {
    slug: "the-currency-of-exchange",
    title: "The Currency of Exchange",
    schedule: "30th August 2025, 9AM - 3PM",
    location: "Strathmore Business School",
    detail:
      "Driving business evolution through practical cross-sector conversations and founder networking.",
    image: "/images/event-energy-workshop.png",
    href: "/events",
    ctaLabel: "View on Events",
  },
  {
    slug: "the-wealth-blueprint",
    title: "The Wealth BluePrint",
    schedule: "16th and 23rd September 2025, 7PM - 8PM",
    location: "Online",
    detail:
      "Behavior, planning, and investment insights designed for Gen Z wealth confidence and growth.",
    image: "/images/event-energy-panel.png",
    href: "/events",
    ctaLabel: "View on Events",
  },
  {
    slug: "youth-radio-stories",
    title: "Youth+ Radio: Stories that travel further",
    schedule: "Ongoing",
    location: "Digital + Nairobi studio",
    detail:
      "Bold youth stories, operator interviews, and ecosystem conversations you can replay anytime.",
    image: "/images/smiling-speaker-podium.jpg",
    href: "/ventures/youth-radio",
    ctaLabel: "Open Youth+ Radio",
  },
  {
    slug: "we-lead-baseline",
    title: "We Lead: baseline signals from the field",
    schedule: "Rolling intake",
    location: "Pan-African (online)",
    detail:
      "Short baseline survey so we can shape better support, programming, and partner pathways.",
    image: "/images/women-s-panel-discussion.jpg",
    href: "/we-lead-baseline-survey",
    ctaLabel: "Take the survey",
  },
  {
    slug: "festival-labs-2026",
    title: "Festival labs: what builders asked for next",
    schedule: "Festival season 2026",
    location: "Sarit Expo Centre, Nairobi",
    detail:
      "Early signals from labs and forums: AI execution, leadership depth, and capital readiness.",
    image: "/images/AI+.webp",
    href: "/events",
    ctaLabel: "See 2026 calendar",
  },
];
