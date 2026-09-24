import { Navbar } from "./Navbar";
import { Entra } from "./Entra";
import { Heroe } from "./Heroe";
import { Pasos } from "./Pasos";
import { Lectura } from "./Lectura";
import { Maquina } from "./Maquina";
import { Clientes } from "./Clientes";
import { Entregable } from "./Entregable";
import { Permiso } from "./Permiso";
import { Precios } from "./Precios";
import { Preguntas } from "./Preguntas";
import { Cierre } from "./Cierre";
import { Atajo } from "./Atajo";

/**
 * LA LANDING — pasada «iris».
 *
 * ── DIEZ SECCIONES, UN ARGUMENTO ────────────────────────────────────────────
 *   héroe          el informe como lo abre el cliente, en su navegador y con
 *                  su URL, sobre la bandeja. La prueba antes que la promesa.
 *   Tres pasos     conectás, Nuvlo calcula y la IA redacta, vos aprobás. El
 *                  tercero es el único teñido: es donde entra una persona.
 *   La lectura     noche: la hoja entera sobre un haz de luz; al bajar, la
 *                  parte de la que habla la guía se levanta del papel como
 *                  una lámina (13/09/2026). Abre el capítulo oscuro.
 *   La máquina     noche: el reporte se arma delante del visitante —Meta, la
 *                  comparación sin IA, la IA con nombres y sin cifras, el
 *                  armado— y se frena en borrador. Cierra el capítulo oscuro.
 *                  Reemplaza a Criterio y Control el 18/09/2026: eran dos
 *                  secciones con la misma silueta afirmando dos verdades sobre
 *                  un proceso, y ahora el proceso se ejecuta (ver
 *                  `Maquina.tsx`).
 *   El entregable  el mail que recibe el cliente, literal, el mismo mail
 *                  abierto en su celular, y las otras dos formas del informe.
 *   El permiso     la autorización real de Meta, recortada, sobre un campo
 *                  que va del azul de Meta al petróleo: un solo permiso, ads_read.
 *   Precios        por cliente, al mes, con la diferencia citada.
 *   Preguntas      lo que conviene saber, incluidos los límites.
 *   Cierre         noche: el pie que se revela por debajo del telón (el
 *                  «Motion Footer» de 21st.dev), con la misma acción y sin
 *                  promesa nueva.
 *
 * ── EL HÉROE MUESTRA EL ENTREGABLE, Y DEJA APROBARLO ────────────────────────
 * Lo que vende es el entregable: el visitante tiene que juzgar si esto lo
 * mandaría con su nombre arriba. La tarjeta flotante le deja apretar «Aprobar
 * y Enviar» ahí mismo, y con eso la ventana pasa de la vista previa del panel
 * a la página pública de su cliente. El panel entero —el recorrido, los modos,
 * el reporte adentro— se muestra en Control, donde el argumento es el control
 * y no la calidad.
 */
export function Pagina() {
  return (
    <div className="iris">
      <div className="i-fondo" aria-hidden="true" />

      <Navbar />

      {/* `i-cortina`: este `main` es el telón que sube y revela el Cierre. */}
      <main className="i-cortina" id="contenido" tabIndex={-1}>
        <section className="i-heroe" id="reporte" aria-labelledby="i-h1">
          {/* ── LA PORTADA BAJA A LA COLUMNA (dueño, 18/09/2026) ──────────────
              Vivía acá arriba, en una banda propia a todo el ancho, y esa banda
              medía 248px: era lo que impedía que la ventana empezara antes de
              y=442. Con 463px de alto útil sobre el pliegue no entraban el
              resumen ejecutivo (403) y el banco de KPI (231) a la vez, así que
              el héroe apagaba el resumen —ver `.i-heroe-escena .i-doc-bloque
              [data-arriba]`— y lo que se veía del informe eran veinte piezas de
              texto y CERO oraciones. El dueño lo leyó como «no dice nada», y no
              era sensación: la página prometía «no es un tablero» al lado de un
              tablero.

              Bajando la portada a la columna, la fila arranca en 162 y la
              ventana sube 280px: el alto útil pasa a 743 y los dos bloques
              entran. Es la salida que el 09/09/2026 se había evaluado y
              descartado por el trabajo que costaba, no por estar mal.

              Va como PROP y no adentro de `Heroe`: `Heroe` es de cliente y el
              `h1` tiene que seguir saliendo del servidor —es el primer texto de
              la página y no depende de ningún estado—. Pasado como JSX desde
              acá, se renderiza en el servidor y `Heroe` sólo lo ubica. */}
          <Heroe
            portada={
            <Entra>
              {/* El espacio duro entre «cliente,» y «hecho.» no es un capricho:
                  `text-wrap: balance` iguala el LARGO de las líneas y no sabe
                  nada del sentido, así que a 1440 y a 1024 partía la frase en
                  «El reporte de tu cliente,» / «hecho. Sale cuando vos decís.»
                  y dejaba la palabra que carga el titular colgando al empezar
                  la segunda línea (dueño, 09/09/2026). Pegándolas, el único
                  corte legal cae después de «hecho.», que es donde termina la
                  idea. No se usó `nowrap` en un `span` porque a 390 la frase no
                  entra en una línea y desbordaría. */}
              {/* ── QUÉ ES Y PARA QUIÉN, ANTES DEL TITULAR (17/09/2026) ────────
                  El dueño leyó la primera pantalla y marcó que no se entiende
                  qué es: el titular dice qué pasa con el reporte —«hecho, sale
                  cuando vos decís»— pero no dice de qué producto se trata ni a
                  quién le habla. Las dos cosas están en `PRODUCT.md` desde
                  siempre: reportes de Meta Ads, y el usuario primario es el
                  trafficker freelance que atiende su propia cartera.

                  Dice «quien atiende clientes» y no «traffickers freelance»
                  (dueño, 17/09/2026): nombra al mismo oficio sin cerrarle la
                  puerta a las agencias chicas, que usan el producto aunque no
                  sean a quien el sitio persuade.

                  Va como rótulo y no adentro del titular porque el titular es
                  UNA afirmación y ya se probó que partirlo en dos le saca la
                  mitad del sujeto (dueño, 13/09/2026). El `title` y la
                  descripción del sitio no cambian: siguen siendo el titular y
                  la bajada, literales. */}
              <p className="i-rotulo i-portada-rotulo">
                Reportes de Meta Ads para quien atiende clientes
              </p>
              <h1 id="i-h1" className="i-portada">
                {/* Sin dos tonos a propósito (dueño, 13/09/2026): se probó el gris
                    en «El reporte de tu cliente,» y no funcionó. El titular del
                    héroe es UNA afirmación, y partirla en dos pesos le saca la
                    mitad del sujeto. */}
                {/* ── UNA ORACIÓN POR BLOQUE (18/09/2026) ──────────────────────
                    El espacio DURO entre «cliente,» y «hecho.» resolvía el
                    corte mientras el titular corría a todo el ancho y entraba
                    en dos renglones. Al bajar a la columna entra en tres, y
                    volvió a cortar donde no debe: «El reporte de tu / cliente,
                    hecho. Sale / cuando vos decís.» deja «Sale» huérfano al
                    final del segundo renglón y arranca ahí la segunda
                    afirmación. El espacio duro ya no alcanza: ataba dos
                    palabras y el problema pasó a ser dónde empieza cada frase.

                    Cada oración pasa a ser un bloque, así el límite de oración
                    ES un límite de renglón y `text-wrap: balance` sólo decide
                    adentro de cada una. Es la misma regla de siempre —«el único
                    corte legal cae después de hecho.»— declarada en la
                    estructura y no confiada a un espacio. A todo el ancho da
                    los mismos dos renglones que daba antes. */}
                <span className="i-portada-frase">
                  El reporte de tu cliente, hecho.
                </span>{" "}
                {/* Decía «Sale cuando vos decís» hasta el 24/09/2026, cuando el
                    dueño abrió la venta a todo el mercado hispanohablante: el
                    copy pasó a español neutro sin tutear —posesivos, infinitivos
                    y Nuvlo como sujeto—. «Decisión tuya» cubre los dos modos
                    igual que la frase vieja: programar el envío también lo es. */}
                <span className="i-portada-frase">Enviarlo es decisión tuya.</span>
              </h1>
              {/* ── CONTRA QUÉ SE COMPARA (dueño, 17/09/2026) ─────────────────
                  El dueño pidió que la primera pantalla diga por qué Nuvlo y no
                  otra herramienta. La diferencia es de `PRODUCT.md` y es
                  estructural: lo que se entrega es un documento escrito y
                  firmado, y nada sale sin que una persona lo apruebe. No nombra
                  competidores ni les atribuye nada; nombra la forma del
                  entregable.

                  Va acá, debajo del titular y a su ancho, y no en la columna
                  del argumento: ahí quedaban cinco textos apilados en 345px
                  (dueño, 17/09/2026: «no queda todo junto»). */}
              <p className="i-portada-contra">
                No es un tablero al que tu cliente tiene que entrar: es el
                informe escrito que le llega, con tu firma y tu aprobación.
              </p>
            </Entra>
            }
          />
        </section>

        {/* Pegada al héroe, que es el lugar clásico de una tira de logos y el
            que el dueño eligió el 19/09/2026 —la había puesto entre el
            entregable y el precio ese mismo día—. El argumento a favor de
            atrasarla era que la página abre denso y tres marcas ajenas cortan;
            el que ganó es más simple: **el héroe acaba de mostrar un informe de
            una cuenta ficticia**, y lo primero que corresponde después es
            decir de dónde salió el producto. Acá la tira no interrumpe un
            argumento, lo fundamenta. */}
        <Clientes />
        <Pasos />
        <Lectura />
        <Maquina />
        <Entregable />
        {/* Entre lo que recibe el cliente y lo que se paga: es la última
            objeción antes del precio —¿qué puede hacer con la cuenta?— y no
            se mete entre «aprobás» y «le llega», que es lo que sacó al
            Tablero. */}
        <Permiso />
        <Precios />
        <Preguntas />
      </main>

      {/* El pie va fuera de <main>: main es el telón que sube y lo revela. */}
      <Cierre />

      {/* Último en el árbol a propósito: el atajo flota sobre la página, así que
          en el orden de tabulación tiene que caer después de todo lo que tapa y
          no antes. Sólo se dibuja en teléfono. */}
      <Atajo />
    </div>
  );
}
