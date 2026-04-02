import type { Config } from "tailwindcss";

/**
 * Responsive scale (Tailwind defaults — shared with `globals.css` media queries):
 * - default … sm (640px): phones
 * - md (768px): tablets portrait & small laptops — logo wordmark, relaxed density
 * - lg (1024px): tablets landscape & desktops — split layouts, featured-event columns
 * - xl / 2xl: wide screens — optional type and spacing bumps
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0A0A0A",
        accent: "#E5C222",
        secondary: "#6B7280",
        borderLight: "#E5E7EB",
        dark: "#0F0528",
        success: "#059669",
        error: "#DC2626",
      },
      fontFamily: {
        sans: ["var(--font-figtree)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
