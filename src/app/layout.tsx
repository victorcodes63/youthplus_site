import type { Metadata } from "next";
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
        url: "/images/women-s-panel-discussion.jpg",
        width: 1200,
        height: 630,
        alt: "Youth+ Africa Nairobi Summit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Youth+ Africa | Nairobi Summit 2027",
    description:
      "Reserve your ticket for Youth+ Africa Summit 2027 and connect with Africa's top builders.",
    images: ["/images/women-s-panel-discussion.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
