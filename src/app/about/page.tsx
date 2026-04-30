"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  CalendarHeart,
  Compass,
  Fingerprint,
  Glasses,
  Handshake,
  Mail,
  Network,
  Rocket,
} from "lucide-react";
import { useEffect, useState, type SVGProps } from "react";
import { MilestoneTimeline, type Milestone } from "@/components/about/MilestoneTimeline";
import { StackingPillars, type Pillar } from "@/components/about/StackingPillars";
import { HeroHeading } from "@/components/home/HeroHeading";
import { StickyHeroSeam } from "@/components/motion/StickyHeroSeam";
import { useHeroEnterAnimations } from "@/components/motion/useHeroEnterAnimations";
import { BrandedFaqSection } from "@/components/site/BrandedFaqSection";
import { JoinUsCta } from "@/components/site/JoinUsCta";
import { PartnerLogoMarquee } from "@/components/site/PartnerLogoMarquee";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { ScrollJackSection } from "@/components/motion/ScrollJackSection";
import { PARTNER_LOGOS } from "@/data/partnerLogos";

/** Lucide dropped the branded LinkedIn icon; keep a small outline glyph for team links. */
function LinkedinIcon({
  className,
  strokeWidth = 1.75,
  ...props
}: SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const teamMembers: Array<{
  name: string;
  role: string;
  bio: string;
  photo?: string;
  linkedin: string;
  email: string;
  /** Tailwind object-position utility; source crops vary — tune per portrait. */
  avatarObjectPosition?: string;
}> = [
  {
    name: "Freddy Mulli",
    role: "Founder",
    bio: "Leads Youth+ Africa's long-term vision, strategic partnerships, and ecosystem growth across youth innovation communities.",
    photo: "https://www.youthplusafrica.com/images/freddy.jpeg",
    linkedin: "#",
    email: "mailto:team@youthplusafrica.com",
  },
  {
    name: "Christine Tetty",
    role: "CEO",
    bio: "Leads strategic execution across programs, partnerships, and operations to scale Youth+ Africa's continental impact.",
    linkedin: "#",
    email: "mailto:team@youthplusafrica.com",
  },
  {
    name: "Samuel Muli",
    role: "Technical Lead",
    bio: "Leads platform and product execution, ensuring Youth+ digital experiences are reliable, scalable, and user-centered.",
    photo: "https://www.youthplusafrica.com/images/Muli.jpeg",
    avatarObjectPosition: "object-[center_18%]",
    linkedin: "#",
    email: "mailto:team@youthplusafrica.com",
  },
  {
    name: "Miriam Njeri",
    role: "Partnerships Lead",
    bio: "Builds high-trust relationships with ecosystem partners, sponsors, and institutions to expand Youth+ impact.",
    photo: "https://www.youthplusafrica.com/images/miriam.jpeg",
    linkedin: "#",
    email: "mailto:team@youthplusafrica.com",
  },
  {
    name: "J. I. Mideva Muhandale",
    role: "Digital Communication & Social Media Manager",
    bio: "Leads Youth+ digital storytelling, social strategy, and audience engagement across campaigns and community touchpoints.",
    photo: "https://www.youthplusafrica.com/images/J.mideva.jpg",
    linkedin: "#",
    email: "mailto:team@youthplusafrica.com",
  },
  {
    name: "Jeff Geoffrey",
    role: "Project Manager",
    bio: "Owns project delivery across key initiatives, coordinating teams and timelines for high-quality execution.",
    photo: "https://www.youthplusafrica.com/images/jeff_2.jpg",
    linkedin: "#",
    email: "mailto:team@youthplusafrica.com",
  },
];

function getLinkedInHref(member: { name: string; linkedin: string }) {
  if (member.linkedin && member.linkedin !== "#") return member.linkedin;
  const query = encodeURIComponent(`${member.name} Youth+ Africa`);
  return `https://www.linkedin.com/search/results/all/?keywords=${query}`;
}

const operatingModes = [
  {
    title: "Community infrastructure",
    description:
      "Curated rooms where trust compounds — weekly rhythm, peer accountability, and operator-grade facilitation.",
  },
  {
    title: "Founder & talent support",
    description:
      "Mentorship, introductions, and practical feedback loops designed to move teams from idea to shipped work.",
  },
  {
    title: "Convenings & events",
    description:
      "High-signal forums and summits built for outcomes — not optics — with clear follow-through after the room ends.",
  },
  {
    title: "Partnership studio",
    description:
      "Co-designed events with institutions and brands aligned to youth-centered growth with measurable impact.",
  },
] as const;

const ABOUT_HERO_IMAGE = "/images/event.png";
const ABOUT_EDITORIAL_STRIP_IMAGE = "/images/about-editorial-strip.png";
const ABOUT_PARTNER_LOGOS = PARTNER_LOGOS;

const timelineMilestones: Milestone[] = [
  {
    year: "2019",
    label: "Origin",
    title: "Youth+ Africa is born",
    description:
      "Started as a focused builders' circle for students and early-career operators across East Africa.",
    image: "/images/timeline-story-2019.png",
    icon: <Glasses className="h-4.5 w-4.5" strokeWidth={2.1} aria-hidden />,
  },
  {
    year: "2021",
    label: "First Summit",
    title: "Youth+ Summit launches",
    description:
      "Hosted the inaugural summit bringing together 200+ young founders, investors, and operators.",
    image: "/images/timeline-story-2021.png",
    icon: <Building2 className="h-4.5 w-4.5" strokeWidth={2.1} aria-hidden />,
  },
  {
    year: "2023",
    label: "Community Growth",
    title: "1,000+ members across Africa",
    description:
      "Expanded from East Africa to West Africa, building cross-continental partnerships and events.",
    image: "/images/timeline-story-2023.png",
    icon: <Network className="h-4.5 w-4.5" strokeWidth={2.1} aria-hidden />,
  },
  {
    year: "2025",
    label: "Ecosystem",
    title: "A full ecosystem emerges",
    description:
      "Launched partnership events, speaker series, and structured pathways for founders and operators.",
    image: "/images/timeline-story-2025.png",
    icon: <Rocket className="h-4.5 w-4.5" strokeWidth={2.1} aria-hidden />,
  },
];

const programPillars: Pillar[] = [
  {
    number: "01",
    title: "Community Infrastructure",
    description:
      "Curated spaces where high-agency young people build trust, skills, and execution rhythm.",
    outcome: "A stronger pipeline of coordinated builders.",
    icon: Fingerprint,
    eyebrow: "Community",
    offerings: [
      "Founder Circles",
      "Operator Cohorts",
      "Weekly Builder Rooms",
      "Onboarding Rituals",
      "Cross-City Convenings",
    ],
    image: "/images/pillar1.jpeg",
    imageAlt: "African youth founders collaborating in a community workspace",
    ctaHref: "/events",
    ctaLabel: "View Events",
  },
  {
    number: "02",
    title: "Founder & Talent Support",
    description:
      "Mentorship, strategic guidance, and ecosystem introductions for emerging founders and operators.",
    outcome: "Faster validation and clearer growth paths.",
    icon: Compass,
    eyebrow: "Founder Support",
    offerings: [
      "1:1 Operator Mentorship",
      "Strategic Office Hours",
      "Investor Warm Intros",
      "Skill-Up Sprints",
      "Hiring Support",
    ],
    image: "/images/pillar2.jpeg",
    imageAlt: "African mentors and founders discussing growth strategy",
    ctaHref: "/partner-with-us",
    ctaLabel: "Partner With Us",
  },
  {
    number: "03",
    title: "Convenings & Events",
    description:
      "High-intent forums, summits, and local gatherings that unlock practical collaboration.",
    outcome: "More deals, partnerships, and opportunities.",
    icon: CalendarHeart,
    eyebrow: "Convenings",
    offerings: [
      "Annual Summit",
      "Operator Forums",
      "Investor Roundtables",
      "City Salons",
      "Workshop Series",
    ],
    image: "/images/pillar3.jpeg",
    imageAlt: "African innovation event with speakers and attendees",
    ctaHref: "/events",
    ctaLabel: "See Events",
  },
  {
    number: "04",
    title: "Partnership Studio",
    description:
      "Co-designed events with institutions and brands aligned to youth-centered African growth.",
    outcome: "Long-term, measurable ecosystem outcomes.",
    icon: Handshake,
    eyebrow: "Partnerships",
    offerings: [
      "Co-Designed Programs",
      "Brand Collaborations",
      "Talent Pipelines",
      "Research Partnerships",
      "Custom Cohorts",
    ],
    image: "/images/pillar4.jpeg",
    imageAlt: "African professionals in a partnership planning meeting",
    ctaHref: "/contact",
    ctaLabel: "Start Collaboration",
  },
];

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


const testimonials = [
  {
    quote:
      "Youth+ Africa consistently delivers execution-focused talent and practical collaboration spaces.",
    name: "Ecosystem Partner",
    role: "Program Director, Nairobi",
    avatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80",
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=240&q=80",
    ],
  },
  {
    quote:
      "The quality of founders and operators in their network is exceptional and partnership-ready.",
    name: "Investor Ally",
    role: "Venture Partner, Lagos",
    avatars: [
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=240&q=80",
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=240&q=80",
      "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=240&q=80",
    ],
  },
  {
    quote:
      "A trusted ecosystem collaborator for execution-focused youth programs and high-signal founder communities.",
    name: "Strategic Partner",
    role: "Regional Programs Lead, Kigali",
    avatars: [
      "https://images.unsplash.com/photo-1541535881962-3bb380b08458?auto=format&fit=crop&w=240&q=80",
      "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?auto=format&fit=crop&w=240&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
    ],
  },
];

const faqs = [
  {
    question: "Who is Youth+ Africa for?",
    answer:
      "Youth+ Africa is designed for ambitious students, early-career operators, founders, and ecosystem collaborators building meaningful outcomes in African markets. If you are serious about execution, partnerships, and long-term impact, this community is built for you.",
  },
  {
    question: "Do I need to pay to join community activities?",
    answer:
      "Some experiences are open and free to access, while select premium events run on a paid or sponsored-access model depending on the partner and format. We always communicate eligibility, access tiers, and registration requirements clearly before each event goes live.",
  },
  {
    question: "How do organizations partner with Youth+ Africa?",
    answer:
      "Organizations can partner with Youth+ Africa through co-designed events, event collaboration, talent development tracks, and ecosystem-focused strategic initiatives. The best starting point is to share your objective, target audience, and timeline so we can design a practical collaboration model with measurable outcomes.",
  },
  {
    question: "How quickly does your team respond?",
    answer:
      "Most inbound partnership and collaboration requests receive a response within 48 business hours.",
  },
  {
    question: "What kinds of opportunities can members access?",
    answer:
      "Members typically access curated events, founder support pathways, mentorship, ecosystem introductions, and cross-country collaboration opportunities. Access varies by event type, but the goal is always practical progression, not passive participation.",
  },
];

export default function AboutPage() {
  const { heroBackdropEase, heroEnterBadge, heroEnterBody, heroEnterCta, heroLeftOrchestra, reduceMotion } =
    useHeroEnterAnimations();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const principles = [
    "Execution over optics",
    "Pan-African by design",
    "Intergenerational collaboration",
    "Access that compounds",
  ];

  const impactStats = [
    { value: "35K+", label: "community members reached" },
    { value: "120+", label: "partners and collaborators" },
    { value: "18", label: "African countries represented" },
    { value: "400+", label: "founders supported directly" },
  ];

  const sectionReveal = {
    hidden: { opacity: 0, y: 36, scale: 0.985 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.08,
      },
    },
  };

  const itemReveal = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 4600);
    return () => clearInterval(timer);
  }, []);


  return (
    <main className="bg-white text-[#0A0A0A]">
      <StickyHeroSeam
        sheetClassName="rounded-t-[24px] overflow-hidden"
        hero={
          <section className="relative min-h-[calc(100vh-84px)] overflow-hidden bg-[#0A0A0A]">
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
                src={ABOUT_HERO_IMAGE}
                alt="Youth+ Africa event scene"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-[linear-gradient(112deg,rgba(10,10,10,0.8)_0%,rgba(10,10,10,0.62)_45%,rgba(10,10,10,0.86)_100%)]"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: reduceMotion ? 0 : 1.05,
                delay: reduceMotion ? 0 : 0.08,
                ease: heroBackdropEase,
              }}
            />
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(229,194,34,0.22),transparent_36%)]"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: reduceMotion ? 0 : 1.05,
                delay: reduceMotion ? 0 : 0.12,
                ease: heroBackdropEase,
              }}
            />

            <div className="relative page mx-auto grid min-h-[calc(100vh-84px)] max-w-[1440px] items-center gap-7 py-12 md:py-14 xl:py-16 lg:grid-cols-[1fr_auto] lg:items-center">
              <motion.div
                className="max-w-[66ch] text-left text-white"
                variants={heroLeftOrchestra}
                initial="hidden"
                animate="visible"
              >
            <motion.p
              variants={heroEnterBadge}
              className="inline-flex items-center rounded-md border border-accent/70 bg-black/35 px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent"
            >
              About Youth+ Africa
            </motion.p>
            <HeroHeading
              className="mt-5 text-[31px] sm:text-[35px] md:text-[66px] tracking-[-0.04em] md:tracking-[-0.045em]"
              lines={["Where Africa's next generation", "of builders becomes undeniable."]}
            />
            <motion.p
              variants={heroEnterBody}
              className="mt-5 max-w-[58ch] text-[15px] leading-[1.8] text-white/88 md:text-[18px]"
            >
              Youth+ Africa is a leadership and innovation platform for ambitious
              young founders, creators, and operators. We build practical spaces
              where ideas meet capital, talent meets mentorship, and momentum
              becomes long-term impact.
            </motion.p>
              </motion.div>

              <motion.aside
                className="w-full max-w-[360px] rounded-xl border border-white/15 bg-black/35 p-5 text-white/95 backdrop-blur-sm md:p-6"
                variants={heroEnterCta}
                initial="hidden"
                animate="visible"
              >
            <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
              Build with us
            </p>
            <h2 className="mt-2 text-[24px] font-[900] leading-[1.05] tracking-[-0.02em]">
              Choose your next move.
            </h2>
            <p className="mt-3 text-[14px] leading-[1.7] text-white/80">
              Join upcoming sessions, start a strategic partnership, or connect
              directly with our team.
            </p>
            <div className="mt-5 space-y-2.5">
              <Link
                href="/events"
                className="inline-flex h-11 w-full items-center justify-center rounded-md bg-accent px-4 text-[13px] font-[900] uppercase tracking-[0.08em] text-[#0A0A0A] transition hover:brightness-95"
              >
                Join Community
              </Link>
              <Link
                href="/partner-with-us"
                className="inline-flex h-11 w-full items-center justify-center rounded-md border border-white/25 bg-white/5 px-4 text-[13px] font-[800] uppercase tracking-[0.08em] text-white transition-colors hover:border-accent hover:text-accent"
              >
                Partner With Us
              </Link>
            </div>
            <p className="mt-4 text-[12px] leading-[1.6] text-white/75">
              Typical response: within 48 business hours.
            </p>
              </motion.aside>
            </div>
          </section>
        }
      >

      <ScrollJackSection
        className="relative bg-white py-14 md:py-20"
        intensity={1.05}
      >
        <SectionDivider contentWidth className="absolute top-0 opacity-80" />
        <div className="relative page mx-auto max-w-[1440px] pt-8 md:pt-10">
          <motion.div
            className="mt-2 grid gap-7 md:grid-cols-2 md:gap-x-8 xl:grid-cols-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerContainer}
          >
            {impactStats.map((stat) => (
              <motion.article
                key={stat.label}
                variants={itemReveal}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-[28px] font-[900] leading-none tracking-[-0.03em] text-accent md:text-[34px]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-secondary">
                  {stat.label}
                </p>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 border-t border-black/10 pt-8 md:pt-9"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
              Operating model
            </p>
            <div className="mt-4 grid gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-10 lg:gap-12">
              <div>
                <h2 className="max-w-[16ch] text-[30px] font-[900] leading-[1.02] tracking-[-0.035em] text-[#0A0A0A] md:text-[44px]">
                  We build momentum through disciplined execution.
                </h2>
                <div className="mt-6 space-y-4 border-t border-black/10 pt-6">
                  <p className="max-w-[62ch] text-[15px] leading-[1.85] text-secondary md:text-[16px]">
                    Youth+ is not a passive network. We design environments where young
                    builders move faster — with clarity, accountability, and access to
                    the right operators at the right moment.
                  </p>
                  <p className="max-w-[62ch] text-[15px] leading-[1.85] text-secondary md:text-[16px]">
                    The work is practical: ship, learn, iterate, and compound — across
                    campuses, cities, and markets.
                  </p>
                </div>
              </div>

              <motion.div
                className="md:border-l md:border-black/10 md:pl-8 lg:pl-10"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={staggerContainer}
              >
                <p className="text-[12px] font-[800] uppercase tracking-[0.1em] text-secondary">
                  How we execute
                </p>
                <div className="mt-4 divide-y divide-black/10">
                  {operatingModes.map((mode) => (
                    <motion.div
                      key={mode.title}
                      variants={itemReveal}
                      className="py-5 first:pt-0"
                    >
                      <p className="text-[16px] font-[900] tracking-[-0.02em] text-[#0A0A0A]">
                        {mode.title}
                      </p>
                      <p className="mt-2 text-[14px] leading-[1.75] text-secondary">
                        {mode.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.article
            className="mt-12 grid gap-9 sm:gap-10 md:grid-cols-[1.2fr_0.75fr] md:gap-12 lg:gap-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
                The Why
              </p>
              <h2 className="mt-3 max-w-[17ch] text-[30px] font-[900] leading-[1.02] tracking-[-0.035em] md:text-[44px]">
                We back talent before the world calls it obvious.
              </h2>
              <p className="mt-4 max-w-[66ch] text-[15px] leading-[1.85] text-secondary md:text-[16px]">
                Youth+ started as a focused room of students and early-career
                professionals who believed Africa&apos;s defining opportunities would
                be built by connected, execution-minded communities. Today, we
                convene founders, investors, policy voices, and operators to move
                from insight to action at speed.
              </p>
            </div>

            <motion.div
              className="md:border-l md:border-black/10 md:pl-8 lg:pl-10"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[12px] font-[800] uppercase tracking-[0.1em] text-secondary">
                Principles
              </p>
              <ul className="mt-4 border-t border-black/10">
                {principles.map((principle, index) => (
                  <motion.li
                    key={principle}
                    className="border-b border-black/10 py-4 first:pt-4"
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className="min-w-[1.75rem] text-[11px] font-[800] tabular-nums tracking-[0.06em] text-accent"
                        aria-hidden
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] font-[700] tracking-[-0.01em] text-[#0A0A0A]">
                        {principle}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.article>
        </div>
      </ScrollJackSection>
      </StickyHeroSeam>

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
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/88 via-[#0A0A0A]/58 to-[#0A0A0A]/28" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(229,194,34,0.13),transparent_40%)]" />
        <div className="relative page mx-auto max-w-[1440px] flex min-h-[340px] items-center py-16 md:min-h-[430px] md:py-20">
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
              Short formats, strong facilitation, and outcomes you can measure. Bring your idea,
              leave with a plan.
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
        className="relative bg-white py-14 md:py-20"
        intensity={1.05}
      >
        <SectionDivider contentWidth className="absolute top-0 opacity-80" />
        <div className="page mx-auto max-w-[1440px] pt-8 md:pt-10">
          <div className="mx-auto max-w-[920px]">
            <div className="inline-flex items-center rounded-md border border-accent/80 bg-accent/15 px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
              Team
            </div>
            <h2 className="mt-4 max-w-[16ch] text-[32px] font-[900] leading-[1.02] tracking-[-0.04em] md:text-[48px]">
              Leadership with operator DNA.
            </h2>
            <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.8] text-secondary md:text-[16px]">
              A multidisciplinary team shaping trusted spaces for youth
              leadership, practical innovation, and ecosystem-scale outcomes.
            </p>

            <motion.div
              className="mt-11 space-y-7 md:space-y-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              {teamMembers.map((member) => {
                const linkedInHref = getLinkedInHref(member);
                return (
                <motion.article
                  key={member.name}
                  className="grid gap-5 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-start md:gap-7"
                  variants={itemReveal}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#f1f1f1] shadow-[0_8px_24px_rgba(10,10,10,0.12)] md:mt-1.5">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={`${member.name} portrait`}
                        fill
                        sizes="56px"
                        className={["object-cover", member.avatarObjectPosition].filter(Boolean).join(" ")}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[12px] font-[900] uppercase tracking-[0.08em] text-[#0A0A0A]">
                        {member.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-[22px] font-[900] leading-[1.08] tracking-[-0.02em] text-[#0A0A0A]">
                      {member.name}
                    </h3>
                    <p className="mt-2 text-[12px] font-[800] uppercase tracking-[0.08em] text-accent">
                      {member.role}
                    </p>
                    <p className="mt-3 text-[14px] leading-[1.75] text-secondary">
                      {member.bio}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 md:justify-end md:self-center">
                    <a
                      href={linkedInHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-accent transition-colors hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2"
                    >
                      <LinkedinIcon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden />
                    </a>
                    <a
                      href={member.email}
                      aria-label={`Email ${member.name}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-accent transition-colors hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2"
                    >
                      <Mail className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden />
                    </a>
                  </div>
                </motion.article>
                );
              })}
            </motion.div>
          </div>
        </div>
      </ScrollJackSection>

      <motion.section
        className="relative bg-white py-14 md:py-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        variants={sectionReveal}
      >
        <SectionDivider contentWidth className="absolute top-0 opacity-80" />
        <div className="page mx-auto max-w-[1440px] pt-8 md:pt-10">
          <motion.div
            className="mt-2"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="inline-flex items-center rounded-full border-[1.5px] border-accent px-4 py-1 text-[0.75rem] font-[600] uppercase tracking-[0.08em] text-accent">
              Our Story
            </div>
            <h2 className="mt-4 max-w-[14ch] text-[clamp(2rem,5vw,3.5rem)] font-[900] leading-[1.1] tracking-[-0.03em] text-[#0A0A0A]">
              A timeline of practical momentum.
            </h2>
            <div className="mt-12">
              <MilestoneTimeline milestones={timelineMilestones} theme="light" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="relative bg-white py-14 md:py-20">
        <SectionDivider contentWidth className="absolute top-0 opacity-80" />
        <div className="page mx-auto max-w-[1440px] pt-8 md:pt-10">
          <div className="inline-flex items-center rounded-md border border-accent/80 bg-accent/15 px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
            What We Do
          </div>
          <h2 className="mt-4 max-w-[17ch] text-[32px] font-[900] leading-[1.02] tracking-[-0.04em] md:text-[48px]">
            Four pillars that drive ecosystem outcomes.
          </h2>
          <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.8] text-secondary md:text-[16px]">
            Scroll to explore each pillar — cards stack as you move, anchoring the
            full picture without losing the thread of any one program.
          </p>
          <div className="mt-10 md:mt-12">
            <StackingPillars pillars={programPillars} />
          </div>
        </div>
      </section>

      <motion.section
        className="relative bg-white py-14 md:py-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionReveal}
      >
        <SectionDivider contentWidth className="absolute top-0 opacity-80" />
        <div className="page mx-auto max-w-[1440px] pt-8 md:pt-10">
          <div className="inline-flex items-center rounded-md border border-accent/80 bg-accent/15 px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
            African Event Energy
          </div>
          <h2 className="mt-4 max-w-[18ch] text-[32px] font-[900] leading-[1.02] tracking-[-0.04em] md:text-[48px]">
            Spaces where collaboration feels local and continental.
          </h2>
          <motion.div
            className="mt-8 grid gap-4 lg:grid-cols-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.figure
              key={eventImagery[0].src}
              className="group relative h-[320px] overflow-hidden rounded-2xl border border-black/10 lg:col-span-7 lg:h-[430px]"
              variants={itemReveal}
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
                <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
                  {eventImagery[0].title}
                </p>
                <p className="mt-2 text-[14px] leading-[1.6] md:text-[15px]">
                  {eventImagery[0].caption}
                </p>
              </figcaption>
            </motion.figure>

            <div className="grid gap-4 lg:col-span-5">
              {eventImagery.slice(1).map((image) => (
                <motion.figure
                  key={image.src}
                  className="group relative h-[210px] overflow-hidden rounded-2xl border border-black/10 md:h-[205px]"
                  variants={itemReveal}
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
                    <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
                      {image.title}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-[1.55] md:text-[14px]">
                      {image.caption}
                    </p>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="relative bg-white py-14 md:py-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionReveal}
      >
        <SectionDivider contentWidth className="absolute top-0 opacity-80" />
        <div className="page mx-auto max-w-[1440px] pt-8 md:pt-10">
          <div className="inline-flex items-center rounded-md border border-accent/80 bg-accent/15 px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
            Trust Signals
          </div>
          <h2 className="mt-4 max-w-[18ch] text-[32px] font-[900] leading-[1.02] tracking-[-0.04em] md:text-[48px]">
            Built with leading ecosystem collaborators.
          </h2>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 18, scale: 0.99 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <PartnerLogoMarquee
              label="Partners"
              variant="card"
              durationSec={40}
              logoTone="gold"
              logos={ABOUT_PARTNER_LOGOS}
              frameStyle="none"
            />
          </motion.div>
          <motion.div
            className="mt-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={testimonials[activeTestimonial].name}
                className="w-full"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <p className="text-[26px] leading-[1.35] tracking-[-0.02em] text-[#0A0A0A] md:text-[38px]">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </p>
                <footer className="mt-8 flex flex-wrap items-center gap-4 md:gap-6">
                  <div className="flex -space-x-3">
                    {testimonials[activeTestimonial].avatars.map((avatar) => (
                      <span
                        key={avatar}
                        className="relative h-12 w-12 overflow-hidden rounded-full border border-borderLight bg-white"
                      >
                        <Image
                          src={avatar}
                          alt="Testimonial profile"
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </span>
                    ))}
                  </div>
                  <span className="hidden h-10 w-px bg-borderLight md:block" />
                  <div className="text-[13px] leading-[1.6] text-secondary md:text-[15px]">
                    <span className="font-[800] text-[#0A0A0A]">
                      {testimonials[activeTestimonial].name}
                    </span>
                    {" · "}
                    {testimonials[activeTestimonial].role}
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-6 flex items-center gap-2">
              {testimonials.map((item, idx) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveTestimonial(idx)}
                  aria-label={`Show testimonial ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === activeTestimonial
                      ? "w-8 bg-accent"
                      : "w-2.5 bg-borderLight"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="relative bg-white py-14 md:py-20">
        <SectionDivider contentWidth className="absolute top-0 opacity-80" />
        <div className="page mx-auto max-w-[1440px] pt-8 md:pt-10">
          <BrandedFaqSection
            eyebrow="FAQ"
            title="Questions & Answers"
            description="Have more questions? Reach out and our team will guide you to the right collaboration path."
            contactItems={[
              {
                icon: "email",
                value: "support@youthplusafrica.com",
                href: "mailto:support@youthplusafrica.com",
              },
              {
                icon: "location",
                value: "Kofisi, 8th floor, Riverside Drive, Nairobi",
              },
            ]}
            watermark="FAQ"
            faqs={faqs}
            defaultOpen={0}
          />
        </div>
      </section>

      <JoinUsCta id="about-join-us" />
    </main>
  );
}
