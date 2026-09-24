"use client";

import { useEffect, useRef } from "react";
import { Entra } from "./Entra";
import { Boton } from "./Piezas";
import { Charla } from "./Charla";
import { Pie } from "./Pie";

/**
 * EL CIERRE — el remate de la historia y el pie.
 *
 * ── EL TELÓN SIGUE ──────────────────────────────────────────────────────────
 * El mecanismo es el del «Motion Footer» (jahed / easemize) de 21st.dev que
 * el dueño pasó el 07/09/2026: el pie está pegado al fondo de la ventana y
 * la página sube como un telón y lo revela. Lo que va adentro se rehízo el
 * 08/09/2026 a pedido suyo («rehacé el footer»): sin la cinta de frases, con
 * el remate en dos columnas y un pie de columnas de verdad.
 *
 * ── EL REMATE, EN DOS COLUMNAS: LA CHARLA PRIMERO (17/09/2026, modo live) ────
 * A la izquierda y más ancha, la charla (`Charla.tsx`): el cliente leyó el
 * reporte y contesta. A la derecha, alineada abajo, la misma acción del héroe:
 * la pregunta, la bajada y los dos botones. La charla vino de El entregable,
 * donde no era lo que recibe el cliente sino lo que pasa después (dueño,
 * 07/09/2026: «llevala al Cierre como remate de la historia»). Hasta el
 * 17/09/2026 iba a la derecha; el dueño eligió en modo live ponerla primero,
 * entre tres composiciones: la historia termina y recién ahí llega el «fijate»
 * del título, con el botón al final de la lectura, pegado al pie. En el DOM el
 * titular sigue primero —es lo que nombra la sección para el lector de
 * pantalla— y el orden visual lo pone el CSS.
 *
 * ── EL PIE SE FUE A `Pie.tsx` (11/09/2026) ──────────────────────────────────
 * Nació acá adentro y se separó cuando las tres páginas legales dejaron de
 * correr el mundo retirado: o compartían este pie, o el sitio tenía dos que se
 * iban a desincronizar en la primera corrección. El Cierre se queda con lo que
 * es suyo —el telón, el remate y la charla— y el pie es un invitado.
 *
 * Detrás sigue el wordmark gigante apagado, el rasgo de cierre que el dueño
 * aprobó en «firma»: ése sí es del Cierre y no del pie.
 */

/**
 * ── EL TELÓN SE DESCUBRE CUANDO EL FOCO ENTRA AL PIE ────────────────────────
 * El pie es un `sticky` que vive DETRÁS de `main` y se revela cuando `main`
 * termina. Hasta ese momento está en pantalla geométricamente y tapado al 100%
 * por `main`, que se pinta encima.
 *
 * ── LOS DOS ARREGLOS, Y POR QUÉ EL PRIMERO ESTABA MAL ───────────────────────
 * La cuarta crítica (08/09/2026) midió el pie enfocable y tapado: cinco paradas
 * seguidas con el anillo invisible, empezando por «Empezar gratis», que es la
 * única conversión del sitio. WCAG 2.4.11, y el navegador no puede resolverlo
 * desplazando porque el pie ya está donde tiene que estar.
 *
 * Se arregló con `inert` mientras estuviera tapado, y **el arreglo cambió una
 * falla por otra peor**. La quinta crítica lo midió con dos arneses
 * independientes: con el foco en la última parada de `main`
 * (`soporte@nuvloapp.com`) faltan entre 553 y 953px de scroll para que el
 * telón se descubra, y `main` no tiene nada enfocable debajo — así que **Tab no
 * puede producir ese scroll**. A 1440, 1280 y 1024 el foco salía del documento
 * sin ofrecer una sola parada del pie: se perdían las dos acciones del remate,
 * las cuatro columnas y las tres legales, que son texto contractual. `inert`
 * además las sacaba del árbol de accesibilidad. Pasó de 2.4.11 (AA) a 2.1.1
 * (A). A 768 y 390 funcionaba, que es donde se había verificado.
 *
 * La lección, que vale para toda esta rama: **un arreglo que saca algo del
 * orden de tabulación tiene que decir por dónde se llega igual.** No alcanza
 * con que deje de estar mal donde se midió.
 *
 * Hoy el pie NUNCA sale del orden de tabulación, y es el foco el que trae el
 * scroll: cuando `focusin` entra al telón todavía tapado, la página salta al
 * fondo al instante y el elemento que acaba de recibir el foco queda a la
 * vista con su anillo. Cierra 2.1.1 y 2.4.11 a la vez, sin un segundo estado
 * que se pueda desincronizar, y sin JavaScript el pie se navega como cualquier
 * pie.
 */
function useTelonSigueAlFoco(raiz: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const nodo = raiz.current;
    if (!nodo) return;
    const pagina = document.querySelector("main");
    if (!pagina) return;

    // El margen no es una precaución: al fondo de la página el borde de `main`
    // y el techo del pie coinciden con 0,28px de diferencia por el redondeo
    // del layout. A cuchillo, el pie se leería como tapado estando descubierto
    // y cada Tab adentro del remate volvería a saltar al fondo. Medido.
    const MARGEN = 24;

    const alFoco = () => {
      // Se mide en el momento del foco y no contra un estado guardado: el
      // estado llega por scroll y acá el que se mueve es el foco, no el scroll.
      const caja = nodo.getBoundingClientRect();
      if (pagina.getBoundingClientRect().bottom <= caja.top + MARGEN) return;
      // Instantáneo y explícito: el `<html>` lleva `scroll-behavior: smooth` y
      // un anillo que aparece al final de una animación de 900px es un anillo
      // que el que tabula no ve. Acá el movimiento no comunica nada.
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "instant",
      });
    };

    nodo.addEventListener("focusin", alFoco);
    return () => nodo.removeEventListener("focusin", alFoco);
  }, [raiz]);
}

export function Cierre() {
  const telon = useRef<HTMLElement>(null);
  useTelonSigueAlFoco(telon);

  return (
    <footer ref={telon} className="i-noche i-telon" aria-labelledby="i-h-cierre">
      <div className="i-marco i-telon-remate">
        <Entra className="i-telon-texto">
          <h2 id="i-h-cierre" className="i-display i-telon-titulo">
            Que el reporte de este mes sea la prueba.
          </h2>
          <p className="i-bajada i-telon-bajada">
            Tres reportes gratis, sin tarjeta. Si el resultado no está a la
            altura de tu cliente, no se pierde nada.
          </p>
          <div className="i-telon-accion">
            <Boton hoja>Empezar gratis</Boton>
            <a className="i-telon-entrar" href="https://panel.nuvloapp.com">
              Ingresar
            </a>
          </div>
        </Entra>

        {/* La charla, sobre la noche: cómo termina la historia. */}
        <Entra demora={120} className="i-remate-charla">
          <Charla rotulo="Cómo termina · ejemplo ficticio" />
        </Entra>
      </div>

      <Pie />
    </footer>
  );
}
