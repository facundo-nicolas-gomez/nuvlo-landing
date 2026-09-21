import PanelLink from "@/components/landing/PanelLink";

/**
 * CIERRE.
 *
 * El único lugar de la página donde centrar es correcto: acá el mensaje ES el
 * diseño y no hay un segundo elemento que la asimetría tenga que balancear.
 *
 * La pregunta es la del oficio, no la del producto: el informe mensual es
 * trabajo obligatorio, repetitivo y no facturable, y el visitante ya sabe
 * cuántas horas le lleva. Nombrar eso cierra mejor que repetir una función.
 */
export default function Cierre() {
  return (
    <section className="cierre" data-seccion="cierre">
      <div className="contenedor cierre-caja">
        <h2 className="cierre-titular">
          ¿Cuántas horas te llevó el último informe que mandaste?
        </h2>
        <p className="cierre-bajada">
          El próximo ya va a estar escrito cuando te sientes a hacerlo.
        </p>
        <PanelLink className="barra">Empezar gratis</PanelLink>
        <p className="cierre-fina">3 reportes, sin tarjeta.</p>
      </div>
    </section>
  );
}
