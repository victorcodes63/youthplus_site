"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { brandAssetPath } from "@/lib/brandAssetPath";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { useMemo } from "react";
import { FESTIVAL_SPEAKERS, type FestivalSpeaker } from "@/data/festivalSpeakers";
import { toTitleCaseWords } from "@/lib/toTitleCaseWords";
import { useStripCarousel } from "@/lib/useStripCarousel";

export const SPEAKERS: FestivalSpeaker[] = FESTIVAL_SPEAKERS;

const SHAPES = [
  "rounded-md",
  "rounded-md rounded-tr-[22px]",
  "rounded-md rounded-bl-[22px]",
  "rounded-md rounded-tl-[18px] rounded-br-[18px]",
];

export function SpeakersCarousel() {
  const cards = useMemo(() => SPEAKERS, []);
  const reduceMotion = useReducedMotion();
  const strip = useStripCarousel({
    itemCount: cards.length,
    cardSelector: "[data-speaker-card]",
    defaultGap: 20,
    reduceMotion: Boolean(reduceMotion),
  });

  return (
    <section id="speakers" className="py-16 md:py-20">
      <div className="page mx-auto max-w-[1440px]">
        <div>
          <div className="text-label text-secondary">
            Speakers
          </div>
          <h2 className="mt-4 text-h2 text-primary max-w-[18ch]">
            Voices shaping the next chapter of African innovation.
          </h2>
          <p className="mt-4 text-lead">
            Confirmed portraits and roles for Youth+ Festival Nairobi. Drag the strip or use the arrows to explore.
          </p>
        </div>
      </div>

      {/* Full-bleed strip: same breakout pattern as Case Studies on the home page (no max-width on viewport). */}
      <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 bg-white px-4 py-5 md:px-6 md:py-6 lg:px-8">
        <SectionDivider contentWidth className="absolute top-0 left-1/2 -translate-x-1/2" />
        <SectionDivider contentWidth className="absolute bottom-0 left-1/2 -translate-x-1/2" />
        <div className="mb-4 flex items-center justify-end md:mb-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => strip.slideBy("prev")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-borderLight bg-white text-primary transition-colors hover:border-accent hover:bg-accent hover:text-[#0A0A0A]"
              aria-label="Previous speakers"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => strip.slideBy("next")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-borderLight bg-white text-primary transition-colors hover:border-accent hover:bg-accent hover:text-[#0A0A0A]"
              aria-label="Next speakers"
            >
              →
            </button>
          </div>
        </div>
        <div
          ref={strip.viewportRef}
          className={`relative overflow-hidden touch-pan-y select-none ${
            strip.isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onPointerDown={strip.onPointerDown}
          onPointerMove={strip.onPointerMove}
          onPointerUp={strip.onPointerUp}
          onPointerCancel={strip.onPointerCancel}
          onMouseEnter={() => strip.setCursorActive(true)}
          onMouseLeave={() => strip.setCursorActive(false)}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            strip.setCursorPoint({
              x: event.clientX - rect.left,
              y: event.clientY - rect.top,
            });
          }}
        >
          <div
            ref={strip.trackRef}
            className="flex gap-5 pb-3 will-change-transform"
            style={{
              transform: `translate3d(${strip.baseOffset + strip.dragOffset}px, 0, 0)`,
              transition: strip.trackTransition,
            }}
          >
            {cards.map((speaker, idx) => {
              const shape = SHAPES[idx % SHAPES.length];
              return (
                <article
                  key={speaker.name}
                  data-speaker-card
                  className={`relative min-w-[280px] max-w-[280px] shrink-0 border border-borderLight bg-white shadow-[0_6px_24px_rgba(10,10,10,0.05)] ${shape}`}
                >
                    <div className={`relative h-[330px] overflow-hidden border-b border-borderLight ${shape}`}>
                      <Image
                        src={speaker.image}
                        alt={`${speaker.name} portrait`}
                        fill
                        sizes="280px"
                        draggable={false}
                        className="object-cover transition duration-300"
                        style={
                          speaker.portraitObjectPosition
                            ? { objectPosition: speaker.portraitObjectPosition }
                            : undefined
                        }
                      />

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
                      <div className="mt-2 text-small font-[600] leading-snug text-secondary">
                        {toTitleCaseWords(speaker.title)}
                      </div>
                      <div className="mt-1 text-small font-[500] leading-snug text-secondary">
                        {speaker.company}
                      </div>
                      <p className="mt-3 text-small">
                        {speaker.bio}
                      </p>
                    </div>
                  </article>
                );
              })}
          </div>

          <AnimatePresence>
            {strip.cursorActive ? (
              <motion.div
                className="pointer-events-none absolute z-20 hidden h-16 w-16 items-center justify-center rounded-full border border-accent bg-black/70 text-[11px] font-[900] uppercase tracking-[0.1em] text-accent md:flex"
                style={{ left: strip.cursorPoint.x, top: strip.cursorPoint.y, x: "-50%", y: "-50%" }}
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
    </section>
  );
}
