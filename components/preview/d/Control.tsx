import { Resumen } from "./reporte/Piezas";
import { Revelar } from "./Revelar";

/**
 * CONTROL — el tramo negro puntual de la página.
 *
 * Es el diferencial y es ESTRUCTURAL, no una promesa de marketing: la
 * invariante vive en la arquitectura del panel. `computeReportMetrics` calcula
 * todas las métricas y variaciones, y a la IA se le pasa un resumen ORDINAL de
 * campañas —nombres, posición por inversión, etiquetas cualitativas, sin una
 * sola cifra—. Si el número no entra al prompt, no puede salir en el reporte.
 *
 * ── POR QUÉ ACÁ HAY UN PEDAZO DE REPORTE ────────────────────────────────────
 * Ésta es la afirmación más fuerte de la página y era la única sección que la
 * hacía sin artefacto al lado: texto sobre negro pidiendo que le crean. Ahora
 * trae la pieza del resumen ejecutivo —que es literalmente lo único que escribe
 * la IA en el producto— como hoja blanca cortando contra el negro. La hoja se
 * separa por VALOR y no por sombra: sobre tinta las sombras son `rgb(13 15 18)`
 * y no existen.
 *
 * ── POR QUÉ LOS CUATRO HECHOS NO SON CUATRO TARJETAS ────────────────────────
 * Son una lista de filetes a dos columnas debajo del artefacto. La estructura
 * «filete + título + párrafo gris» ya la usan otros tramos, y el pedido es que
 * ninguna sección repita la composición de otra: acá lo que manda es la hoja, y
 * los hechos son su pie de página.
 */

const HECHOS = [
  {
    titulo: "Los números los calcula el código",
    cuerpo:
      "Las métricas y las variaciones salen de una función determinística. Mismos datos, mismo resultado, las veces que lo corras.",
  },
  {
    titulo: "A la IA no le llega una cifra",
    cuerpo:
      "Recibe un resumen ordinal: qué campañas hay, cómo se ordenan por inversión y etiquetas cualitativas. No puede citar un número que no esté ya calculado.",
  },
  {
    titulo: "El reporte nace borrador",
    cuerpo:
      "El flujo por defecto es manual. Nada sale hasta que alguien aprieta «Aprobar y Enviar», con el destinatario impreso debajo del botón.",
  },
  {
    titulo: "Y si la IA falla, se frena sola",
    cuerpo:
      "El envío automático es opcional, exige suscripción activa y se autoinhibe si la redacción cayó al texto de respaldo. Mandarle prosa genérica al cliente de tu cliente es peor que no mandar nada.",
  },
];

export default function Control() {
  return (
    <section className="c-seccion d-invertido" id="control">
      <div className="d-marco c-fila">
        <Revelar className="c-voz" eje="izquierda">
          <h2 className="t-display">La IA redacta. No calcula.</h2>
          <p className="t-bajada medida-bajada">
            Todo número que la IA pueda mencionar está también en el reporte que
            tu cliente tiene delante. No es una política: es cómo está
            construido.
          </p>
        </Revelar>

        <div className="c-cuerpo">
          <Revelar eje="escala" className="c-artefacto">
            <p className="t-rotulo c-artefacto-rotulo">
              Lo único que escribe la IA
            </p>
            <div className="c-hoja">
              <Resumen extracto />
            </div>
            <p className="t-fino c-artefacto-pie">
              Ni una de las cifras que cita salió de acá: todas están calculadas
              antes, y todas están en el reporte que tu cliente abre.
            </p>
          </Revelar>

          <div className="c-hechos">
            {HECHOS.map((h, i) => (
              <Revelar key={h.titulo} demora={0.05 * i}>
                <article className="c-hecho">
                  <h3 className="t-titulo">{h.titulo}</h3>
                  <p className="t-cuerpo">{h.cuerpo}</p>
                </article>
              </Revelar>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
