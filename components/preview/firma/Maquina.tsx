import {
  PROMPT_CAMPANAS_MUESTRA,
  RESUMEN_MUESTRA,
} from "@/lib/reporte-muestra";
import { Resultados } from "./Reporte";
import { Entra, Fila } from "./Entra";

/**
 * LA MÁQUINA — el tramo oscuro, y dos piezas que se pisan.
 *
 * ── LA TRANSICIÓN ES LA DE CONTROL, SIN UN CAMBIO ──────────────────────────
 * El manto que sube tapando el claro, los 620ms, el `f-pasaje-sube` de salida:
 * todo eso viene de la sección que esta reemplazó y se conserva tal cual. Es lo
 * único de la página que corta en vez de fundir, se usa UNA vez, y lo que se
 * clipea es el manto y no el contenido.
 *
 * Por eso esta sección sigue usando `f-c-corte` y `f-c-manto`: son las clases
 * que `movimiento.css` mira por nombre. **Si algún día se borra el CSS de
 * Control, esas dos reglas y su bloque en `movimiento.css` tienen que
 * sobrevivir**, porque ahora las gasta esta sección. También conserva
 * `id="control"`, que es a donde apunta el enlace de la barra.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * RECHAZADA Y REHECHA (06/09/2026)
 * ═══════════════════════════════════════════════════════════════════════════
 * El diagnóstico del dueño, entero, porque es el que manda: «es demasiado
 * texto. Dos bloques de prosa del mismo género, uno arriba y otro abajo, sin
 * más diferencia que el tamaño. El argumento está bien pero lo cuenta todo el
 * copy, el visual no carga nada. Y la banda blanca de resultados se ve vacía y
 * flota sin relación con el párrafo que cita esas cifras».
 *
 * Los tres problemas eran uno: **la sección no tenía un objeto**. Tenía texto
 * grande, texto chico y un fragmento de banco apoyado en el aire.
 *
 * ── AHORA SON DOS PIEZAS Y LA PROPORCIÓN ENTRE ELLAS ───────────────────────
 *
 *   la hoja del prompt   el bloque que entra, como pieza física: superficie
 *                        grafito —la intermedia sobre oscuro—, apaisada, con el
 *                        texto a tamaño de lectura y cerrada en los cuatro
 *                        cantos, dentro del margen del contenedor.
 *   la banda de cifras   el banco de KPI del informe, en hoja plena y opaca,
 *                        más grande que la hoja del prompt, cruzándola por su
 *                        canto inferior y por el derecho, y cortada contra el
 *                        borde de la pantalla.
 *
 * ── SANGRA UNA SOLA, Y ES LA DENSA ─────────────────────────────────────────
 * Las dos sangraban, cada una por un lado. Dos piezas que se van por bordes
 * opuestos dejan de leerse como una decisión sobre esos objetos: la simetría se
 * lee como el contenedor imponiendo su regla, no como el informe siguiendo de
 * largo. Sangra la banda porque es el objeto denso y porque lo que se corta ahí
 * es un fragmento de un documento que efectivamente sigue. La hoja del prompt
 * no sigue: es un string completo, y cerrarla en sus cuatro cantos es lo que
 * dice que eso es TODO lo que entra.
 *
 * ── Y EL CORTE CAE SOBRE UNA CELDA, NO SOBRE SUPERFICIE ────────────────────
 * La banda muestra el banco ENTERO, las cuatro celdas. Un sangrado dice «esto
 * sigue» sólo si hay contenido corriendo hasta el filo; si lo último que se ve
 * es superficie vacía, dice «esto es una superficie grande que se cortó», que
 * es lo contrario. Con tres celdas repartidas a lo ancho quedaban 165px de
 * blanco entre la última cifra y el borde.
 *
 * El orden del informe hace el resto solo: Inversión, Conversaciones y Costo
 * por conversación —las tres que el párrafo cita— quedan enteras, y la cuarta
 * es CTR, que el párrafo no nombra. O sea que el recorte lo hace el viewport y
 * no un filtro nuestro, y lo que el corte significa es «el informe tiene más»,
 * que es verdad.
 *
 * La proporción ES el argumento: lo que la IA ve es poco y lo que el cliente
 * tiene delante es mucho. Antes eso lo decía sólo el copy; ahora lo dice el
 * tamaño de las dos superficies, y el copy puede callarse.
 *
 * ── POR QUÉ UNA VA EN GRAFITO Y LA OTRA EN HOJA ────────────────────────────
 * Porque la que se superpone tiene que traer superficie completa y opaca, y la
 * de atrás no puede competir. Dos claros del mismo valor es papel sobre papel,
 * que es exactamente como esta superposición ya fracasó una vez. Con grafito
 * abajo y hoja arriba el orden de los planos se lee sin sombra, que sobre
 * espresso además no se puede declarar.
 *
 * ── SE FUE LA MITAD DEL TEXTO ──────────────────────────────────────────────
 * Eran cinco bloques de prosa —bajada, regla de la entrada, párrafo, nota del
 * ancla y pie— y quedan tres. La regla de la entrada se fundió con la bajada,
 * que ya decía la mitad; la nota del ancla y el pie se fundieron en una sola
 * línea de cierre. Lo que se perdió es repetición, no argumento: las dos
 * afirmaciones que sostienen la sección —«ninguna cifra de la cuenta entra» y
 * «si no entra al prompt no sale en el reporte»— siguen escritas, una en cada
 * punta.
 *
 * Y el párrafo bajó de 24px al cuerpo corriente. A 24px era el segundo muro de
 * texto; a 15px es lo que es —un párrafo de un informe— y entra en el hueco que
 * deja la superposición, que es donde tenía que estar.
 *
 * ── LO QUE NO VA, Y NO ES POR FALTA DE GANAS ───────────────────────────────
 * Ni nodos, ni flechas, ni líneas de llamada entre las piezas. Se construyó
 * como vista despiezada en Anatomía y se descartó por una contradicción de la
 * idea: obliga a ordenar las piezas por su lugar en el documento, y ese orden
 * choca con el que la sección necesita. La relación entre las dos piezas la
 * hace el cruce, no un dibujo que la explique.
 *
 * ── EL PÁRRAFO NO PUEDE CITAR UNA CIFRA QUE NO ENTRE AL PROMPT ─────────────
 * Verificado contra el panel el 06/09/2026 y escrito entero en
 * `lib/reporte-muestra.ts`: `metricsToText()` emite los KPI como
 * `{etiqueta}: {display} ({variación})`, sin el valor anterior, y el sistema
 * prohíbe recalcular. Las cuatro cifras que el párrafo nombra son el valor y
 * las variaciones de tres KPI, o sea exactamente lo que entra al prompt y lo
 * que la banda imprime.
 */

const { encabezado, campanas } = PROMPT_CAMPANAS_MUESTRA;

/* El PRIMER párrafo del resumen, que es el que Anatomía no usa. El reparto no
   es para no repetirse: es el que cita las cifras del banco de KPI, que es la
   pieza que esta sección tiene al lado. El segundo cita las de la tabla y por
   eso vive en Anatomía, que muestra la tabla. */
const PARRAFO = RESUMEN_MUESTRA[0];

export function Maquina() {
  return (
    <>
      <Entra className="f-c-corte">
        <div className="f-c-manto" aria-hidden="true" />

        <section className="f-oscuro f-mq-seccion" id="control">
          <div className="f-sangra">
            <Entra className="f-mq-cabeza">
              <h2 className="f-display">
                La IA redacta. <span className="f-marca-frase">No calcula.</span>
              </h2>
              {/* La bajada absorbió la regla que antes colgaba del bloque: son
                  la misma afirmación dicha dos veces, y dicha una sola vez
                  arriba deja al bloque hablar solo. */}
              <p className="f-bajada f-mq-bajada">
                Esto es todo lo que Nuvlo le cuenta a la IA sobre tus campañas:
                los nombres y el orden por inversión. Ninguna cifra de la cuenta
                —los tres dígitos que ves son las posiciones—.
              </p>
            </Entra>

            {/**
             * LA ESCENA. Dos piezas, un corte y un hueco.
             *
             * La hoja del prompt cierra en el margen del contenedor; la banda
             * la cruza y se va por el borde derecho. El hueco que queda abajo a
             * la izquierda no es sobrante: es donde vive el párrafo.
             */}
            <Entra demora={140} className="f-mq-escena f-sangra-todo">
              {/**
               * ── 1. LA HOJA DEL PROMPT ────────────────────────────────────
               *
               * Superficie grafito, que es la intermedia del tramo: se apoya
               * sobre el grafito hondo y queda por debajo de la hoja plena, así
               * que el orden de los tres valores dice solo cuál está adelante.
               *
               * Cierra en sus cuatro cantos, dentro del margen del contenedor.
               * Sangraba hacia la izquierda y se sacó: un string completo que se
               * corta contra el borde dice que sigue, y no sigue —eso es todo lo
               * que entra al prompt—.
               *
               * El contenido no cambió ni un carácter: el encabezado es el
               * literal de `campañasToText()` y las tres campañas traen sus
               * etiquetas exactas, que son de las siete que `resumirCampañas()`
               * puede emitir.
               */}
              <div className="f-mq-hoja f-superficie">
                <div className="f-mq-hoja-cuerpo">
                  <p className="f-rotulo">El bloque que entra al prompt</p>

                  <p className="f-mq-encabezado">{encabezado}</p>

                  {/**
                   * Las líneas, con el formato exacto de la función:
                   * `{posición}. "{nombre}" — {notas separadas por «; »}`.
                   *
                   * Los signos —el punto del ordinal, las comillas, la raya,
                   * los punto y coma— son parte del string que se manda, así
                   * que van escritos como texto y no reemplazados por
                   * separadores dibujados. Lo único que la sección agrega es
                   * dónde cae cada cosa: el ordinal cuelga en su propia columna
                   * para que una línea larga siga alineada al envolver, y el
                   * nombre toma la tinta plena mientras las notas quedan un
                   * escalón abajo. Ni un carácter cambia; cambia dónde se
                   * apoya.
                   */}
                  <ol className="f-mq-lineas">
                    {campanas.map((c, i) => (
                      <Fila
                        key={c.nombre}
                        orden={i}
                        como="li"
                        className="f-mq-linea"
                      >
                        <span className="f-mq-ordinal f-cifra">
                          {c.posicion}.
                        </span>
                        <span>
                          <span className="f-mq-nombre">
                            &quot;{c.nombre}&quot;
                          </span>
                          {" — "}
                          {c.notas.join("; ")}
                        </span>
                      </Fila>
                    ))}
                  </ol>
                </div>
              </div>

              {/**
               * ── 2. LA BANDA DE CIFRAS ────────────────────────────────────
               *
               * Hoja plena y opaca sobre el tramo. Sale de su propia celda de
               * grilla con margen negativo —no en posicionamiento absoluto—,
               * así que la fila sigue reservando su lugar y abajo no se le monta
               * nada, y sube sobre el relleno inferior de la hoja del prompt,
               * que está reservado para eso y está vacío.
               *
               * Cruza dos cantos de la pieza de atrás: el inferior, por donde
               * sube, y el derecho, porque sigue más allá de donde la hoja
               * termina y se va por el borde de la pantalla.
               *
               * Adentro va el banco ENTERO. Las celdas tienen ancho fijo en vez
               * de repartirse el que hay, así que la cuarta desborda y la corta
               * el `overflow` de la pieza, que termina justo en el filo del
               * viewport. Ésa es la única forma de que lo último antes del corte
               * sea una cifra y no superficie vacía.
               *
               * Las cifras van ampliadas, que es lo que arregla el «se ve
               * vacía»: a tamaño de documento son números flotando en su celda.
               */}
              <div className="f-mq-banda f-superficie f-superficie-hoja">
                <Resultados />
              </div>

              {/**
               * ── 3. EL HUECO ──────────────────────────────────────────────
               *
               * El párrafo que la IA devuelve, al cuerpo corriente, metido en la
               * escuadra que dejan las dos piezas: debajo de la hoja del prompt
               * y a la izquierda de la banda. No es una tercera columna; es el
               * negativo de la superposición.
               */}
              <div className="f-mq-hueco">
                <p className="f-rotulo">El párrafo que devuelve</p>

                {/* `f-cifra` va en el párrafo entero y no en cada número: el
                    texto es literal del ejemplo y partirlo en spans para marcar
                    las cifras sería reescribirlo. La clase sólo enciende las
                    tabulares, así que puesta en el bloque alcanza a los números
                    que tiene adentro sin tocar una palabra. */}
                <p className="f-cuerpo f-mq-parrafo f-cifra">{PARRAFO}</p>

                {/* El cierre: la nota del ancla y el pie fundidos en uno. Dice
                    las dos cosas que quedaban por decir —que las cifras del
                    párrafo están en la banda, y por qué eso es de arquitectura—
                    sin el nombre de la función, que a un comprador de medios no
                    le agrega ninguna garantía. */}
                <p className="f-fino f-mq-cierre">
                  Las cuatro cifras que nombra —312, 18,6%, 10,7% y 6,0%— están
                  en esas celdas, calculadas antes de que existiera el prompt. Si
                  un número no entra al prompt, no puede salir en el reporte.
                </p>
              </div>
            </Entra>
          </div>
        </section>
      </Entra>

      <div className="f-pasaje f-pasaje-sube" aria-hidden="true" />
    </>
  );
}
