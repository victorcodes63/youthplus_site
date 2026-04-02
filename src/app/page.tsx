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
import { useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";
import { HeroHeading } from "@/components/home/HeroHeading";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";
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
      <div className="text-accent text-[42px] md:text-[64px] leading-[0.9] tracking-[-0.03em] font-[900]">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-secondary text-[13px] font-[700] tracking-[0.02em]">
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 1], [0.62, 0.76]);
  const reduceMotion = useReducedMotion();
  const [openFeatured, setOpenFeatured] = useState<number | null>(null);
  const [hoverTier, setHoverTier] = useState<number | null>(null);
  const fineHover = usePrefersFineHover();
  const { dismissed: mobileTicketCtaDismissed, dismiss: dismissMobileTicketCta } = useMobileTicketCta();

  const heroBackdropEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const heroEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const heroColumnsOrchestra = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 0.22,
      },
    },
  };

  const heroLeftOrchestra = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.088,
        delayChildren: 0,
      },
    },
  };

  const heroEnterBadge = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 14,
      scale: reduceMotion ? 1 : 0.94,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.58,
        ease: heroEase,
      },
    },
  };

  const heroEnterLine = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 22,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.72,
        ease: heroEase,
      },
    },
  };

  const heroEnterBody = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 20,
      filter: reduceMotion ? "blur(0px)" : "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: reduceMotion ? 0 : 0.88,
        ease: heroEase,
      },
    },
  };

  const heroEnterCta = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 26,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 300, damping: 26, mass: 0.95 },
    },
  };

  const heroPartnerOrchestra = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: 0,
      },
    },
  };

  return (
    <main
      className={`${mobileTicketCtaDismissed ? "pb-0" : "pb-24"} md:pb-0 transition-[padding] duration-200`}
    >
      {/* Hero (full-bleed image, single clean text reveal). */}
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
            initial={reduceMotion ? false : { opacity: 0, scale: 1.09 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 1.18,
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
            duration: reduceMotion ? 0 : 1.35,
            delay: reduceMotion ? 0 : 0.06,
            ease: heroBackdropEase,
          }}
          style={{
            background:
              "radial-gradient(circle at 18% 22%, rgba(229,194,34,0.16) 0%, transparent 36%), radial-gradient(circle at 82% 78%, rgba(229,194,34,0.1) 0%, transparent 40%)",
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
                className="inline-flex items-center gap-3 rounded-md border border-accent/85 bg-black/30 px-3.5 py-1.5 text-accent text-[11px] font-[800] tracking-[0.12em] uppercase"
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
                className="mt-6 text-[16px] md:text-[18px] 2xl:text-[20px] leading-[1.55] text-white/85 max-w-[62ch]"
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
                  className="h-12 min-w-0 flex-1 basis-0 rounded-md font-[900] text-[13px] sm:text-[15px] md:flex-none md:basis-auto md:px-4"
                >
                  Tickets
                </SwapArrowButton>
                <Link
                  href="/events"
                  className="inline-flex min-w-0 flex-1 basis-0 items-center justify-center h-12 px-3 sm:px-5 rounded-md border border-white/20 bg-white/5 text-white text-[13px] sm:text-[15px] font-[800] hover:border-accent hover:text-accent transition-colors text-center leading-snug md:inline-flex md:flex-none md:basis-auto md:w-auto"
                >
                  Pass Types
                </Link>
              </motion.div>

              <motion.div
                variants={heroEnterLine}
                className="mt-7 hidden md:flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] 2xl:text-[14px] text-white/80"
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
                className="text-white/60 text-[11px] uppercase tracking-[0.24em] font-[800]"
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

      {/* Summit snapshot section (inspired by ATS structure). */}
      <section id="summit-snapshot" className="bg-white text-[#0A0A0A]">
        <div className="page mx-auto max-w-[1440px] py-14 md:py-20 min-w-0 w-full box-border">
          {/* Single column on small screens — 12-col + gap can exceed viewport width and clip copy (html overflow-x: clip). */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center min-w-0 w-full">
            <div className="lg:col-span-7 order-2 lg:order-1 min-w-0 max-w-full w-full">
              <motion.div
                className="relative h-[248px] sm:h-[280px] md:h-[320px] w-full max-w-full min-w-0 overflow-hidden"
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
              <FadeUp className="min-w-0 max-w-full w-full">
                <h2 className="text-[38px] md:text-[54px] leading-[0.95] tracking-[-0.04em] font-[900] break-words">
                  The Leading
                  <br />
                  African Youth
                  <br />
                  Innovation Summit
                </h2>
                <p className="mt-6 w-full text-secondary text-[15px] leading-[1.7] break-words [word-break:break-word] hyphens-auto">
                  {
                    "For builders, founders, investors, and ecosystem partners shaping what comes next across Africa."
                  }
                </p>
                <div className="mt-8 min-w-0 max-w-full">
                  <SwapArrowButton
                    href="/events"
                    className="h-11 px-5 text-[14px] font-[800] rounded-md"
                    hoverTextClassName="hover:text-white"
                    hoverBgClassName="hover:bg-[#0A0A0A]"
                  >
                    What to expect
                  </SwapArrowButton>
                </div>
              </FadeUp>
            </div>
          </div>

          <div className="mt-10 md:mt-12 border-t border-borderLight pt-8">
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
          </div>
        </div>
      </section>

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
            className="object-cover object-[center_28%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/88 via-[#0A0A0A]/72 to-[#0A0A0A]/84" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(229,194,34,0.08),transparent_40%)]" />
        <div className="relative page mx-auto max-w-[1440px] py-16 md:py-20">
          <div className="grid grid-cols-12 gap-8 lg:gap-10 items-start lg:items-center">
            <div className="col-span-12 lg:col-span-8">
              <FadeUp>
                <div className="inline-flex items-center rounded-md border border-accent/75 bg-black/25 px-3.5 py-1.5 text-accent text-[11px] font-[800] tracking-[0.12em] uppercase">
                  Editorial sessions
                </div>
                <h3 className="mt-5 text-white font-[900] tracking-[-0.04em] text-[30px] md:text-[48px] leading-[1.03] max-w-[14ch]">
                  Build with clarity. Pitch with confidence.
                </h3>
                <p className="mt-5 text-white text-[15px] md:text-[17px] leading-[1.72] max-w-[56ch] [text-shadow:0_1px_12px_rgba(10,10,10,0.55)]">
                  Short formats, strong facilitation, and outcomes you can measure.
                  Bring your idea; leave with a plan.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md border border-white/20 bg-black/25 px-3 py-1.5 text-[12px] font-[700] text-white/85">
                    Practical keynotes
                  </span>
                  <span className="inline-flex items-center rounded-md border border-white/20 bg-black/25 px-3 py-1.5 text-[12px] font-[700] text-white/85">
                    Builder workshops
                  </span>
                  <span className="inline-flex items-center rounded-md border border-white/20 bg-black/25 px-3 py-1.5 text-[12px] font-[700] text-white/85">
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
              <div className="text-[12px] font-[700] tracking-[0.12em] uppercase text-secondary">
                Featured events
              </div>
              <h2 className="mt-4 text-[28px] md:text-[34px] leading-[1.1] tracking-[-0.04em] font-[800] text-primary">
                Choose your track. Reserve your seat.
              </h2>
            </div>
          </FadeUp>
          <div className="hidden md:block">
            <Link
              href="/events"
              className="text-[14px] font-[700] text-primary inline-flex items-center gap-2 hover:underline underline-offset-4"
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
                    <h3 className="text-[22px] sm:text-[24px] md:text-[28px] leading-[1.08] font-[900] tracking-[-0.03em] text-primary">
                      {event.title}
                    </h3>
                    <div className="mt-2.5 text-[12px] sm:text-[13px] font-[700] text-secondary">{event.meta}</div>
                    <div className="mt-3 flex flex-col gap-1 rounded-md border border-borderLight/80 bg-[#fafafa] px-3 py-2.5 sm:flex-row sm:items-center sm:gap-3 sm:border-0 sm:bg-transparent sm:p-0">
                      <div className="text-[13px] font-[800] text-primary">{event.date}</div>
                      <span className="hidden h-3 w-px bg-borderLight sm:block" aria-hidden="true" />
                      <div className="text-[13px] font-[700] text-secondary leading-snug">{event.venue}</div>
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
                        className="h-12 w-full justify-center px-4 rounded-md text-[14px] font-[800] sm:h-[42px] sm:w-auto"
                        hoverTextClassName="hover:text-white"
                        hoverBgClassName="hover:bg-[#0A0A0A]"
                      >
                        Reserve ticket
                      </SwapArrowButton>
                      <Link
                        href="/events"
                        className="inline-flex h-12 w-full sm:h-[42px] sm:w-auto items-center justify-center rounded-md border border-borderLight px-4 text-[14px] font-[800] text-primary hover:border-accent transition-colors"
                      >
                        View agenda
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpenFeatured((prev) => (prev === idx ? null : idx))}
                        className={`inline-flex h-12 w-full sm:h-[42px] sm:w-auto items-center justify-center rounded-md border border-borderLight bg-white px-4 text-[13px] font-[800] text-primary/90 hover:border-accent transition-colors ${
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
              <div className="text-[12px] font-[700] tracking-[0.12em] uppercase text-secondary">
                Ticket tiers
              </div>
              <h3 className="mt-4 text-[28px] md:text-[34px] leading-[1.08] tracking-[-0.04em] font-[900] text-primary">
                Pick your pass before this batch closes.
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-secondary max-w-[52ch]">
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
                          className={`text-[12px] font-[800] uppercase tracking-[0.1em] ${
                            useLightText ? "text-white" : "text-black"
                          }`}
                        >
                          {tier.name}
                        </div>
                        <div>
                          <div
                            className={`mt-2 text-[28px] leading-none tracking-[-0.03em] font-[900] ${
                              useLightText ? "text-white" : "text-black"
                            }`}
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
              <div className="text-[12px] font-[700] tracking-[0.12em] uppercase text-secondary">
                Agenda teaser
              </div>
              <h3 className="mt-4 text-[28px] md:text-[34px] leading-[1.08] tracking-[-0.04em] font-[900] text-primary">
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
                  <div className="text-[18px] font-[900] tracking-[-0.02em] text-accent">{slot.time}</div>
                  <div>
                    <div className="text-[17px] font-[800] text-primary tracking-[-0.01em]">{slot.title}</div>
                    <div className="mt-1 text-[14px] text-secondary">{slot.detail}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="buyer-faqs" className="page mx-auto max-w-[1440px] py-14 border-t border-borderLight/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-6">
            <FadeUp>
              <div className="text-[12px] font-[700] tracking-[0.12em] uppercase text-secondary">
                Buy with confidence
              </div>
              <h3 className="mt-4 text-[28px] md:text-[34px] leading-[1.08] tracking-[-0.04em] font-[900] text-primary">
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
                    className="flex items-start gap-3 text-[14px] text-secondary"
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
                <div className="text-[13px] font-[800] uppercase tracking-[0.08em] text-accent">Common buyer FAQs</div>
                <div className="mt-4 space-y-4 text-[14px] text-secondary">
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
