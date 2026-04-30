"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Building2,
  Glasses,
  Mail,
  Network,
  Rocket,
  UserRound,
} from "lucide-react";
import { type SVGProps } from "react";
import { MilestoneTimeline, type Milestone } from "@/components/about/MilestoneTimeline";
import { HeroHeading } from "@/components/home/HeroHeading";
import { StickyHeroSeam } from "@/components/motion/StickyHeroSeam";
import { useHeroEnterAnimations } from "@/components/motion/useHeroEnterAnimations";
import { BrandedFaqSection } from "@/components/site/BrandedFaqSection";
import { JoinUsCta } from "@/components/site/JoinUsCta";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { ScrollJackSection } from "@/components/motion/ScrollJackSection";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";

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

  return (
    <main className="bg-white text-[#0A0A0A]">
      <StickyHeroSeam
        sheetClassName="rounded-t-[24px] overflow-hidden"
        hero={
          <section className="relative -mt-[var(--site-header-height)] min-h-[100dvh] overflow-hidden bg-[#0A0A0A] pt-[var(--site-header-height)]">
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

            <div className="relative page mx-auto grid min-h-[calc(100dvh_-_var(--site-header-height))] max-w-[1440px] items-center gap-7 py-12 md:py-14 xl:py-16 lg:grid-cols-[1fr_auto] lg:items-center">
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
            <div className="mt-5 flex flex-col gap-2.5">
              <SwapArrowButton
                href="/events"
                compact
                className="h-11 w-full justify-center rounded-md text-[13px] font-[900] uppercase tracking-[0.08em]"
              >
                Join Community
              </SwapArrowButton>
              <SwapArrowButton
                href="/partner-with-us"
                compact
                className="h-11 w-full justify-center rounded-md border border-white/25 text-[13px] font-[900] uppercase tracking-[0.08em]"
                backgroundColor="rgba(255,255,255,0.06)"
                backgroundHoverColor="#FFFFFF"
                textColor="#FFFFFF"
                textHoverColor="#0A0A0A"
                fillColor="rgba(255,255,255,0.14)"
                iconColor="#FFFFFF"
                iconHoverFill="rgba(10,10,10,0.12)"
              >
                Partner With Us
              </SwapArrowButton>
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
                      <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_34%_22%,rgba(229,194,34,0.28),transparent_56%)] text-[#0A0A0A]">
                        <UserRound className="h-6 w-6" strokeWidth={1.8} aria-hidden />
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
