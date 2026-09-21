"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * CORTE VERTICAL — el titular entra por palabras, cada una desde arriba,
 * cortada por su propia caja.
 *
 * ── DE DÓNDE VIENE ──────────────────────────────────────────────────────────
 * Es el `VerticalCutReveal` (danielpetho) que el «pricing-section-1» de
 * 21st.dev usa en su titular, pedido por el dueño el 10/09/2026 («ponele la
 * misma animación de entrada»): cada palabra vive en una caja con
 * `overflow: hidden` y se desliza desde −100% hasta su lugar, con un
 * escalonado de 150ms por palabra después de 400ms.
 *
 * ── LO QUE NO SE COPIA ──────────────────────────────────────────────────────
 * El original trae `framer-motion` y arranca al montar, así que sin
 * JavaScript el titular no existe y con movimiento reducido igual se mueve.
 * Acá la animación es CSS colgada de `data-corte`, que este efecto escribe
 * después de montar y sólo si el visitante no pidió movimiento reducido: el
 * servidor emite las palabras enteras y a la vista (la regla de `Entra`), y
 * el resorte 250/40 del original se traduce a la curva de la rama, que
 * termina igual de suave y sin rebote.
 *
 * ── PARA EL LECTOR DE PANTALLA, UNA FRASE ───────────────────────────────────
 * El texto entero va en un nodo sólo para lectores y las palabras partidas
 * llevan `aria-hidden`, como en el original: partir un titular en spans lo
 * vuelve una lista de palabras para quien lo escucha.
 */
export function CorteVertical({
  children,
  demora = 400,
  paso = 150,
  tenues = 0,
}: {
  children: string;
  /** Cuántas palabras del principio van en el gris del titular en dos tonos
   *  (13/09/2026). El corte las separa, así que el tono se aplica por palabra. */
  tenues?: number;
  /** Milisegundos antes de la primera palabra. */
  demora?: number;
  /** Milisegundos entre palabra y palabra. */
  paso?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // En bucle, igual que `Entra`: el titular se vuelve a cortar cada vez que
    // entra en pantalla, no una sola vez en la vida de la página. Dos
    // observadores y no uno, por lo mismo que allá — el que muestra recorta un
    // 8 % abajo y con ese borde el que esconde apagaría el titular estando a la
    // vista; el que esconde usa el viewport agrandado un 15 %.
    nodo.dataset.corte = "oculto";
    const mostrar = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        nodo.dataset.corte = "visto";
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const ocultar = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) return;
        nodo.dataset.corte = "oculto";
      },
      { rootMargin: "15% 0px 15% 0px" },
    );
    mostrar.observe(nodo);
    ocultar.observe(nodo);
    return () => {
      mostrar.disconnect();
      ocultar.disconnect();
    };
  }, []);

  const palabras = children.split(" ");

  return (
    <span ref={ref} className="i-corte">
      <span className="i-solo-lectores">{children}</span>
      {palabras.map((palabra, i) => (
        // El espacio va ENTRE las cajas, como nodo de texto: adentro de un
        // `inline-block` con `overflow: hidden` se colapsa al final de la caja
        // y el titular salía pegado («Sepagaporclienteatendido.», medido).
        <span key={i}>
          {i > 0 ? " " : null}
          <span className="i-corte-palabra" aria-hidden="true">
            <span
              className={i < tenues ? "i-corte-tramo i-tenue" : "i-corte-tramo"}
              style={{ "--demora": `${demora + i * paso}ms` } as CSSProperties}
            >
              {palabra}
            </span>
          </span>
        </span>
      ))}
    </span>
  );
}
