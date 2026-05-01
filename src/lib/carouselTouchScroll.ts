/**
 * Horizontal carousels use pointer events for drag. On touch, `setPointerCapture`
 * + immediate drag mode steals vertical scroll. We only capture for mouse, and
 * for touch we wait for a slop-based axis decision before treating the gesture as
 * horizontal drag.
 */
export const CAROUSEL_TOUCH_SLOP_PX = 12;

export type CarouselGestureIntent = "idle" | "pending" | "horizontal" | "vertical";

export function resolveCarouselTouchIntent(
  clientX: number,
  clientY: number,
  startX: number,
  startY: number,
): "pending" | "horizontal" | "vertical" {
  const dx = clientX - startX;
  const dy = clientY - startY;
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);
  if (ay > CAROUSEL_TOUCH_SLOP_PX && ay > ax) return "vertical";
  if (ax > CAROUSEL_TOUCH_SLOP_PX && ax >= ay) return "horizontal";
  return "pending";
}
