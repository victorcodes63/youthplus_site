"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";
import { BrandButton } from "@/components/ui/BrandButton";

/** Primary nav order: who we are → what’s on → how to engage → CTA. */
const DESKTOP_LINKS = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
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
  const [mobileVenturesOpen, setMobileVenturesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [menuOpen]);

  useEffect(() => {
    startTransition(() => {
      setVenturesOpen(false);
      setMobileVenturesOpen(false);
      setMenuOpen(false);
    });
  }, [pathname]);

  const openVenturesMenu = () => {
    setVenturesOpen(true);
  };

  const closeDesktopMenus = () => {
    setVenturesOpen(false);
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-black/[0.07] transition-[background-color,box-shadow,backdrop-filter] duration-200 ease-out ${
        scrolled
          ? "bg-white shadow-[0_10px_36px_rgba(10,10,10,0.08)]"
          : "bg-white/[0.96] shadow-[0_4px_18px_rgba(10,10,10,0.04)] backdrop-blur-[10px] supports-[backdrop-filter]:bg-white/88"
      }`}
      onMouseLeave={closeDesktopMenus}
    >
      <div className="relative page mx-auto max-w-[1440px] flex h-[var(--site-header-height)] items-center justify-between">
        <Logo />

        <nav className="font-body-ui hidden lg:flex items-center gap-8 text-[0.9375rem] font-[600] tracking-[0.005em]">
          {DESKTOP_LINKS.map((item) => (
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
            onClick={() => setVenturesOpen(false)}
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
          onClick={() => {
            setMobileVenturesOpen(false);
            setMenuOpen((prev) => !prev);
          }}
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
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 z-40 bg-[#0A0A0A]/36 backdrop-blur-[1px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={() => {
                setMobileVenturesOpen(false);
                setMenuOpen(false);
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.985 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full z-50 max-h-[calc(100dvh-var(--site-header-height))] overflow-y-auto border-t border-borderLight bg-white shadow-[0_18px_44px_rgba(10,10,10,0.16)] lg:hidden"
            >
              <div className="font-body-ui page py-5">
                <div className="flex flex-col rounded-xl border border-borderLight bg-white p-4 shadow-[0_10px_28px_rgba(10,10,10,0.06)]">
                  <div className="space-y-4">
                    <Link
                      href="/about"
                      onClick={() => {
                        setMobileVenturesOpen(false);
                        setMenuOpen(false);
                      }}
                      className="block text-[17px] font-[700] tracking-[0.005em] text-[#0A0A0A]"
                    >
                      About
                    </Link>
                    <Link
                      href="/events"
                      onClick={() => {
                        setMobileVenturesOpen(false);
                        setMenuOpen(false);
                      }}
                      className="block text-[17px] font-[700] tracking-[0.005em] text-[#0A0A0A]"
                    >
                      Events
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileVenturesOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between text-left text-[17px] font-[700] tracking-[0.005em] text-[#0A0A0A]"
                      aria-expanded={mobileVenturesOpen}
                      aria-controls="mobile-ventures-submenu"
                    >
                      <span>Ventures</span>
                      <span className={`text-[18px] transition-transform ${mobileVenturesOpen ? "rotate-90" : ""}`}>›</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileVenturesOpen && (
                        <motion.div
                          id="mobile-ventures-submenu"
                          initial={{ opacity: 0, x: 14, height: 0 }}
                          animate={{ opacity: 1, x: 0, height: "auto" }}
                          exit={{ opacity: 0, x: 14, height: 0 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="ml-2 mt-1 space-y-2 border-l border-borderLight pl-3">
                            {VENTURE_ITEMS.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => {
                                  setMobileVenturesOpen(false);
                                  setMenuOpen(false);
                                }}
                                className="block text-[14px] font-[500] text-secondary hover:text-[#0A0A0A]"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="pt-5">
                    <BrandButton
                      href="/contact"
                      onClick={() => {
                        setMobileVenturesOpen(false);
                        setMenuOpen(false);
                      }}
                      variant="gold"
                      fullWidth
                      icon="arrow-up-right"
                      iconPosition="end"
                      className="h-12 text-[1rem] font-[700]"
                    >
                      Contact us
                    </BrandButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

