"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "youthplus_mobile_ticket_cta_dismissed";

/**
 * Sticky mobile ticket CTA: remember dismissal in localStorage so it stays hidden
 * across sessions. (Switch to sessionStorage if you prefer once-per-tab only.)
 *
 * Hydration-safe: the server and the client's first paint always behave as "not dismissed".
 * Stored dismissal only affects UI after mount; dismiss() applies immediately via optimistic state.
 */
export function useMobileTicketCta() {
  const [mounted, setMounted] = useState(false);
  const [storedDismissed, setStoredDismissed] = useState(false);
  const [optimisticDismissed, setOptimisticDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setStoredDismissed(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      /* private mode / quota */
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      try {
        setStoredDismissed(localStorage.getItem(STORAGE_KEY) === "1");
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* still hide in-session */
    }
    setOptimisticDismissed(true);
    setStoredDismissed(true);
  }, []);

  const dismissed = optimisticDismissed || (mounted && storedDismissed);

  return { dismissed, dismiss };
}
