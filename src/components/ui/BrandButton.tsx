"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type BrandButtonVariant = "gold" | "outline" | "outlineSubtle" | "dark" | "ghost";
type BrandButtonSize = "sm" | "md" | "lg";
type BrandButtonIcon = "none" | "arrow-up-right" | "arrow-right";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: BrandButtonVariant;
  size?: BrandButtonSize;
  icon?: BrandButtonIcon;
  iconPosition?: "start" | "end";
  fullWidth?: boolean;
  uppercase?: boolean;
};

type AnchorLikeProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

type NativeButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type BrandButtonProps = AnchorLikeProps | NativeButtonProps;

const VARIANT_CLASS: Record<BrandButtonVariant, string> = {
  gold: "border border-transparent bg-accent text-[#0A0A0A] shadow-[0_6px_18px_rgba(229,194,34,0.28)] hover:bg-[#d8b81f]",
  outline: "border-2 border-[#0A0A0A] bg-white text-[#0A0A0A] hover:bg-black/[0.03]",
  outlineSubtle: "border border-black/20 bg-white text-[#0A0A0A] hover:border-[#0A0A0A]/35 hover:bg-black/[0.02]",
  dark: "border border-transparent bg-[#111426] text-white hover:brightness-110",
  ghost: "border border-transparent bg-transparent text-[#0A0A0A] hover:bg-black/[0.04]",
};

const SIZE_CLASS: Record<BrandButtonSize, string> = {
  sm: "h-10 px-4 text-[13px] font-[800]",
  md: "h-11 px-5 text-[14px] font-[800]",
  lg: "h-12 px-6 text-[15px] font-[900]",
};

function classes(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

function Icon({ type }: { type: Exclude<BrandButtonIcon, "none"> }) {
  if (type === "arrow-right") {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[16px] w-[16px]" fill="none">
        <path
          d="M3.5 10h13m-4-4 4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[16px] w-[16px]" fill="none">
      <path
        d="M5.5 14.5L14.5 5.5M8 5.5H14.5V12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function BrandButton(props: BrandButtonProps) {
  const {
    children,
    className,
    variant = "gold",
    size = "md",
    icon = "none",
    iconPosition = "end",
    fullWidth = false,
    uppercase = false,
    ...rest
  } = props;

  const baseClassName = classes(
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill-button)] whitespace-nowrap text-center tracking-[-0.01em] transition-colors duration-200",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    fullWidth && "w-full",
    uppercase && "uppercase tracking-[0.08em]",
    className
  );

  const iconNode = icon !== "none" ? <Icon type={icon} /> : null;

  const content = (
    <>
      {iconPosition === "start" ? iconNode : null}
      <span>{children}</span>
      {iconPosition === "end" ? iconNode : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, target, rel, ...linkRest } = rest as Omit<
      AnchorLikeProps,
      keyof SharedProps | "href"
    >;
    const safeRel = target === "_blank" ? (rel ?? "noopener noreferrer") : rel;

    if (isExternalHref(href) || href.startsWith("#")) {
      return (
        <a href={href} target={target} rel={safeRel} className={baseClassName} {...linkRest}>
          {content}
        </a>
      );
    }

    return (
      <Link href={href} target={target} rel={safeRel} className={baseClassName} {...linkRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseClassName} {...(rest as Omit<NativeButtonProps, keyof SharedProps>)}>
      {content}
    </button>
  );
}
