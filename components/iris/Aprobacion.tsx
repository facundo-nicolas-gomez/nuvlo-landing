"use client";

import { useRef } from "react";
import { useFocoAlReemplazo } from "./foco";
import { EMAIL_CLIENTE_MUESTRA, RECORRIDO_MUESTRA } from "@/lib/reporte-muestra";

/**
 * LA TARJETA DE APROBACIÓN — el disparador del héroe, con su pista.
 *
 * Empieza en «Pendiente de aprobación», con el punto naranja que late y el
 * botón del panel; el visitante lo aprieta y la tarjeta se cierra en «Aprobado
 * por vos · 09:22» mientras la barra de direcciones pasa de la vista previa a
 * la página pública del cliente. El estado vive en `Heroe.tsx`, el padre común
 * de la ventana y de esta tarjeta.
 *
 * ── LA PISTA VIVE CON LA TARJETA (10/09/2026) ───────────────────────────────
 * «Está en borrador. Apretá «Aprobar y enviar» y mirá la barra de direcciones»
 * vivía en la columna de texto del héroe, a 1.000px del botón que nombra y de
 * la barra que manda mirar. El dueño lo dijo así: «el texto del borrador y
 * "Aprobar y enviar" está lejísimos del elemento del que habla». Ahora es el
 * epígrafe de la tarjeta y va donde va ella: la frase, el botón y la barra
 * caen juntos en cualquier ancho. Sigue anunciando su cambio de cara con
 * `aria-live`, porque es consecuencia de algo que el visitante hizo.
 *
 * ── UNA TARJETA, DOS LUGARES ────────────────────────────────────────────────
 * Se monta dos veces —flotando en la escena y adentro de la fila del argumento
 * del héroe— y el CSS muestra una sola por ancho: desde 1230 flota sobre el
 * margen de página vacío que queda a la izquierda del documento, y por debajo
 * va en flujo, a la derecha de la bajada. Anclada al centro sin umbral, la
 * cuenta la mandaba fuera de la página —x = −152 a 1024— con el botón
 * leyéndose «nviar» (novena crítica). Las dos instancias comparten estado
 * porque el estado no es de ellas; la apagada va en `display: none`, así que
 * no hay dos botones con el mismo nombre para quien navega con teclado.
 */

function Tilde() {
  return (
    <svg
      width="11"
      height="9"
      viewBox="0 0 13 11"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1.5 5.8 4.8 9 11.5 1.8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Aprobacion({
  aprobado,
  onAprobar,
  onVolver,
  className,
}: {
  aprobado: boolean;
  onAprobar: () => void;
  onVolver: () => void;
  /** Dónde vive esta instancia: flotando en la escena o en la fila. */
  className: string;
}) {
  // El control que queda en pie después de cada cambio de cara. Sin esto el
  // foco se caía al `<body>` al aprobar: ver `foco.ts`. En la instancia
  // apagada `focus()` no hace nada, así que el foco lo toma la visible.
  const cara = useRef<HTMLButtonElement>(null);
  useFocoAlReemplazo(aprobado, cara);

  const hito = RECORRIDO_MUESTRA[1];

  return (
    <div className={`i-aprobacion-lugar ${className}`}>
      <p className="i-chico i-heroe-pista" aria-live="polite">
        {aprobado ? (
          // Dos renglones, como la cara pendiente (dueño, 13/09/2026). Decía
          // «ya no muestra tu vista previa: muestra la página que abre tu
          // cliente» y con el piso tipográfico nuevo caía en tres, así que la
          // tarjeta cambiaba de alto al aprobar. «Ya muestra» dice lo mismo:
          // lo que cambió en la barra es a qué página apunta.
          <>
            Salió. La barra de direcciones ya muestra la página que abre tu
            cliente.
          </>
        ) : (
          <>
            Está en borrador. Con «Aprobar y enviar», cambia la barra de
            direcciones.
          </>
        )}
      </p>

      {/* Sólo la cara del momento. Apiladas en la misma celda, la tarjeta
          medía siempre lo que la más alta y al aprobar quedaba un hueco
          debajo; ahora el alto se interpola donde el navegador sabe. */}
      <div
        className="i-aprobacion"
        data-cara={aprobado ? "aprobado" : "pendiente"}
      >
        {aprobado ? null : (
          <div className="i-flota-cara" data-cara="pendiente">
            <span className="i-flota-punto" aria-hidden="true" />
            <div>
              <p className="i-flota-titulo">Pendiente de aprobación</p>
              <p className="i-fino i-flota-destino">
                Se envía a{" "}
                <span className="i-cifra">{EMAIL_CLIENTE_MUESTRA}</span>
              </p>
              {/* El mismo botón del panel, chico: acá el gesto es la prueba, y
                  el CTA de la página vive del otro lado del héroe. */}
              <button
                type="button"
                ref={cara}
                className="i-boton i-boton-chico i-flota-boton"
                onClick={onAprobar}
              >
                Aprobar y enviar
              </button>
            </div>
          </div>
        )}
        {aprobado ? (
          <div className="i-flota-cara" data-cara="aprobado">
            <span className="i-flota-tilde" aria-hidden="true">
              <Tilde />
            </span>
            <div>
              <p className="i-flota-titulo">
                {hito.estado}
                <span className="i-fino i-cifra"> · {hito.hora}</span>
              </p>
              <p className="i-fino i-flota-destino">
                Se envió a{" "}
                <span className="i-cifra">{EMAIL_CLIENTE_MUESTRA}</span>
              </p>
              {/* La vuelta: es del ejemplo, no del producto, y por eso lo dice
                  así, con la misma etiqueta que en Control: el mismo gesto se
                  deshacía con dos nombres —«Volver a empezar» acá, «Reiniciar
                  el ejemplo» allá— (décima crítica). En el panel, enviado es
                  enviado. */}
              <button
                type="button"
                ref={cara}
                className="i-enlace i-flota-volver"
                onClick={onVolver}
              >
                Reiniciar el ejemplo
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
