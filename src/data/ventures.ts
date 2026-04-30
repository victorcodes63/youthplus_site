export type VentureItem = {
  date: string;
  title: string;
  description: string;
};

export type VentureContent = {
  slug: "allaxs" | "connect" | "youth-radio";
  name: string;
  label: string;
  brandColor: string;
  logoSrc: string;
  logoAlt: string;
  summary: string;
  heroTitle: string;
  heroDescription: string;
  premiumLine: string;
  stats: { label: string; value: string }[];
  focusAreas: string[];
  items: VentureItem[];
};

export const VENTURES: VentureContent[] = [
  {
    slug: "allaxs",
    name: "AllAXS",
    label: "Platform & Access",
    brandColor: "#f17242",
    logoSrc: "/site/allaxs.png",
    logoAlt: "AllAXS logo",
    summary:
      "AllAXS builds digital rails for discovery, registration, and access across Youth+ experiences.",
    heroTitle: "AllAXS powers access to Youth+ experiences.",
    heroDescription:
      "From event discovery to registration and participation flows, AllAXS is the platform layer that helps youth communities connect with opportunities faster.",
    premiumLine: "Precision product systems for scale-ready youth ecosystems.",
    stats: [
      { label: "Activation Speed", value: "2.4x" },
      { label: "Partner Channels", value: "18" },
      { label: "Data Coverage", value: "92%" },
    ],
    focusAreas: [
      "Event and program discovery",
      "Registration and ticketing workflows",
      "Partner campaign distribution",
    ],
    items: [
      {
        date: "15 Jan 2026",
        title: "Creator Access Hub v1",
        description:
          "A unified landing and onboarding flow for creators, attendees, and partner communities.",
      },
      {
        date: "27 Feb 2026",
        title: "Partner Ticket Allocation",
        description:
          "A controlled access feature for sponsors and ecosystem partners to distribute reserved tickets.",
      },
      {
        date: "14 Apr 2026",
        title: "Data Insights Release",
        description:
          "Rollout of dashboard views tracking engagement, conversion, and event participation patterns.",
      },
    ],
  },
  {
    slug: "connect",
    name: "Connect",
    label: "Community & Collaboration",
    brandColor: "#132f5b",
    logoSrc: "/Connect Powered.png",
    logoAlt: "Connect logo",
    summary:
      "Connect convenes youth leaders, builders, and partners through focused meetups and practical working sessions.",
    heroTitle: "Connect brings builders into one room.",
    heroDescription:
      "The Connect venture creates practical spaces for founders, operators, and youth leaders to share strategy, form collaborations, and solve real execution challenges.",
    premiumLine: "Curated rooms where strategy becomes execution.",
    stats: [
      { label: "Communities Active", value: "36" },
      { label: "Events Hosted", value: "52" },
      { label: "Partnership Yield", value: "78%" },
    ],
    focusAreas: [
      "Founder and operator roundtables",
      "Campus and youth leadership forums",
      "Cross-ecosystem collaboration sessions",
    ],
    items: [
      {
        date: "12 Jan 2026",
        title: "Nairobi Builders Roundtable",
        description:
          "A closed-room strategy conversation for founders and operators scaling mission-driven ventures.",
      },
      {
        date: "03 Mar 2026",
        title: "Campus Leaders Forum",
        description:
          "A peer-led session connecting student leaders with mentors on leadership, careers, and innovation.",
      },
      {
        date: "20 Apr 2026",
        title: "Ecosystem Partner Mixer",
        description:
          "An evening format linking startups, funders, and support organizations around actionable collaborations.",
      },
    ],
  },
  {
    slug: "youth-radio",
    name: "Youth+ Radio",
    label: "Stories, Voices, Culture",
    brandColor: "#542770",
    logoSrc: "/site/radio-logo-03.png",
    logoAlt: "Youth+ Radio logo",
    summary:
      "Youth+ Radio amplifies high-context conversations across entrepreneurship, technology, creativity, and social impact.",
    heroTitle: "Youth+ Radio amplifies stories that move ecosystems.",
    heroDescription:
      "Through interviews, live panels, and original features, Youth+ Radio gives youth builders, creatives, and policy voices a platform to share practical insight and cultural perspective.",
    premiumLine: "Editorial storytelling engineered for influence.",
    stats: [
      { label: "Monthly Reach", value: "240K" },
      { label: "Featured Voices", value: "120+" },
      { label: "Episode Completion", value: "81%" },
    ],
    focusAreas: [
      "Founder and operator interviews",
      "Live policy and innovation panels",
      "Culture and impact storytelling",
    ],
    items: [
      {
        date: "28 Jan 2026",
        title: "Next-Gen Work Episode",
        description:
          "A conversation on future-of-work skills, creator opportunities, and the new pathways to meaningful careers.",
      },
      {
        date: "17 Feb 2026",
        title: "Women Building Africa Series",
        description:
          "An interview feature spotlighting women founders and operators building resilient businesses across sectors.",
      },
      {
        date: "09 Apr 2026",
        title: "Policy to Practice Live Panel",
        description:
          "A live broadcast with policy voices and startup teams on turning ideas into scalable implementation.",
      },
    ],
  },
];
