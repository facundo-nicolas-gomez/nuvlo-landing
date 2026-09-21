import { RECORRIDO_MUESTRA } from "@/lib/reporte-muestra";

/**
 * EL CONTROL. Primer movimiento oscuro de la página.
 *
 * ── POR QUÉ ACÁ SE APAGA LA LUZ ─────────────────────────────────────────────
 * No es un cambio de humor. Toda la página vivía en una banda de seis puntos de
 * valor (#f1f3f6 de campo contra #ffffff de hoja, 1,06:1) y por eso se leía
 * plana: no había con qué modelar. Acá el campo baja a #0e1013 y la hoja que
 * viene después llega a 19:1 contra él. El rango es la diferencia, no el
 * layout.
 *
 * Y el lugar es el correcto: ésta es la sección del momento en que nada sale
 * sin que vos aprietes. El corte ámbar recién tiene contra qué brillar.
 *
 * ── NO REPITE EL RIEL DEL HÉROE ─────────────────────────────────────────────
 * El héroe ya muestra los cuatro estados como pieza de interfaz. Repetir esa
 * forma acá sería la estructura repetida que hay que evitar, así que el
 * argumento cambia de vehículo: son dos horas puestas en grande, con el hueco
 * literal entre ellas. La tipografía ES la imagen. Es el único lugar de la
 * página donde una cifra se agranda hasta volverse objeto.
 *
 * Las dos horas y sus textos salen de `RECORRIDO_MUESTRA`, que son estados
 * reales del panel.
 */
const FRENOS = [
  {
    titulo: "La IA no computa un solo número",
    texto:
      "Las métricas las calcula Nuvlo antes de que el modelo intervenga, y al prompt no le llega el desglose por campaña con cifras. Si el número no entra, no puede salir: es una invariante de arquitectura, no una promesa.",
  },
  {
    titulo: "Si lo automatizás, quedan dos frenos",
    texto:
      "El envío automático es opcional y se activa por cuenta. Exige suscripción activa, y si la IA no logró redactar el análisis ese reporte no sale: te espera como borrador.",
  },
];

export default function Control() {
  const borrador = RECORRIDO_MUESTRA[0];
  const enviado = RECORRIDO_MUESTRA[2];

  return (
    <section className="c-sec c-control" data-seccion="control">
      <div className="c-marco">
        <div className="c-control-cabeza c-revela">
          <h2 className="c-titulo-sec">
            Entre el borrador y tu cliente hay una persona.
          </h2>
          <p className="c-bajada-sec c-bajada-noche">
            Son ocho minutos de ejemplo, y son los únicos que Nuvlo no puede dar
            solos.
          </p>
        </div>

        {/* El hueco, literal. La raya se interrumpe donde entra la persona. */}
        <div className="c-hueco c-revela">
          <div className="c-hito">
            <time className="c-hito-hora cifra">{borrador.hora}</time>
            <span className="c-hito-estado">{borrador.estado}</span>
            <p className="c-hito-detalle">{borrador.detalle}</p>
          </div>

          <div className="c-corte" aria-hidden="true">
            <span className="c-corte-linea" />
            <span className="c-corte-marca">8 minutos. Vos.</span>
            <span className="c-corte-linea" />
          </div>

          <div className="c-hito c-hito-fin">
            <time className="c-hito-hora cifra">{enviado.hora}</time>
            <span className="c-hito-estado">{enviado.estado}</span>
            <p className="c-hito-detalle">{enviado.detalle}</p>
          </div>
        </div>

        {/* Dos frenos, dos pesos distintos: no son dos tarjetas iguales. */}
        <div className="c-frenos">
          {FRENOS.map((freno, i) => (
            <article
              className={`c-freno ${i === 0 ? "c-freno-ancho" : "c-freno-angosto"}`}
              key={freno.titulo}
            >
              <span className="c-freno-orden cifra" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="c-freno-titulo">{freno.titulo}</h3>
              <p className="c-freno-texto">{freno.texto}</p>
            </article>
          ))}
        </div>

        <p className="c-nota-pie">Horas del mismo ejemplo ficticio.</p>
      </div>
    </section>
  );
}
