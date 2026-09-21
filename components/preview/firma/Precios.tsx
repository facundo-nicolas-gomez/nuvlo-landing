import {
  PRECIO_ESTANDAR_LABEL,
  PRECIO_WHITE_LABEL_LABEL,
} from "@/lib/precios";
import {
  PIE_INFORME_ESTANDAR,
  PIE_INFORME_MARCA_BLANCA,
} from "@/lib/reporte-muestra";
import { Entra, Fila } from "./Entra";
import { Boton } from "./Piezas";

/**
 * PRECIOS.
 *
 * ── EL PRECIO NUNCA APARECE SIN SU MONEDA NI SIN SU UNIDAD ──────────────────
 * «$39/mes» a secas se lee como abono fijo y es un precio distinto del que se
 * cobra; y un `$` pelado, con alcance LatAm declarado, es incorrecto por uno o
 * dos órdenes de magnitud. Se escribe siempre «USD 39 por cliente, al mes», con
 * la etiqueta importada de `lib/precios.ts`, que es la única forma que ese
 * archivo exporta y que un job de CI del panel compara contra `plans.ts`.
 *
 * ── UNA SUPERFICIE PARTIDA, NO DOS TARJETAS HERMANAS ────────────────────────
 * Los planes son UN objeto dividido por la retícula. Dos tarjetas gemelas en
 * fila convierten una decisión en una comparación de cajas.
 *
 * ── LA DIFERENCIA SE TOCA ───────────────────────────────────────────────────
 * El único cambio visible entre planes es el pie del informe, así que el pie del
 * informe es lo que se muestra — y **el hover lo enciende**: pasar por un plan
 * ilumina su pie y atenúa el del otro, así la comparación la hace el visitante
 * con el mouse en vez de leerla en un párrafo.
 *
 * Los dos textos salen de `lib/reporte-muestra.ts`, que los copia de
 * `nuvlo-panel/src/lib/report-footer.ts`. Es **una línea con punto medio**, no
 * dos líneas apiladas como los dibujaba la landing: `ESTANDAR` devuelve
 * `${agencia} · Generado con Nuvlo` y `WHITE_LABEL` sólo `${agencia}`.
 *
 * La otra diferencia real por plan es el dominio del enlace público
 * (`report-public-url.ts`), que no se ve en el pie y por eso se dice con
 * palabras.
 *
 * ── LA ACCIÓN, CENTRADA Y SOLA ──────────────────────────────────────────────
 * En una página de conversión el botón de precios no comparte fila con nada.
 */

const PLANES = [
  {
    rotulo: "Estándar",
    precio: PRECIO_ESTANDAR_LABEL,
    nota: "El informe cierra con una franja que dice «Generado con Nuvlo».",
    pie: PIE_INFORME_ESTANDAR,
  },
  {
    rotulo: "Marca Blanca",
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
    <section className="f-seccion f-p-seccion" id="precios">
      <div className="f-marco f-marco-medio">
        <Entra className="f-cabeza">
          <h2 className="f-display">
            Se paga por <span className="f-marca-frase">cliente atendido</span>.
          </h2>
          <p className="f-bajada f-cabeza-bajada">
            La misma unidad que usás para facturarle a él. Empezás con 3
            reportes gratis y sin tarjeta.
          </p>
        </Entra>

        <Entra className="f-superficie f-p-superficie">
          {PLANES.map((p, i) => (
            <Fila key={p.rotulo} orden={i} className="f-p-plan">
              <p className="f-rotulo">{p.rotulo}</p>
              <p className="f-p-cifra f-cifra">{p.precio}</p>
              <p className="f-chico f-p-unidad">por cliente, al mes</p>
              <p className="f-cuerpo f-p-nota">{p.nota}</p>

              {/* El pie del informe, citado. Va en `--crema` y con el filete
                  fino: es un fragmento del documento adentro de otra pieza, no
                  un objeto propio. Los dos miden lo mismo aunque uno diga
                  menos: si el más corto midiera menos, parecería que le falta
                  algo, y lo que le falta es justamente el punto. */}
              <div className="f-p-macro">
                <p className="f-fino f-p-macro-pie">{p.pie}</p>
              </div>
            </Fila>
          ))}

          <Fila orden={2} className="f-p-comun">
            <ul className="f-p-lista">
              {INCLUIDO.map((i) => (
                <li key={i} className="f-chico">
                  {i}
                </li>
              ))}
            </ul>
            <div className="f-p-accion">
              <Boton>Empezar gratis</Boton>
              <p className="f-fino f-p-pie">
                Cobra Paddle como Merchant of Record, así que el cargo figura a
                nombre de Paddle en tu resumen y Nuvlo no toca datos de tarjeta.
                Se cancela cuando quieras, con acceso hasta el fin del período
                pago. No hay reembolsos: la prueba gratuita es la garantía.
              </p>
            </div>
          </Fila>
        </Entra>
      </div>
    </section>
  );
}
