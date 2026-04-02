/**
 * Safe URL path for files in `public/brand/`.
 * `encodeURI` does not encode `+`, which breaks `next/image` on Vercel/mobile because
 * `+` is treated as a space in the image optimizer query string.
 */
export function brandAssetPath(filename: string): string {
  return `/brand/${encodeURIComponent(filename)}`;
}
