"use client";

import { useState } from "react";

/**
 * 03 · VOS ELEGÍS CÓMO SALE.
 *
 * ── POR QUÉ ES INTERACTIVO Y NO UNA LISTA ───────────────────────────────────
 * El argumento de la sección es que la decisión es tuya. Una lista de dos
 * viñetas lo cuenta; dos piezas conmutables lo demuestran: apretás una y la
 * sección entera cambia, que es exactamente lo que pasa en el panel al cambiar
 * `reportingMode`. La interacción comunica una transición de estado, que es una
 * de las razones válidas para que algo se mueva.
 *
 * ── LO QUE SE MUESTRA ES REAL ───────────────────────────────────────────────
 * Las dos opciones son los textos literales del selector del panel. Las tres
 * frecuencias son `ScheduleFrequency`. Y los dos frenos del modo automático
 * existen los dos: exige suscripción activa, y si la IA cayó al texto de
 * respaldo el reporte NO se manda y queda como borrador.
 */
type Modo = "manual" | "auto";

const OPCIONES: { id: Modo; titulo: string; detalle: string }[] = [
  {
    id: "manual",
    titulo: "Revisar antes de enviar",
    detalle:
      "El modo por defecto. El informe nace borrador y no sale hasta que lo aprobás.",
  },
  {
    id: "auto",
    titulo: "Enviar automáticamente",
    detalle:
      "Opcional, y se activa cuenta por cuenta. Elegís cada cuánto y sale solo.",
  },
];

const FRECUENCIAS = ["Cada 7 días", "Cada 14 días", "El día 1 de cada mes"];

export default function Control() {
  const [modo, setModo] = useState<Modo>("manual");

  return (
    <section className="p-control" id="control" data-seccion="control">
      <div className="p-marco">
        <div className="p-revela">
          <h2 className="p-titulo-sec">Vos elegís cómo sale.</h2>
          <p className="p-bajada">
            Cuenta por cuenta, no una configuración global. Y si lo automatizás,
            quedan dos frenos que no se pueden apagar.
          </p>
        </div>

        <div className="p-control-grilla p-revela">
          <div className="p-modo-ops">
            {OPCIONES.map((op) => (
              <button
                type="button"
                key={op.id}
                className="p-modo-op"
                aria-pressed={modo === op.id}
                onClick={() => setModo(op.id)}
              >
                <span className="p-modo-op-t">
                  <span className="p-modo-marca" aria-hidden="true" />
                  {op.titulo}
                </span>
                <span className="p-modo-op-d">{op.detalle}</span>
              </button>
            ))}
          </div>

          <div className="p-modo-panel">
            {modo === "manual" ? (
              <>
                <h3 className="p-modo-panel-t">Queda esperándote</h3>
                <p className="p-modo-panel-d">
                  El reporte se genera y se detiene en Borrador. Nadie lo vio
                  todavía, y no hay ningún envío programado: existe sólo para
                  vos hasta que aprietes el botón.
                </p>
                <p className="p-proximo">
                  Sin suscripción activa también funciona: la prueba son 3
                  reportes completos, sin tarjeta.
                </p>
              </>
            ) : (
              <>
                <h3 className="p-modo-panel-t">Sale solo, con dos frenos</h3>
                <p className="p-modo-panel-d">
                  Elegís cada cuánto y Nuvlo lo genera y lo manda sin que entres
                  al panel.
                </p>

                <div className="p-frecuencias">
                  {FRECUENCIAS.map((f, i) => (
                    <span
                      className="p-frec"
                      key={f}
                      {...(i === 2 ? { "data-elegida": "" } : {})}
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <p className="p-proximo cifra">Próximo reporte: 1 de agosto</p>

                <div className="p-frenos">
                  <div>
                    <h4 className="p-freno-t">Exige suscripción activa</h4>
                    <p className="p-freno-d">
                      Sin ella el modo automático no se puede activar, y el panel
                      te dice qué falta en vez de fallar en silencio.
                    </p>
                  </div>
                  <div>
                    <h4 className="p-freno-t">Si la IA no redactó, no sale</h4>
                    <p className="p-freno-d">
                      Cuando el análisis cae al texto de respaldo, el envío se
                      autoinhibe y el reporte te espera como borrador.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
