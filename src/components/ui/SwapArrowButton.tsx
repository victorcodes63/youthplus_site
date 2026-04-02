"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";

type SwapArrowButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  hoverTextClassName?: string;
  hoverBgClassName?: string;
  /** Tighter layout (narrower grid, smaller arrows) for paired CTAs e.g. hero. */
  compact?: boolean;
};

export function SwapArrowButton({
  href,
  children,
  className = "",
  hoverTextClassName = "hover:text-accent",
  hoverBgClassName = "hover:bg-[#0A0A0A]",
  compact = false,
}: SwapArrowButtonProps) {
  const [isHovering, setIsHovering] = useState(false);

  const Arrow = ({ size = "md" }: { size?: "md" | "sm" }) => (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={size === "sm" ? "h-[15px] w-[15px]" : "h-[18px] w-[18px]"}
      fill="none"
    >
      <path
        d="M5.5 14.5L14.5 5.5M8 5.5H14.5V12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onBlur={() => setIsHovering(false)}
      className={`group inline-flex items-center justify-center ${
        compact ? "min-h-[44px] px-3.5" : "h-[50px] px-5"
      } rounded-md bg-accent text-[#0A0A0A] font-[800] transition-colors duration-200 ${hoverBgClassName} ${hoverTextClassName} ${className}`}
    >
      <span
        className={
          compact
            ? "grid grid-cols-[14px_auto_14px] items-center gap-1.5"
            : "grid grid-cols-[20px_auto_20px] items-center gap-3"
        }
      >
        <span className={`relative overflow-hidden ${compact ? "h-4 w-4" : "h-5 w-5"}`}>
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: isHovering ? 0 : 1,
              x: isHovering ? -10 : 0,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Arrow size={compact ? "sm" : "md"} />
          </motion.span>
        </span>

        <motion.span
          animate={{ x: isHovering ? 1.5 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {children}
        </motion.span>

        <span className={`relative overflow-hidden ${compact ? "h-4 w-4" : "h-5 w-5"}`}>
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: isHovering ? 1 : 0,
              x: isHovering ? 0 : 10,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Arrow size={compact ? "sm" : "md"} />
          </motion.span>
        </span>
      </span>
    </Link>
  );
}

