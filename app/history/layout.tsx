import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your History | Unstuck AI",
  description: "View your previous problems and completed actions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HistoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}