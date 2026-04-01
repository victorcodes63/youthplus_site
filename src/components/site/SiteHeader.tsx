"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";

type NavGroup = {
  label: string;
  title: string;
  intro: string;
  items: Array<{ label: string; href: string; tag: string }>;
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Home",
    title: "Homepage Sections",
    intro: "Jump to key sections of the summit landing page.",
    items: [
      { label: "Hero", href: "/#hero", tag: "Top" },
      { label: "Summit Snapshot", href: "/#summit-snapshot", tag: "Overview" },
      { label: "Speakers", href: "/#speakers", tag: "Voices" },
      { label: "Why Us", href: "/#about", tag: "Story" },
    ],
  },
  {
    label: "Tickets",
    title: "Ticket Journey",
    intro: "Everything needed to choose, compare, and buy tickets.",
    items: [
      { label: "Featured Events", href: "/#featured-events", tag: "Events" },
      { label: "Ticket Tiers", href: "/#ticket-tiers", tag: "Pricing" },
      { label: "Agenda Teaser", href: "/#agenda-teaser", tag: "Plan" },
      { label: "Buyer FAQs", href: "/#buyer-faqs", tag: "Support" },
    ],
  },
  {
    label: "Partner",
    title: "Partners & Ecosystem",
    intro: "Brand visibility and collaboration opportunities at the summit.",
    items: [
      { label: "Partners Strip", href: "/#partners-strip", tag: "Logos" },
      { label: "Editorial Sessions", href: "/#editorial-sessions", tag: "Content" },
      { label: "Community", href: "/#about", tag: "Mission" },
      { label: "Contact Team", href: "/contact", tag: "Reach us" },
    ],
  },
  {
    label: "About",
    title: "Youth+ Africa",
    intro: "Our mission, stories, and long-term outcomes.",
    items: [
      { label: "Why Us Story", href: "/#about", tag: "Mission" },
      { label: "Speakers", href: "/#speakers", tag: "Community" },
      { label: "Events", href: "/#featured-events", tag: "Updates" },
      { label: "Contact", href: "/contact", tag: "Reach us" },
    ],
  },
];

const HEADER_OFFSET_PX = 84;

/** Same-page #section links: close mega-menu first, then scroll so the section clears the fixed header. */
function useHashSectionNav() {
  const pathname = usePathname();

  const scrollToHash = useCallback(
    (hash: string) => {
      const id = hash.replace(/^#/, "");
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      window.history.replaceState(null, "", `#${id}`);
    },
    []
  );

  const onInPageHashClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.includes("#")) return;
      const hashIndex = href.indexOf("#");
      const pathOnly = href.slice(0, hashIndex) || "/";
      const hash = href.slice(hashIndex + 1);
      if (!hash) return;
      if (pathOnly !== pathname) return;
      e.preventDefault();
      return hash;
    },
    [pathname]
  );

  return { scrollToHash, onInPageHashClick };
}

export function SiteHeader() {
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollToHash, onInPageHashClick } = useHashSectionNav();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeGroup = NAV_GROUPS.find((group) => group.label === active) ?? null;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-borderLight bg-white shadow-[0_10px_40px_rgba(10,10,10,0.08)]"
          : "border-borderLight/80 bg-white/98 shadow-[0_8px_28px_rgba(10,10,10,0.04)]"
      }`}
      onMouseLeave={() => setActive(null)}
    >
      <div className="relative page mx-auto max-w-[1440px] h-[84px] flex items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-[800] tracking-[-0.01em]">
          {NAV_GROUPS.map((group) => (
            <button
              type="button"
              key={group.label}
              onMouseEnter={() => setActive(group.label)}
              onFocus={() => setActive(group.label)}
              className={`relative inline-flex items-center gap-2 transition-colors ${
                active === group.label ? "text-[#0A0A0A]" : "text-foreground/80"
              }`}
            >
              <span className="accent-underline">{group.label}</span>
              <span
                className={`h-1.5 w-1.5 rounded-full bg-accent transition-opacity ${
                  active === group.label ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          ))}

          <SwapArrowButton
            href="/contact"
            className="ml-2 h-10 px-4 rounded-md text-[14px] shadow-[0_4px_18px_rgba(229,194,34,0.35)]"
          >
            Contact us
          </SwapArrowButton>
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
        {activeGroup && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="hidden lg:block border-t border-borderLight bg-white"
          >
            <div className="page mx-auto max-w-[1440px] py-8">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-4">
                  <div className="inline-flex rounded-md border border-accent px-3 py-1 text-[11px] font-[800] tracking-[0.1em] uppercase text-[#0A0A0A]">
                    {activeGroup.label}
                  </div>
                  <h3 className="mt-4 text-[28px] leading-[1.05] tracking-[-0.03em] font-[900] text-[#0A0A0A]">
                    {activeGroup.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-secondary max-w-[30ch]">
                    {activeGroup.intro}
                  </p>
                </div>
                <div className="col-span-8 grid grid-cols-2 gap-4">
                  {activeGroup.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group rounded-md border border-borderLight p-4 hover:border-accent hover:shadow-[0_6px_20px_rgba(10,10,10,0.05)] transition-all"
                      onClick={(e) => {
                        const hash = onInPageHashClick(e, item.href);
                        if (hash === undefined) return;
                        setActive(null);
                        window.requestAnimationFrame(() => {
                          window.setTimeout(() => scrollToHash(hash), 50);
                        });
                      }}
                    >
                      <div className="text-[16px] tracking-[-0.01em] font-[800] text-[#0A0A0A]">
                        {item.label}
                      </div>
                      <div className="mt-2 inline-flex rounded-md border border-borderLight px-2 py-1 text-[11px] font-[700] text-secondary group-hover:border-accent transition-colors">
                        {item.tag}
                      </div>
                    </Link>
                  ))}
                </div>
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
            <div className="page py-5 space-y-3">
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="rounded-md border border-borderLight p-4">
                  <div className="text-[15px] font-[900] text-[#0A0A0A]">{group.label}</div>
                  <div className="mt-3 flex flex-col gap-2">
                    {group.items.slice(0, 2).map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={(e) => {
                          const hash = onInPageHashClick(e, item.href);
                          setMenuOpen(false);
                          if (hash === undefined) return;
                          window.requestAnimationFrame(() => {
                            window.setTimeout(() => scrollToHash(hash), 50);
                          });
                        }}
                        className="text-[14px] text-secondary hover:text-[#0A0A0A]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center w-full h-11 rounded-lg bg-accent text-[#0A0A0A] text-[14px] font-[900]"
              >
                Contact us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

