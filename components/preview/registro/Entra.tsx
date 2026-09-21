"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * EL ÚNICO MOMENTO DE MOVIMIENTO DEL HÉROE.
 *
 * ── EL ESTADO POR DEFECTO ES VISIBLE ────────────────────────────────────────
 * El servidor emite un `<div>` pelado, sin un solo estilo de ocultamiento.
 * Ocultar es una acción del cliente que ocurre recién en el efecto. Sin
 * JavaScript no hay atributo, no hay regla que aplique, y la página se ve
 * entera por construcción —no por un `<noscript>` que la destapa, que es un
 * parche sobre un problema de arquitectura—.
 *
 * `prefers-reduced-motion` APAGA todo, no lo acorta: el nodo nunca recibe el
 * atributo, así que nunca se oculta. Quien lo pide recibe la página quieta y
 * completa, que es la versión correcta y no una degradada.
 *
 * No hay `setState` en el camino: el efecto escribe el atributo sobre el DOM y
 * el CSS hace la animación, así que esto cuesta cero renders en cascada.
 */
export function Entra({
  children,
  demora = 0,
  className,
}: {
  children: ReactNode;
  demora?: number;
  className?: string;
}) {
  const nodo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = nodo.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.dataset.entra = "oculto";
    el.style.transitionDelay = `${demora}ms`;

    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        el.dataset.entra = "visto";
      });
    });

    return () => window.cancelAnimationFrame(id);
  }, [demora]);

  return (
    <div ref={nodo} className={className}>
      {children}
    </div>
  );
}
