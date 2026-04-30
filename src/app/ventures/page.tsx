"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FadeUp } from "@/components/motion/FadeUp";
import { JoinUsCta } from "@/components/site/JoinUsCta";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { VENTURES } from "@/data/ventures";

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
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fffdf6_38%,#ffffff_100%)] pt-20 pb-14 text-[#0A0A0A] sm:pt-24 sm:pb-16 md:pt-32 md:pb-24">
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
            className="relative overflow-hidden rounded-2xl border border-borderLight bg-white/92 p-5 shadow-[0_18px_60px_rgba(10,10,10,0.09)] backdrop-blur-sm sm:p-7 md:p-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E5C222]/70 to-transparent"
            />
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
              <Link
                href="/partner-with-us"
                className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-6 text-[14px] font-[900] text-[#0A0A0A] transition hover:brightness-95"
              >
                Partner with a venture
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-md border border-borderLight bg-white px-6 text-[14px] font-[800] text-[#0A0A0A] transition-colors hover:border-accent"
              >
                Talk to our team
              </Link>
            </motion.div>
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
            {proofStats.map((stat) => (
              <motion.div
                key={stat.label}
                className="border-l-2 border-accent/65 pl-3"
                whileHover={reduceMotion ? undefined : { x: 2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-secondary">
                  {stat.label}
                </p>
                <p className="mt-1 text-[30px] font-[900] leading-none tracking-[-0.03em]">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </FadeUp>

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

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <motion.div whileHover={reduceMotion ? undefined : { y: -1 }} transition={{ duration: 0.2 }}>
                        <Link
                          href={`/ventures/${group.slug}`}
                          className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-[13px] font-[900] uppercase tracking-[0.07em] text-[#0A0A0A] transition hover:brightness-95"
                        >
                          Explore {group.name}
                        </Link>
                      </motion.div>
                      <motion.div whileHover={reduceMotion ? undefined : { y: -1 }} transition={{ duration: 0.2 }}>
                        <Link
                          href="/contact"
                          className="inline-flex h-11 items-center justify-center rounded-md border border-borderLight px-5 text-[13px] font-[800] uppercase tracking-[0.07em] text-[#0A0A0A] transition-colors hover:border-accent"
                        >
                          Discuss partnership
                        </Link>
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
