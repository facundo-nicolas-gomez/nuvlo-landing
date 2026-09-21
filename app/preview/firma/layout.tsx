import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./base.css";
import "./documento.css";
import "./secciones.css";
import "./movimiento.css";

/**
 * UNA SOLA FAMILIA.
 *
 * Geist. Reemplaza a Schibsted Grotesk, que se retiró por gruesa (04/09/2026).
 *
 * El problema de Schibsted no era el peso —ya le habíamos bajado dos escalones—
 * sino el DIBUJO: es una grotesca de medios, hecha para que un titular de diario
 * sobreviva a papel malo, y esa robustez se lee pesada en pantalla por liviano
 * que se la use.
 *
 * Geist está dibujada para pantalla y para números: astas finas, terminales
 * rectas, contraformas abiertas. Y trae CIFRAS TABULARES DE VERDAD en el
 * archivo, verificado por medición —«111» y «000» rinden idéntico—, que sigue
 * siendo la condición no negociable: el objeto que sostiene el sitio es un
 * reporte y sus columnas tienen que alinear.
 *
 * Ninguna monoespaciada: usar una mono «para que se vea técnico» es un disfraz.
 *
 * `next/font` la descarga en el build y la sirve desde el propio origen, así que
 * la CSP cerrada a 'self' de `next.config.ts` no necesita excepciones.
 */
const sans = Geist({
  variable: "--f-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nuvlo · rediseño",
  robots: { index: false, follow: false },
};

export default function LayoutFirma({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={sans.variable}>{children}</div>;
}
