import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Figtree } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { AdaptiveCursor } from "@/components/site/AdaptiveCursor";
import type { ReactNode } from "react";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-figtree",
});

/** Black mark on light UI; white mark on dark UI (tabs, PWA tiles, etc.). */
const BRAND_ICON = {
  onLight: `/brand/${encodeURIComponent("Y+ Icon Black@3x.png")}`,
  onDark: `/brand/${encodeURIComponent("Y+ Icon White@3x.png")}`,
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
    default: "Youth+ Africa | Nairobi Summit 2027",
    template: "%s | Youth+ Africa",
  },
  description:
    "Youth+ Africa Summit 2027 in Nairobi. Book tickets, explore speakers, and join builders shaping Africa's next decade.",
  openGraph: {
    title: "Youth+ Africa | Nairobi Summit 2027",
    description:
      "Book your Summit 2027 ticket. Meet founders, operators, investors, and creators shaping Africa's future.",
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
    title: "Youth+ Africa | Nairobi Summit 2027",
    description:
      "Reserve your ticket for Youth+ Africa Summit 2027 and connect with Africa's top builders.",
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
      <body className={`${figtree.variable} ${figtree.className} antialiased`}>
        <AdaptiveCursor />
        <SiteHeader />
        <div className="pt-[84px]">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
