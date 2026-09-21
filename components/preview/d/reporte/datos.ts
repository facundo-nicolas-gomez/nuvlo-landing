import {
  KPIS_MUESTRA,
  METRICAS_MUESTRA,
  RECORRIDO_MUESTRA,
} from "@/lib/reporte-muestra";

/**
 * DE DÓNDE SALE CADA CIFRA DEL REPORTE.
 *
 * Esto no es adorno de interacción: es el argumento central del producto hecho
 * tocable. `PRODUCT.md` lo fija así —"la IA no computa ni un solo número"—, y
 * en el panel es una invariante de arquitectura: `computeReportMetrics` calcula
 * todo, y a la IA se le pasa un resumen ORDINAL sin una sola cifra. Si el
 * número no entra al prompt, no puede salir en el reporte.
 *
 * Entonces cada cifra de la página puede decir una de dos cosas, y sólo dos:
 *
 *   "meta"   la trae Meta tal cual, sin tocarla.
 *   "nuvlo"  la calcula Nuvlo, y acá está la cuenta con sus dos operandos.
 *
 * Ninguna dice "la escribió la IA", porque ninguna la escribe la IA.
 *
 * `filas` son las filas de la tabla de métricas que esa cuenta usa. Cuando el
 * visitante pasa el mouse por un KPI derivado, esas filas se encienden en la
 * tabla —que es OTRA pieza, en otro plano— y así se ve que el número no salió
 * de ningún lado: salió de los dos que están ahí abajo.
 *
 * Las cuentas se verifican contra `lib/reporte-muestra.ts`, donde las
 * relaciones se cumplen de verdad (CTR = clics/impresiones, CPC =
 * inversión/clics, costo por conv. = inversión/conversaciones, frecuencia =
 * impresiones/alcance). Si alguien toca un número allá, acá hay que rehacer la
 * cuenta o la página miente en pantalla.
 */

export type Origen = "meta" | "nuvlo";

export type Deriva = {
  origen: Origen;
  cuenta: string;
  filas: string[];
};

/** Una deriva por KPI, en el mismo orden que `KPIS_MUESTRA`. */
export const DERIVA_KPI: Deriva[] = [
  {
    origen: "meta",
    cuenta: "El gasto que Meta reporta para el período, sumado.",
    filas: [],
  },
  {
    origen: "meta",
    cuenta: "Conversaciones iniciadas por mensaje, tal como las cuenta Meta.",
    filas: [],
  },
  {
    origen: "nuvlo",
    cuenta: "Inversión ÷ conversaciones = 486.250 ÷ 312",
    filas: [],
  },
  {
    origen: "nuvlo",
    cuenta: "Clics ÷ impresiones = 23.642 ÷ 1.284.902",
    filas: ["Clics", "Impresiones"],
  },
];

/** Una deriva por fila de la tabla, tecleada por el nombre de la métrica. */
export const DERIVA_METRICA: Record<string, Deriva> = {
  Impresiones: {
    origen: "meta",
    cuenta: "Veces que se mostró un anuncio. La cuenta Meta.",
    filas: [],
  },
  Alcance: {
    origen: "meta",
    cuenta: "Personas distintas que vieron un anuncio. La cuenta Meta.",
    filas: [],
  },
  Frecuencia: {
    origen: "nuvlo",
    cuenta: "Impresiones ÷ alcance = 1.284.902 ÷ 402.118",
    filas: ["Impresiones", "Alcance"],
  },
  Clics: {
    origen: "meta",
    cuenta: "Clics en el enlace. Los cuenta Meta.",
    filas: [],
  },
  CPC: {
    origen: "nuvlo",
    cuenta: "Inversión ÷ clics = 486.250 ÷ 23.642",
    filas: ["Clics"],
  },
};

export const ESTADOS = ["borrador", "aprobado", "enviado"] as const;
export type Estado = (typeof ESTADOS)[number];

/**
 * Los tres estados del reporte, tomados del recorrido real del panel. El hueco
 * de ocho minutos entre el borrador y la aprobación es una persona leyéndolo, y
 * es el argumento entero del producto: entre aprobar y enviar no pasa nada,
 * porque aprobar ES enviar.
 */
export const PASOS = RECORRIDO_MUESTRA;

export const KPIS = KPIS_MUESTRA;
export const METRICAS = METRICAS_MUESTRA;

/** El tono de chapa que le toca a cada estado. El acento sólo en «espera». */
export const TONO_POR_ESTADO: Record<Estado, "espera" | "neutro" | "cerrado"> = {
  borrador: "espera",
  aprobado: "neutro",
  enviado: "cerrado",
};

export const ROTULO_POR_ESTADO: Record<Estado, string> = {
  borrador: "Borrador",
  aprobado: "Aprobado",
  enviado: "Enviado",
};
