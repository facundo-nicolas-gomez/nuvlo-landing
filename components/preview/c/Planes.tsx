import PanelLink from "@/components/landing/PanelLink";
import {
  PRECIO_ESTANDAR_LABEL,
  PRECIO_WHITE_LABEL_LABEL,
} from "@/lib/precios";
import { AGENCIA_MUESTRA, CLIENTE_MUESTRA } from "@/lib/reporte-muestra";

/**
 * PLANES.
 *
 * ── NO SON DOS TARJETAS IGUALES ─────────────────────────────────────────────
 * Es una sola superficie partida por un filete, con los dos lados de ancho
 * distinto y sólo uno levantado. Dos cajas gemelas lado a lado son el gesto que
 * hace que una página se lea como plantilla, y acá encima serían mentira: los
 * planes no son equivalentes, uno es el otro sin una línea.
 *
 * ── LA DIFERENCIA SE MUESTRA, NO SE DESCRIBE ────────────────────────────────
 * Entre los dos hay exactamente una diferencia visible para el cliente final:
 * la línea "Generado con Nuvlo" al pie del informe. Cada plan lleva ese pie a
 * tamaño real, uno con la franja y otro sin ella. Es el tercer encuadre del
 * mismo documento que la página viene mostrando, y el único donde se lo mira de
 * cerca.
 *
 * ── EL PRECIO NUNCA VA SIN SU UNIDAD NI SIN SU MONEDA ───────────────────────
 * "USD 39 por cliente, al mes". Un `$` pelado se lee como abono fijo y, con el
 * alcance LatAm de PRODUCT.md, es incorrecto por uno o dos órdenes de magnitud.
 * Las etiquetas se importan de `lib/precios.ts`, que es la única fuente y la que
 * un CI del repo hermano compara por nombre de constante.
 */
const PLANES = [
  {
    id: "estandar",
    nombre: "Estándar",
    precio: PRECIO_ESTANDAR_LABEL,
    texto:
      "El informe completo, con la marca de tu agencia arriba y su firma al pie.",
    conFranja: true,
  },
  {
    id: "marca-blanca",
    nombre: "Marca Blanca",
    precio: PRECIO_WHITE_LABEL_LABEL,
    texto:
      "El mismo informe, sin ninguna mención a Nuvlo, y por tu propio host de reportes.",
    conFranja: false,
  },
];

export default function Planes() {
  return (
    <section className="c-sec c-planes" id="planes" data-seccion="planes">
      <div className="c-marco">
        <h2 className="c-titulo-sec c-planes-titulo c-revela">
          Dos planes. La diferencia está impresa al pie.
        </h2>

        <div className="c-tabla-planes c-revela">
          {PLANES.map((plan) => (
            <div className={`c-plan c-plan-${plan.id}`} key={plan.id}>
              <h3 className="c-plan-nombre">{plan.nombre}</h3>
              <p className="c-plan-precio">
                <span className="c-plan-cifra cifra">{plan.precio}</span>
                <span className="c-plan-unidad">por cliente, al mes</span>
              </p>
              <p className="c-plan-texto">{plan.texto}</p>

              {/* El macro: el pie del informe tal como le llega al cliente. */}
              <div className="c-macro">
                <span className="c-macro-rotulo">Al pie del informe</span>
                <div className="c-macro-hoja">
                  <p className="c-macro-firma">
                    Preparado por <strong>{AGENCIA_MUESTRA}</strong> para{" "}
                    {CLIENTE_MUESTRA}.
                  </p>
                  {plan.conFranja ? (
                    <p className="c-macro-franja">Generado con Nuvlo</p>
                  ) : (
                    <p className="c-macro-vacio" aria-hidden="true" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="c-planes-pie">
          <PanelLink className="c-boton">Empezar gratis</PanelLink>
          <p className="c-planes-nota">
            3 reportes completos, sin tarjeta. Se cobra por cliente atendido, que
            es la misma unidad que vos le facturás. Sin tope de cuentas
            publicitarias por cliente.
          </p>
        </div>
      </div>
    </section>
  );
}
