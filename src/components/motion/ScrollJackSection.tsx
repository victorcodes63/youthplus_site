"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useRef } from "react";

type ScrollJackSectionProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  innerClassName?: string;
} & ComponentPropsWithoutRef<"section">;

export function ScrollJackSection({
  children,
  className,
  intensity = 1,
  innerClassName,
  ...rest
}: ScrollJackSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [18 * intensity, -18 * intensity]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 0.985]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.62, 1, 1, 0.7]);

  return (
    <section ref={ref} className={className} {...rest}>
      <motion.div
        className={innerClassName}
        style={
          reduceMotion
            ? undefined
            : {
                y,
                scale,
                opacity,
                willChange: "transform, opacity",
              }
        }
      >
        {children}
      </motion.div>
    </section>
  );
}
