/**
 * Capitalises the first letter of each whitespace-delimited word; lowercases the rest.
 * Hyphenated words are split so each segment is title-cased (e.g. `AI-powered` ? `AI-Powered`).
 * Short tech/business acronyms stay uppercase when they appear as a whole segment (`ai` ? `AI`).
 */
const SEGMENT_ACRONYMS = new Set([
  "ai",
  "it",
  "hr",
  "ceo",
  "cfo",
  "cto",
  "coo",
  "vp",
  "pr",
  "ux",
  "ui",
  "bim",
  "nft",
]);

function titleCaseSegment(segment: string): string {
  if (!segment) return segment;
  if (!/[a-z]/i.test(segment)) return segment;
  const lower = segment.toLowerCase();
  if (SEGMENT_ACRONYMS.has(lower)) return lower.toUpperCase();
  return segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
}

export function toTitleCaseWords(input: string): string {
  return input
    .trim()
    .split(/\s+/)
    .map((word) => word.split("-").map(titleCaseSegment).join("-"))
    .join(" ");
}
