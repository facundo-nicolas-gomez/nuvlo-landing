import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";

import "./base.css";
import "./secciones.css";
import "./documento.css";

/**
 * Archivo es la voz de la dirección: una grotesca de raíz editorial que aguanta
 * tracking cerrado a tamaño de portada sin deshacerse, y que a cuerpo sigue
 * siendo neutra. Importa acá más que en una landing en inglés: el español rinde
 * bastante más ancho, y un titular de portada en voseo necesita una letra que
 * no se derrame.
 */
const archivo = Archivo({
  variable: "--fuente-archivo",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Plex Mono lleva TODA la cifra del sitio: los KPI, la tabla, los precios y las
 * horas del recorrido. El visitante es un comprador de medios que lee estos
 * números todos los días; que las columnas aliñen no es un detalle tipográfico
 * sino la condición para que el reporte parezca un reporte.
 */
const plexMono = IBM_Plex_Mono({
  variable: "--fuente-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mesa de luz · preview",
  robots: { index: false, follow: false },
};

/**
 * Ruta de prototipo. Producción sigue sirviendo el sistema anterior sin
 * tocarse; esto vive aparte hasta que la dirección se apruebe y se promueva.
 */
export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`mesa ${archivo.variable} ${plexMono.variable}`}>
      {children}
    </div>
  );
}
