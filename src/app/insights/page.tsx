import type { Metadata } from "next";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { InsightsHighlightsGrid } from "@/components/insights/InsightsHighlightsGrid";
import { INSIGHT_HIGHLIGHTS } from "@/data/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Recaps, forums, and field notes from Youth+ Connect and the wider Youth+ Africa ecosystem.",
};

export default function InsightsPage() {
  return (
    <main className="bg-white text-[#0A0A0A]">
      <section className="relative border-b border-borderLight/80 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] pt-[calc(var(--site-header-height)+2.5rem)] pb-12 md:pb-16">
        <div className="page mx-auto max-w-[1440px]">
          <p className="inline-flex w-fit rounded-full border border-accent/60 bg-accent/10 px-4 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
            Insights
          </p>
          <h1 className="mt-5 max-w-[20ch] text-balance text-[32px] font-[900] leading-[0.98] tracking-[-0.03em] md:max-w-[24ch] md:text-[48px]">
            Highlights from recent Youth+ Connect activities
          </h1>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.8] text-secondary md:text-[16px]">
            Long-form recaps, forum outcomes, and signals from the field — with clear next steps when you want to go
            deeper.
          </p>
        </div>
      </section>

      <section className="relative page mx-auto max-w-[1440px] py-12 md:py-16">
        <SectionDivider contentWidth className="absolute top-0 opacity-80" />
        <InsightsHighlightsGrid items={INSIGHT_HIGHLIGHTS} />
      </section>
    </main>
  );
}
