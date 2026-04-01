"use client";

import { useEffect } from "react";

function parseColor(input: string): [number, number, number, number] | null {
  const rgba = input.match(
    /rgba?\(\s*([0-9.]+)\s*[,\s]\s*([0-9.]+)\s*[,\s]\s*([0-9.]+)(?:\s*[/,]\s*([0-9.]+))?\s*\)/i
  );
  if (!rgba) return null;
  const r = Number(rgba[1]);
  const g = Number(rgba[2]);
  const b = Number(rgba[3]);
  const a = rgba[4] === undefined ? 1 : Number(rgba[4]);
  return [r, g, b, a];
}

function luminance([r, g, b]: [number, number, number, number]): number {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function toneFromElementTree(node: Element | null): "dark" | "light" | null {
  let current: Element | null = node;
  while (current) {
    const bg = getComputedStyle(current).backgroundColor;
    const parsed = parseColor(bg);
    if (parsed && parsed[3] > 0.05) {
      return luminance(parsed) < 0.5 ? "dark" : "light";
    }
    current = current.parentElement;
  }
  return null;
}

export function AdaptiveCursor() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    let px = 0;
    let py = 0;

    const updateTone = () => {
      raf = 0;
      const layerStack = document.elementsFromPoint(px, py);
      let tone: "dark" | "light" = "light";

      for (const layer of layerStack) {
        const detected = toneFromElementTree(layer);
        if (detected) {
          tone = detected;
          break;
        }
      }

      root.dataset.cursorTone = tone;
    };

    const onMove = (event: MouseEvent) => {
      px = event.clientX;
      py = event.clientY;
      if (!raf) raf = window.requestAnimationFrame(updateTone);
    };

    root.dataset.cursorTone = "light";
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}

