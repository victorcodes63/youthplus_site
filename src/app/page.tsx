"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { AlertCircle, CalendarClock, CheckCircle2, MapPin, Wrench } from "lucide-react";
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
import { type CarouselGestureIntent, resolveCarouselTouchIntent } from "@/lib/carouselTouchScroll";

const HERO_IMAGE = "/images/women-s-panel-discussion.jpg";
const SUMMIT_IMAGE = "/images/woman-giving-speech.jpg";
const SUMMIT_IMAGE_ALT = "/images/view-funny-stand-up-comedian.jpg";
const EDITORIAL_IMAGE = "/images/smiling-speaker-podium.jpg";
const FEATURED_EVENTS = [
  {
    title: "AI+ Summit Lab",
    meta: "AI • Product • Leadership",
    date: "Thu, 19 Feb 2026",
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
    date: "Fri, 20 Feb 2026",
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
    date: "Sat, 21 Feb 2026",
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
    date: "Sun, 22 Feb 2026",
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
    seatsLeft: 318,
    image: "https://images.unsplash.com/photo-1767884161189-ed2f04d87550?auto=format&fit=crop&w=1200&q=80",
    textTone: "dark",
  },
  {
    name: "VIP",
    price: "KES 22,000",
    note: "Priority seating + private networking",
    seatsLeft: 82,
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

function splitPrice(price: string) {
  const [currency = "", ...rest] = price.trim().split(" ");
  return {
    currency: currency || "KES",
    amount: rest.join(" ") || price,
  };
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
  const caseDragStartYRef = useRef(0);
  const caseDragOffsetRef = useRef(0);
  const casePointerIdRef = useRef<number | null>(null);
  const caseIntentRef = useRef<CarouselGestureIntent>("idle");
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
    caseDragStartYRef.current = event.clientY;
    caseDragOffsetRef.current = 0;
    caseMovedRef.current = false;
    setCaseDragOffset(0);
    if (event.pointerType === "mouse") {
      caseIntentRef.current = "horizontal";
      setCaseIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    } else {
      caseIntentRef.current = "pending";
      setCaseIsDragging(false);
    }
  };

  const onCasePointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (casePointerIdRef.current !== event.pointerId) return;

    if (caseIntentRef.current === "pending") {
      const next = resolveCarouselTouchIntent(
        event.clientX,
        event.clientY,
        caseDragStartXRef.current,
        caseDragStartYRef.current,
      );
      if (next === "vertical") {
        caseIntentRef.current = "vertical";
        caseDragOffsetRef.current = 0;
        setCaseDragOffset(0);
        setCaseIsDragging(false);
        return;
      }
      if (next === "pending") return;
      caseIntentRef.current = "horizontal";
      setCaseIsDragging(true);
    }

    if (caseIntentRef.current === "vertical") return;
    if (caseIntentRef.current !== "horizontal") return;

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
    const intent = caseIntentRef.current;
    const finalOffset = caseDragOffsetRef.current;
    setCaseIsDragging(false);
    casePointerIdRef.current = null;
    caseIntentRef.current = "idle";
    caseDragOffsetRef.current = 0;
    setCaseDragOffset(0);

    if (intent === "vertical") return;

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
        className="relative -mt-[var(--site-header-height)] w-full overflow-hidden bg-[#0A0A0A] pt-[var(--site-header-height)] min-h-[100dvh]"
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
          className="relative page mx-auto flex min-h-[calc(100dvh_-_var(--site-header-height))] max-w-[1440px] items-center py-12 md:py-14 xl:py-16"
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
                <SwapArrowButton
                  href="/events"
                  compact
                  className="h-12 min-w-0 flex-1 basis-0 justify-center rounded-md border border-white/20 px-3 font-[600] text-[0.9375rem] tracking-[0.01em] sm:px-5 md:flex-none md:basis-auto md:px-5"
                  backgroundColor="rgba(255,255,255,0.05)"
                  backgroundHoverColor="#FFFFFF"
                  textColor="#FFFFFF"
                  textHoverColor="#0A0A0A"
                  fillColor="rgba(255,255,255,0.12)"
                  iconColor="#FFFFFF"
                  iconHoverFill="rgba(10,10,10,0.12)"
                >
                  Pass types
                </SwapArrowButton>
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
          animate={{ scale: [1, 1.035, 1] }}
          transition={{ duration: 22, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        >
          <Image
            src={EDITORIAL_IMAGE}
            alt="Speaker at a youth conference"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[82%_28%] md:object-[80%_24%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/84 via-[#0A0A0A]/64 to-[#0A0A0A]/82" />
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

      {/* Featured events — poster + content split, line-language details, Summit 2026 dates */}
      <section
        id="featured-events"
        className="border-t border-borderLight/80 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_22%,#ffffff_100%)]"
      >
        <div className="page mx-auto max-w-[1440px] py-14 md:py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <FadeUp>
              <p className="inline-flex w-fit rounded-full border border-accent/55 bg-accent/10 px-4 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
                Featured events
              </p>
              <h2 className="mt-4 max-w-[18ch] text-h2 text-primary md:max-w-[22ch]">
                Choose your track. Reserve your seat.
              </h2>
              <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-secondary md:text-[16px]">
                Summit-week labs at Sarit — each built for a clear outcome, with transparent tiers and instant
                confirmation after checkout.
              </p>
            </FadeUp>
            <FadeUp delayMs={60} className="shrink-0">
              <SwapArrowButton
                href="/events"
                compact
                className="h-11 justify-center rounded-full border border-borderLight px-4 text-[12px] font-[800] uppercase tracking-[0.06em] sm:min-w-[168px] sm:px-5 sm:text-[13px]"
                backgroundColor="#FFFFFF"
                backgroundHoverColor="#0A0A0A"
                textColor="#0A0A0A"
                textHoverColor="#FFFFFF"
                fillColor="rgba(10,10,10,0.08)"
                iconColor="#0A0A0A"
                iconHoverFill="rgba(255,255,255,0.18)"
              >
                View all events
              </SwapArrowButton>
            </FadeUp>
          </div>

          <div className="mt-12 space-y-10 md:space-y-12">
            {FEATURED_EVENTS.map((event, idx) => {
              const previewDetails = event.details.slice(0, 2);
              const extraDetails = event.details.slice(2);
              const hasExtra = extraDetails.length > 0;
              return (
                <FadeUp key={event.title} delayMs={idx * 70}>
                  <motion.article
                    className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_1px_0_rgba(10,10,10,0.04),0_24px_60px_rgba(10,10,10,0.07)]"
                    onMouseEnter={() => {
                      if (fineHover) setOpenFeatured(idx);
                    }}
                    onMouseLeave={() => {
                      if (fineHover) setOpenFeatured((prev) => (prev === idx ? null : prev));
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={
                      fineHover
                        ? { y: -4, boxShadow: "0 28px 70px rgba(10,10,10,0.1)" }
                        : undefined
                    }
                    transition={{ duration: 0.32, ease: "easeOut" }}
                  >
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-[minmax(280px,42%)_1fr] ${
                        idx % 2 === 1 ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
                      }`}
                    >
                      <div className="relative aspect-[5/3] min-h-[200px] sm:aspect-[16/9] sm:min-h-[240px] lg:min-h-[min(100%,340px)] lg:aspect-auto overflow-hidden">
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            scale: openFeatured === idx ? 1.04 : 1,
                          }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <Image
                            src={event.image}
                            alt={`${event.title} — featured session visual`}
                            fill
                            sizes="(min-width: 1024px) 38vw, 100vw"
                            className="object-cover"
                          />
                        </motion.div>
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-[#1a0f32]/95 via-[#0a0a0a]/78 to-black/35"
                          aria-hidden
                        />
                        <div
                          className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_90%_100%,rgba(229,194,34,0.2),transparent_55%)]"
                          aria-hidden
                        />
                        <div className="absolute inset-x-0 top-0 flex justify-end p-4 sm:p-5">
                          <div className="max-w-[14rem] rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-right backdrop-blur-[6px] sm:max-w-[16rem] sm:px-3.5 sm:py-2.5">
                            <p className="text-[10px] font-[800] uppercase tracking-[0.12em] text-accent">
                              Session date
                            </p>
                            <p className="mt-1 text-[12px] font-[800] leading-snug text-white sm:text-[13px]">
                              {event.date}
                            </p>
                          </div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6">
                          <span className="inline-flex rounded-full border border-accent/60 bg-black/40 px-2.5 py-1 text-[10px] font-[800] uppercase tracking-[0.12em] text-accent backdrop-blur-sm">
                            Event
                          </span>
                          <p className="mt-3 max-w-[36ch] font-[family-name:var(--font-body)] text-[11px] font-[700] uppercase tracking-[0.14em] text-white/75">
                            {event.meta}
                          </p>
                          <p className="mt-1.5 text-[22px] font-[900] leading-[1.08] tracking-[-0.03em] text-white sm:text-[26px] md:text-[28px]">
                            {event.title}
                          </p>
                        </div>
                      </div>

                      <div className="flex min-h-0 flex-col border-t border-borderLight/90 p-5 sm:p-6 md:p-8 lg:border-l lg:border-t-0 lg:border-borderLight/90">
                        <h3 className="sr-only">{event.title}</h3>
                        <div className="mt-4 grid gap-2 rounded-xl border border-borderLight bg-[#fafafa] p-3 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-4 sm:p-4">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                            <span className="inline-flex items-center gap-1.5 text-[13px] font-[800] text-primary">
                              <CalendarClock className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                              {event.date}
                            </span>
                            <span className="hidden h-4 w-px bg-borderLight sm:inline-block" aria-hidden />
                            <span className="inline-flex min-w-0 items-start gap-1.5 text-[13px] font-[600] leading-snug text-secondary">
                              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                              {event.venue}
                            </span>
                          </div>
                        </div>
                        <p className="mt-5 text-[15px] leading-[1.7] text-secondary md:text-[16px] md:leading-[1.75]">
                          {event.value}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {event.tiers.map((tier, tierIdx) => (
                            <span
                              key={tier}
                              className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-[800] uppercase tracking-[0.08em] ${
                                tierIdx === 0
                                  ? "border-accent bg-accent text-[#0A0A0A] shadow-[0_2px_12px_rgba(229,194,34,0.35)]"
                                  : "border-borderLight bg-white text-secondary"
                              }`}
                            >
                              {tier}
                            </span>
                          ))}
                        </div>
                        <p className="mt-4 inline-flex items-center gap-2 border-l-[3px] border-accent pl-3 text-[13px] font-[800] text-primary">
                          {event.urgency}
                        </p>

                        <div className="mt-6 border-l-2 border-borderLight pl-4">
                          <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-secondary">
                            Track snapshot
                          </p>
                          <ul className="mt-3 space-y-2.5">
                            {previewDetails.map((item) => (
                              <li key={item} className="flex gap-3 text-[13px] leading-[1.55] text-secondary">
                                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                          <AnimatePresence initial={false}>
                            {openFeatured === idx && hasExtra ? (
                              <motion.div
                                key="extra"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.26, ease: "easeOut" }}
                                className="overflow-hidden"
                              >
                                <ul className="mt-3 space-y-2.5 border-t border-borderLight pt-3">
                                  {extraDetails.map((item) => (
                                    <li key={item} className="flex gap-3 text-[13px] leading-[1.55] text-secondary">
                                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                          {fineHover && hasExtra ? (
                            <p className="mt-3 hidden text-[12px] font-[700] text-secondary md:block">
                              Hover card for the full brief
                            </p>
                          ) : null}
                          {!fineHover && hasExtra ? (
                            <button
                              type="button"
                              onClick={() => setOpenFeatured((prev) => (prev === idx ? null : idx))}
                              className="mt-3 text-left text-[12px] font-[800] text-primary underline decoration-primary/35 underline-offset-[5px] md:hidden"
                            >
                              {openFeatured === idx ? "Hide full brief" : "Show full brief"}
                            </button>
                          ) : null}
                        </div>

                        <div className="mt-8 flex flex-col gap-2.5 border-t border-borderLight pt-6 sm:flex-row sm:flex-wrap sm:items-center">
                          <SwapArrowButton
                            href="/events"
                            compact
                            className="h-11 w-full justify-center rounded-full px-5 text-[13px] font-[800] uppercase tracking-[0.05em] sm:w-auto"
                            hoverTextClassName="hover:text-white"
                            hoverBgClassName="hover:bg-[#0A0A0A]"
                          >
                            Reserve ticket
                          </SwapArrowButton>
                          <SwapArrowButton
                            href="/events"
                            compact
                            className="h-11 w-full justify-center rounded-full border border-borderLight px-5 text-[13px] font-[800] uppercase tracking-[0.05em] sm:w-auto"
                            backgroundColor="#FFFFFF"
                            backgroundHoverColor="#0A0A0A"
                            textColor="#0A0A0A"
                            textHoverColor="#FFFFFF"
                            fillColor="rgba(10,10,10,0.08)"
                            iconColor="#0A0A0A"
                            iconHoverFill="rgba(255,255,255,0.18)"
                          >
                            View agenda
                          </SwapArrowButton>
                          {fineHover || !hasExtra ? null : (
                            <button
                              type="button"
                              onClick={() => setOpenFeatured((prev) => (prev === idx ? null : idx))}
                              className="inline-flex h-11 w-full items-center justify-center rounded-full border border-dashed border-borderLight px-4 text-[13px] font-[700] text-secondary transition-colors hover:border-accent hover:text-primary sm:w-auto"
                            >
                              {openFeatured === idx ? "Hide full brief" : "Show full brief"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </FadeUp>
              );
            })}
          </div>

          <div className="mt-12 md:hidden">
            <SwapArrowButton
              href="/events"
              compact
              className="h-12 w-full justify-center rounded-full text-[14px] font-[800] uppercase tracking-[0.06em]"
              hoverTextClassName="hover:text-white"
              hoverBgClassName="hover:bg-[#0A0A0A]"
            >
              View all events
            </SwapArrowButton>
          </div>
        </div>
      </section>

      <section id="ticket-tiers" className="page mx-auto max-w-[1440px] py-14 border-t border-borderLight/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-5">
            <FadeUp>
              <p className="inline-flex w-fit rounded-full border border-accent/60 bg-accent/10 px-4 py-1 text-[11px] font-[800] uppercase tracking-[0.1em]">
                Passes and pricing
              </p>
              <h3 className="mt-4 text-h2 text-primary">
                Choose your Youth+ Summit 2026 pass before this batch closes.
              </h3>
              <p className="mt-4 text-lead max-w-[52ch]">
                Transparent tiers, clear value, and instant confirmation after checkout.
              </p>
            </FadeUp>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
            {TICKET_TIERS.map((tier, idx) => (
              <FadeUp key={tier.name} delayMs={idx * 70}>
                {(() => {
                  const priceParts = splitPrice(tier.price);
                  return (
                <motion.article
                  onMouseEnter={() => setHoverTier(idx)}
                  onMouseLeave={() => setHoverTier((prev) => (prev === idx ? null : prev))}
                  className={`relative overflow-hidden rounded-md border p-4 md:p-5 bg-white shadow-[0_6px_24px_rgba(10,10,10,0.04)] min-h-[260px] ${
                    tier.active ? "border-accent" : "border-borderLight"
                  }`}
                  whileHover={{ y: -6, boxShadow: "0 18px 42px rgba(10,10,10,0.12)" }}
                  transition={{ type: "spring", stiffness: 210, damping: 24 }}
                >
                  {(() => {
                    const isRevealed = hoverTier === idx;
                    const useLightText = isRevealed;
                    const textClass = useLightText ? "text-white" : "text-black";
                    const seatsBoxClass = useLightText
                      ? "border-white/35 bg-black/20"
                      : "border-borderLight bg-[#FAFAFA]";
                    const seatsLabelClass = useLightText ? "text-white/80" : "text-secondary";

                    return (
                      <div className="relative z-10 flex h-full flex-col justify-between">
                        <div className="flex items-center justify-between gap-3">
                          <p className={`text-[13px] font-[900] uppercase tracking-[0.08em] ${textClass}`}>{tier.name}</p>
                          {tier.active ? (
                            <span
                              className={`rounded-full border px-2.5 py-1 text-[10px] font-[800] uppercase tracking-[0.08em] transition-colors ${
                                useLightText
                                  ? "border-white/45 bg-white/12 text-white"
                                  : "border-accent/60 bg-accent/10 text-[#0A0A0A]"
                              }`}
                            >
                              Best value
                            </span>
                          ) : null}
                        </div>

                        <div className={`mt-4 leading-none ${textClass}`}>
                          <p className="text-[14px] font-[900] uppercase tracking-[0.1em]">{priceParts.currency}</p>
                          <p className="mt-1 text-[52px] font-[900] tracking-[-0.05em] break-words">{priceParts.amount}</p>
                        </div>

                        <p className={`mt-2 text-[13px] ${textClass}`}>{tier.note}</p>

                        <div className={`mt-4 rounded-lg border px-3 py-2 ${seatsBoxClass}`}>
                          <p className={`text-[10px] font-[800] uppercase tracking-[0.08em] ${seatsLabelClass}`}>
                            Seats left
                          </p>
                          <p className={`mt-1 text-[22px] font-[900] leading-none tracking-[-0.03em] ${textClass}`}>
                            {tier.seatsLeft}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                  <motion.div
                    className="absolute inset-0 z-[1]"
                    animate={{ opacity: hoverTier === idx ? 1 : 0 }}
                    transition={{ duration: 0.26, ease: "easeOut" }}
                  >
                    <Image
                      src={tier.image}
                      alt={`${tier.name} ticket tier visual`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0A0A0A]/68" />
                  </motion.div>
                </motion.article>
                  );
                })()}
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
              className="border-l-2 border-borderLight pl-5 md:pl-7"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {AGENDA_TEASER.map((slot, rowIdx) => (
                <motion.div
                  key={slot.time}
                  variants={staggerItem}
                  className={`grid grid-cols-[minmax(0,4.5rem)_1fr] gap-x-4 gap-y-1 py-5 md:grid-cols-[5.5rem_1fr] md:gap-x-6 md:py-6 ${
                    rowIdx < AGENDA_TEASER.length - 1 ? "border-b border-borderLight" : ""
                  }`}
                >
                  <div className="text-[15px] font-[900] tabular-nums text-accent md:text-[17px]">{slot.time}</div>
                  <div>
                    <div className="text-[17px] font-[800] leading-snug text-primary md:text-[19px]">{slot.title}</div>
                    <div className="mt-1.5 text-[14px] leading-relaxed text-secondary md:text-[15px]">{slot.detail}</div>
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
