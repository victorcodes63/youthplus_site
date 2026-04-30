"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";

interface Line {
  words: string[];
  isKeyword?: boolean[];
}

interface Phase {
  headline: React.ReactNode;
  lines: Line[];
}

const phases: Phase[] = [
  {
    headline: (
      <>
        Most events give you a{" "}
        <span className="text-[#e5c222]">room.</span>
      </>
    ),
    lines: [
      { words: ["You", "leave", "the", "same", "person", "you", "arrived", "as."] },
    ],
  },
  {
    headline: (
      <>
        We give you a{" "}
        <span className="text-[#e5c222]">turning point.</span>
      </>
    ),
    lines: [
      {
        words: ["The", "moment", "when", "something", "clicks."],
        isKeyword: [false, false, false, false, true],
      },
      { words: ["When", "the", "founder", "you", "meet", "changes", "the", "company", "you", "build."] },
    ],
  },
  {
    headline: (
      <>
        Every detail is{" "}
        <span className="text-[#e5c222]">on purpose.</span>
      </>
    ),
    lines: [
      {
        words: ["Nothing", "is", "filler.", "Everything", "moves", "you", "forward."],
        isKeyword: [false, false, false, false, false, true, true],
      },
    ],
  },
  {
    headline: (
      <>
        You leave{" "}
        <span className="text-[#e5c222]">different.</span>
      </>
    ),
    lines: [
      {
        words: ["Not", "seats", "filled.", "People", "changed."],
        isKeyword: [false, false, false, false, true],
      },
    ],
  },
];

const allLines = phases.flatMap((p, pi) =>
  p.lines.map((line, li) => ({ line, phase: pi, lineIdx: li }))
);

const PHASE_SCROLL = 0.18;
const LINE_SCROLL  = 0.06;
const HEADER_HEIGHT = 84;

function RevealToken({
  word,
  isKeyword,
  index,
  total,
  smooth,
  lineStart,
}: {
  word: string;
  isKeyword: boolean;
  index: number;
  total: number;
  smooth: MotionValue<number>;
  lineStart: number;
}) {
  const wordFrac    = index / (total + 4);
  const wordFracEnd = (index + 4) / (total + 4);

  const localProgress = useTransform(smooth, [lineStart, lineStart + LINE_SCROLL], [0, 1]);
  const opacity = useTransform(localProgress, [wordFrac, wordFracEnd], [0.12, 1]);
  const blur    = useTransform(localProgress, [wordFrac, wordFracEnd], ["blur(8px)", "blur(0px)"]);
  const y       = useTransform(localProgress, [wordFrac, wordFracEnd], [8, 0]);

  return (
    <motion.span
      style={{ opacity, filter: blur, y }}
      className={`inline-block ${isKeyword ? "text-[#e5c222] font-semibold" : "text-black/90"}`}
    >
      {word}
    </motion.span>
  );
}

function PhaseHeadline({
  children,
  phase,
  smooth,
  isLast,
}: {
  children: React.ReactNode;
  phase: number;
  smooth: MotionValue<number>;
  isLast: boolean;
}) {
  const start = phase * PHASE_SCROLL;
  const fadeIn = useTransform(smooth, [start, start + 0.06], [0, 1]);
  const fadeOut = useTransform(
    smooth,
    [start + PHASE_SCROLL - 0.02, start + PHASE_SCROLL],
    [1, 0]
  );
  const mergedOpacity = useTransform([fadeIn, fadeOut], ([i, o]: number[]) =>
    Math.min(i, o)
  );
  const y = useTransform(smooth, [start, start + 0.06], [20, 0]);

  return (
    <motion.h2
      style={{
        opacity: isLast ? fadeIn : mergedOpacity,
        y,
        fontVariationSettings: '"opsz" 48',
      }}
      className="absolute inset-x-0 text-h1 text-black text-center"
    >
      {children}
    </motion.h2>
  );
}

export function WhyUsStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [`start ${HEADER_HEIGHT}px`, "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(smooth, "change", (latest) => {
    const idx = Math.max(
      0,
      Math.min(phases.length - 1, Math.floor(latest / PHASE_SCROLL))
    );
    setActivePhase(idx);
  });

  const progressWidth   = useTransform(smooth, [0, 1], ["0%", "100%"]);
  const identityOpacity = useTransform(smooth, [0.82, 0.9], [0, 1]);
  const identityY       = useTransform(smooth, [0.82, 0.9], [16, 0]);
  const eyebrowOpacity  = useTransform(smooth, [0, 0.05], [0, 1]);

  return (
    <div ref={containerRef} className="relative bg-white h-[700vh]">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-black/10 z-50">
        <motion.div style={{ width: progressWidth }} className="h-full bg-[#e5c222]" />
      </div>

      <div
        className="sticky flex items-center justify-center overflow-hidden"
        style={{
          top: HEADER_HEIGHT,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        {/* Centre radial light */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[70vw] h-[70vw] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(10,10,10,0.05) 0%, transparent 65%)",
            }}
          />
        </div>

        {/* Phase nav dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          {phases.map((_, i) => (
            <div
              key={i}
              className={`h-[5px] w-[5px] rounded-full transition-colors duration-300 ${
                i === activePhase ? "bg-[#e5c222]" : "bg-black/20"
              }`}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-[1100px] px-6 text-center">
          {/* Eyebrow */}
          <motion.div
            style={{ opacity: eyebrowOpacity }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <div className="w-6 h-px bg-[#e5c222]" />
            <span className="text-label text-[#e5c222]">
              Why Youth+ Africa
            </span>
            <div className="w-6 h-px bg-[#e5c222]" />
          </motion.div>

          {/* Headlines */}
          <div className="relative h-[120px] mb-10 flex justify-center">
            {phases.map((p, i) => (
              <PhaseHeadline
                key={i}
                phase={i}
                smooth={smooth}
                isLast={i === phases.length - 1}
              >
                {p.headline}
              </PhaseHeadline>
            ))}
          </div>

          {/* Story lines */}
          <div className="flex flex-col gap-4 min-h-[160px] items-center">
            {allLines.map(({ line, phase, lineIdx }, i) => {
              const lineStart = phase * PHASE_SCROLL + (lineIdx + 0.5) * LINE_SCROLL;
              return (
                <div
                  key={i}
                  className="flex flex-wrap justify-center gap-x-[0.3em] text-h3 leading-relaxed"
                >
                  {line.words.map((word, wi) => (
                    <RevealToken
                      key={wi}
                      word={word}
                      isKeyword={line.isKeyword?.[wi] ?? false}
                      index={wi}
                      total={line.words.length}
                      smooth={smooth}
                      lineStart={lineStart}
                    />
                  ))}
                </div>
              );
            })}
          </div>

          {/* Identity moment */}
          <motion.div
            style={{ opacity: identityOpacity, y: identityY }}
            className="mt-10 pt-8 border-t border-black/10 flex items-start justify-center gap-8 flex-wrap"
          >
            <div className="text-center flex-shrink-0">
              <span className="block text-stat text-[#e5c222]">
                8
              </span>
              <span className="block text-label text-black/45 mt-1">
                Years
              </span>
            </div>
            <div className="w-px h-14 bg-black/15 flex-shrink-0 self-center" />
            <div className="text-center flex-shrink-0">
              <span className="block text-stat text-[#e5c222]">
                10K+
              </span>
              <span className="block text-label text-black/45 mt-1">
                Transformed
              </span>
            </div>
            <div className="w-px h-14 bg-black/15 flex-shrink-0 self-center" />
            <p className="text-lead max-w-[340px] text-center">
              <span className="text-black/90 font-medium">
                This isn&apos;t a platform. It&apos;s a movement.
              </span>{" "}
              Every event, every ticket, every connection is one more young
              African stepping into who they were always meant to be.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}