import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./base.css";
import "./secciones.css";

/**
 * DIRECCIÓN D. Una sola familia para toda la página.
 *
 * Schibsted Grotesk es una grotesca de medios: se dibujó para una redacción,
 * así que tiene peso real arriba (hasta 900), una caja de texto que aguanta
 * cuerpo chico, y —lo que decidió la elección— **cifras tabulares de verdad en
 * el archivo**, que es la condición no negociable de esta página: el objeto que
 * la sostiene es un reporte y todas sus columnas tienen que alinear.
 *
 * No hay segunda voz. La monoespaciada quedó afuera a propósito: usar una mono
 * para "que se vea técnico" es un disfraz, y acá lo técnico ya lo dicen las
 * cifras y la retícula. Los rótulos de 11px en versalitas los resuelve la misma
 * familia en peso 600.
 */
const sans = Schibsted_Grotesk({
  variable: "--f-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "D · Nuvlo",
  robots: { index: false, follow: false },
};

/**
 * Acá vivía una regla de `<noscript>` que devolvía a la vista todo lo que
 * `motion` hubiera emitido en opacidad 0 durante el render del servidor.
 *
 * Ya no hace falta, y no porque se haya aflojado el requisito sino porque el
 * problema se resolvió donde estaba: `Revelar` no anima con `motion`, así que el
 * servidor emite un `<div>` pelado y el ocultamiento lo hace CSS recién cuando
 * el efecto del cliente le pone el atributo `data-revelar` al nodo. Sin
 * JavaScript no hay atributo, no hay regla que aplique y la página se ve entera
 * por construcción, no por un parche que la destapa.
 */
export default function LayoutD({ children }: { children: React.ReactNode }) {
  return <div className={`dirD ${sans.variable}`}>{children}</div>;
}
