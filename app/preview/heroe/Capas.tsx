"use client";

import { useEffect, useState } from "react";
import {
  CUENTAS_META_MUESTRA,
  KPIS_MUESTRA,
  PROMPT_CAMPANAS_MUESTRA,
  RESUMEN_MUESTRA,
} from "@/lib/reporte-muestra";

/**
 * BOCETO: LA PIEZA GRÁFICA EN TRES CAPAS (dueño, 19/09/2026).
 *
 * Resuelve SÓLO composición y solape, que es lo que el brief pidió mirar antes
 * de pulir nada. Las tres capas, con tratamientos distintos:
 *
 *   1. atrás    mesh gradient saturado con blur fuerte
 *   2. medio    el tablero de Meta Ads, LAVADO y recortado — contexto, no foco
 *   3. adelante una card nítida con sombra grande, que rompe el canto de la
 *               ventana y se sale hacia el gradiente
 *
 * La jerarquía sale del CONTRASTE entre capas, no del tamaño. Si se entiende
 * cada número del tablero, tiene demasiado contraste y hay que lavarlo más.
 *
 * ── LOS NÚMEROS POR CAMPAÑA SON NUEVOS Y CIERRAN ────────────────────────────
 * `reporte-muestra.ts` trae los nombres de las tres campañas pero a propósito
 * NO sus cifras —ahí son contexto para el prompt, no números para citar—. Un
 * tablero de Meta sí las muestra, así que se derivan de los totales que ya
 * existen y suman exacto:
 *
 *   291.750 + 145.875 + 48.625 = 486.250  (la inversión del período)
 *   214 + 98 + 0 = 312                    (las conversaciones)
 *
 * Y respetan lo que el archivo ya afirma de cada una: la primera tiene el mejor
 * costo por conversación (1.363), la segunda el peor (1.488) y la tercera no
 * registró conversaciones. El costo total de 1.558 sale más alto que los dos
 * porque la tercera gastó sin convertir, que es justamente lo que el reporte
 * señala. Si este boceto se promueve, estas cifras se mudan a
 * `lib/reporte-muestra.ts`, que es donde vive el dato de muestra.
 */

const CAMPANAS = [
  { nombre: PROMPT_CAMPANAS_MUESTRA.campanas[0].nombre, inv: "$ 291.750", conv: "214", costo: "$ 1.363", estado: "Activa" },
  { nombre: PROMPT_CAMPANAS_MUESTRA.campanas[1].nombre, inv: "$ 145.875", conv: "98", costo: "$ 1.488", estado: "Activa" },
  { nombre: PROMPT_CAMPANAS_MUESTRA.campanas[2].nombre, inv: "$ 48.625", conv: "—", costo: "—", estado: "Pausada" },
];

/** La capa del medio: el tablero de Meta Ads. Lavado a propósito. */
function Tablero() {
  return (
    <div className="c-tablero" aria-hidden="true">
      <div className="c-tablero-barra">
        <span className="c-tablero-marca">Administrador de anuncios</span>
        <span className="c-tablero-cuenta">
          {CUENTAS_META_MUESTRA[0].nombre} · {CUENTAS_META_MUESTRA[0].id}
        </span>
      </div>

      <div className="c-tablero-cifras">
        {KPIS_MUESTRA.map((k) => (
          <div key={k.etiqueta} className="c-tablero-cifra">
            <span>{k.etiqueta}</span>
            <strong className="i-cifra">{k.valor}</strong>
          </div>
        ))}
      </div>

      <table className="c-tablero-tabla i-cifra">
        <thead>
          <tr>
            <th>Campaña</th>
            <th>Estado</th>
            <th>Inversión</th>
            <th>Conversaciones</th>
            <th>Costo por conv.</th>
          </tr>
        </thead>
        <tbody>
          {CAMPANAS.map((c) => (
            <tr key={c.nombre}>
              <td>{c.nombre}</td>
              <td>{c.estado}</td>
              <td>{c.inv}</td>
              <td>{c.conv}</td>
              <td>{c.costo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * La capa de adelante: UNA sola cosa —el bloque de análisis que escribe la IA—
 * con el texto en relleno de gradiente, simulando que se está escribiendo.
 *
 * El gradiente de texto es un recurso que el piso de calidad desaconseja por
 * defecto; acá lo pide el brief y tiene trabajo: marca el frente de escritura.
 */
function Insight() {
  const texto = RESUMEN_MUESTRA[0];
  const [n, setN] = useState(0);

  useEffect(() => {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducido) {
      // Asincrónico a propósito: sincrónico adentro del efecto es un render en
      // cascada. Con movimiento reducido el texto aparece entero, sin escribirse.
      const ya = window.setTimeout(() => setN(texto.length), 0);
      return () => window.clearTimeout(ya);
    }
    let t = 0;
    const id = window.setInterval(() => {
      t += 3;
      setN(t);
      if (t >= texto.length) window.clearInterval(id);
    }, 26);
    return () => window.clearInterval(id);
  }, [texto.length]);

  return (
    <div className="c-card">
      <p className="c-card-rotulo">Resumen ejecutivo · escrito por la IA</p>
      <p className="c-card-texto">{texto.slice(0, n)}</p>
    </div>
  );
}

export function Capas() {
  return (
    <div className="c-pieza">
      <div className="c-mesh" aria-hidden="true" />
      <div className="c-ventana">
        <Tablero />
      </div>
      <Insight />
    </div>
  );
}
