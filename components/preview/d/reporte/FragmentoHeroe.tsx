"use client";

import { useState } from "react";
import { Encabezado, Banco, Tabla } from "./Piezas";
import { DERIVA_KPI, DERIVA_METRICA, KPIS } from "./datos";

/**
 * EL REPORTE EN EL HÉROE — EN FRAGMENTO.
 *
 * El reporte aparece tres veces en la página y en profundidades distintas:
 * acá en fragmento, entero y descompuesto en su propia sección, y en detalle
 * en Control y en Planes. Éste es el primero y su trabajo es que la prueba
 * llegue antes que cualquier promesa: se ve el encabezado del documento, los
 * cuatro números y el principio de la tabla asomando por detrás, en otro plano.
 *
 * La tabla se corta contra el borde inferior de la sección a propósito. Un
 * documento que sigue es un documento que existe; uno miniaturizado para que
 * entre entero es una captura.
 */
export default function FragmentoHeroe() {
  const [kpiActivo, setKpiActivo] = useState<number | null>(null);
  const [metricaActiva, setMetricaActiva] = useState<string | null>(null);

  const deriva =
    kpiActivo !== null
      ? DERIVA_KPI[kpiActivo]
      : metricaActiva
        ? DERIVA_METRICA[metricaActiva]
        : null;

  const nombreActivo =
    kpiActivo !== null ? KPIS[kpiActivo].etiqueta : (metricaActiva ?? null);

  return (
    <div className="h-fragmento">
      <div className="h-f-encabezado">
        <Encabezado estado="borrador" />
      </div>

      <div className="h-f-banco">
        <Banco activo={kpiActivo} onActivo={setKpiActivo} />
      </div>

      <div className="h-f-lectura" aria-live="polite">
        {deriva ? (
          <p className="t-chico">
            <span className="h-f-fuente" data-origen={deriva.origen}>
              {deriva.origen === "meta" ? "Lo trae Meta" : "Lo calcula Nuvlo"}
            </span>
            <span className="h-f-que">{nombreActivo}: </span>
            <span className="cifra">{deriva.cuenta}</span>
          </p>
        ) : (
          <p className="t-chico h-f-reposo">
            Ejemplo con datos ficticios. Pasá el mouse por una cifra para ver de
            dónde sale.
          </p>
        )}
      </div>

      <div className="h-f-tabla">
        <Tabla
          encendidas={kpiActivo !== null ? DERIVA_KPI[kpiActivo].filas : []}
          activa={metricaActiva}
          onActiva={setMetricaActiva}
        />
      </div>
    </div>
  );
}
