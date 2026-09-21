import { Entra } from "./Entra";
import { Punto } from "./Piezas";

/**
 * CONTROL — el tramo oscuro, y la única transición fuerte de la página.
 *
 * ── LA TRANSICIÓN ──────────────────────────────────────────────────────────
 * Todos los cortes de la página son el mismo degradado de 80px. Éste no: el
 * tramo oscuro **sube tapando el claro**. Ya no va atado al scroll —arrastrarlo
 * con el dedo lo hacía sentir trabado—: se dispara al entrar y corre solo, en
 * 620ms, que es lo que tarda un corte en leerse como un corte. El
 * argumento cambia de naturaleza acá —todo lo demás muestra el entregable y
 * esto explica por qué se puede confiar en él—, así que es el único cambio de
 * valor grande y merece el único corte distinto.
 *
 * Se usa UNA vez. Al salir del tramo vuelve el degradado normal: una transición
 * fuerte que se repite deja de ser fuerte.
 *
 * Lo que se clipea es el MANTO, no el contenido. Clipear el contenido cortaría
 * el titular por la mitad mientras pasa el borde, que se lee como un error de
 * maquetado. El contenido aparece después, cuando el manto ya lo cubrió.
 *
 * ── LA SECCIÓN ES QUIETA ───────────────────────────────────────────────────
 * Adentro no hay movimiento atado al scroll. Es un argumento, no una acción del
 * producto, y un argumento animado se lee como relleno. Lo único que hay es una
 * entrada al aparecer y el hover.
 *
 * ── EL HOVER REVELA, NO PINTA ──────────────────────────────────────────────
 * Pasar por un nodo enciende el tramo del riel que llega hasta él y muestra qué
 * viaja por ahí. Sobre «Resumen ordinal» aparece la forma literal de lo que
 * recibe la IA —nombres, posición por inversión, etiquetas cualitativas y
 * ninguna cifra—, que es el argumento entero de la sección puesto a la vista.
 * El texto revelado vive en una fila de alto reservado: aparecer no mueve nada.
 *
 * ── LO QUE AFIRMA ES VERIFICABLE ────────────────────────────────────────────
 * `computeReportMetrics` calcula métricas y variaciones, y al prompt se le pasa
 * un resumen con nombres, posición por inversión y etiquetas cualitativas, sin
 * cifras. Un competidor puede decir «usamos IA con responsabilidad»; no puede
 * decir esto sin haberlo construido así.
 */

const VIAS = [
  {
    rotulo: "La vía del número",
    nota: "Determinística: mismos datos, mismo resultado, las veces que lo corras.",
    marcado: -1,
    pasos: [
      { nombre: "Meta Ads", revela: "Insights por campaña del período pedido." },
      {
        nombre: "El código calcula",
        revela: "Una función pura: inversión, conversaciones, costo y CTR.",
      },
      {
        nombre: "La cifra del reporte",
        revela: "El número que tu cliente tiene delante, en la tabla.",
      },
    ],
  },
  {
    rotulo: "La vía de la prosa",
    nota: "Lo que recibe la IA no tiene una sola cifra: nombres, orden por inversión y etiquetas cualitativas.",
    marcado: 1,
    pasos: [
      {
        nombre: "Resumen ordinal",
        revela:
          "«Campaña Verano, 1.ª por inversión, rendimiento alto». Ni un número.",
      },
      {
        nombre: "La IA redacta",
        revela: "Sólo prosa: el resumen, una alerta y hasta tres acciones.",
      },
      {
        nombre: "El texto del informe",
        revela: "El que se lee arriba del todo, palabra por palabra.",
      },
    ],
  },
];

const HECHOS = [
  {
    titulo: "El reporte nace borrador",
    cuerpo:
      "El flujo por defecto es manual. Nada sale hasta que alguien aprieta «Aprobar y Enviar», con el destinatario impreso debajo del botón.",
  },
  {
    titulo: "Y si la IA falla, se frena sola",
    cuerpo:
      "El envío automático exige suscripción activa y se autoinhibe si la redacción cayó al texto de respaldo. Mandarle prosa genérica al cliente de tu cliente es peor que no mandar nada.",
  },
];

export function Control() {
  return (
    <>
      <Entra className="f-c-corte">
        <div className="f-c-manto" aria-hidden="true" />

        <section className="f-oscuro f-c-seccion" id="control">
          <div className="f-marco">
            <Entra className="f-c-cabeza">
              <h2 className="f-display">
                La IA redacta. <span className="f-marca-frase">No calcula.</span>
              </h2>
              <p className="f-bajada f-c-bajada">
                Todo número que la IA puede llegar a mencionar está también en la
                tabla que tu cliente tiene delante. No es una política: es cómo
                está construido, y son dos vías que nunca se tocan.
              </p>
            </Entra>

            <Entra demora={140} className="f-superficie">
              {VIAS.map((v) => (
                <div key={v.rotulo} className="f-c-via">
                  <div className="f-c-via-voz">
                    <p className="f-rotulo">{v.rotulo}</p>
                    <p className="f-chico f-c-nota">{v.nota}</p>
                  </div>

                  <div className="f-c-diagrama">
                    <ol className="f-c-riel">
                      {v.pasos.map((p, i) => (
                        <li key={p.nombre} className="f-c-nodo">
                          <span className="f-c-nodo-marca" aria-hidden="true">
                            {i === v.marcado ? <Punto /> : null}
                          </span>
                          <span className="f-c-nodo-texto">{p.nombre}</span>
                        </li>
                      ))}
                    </ol>

                    {/**
                     * La fila revelada. Los tres textos están siempre en el
                     * DOM, apilados en la misma celda, y el hover cruza cuál se
                     * ve: el alto lo fija el más largo y pasar el mouse no
                     * mueve un píxel de la página.
                     */}
                    <p className="f-c-revelado" aria-hidden="true">
                      {v.pasos.map((p) => (
                        <span key={p.nombre}>{p.revela}</span>
                      ))}
                    </p>
                  </div>
                </div>
              ))}

              <div className="f-c-hechos">
                {HECHOS.map((h) => (
                  <article key={h.titulo} className="f-c-hecho">
                    <h3 className="f-titulo">{h.titulo}</h3>
                    <p className="f-cuerpo">{h.cuerpo}</p>
                  </article>
                ))}
              </div>
            </Entra>
          </div>
        </section>
      </Entra>

      <div className="f-pasaje f-pasaje-sube" aria-hidden="true" />
    </>
  );
}
