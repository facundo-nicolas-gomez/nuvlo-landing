import type { CSSProperties, ReactNode } from "react";
import { Observado } from "./Observado";

/**
 * REVELADO PROGRESIVO.
 *
 * ── UN OBSERVADOR POR BLOQUE, NO UNO POR FILA ───────────────────────────────
 * `Entra` es lo único que mira la pantalla. Las filas que tiene adentro no
 * observan nada: heredan el estado del bloque y se escalonan con una demora
 * calculada desde `--orden` en CSS.
 *
 * Esto empezó siendo un observador por fila y estaba roto de una forma que sólo
 * se ve midiendo: ocho filas del reporte quedaban invisibles PARA SIEMPRE.
 * Viven adentro del recorte del documento, que tiene `overflow: hidden`, y un
 * elemento clipeado por un ancestro nunca intersecta el viewport —la API cuenta
 * el recorte como parte de la visibilidad—, así que su observador no se
 * disparaba nunca. Con el estado heredado del bloque el problema no existe,
 * porque el que observa es el contenedor, que sí está a la vista.
 *
 * De paso: 55 observadores pasaron a ser 9, y las filas dejaron de necesitar
 * JavaScript propio.
 *
 * ── EL ESTADO POR DEFECTO ES VISIBLE ────────────────────────────────────────
 * El servidor emite los nodos pelados, sin un solo estilo de ocultamiento. Las
 * reglas que ocultan cuelgan de `[data-entra="oculto"]`, un atributo que sólo
 * existe después de que corre el efecto del cliente. Sin JavaScript no hay
 * atributo, no hay regla que aplique y la página se ve entera por construcción,
 * no por un `<noscript>` que la destapa.
 */

export { Observado as Entra };

/**
 * Una fila de un conjunto. Es un componente de servidor: no trae JavaScript al
 * navegador, sólo escribe su lugar en la secuencia.
 *
 * El escalonado lo decide `orden` y no una lista de demoras escrita a mano, así
 * que agregar una métrica no obliga a retocar ningún número: la fila nueva
 * hereda su lugar.
 *
 * `como` existe porque una fila de tabla no puede ser un `<div>` sin romper el
 * modelo de tabla —y con él la alineación de las columnas, que es lo único que
 * esta página no puede permitirse perder—. Lo mismo vale para el `<li>` de una
 * lista: un `<div>` adentro de un `<ol>` deja la lista sin ítems y un lector de
 * pantalla anuncia «lista de cero elementos».
 */
export function Fila({
  children,
  orden,
  className = "",
  como: Como = "div",
}: {
  children: ReactNode;
  orden: number;
  className?: string;
  como?: "div" | "tr" | "li";
}) {
  return (
    <Como
      className={`f-escalon ${className}`.trim()}
      style={{ "--orden": orden } as CSSProperties}
    >
      {children}
    </Como>
  );
}
