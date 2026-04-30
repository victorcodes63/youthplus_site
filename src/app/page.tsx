"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { AlertCircle, CalendarClock, CheckCircle2, MapPin, Sparkles, Wrench } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";
import { ScrollJackSection } from "@/components/motion/ScrollJackSection";
import { StickyHeroSeam } from "@/components/motion/StickyHeroSeam";
import { HeroHeading } from "@/components/home/HeroHeading";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { SpeakersCarousel } from "@/components/home/SpeakersCarousel";
import { WhyUsStory } from "@/components/home/WhyUsStory";
import { usePrefersFineHover } from "@/lib/usePrefersFineHover";
import { useMobileTicketCta } from "@/lib/useMobileTicketCta";
import { MobileTicketCta } from "@/components/site/MobileTicketCta";
import { PARTNER_LOGOS } from "@/data/partnerLogos";

const HERO_IMAGE = "/images/women-s-panel-discussion.jpg";
const SUMMIT_IMAGE = "/images/woman-giving-speech.jpg";
const SUMMIT_IMAGE_ALT = "/images/view-funny-stand-up-comedian.jpg";
const EDITORIAL_IMAGE = "/images/smiling-speaker-podium.jpg";
const FEATURED_EVENTS = [
  {
    title: "AI+ Summit Lab",
    meta: "AI • Product • Leadership",
    date: "Thu, 20 Feb 2027",
    venue: "Sarit Expo Centre, Nairobi",
    image: "/images/AI+.webp",
    value:
      "A high-focus track on practical AI strategy for founders and operators shipping products now.",
    tiers: ["Early Bird", "Standard", "VIP"],
    urgency: "127 seats left in Early Bird",
    details: [
      "Speaker highlights: product leads from top African AI teams.",
      "You leave with: practical workflows you can deploy in 30 days.",
      "Best for: founders, PMs, engineering leads, and operators.",
      "Live operator case studies from African product teams.",
    ],
  },
  {
    title: "Blueprint+ Growth Sprint",
    meta: "Strategy • Operations • GTM",
    date: "Fri, 21 Feb 2027",
    venue: "Sarit Expo Centre, Nairobi",
    image: "/images/blueprint+.webp",
    value:
      "From vision to execution systems: the frameworks teams need to build repeatable momentum.",
    tiers: ["Early Bird", "Standard", "VIP"],
    urgency: "94 seats left in Early Bird",
    details: [
      "Speaker highlights: operators scaling multi-country products.",
      "You leave with: a complete execution blueprint for your next quarter.",
      "Best for: startup teams, growth leads, and COO-level builders.",
    ],
  },
  {
    title: "Visioning+ Africa Forum",
    meta: "Futures • Policy • Innovation",
    date: "Sat, 22 Feb 2027",
    venue: "Sarit Expo Centre, Nairobi",
    image: "/images/visioning+.webp",
    value:
      "A forward-looking forum connecting policy, capital, and startup ecosystems shaping the next decade.",
    tiers: ["Early Bird", "Standard", "VIP"],
    urgency: "151 seats left in Early Bird",
    details: [
      "Speaker highlights: ecosystem leaders, policy voices, and investors.",
      "You leave with: strategic direction and partnership pathways.",
      "Best for: executives, ecosystem builders, and innovation teams.",
    ],
  },
  {
    title: "Future of Work",
    meta: "Capital • Revenue • Scale",
    date: "Sun, 23 Feb 2027",
    venue: "Sarit Expo Centre, Nairobi",
    image: "/images/future_of_work+.webp",
    value:
      "A high-context session focused on funding readiness, pricing strategy, and investor-quality execution.",
    tiers: ["Early Bird", "Standard", "VIP"],
    urgency: "88 seats left in Early Bird",
    details: [
      "Speaker highlights: venture operators and revenue architects.",
      "You leave with: investor-ready positioning and pricing clarity.",
      "Best for: founders preparing for scale and fundraising.",
    ],
  },
];
const TICKET_TIERS = [
  {
    name: "Early Bird",
    price: "KES 7,500",
    note: "Best value • Limited release",
    seatsLeft: 127,
    active: true,
    image: "https://plus.unsplash.com/premium_photo-1726848094123-b69f8c83b824?auto=format&fit=crop&w=1200&q=80",
    textTone: "light",
  },
  {
    name: "Standard",
    price: "KES 12,000",
    note: "Core summit access",
    seatsLeft: 380,
    image: "https://images.unsplash.com/photo-1767884161189-ed2f04d87550?auto=format&fit=crop&w=1200&q=80",
    textTone: "dark",
  },
  {
    name: "VIP",
    price: "KES 22,000",
    note: "Priority seating + private networking",
    seatsLeft: 94,
    image: "https://images.unsplash.com/photo-1773730356782-e3044e73cf6f?auto=format&fit=crop&w=1200&q=80",
    textTone: "light",
  },
];

const AGENDA_TEASER = [
  { time: "08:00", title: "Check-in & Partner Expo", detail: "Coffee, registration, and curated meetups" },
  { time: "10:00", title: "Main Stage Keynotes", detail: "Operator stories from high-growth African teams" },
  { time: "13:30", title: "Deep-dive Breakouts", detail: "AI, GTM, fundraising, and product scaling tracks" },
  { time: "17:30", title: "Founder Networking", detail: "Structured investor and partner connections" },
];

const HOME_CASE_STUDIES = [
  {
    id: "01",
    title: "Campus Innovators to First Revenue",
    challenge: "Early-stage founders lacked trusted mentors and structured go-to-market guidance.",
    action: "Ran a 10-week founder sprint with weekly advisory sessions and peer accountability pods.",
    result: "37 teams shipped MVPs; 14 secured first paying customers.",
    imageAlt: "Young African founders collaborating during a Youth+ Africa workshop",
    image: "/images/case-studies/case-study-01.png",
  },
  {
    id: "02",
    title: "Women-Led Venture Support",
    challenge: "High-potential women founders were underconnected to growth-focused networks.",
    action: "Built targeted founder circles and warm-intro pathways to technical and funding partners.",
    result: "12 ventures formed strategic partnerships within one quarter.",
    imageAlt: "African women leaders during a Youth+ Africa strategy session",
    image: "/images/case-studies/case-study-02.png",
  },
  {
    id: "03",
    title: "Regional Talent Exchange",
    challenge: "Young operators in different African markets had limited cross-border collaboration channels.",
    action: "Created exchange cohorts and role-based mentorship anchored in live problem-solving.",
    result: "90+ operators completed exchange tracks across 8 countries.",
    imageAlt: "African innovation team engaging in a Youth+ Africa leadership session",
    image: "/images/case-studies/case-study-03.png",
  },
  {
    id: "04",
    title: "Youth+ Radio Audience Expansion",
    challenge: "Community stories were not consistently reaching new youth audiences outside core cities.",
    action: "Launched a content sprint with guest operators, weekly publishing cadence, and partner cross-promotion.",
    result: "Listener engagement grew 2.4x and community signups increased by 38% in one quarter.",
    imageAlt: "Podcast style studio production with youth hosts",
    image: "/images/case-studies/case-study-04.png",
  },
  {
    id: "05",
    title: "Partner Activation for Skills Cohorts",
    challenge: "Institutional partners needed clearer execution models for practical youth upskilling events.",
    action: "Co-designed a shared cohort playbook with mentor matching, project checkpoints, and outcome tracking.",
    result: "4 partner-backed cohorts launched with 82% completion and stronger placement pathways.",
    imageAlt: "Facilitator leading a collaborative youth workshop",
    image: "/images/case-studies/case-study-05.png",
  },
  {
    id: "06",
    title: "Summit-to-Program Conversion Pipeline",
    challenge: "High summit attendance did not reliably convert into long-term program participation.",
    action: "Built a 30-day follow-up sequence with segmented tracks, office hours, and peer accountability pods.",
    result: "Post-event conversion into active events improved by 46% year over year.",
    imageAlt: "Conference attendees networking after a keynote session",
    image: "/images/case-studies/case-study-06.png",
  },
] as const;

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.04 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

const summitStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

function LiveStat({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1100;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-stat text-accent">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-label text-secondary">
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const summitRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: summitProgress } = useScroll({
    target: summitRef,
    offset: ["start end", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 1], [0.62, 0.76]);
  const heroSeamY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const heroSeamOpacity = useTransform(scrollYProgress, [0, 1], [0.24, 0.78]);
  const summitMediaY = useTransform(summitProgress, [0, 1], ["12%", "-10%"]);
  const summitMediaScale = useTransform(summitProgress, [0, 0.5, 1], [0.96, 1, 1.04]);
  const summitCopyY = useTransform(summitProgress, [0, 1], ["10%", "-6%"]);
  const summitStatsY = useTransform(summitProgress, [0, 1], ["8%", "-4%"]);
  const reduceMotion = useReducedMotion();
  const [openFeatured, setOpenFeatured] = useState<number | null>(null);
  const [hoverTier, setHoverTier] = useState<number | null>(null);
  const fineHover = usePrefersFineHover();
  const { dismissed: mobileTicketCtaDismissed, dismiss: dismissMobileTicketCta } = useMobileTicketCta();
  const caseStudiesViewportRef = useRef<HTMLDivElement | null>(null);
  const caseStudiesTrackRef = useRef<HTMLDivElement | null>(null);
  const [caseCursorActive, setCaseCursorActive] = useState(false);
  const [caseCursorPoint, setCaseCursorPoint] = useState({ x: 0, y: 0 });
  const [caseIsDragging, setCaseIsDragging] = useState(false);
  const [caseDragOffset, setCaseDragOffset] = useState(0);
  const [caseActiveIndex, setCaseActiveIndex] = useState(0);
  const caseDragStartXRef = useRef(0);
  const caseDragOffsetRef = useRef(0);
  const casePointerIdRef = useRef<number | null>(null);
  const caseMovedRef = useRef(false);
  const [caseCardWidth, setCaseCardWidth] = useState(0);
  const [caseGap, setCaseGap] = useState(16);
  const [caseVisibleCount, setCaseVisibleCount] = useState(1);
  const CASE_DRAG_THRESHOLD = 60;

  const heroBackdropEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
  const heroEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const heroColumnsOrchestra = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.14,
        delayChildren: reduceMotion ? 0 : 0.32,
      },
    },
  };

  const heroLeftOrchestra = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.105,
        delayChildren: 0,
      },
    },
  };

  const heroEnterBadge = {
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

  const heroEnterLine = {
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

  const heroEnterBody = {
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

  const heroEnterCta = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 220, damping: 32, mass: 1 },
    },
  };

  const heroPartnerOrchestra = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.11,
        delayChildren: reduceMotion ? 0 : 0.06,
      },
    },
  };

  useEffect(() => {
    const measure = () => {
      const viewport = caseStudiesViewportRef.current;
      const track = caseStudiesTrackRef.current;
      if (!viewport || !track) return;
      const card = track.querySelector<HTMLElement>("[data-case-study-card]");
      if (!card) return;
      const cardWidth = card.offsetWidth;
      const trackStyle = window.getComputedStyle(track);
      const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || "16");
      const visible = Math.max(1, Math.round(viewport.clientWidth / (cardWidth + gap)));
      setCaseCardWidth(cardWidth);
      setCaseGap(Number.isFinite(gap) ? gap : 16);
      setCaseVisibleCount(visible);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const caseMaxIndex = Math.max(0, HOME_CASE_STUDIES.length - caseVisibleCount);
  const caseStep = caseCardWidth + caseGap;
  const caseSafeIndex = Math.min(caseActiveIndex, caseMaxIndex);
  const caseBaseOffset = -caseSafeIndex * caseStep;

  const clampCaseIndex = (next: number) => Math.max(0, Math.min(caseMaxIndex, next));

  const goToCaseStudy = (next: number) => {
    setCaseActiveIndex(clampCaseIndex(next));
  };

  const slideCaseStudies = (direction: "prev" | "next") => {
    goToCaseStudy(caseSafeIndex + (direction === "next" ? 1 : -1));
  };

  const onCasePointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    casePointerIdRef.current = event.pointerId;
    caseDragStartXRef.current = event.clientX;
    caseDragOffsetRef.current = 0;
    caseMovedRef.current = false;
    setCaseIsDragging(true);
    setCaseDragOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onCasePointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!caseIsDragging || casePointerIdRef.current !== event.pointerId) return;
    const delta = event.clientX - caseDragStartXRef.current;
    if (Math.abs(delta) > 4) caseMovedRef.current = true;
    const atStart = caseSafeIndex === 0;
    const atEnd = caseSafeIndex === caseMaxIndex;
    let resisted = delta;
    if ((atStart && delta > 0) || (atEnd && delta < 0)) {
      resisted = delta * 0.35;
    }
    caseDragOffsetRef.current = resisted;
    setCaseDragOffset(resisted);
  };

  const endCasePointer = (pointerId: number) => {
    if (casePointerIdRef.current !== pointerId) return;
    const finalOffset = caseDragOffsetRef.current;
    setCaseIsDragging(false);
    casePointerIdRef.current = null;
    caseDragOffsetRef.current = 0;
    setCaseDragOffset(0);
    if (finalOffset <= -CASE_DRAG_THRESHOLD) {
      goToCaseStudy(caseSafeIndex + 1);
      return;
    }
    if (finalOffset >= CASE_DRAG_THRESHOLD) {
      goToCaseStudy(caseSafeIndex - 1);
    }
  };

  const onCasePointerUp: React.PointerEventHandler<HTMLDivElement> = (event) => {
    endCasePointer(event.pointerId);
  };

  const onCasePointerCancel: React.PointerEventHandler<HTMLDivElement> = (event) => {
    endCasePointer(event.pointerId);
  };

  const homeCaseStudiesSection = (
    <section id="home-case-studies" className="relative bg-white py-14 md:py-20">
      <SectionDivider contentWidth className="absolute top-0" />
      <div className="page mx-auto max-w-[1440px]">
        <div className="inline-flex items-center rounded-md border border-accent/80 bg-accent/15 px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
          Case Studies
        </div>
        <h2 className="mt-4 max-w-[17ch] text-[32px] font-[900] leading-[1.02] tracking-[-0.04em] md:text-[48px] text-[#0A0A0A]">
          Tangible outcomes from real ecosystem work.
        </h2>

        <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 border-y border-white/10 bg-[#0A0A0A] px-4 py-5 md:px-6 md:py-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between md:mb-5">
            <p className="text-[11px] font-[800] uppercase tracking-[0.24em] text-white/55">
              <span className="lg:hidden">Drag to explore</span>
              <span className="hidden lg:inline">6 case studies</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => slideCaseStudies("prev")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/0 text-white transition-colors hover:border-accent hover:bg-accent hover:text-[#0A0A0A]"
                aria-label="Previous case study"
              >
                &larr;
              </button>
              <button
                type="button"
                onClick={() => slideCaseStudies("next")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/0 text-white transition-colors hover:border-accent hover:bg-accent hover:text-[#0A0A0A]"
                aria-label="Next case study"
              >
                &rarr;
              </button>
            </div>
          </div>

          <div
            ref={caseStudiesViewportRef}
            className={`relative overflow-hidden touch-pan-y select-none ${
              caseIsDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onPointerDown={onCasePointerDown}
            onPointerMove={onCasePointerMove}
            onPointerUp={onCasePointerUp}
            onPointerCancel={onCasePointerCancel}
            onMouseEnter={() => setCaseCursorActive(true)}
            onMouseLeave={() => setCaseCursorActive(false)}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setCaseCursorPoint({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
              });
            }}
          >
            <div
              ref={caseStudiesTrackRef}
              className="flex gap-4 pb-1 md:gap-6 will-change-transform"
              style={{
                transform: `translate3d(${caseBaseOffset + caseDragOffset}px, 0, 0)`,
                transition: caseIsDragging
                  ? "none"
                  : `transform ${reduceMotion ? 1 : 600}ms cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            >
              {HOME_CASE_STUDIES.map((study) => (
                <article
                  key={study.title}
                  data-case-study-card
                  className="w-[min(88vw,420px)] shrink-0 overflow-hidden rounded-xl border border-white/15 bg-[#111111] md:w-[calc((100vw-4.75rem)/2)] lg:w-[calc((100vw-6.5rem)/2)]"
                >
                  <div className="relative h-[170px] md:h-[180px]">
                    <Image
                      src={study.image}
                      alt={study.imageAlt}
                      fill
                      sizes="(max-width: 767px) 88vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                  </div>
                  <div className="grid grid-cols-[auto_1fr] gap-3 p-4 md:p-5">
                    <p className="text-[34px] font-[800] leading-none tracking-[-0.02em] text-white/90">{study.id}</p>
                    <div>
                      <h3 className="text-[17px] md:text-[18px] font-[900] leading-[1.15] tracking-[-0.02em] text-white">
                        {study.title}
                      </h3>
                      <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-[800] uppercase tracking-[0.08em] text-white/55">
                        <AlertCircle size={12} aria-hidden="true" />
                        Challenge
                      </p>
                      <p className="mt-1 text-[13px] leading-[1.55] text-white/80">{study.challenge}</p>
                      <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-[800] uppercase tracking-[0.08em] text-white/55">
                        <Wrench size={12} aria-hidden="true" />
                        What we did
                      </p>
                      <p className="mt-1 text-[13px] leading-[1.55] text-white/80">{study.action}</p>
                      <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-[800] uppercase tracking-[0.08em] text-accent">
                        <CheckCircle2 size={12} aria-hidden="true" />
                        Result
                      </p>
                      <p className="mt-1 text-[13px] leading-[1.55] text-white">{study.result}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <AnimatePresence>
              {caseCursorActive ? (
                <motion.div
                  className="pointer-events-none absolute z-20 hidden h-16 w-16 items-center justify-center rounded-full border border-accent bg-black/70 text-[11px] font-[900] uppercase tracking-[0.1em] text-accent md:flex"
                  style={{ left: caseCursorPoint.x, top: caseCursorPoint.y, x: "-50%", y: "-50%" }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                >
                  Drag
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <main
      className={`${mobileTicketCtaDismissed ? "pb-0" : "pb-24"} md:pb-0 transition-[padding] duration-200`}
    >
      <StickyHeroSeam
        sheetClassName="rounded-t-[24px] overflow-hidden"
        hero={
      <section
        id="hero"
        ref={heroRef}
        className="relative overflow-hidden bg-[#0A0A0A] w-full min-h-[calc(100vh-84px)]"
      >
        <motion.div
          className="absolute inset-0"
          style={{ y: heroImageY, scale: heroImageScale }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 1.05,
              ease: heroBackdropEase,
            }}
          >
            <Image
              src={HERO_IMAGE}
              alt="Women panel discussion at Youth+ Africa summit"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-[#0A0A0A]"
          style={{ opacity: heroOverlayOpacity }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 1.05,
            delay: reduceMotion ? 0 : 0.12,
            ease: heroBackdropEase,
          }}
          style={{
            background:
              "radial-gradient(circle at 18% 22%, rgba(229,194,34,0.16) 0%, transparent 36%), radial-gradient(circle at 82% 78%, rgba(229,194,34,0.1) 0%, transparent 40%)",
          }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[180px] pointer-events-none"
          style={{
            y: heroSeamY,
            opacity: heroSeamOpacity,
            background:
              "linear-gradient(to top, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.1) 34%, transparent 100%)",
          }}
        />

        <motion.div
          className="relative page mx-auto max-w-[1440px] min-h-[calc(100vh-84px)] py-12 md:py-14 xl:py-16 flex items-center"
          style={{ y: heroContentY }}
        >
          <motion.div
            className="w-full grid grid-cols-12 gap-y-10 lg:gap-x-10 items-end"
            variants={heroColumnsOrchestra}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="col-span-12 xl:col-span-8"
              variants={heroLeftOrchestra}
            >
              <motion.div
                variants={heroEnterBadge}
                className="inline-flex items-center gap-3 rounded-md border-[1.5px] border-accent/85 bg-black/30 px-3.5 py-1.5 text-label text-accent"
              >
                <span className="md:hidden">Youth+ · Tickets Live</span>
                <span className="hidden md:inline">Youth+ Africa Festival 2026 · Tickets Live</span>
              </motion.div>

              <HeroHeading
                className="mt-5"
                lines={["Where Africa's Next", "Generation Ignites"]}
              />

              <motion.p
                variants={heroEnterBody}
                className="mt-6 text-lead max-w-[62ch] text-white/80"
              >
                Join founders, operators, investors, and builders driving the next
                decade of African innovation. Secure your ticket now while this
                release window is still open.
              </motion.p>

              <motion.div
                variants={heroEnterCta}
                className="mt-9 flex flex-row gap-2 sm:gap-3 max-md:items-stretch md:items-center md:justify-start md:gap-4"
              >
                <SwapArrowButton
                  href="/events"
                  compact
                  className="h-12 min-w-0 flex-1 basis-0 rounded-md font-[600] text-[0.9375rem] tracking-[0.01em] md:flex-none md:basis-auto md:px-4"
                >
                  Tickets
                </SwapArrowButton>
                <Link
                  href="/events"
                  className="inline-flex min-w-0 flex-1 basis-0 items-center justify-center h-12 px-3 sm:px-5 rounded-md border border-white/20 bg-white/5 text-white text-[0.9375rem] font-[600] tracking-[0.01em] hover:border-accent hover:text-accent transition-colors text-center leading-snug md:inline-flex md:flex-none md:basis-auto md:w-auto"
                >
                  Pass Types
                </Link>
              </motion.div>

              <motion.div
                variants={heroEnterLine}
                className="mt-7 hidden md:flex flex-wrap items-center gap-x-5 gap-y-2 text-small text-white/80"
              >
                <span>Instant checkout</span>
                <span>•</span>
                <span>Secure payment</span>
                <span>•</span>
                <span>QR ticket delivered by email</span>
              </motion.div>
            </motion.div>

            <motion.div
              id="partners-strip"
              className="col-span-12 xl:col-span-4 max-w-[560px] w-full xl:ml-auto"
              variants={heroPartnerOrchestra}
            >
              <motion.div
                variants={heroEnterLine}
                className="text-label text-white/55"
              >
                Partners
              </motion.div>
              <motion.div
                variants={heroEnterLine}
                className="mt-6 overflow-hidden max-w-[516px]"
              >
                <motion.div
                  className="flex gap-3"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 18, ease: "linear", repeat: Infinity }}
                >
                  {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
                    <div
                      key={`${logo.src}-${i}`}
                      className="min-w-[164px] h-[64px] px-4 flex items-center justify-center"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={138}
                        height={42}
                        className="max-h-[42px] w-auto object-contain brightness-0 invert opacity-85"
                      />
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
        }
      >
      {/* Summit snapshot section (inspired by ATS structure). */}
      <ScrollJackSection id="summit-snapshot" className="bg-white text-[#0A0A0A]" intensity={1.1}>
        <div
          ref={summitRef}
          className="page mx-auto max-w-[1440px] py-14 md:py-20 min-w-0 w-full box-border"
        >
          {/* Single column on small screens — 12-col + gap can exceed viewport width and clip copy (html overflow-x: clip). */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center min-w-0 w-full">
            <div className="lg:col-span-7 order-2 lg:order-1 min-w-0 max-w-full w-full">
              <motion.div
                className="relative h-[248px] sm:h-[280px] md:h-[320px] w-full max-w-full min-w-0 overflow-hidden"
                style={{ y: summitMediaY, scale: summitMediaScale }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={summitStagger}
              >
                <motion.div
                  variants={staggerItem}
                  className="absolute z-20 left-0 top-0 h-[200px] w-[200px] sm:h-[240px] sm:w-[240px] md:h-[280px] md:w-[280px] rounded-[76px] sm:rounded-[90px] overflow-hidden border border-borderLight"
                >
                  <Image
                    src={SUMMIT_IMAGE}
                    alt="Speaker on stage"
                    fill
                    className="object-cover object-[center_24%]"
                    sizes="(max-width: 640px) 200px, 280px"
                  />
                </motion.div>
                <motion.div
                  variants={staggerItem}
                  aria-hidden="true"
                  className="absolute z-0 pointer-events-none left-[132px] sm:left-[160px] md:left-[220px] top-0 h-[118px] w-[118px] sm:h-[140px] sm:w-[140px] md:h-[160px] md:w-[160px] rounded-t-[68px] rounded-b-[16px] sm:rounded-t-[80px] sm:rounded-b-[18px]"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(10,10,10,0.92) 1.1px, transparent 1.1px), radial-gradient(rgba(229,194,34,0.95) 1.1px, transparent 1.1px)",
                    backgroundSize: "8px 8px",
                    backgroundPosition: "0 0, 4px 4px",
                  }}
                />
                <motion.div
                  variants={staggerItem}
                  className="absolute z-20 left-[138px] sm:left-[170px] md:left-[235px] top-[108px] sm:top-[125px] md:top-[140px] h-[118px] w-[118px] sm:h-[140px] sm:w-[140px] md:h-[160px] md:w-[160px] rounded-b-[68px] rounded-t-[16px] sm:rounded-b-[80px] sm:rounded-t-[18px] overflow-hidden border border-borderLight"
                >
                  <Image
                    src={SUMMIT_IMAGE_ALT}
                    alt="Audience at summit"
                    fill
                    className="object-cover object-[72%_38%]"
                    sizes="(max-width: 640px) 118px, 160px"
                  />
                </motion.div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 min-w-0 max-w-full w-full">
              <motion.div style={{ y: summitCopyY }}>
                <FadeUp className="min-w-0 max-w-full w-full">
                <h2 className="text-h1 text-primary break-words">
                  The Leading
                  <br />
                  African Youth
                  <br />
                  Innovation Summit
                </h2>
                <p className="mt-6 w-full text-lead break-words [word-break:break-word] hyphens-auto">
                  {
                    "For builders, founders, investors, and ecosystem partners shaping what comes next across Africa."
                  }
                </p>
                <div className="mt-8 min-w-0 max-w-full">
                  <SwapArrowButton
                    href="/events"
                    className="h-11 px-5 text-[0.9375rem] font-[600] tracking-[0.01em] rounded-md"
                    hoverTextClassName="hover:text-white"
                    hoverBgClassName="hover:bg-[#0A0A0A]"
                  >
                    What to expect
                  </SwapArrowButton>
                </div>
                </FadeUp>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="mt-10 md:mt-12 border-t border-borderLight pt-8"
            style={{ y: summitStatsY }}
          >
            <div className="mx-auto max-w-[980px] grid grid-cols-2 md:grid-cols-4 gap-8 place-items-center">
              {[
                { value: 24, suffix: "", label: "Strategic Partners" },
                { value: 38, suffix: "", label: "Confirmed Speakers" },
                { value: 12, suffix: "", label: "African Cities Represented" },
                { value: 1200, suffix: "+", label: "Available Seats" },
              ].map((stat, idx) => (
                <FadeUp key={stat.label} delayMs={idx * 70}>
                  <LiveStat value={stat.value} suffix={stat.suffix} label={stat.label} />
                </FadeUp>
              ))}
            </div>
          </motion.div>
        </div>
      </ScrollJackSection>
      </StickyHeroSeam>

      <SpeakersCarousel />

      <WhyUsStory />

      {/* Editorial image split (full-bleed where used). */}
      <section id="editorial-sessions" className="relative overflow-hidden border-y border-white/10">
        <motion.div
          className="absolute inset-0"
          style={{ y: "6%" }}
          animate={{ scale: [1, 1.035, 1] }}
          transition={{ duration: 22, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        >
          <Image
            src={EDITORIAL_IMAGE}
            alt="Speaker at a youth conference"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/88 via-[#0A0A0A]/72 to-[#0A0A0A]/84" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(229,194,34,0.08),transparent_40%)]" />
        <div className="relative page mx-auto max-w-[1440px] py-16 md:py-20">
          <div className="grid grid-cols-12 gap-8 lg:gap-10 items-start lg:items-center">
            <div className="col-span-12 lg:col-span-8">
              <FadeUp>
                <div className="inline-flex items-center rounded-md border-[1.5px] border-accent/75 bg-black/25 px-3.5 py-1.5 text-label text-accent">
                  Editorial sessions
                </div>
                <h3 className="mt-5 text-h2 max-w-[14ch] text-white" style={{ fontVariationSettings: '"opsz" 36' }}>
                  Build with clarity. Pitch with confidence.
                </h3>
                <p className="mt-5 text-lead max-w-[56ch] text-white/80 [text-shadow:0_1px_12px_rgba(10,10,10,0.55)]">
                  Short formats, strong facilitation, and outcomes you can measure.
                  Bring your idea; leave with a plan.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md border border-white/20 bg-black/25 px-3 py-1.5 text-small text-white/80">
                    Practical keynotes
                  </span>
                  <span className="inline-flex items-center rounded-md border border-white/20 bg-black/25 px-3 py-1.5 text-small text-white/80">
                    Builder workshops
                  </span>
                  <span className="inline-flex items-center rounded-md border border-white/20 bg-black/25 px-3 py-1.5 text-small text-white/80">
                    Real networking
                  </span>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Featured events — layout: phone (stack) → md (full width row) → lg (image + copy columns, stagger). */}
      <section id="featured-events" className="page mx-auto max-w-[1440px] py-14">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <FadeUp>
            <div>
              <div className="text-label text-secondary">
                Featured events
              </div>
              <h2 className="mt-4 text-h2 text-primary">
                Choose your track. Reserve your seat.
              </h2>
            </div>
          </FadeUp>
          <div className="hidden md:block">
            <Link
              href="/events"
              className="text-[0.9375rem] font-[500] text-primary inline-flex items-center gap-2 hover:underline underline-offset-4"
            >
              View all <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-10 space-y-6 md:space-y-8">
          {FEATURED_EVENTS.map((event, idx) => (
            <FadeUp key={event.title} delayMs={idx * 80}>
              <motion.article
                className={`overflow-hidden border border-borderLight rounded-xl bg-white shadow-[0_12px_40px_rgba(10,10,10,0.07)] md:rounded-xl md:shadow-[0_10px_30px_rgba(10,10,10,0.06)] lg:rounded-md max-md:border-l-[3px] max-md:border-l-accent ${
                  idx % 2 === 0 ? "lg:mr-10" : "lg:ml-10"
                }`}
                onMouseEnter={() => {
                  if (fineHover) setOpenFeatured(idx);
                }}
                onMouseLeave={() => {
                  if (fineHover) setOpenFeatured((prev) => (prev === idx ? null : prev));
                }}
                initial={{ opacity: 0, y: 22, scale: 0.992 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                whileHover={
                  fineHover
                    ? {
                        y: -6,
                        scale: 1.005,
                        boxShadow: "0 20px 52px rgba(10,10,10,0.12)",
                      }
                    : undefined
                }
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 ${
                    idx % 2 === 1 ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
                  }`}
                >
                  <div className="relative h-[min(52vw,240px)] min-h-[200px] sm:min-h-[220px] md:h-[260px] lg:h-full lg:col-span-5 overflow-hidden max-md:rounded-t-xl">
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        scale: openFeatured === idx ? 1.055 : 1,
                        y: openFeatured === idx ? -6 : 0,
                      }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                      <Image
                        src={event.image}
                        alt={`${event.title} featured visual`}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent"
                      animate={{ opacity: openFeatured === idx ? 0.9 : 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    <div className="absolute left-4 bottom-4">
                      <div className="inline-flex items-center rounded-md border border-accent/70 bg-black/35 px-2.5 py-1 text-accent text-[10px] font-[800] tracking-[0.1em] uppercase">
                        Event
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 p-4 sm:p-5 md:p-6">
                    <h3 className="text-h3 text-primary">
                      {event.title}
                    </h3>
                    <div className="mt-2.5 inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-[700] text-secondary">
                      <Sparkles size={14} aria-hidden="true" />
                      {event.meta}
                    </div>
                    <div className="mt-3 flex flex-col gap-1 rounded-md border border-borderLight/80 bg-[#fafafa] px-3 py-2.5 sm:flex-row sm:items-center sm:gap-3 sm:border-0 sm:bg-transparent sm:p-0">
                      <div className="inline-flex items-center gap-1.5 text-[13px] font-[800] text-primary">
                        <CalendarClock size={14} aria-hidden="true" />
                        {event.date}
                      </div>
                      <span className="hidden h-3 w-px bg-borderLight sm:block" aria-hidden="true" />
                      <div className="inline-flex items-center gap-1.5 text-[13px] font-[700] text-secondary leading-snug">
                        <MapPin size={14} aria-hidden="true" />
                        {event.venue}
                      </div>
                    </div>
                    <p className="mt-3 text-[14px] md:text-[15px] leading-[1.65] text-secondary max-w-[64ch]">
                      {event.value}
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-2">
                      {event.tiers.map((tier, tierIdx) => (
                        <span
                          key={tier}
                          className={`flex items-center justify-center rounded-md border px-1.5 py-2 text-[10px] sm:inline-flex sm:px-2.5 sm:py-1 sm:text-[11px] font-[800] uppercase tracking-[0.06em] sm:tracking-[0.08em] text-center leading-tight ${
                            tierIdx === 0
                              ? "border-accent bg-accent/10 text-[#0A0A0A]"
                              : "border-borderLight text-secondary"
                          }`}
                        >
                          {tier}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 text-[12px] sm:text-[13px] font-[800] text-[#0A0A0A]">
                      {event.urgency}
                    </div>

                    {!fineHover && (
                      <p className="mt-4 text-[12px] sm:text-[13px] font-[700] text-secondary leading-snug">
                        Tap <span className="text-primary">Show details</span> for the full brief.
                      </p>
                    )}
                    {fineHover && (
                      <motion.div
                        className="mt-4 hidden md:inline-flex items-center gap-2 text-[13px] font-[800] text-primary/90"
                        animate={{ x: openFeatured === idx ? 2 : 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        Hover to reveal more
                        <motion.span
                          aria-hidden="true"
                          animate={{ rotate: openFeatured === idx ? 45 : 0 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                        >
                          +
                        </motion.span>
                      </motion.div>
                    )}

                    <AnimatePresence initial={false}>
                      {openFeatured === idx && (
                        <motion.div
                          key="details"
                          initial={{ height: 0, opacity: 0, y: -6 }}
                          animate={{ height: "auto", opacity: 1, y: 0 }}
                          exit={{ height: 0, opacity: 0, y: -6 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 border-t border-borderLight pt-4 space-y-2.5">
                            {event.details.map((item) => (
                              <motion.div
                                key={item}
                                className="flex gap-2.5 text-[13px] text-secondary leading-[1.55]"
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                              >
                                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                                <span>{item}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                      <SwapArrowButton
                        href="/events"
                        className="h-12 w-full justify-center px-4 rounded-md text-[0.9375rem] font-[600] tracking-[0.01em] sm:h-[42px] sm:w-auto"
                        hoverTextClassName="hover:text-white"
                        hoverBgClassName="hover:bg-[#0A0A0A]"
                      >
                        Reserve ticket
                      </SwapArrowButton>
                      <Link
                        href="/events"
                        className="inline-flex h-12 w-full sm:h-[42px] sm:w-auto items-center justify-center rounded-md border border-borderLight px-4 text-[0.9375rem] font-[600] tracking-[0.01em] text-primary hover:border-accent transition-colors"
                      >
                        View agenda
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpenFeatured((prev) => (prev === idx ? null : idx))}
                        className={`inline-flex h-12 w-full sm:h-[42px] sm:w-auto items-center justify-center rounded-md border border-borderLight bg-white px-4 text-[0.9375rem] font-[600] tracking-[0.01em] text-primary/90 hover:border-accent transition-colors ${
                          fineHover ? "md:hidden" : ""
                        }`}
                      >
                        {openFeatured === idx ? "Hide details" : "Show details"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            </FadeUp>
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Link
            href="/events"
            className="inline-flex items-center justify-center w-full h-[46px] rounded-md bg-accent text-[#0A0A0A] font-[900]"
          >
            View all events
          </Link>
        </div>
      </section>

      <section id="ticket-tiers" className="page mx-auto max-w-[1440px] py-14 border-t border-borderLight/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-5">
            <FadeUp>
              <div className="text-label text-secondary">
                Ticket tiers
              </div>
              <h3 className="mt-4 text-h2 text-primary">
                Pick your pass before this batch closes.
              </h3>
              <p className="mt-4 text-lead max-w-[52ch]">
                Transparent pricing windows, secure checkout, and instant QR delivery.
                Early Bird inventory updates in real-time.
              </p>
            </FadeUp>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
            {TICKET_TIERS.map((tier, idx) => (
              <FadeUp key={tier.name} delayMs={idx * 70}>
                <motion.article
                  onMouseEnter={() => setHoverTier(idx)}
                  onMouseLeave={() => setHoverTier((prev) => (prev === idx ? null : prev))}
                  className={`rounded-md border p-4 md:p-5 bg-white shadow-[0_6px_24px_rgba(10,10,10,0.04)] h-[220px] ${
                    tier.active ? "border-accent" : "border-borderLight"
                  } relative overflow-hidden`}
                  whileHover={{ y: -5, boxShadow: "0 18px 38px rgba(10,10,10,0.12)" }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                >
                  {/*
                    Default state uses black text on white card.
                    On reveal, tone switches per tier via textTone.
                  */}
                  {(() => {
                    const isRevealed = hoverTier === idx;
                    const useLightText = isRevealed && tier.textTone === "light";
                    return (
                      <div className="relative z-10 flex h-full flex-col justify-between">
                        <div
                          className={`text-label ${
                            useLightText ? "text-white" : "text-black"
                          }`}
                        >
                          {tier.name}
                        </div>
                        <div>
                          <div
                            className={`mt-2 text-[2.15rem] md:text-[2.35rem] leading-[0.95] tracking-[-0.02em] font-[800] ${
                              useLightText ? "text-white" : "text-black"
                            }`}
                            style={{ fontVariationSettings: '"opsz" 30' }}
                          >
                            {tier.price}
                          </div>
                          <div
                            className={`mt-2 text-[13px] ${
                              useLightText ? "text-white" : "text-black"
                            }`}
                          >
                            {tier.note}
                          </div>
                        </div>
                        <div
                          className={`mt-4 text-[12px] font-[800] ${
                            useLightText ? "text-white" : "text-black"
                          }`}
                        >
                          {tier.seatsLeft} seats left
                        </div>
                      </div>
                    );
                  })()}
                  {tier.textTone === "dark" && (
                    <div className="absolute inset-0 bg-white z-[1]" />
                  )}
                  <motion.div
                    className="absolute inset-0 z-[2]"
                    animate={{ opacity: hoverTier === idx ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <Image
                      src={tier.image}
                      alt={`${tier.name} ticket tier visual`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0A0A0A]/72" />
                  </motion.div>
                </motion.article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section id="agenda-teaser" className="page mx-auto max-w-[1440px] py-14 border-t border-borderLight/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-4">
            <FadeUp>
              <div className="text-label text-secondary">
                Agenda teaser
              </div>
              <h3 className="mt-4 text-h2 text-primary">
                What your summit day looks like.
              </h3>
            </FadeUp>
          </div>
          <div className="lg:col-span-8">
            <motion.div
              className="space-y-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {AGENDA_TEASER.map((slot) => (
                <motion.div
                  key={slot.time}
                  variants={staggerItem}
                  className="grid grid-cols-[74px_1fr] gap-4 rounded-md border border-borderLight bg-white p-4 md:p-5"
                >
                  <div className="text-h3 text-accent">{slot.time}</div>
                  <div>
                    <div className="text-h3 text-primary">{slot.title}</div>
                    <div className="mt-1 text-small">{slot.detail}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {homeCaseStudiesSection}

      <section id="buyer-faqs" className="page mx-auto max-w-[1440px] py-14 border-t border-borderLight/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-6">
            <FadeUp>
              <div className="text-label text-secondary">
                Buy with confidence
              </div>
              <h3 className="mt-4 text-h2 text-primary">
                Everything you need before checkout.
              </h3>
              <motion.div
                className="mt-6 space-y-3"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                variants={staggerContainer}
              >
                {[
                  "Instant QR ticket delivered by email after payment.",
                  "Secure payment support for M-Pesa and international cards.",
                  "Group and company ticketing available on request.",
                ].map((item) => (
                  <motion.div
                    key={item}
                    variants={staggerItem}
                    className="flex items-start gap-3 text-small"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </FadeUp>
          </div>
          <div className="lg:col-span-6">
            <FadeUp>
              <div className="rounded-md border border-borderLight bg-white p-5 md:p-6">
                <div className="text-label text-accent">Common buyer FAQs</div>
                <div className="mt-4 space-y-4 text-small">
                  <div>
                    <div className="font-[800] text-primary">Can I transfer a ticket?</div>
                    <div className="mt-1">Yes. Name transfer is allowed up to 72 hours before the summit.</div>
                  </div>
                  <div>
                    <div className="font-[800] text-primary">Do you issue company invoices?</div>
                    <div className="mt-1">Yes. Select company checkout and we will issue a compliant invoice.</div>
                  </div>
                  <div>
                    <div className="font-[800] text-primary">Is there a refund window?</div>
                    <div className="mt-1">Tickets are refundable within 7 days of purchase for early purchases.</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {!mobileTicketCtaDismissed && (
        <MobileTicketCta onDismiss={dismissMobileTicketCta} />
      )}

    </main>
  );
}
