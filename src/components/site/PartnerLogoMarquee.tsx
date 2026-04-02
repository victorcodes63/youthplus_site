"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PARTNER_LOGOS } from "@/data/partnerLogos";

type Variant = "hero" | "card";

export function PartnerLogoMarquee({
  label = "Partners",
  variant = "hero",
  className = "",
  durationSec = 18,
}: {
  label?: string;
  variant?: Variant;
  className?: string;
  /** Full loop duration (one full cycle = 50% of track width). */
  durationSec?: number;
}) {
  const isHero = variant === "hero";
  const row = [...PARTNER_LOGOS, ...PARTNER_LOGOS];
  /** Card strip is right-aligned in the column; phase-shift so the viewport isn’t empty on the left on first paint. */
  const marqueeX: [string, string] = isHero ? ["0%", "-50%"] : ["-25%", "-75%"];

  return (
    <div className={className}>
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
      <div className={label ? "mt-6 overflow-hidden max-w-full" : "overflow-hidden max-w-full"}>
        <motion.div
          className="flex gap-3"
          animate={{ x: marqueeX }}
          transition={{ duration: durationSec, ease: "linear", repeat: Infinity }}
        >
          {row.map((logo, i) => (
            <div
              key={`${logo.src}-${i}`}
              className="flex h-[64px] min-w-[164px] shrink-0 items-center justify-center px-4"
            >
              <div className="relative inline-block max-h-[42px]">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={138}
                  height={42}
                  className={
                    isHero
                      ? "max-h-[42px] w-auto object-contain brightness-0 invert opacity-85"
                      : "max-h-[42px] w-auto object-contain"
                  }
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
