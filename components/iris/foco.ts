"use client";

import { useEffect, useRef } from "react";

/**
 * EL FOCO NO SE CAE CUANDO EL CONTROL QUE LO TENÍA SE VA.
 *
 * ── EL PROBLEMA, MEDIDO ─────────────────────────────────────────────────────
 * Las dos aprobaciones de la página —la tarjeta del héroe y el panel de
 * Control— reemplazan el botón por otro control cuando el estado cambia. Con
 * Enter real sobre el botón enfocado, `document.activeElement` a +100, +600 y
 * +2000 ms devolvía `BODY` en los dos casos (quinta crítica, 08/09/2026): el
 * botón se desmonta y nadie le pasa el foco a nada.
 *
 * Chromium reanuda el Tab siguiente cerca del hueco, pero eso es una heurística
 * suya y no está en la especificación: Firefox y Safari devuelven el recorrido
 * al principio del documento. Para un lector de pantalla, el foco en `<body>`
 * reubica el cursor virtual arriba de todo justo en el instante en que cambió
 * el estado que la página existe para demostrar. WCAG 2.4.3 y 2.4.7.
 *
 * ── QUÉ HACE ────────────────────────────────────────────────────────────────
 * Mueve el foco al control que ocupó el lugar del que se fue, y SÓLO si el que
 * se fue lo tenía. Un visitante con mouse que aprieta el botón no queda con un
 * anillo dibujado que no pidió: se comprueba que el foco esté en `<body>` o
 * perdido, que es la firma exacta del desmontaje.
 *
 * No corre en el montaje, sólo cuando el estado cambia de verdad: en la primera
 * pintura nadie tenía el foco y robarlo movería el scroll de quien recién
 * llega.
 *
 * ── POR QUÉ NO SE RESOLVIÓ MANTENIENDO EL BOTÓN MONTADO ─────────────────────
 * Era la otra salida y es más limpia en abstracto, pero las dos caras no son el
 * mismo control con otra etiqueta: en el héroe una es `i-boton-chico` y la otra
 * `i-enlace`, y en Control la cara enviada monta una confirmación entera con su
 * propio botón de conversión. Fundirlas para salvar el foco sería rehacer dos
 * piezas que el dueño aprobó por su forma.
 */
export function useFocoAlReemplazo(
  estado: unknown,
  destino: React.RefObject<HTMLElement | null>,
) {
  const primera = useRef(true);

  useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }
    const nodo = destino.current;
    if (!nodo) return;
    // La firma del desmontaje: el foco quedó en el cuerpo o en ningún lado. Si
    // el visitante lo movió a otra parte mientras tanto, no se lo sacamos.
    const donde = document.activeElement;
    if (donde && donde !== document.body) return;
    // `preventScroll`: el elemento ya está a la vista —acaba de reemplazar al
    // que el visitante estaba mirando— y un salto de scroll acá se leería como
    // que la página se movió sola.
    nodo.focus({ preventScroll: true });
  }, [estado, destino]);
}
