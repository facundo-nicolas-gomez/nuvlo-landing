import { Entra, Fila } from "./Entra";

/**
 * LO QUE NUVLO NO HACE.
 *
 * ── QUÉ SE TIRÓ ─────────────────────────────────────────────────────────────
 * Era una lista de definición de seis filas. Texto y filetes, nada más.
 *
 * Lo que la sección tiene ahora como elemento visual es la RAYA en grande. No
 * es un adorno tipográfico: la raya es el marcador de dato faltante que emite
 * el panel —`v ? v.display : "—"`— y `PRODUCT.md` la fija como regla de
 * producto: sin dato se escribe «—», nunca un cero inventado. Es el símbolo
 * exacto de lo que esta sección viene a decir, así que se muestra en el cuerpo
 * que le corresponde a un símbolo, no escondido adentro de un párrafo.
 *
 * ── Y LOS LÍMITES SE ORDENAN POR TIPO ───────────────────────────────────────
 * Estaban los seis en una fila indistinta. Ahora se agrupan en dos columnas con
 * su encabezado: lo que el producto NO ALCANZA y lo que el producto NO
 * INVENTA. Son dos clases de límite distintas y mezclarlas hacía que las seis
 * se leyeran como una lista de disculpas.
 */

const GRUPOS = [
  {
    rotulo: "Hasta dónde llega",
    items: [
      {
        termino: "Sólo Meta Ads",
        definicion:
          "No hay Google Ads, TikTok ni LinkedIn, y no hay un «próximamente» escondido. Sumar otra plataforma sería otro producto.",
      },
      {
        termino: "Hasta 92 días por reporte",
        definicion:
          "Es el rango máximo que se puede pedir de una vez. Alcanza para un mes o una quincena, que es el ritmo real del oficio.",
      },
      {
        termino: "La hora de envío todavía no se elige",
        definicion:
          "El campo existe y se guarda, pero hoy el envío programado corre a las 08:00 UTC para todas las cuentas. Cuando se cumpla, se promete.",
      },
    ],
  },
  {
    rotulo: "Lo que nunca inventa",
    items: [
      {
        termino: "Sin dato va una raya",
        definicion:
          "Cuando Meta no devuelve un número, el reporte escribe «—». Nunca un cero, que en una planilla se lee como un dato.",
      },
      {
        termino: "Sin mes anterior no hay variación",
        definicion:
          "Si no existe un período comparable, la columna queda vacía. Nunca 0 %, que significaría «no cambió» y es otra cosa.",
      },
      {
        termino: "El color lo decide el negocio",
        definicion:
          "Que la inversión suba no se pinta de verde. Que el costo por conversación baje, sí. Es el criterio del anunciante, no una paleta.",
      },
    ],
  },
];

export function Limites() {
  return (
    <section className="f-li-seccion" id="limites">
      <div className="f-marco f-li-fila">
        <Entra className="f-li-voz">
          {/* La raya, en el cuerpo que le corresponde a un símbolo. Es el
              marcador de dato faltante que emite el panel, no un guion largo
              puesto de adorno. */}
          <span className="f-li-raya" aria-hidden="true" />
          <h2 className="f-display">
            Lo que Nuvlo <span className="f-marca-frase">no hace.</span>
          </h2>
          <p className="f-bajada f-li-bajada">
            Los límites del producto, escritos por nosotros antes de que los
            descubras vos.
          </p>
        </Entra>

        <div className="f-li-grupos">
          {GRUPOS.map((g, gi) => (
            <Entra key={g.rotulo} demora={gi * 120} className="f-li-grupo">
              <p className="f-rotulo">{g.rotulo}</p>
              <dl className="f-li-lista">
                {g.items.map((l, i) => (
                  <Fila key={l.termino} orden={i} className="f-li-item">
                    <dt className="f-titulo">{l.termino}</dt>
                    <dd className="f-cuerpo f-li-def">{l.definicion}</dd>
                  </Fila>
                ))}
              </dl>
            </Entra>
          ))}
        </div>
      </div>
    </section>
  );
}
