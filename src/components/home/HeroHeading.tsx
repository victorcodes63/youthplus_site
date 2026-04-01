"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function HeroHeading({ children }: { children: ReactNode }) {
  return (
    <motion.h1
      className="font-[800] tracking-[-0.05em] leading-[0.92] text-white text-[clamp(44px,6vw,72px)]"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px 0px -40px 0px" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      {children}
    </motion.h1>
  );
}

