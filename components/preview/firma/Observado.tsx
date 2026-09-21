"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * EL ÚNICO COMPONENTE DE CLIENTE DEL REVELADO.
 *
 * Marca su nodo como oculto y lo destapa cuando entra en pantalla. Todo lo que
 * tiene adentro se escalona desde CSS, sin observadores propios.
 *
 * ── SE DISPARA AL ENTRAR, NO AL MONTAR ──────────────────────────────────────
 * La primera versión revelaba todo en el primer frame. En un héroe eso no se
 * nota, pero con la página entera armada significaba que las seis secciones de
 * abajo hacían su animación mientras el visitante seguía mirando el titular: el
 * movimiento ocurría, costaba lo mismo, y nadie lo veía.
 *
 * El margen inferior negativo dispara el revelado cuando al bloque le falta un
 * 12% de pantalla para entrar. Sin eso el revelado arranca justo en el borde y
 * el visitante ve el final de la animación en vez de la animación.
 *
 * ── LO QUE LO APAGA ─────────────────────────────────────────────────────────
 * `prefers-reduced-motion` no acorta: apaga. El nodo nunca recibe el atributo,
 * así que nunca se oculta, y quien lo pide recibe la página quieta y completa,
 * que es la versión correcta y no una degradada. Lo mismo si el navegador no
 * trae `IntersectionObserver`: sin observador no se oculta nada, en vez de
 * dejar media página invisible.
 *
 * No hay `setState` en el camino: el efecto escribe sobre el DOM y el CSS
 * anima. Cero renders en cascada.
 */
export function Observado({
  children,
  demora = 0,
  className,
  como: Como = "div",
}: {
  children: ReactNode;
  demora?: number;
  className?: string;
  /**
   * El envoltorio tiene que poder ser una lista de verdad. Envolver un <li> en
   * un <div> deja la lista sin ítems y un lector de pantalla anuncia «lista de
   * cero elementos»; lo mismo con <dt>/<dd> fuera de un <dl>. El observador es
   * el contenedor semántico, no un div puesto alrededor.
   */
  como?: "div" | "ol" | "dl";
}) {
  const nodo = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = nodo.current;
    if (!el) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    el.dataset.entra = "oculto";
    el.style.transitionDelay = `${demora}ms`;

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          el.dataset.entra = "visto";
          observador.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    observador.observe(el);
    return () => observador.disconnect();
  }, [demora]);

  return (
    <Como
      ref={
        nodo as React.Ref<HTMLDivElement & HTMLOListElement & HTMLDListElement>
      }
      className={className}
    >
      {children}
    </Como>
  );
}
