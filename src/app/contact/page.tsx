"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FadeUp } from "@/components/motion/FadeUp";
import { ScrollJackSection } from "@/components/motion/ScrollJackSection";
import { BrandedFaqSection } from "@/components/site/BrandedFaqSection";
import { PartnerLogoMarquee } from "@/components/site/PartnerLogoMarquee";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";
import { SPEAKERS } from "@/components/home/SpeakersCarousel";

const faqs = [
  {
    question: "How quickly do you respond to inquiries?",
    answer:
      "We typically reply within one business day. For urgent event deadlines, mention your target date in the message.",
  },
  {
    question: "Can you support both one-off events and recurring flagship festivals?",
    answer:
      "Yes. We support single events, annual festivals, and multi-event calendars with reusable workflows and branded pages.",
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
const testimonialQuotes = [
  "Youth+ helped us design a high-signal founder session that converted into real partnerships within weeks.",
  "Practical, fast, and collaborative — we shipped a strong festival format without execution friction.",
  "From planning to delivery, Youth+ gave us the structure to engage talent and sustain momentum after the room ended.",
];

const testimonials = [0, 1, 2].map((speakerIdx, i) => {
  const s = SPEAKERS[speakerIdx];
  return {
    quote: testimonialQuotes[i],
    name: s.name,
    role: s.title,
    company: s.company,
    image: s.image,
  };
});

export default function ContactPage() {
  const reduceMotion = useReducedMotion();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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
  const formInputClassName =
    "h-11 w-full min-w-0 border-0 border-b border-black/20 bg-transparent px-0 py-0 text-[16px] tracking-[-0.01em] text-black transition placeholder:text-[16px] placeholder:text-black/30 focus:border-[#0A0A0A] focus:outline-none md:h-12 md:text-[18px] md:placeholder:text-[18px]";
  const formLabelClassName = "mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    setSubmitStatus("success");
    setTimeout(() => setSubmitStatus("idle"), 3500);
    e.currentTarget.reset();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 5200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-w-0 overflow-x-clip">
      <ScrollJackSection
        className="relative w-full min-w-0 overflow-hidden bg-[linear-gradient(180deg,#0A0A0A_0px,#0A0A0A_220px,#f2f2f2_390px,#ffffff_540px,#ffffff_100%)] pb-12 pt-6 text-black sm:pb-16 sm:pt-8 md:pb-24 md:pt-12"
        intensity={1.05}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(10,10,10,0.42),transparent_40%),radial-gradient(circle_at_50%_12%,rgba(229,194,34,0.18),transparent_36%)]"
        />
        <div className="page mx-auto w-full min-w-0 max-w-[1440px]">
          <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-[#0A0A0A] px-4 py-6 text-white shadow-[0_18px_50px_rgba(10,10,10,0.2)] sm:px-5 sm:py-7 md:px-9 md:py-10">
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
              className="relative ml-auto max-w-[21rem] text-left sm:max-w-[24rem] md:max-w-[34rem]"
            >
              <motion.div
                variants={heroEnterBadge}
                className="relative inline-flex items-center rounded-md border border-accent/75 bg-black/35 px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent"
              >
                Contact
              </motion.div>
              <motion.h1
                variants={heroEnterLine}
                className="relative mt-4 max-w-[12ch] text-[28px] font-[900] leading-[0.98] tracking-[-0.03em] text-white sm:max-w-[13ch] sm:text-[34px] md:max-w-[15ch] md:text-[60px]"
              >
                Let&apos;s design your next high-impact experience.
              </motion.h1>
              <motion.p
                variants={heroEnterBody}
                className="relative mt-3.5 max-w-[34rem] text-[13px] leading-[1.68] text-white/82 sm:mt-4 sm:text-[15px] md:text-[18px]"
              >
                Share your goals, timeline, and audience. We&apos;ll return a clear
                execution plan for events, festivals, and strategic ecosystem work.
              </motion.p>
              <motion.div variants={heroChipOrchestra} className="relative mt-5 flex flex-wrap gap-2 sm:mt-7 sm:gap-2.5">
                {["48h response", "Nairobi HQ", "Pan-African execution"].map((item) => (
                  <motion.span
                    key={item}
                    variants={heroEnterChip}
                    className="inline-flex items-center rounded-md border border-white/20 bg-white/5 px-2.5 py-1.5 text-[10px] font-[700] text-white/88 sm:px-3 sm:text-[12px]"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <div className="relative mt-6 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_8px_30px_rgba(10,10,10,0.06)] sm:mt-7 sm:p-5 md:mt-9 md:p-7 lg:p-8">
            <div className="grid w-full min-w-0 gap-7 sm:gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,1fr)] lg:items-start lg:gap-x-10 xl:gap-x-14">
            <FadeUp>
              <form
                onSubmit={handleSubmit}
                className="min-w-0"
              >
                <div className="mb-4 sm:mb-5">
                  <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
                    Project inquiry
                  </p>
                  <h2 className="mt-2 text-[24px] font-[900] leading-[1.03] tracking-[-0.03em] text-[#0A0A0A] sm:text-[27px] md:text-[34px]">
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
                  className="min-w-0 space-y-3 sm:space-y-3.5"
                >
                  <div className="min-w-0 grid gap-3 md:grid-cols-2 md:gap-4">
                    <motion.div
                      variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                    >
                      <div>
                        <label className={formLabelClassName}>
                          Full name *
                        </label>
                        <input
                          name="name"
                          required
                          className={formInputClassName}
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                    >
                      <div>
                        <label className={formLabelClassName}>
                          Email *
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          className={formInputClassName}
                        />
                      </div>
                    </motion.div>
                  </div>

                  <div className="min-w-0 grid gap-3 md:grid-cols-2 md:gap-4">
                    <motion.div
                      variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                    >
                      <div>
                        <label className={formLabelClassName}>
                          Company *
                        </label>
                        <input
                          name="company"
                          required
                          className={formInputClassName}
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                    >
                      <div>
                        <label className={formLabelClassName}>
                          Timeline
                        </label>
                        <input
                          name="timeline"
                          placeholder="e.g. Launching in 6 weeks"
                          className={formInputClassName}
                        />
                      </div>
                    </motion.div>
                  </div>

                  <div>
                    <label className={formLabelClassName}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us your goals and success metrics."
                      className="min-h-[104px] w-full min-w-0 max-w-full resize-none border-0 border-b border-black/20 bg-transparent px-0 py-2 pr-2 text-[16px] leading-[1.4] tracking-[-0.01em] text-black transition placeholder:text-[16px] placeholder:leading-[1.4] placeholder:text-black/30 focus:border-[#0A0A0A] focus:outline-none md:min-h-[132px] md:text-[18px] md:placeholder:text-[18px]"
                    />
                  </div>

                  <p className="text-[10px] leading-relaxed text-black/50 sm:text-[11px]">
                    We use this information to respond to your inquiry. Please
                    review our{" "}
                    <Link
                      href="/privacy"
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

                  <SwapArrowButton
                    submit
                    disabled={isSubmitting}
                    compact
                    className="w-full min-h-[48px] justify-center rounded-full sm:w-auto sm:min-h-[44px]"
                    hoverTextClassName="hover:text-white"
                    hoverBgClassName="hover:bg-[#0A0A0A]"
                  >
                    {isSubmitting ? "Sending…" : "Contact us"}
                  </SwapArrowButton>
                </motion.div>
              </form>
            </FadeUp>

            <div className="flex w-full min-w-0 flex-col gap-7 lg:sticky lg:top-28 lg:self-start lg:border-l lg:border-black/10 lg:pl-8 xl:pl-10">
              <FadeUp>
                <div className="min-w-0 px-1 py-1 sm:px-2 md:px-0">
                  <p className="text-[11px] uppercase tracking-[0.1em] text-accent font-[800]">
                    Contact details
                  </p>
                  <h3 className="mt-2 text-[20px] sm:text-[22px] md:text-[26px] leading-[1.06] tracking-[-0.02em] font-[900] text-[#0A0A0A]">
                    Reach us directly.
                  </h3>
                  <p className="mt-3 max-w-full break-words text-[14px] leading-[1.7] text-secondary">
                    If your festival launch is time-sensitive, share your timeline
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

                  </div>
                </div>
              </FadeUp>
            </div>
            </div>
          </div>
        </div>
      </ScrollJackSection>

      <section className="relative w-full min-w-0 bg-white py-12 md:py-20">
        <SectionDivider contentWidth className="absolute top-0 bg-black/[0.06]" />
        <div className="page mx-auto w-full min-w-0 max-w-[1440px] pt-6 md:pt-10">
          <p className="inline-flex rounded-full border border-accent px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.14em] text-accent">
            Trust signals
          </p>
          <h2 className="mt-5 max-w-[20ch] text-h1 text-primary md:max-w-[24ch]">
            Built with leading ecosystem collaborators.
          </h2>

          <PartnerLogoMarquee
            label="Partners"
            variant="card"
            logoTone="color"
            durationSec={42}
            frameStyle="none"
            className="mt-8 w-full min-w-0 md:mt-10"
          />

          <div className="mt-10 md:mt-14">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={testimonials[activeTestimonial].name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                className="max-w-none font-[family-name:var(--font-body)] text-[clamp(1.35rem,3.2vw,2.125rem)] font-[500] leading-[1.38] tracking-[-0.02em] text-[#0A0A0A] md:leading-[1.42] md:tracking-[-0.025em]"
              >
                &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-8 flex flex-col gap-6 sm:mt-10 md:flex-row md:items-center md:gap-10 lg:gap-14">
              <div className="flex shrink-0 flex-col gap-3.5">
                <div className="flex items-center pl-0.5">
                  {testimonials.map((item, idx) => {
                    const isActive = idx === activeTestimonial;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setActiveTestimonial(idx)}
                        aria-current={isActive ? "true" : undefined}
                        aria-label={`Show quote from ${item.name}`}
                        style={{ zIndex: isActive ? 30 : 10 + idx }}
                        className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-white bg-borderLight shadow-[0_2px_8px_rgba(10,10,10,0.08)] outline-none transition-all md:h-[52px] md:w-[52px] ${
                          idx > 0 ? "-ml-3 md:-ml-3.5" : ""
                        } ${
                          isActive
                            ? "scale-[1.04] ring-2 ring-accent ring-offset-2 ring-offset-white"
                            : "opacity-90 hover:opacity-100"
                        } `}
                      >
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="52px"
                          className="object-cover object-top"
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-1.5 pl-0.5">
                  {testimonials.map((item, idx) => (
                    <button
                      key={`bar-${item.name}`}
                      type="button"
                      onClick={() => setActiveTestimonial(idx)}
                      aria-label={`Show quote from ${item.name}`}
                      className={`h-[3px] rounded-sm transition-all duration-300 ${
                        idx === activeTestimonial
                          ? "w-11 bg-accent"
                          : "w-9 bg-borderLight hover:bg-black/12"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="min-w-0 max-w-none text-[14px] leading-[1.65] text-secondary md:text-[15px] md:leading-[1.7]">
                <span className="font-[900] text-[#0A0A0A]">{testimonials[activeTestimonial].name}</span>
                <span>
                  {" "}
                  · {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full min-w-0 overflow-x-clip" aria-label="Office location map">
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

      <ScrollJackSection className="relative w-full min-w-0 overflow-x-clip bg-white py-16 md:py-20" intensity={0.9}>
        <SectionDivider contentWidth className="absolute top-0 bg-black/[0.06]" />
        <div className="page mx-auto w-full min-w-0 max-w-[1440px] pt-6 md:pt-8">
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
    </div>
  );
}

