/**
 * DÓNDE PUEDE CORTAR UN DOCUMENTO, Y DÓNDE NO.
 *
 * ── LA REGLA, UNA SOLA VEZ ──────────────────────────────────────────────────
 * La página recorta el informe en dos lugares: la ventana del héroe
 * (`CorteHeroe`) y el escenario de La lectura (`Lectura`). Los dos cortes son
 * decisiones distintas —uno elige el hueco, el otro lo impone el centrado de la
 * parte activa— pero comparten la misma condición: **un corte que parte un
 * renglón se lee como un error de recorte, no como que el papel sigue.**
 *
 * Esa condición vivía escrita adentro de `CorteHeroe`. Cuando el mismo defecto
 * apareció en La lectura (18/09/2026: a 1440 el corte partía la fila de chips
 * de variación; a 390, la frase «Si sigue en esa»), copiarla habría dejado dos
 * copias de una regla que hay que acordarse de mantener en las dos — que es el
 * error que este repo ya pagó cinco veces.
 *
 * ── POR QUÉ RANGOS Y NO CAJAS ───────────────────────────────────────────────
 * Un `getBoundingClientRect()` de un `<p>` de tres líneas da una caja de tres
 * líneas: cortar «entre líneas» adentro de esa caja se vería limpio y no lo es.
 * `Range.getClientRects()` da un rectángulo POR RENGLÓN dibujado, que es la
 * unidad que el ojo reconoce partida.
 */

export type Renglon = { arriba: number; abajo: number };

/**
 * Los renglones dibujados adentro de `raiz`, en coordenadas verticales que
 * arrancan en `cero` (una `y` de viewport: el borde del recorte, el tope de la
 * hoja, lo que la llamada esté midiendo).
 *
 * Sólo las hojas del árbol: un elemento con hijos repite los renglones de sus
 * hijos y no aporta ninguno propio.
 */
export function medirRenglones(raiz: HTMLElement, cero: number): Renglon[] {
  const renglones: Renglon[] = [];
  raiz
    .querySelectorAll<HTMLElement>("p, td, th, li, span, h1, h2, h3")
    .forEach((e) => {
      if (e.children.length) return;
      const rango = document.createRange();
      rango.selectNodeContents(e);
      for (const linea of rango.getClientRects()) {
        renglones.push({ arriba: linea.top - cero, abajo: linea.bottom - cero });
      }
    });
  return renglones;
}

/**
 * Si un corte en `y` deja un renglón a medias. Medio píxel de tolerancia por
 * defecto: un corte que roza el borde de un renglón no lo parte, lo bordea.
 *
 * `holgura` pide además aire a cada lado, y existe porque quien llama puede no
 * estar midiendo exactamente lo que se dibuja: en La lectura la parte activa
 * lleva `scale(1.02)`, que corre sus renglones unos píxeles respecto de la
 * medida neutra. Pedir esa holgura absorbe el desvío sin tener que recalcular
 * la escala renglón por renglón.
 */
export function parteRenglon(
  renglones: Renglon[],
  y: number,
  holgura = 0,
): boolean {
  return renglones.some(
    (l) => l.arriba - holgura < y - 0.5 && l.abajo + holgura > y + 0.5,
  );
}
