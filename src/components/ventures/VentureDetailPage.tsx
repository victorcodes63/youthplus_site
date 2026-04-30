"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/motion/FadeUp";
import type { VentureContent } from "@/data/ventures";

type VentureDetailPageProps = {
  venture: VentureContent;
};

export function VentureDetailPage({ venture }: VentureDetailPageProps) {
  const ventureTheme =
    venture.slug === "allaxs"
      ? "from-[#fff4ed] via-[#fffdfa] to-[#fff8f4]"
      : venture.slug === "connect"
        ? "from-[#eef4ff] via-[#fdfefe] to-[#f4f8ff]"
        : "from-[#f5eeff] via-[#fefcff] to-[#f5efff]";

  const glowTheme =
    venture.slug === "allaxs"
      ? "bg-[radial-gradient(circle,rgba(241,114,66,0.24)_0%,rgba(241,114,66,0.08)_42%,transparent_74%)]"
      : venture.slug === "connect"
        ? "bg-[radial-gradient(circle,rgba(19,47,91,0.26)_0%,rgba(19,47,91,0.1)_45%,transparent_76%)]"
        : "bg-[radial-gradient(circle,rgba(84,39,112,0.24)_0%,rgba(84,39,112,0.1)_45%,transparent_76%)]";

  return (
    <section className={`relative overflow-hidden bg-gradient-to-b ${ventureTheme} pt-20 pb-14 text-[#0A0A0A] sm:pt-24 sm:pb-16 md:pt-32 md:pb-24`}>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-32 left-1/2 h-[380px] w-[760px] -translate-x-1/2 rounded-full ${glowTheme}`}
      />
      <div className="relative page mx-auto max-w-[1440px]">
        <FadeUp>
          <div className="relative overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white/92 p-5 shadow-[0_22px_74px_rgba(10,10,10,0.12)] backdrop-blur-sm sm:p-7 md:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E5C222]/70 to-transparent"
            />

            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-10">
              <div>
                <div
                  className="inline-flex items-center rounded-md border px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em]"
                  style={{
                    borderColor: `${venture.brandColor}66`,
                    backgroundColor: `${venture.brandColor}1A`,
                    color: venture.brandColor,
                  }}
                >
                  {venture.label}
                </div>
                <h1 className="mt-5 text-[34px] md:text-[56px] leading-[0.94] tracking-[-0.045em] font-[900] max-w-[14ch]">
                  {venture.heroTitle}
                </h1>
                <p className="mt-4 text-[15px] md:text-[18px] text-secondary max-w-[66ch] leading-[1.75]">
                  {venture.heroDescription}
                </p>
                <p
                  className="mt-4 inline-flex rounded-md border bg-[#fafafa] px-3 py-1.5 text-[12px] font-[800] uppercase tracking-[0.08em]"
                  style={{ borderColor: `${venture.brandColor}33`, color: venture.brandColor }}
                >
                  {venture.premiumLine}
                </p>
              </div>

              <div className="rounded-xl border border-borderLight/80 bg-[#FAFAFA] px-4 py-4 sm:px-5 sm:py-5 lg:min-w-[260px]">
                <p className="text-[10px] font-[800] uppercase tracking-[0.11em] text-secondary">
                  Venture identity
                </p>
                <div className="mt-3 flex h-16 items-center">
                  <Image
                    src={venture.logoSrc}
                    alt={venture.logoAlt}
                    width={280}
                    height={90}
                    className="h-full w-auto max-w-full object-contain object-left"
                  />
                </div>
                <p className="mt-3 text-[12px] leading-[1.6] text-secondary">
                  Signature initiative within the Youth+ Africa venture portfolio.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 border-t border-borderLight pt-5 sm:grid-cols-3">
              {venture.stats.map((stat) => (
                <div key={stat.label} className="border-l-2 pl-3" style={{ borderColor: `${venture.brandColor}AA` }}>
                  <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-secondary">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-[28px] leading-[1] tracking-[-0.03em] font-[900] text-[#0A0A0A]">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <div className="mt-11 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
          <FadeUp>
            <article className="h-full">
              <p className="text-[11px] font-[800] uppercase tracking-[0.1em]" style={{ color: venture.brandColor }}>
                Recent activity
              </p>
              <h2 className="mt-3 text-[26px] md:text-[34px] leading-[1.02] tracking-[-0.03em] font-[900]">
                {venture.name} updates
              </h2>
              <p className="mt-3 text-[14px] md:text-[15px] leading-[1.7] text-secondary">
                {venture.summary}
              </p>

              <div className="mt-7 space-y-0 border-y border-borderLight">
                {venture.items.map((item, idx) => (
                  <div
                    key={`${venture.slug}-${item.title}`}
                    className={`relative px-0 py-5 ${idx < venture.items.length - 1 ? "border-b border-borderLight" : ""}`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[31px] h-2 w-2 rounded-full"
                      style={{ backgroundColor: venture.brandColor }}
                    />
                    <p className="pl-5 text-[11px] font-[800] uppercase tracking-[0.1em]" style={{ color: venture.brandColor }}>
                      {item.date}
                    </p>
                    <h3 className="mt-1 pl-5 text-[18px] md:text-[20px] leading-[1.2] font-[800] text-[#0A0A0A]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 pl-5 text-[14px] leading-[1.7] text-secondary">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </FadeUp>

          <FadeUp delayMs={80}>
            <aside className="h-full border-l border-borderLight pl-0 lg:pl-8">
              <p className="text-[11px] font-[800] uppercase tracking-[0.1em]" style={{ color: venture.brandColor }}>
                Focus areas
              </p>
              <h2 className="mt-3 text-[24px] md:text-[30px] leading-[1.05] tracking-[-0.02em] font-[900] max-w-[20ch]">
                What {venture.name} is building now
              </h2>
              <div className="mt-6 space-y-4">
                {venture.focusAreas.map((focus, idx) => (
                  <div
                    key={focus}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-[2px] text-[12px] font-[900] uppercase tracking-[0.08em]" style={{ color: venture.brandColor }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[15px] leading-[1.7] text-secondary">{focus}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-borderLight pt-5">
                <p className="text-[12px] font-[800] uppercase tracking-[0.08em] text-[#0A0A0A]">
                  Explore more ventures
                </p>
                <p className="mt-1.5 text-[14px] leading-[1.7] text-secondary">
                  Discover the full Youth+ venture ecosystem and how each track contributes to leadership, innovation, and impact.
                </p>
                <Link
                  href="/ventures"
                  className="mt-3 inline-flex text-[13px] font-[800] text-[#0A0A0A] underline underline-offset-4"
                  style={{ textDecorationColor: venture.brandColor }}
                >
                  Back to all ventures
                </Link>
              </div>
            </aside>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
