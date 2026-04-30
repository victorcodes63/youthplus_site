"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeUp } from "@/components/motion/FadeUp";
import { ScrollJackSection } from "@/components/motion/ScrollJackSection";
import { BrandedFaqSection } from "@/components/site/BrandedFaqSection";
import { PartnerLogoMarquee } from "@/components/site/PartnerLogoMarquee";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { BrandButton } from "@/components/ui/BrandButton";

const faqs = [
  {
    question: "How quickly do you respond to inquiries?",
    answer:
      "We typically reply within one business day. For urgent event deadlines, mention your target date in the message.",
  },
  {
    question: "Can you support both one-off events and recurring summits?",
    answer:
      "Yes. We support single events, annual summits, and multi-event calendars with reusable workflows and branded pages.",
  },
  {
    question: "Do you provide payment and ticketing setup?",
    answer:
      "Yes. We can configure secure checkout, ticket tiers, confirmation flows, and attendee tracking for your team.",
  },
  {
    question: "Can we start small and scale later?",
    answer:
      "Absolutely. We can launch a focused MVP quickly, then expand to speakers, sponsors, check-ins, and deeper automation over time.",
  },
];
const CONTACT_HERO_IMAGE = "/images/contact-hero-stage.png";

export default function ContactPage() {
  const reduceMotion = useReducedMotion();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");
  const heroEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const heroOrchestra = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };
  const heroEnterBadge = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 10, scale: reduceMotion ? 1 : 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: reduceMotion ? 0 : 0.48, ease: heroEase } },
  };
  const heroEnterLine = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 14 },
    visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.56, ease: heroEase } },
  };
  const heroEnterBody = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.64, ease: heroEase } },
  };
  const heroChipOrchestra = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.06,
        delayChildren: reduceMotion ? 0 : 0.04,
      },
    },
  };
  const heroEnterChip = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 10, scale: reduceMotion ? 1 : 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: reduceMotion ? 0 : 0.42, ease: heroEase } },
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    setSubmitStatus("success");
    setTimeout(() => setSubmitStatus("idle"), 3500);
    e.currentTarget.reset();
  };

  return (
    <>
      <ScrollJackSection
        className="relative overflow-hidden bg-[linear-gradient(180deg,#0A0A0A_0px,#0A0A0A_250px,#f2f2f2_420px,#ffffff_560px,#ffffff_100%)] pb-14 pt-8 text-black sm:pb-16 sm:pt-10 md:pb-24 md:pt-12"
        intensity={1.05}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(10,10,10,0.42),transparent_40%),radial-gradient(circle_at_50%_12%,rgba(229,194,34,0.18),transparent_36%)]"
        />
        <div className="page mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-[#0A0A0A] px-6 py-8 text-white shadow-[0_18px_50px_rgba(10,10,10,0.2)] md:px-9 md:py-10">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <Image
                src={CONTACT_HERO_IMAGE}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 1440px"
                className="object-cover object-[center_18%]"
                priority
              />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(104deg,rgba(10,10,10,0.84)_0%,rgba(10,10,10,0.72)_44%,rgba(10,10,10,0.9)_100%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_86%,rgba(229,194,34,0.24),transparent_44%)]"
            />
            <motion.div
              variants={heroOrchestra}
              initial="hidden"
              animate="visible"
              className="relative md:ml-auto md:max-w-[34rem] md:text-left"
            >
              <motion.div
                variants={heroEnterBadge}
                className="relative inline-flex items-center rounded-md border border-accent/75 bg-black/35 px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent"
              >
                Contact
              </motion.div>
              <motion.h1
                variants={heroEnterLine}
                className="relative mt-5 max-w-[15ch] text-[36px] font-[900] leading-[0.93] tracking-[-0.045em] text-white md:text-[60px]"
              >
                Let&apos;s design your next high-impact experience.
              </motion.h1>
              <motion.p
                variants={heroEnterBody}
                className="relative mt-4 max-w-[34rem] text-[15px] leading-[1.75] text-white/82 md:text-[18px]"
              >
                Share your goals, timeline, and audience. We&apos;ll return a clear
                execution plan for events, summits, and strategic ecosystem work.
              </motion.p>
              <motion.div variants={heroChipOrchestra} className="relative mt-7 flex flex-wrap gap-2.5">
                {["48h response", "Nairobi HQ", "Pan-African execution"].map((item) => (
                  <motion.span
                    key={item}
                    variants={heroEnterChip}
                    className="inline-flex items-center rounded-md border border-white/20 bg-white/5 px-3 py-1.5 text-[12px] font-[700] text-white/88"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <div className="relative mt-9 grid gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,1fr)] lg:items-start lg:gap-x-10 xl:gap-x-14">
            <FadeUp>
              <form
                onSubmit={handleSubmit}
                className="px-1 py-1 sm:px-2 md:px-0"
              >
                <div className="mb-5">
                  <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
                    Project inquiry
                  </p>
                  <h2 className="mt-2 text-[28px] font-[900] leading-[1.02] tracking-[-0.03em] text-[#0A0A0A] md:text-[34px]">
                    Tell us what you&apos;re building.
                  </h2>
                </div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } },
                  }}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <motion.div
                      variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                    >
                      <div>
                        <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                          Full name *
                        </label>
                        <input
                          name="name"
                          required
                          className="w-full border-0 border-b border-black/15 bg-transparent px-0 py-2.5 text-[20px] tracking-[-0.01em] text-black transition placeholder:text-black/30 focus:border-[#0A0A0A] focus:outline-none"
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                    >
                      <div>
                        <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                          Email *
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          className="w-full border-0 border-b border-black/15 bg-transparent px-0 py-2.5 text-[20px] tracking-[-0.01em] text-black transition placeholder:text-black/30 focus:border-[#0A0A0A] focus:outline-none"
                        />
                      </div>
                    </motion.div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <motion.div
                      variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                    >
                      <div>
                        <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                          Company *
                        </label>
                        <input
                          name="company"
                          required
                          className="w-full border-0 border-b border-black/15 bg-transparent px-0 py-2.5 text-[20px] tracking-[-0.01em] text-black transition placeholder:text-black/30 focus:border-[#0A0A0A] focus:outline-none"
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                    >
                      <div>
                        <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                          Timeline
                        </label>
                        <input
                          name="timeline"
                          placeholder="e.g. Launching in 6 weeks"
                          className="w-full border-0 border-b border-black/15 bg-transparent px-0 py-2.5 text-[20px] tracking-[-0.01em] text-black transition placeholder:text-black/30 focus:border-[#0A0A0A] focus:outline-none"
                        />
                      </div>
                    </motion.div>
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={6}
                      required
                      placeholder="Tell us your objective, audience size, and what success should look like."
                      className="w-full resize-none border-0 border-b border-black/15 bg-transparent px-0 py-2.5 text-[20px] tracking-[-0.01em] text-black transition placeholder:text-black/30 focus:border-[#0A0A0A] focus:outline-none"
                    />
                  </div>

                  <p className="text-[11px] leading-relaxed text-black/45">
                    We use this information to respond to your inquiry. Please
                    review our{" "}
                    <Link
                      href="/offline"
                      className="underline decoration-black/25 underline-offset-2 hover:text-black"
                    >
                      privacy policy
                    </Link>
                    .
                  </p>

                  {submitStatus === "success" && (
                    <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                      Message sent successfully. We will get back to you soon.
                    </div>
                  )}

                  <BrandButton
                    type="submit"
                    disabled={isSubmitting}
                    variant="dark"
                    fullWidth
                    className="sm:w-auto"
                  >
                    {isSubmitting ? "Sending..." : "Contact us"}
                  </BrandButton>
                </motion.div>
              </form>
            </FadeUp>

            <div className="flex w-full flex-col gap-8 lg:sticky lg:top-28 lg:self-start lg:border-l lg:border-black/10 lg:pl-8 xl:pl-10">
              <FadeUp>
                <div className="px-1 py-1 sm:px-2 md:px-0">
                  <p className="text-[11px] uppercase tracking-[0.1em] text-accent font-[800]">
                    Contact details
                  </p>
                  <h3 className="mt-2 text-[22px] md:text-[26px] leading-[1.05] tracking-[-0.02em] font-[900] text-[#0A0A0A]">
                    Reach us directly.
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-secondary">
                    If your summit launch is time-sensitive, share your timeline
                    in the form and we will prioritize your request.
                  </p>

                  <div className="mt-6 border-t border-black/10">
                    <div className="py-4 border-b border-black/10">
                      <div className="text-[11px] uppercase tracking-[0.08em] text-black/45 font-[700]">
                        Office
                      </div>
                      <div className="mt-1 text-[15px] text-[#0A0A0A]">
                        Kofisi, 8th floor, Riverside Drive, Nairobi
                      </div>
                    </div>

                    <div className="py-4 border-b border-black/10">
                      <div className="text-[11px] uppercase tracking-[0.08em] text-black/45 font-[700]">
                        Email
                      </div>
                      <a
                        href="mailto:support@youthplusafrica.com"
                        className="mt-1 block break-all text-[15px] text-[#0A0A0A] hover:underline underline-offset-4"
                      >
                        support@youthplusafrica.com
                      </a>
                    </div>

                    <div className="py-4">
                      <div className="text-[11px] uppercase tracking-[0.08em] text-black/45 font-[700]">
                        Phone
                      </div>
                      <a
                        href="tel:+254700000000"
                        className="mt-1 block text-[15px] text-[#0A0A0A] hover:underline underline-offset-4"
                      >
                        +254 700 000 000
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delayMs={90}>
                <div className="px-1 py-1 sm:px-2 md:px-0">
                  <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
                    Partners
                  </p>
                  <h4 className="mt-2 text-[20px] font-[900] leading-[1.15] text-[#0A0A0A]">
                    Trusted by ecosystem leaders.
                  </h4>
                  <PartnerLogoMarquee
                    label=""
                    variant="card"
                    logoTone="gold"
                    durationSec={42}
                    frameStyle="none"
                    className="w-full pt-4"
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </ScrollJackSection>

      <section className="relative w-full" aria-label="Office location map">
        <SectionDivider contentWidth className="absolute top-0 bg-black/[0.06]" />
        <FadeUp className="pt-6 md:pt-8">
          <iframe
            title="Youth+ Africa Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8391905849458!2d36.78953771254366!3d-1.2693753987132095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17392b8c42c9%3A0x5d47d022b01143cb!2sKOFISI%20Riverside!5e0!3m2!1sen!2ske!4v1775021226048!5m2!1sen!2ske"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[260px] w-full min-w-0 border-0 sm:h-[320px] md:h-[380px]"
          />
        </FadeUp>
      </section>

      <ScrollJackSection className="relative bg-white py-16 md:py-20" intensity={0.9}>
        <SectionDivider contentWidth className="absolute top-0 bg-black/[0.06]" />
        <div className="page mx-auto max-w-[1440px] pt-6 md:pt-8">
          <BrandedFaqSection
            eyebrow="FAQ"
            title="Questions & Answers"
            description="Have more questions? Reach out directly and we will guide your next move."
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
            faqs={faqs}
            defaultOpen={0}
            watermark="FAQ"
          />
        </div>
      </ScrollJackSection>
    </>
  );
}

