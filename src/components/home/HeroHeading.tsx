"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const lineEase: [number, number, number, number] = [0.22, 1, 0.25, 1];

const DEFAULT_LINES: readonly [string, string] = [
  "Where Africa's Next",
  "Generation Ignites",
];

export function HeroHeading({
  className = "",
  lines = DEFAULT_LINES,
}: {
  className?: string;
  lines?: readonly [string, string];
}) {
  const reduceMotion = useReducedMotion();

  const headlineOrchestra: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.14,
        delayChildren: reduceMotion ? 0 : 0.04,
      },
    },
  };

  const headlineLine: Variants = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : "100%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.72,
        ease: lineEase,
      },
    },
  };

  return (
    <motion.h1
      className={`font-[800] tracking-[-0.05em] leading-[0.92] text-white text-[clamp(44px,6vw,72px)] ${className}`.trim()}
      variants={headlineOrchestra}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.04em]">
          <motion.span className="block will-change-transform" variants={headlineLine}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
