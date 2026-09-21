import {
  ACCIONES_MUESTRA,
  AGENCIA_MUESTRA,
  ALERTA_MUESTRA,
  CIERRE_MUESTRA,
  CLIENTE_MUESTRA,
  COPETE_MUESTRA,
  KPIS_MUESTRA,
  METRICAS_MUESTRA,
  NOTA_FUENTE_MUESTRA,
  PERIODO_ANTERIOR_MUESTRA,
  PERIODO_MUESTRA,
  RESUMEN_MUESTRA,
} from "@/lib/reporte-muestra";
import { Capsula } from "./Piezas";
import { Fila } from "./Entra";

/**
 * EL REPORTE, ALINEADO CON EL QUE GENERA EL PANEL.
 *
 * ── LA FUENTE ───────────────────────────────────────────────────────────────
 * Las secciones, su orden y sus rótulos salen de `buildReportHtml()` en
 * `nuvlo-panel/src/lib/report-generator.ts`. El orden es exactamente el de allá:
 * encabezado, resumen ejecutivo, resultados del período, métricas detalladas,
 * plan de acción y cierre.
 *
 * ── LO QUE NO SE COPIÓ, POR DECISIÓN DEL DUEÑO (04/09/2026) ────────────────
 * La familia tipográfica, el peso 300 del nombre del cliente y la variación como
 * texto de color suelto. Los tres se resuelven con el sistema de la landing, que
 * es upstream del panel según la decisión del 19/08/2026. Nada de esto cambia un
 * dato.
 *
 * ── Y LO QUE SE VOLVIÓ A COPIAR (06/09/2026) ───────────────────────────────
 * El borde izquierdo de 3px de la alerta. Estaba en esta lista como algo que la
 * landing resolvía a su manera —una caja con contorno y un punto de marca— y esa
 * versión era una divergencia sin argumento: el panel ya emite la alerta con un
 * filete de tinta y sin bullet, y ésa es la forma correcta. Lo único que la
 * landing decide encima es que el filete se disuelve hacia abajo, y eso el panel
 * lo adopta después.
 */

/**
 * LA CIFRA DE KPI, PARTIDA EN TRES.
 *
 * «$ 486.250» tiene caracteres que no son el dato y que a igual cuerpo compiten
 * con él. Separarlos deja que el número se lea de un vistazo y ordena la línea
 * de base de las cuatro celdas, que antes arrancaban en lugares distintos según
 * llevaran símbolo o no.
 *
 * El corte se hace por forma y no por una lista de casos: lo que no es dígito ni
 * separador es afijo. Así sobrevive a que cambie la moneda de la cuenta
 * publicitaria, que el panel formatea con `account_currency`.
 */
function partirCifra(valor: string) {
  const m = valor.match(/^(\D*)([\d.,]+)(\D*)$/);
  if (!m) return { antes: "", numero: valor, despues: "" };
  return { antes: m[1].trim(), numero: m[2], despues: m[3].trim() };
}

/* Exportada porque «La anatomía del informe» amplía uno de estos KPI y tiene que
   mostrar la MISMA pieza, no una copia con las mismas clases: si el corte de la
   cifra cambia acá, cambia allá. La escala la ajusta la sección con CSS. */
export function CifraKpi({ valor }: { valor: string }) {
  const { antes, numero, despues } = partirCifra(valor);
  return (
    <p className="f-kpi-valor f-cifra">
      {antes ? <span className="f-kpi-afijo">{antes}</span> : null}
      <span>{numero}</span>
      {despues ? <span className="f-kpi-afijo">{despues}</span> : null}
    </p>
  );
}

/* ── 1. ENCABEZADO ───────────────────────────────────────────────────────────

   `chapa` existe por una regla de producto, no por composición: **el estado es
   del trafficker, no del cliente**. El informe nace borrador y esa chapa vive
   en el panel y en el documento mientras lo mirás vos; la página pública y el
   PDF que abre el cliente no la llevan, porque cuando él los tiene delante ya
   no hay nada que decidir. «El entregable» pide sus dos piezas sin chapa por
   eso, y no para ganar espacio. */

export function Encabezado({ chapa = true }: { chapa?: boolean } = {}) {
  return (
    <Fila orden={0} className="f-r-cabeza">
      <div className="f-r-cabeza-quien">
        <p className="f-rotulo">{COPETE_MUESTRA}</p>
        <p className="f-r-cliente">{CLIENTE_MUESTRA}</p>
        <p className="f-r-periodo f-cifra">
          {PERIODO_MUESTRA} · vs. {PERIODO_ANTERIOR_MUESTRA}
        </p>
      </div>
      {/* Sin el punto de la marca: el acento salió del documento. Que el estado
          espera una decisión lo dice la forma —superficie levantada y filete
          cerrado—, que es la salida del sistema para el énfasis sin color. */}
      {chapa ? <span className="f-chapa">Borrador</span> : null}
    </Fila>
  );
}

/* ── 2. RESUMEN EJECUTIVO ──────────────────────────────────────────────────── */

export function Resumen() {
  return (
    <Fila orden={1} className="f-r-bloque">
      <p className="f-rotulo">Resumen ejecutivo</p>
      {RESUMEN_MUESTRA.map((parrafo) => (
        <p key={parrafo.slice(0, 24)} className="f-cuerpo f-r-parrafo">
          {parrafo}
        </p>
      ))}
      {/* La alerta va como la emite `buildReportHtml()`: un filete de tinta a
          la izquierda, sin caja y sin bullet. El punto naranja que llevaba se
          fue con el acento, que ya no entra al documento (06/09/2026); el
          detalle del filete y de por qué es degradado está en `documento.css`. */}
      <p className="f-r-alerta">{ALERTA_MUESTRA}</p>
    </Fila>
  );
}

/* ── 3. RESULTADOS DEL PERÍODO ─────────────────────────────────────────────
   La derivación debajo de la cifra —«Inversión ÷ conversaciones»— no es un
   invento de la landing: la imprime el reporte real, y es el argumento del
   producto ya escrito adentro del entregable. */

/**
 * Las cuatro celdas, siempre, y en el orden del informe. «La máquina» llegó a
 * pedir un subconjunto —las tres que su párrafo cita— y el parámetro se fue
 * cuando esa sección pasó a cortar la banda contra el borde de la pantalla: el
 * orden del documento ya deja CTR cuarta, que es justo la que el párrafo no
 * nombra, así que el recorte lo hace el viewport y no un filtro.
 */
export function Resultados() {
  return (
    <div className="f-r-bloque f-r-bloque-plano">
      <Fila orden={2} className="f-r-bloque-cabeza">
        <p className="f-rotulo">Resultados del período</p>
      </Fila>
      <div className="f-reticula f-banco">
        {KPIS_MUESTRA.map((k, i) => (
          <Fila key={k.etiqueta} orden={3 + i} className="f-kpi">
            <p className="f-rotulo">{k.etiqueta}</p>
            <CifraKpi valor={k.valor} />
            <div className="f-kpi-pie">
              <Capsula variacion={k.variacion} sentido={k.sentido} />
            </div>
            {k.pista ? <p className="f-kpi-pista">{k.pista}</p> : null}
          </Fila>
        ))}
      </div>
    </div>
  );
}

/* ── 4. MÉTRICAS DETALLADAS ────────────────────────────────────────────────
   Los encabezados son los del panel —«Actual» y «Anterior»—, y la nota al pie
   viene entera: dice qué es la columna «Anterior», que es lo único que la tabla
   no puede decir por sí sola. */

/**
 * `nota` existe para la pieza despiezada de Anatomía, que se funde hacia abajo
 * con la máscara del documento: la nota al pie es la última línea del bloque,
 * así que el fundido la comería a medias y una aclaración medio borrada se lee
 * como un error de render. Ahí se pide sin nota y la aclaración la da el texto
 * de la sección. Por defecto viene, que es como la imprime el informe.
 */
export function Metricas({ nota = true }: { nota?: boolean } = {}) {
  return (
    <div className="f-r-bloque f-r-bloque-plano">
      <Fila orden={7} className="f-r-bloque-cabeza">
        <p className="f-rotulo">Métricas detalladas</p>
      </Fila>
      <table className="f-tabla">
        <thead>
          <tr>
            <th scope="col">Métrica</th>
            <th scope="col">Actual</th>
            <th scope="col">Anterior</th>
            <th scope="col">Variación</th>
          </tr>
        </thead>
        <tbody>
          {METRICAS_MUESTRA.map((m, i) => (
            <Fila key={m.metrica} orden={8 + i} como="tr">
              <td>{m.metrica}</td>
              <td className="f-cifra">{m.actual}</td>
              <td className="f-cifra f-anterior">{m.anterior}</td>
              <td>
                <Capsula variacion={m.variacion} sentido={m.sentido} />
              </td>
            </Fila>
          ))}
        </tbody>
      </table>
      {nota ? <p className="f-fino f-r-nota">{NOTA_FUENTE_MUESTRA}</p> : null}
    </div>
  );
}

/* ── 5. PLAN DE ACCIÓN ───────────────────────────────────────────────────── */

export function PlanDeAccion() {
  return (
    <div className="f-r-bloque">
      <Fila orden={14}>
        <p className="f-rotulo">Plan de acción</p>
      </Fila>
      <ol className="f-r-acciones">
        {ACCIONES_MUESTRA.map((accion, i) => (
          <Fila key={accion.slice(0, 24)} orden={15 + i} como="li">
            <span className="f-r-ordinal f-cifra" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{accion}</span>
          </Fila>
        ))}
      </ol>
    </div>
  );
}

/* ── 6. CIERRE ─────────────────────────────────────────────────────────────
   La firma de la agencia es verdadera en los dos planes: el nombre es requisito
   duro y sin él el panel no genera ni envía. Lo que NO va acá es «Generado con
   Nuvlo», que sólo aparece en el plan Estándar. */

export function Cierre() {
  return (
    <Fila orden={18} className="f-r-cierre">
      <p className="f-chico">
        {CIERRE_MUESTRA}
        <br />
        <span className="f-r-firma">{AGENCIA_MUESTRA}</span>
      </p>
    </Fila>
  );
}
