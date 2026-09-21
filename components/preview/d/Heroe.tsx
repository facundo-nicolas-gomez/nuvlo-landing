import PanelLink from "@/components/landing/PanelLink";
import FragmentoHeroe from "./reporte/FragmentoHeroe";
import { Revelar } from "./Revelar";

/**
 * EL HÉROE.
 *
 * El titular es el elemento principal y va solo: no lleva copete arriba
 * anunciándolo. La bajada es corta, el CTA es la única acción, y el dato de la
 * prueba gratuita —3 reportes, sin tarjeta, que es `FREE_REPORTS = 3` en el
 * panel— va al lado del botón y no como pastilla flotando sobre el título.
 *
 * Debajo, sin sección intermedia, entra el reporte en fragmento: la prueba
 * llega antes que cualquier promesa. El fragmento se corta contra el borde
 * inferior, porque un documento que sigue es un documento que existe.
 */
export default function Heroe() {
  return (
    <section className="h-seccion">
      <div className="d-marco">
        <div className="h-texto">
          <h1 className="t-portada h-titular">
            El reporte mensual de tu cliente, hecho. Sale cuando vos decís.
          </h1>
          <p className="t-bajada h-bajada">
            Nuvlo conecta la cuenta de Meta Ads, calcula las métricas y redacta
            el análisis. Queda en borrador hasta que lo aprobás, y sale con tu
            marca.
          </p>
          <div className="h-acciones">
            <PanelLink className="d-boton">Empezar gratis</PanelLink>
            <p className="t-chico h-nota">
              3 reportes gratis, sin tarjeta.
            </p>
          </div>
        </div>
      </div>

      <div className="d-marco h-escena">
        <Revelar eje="escala">
          <FragmentoHeroe />
        </Revelar>
      </div>
    </section>
  );
}
