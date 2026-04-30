"use client";

import { useReducedMotion, type Variants } from "framer-motion";

type HeroEnterOptions = {
  leftDelayChildren?: number;
  leftStaggerChildren?: number;
};

export function useHeroEnterAnimations(options: HeroEnterOptions = {}) {
  const reduceMotion = useReducedMotion();
  const heroEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const heroBackdropEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

  const heroLeftOrchestra: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : (options.leftStaggerChildren ?? 0.105),
        delayChildren: reduceMotion ? 0 : (options.leftDelayChildren ?? 0),
      },
    },
  };

  const heroEnterBadge: Variants = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 12,
      scale: reduceMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.52,
        ease: heroEase,
      },
    },
  };

  const heroEnterLine: Variants = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.58,
        ease: heroEase,
      },
    },
  };

  const heroEnterBody: Variants = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.65,
        ease: heroEase,
      },
    },
  };

  const heroEnterCta: Variants = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 220, damping: 32, mass: 1 },
    },
  };

  return {
    reduceMotion,
    heroEase,
    heroBackdropEase,
    heroLeftOrchestra,
    heroEnterBadge,
    heroEnterLine,
    heroEnterBody,
    heroEnterCta,
  };
}
