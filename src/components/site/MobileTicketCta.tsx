"use client";

import { SwapArrowButton } from "@/components/ui/SwapArrowButton";

type MobileTicketCtaProps = {
  onDismiss: () => void;
};

export function MobileTicketCta({ onDismiss }: MobileTicketCtaProps) {
  return (
    <div className="fixed z-40 md:hidden left-[max(1.5rem,env(safe-area-inset-left,0px))] right-[max(1.5rem,env(safe-area-inset-right,0px))] bottom-[max(1rem,env(safe-area-inset-bottom,0px))]">
      <div className="flex gap-2 items-stretch rounded-md border border-black/10 bg-white/96 backdrop-blur p-2.5 shadow-[0_12px_30px_rgba(10,10,10,0.12)]">
        <SwapArrowButton
          href="/events"
          className="flex-1 min-w-0 h-11 px-3 rounded-md text-[14px] font-[900] justify-center"
          hoverTextClassName="hover:text-white"
          hoverBgClassName="hover:bg-[#0A0A0A]"
        >
          Get tickets now
        </SwapArrowButton>
        <button
          type="button"
          onClick={onDismiss}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-black/10 bg-white text-primary hover:bg-black/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Dismiss ticket prompt"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
