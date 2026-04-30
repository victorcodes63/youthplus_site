import type { ReactNode } from "react";

type LegalSection = {
  title: string;
  body: string[];
};

type LegalPageTemplateProps = {
  eyebrow: string;
  title: string;
  intro: string;
  effectiveDate: string;
  sections: LegalSection[];
  contactEmail?: string;
  children?: ReactNode;
};

export function LegalPageTemplate({
  eyebrow,
  title,
  intro,
  effectiveDate,
  sections,
  contactEmail = "support@youthplusafrica.com",
  children,
}: LegalPageTemplateProps) {
  return (
    <main className="bg-white text-[#0A0A0A]">
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-24 md:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(229,194,34,0.24)_0%,rgba(229,194,34,0.08)_38%,rgba(255,255,255,0)_72%)]"
        />

        <div className="relative page mx-auto max-w-[980px]">
          <div className="inline-flex items-center rounded-md border border-accent/80 bg-accent/15 px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
            {eyebrow}
          </div>
          <h1 className="mt-5 max-w-[18ch] text-[34px] font-[900] leading-[0.96] tracking-[-0.04em] sm:text-[42px] md:text-[54px]">
            {title}
          </h1>
          <p className="mt-5 max-w-[70ch] text-[15px] leading-[1.8] text-secondary md:text-[17px]">
            {intro}
          </p>
          <p className="mt-4 text-[12px] font-[700] uppercase tracking-[0.08em] text-secondary">
            Effective date: {effectiveDate}
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="page mx-auto max-w-[980px]">
          <div className="space-y-7 md:space-y-9">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-xl border border-borderLight bg-[#FCFCFC] px-5 py-5 shadow-[0_12px_30px_rgba(10,10,10,0.05)] md:px-7 md:py-6"
              >
                <h2 className="text-[22px] font-[900] leading-[1.05] tracking-[-0.02em] text-[#0A0A0A] md:text-[28px]">
                  {section.title}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-[14px] leading-[1.8] text-secondary md:text-[15px]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {children}

          <article className="mt-8 rounded-xl border border-accent/35 bg-accent/10 px-5 py-5 md:px-7 md:py-6">
            <h2 className="text-[18px] font-[900] tracking-[-0.02em] text-[#0A0A0A] md:text-[22px]">
              Questions about this policy?
            </h2>
            <p className="mt-2 text-[14px] leading-[1.8] text-secondary md:text-[15px]">
              For questions, requests, or concerns, contact us at{" "}
              <a href={`mailto:${contactEmail}`} className="font-[700] text-[#0A0A0A] underline decoration-accent">
                {contactEmail}
              </a>
              .
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
