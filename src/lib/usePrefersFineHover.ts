"use client";

import { useEffect, useState } from "react";

/**
 * True when the primary input supports hover with a fine pointer (mouse / trackpad).
 * Touch-first phones and tablets typically return false — use for hover-only UI and motion.
 */
export function usePrefersFineHover() {
  const [fineHover, setFineHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setFineHover(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return fineHover;
}
