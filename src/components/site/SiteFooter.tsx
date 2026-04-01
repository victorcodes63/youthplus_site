import Image from "next/image";
import Link from "next/link";
import { SwapArrowButton } from "@/components/ui/SwapArrowButton";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#0A0A0A] text-white mt-20 border-t border-white/10 min-h-[620px] md:min-h-[700px]">
      <div
        aria-hidden="true"
        className="dotted-wordmark pointer-events-none absolute left-0 right-0 bottom-10 md:bottom-14 select-none text-center font-[900] tracking-[-0.06em] lowercase text-[clamp(56px,17vw,260px)] leading-none"
      >
        youth+africa
      </div>

      <div className="relative z-10 page mx-auto max-w-[1440px] pt-14 md:pt-16 pb-40 md:pb-52">
        <div className="mb-10 relative overflow-hidden border border-white/15 bg-[#111111] rounded-md p-5 md:p-6">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E5C222]/70 to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-5 items-center">
            <div>
              <div className="text-[11px] uppercase tracking-[0.1em] text-accent font-[800]">
              Next Summit
              </div>
              <div className="mt-1 text-[20px] md:text-[24px] font-[900] tracking-[-0.02em]">
                Nairobi 2027 Ticket Sales Are Live
              </div>
            </div>

            <div className="md:pl-6 md:border-l md:border-white/10">
              <SwapArrowButton
                href="/events"
                className="h-11 px-5 text-[14px] font-[900] whitespace-nowrap"
                hoverTextClassName="hover:text-white"
                hoverBgClassName="hover:bg-[#0A0A0A]"
              >
                Reserve Tickets
              </SwapArrowButton>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/10 pb-10">
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center" aria-label="Youth+ Africa Home">
              <span className="relative h-14 w-[210px] rounded-md bg-white border border-white/20 p-2">
                <Image
                  src="/brand/youthlogo.webp"
                  alt="Youth+ Africa logo"
                  fill
                  sizes="210px"
                  className="object-contain object-center p-1"
                  priority={false}
                />
              </span>
            </Link>
            <p className="text-[15px] leading-[1.7] text-white/80 max-w-[42ch]">
              Youth+ Africa connects founders, investors, operators, and youth leaders
              to build practical solutions for the continent.
            </p>
            <div className="inline-flex items-center rounded-md border border-accent px-3 py-1 text-[11px] font-[800] tracking-[0.1em] uppercase text-accent">
              Next Summit • Nairobi
            </div>

            <div className="pt-1 flex items-center gap-2">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/85 hover:text-white hover:border-accent transition-colors"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                  <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5.001 2.5 2.5 0 0 0 0-5zM2.75 8.98h4.46V21H2.75V8.98zM9.85 8.98h4.27v1.64h.06c.6-1.13 2.05-2.32 4.2-2.32 4.5 0 5.33 2.96 5.33 6.8V21h-4.46v-5.28c0-1.26-.02-2.87-1.75-2.87-1.76 0-2.03 1.37-2.03 2.78V21H9.85V8.98z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/85 hover:text-white hover:border-accent transition-colors"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm11.5 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                </svg>
              </a>

              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/85 hover:text-white hover:border-accent transition-colors"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                  <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.2c0-.87.24-1.46 1.5-1.46h1.6V5.05A20.1 20.1 0 0 0 14.2 5C11.6 5 9.8 6.58 9.8 9.48V11H7v3h2.8v8h3.7z" />
                </svg>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/85 hover:text-white hover:border-accent transition-colors"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                  <path d="M18.24 2H21l-6.02 6.88L22 22h-5.58l-4.37-5.98L6.8 22H4l6.43-7.35L2 2h5.7l3.95 5.41L18.24 2zm-.98 18h1.55L6.86 3.9H5.2L17.26 20z" />
                </svg>
              </a>

              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/85 hover:text-white hover:border-accent transition-colors"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                  <path d="M14 3c.6 2 1.9 3.2 4 3.5V9a7.8 7.8 0 0 1-4-1.2V14a5 5 0 1 1-5-5h.3v2.5H9a2.5 2.5 0 1 0 2.5 2.5V3H14z" />
                </svg>
              </a>

              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/85 hover:text-white hover:border-accent transition-colors"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                  <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2.05C17.87 4.7 12 4.7 12 4.7s-5.87 0-7.6.45a2.9 2.9 0 0 0-2 2.05A30.6 30.6 0 0 0 2 12a30.6 30.6 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2.05c1.73.45 7.6.45 7.6.45s5.87 0 7.6-.45a2.9 2.9 0 0 0 2-2.05A30.6 30.6 0 0 0 22 12a30.6 30.6 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="text-[13px] font-[800] uppercase tracking-[0.08em] text-accent">
                Company
              </div>
              <div className="flex flex-col gap-2 text-[14px] text-white/85">
                <a href="#about" className="hover:text-white transition-colors">About</a>
                <Link href="/events" className="hover:text-white transition-colors">Our Events</Link>
                <a href="#sponsors" className="hover:text-white transition-colors">Partners</a>
                <Link href="/register" className="hover:text-white transition-colors">Register</Link>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-[13px] font-[800] uppercase tracking-[0.08em] text-accent">
                Attend
              </div>
              <div className="flex flex-col gap-2 text-[14px] text-white/85">
                <Link href="/events" className="hover:text-white transition-colors">Buy Tickets</Link>
                <Link href="/profile/tickets" className="hover:text-white transition-colors">My Tickets</Link>
                <Link href="/events" className="hover:text-white transition-colors">Venue & Travel</Link>
                <Link href="/events" className="hover:text-white transition-colors">FAQs</Link>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-[13px] font-[800] uppercase tracking-[0.08em] text-accent">
                Resources
              </div>
              <div className="flex flex-col gap-2 text-[14px] text-white/85">
                <Link href="/events" className="hover:text-white transition-colors">Speaker Deck</Link>
                <Link href="/events" className="hover:text-white transition-colors">Partnership Pack</Link>
                <Link href="/events" className="hover:text-white transition-colors">Media Kit</Link>
                <Link href="/events" className="hover:text-white transition-colors">Community</Link>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-[13px] font-[800] uppercase tracking-[0.08em] text-accent">
                Contact
              </div>
              <div className="text-[14px] text-white/85 space-y-2">
                <a href="mailto:hello@youthplus.africa" className="block hover:text-white transition-colors">
                  hello@youthplus.africa
                </a>
                <div>Kofisi, 8th floor, Riverside Drive, Nairobi</div>
                <a href="tel:+254796349079" className="block hover:text-white transition-colors">
                  +254 796 349 079
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-[12px] text-white/60">
            © {year} Youth+ Africa. All rights reserved.
          </div>
          <div className="flex items-center gap-5 text-[12px] text-white/60">
            <Link href="/offline" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/offline" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/offline" className="hover:text-white transition-colors">Cookies</Link>
            <Link href="/offline" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

