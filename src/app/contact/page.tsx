"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { FadeUp } from "@/components/motion/FadeUp";

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

export default function ContactPage() {
  const introRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start end", "end start"],
  });
  const introY = useTransform(introProgress, [0, 1], [22, -22]);
  const introOpacity = useTransform(introProgress, [0, 0.2, 1], [0.86, 1, 0.92]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");
  const [openFaq, setOpenFaq] = useState<number>(0);

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
      <section className="bg-white pt-24 pb-16 text-black sm:pt-28 sm:pb-20 md:pt-32 md:pb-24">
        <div className="page mx-auto max-w-[1440px]">
          <motion.div
            ref={introRef}
            style={{ y: introY, opacity: introOpacity }}
            className="mb-10 md:mb-12"
          >
            <FadeUp>
              <div className="inline-flex items-center rounded-md border border-accent px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-[#0A0A0A]">
                Contact
              </div>
              <h1 className="mt-5 text-[34px] md:text-[52px] leading-[0.95] tracking-[-0.04em] font-[900] text-[#0A0A0A] max-w-[16ch]">
                Let&apos;s plan your next summit with confidence.
              </h1>
              <p className="mt-4 text-[15px] md:text-[17px] text-secondary max-w-[62ch] leading-[1.7]">
                Tell us what you are building and we will come back with the right
                approach, timeline, and execution support.
              </p>
            </FadeUp>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,1fr)] lg:items-start lg:gap-x-10 xl:gap-x-14">
            <FadeUp>
              <form
                onSubmit={handleSubmit}
                className="rounded-md border border-borderLight bg-white p-6 md:p-8 shadow-[0_10px_35px_rgba(10,10,10,0.05)]"
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.06, delayChildren: 0.04 },
                    },
                  }}
                  className="space-y-4"
                >
                <div className="grid gap-4 sm:grid-cols-2">
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                  <div>
                    <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                      Full name *
                    </label>
                    <input
                      name="name"
                      required
                      className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm text-black focus:outline-none focus:border-[#0A0A0A]"
                    />
                  </div>
                  </motion.div>
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                  <div>
                    <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm text-black focus:outline-none focus:border-[#0A0A0A]"
                    />
                  </div>
                  </motion.div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                  <div>
                    <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                      Phone number *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm text-black focus:outline-none focus:border-[#0A0A0A]"
                    />
                  </div>
                  </motion.div>
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                  <div>
                    <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                      Company *
                    </label>
                    <input
                      name="company"
                      required
                      className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm text-black focus:outline-none focus:border-[#0A0A0A]"
                    />
                  </div>
                  </motion.div>
                </div>

                <motion.div
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="mt-4"
                >
                  <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    required
                    className="w-full resize-none rounded-md border border-black/10 px-3 py-2.5 text-sm text-black focus:outline-none focus:border-[#0A0A0A]"
                  />
                </motion.div>

                <motion.div
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="mt-5 space-y-4"
                >
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

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-6 text-sm font-[900] text-[#0A0A0A] hover:brightness-95 disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending..." : "Contact us"}
                  </button>
                </motion.div>
                </motion.div>
              </form>
            </FadeUp>

            <div className="flex w-full flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
              <FadeUp>
                <div className="rounded-md border border-borderLight bg-white p-6 md:p-7">
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

                  <div className="mt-6 space-y-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.08em] text-black/45 font-[700]">
                        Office
                      </div>
                      <div className="mt-1 text-[15px] text-[#0A0A0A]">
                        Riverside Drive, Riverside, Nairobi
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] uppercase tracking-[0.08em] text-black/45 font-[700]">
                        Email
                      </div>
                      <a
                        href="mailto:hello@youthplus.africa"
                        className="mt-1 block text-[15px] text-[#0A0A0A] hover:underline underline-offset-4"
                      >
                        hello@youthplus.africa
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-t border-black/[0.06]" aria-label="Office location map">
        <FadeUp>
          <iframe
            title="Youth+ Africa Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7502698094445!2d36.71317077562177!3d-1.32576533567189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1b6b19ae187f%3A0x15fef8fbdad8d88!2sYouth%20Plus%20Africa!5e0!3m2!1sen!2ske!4v1774952759016!5m2!1sen!2ske"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[260px] w-full min-w-0 border-0 sm:h-[320px] md:h-[380px]"
          />
        </FadeUp>
      </section>

      <section className="bg-white py-16 md:py-20 border-t border-black/[0.06]">
        <div className="page mx-auto max-w-[1100px]">
          <FadeUp>
            <div className="mb-8 md:mb-10">
              <div className="inline-flex items-center rounded-md border border-accent px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-[#0A0A0A]">
                FAQ
              </div>
              <h2 className="mt-4 text-[30px] md:text-[42px] leading-[1.02] tracking-[-0.04em] font-[900] text-[#0A0A0A]">
                Common questions before we begin.
              </h2>
            </div>
          </FadeUp>

          <div className="space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <FadeUp key={item.question} delayMs={idx * 60}>
                  <article className="rounded-md border border-borderLight bg-white">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[16px] md:text-[18px] font-[800] tracking-[-0.01em] text-[#0A0A0A]">
                        {item.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="text-[18px] font-[700] text-[#0A0A0A]"
                      >
                        +
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-[14px] md:text-[15px] leading-[1.7] text-secondary">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

