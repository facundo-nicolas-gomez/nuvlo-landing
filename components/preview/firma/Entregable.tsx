import { REMITENTE_MAIL_MUESTRA } from "@/lib/reporte-muestra";
import { Entra } from "./Entra";
import { BarraNavegador } from "./Piezas";
import { Encabezado, Metricas, Resultados, Resumen } from "./Reporte";
import { Telefono } from "./Telefono";

/**
 * EL ENTREGABLE — el teléfono adelante, y las otras dos formas del informe.
 *
 * Formato asignado: OBJETO ÚNICO. El objeto es el teléfono; las otras dos
 * piezas entran a otra escala y por detrás.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * POR QUÉ SE REHIZO (06/09/2026)
 * ═══════════════════════════════════════════════════════════════════════════
 * Era la única de las cuatro secciones nuevas que nunca se revisó contra el
 * criterio de composición. Medido a 1440, tenía:
 *
 *   la misma composición que El momento, que pasó a ser la sección de arriba
 *   —objeto a un lado, columna de texto al otro—;
 *   un solo plano, nada sangrando y nada superponiéndose;
 *   el teléfono flotando en una columna de 503px con un aparato de 320;
 *   96px muertos entre el final de las notas y el margen;
 *   1041px de alto para un teléfono, dos notas y un pie.
 *
 * El diagnóstico de fondo era el de `docs/composicion-secciones.md`: **una sola
 * pieza**. Y acá el arreglo no era inventar piezas, porque las que faltaban ya
 * estaban escritas en `PRODUCT.md`.
 *
 * ── LAS TRES FORMAS SON DEL PRODUCTO, NO DE LA PÁGINA ──────────────────────
 * «El entregable vive en tres formas: un email mínimo y 100 % marca blanca, una
 * página pública `noindex` y fail-closed cuyo enlace vence a los 90 días, y un
 * PDF con las mismas secciones». Hasta esta pasada la primera era un objeto y
 * las otras dos eran dos párrafos. Ahora las tres son objetos, y las tres salen
 * de primitivas que ya existían:
 *
 *   el mail             el teléfono, sin un solo cambio. Ver más abajo.
 *   la página pública   `BarraNavegador` + el documento: el mismo marco del
 *                       héroe, con la misma URL real.
 *   el PDF              el documento otra vez, a escala de página impresa.
 *
 * ── EL TELÉFONO NO SE TOCA, Y ES LO QUE LA SECCIÓN AFIRMA ──────────────────
 * Es la única superficie de la página que NO es de Nuvlo: no es el documento ni
 * la aplicación, es la bandeja de alguien que nunca va a tener cuenta. El mail
 * es 100 % marca blanca —saludo, período, botón y firma de la agencia— y por
 * eso la pieza no lleva un solo elemento nuestro. El argumento se verifica
 * mirando, y el mail escribiéndose solo al entrar en pantalla tampoco cambió.
 *
 * ── LO QUE LAS DOS PIEZAS NUEVAS ENSEÑAN, QUE NO ES «HAY MÁS FORMATOS» ─────
 * Las dos van sin la chapa de estado, y eso es una regla de producto que la
 * página no había mostrado nunca: **el estado es tuyo, no de tu cliente**. El
 * informe nace borrador y esa chapa la ves vos en el panel; cuando el cliente
 * abre la página o el PDF ya no hay nada que decidir, así que no está. Por eso
 * `Encabezado` recibe `chapa={false}` y no una copia del encabezado con menos
 * cosas.
 *
 * ── LO QUE SALIÓ ──────────────────────────────────────────────────────────
 * El titular de display y el `f-marca-frase`. Los tres display de la página son
 * La máquina, El trato y el Cierre; un cuarto gasta el escalón que hace que los
 * otros tres pesen. Abre como Anatomía y El momento, con un rótulo.
 *
 * Y salió «tu host de reportes» de la nota de la página pública. La barra de
 * direcciones de la pieza dice `r.nuvloapp.com`, que es el host del plan
 * Estándar; el host propio es la diferencia del plan Marca Blanca y se demuestra
 * en Precios. Prometerlo acá, con la URL nuestra a la vista en el mismo golpe,
 * era una contradicción visible.
 */

/**
 * Las dos notas: una por pieza de apoyo. El mail no lleva la suya porque la
 * bajada ya la dice y porque la pieza se explica sola —no hay nada nuestro
 * adentro que haya que señalar—.
 */
const NOTAS = [
  {
    rotulo: "La página pública",
    texto:
      "El botón del mail la abre en el navegador: sin cuenta, sin instalar nada. No se indexa y el enlace vence a los 90 días.",
  },
  {
    rotulo: "El PDF",
    texto:
      "Las mismas secciones y las mismas cifras, en el archivo que tu cliente va a guardar o reenviar.",
  },
];

export function Entregable() {
  return (
    <section className="f-seccion f-en-seccion" id="entregable">
      <div className="f-sangra">
        <Entra>
          <h2 className="f-rotulo f-en-rotulo">Lo que recibe tu cliente</h2>
          <p className="f-bajada f-en-bajada">
            El mismo informe le llega en tres formas —el mail, la página que
            abre en el navegador y el PDF— y en ninguna de las tres aparece
            Nuvlo. Sale con el nombre de tu agencia y con nada más.
          </p>
        </Entra>

        {/**
         * LA ESCENA. Tres piezas, tres planos, dos cruces y un corte.
         *
         * Cada pieza es su propio `Entra` y no una fila adentro de uno solo: el
         * mail se escribe con su tiempo —siete líneas escalonadas— y si
         * compartiera observador con los treinta y pico de renglones de los dos
         * documentos, su escalonado se perdería adentro del de ellos.
         */}
        <div className="f-en-escena f-sangra-todo">
          {/**
           * ── 1. EL TELÉFONO — el plano de adelante y el objeto ───────────
           *
           * Va PRIMERO en el marcado y NO primero en la composición, que es el
           * mismo reparto que hace la tira de El momento. Apilada, la sección
           * tiene que abrir por el mail: es la forma que la bajada nombra
           * primero y la única que se explica sola. Dónde cae en pantalla lo
           * decide `grid-column`, así que un lector de pantalla lo escucha
           * antes sin que la composición cambie.
           */}
          <Entra className="f-en-tel">
            <Telefono />
          </Entra>

          {/**
           * ── 2. LA PÁGINA PÚBLICA — el plano de atrás ────────────────────
           *
           * El marco de navegador del héroe, con la URL real: el cliente final
           * abre el informe en `r.nuvloapp.com/r/{token}`, así que la barra de
           * direcciones no es un campo decorativo con tres puntitos.
           *
           * Es la pieza más grande de la sección y aun así la de apoyo, porque
           * está atrás, porque el teléfono le tapa el canto izquierdo y porque
           * su documento se disuelve. El teléfono es el único objeto entero de
           * la escena.
           */}
          <Entra demora={80} className="f-en-pagina f-navegador">
            <BarraNavegador />
            <div className="f-recorte f-en-vista">
              <div className="f-reporte">
                <Encabezado chapa={false} />
                <Resumen />
                <Resultados />
              </div>
            </div>
          </Entra>

          {/**
           * ── 3. EL PDF — el plano del medio ──────────────────────────────
           *
           * Una página, no una tarjeta: proporción de hoja y el documento
           * adentro a escala de impresión. Lo que se lee a ese tamaño no son
           * las palabras sino las secciones —encabezado, resumen, los cuatro
           * números, la tabla—, que es exactamente lo que la nota afirma: las
           * mismas secciones y las mismas cifras.
           *
           * Sube sobre el canto inferior de la página pública, que para eso
           * reserva su franja vacía.
           */}
          <Entra demora={200} className="f-en-pdf">
            {/* Oculto a la lectura, y es la única forma honesta de resolverlo:
                el documento está a escala de impresión —unos 5,6px de cuerpo—,
                así que nadie lo lee mirando y anunciárselo entero a un lector
                de pantalla sería la tercera copia del mismo informe en la misma
                página. Lo que la pieza dice lo dice su nota, con todas las
                letras. */}
            <div className="f-en-pdf-doc" aria-hidden="true">
              <div className="f-reporte">
                <Encabezado chapa={false} />
                <Resumen />
                <Resultados />
                <Metricas nota={false} />
              </div>
            </div>
          </Entra>

          {/**
           * ── LAS NOTAS, EN EL HUECO ──────────────────────────────────────
           *
           * Van adentro de la escena y no debajo: la escuadra que queda abajo a
           * la derecha —debajo de la página pública y a la derecha del PDF— es
           * el negativo de la composición, y ponerlas ahí es lo que evita que
           * la sección crezca a lo alto para alojar dos párrafos.
           */}
          <Entra demora={280} className="f-en-notas">
            {NOTAS.map((n) => (
              <div key={n.rotulo} className="f-en-nota">
                <p className="f-rotulo">{n.rotulo}</p>
                <p className="f-fino">{n.texto}</p>
              </div>
            ))}

            <p className="f-fino f-en-pie">
              El remitente sale a nombre de tu agencia, desde{" "}
              <span className="f-cifra">{REMITENTE_MAIL_MUESTRA}</span>. Ejemplo
              con datos ficticios; el nombre de tu agencia es requisito para
              generar y enviar.
            </p>
          </Entra>
        </div>
      </div>
    </section>
  );
}
