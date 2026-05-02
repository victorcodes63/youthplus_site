import { CTA_END_CARD_SWAP_BASE, CTA_END_CARD_SWAP_CLASSNAME } from "@/components/site/ctaEndCardSwapArrow";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";

/**
 * JoinUsCta - design system CTA section.
 *
 * Production rules baked into this component:
 *  - Semantic <section> with aria-labelledby pointing to the heading.
 *  - Actions use SwapArrowButton (pill, white field, black border) for consistency with end-of-page CTAs.
 *  - All colors / spacing / radii come from tokens in globals.css.
 *  - Hover micro-interactions only animate transform + colors + shadow,
 *    never layout (width / height / top / left).
 *  - prefers-reduced-motion is respected via the global stylesheet.
 *
 * Compose it on any page with copy overrides:
 *   <JoinUsCta heading="..." primary={{ href: "/x", label: "..." }} />
 */

export type JoinUsCtaAction = {
  href: string;
  label: string;
  ariaLabel?: string;
};

export type JoinUsCtaProps = {
  /** Used to compose a unique heading id for aria-labelledby. */
  id?: string;
  eyebrow?: string;
  heading?: string;
  description?: string;
  primary?: JoinUsCtaAction | null;
  secondary?: JoinUsCtaAction | null;
  /** Full-width tertiary action under the primary / secondary pair. */
  tertiary?: JoinUsCtaAction | null;
  /** Helper line under the actions, e.g. response-time SLA. */
  helper?: string;
  /** Extra classes for the outer <section> wrapper (e.g. spacing overrides). */
  className?: string;
};

const DEFAULT_PRIMARY: JoinUsCtaAction = {
  href: "/events",
  label: "Join Community",
};

const DEFAULT_SECONDARY: JoinUsCtaAction = {
  href: "/partner-with-us",
  label: "Partner With Us",
};

const DEFAULT_TERTIARY: JoinUsCtaAction = {
  href: "mailto:team@youthplusafrica.com?subject=Invite%20Youth%2B%20Africa%20to%20Speak",
  label: "Invite Us to Speak",
};

const DEFAULT_HELPER = "Typical response time: within 48 business hours.";

export function JoinUsCta({
  id = "join-us-cta",
  eyebrow = "Join Us",
  heading = "Choose your next step with Youth+ Africa.",
  description = "Whether you are a founder, a partner, or a community builder, there is a practical pathway to collaborate with our ecosystem.",
  primary = DEFAULT_PRIMARY,
  secondary = DEFAULT_SECONDARY,
  tertiary = DEFAULT_TERTIARY,
  helper = DEFAULT_HELPER,
  className = "",
}: JoinUsCtaProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className={`page mx-auto max-w-[1440px] py-14 md:py-20 ${className}`.trim()}
    >
      <div className="cta-card">
        <div className="cta-grid">
          <div>
            {eyebrow ? <span className="cta-eyebrow">{eyebrow}</span> : null}
            <h2 id={headingId} className="cta-heading">
              {heading}
            </h2>
            {description ? <p className="cta-description">{description}</p> : null}
          </div>

          <div className="cta-actions">
            {primary ? (
              <SwapArrowButton
                href={primary.href}
                ariaLabel={primary.ariaLabel ?? primary.label}
                {...CTA_END_CARD_SWAP_BASE}
                className={CTA_END_CARD_SWAP_CLASSNAME}
              >
                {primary.label}
              </SwapArrowButton>
            ) : null}

            {secondary ? (
              <SwapArrowButton
                href={secondary.href}
                ariaLabel={secondary.ariaLabel ?? secondary.label}
                {...CTA_END_CARD_SWAP_BASE}
                className={CTA_END_CARD_SWAP_CLASSNAME}
              >
                {secondary.label}
              </SwapArrowButton>
            ) : null}

            {tertiary ? (
              <SwapArrowButton
                href={tertiary.href}
                ariaLabel={tertiary.ariaLabel ?? tertiary.label}
                {...CTA_END_CARD_SWAP_BASE}
                className={`${CTA_END_CARD_SWAP_CLASSNAME} cta-tertiary-button`}
              >
                {tertiary.label}
              </SwapArrowButton>
            ) : null}

            {helper ? <p className="cta-helper">{helper}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
