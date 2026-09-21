import PanelLink from "@/components/landing/PanelLink";
import {
  PRECIO_ESTANDAR_LABEL,
  PRECIO_WHITE_LABEL_LABEL,
} from "@/lib/precios";
import { Pie } from "./reporte/Piezas";
import { Revelar } from "./Revelar";

/**
 * PLANES.
 *
 * ── EL PRECIO NUNCA VA SIN SU UNIDAD NI SIN SU MONEDA ───────────────────────
 * «USD 39 por cliente, al mes». Las dos mitades son obligatorias y por motivos
 * distintos: sin la unidad se lee como abono fijo y es un precio distinto del
 * que se cobra; sin la moneda, un `$` pelado es incorrecto por uno o dos
 * órdenes de magnitud para un lector en México, Colombia o Chile —el alcance
 * declarado es LatAm—. Y la propia página se lo confirma, porque el reporte de
 * muestra imprime cifras en la moneda de la cuenta del cliente: los dos `$`
 * conviven acá arriba.
 *
 * Los importes se importan de `lib/precios.ts`, nunca se tipean: un job de CI
 * del panel lee ese archivo por ruta y compara las constantes.
 *
 * ── LA COMPOSICIÓN ──────────────────────────────────────────────────────────
 * No son dos tarjetas gemelas con una chapa de «recomendado». Es UNA superficie
 * partida por la retícula de un píxel, y la diferencia entre planes está
 * DEMOSTRADA abajo con el pie del reporte real: con la franja «Generado con
 * Nuvlo» y sin ella. Es el mismo componente, el mismo informe, dos plumas.
 */

const PLANES = [
  {
    nombre: "Estándar",
    precio: PRECIO_ESTANDAR_LABEL,
    resumen: "El informe cierra con una línea que dice «Generado con Nuvlo».",
    puntos: [
      // PRODUCT.md no dice en ningun lado que los reportes sean ilimitados:
      // enumera el tope de cuentas y el de clientes, y nada mas. La unidad de
      // cobro si esta afirmada, y es lo que importa en una lista de precio.
      "Se cobra por cliente atendido, no por reporte",
      "Sin tope de cuentas publicitarias",
      "Sin tope de clientes",
      "El mail sale con tu firma",
    ],
  },
  {
    nombre: "Marca Blanca",
    precio: PRECIO_WHITE_LABEL_LABEL,
    resumen:
      "El informe sale sólo con tu marca, y por tu propio host de reportes.",
    puntos: [
      "Todo lo del plan Estándar",
      "Sin ninguna referencia a Nuvlo",
      "Host de reportes propio",
      "El entregable es enteramente tuyo",
    ],
  },
];

export default function Planes() {
  return (
    <section className="p-seccion d-seccion-abre" id="planes">
      <div className="d-marco">
        <Revelar className="p-cabeza">
          <h2 className="t-display">Se paga por cliente atendido.</h2>
          <p className="t-bajada medida-bajada">
            La misma unidad que vos le facturás a él. Empezás con 3 reportes
            gratis y sin tarjeta.
          </p>
        </Revelar>

        <Revelar eje="escala">
          <div className="d-reticula p-grilla">
            {PLANES.map((plan) => (
              <div className="p-plan" key={plan.nombre}>
                <p className="t-rotulo">{plan.nombre}</p>
                <p className="p-precio">
                  <span className="cifra p-precio-cifra">{plan.precio}</span>
                  <span className="t-chico p-unidad">por cliente, al mes</span>
                </p>
                <p className="t-cuerpo p-resumen">{plan.resumen}</p>
                <ul className="p-puntos">
                  {plan.puntos.map((punto) => (
                    <li key={punto} className="t-chico">
                      {punto}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* La demostración, en la misma retícula: el mismo pie, dos plumas. */}
            <div className="p-prueba">
              <p className="t-rotulo">La diferencia, en el propio informe</p>
              <div className="p-pies">
                <div className="p-pie-caso">
                  <p className="t-fino">Estándar</p>
                  <Pie conMarcaNuvlo />
                </div>
                <div className="p-pie-caso">
                  <p className="t-fino">Marca Blanca</p>
                  <Pie conMarcaNuvlo={false} />
                </div>
              </div>
            </div>

            <div className="p-cobro">
              <p className="t-rotulo">Cómo se cobra</p>
              <p className="t-chico">
                Lo procesa Paddle como vendedor registrado, así que el cargo
                figura a nombre de Paddle en tu resumen. Precios en dólares.
              </p>
              <p className="t-chico">
                No hay reembolsos: la prueba gratuita es la garantía. Cancelás
                cuando quieras y mantenés el acceso hasta que termine el período
                que ya pagaste.
              </p>
              <PanelLink className="d-boton p-cta">Empezar gratis</PanelLink>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
