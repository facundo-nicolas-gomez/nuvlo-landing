"use client";

import type { CSSProperties } from "react";
import { CLIENTE_MUESTRA, ESTADOS_MUESTRA } from "@/lib/reporte-muestra";
import { useProgreso } from "./useProgreso";

/**
 * CÓMO SALE — el recorrido, anclado, con índice y progreso.
 *
 * ── QUÉ RESUELVE ────────────────────────────────────────────────────────────
 * La landing no mostraba nada de lo que el producto HACE: los modos de envío,
 * las opciones, la revisión antes de mandar. Estaba todo afirmado en prosa.
 *
 * ── ES LA ÚNICA SECCIÓN ATADA AL SCROLL DE TODA LA PÁGINA ──────────────────
 * Y es la única que lo justifica: un índice con indicador de progreso es,
 * literalmente, un lector de la posición del scroll. La barra llena dice cuánto
 * del recorrido llevás, así que atarla al dedo no es un efecto sino lo que el
 * elemento informa. En el resto de la página el scroll era sólo el motor de una
 * animación que se basta sola, y ahí se sentía trabado.
 *
 * ── EL ÍNDICE FIJO ES DE ESTA SECCIÓN Y DE NINGUNA OTRA ────────────────────
 * Es la única con pasos numerados, así que es la única que puede tener un
 * índice con indicador de progreso sin que el recurso se gaste. La sección se
 * ancla, el índice queda a la vista con el riel llenándose, y el panel de al
 * lado cambia de estado al cruzar cada cuarto.
 *
 * ── NO HAY ESTADO EN JAVASCRIPT, Y ESO ES EL PUNTO ─────────────────────────
 * Qué paso está activo lo decide `--p` en CSS, con una función de banda: cada
 * ítem se enciende cuando el progreso entra en su tramo y se apaga cuando sale.
 * No hay `useState`, no hay observador, no hay un re-render por paso. Por eso
 * el scrub funciona igual de bien para los dos lados: frenás a la mitad y el
 * estado se queda a la mitad, porque no hay nada que «haya ocurrido».
 *
 * La versión anterior tenía un `IntersectionObserver` con una banda de decisión
 * y cuatro nodos observados; hacía lo mismo peor y sólo avanzaba bien hacia
 * abajo.
 *
 * ── NO ES SCROLL-JACKING ────────────────────────────────────────────────────
 * La página scrollea normal. No hay `scrollTo`, no hay `preventDefault`, no hay
 * scroll capturado: hay una sección alta con una vista pegada adentro, que es
 * scroll nativo del navegador.
 *
 * ── EN MÓVIL Y CON `prefers-reduced-motion` NO SE ANCLA ────────────────────
 * Debajo de 1024px no hay dos columnas, y una pieza pegada al viewport en 390px
 * se come el contenido. Cada paso trae su propio panel debajo del texto y la
 * sección vuelve a medir lo que mide. Es la misma salida que usa el modo de
 * movimiento reducido, y por eso está escrita una sola vez.
 */

const PASOS = [
  {
    id: "generar",
    rotulo: "01",
    titulo: "Elegís el período y generás",
    cuerpo:
      "Antes ya está todo configurado: el email del cliente, el nombre de tu agencia y el modo del reporte. Al generar sólo elegís las fechas, hasta 92 días.",
  },
  {
    id: "revisar",
    rotulo: "02",
    titulo: "Lo leés entero antes de que exista para nadie",
    cuerpo:
      "El reporte nace borrador. Podés abrir el informe completo y leerlo como lo va a leer tu cliente, antes de que exista para él.",
  },
  {
    id: "aprobar",
    rotulo: "03",
    titulo: "Aprobás, y recién ahí sale",
    cuerpo:
      "El destinatario va impreso debajo del botón, así que quien aprueba ve a quién le llega. Es el paso que Nuvlo no da solo.",
  },
  {
    id: "programar",
    rotulo: "04",
    titulo: "O lo dejás programado",
    cuerpo:
      "Cada 7 días, cada 14, o el día 1 de cada mes. Exige suscripción activa, y se autoinhibe si la redacción cayó al texto de respaldo.",
  },
] as const;

type IdPaso = (typeof PASOS)[number]["id"];

/* ── LOS CUATRO ESTADOS DEL PANEL ───────────────────────────────────────────
   Cada uno es una pieza real del producto: el selector de período, el borrador
   con su chapa, la barra de acción con el destinatario impreso, y las tres
   frecuencias que el cron admite.

   Ninguno muestra el mail. El mail es de El entregable, y tenerlo en los dos
   lados era el único solape real que quedaba entre secciones. */

function PanelGenerar() {
  return (
    <div className="f-fl-cuerpo">
      <p className="f-rotulo">Período del informe</p>
      <div className="f-fl-fechas">
        <span className="f-fl-fecha f-cifra">1 jul 2026</span>
        <span className="f-fl-flecha" aria-hidden="true" />
        <span className="f-fl-fecha f-cifra">31 jul 2026</span>
      </div>
      <p className="f-fino f-fl-nota">31 días · el máximo por reporte es 92</p>
      <div className="f-fl-barra">
        <span className="f-fl-boton">Generar</span>
      </div>
    </div>
  );
}

/** El paso 02 muestra el BORRADOR DEL INFORME, no el mail: lo que ese paso dice
 *  es que podés leer el informe entero antes de que salga. */
function PanelRevisar() {
  return (
    <div className="f-fl-cuerpo">
      <div className="f-fl-cabecera">
        <p className="f-rotulo">Informe de gestión · Meta Ads</p>
        <span className="f-fl-chapa">Borrador</span>
      </div>
      <div className="f-fl-hojeada" aria-hidden="true">
        <span className="f-fl-renglon" />
        <span className="f-fl-renglon" />
        <span className="f-fl-renglon f-fl-renglon-corto" />
        <div className="f-fl-mini">
          <span />
          <span />
          <span />
          <span />
        </div>
        <span className="f-fl-renglon" />
        <span className="f-fl-renglon f-fl-renglon-corto" />
      </div>
      <p className="f-fino f-fl-nota">
        Nadie lo recibió todavía. Un borrador no tiene enlace público.
      </p>
    </div>
  );
}

function PanelAprobar() {
  return (
    <div className="f-fl-cuerpo">
      <p className="f-rotulo">Barra de acción del borrador</p>
      <div className="f-fl-aprobar">
        <span className="f-fl-boton">Aprobar y enviar</span>
        <p className="f-fino f-fl-destinatario">
          Le llega a <strong>hola@muebleria-lombardi.com</strong>
        </p>
      </div>

      {/**
       * Los estados son los del enum real del panel. «Aprobado» no está porque
       * no existe: aprobar es la acción que mueve el reporte de borrador a
       * enviado, no un lugar donde el reporte se queda.
       */}
      <div className="f-fl-estados">
        {ESTADOS_MUESTRA.map((e, i) => (
          <span key={e.nombre} className="f-fl-estado" data-hecho={e.alcanzado}>
            {e.nombre}
            {i === 0 ? (
              <span className="f-fl-hacia" aria-hidden="true" />
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}

function PanelProgramar() {
  return (
    <div className="f-fl-cuerpo">
      <p className="f-rotulo">Frecuencia</p>
      <ul className="f-fl-frecuencias">
        {[
          { texto: "Cada 7 días", elegida: false },
          { texto: "Cada 14 días", elegida: false },
          { texto: "El día 1 de cada mes", elegida: true },
        ].map((f) => (
          <li key={f.texto} data-elegida={f.elegida}>
            <span className="f-fl-radio" aria-hidden="true" />
            {f.texto}
          </li>
        ))}
      </ul>
      <p className="f-fino f-fl-nota">
        Exige suscripción activa. Se frena sola si la IA cayó al texto de
        respaldo.
      </p>
    </div>
  );
}

const PANELES: Record<IdPaso, () => React.JSX.Element> = {
  generar: PanelGenerar,
  revisar: PanelRevisar,
  aprobar: PanelAprobar,
  programar: PanelProgramar,
};

/** La ventana del panel: tres luces y el nombre del cliente, sin barra de
 *  direcciones. El reporte es una página pública con URL y esto es la
 *  aplicación; darles el mismo cromo diría que son la misma cosa. */
function Panel({ id }: { id: IdPaso }) {
  const Cuerpo = PANELES[id];
  return (
    <div className="f-ventana">
      <div className="f-ventana-barra">
        <div className="f-luces" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="f-ventana-titulo">{CLIENTE_MUESTRA}</p>
      </div>
      <div className="f-ventana-hoja">
        <Cuerpo />
      </div>
    </div>
  );
}

/**
 * El tramo de `--p` que le toca a cada paso: cuatro pasos, cuatro cuartos.
 *
 * Los dos extremos se estiran fuera del rango a propósito. La banda se apaga
 * cuando el progreso pasa su borde, así que con el primer tramo arrancando en 0
 * exacto el paso 01 estaría medio apagado en `--p: 0`, y el 04 se apagaría
 * entero justo al llegar al final. Sacando los bordes fuera del rango, el
 * primero ya está encendido cuando la sección se ancla y el último sigue
 * encendido cuando se suelta.
 */
const banda = (i: number) =>
  ({
    "--desde": i === 0 ? -0.2 : i / PASOS.length,
    "--hasta": i === PASOS.length - 1 ? 1.2 : (i + 1) / PASOS.length,
  }) as CSSProperties;

export function Flujo() {
  const escena = useProgreso<HTMLDivElement>("anclada");

  return (
    <section className="f-seccion f-fl-seccion" id="flujo">
      <div className="f-marco">
        <div className="f-cabeza">
          <h2 className="f-display">
            Generás, lo leés, <span className="f-marca-frase">y sale.</span>
          </h2>
          <p className="f-bajada f-cabeza-bajada">
            Cuatro pasos sobre el mismo informe. El tercero es el único que
            Nuvlo no da solo.
          </p>
        </div>
      </div>

      <div className="f-anclada f-fl-anclada" data-escena="anclada" ref={escena}>
        <div className="f-anclada-vista">
          <div className="f-marco f-fl-fila">
            <div className="f-fl-indice">
              {/* El riel: una línea que se llena por `scaleY`. El indicador de
                  progreso es el mismo número que decide el paso activo, así que
                  no pueden desincronizarse. */}
              <div className="f-fl-riel" aria-hidden="true">
                <span className="f-fl-riel-lleno" />
              </div>

              <ol className="f-fl-pasos">
                {PASOS.map((p, i) => (
                  <li key={p.id} className="f-fl-item f-banda" style={banda(i)}>
                    <span className="f-fl-numero f-cifra">{p.rotulo}</span>
                    <div className="f-fl-item-texto">
                      <h3 className="f-titular">{p.titulo}</h3>
                      <p className="f-cuerpo f-fl-item-cuerpo">{p.cuerpo}</p>
                    </div>

                    {/* El panel del paso, para móvil y para movimiento
                        reducido. Debajo de 1024px la columna que acompaña no
                        existe y cada paso trae el suyo. */}
                    <div className="f-fl-panel-movil">
                      <Panel id={p.id} />
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Los cuatro paneles se rinden siempre, apilados en la misma celda
                de grilla: así la caja mide lo que mide el más alto y no cambia
                de alto nunca. Montarlos y desmontarlos hacía que la pieza
                pegajosa saltara 86px entre estados. */}
            <div className="f-fl-columna" aria-hidden="true">
              {PASOS.map((p, i) => (
                <div key={p.id} className="f-fl-capa f-banda" style={banda(i)}>
                  <Panel id={p.id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
