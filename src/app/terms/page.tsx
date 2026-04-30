import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/site/LegalPageTemplate";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing access to Youth+ Africa websites, digital services, event participation, and community engagement.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: [
      "By accessing or using Youth+ Africa websites, event platforms, and related services, you agree to these Terms of Use and any additional policies referenced on this site.",
      "If you do not agree with these terms, you should not use our services.",
    ],
  },
  {
    title: "Use of Services",
    body: [
      "You agree to use our services lawfully and responsibly. You may not misuse the platform, interfere with security, attempt unauthorized access, or use content in ways that violate applicable law.",
      "We reserve the right to suspend or restrict access for behavior that creates risk to users, partners, or our systems.",
    ],
  },
  {
    title: "Registrations, Tickets, and Payments",
    body: [
      "Certain events or offerings require registration and payment. You are responsible for providing accurate information and ensuring payment details are valid at the time of transaction.",
      "Refunds, transfer rules, and attendance conditions are governed by event-specific terms presented during checkout or registration.",
    ],
  },
  {
    title: "Intellectual Property",
    body: [
      "All content on this site, including branding, text, graphics, videos, and software components, is owned by Youth+ Africa or licensed to us and is protected by intellectual property laws.",
      "You may not reproduce, distribute, modify, or create derivative works from this content without prior written permission, except as allowed by law.",
    ],
  },
  {
    title: "Limitation of Liability",
    body: [
      "Services are provided on an \"as available\" basis. To the maximum extent permitted by law, Youth+ Africa is not liable for indirect, incidental, special, or consequential damages arising from your use of our services.",
      "Our total liability for any claim related to your use of services is limited to amounts paid by you to us for the relevant service, where applicable.",
    ],
  },
  {
    title: "Changes to Terms",
    body: [
      "We may update these Terms of Use from time to time to reflect legal, operational, or product changes. Updated versions become effective when posted on this page unless stated otherwise.",
      "Continued use of services after updates constitutes acceptance of revised terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPageTemplate
      eyebrow="Terms"
      title="Clear rules for a trusted community."
      intro="These terms describe the responsibilities and expectations that apply when you use Youth+ Africa digital services, event experiences, and community platforms."
      effectiveDate="April 28, 2026"
      sections={sections}
    />
  );
}
