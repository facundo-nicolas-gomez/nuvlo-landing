"use client";

import { useId, useMemo, useRef, useState } from "react";
import { SERIES, type SerieId } from "@/lib/serie-muestra";
import { Variacion } from "./Variacion";

/**
 * EVOLUCIÓN DEL PERÍODO.
 *
 * ── POR QUÉ ESTÁ ESCRITO A MANO Y NO ES UNA LIBRERÍA ────────────────────────
 * Es un gráfico de datos, no una ilustración: la página lo dibuja en tiempo de
 * render desde `lib/serie-muestra.ts`. Se escribió el SVG a mano en vez de
 * traer una librería porque a este nivel de acabado lo que decide es el detalle
 * —grosor del trazo que no se deforma al escalar, dónde corta la grilla, cómo
 * se comporta el crosshair, qué pasa en el borde— y eso es exactamente lo que
 * una librería resuelve por vos con sus propios criterios y su propio DOM.
 *
 * ── CROMÁTICA: EL GRÁFICO NO LLEVA ACENTO ───────────────────────────────────
 * El acento vive en un solo tipo de elemento y son los botones. Acá el trazo es
 * tinta y el relleno es un degradado de la propia paleta, de `tinta` a nada.
 * El único color del bloque es el de la variación, que lo asigna el negocio.
 * Un gráfico pintado de marca dice algo sobre la marca; uno pintado de tinta
 * deja que lo único que hable sea la forma del dato.
 *
 * ── LA LÍNEA DE JUNIO ES RECTA, Y ES UNA DECISIÓN ───────────────────────────
 * Del período anterior tenemos el total, no la serie. Dibujarle una curva
 * inventada sería afirmar una forma que no existe, así que junio entra como una
 * línea de base punteada al promedio diario: dice cuánto, no cómo.
 */

const ANCHO = 640;
const ALTO = 250;
const PAD = { arriba: 16, derecha: 4, abajo: 22, izquierda: 4 };

export default function Grafico({
  serieId,
  onSerie,
}: {
  serieId: SerieId;
  onSerie: (s: SerieId) => void;
}) {
  const serie = SERIES[serieId];
  const [dia, setDia] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gradId = useId();

  const { puntos, area, baseY, xDe, yDe } = useMemo(() => {
    const vals = serie.valores;
    const max = Math.max(...vals) * 1.12;
    const w = ANCHO - PAD.izquierda - PAD.derecha;
    const h = ALTO - PAD.arriba - PAD.abajo;
    const xDe = (i: number) =>
      PAD.izquierda + (i / (vals.length - 1)) * w;
    const yDe = (v: number) => PAD.arriba + h - (v / max) * h;

    const puntos = vals.map((v, i) => `${xDe(i)},${yDe(v)}`).join(" ");
    const area =
      `M ${xDe(0)},${ALTO - PAD.abajo} ` +
      vals.map((v, i) => `L ${xDe(i)},${yDe(v)}`).join(" ") +
      ` L ${xDe(vals.length - 1)},${ALTO - PAD.abajo} Z`;

    const promedioAnterior = serie.anterior / vals.length;
    return { puntos, area, baseY: yDe(promedioAnterior), xDe, yDe };
  }, [serie]);

  function alMover(e: React.PointerEvent<SVGSVGElement>) {
    const caja = svgRef.current?.getBoundingClientRect();
    if (!caja) return;
    const rel = (e.clientX - caja.left) / caja.width;
    const i = Math.round(rel * (serie.valores.length - 1));
    setDia(Math.min(serie.valores.length - 1, Math.max(0, i)));
  }

  const activo = dia !== null ? serie.valores[dia] : null;
  const delta = Math.round(
    ((serie.total - serie.anterior) / serie.anterior) * 1000,
  ) / 10;

  return (
    <section className="g-bloque" aria-labelledby="g-tit">
      <header className="g-cabeza">
        <div className="g-titulo">
          <h4 className="t-rotulo" id="g-tit">
            Evolución del período
          </h4>
          <p className="g-total cifra">
            {serie.formato(serie.total)}
            <Variacion
              valor={`${delta > 0 ? "+" : ""}${String(delta).replace(".", ",")}%`}
              sentido={serieId === "conversaciones" ? "bueno" : "neutro"}
            />
          </p>
        </div>

        <div className="g-selector" role="group" aria-label="Métrica del gráfico">
          {(Object.keys(SERIES) as SerieId[]).map((id) => (
            <button
              key={id}
              type="button"
              className="g-opcion"
              aria-pressed={serieId === id}
              onClick={() => onSerie(id)}
            >
              {SERIES[id].etiqueta}
            </button>
          ))}
        </div>
      </header>

      <div className="g-lienzo">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${ANCHO} ${ALTO}`}
          className="g-svg"
          role="img"
          aria-label={`${serie.etiqueta} por día en julio de 2026. Total ${serie.formato(serie.total)}.`}
          onPointerMove={alMover}
          onPointerLeave={() => setDia(null)}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--tinta)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--tinta)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grilla: cuatro líneas y nada más. Una grilla que se cuenta compite
              con el dato; una que se intuye lo sostiene. */}
          {[0.25, 0.5, 0.75, 1].map((f) => (
            <line
              key={f}
              className="g-grilla"
              x1={PAD.izquierda}
              x2={ANCHO - PAD.derecha}
              y1={PAD.arriba + (ALTO - PAD.arriba - PAD.abajo) * (1 - f)}
              y2={PAD.arriba + (ALTO - PAD.arriba - PAD.abajo) * (1 - f)}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <path d={area} fill={`url(#${gradId})`} />

          {/* Junio, como línea de base: cuánto, no cómo. */}
          <line
            className="g-base"
            x1={PAD.izquierda}
            x2={ANCHO - PAD.derecha}
            y1={baseY}
            y2={baseY}
            vectorEffect="non-scaling-stroke"
          />

          <polyline
            className="g-linea"
            points={puntos}
            vectorEffect="non-scaling-stroke"
          />

          {dia !== null && (
            <g className="g-cursor">
              <line
                x1={xDe(dia)}
                x2={xDe(dia)}
                y1={PAD.arriba}
                y2={ALTO - PAD.abajo}
                vectorEffect="non-scaling-stroke"
              />
              <circle cx={xDe(dia)} cy={yDe(serie.valores[dia])} r="3.5" />
            </g>
          )}

          <text className="g-eje" x={PAD.izquierda} y={ALTO - 6}>
            1 jul
          </text>
          <text
            className="g-eje g-eje-fin"
            x={ANCHO - PAD.derecha}
            y={ALTO - 6}
          >
            31 jul
          </text>
        </svg>

        <p className="g-lectura" aria-live="polite">
          {activo !== null ? (
            <>
              <span className="g-lectura-dia cifra">
                {String(dia! + 1).padStart(2, "0")} jul
              </span>
              <span className="g-lectura-valor cifra">
                {serie.formato(activo)}
              </span>
            </>
          ) : (
            <span className="g-lectura-reposo">
              La línea punteada es el promedio diario de junio.
            </span>
          )}
        </p>
      </div>
    </section>
  );
}
