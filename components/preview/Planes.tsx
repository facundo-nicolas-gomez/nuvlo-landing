import PanelLink from "@/components/landing/PanelLink";
import {
  PRECIO_ESTANDAR_LABEL,
  PRECIO_WHITE_LABEL_LABEL,
} from "@/lib/precios";
import { AGENCIA_MUESTRA, CLIENTE_MUESTRA } from "@/lib/reporte-muestra";

/**
 * PLANES.
 *
 * ── LA DIFERENCIA SE MUESTRA, NO SE DESCRIBE ────────────────────────────────
 * Entre los dos planes hay exactamente una diferencia visible para el cliente
 * final: la línea "Generado con Nuvlo" al pie del informe. Describirla en una
 * tabla de features sería contar con palabras algo que se puede mostrar en
 * tamaño real, así que cada plan lleva el PIE del documento tal como le llega
 * al cliente, uno con la franja y otro sin ella.
 *
 * Es un macro del mismo objeto que la página viene mostrando entero: tercer
 * encuadre del documento, y el único donde se lo mira de cerca.
 *
 * ── EL PRECIO NUNCA VA SIN SU UNIDAD NI SIN SU MONEDA ───────────────────────
 * "USD 39 por cliente, al mes". Un `$` pelado se lee como abono fijo y, con el
 * alcance LatAm declarado en PRODUCT.md, es incorrecto por uno o dos órdenes de
 * magnitud. Las etiquetas se importan de `lib/precios.ts`, que es la única
 * fuente y la que un CI del repo hermano compara por nombre de constante.
 */
const PLANES = [
  {
    id: "estandar",
    nombre: "Estándar",
    precio: PRECIO_ESTANDAR_LABEL,
    texto: "El informe completo, con la marca de tu agencia arriba y su firma al pie.",
    conFranja: true,
  },
  {
    id: "marca-blanca",
    nombre: "Marca Blanca",
    precio: PRECIO_WHITE_LABEL_LABEL,
    texto: "El mismo informe, sin ninguna mención a Nuvlo, y por tu propio host de reportes.",
    conFranja: false,
  },
];

export default function Planes() {
  return (
    <section className="planes" id="planes" data-seccion="planes">
      <div className="contenedor">
        <div className="planes-cabeza entra">
          <h2 className="titular">Dos planes. La diferencia está impresa al pie.</h2>
        </div>

        <div className="planes-hoja">
          {PLANES.map((plan) => (
            <div className="plan" key={plan.id}>
              <h3 className="plan-nombre">{plan.nombre}</h3>
              <p className="plan-precio">
                <span className="plan-cifra cifra">{plan.precio}</span>
                <span className="plan-unidad">por cliente, al mes</span>
              </p>
              <p className="plan-texto">{plan.texto}</p>

              {/* El macro: el pie del informe, a tamaño real, como le llega al
                  cliente final. Es la diferencia entre los planes, literal. */}
              <div className="macro">
                <span className="macro-rotulo">Al pie del informe</span>
                <div className="macro-hoja">
                  <p className="macro-firma">
                    Preparado por <strong>{AGENCIA_MUESTRA}</strong> para{" "}
                    {CLIENTE_MUESTRA}.
                  </p>
                  {plan.conFranja ? (
                    <p className="macro-franja">Generado con Nuvlo</p>
                  ) : (
                    <p className="macro-vacio" aria-hidden="true" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="planes-pie">
          <PanelLink className="barra">Empezar gratis</PanelLink>
          <p className="planes-nota">
            3 reportes completos, sin tarjeta. Se cobra por cliente atendido, que
            es la misma unidad que vos le facturás. Sin tope de cuentas
            publicitarias por cliente.
          </p>
        </div>
      </div>
    </section>
  );
}
