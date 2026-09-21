"use client";

import { useEffect, useRef } from "react";

/**
 * EL RESPALDO DEL MOVIMIENTO ATADO AL SCROLL.
 *
 * Escribe la MISMA `--p` que llena el camino nativo de `movimiento.css`, y sólo
 * existe para los navegadores donde ese camino todavía no está. Todo el efecto
 * —qué se mueve, cuánto y cuándo— vive en el CSS y consume esa variable; acá no
 * hay una sola decisión de diseño, sólo el número.
 *
 * ── NO SE MONTA SI NO HACE FALTA ───────────────────────────────────────────
 * Si el navegador soporta `animation-timeline: view()`, este hook no engancha
 * nada: el efecto ya corre fuera del hilo principal y agregarle un listener de
 * scroll sería pagar dos veces por lo mismo, y peor, escribir `--p` en línea
 * pisaría la animación nativa. El día que Safari y Firefox lo soporten, esto
 * deja de correr solo.
 *
 * ── TAMPOCO SI PIDEN MENOS MOVIMIENTO ──────────────────────────────────────
 * `prefers-reduced-motion` apaga. Sin hook y sin timeline, `--p` se queda en su
 * neutro, que es **1** —el estado final—, así que la página queda entera y
 * quieta. Por eso el neutro no es 0: si lo fuera, esta rama dejaría la página
 * en blanco.
 *
 * ── UN SOLO `rAF` EN VUELO, Y UNA SOLA ESCRITURA POR CUADRO ────────────────
 * El listener no calcula nada: sólo pide un cuadro si no hay uno pedido. Toda
 * la medición ocurre adentro del `requestAnimationFrame`, que es el único
 * momento del cuadro donde leer geometría no fuerza un reflow extra. Y se
 * escribe sólo si el valor cambió más de un milésimo: sin ese filtro, una
 * página quieta con scroll inercial sigue escribiendo custom properties y
 * recalculando estilo para nada.
 */

export type ClaseDeEscena = "anclada" | "entrada";

export function useProgreso<T extends HTMLElement>(clase: ClaseDeEscena) {
  const nodo = useRef<T>(null);

  useEffect(() => {
    const el = nodo.current;
    if (!el) return;

    const nativo =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("animation-timeline", "view()");

    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (nativo || quieto) return;

    let pedido = 0;
    let ultimo = -1;

    const medir = () => {
      pedido = 0;
      const caja = el.getBoundingClientRect();
      const alto = window.innerHeight;

      /**
       * Las dos fórmulas son las mismas dos que declara `movimiento.css` en
       * `animation-range`, escritas en aritmética en vez de en palabras. Si una
       * cambia, la otra tiene que cambiar con ella: es el único punto del
       * sistema donde los dos caminos tienen que coincidir.
       */
      let p: number;

      if (clase === "anclada") {
        // `contain 0% → 100%`: la escena es más alta que el viewport y el
        // progreso corre mientras lo tapa entero, o sea desde que su borde de
        // abajo llega al borde de abajo de la pantalla hasta que su borde de
        // arriba llega al de arriba.
        const recorrido = caja.height - alto;
        p = recorrido <= 0 ? 1 : -caja.top / recorrido;
      } else {
        // `entry 0% → cover 50%`: la pieza es más baja que el viewport y el
        // progreso corre desde que asoma por abajo hasta que queda centrada.
        const arranca = alto;
        const termina = alto / 2 + caja.height / 2;
        const recorrido = arranca - termina;
        p = recorrido <= 0 ? 1 : (arranca - caja.top) / recorrido;
      }

      p = p < 0 ? 0 : p > 1 ? 1 : p;

      if (Math.abs(p - ultimo) < 0.001) return;
      ultimo = p;
      el.style.setProperty("--p", String(p));
    };

    const alScrollear = () => {
      if (pedido) return;
      pedido = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", alScrollear, { passive: true });
    window.addEventListener("resize", alScrollear, { passive: true });

    return () => {
      if (pedido) cancelAnimationFrame(pedido);
      window.removeEventListener("scroll", alScrollear);
      window.removeEventListener("resize", alScrollear);
      el.style.removeProperty("--p");
    };
  }, [clase]);

  return nodo;
}
