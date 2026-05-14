import { useCallback, useEffect, useRef, useState, type PointerEventHandler } from "react";
import { type CarouselGestureIntent, resolveCarouselTouchIntent } from "@/lib/carouselTouchScroll";

const EDGE_RESIST = 0.28;

/** ease-out-back: slight overshoot then settle (transform only). */
const TRACK_SETTLE_MS = 560;
const TRACK_SETTLE_EASE = "cubic-bezier(0.175, 0.885, 0.32, 1.275)";

type UseStripCarouselOptions = {
  itemCount: number;
  /** `querySelector` under the track, e.g. `[data-case-study-card]`. */
  cardSelector: string;
  /** Fallback when `gap` cannot be read from computed styles. */
  defaultGap: number;
  reduceMotion: boolean;
};

/**
 * Horizontal strip used by Case Studies and Speakers on the home page.
 * Scroll position is **pixel-based**: releasing the pointer leaves the strip where you dragged
 * (with light rubber-band past the ends, then snap back into range).
 * When motion is allowed, releasing or using arrows uses a short **ease-out-back**
 * settle so the strip eases past the target slightly then rests.
 */
export function useStripCarousel({
  itemCount,
  cardSelector,
  defaultGap,
  reduceMotion,
}: UseStripCarouselOptions) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorPoint, setCursorPoint] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  /** Committed horizontal scroll in px (0 = start of strip). */
  const [scrollX, setScrollX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [gap, setGap] = useState(defaultGap);

  const scrollXRef = useRef(0);
  const maxScrollRef = useRef(0);
  const scrollStartRef = useRef(0);
  const originXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const intentRef = useRef<CarouselGestureIntent>("idle");

  useEffect(() => {
    scrollXRef.current = scrollX;
  }, [scrollX]);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const card = track.querySelector<HTMLElement>(cardSelector);
    if (!card) return;
    const nextCardWidth = card.offsetWidth;
    const trackStyle = window.getComputedStyle(track);
    const nextGap = parseFloat(trackStyle.columnGap || trackStyle.gap || String(defaultGap));
    const gapPx = Number.isFinite(nextGap) ? nextGap : defaultGap;

    const vpClient = viewport.clientWidth;
    /** Use the widest reliable width so maxScroll matches the visible scrollport (both edges rubber correctly). */
    let childrenSum = 0;
    for (const node of track.children) {
      if (node instanceof HTMLElement) childrenSum += node.offsetWidth;
    }
    const gapCount = Math.max(0, track.children.length - 1);
    const manualWidth = childrenSum + gapCount * gapPx;
    const contentW = Math.max(
      viewport.scrollWidth,
      track.scrollWidth,
      track.offsetWidth,
      manualWidth,
    );
    const nextMaxScroll = Math.max(0, Math.ceil(contentW - vpClient));

    setCardWidth(nextCardWidth);
    setGap(gapPx);
    maxScrollRef.current = nextMaxScroll;
    setMaxScroll(nextMaxScroll);
  }, [cardSelector, defaultGap]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    const viewport = viewportRef.current;
    const track = trackRef.current;
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined" && viewport && track) {
      ro = new ResizeObserver(measure);
      ro.observe(viewport);
      ro.observe(track);
    }
    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, [measure, itemCount]);

  useEffect(() => {
    setScrollX((prev) => Math.min(prev, maxScroll));
  }, [maxScroll]);

  const applyRubber = useCallback((raw: number) => {
    const max = maxScrollRef.current;
    if (raw < 0) return raw * EDGE_RESIST;
    if (raw > max) return max + (raw - max) * EDGE_RESIST;
    return raw;
  }, []);

  const baseOffset = -scrollX;

  const slideBy = useCallback((direction: "prev" | "next") => {
    const step = cardWidth + gap;
    if (step <= 0) return;
    const delta = direction === "next" ? step : -step;
    setScrollX((s) => Math.max(0, Math.min(maxScrollRef.current, s + delta)));
  }, [cardWidth, gap]);

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerIdRef.current = event.pointerId;
    originXRef.current = event.clientX;
    dragStartYRef.current = event.clientY;
    scrollStartRef.current = scrollXRef.current;
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

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (pointerIdRef.current !== event.pointerId) return;

    if (intentRef.current === "pending") {
      const next = resolveCarouselTouchIntent(
        event.clientX,
        event.clientY,
        originXRef.current,
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
      if (event.pointerType !== "mouse") {
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
          /* ignore */
        }
      }
    }

    if (intentRef.current === "vertical") return;
    if (intentRef.current !== "horizontal") return;

    const delta = event.clientX - originXRef.current;

    const rawVisual = scrollStartRef.current - delta;
    const v = applyRubber(rawVisual);
    const nextDrag = scrollStartRef.current - v;
    dragOffsetRef.current = nextDrag;
    setDragOffset(nextDrag);
  };

  const endPointer = (pointerId: number) => {
    if (pointerIdRef.current !== pointerId) return;
    const intent = intentRef.current;
    const dragExtra = dragOffsetRef.current;
    const S = scrollStartRef.current;
    const viewport = viewportRef.current;
    if (viewport?.releasePointerCapture) {
      try {
        if (viewport.hasPointerCapture(pointerId)) viewport.releasePointerCapture(pointerId);
      } catch {
        /* ignore */
      }
    }
    setIsDragging(false);
    pointerIdRef.current = null;
    intentRef.current = "idle";
    dragOffsetRef.current = 0;
    setDragOffset(0);

    if (intent === "vertical") return;

    const max = maxScrollRef.current;
    const visual = S - dragExtra;
    setScrollX(Math.max(0, Math.min(max, visual)));
  };

  const onPointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    endPointer(event.pointerId);
  };

  const onPointerCancel: PointerEventHandler<HTMLDivElement> = (event) => {
    endPointer(event.pointerId);
  };

  const trackTransition = isDragging
    ? "none"
    : reduceMotion
      ? "transform 200ms cubic-bezier(0.25, 0.1, 0.25, 1)"
      : `transform ${TRACK_SETTLE_MS}ms ${TRACK_SETTLE_EASE}`;

  return {
    viewportRef,
    trackRef,
    cursorActive,
    setCursorActive,
    cursorPoint,
    setCursorPoint: (point: { x: number; y: number }) => setCursorPoint(point),
    isDragging,
    dragOffset,
    baseOffset,
    slideBy,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    trackTransition,
  };
}
