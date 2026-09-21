"use client";

import { useEffect, useRef } from "react";

/**
 * EL ATAJO A PRECIOS, SÓLO EN TELÉFONO.
 *
 * ── EL PROBLEMA, MEDIDO ─────────────────────────────────────────────────────
 * La página mide 17.308px en teléfono y Precios arranca en el 11.886: catorce
 * pantallas. La barra de arriba no puede ayudar —medido a 390, entre la marca,
 * «Ingresar» y el CTA quedan 40px libres en la fila— y el espacio de arriba
 * tampoco se puede recuperar: los dos botones de la Disposición 954/2025 van
 * «a simple vista en la barra superior» por decisión registrada en
 * `PRODUCT.md`. No hay lugar arriba, y no lo va a haber.
 *
 * ── POR QUÉ ESTO Y NO UN MENÚ NI UN SEGUNDO CTA ─────────────────────────────
 * Las dos salidas obvias ya están decididas, y en contra:
 *
 * - **Menú de teléfono**: existió como `<details>` y se retiró el 14/09/2026,
 *   porque entre 768 y 1023 dejaba la barra sin «Ingresar» (`secciones.css`).
 * - **Un segundo botón**: el dueño eligió ese mismo día que Precios se resuelva
 *   con un enlace de prosa en el héroe —«Ver precios», pegado a la promesa de
 *   la prueba— y escribió el motivo: «no compite con el CTA» (`Heroe.tsx`).
 *
 * Esto **continúa** esa decisión en vez de reemplazarla: es el mismo enlace,
 * que sigue disponible cuando el del héroe ya se fue de la pantalla. No lleva
 * CTA, no abre nada, no tiene estado. Es una sola ancla.
 *
 * ── CUÁNDO SE VE ────────────────────────────────────────────────────────────
 * En la ventana exacta donde el visitante no tiene forma de llegar a Precios:
 * desde que el «Ver precios» del héroe salió de la pantalla hasta que Precios
 * entra. Fuera de esa ventana no aparece —en el héroe sobraría, y de Precios
 * para abajo ya está la sección—, así que nunca convive con lo que repite.
 *
 * Abajo, en la zona del pulgar, que es de donde se llega con una mano; la
 * barra de arriba, a 133px de cromo, ya es lo más lejos del pulgar que hay.
 *
 * ── CÓMO SE MIDE ────────────────────────────────────────────────────────────
 * Por geometría y no por `IntersectionObserver`, porque la condición es de
 * RANGO —entre dos elementos— y no de cruce: un observador daría dos estados
 * sueltos que hay que recomponer, y al salir de Precios por abajo el par
 * «ninguno visible» se repite y el atajo volvería a aparecer sobre Preguntas.
 * Un listener por cuadro, como el de la barra, lee las dos posiciones juntas y
 * no tiene ese agujero.
 */
export function Atajo() {
  const caja = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodo = caja.current;
    if (!nodo) return;

    // Sólo en teléfono: arriba de 767 el atajo está apagado por CSS y el
    // listener no tendría a quién avisarle.
    const movil = window.matchMedia("(max-width: 767px)");

    let pedido = 0;
    const decidir = () => {
      if (!movil.matches) {
        delete nodo.dataset.visible;
        return;
      }
      const heroe = document.querySelector(".i-heroe .i-accion");
      const precios = document.getElementById("precios");
      if (!heroe || !precios) return;

      const alto = window.innerHeight;
      // El del héroe ya se fue por arriba, y Precios todavía no asoma.
      const heroeAfuera = heroe.getBoundingClientRect().bottom < 0;
      const preciosLejos = precios.getBoundingClientRect().top > alto;
      if (heroeAfuera && preciosLejos) nodo.dataset.visible = "";
      else delete nodo.dataset.visible;
    };

    const alCuadro = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        decidir();
      });
    };

    decidir();
    window.addEventListener("scroll", alCuadro, { passive: true });
    window.addEventListener("resize", alCuadro, { passive: true });
    movil.addEventListener("change", decidir);
    return () => {
      window.removeEventListener("scroll", alCuadro);
      window.removeEventListener("resize", alCuadro);
      movil.removeEventListener("change", decidir);
      if (pedido) window.cancelAnimationFrame(pedido);
    };
  }, []);

  return (
    <div ref={caja} className="i-atajo">
      <a className="i-atajo-enlace" href="#precios">
        Ver precios
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M7 2.5v9M3.5 8 7 11.5 10.5 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
