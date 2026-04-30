import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/site/LegalPageTemplate";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Youth+ Africa collects, uses, stores, and protects personal information across events, event participation, and digital experiences.",
};

const sections = [
  {
    title: "Information We Collect",
    body: [
      "We collect information you provide directly when you register for events, subscribe to updates, apply to events, contact our team, or engage with our products and community platforms.",
      "This may include your name, email address, phone number, organization, role, event preferences, payment-related details through our processors, and any information you choose to share in forms or messages.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use personal information to deliver our services, operate events, process registrations, send event updates, provide support, and improve our products and community experiences.",
      "We may also use aggregated or de-identified information for reporting, impact measurement, and strategic planning.",
    ],
  },
  {
    title: "Sharing and Disclosure",
    body: [
      "We do not sell your personal information. We may share information with trusted service providers that support event operations, communications, payments, analytics, and platform delivery.",
      "We may also disclose information when required by law, to protect users and our organization, or in connection with organizational restructuring where permitted by law.",
    ],
  },
  {
    title: "Data Retention and Security",
    body: [
      "We retain data only as long as necessary for operational, legal, and programmatic purposes. Retention periods may vary based on the type of data and applicable obligations.",
      "We apply reasonable administrative, technical, and organizational safeguards to protect information from unauthorized access, loss, misuse, and disclosure.",
    ],
  },
  {
    title: "Your Rights and Choices",
    body: [
      "Depending on your location, you may have rights to access, correct, delete, restrict, or object to how your data is processed. You may also request a copy of data we hold about you.",
      "You can opt out of non-essential marketing emails at any time using unsubscribe links or by contacting us directly.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPageTemplate
      eyebrow="Privacy"
      title="Your information should work for you, not against you."
      intro="This Privacy Policy explains how Youth+ Africa collects, uses, and protects personal information when you use our website, register for events, or engage with our events."
      effectiveDate="April 28, 2026"
      sections={sections}
    />
  );
}
