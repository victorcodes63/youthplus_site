"use client";

import { FormEvent, useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";
import { CTA_END_CARD_SWAP_BASE, CTA_END_CARD_SWAP_CLASSNAME } from "@/components/site/ctaEndCardSwapArrow";
import { BrandButton } from "@/components/ui/BrandButton";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";

const ROLE_OPTIONS = ["Facilitator / Trainer", "Mentor", "Volunteer"] as const;

const SPONSORSHIP_OPPORTUNITIES = [
  {
    title: "Connect Series",
    description:
      "Back recurring high-impact sessions that connect youth innovators with mentors, operators, and ecosystem partners.",
    impact: "Monthly spotlight sessions",
  },
  {
    title: "Youth+ Radio",
    description:
      "Sponsor youth voices and practical stories broadcast across digital channels to amplify talent and opportunity.",
    impact: "Storytelling at scale",
  },
  {
    title: "Youth Plus Festival",
    description:
      "Power flagship experiences that convene founders, creatives, and builders through bold programming and partnerships.",
    impact: "Flagship annual platform",
  },
] as const;

const SPONSORSHIP_TIERS = [
  {
    name: "Community",
    focus: "Consistent grassroots visibility",
    benefits: ["Logo placement on selected sessions", "Community newsletter mention", "Social media feature slots"],
  },
  {
    name: "Growth",
    focus: "Campaign-level collaboration and reach",
    benefits: ["Everything in Community", "Co-branded workshop activation", "Speaking or panel participation"],
  },
  {
    name: "Headline",
    focus: "Flagship positioning and strategic integration",
    benefits: ["Everything in Growth", "Flagship event branding prominence", "Custom partnership storytelling rollout"],
  },
] as const;

export default function PartnerWithUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");
  const [selectedRole, setSelectedRole] =
    useState<(typeof ROLE_OPTIONS)[number]>("Facilitator / Trainer");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    setSubmitStatus("success");
    setTimeout(() => setSubmitStatus("idle"), 3500);
    event.currentTarget.reset();
    setSelectedRole("Facilitator / Trainer");
  };

  return (
    <section className="bg-white pt-20 pb-14 text-black sm:pt-24 sm:pb-16 md:pt-32 md:pb-24">
      <div className="page mx-auto max-w-[1440px]">
        <FadeUp>
          <div className="inline-flex items-center rounded-md border border-accent px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-[#0A0A0A]">
            Partner with us
          </div>
          <h1 className="mt-5 text-[34px] md:text-[52px] leading-[0.95] tracking-[-0.04em] font-[900] text-[#0A0A0A] max-w-[16ch]">
            Build impact with the Youth+ Africa community.
          </h1>
          <p className="mt-4 text-[15px] md:text-[17px] text-secondary max-w-[64ch] leading-[1.7]">
            Collaborate as a facilitator, mentor, volunteer, or sponsor and help
            shape opportunities for Africa&apos;s next generation of innovators.
          </p>
        </FadeUp>

        <div className="mt-10 grid gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,1fr)] lg:items-start lg:gap-x-10 xl:gap-x-14">
          <FadeUp>
            <form
              onSubmit={handleSubmit}
              className="rounded-md border border-borderLight bg-white p-4 sm:p-6 md:p-8 shadow-[0_10px_35px_rgba(10,10,10,0.05)]"
            >
              <div>
                <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                  Partnership role *
                </label>
                <div className="flex flex-wrap gap-2">
                  {ROLE_OPTIONS.map((role) => {
                    const active = selectedRole === role;
                    return (
                      <label
                        key={role}
                        className={`inline-flex cursor-pointer items-center rounded-md border px-3 py-2 text-[12px] font-[800] uppercase tracking-[0.06em] transition-colors ${
                          active
                            ? "border-accent bg-accent/10 text-[#0A0A0A]"
                            : "border-borderLight text-secondary hover:border-accent/70"
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={role}
                          checked={active}
                          onChange={() => setSelectedRole(role)}
                          className="sr-only"
                        />
                        {role}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                    Full name *
                  </label>
                  <input
                    name="name"
                    required
                    className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm text-black focus:border-[#0A0A0A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm text-black focus:border-[#0A0A0A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                  Phone *
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm text-black focus:border-[#0A0A0A] focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                  Area of expertise *
                </label>
                <input
                  name="expertise"
                  required
                  placeholder="e.g. Product design, entrepreneurship, digital skills"
                  className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm text-black placeholder:text-black/35 focus:border-[#0A0A0A] focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                  Availability *
                </label>
                <input
                  name="availability"
                  required
                  placeholder="e.g. Weeknights, weekends, 2 sessions/month"
                  className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm text-black placeholder:text-black/35 focus:border-[#0A0A0A] focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                  Portfolio or profile link
                </label>
                <input
                  name="portfolio"
                  type="url"
                  placeholder="https://"
                  className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm text-black placeholder:text-black/35 focus:border-[#0A0A0A] focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell us how you would like to contribute."
                  className="w-full resize-none rounded-md border border-black/10 px-3 py-2.5 text-sm text-black placeholder:text-black/35 focus:border-[#0A0A0A] focus:outline-none"
                />
              </div>

              <div className="mt-5 space-y-4">
                {submitStatus === "success" && (
                  <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                    Partnership form submitted successfully. We&apos;ll reach out
                    shortly.
                  </div>
                )}

                <BrandButton
                  type="submit"
                  disabled={isSubmitting}
                  variant="gold"
                  fullWidth
                  className="sm:w-auto"
                >
                  {isSubmitting ? "Submitting..." : "Submit partnership form"}
                </BrandButton>
              </div>
            </form>
          </FadeUp>

          <div className="flex w-full flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
            <FadeUp>
              <div className="rounded-md border border-borderLight bg-white p-5 sm:p-6 md:p-7">
                <p className="text-[11px] uppercase tracking-[0.1em] text-accent font-[800]">
                  Sponsorship opportunities
                </p>
                <h2 className="mt-2 text-[22px] md:text-[26px] leading-[1.05] tracking-[-0.02em] font-[900] text-[#0A0A0A]">
                  Sponsor events that move youth forward.
                </h2>
                <p className="mt-3 text-[14px] leading-[1.7] text-secondary">
                  Choose a flagship initiative to support and partner with us on
                  measurable impact.
                </p>

                <div className="mt-6 space-y-3">
                  {SPONSORSHIP_OPPORTUNITIES.map((item) => (
                    <article
                      key={item.title}
                      className="rounded-md border border-borderLight bg-white p-4"
                    >
                      <div className="inline-flex items-center rounded-md border border-accent px-2.5 py-1 text-[10px] font-[800] uppercase tracking-[0.08em] text-[#0A0A0A]">
                        {item.impact}
                      </div>
                      <h3 className="mt-2 text-[18px] leading-[1.1] tracking-[-0.02em] font-[900] text-[#0A0A0A]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.65] text-secondary">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        <FadeUp delayMs={120}>
          <section className="mt-12 border-t border-borderLight pt-10 md:mt-14 md:pt-12">
            <div className="inline-flex items-center rounded-md border border-accent/80 bg-accent/15 px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">
              Sponsorship tiers
            </div>
            <h2 className="mt-4 max-w-[18ch] text-[30px] font-[900] leading-[1.02] tracking-[-0.035em] md:text-[44px]">
              Choose the partnership depth that matches your goals.
            </h2>
            <p className="mt-3 max-w-[64ch] text-[14px] leading-[1.75] text-secondary md:text-[16px]">
              Indicative benefits to help your team evaluate collaboration scope across Youth+ programs.
            </p>

            <div className="mt-8 grid auto-rows-fr gap-4 md:grid-cols-3">
              {SPONSORSHIP_TIERS.map((tier) => (
                <article
                  key={tier.name}
                  className="flex h-full min-h-0 flex-col rounded-md border border-borderLight bg-white p-5 shadow-[0_10px_35px_rgba(10,10,10,0.05)]"
                >
                  <p className="text-[11px] font-[800] uppercase tracking-[0.1em] text-accent">{tier.name}</p>
                  <p className="mt-2 min-h-[2.75rem] text-[20px] font-[900] leading-[1.15] tracking-[-0.02em] text-[#0A0A0A] md:min-h-[3.25rem]">
                    {tier.focus}
                  </p>
                  <ul className="mt-4 flex-1 space-y-2.5 border-t border-borderLight pt-4">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-2 text-[14px] leading-[1.6] text-secondary">
                        <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <SwapArrowButton
                      href="/contact"
                      ariaLabel={`Request ${tier.name} sponsorship package`}
                      {...CTA_END_CARD_SWAP_BASE}
                      className={`${CTA_END_CARD_SWAP_CLASSNAME} text-[12px] font-[800] uppercase tracking-[0.08em]`}
                    >
                      Request package
                    </SwapArrowButton>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </FadeUp>
      </div>
    </section>
  );
}
