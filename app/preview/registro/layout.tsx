import type { Metadata } from "next";
import { Archivo, Public_Sans, Schibsted_Grotesk } from "next/font/google";
import "./registro.css";

/**
 * TRES REGISTROS — LAYOUT.
 *
 * Una familia por registro, y las tres cumplen la condición no negociable de
 * esta página: **cifras tabulares de verdad en el archivo**. El objeto que
 * sostiene el sitio es un reporte y todas sus columnas tienen que alinear; una
 * familia que sintetiza `tnum` desalinea la tabla fila contra fila y un
 * comprador de medios lo ve en tres segundos.
 *
 * Ninguna monoespaciada. Usar una mono «para que se vea técnico» es un disfraz,
 * y acá lo técnico ya lo dicen las cifras y la retícula.
 *
 *   Archivo             ESCALA. Grotesca de Omnibus con peso real hasta 900 y
 *                       caja angosta: es la que aguanta un titular gigante sin
 *                       que las líneas se separen en tres bloques sueltos.
 *   Schibsted Grotesk   MASA. Grotesca de medios, dibujada para una redacción.
 *                       Rinde parejo en blanco sobre negro, que es donde vive
 *                       ese registro.
 *   Public Sans         OBJETO. Cara de trabajo, sin gesto propio. Es la
 *                       elección correcta cuando el protagonista es el
 *                       documento y la tipografía tiene que desaparecer.
 *
 * `next/font` las descarga en el build y las sirve desde el propio origen, así
 * que la CSP cerrada a `'self'` de `next.config.ts` no necesita ninguna
 * excepción.
 */

export const archivo = Archivo({
  variable: "--f-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const schibsted = Schibsted_Grotesk({
  variable: "--f-schibsted",
  subsets: ["latin"],
  display: "swap",
});

export const publicSans = Public_Sans({
  variable: "--f-public",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Registros · Nuvlo",
  robots: { index: false, follow: false },
};

export default function LayoutRegistro({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${archivo.variable} ${schibsted.variable} ${publicSans.variable}`}
    >
      {children}
    </div>
  );
}
