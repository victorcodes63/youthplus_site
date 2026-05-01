"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/motion/FadeUp";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";
import type { InsightHighlight } from "@/data/insights";

type Props = {
  items: InsightHighlight[];
};

export function InsightsHighlightsGrid({ items }: Props) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 md:mt-9 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <FadeUp key={item.slug} delayMs={index * 60}>
          <motion.article
            id={item.slug}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 230, damping: 24 }}
            className="flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-borderLight bg-white shadow-[0_12px_34px_rgba(10,10,10,0.05)]"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={item.image}
                alt={`${item.title} - cover image`}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 33vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-[22px] font-[900] leading-[1.05] tracking-[-0.025em] text-[#0A0A0A] md:text-[25px]">
                {item.title}
              </h2>
              <p className="mt-3 text-[12px] font-[800] uppercase tracking-[0.08em] text-secondary">{item.schedule}</p>
              <p className="mt-1 text-[13px] font-[700] text-secondary">{item.location}</p>
              <p className="mt-4 text-[14px] leading-[1.75] text-secondary">{item.detail}</p>
              <div className="mt-auto pt-5">
                <SwapArrowButton
                  href={item.href}
                  compact
                  className="h-11 w-full justify-center rounded-full text-[12px] font-[800] uppercase tracking-[0.06em] sm:w-auto sm:min-w-[200px]"
                >
                  {item.ctaLabel ?? "Read insight"}
                </SwapArrowButton>
              </div>
            </div>
          </motion.article>
        </FadeUp>
      ))}
    </div>
  );
}
