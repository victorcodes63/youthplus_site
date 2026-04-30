"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type ContactItem = {
  label?: string;
  value: string;
  href?: string;
  icon?: "email" | "location" | "phone";
};

function ContactIcon({ icon }: { icon?: ContactItem["icon"] }) {
  if (icon === "email") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M4 7h16v10H4z M4 8l8 6 8-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (icon === "location") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="11" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  if (icon === "phone") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M6.6 4.5h3l1.1 4-2 1.7a14 14 0 0 0 5.6 5.6l1.7-2 4 1.1v3c0 .6-.4 1-1 1A15.9 15.9 0 0 1 5.6 5.5c0-.6.4-1 1-1z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return <span className="text-[12px]">{(icon ?? "").slice(0, 1).toUpperCase()}</span>;
}

export function BrandedFaqSection({
  eyebrow = "FAQ",
  title,
  description,
  contactItems = [],
  supportPoints = [],
  faqs,
  defaultOpen = 0,
  watermark = "FAQ",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  contactItems?: ContactItem[];
  supportPoints?: string[];
  faqs: FaqItem[];
  defaultOpen?: number;
  watermark?: string;
  className?: string;
}) {
  const [openIdx, setOpenIdx] = useState(defaultOpen);
  const stagedItem = {
    hidden: { opacity: 0, y: 24, scale: 0.985 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className={`relative overflow-visible bg-white py-7 md:py-10 ${className}`}>
      <div className="grid gap-8 lg:grid-cols-[0.52fr_0.48fr] lg:gap-10 items-start lg:gap-x-12">
        <motion.div
          className="relative border-b border-borderLight pb-8 lg:border-b-0 lg:border-r lg:border-borderLight lg:pb-0 lg:pr-10 lg:sticky lg:top-28 lg:self-start"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={stagedItem}
        >
          <p className="pointer-events-none absolute left-0 top-[48%] z-0 -translate-y-1/2 select-none text-[132px] font-[900] leading-none tracking-[-0.05em] text-black/[0.045] md:text-[190px] lg:text-[250px]">
            {watermark}
          </p>
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.38),transparent_52%)]" />

          <div className="relative z-10">
          <p className="text-[11px] font-[800] uppercase tracking-[0.12em] text-accent">
            {eyebrow}
          </p>
          <h3 className="mt-3 max-w-[16ch] text-[30px] font-[900] leading-[1.02] tracking-[-0.04em] text-[#0A0A0A] md:text-[42px]">
            {title}
          </h3>
          <div className="mt-5 border-t border-borderLight" aria-hidden />
          {description ? (
            <p className="mt-5 max-w-[52ch] text-[14px] leading-[1.75] text-secondary md:text-[15px]">
              {description}
            </p>
          ) : null}

          {contactItems.length > 0 ? (
            <div className="mt-6 divide-y divide-borderLight border-t border-borderLight">
              {contactItems.map((item) => (
                <div
                  key={`${item.label}-${item.value}`}
                  className="flex items-center gap-3 py-3.5 first:pt-4"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-accent">
                    <ContactIcon icon={item.icon} />
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-[14px] font-[700] text-[#0A0A0A] hover:text-accent"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[14px] font-[700] text-[#0A0A0A]">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          ) : null}

          {supportPoints.length > 0 ? (
            <div className="mt-6 divide-y divide-borderLight border-t border-borderLight">
              {supportPoints.map((point) => (
                <div key={point} className="flex gap-2 py-3 first:pt-4">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-[14px] leading-[1.65] text-secondary">{point}</span>
                </div>
              ))}
            </div>
          ) : null}
          </div>
        </motion.div>

        <div className="border-t border-borderLight">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.article
                key={item.question}
                className="overflow-hidden border-b border-borderLight bg-transparent last:border-b-0"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.45 }}
                variants={stagedItem}
                transition={{ delay: idx * 0.07 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="flex w-full items-center justify-between gap-4 px-0 py-4 text-left md:py-5"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="min-w-[28px] text-[20px] font-[500] leading-none text-secondary md:min-w-[32px] md:text-[28px]">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="pt-0.5 text-[15px] font-[800] leading-[1.4] tracking-[-0.01em] text-[#0A0A0A] md:text-[18px]">
                      {item.question}
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="text-[16px] text-secondary"
                  >
                    ?
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-borderLight pl-[43px] pr-0 pb-5 pt-4 text-[14px] leading-[1.75] text-secondary md:pl-[48px] md:text-[15px]">
                        {item.answer}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
