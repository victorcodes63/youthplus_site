import { SwapArrowButton } from "@/components/ui/SwapArrowButton";

/**
 * FooterTicketBanner - design system summit ticket announcement.
 *
 * Sits at the top of the SiteFooter as a compact, dark surface CTA.
 * - Semantic <aside> with aria-label.
 * - Single primary action that mirrors JoinUsCta primary button styling
 *   for visual consistency across the system.
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
  eyebrow = "Youth+ Summit 2026",
  heading = "Youth+ Summit 2026 Ticket Sales Are Live",
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
        className="h-12 px-8 text-[0.9375rem] font-[600] tracking-[0.01em]"
      >
        {cta.label}
      </SwapArrowButton>
    </aside>
  );
}
