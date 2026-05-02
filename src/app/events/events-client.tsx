"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Video } from "lucide-react";
import { type ReactNode, useRef, useState } from "react";
import { HeroHeading } from "@/components/home/HeroHeading";
import { FadeUp } from "@/components/motion/FadeUp";
import { ScrollJackSection } from "@/components/motion/ScrollJackSection";
import { StickyHeroSeam } from "@/components/motion/StickyHeroSeam";
import { useHeroEnterAnimations } from "@/components/motion/useHeroEnterAnimations";
import { BrandButton } from "@/components/ui/BrandButton";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { INSIGHT_HIGHLIGHTS } from "@/data/insights";

type EventSessionPreview = {
  /** One supporting line under the session title */
  subtitle: string;
  /** Practical bullets for the quick-preview drawer */
  bullets: string[];
  /** Room / city / delivery note */
  venueLine?: string;
  /** Session length or cadence */
  durationLine?: string;
  /** Who this room is built for */
  audienceLine?: string;
};

type EventSession = {
  channel: "Webinar" | "On-site";
  title: string;
  date: string;
  poster?: string;
  preview?: EventSessionPreview;
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
      {
        channel: "Webinar",
        title: "BLUEPRINT: Turning Vision into an Action Plan",
        date: "Jan 13, 2026",
        poster: "https://www.youthplusafrica.com/images/blueprint.png",
        preview: {
          subtitle: "Turn the year’s intent into a one-page execution map you can defend in rooms and reviews.",
          bullets: [
            "Live facilitation with a repeatable blueprint canvas and worked examples.",
            "Breakout prompts to pressure-test milestones, owners, and weekly execution rhythm.",
            "Q&A on sequencing priorities when capital, time, and team capacity are all constrained.",
          ],
          venueLine: "Online · Youth+ live studio",
          durationLine: "≈ 2.5 hours",
          audienceLine: "Founders, PMs, program leads",
        },
      },
      {
        channel: "On-site",
        title: "Visioning Workshop",
        date: "Jan 23, 2026",
        poster: "https://www.youthplusafrica.com/images/visioning_poster.png",
        preview: {
          subtitle: "A tactile, high-trust room to translate ambition into a shared narrative for 2026.",
          bullets: [
            "Facilitated story arcs for personal, team, and community outcomes.",
            "Peer mirrors and rapid feedback loops to sharpen language and commitments.",
            "Take-home artifacts you can reuse for town-halls, boards, and partner updates.",
          ],
          venueLine: "Nairobi · curated cohort room",
          durationLine: "Half-day",
          audienceLine: "Builders, creatives, civic leaders",
        },
      },
    ],
  },
  {
    month: "February",
    theme: "AI x Creativity x Human Potential",
    sessions: [
      {
        channel: "Webinar",
        title: "State of Women in AI",
        date: "Feb 10, 2026 & Feb 17, 2026",
        poster: "https://www.youthplusafrica.com/images/state_of_women_ai_1.jpg",
        preview: {
          subtitle: "Two connected webinars on who is building, funding, and governing AI across the continent.",
          bullets: [
            "Data-backed snapshots of talent pipelines, policy windows, and capital flows.",
            "Operator stories on shipping responsible AI inside real products and teams.",
            "Office hours on hiring, partnerships, and ethical review checkpoints.",
          ],
          venueLine: "Online · two-part series",
          durationLine: "Two 90-minute sessions",
          audienceLine: "Women founders, researchers, allies",
        },
      },
      {
        channel: "On-site",
        title: "The Future of Work",
        date: "Feb 27, 2026",
        poster: "https://www.youthplusafrica.com/images/future_of_work.jpg",
        preview: {
          subtitle: "An immersive Sarit Expo experience on AI, skills, careers, and the next decade of work.",
          bullets: [
            "Keynotes and panels mapped to hiring, productivity, and creativity under AI pressure.",
            "Live demos and partner alley for tools, learning paths, and community programs.",
            "Curated networking blocks for operators, students, and ecosystem partners.",
          ],
          venueLine: "Sarit Expo Centre, Nairobi",
          durationLine: "Afternoon · doors 2:00 PM",
          audienceLine: "Professionals, founders, students",
        },
      },
    ],
  },
  {
    month: "March",
    theme: "Women's Month",
    sessions: [
      {
        channel: "Webinar",
        title: "Leadership & Economic Empowerment",
        date: "Mar 10, 2026",
        preview: {
          subtitle: "A tactical masterclass for women translating leadership capital into economic outcomes.",
          bullets: [
            "Frameworks for pricing power, delegation, and board-ready storytelling.",
            "Breakouts on contracts, partnerships, and repeatable revenue motions.",
            "Resource drops on grants, credit readiness, and community leverage.",
          ],
          venueLine: "Online · secure webinar room",
          durationLine: "≈ 2 hours",
          audienceLine: "Women-led teams & operators",
        },
      },
      {
        channel: "Webinar",
        title: "Give to Gain Webinar Series",
        date: "Mar 24, 2026",
        preview: {
          subtitle: "A generosity-first playbook for building trust before you ask for anything in return.",
          bullets: [
            "Case studies on community-led distribution and volunteer flywheels.",
            "Templates for lightweight experiments that compound credibility.",
            "Live coaching on sequencing offers without burning social capital.",
          ],
          venueLine: "Online",
          durationLine: "Series kickoff · 75 minutes",
          audienceLine: "Community builders, creators",
        },
      },
    ],
  },
  {
    month: "April",
    theme: "Wellness & Self-Leadership",
    sessions: [
      {
        channel: "Webinar",
        title: "Nervous System 101",
        date: "Apr 14, 2026",
        preview: {
          subtitle: "Evidence-informed practices to regulate stress while sustaining ambitious output.",
          bullets: [
            "Guided mapping of stress triggers across work, travel, and digital habits.",
            "Micro-practices for recovery between sprints and high-stakes meetings.",
            "Q&A on sleep, focus, and sustainable performance for operators on the move.",
          ],
          venueLine: "Online",
          durationLine: "≈ 90 minutes",
          audienceLine: "Founders, students, caregivers",
        },
      },
      {
        channel: "On-site",
        title: "Mindset & Balance Retreat",
        date: "Apr 24, 2026",
        preview: {
          subtitle: "A restorative on-site day to reset defaults before the festival sprint.",
          bullets: [
            "Guided movement, breathwork, and journaling in a low-noise environment.",
            "Small-group circles on boundaries, courage, and creative risk.",
            "Take-home rituals you can stack into weekly execution cadence.",
          ],
          venueLine: "Nairobi · retreat venue TBA",
          durationLine: "Full day",
          audienceLine: "Builders seeking grounded pace",
        },
      },
    ],
  },
  {
    month: "May",
    theme: "Climate & Sustainability",
    sessions: [
      {
        channel: "Webinar",
        title: "Green Skills & Jobs",
        date: "May 12, 2026",
        preview: {
          subtitle: "A practical scan of green pathways, credentials, and hiring signals for youth operators.",
          bullets: [
            "Sector snapshots on energy, mobility, circularity, and climate finance.",
            "Skill ladders with portfolio prompts you can start this quarter.",
            "Partner desk for internships, apprenticeships, and pilot collaborations.",
          ],
          venueLine: "Online",
          durationLine: "≈ 2 hours",
          audienceLine: "Students, career switchers, HR partners",
        },
      },
      {
        channel: "On-site",
        title: "Eco Futures Expo",
        date: "May 29, 2026",
        preview: {
          subtitle: "Hands-on expo floor connecting climate literacy with tools, founders, and capital.",
          bullets: [
            "Live demos from builders shipping low-carbon products and services.",
            "Lightning talks on policy, procurement, and community-scale action.",
            "Matchmaking for pilots, media, and distribution partners.",
          ],
          venueLine: "Nairobi · expo floor",
          durationLine: "Full afternoon",
          audienceLine: "Founders, investors, civic teams",
        },
      },
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
    month: "May",
    title: "Eco Futures Expo",
    date: "May 29, 2026",
    channel: "On-site",
    priceFrom: "KES 5,000",
    seatsLeft: 64,
    value:
      "A hands-on expo connecting climate literacy, green career pathways, and practical tools for sustainable impact.",
    image: "https://www.youthplusafrica.com/images/events-bg.jpg",
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
    note: "Core festival access",
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
  Webinar: "bg-[#0A0A0A]/5 text-[#0A0A0A] border-[#0A0A0A]/15",
  "On-site": "bg-[#E5C222]/20 text-[#0A0A0A] border-[#E5C222]/50",
};

const WEBINAR_LANE_BORDER = "border-l-4 border-l-[#0A0A0A]";
const ONSITE_LANE_BORDER = "border-l-4 border-l-[#E5C222]";

const monthPosterFallback: Record<string, string> = {
  January: "https://www.youthplusafrica.com/images/visioning_poster.png",
  February: "https://www.youthplusafrica.com/images/state_of_women_ai_2.jpg",
  March: "https://www.youthplusafrica.com/images/state_of_women_ai_2.jpg",
  April: "https://www.youthplusafrica.com/images/events-bg.jpg",
  May: "https://www.youthplusafrica.com/images/events-bg.jpg",
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

function SessionCard({
  session,
  trackMonth,
  today,
  onOpenPoster,
  borderAccentClass,
}: {
  session: EventSession;
  trackMonth: string;
  today: Date;
  onOpenPoster: (key: string) => void;
  borderAccentClass: string;
}) {
  const parsedDate = parseSessionDate(session.date);
  const isPastSession = parsedDate ? parsedDate < today : false;
  const posterKey = `${trackMonth}-${session.title}`;
  return (
    <motion.div
      role="button"
      tabIndex={0}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`flex cursor-pointer select-none flex-col rounded-xl border border-borderLight bg-white p-4 text-left shadow-[0_2px_12px_rgba(10,10,10,0.04)] ${borderAccentClass} pl-4 ${
        isPastSession ? "opacity-70" : ""
      }`}
      onClick={() => onOpenPoster(posterKey)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpenPoster(posterKey);
        }
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-[800] uppercase tracking-[0.08em] ${channelPillClasses[session.channel]}`}
        >
          {session.channel}
        </span>
        {isPastSession ? (
          <span className="inline-flex shrink-0 rounded-full border border-black/20 bg-black/[0.04] px-2 py-0.5 text-[9px] font-[800] uppercase tracking-[0.1em] text-secondary">
            Past
          </span>
        ) : null}
      </div>
      {session.poster ? (
        <div className="relative mt-3 aspect-[4/5] max-h-[200px] w-full overflow-hidden rounded-lg border border-borderLight bg-[#F7F7F7] sm:max-h-[220px]">
          <Image
            src={session.poster}
            alt={session.title}
            fill
            className="object-contain p-1.5"
            sizes="(max-width:768px) 100vw, 320px"
          />
        </div>
      ) : null}
      <h3 className="mt-3 text-[16px] font-[900] leading-[1.18] tracking-[-0.02em] text-[#0A0A0A] sm:text-[17px]">{session.title}</h3>
      <p className="mt-2 text-[12px] font-[700] uppercase tracking-[0.07em] text-secondary">{session.date}</p>
      <span className="mt-3 inline-flex text-[12px] font-[800] text-[#0A0A0A] underline decoration-black/20 underline-offset-4">
        View poster
      </span>
    </motion.div>
  );
}

function EmptySessionLane({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex min-h-[160px] flex-col rounded-xl border border-dashed border-black/12 bg-[#fafafa] p-5 text-left">
      <div className="flex items-center gap-2 text-[#0A0A0A]">
        <span className="text-accent">{icon}</span>
        <p className="text-[11px] font-[800] uppercase tracking-[0.12em] text-secondary">{title}</p>
      </div>
      <p className="mt-3 text-[13px] leading-[1.65] text-secondary">{body}</p>
    </div>
  );
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
    preview?: EventSessionPreview;
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
            preview: session.preview,
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
              Youth Plus Festival 2026
            </motion.p>
            <HeroHeading
              className="mt-5 text-balance text-[40px] md:text-[62px] tracking-[-0.04em]"
              lines={["High-impact rooms for Africa's", "next generation of builders."]}
            />
            <motion.p variants={heroEnterBody} className="mt-5 max-w-[60ch] text-[15px] leading-[1.8] text-white/85 md:text-[17px]">
              Tickets on this page are for Youth Plus Festival 2026. Explore the January–May 2026 build-up calendar with
              tactical webinars and premium in-person activations.
            </motion.p>
            <motion.div variants={heroEnterCta} className="mt-8 flex flex-wrap items-center gap-3">
              <SwapArrowButton
                href="https://allaxs.vercel.app/events"
                compact
                buttonRadius="var(--radius-md)"
                className="h-12 min-w-[164px] px-4 text-[13px] font-[900] uppercase tracking-[0.06em]"
                hoverTextClassName="hover:text-white"
                hoverBgClassName="hover:bg-[#0A0A0A]"
              >
                Get Festival Tickets
              </SwapArrowButton>
              <SwapArrowButton
                href="#monthly-tracks"
                compact
                smoothScroll
                buttonRadius="var(--radius-md)"
                className="h-12 min-w-[164px] border border-white/20 px-4 text-[13px] font-[900] uppercase tracking-[0.06em]"
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
              <span>5 themed months</span>
            </motion.div>
            <motion.div variants={heroEnterLine} className="mt-8 grid grid-cols-2 gap-3 md:max-w-[620px] md:grid-cols-4">
              {[
                { value: "5", label: "Months" },
                { value: "10", label: "Sessions" },
                { value: "2", label: "Ways to join" },
                { value: "2026", label: "Season" },
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
            <motion.div
              variants={heroEnterLine}
              className="mt-10 grid max-w-[720px] grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <div className="rounded-lg border border-white/15 bg-black/25 px-4 py-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-accent">
                  <Video className="h-4 w-4 shrink-0" aria-hidden />
                  <span className="text-[11px] font-[800] uppercase tracking-[0.1em]">Webinar</span>
                </div>
                <p className="mt-2 text-[13px] leading-[1.55] text-white/75">
                  Live online sessions with tactical playbooks, Q&amp;A, and focused facilitation.
                </p>
              </div>
              <div className="rounded-lg border border-white/15 bg-black/25 px-4 py-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-accent">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                  <span className="text-[11px] font-[800] uppercase tracking-[0.1em]">On-site</span>
                </div>
                <p className="mt-2 text-[13px] leading-[1.55] text-white/75">
                  In-person rooms in Nairobi — limited seats, high-trust facilitation, and festival-week energy.
                </p>
              </div>
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
            Spotlight — Jan to May
          </p>
          <h2 className="mt-5 text-balance text-[33px] font-[900] leading-[0.98] tracking-[-0.03em] md:text-[50px]">
            Start with the rooms everyone asks about first.
          </h2>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.8] text-secondary">
            Three anchor experiences across webinars and on-site formats — each with clear pricing, seat counts, and a
            fast path to checkout.
          </p>
        </FadeUp>

        <div className="mt-10 grid w-full min-w-0 auto-rows-fr grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-6 xl:gap-8">
          {featuredExperiences.map((item, index) => (
            <FadeUp key={item.title} delayMs={index * 70} className="h-full min-h-0">
              {(() => {
                const priceParts = splitPrice(item.priceFrom);
                const ruleClass = "border-black/[0.08]";
                const labelClass = "text-secondary";
                return (
              <motion.article
                whileHover={reduceMotion ? undefined : { y: -6, boxShadow: "0 22px 44px rgba(10,10,10,0.14)" }}
                transition={{ type: "spring", stiffness: 210, damping: 24 }}
                className="group flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-borderLight bg-white shadow-[0_12px_34px_rgba(10,10,10,0.06)]"
              >
                <div className="relative aspect-[16/10] w-full shrink-0 lg:aspect-[2/1]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="flex min-h-0 min-w-0 flex-1 flex-col p-5 md:p-6 lg:p-7">
                  <header className={`grid shrink-0 grid-cols-[1fr_auto] items-start gap-x-2 border-b pb-3 md:pb-3.5 ${ruleClass}`}>
                    <div className="min-w-0">
                      <p className={`text-[10px] font-[800] uppercase tracking-[0.1em] ${labelClass}`}>Month</p>
                      <p className="mt-1.5 text-[13px] font-[900] uppercase tracking-[0.08em] text-[#0A0A0A]">{item.month}</p>
                    </div>
                    <div className="flex justify-end">
                      {index === 0 ? (
                        <span className="rounded-md border border-accent/60 bg-accent/10 px-2.5 py-1 text-[10px] font-[800] uppercase tracking-[0.08em] text-[#0A0A0A]">
                          Featured
                        </span>
                      ) : (
                        <span
                          className="invisible select-none rounded-md border border-transparent px-2.5 py-1 text-[10px] font-[800] uppercase tracking-[0.08em]"
                          aria-hidden
                        >
                          Featured
                        </span>
                      )}
                    </div>
                  </header>

                  <section className={`shrink-0 border-b py-3 md:py-3.5 ${ruleClass}`} aria-label="Format and schedule">
                    <p className={`text-[10px] font-[800] uppercase tracking-[0.1em] ${labelClass}`}>Schedule</p>
                    <p className="mt-2 text-[13px] font-[800] text-[#0A0A0A]">
                      <span className="text-secondary">{item.channel}</span>
                      <span className="mx-2 text-secondary/80" aria-hidden>
                        ·
                      </span>
                      <span>{item.date}</span>
                    </p>
                  </section>

                  <section className={`shrink-0 border-b py-3 md:py-3.5 ${ruleClass}`} aria-label="Session title">
                    <p className={`text-[10px] font-[800] uppercase tracking-[0.1em] ${labelClass}`}>Session</p>
                    <h3 className="mt-2 min-h-[2.35em] text-balance text-[26px] font-[900] leading-[1.05] tracking-[-0.034em] text-[#0A0A0A] sm:min-h-[2.45em] sm:text-[30px] lg:text-[32px]">
                      {item.title}
                    </h3>
                  </section>

                  <section
                    className={`flex min-h-0 flex-1 flex-col justify-center border-b py-4 md:py-5 ${ruleClass}`}
                    aria-label="What this experience covers"
                  >
                    <p className={`text-[10px] font-[800] uppercase tracking-[0.1em] ${labelClass}`}>What&apos;s included</p>
                    <p className="mt-2 text-[14px] leading-[1.6] text-secondary md:text-[15px] md:leading-[1.65]">{item.value}</p>
                  </section>

                  <section className={`shrink-0 border-b pt-4 pb-4 md:pt-4 md:pb-4 ${ruleClass}`} aria-label="Pricing and availability">
                    <p className={`text-[10px] font-[800] uppercase tracking-[0.1em] ${labelClass}`}>Pricing &amp; availability</p>
                    <div className="mt-3 grid min-w-0 grid-cols-2 gap-3 sm:gap-4">
                      <div className="min-w-0 rounded-md border border-borderLight bg-[#fafafa] px-3 py-2.5 sm:px-4 sm:py-3">
                        <p className="text-[10px] font-[800] uppercase tracking-[0.09em] text-secondary">From</p>
                        <div className="mt-2 min-h-[3.25rem] leading-none">
                          <p className="text-[10px] font-[900] uppercase tracking-[0.1em] text-secondary">{priceParts.currency}</p>
                          <p className="mt-1 text-[22px] font-[900] tracking-[-0.03em] sm:text-[24px] text-[#0A0A0A]">
                            {priceParts.amount}
                          </p>
                        </div>
                      </div>
                      <div className="min-w-0 rounded-md border border-accent/50 bg-accent/10 px-3 py-2.5 sm:px-4 sm:py-3">
                        <p className="text-[10px] font-[800] uppercase tracking-[0.09em] text-secondary">Seats left</p>
                        <div className="mt-2 flex min-h-[3.25rem] flex-col justify-end leading-none">
                          <p className="text-[22px] font-[900] tracking-[-0.03em] sm:text-[24px] text-[#0A0A0A]">{item.seatsLeft}</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <div className="mt-auto flex min-w-0 shrink-0 flex-col gap-2 pt-5 sm:flex-row sm:flex-wrap sm:items-center">
                    <SwapArrowButton
                      href="https://allaxs.vercel.app/events"
                      compact
                      className="h-11 w-full justify-center px-4 text-[12px] font-[900] uppercase tracking-[0.06em] sm:w-auto sm:min-w-[148px]"
                    >
                      Reserve seat
                    </SwapArrowButton>
                    <button
                      type="button"
                      onClick={() => setActivePosterKey(`${item.month}-${item.title}`)}
                      className="inline-flex h-11 w-full items-center justify-center rounded-md border border-transparent bg-transparent px-3 text-[11px] font-[800] uppercase tracking-[0.09em] text-secondary transition-colors hover:text-[#0A0A0A] sm:w-auto"
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
                  Early Bird is moving fastest this month. Lock your seat for Youth Plus Festival 2026 and the
                  January–May build-up — webinars plus select Nairobi rooms.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <SwapArrowButton
                    href="https://allaxs.vercel.app/events"
                    buttonRadius="var(--radius-md)"
                    className="h-12 px-5 text-[13px] font-[900] uppercase tracking-[0.06em]"
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

      <section id="pass-types" className="scroll-mt-[calc(var(--site-header-height)+1rem)] bg-white py-16 md:py-24">
        <div className="relative page mx-auto max-w-[1440px] pt-16 md:pt-24">
          <SectionDivider contentWidth className="absolute top-0 opacity-80" />
          <FadeUp>
            <p className="inline-flex w-fit rounded-full border border-accent/60 bg-accent/10 px-4 py-1 text-[11px] font-[800] uppercase tracking-[0.1em]">
              Passes and pricing
            </p>
            <h2 className="mt-5 text-balance text-[33px] font-[900] leading-[0.98] tracking-[-0.03em] md:text-[50px]">
              Choose your Youth Plus Festival 2026 pass before this batch closes.
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
            Event energy
          </div>
          <h2 className="mt-4 max-w-[22ch] text-[32px] font-[900] leading-[1.02] tracking-[-0.04em] md:text-[48px]">
            The same rooms online and on the ground — built for momentum.
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
            alt="African keynote speaker at a Youth Plus Festival session"
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
              {["Webinar deep dives", "On-site intensives", "Operator-led facilitation"].map((item) => (
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
        className="relative bg-[#fafafa] py-16 md:py-24"
        intensity={1.05}
      >
        <div className="page relative mx-auto max-w-[1440px]">
          <SectionDivider contentWidth className="absolute top-0 opacity-80" />
          <FadeUp className="relative pt-6 md:pt-8">
            <p className="inline-flex w-fit rounded-full border border-accent/60 bg-white px-4 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
              Two-lane calendar
            </p>
            <h2 className="mt-4 text-balance text-[29px] font-[900] leading-[1.02] tracking-[-0.028em] sm:text-[31px] md:text-[48px]">
              January–May: webinars and Nairobi rooms, side by side.
            </h2>
            <p className="mt-4 max-w-[68ch] text-[15px] leading-[1.8] text-secondary md:text-[16px]">
              Each month stacks online sessions next to in-person experiences when both are scheduled. Tap a card to
              preview its poster, then continue to tickets.
            </p>

            <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-5">
              <div className="rounded-2xl border border-borderLight bg-white p-5 shadow-[0_8px_28px_rgba(10,10,10,0.05)]">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A0A0A] text-white">
                    <Video className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <p className="text-[12px] font-[800] uppercase tracking-[0.1em] text-[#0A0A0A]">Webinar lane</p>
                    <p className="mt-2 text-[14px] leading-[1.65] text-secondary">
                      Join remotely with a tight agenda, live Q&amp;A, and takeaways you can apply the same week.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-borderLight bg-white p-5 shadow-[0_8px_28px_rgba(10,10,10,0.05)]">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-[#0A0A0A]">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <p className="text-[12px] font-[800] uppercase tracking-[0.1em] text-[#0A0A0A]">On-site lane</p>
                    <p className="mt-2 text-[14px] leading-[1.65] text-secondary">
                      Limited seats in Nairobi — workshops, expos, and high-trust rooms tied to the festival build-up.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          <div className="relative mt-12 space-y-6 md:mt-16 md:space-y-8">
            {monthlyTracks.map((track, index) => {
              const webinars = track.sessions.filter((s) => s.channel === "Webinar");
              const onsite = track.sessions.filter((s) => s.channel === "On-site");
              return (
                <FadeUp key={track.month} delayMs={index * 40}>
                  <motion.article
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    className="overflow-hidden rounded-2xl border border-borderLight bg-white shadow-[0_16px_44px_rgba(10,10,10,0.07)]"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,300px)_1fr]">
                      <div className="flex flex-col justify-between border-b border-borderLight bg-[#0A0A0A] px-6 py-8 text-white lg:border-b-0 lg:border-r lg:border-borderLight">
                        <div>
                          <p className="text-[11px] font-[700] uppercase tracking-[0.14em] text-white/55">Month</p>
                          <p className="mt-1 text-[12px] font-[800] tabular-nums tracking-[0.18em] text-accent">
                            {String(index + 1).padStart(2, "0")} / 05
                          </p>
                          <p className="mt-4 text-[32px] font-[900] leading-[0.94] tracking-[-0.035em] sm:text-[36px]">
                            {track.month}
                          </p>
                          <p className="mt-5 text-[11px] font-[800] uppercase tracking-[0.12em] text-accent">Theme</p>
                          <p className="mt-2 max-w-[30ch] text-[15px] leading-[1.65] text-white/90">{track.theme}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 divide-y divide-borderLight lg:grid-cols-2 lg:divide-x lg:divide-y-0">
                        <div className="p-5 md:p-8">
                          <div className="mb-4 flex flex-wrap items-center gap-2">
                            <Video className="h-4 w-4 text-[#0A0A0A]" aria-hidden />
                            <span className="text-[12px] font-[900] uppercase tracking-[0.12em] text-[#0A0A0A]">
                              Webinars
                            </span>
                            <span className="rounded-full bg-black/[0.06] px-2 py-0.5 text-[10px] font-[800] text-secondary">
                              {webinars.length} session{webinars.length === 1 ? "" : "s"}
                            </span>
                          </div>
                          {webinars.length === 0 ? (
                            <EmptySessionLane
                              title="Webinar lane"
                              body="No webinar is scheduled for this month in the published calendar."
                              icon={<Video className="h-4 w-4" aria-hidden />}
                            />
                          ) : (
                            <div className="space-y-4">
                              {webinars.map((session) => (
                                <SessionCard
                                  key={session.title}
                                  session={session}
                                  trackMonth={track.month}
                                  today={today}
                                  onOpenPoster={(key) => setActivePosterKey(key)}
                                  borderAccentClass={WEBINAR_LANE_BORDER}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="p-5 md:p-8">
                          <div className="mb-4 flex flex-wrap items-center gap-2">
                            <MapPin className="h-4 w-4 text-accent" aria-hidden />
                            <span className="text-[12px] font-[900] uppercase tracking-[0.12em] text-[#0A0A0A]">
                              On-site
                            </span>
                            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-[800] text-[#0A0A0A]">
                              {onsite.length} session{onsite.length === 1 ? "" : "s"}
                            </span>
                          </div>
                          {onsite.length === 0 ? (
                            <EmptySessionLane
                              title="On-site lane"
                              body="This month is webinar-first on the calendar. In-person rooms pick up again in other months through May."
                              icon={<MapPin className="h-4 w-4" aria-hidden />}
                            />
                          ) : (
                            <div className="space-y-4">
                              {onsite.map((session) => (
                                <SessionCard
                                  key={session.title}
                                  session={session}
                                  trackMonth={track.month}
                                  today={today}
                                  onOpenPoster={(key) => setActivePosterKey(key)}
                                  borderAccentClass={ONSITE_LANE_BORDER}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </FadeUp>
              );
            })}
          </div>
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

          <div className="mt-8 grid auto-rows-fr grid-cols-1 gap-5 md:mt-9 md:grid-cols-3">
            {INSIGHT_HIGHLIGHTS.slice(0, 3).map((item, index) => (
              <FadeUp key={item.slug} delayMs={index * 60} className="h-full min-h-0">
                <motion.article
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 230, damping: 24 }}
                  className="flex h-full min-h-0 flex-col overflow-hidden rounded-[var(--radius-xl)] border border-borderLight bg-white shadow-[0_12px_34px_rgba(10,10,10,0.05)]"
                >
                  <div className="relative aspect-[16/10] shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col p-5">
                    <h3 className="min-h-[2.5em] text-[25px] font-[900] leading-[1.03] tracking-[-0.025em]">{item.title}</h3>
                    <p className="mt-3 text-[12px] font-[800] uppercase tracking-[0.08em] text-secondary">
                      {item.schedule}
                    </p>
                    <p className="mt-1 text-[13px] font-[700] text-secondary">{item.location}</p>
                    <p className="mt-4 flex-1 text-[14px] leading-[1.75] text-secondary">{item.detail}</p>
                    <div className="mt-auto shrink-0 pt-5">
                      <SwapArrowButton
                        href={`/insights#${item.slug}`}
                        compact
                        className="h-11 w-full justify-center text-[12px] font-[800] uppercase tracking-[0.06em]"
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
                className="h-11 justify-center px-6 text-[12px] font-[800] uppercase tracking-[0.06em]"
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
              <div className="max-h-[min(40vh,420px)] space-y-4 overflow-y-auto border-t border-borderLight p-4 sm:p-5 md:max-h-none">
                <div>
                  <p className="text-[11px] font-[800] uppercase tracking-[0.09em] text-secondary">
                    {activeEvent.month} · {activeEvent.channel}
                  </p>
                  <h3 className="mt-1.5 text-[24px] font-[900] leading-[1.06] tracking-[-0.03em]">{activeEvent.title}</h3>
                  <p className="mt-2 text-[13px] font-[700] uppercase tracking-[0.07em] text-secondary">{activeEvent.date}</p>
                  <p className="mt-3 text-[12px] font-[800] uppercase tracking-[0.08em] text-accent">Month theme</p>
                  <p className="mt-1 text-[14px] font-[700] leading-snug text-[#0A0A0A]">{activeEvent.theme}</p>
                  <p className="mt-4 text-[15px] font-[700] leading-[1.45] text-[#0A0A0A]">
                    {activeEvent.preview?.subtitle ?? `A ${activeEvent.channel.toLowerCase()} experience aligned with the ${activeEvent.month} program arc.`}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-[800] uppercase tracking-[0.08em] text-secondary">Session snapshot</p>
                  <ul className="mt-2.5 space-y-2.5">
                    {(activeEvent.preview?.bullets ?? [
                      `${activeEvent.channel} format with Youth+ facilitation and live Q&A.`,
                      `Final run-of-show, seat counts, and add-ons are confirmed on the ticketing page.`,
                      `Bring one concrete objective so facilitators can tailor breakout prompts.`,
                    ]).map((line) => (
                      <li key={line} className="flex gap-2.5 text-[14px] leading-[1.6] text-secondary">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {(activeEvent.preview?.venueLine ||
                  activeEvent.preview?.durationLine ||
                  activeEvent.preview?.audienceLine) && (
                  <div>
                    <p className="text-[12px] font-[800] uppercase tracking-[0.08em] text-secondary">Logistics</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {activeEvent.preview?.venueLine ? (
                        <span className="inline-flex rounded-md border border-borderLight bg-[#fafafa] px-2.5 py-1.5 text-[12px] font-[700] text-[#0A0A0A]">
                          {activeEvent.preview.venueLine}
                        </span>
                      ) : null}
                      {activeEvent.preview?.durationLine ? (
                        <span className="inline-flex rounded-md border border-borderLight bg-[#fafafa] px-2.5 py-1.5 text-[12px] font-[700] text-[#0A0A0A]">
                          {activeEvent.preview.durationLine}
                        </span>
                      ) : null}
                      {activeEvent.preview?.audienceLine ? (
                        <span className="inline-flex rounded-md border border-borderLight bg-[#fafafa] px-2.5 py-1.5 text-[12px] font-[700] text-[#0A0A0A]">
                          {activeEvent.preview.audienceLine}
                        </span>
                      ) : null}
                    </div>
                  </div>
                )}
                <div className="border-t border-borderLight pt-3">
                  <p className="text-[12px] leading-[1.65] text-secondary">
                    Need a different format or group block?{" "}
                    <a
                      href="mailto:support@youthplusafrica.com"
                      className="font-[800] text-[#0A0A0A] underline decoration-accent/50 underline-offset-2 hover:decoration-accent"
                    >
                      support@youthplusafrica.com
                    </a>
                  </p>
                  <div className="mt-4">
                    <SwapArrowButton
                      href="https://allaxs.vercel.app/events"
                      compact
                      newTab
                      className="h-11 w-full justify-center text-[12px] font-[900] uppercase tracking-[0.06em]"
                    >
                      Continue to ticketing
                    </SwapArrowButton>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActivePosterKey(null)}
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[18px] font-[700] text-[#0A0A0A] shadow-sm"
                aria-label="Close quick preview"
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
