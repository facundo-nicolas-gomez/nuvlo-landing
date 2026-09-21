import PanelLink from "@/components/landing/PanelLink";
import { Revelar } from "./Revelar";

/**
 * EL CIERRE. El segundo y último tramo negro de la página.
 *
 * Dos inversiones de valor en toda la página y sólo dos: Control abre el
 * paréntesis, el cierre lo cierra. Una tercera ya sería alternancia, que es
 * ritmo y no significado.
 *
 * El wordmark gigante ancla el final. Su cuerpo sale del ancho del viewport y
 * no de la rampa tipográfica: no es un titular, es una firma —el único lugar de
 * la página donde el nombre propio es más grande que cualquier cosa que se
 * afirme—. Va con `aria-hidden` porque el nombre ya lo dijeron la cabecera y el
 * pie, y un lector de pantalla no gana nada oyéndolo tres veces.
 */
export default function Cierre() {
  return (
    <section className="z-seccion d-invertido">
      <div className="d-marco">
        <Revelar className="z-oferta">
          <h2 className="t-display">
            Hacé el reporte de este mes y fijate.
          </h2>
          <p className="t-bajada medida-bajada">
            Tres reportes gratis, sin tarjeta. Si el primero no es mejor que el
            que armás a mano, cerrás la pestaña y no pasó nada.
          </p>
          <div className="z-acciones">
            <PanelLink className="d-boton z-cta">Empezar gratis</PanelLink>
            <p className="t-chico">
              Se conecta con Meta Ads. Sólo Meta Ads.
            </p>
          </div>
        </Revelar>
      </div>

      <p className="z-wordmark" aria-hidden="true">
        Nuvlo
      </p>
    </section>
  );
}
