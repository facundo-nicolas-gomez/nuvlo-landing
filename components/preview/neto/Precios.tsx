import {
  PRECIO_ESTANDAR_LABEL,
  PRECIO_WHITE_LABEL_LABEL,
} from "@/lib/precios";
import {
  PIE_INFORME_ESTANDAR,
  PIE_INFORME_MARCA_BLANCA,
} from "@/lib/reporte-muestra";
import { Entra } from "./Entra";
import { Boton } from "./Piezas";

/**
 * PRECIOS.
 *
 * ── NUNCA SIN MONEDA NI SIN UNIDAD ──────────────────────────────────────────
 * «USD 39 por cliente, al mes», con la etiqueta importada de `lib/precios.ts`.
 * Un `$` pelado es incorrecto por uno o dos órdenes de magnitud con alcance
 * LatAm, y «/mes» a secas se lee como abono fijo, que es otro precio.
 *
 * ── UNA SUPERFICIE PARTIDA, NO DOS TARJETAS ─────────────────────────────────
 * Los planes son un objeto dividido por un filete; dos cajas hermanas
 * convierten una decisión en una comparación de cajas.
 *
 * ── LA DIFERENCIA SE CITA ───────────────────────────────────────────────────
 * Lo único visible que cambia entre planes es el pie del informe, así que se
 * muestra el pie del informe, con el string exacto de `report-footer.ts`.
 */

const PLANES = [
  {
    nombre: "Estándar",
    precio: PRECIO_ESTANDAR_LABEL,
    nota: "El informe cierra con una línea que dice «Generado con Nuvlo».",
    pie: PIE_INFORME_ESTANDAR,
  },
  {
    nombre: "Marca Blanca",
    precio: PRECIO_WHITE_LABEL_LABEL,
    nota: "El informe sale sólo con tu marca, y por tu propio host de reportes.",
    pie: PIE_INFORME_MARCA_BLANCA,
  },
];

const INCLUIDO = [
  "Clientes sin tope",
  "Cuentas publicitarias sin tope",
  "Manuales y programados",
  "Página pública y PDF",
];

export function Precios() {
  return (
    <section className="n-seccion" id="precios">
      <div className="n-marco">
        <Entra>
          <h2 className="n-display">Se paga por cliente atendido.</h2>
          <p className="n-bajada n-cabeza-bajada">
            La misma unidad con la que le facturás a él. Empezás con 3 reportes
            gratis, sin tarjeta.
          </p>
        </Entra>

        <Entra demora={120} className="n-planes">
          <div className="n-planes-par">
            {PLANES.map((p) => (
              <div key={p.nombre} className="n-plan">
                <h3 className="n-titulo n-plan-nombre">{p.nombre}</h3>
                <p className="n-precio n-cifra">{p.precio}</p>
                <p className="n-chico n-precio-unidad">por cliente, al mes</p>
                <p className="n-cuerpo n-plan-nota">{p.nota}</p>
                <p className="n-fino n-plan-cita">{p.pie}</p>
              </div>
            ))}
          </div>

          <div className="n-planes-comun">
            <ul className="n-incluido">
              {INCLUIDO.map((i) => (
                <li key={i} className="n-chico">
                  {i}
                </li>
              ))}
            </ul>
            <Boton>Empezar gratis</Boton>
          </div>
        </Entra>

        <Entra demora={200}>
          <p className="n-fino n-precios-nota">
            Cobra Paddle como Merchant of Record: el cargo figura a nombre de
            Paddle en tu resumen y Nuvlo no toca datos de tarjeta. Se cancela
            cuando quieras, con acceso hasta el fin del período pago. No hay
            reembolsos: la prueba gratuita es la garantía.
          </p>
        </Entra>
      </div>
    </section>
  );
}
