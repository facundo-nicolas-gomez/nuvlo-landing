import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./piezas.css";

/**
 * DIRECCIÓN "C · PIEZAS". Sistema y secciones 00 a 04.
 *
 * ── LA TIPOGRAFÍA ES UNA DECISIÓN ───────────────────────────────────────────
 * Archivo, en dos anchos: 700 al 112% para titulares, 400 al 100% para lectura.
 * Una sola superfamilia con contraste de ANCHO en lugar de dos familias
 * peleando. No es Inter, que es el default de todos, ni la del panel: el dueño
 * fijó que del panel sale sólo el producto, y que el panel se acopla a esta
 * landing después, no al revés.
 */
const display = Archivo({
  variable: "--f-display",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--f-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "C · Piezas",
  robots: { index: false, follow: false },
};

export default function LayoutPiezas({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`dirP ${display.variable} ${mono.variable}`}>{children}</div>
  );
}
