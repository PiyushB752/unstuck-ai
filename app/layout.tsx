import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unstuck AI ",
  description: "Feeling overwhelmed? Unstuck AI turns your messy thoughts into one small, practical next action.",
  keywords: [
    "Unstuck AI",
    "productivity",
    "AI assistant",
    "task management",
    "focus",
  ],
  applicationName: "Unstuck AI",
  authors: [{ name: "Unstuck AI Team" }],
  openGraph: {
    title: "Unstuck AI — Find Your Next Step",
    description:
      "Stop feeling overwhelmed. Find one small action to take right now.",
    siteName: "Unstuck AI",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
