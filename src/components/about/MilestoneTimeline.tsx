"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./MilestoneTimeline.module.css";

export interface Milestone {
  year: string;
  label: string;
  title: string;
  description: string;
  image?: string;
  icon: React.ReactNode;
}

interface MilestoneTimelineProps {
  milestones: Milestone[];
  theme?: "dark" | "light";
  autoLoopDefault?: boolean;
  floating?: boolean;
}

const DRAG_THRESHOLD = 60;
const AUTO_LOOP_INTERVAL_DESKTOP = 4000;
const AUTO_LOOP_INTERVAL_MOBILE = 5000;
const PROGRESS_RADIUS = 22;
const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_RADIUS;
const TRANSITION_TOTAL_MS = 800;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function MilestoneTimeline({
  milestones,
  theme = "light",
  autoLoopDefault = true,
  floating = false,
}: MilestoneTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusedWithin, setIsFocusedWithin] = useState(false);
  const [interactionPause, setInteractionPause] = useState(false);
  const [autoLoopEnabled, setAutoLoopEnabled] = useState(autoLoopDefault);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorPoint, setCursorPoint] = useState({ x: 0, y: 0 });

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const movedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const autoStartRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const intervalMs = isMobile ? AUTO_LOOP_INTERVAL_MOBILE : AUTO_LOOP_INTERVAL_DESKTOP;

  useEffect(() => {
    const mediaMobile = window.matchMedia("(max-width: 767px)");
    const mediaTablet = window.matchMedia("(min-width: 768px) and (max-width: 1024px)");
    const mediaReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setIsMobile(mediaMobile.matches);
      setIsTablet(mediaTablet.matches);
      setReduceMotion(mediaReduce.matches);
    };

    sync();
    mediaMobile.addEventListener("change", sync);
    mediaTablet.addEventListener("change", sync);
    mediaReduce.addEventListener("change", sync);
    return () => {
      mediaMobile.removeEventListener("change", sync);
      mediaTablet.removeEventListener("change", sync);
      mediaReduce.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const target = viewportRef.current;
    if (!target) return;
    const measure = () => setViewportWidth(target.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (previousIndex === null || previousIndex === activeIndex) return;
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    transitionTimeoutRef.current = setTimeout(
      () => {
        setPreviousIndex(activeIndex);
      },
      reduceMotion ? 0 : TRANSITION_TOTAL_MS,
    );
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, [activeIndex, previousIndex, reduceMotion]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  const geometry = useMemo(() => {
    const count = milestones.length || 1;
    const width = Math.max(320, viewportWidth || 0);
    const edgePadding = isMobile ? 24 : isTablet ? 56 : Math.max(84, width * 0.2);
    const gap = isMobile
      ? Math.max(82, width * 0.3)
      : isTablet
        ? Math.max(170, width * 0.24)
        : Math.max(220, width * 0.22);
    const positions = Array.from({ length: count }, (_, i) => edgePadding + i * gap);
    const trackWidth = edgePadding * 2 + (count - 1) * gap;
    return { positions, trackWidth };
  }, [isMobile, isTablet, milestones.length, viewportWidth]);

  const ticks = useMemo(() => {
    const trackWidth = geometry.trackWidth;
    const list: Array<{ left: number; type: "min" | "mid" | "milestone"; key: string }> = [];
    if (!trackWidth) return list;
    const tickGap = isMobile ? 16 : 8;
    const count = Math.floor(trackWidth / tickGap);
    for (let i = 0; i <= count; i++) {
      const left = i * tickGap;
      const overlapsMilestone = geometry.positions.some(
        (p) => Math.abs(p - left) < tickGap,
      );
      if (overlapsMilestone) continue;
      const type: "min" | "mid" = i % 5 === 0 ? "mid" : "min";
      list.push({ left, type, key: `f-${i}` });
    }
    geometry.positions.forEach((p, i) => {
      list.push({ left: p, type: "milestone", key: `m-${i}` });
    });
    return list;
  }, [geometry.trackWidth, geometry.positions, isMobile]);

  const safeIndex = clamp(activeIndex, 0, Math.max(0, milestones.length - 1));
  const activeCard = milestones[safeIndex];
  const previousCard = previousIndex === null ? null : milestones[previousIndex];
  const nextCard = safeIndex < milestones.length - 1 ? milestones[safeIndex + 1] : null;
  const activeX = geometry.positions[safeIndex] ?? 0;
  const baseOffset = viewportWidth ? viewportWidth / 2 - activeX : 0;
  const railTransform = `translate3d(${baseOffset + dragOffset}px, 0, 0)`;

  const shouldAutoLoop =
    autoLoopEnabled &&
    !reduceMotion &&
    !isDragging &&
    !isHovered &&
    !isFocusedWithin &&
    !interactionPause &&
    milestones.length > 1;

  useEffect(() => {
    if (!shouldAutoLoop) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      autoStartRef.current = null;
      return;
    }

    const tick = (now: number) => {
      if (autoStartRef.current === null) autoStartRef.current = now;
      const elapsed = now - autoStartRef.current;
      const ratio = clamp(elapsed / intervalMs, 0, 1);
      setProgress(ratio);
      if (ratio >= 1) {
        autoStartRef.current = now;
        const current = activeIndexRef.current;
        const next = (current + 1) % milestones.length;
        setPreviousIndex(current);
        setActiveIndex(next);
        setProgress(0);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    autoStartRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [intervalMs, milestones.length, shouldAutoLoop]);

  const pauseTemporarily = useCallback(() => {
    setInteractionPause(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setInteractionPause(false);
      autoStartRef.current = null;
      setProgress(0);
    }, 2000);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (!milestones.length) return;
      const bounded = ((next % milestones.length) + milestones.length) % milestones.length;
      const current = activeIndexRef.current;
      if (bounded === current) return;
      setPreviousIndex(current);
      setActiveIndex(bounded);
      autoStartRef.current = null;
      setProgress(0);
    },
    [milestones.length],
  );

  const goNext = useCallback(() => {
    const current = activeIndexRef.current;
    if (current < milestones.length - 1) goTo(current + 1);
  }, [goTo, milestones.length]);

  const goPrev = useCallback(() => {
    const current = activeIndexRef.current;
    if (current > 0) goTo(current - 1);
  }, [goTo]);

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    movedRef.current = false;
    dragOffsetRef.current = 0;
    setIsDragging(true);
    setDragOffset(0);
    setInteractionPause(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!isDragging || pointerIdRef.current !== event.pointerId) return;
    const delta = event.clientX - dragStartXRef.current;
    if (Math.abs(delta) > 4) movedRef.current = true;
    dragOffsetRef.current = delta;
    setDragOffset(delta);
  };

  const endPointer = (pointerId: number) => {
    if (pointerIdRef.current !== pointerId) return;
    const finalOffset = dragOffsetRef.current;
    setIsDragging(false);
    pointerIdRef.current = null;
    dragOffsetRef.current = 0;
    setDragOffset(0);
    if (finalOffset <= -DRAG_THRESHOLD) {
      goNext();
      pauseTemporarily();
      return;
    }
    if (finalOffset >= DRAG_THRESHOLD) {
      goPrev();
      pauseTemporarily();
      return;
    }
    pauseTemporarily();
  };

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (event) => {
    endPointer(event.pointerId);
  };

  const onPointerCancel: React.PointerEventHandler<HTMLDivElement> = (event) => {
    endPointer(event.pointerId);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
      pauseTemporarily();
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
      pauseTemporarily();
      return;
    }
  };

  if (!milestones.length) return null;

  const renderAutoToggle = (slot: "desktop" | "mobile") => (
    <button
      type="button"
      onClick={() => {
        setAutoLoopEnabled((enabled) => !enabled);
        pauseTemporarily();
      }}
      aria-label={autoLoopEnabled ? "Pause auto loop" : "Resume auto loop"}
      aria-pressed={autoLoopEnabled}
      className={[
        styles.autoToggle,
        autoLoopEnabled ? styles.autoToggleOn : "",
      ].join(" ")}
      data-slot={slot}
    >
      {autoLoopEnabled && <span className={styles.autoDot} aria-hidden />}
      Auto
    </button>
  );

  return (
    <section
      className={[
        styles.timeline,
        theme === "light" ? styles.light : styles.dark,
        floating ? styles.floating : "",
      ].join(" ")}
      tabIndex={0}
      aria-roledescription="timeline"
      aria-label="Milestone timeline"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!reduceMotion && (
        <div className={styles.autoToggleDesktop}>{renderAutoToggle("desktop")}</div>
      )}

      <div className={styles.railFrame}>
        <div
          ref={viewportRef}
          className={[styles.railViewport, isDragging ? styles.dragging : ""].join(" ")}
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
        >
          <div className={styles.railBaseline} aria-hidden />

          <div
            className={styles.railTrack}
            style={{
              width: `${geometry.trackWidth}px`,
              transform: railTransform,
              transition: isDragging
                ? "none"
                : `transform ${reduceMotion ? 1 : 600}ms cubic-bezier(0.16, 1, 0.3, 1)`,
            }}
          >
            <div className={styles.ticksLayer} aria-hidden>
              {ticks.map((t) => (
                <span
                  key={t.key}
                  className={[
                    styles.tick,
                    t.type === "milestone" ? styles.tickMilestone : "",
                    t.type === "mid" ? styles.tickMid : "",
                  ].join(" ")}
                  style={{ left: `${t.left}px` }}
                />
              ))}
            </div>

            {milestones.map((milestone, index) => {
              const isActive = index === safeIndex;
              const nodeLabel = `${milestone.year} ${milestone.label}: ${milestone.title}`;
              const showProgress = isActive && shouldAutoLoop;
              return (
                <div
                  key={`${milestone.year}-${milestone.title}`}
                  className={styles.railNode}
                  style={{ left: `${geometry.positions[index]}px` }}
                >
                  {isActive && (
                    <span key={`year-${index}`} className={styles.nodeYear}>
                      {milestone.year}
                    </span>
                  )}

                  {isActive && !reduceMotion && (
                    <span
                      key={`pulse-${index}`}
                      className={styles.pulseRing}
                      aria-hidden
                    />
                  )}

                  <button
                    type="button"
                    className={[
                      styles.nodeButton,
                      isActive ? styles.nodeActive : "",
                    ].join(" ")}
                    aria-label={nodeLabel}
                    aria-current={isActive ? "step" : undefined}
                    onClick={() => {
                      if (movedRef.current) return;
                      goTo(index);
                      pauseTemporarily();
                    }}
                  >
                    <span className={styles.nodeIcon} aria-hidden>
                      {milestone.icon}
                    </span>
                    {showProgress && (
                      <svg
                        className={styles.progressSvg}
                        viewBox="0 0 48 48"
                        aria-hidden
                      >
                        <circle
                          className={styles.progressTrack}
                          cx="24"
                          cy="24"
                          r={PROGRESS_RADIUS}
                        />
                        <circle
                          className={styles.progressFill}
                          cx="24"
                          cy="24"
                          r={PROGRESS_RADIUS}
                          strokeDasharray={PROGRESS_CIRCUMFERENCE}
                          strokeDashoffset={PROGRESS_CIRCUMFERENCE * (1 - progress)}
                        />
                      </svg>
                    )}
                  </button>
                </div>
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

      <div className={styles.connectorWrap} aria-hidden>
        <div
          key={`connector-${safeIndex}`}
          className={[styles.connector, styles.connectorVisible].join(" ")}
        />
      </div>

      <div
        className={styles.contentZone}
        onFocusCapture={() => setIsFocusedWithin(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsFocusedWithin(false);
          }
        }}
      >
        <div className={styles.cardShell}>
          <span className={styles.cardHairline} aria-hidden />

          <header className={styles.cardHeader}>
            <div
              key={`eyebrow-${safeIndex}`}
              className={[
                styles.eyebrowChip,
                reduceMotion ? "" : styles.eyebrowChipEntering,
              ].join(" ")}
            >
              <span className={styles.eyebrowDot} aria-hidden />
              <span className={styles.eyebrowText}>{activeCard.label}</span>
            </div>

            <div className={styles.counter} aria-hidden>
              <span
                key={`counter-current-${safeIndex}`}
                className={[
                  styles.counterCurrent,
                  reduceMotion ? "" : styles.counterCurrentEntering,
                ].join(" ")}
              >
                {String(safeIndex + 1).padStart(2, "0")}
              </span>
              <span className={styles.counterSep}>/</span>
              <span className={styles.counterTotal}>
                {String(milestones.length).padStart(2, "0")}
              </span>
            </div>
          </header>

          <div className={styles.card}>
            <div className={styles.imageStage}>
              {previousCard?.image &&
                previousIndex !== safeIndex &&
                !reduceMotion && (
                  <div
                    key={`prev-img-${previousIndex}`}
                    className={[styles.imageWrap, styles.imageLeaving].join(" ")}
                  >
                    <Image
                      src={previousCard.image}
                      alt=""
                      fill
                      sizes="(max-width: 767px) 100vw, 320px"
                      className={styles.image}
                    />
                  </div>
                )}
              {activeCard.image && (
                <div
                  key={`cur-img-${safeIndex}`}
                  className={[styles.imageWrap, styles.imageEntering].join(" ")}
                >
                  <Image
                    src={activeCard.image}
                    alt={activeCard.title}
                    fill
                    sizes="(max-width: 767px) 100vw, 320px"
                    className={styles.image}
                  />
                </div>
              )}

              <div className={styles.imageOverlay} aria-hidden />

              <span
                key={`year-badge-${safeIndex}`}
                className={[
                  styles.yearBadge,
                  reduceMotion ? "" : styles.yearBadgeEntering,
                ].join(" ")}
                aria-hidden
              >
                {activeCard.year}
              </span>
            </div>

            <div className={styles.textStage}>
              {previousCard &&
                previousIndex !== safeIndex &&
                !reduceMotion && (
                  <div
                    key={`prev-text-${previousIndex}`}
                    className={[styles.textBlock, styles.textBlockLeaving].join(" ")}
                    aria-hidden
                  >
                    <h3 className={styles.title}>{previousCard.title}</h3>
                    <p className={styles.description}>{previousCard.description}</p>
                  </div>
                )}
              <div
                key={`cur-text-${safeIndex}`}
                className={[
                  styles.textBlock,
                  reduceMotion ? "" : styles.textBlockEntering,
                ].join(" ")}
              >
                <h3 className={styles.title}>
                  {activeCard.title}
                  <span className={styles.titleAccent} aria-hidden />
                </h3>
                <p className={styles.description}>{activeCard.description}</p>
              </div>
            </div>
          </div>

          <div className={styles.navRow}>
            {nextCard ? (
              <button
                type="button"
                className={styles.upNext}
                onClick={() => {
                  goNext();
                  pauseTemporarily();
                }}
                aria-label={`Skip to ${nextCard.year} ${nextCard.title}`}
              >
                <span className={styles.upNextLabel}>Up next</span>
                <span className={styles.upNextDivider} aria-hidden />
                <span
                  key={`up-next-${safeIndex}`}
                  className={[
                    styles.upNextValue,
                    reduceMotion ? "" : styles.upNextValueEntering,
                  ].join(" ")}
                >
                  <span className={styles.upNextYear}>{nextCard.year}</span>
                  <span className={styles.upNextDot} aria-hidden>
                    •
                  </span>
                  <span className={styles.upNextTitle}>{nextCard.title}</span>
                </span>
                <span className={styles.upNextArrow} aria-hidden>
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            ) : (
              <span className={[styles.upNext, styles.upNextDone].join(" ")}>
                <span className={styles.upNextLabel}>You&apos;re up to date</span>
              </span>
            )}

            <div className={styles.navActions}>
              <div className={styles.navArrows}>
                <button
                  type="button"
                  className={styles.navArrow}
                  aria-label="Previous milestone"
                  disabled={safeIndex === 0}
                  onClick={() => {
                    goPrev();
                    pauseTemporarily();
                  }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
                    <path
                      d="M15 18l-6-6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className={styles.navArrow}
                  aria-label="Next milestone"
                  disabled={safeIndex === milestones.length - 1}
                  onClick={() => {
                    goNext();
                    pauseTemporarily();
                  }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {!reduceMotion && (
                <div className={styles.autoToggleMobile}>{renderAutoToggle("mobile")}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.srOnly} aria-live="polite">
        {activeCard.year} {activeCard.title}
      </div>
    </section>
  );
}
