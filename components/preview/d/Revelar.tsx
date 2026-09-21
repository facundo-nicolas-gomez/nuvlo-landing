"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * EL MOVIMIENTO DE LA PÁGINA.
 *
 * ── POR QUÉ EL REVELADO NO USA `whileInView` ────────────────────────────────
 * Por una sola razón, y conviene dejarla escrita porque la razón que parecía
 * ser no era: **`whileInView` emite los estilos de `initial` también en el
 * render del servidor**. El HTML estático salía con `style="opacity:0"` en cada
 * bloque, así que un visitante sin JavaScript veía una sucesión de secciones en
 * blanco, y eso se estaba tapando con una regla de `<noscript>` que las
 * destapaba: un parche sobre un problema de arquitectura.
 *
 * **Lo que NO fue la razón:** durante la revisión pareció que el mecanismo
 * dejaba bloques colgados en opacidad 0 después de haber pasado por el cuadro.
 * Era falso, y el error estaba en la medición: el documento lleva
 * `scroll-behavior: smooth`, así que un bucle que llama a `scrollTo` cada 55ms
 * reinicia la animación de scroll en cada paso y la página nunca recorre el
 * contenido —se pidió y=4865 y el scroll real quedó en y=41—. Si alguna sesión
 * futura vuelve a "medir" el revelado, tiene que scrollear con
 * `behavior: "instant"` o el resultado va a mentir de la misma forma.
 *
 * ── LAS TRES PROPIEDADES QUE ESTE MECANISMO COMPRA ──────────────────────────
 * 1. **El estado por defecto es VISIBLE.** El servidor emite un `<div>` pelado,
 *    sin un solo estilo de ocultamiento. Sin JavaScript la página se ve entera
 *    por construcción, no por una regla de `<noscript>` que la destape.
 * 2. **Ocultar es una acción del cliente**, y ocurre recién en el efecto. Si el
 *    efecto no corre, no se oculta nada.
 * 3. **No hay `setState` en el camino.** El observer escribe un atributo en el
 *    nodo y CSS hace el resto: cero renders en cascada, que es la misma razón
 *    por la que `PanelLink` escribe el `href` sobre el DOM.
 *
 * De `motion` queda `useReducedMotion`, que es la parte que sí hace bien:
 * escucha el cambio de preferencia en vivo, no sólo al montar.
 *
 * ── LAS REGLAS ──────────────────────────────────────────────────────────────
 * - **Un momento de autor, no una entrada idéntica repetida.** El eje y la
 *   demora cambian por sección para que la página no entre como un metrónomo.
 * - **Salida exponencial**: `[0.22, 1, 0.36, 1]`, que frena largo.
 * - **`prefers-reduced-motion` apaga todo**, no lo acorta: el nodo nunca recibe
 *   el atributo, así que nunca se oculta.
 * - **Nada de parallax ni scroll-jacking.** Lo único atado al scroll es el
 *   disparo de entrada, una sola vez por elemento.
 */

type Eje = "abajo" | "izquierda" | "escala";

export function Revelar({
  children,
  eje = "abajo",
  demora = 0,
  className,
}: {
  children: ReactNode;
  eje?: Eje;
  demora?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const quieto = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || quieto) return;

    // Recién acá se oculta: antes de este punto el bloque estuvo siempre visible.
    el.dataset.revelar = eje;
    if (demora) el.style.setProperty("--demora", `${demora}s`);

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          el.dataset.visto = "";
          observador.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0 },
    );

    observador.observe(el);
    return () => observador.disconnect();
  }, [eje, demora, quieto]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
