import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/site/LegalPageTemplate";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Youth+ Africa's commitment to inclusive digital experiences and continuous accessibility improvements across our platform.",
};

const sections = [
  {
    title: "Our Commitment",
    body: [
      "Youth+ Africa is committed to building digital experiences that are inclusive, usable, and accessible to as many people as possible, including people with disabilities.",
      "We aim to improve accessibility across website structure, visual design, content clarity, interaction patterns, and assistive technology compatibility.",
    ],
  },
  {
    title: "Design and Technical Practices",
    body: [
      "We work to maintain readable typography, sufficient color contrast, keyboard-accessible interfaces, semantic markup, and clear navigation patterns across major pages.",
      "We test core user journeys and continuously refine components that affect accessibility, especially forms, media, and interactive controls.",
    ],
  },
  {
    title: "Known Limitations",
    body: [
      "Some legacy content, third-party embeds, or partner-managed assets may not yet meet our preferred accessibility standards.",
      "Where limitations exist, we prioritize practical alternatives and ongoing remediation as we evolve the platform.",
    ],
  },
  {
    title: "Feedback and Support",
    body: [
      "If you experience difficulty accessing any part of this site, please contact us and include the page URL, the issue you encountered, and any assistive technology you are using.",
      "We review accessibility feedback regularly and use it to prioritize fixes and improvements.",
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <LegalPageTemplate
      eyebrow="Accessibility"
      title="Inclusion is part of the product."
      intro="This Accessibility Statement outlines our current efforts to ensure Youth+ Africa digital experiences are accessible, understandable, and continuously improving."
      effectiveDate="April 28, 2026"
      sections={sections}
    />
  );
}
