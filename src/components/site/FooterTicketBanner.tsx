import {
  CTA_END_CARD_SWAP_BASE,
  CTA_END_CARD_SWAP_CLASSNAME_CORE,
} from "@/components/site/ctaEndCardSwapArrow";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";

/**
 * FooterTicketBanner - design system festival ticket announcement.
 *
 * Sits at the top of the SiteFooter as a compact, dark surface CTA.
 * - Semantic <aside> with aria-label.
 * - Single primary action matches JoinUsCta / end-card SwapArrow outline pill.
 * - All values reference tokens defined in globals.css.
 */

export type FooterTicketBannerProps = {
  eyebrow?: string;
  heading?: string;
  cta?: {
    href: string;
    label: string;
    /** When true, opens in a new tab and uses the external-link icon affordance. */
    external?: boolean;
    ariaLabel?: string;
  };
  className?: string;
};

export function FooterTicketBanner({
  eyebrow = "Youth Plus Festival 2026",
  heading = "Youth Plus Festival 2026 Ticket Sales Are Live",
  cta = { href: "/events", label: "Reserve Tickets" },
  className = "",
}: FooterTicketBannerProps) {
  return (
    <aside
      aria-label={`${eyebrow}: ${heading}`}
      className={`ticket-banner ${className}`.trim()}
    >
      <span aria-hidden="true" className="ticket-banner__top-line" />

      <div className="ticket-banner__copy">
        <span className="ticket-banner__eyebrow">{eyebrow}</span>
        <p className="ticket-banner__heading">{heading}</p>
      </div>

      <SwapArrowButton
        href={cta.href}
        ariaLabel={cta.ariaLabel ?? cta.label}
        newTab={Boolean(cta.external)}
        {...CTA_END_CARD_SWAP_BASE}
        className={`${CTA_END_CARD_SWAP_CLASSNAME_CORE} w-auto shrink-0 px-8`}
      >
        {cta.label}
      </SwapArrowButton>
    </aside>
  );
}
