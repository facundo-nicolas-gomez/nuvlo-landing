"use client";

import { useEffect, useRef, useState } from "react";
import { CLIENTE_MUESTRA, AGENCIA_MUESTRA } from "@/lib/reporte-muestra";
import type { SerieId } from "@/lib/serie-muestra";
import {
  Encabezado,
  Resumen,
  Banco,
  Tabla,
  Acciones,
  Recorrido,
  Pie,
} from "./Piezas";
import Grafico from "./Grafico";
import {
  DERIVA_KPI,
  DERIVA_METRICA,
  ESTADOS,
  ROTULO_POR_ESTADO,
  KPIS,
  type Estado,
} from "./datos";

/**
 * EL REPORTE, VIVO Y COMPUESTO.
 *
 * ── ES UN OBJETO, NO SIETE PIEZAS FLOTANDO ──────────────────────────────────
 * La pasada anterior descomponía el reporte en piezas sueltas a distintas
 * alturas, y el resultado era desparramo: huecos vacíos entre medio, el
 * encabezado desconectado del resto y ninguna alineación entre una pieza y la
 * siguiente. Descomponer no es separar: es que se vean las partes DENTRO de un
 * objeto que sigue siendo uno.
 *
 * Hoy el reporte es **una sola superficie partida por la retícula de un
 * píxel**. Todo comparte borde: el encabezado es la primera fila del objeto, los
 * KPI la segunda, y abajo dos columnas que alinean entre sí. No hay hueco
 * vacío porque no hay nada flotando.
 *
 * ── Y DOS COSAS, SÓLO DOS, VAN ADELANTE ─────────────────────────────────────
 * La profundidad se lee cuando hay pocos planos y son inequívocos. El recorrido
 * de estados sale del objeto por el borde superior derecho, y el lector de
 * procedencia aparece sobre el gráfico cuando hay una cifra activa. Nada más se
 * despega. Con tres planos claros se entiende qué está adelante; con siete
 * alturas distintas no se entiende nada.
 *
 * ── EL TEXTO CONDUCE LA LECTURA ─────────────────────────────────────────────
 * La columna izquierda no es un hueco con un titular: son cuatro pasos, y cada
 * uno enciende su zona del objeto cuando entra en cuadro o cuando le pasás el
 * mouse. Eso es «el reporte muestra y oculta partes según el texto que lo
 * acompaña» sin secuestrar el scroll: el visitante scrollea normal y el objeto
 * responde.
 */

type ZonaId = "kpi" | "grafico" | "tabla" | "cierre";

const PASOS_LECTURA: { id: ZonaId; titulo: string; cuerpo: string }[] = [
  {
    id: "kpi",
    titulo: "Cuatro números, y de dónde sale cada uno",
    cuerpo:
      "Inversión y conversaciones las trae Meta tal cual. El costo por conversación y el CTR los calcula Nuvlo. Pasá el mouse por cualquiera y te muestra la cuenta.",
  },
  {
    id: "grafico",
    titulo: "Cómo se movió el mes, día por día",
    cuerpo:
      "El área bajo la curva suma exactamente el total de arriba. La línea punteada es el promedio diario del mes anterior: sirve para ver si el mes fue mejor o sólo más largo.",
  },
  {
    id: "tabla",
    titulo: "Y el detalle que tu cliente va a mirar",
    cuerpo:
      "Impresiones, alcance, frecuencia, clics y CPC, cada uno contra el mes anterior. El color de la variación lo decide el negocio: que la inversión suba no es verde.",
  },
  {
    id: "cierre",
    titulo: "Hasta tres acciones, y tu firma abajo",
    cuerpo:
      "Lo único que redacta la IA es la prosa. El informe cierra con el nombre de tu agencia, y en Marca Blanca no dice Nuvlo en ningún lado.",
  },
];

export default function ReporteVivo() {
  const [estado, setEstado] = useState<Estado>("borrador");
  const [kpiActivo, setKpiActivo] = useState<number | null>(null);
  const [metricaActiva, setMetricaActiva] = useState<string | null>(null);
  const [zona, setZona] = useState<ZonaId>("kpi");
  const [serie, setSerie] = useState<SerieId>("inversion");
  const objetoRef = useRef<HTMLDivElement>(null);

  /**
   * El paso activo lo decide qué zona del objeto está más cerca del centro del
   * cuadro. Un `IntersectionObserver` por zona, sin listener de scroll: el
   * navegador ya sabe hacer esto y hacerlo a mano cuesta un reflow por frame.
   */
  useEffect(() => {
    const nodo = objetoRef.current;
    if (!nodo) return;

    const zonas = nodo.querySelectorAll<HTMLElement>("[data-zona]");
    if (!zonas.length) return;

    const obs = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setZona(visible.target.getAttribute("data-zona") as ZonaId);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.25, 0.6, 1] },
    );

    zonas.forEach((z) => obs.observe(z));
    return () => obs.disconnect();
  }, []);

  const deriva =
    kpiActivo !== null
      ? DERIVA_KPI[kpiActivo]
      : metricaActiva
        ? DERIVA_METRICA[metricaActiva]
        : null;

  const nombreActivo =
    kpiActivo !== null ? KPIS[kpiActivo].etiqueta : (metricaActiva ?? null);

  const encendidas = kpiActivo !== null ? DERIVA_KPI[kpiActivo].filas : [];

  return (
    <div className="r-vivo">
      {/* La voz: cuatro pasos que conducen la lectura del objeto. */}
      <div className="r-guia">
        <h2 className="t-display">
          Esto es lo que abre tu cliente. Miralo por dentro.
        </h2>
        <p className="t-bajada medida-bajada">
          No es una captura: es el componente real con datos de ejemplo. Tocá
          cualquier cifra para ver de dónde sale.
        </p>

        <div className="r-mando">
          <p className="t-rotulo" id="r-estado-tit">
            Estado del reporte
          </p>
          <div
            className="r-segmentado"
            role="group"
            aria-labelledby="r-estado-tit"
          >
            {ESTADOS.map((e) => (
              <button
                type="button"
                key={e}
                onClick={() => setEstado(e)}
                aria-pressed={estado === e}
                className="r-segmento t-control"
              >
                {ROTULO_POR_ESTADO[e]}
              </button>
            ))}
          </div>
        </div>

        <ol className="r-pasos">
          {PASOS_LECTURA.map((paso) => (
            <li
              key={paso.id}
              className="r-paso"
              data-activo={zona === paso.id ? "" : undefined}
              onMouseEnter={() => setZona(paso.id)}
            >
              <h3 className="t-titulo">{paso.titulo}</h3>
              <p className="t-chico">{paso.cuerpo}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* El objeto. Una superficie, partida por la retícula. */}
      <div className="r-escena">
        <div className="r-objeto" ref={objetoRef} data-zona-activa={zona}>
          <div className="r-o-encabezado">
            <Encabezado estado={estado} desnudo />
          </div>

          {/**
           * El recorrido sobresale del objeto por la esquina superior derecha,
           * pero **ocupa su propia celda de la grilla**. Flotando en absoluto se
           * comía las dos últimas celdas del banco: una superposición que tapa
           * contenido no es profundidad, es un error de maquetado. Con celda
           * propia el plano de adelante existe igual y no hay nada debajo.
           */}
          <aside className="r-o-recorrido">
            <Recorrido estado={estado} compacto />
          </aside>

          <div className="r-o-banco" data-zona="kpi">
            <Banco activo={kpiActivo} onActivo={setKpiActivo} desnudo />
          </div>

          {/**
           * La procedencia va DENTRO del objeto, como una franja bajo los KPI.
           * Flotando al costado quedaba lejos de la cifra que el visitante está
           * mirando, y era un cuarto plano en una escena que ya tiene los
           * suyos. Acá aparece exactamente donde está el ojo. Alto fijo para
           * que nada salte cuando entra y sale.
           */}
          <div className="r-o-deriva" id="r-deriva" aria-live="polite">
            {deriva ? (
              <>
                <span className="r-deriva-fuente" data-origen={deriva.origen}>
                  {deriva.origen === "meta"
                    ? "Lo trae Meta"
                    : "Lo calcula Nuvlo"}
                </span>
                <span className="t-chico">
                  <span className="r-deriva-que">{nombreActivo}: </span>
                  <span className="cifra">{deriva.cuenta}</span>
                </span>
              </>
            ) : (
              <span className="t-chico r-deriva-reposo">
                Ninguna cifra la escribe la IA. Pasá el mouse por una para ver la
                cuenta.
              </span>
            )}
          </div>

          <div className="r-o-grafico" data-zona="grafico">
            <Grafico serieId={serie} onSerie={setSerie} />
          </div>

          <div className="r-o-resumen">
            <Resumen desnudo />
          </div>

          <div className="r-o-tabla" data-zona="tabla">
            <Tabla
              encendidas={encendidas}
              activa={metricaActiva}
              onActiva={setMetricaActiva}
              desnudo
            />
          </div>

          <div className="r-o-acciones" data-zona="cierre">
            <Acciones desnudo />
          </div>

          <div className="r-o-pie">
            <Pie desnudo />
          </div>

          <div className="r-o-barra">
            {estado === "enviado" ? (
              <p className="r-barra r-barra-hecha">
                <span>Enviado a {CLIENTE_MUESTRA}</span>
                <span className="cifra t-fino">09:22</span>
              </p>
            ) : (
              <button
                type="button"
                className="r-barra r-barra-accion"
                onClick={() =>
                  setEstado(estado === "borrador" ? "aprobado" : "enviado")
                }
              >
                {estado === "borrador" ? "Aprobar y enviar" : "Enviar ahora"}
              </button>
            )}
            <p className="t-fino r-barra-pie">
              Sale a nombre de {AGENCIA_MUESTRA}. Ejemplo con datos ficticios.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
