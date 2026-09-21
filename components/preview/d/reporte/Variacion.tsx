import type { Sentido } from "@/lib/reporte-muestra";

/**
 * LA CÁPSULA DE VARIACIÓN — EL ELEMENTO FIRMA.
 *
 * Es el rasgo que se repite hasta ser reconocible, y es uno solo: **toda cifra
 * que se compara contra algo lleva su cápsula**. Aparece en los cuatro KPI, en
 * cada fila de la tabla, en la cabecera del gráfico y en el comparador de
 * planes. No decora nada más y no se usa para nada que no sea una variación.
 *
 * ── POR QUÉ ÉSTE Y NO UN BORDE O UNA GRILLA ─────────────────────────────────
 * El producto es un reporte y lo único que un reporte hace es comparar dos
 * períodos. La variación es el dato más repetido y el más leído del entregable,
 * y hasta acá se veía igual que el resto del texto: un porcentaje suelto, sin
 * forma propia, que no se distinguía de una cifra cualquiera. Darle forma
 * resuelve al mismo tiempo el rasgo de identidad y el problema de jerarquía.
 *
 * ── LA DIRECCIÓN Y EL COLOR SON DOS COSAS DISTINTAS ─────────────────────────
 * El **tick** lo decide el signo: subió, bajó o no se movió. El **color** lo
 * decide el negocio, no la dirección: que la inversión suba no es verde; que el
 * costo por conversación baje, sí. Por eso `sentido` viene del dato
 * (`lib/reporte-muestra.ts`, misma regla que `report-metrics.ts` en el panel) y
 * nunca se infiere del signo. Una flecha para abajo en verde no es un error: es
 * el caso que hace falta que el sistema sepa expresar.
 */

export function Variacion({
  valor,
  sentido,
  tamano = "normal",
}: {
  valor: string;
  sentido: Sentido;
  /** `chica` para las filas de tabla, donde la cápsula no debe pesar más que la fila. */
  tamano?: "normal" | "chica";
}) {
  const direccion = valor.startsWith("−") || valor.startsWith("-")
    ? "baja"
    : valor.startsWith("+")
      ? "sube"
      : "plana";

  return (
    <span className="v-capsula" data-sentido={sentido} data-tamano={tamano}>
      <svg
        className="v-tick"
        viewBox="0 0 8 8"
        width="8"
        height="8"
        aria-hidden="true"
        focusable="false"
      >
        {direccion === "sube" && <path d="M4 6.6V1.4M1.6 3.8 4 1.4l2.4 2.4" />}
        {direccion === "baja" && <path d="M4 1.4v5.2M1.6 4.2 4 6.6l2.4-2.4" />}
        {direccion === "plana" && <path d="M1.4 4h5.2" />}
      </svg>
      <span className="cifra">{valor}</span>
    </span>
  );
}
