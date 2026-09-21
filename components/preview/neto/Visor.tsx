"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * EL VISOR — el documento que viaja bajo las anotaciones.
 *
 * ── QUÉ HACE ────────────────────────────────────────────────────────────────
 * Mira las anotaciones de la columna de al lado (`[data-nota]`) y, cuando una
 * cruza el centro de la pantalla, lleva el documento hasta la región que esa
 * nota señala (`[data-region]`) y le dice al CSS cuál es, para que el resto
 * baje la voz. Escribe dos cosas y nada más: `--desplaza` en la pista y
 * `data-foco` en el visor. Todo lo visual está en `secciones.css`.
 *
 * ── SIN `scroll` Y SIN ESTADO DE REACT ──────────────────────────────────────
 * Un `IntersectionObserver` decide qué nota está activa y un `ResizeObserver`
 * recalcula cuando cambia el tamaño. No hay escucha de `scroll` —corre en cada
 * cuadro— ni `useState` —un render por cambio de foco para escribir dos
 * atributos es pagar de más—. Se escribe el DOM directo, que es para lo que
 * existe un efecto.
 *
 * ── LA MEDIDA ES INDEPENDIENTE DEL TRANSFORM ────────────────────────────────
 * La posición de la región se toma como diferencia entre su rect y el de la
 * hoja. Las dos están adentro de la pista, que es la que se traslada, así que
 * la resta no cambia cuando el documento ya viajó. Medir contra el visor sí
 * cambiaría, y daría un desplazamiento distinto según de dónde se venga.
 *
 * ── PANTALLAS ANGOSTAS ──────────────────────────────────────────────────────
 * Por debajo de 1024px el visor no se pega y el documento se muestra entero
 * (`secciones.css`), así que acá no se escribe nada: se limpia lo escrito y se
 * deja el foco en el estado inicial.
 */
export function Visor({ children }: { children: ReactNode }) {
  const visor = useRef<HTMLDivElement>(null);
  const pista = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = visor.current;
    const p = pista.current;
    if (!v || !p) return;

    const tablero = v.closest<HTMLElement>("[data-tablero]");
    if (!tablero) return;

    const notas = Array.from(tablero.querySelectorAll<HTMLElement>("[data-nota]"));
    const escritorio = window.matchMedia("(min-width: 1024px)");
    let foco = "inicio";

    const aplicar = () => {
      if (!escritorio.matches) {
        v.dataset.foco = "inicio";
        p.style.removeProperty("--desplaza");
        return;
      }

      v.dataset.foco = foco;

      const hoja = p.querySelector<HTMLElement>(".n-hoja");
      const region =
        foco === "inicio"
          ? null
          : p.querySelector<HTMLElement>(`[data-region="${foco}"]`);

      let y = 0;
      if (hoja && region) {
        const arriba =
          region.getBoundingClientRect().top -
          hoja.getBoundingClientRect().top;
        // Nunca más allá de donde el documento termina: el fondo de la hoja
        // queda apoyado en el borde inferior del visor, no flotando arriba.
        const tope = Math.max(p.offsetHeight - v.clientHeight, 0);
        y = Math.min(Math.max(arriba - 12, 0), tope);
      }
      p.style.setProperty("--desplaza", `${-y}px`);
    };

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            foco = (e.target as HTMLElement).dataset.nota ?? "inicio";
          }
        }
        aplicar();
      },
      // Una franja del 16 % en el centro de la pantalla: la nota que la cruza
      // es la activa. Las notas son más altas que la franja, así que nunca hay
      // dos a la vez.
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    notas.forEach((n) => observador.observe(n));

    const medidor = new ResizeObserver(aplicar);
    medidor.observe(p);
    medidor.observe(v);
    escritorio.addEventListener("change", aplicar);

    return () => {
      observador.disconnect();
      medidor.disconnect();
      escritorio.removeEventListener("change", aplicar);
    };
  }, []);

  return (
    <div ref={visor} className="n-visor" data-foco="inicio">
      <div ref={pista} className="n-visor-pista">
        {children}
      </div>
    </div>
  );
}
