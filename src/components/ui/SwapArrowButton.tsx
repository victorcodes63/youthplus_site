"use client";

import type { MouseEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

type SwapArrowButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  /** Backward-compatible class hook for custom hover text utilities. */
  hoverTextClassName?: string;
  /** Backward-compatible class hook for custom hover bg utilities. */
  hoverBgClassName?: string;
  /** Tighter layout (narrower button) for paired CTAs, e.g. hero. */
  compact?: boolean;
  /** Open link in a new tab. */
  newTab?: boolean;
  /** Smoothly scroll for same-page section anchors like "#faq". */
  smoothScroll?: boolean;
  /** Label font-size in px (or any valid CSS size string). */
  fontSize?: number | string;
  /** Button corner radius in px (or any valid CSS size string). */
  buttonRadius?: number | string;
  backgroundColor?: string;
  backgroundHoverColor?: string;
  textColor?: string;
  textHoverColor?: string;
  /** Default icon-chip fill color. */
  fillColor?: string;
  iconColor?: string;
  /** Icon-chip fill color on hover/focus. */
  iconHoverFill?: string;
};

function StrongArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="none">
      <path
        d="M3 10h12M10.8 4.5 16.3 10l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

function toCssSize(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}

export function SwapArrowButton({
  href,
  children,
  className = "",
  ariaLabel,
  hoverTextClassName = "",
  hoverBgClassName = "",
  compact = false,
  newTab = false,
  smoothScroll = false,
  fontSize,
  buttonRadius = "var(--radius-pill-button)",
  backgroundColor = "#e5c222",
  backgroundHoverColor = "#0A0A0A",
  textColor = "#0A0A0A",
  textHoverColor = "#FFFFFF",
  fillColor = "rgba(10, 10, 10, 0.12)",
  iconColor = "#0A0A0A",
  iconHoverFill = "rgba(255, 255, 255, 0.18)",
}: SwapArrowButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const isAnchorOnly = href.startsWith("#");

  const target = newTab ? "_blank" : undefined;
  const rel = newTab ? "noopener noreferrer" : undefined;

  const sizeClass = compact ? "min-h-[44px] px-4 text-[14px]" : "h-[50px] px-6 text-[15px]";

  const computedStyle = useMemo(
    () => ({
      borderRadius: toCssSize(buttonRadius),
      fontSize: fontSize ? toCssSize(fontSize) : undefined,
      color: isActive ? textHoverColor : textColor,
      backgroundColor,
    }),
    [backgroundColor, buttonRadius, fontSize, isActive, textColor, textHoverColor]
  );

  const handleSmoothScroll = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!smoothScroll || !isAnchorOnly) return;
    const targetId = href.slice(1);
    if (!targetId) return;
    const element = document.getElementById(targetId);
    if (!element) return;

    event.preventDefault();
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState({}, "", href);
  };

  const commonClassName = [
    "group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap text-center",
    "tracking-[-0.01em] font-[900] transition-colors duration-300",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    sizeClass,
    className,
    hoverTextClassName,
    hoverBgClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-left transition-transform duration-300 ease-out"
        style={{
          transform: isActive ? "scaleX(1)" : "scaleX(0)",
          backgroundColor: backgroundHoverColor,
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-3">
        <span>{children}</span>
        <span
          aria-hidden="true"
          className="relative inline-flex h-[1.75em] w-[1.75em] items-center justify-center overflow-hidden rounded-full transition-colors duration-300"
          style={{
            backgroundColor: isActive ? iconHoverFill : fillColor,
            color: isActive ? textHoverColor : iconColor,
          }}
        >
          <span
            className="absolute transition-all duration-300 ease-out"
            style={{
              opacity: isActive ? 0 : 1,
              transform: isActive ? "translateX(-10px)" : "translateX(0)",
            }}
          >
            <StrongArrow className="h-[0.95em] w-[0.95em]" />
          </span>
          <span
            className="absolute transition-all duration-300 ease-out"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateX(0)" : "translateX(10px)",
            }}
          >
            <StrongArrow className="h-[0.95em] w-[0.95em]" />
          </span>
        </span>
      </span>
    </>
  );

  if (isAnchorOnly || isExternalHref(href)) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={commonClassName}
        aria-label={ariaLabel}
        style={computedStyle}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        onClick={handleSmoothScroll}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={commonClassName}
      aria-label={ariaLabel}
      style={computedStyle}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      {content}
    </Link>
  );
}

