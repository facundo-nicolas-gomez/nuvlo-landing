"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DESMONTADO EL 06/09/2026. NO LO USA NADIE.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * El dueño descartó la vista despiezada de Anatomía y la sección volvió a su
 * composición aprobada. Este componente queda en el repo a la espera de que
 * confirme el borrado, como `Control.tsx`, `Flujo.tsx` y `Cuenta.tsx`.
 *
 * **No se descartó por ejecución.** Las líneas funcionaban, apuntaban al bloque
 * correcto y sobrevivían al reflow, verificado redimensionando sin recargar. Lo
 * que no cierra es la idea: un despiece obliga a ordenar las piezas por el lugar
 * que ocupan en el documento —si no, las líneas se cruzan y dejan de leerse— y
 * ese orden choca con el que la sección necesita por escala y por argumento.
 *
 * ── SI ALGUIEN LO REMONTA, LE FALTAN LOS ESTILOS ───────────────────────────
 * Sus reglas —`.f-an-escena`, `.f-an-raya`, `.f-an-fantasma`, `.f-an-lineas` y
 * las de los dos extremos— se sacaron de `secciones.css` en la misma reversión.
 * Están enteras, con sus comentarios, en la rama `rediseno/anatomia-despiece`
 * (af5234e), junto con la versión de `Anatomia.tsx` que lo montaba.
 *
 * ── LO QUE SÍ SOBREVIVIÓ DE ESA PASADA ─────────────────────────────────────
 * Las cuatro correcciones de sistema que vinieron con ella: el campo en hueso
 * cálido, la rampa de texto en dos escalones, la alerta sin caja y sin bullet, y
 * el fundido de la tabla. Ninguna dependía del despiece.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * LAS LÍNEAS DE LLAMADA DEL DESPIECE.
 *
 * Anatomía era una vista despiezada: las cuatro piezas ampliadas a la izquierda,
 * el fantasma del informe completo a la derecha, y una línea desde cada pieza
 * hasta el lugar exacto que ocupa adentro del documento. Este componente dibuja
 * esas cuatro líneas y nada más.
 *
 * ── POR QUÉ HACE FALTA JAVASCRIPT, Y QUÉ SE PROBÓ ANTES ────────────────────
 * La condición es que las líneas sobrevivan al reflow: que aguanten un ancho de
 * pantalla distinto, un texto que envuelve en más renglones, una fuente que
 * carga tarde. Coordenadas calzadas a ojo contra un layout de 1440 no lo
 * aguantan, así que quedaron descartadas de entrada. Las otras dos salidas sin
 * JavaScript también:
 *
 *   conectores de CSS puro   una línea horizontal por fila, dibujada en el
 *                            hueco entre columnas. Sobrevive todo, pero no
 *                            puede APUNTAR: llega a la altura de su fila, no al
 *                            bloque del documento. La celda del KPI que la
 *                            sección amplía es la tercera de cuatro, o sea que
 *                            está en el medio de la hoja y a una altura que la
 *                            grilla de la izquierda no conoce.
 *   piezas y fantasma en la  alinearía cada pieza con su bloque sin medir nada,
 *   MISMA fila de grilla     pero el alto de la fila lo terminaría fijando la
 *                            pieza, que es dos o tres veces más grande, y el
 *                            fantasma dejaría de tener las proporciones del
 *                            documento. El fantasma es el entregable real; un
 *                            documento con los bloques estirados ya no lo es.
 *
 * Así que se mide. El efecto lee la posición de cada ancla y de cada destino con
 * `getBoundingClientRect`, las pasa a coordenadas de la escena y escribe los
 * atributos del SVG **por ref**: no hay estado, no hay re-render y no hay una
 * sola cascada. Se redibuja cuando cambia el tamaño de cualquiera de las cajas
 * involucradas —`ResizeObserver` sobre la escena, las anclas y los destinos— y
 * cuando terminan de cargar las fuentes, que es el caso que rompe una medición
 * hecha demasiado temprano.
 *
 * ── SIN JAVASCRIPT NO PASA NADA MALO ───────────────────────────────────────
 * El SVG se emite vacío en el servidor y se queda vacío. Las cuatro piezas, sus
 * reglas y el fantasma son marcado normal y se leen igual: lo único que falta
 * es el trazo que une dos cosas que ya están una al lado de la otra.
 *
 * ── DEBAJO DE 1024px NO HAY DESPIECE ───────────────────────────────────────
 * El fantasma se apaga por CSS y las piezas apilan. El efecto no duplica ese
 * quiebre: pregunta si el fantasma está visible, y si no lo está borra las
 * líneas. El punto de corte vive en una sola parte, que es la hoja de estilos.
 */

/**
 * Los cuatro vínculos, en el orden en que aparecen y en el orden del documento.
 *
 * `tension` es cuánto se estira el tirador horizontal de la curva, en fracción
 * del ancho que la línea recorre. Los cuatro valores son distintos a propósito:
 * con uno solo las cuatro curvas salen paralelas y el conjunto se lee como un
 * diagrama de manual de instrucciones, que es exactamente lo que esta sección
 * no puede parecer.
 */
const VINCULOS = [
  { nombre: "parrafo", tension: 0.72 },
  { nombre: "alerta", tension: 0.44 },
  { nombre: "kpi", tension: 0.6 },
  { nombre: "tabla", tension: 0.34 },
] as const;

export function Despiece({
  etiquetaKpi,
  className = "",
  children,
}: {
  /** La etiqueta del KPI que la sección amplía. El destino de esa línea es la
   *  celda del banco que dice lo mismo, buscada por texto y no por índice: si
   *  cambia el orden de `KPIS_MUESTRA`, la línea sigue apuntando al mismo KPI. */
  etiquetaKpi: string;
  className?: string;
  children: ReactNode;
}) {
  const escena = useRef<HTMLDivElement>(null);
  const lienzo = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const raiz = escena.current;
    const svg = lienzo.current;
    if (!raiz || !svg) return;

    const fantasma = raiz.querySelector<HTMLElement>(".f-an-fantasma");
    if (!fantasma) return;

    const destinoDe = (nombre: string): Element | null => {
      switch (nombre) {
        /* El segundo párrafo del resumen, que es el que la sección amplía. */
        case "parrafo":
          return fantasma.querySelectorAll(".f-r-parrafo")[1] ?? null;
        case "alerta":
          return fantasma.querySelector(".f-r-alerta");
        case "kpi":
          return (
            Array.from(fantasma.querySelectorAll(".f-kpi")).find(
              (celda) =>
                celda.querySelector(".f-rotulo")?.textContent === etiquetaKpi,
            ) ?? null
          );
        case "tabla":
          return fantasma.querySelector(".f-tabla");
        default:
          return null;
      }
    };

    const dibujar = () => {
      const caja = raiz.getBoundingClientRect();

      /* El quiebre lo manda el CSS: si el fantasma no se dibuja, no hay
         despiece que anotar. */
      if (getComputedStyle(fantasma).display === "none" || caja.width === 0) {
        svg.setAttribute("hidden", "");
        return;
      }
      svg.removeAttribute("hidden");
      svg.setAttribute("viewBox", `0 0 ${caja.width} ${caja.height}`);
      svg.setAttribute("width", String(caja.width));
      svg.setAttribute("height", String(caja.height));

      for (const { nombre, tension } of VINCULOS) {
        const grupo = svg.querySelector<SVGGElement>(`[data-linea="${nombre}"]`);
        const ancla = raiz.querySelector(`[data-ancla="${nombre}"]`);
        const destino = destinoDe(nombre);
        if (!grupo) continue;

        if (!ancla || !destino) {
          grupo.setAttribute("hidden", "");
          continue;
        }
        grupo.removeAttribute("hidden");

        const a = ancla.getBoundingClientRect();
        const d = destino.getBoundingClientRect();

        /* Arranca al costado de la pieza y entra unos píxeles adentro del
           bloque de destino, no en su borde: una línea que muere justo sobre el
           canto se lee como si le faltara un tramo. */
        const x1 = a.right - caja.left + 10;
        const y1 = a.top - caja.top + a.height / 2;
        const x2 = d.left - caja.left + Math.min(18, d.width * 0.12);
        const y2 = d.top - caja.top + d.height / 2;

        const tirador = Math.max(40, (x2 - x1) * tension);

        grupo
          .querySelector("path")!
          .setAttribute(
            "d",
            `M ${x1} ${y1} C ${x1 + tirador} ${y1}, ${x2 - tirador} ${y2}, ${x2} ${y2}`,
          );

        /* El degradado se declara en coordenadas de usuario y se estira entre
           los dos extremos, así que la línea se apaga siempre a lo largo de su
           propio recorrido y no del ancho del lienzo. */
        const grad = svg.querySelector(`#f-an-grad-${nombre}`);
        if (grad) {
          grad.setAttribute("x1", String(x1));
          grad.setAttribute("y1", String(y1));
          grad.setAttribute("x2", String(x2));
          grad.setAttribute("y2", String(y2));
        }

        for (const [sel, cx, cy] of [
          [".f-an-halo", x1, y1],
          [".f-an-origen", x1, y1],
          [".f-an-destino", x2, y2],
        ] as const) {
          const c = grupo.querySelector(sel);
          c?.setAttribute("cx", String(cx));
          c?.setAttribute("cy", String(cy));
        }
      }
    };

    dibujar();

    const observador = new ResizeObserver(dibujar);
    observador.observe(raiz);
    for (const { nombre } of VINCULOS) {
      const ancla = raiz.querySelector(`[data-ancla="${nombre}"]`);
      const destino = destinoDe(nombre);
      if (ancla) observador.observe(ancla);
      if (destino) observador.observe(destino);
    }

    /* La medición hecha antes de que cargue la fuente mide con la de respaldo,
       que envuelve distinto: sin esto las cuatro líneas quedan corridas unos
       píxeles en la primera visita y bien en las siguientes, que es el peor de
       los dos casos porque no se reproduce. */
    document.fonts?.ready.then(dibujar).catch(() => {});

    return () => observador.disconnect();
  }, [etiquetaKpi]);

  return (
    <div className={`f-an-escena ${className}`.trim()} ref={escena}>
      {children}

      <svg
        className="f-an-lineas"
        ref={lienzo}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {VINCULOS.map(({ nombre }) => (
            <linearGradient
              key={nombre}
              id={`f-an-grad-${nombre}`}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="var(--acento)" stopOpacity="0.9" />
              <stop offset="0.55" stopColor="var(--acento)" stopOpacity="0.5" />
              <stop offset="1" stopColor="var(--acento)" stopOpacity="0.22" />
            </linearGradient>
          ))}
        </defs>

        {VINCULOS.map(({ nombre }) => (
          <g key={nombre} data-linea={nombre}>
            <path stroke={`url(#f-an-grad-${nombre})`} />
            {/* El halo es el mismo recurso que lleva el punto de la marca en la
                nota flotante del héroe: un anillo del campo del acento que lo
                despega de lo que tenga debajo. */}
            <circle className="f-an-halo" r="7" />
            <circle className="f-an-origen" r="3.2" />
            <circle className="f-an-destino" r="3.4" />
          </g>
        ))}
      </svg>
    </div>
  );
}
