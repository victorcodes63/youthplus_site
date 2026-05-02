"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarHeart, Compass, Fingerprint, Handshake } from "lucide-react";
import { useEffect, useState } from "react";
import { StackingPillars, type Pillar } from "@/components/about/StackingPillars";
import { FadeUp } from "@/components/motion/FadeUp";
import { JoinUsCta } from "@/components/site/JoinUsCta";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";
import { VENTURES } from "@/data/ventures";

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
      "High-intent forums, festivals, and local gatherings that unlock practical collaboration.",
    outcome: "More deals, partnerships, and opportunities.",
    icon: CalendarHeart,
    eyebrow: "Convenings",
    offerings: [
      "Annual Festival",
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

function AnimatedStatValue({ value, reduceMotion }: { value: string; reduceMotion: boolean }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : Number.NaN;
  const suffix = match?.[2] ?? "";
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (reduceMotion || Number.isNaN(target)) return;
    let frameId = 0;
    const durationMs = 900;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setCurrent(Math.round(progress * target));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [reduceMotion, target]);

  if (reduceMotion || Number.isNaN(target)) return <>{value}</>;
  return (
    <>
      {current}
      {suffix}
    </>
  );
}

export default function VenturesPage() {
  const reduceMotion = useReducedMotion();
  const proofStats = [
    { label: "Venture tracks", value: "3" },
    {
      label: "Active focus areas",
      value: String(VENTURES.reduce((sum, venture) => sum + venture.focusAreas.length, 0)),
    },
    {
      label: "Recent initiatives",
      value: String(VENTURES.reduce((sum, venture) => sum + venture.items.length, 0)),
    },
  ];

  return (
    <section className="relative overflow-x-clip bg-[linear-gradient(180deg,#ffffff_0%,#fffdf6_38%,#ffffff_100%)] pt-20 pb-14 text-[#0A0A0A] sm:pt-24 sm:pb-16 md:pt-32 md:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(229,194,34,0.16)_0%,rgba(229,194,34,0.05)_45%,transparent_75%)]"
      />
      <div className="relative page mx-auto max-w-[1440px]">
        <FadeUp>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.995 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-borderLight p-5 shadow-[0_18px_60px_rgba(10,10,10,0.09)] sm:p-7 md:p-10"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <Image
                src="/images/ventures-hero-stage.png"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 1440px"
                className="object-cover object-[52%_48%]"
                priority
              />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(104deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.9)_46%,rgba(10,10,10,0.72)_100%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(229,194,34,0.22),transparent_40%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E5C222]/70 to-transparent"
            />
            <div className="relative z-10 grid grid-cols-1 items-center gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
              <div>
                <div className="inline-flex items-center rounded-md border border-accent bg-accent/10 px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-[#0A0A0A]">
                  Venture ecosystem
                </div>
                <h1 className="mt-5 max-w-[15ch] text-[34px] font-[900] leading-[0.94] tracking-[-0.045em] md:text-[58px]">
                  Invest your attention where youth momentum compounds.
                </h1>
                <p className="mt-4 max-w-[68ch] text-[15px] leading-[1.75] text-secondary md:text-[18px]">
                  Youth+ ventures are built to move from conversation to outcomes.
                  Each track is purpose-built for distribution, collaboration, and
                  practical impact across Africa&apos;s next generation of builders.
                </p>
                <motion.div
                  className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
                >
                  <SwapArrowButton
                    href="/partner-with-us"
                    compact
                    className="h-11 px-5 text-[14px]"
                  >
                    Partner with a venture
                  </SwapArrowButton>
                  <SwapArrowButton
                    href="/contact"
                    compact
                    className="h-11 border border-borderLight px-5 text-[14px]"
                    backgroundColor="#FFFFFF"
                    backgroundHoverColor="#0A0A0A"
                    textColor="#0A0A0A"
                    textHoverColor="#FFFFFF"
                    fillColor="rgba(10,10,10,0.08)"
                    iconColor="#0A0A0A"
                    iconHoverFill="rgba(255,255,255,0.18)"
                  >
                    Talk to our team
                  </SwapArrowButton>
                </motion.div>
              </div>

              <div className="hidden lg:block" aria-hidden />
            </div>
          </motion.div>
        </FadeUp>

        <FadeUp delayMs={70}>
          <motion.div
            className="mt-8 grid grid-cols-1 gap-4 border-y border-borderLight py-5 sm:grid-cols-3"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {proofStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center justify-center border-l-2 border-accent/65 px-3 py-1 text-center first:border-l-0 last:border-r-2 sm:first:border-l-2"
                initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                whileHover={reduceMotion ? undefined : { y: -2, scale: 1.015 }}
                transition={{
                  duration: 0.28,
                  ease: "easeOut",
                  delay: reduceMotion ? 0 : idx * 0.06,
                }}
              >
                <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-secondary">
                  {stat.label}
                </p>
                <p className="mt-1 text-[30px] font-[900] leading-none tracking-[-0.03em]">
                  <AnimatedStatValue value={stat.value} reduceMotion={!!reduceMotion} />
                </p>
              </motion.div>
            ))}
          </motion.div>
        </FadeUp>

        <section className="relative mt-12 py-2 lg:mt-14">
          <SectionDivider className="absolute inset-x-0 top-0" />
          <div className="pt-8">
            <div className="inline-flex items-center rounded-md border border-accent/80 bg-accent/15 px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
              Our Core Programs
            </div>
            <h2 className="mt-4 max-w-[17ch] text-[32px] font-[900] leading-[1.02] tracking-[-0.04em] md:text-[48px]">
              Four pillars that drive ecosystem outcomes.
            </h2>
            <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.8] text-secondary md:text-[16px]">
              These programs anchor how Youth+ ventures support founders, communities, and institutions.
            </p>
            <div className="mt-10 md:mt-12">
              <StackingPillars pillars={programPillars} />
            </div>
          </div>
        </section>

        <div className="mt-12 space-y-12 lg:mt-14">
          {VENTURES.map((group, groupIndex) => (
            <FadeUp key={group.name} delayMs={groupIndex * 70}>
              <motion.article
                className="relative pt-8"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionDivider className="absolute inset-x-0 top-0" />
                <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-12">
                  <div>
                    <div className="inline-flex items-center rounded-md border border-accent/60 bg-accent/10 px-2.5 py-1 text-[10px] font-[800] uppercase tracking-[0.1em] text-[#0A0A0A]">
                      {group.label}
                    </div>
                    <h2 className="mt-3 text-[28px] font-[900] leading-[1.02] tracking-[-0.03em] md:text-[40px]">
                      {group.name}
                    </h2>
                    <p className="mt-3 max-w-[58ch] text-[14px] leading-[1.75] text-secondary md:text-[16px]">
                      {group.summary}
                    </p>

                    <div className="mt-5 border-y border-borderLight py-4">
                      <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
                        Current focus
                      </p>
                      <div className="mt-3 space-y-2.5">
                        {group.focusAreas.map((focus, idx) => (
                          <div key={focus} className="flex items-start gap-3">
                            <span className="mt-[2px] text-[11px] font-[900] uppercase tracking-[0.08em] text-accent">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <p className="text-[15px] leading-[1.65] text-secondary">
                              {focus}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                      <motion.div whileHover={reduceMotion ? undefined : { y: -1 }} transition={{ duration: 0.2 }}>
                        <SwapArrowButton
                          href={`/ventures/${group.slug}`}
                          compact
                          className="h-11 min-h-0 w-full justify-center px-5 text-[13px] uppercase tracking-[0.07em] sm:w-auto"
                        >
                          Explore {group.name}
                        </SwapArrowButton>
                      </motion.div>
                      <motion.div whileHover={reduceMotion ? undefined : { y: -1 }} transition={{ duration: 0.2 }}>
                        <SwapArrowButton
                          href="/contact"
                          compact
                          className="h-11 min-h-0 w-full justify-center border border-borderLight px-5 text-[13px] uppercase tracking-[0.07em] sm:w-auto"
                          backgroundColor="#FFFFFF"
                          backgroundHoverColor="#0A0A0A"
                          textColor="#0A0A0A"
                          textHoverColor="#FFFFFF"
                          fillColor="rgba(10,10,10,0.08)"
                          iconColor="#0A0A0A"
                          iconHoverFill="rgba(255,255,255,0.18)"
                        >
                          Discuss partnership
                        </SwapArrowButton>
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    className="rounded-2xl border border-borderLight bg-white/95 p-5 shadow-[0_10px_34px_rgba(10,10,10,0.06)] sm:p-6"
                    whileHover={reduceMotion ? undefined : { y: -3, boxShadow: "0 16px 38px rgba(10,10,10,0.09)" }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
                        Signature updates
                      </p>
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, x: 6 }}
                        whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
                      >
                        <Image
                          src={group.logoSrc}
                          alt={group.logoAlt}
                          width={150}
                          height={48}
                          className="h-8 w-auto object-contain"
                        />
                      </motion.div>
                    </div>

                    <div className="mt-5 space-y-4">
                      {group.items.map((item) => (
                        <motion.div
                          key={`${group.name}-${item.title}`}
                          className="border-l-2 border-borderLight pl-3"
                          whileHover={reduceMotion ? undefined : { x: 2 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
                            {item.date}
                          </p>
                          <h3 className="mt-1 text-[17px] font-[800] leading-[1.2] text-[#0A0A0A]">
                            {item.title}
                          </h3>
                          <p className="mt-1.5 text-[14px] leading-[1.65] text-secondary">
                            {item.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.article>
            </FadeUp>
          ))}
        </div>

      </div>

      <JoinUsCta
        id="ventures-join-us"
        eyebrow="Ready to build together?"
        heading="Activate a partnership, feature, or program with Youth+ ventures."
        description="We collaborate with operators, media teams, ecosystem builders, and institutions looking to create practical outcomes with Africa's next generation."
        primary={{ href: "/contact", label: "Contact Youth+" }}
        secondary={{
          href: "mailto:support@youthplusafrica.com",
          label: "Email our team",
        }}
        tertiary={{ href: "/partner-with-us", label: "Partner with a venture" }}
        helper="Typical response time: within 48 business hours."
      />
    </section>
  );
}
