import { Fragment } from "react";
import {
  CLIENTE_MUESTRA,
  EMAIL_CLIENTE_MUESTRA,
  ESTADOS_MUESTRA,
  PERIODO_MUESTRA,
} from "@/lib/reporte-muestra";
import { Metricas, PlanDeAccion } from "./Reporte";
import { Entra } from "./Entra";
import { Punto } from "./Piezas";

/**
 * EL MOMENTO — la única sección que muestra la APLICACIÓN.
 *
 * ── POR QUÉ EXISTE ─────────────────────────────────────────────────────────
 * El reporte se ve en el héroe y en Anatomía, el bloque del prompt en La
 * máquina, el mail en El entregable. El panel no se veía en ningún lado, y ahí
 * es donde vive el paso que el producto vende: que nada sale hasta que una
 * persona aprieta el botón.
 *
 * ── LOS CUATRO PASOS SE COMPRIMIERON A UNA TIRA ────────────────────────────
 * La sección anterior era un recorrido anclado —índice fijo, riel de progreso,
 * `useProgreso`, cuatro paneles apilados en la misma celda— y ocupaba cuatro
 * pantallas para explicar lo que el titular del héroe dice en cinco palabras.
 * Era además la sección más cara de la página y la única atada al scroll; con
 * ella se va el último anclaje que quedaba.
 *
 * Ahora los cuatro pasos son cuatro líneas de texto arriba de la pieza, y todo
 * el peso se lo lleva el momento que importa.
 *
 * ── LA RELACIÓN ENTRE LA TIRA Y LA PIEZA ───────────────────────────────────
 * El tercer paso lleva el punto de la marca: es el único de los cuatro que
 * espera una decisión, que es la definición del marcador. Y es el que la pieza
 * de abajo muestra ampliado. Ésa es la costura que hace que la tira y la pieza
 * sean UNA sección y no dos cosas apiladas: el paso marcado y el objeto grande
 * son el mismo momento a dos escalas.
 *
 * Por eso el punto aparece dos veces —en el paso 03 y en la chapa «Borrador» de
 * la pieza— y no es un gasto: es el mismo estado señalado en los dos lugares
 * que la sección está cosiendo.
 *
 * ── LO QUE NO SE ESCRIBE, PORQUE SE MUESTRA ────────────────────────────────
 * «El reporte nace borrador» y «el flujo por defecto es manual» no van escritos
 * como afirmación: son lo que la pieza está haciendo. La chapa dice Borrador,
 * el botón todavía no se apretó, el destinatario está impreso debajo y la línea
 * de estado tiene Enviado sin alcanzar. Si hiciera falta decirlo con palabras,
 * la pieza estaría mal dibujada.
 *
 * ── «APROBADO» NO SE DIBUJA ────────────────────────────────────────────────
 * Porque no existe: aprobar es la ACCIÓN que mueve el reporte de borrador a
 * enviado, no un estado donde se queda. `ESTADOS_MUESTRA` ya lo tiene resuelto
 * y la línea de estado sale de ahí, no de una lista escrita acá.
 *
 * ── EL CROMO DE LA VENTANA ─────────────────────────────────────────────────
 * Tres luces y el nombre del cliente, SIN barra de direcciones. Es el cromo que
 * le puso la sección anterior y se conserva por la misma razón: el reporte es
 * una página pública con URL y esto es la aplicación. Darles el mismo marco
 * diría que son la misma cosa.
 *
 * ── LO QUE SE FUE, PARA QUE NO SE PIERDA ───────────────────────────────────
 * Los permisos de La cuenta —lo que pide y lo que no pide, el balance
 * desparejo— NO están acá y no se perdieron: van a **El trato**, que se
 * construye después. Son dos controles distintos: el acceso a la cuenta de tu
 * cliente y el envío del reporte. Juntos bajo un mismo título se leen como dos
 * bloques apilados, que es el defecto que este rediseño viene corrigiendo.
 * `Cuenta.tsx` sigue en el repo, desmontada, esperando esa sección.
 */

/**
 * Los cuatro pasos, como cuatro frases de un párrafo. Cada una se lee entera y
 * se lleva adentro el dato que le corresponde —los 92 días en la primera, las
 * tres frecuencias y sus dos condiciones en la última—, en vez de dejarlo en un
 * pie aparte: en una frase corrida un pie es una segunda frase, y entonces ya
 * no son cuatro pasos.
 *
 * `espera` es opcional y lo lleva UNO SOLO de los cuatro: el que pide una
 * decisión, que es el que se marca y el que sube de cuerpo. Va opcional y no
 * `false` en los otros tres para que al leer el arreglo se note que la marca es
 * la excepción y no un campo que hay que completar.
 */
type Paso = {
  rotulo: string;
  texto: string;
  espera?: boolean;
};

const PASOS: Paso[] = [
  {
    rotulo: "01",
    texto: "Elegís el período —hasta 92 días— y generás.",
  },
  {
    rotulo: "02",
    texto: "Lo leés entero antes de que exista para nadie: un borrador no tiene enlace público.",
  },
  {
    rotulo: "03",
    texto: "Aprobás, y recién ahí sale.",
    espera: true,
  },
  {
    rotulo: "04",
    texto: "O lo dejás programado, cada 7 días, cada 14 o el día 1 de cada mes; exige suscripción activa, y se frena solo si la redacción cayó al texto de respaldo.",
  },
];

/**
 * Una frase de la tira.
 *
 * ── LOS ESPACIOS SON CARACTERES, NO MÁRGENES ───────────────────────────────
 * Entre el ordinal y su texto, y entre una frase y la siguiente, va un espacio
 * de verdad. Estuvo resuelto con `margin-right` y se rompió en cuanto una
 * pasada cambió ese margen a sólo vertical: quedó «sale.04 O lo dejás
 * programado», pegado, porque `map` no emite separadores entre hermanos.
 *
 * Un espacio entre palabras es del texto. Si lo pone el CSS, el marcado dice
 * una cosa —«sale.04»— y la pantalla otra, y lo que un lector de pantalla lee
 * es el marcado.
 */
const frase = (p: Paso, i: number) => (
  <Fragment key={p.rotulo}>
    {i > 0 ? " " : null}
    {p.espera ? (
      <strong className="f-mo-clave">
        <Punto />
        <span className="f-mo-ordinal f-cifra">{p.rotulo}</span> {p.texto}
      </strong>
    ) : (
      <span>
        <span className="f-mo-ordinal f-cifra">{p.rotulo}</span> {p.texto}
      </span>
    )}
  </Fragment>
);

export function Momento() {
  return (
    <section className="f-seccion f-mo-seccion" id="flujo">
      <div className="f-marco">
        <Entra>
          <h2 className="f-rotulo f-mo-rotulo">El momento en que sale</h2>
        </Entra>
      </div>

      {/**
       * EL ESPEJO DEL HÉROE.
       *
       * Allá el texto va a la izquierda y el documento se corta contra el borde
       * derecho; acá la ventana se corta contra el borde IZQUIERDO y el texto
       * queda en una columna angosta a la derecha, alineada por arriba con ella.
       * Es el mismo recurso invertido, no la misma composición repetida.
       *
       * Lo que se va del borde es la superficie de la ventana. Adentro no se
       * pierde nada útil: la barra de título, la fila de contexto, la tabla
       * entera con sus cuatro columnas y el plan de acción siguen completos. Si
       * alguna vez se perdiera una columna de la tabla, la ventana quedó
       * demasiado ancha —no el corte demasiado profundo—.
       */}
      <div className="f-mo-fila">

        {/**
         * LA TIRA: UNA FRASE CORRIDA, CON UN SOLO CUERPO.
         *
         * ── LAS DOS VERSIONES QUE NO FUNCIONARON ──────────────────────────
         * Primero fueron cuatro celdas iguales de 226px, que de forma es la fila
         * de cuatro features que la regla de las tarjetas hermanas prohíbe: las
         * mismas cajas repetidas y los pies desalineados porque los textos miden
         * distinto. Son cuatro frases cortas, no cuatro categorías.
         *
         * Después el 03 subió de cuerpo para destacarse: primero inline —23,8px
         * metidos en un renglón calculado para 16,6px, sin aire propio— y
         * después parado solo en su propio bloque. Las dos veces el recurso era
         * el mismo y el mismo el error: **el tamaño**.
         *
         * ── POR QUÉ EL TAMAÑO NO ES EL RECURSO ────────────────────────────
         * En este sistema el peso y el color son los que ordenan; la escala
         * tipográfica está reservada a decir de qué NIVEL es un texto —titular,
         * bajada, cuerpo—, no cuál de cuatro frases del mismo nivel importa
         * más. Los cuatro pasos son el mismo nivel. Meter un quinto tamaño
         * adentro de un párrafo corrido para señalar uno es pedirle a la rampa
         * un trabajo que no es el suyo.
         *
         * Así que el 03 queda al mismo cuerpo que los otros tres y se distingue
         * por lo que este sistema sí usa: tinta plena contra tinta media, peso
         * 500 contra 400, y el punto de la marca. Tres diferencias, ninguna de
         * tamaño, y el punto ya no es la única.
         *
         * Sin cambio de cuerpo tampoco hace falta el `white-space: nowrap` que
         * lo mantenía entero en un renglón: no hay nada que forzar.
         */}
        {/* La tira va PRIMERO en el marcado y SEGUNDA en la grilla. El orden de
            lectura es el que tiene sentido —la explicación antes que el objeto
            que explica— y la colocación la decide `grid-column`, así que un
            lector de pantalla la escucha antes sin que la composición cambie. */}
        <Entra demora={60} className="f-mo-tira">
          <p className="f-mo-corrida">{PASOS.map(frase)}</p>
        </Entra>

        <Entra demora={140} className="f-ventana f-mo-ventana">
          <div className="f-ventana-barra">
            <div className="f-luces" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            {/**
             * LA BARRA DE TÍTULO DICE DÓNDE ESTÁS PARADO EN LA APLICACIÓN.
             *
             * Pasó por dos versiones equivocadas antes de ésta. Primero llevó
             * `DOCUMENTO_MUESTRA` —el nombre del documento—, que es la regla de
             * las ventanas que muestran el ENTREGABLE: el marco de navegador del
             * héroe, donde el título acompaña a una URL pública. Un nombre de
             * documento en el cromo de una app la convierte en un visor de
             * archivos, que es justo lo que la ausencia de barra de direcciones
             * venía a evitar.
             *
             * Después llevó el nombre del cliente, y eso funcionaba cuando la
             * ventana no tenía el informe adentro. Ahora lo tiene, y el informe
             * trae su propio encabezado con el cliente como titular doce píxeles
             * más abajo: el nombre quedaba escrito dos veces en el mismo objeto.
             *
             * `Reportes` no es una etiqueta inventada para la landing: es como
             * el panel llama a esa sección en su barra lateral
             * (`nuvlo-panel/src/components/sidebar.tsx`), y la pantalla de
             * detalle vuelve ahí con un enlace que dice «Volver a reportes».
             */}
            <p className="f-ventana-titulo">Reportes</p>
          </div>

          {/**
           * LA FILA DE CONTEXTO — CROMO DE LA APLICACIÓN, NO DEL DOCUMENTO.
           *
           * Reemplaza al encabezado del informe, que salió de la ventana. Dice
           * las tres cosas que el panel real pone arriba de la pantalla de
           * detalle: de quién es el reporte, de qué período y en qué estado
           * está. Va FUERA de la hoja, sobre la crema de la ventana, porque no
           * es contenido del documento: es la aplicación diciendo qué tenés
           * abierto.
           *
           * Con el encabezado del informe afuera, el nombre del cliente vuelve
           * a estar una sola vez en toda la pieza.
           */}
          <div className="f-mo-contexto">
            <p className="f-mo-ctx">
              <span className="f-mo-ctx-cliente">{CLIENTE_MUESTRA}</span>
              <span className="f-mo-ctx-sep" aria-hidden="true">
                ·
              </span>
              <span className="f-cifra">{PERIODO_MUESTRA}</span>
            </p>
            <span className="f-chapa f-mo-chapa">
              <Punto />
              {ESTADOS_MUESTRA[0].nombre}
            </span>
          </div>

          {/**
           * EL FINAL DEL INFORME, QUE ES LO ÚNICO QUE LA PÁGINA NO MOSTRÓ.
           *
           * ── POR QUÉ CAMBIÓ LO QUE HAY ADENTRO ──────────────────────────
           * La ventana mostraba encabezado, resumen, alerta y los cuatro KPI, y
           * ése es EXACTAMENTE el fragmento del héroe: mismo copete, mismo
           * cliente, mismos dos párrafos palabra por palabra, misma alerta,
           * mismos KPI. Con Anatomía en el medio ampliando piezas de ese mismo
           * fragmento, el visitante veía el mismo pedazo de documento tres veces
           * en las tres primeras secciones.
           *
           * Acá va el final: las métricas detalladas y el plan de acción. El
           * recorte del héroe corta en las primeras filas de la tabla y el plan
           * queda entero abajo del corte —está medido y escrito en
           * `Pagina.tsx`—, así que es material que la página no mostró nunca.
           *
           * Y paga la promesa del paso 02 de la tira, «lo leés entero»: lo que
           * se ve acá es justamente lo que hasta este punto nadie leyó.
           *
           * ── EL CIERRE NO VA ────────────────────────────────────────────
           * La firma de la agencia es el argumento de El entregable, que viene
           * después. Meterla acá le sacaría el remate a esa sección.
           */}
          <div className="f-ventana-hoja">
            <div className="f-reporte f-mo-doc">
              <Metricas />
              <PlanDeAccion />
            </div>
          </div>

          {/**
           * LA BARRA DE ACCIÓN.
           *
           * Los estados a la izquierda dicen hacia dónde va; el botón a la
           * derecha es lo único que lo mueve. Y el destinatario va IMPRESO
           * DEBAJO DEL BOTÓN y no en otra pantalla: quien aprueba ve a quién le
           * llega, en el mismo golpe de vista en que aprueba. Ése es el detalle
           * entero, y por eso la barra no se resume.
           */}
          <div className="f-mo-barra">
            <ol className="f-mo-estados">
              {ESTADOS_MUESTRA.map((e) => (
                <li
                  key={e.nombre}
                  className="f-mo-estado"
                  data-alcanzado={e.alcanzado}
                >
                  {e.nombre}
                </li>
              ))}
            </ol>

            <div className="f-mo-accion">
              {/* No es un `PanelLink`: es el botón del producto dibujado
                  adentro de una captura, no la CTA del sitio. La única acción
                  real de la página vive en la barra y en el cierre. */}
              <span className="f-mo-boton" aria-hidden="true">
                Aprobar y enviar
              </span>
              <p className="f-fino f-mo-destinatario">
                Le llega a{" "}
                <strong className="f-cifra">{EMAIL_CLIENTE_MUESTRA}</strong>
              </p>
            </div>
          </div>
        </Entra>
      </div>
    </section>
  );
}
