"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { brandAssetPath } from "@/lib/brandAssetPath";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { useEffect, useMemo, useRef, useState } from "react";
import { type CarouselGestureIntent, resolveCarouselTouchIntent } from "@/lib/carouselTouchScroll";

type Speaker = {
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  linkedin: string;
};

export const SPEAKERS: Speaker[] = [
  {
    name: "Amina Wafula",
    title: "Head of Product",
    company: "Flutterwave",
    bio: "Builds payment products that scale for pan-African businesses.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/amina-wafula",
  },
  {
    name: "David Njoroge",
    title: "Startup Programs Lead",
    company: "Google",
    bio: "Supports founders with practical go-to-market strategy and growth.",
    image: "https://images.unsplash.com/photo-1696992443065-64eadfc2ded1?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/david-njoroge",
  },
  {
    name: "Lerato Maseko",
    title: "Investment Associate",
    company: "Partech",
    bio: "Focuses on early-stage investments in climate and fintech ventures.",
    image: "https://images.unsplash.com/photo-1666866868698-67ee989fba70?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/lerato-maseko",
  },
  {
    name: "Michael Otieno",
    title: "CTO",
    company: "Andela",
    bio: "Leads distributed engineering teams delivering enterprise products.",
    image: "https://images.unsplash.com/photo-1751446561891-8c3bb0f16606?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/michael-otieno",
  },
  {
    name: "Nadia Diallo",
    title: "Ecosystem Partnerships",
    company: "AWS",
    bio: "Builds strategic partnerships for startup and developer ecosystems.",
    image: "https://plus.unsplash.com/premium_photo-1745624797647-37ddb5c77b65?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/nadia-diallo",
  },
  {
    name: "Brian Kiplagat",
    title: "Growth Lead",
    company: "Safaricom",
    bio: "Drives digital adoption initiatives for youth and SME markets.",
    image: "https://images.unsplash.com/photo-1560412519-ebf43c7ae543?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/brian-kiplagat",
  },
  {
    name: "Fatou Ndiaye",
    title: "AI Product Manager",
    company: "Microsoft",
    bio: "Ships AI workflows focused on accessibility and productivity.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/fatou-ndiaye",
  },
  {
    name: "Joel Mwangi",
    title: "Founder",
    company: "Pezesha",
    bio: "Builds credit infrastructure for underserved African businesses.",
    image: "https://plus.unsplash.com/premium_photo-1669879859992-5252477fa489?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/joel-mwangi",
  },
  {
    name: "Nomsa Khumalo",
    title: "Community Director",
    company: "Norrsken",
    bio: "Designs founder communities that unlock investment and mentorship.",
    image: "https://images.unsplash.com/photo-1610522983738-d935e6f1e0eb?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/nomsa-khumalo",
  },
  {
    name: "Tunde Adebayo",
    title: "Chief Innovation Officer",
    company: "Visa",
    bio: "Leads fintech innovation programs and market expansion strategy.",
    image: "https://images.unsplash.com/photo-1772301685774-a4f0e81e032e?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/tunde-adebayo",
  },
  {
    name: "Grace Nyambura",
    title: "Policy & Inclusion Lead",
    company: "UNDP",
    bio: "Works on inclusive digital policy and youth innovation frameworks.",
    image: "https://plus.unsplash.com/premium_photo-1681486210803-b5b825a678f8?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/grace-nyambura",
  },
  {
    name: "Patrick Sello",
    title: "Head of Data",
    company: "Moniepoint",
    bio: "Builds data systems powering resilient African financial products.",
    image: "https://images.unsplash.com/photo-1614890094520-7b8dd0ec56d2?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/patrick-sello",
  },
  {
    name: "Salma Hassan",
    title: "Venture Partner",
    company: "TLcom Capital",
    bio: "Backs category-defining startups across software and commerce.",
    image: "https://plus.unsplash.com/premium_photo-1661543038302-e6da2933e921?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/salma-hassan",
  },
  {
    name: "Kevin Ouma",
    title: "Engineering Director",
    company: "M-KOPA",
    bio: "Scales mission-driven products for access and financial inclusion.",
    image: "https://images.unsplash.com/photo-1645736593932-2c877741fd6c?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/kevin-ouma",
  },
  {
    name: "Angela Boateng",
    title: "Programs Manager",
    company: "Africa Fintech Summit",
    bio: "Runs high-impact founder and investor programming across markets.",
    image: "https://images.unsplash.com/photo-1744040866587-e3ac6dcde112?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/angela-boateng",
  },
  {
    name: "Yusuf Abdi",
    title: "Head of Partnerships",
    company: "Twiga Foods",
    bio: "Builds strategic partnerships in commerce and supply ecosystems.",
    image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/yusuf-abdi",
  },
  {
    name: "Ruth Chelagat",
    title: "AI Strategy Consultant",
    company: "Deloitte",
    bio: "Helps teams deploy AI use-cases with measurable business outcomes.",
    image: "https://images.unsplash.com/photo-1551524267-c0baf940832c?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/ruth-chelagat",
  },
  {
    name: "Joseph Moyo",
    title: "Regional Director",
    company: "Mastercard",
    bio: "Leads ecosystem growth for digital payment infrastructure.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/joseph-moyo",
  },
  {
    name: "Habiba Osman",
    title: "Founder",
    company: "Tech4Good Africa",
    bio: "Builds innovation programs connecting youth to real opportunities.",
    image: "https://images.unsplash.com/photo-1710778044102-56a3a6b69a1b?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/habiba-osman",
  },
  {
    name: "Samuel Korir",
    title: "Platform Lead",
    company: "MEST Africa",
    bio: "Builds startup support systems from talent to market readiness.",
    image: "https://plus.unsplash.com/premium_photo-1722859210044-5ca8a393b001?auto=format&fit=crop&w=900&q=80",
    linkedin: "https://www.linkedin.com/in/samuel-korir",
  },
];

const SHAPES = [
  "rounded-md",
  "rounded-md rounded-tr-[22px]",
  "rounded-md rounded-bl-[22px]",
  "rounded-md rounded-tl-[18px] rounded-br-[18px]",
];

export function SpeakersCarousel() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cards = useMemo(() => SPEAKERS, []);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorPoint, setCursorPoint] = useState({ x: 0, y: 0 });
  const [cardWidth, setCardWidth] = useState(280);
  const [gap, setGap] = useState(20);
  const [visibleCount, setVisibleCount] = useState(1);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const intentRef = useRef<CarouselGestureIntent>("idle");
  const DRAG_THRESHOLD = 60;

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      const card = track.querySelector<HTMLElement>("[data-speaker-card]");
      if (!card) return;
      const nextCardWidth = card.offsetWidth;
      const trackStyle = window.getComputedStyle(track);
      const nextGap = parseFloat(trackStyle.columnGap || trackStyle.gap || "20");
      const nextVisible = Math.max(1, Math.round(viewport.clientWidth / (nextCardWidth + nextGap)));
      setCardWidth(nextCardWidth);
      setGap(Number.isFinite(nextGap) ? nextGap : 20);
      setVisibleCount(nextVisible);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const maxIndex = Math.max(0, cards.length - visibleCount);
  const safeIndex = Math.min(activeIndex, maxIndex);
  const step = cardWidth + gap;
  const baseOffset = -safeIndex * step;
  const clampIndex = (next: number) => Math.max(0, Math.min(maxIndex, next));

  const goTo = (next: number) => {
    setActiveIndex(clampIndex(next));
  };

  const scrollByCards = (direction: "prev" | "next") => {
    goTo(safeIndex + (direction === "next" ? 1 : -1));
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    dragStartYRef.current = event.clientY;
    dragOffsetRef.current = 0;
    setDragOffset(0);
    if (event.pointerType === "mouse") {
      intentRef.current = "horizontal";
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    } else {
      intentRef.current = "pending";
      setIsDragging(false);
    }
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (pointerIdRef.current !== event.pointerId) return;

    if (intentRef.current === "pending") {
      const next = resolveCarouselTouchIntent(
        event.clientX,
        event.clientY,
        dragStartXRef.current,
        dragStartYRef.current,
      );
      if (next === "vertical") {
        intentRef.current = "vertical";
        dragOffsetRef.current = 0;
        setDragOffset(0);
        setIsDragging(false);
        return;
      }
      if (next === "pending") return;
      intentRef.current = "horizontal";
      setIsDragging(true);
    }

    if (intentRef.current === "vertical") return;
    if (intentRef.current !== "horizontal") return;

    const delta = event.clientX - dragStartXRef.current;
    const atStart = safeIndex === 0;
    const atEnd = safeIndex === maxIndex;
    const resisted = (atStart && delta > 0) || (atEnd && delta < 0) ? delta * 0.35 : delta;
    dragOffsetRef.current = resisted;
    setDragOffset(resisted);
  };

  const endPointer = (pointerId: number) => {
    if (pointerIdRef.current !== pointerId) return;
    const intent = intentRef.current;
    const finalOffset = dragOffsetRef.current;
    setIsDragging(false);
    pointerIdRef.current = null;
    intentRef.current = "idle";
    dragOffsetRef.current = 0;
    setDragOffset(0);

    if (intent === "vertical") return;

    if (finalOffset <= -DRAG_THRESHOLD) {
      goTo(safeIndex + 1);
      return;
    }
    if (finalOffset >= DRAG_THRESHOLD) {
      goTo(safeIndex - 1);
    }
  };

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (event) => {
    endPointer(event.pointerId);
  };

  const onPointerCancel: React.PointerEventHandler<HTMLDivElement> = (event) => {
    endPointer(event.pointerId);
  };

  return (
    <section id="speakers" className="py-16 md:py-20">
      <div className="page mx-auto max-w-[1440px] flex items-end justify-between gap-6 flex-wrap">
        <div>
          <div className="text-label text-secondary">
            Speakers
          </div>
          <h2 className="mt-4 text-h2 text-primary max-w-[18ch]">
            Voices shaping the next chapter of African innovation.
          </h2>
          <p className="mt-4 text-lead">
            Hover any speaker card to reveal LinkedIn and connect directly.
            Twenty curated profiles from founders, operators, and investors.
          </p>
        </div>

        <div className="inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCards("prev")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-borderLight bg-white text-primary transition-colors hover:border-accent hover:bg-accent hover:text-[#0A0A0A]"
            aria-label="Previous speakers"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCards("next")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-borderLight bg-white text-primary transition-colors hover:border-accent hover:bg-accent hover:text-[#0A0A0A]"
            aria-label="Next speakers"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 bg-white px-4 py-5 md:px-6 md:py-6 lg:px-8">
        <SectionDivider contentWidth className="absolute top-0 left-1/2 -translate-x-1/2" />
        <SectionDivider contentWidth className="absolute bottom-0 left-1/2 -translate-x-1/2" />
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-4 flex items-center justify-between md:mb-5">
            <p className="text-label text-secondary">
              <span className="lg:hidden">Drag to explore</span>
              <span className="hidden lg:inline">20 speakers</span>
            </p>
          </div>
          <div
            ref={viewportRef}
            className={`relative overflow-hidden touch-pan-y select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onMouseEnter={() => setCursorActive(true)}
            onMouseLeave={() => setCursorActive(false)}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setCursorPoint({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
              });
            }}
            onDragStart={(event) => event.preventDefault()}
          >
            <div
              ref={trackRef}
              className="flex gap-5 pb-3 will-change-transform"
              style={{
                transform: `translate3d(${baseOffset + dragOffset}px, 0, 0)`,
                transition: isDragging ? "none" : `transform ${reduceMotion ? 1 : 600}ms cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            >
          {cards.map((speaker, idx) => {
            const shape = SHAPES[idx % SHAPES.length];
            return (
              <motion.article
                key={`${speaker.name}-${speaker.company}`}
                data-speaker-card
                className={`group relative min-w-[280px] max-w-[280px] shrink-0 border border-borderLight bg-white shadow-[0_6px_24px_rgba(10,10,10,0.05)] ${shape}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (idx % 5) * 0.05, ease: "easeOut" }}
              >
              <div className={`relative h-[330px] overflow-hidden border-b border-borderLight ${shape}`}>
                <Image
                  src={speaker.image}
                  alt={`${speaker.name} portrait`}
                  fill
                  sizes="280px"
                  draggable={false}
                  className="object-cover transition duration-300 group-hover:scale-[1.03] group-hover:blur-[2px]"
                />

                <div className="absolute inset-0 bg-[#0A0A0A]/0 transition-colors duration-300 group-hover:bg-[#0A0A0A]/42" />

                <Link
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100"
                  aria-label={`View ${speaker.name} LinkedIn profile`}
                >
                  <span className="inline-flex items-center justify-center h-11 px-4 rounded-md bg-white text-[#0A0A0A] font-[600] text-[0.9375rem] tracking-[0.01em]">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-4 w-4 mr-2"
                      fill="currentColor"
                    >
                      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5.001 2.5 2.5 0 0 0 0-5zm.02 6.5H2.5V21h2.5V10zM8.5 10H11v1.6h.04c.35-.66 1.2-1.36 2.46-1.36 2.63 0 3.12 1.73 3.12 3.98V21h-2.5v-5.95c0-1.42-.03-3.24-1.97-3.24-1.97 0-2.27 1.54-2.27 3.14V21H8.5V10z" />
                    </svg>
                    LinkedIn
                  </span>
                </Link>

                <div className="absolute right-3 bottom-3 h-10 w-10 p-0.5 drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
                  <Image
                    src={brandAssetPath("Y+ Icon White@3x.png")}
                    alt="Youth+ Africa logo"
                    width={36}
                    height={36}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              <div className="p-4">
                <div className="text-h3 text-[#0A0A0A]">
                  {speaker.name}
                </div>
                <div className="mt-2 text-small font-[600] text-secondary">
                  {speaker.title} • {speaker.company}
                </div>
                <p className="mt-3 text-small">
                  {speaker.bio}
                </p>
              </div>
              </motion.article>
            );
          })}
            </div>

            <AnimatePresence>
              {cursorActive ? (
                <motion.div
                  className="pointer-events-none absolute z-20 hidden h-16 w-16 items-center justify-center rounded-full border border-accent bg-black/70 text-[11px] font-[900] uppercase tracking-[0.1em] text-accent md:flex"
                  style={{ left: cursorPoint.x, top: cursorPoint.y, x: "-50%", y: "-50%" }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                >
                  Drag
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

