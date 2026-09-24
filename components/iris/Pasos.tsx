import { Entra } from "./Entra";
import { Generar } from "./Generar";

/**
 * TRES PASOS — el gesto de cada mes, y lo que reemplaza.
 *
 * ── EL REDISEÑO DEL 17/09/2026 ──────────────────────────────────────────────
 * Fueron tres filas con texto y objeto hasta que el dueño rechazó la sección
 * entera —«probá un rediseño completo»— y eligió, entre tres direcciones, la
 * comparación: a la izquierda lo que hay hoy, tachado; a la derecha los tres
 * pasos y un solo objeto del panel, el diálogo de generar. El número sigue
 * importando porque el orden es la información: conectar, generar, aprobar, y
 * no hay forma de saltearse el tercero.
 *
 * Con el rediseño salieron de la sección la lista de generación
 * (`Generacion.tsx`, que se fue a Criterio), el título que se escribe
 * (`Rotacion.tsx`), la ficha del cliente (`Cuenta.tsx`) y la ficha de lo que un
 * borrador todavía no tiene. Los dos del medio no los usa hoy nadie.
 *
 * ── Y LA SEGUNDA VUELTA, DEL 19/09/2026 ─────────────────────────────────────
 * La comparación en dos columnas la rechazó el dueño por distribución —«está
 * mal distribuido todo»— después de quince variantes que no la arreglaban. El
 * motivo estaba medido y era estructural: el diálogo mide 549 de alto y ningún
 * texto que pueda ir al lado pasa de 424, así que siempre sobraba media
 * columna. La sección era la única de la página que mostraba una tarjeta
 * ENTERA, flotando en blanco; el héroe y El entregable cortan su objeto contra
 * el canto de un panel. Ahora ésta también.
 *
 * La forma final salió de cuatro correcciones seguidas del dueño, y cada una
 * está anotada donde manda, en `app/estilos/secciones.css`:
 *
 *   1. el diálogo se recorta contra un panel, y el corte es de ABAJO —por el
 *      costado, el calendario se lee roto—;
 *   2. las horizontales cruzan la sección de riel a riel, no media columna;
 *   3. las dos verticales cierran la grilla, que sin ellas era un pentagrama;
 *   4. el título baja a la banda, porque al lado del panel sobraban 400px de
 *      aire.
 *
 * Lo que queda es una sola composición: arriba la banda —toda la voz a la
 * izquierda, el artefacto recortado a la derecha—; abajo la grilla, con los
 * tres pasos y el remate de lo que hay hoy como su pie.
 *
 * ── CONTRA QUÉ SE ELIGE, Y NO CÓMO LO HACÉS HOY ─────────────────────────────
 * El remate decía «hoy exportás y cruzás en una planilla». El dueño avisó que
 * esa premisa puede no ser la de su cliente: hay quien usa un tablero, quien
 * manda un PDF automático, quien lo hace a mano, quien no manda nada y quien le
 * paga a otro. Las cuatro salidas que nombra fallan en lo mismo, y ninguna
 * nombra un producto ni le atribuye nada a nadie: describen la forma de la
 * salida.
 *
 * ── CADA PASO CONTESTA UNA OBJECIÓN ─────────────────────────────────────────
 * Debajo del título de cada paso, una frase corta que nombra la duda que ese
 * paso resuelve (pedido del dueño, 08/09/2026). Las tres salen de `PRODUCT.md`.
 */

const PASOS = [
  {
    titulo: "Conectar la cuenta de tu cliente",
    objecion: "Sin exportar de Meta ni cruzar datos a mano.",
    // Sólo lo que PRODUCT.md sostiene: se conecta la cuenta con el acceso del
    // trafficker, lo suyo se carga una vez, y al generar elige el período —las
    // campañas y la salida vienen con la respuesta de siempre—. El permiso
    // exacto (`ads_read`) está registrado desde el 24/09/2026, pero se dice en
    // `#permiso` y no acá: esta fila habla del gesto, no del alcance.
    texto:
      "Con tu propio acceso de Meta. Los datos de tu agencia y del cliente se cargan una sola vez; después, cada reporte es elegir el período.",
    periodo: true,
  },
  {
    titulo: "Nuvlo calcula, la IA redacta",
    // La objeción cambió de eje el 08/09/2026. Decía «La IA no ve un solo
    // número», que es cierto y ya lo sostiene Preguntas: la página cubría tres
    // veces el eje de la HONESTIDAD —no te miente con un dato— y ninguna el del
    // CRITERIO, que es el que le cuesta la reputación al trafficker.
    // (12/09/2026) El eje no cambia; le faltaba el sujeto: sin él la frase se
    // leía como continuación del título y el «escribe» quedaba sin dueño.
    objecion: "La IA escribe el análisis, y sale con tu firma.",
    texto:
      "Nuvlo hace los cálculos con los datos que entrega Meta. La IA redacta el resumen, la alerta y hasta tres acciones a partir de esos números ya hechos.",
    generacion: true,
  },
  {
    titulo: "Leerlo y aprobarlo",
    // «Por defecto» desde el 13/09/2026: el envío automático de una cuenta y el
    // envío programado de un reporte salen sin el botón, y los dos los elige el
    // usuario. Sin la salvedad la línea afirmaba de más.
    objecion: "Por defecto, nada sale sin un clic en el botón.",
    texto:
      "Nace como borrador, sin enlace público y sin correo. Sale con un clic en «Aprobar y enviar», con el destinatario a la vista.",
    accion: true,
    tuyo: true,
  },
];


export function Pasos() {
  return (
    <section
      className="i-seccion i-pasos-seccion"
      id="pasos"
      aria-labelledby="i-h-pasos"
    >
      <div className="i-marco i-pasos-fila">
        <Entra className="i-pasos-cuerpo">
          {/* LA BANDA, IZQUIERDA: toda la voz de la sección, repartida en el
              alto del panel. */}
          <div className="i-pasos-texto">
            <div>
              <h2 id="i-h-pasos" className="i-display">
                <span className="i-tenue">Tres pasos.</span> El último es tuyo.
              </h2>
              {/* ── LA BAJADA NO DA POR SENTADO CÓMO LO HACÉS HOY (17/09) ────
                  Decía «lo que hoy te lleva una tarde de exportar, cruzar y
                  redactar», que es la premisa que el dueño puso en duda. Ahora
                  dice qué hacés vos y qué queda hecho, sin afirmar nada sobre tu
                  proceso actual, y no repite el ángulo del héroe —contra qué se
                  compara—: acá el ángulo es el trabajo que desaparece. */}
              <p className="i-bajada i-cabeza-bajada">
                Solo quedan dos decisiones: el período y si sale. Los cálculos,
                la redacción y el correo ya están hechos al abrirlo.
              </p>
            </div>

            {/* ── LA TESIS AFIRMA SOBRE NUVLO, NO SOBRE LOS DEMÁS (18/09) ────
                Decía «Ninguna deja un informe escrito que vos hayas aprobado
                antes de que salga», y tenía dos problemas de distinto tamaño.

                El chico: es una afirmación ABSOLUTA sobre una categoría entera
                de productos ajenos, y `PRODUCT.md` no tiene con qué sostenerla
                —habría que conocerlos todos—. Es la única frase de la página
                que no pasaba la vara del repo: nada que no se pueda verificar.

                El grande, que apareció al revisarla: **la contradice su propia
                lista**. En «una tarde por cliente» el informe lo escribís y lo
                aprobás vos. Que te cueste la tarde no lo vuelve un informe sin
                aprobar. «Ninguna» era falso ahí mismo, a treinta centímetros.

                Lo que las cuatro salidas fallan NO es lo mismo: el tablero y el
                mensaje no dejan informe escrito, el PDF automático no se
                aprueba, y el manual se aprueba pero cuesta la tarde. O sea que
                lo propio de Nuvlo es la CONJUNCIÓN de las tres, y eso se dice
                sin nombrar a nadie. La comparación la hace la composición y no
                la frase. */}
            <p className="i-pasos-tesis">
              Un informe escrito, con tu
              <em className="i-pasos-acento"> aprobación</em>, y sin perder la
              tarde en hacerlo a mano.
            </p>
          </div>

          {/* LA BANDA, DERECHA: el panel es la caja que recorta. El diálogo lo
              excede por abajo y el canto lo corta. */}
          <div className="i-pasos-panel">
            <div className="i-pasos-objeto">
              <Generar />
            </div>
          </div>

          {/* LA GRILLA: cruza la sección entera, de riel a riel. */}
          <ol className="i-pasos-lista">
            {PASOS.map((paso, i) => (
              <li key={paso.titulo} data-tuyo={paso.tuyo ? "" : undefined}>
                <span className="i-cifra i-paso-n">{i + 1}</span>
                <span className="i-paso-titulo">{paso.titulo}</span>
                <span className="i-chico i-paso-frase">{paso.objecion}</span>
                <span className="i-cuerpo i-paso-texto">{paso.texto}</span>
              </li>
            ))}
          </ol>

          {/* ── EL REMATE «EN LUGAR DE» SE FUE (dueño, 19/09/2026) ───────────
              Era el pie de la sección: cuatro salidas tachadas —un tablero, un
              PDF que sale solo, una tarde por cliente, un mensaje con dos
              números—. Se va entero por pedido del dueño, y con él sus dos
              filetes, que eran la última horizontal de la sección.

              Lo que se pierde, por si vuelve: era el único lugar de la página
              que nombraba la FORMA de lo que Nuvlo reemplaza sin nombrar a
              ningún competidor. El argumento vive igual en el titular de la
              sección y en los tres pasos; lo que no queda es el contraste
              dicho en una línea. */}
        </Entra>
      </div>
    </section>
  );
}
