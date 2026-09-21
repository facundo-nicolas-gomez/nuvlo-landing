import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./bocetos.css";

/**
 * BOCETOS DE LA DIRECCIÓN "C · PIEZAS".
 *
 * Fidelidad media a propósito: proporciones y jerarquía reales, relleno
 * esquemático. Se aprueba la composición acá y recién después se construye el
 * sitio. Los bloques van con contorno punteado justamente para que nadie
 * confunda un boceto con la pieza terminada.
 *
 * ── LA TIPOGRAFÍA ES UNA DECISIÓN, NO UN RELLENO ────────────────────────────
 * Archivo, en dos anchos. El expandido a 700 en los titulares es lo que da la
 * fuerza que se pidió sin gritar con el cuerpo, y el ancho normal sostiene la
 * lectura. Una sola superfamilia con contraste de ANCHO en lugar de dos familias
 * peleando. No es Inter (el default de todo el mundo) ni Bricolage (la del
 * panel, que no se hereda por decisión del dueño).
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
  title: "Bocetos · C · Piezas",
  robots: { index: false, follow: false },
};

export default function LayoutBocetos({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`bocetos ${display.variable} ${mono.variable}`}>
      {children}
    </div>
  );
}
