import type { Metadata } from "next";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Explore Youth+ Africa resources for speakers, partners, media, and community participation.",
};

const resourceLinks = [
  {
    title: "Speaker Deck",
    description:
      "A concise overview of festival themes, audience profile, and session expectations for speakers.",
    href: "/resources/speaker-deck",
  },
  {
    title: "Partnership Pack",
    description:
      "Collaboration models, sponsorship pathways, and impact opportunities for ecosystem partners.",
    href: "/resources/partnership-pack",
  },
  {
    title: "Media Kit",
    description:
      "Brand narrative, approved messaging, and media assets for editors and content partners.",
    href: "/resources/media-kit",
  },
  {
    title: "Community",
    description:
      "Ways to plug into Youth+ channels, events, and collaborative initiatives across the continent.",
    href: "/resources/community",
  },
] as const;

export default function ResourcesPage() {
  return (
    <main className="bg-white text-[#0A0A0A] pt-24 pb-16 sm:pt-28 md:pt-32 md:pb-20">
      <section className="page mx-auto max-w-[1100px]">
        <div className="inline-flex items-center rounded-md border border-accent/80 bg-accent/15 px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
          Resources
        </div>
        <h1 className="mt-4 max-w-[16ch] text-[36px] font-[900] leading-[0.95] tracking-[-0.04em] md:text-[56px]">
          Practical assets for partners, speakers, and press.
        </h1>
        <p className="mt-4 max-w-[64ch] text-[15px] leading-[1.75] text-secondary md:text-[17px]">
          Access key Youth+ Africa materials tailored for speaking
          opportunities, partnerships, media coverage, and community
          participation.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {resourceLinks.map((item) => (
            <article
              key={item.href}
              className="rounded-md border border-borderLight bg-white p-5 md:p-6"
            >
              <h2 className="text-[23px] font-[900] leading-[1.08] tracking-[-0.02em]">
                {item.title}
              </h2>
              <p className="mt-2 text-[14px] leading-[1.7] text-secondary">
                {item.description}
              </p>
              <SwapArrowButton
                href={item.href}
                compact
                buttonRadius="var(--radius-md)"
                className="mt-5 h-11 w-full justify-center border border-accent px-4 text-[12px] uppercase tracking-[0.08em] sm:w-auto"
                backgroundColor="#FFFFFF"
                backgroundHoverColor="#0A0A0A"
                textColor="#0A0A0A"
                textHoverColor="#FFFFFF"
                fillColor="rgba(229,194,34,0.2)"
                iconColor="#0A0A0A"
                iconHoverFill="rgba(255,255,255,0.18)"
              >
                Open resource
              </SwapArrowButton>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
