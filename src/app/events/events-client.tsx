"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { HeroHeading } from "@/components/home/HeroHeading";
import { FadeUp } from "@/components/motion/FadeUp";
import { ScrollJackSection } from "@/components/motion/ScrollJackSection";
import { StickyHeroSeam } from "@/components/motion/StickyHeroSeam";
import { useHeroEnterAnimations } from "@/components/motion/useHeroEnterAnimations";
import { BrandButton } from "@/components/ui/BrandButton";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { INSIGHT_HIGHLIGHTS } from "@/data/insights";

type EventSession = {
  channel: "IG Live" | "Webinar" | "On-site";
  title: string;
  date: string;
  poster?: string;
};

type MonthlyTrack = {
  month: string;
  theme: string;
  sessions: EventSession[];
};

const monthlyTracks: MonthlyTrack[] = [
  {
    month: "January",
    theme: "Goal Setting & Vision 2026",
    sessions: [
      { channel: "IG Live", title: "Reset & Realign", date: "Jan 06, 2026" },
      {
        channel: "Webinar",
        title: "BLUEPRINT: Turning Vision into an Action Plan",
        date: "Jan 13, 2026",
        poster: "https://www.youthplusafrica.com/images/blueprint.png",
      },
      {
        channel: "On-site",
        title: "Visioning Workshop",
        date: "Jan 23, 2026",
        poster: "https://www.youthplusafrica.com/images/visioning_poster.png",
      },
    ],
  },
  {
    month: "February",
    theme: "AI x Creativity x Human Potential",
    sessions: [
      {
        channel: "IG Live",
        title: "AI for Everyday Life",
        date: "Feb 03, 2026",
        poster: "https://www.youthplusafrica.com/images/ai_for_everyday_life.jpg",
      },
      {
        channel: "Webinar",
        title: "State of Women in AI",
        date: "Feb 10, 2026 & Feb 17, 2026",
        poster: "https://www.youthplusafrica.com/images/state_of_women_ai_1.jpg",
      },
      {
        channel: "On-site",
        title: "The Future of Work",
        date: "Feb 27, 2026",
        poster: "https://www.youthplusafrica.com/images/future_of_work.jpg",
      },
    ],
  },
  {
    month: "March",
    theme: "Women's Month",
    sessions: [
      { channel: "IG Live", title: "Women Shaping Their Stories", date: "Mar 03, 2026" },
      { channel: "Webinar", title: "Leadership & Economic Empowerment", date: "Mar 10, 2026" },
      { channel: "Webinar", title: "Give to Gain Webinar Series", date: "Mar 24, 2026" },
    ],
  },
  {
    month: "April",
    theme: "Wellness & Self-Leadership",
    sessions: [
      { channel: "IG Live", title: "Navigating Pressure as Gen Z", date: "Apr 07, 2026" },
      { channel: "Webinar", title: "Nervous System 101", date: "Apr 14, 2026" },
      { channel: "On-site", title: "Mindset & Balance Retreat", date: "Apr 24, 2026" },
    ],
  },
  {
    month: "May",
    theme: "Climate & Sustainability",
    sessions: [
      { channel: "IG Live", title: "Climate Reality", date: "May 05, 2026" },
      { channel: "Webinar", title: "Green Skills & Jobs", date: "May 12, 2026" },
      { channel: "On-site", title: "Eco Futures Expo", date: "May 29, 2026" },
    ],
  },
  {
    month: "June",
    theme: "Taxation & Money",
    sessions: [
      { channel: "IG Live", title: "Taxation 101", date: "Jun 02, 2026" },
      { channel: "Webinar", title: "Side-Hustle Economy", date: "Jun 09, 2026" },
      { channel: "On-site", title: "Money Map Summit", date: "Jun 26, 2026" },
    ],
  },
  {
    month: "July",
    theme: "Dear Money Month",
    sessions: [
      { channel: "IG Live", title: "Your Money Story", date: "Jul 07, 2026" },
      { channel: "Webinar", title: "Money Psychology", date: "Jul 14, 2026" },
      { channel: "On-site", title: "Dear Money Experience", date: "Jul 31, 2026" },
    ],
  },
  {
    month: "August",
    theme: "Tech, Innovation & Digital Skills",
    sessions: [
      { channel: "IG Live", title: "Digital Skills That Pay", date: "Aug 04, 2026" },
      { channel: "Webinar", title: "Innovation for Beginners", date: "Aug 11, 2026" },
      { channel: "On-site", title: "Tech Future Fair", date: "Aug 28, 2026" },
    ],
  },
  {
    month: "September",
    theme: "Career & Workplace Readiness",
    sessions: [
      { channel: "IG Live", title: "Career Pivoting", date: "Sep 01, 2026" },
      { channel: "Webinar", title: "Gen Z Workplace Culture", date: "Sep 08, 2026" },
      { channel: "On-site", title: "CareerConnect Expo", date: "Sep 25, 2026" },
    ],
  },
  {
    month: "October",
    theme: "Entrepreneurship Month",
    sessions: [
      { channel: "IG Live", title: "Idea to Income", date: "Oct 06, 2026" },
      { channel: "Webinar", title: "Funding 101", date: "Oct 13, 2026" },
      { channel: "On-site", title: "StartUp Connect", date: "Oct 30, 2026" },
    ],
  },
  {
    month: "November",
    theme: "Lifestyle & Wellness",
    sessions: [
      { channel: "IG Live", title: "Lifestyle Design", date: "Nov 03, 2026" },
      { channel: "Webinar", title: "Burnout & Boundaries", date: "Nov 10, 2026" },
      { channel: "On-site", title: "Wellness Day Experience", date: "Nov 27, 2026" },
    ],
  },
  {
    month: "December",
    theme: "Reflection & Celebration",
    sessions: [
      { channel: "IG Live", title: "2026 Wrapped", date: "Dec 01, 2026" },
      { channel: "Webinar", title: "Planning for 2027", date: "Dec 08, 2026" },
      { channel: "On-site", title: "Community Party", date: "Dec 25, 2026" },
    ],
  },
];

type FeaturedExperience = {
  month: string;
  title: string;
  date: string;
  channel: EventSession["channel"];
  priceFrom: string;
  seatsLeft: number;
  value: string;
  image: string;
};

const featuredExperiences: FeaturedExperience[] = [
  {
    month: "February",
    title: "The Future of Work",
    date: "Feb 27, 2026",
    channel: "On-site",
    priceFrom: "KES 7,500",
    seatsLeft: 88,
    value: "A high-energy in-person room on AI, careers, and practical transitions for the next decade of work.",
    image: "https://www.youthplusafrica.com/images/future_of_work.jpg",
  },
  {
    month: "March",
    title: "Leadership & Economic Empowerment",
    date: "Mar 10, 2026",
    channel: "Webinar",
    priceFrom: "KES 2,500",
    seatsLeft: 124,
    value: "A tactical leadership masterclass for women building businesses, teams, and institutions with confidence.",
    image: "https://www.youthplusafrica.com/images/state_of_women_ai_2.jpg",
  },
  {
    month: "July",
    title: "Dear Money Experience",
    date: "Jul 31, 2026",
    channel: "On-site",
    priceFrom: "KES 5,000",
    seatsLeft: 64,
    value: "An immersive live experience designed to transform money mindset, planning behavior, and execution discipline.",
    image: "https://www.youthplusafrica.com/images/wealth-bp.jpeg",
  },
];

const premiumPasses = [
  {
    name: "Early Bird",
    price: "KES 7,500",
    note: "Best value • Limited release",
    seatsLeft: 127,
    featured: true,
    image: "https://plus.unsplash.com/premium_photo-1726848094123-b69f8c83b824?auto=format&fit=crop&w=1200&q=80",
    textTone: "light" as const,
  },
  {
    name: "Standard",
    price: "KES 12,000",
    note: "Core summit access",
    seatsLeft: 318,
    featured: false,
    image: "https://images.unsplash.com/photo-1767884161189-ed2f04d87550?auto=format&fit=crop&w=1200&q=80",
    textTone: "dark" as const,
  },
  {
    name: "VIP",
    price: "KES 22,000",
    note: "Priority seating + private networking",
    seatsLeft: 82,
    featured: false,
    image: "https://images.unsplash.com/photo-1773730356782-e3044e73cf6f?auto=format&fit=crop&w=1200&q=80",
    textTone: "light" as const,
  },
];

const socialProofStats = [
  { value: "4.8/5", label: "Average experience rating" },
  { value: "24+", label: "Partners and collaborators" },
  { value: "12", label: "African cities represented" },
  { value: "1.2k+", label: "Youth+ community attendees" },
];

const channelPillClasses: Record<EventSession["channel"], string> = {
  "IG Live": "bg-[#5A189A]/10 text-[#5A189A] border-[#5A189A]/30",
  Webinar: "bg-[#0A0A0A]/5 text-[#0A0A0A] border-[#0A0A0A]/15",
  "On-site": "bg-[#E5C222]/20 text-[#0A0A0A] border-[#E5C222]/50",
};

const monthPosterFallback: Record<string, string> = {
  January: "https://www.youthplusafrica.com/images/visioning_poster.png",
  February: "https://www.youthplusafrica.com/images/ai_for_everyday_life.jpg",
  March: "https://www.youthplusafrica.com/images/state_of_women_ai_2.jpg",
  April: "https://www.youthplusafrica.com/images/events-bg.jpg",
  May: "https://www.youthplusafrica.com/images/events-bg.jpg",
  June: "https://www.youthplusafrica.com/images/connect-fxpesa.jpeg",
  July: "https://www.youthplusafrica.com/images/wealth-bp.jpeg",
  August: "https://www.youthplusafrica.com/images/currency-exchange.jpeg",
  September: "https://www.youthplusafrica.com/images/connect-fxpesa.jpeg",
  October: "https://www.youthplusafrica.com/images/currency-exchange.jpeg",
  November: "https://www.youthplusafrica.com/images/events-bg.jpg",
  December: "https://www.youthplusafrica.com/images/visioning_poster.png",
};

const ABOUT_EDITORIAL_STRIP_IMAGE = "/images/about-editorial-strip.png";
const eventImagery = [
  {
    src: "/images/event-energy-workshop.png",
    alt: "African founders collaborating during a strategy workshop in Nairobi",
    caption: "Builder workshops that turn ideas into execution plans.",
    title: "Operator Workshops",
  },
  {
    src: "/images/event-energy-panel.png",
    alt: "Panel discussion at an African innovation event",
    caption: "Conversations with operators, investors, and policy voices.",
    title: "Panel Conversations",
  },
  {
    src: "/images/event-energy-networking.png",
    alt: "Community event participants networking in Africa",
    caption: "Cross-country connections that compound opportunity.",
    title: "Ecosystem Networking",
  },
];

function parseSessionDate(rawDate: string): Date | null {
  const candidate = rawDate.split("&")[0].split("and")[0]?.trim();
  if (!candidate) return null;
  const parsed = new Date(candidate);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function splitPrice(price: string) {
  const [currency = "", ...rest] = price.trim().split(" ");
  return {
    currency: currency || "KES",
    amount: rest.join(" ") || price,
  };
}

export function EventsClient() {
  const [activePosterKey, setActivePosterKey] = useState<string | null>(null);
  const [hoverPass, setHoverPass] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const { heroBackdropEase, heroEnterBadge, heroEnterBody, heroEnterCta, heroEnterLine, heroLeftOrchestra, reduceMotion } =
    useHeroEnterAnimations();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  let activeEvent: {
    key: string;
    month: string;
    theme: string;
    title: string;
    date: string;
    channel: EventSession["channel"];
    poster: string;
  } | null = null;

  if (activePosterKey) {
    for (const track of monthlyTracks) {
      for (const session of track.sessions) {
        const key = `${track.month}-${session.title}`;
        if (key === activePosterKey) {
          activeEvent = {
            key,
            month: track.month,
            theme: track.theme,
            title: session.title,
            date: session.date,
            channel: session.channel,
            poster: session.poster ?? monthPosterFallback[track.month],
          };
          break;
        }
      }
      if (activeEvent) break;
    }
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <main className="bg-white text-[#0A0A0A]">
      <StickyHeroSeam
        hero={
          <section
            ref={heroRef}
            className="relative -mt-[var(--site-header-height)] min-h-[100dvh] overflow-hidden bg-[#0A0A0A] pt-[var(--site-header-height)]"
          >
            <motion.div className="absolute inset-0" style={{ y: heroImageY, scale: heroImageScale }}>
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
                  src="https://www.youthplusafrica.com/images/events-bg.jpg"
                  alt="Youth+ Africa events crowd background"
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,rgba(10,10,10,0.86)_0%,rgba(10,10,10,0.72)_42%,rgba(10,10,10,0.84)_100%)]"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: reduceMotion ? 0 : 1.05,
                delay: reduceMotion ? 0 : 0.08,
                ease: heroBackdropEase,
              }}
            />
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_24%,rgba(229,194,34,0.16),transparent_42%),radial-gradient(circle_at_84%_78%,rgba(229,194,34,0.1),transparent_40%)]"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: reduceMotion ? 0 : 1.05,
                delay: reduceMotion ? 0 : 0.12,
                ease: heroBackdropEase,
              }}
            />

            <div className="page relative z-10 mx-auto flex min-h-[calc(100dvh_-_var(--site-header-height))] max-w-[1440px] items-center py-12 md:py-14 xl:py-16 text-white">
              <motion.div
                variants={heroLeftOrchestra}
                initial="hidden"
                animate="visible"
                className="w-full"
              >
            <motion.p
              variants={heroEnterBadge}
              className="inline-flex w-fit items-center rounded-full border border-accent/70 bg-black/25 px-4 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent"
            >
              Youth+ Summit 2026
            </motion.p>
            <HeroHeading
              className="mt-5 text-balance text-[40px] md:text-[62px] tracking-[-0.04em]"
              lines={["High-impact rooms for Africa's", "next generation of builders."]}
            />
            <motion.p variants={heroEnterBody} className="mt-5 max-w-[60ch] text-[15px] leading-[1.8] text-white/85 md:text-[17px]">
              Tickets on this page are for Youth+ Summit 2026. Explore a curated 12-month build-up calendar with
              livestreams, tactical webinars, and premium in-person activations.
            </motion.p>
            <motion.div variants={heroEnterCta} className="mt-8 flex flex-wrap items-center gap-3">
              <SwapArrowButton
                href="https://allaxs.vercel.app/events"
                compact
                className="h-12 min-w-[164px] rounded-md px-4 text-[13px] font-[900] uppercase tracking-[0.06em]"
                hoverTextClassName="hover:text-white"
                hoverBgClassName="hover:bg-[#0A0A0A]"
              >
                Get Summit Tickets
              </SwapArrowButton>
              <SwapArrowButton
                href="#monthly-tracks"
                compact
                smoothScroll
                className="h-12 min-w-[164px] rounded-md border border-white/20 px-4 text-[13px] font-[900] uppercase tracking-[0.06em]"
                backgroundColor="rgba(255,255,255,0.05)"
                backgroundHoverColor="#FFFFFF"
                textColor="#FFFFFF"
                textHoverColor="#0A0A0A"
                fillColor="rgba(255,255,255,0.12)"
                iconColor="#FFFFFF"
                iconHoverFill="rgba(10,10,10,0.12)"
              >
                View 2026 calendar
              </SwapArrowButton>
            </motion.div>
            <motion.div variants={heroEnterLine} className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-[700] tracking-[0.02em] text-white/75 md:text-[13px]">
              <span>Secure checkout</span>
              <span aria-hidden="true">&bull;</span>
              <span>Instant QR confirmation</span>
              <span aria-hidden="true">&bull;</span>
              <span>12 themed months</span>
            </motion.div>
            <motion.div variants={heroEnterLine} className="mt-8 grid grid-cols-2 gap-3 md:max-w-[620px] md:grid-cols-4">
              {[
                { value: "12", label: "Months" },
                { value: "36+", label: "Sessions" },
                { value: "3", label: "Formats" },
                { value: "2026", label: "Calendar" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="rounded-md border border-white/15 bg-black/25 px-3 py-3 backdrop-blur-sm"
                  whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <p className="text-[22px] font-[900] leading-none tracking-[-0.03em] text-accent">{stat.value}</p>
                  <p className="mt-1 text-[11px] font-[700] uppercase tracking-[0.08em] text-white/70">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
              </motion.div>
            </div>
          </section>
        }
      >

      <ScrollJackSection className="relative page mx-auto max-w-[1440px] py-16 md:py-24" intensity={1.1}>
        <SectionDivider contentWidth className="absolute top-0 opacity-80" />
        <FadeUp className="pt-6 md:pt-8">
          <p className="inline-flex w-fit rounded-full border border-accent/60 bg-accent/10 px-4 py-1 text-[11px] font-[800] uppercase tracking-[0.1em]">
            Flagship experiences
          </p>
          <h2 className="mt-5 text-balance text-[33px] font-[900] leading-[0.98] tracking-[-0.03em] md:text-[50px]">
            Start with the highest-demand rooms.
          </h2>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.8] text-secondary">
            Handpicked sessions with the strongest attendance pull, practical takeaways, and limited-seat releases.
          </p>
        </FadeUp>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {featuredExperiences.map((item, index) => (
            <FadeUp key={item.title} delayMs={index * 70}>
              {(() => {
                const priceParts = splitPrice(item.priceFrom);
                return (
              <motion.article
                whileHover={reduceMotion ? undefined : { y: -6, boxShadow: "0 22px 44px rgba(10,10,10,0.14)" }}
                transition={{ type: "spring", stiffness: 210, damping: 24 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-borderLight bg-white shadow-[0_12px_34px_rgba(10,10,10,0.06)]"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/22 to-transparent" />
                  <div className="absolute left-4 top-4 inline-flex rounded-full border border-accent/70 bg-black/35 px-2.5 py-1 text-[10px] font-[800] uppercase tracking-[0.08em] text-accent">
                    {item.month}
                  </div>
                  {index === 0 ? (
                    <div className="absolute right-4 top-4 inline-flex rounded-full border border-white/30 bg-black/35 px-2.5 py-1 text-[10px] font-[800] uppercase tracking-[0.08em] text-white">
                      Featured
                    </div>
                  ) : null}
                  <div className="absolute left-4 bottom-4 inline-flex rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[10px] font-[800] uppercase tracking-[0.08em] text-white">
                    {item.channel}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className="min-h-[2.4em] text-[34px] font-[900] leading-[0.98] tracking-[-0.038em] text-[#0A0A0A]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[11px] font-[800] uppercase tracking-[0.09em] text-secondary">{item.date}</p>
                  <p className="mt-3 min-h-[4.8em] text-[13px] leading-[1.62] text-secondary">{item.value}</p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-md border border-borderLight bg-[#fafafa] px-3 py-2.5">
                      <p className="text-[10px] font-[800] uppercase tracking-[0.09em] text-secondary">From</p>
                      <div className="mt-1 leading-none">
                        <p className="text-[10px] font-[900] uppercase tracking-[0.1em] text-secondary">
                          {priceParts.currency}
                        </p>
                        <p className="mt-1 text-[20px] font-[900] tracking-[-0.03em]">
                          {priceParts.amount}
                        </p>
                      </div>
                    </div>
                    <div className="rounded-md border border-accent/50 bg-accent/10 px-3 py-2.5">
                      <p className="text-[10px] font-[800] uppercase tracking-[0.09em] text-secondary">Seats left</p>
                      <p className="mt-1 text-[20px] font-[900] leading-none tracking-[-0.03em]">{item.seatsLeft}</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-5 flex flex-wrap items-center gap-2">
                    <SwapArrowButton
                      href="https://allaxs.vercel.app/events"
                      compact
                      className="h-11 rounded-md px-4 text-[12px] font-[900] uppercase tracking-[0.06em]"
                    >
                      Reserve seat
                    </SwapArrowButton>
                    <button
                      type="button"
                      onClick={() => setActivePosterKey(`${item.month}-${item.title}`)}
                      className="inline-flex h-11 items-center justify-center rounded-md border border-transparent bg-transparent px-3 text-[11px] font-[800] uppercase tracking-[0.09em] text-secondary transition-colors hover:text-[#0A0A0A]"
                    >
                      Quick preview
                    </button>
                  </div>
                </div>
              </motion.article>
                );
              })()}
            </FadeUp>
          ))}
        </div>
      </ScrollJackSection>

      <ScrollJackSection
        className="relative page mx-auto max-w-[1440px] pt-12 pb-20 md:pt-16 md:pb-28"
        intensity={0.95}
      >
        <SectionDivider contentWidth className="absolute top-0 opacity-80" />
        <FadeUp className="pt-4 md:pt-6">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] text-white shadow-[0_24px_60px_rgba(10,10,10,0.26)]">
            <div className="grid grid-cols-1 gap-8 p-6 md:p-8 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="inline-flex rounded-full border border-accent/65 bg-accent/10 px-3 py-1 text-[10px] font-[800] uppercase tracking-[0.1em] text-accent">
                  Conversion runway
                </p>
                <h3 className="mt-4 text-[28px] font-[900] leading-[1.02] tracking-[-0.03em] md:text-[40px]">
                  Limited inventory in this release window.
                </h3>
                <p className="mt-4 max-w-[56ch] text-[14px] leading-[1.75] text-white/80 md:text-[15px]">
                  Early Bird is moving fastest this month. Lock your seat now and secure access to the full Youth+
                  2026 experience pipeline.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <SwapArrowButton
                    href="https://allaxs.vercel.app/events"
                    className="h-12 rounded-md px-5 text-[13px] font-[900] uppercase tracking-[0.06em]"
                    hoverTextClassName="hover:text-white"
                    hoverBgClassName="hover:bg-[#1A1A1A]"
                  >
                    Secure your pass
                  </SwapArrowButton>
                  <BrandButton
                    href="#monthly-tracks"
                    variant="outlineSubtle"
                    uppercase
                    className="h-12 border-white/20 bg-white/5 px-4 text-[12px] text-white/90 hover:border-accent hover:text-accent"
                  >
                    See all sessions
                  </BrandButton>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 self-end content-end auto-rows-min sm:gap-4">
                {socialProofStats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-[26px] font-[900] leading-none tracking-[-0.03em] text-accent">{stat.value}</p>
                    <p className="mt-2 text-[11px] font-[700] uppercase tracking-[0.07em] text-white/70">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </ScrollJackSection>

      <section className="bg-white py-16 md:py-24">
        <div className="relative page mx-auto max-w-[1440px] pt-16 md:pt-24">
          <SectionDivider contentWidth className="absolute top-0 opacity-80" />
          <FadeUp>
            <p className="inline-flex w-fit rounded-full border border-accent/60 bg-accent/10 px-4 py-1 text-[11px] font-[800] uppercase tracking-[0.1em]">
              Passes and pricing
            </p>
            <h2 className="mt-5 text-balance text-[33px] font-[900] leading-[0.98] tracking-[-0.03em] md:text-[50px]">
              Choose your Youth+ Summit 2026 pass before this batch closes.
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.8] text-secondary">
              Transparent tiers, clear value, and instant confirmation after checkout.
            </p>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {premiumPasses.map((pass, idx) => (
              <FadeUp key={pass.name} delayMs={idx * 70}>
                {(() => {
                  const priceParts = splitPrice(pass.price);
                  return (
                <motion.article
                  onMouseEnter={() => setHoverPass(idx)}
                  onMouseLeave={() => setHoverPass((prev) => (prev === idx ? null : prev))}
                  whileHover={reduceMotion ? undefined : { y: -6, boxShadow: "0 18px 42px rgba(10,10,10,0.12)" }}
                  transition={{ type: "spring", stiffness: 210, damping: 24 }}
                  className={`relative overflow-hidden rounded-md border p-4 md:p-5 bg-white shadow-[0_6px_24px_rgba(10,10,10,0.04)] min-h-[260px] ${
                    pass.featured ? "border-accent" : "border-borderLight"
                  }`}
                >
                  {(() => {
                    const isRevealed = hoverPass === idx;
                    const useLightText = isRevealed;
                    const textClass = useLightText ? "text-white" : "text-black";
                    const seatsBoxClass = useLightText
                      ? "border-white/35 bg-black/20"
                      : "border-borderLight bg-[#FAFAFA]";
                    const seatsLabelClass = useLightText ? "text-white/80" : "text-secondary";

                    return (
                      <div className="relative z-10 flex h-full flex-col justify-between">
                        <div className="flex items-center justify-between gap-3">
                          <p className={`text-[13px] font-[900] uppercase tracking-[0.08em] ${textClass}`}>{pass.name}</p>
                          {pass.featured ? (
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
                          <p className="text-[14px] font-[900] uppercase tracking-[0.1em]">
                            {priceParts.currency}
                          </p>
                          <p className="mt-1 text-[52px] font-[900] tracking-[-0.05em] break-words">
                            {priceParts.amount}
                          </p>
                        </div>
                        <p className={`mt-2 text-[13px] ${textClass}`}>{pass.note}</p>
                        <div className={`mt-4 rounded-lg border px-3 py-2 ${seatsBoxClass}`}>
                          <p className={`text-[10px] font-[800] uppercase tracking-[0.08em] ${seatsLabelClass}`}>
                            Seats left
                          </p>
                          <p className={`mt-1 text-[22px] font-[900] leading-none tracking-[-0.03em] ${textClass}`}>
                            {pass.seatsLeft}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                  <motion.div
                    className="absolute inset-0 z-[1]"
                    animate={{ opacity: hoverPass === idx ? 1 : 0 }}
                    transition={{ duration: 0.26, ease: "easeOut" }}
                  >
                    <Image
                      src={pass.image}
                      alt={`${pass.name} ticket pass visual`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
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

      <motion.section
        className="relative bg-white py-14 md:py-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <SectionDivider contentWidth className="absolute top-0 opacity-80" />
        <div className="page mx-auto max-w-[1440px] pt-8 md:pt-10">
          <div className="inline-flex items-center rounded-md border border-accent/80 bg-accent/15 px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
            African Event Energy
          </div>
          <h2 className="mt-4 max-w-[18ch] text-[32px] font-[900] leading-[1.02] tracking-[-0.04em] md:text-[48px]">
            Spaces where collaboration feels local and continental.
          </h2>
          <motion.div className="mt-8 grid gap-4 lg:grid-cols-12">
            <motion.figure
              key={eventImagery[0].src}
              className="group relative h-[320px] overflow-hidden rounded-2xl border border-black/10 lg:col-span-7 lg:h-[430px]"
              whileHover={{ y: -5, scale: 1.006 }}
              transition={{ duration: 0.25 }}
            >
              <Image
                src={eventImagery[0].src}
                alt={eventImagery[0].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-12 text-white md:px-6 md:pb-6">
                <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">{eventImagery[0].title}</p>
                <p className="mt-2 text-[14px] leading-[1.6] md:text-[15px]">{eventImagery[0].caption}</p>
              </figcaption>
            </motion.figure>

            <div className="grid gap-4 lg:col-span-5">
              {eventImagery.slice(1).map((image) => (
                <motion.figure
                  key={image.src}
                  className="group relative h-[210px] overflow-hidden rounded-2xl border border-black/10 md:h-[205px]"
                  whileHover={{ y: -4, scale: 1.006 }}
                  transition={{ duration: 0.25 }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-12 text-white">
                    <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">{image.title}</p>
                    <p className="mt-1.5 text-[13px] leading-[1.55] md:text-[14px]">{image.caption}</p>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <ScrollJackSection
        id="about-editorial-sessions"
        className="relative overflow-hidden border-y border-white/10"
        intensity={0.95}
      >
        <div className="absolute inset-0">
          <Image
            src={ABOUT_EDITORIAL_STRIP_IMAGE}
            alt="African keynote speaker at a Youth+ style summit"
            fill
            sizes="100vw"
            className="object-cover object-[52%_28%] md:object-[50%_24%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/88 via-[#0A0A0A]/58 to-[#0A0A0A]/28" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(229,194,34,0.13),transparent_40%)]" />
        <div className="relative page mx-auto flex min-h-[340px] max-w-[1440px] items-center py-16 md:min-h-[430px] md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="inline-flex rounded-md border border-accent/70 bg-black/30 px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
              Editorial Sessions
            </p>
            <h2 className="mt-4 max-w-[12ch] text-[34px] font-[900] leading-[0.95] tracking-[-0.04em] text-white md:text-[56px]">
              Build with clarity. Pitch with confidence.
            </h2>
            <p className="mt-4 max-w-[56ch] text-[14px] leading-[1.75] text-white/85 md:text-[16px]">
              Short formats, strong facilitation, and outcomes you can measure. Bring your idea, leave with a plan.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Practical keynotes", "Builder workshops", "Real networking"].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-md border border-white/20 bg-black/25 px-3 py-1.5 text-[12px] font-[700] text-white/90"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </ScrollJackSection>

      <ScrollJackSection
        id="monthly-tracks"
        className="relative page mx-auto max-w-[1440px] py-16 md:py-24"
        intensity={1.1}
      >
        <SectionDivider contentWidth className="absolute top-0 opacity-80" />
        <FadeUp className="pt-6 md:pt-8">
          <h2 className="text-balance text-[29px] font-[900] leading-[1.02] tracking-[-0.028em] sm:text-[31px] md:text-[50px]">
            Full 2026 monthly tracks
          </h2>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.8] text-secondary">
            Explore all themed tracks and session formats across the official Youth+ Connect calendar.
          </p>
        </FadeUp>

        <div className="mt-10 space-y-4 md:space-y-5">
          {monthlyTracks.map((track, index) => (
            <FadeUp key={track.month} delayMs={index * 35}>
              <motion.article
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 200, damping: 24 }}
                className="overflow-hidden rounded-2xl border border-borderLight bg-white shadow-[0_12px_34px_rgba(10,10,10,0.05)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
                  <div className="border-b border-borderLight bg-[#0A0A0A] px-6 py-6 text-white lg:border-b-0 lg:border-r">
                    <p className="text-[11px] font-[700] uppercase tracking-[0.1em] text-white/70">Month</p>
                    <p className="mt-2 text-[28px] font-[900] leading-[0.96] tracking-[-0.03em] sm:text-[30px]">{track.month}</p>
                    <p className="mt-5 text-[12px] font-[700] uppercase tracking-[0.08em] text-accent">Theme</p>
                    <p className="mt-2 text-[14px] leading-[1.7] text-white/90">{track.theme}</p>
                  </div>

                  <div className="grid gap-3 p-3 sm:p-4 md:grid-cols-3 md:gap-4 md:p-5">
                    {track.sessions.map((session) => (
                      (() => {
                        const parsedDate = parseSessionDate(session.date);
                        const isPastSession = parsedDate ? parsedDate < today : false;
                        const posterKey = `${track.month}-${session.title}`;
                        const openPoster = () => setActivePosterKey(posterKey);
                        return (
                      <motion.div
                        key={posterKey}
                        role="button"
                        tabIndex={0}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className={`cursor-pointer select-none rounded-[var(--radius-xl)] border border-borderLight bg-[#fafafa] p-3.5 text-left sm:p-4 ${
                          isPastSession ? "opacity-65" : ""
                        }`}
                        onClick={openPoster}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            openPoster();
                          }
                        }}
                      >
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-[800] uppercase tracking-[0.08em] ${channelPillClasses[session.channel]}`}
                          >
                            {session.channel}
                          </span>
                          {isPastSession ? (
                            <span className="inline-flex rounded-full border border-black/25 bg-black/5 px-2 py-0.5 text-[9px] font-[800] uppercase tracking-[0.1em] text-secondary">
                              Past
                            </span>
                          ) : null}
                        </div>
                        {session.poster ? (
                          <div className="relative mb-3 aspect-[4/5] overflow-hidden rounded-lg border border-borderLight bg-[#F7F7F7]">
                            <Image
                              src={session.poster}
                              alt={session.title}
                              fill
                              className="object-contain p-1.5"
                            />
                          </div>
                        ) : null}
                        <h3 className="mt-3 text-[16px] font-[900] leading-[1.15] tracking-[-0.018em] text-[#0A0A0A] sm:text-[18px]">
                          {session.title}
                        </h3>
                        <p className="mt-2 text-[13px] font-[700] uppercase tracking-[0.07em] text-secondary">
                          {session.date}
                        </p>
                        <span className="mt-4 inline-flex text-[13px] font-[800] text-[#0A0A0A]">
                          Click to reveal poster
                        </span>
                      </motion.div>
                        );
                      })()
                    ))}
                  </div>
                </div>
              </motion.article>
            </FadeUp>
          ))}
        </div>
      </ScrollJackSection>

      <section className="bg-white pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="relative page mx-auto max-w-[1440px] pt-14 md:pt-20">
          <SectionDivider contentWidth className="absolute top-0 opacity-80" />
          <FadeUp>
            <p className="inline-flex w-fit rounded-full border border-accent/60 bg-white px-4 py-1 text-[11px] font-[800] uppercase tracking-[0.1em]">
              Past events
            </p>
            <h2 className="mt-5 text-balance text-[32px] font-[900] leading-[0.98] tracking-[-0.03em] md:text-[48px]">
              Highlights from recent Youth+ Connect activities
            </h2>
          </FadeUp>

          <div className="mt-8 grid grid-cols-1 gap-5 md:mt-9 md:grid-cols-3">
            {INSIGHT_HIGHLIGHTS.slice(0, 3).map((item, index) => (
              <FadeUp key={item.slug} delayMs={index * 60}>
                <motion.article
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 230, damping: 24 }}
                  className="flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-borderLight bg-white shadow-[0_12px_34px_rgba(10,10,10,0.05)]"
                >
                  <div className="relative aspect-[16/10]">
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-[25px] font-[900] leading-[1.03] tracking-[-0.025em]">{item.title}</h3>
                    <p className="mt-3 text-[12px] font-[800] uppercase tracking-[0.08em] text-secondary">
                      {item.schedule}
                    </p>
                    <p className="mt-1 text-[13px] font-[700] text-secondary">{item.location}</p>
                    <p className="mt-4 text-[14px] leading-[1.75] text-secondary">{item.detail}</p>
                    <div className="mt-auto pt-5">
                      <SwapArrowButton
                        href={`/insights#${item.slug}`}
                        compact
                        className="h-11 w-full justify-center rounded-full text-[12px] font-[800] uppercase tracking-[0.06em] sm:w-auto"
                      >
                        Read insight
                      </SwapArrowButton>
                    </div>
                  </div>
                </motion.article>
              </FadeUp>
            ))}
          </div>
          <FadeUp delayMs={200}>
            <div className="mt-10 flex justify-center md:mt-12">
              <SwapArrowButton
                href="/insights"
                compact
                className="h-11 justify-center rounded-full px-6 text-[12px] font-[800] uppercase tracking-[0.06em]"
              >
                Browse all insights
              </SwapArrowButton>
            </div>
          </FadeUp>
        </div>
      </section>

      <AnimatePresence>
        {activeEvent ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0A0A0A]/75 p-3 sm:p-4"
            onClick={() => setActivePosterKey(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="relative flex max-h-[92vh] w-full max-w-[680px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-white"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative h-[min(68vh,80vw)] w-full bg-[#F8F8F8] sm:h-[min(70vh,74vw)] md:h-[min(72vh,620px)]">
                <Image
                  src={activeEvent.poster}
                  alt={`${activeEvent.title} poster`}
                  fill
                  className="object-contain p-2 sm:p-3"
                  sizes="(max-width: 768px) 92vw, 680px"
                />
              </div>
              <div className="space-y-2 overflow-y-auto border-t border-borderLight p-4 sm:p-5">
                <p className="text-[11px] font-[800] uppercase tracking-[0.09em] text-secondary">
                  {activeEvent.month} - {activeEvent.channel}
                </p>
                <h3 className="text-[24px] font-[900] leading-[1.06] tracking-[-0.03em]">{activeEvent.title}</h3>
                <p className="text-[13px] font-[700] uppercase tracking-[0.07em] text-secondary">{activeEvent.date}</p>
                <p className="text-[14px] leading-[1.7] text-secondary">{activeEvent.theme}</p>
              </div>
              <button
                type="button"
                onClick={() => setActivePosterKey(null)}
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[18px] font-[700] text-[#0A0A0A] shadow-sm"
                aria-label="Close poster reveal"
              >
                -
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      </StickyHeroSeam>
    </main>
  );
}
