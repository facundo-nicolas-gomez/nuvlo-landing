import {
  ACCIONES_MUESTRA,
  AGENCIA_MUESTRA,
  ALERTA_MUESTRA,
  CIERRE_MUESTRA,
  CLIENTE_MUESTRA,
  COPETE_MUESTRA,
  INICIALES_MUESTRA,
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
 * EL REPORTE, COMO LO GENERA EL PANEL.
 *
 * ── LA FUENTE ───────────────────────────────────────────────────────────────
 * Las secciones, su orden y sus rótulos salen de `buildReportHtml()` en
 * `nuvlo-panel/src/lib/report-generator.ts`: encabezado, resumen ejecutivo,
 * resultados del período, métricas detalladas, plan de acción y cierre. Los
 * datos salen de `lib/reporte-muestra.ts` y no se escriben acá.
 *
 * ── LAS MEDIDAS Y EL MARCADO SON LOS DEL PANEL (16/09/2026) ────────────────
 * El panel corrigió el reporte para el cliente que lo lee como página propia, y
 * la landing se alineó después: el contenedor con el relleno adentro
 * (`.i-doc-in`), el período en dos tramos atómicos, el encabezado de la primera
 * columna oculto a la vista, el valor anterior como segunda línea en angosto y
 * el escalón de la cifra por largo. Las medidas, en `documento.css`.
 *
 * ── SE MUESTRA TRES VECES, Y ES EL MISMO ────────────────────────────────────
 * En el héroe, adentro de un navegador: lo que abre el cliente. En «La
 * lectura», entero y con la parte activa levantada. En «El entregable», como la
 * página pública del enlace. Es el mismo componente porque es el mismo
 * documento; lo que cambia es quién lo tiene delante.
 *
 * ── CADA BLOQUE SE NOMBRA (13/09/2026) ─────────────────────────────────────
 * `data-parte` marca los seis bloques para que «La lectura» pueda medir dónde
 * está cada uno e iluminarlo. No cambia nada de lo que se ve.
 *
 * ── EL PIE ES EL DEL PLAN ESTÁNDAR ─────────────────────────────────────────
 * «Estudio Bravo · Generado con Nuvlo». Es el plan de la prueba gratuita;
 * mostrar el pie de Marca Blanca sería vender el entregable del plan caro en
 * la puerta del gratuito. La diferencia se muestra en Precios.
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

/**
 * El escalón tipográfico de la cifra, por largo, con las mismas bandas que
 * `cifraKpiHtml` del panel (`nuvlo-panel/src/lib/report-generator.ts`): una
 * cifra que no entra en la celda baja un escalón en vez de recortarse. Los datos
 * de muestra no llegan a la primera banda, pero la regla viaja con el documento.
 */
function escalonCifra(valor: string) {
  const { antes, numero, despues } = partirCifra(valor);
  const n = (antes + numero + despues).length;
  return n >= 14 ? "xxlarga" : n >= 12 ? "xlarga" : n >= 10 ? "larga" : undefined;
}

function CifraKpi({ valor }: { valor: string }) {
  const { antes, numero, despues } = partirCifra(valor);
  return (
    <p className="i-kpi-valor i-cifra" data-cifra={escalonCifra(valor)}>
      {antes ? <span className="i-kpi-afijo">{antes}</span> : null}
      <span>{numero}</span>
      {despues ? <span className="i-kpi-afijo">{despues}</span> : null}
    </p>
  );
}

/**
 * `desde` es una POSICIÓN DE LECTURA, no un recorte de secciones. El documento
 * es siempre el mismo y en el mismo orden; lo único que cambia es cuánto quedó
 * leído por arriba. Por eso sólo se pueden saltear bloques desde el principio y
 * nunca uno del medio: mostrar el resumen pegado al plan sería enseñar un
 * informe que el panel no emite.
 *
 * - `undefined` — el documento entero, desde el nombre del cliente. Es el héroe:
 *   lo que abre el cliente cuando le llega el enlace.
 * - `"plan"` — desplazado hasta «Plan de acción». Es Control, y es lo último
 *   que el trafficker lee antes de apretar el botón.
 *
 * ── POR QUÉ CONTROL DEJÓ DE MOSTRAR LAS CIFRAS (08/09/2026) ─────────────────
 * Hasta esta fecha Control usaba `desde="cifras"` y arrancaba en «Resultados
 * del período». Dos problemas medidos a la vez. El primero: el héroe llega
 * justo hasta ese mismo bloque, así que **el banco de KPI se mostraba dos
 * veces**, que es la misma duplicación que El entregable acababa de perder. El
 * segundo: el plan de acción vive a 910px del tope del documento y las dos
 * bandejas cortan mucho antes, así que **estaba renderizado dos veces y visible
 * cero píxeles en las dos** — la única parte del informe que la IA redacta como
 * consejo no aparecía en ningún lado de la landing.
 *
 * Moverlo al plan resuelve los dos. Y es lo que la sección dice: lo que un
 * trafficker revisa antes de aprobar no es la aritmética —ésa es determinística
 * y no tiene por qué desconfiar de ella— sino la prosa que sale firmada con su
 * nombre. Mostrarle las cifras en la pantalla de la aprobación era enseñarle
 * justo la parte que no revisaría.
 */
/**
 * Un `hasta="plan"` existió unas horas el 10/09/2026, para que el panel de
 * Control terminara tras el plan sin necesitar un alto medido. Se retiró el
 * mismo día: con el documento cortado ahí, el panel cerraba plano y dejaba
 * 237px de noche vacía debajo, y la firma de la agencia —lo último que el
 * trafficker ve antes de aprobar— no aparecía en ningún lado. Hoy Control
 * muestra del plan al final: el documento termina donde termina de verdad y
 * el panel es un objeto entero, con sus cuatro esquinas. Sigue sin haber un
 * alto medido, que era lo que `hasta` venía a evitar.
 */
export function Reporte({ desde }: { desde?: "cifras" | "plan" } = {}) {
  const completo = desde === undefined;
  const conCifras = desde !== "plan";
  return (
    // `.i-doc` es el contenedor de consulta y `.i-doc-in` lleva el relleno: un
    // contenedor no se puede consultar a sí mismo, así que con el relleno afuera
    // la regla que lo achica en angosto no dispararía nunca. Es el mismo par que
    // `.nv-doc` / `.nv-doc-in` del panel.
    <div className="i-doc">
      <div className="i-doc-in">
      {completo ? (
        <>
          {/* 1. Encabezado. El copete del informe («Informe de gestión · Meta
              Ads», literal del panel) va debajo del nombre del cliente como
              línea de tipo, no arriba como rótulo. */}
          <div className="i-doc-bloque" data-arriba data-parte="encabezado">
            {/* La banda de marca. Adentro del bloque del encabezado y no como
                bloque propio, a propósito: La lectura ilumina el documento por
                `data-parte`, y el membrete y el nombre del cliente son una sola
                cosa que leer —de quién viene y para quién es—. Como bloque
                aparte habría siete partes donde la sección promete seis, y la
                enumeración es el contrato de esa sección. */}
            <div className="i-doc-marca">
              <span className="i-doc-sello" aria-hidden="true">
                {INICIALES_MUESTRA}
              </span>
              <p className="i-doc-marca-nombre">{AGENCIA_MUESTRA}</p>
            </div>
            <p className="i-doc-cliente">{CLIENTE_MUESTRA}</p>
            <p className="i-doc-tipo">{COPETE_MUESTRA}</p>
            {/* El período y su comparación, como dos tramos atómicos: en un
                renglón cuando entran y el segundo baja entero cuando no. Acá
                estuvieron partidos SIEMPRE, porque la tarjeta de aprobación del
                héroe tapaba la línea; el reporte real no tiene tarjeta encima y
                los junta, y el héroe ya no muestra el encabezado. */}
            <p className="i-doc-periodo i-cifra">
              <span className="i-doc-periodo-rango">{PERIODO_MUESTRA}</span>
              <span className="i-doc-periodo-vs">
                vs. {PERIODO_ANTERIOR_MUESTRA}
              </span>
            </p>
          </div>

          {/* 2. Resumen ejecutivo: lo único que escribe la IA */}
          <div className="i-doc-bloque" data-arriba data-parte="resumen">
            <p className="i-rotulo">Resumen ejecutivo</p>
            {RESUMEN_MUESTRA.map((parrafo) => (
              <p key={parrafo.slice(0, 24)} className="i-doc-parrafo i-cifra">
                {parrafo}
              </p>
            ))}
            <p className="i-doc-alerta i-cifra">{ALERTA_MUESTRA}</p>
          </div>
        </>
      ) : null}

      {conCifras ? (
        <>
      {/* 3. Resultados del período */}
      <div className="i-doc-bloque" data-parte="cifras">
        <p className="i-rotulo">Resultados del período</p>
        <div className="i-banco">
          {KPIS_MUESTRA.map((k) => (
            <div key={k.etiqueta} className="i-kpi">
              <p className="i-kpi-etiqueta">{k.etiqueta}</p>
              <CifraKpi valor={k.valor} />
              <div>
                <Capsula variacion={k.variacion} sentido={k.sentido} />
              </div>
              {k.pista ? <p className="i-kpi-pista">{k.pista}</p> : null}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Métricas detalladas */}
      <div className="i-doc-bloque" data-parte="tabla">
        <p className="i-rotulo">Métricas detalladas</p>
        <div className="i-tabla-envoltura">
          <table className="i-tabla">
            <thead>
              <tr>
                {/* El encabezado de la primera columna se oculta a la vista y no
                    al lector de pantalla: arriba de «Impresiones» un «MÉTRICA»
                    no dice nada que la fila no diga. Como el panel. */}
                <th scope="col">
                  <span className="i-vh">Métrica</span>
                </th>
                <th scope="col">Actual</th>
                {/* `data-col` y no `:nth-child(3)`: la columna se apaga en
                    ventanas angostas (ver `documento.css`) y un índice se rompe
                    solo el día que alguien reordene la tabla. */}
                <th scope="col" data-col="anterior">
                  Anterior
                </th>
                <th scope="col">Variación</th>
              </tr>
            </thead>
            <tbody>
              {METRICAS_MUESTRA.map((m) => (
                <tr key={m.metrica}>
                  <td>{m.metrica}</td>
                  <td className="i-cifra">
                    {m.actual}
                    {/* El valor anterior como segunda línea, sólo donde la
                        columna no entra: las dos formas cuelgan del mismo
                        umbral en sentidos opuestos (ver `documento.css`). */}
                    <span className="i-antes">anterior {m.anterior}</span>
                  </td>
                  <td className="i-cifra i-anterior" data-col="anterior">
                    {m.anterior}
                  </td>
                  <td>
                    <Capsula variacion={m.variacion} sentido={m.sentido} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="i-doc-nota i-fino">{NOTA_FUENTE_MUESTRA}</p>
      </div>
        </>
      ) : null}

      {/* 5. Plan de acción */}
      <div className="i-doc-bloque" data-parte="plan">
        <p className="i-rotulo">Plan de acción</p>
        <ol className="i-acciones">
          {ACCIONES_MUESTRA.map((accion, i) => (
            <li key={accion.slice(0, 24)}>
              <span className="i-ordinal i-cifra" aria-hidden="true">
                {i + 1}.
              </span>
              <span>{accion}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* 6. Cierre y pie. La firma de la agencia es verdad en los dos planes:
          sin nombre de agencia el panel no genera ni envía. */}
      <div className="i-doc-bloque i-doc-cierre" data-parte="cierre">
        <p>
          {CIERRE_MUESTRA}
          <span className="i-doc-firma">{AGENCIA_MUESTRA}</span>
        </p>
        <p className="i-doc-pie i-fino">{PIE_INFORME_ESTANDAR}</p>
      </div>
      </div>
    </div>
  );
}
