import PanelLink from "@/components/landing/PanelLink";
import {
  Enviar,
  FilaListado,
  Kpi,
  Modo,
  Recorrido,
} from "./Piezas";

/**
 * 01 · HÉROE. El producto en piezas.
 *
 * ── LO QUE ESTO REEMPLAZA ───────────────────────────────────────────────────
 * La versión anterior era una sola hoja blanca con todo apilado adentro,
 * flotando en el medio con aire a los costados. Acá hay CINCO objetos reales del
 * producto en planos distintos, superpuestos: se ve el producto funcionando, no
 * una captura pegada.
 *
 * Las cinco piezas están elegidas para que juntas cuenten el argumento entero
 * sin una línea de texto: hay un cliente con un informe en Borrador, el
 * recorrido muestra que el cuarto estado no llegó, hay una cifra real, el modo
 * dice "Revisar antes de enviar" y el botón dice a qué dirección sale.
 *
 * ── EL FONDO ────────────────────────────────────────────────────────────────
 * Hoy es luz de CSS más grano. El slot para el render está marcado abajo: es lo
 * único de la dirección que no se puede construir en hoja de estilos.
 */
export default function Heroe() {
  return (
    <section className="p-heroe" id="inicio" data-seccion="heroe">
      {/* TODO: render abstracto oscuro (hojas o planos apilados, brillo
          especular cálido arriba a la izquierda, PNG con transparencia,
          2000x1600 o más) en public/mockups/. Entra como capa entre el
          gradiente y el grano. */}
      <div className="p-marco">
        <div className="p-noche">
          <div className="p-heroe-voz">
            <h1 className="p-titular p-heroe-titular">
              El botón lo apretás vos.
            </h1>
            <p className="p-bajada p-bajada-noche">
              Nuvlo trae las métricas de Meta Ads, calcula y redacta. Después se
              detiene y te espera.
            </p>
            <div className="p-heroe-acciones">
              <PanelLink className="p-btn">Empezar gratis</PanelLink>
              <a className="p-btn p-btn-noche" href="#reparto">
                Ver cómo funciona
              </a>
            </div>
          </div>

          <div className="p-escena">
            <Recorrido className="pe-recorrido" />
            <FilaListado className="pe-fila" />
            <Kpi className="pe-kpi" />
            <Modo className="pe-modo" />
            <Enviar className="pe-enviar" />
          </div>
        </div>
      </div>
    </section>
  );
}
