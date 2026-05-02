import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";

type ResourceKey = "speaker-deck" | "partnership-pack" | "media-kit" | "community";

const resourceContent: Record<
  ResourceKey,
  {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    ctaLabel: string;
    ctaHref: string;
    supportNote: string;
  }
> = {
  "speaker-deck": {
    eyebrow: "Speaker deck",
    title: "Everything invited speakers need to prepare with confidence.",
    description:
      "This resource helps speakers align with Youth+ audience context, event format, and session delivery standards.",
    bullets: [
      "Festival narrative, audience profile, and content expectations.",
      "Session structure guide for keynotes, panels, and workshops.",
      "Production notes including timing, A/V setup, and rehearsal flow.",
      "Speaker support timelines and point-of-contact details.",
    ],
    ctaLabel: "Request speaker deck",
    ctaHref: "mailto:partners@youthplusafrica.com?subject=Speaker%20Deck%20Request",
    supportNote: "Need an urgent update? Include your session title and event date in your email.",
  },
  "partnership-pack": {
    eyebrow: "Partnership pack",
    title: "Clear partnership pathways built for measurable impact.",
    description:
      "Use this pack to evaluate collaboration options, sponsorship tiers, and co-delivery opportunities with Youth+ Africa.",
    bullets: [
      "Partnership models for brands, foundations, and ecosystem operators.",
      "Sponsorship tiers with activation opportunities and deliverables.",
      "Audience reach, community profile, and historical engagement signals.",
      "Execution workflow and partnership onboarding timeline.",
    ],
    ctaLabel: "Request partnership pack",
    ctaHref: "mailto:partners@youthplusafrica.com?subject=Partnership%20Pack%20Request",
    supportNote: "Share your organization goals so we can send the most relevant package first.",
  },
  "media-kit": {
    eyebrow: "Media kit",
    title: "Press-ready assets and messaging for accurate coverage.",
    description:
      "The media kit provides approved brand language, key facts, and visual assets for editors and content teams.",
    bullets: [
      "Youth+ Africa brand story and approved messaging.",
      "Official logos, marks, and usage guidance.",
      "Press boilerplate, leadership bios, and program background.",
      "Suggested tags, naming conventions, and attribution notes.",
    ],
    ctaLabel: "Request media kit",
    ctaHref: "mailto:media@youthplusafrica.com?subject=Media%20Kit%20Request",
    supportNote: "For interviews and rapid press response, include your publication deadline.",
  },
  community: {
    eyebrow: "Community",
    title: "Join a practical community of builders across Africa.",
    description:
      "Explore how to engage with Youth+ through local activations, collaborative events, and digital channels.",
    bullets: [
      "On-ramps for founders, operators, creators, and volunteers.",
      "Community channels and participation etiquette.",
      "Event touchpoints including events, mentorship, and opportunities.",
      "How to contribute, host, or collaborate with local chapters.",
    ],
    ctaLabel: "Join community",
    ctaHref: "/ventures/connect",
    supportNote: "Looking to activate in your city? Reach us at support@youthplusafrica.com.",
  },
};

type ResourcePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = resourceContent[slug as ResourceKey];

  if (!content) {
    return {
      title: "Resource not found",
      description: "The requested Youth+ Africa resource could not be found.",
    };
  }

  return {
    title: content.eyebrow,
    description: content.description,
  };
}

export function generateStaticParams() {
  return Object.keys(resourceContent).map((slug) => ({ slug }));
}

export default async function ResourceDetailPage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const content = resourceContent[slug as ResourceKey];

  if (!content) {
    notFound();
  }

  return (
    <main className="bg-white text-[#0A0A0A] pt-24 pb-16 sm:pt-28 md:pt-32 md:pb-20">
      <section className="page mx-auto max-w-[900px]">
        <div className="inline-flex items-center rounded-md border border-accent/80 bg-accent/15 px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
          {content.eyebrow}
        </div>
        <h1 className="mt-4 max-w-[18ch] text-[34px] font-[900] leading-[0.96] tracking-[-0.04em] md:text-[54px]">
          {content.title}
        </h1>
        <p className="mt-4 max-w-[66ch] text-[15px] leading-[1.8] text-secondary md:text-[17px]">
          {content.description}
        </p>

        <article className="mt-9 rounded-md border border-borderLight bg-[#FCFCFC] p-5 sm:p-6 md:p-8">
          <h2 className="text-[12px] font-[800] uppercase tracking-[0.1em] text-accent">
            What&apos;s inside
          </h2>
          <ul className="mt-4 space-y-3">
            {content.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-[15px] leading-[1.7] text-[#0A0A0A]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </article>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <SwapArrowButton
            href={content.ctaHref}
            compact
            buttonRadius="var(--radius-md)"
            className="h-11 w-full justify-center px-5 text-[13px] uppercase tracking-[0.07em] sm:w-auto"
          >
            {content.ctaLabel}
          </SwapArrowButton>
          <SwapArrowButton
            href="/resources"
            compact
            buttonRadius="var(--radius-md)"
            className="h-11 w-full justify-center border border-borderLight px-5 text-[13px] uppercase tracking-[0.07em] sm:w-auto"
            backgroundColor="#FFFFFF"
            backgroundHoverColor="#0A0A0A"
            textColor="#0A0A0A"
            textHoverColor="#FFFFFF"
            fillColor="rgba(10,10,10,0.08)"
            iconColor="#0A0A0A"
            iconHoverFill="rgba(255,255,255,0.18)"
          >
            All resources
          </SwapArrowButton>
        </div>

        {content.ctaHref.startsWith("mailto:") ? (
          <p className="mt-3 text-[12px] leading-[1.65] text-secondary">{content.supportNote}</p>
        ) : null}
      </section>
    </main>
  );
}
