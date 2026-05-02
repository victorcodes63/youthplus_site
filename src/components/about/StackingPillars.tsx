"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Fingerprint,
  Handshake,
  Lightbulb,
  MapPinned,
  Network,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { useRef } from "react";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";

export type Pillar = {
  number: string;
  /** Short eyebrow label shown inside the icon-pill (e.g. "Community"). */
  eyebrow?: string;
  /** Optional Lucide icon rendered inside the eyebrow pill. */
  icon?: LucideIcon;
  title: string;
  description: string;
  outcome: string;
  /** Short list of concrete deliverables, rendered as tag-pills. */
  offerings?: string[];
  image: string;
  imageAlt: string;
  ctaHref: string;
  ctaLabel: string;
};

type StackingPillarsProps = {
  pillars: Pillar[];
  /**
   * Sticky offset from viewport top (px). Site header is 84px; we add a small
   * margin so the section title above the stack can breathe on entry.
   */
  topOffset?: number;
  /**
   * Per-card peek (px) added to each subsequent card's sticky top. Creates the
   * subtle "edge" of the previous card showing above the active one.
   */
  peek?: number;
};

const DEFAULT_TOP = 100;
const DEFAULT_PEEK = 14;
const OFFERING_ICONS: LucideIcon[] = [
  Fingerprint,
  BriefcaseBusiness,
  CalendarDays,
  MapPinned,
  Lightbulb,
  Network,
  Handshake,
  Rocket,
  BadgeCheck,
];

function getOfferingIcon(label: string) {
  const hash = [...label].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return OFFERING_ICONS[hash % OFFERING_ICONS.length];
}

/**
 * Sticky stack with parallax slide-in (Kora services pattern):
 *   - All cards are SIBLINGS in a single relative container.
 *   - Each card is `position: sticky` with a top value that grows by `peek` per
 *     card so previous cards remain just visible behind the active one.
 *   - Progressive z-index ensures later cards visually layer on top.
 *   - Sticky lives on a plain wrapper. The depth/parallax animation lives on a
 *     child motion.article. Applying transforms directly to a sticky element
 *     creates a new containing block and silently breaks sticky in some
 *     browsers -- keep them separate.
 *   - Cards keep their natural content-driven size; the parent's flow height
 *     is the sum of card heights, which is what gives sticky room to operate.
 */
export function StackingPillars({
  pillars,
  topOffset = DEFAULT_TOP,
  peek = DEFAULT_PEEK,
}: StackingPillarsProps) {
  return (
    <div className="relative">
      {pillars.map((pillar, idx) => (
        <PillarCard
          key={pillar.title}
          pillar={pillar}
          index={idx}
          total={pillars.length}
          topOffset={topOffset}
          peek={peek}
        />
      ))}
    </div>
  );
}

function PillarCard({
  pillar,
  index,
  total,
  topOffset,
  peek,
}: {
  pillar: Pillar;
  index: number;
  total: number;
  topOffset: number;
  peek: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const isLast = index === total - 1;
  const Icon = pillar.icon;

  /** Track scroll progress while this card is travelling through the viewport. */
  const { scrollYProgress: enterProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: leaveProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /** Parallax slide-in: card eases up from below as it enters the viewport. */
  const enterY = useTransform(enterProgress, [0, 1], [56, 0]);

  /** Depth fade-out as the next card overlays this one. */
  const scale = useTransform(leaveProgress, [0, 1], [1, isLast ? 1 : 0.94]);
  const opacity = useTransform(
    leaveProgress,
    [0, 0.6, 1],
    [1, 1, isLast ? 1 : 0.55]
  );
  const lift = useTransform(leaveProgress, [0, 1], [0, isLast ? 0 : -10]);

  /** Combine parallax-in offset with the depth-lift into one y stream. */
  const y = useTransform<number, number>([enterY, lift] as unknown as MotionValue<number>[], (values) => {
    const arr = values as unknown as number[];
    return (arr[0] ?? 0) + (arr[1] ?? 0);
  });

  const stickyTop = topOffset + index * peek;

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `${stickyTop}px`, zIndex: index + 1 }}
    >
      <motion.article
        className="overflow-hidden rounded-[28px] border border-borderLight bg-[#FAF7EC] shadow-[0_24px_60px_-32px_rgba(10,10,10,0.22)] mb-4 md:mb-6"
        style={
          reduceMotion
            ? undefined
            : { scale, opacity, y, transformOrigin: "center top" }
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[560px] lg:min-h-[620px]">
          <div className="flex flex-col p-7 md:p-9 lg:p-11">
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[12px] font-[700] tracking-[-0.005em] text-[#0A0A0A] shadow-[0_1px_2px_rgba(10,10,10,0.04)]">
                {Icon ? (
                  <Icon
                    className="h-3.5 w-3.5 text-accent"
                    strokeWidth={2.4}
                    aria-hidden
                  />
                ) : null}
                {pillar.eyebrow ?? `Pillar ${pillar.number}`}
              </span>
              <span
                className="text-[20px] font-[800] tabular-nums leading-none tracking-[-0.02em] text-black/30 md:text-[24px]"
                aria-hidden
              >
                {pillar.number}
              </span>
            </div>

            <h3 className="mt-7 max-w-[14ch] text-[28px] font-[900] leading-[1.04] tracking-[-0.03em] text-[#0A0A0A] md:mt-8 md:text-[44px] lg:text-[52px]">
              {pillar.title}
            </h3>

            <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.8] text-secondary md:text-[16px] lg:text-[17px]">
              {pillar.description}
            </p>

            <div className="mt-7 inline-flex items-center gap-2 self-start rounded-full border border-black/10 bg-white px-4 py-2 shadow-[0_1px_2px_rgba(10,10,10,0.04)]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              <span className="text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
                Outcome
              </span>
              <span className="text-[13px] font-[700] leading-tight text-[#0A0A0A]">
                {pillar.outcome}
              </span>
            </div>

            {pillar.offerings && pillar.offerings.length > 0 ? (
              <div className="mt-auto pt-8">
                <p className="text-[13px] font-[700] tracking-[-0.005em] text-[#0A0A0A]">
                  What we offer
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {pillar.offerings.map((offering) => (
                    (() => {
                      const OfferingIcon = getOfferingIcon(offering);
                      return (
                        <li
                          key={offering}
                          className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[12px] font-[600] tracking-[-0.005em] text-[#0A0A0A] shadow-[0_1px_2px_rgba(10,10,10,0.04)]"
                        >
                          <OfferingIcon className="h-3.5 w-3.5 text-accent" strokeWidth={2.1} aria-hidden />
                          {offering}
                        </li>
                      );
                    })()
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-8">
              <SwapArrowButton
                href={pillar.ctaHref}
                className="h-[56px] w-full text-[14px] uppercase tracking-[0.08em]"
              >
                {pillar.ctaLabel}
              </SwapArrowButton>
            </div>
          </div>

          <div className="relative h-[300px] min-h-[300px] md:h-auto md:min-h-full">
            <Image
              src={pillar.image}
              alt={pillar.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

