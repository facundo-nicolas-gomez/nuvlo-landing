import { RECORRIDO_MUESTRA } from "@/lib/reporte-muestra";

/**
 * EL CONTROL, DIBUJADO COMO UN CORTE.
 *
 * ── LA IDEA ─────────────────────────────────────────────────────────────────
 * Los tres estados son reales del panel: un reporte nace borrador, alguien lo
 * aprueba, y recién ahí sale. Entre el borrador y la aprobación pasan ocho
 * minutos —una persona leyéndolo— y entre la aprobación y el envío no pasa
 * nada, porque aprobar ES enviar.
 *
 * Ese hueco de ocho minutos es el argumento entero del producto, así que acá es
 * un hueco literal: el filete que une los estados se INTERRUMPE, y en la
 * interrupción va la barra ámbar. La línea es lo automático; el corte es la
 * persona. Es el vocabulario de formas del sistema usado como información y no
 * como adorno.
 *
 * ── LO QUE NO SE PROMETE ────────────────────────────────────────────────────
 * El envío automático existe (opt-in, por cuenta, con suscripción activa), así
 * que decir "nace borrador y ahí se queda" sería falso. Se nombra abajo, con
 * sus dos frenos reales, en vez de esconderlo para que el diagrama quede
 * prolijo.
 */
const GARANTIAS = [
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
  return (
    <section className="control" data-seccion="control">
      <div className="contenedor">
        <div className="control-cabeza entra">
          <h2 className="titular">
            Entre el borrador y tu cliente hay una persona.
          </h2>
          <p className="bajada">
            Son ocho minutos de ejemplo, y son los únicos que Nuvlo no puede dar
            solos.
          </p>
        </div>

        <ol className="linea">
          {RECORRIDO_MUESTRA.map((hito) => (
            <li
              className={`hito hito-${hito.tono}`}
              key={hito.estado}
              data-hito={hito.tono}
            >
              <div className="hito-cabeza">
                <span className="hito-estado">{hito.estado}</span>
                <time className="hito-hora cifra">{hito.hora}</time>
              </div>
              <p className="hito-detalle">{hito.detalle}</p>
            </li>
          ))}
        </ol>

        <div className="garantias">
          {GARANTIAS.map((g) => (
            <div className="garantia" key={g.titulo}>
              <h3 className="garantia-titulo">{g.titulo}</h3>
              <p className="garantia-texto">{g.texto}</p>
            </div>
          ))}
        </div>

        <p className="control-pie">Horas del mismo ejemplo ficticio.</p>
      </div>
    </section>
  );
}
