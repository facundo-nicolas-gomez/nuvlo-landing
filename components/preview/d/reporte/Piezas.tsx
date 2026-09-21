"use client";

import {
  AGENCIA_MUESTRA,
  CLIENTE_MUESTRA,
  PERIODO_MUESTRA,
  PERIODO_ANTERIOR_MUESTRA,
  RESUMEN_MUESTRA,
  ALERTA_MUESTRA,
  ACCIONES_MUESTRA,
} from "@/lib/reporte-muestra";
import { Variacion } from "./Variacion";
import {
  KPIS,
  METRICAS,
  PASOS,
  TONO_POR_ESTADO,
  ROTULO_POR_ESTADO,
  type Estado,
} from "./datos";

/**
 * LAS PIEZAS DEL REPORTE.
 *
 * Cada una sabe dibujarse a sí misma y ocupar el ancho que le den. La
 * composición que las une vive en `secciones.css`.
 *
 * ── `desnudo` ───────────────────────────────────────────────────────────────
 * Adentro del objeto compuesto las piezas no llevan borde ni cabecera propia:
 * el objeto entero es UNA superficie partida por la retícula de un píxel, y una
 * pieza con su propio marco adentro de otro marco se lee como una caja adentro
 * de una caja. Fuera del objeto —en el héroe, en Control, en Planes— la misma
 * pieza sí se dibuja completa, porque ahí está sola.
 *
 * `ReporteMuestra.tsx` de la landing vigente reproduce el mismo orden de
 * secciones que `buildReportHtml()` del panel, y por decisión del dueño
 * (19/08/2026) este mockup manda sobre el reporte real. Estas piezas mantienen
 * ese orden y esos datos.
 */

/* ── ENCABEZADO DEL DOCUMENTO ─────────────────────────────────────────────── */

export function Encabezado({
  estado,
  desnudo = false,
}: {
  estado: Estado;
  desnudo?: boolean;
}) {
  return (
    <header className={desnudo ? "r-encabezado" : "d-pieza r-encabezado"}>
      <div className="r-encabezado-texto">
        <p className="t-rotulo">Reporte de Meta Ads</p>
        <h3 className="r-cliente">{CLIENTE_MUESTRA}</h3>
        <p className="t-chico cifra">{PERIODO_MUESTRA}</p>
      </div>
      <span className="d-chapa" data-tono={TONO_POR_ESTADO[estado]}>
        {ROTULO_POR_ESTADO[estado]}
      </span>
    </header>
  );
}

/* ── RESUMEN EJECUTIVO + ALERTA ───────────────────────────────────────────── */

export function Resumen({
  extracto = false,
  desnudo = false,
}: {
  extracto?: boolean;
  desnudo?: boolean;
}) {
  const parrafos = extracto ? RESUMEN_MUESTRA.slice(0, 1) : RESUMEN_MUESTRA;

  return (
    <section
      className={desnudo ? "r-resumen" : "d-pieza r-resumen"}
      aria-labelledby="r-resumen-tit"
    >
      <p className="t-rotulo" id="r-resumen-tit">
        Resumen ejecutivo
      </p>
      {parrafos.map((parrafo) => (
        <p className="t-cuerpo" key={parrafo.slice(0, 24)}>
          {parrafo}
        </p>
      ))}
      <div className="r-alerta">
        <p className="t-rotulo">A mirar</p>
        <p className="t-cuerpo">{ALERTA_MUESTRA}</p>
      </div>
    </section>
  );
}

/* ── BANCO DE KPI ─────────────────────────────────────────────────────────────
   ── LOS CUATRO COMPARTEN LÍNEA DE BASE ──────────────────────────────────────
   El rótulo reserva dos líneas SIEMPRE, entre o no en una. Antes «Costo por
   conversación» envolvía y empujaba su cifra un renglón para abajo, así que las
   cuatro cifras quedaban escalonadas y el bloque se leía torcido. La reserva la
   hace la caja del rótulo (`min-height`), no un salto de línea a mano: si mañana
   cambia un nombre de métrica, la línea de base sigue siendo una sola. */

export function Banco({
  activo,
  onActivo,
  desnudo = false,
}: {
  activo: number | null;
  onActivo: (i: number | null) => void;
  desnudo?: boolean;
}) {
  const grilla = (
    <div className="d-reticula r-banco-grilla">
      {KPIS.map((kpi, i) => (
        <button
          type="button"
          key={kpi.etiqueta}
          className="r-celda"
          data-activo={activo === i ? "" : undefined}
          onMouseEnter={() => onActivo(i)}
          onMouseLeave={() => onActivo(null)}
          onFocus={() => onActivo(i)}
          onBlur={() => onActivo(null)}
          aria-describedby="r-deriva"
        >
          <span className="t-rotulo r-celda-rotulo">{kpi.etiqueta}</span>
          <span className="r-valor cifra">{kpi.valor}</span>
          <Variacion valor={kpi.variacion} sentido={kpi.sentido} />
        </button>
      ))}
    </div>
  );

  if (desnudo) return grilla;

  return (
    <section className="d-pieza r-banco" aria-labelledby="r-banco-tit">
      <div className="d-pieza-cabeza">
        <p className="t-rotulo" id="r-banco-tit">
          Los cuatro números del mes
        </p>
        <p className="t-fino cifra">julio 2026</p>
      </div>
      {grilla}
    </section>
  );
}

/* ── TABLA DE MÉTRICAS ────────────────────────────────────────────────────── */

export function Tabla({
  encendidas,
  activa,
  onActiva,
  desnudo = false,
}: {
  encendidas: string[];
  activa: string | null;
  onActiva: (m: string | null) => void;
  desnudo?: boolean;
}) {
  return (
    <section
      className={desnudo ? "r-tabla" : "d-pieza r-tabla"}
      aria-labelledby="r-tabla-tit"
    >
      <div className="d-pieza-cabeza">
        <p className="t-rotulo" id="r-tabla-tit">
          Métricas del período
        </p>
        <p className="t-fino cifra">contra {PERIODO_ANTERIOR_MUESTRA}</p>
      </div>
      <table className="r-tabla-grilla">
        <colgroup>
          <col style={{ width: "33%" }} />
          <col style={{ width: "24%" }} />
          <col style={{ width: "21%" }} />
          <col style={{ width: "22%" }} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Métrica</th>
            <th scope="col">Julio</th>
            <th scope="col">Junio</th>
            <th scope="col">Var.</th>
          </tr>
        </thead>
        <tbody>
          {METRICAS.map((fila) => (
            <tr
              key={fila.metrica}
              data-encendida={encendidas.includes(fila.metrica) ? "" : undefined}
              data-activa={activa === fila.metrica ? "" : undefined}
              onMouseEnter={() => onActiva(fila.metrica)}
              onMouseLeave={() => onActiva(null)}
            >
              <th scope="row">{fila.metrica}</th>
              <td className="cifra r-tabla-actual">{fila.actual}</td>
              <td className="cifra r-tabla-anterior">{fila.anterior}</td>
              <td className="r-tabla-var">
                <Variacion
                  valor={fila.variacion}
                  sentido={fila.sentido}
                  tamano="chica"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

/* ── PLAN DE ACCIÓN ───────────────────────────────────────────────────────── */

export function Acciones({ desnudo = false }: { desnudo?: boolean }) {
  return (
    <section
      className={desnudo ? "r-acciones" : "d-pieza r-acciones"}
      aria-labelledby="r-acciones-tit"
    >
      <p className="t-rotulo" id="r-acciones-tit">
        Qué hacer este mes
      </p>
      <ol className="r-acciones-lista">
        {ACCIONES_MUESTRA.map((accion, i) => (
          <li key={accion.slice(0, 24)}>
            <span className="r-ordinal cifra" aria-hidden="true">
              {i + 1}
            </span>
            <span className="t-cuerpo">{accion}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ── RECORRIDO DE ESTADOS ─────────────────────────────────────────────────── */

export function Recorrido({
  estado,
  compacto = false,
}: {
  estado: Estado;
  /** Riel horizontal de estado y hora, sin el detalle: el detalle lo cuenta el
   *  texto que acompaña al objeto, y repetirlo en tres columnas de 145px lo
   *  parte en seis renglones. */
  compacto?: boolean;
}) {
  const indice = ["borrador", "aprobado", "enviado"].indexOf(estado);

  return (
    <section
      className="d-pieza r-recorrido"
      data-compacto={compacto ? "" : undefined}
      aria-labelledby="r-recorrido-tit"
    >
      <div className="d-pieza-cabeza">
        <p className="t-rotulo" id="r-recorrido-tit">
          Recorrido
        </p>
        <p className="t-fino cifra">
          {indice + 1} de {PASOS.length}
        </p>
      </div>
      <ol className="r-riel">
        {PASOS.map((paso, i) => (
          <li
            key={paso.estado}
            data-hecho={i <= indice ? "" : undefined}
            data-actual={i === indice ? "" : undefined}
            data-pendiente={i > indice ? "" : undefined}
          >
            <span className="r-nodo" aria-hidden="true" />
            <div className="r-paso-texto">
              <p className="r-paso-cabeza">
                <span className="t-titulo">{paso.estado}</span>
                <span className="t-fino cifra">{paso.hora}</span>
              </p>
              {!compacto && <p className="t-chico">{paso.detalle}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ── PIE FIRMADO ──────────────────────────────────────────────────────────── */

export function Pie({
  conMarcaNuvlo = true,
  desnudo = false,
}: {
  conMarcaNuvlo?: boolean;
  desnudo?: boolean;
}) {
  return (
    <footer className={desnudo ? "r-pie" : "d-pieza r-pie"}>
      <div className="r-firma">
        <p className="t-rotulo">Preparado por</p>
        <p className="t-titulo">{AGENCIA_MUESTRA}</p>
      </div>
      {conMarcaNuvlo ? (
        <p className="r-franja t-fino">Generado con Nuvlo</p>
      ) : (
        <p className="r-franja r-franja-limpia t-fino">Sin rastro de Nuvlo</p>
      )}
    </footer>
  );
}
