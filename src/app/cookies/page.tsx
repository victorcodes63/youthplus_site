import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/site/LegalPageTemplate";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Youth+ Africa uses cookies and similar technologies for site functionality, analytics, and user experience improvements.",
};

const sections = [
  {
    title: "What Are Cookies",
    body: [
      "Cookies are small text files placed on your device when you visit a website. They help websites remember preferences, maintain sessions, and understand how users interact with content.",
      "We also use similar technologies such as local storage, pixels, and analytics identifiers for comparable purposes.",
    ],
  },
  {
    title: "Cookies We Use",
    body: [
      "Essential cookies support core functionality like navigation, security, and session continuity. Without them, some features may not work properly.",
      "Performance and analytics cookies help us understand site usage patterns, identify technical issues, and improve content and user journeys over time.",
    ],
  },
  {
    title: "Third-Party Technologies",
    body: [
      "Some cookies or tracking technologies may be set by third-party tools we use for analytics, event operations, communication, or embedded services.",
      "These providers process data according to their own privacy policies and controls.",
    ],
  },
  {
    title: "Managing Cookie Preferences",
    body: [
      "You can control or disable cookies through your browser settings. Most browsers allow you to delete existing cookies, block certain categories, or receive alerts before cookies are stored.",
      "If you disable essential cookies, parts of the website may not function as intended.",
    ],
  },
  {
    title: "Policy Updates",
    body: [
      "We may update this Cookie Policy to reflect changes in technology, legal requirements, or our service operations.",
      "When we make significant changes, we will update the effective date and publish the latest version on this page.",
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalPageTemplate
      eyebrow="Cookies"
      title="Simple controls for how tracking works."
      intro="This Cookie Policy explains what cookies are, why we use them, and how you can manage your preferences when using Youth+ Africa websites."
      effectiveDate="April 28, 2026"
      sections={sections}
    />
  );
}
