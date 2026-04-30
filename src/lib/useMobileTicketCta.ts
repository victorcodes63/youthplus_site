"use client";

import { useCallback, useState } from "react";

const STORAGE_KEY = "youthplus_mobile_ticket_cta_dismissed";

/**
 * Sticky mobile ticket CTA: remember dismissal in localStorage so it stays hidden
 * across sessions. (Switch to sessionStorage if you prefer once-per-tab only.)
 */
export function useMobileTicketCta() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* private mode / quota */
      return false;
    }
  });

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* still hide in-session */
    }
    setDismissed(true);
  }, []);

  return { dismissed, dismiss };
}
