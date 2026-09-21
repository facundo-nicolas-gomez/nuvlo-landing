import {
  ACCIONES_MUESTRA,
  AGENCIA_MUESTRA,
  ALERTA_MUESTRA,
  CIERRE_MUESTRA,
  CLIENTE_MUESTRA,
  COPETE_MUESTRA,
  DOCUMENTO_MUESTRA,
  EMAIL_CLIENTE_MUESTRA,
  KPIS_MUESTRA,
  METRICAS_MUESTRA,
  NOTA_FUENTE_MUESTRA,
  PERIODO_ANTERIOR_MUESTRA,
  PERIODO_MUESTRA,
  PIE_INFORME_ESTANDAR,
  RESUMEN_MUESTRA,
} from "@/lib/reporte-muestra";
import { Capsula } from "./Piezas";

/**
 * EL REPORTE, EN BORRADOR, COMO LO VE EL TRAFFICKER EN EL PANEL.
 *
 * ── LA FUENTE ───────────────────────────────────────────────────────────────
 * Las secciones, su orden y sus rótulos salen de `buildReportHtml()` en
 * `nuvlo-panel/src/lib/report-generator.ts`: encabezado, resumen ejecutivo,
 * resultados del período, métricas detalladas, plan de acción y cierre. Los
 * datos salen de `lib/reporte-muestra.ts` y no se escriben acá.
 *
 * ── LA BARRA DE ARRIBA ES DEL PANEL, NO DEL INFORME ────────────────────────
 * El estado y el botón son del trafficker: la página pública y el PDF que
 * abre el cliente no los llevan, porque cuando él los tiene delante ya no hay
 * nada que decidir. Por eso la barra va fuera del cuerpo del documento y en
 * su propia superficie hundida.
 *
 * ── EL PIE ES EL DEL PLAN ESTÁNDAR ─────────────────────────────────────────
 * «Estudio Bravo · Generado con Nuvlo». Es el plan de la prueba gratuita, que
 * es donde el visitante va a estar; mostrar el pie de Marca Blanca sería
 * vender el entregable del plan caro en la puerta del gratuito. La diferencia
 * se muestra en Precios, que es donde corresponde.
 *
 * ── LAS REGIONES ───────────────────────────────────────────────────────────
 * `data-region` es lo que el visor usa para llevar el documento hasta la parte
 * de la que habla cada anotación. Tres tienen nombre porque tres notas las
 * señalan; el resto lleva la clase para bajar la voz cuando otra está en foco.
 */

/**
 * «$ 486.250» tiene caracteres que no son el dato y que a igual cuerpo compiten
 * con él. El corte se hace por forma, no por lista de casos, así sobrevive a
 * que cambie la moneda de la cuenta publicitaria.
 */
function partirCifra(valor: string) {
  const m = valor.match(/^(\D*)([\d.,]+)(\D*)$/);
  if (!m) return { antes: "", numero: valor, despues: "" };
  return { antes: m[1].trim(), numero: m[2], despues: m[3].trim() };
}

function CifraKpi({ valor }: { valor: string }) {
  const { antes, numero, despues } = partirCifra(valor);
  return (
    <p className="n-kpi-valor n-cifra">
      {antes ? <span className="n-kpi-afijo">{antes}</span> : null}
      <span>{numero}</span>
      {despues ? <span className="n-kpi-afijo">{despues}</span> : null}
    </p>
  );
}

export function Hoja() {
  return (
    <div className="n-hoja">
      {/* La barra del panel. El botón es un dibujo del control real y no un
          control —no hace nada acá—, por eso es un `span` oculto a la lectura,
          y el texto que importa (a quién le llega) sí se lee. */}
      <div className="n-barra n-doc-region" data-region="decision">
        <div className="n-barra-doc">
          <span className="n-barra-nombre">{DOCUMENTO_MUESTRA}</span>
          <span className="n-chapa">Borrador</span>
        </div>
        <div className="n-barra-accion">
          <span className="n-boton n-boton-chico" aria-hidden="true">
            Aprobar y Enviar
          </span>
          <span className="n-barra-destino n-fino">
            Se envía a <span className="n-cifra">{EMAIL_CLIENTE_MUESTRA}</span>
          </span>
        </div>
      </div>

      <div className="n-doc">
        {/* 1. Encabezado */}
        <div className="n-doc-region n-doc-cabeza" data-region="encabezado">
          <p className="n-rotulo">{COPETE_MUESTRA}</p>
          <p className="n-doc-cliente">{CLIENTE_MUESTRA}</p>
          <p className="n-doc-periodo n-cifra">
            {PERIODO_MUESTRA} · vs. {PERIODO_ANTERIOR_MUESTRA}
          </p>
        </div>

        {/* 2. Resumen ejecutivo: lo único que escribe la IA */}
        <div className="n-doc-region n-doc-bloque" data-region="resumen">
          <p className="n-rotulo">Resumen ejecutivo</p>
          {RESUMEN_MUESTRA.map((parrafo) => (
            <p key={parrafo.slice(0, 24)} className="n-doc-parrafo n-cifra">
              {parrafo}
            </p>
          ))}
          <p className="n-doc-alerta n-cifra">{ALERTA_MUESTRA}</p>
        </div>

        {/* 3 y 4. Lo que calcula Nuvlo: el banco y la tabla, una sola región
            porque una sola nota los señala. */}
        <div className="n-doc-region" data-region="cifras">
          <div className="n-doc-bloque">
            <p className="n-rotulo">Resultados del período</p>
            <div className="n-banco">
              {KPIS_MUESTRA.map((k) => (
                <div key={k.etiqueta} className="n-kpi">
                  <p className="n-kpi-etiqueta">{k.etiqueta}</p>
                  <CifraKpi valor={k.valor} />
                  <div>
                    <Capsula variacion={k.variacion} sentido={k.sentido} />
                  </div>
                  {k.pista ? <p className="n-kpi-pista">{k.pista}</p> : null}
                </div>
              ))}
            </div>
          </div>

          <div className="n-doc-bloque" style={{ marginTop: 22 }}>
            <p className="n-rotulo">Métricas detalladas</p>
            <div className="n-tabla-envoltura">
              <table className="n-tabla">
                <thead>
                  <tr>
                    <th scope="col">Métrica</th>
                    <th scope="col">Actual</th>
                    <th scope="col">Anterior</th>
                    <th scope="col">Variación</th>
                  </tr>
                </thead>
                <tbody>
                  {METRICAS_MUESTRA.map((m) => (
                    <tr key={m.metrica}>
                      <td>{m.metrica}</td>
                      <td className="n-cifra">{m.actual}</td>
                      <td className="n-cifra n-anterior">{m.anterior}</td>
                      <td>
                        <Capsula variacion={m.variacion} sentido={m.sentido} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="n-doc-nota n-fino">{NOTA_FUENTE_MUESTRA}</p>
          </div>
        </div>

        {/* 5. Plan de acción */}
        <div className="n-doc-region n-doc-bloque" data-region="plan">
          <p className="n-rotulo">Plan de acción</p>
          <ol className="n-acciones">
            {ACCIONES_MUESTRA.map((accion, i) => (
              <li key={accion.slice(0, 24)}>
                <span className="n-ordinal n-cifra" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{accion}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* 6. Cierre y pie. La firma de la agencia es verdad en los dos planes:
            sin nombre de agencia el panel no genera ni envía. */}
        <div className="n-doc-region n-doc-cierre" data-region="cierre">
          <p style={{ margin: 0 }}>
            {CIERRE_MUESTRA}
            <span className="n-doc-firma">{AGENCIA_MUESTRA}</span>
          </p>
          <p className="n-doc-pie n-fino">{PIE_INFORME_ESTANDAR}</p>
        </div>
      </div>
    </div>
  );
}
