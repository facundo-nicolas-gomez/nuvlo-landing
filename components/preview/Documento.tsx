import {
  ACCIONES_MUESTRA,
  AGENCIA_MUESTRA,
  ALERTA_MUESTRA,
  CLIENTE_MUESTRA,
  KPIS_MUESTRA,
  METRICAS_MUESTRA,
  PERIODO_MUESTRA,
  RESUMEN_MUESTRA,
  type Sentido,
} from "@/lib/reporte-muestra";

/**
 * EL DOCUMENTO. La hoja del sistema: la única superficie con luz de la página.
 *
 * ── NO ES UNA CAPTURA NI UNA ILUSTRACIÓN ────────────────────────────────────
 * Reproduce el informe que genera el panel, con sus mismas secciones y en el
 * mismo orden que emite `buildReportHtml()` en el repo hermano. Por decisión
 * del dueño registrada en PRODUCT.md, este mockup es UPSTREAM del producto: lo
 * que se decide acá lo adopta después el reporte real, no al revés.
 *
 * Por eso no es una maqueta hecha de cajas grises fingiendo ser un producto:
 * es el entregable, con datos ficticios pero coherentes entre sí.
 *
 * ── LOS DATOS SON FICTICIOS Y LA PÁGINA LO DICE ─────────────────────────────
 * `lib/reporte-muestra.ts` es la única fuente. No hay clientes citables y no se
 * inventan: la agencia y el anunciante no existen, y cada sección que muestra
 * el documento lo rotula a la vista.
 *
 * ── EL COLOR ACÁ ADENTRO NO ES EL DE LA PÁGINA ──────────────────────────────
 * Verde y rojo existen sólo dentro de esta hoja, y los decide el negocio: que
 * la inversión suba no es verde. El ámbar de la página no entra: acá no
 * interviene ninguna persona, esto es el resultado.
 */

function claseSentido(sentido: Sentido) {
  if (sentido === "bueno") return "var-bueno";
  if (sentido === "malo") return "var-malo";
  return "var-neutro";
}

export default function Documento({
  conFranja = true,
}: {
  /**
   * La franja "Generado con Nuvlo" del plan Estándar. Es la única diferencia
   * visible entre los dos planes, así que Precios monta dos documentos para
   * mostrarla y sacarla en lugar de describirla.
   */
  conFranja?: boolean;
}) {
  return (
    <article className="doc" data-reporte>
      <header className="doc-cabeza" data-parte="marca">
        <div>
          <p className="doc-agencia">{AGENCIA_MUESTRA}</p>
          <h3 className="doc-cliente">{CLIENTE_MUESTRA}</h3>
        </div>
        <p className="doc-periodo cifra">{PERIODO_MUESTRA}</p>
      </header>

      <section className="doc-bloque" data-parte="numeros">
        <h4 className="doc-rotulo">Resumen</h4>
        {RESUMEN_MUESTRA.map((parrafo) => (
          <p className="doc-parrafo" key={parrafo.slice(0, 28)}>
            {parrafo}
          </p>
        ))}
      </section>

      <aside className="doc-alerta" data-parte="numeros">
        <h4 className="doc-rotulo">Para tener en cuenta</h4>
        <p className="doc-parrafo">{ALERTA_MUESTRA}</p>
      </aside>

      <section className="doc-kpis" data-parte="numeros">
        {KPIS_MUESTRA.map((kpi) => (
          <div className="doc-kpi" key={kpi.etiqueta}>
            <p className="doc-kpi-etiqueta">{kpi.etiqueta}</p>
            <p className="doc-kpi-valor cifra">{kpi.valor}</p>
            <p className={`doc-kpi-var cifra ${claseSentido(kpi.sentido)}`}>
              {kpi.variacion}
            </p>
          </div>
        ))}
      </section>

      <section className="doc-bloque" data-parte="variacion">
        <h4 className="doc-rotulo">Métricas</h4>
        <table className="doc-tabla">
          <thead>
            <tr>
              <th scope="col">Métrica</th>
              <th scope="col">Julio</th>
              <th scope="col">Junio</th>
              <th scope="col">Var.</th>
            </tr>
          </thead>
          <tbody>
            {METRICAS_MUESTRA.map((fila) => (
              <tr key={fila.metrica}>
                <th scope="row">{fila.metrica}</th>
                <td className="cifra">{fila.actual}</td>
                <td className="cifra doc-anterior">{fila.anterior}</td>
                <td className={`cifra ${claseSentido(fila.sentido)}`}>
                  {fila.variacion}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="doc-bloque" data-parte="acciones">
        <h4 className="doc-rotulo">Qué hacer este mes</h4>
        <ol className="doc-acciones">
          {ACCIONES_MUESTRA.map((accion, i) => (
            <li key={accion.slice(0, 28)}>
              <span className="doc-orden cifra">{String(i + 1).padStart(2, "0")}</span>
              <span>{accion}</span>
            </li>
          ))}
        </ol>
      </section>

      <footer className="doc-pie" data-parte="marca">
        <p>
          Preparado por <strong>{AGENCIA_MUESTRA}</strong> para {CLIENTE_MUESTRA}.
        </p>
        {conFranja ? <p className="doc-franja">Generado con Nuvlo</p> : null}
      </footer>
    </article>
  );
}
