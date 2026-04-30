"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type StickyHeroSeamProps = {
  hero: ReactNode;
  children: ReactNode;
  sheetClassName?: string;
};

export function StickyHeroSeam({
  hero,
  children,
  sheetClassName = "",
}: StickyHeroSeamProps) {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sheetRef,
    offset: ["start end", "start center"],
  });

  const sheetY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 28, 0]);
  const sheetOpacity = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 1 : 0.98, 1]);

  return (
    <div className="relative">
      <div className="z-0 md:sticky md:top-[84px]">{hero}</div>

      <motion.div
        ref={sheetRef}
        className={`relative z-20 -mt-6 md:-mt-10 rounded-t-[24px] bg-white shadow-[0_-8px_30px_rgba(10,10,10,0.08)] ${sheetClassName}`.trim()}
        style={reduceMotion ? undefined : { y: sheetY, opacity: sheetOpacity }}
      >
        {children}
      </motion.div>
    </div>
  );
}
