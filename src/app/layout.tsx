import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { AdaptiveCursor } from "@/components/site/AdaptiveCursor";
import { brandAssetPath } from "@/lib/brandAssetPath";
import type { ReactNode } from "react";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

/** Black mark on light UI; white mark on dark UI (tabs, PWA tiles, etc.). */
const BRAND_ICON = {
  onLight: brandAssetPath("youthblackheaderm.png"),
  onDark: brandAssetPath("Y+ Icon White@3x.png"),
  width: 3241,
  height: 3240,
} as const;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://youthplusafrica.com"),
  title: {
    default: "Youth+ Festival 2026",
    template: "%s | Youth+ Africa",
  },
  description:
    "Youth+ Festival 2026 in Nairobi. Book tickets, explore speakers, and join builders shaping Africa's next decade.",
  openGraph: {
    title: "Youth+ Festival 2026",
    description:
      "Book your Youth+ Festival 2026 ticket. Meet founders, operators, investors, and creators shaping Africa's future.",
    url: "https://youthplusafrica.com",
    siteName: "Youth+ Africa",
    type: "website",
    images: [
      {
        url: BRAND_ICON.onLight,
        width: BRAND_ICON.width,
        height: BRAND_ICON.height,
        alt: "Youth+ Africa",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Youth+ Festival 2026",
    description:
      "Reserve your ticket for Youth+ Festival 2026 and connect with Africa's top builders.",
    images: [BRAND_ICON.onLight],
  },
  icons: {
    icon: [
      {
        url: BRAND_ICON.onLight,
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: BRAND_ICON.onDark,
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: BRAND_ICON.onLight,
        type: "image/png",
      },
    ],
    shortcut: BRAND_ICON.onLight,
    apple: BRAND_ICON.onLight,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${plusJakarta.variable} antialiased`}>
        <AdaptiveCursor />
        <SiteHeader />
        <div className="pt-[var(--site-header-height)]">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
