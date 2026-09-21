import PanelLink from "@/components/landing/PanelLink";
import Documento from "./Documento";

/**
 * PORTADA.
 *
 * ── LA COMPOSICIÓN ES LA TESIS ──────────────────────────────────────────────
 * Izquierda el argumento, derecha el documento, y el documento se va del borde.
 * Que salga del encuadre es lo que lo convierte en un objeto apoyado sobre la
 * mesa en vez de una captura centrada y achicada para que entre: se ve a escala
 * donde el texto se lee de verdad, y se entiende que sigue más allá del corte.
 *
 * ── TOPE DE TEXTO ───────────────────────────────────────────────────────────
 * Tres bloques y nada más: titular, bajada y acción. Sin copete arriba —para
 * eso está la marca de registro—, sin franja de confianza y sin la línea chica
 * bajo el botón contando la prueba gratuita. Ese dato es cierto y es bueno,
 * pero es de Planes: acá abajo compite con el único clic que importa.
 *
 * ── QUÉ AFIRMA EL TITULAR, Y POR QUÉ SE PUEDE ───────────────────────────────
 * "Sale con tu firma" vale en los DOS planes: el nombre de la agencia es
 * requisito duro del panel y sin él no se genera ni se envía. Lo que NO se dice
 * acá es que el informe salga sin marca de Nuvlo, porque eso sólo es cierto en
 * Marca Blanca y el visitante va a entrar por la prueba, que es Estándar.
 */
export default function Portada() {
  return (
    <section className="portada" data-seccion="portada">
      <div className="contenedor portada-grilla">
        <div className="portada-texto">
          <span className="marca" aria-hidden="true" />
          <h1 className="portada-titular">
            El informe está listo. Falta que lo apruebes.
          </h1>
          <p className="bajada">
            Nuvlo trae las métricas de Meta Ads, calcula y redacta. Vos lo leés y
            decidís si sale.
          </p>
          <div className="portada-accion">
            <PanelLink className="barra">Empezar gratis</PanelLink>
          </div>
        </div>

        <div className="portada-hoja">
          <Documento />
        </div>
      </div>
    </section>
  );
}
