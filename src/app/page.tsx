"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";
import { HeroHeading } from "@/components/home/HeroHeading";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";
import { SpeakersCarousel } from "@/components/home/SpeakersCarousel";
import { WhyUsStory } from "@/components/home/WhyUsStory";

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
  const [openFeatured, setOpenFeatured] = useState<number | null>(null);
  const [hoverTier, setHoverTier] = useState<number | null>(null);

  return (
    <main className="pb-24 md:pb-0">
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
          <Image
            src={HERO_IMAGE}
            alt="Women panel discussion at Youth+ Africa summit"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-[#0A0A0A]"
          style={{ opacity: heroOverlayOpacity }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 22%, rgba(229,194,34,0.16) 0%, transparent 36%), radial-gradient(circle at 82% 78%, rgba(229,194,34,0.1) 0%, transparent 40%)",
          }}
        />

        <motion.div
          className="relative page mx-auto max-w-[1440px] min-h-[calc(100vh-84px)] py-12 md:py-14 xl:py-16 flex items-center"
          style={{ y: heroContentY }}
        >
          <div className="w-full grid grid-cols-12 gap-y-10 lg:gap-x-10 items-end">
            <div className="col-span-12 xl:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px 0px -50px 0px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="inline-flex items-center gap-3 rounded-md border border-accent/85 bg-black/30 px-3.5 py-1.5 text-accent text-[11px] font-[800] tracking-[0.12em] uppercase"
              >
                Youth+ Africa Festival 2026 · Tickets Live
              </motion.div>

              <div className="mt-5">
                <HeroHeading>
                  Where Africa&apos;s Next Generation Ignites
                </HeroHeading>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px 0px -50px 0px" }}
                transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
                className="mt-6 text-[16px] md:text-[18px] 2xl:text-[20px] leading-[1.55] text-white/85 max-w-[62ch]"
              >
                Join founders, operators, investors, and builders driving the next
                decade of African innovation. Secure your ticket now while this
                release window is still open.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px 0px -50px 0px" }}
                transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
                className="mt-9 flex flex-col sm:flex-row gap-3 sm:items-center"
              >
                <SwapArrowButton
                  href="/events"
                  className="h-[52px] px-6 rounded-md font-[900] text-[15px]"
                >
                  Buy Tickets Now
                </SwapArrowButton>
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center h-[52px] px-6 rounded-md border border-white/20 bg-white/5 text-white text-[15px] font-[800] hover:border-accent hover:text-accent transition-colors"
                >
                  View Pass Types
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px 0px -50px 0px" }}
                transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
                className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] 2xl:text-[14px] text-white/80"
              >
                <span>Instant checkout</span>
                <span>•</span>
                <span>Secure payment</span>
                <span>•</span>
                <span>QR ticket delivered by email</span>
              </motion.div>
            </div>

            <div id="partners-strip" className="col-span-12 xl:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px 0px -50px 0px" }}
                transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
                className="max-w-[560px] xl:ml-auto"
              >
                <div className="text-white/60 text-[11px] uppercase tracking-[0.24em] font-[800]">
                  Partners
                </div>
                <div className="mt-6 overflow-hidden max-w-[516px]">
                  <motion.div
                    className="flex gap-3"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 18, ease: "linear", repeat: Infinity }}
                  >
                    {[
                      { src: "/logos/redbull_logo.svg", alt: "Red Bull logo" },
                      { src: "/logos/fxpesa_logo.svg", alt: "FXPesa logo" },
                      { src: "/logos/british_council_logo.webp", alt: "British Council logo" },
                      { src: "/logos/kenya_airways.jpg", alt: "Kenya Airways logo" },
                      { src: "/logos/equity.png", alt: "Equity logo" },
                      { src: "/logos/microsoft.jpg", alt: "Microsoft logo" },
                      { src: "/logos/safaricom.jpeg", alt: "Safaricom logo" },
                      { src: "/logos/redbull_logo.svg", alt: "Red Bull logo duplicate" },
                      { src: "/logos/fxpesa_logo.svg", alt: "FXPesa logo duplicate" },
                      { src: "/logos/british_council_logo.webp", alt: "British Council logo duplicate" },
                      { src: "/logos/kenya_airways.jpg", alt: "Kenya Airways logo duplicate" },
                      { src: "/logos/equity.png", alt: "Equity logo duplicate" },
                      { src: "/logos/microsoft.jpg", alt: "Microsoft logo duplicate" },
                      { src: "/logos/safaricom.jpeg", alt: "Safaricom logo duplicate" },
                    ].map((logo, i) => (
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
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Summit snapshot section (inspired by ATS structure). */}
      <section id="summit-snapshot" className="bg-white text-[#0A0A0A]">
        <div className="page mx-auto max-w-[1440px] py-14 md:py-20">
          <div className="grid grid-cols-12 gap-10 items-center">
            <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
              <FadeUp>
                <div className="relative h-[280px] md:h-[320px]">
                  <div className="absolute z-20 left-0 top-0 h-[240px] w-[240px] md:h-[280px] md:w-[280px] rounded-[90px] overflow-hidden border border-borderLight">
                    <Image
                      src={SUMMIT_IMAGE}
                      alt="Speaker on stage"
                      fill
                      className="object-cover object-[center_24%]"
                      sizes="280px"
                    />
                  </div>
                  <div
                    className="absolute z-0 pointer-events-none left-[160px] md:left-[220px] top-0 h-[140px] w-[140px] md:h-[160px] md:w-[160px] rounded-t-[80px] rounded-b-[18px]"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(10,10,10,0.92) 1.1px, transparent 1.1px), radial-gradient(rgba(229,194,34,0.95) 1.1px, transparent 1.1px)",
                      backgroundSize: "8px 8px",
                      backgroundPosition: "0 0, 4px 4px",
                    }}
                  />
                  <div className="absolute z-20 left-[170px] md:left-[235px] top-[125px] md:top-[140px] h-[140px] w-[140px] md:h-[160px] md:w-[160px] rounded-b-[80px] rounded-t-[18px] overflow-hidden border border-borderLight">
                    <Image
                      src={SUMMIT_IMAGE_ALT}
                      alt="Audience at summit"
                      fill
                      className="object-cover object-[72%_38%]"
                      sizes="160px"
                    />
                  </div>
                </div>
              </FadeUp>
            </div>

            <div className="col-span-12 lg:col-span-5 order-1 lg:order-2">
              <FadeUp>
                <h2 className="text-[38px] md:text-[54px] leading-[0.95] tracking-[-0.04em] font-[900]">
                  The Leading
                  <br />
                  African Youth
                  <br />
                  Innovation Summit
                </h2>
                <p className="mt-6 text-secondary text-[15px] leading-[1.7] max-w-[48ch]">
                  For builders, founders, investors, and ecosystem partners
                  shaping what comes next across Africa.
                </p>
                <div className="mt-8">
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
        <div className="absolute inset-0">
          <Image
            src={EDITORIAL_IMAGE}
            alt="Speaker at a youth conference"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_28%]"
          />
        </div>
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

      {/* Featured events */}
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
                className={`overflow-hidden border border-borderLight rounded-md bg-white shadow-[0_10px_30px_rgba(10,10,10,0.06)] ${
                  idx % 2 === 0 ? "md:mr-10" : "md:ml-10"
                }`}
                onMouseEnter={() => setOpenFeatured(idx)}
                onMouseLeave={() => setOpenFeatured((prev) => (prev === idx ? null : prev))}
                initial={{ opacity: 0, y: 22, scale: 0.992 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -6, scale: 1.005, boxShadow: "0 20px 52px rgba(10,10,10,0.12)" }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 ${
                    idx % 2 === 1 ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
                  }`}
                >
                  <div className="relative h-[220px] md:h-[260px] lg:h-full lg:col-span-5 overflow-hidden">
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

                  <div className="lg:col-span-7 p-5 md:p-6">
                    <h3 className="text-[24px] md:text-[28px] leading-[1.05] font-[900] tracking-[-0.03em] text-primary">
                      {event.title}
                    </h3>
                    <div className="mt-3 text-[13px] font-[700] text-secondary">{event.meta}</div>
                    <div className="mt-1.5 text-[13px] font-[700] text-primary">{event.date}</div>
                    <div className="mt-1 text-[13px] font-[700] text-secondary">{event.venue}</div>
                    <p className="mt-3 text-[14px] md:text-[15px] leading-[1.65] text-secondary max-w-[64ch]">
                      {event.value}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {event.tiers.map((tier, tierIdx) => (
                        <span
                          key={tier}
                          className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-[800] uppercase tracking-[0.08em] ${
                            tierIdx === 0
                              ? "border-accent bg-accent/10 text-[#0A0A0A]"
                              : "border-borderLight text-secondary"
                          }`}
                        >
                          {tier}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 text-[13px] font-[800] text-[#0A0A0A]">
                      {event.urgency}
                    </div>

                    <motion.div
                      className="mt-4 inline-flex items-center gap-2 text-[13px] font-[800] text-primary/90"
                      animate={{ x: openFeatured === idx ? 2 : 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      Hover or tap to reveal more
                      <motion.span
                        aria-hidden="true"
                        animate={{ rotate: openFeatured === idx ? 45 : 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                      >
                        +
                      </motion.span>
                    </motion.div>

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

                    <div className="mt-5 flex flex-wrap gap-3 items-center">
                      <SwapArrowButton
                        href="/events"
                        className="h-[42px] px-4 rounded-md text-[14px] font-[800]"
                        hoverTextClassName="hover:text-white"
                        hoverBgClassName="hover:bg-[#0A0A0A]"
                      >
                        Reserve ticket
                      </SwapArrowButton>
                      <Link
                        href="/events"
                        className="inline-flex h-[42px] items-center justify-center rounded-md border border-borderLight px-4 text-[14px] font-[800] text-primary hover:border-accent transition-colors"
                      >
                        View agenda
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpenFeatured((prev) => (prev === idx ? null : idx))}
                        className="inline-flex h-[42px] items-center justify-center rounded-md border border-borderLight px-4 text-[13px] font-[800] text-primary/90 hover:border-accent transition-colors md:hidden"
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
            <div className="space-y-3">
              {AGENDA_TEASER.map((slot, idx) => (
                <FadeUp key={slot.time} delayMs={idx * 60}>
                  <div className="grid grid-cols-[74px_1fr] gap-4 rounded-md border border-borderLight bg-white p-4 md:p-5">
                    <div className="text-[18px] font-[900] tracking-[-0.02em] text-accent">{slot.time}</div>
                    <div>
                      <div className="text-[17px] font-[800] text-primary tracking-[-0.01em]">{slot.title}</div>
                      <div className="mt-1 text-[14px] text-secondary">{slot.detail}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
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
              <div className="mt-6 space-y-3">
                {[
                  "Instant QR ticket delivered by email after payment.",
                  "Secure payment support for M-Pesa and international cards.",
                  "Group and company ticketing available on request.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-[14px] text-secondary">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
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

      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <div className="rounded-md border border-black/10 bg-white/96 backdrop-blur px-3 py-3 shadow-[0_12px_30px_rgba(10,10,10,0.12)]">
          <SwapArrowButton
            href="/events"
            className="w-full h-11 px-4 rounded-md text-[14px] font-[900] justify-center"
            hoverTextClassName="hover:text-white"
            hoverBgClassName="hover:bg-[#0A0A0A]"
          >
            Get tickets now
          </SwapArrowButton>
        </div>
      </div>

    </main>
  );
}
