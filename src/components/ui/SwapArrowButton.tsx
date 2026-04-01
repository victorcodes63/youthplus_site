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
};

export function SwapArrowButton({
  href,
  children,
  className = "",
  hoverTextClassName = "hover:text-accent",
  hoverBgClassName = "hover:bg-[#0A0A0A]",
}: SwapArrowButtonProps) {
  const [isHovering, setIsHovering] = useState(false);

  const Arrow = () => (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
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
      className={`group inline-flex items-center h-[50px] px-5 rounded-md bg-accent text-[#0A0A0A] font-[800] transition-colors duration-200 ${hoverBgClassName} ${hoverTextClassName} ${className}`}
    >
      <span className="grid grid-cols-[20px_auto_20px] items-center gap-3">
        <span className="relative h-5 w-5 overflow-hidden">
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: isHovering ? 0 : 1,
              x: isHovering ? -10 : 0,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Arrow />
          </motion.span>
        </span>

        <motion.span
          animate={{ x: isHovering ? 1.5 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {children}
        </motion.span>

        <span className="relative h-5 w-5 overflow-hidden">
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: isHovering ? 1 : 0,
              x: isHovering ? 0 : 10,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Arrow />
          </motion.span>
        </span>
      </span>
    </Link>
  );
}

