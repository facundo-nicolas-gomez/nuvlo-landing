import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./base.css";
import "./documento.css";
import "./secciones.css";

/**
 * UNA SOLA FAMILIA, Y NO ES GEIST.
 *
 * Esta pasada arranca de cero (decisión del dueño, 07/09/2026) y la familia es
 * la primera decisión que la distingue de las anteriores: Onest y Bricolage
 * fueron el mundo retirado, Schibsted se fue por gruesa, Geist es la de firma.
 *
 * Host Grotesk es una grotesca dibujada para pantalla, con contraformas
 * abiertas y terminales que se notan en cuerpo grande —la «a», la «g», la «t»—
 * sin volverse rara en cuerpo de lectura. Es lo que esta dirección le pide a la
 * tipografía: que cargue la personalidad que la página no pone en el color.
 *
 * Condición no negociable, igual que en todas las pasadas: cifras tabulares de
 * verdad en el archivo, porque el objeto que sostiene el sitio es un reporte y
 * sus columnas tienen que alinear. Se verifica midiendo «111» contra «000» en
 * el navegador, no leyendo la ficha de la fuente.
 *
 * `next/font` la descarga en el build y la sirve desde el propio origen: la CSP
 * cerrada a 'self' de `next.config.ts` no necesita excepciones.
 */
const sans = Host_Grotesk({
  variable: "--n-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nuvlo · neto",
  robots: { index: false, follow: false },
};

export default function LayoutNeto({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={sans.variable}>{children}</div>;
}
