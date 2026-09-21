import { Revelar } from "./Revelar";

/**
 * LÍMITES — el pasaje tranquilo, y el que más confianza compra.
 *
 * Es la única sección sin objeto y sin superficie: después de dos tramos densos
 * la página se gana uno callado. La composición es una lista de definición a
 * dos columnas con el filete como única estructura.
 *
 * Todo lo de acá sale de `PRODUCT.md` y es lo que el sitio NO puede prometer.
 * En particular: el modelo `AdAccount` guarda `metaAccountId` y nada más, así
 * que el sitio no puede sugerir otras plataformas ni siquiera con un
 * «próximamente»; y la hora de envío existe como campo pero no se cumple,
 * porque el cron corre a las 08:00 UTC para todos.
 */

const LIMITES = [
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
    termino: "Sin dato va una raya",
    definicion:
      "Cuando Meta no devuelve un número, el reporte escribe «—». Nunca un cero inventado, que en una planilla se lee como un dato.",
  },
  {
    termino: "Sin mes anterior no hay variación",
    definicion:
      "Si no existe un período comparable, la columna queda vacía. Nunca 0 %, que significaría «no cambió» y es otra cosa.",
  },
  {
    termino: "La hora de envío todavía no se elige",
    definicion:
      "El campo existe y se guarda, pero hoy el envío programado corre a las 08:00 UTC para todas las cuentas. Cuando se cumpla, se promete.",
  },
  {
    termino: "El color lo decide el negocio",
    definicion:
      "Que la inversión suba no se pinta de verde. Que el costo por conversación baje, sí. Es el criterio del anunciante, no una paleta.",
  },
];

export default function Limites() {
  return (
    <section className="l-seccion">
      <div className="d-marco">
        <Revelar className="l-cabeza">
          <h2 className="t-titular">Lo que Nuvlo no hace</h2>
          <p className="t-bajada medida-bajada">
            Vas a conectar la cuenta publicitaria de un cliente tuyo. Preferimos
            que sepas los bordes antes.
          </p>
        </Revelar>

        {/**
         * Una tabla de definición sobre la retícula de un píxel, no una pila de
         * «filete + título + párrafo»: esa estructura ya la usan otros tramos y
         * ninguna sección repite la composición de otra. Acá el término y su
         * definición comparten fila, que es como se lee una lista de límites.
         */}
        <dl className="d-reticula l-tabla">
          {LIMITES.map((l, i) => (
            <Revelar key={l.termino} demora={0.04 * i} className="l-fila">
              <dt className="t-titulo">{l.termino}</dt>
              <dd className="t-cuerpo">{l.definicion}</dd>
            </Revelar>
          ))}
        </dl>
      </div>
    </section>
  );
}
