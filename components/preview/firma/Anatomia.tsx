import {
  ALERTA_MUESTRA,
  KPIS_MUESTRA,
  RESUMEN_MUESTRA,
} from "@/lib/reporte-muestra";
import { CifraKpi, Metricas } from "./Reporte";
import { Capsula } from "./Piezas";
import { Entra, Fila } from "./Entra";

/**
 * LA ANATOMÍA DEL INFORME.
 *
 * ── POR QUÉ VA ACÁ Y NO EN OTRO LADO ────────────────────────────────────────
 * El héroe corta el documento contra un fundido. Esta sección entra ADENTRO de
 * lo que se cortó: las mismas piezas, ampliadas, con la regla de producto que
 * gobierna a cada una escrita al lado.
 *
 * No vuelve a mostrar el reporte. Mostrarlo entero otra vez era el mismo objeto
 * dos veces; lo que el héroe no deja hacer es MIRAR UNA PIEZA. A tamaño de
 * fragmento el visitante ve que el documento existe y que es denso, pero no
 * llega a ver cómo está resuelto un número, qué pasa cuando falta un dato, ni
 * cómo está escrito el análisis.
 *
 * ── LA REGLA SE DEMUESTRA EN EL OBJETO ──────────────────────────────────────
 * Las reglas que se explican acá son de producto y están en `PRODUCT.md`.
 * Podrían enunciarse en una lista de cuatro ítems; enunciadas se leen como
 * promesas, y demostradas sobre la pieza que las obedece se leen como hechos.
 * La lista se puede escribir sin haber construido nada; la pieza no.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * SE PROBÓ COMO VISTA DESPIEZADA Y SE REVIRTIÓ (06/09/2026)
 * ═══════════════════════════════════════════════════════════════════════════
 * La sección llegó a tener detrás el FANTASMA del informe completo —el
 * documento entero a valor bajo— y cuatro líneas de llamada medidas que iban de
 * cada pieza al bloque del que sale. Está construida y commiteada en la rama
 * `rediseno/anatomia-despiece` (af5234e), con el componente que dibujaba las
 * líneas en `Despiece.tsx`, que sigue en el repo desmontado.
 *
 * **No se revirtió por ejecución: las líneas funcionaban y sobrevivían al
 * reflow.** Se revirtió por una contradicción de la idea, y conviene tenerla
 * escrita antes de que a alguien se le ocurra de nuevo:
 *
 *   una vista despiezada obliga a ordenar las piezas por el lugar que ocupan
 *   en el documento —si no, las líneas se cruzan y dejan de leerse—, y ese
 *   orden choca con el que la sección necesita por escala y por argumento.
 *
 * Con el orden del documento la sección abre con un párrafo de prosa y la cifra
 * de 66px, que es su ancla visual y la pieza cuya regla es la más literal,
 * queda tercera. El despiece le ganaba la composición al argumento. El propio
 * componente de las líneas lo dice de la otra punta: dos líneas que se cruzan
 * no se leen.
 *
 * ── LO QUE SÍ SOBREVIVIÓ DE ESA PASADA ──────────────────────────────────────
 * Cuatro correcciones que son de sistema y no de composición, y que se aplican
 * igual acá: el campo pasó a hueso cálido, la rampa de texto bajó a dos
 * escalones, la alerta perdió la caja y el punto —el reporte real la emite con
 * un filete de tinta y sin bullet— y la tabla se disuelve hacia abajo con la
 * misma máscara del fragmento del héroe.
 *
 * ── LAS CUATRO PIEZAS ───────────────────────────────────────────────────────
 * Tres van ampliadas en la retícula: el KPI con su cápsula, la alerta del
 * resumen y un párrafo del análisis. La cuarta —la tabla de métricas— va al
 * TAMAÑO QUE TIENE EN EL DOCUMENTO, sin ajuste de escala, y ésa es su función:
 * es la referencia contra la que las otras tres se verifican. Una pieza
 * ampliada más sería una cuarta vitrina; la misma pieza a tamaño real es el
 * original.
 *
 * Reusa `Metricas` entero de `Reporte.tsx`. Si la tabla cambia en el informe,
 * cambia acá.
 *
 * ── LAS TRES QUE NO ENTRARON, Y POR QUÉ ─────────────────────────────────────
 * Se evaluaron las otras tres primitivas candidatas y las tres sobran ACÁ, no
 * en la página: cada una ya tiene su sección, y una pieza sin regla propia que
 * enseñar es relleno.
 *
 *   la línea de campaña del prompt   es el argumento entero de «La máquina»,
 *                                    que muestra el bloque literal que entra a
 *                                    la IA. Traer una línea suelta acá sería
 *                                    adelantar esa sección con menos material.
 *   el pie del informe               la diferencia entre planes se demuestra en
 *                                    Precios, con el pie con la franja y sin
 *                                    ella. `lib/reporte-muestra.ts` lo deja
 *                                    escrito: es donde corresponde.
 *   la chapa de estado               «el informe nace borrador» lo muestra «El
 *                                    momento» con la barra de acción sin
 *                                    apretar y el destinatario impreso debajo.
 *                                    Acá sería el mismo hecho dicho más chico.
 *
 * ── LO QUE NO HACE ──────────────────────────────────────────────────────────
 * No abre con titular de display: abre con las piezas, y la única voz es el
 * rótulo que las nombra y el pie que las cierra. Un titular acá obligaba a
 * afirmar en palabras justo lo que la sección viene a mostrar sin ellas.
 *
 * Y no tiene movimiento atado al scroll. Entra una vez, escalonada, y se queda
 * quieta: hay cuatro textos para leer, y una sección que se sigue moviendo
 * mientras se la lee compite con su propio contenido.
 *
 * ── NI UN DATO INVENTADO ────────────────────────────────────────────────────
 * Las cuatro piezas salen enteras de `lib/reporte-muestra.ts` sin tocarlo. No
 * hay una fila armada para la ocasión, ni una variante de una fila, ni una
 * cifra escrita acá.
 *
 * ── SIN NARANJA ─────────────────────────────────────────────────────────────
 * Ninguna de las cuatro piezas lleva el acento, y la alerta tampoco: el color
 * de marca no entra al documento (`base.css`, 06/09/2026). Adentro del informe
 * el único color son las cápsulas de variación, y lo asigna el negocio.
 */

/* El KPI donde la regla del color es LITERAL: la flecha va para abajo y la
   cápsula es verde, porque el costo por conversación bajó y eso está bien. Se
   busca por etiqueta y no por índice para que siga siendo el mismo KPI aunque
   cambie el orden del arreglo. */
const KPI = KPIS_MUESTRA.find((k) => k.etiqueta === "Costo por conversación")!;

/* El segundo párrafo del resumen y no el primero: el primero abre citando los
   totales del período —es la apertura del informe— y el segundo razona sobre
   dos métricas, que es lo que la regla de al lado afirma que la IA hace, y lo
   que hace visible que no calculó ninguna de las dos. Además es el que cita
   «$ 20,57», que está impreso en la tabla de la cuarta pieza. */
const PARRAFO = RESUMEN_MUESTRA[1];

export function Anatomia() {
  return (
    <section className="f-seccion f-an-seccion" id="reporte">
      <div className="f-sangra">
        {/* La voz de la sección es este rótulo y nada más. Es la etiqueta del
            objeto que tiene debajo —el uso para el que existe el rótulo—, no un
            copete anunciando un titular que acá no hay. Va en <h2> para que la
            sección exista en el esquema del documento. */}
        <Entra>
          <h2 className="f-rotulo f-an-rotulo">Anatomía del informe</h2>
        </Entra>

        {/**
         * LA RETÍCULA, SIN FONDO Y SANGRADA.
         *
         * Las celdas no tienen superficie. Lo que queda son las líneas —dos
         * filetes horizontales que cruzan la pantalla de borde a borde y dos
         * verticales que parten el contenido en tres— y las piezas apoyadas
         * sobre el campo. El fondo de la página, con su lavado y su halo, corre
         * por debajo sin interrupción.
         *
         * Los dos canales no llevan superficie: sólo el filete inferior, y
         * existen para que la línea de abajo llegue hasta los dos bordes de la
         * pantalla mientras el contenido sigue empezando y terminando donde
         * manda el contenedor. Van `aria-hidden` porque no dicen nada: son la
         * línea.
         */}
        <Entra demora={80} className="f-an-tira f-sangra-todo">
          <div className="f-an-canal f-an-canal-izq" aria-hidden="true" />

          {/* ── 1. EL KPI CON SU CÁPSULA ─────────────────────────────────── */}
          <Fila orden={0} className="f-an-celda f-an-celda-a">
            <div className="f-an-pieza f-an-kpi">
              <p className="f-rotulo">{KPI.etiqueta}</p>
              <CifraKpi valor={KPI.valor} />
              <div className="f-an-kpi-pie">
                <Capsula variacion={KPI.variacion} sentido={KPI.sentido} />
              </div>
              {KPI.pista ? <p className="f-kpi-pista">{KPI.pista}</p> : null}
            </div>
            <p className="f-fino f-an-regla">
              El tick lo decide el signo; el color lo decide el negocio. Una
              flecha para abajo en verde no es un error: es el caso que el
              sistema tiene que saber expresar. Que la inversión suba no es
              verde.
            </p>
          </Fila>

          {/* ── 2. LA ALERTA DEL RESUMEN ─────────────────────────────────────
              Hereda `.f-r-alerta` del documento: el filete de tinta a la
              izquierda que emite `buildReportHtml()`, sin caja y sin bullet. Lo
              único que cambia acá es la escala, y va sin rótulo propio porque el
              informe tampoco se lo pone —la alerta vive adentro del bloque de
              resumen, no como un campo aparte—. */}
          <Fila orden={1} className="f-an-celda f-an-celda-b">
            <p className="f-an-pieza f-r-alerta f-an-alerta">{ALERTA_MUESTRA}</p>
            <p className="f-fino f-an-regla">
              Aparece sólo si la IA marcó algo. No hay una por informe ni un
              renglón de relleno cuando el mes no tuvo nada raro: un período sin
              sobresaltos sale sin alerta, y es lo único que el documento pone
              sobre la mesa para que decidas.
            </p>
          </Fila>

          {/* ── 3. UN PÁRRAFO DEL ANÁLISIS ───────────────────────────────── */}
          <Fila orden={2} className="f-an-celda f-an-celda-c">
            <div className="f-an-pieza">
              <p className="f-rotulo">Resumen ejecutivo</p>
              {/* `f-cifra` va en el párrafo entero y no en cada número: el
                  texto es literal del ejemplo y partirlo en spans para marcar
                  las cifras sería reescribirlo. La clase sólo enciende las
                  tabulares, así que puesta en el bloque alcanza a los números
                  que tiene adentro sin tocar una palabra. */}
              <p className="f-an-parrafo f-cifra">{PARRAFO}</p>
            </div>
            <p className="f-fino f-an-regla">
              Es lo único que redacta la IA. Los números los calcula el código
              antes y al prompt no entra ninguno, así que esto es prosa escrita
              sobre cifras ya cerradas.
            </p>
          </Fila>

          <div className="f-an-canal f-an-canal-der" aria-hidden="true" />

          {/**
           * ── 4. LA TABLA: EL SEGUNDO PLANO ────────────────────────────────
           *
           * La única pieza de la sección con superficie propia, y por eso es la
           * única que puede estar adelante: un objeto que se superpone tiene
           * que traer superficie completa y opaca. Detrás no hay otra
           * superficie —hay campo y líneas—, así que no son dos rectángulos
           * anidados, que es la forma en que esta superposición fracasó cuando
           * se probó en El momento con papel sobre papel.
           *
           * El plano lo hacen el desfase y el apilado, no la sombra: la pieza
           * sube sobre el relleno inferior de las celdas —que está reservado
           * para eso y está vacío—, tapa el final del filete vertical de la
           * tercera celda, cruza el filete horizontal de abajo y sigue hasta
           * cortarse contra el borde derecho de la pantalla.
           *
           * Sale de su propia celda de grilla con margen negativo, no en
           * posicionamiento absoluto, así que la fila sigue reservando su lugar
           * y abajo no se le monta nada.
           *
           * Va sin la nota al pie porque se disuelve hacia abajo y el fundido
           * se la comería a medias; lo que la nota dice —qué es la columna
           * «Anterior»— lo dice la regla de al lado con todas las letras.
           */}
          <div className="f-an-origen f-superficie">
            <Metricas nota={false} />
          </div>

          <p className="f-fino f-an-regla f-an-origen-regla">
            De acá salen las cifras que las otras piezas citan: 3,19 en la
            alerta y $ 20,57 en el análisis. Están impresas en el informe, al
            lado del valor del mes anterior, antes de que la IA escriba una
            palabra. Ésa es la invariante: la IA no puede nombrar un número que
            el cliente no tenga delante.
          </p>
        </Entra>

        <Entra demora={160}>
          <p className="f-fino f-an-pie">
            Las cuatro piezas están en el documento de acá arriba, con los datos
            ficticios del ejemplo. Las reglas no son del ejemplo: son las que el
            panel aplica en cada reporte que genera.
          </p>
        </Entra>
      </div>
    </section>
  );
}
