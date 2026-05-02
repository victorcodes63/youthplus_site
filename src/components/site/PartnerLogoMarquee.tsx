"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PARTNER_LOGOS } from "@/data/partnerLogos";

type Variant = "hero" | "card";
type LogoTone = "auto" | "white" | "gold" | "color";
type TileStyle = "plain" | "boxed";
type FrameStyle = "default" | "none";
const BRAND_GOLD_FILTER =
  "brightness(0) saturate(100%) invert(77%) sepia(58%) saturate(778%) hue-rotate(358deg) brightness(95%) contrast(94%)";

export function PartnerLogoMarquee({
  label = "Partners",
  variant = "hero",
  className = "",
  durationSec = 36,
  logoTone = "auto",
  logos = PARTNER_LOGOS,
  tileStyle = "plain",
  frameStyle = "default",
}: {
  label?: string;
  variant?: Variant;
  className?: string;
  /** Full loop duration (one full cycle = 50% of track width). */
  durationSec?: number;
  logoTone?: LogoTone;
  logos?: ReadonlyArray<{ src: string; alt: string }>;
  tileStyle?: TileStyle;
  frameStyle?: FrameStyle;
}) {
  const isHero = variant === "hero";
  const baseLoop = Array.from(
    { length: Math.max(4, logos.length * 2) },
    (_, idx) => logos[idx % logos.length]
  );
  const row = [...baseLoop, ...baseLoop];
  /** `color` = original logo colors (light UI). `white` = monochrome for dark hero. */
  const resolvedTone: Exclude<LogoTone, "auto"> =
    logoTone === "auto" ? (isHero ? "white" : "color") : logoTone;
  const marqueeX: [string, string] = ["0%", "-50%"];
  const noFrame = frameStyle === "none";
  const frameClass = noFrame
    ? "relative max-w-full overflow-hidden px-0 py-0"
    : isHero
    ? "relative max-w-full overflow-hidden rounded-xl border border-black bg-[#0A0A0A] px-2 py-1 md:px-3"
    : "relative max-w-full overflow-hidden rounded-xl border border-black/10 bg-gradient-to-b from-white to-[#F8F8F8] px-2 py-1 md:px-3";
  const frameWithLabelClass = noFrame
    ? "relative mt-4 max-w-full overflow-hidden px-0 py-0 md:mt-6"
    : isHero
    ? "relative mt-4 max-w-full overflow-hidden rounded-xl border border-black bg-[#0A0A0A] px-2 py-1 md:mt-6 md:px-3"
    : "relative mt-4 max-w-full overflow-hidden rounded-xl border border-black/10 bg-gradient-to-b from-white to-[#F8F8F8] px-2 py-1 md:mt-6 md:px-3";
  const edgeLeftClass = isHero
    ? "pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 bg-gradient-to-r from-[#0A0A0A] to-transparent"
    : "pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 bg-gradient-to-r from-white to-transparent";
  const edgeRightClass = isHero
    ? "pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-gradient-to-l from-[#0A0A0A] to-transparent"
    : "pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-gradient-to-l from-white to-transparent";

  return (
    <div className={`w-full min-w-0 overflow-hidden ${className}`}>
      {label ? (
        <p
          className={
            isHero
              ? "text-white/60 text-[11px] uppercase tracking-[0.24em] font-[800]"
              : "text-black/45 text-[11px] uppercase tracking-[0.24em] font-[800]"
          }
        >
          {label}
        </p>
      ) : null}
      <div
        className={
          label
            ? frameWithLabelClass
            : frameClass
        }
      >
        {!noFrame ? <div className={edgeLeftClass} /> : null}
        {!noFrame ? <div className={edgeRightClass} /> : null}
        <motion.div
          className="flex w-max items-center gap-1 md:gap-2"
          animate={{ x: marqueeX }}
          transition={{ duration: durationSec, ease: "linear", repeat: Infinity }}
        >
          {row.map((logo, i) => (
            (() => {
              const hasSolidBg = logo.src.includes("nairobi_county");
              const useGoldTone = resolvedTone === "gold" && !hasSolidBg;
              const useWhiteTone = resolvedTone === "white";
              const useNaturalColor = resolvedTone === "color";
              return (
            <div
              key={`${logo.src}-${i}`}
              className={`logo-tile flex h-[58px] shrink-0 items-center justify-center px-4 md:h-[66px] md:px-7 ${
                tileStyle === "boxed"
                  ? "rounded-lg border border-black/[0.05] bg-white/90 shadow-[0_8px_20px_rgba(10,10,10,0.04)]"
                  : ""
              }`}
            >
              <div className="relative inline-flex max-h-[34px] min-h-[28px] min-w-0 max-w-[min(280px,78vw)] items-center justify-center md:max-h-[42px] md:min-h-[34px]">
                {logo.src.endsWith(".svg") ? (
                  // eslint-disable-next-line @next/next/no-img-element -- next/image SVG handling is unreliable for wide partner marks
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    className={
                      useWhiteTone
                        ? "h-[28px] w-auto max-w-full object-contain object-left brightness-0 invert opacity-85 md:h-[34px]"
                        : useNaturalColor
                          ? "h-[28px] w-auto max-w-full object-contain object-left opacity-100 md:h-[34px]"
                          : useGoldTone
                            ? "h-[28px] w-auto max-w-full object-contain object-left md:h-[34px]"
                            : "h-[28px] w-auto max-w-full object-contain object-left md:h-[34px]"
                    }
                    style={useGoldTone ? { filter: BRAND_GOLD_FILTER } : undefined}
                  />
                ) : (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={200}
                    height={48}
                    className={
                      useWhiteTone
                        ? "max-h-[34px] w-auto max-w-full object-contain brightness-0 invert opacity-85 md:max-h-[42px]"
                        : useNaturalColor
                          ? "max-h-[34px] w-auto max-w-full object-contain opacity-100 md:max-h-[42px]"
                          : useGoldTone
                            ? "max-h-[34px] w-auto max-w-full object-contain md:max-h-[42px]"
                            : "max-h-[34px] w-auto max-w-full object-contain md:max-h-[42px]"
                    }
                    style={
                      useGoldTone
                        ? {
                            filter: BRAND_GOLD_FILTER,
                          }
                        : undefined
                    }
                  />
                )}
              </div>
            </div>
              );
            })()
          ))}
        </motion.div>
      </div>
    </div>
  );
}
