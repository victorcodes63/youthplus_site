"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";
import { BrandButton } from "@/components/ui/BrandButton";

const DESKTOP_LINKS = [
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
] as const;

const VENTURE_ITEMS = [
  {
    label: "AllAXS",
    href: "/ventures/allaxs",
    tag: "Platform",
    description: "Discover our flagship platform powering practical youth innovation pathways.",
  },
  {
    label: "Youth+ Radio",
    href: "/ventures/youth-radio",
    tag: "Media",
    description: "Listen to bold youth stories, practical insights, and ecosystem conversations.",
  },
  {
    label: "Connect",
    href: "/ventures/connect",
    tag: "Community",
    description: "Join high-agency peers, mentors, and builders in structured collaboration spaces.",
  },
  {
    label: "All Ventures",
    href: "/ventures",
    tag: "Overview",
    description: "Explore every Youth+ venture and find the right path for your goals.",
  },
  {
    label: "Partner With Us Form",
    href: "/partner-with-us",
    tag: "Partnership",
    description:
      "Submit partnership interest and tell us how you would like to collaborate with Youth+ Africa.",
  },
  {
    label: "We Lead Baseline Survey",
    href: "/we-lead-baseline-survey",
    tag: "Survey",
    description:
      "Complete a short baseline survey so we can better understand your context and support needs.",
  },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [venturesOpen, setVenturesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openVenturesMenu = () => {
    setVenturesOpen(true);
  };

  const closeDesktopMenus = () => {
    setVenturesOpen(false);
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-borderLight bg-white shadow-[0_10px_40px_rgba(10,10,10,0.08)]"
          : "border-borderLight/80 bg-white/98 shadow-[0_8px_28px_rgba(10,10,10,0.04)]"
      }`}
      onMouseLeave={closeDesktopMenus}
    >
      <div className="relative page mx-auto max-w-[1440px] h-[84px] flex items-center justify-between">
        <Logo />

        <nav className="font-body-ui hidden lg:flex items-center gap-8 text-[0.9375rem] font-[600] tracking-[0.005em]">
          {DESKTOP_LINKS.slice(0, 1).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={closeDesktopMenus}
              onFocus={closeDesktopMenus}
              className={`relative inline-flex items-center gap-2 transition-colors ${
                pathname === item.href ? "text-[#0A0A0A]" : "text-foreground/80 hover:text-[#0A0A0A]"
              }`}
            >
              <span className="accent-underline">{item.label}</span>
              <span
                className={`h-1.5 w-1.5 rounded-full bg-accent transition-opacity ${
                  pathname === item.href ? "opacity-100" : "opacity-0"
                }`}
              />
            </Link>
          ))}
          <Link
            href="/ventures"
            onMouseEnter={openVenturesMenu}
            onFocus={openVenturesMenu}
            className={`relative inline-flex items-center gap-2 transition-colors ${
              pathname.startsWith("/ventures") ||
              pathname === "/partner-with-us" ||
              pathname === "/we-lead-baseline-survey"
                ? "text-[#0A0A0A]"
                : "text-foreground/80 hover:text-[#0A0A0A]"
            }`}
          >
            <span className="accent-underline">Ventures</span>
            <span
              className={`h-1.5 w-1.5 rounded-full bg-accent transition-opacity ${
                pathname.startsWith("/ventures") ||
                pathname === "/partner-with-us" ||
                pathname === "/we-lead-baseline-survey" ||
                venturesOpen
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
          </Link>
          {DESKTOP_LINKS.slice(1).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={closeDesktopMenus}
              onFocus={closeDesktopMenus}
              className={`relative inline-flex items-center gap-2 transition-colors ${
                pathname === item.href ? "text-[#0A0A0A]" : "text-foreground/80 hover:text-[#0A0A0A]"
              }`}
            >
              <span className="accent-underline">{item.label}</span>
              <span
                className={`h-1.5 w-1.5 rounded-full bg-accent transition-opacity ${
                  pathname === item.href ? "opacity-100" : "opacity-0"
                }`}
              />
            </Link>
          ))}

          <span
            onMouseEnter={closeDesktopMenus}
            onFocus={closeDesktopMenus}
          >
            <SwapArrowButton
              href="/contact"
              className="font-body-ui ml-2 h-10 px-4 rounded-md text-[0.9375rem] font-[700] tracking-[0.005em] shadow-[0_4px_18px_rgba(229,194,34,0.35)]"
            >
              Contact us
            </SwapArrowButton>
          </span>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-borderLight"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-4 w-5">
            <span className="absolute left-0 right-0 top-0 h-[2px] bg-[#0A0A0A]" />
            <span className="absolute left-0 right-0 top-[6px] h-[2px] bg-[#0A0A0A]" />
            <span className="absolute left-0 right-0 top-[12px] h-[2px] bg-[#0A0A0A]" />
          </span>
        </button>

        <div className="header-glow-line" aria-hidden="true" />
      </div>

      <AnimatePresence>
        {venturesOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="hidden lg:block border-t border-borderLight bg-[linear-gradient(180deg,#ffffff_0%,#fcfcfc_100%)]"
          >
            <div className="page mx-auto max-w-[1440px] py-6">
              <div className="mb-3">
                <div className="inline-flex rounded-full border border-accent/70 bg-accent/10 px-3 py-1 text-label text-[#0A0A0A]">
                  Ventures
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 auto-rows-fr">
                {VENTURE_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex h-full min-h-[126px] flex-col rounded-md border border-borderLight bg-white p-4 hover:border-accent hover:shadow-[0_8px_26px_rgba(10,10,10,0.08)] hover:-translate-y-[1px] transition-all duration-200"
                    onClick={() => setVenturesOpen(false)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-[16px] tracking-[-0.01em] font-[800] text-[#0A0A0A]">
                        {item.label}
                      </div>
                      <span className="text-[14px] text-secondary/70 group-hover:text-[#0A0A0A] transition-colors">
                        →
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] leading-[1.6] text-secondary">
                      {item.description}
                    </p>
                    <div className="mt-auto pt-2 inline-flex rounded-full border border-borderLight bg-[#fafafa] px-2 py-1 text-[11px] font-[700] text-secondary group-hover:border-accent group-hover:bg-accent/10 group-hover:text-[#0A0A0A] transition-colors">
                      {item.tag}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden border-t border-borderLight bg-white"
          >
            <div className="font-body-ui page py-5 space-y-3">
              <div className="rounded-md border border-borderLight p-4 space-y-3">
                <Link href="/events" onClick={() => setMenuOpen(false)} className="block text-[15px] font-[700] tracking-[0.005em] text-[#0A0A0A]">
                  Events
                </Link>
                <div>
                  <div className="text-[15px] font-[700] tracking-[0.005em] text-[#0A0A0A]">Ventures</div>
                  <div className="mt-2 flex flex-col gap-2">
                    {VENTURE_ITEMS.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-[14px] font-[500] text-secondary hover:text-[#0A0A0A]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link href="/about" onClick={() => setMenuOpen(false)} className="block text-[15px] font-[700] tracking-[0.005em] text-[#0A0A0A]">
                  About
                </Link>
              </div>
              <BrandButton
                href="/contact"
                onClick={() => setMenuOpen(false)}
                variant="gold"
                fullWidth
                icon="arrow-up-right"
                iconPosition="end"
              >
                Contact us
              </BrandButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

