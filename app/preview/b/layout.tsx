import type { Metadata } from "next";
import { Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "./b.css";

const sans = Inter_Tight({ variable: "--f-sans", subsets: ["latin"], display: "swap" });
const mono = IBM_Plex_Mono({
  variable: "--f-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "B · Taller",
  robots: { index: false, follow: false },
};

export default function LayoutB({ children }: { children: React.ReactNode }) {
  return <div className={`dirB ${sans.variable} ${mono.variable}`}>{children}</div>;
}
