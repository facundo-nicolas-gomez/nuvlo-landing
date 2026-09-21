/**
 * SERIE DIARIA DEL REPORTE DE MUESTRA.
 *
 * ── ES FICTICIA, COMO TODO `lib/reporte-muestra.ts` ─────────────────────────
 * Mismo criterio que el resto del ejemplo: no hay clientes citables y nada de
 * esto sale de una cuenta real. La página la rotula como ejemplo a la vista.
 *
 * ── PERO SUMA EXACTO, Y ESO NO ES OPCIONAL ──────────────────────────────────
 * `INVERSION_DIARIA` suma **486.250** y `CONVERSACIONES_DIARIAS` suma **312**:
 * exactamente los KPI que imprime el reporte. El visitante es un comprador de
 * medios y lee un gráfico de evolución al lado de un total; si el área bajo la
 * curva no da el total, lo nota y con eso pierde la confianza en todo lo demás.
 * Si alguien toca un KPI de `reporte-muestra.ts`, hay que rehacer esta serie.
 *
 * La forma tampoco es ruido: arranca flojo, sube hasta media quincena y se
 * sostiene, con los domingos abajo y los lunes arriba. Es la forma que tiene el
 * gasto de una cuenta de Meta con presupuesto diario, y un trafficker la
 * reconoce.
 *
 * ── PENDIENTE CRUZADO CON `nuvlo-panel`, ABIERTO A PROPÓSITO ────────────────
 * `PRODUCT.md` fija que el mockup de la landing manda sobre el reporte real del
 * panel, y decisión del dueño (04/09/2026) fue meter evolución igual. Hoy el
 * `ReportData v1` del panel **no trae serie diaria**: expone el período actual
 * contra el anterior y nada más. Para que el reporte real muestre estos
 * gráficos, el panel tiene que empezar a pedirle a Meta el desglose por día y
 * sumarlo al payload. Mientras eso no exista, los gráficos viven sólo acá.
 */

export const DIAS_MUESTRA = 31;

/** Julio 2026, día por día. Suma 486.250. */
export const INVERSION_DIARIA = [
  13542, 14075, 14550, 11956, 10976, 16373, 15557, 15592, 15575, 15535, 12402,
  11167, 16516, 15738, 15991, 16342, 16780, 13832, 12657, 18957, 18172, 18415,
  18586, 18668, 14923, 13351, 19448, 18088, 17791, 17487, 17208,
];

/** Julio 2026, día por día. Suma 312. */
export const CONVERSACIONES_DIARIAS = [
  9, 9, 9, 8, 7, 12, 10, 9, 10, 10, 9, 7, 11, 10, 9, 8, 11, 9, 8, 12, 13, 11, 12,
  12, 10, 10, 12, 12, 10, 11, 12,
];

/**
 * Junio, sólo el total repartido plano. No pretende ser una serie real: es la
 * referencia contra la que se lee julio, y el gráfico la dibuja como una línea
 * de base y no como una curva, justamente para no afirmar una forma que no
 * tenemos.
 */
export const INVERSION_ANTERIOR_TOTAL = 458_726;
export const CONVERSACIONES_ANTERIOR_TOTAL = 263;

export const SERIES = {
  inversion: {
    id: "inversion" as const,
    etiqueta: "Inversión",
    valores: INVERSION_DIARIA,
    total: 486_250,
    anterior: INVERSION_ANTERIOR_TOTAL,
    formato: (v: number) => `$ ${v.toLocaleString("es-AR")}`,
  },
  conversaciones: {
    id: "conversaciones" as const,
    etiqueta: "Conversaciones",
    valores: CONVERSACIONES_DIARIAS,
    total: 312,
    anterior: CONVERSACIONES_ANTERIOR_TOTAL,
    formato: (v: number) => v.toLocaleString("es-AR"),
  },
};

export type SerieId = keyof typeof SERIES;
