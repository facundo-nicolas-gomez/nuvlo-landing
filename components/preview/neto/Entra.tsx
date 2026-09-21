"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

/**
 * REVELADO PROGRESIVO.
 *
 * ── EL ESTADO POR DEFECTO ES VISIBLE ────────────────────────────────────────
 * El servidor emite el nodo pelado. `data-entra="oculto"` lo escribe este
 * efecto después de montar, y sólo si el visitante no pidió movimiento
 * reducido; las reglas que ocultan cuelgan de ese atributo (`base.css`). Sin
 * JavaScript no hay atributo, no hay regla y la página se ve entera por
 * construcción, no por un `<noscript>` que la destape.
 *
 * ── UN OBSERVADOR POR BLOQUE ────────────────────────────────────────────────
 * Lo que se revela es la sección o el objeto, no cada fila. Un observador por
 * fila ya falló en esta rama: las filas clipeadas por un `overflow: hidden`
 * nunca intersectan y quedaban invisibles para siempre.
 *
 * `resto` deja pasar atributos al nodo —`data-nota`, `id`— porque el visor del
 * héroe encuentra las anotaciones por atributo y las anotaciones también se
 * revelan.
 */
export function Entra({
  children,
  className,
  demora = 0,
  como = "div",
  ...resto
}: {
  children: ReactNode;
  className?: string;
  demora?: number;
  como?: "div" | "section";
} & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    nodo.dataset.entra = "oculto";
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        nodo.dataset.entra = "visto";
        observador.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  const estilo = { "--demora": `${demora}ms` } as CSSProperties;

  // Dos ramas y no un `createElement` con etiqueta variable: la regla
  // `react-hooks/refs` no puede ver que ahí el ref sólo se pasa, no se lee.
  if (como === "section") {
    return (
      <section ref={ref} className={className} style={estilo} {...resto}>
        {children}
      </section>
    );
  }
  return (
    <div ref={ref} className={className} style={estilo} {...resto}>
      {children}
    </div>
  );
}
