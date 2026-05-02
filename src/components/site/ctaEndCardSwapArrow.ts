/**
 * Shared visuals for end-of-page CTA strips (JoinUsCta card actions, FooterTicketBanner).
 * Pill radius comes from SwapArrowButton defaults; white field, hairline black border, hover inverts.
 */
export const CTA_END_CARD_SWAP_BASE = {
  compact: true as const,
  backgroundColor: "#FFFFFF",
  backgroundHoverColor: "#0A0A0A",
  textColor: "#0A0A0A",
  textHoverColor: "#FFFFFF",
  fillColor: "rgba(10,10,10,0.08)",
  iconColor: "#0A0A0A",
  iconHoverFill: "rgba(255,255,255,0.18)",
} as const;

/** Core pill outline; add `w-full` for grid cells or `w-auto shrink-0` for footer strip. */
export const CTA_END_CARD_SWAP_CLASSNAME_CORE =
  "h-12 justify-center border border-[#0A0A0A] px-4 text-[0.9375rem] font-[600] tracking-[0.01em]";

export const CTA_END_CARD_SWAP_CLASSNAME = `${CTA_END_CARD_SWAP_CLASSNAME_CORE} w-full`;
