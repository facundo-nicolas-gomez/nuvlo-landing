import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./c.css";
import "./secciones.css";

const sans = Manrope({ variable: "--f-sans", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({
  variable: "--f-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "C · Estados",
  robots: { index: false, follow: false },
};

export default function LayoutC({ children }: { children: React.ReactNode }) {
  return <div className={`dirC ${sans.variable} ${mono.variable}`}>{children}</div>;
}
