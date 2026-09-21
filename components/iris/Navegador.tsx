import type { ReactNode } from "react";
import {
  RUTA_BORRADOR_MUESTRA,
  RUTA_REPORTE_MUESTRA,
} from "@/lib/reporte-muestra";

/**
 * EL MARCO DE NAVEGADOR.
 *
 * Las dos URLs son verdaderas, y son dos pantallas distintas.
 *
 * Antes de aprobar, el informe todavía no tiene página pública: lo que se abre
 * es la vista previa del panel, `/reportes/{id}/preview`, que existe de verdad
 * y que `preview-report-button.tsx` describe como «no genera ningún enlace
 * público». Después de aprobar es la página del cliente: en el plan Estándar
 * —el de la prueba gratuita, donde el visitante va a estar— el cliente final
 * abre el informe en `panel.nuvloapp.com/r/{token}` (`report-public-url.ts`).
 * El host propio `r.nuvloapp.com` es de Marca Blanca y se nombra en Precios,
 * que es donde corresponde. La ruta va cortada y en tinta terciaria porque es
 * un dato que no se lee. Al aprobar, el campo se resalta un momento en
 * `iris-luz`: el cambio de dirección es la prueba del producto y contarlo
 * sólo con un cambio de tinta a 12,5px lo volvía imperceptible (crítica del
 * 08/09/2026).
 *
 * Las tres luces son la convención de macOS, pedida por el dueño el
 * 04/09/2026; sus colores están sancionados en `.impeccable/config.json` y
 * nunca entran a la zona de datos.
 */

function Candado() {
  return (
    <svg
      width="11"
      height="12"
      viewBox="0 0 11 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.6 5V3.4a2.9 2.9 0 0 1 5.8 0V5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <rect
        x="0.9"
        y="5"
        width="9.2"
        height="6.4"
        rx="1.6"
        fill="currentColor"
        opacity="0.16"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}

export function Navegador({
  children,
  aprobado = false,
}: {
  children: ReactNode;
  aprobado?: boolean;
}) {
  return (
    <div className="i-ventana">
      <div className="i-navegador" aria-hidden="true">
        <div className="i-luces">
          <span />
          <span />
          <span />
        </div>
        <div
          className="i-direccion"
          data-estado={aprobado ? "publico" : "previa"}
        >
          <Candado />
          {/* El subdominio se apaga cuando el campo se angosta: lo que la
              escena necesita que se lea es la RUTA, que es lo que cambia. Todo
              este cromo es `aria-hidden`, así que apagarlo no le saca nada a
              nadie. Ver `.i-direccion-sub` en `secciones.css`. */}
          <span className="i-direccion-host">
            <span className="i-direccion-sub">panel.</span>nuvloapp.com
          </span>
          <span className="i-direccion-token">
            {aprobado ? RUTA_REPORTE_MUESTRA : RUTA_BORRADOR_MUESTRA}
          </span>
        </div>
        <span className="i-navegador-espacio" />
      </div>
      {/* El papel, adentro del cromo. El marco es la bandeja del navegador —en
          la tinta rebajada, como su propia barra— y el documento es una hoja
          blanca apoyada adentro, con su filete y 4px de aire a cada lado. Son
          dos superficies que se leen como UN objeto: es lo que le da interior a
          la ventana, y lo que iris no tenía cuando el marco y el documento eran
          los dos blancos (09/09/2026, traído de `preview/firma`). */}
      <div className="i-ventana-papel">{children}</div>
    </div>
  );
}
