"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

/**
 * REVELADO PROGRESIVO.
 *
 * ── EL ESTADO POR DEFECTO ES VISIBLE ────────────────────────────────────────
 * El servidor emite el nodo pelado. `data-entra="oculto"` lo escribe este
 * efecto después de montar, y sólo si el visitante no pidió movimiento
 * reducido; las reglas que ocultan cuelgan de ese atributo (`base.css`). Sin
 * JavaScript no hay atributo, no hay regla y la página se ve entera por
 * construcción.
 *
 * ── UN OBSERVADOR POR BLOQUE ────────────────────────────────────────────────
 * Lo que se revela es la sección o el objeto, no cada fila: un observador por
 * fila ya falló en esta rama, porque las filas recortadas por un
 * `overflow: hidden` nunca intersectan y quedaban invisibles para siempre.
 *
 * ── EN BUCLE: SE REVELA CADA VEZ QUE ENTRA (12/09/2026) ─────────────────────
 * Antes el observador se desconectaba al primer cruce y el bloque quedaba
 * visto para siempre. Pedido del dueño: que las animaciones se repitan. Un
 * revelado no puede repetirse «constantemente» —lo que dispara la animación es
 * entrar al viewport—, así que lo que se repite es el ciclo: al salir el
 * bloque vuelve a `oculto` y al volver a entrar se revela otra vez. Bajar y
 * subir la página anima siempre, que es lo que se ve como bucle.
 *
 * ── Y ES UN SOLO OBSERVADOR (17/09/2026) ────────────────────────────────────
 * Fueron dos —uno para mostrar, con el borde recortado 24 % abajo, y otro para
 * ocultar, con el viewport agrandado 15 %— y se pisaban. Medido en Control: al
 * bajar rápido, los dos disparan en el mismo lote, el de ocultar llega último y
 * el bloque queda en `oculto` **con la sección a la vista**; como su estado de
 * intersección ya no cambia, no vuelve a dispararse nada y se queda invisible
 * hasta que algo lo repinta. El dueño lo vio al apretar «Aprobar y enviar»: la
 * sección entera aparecía de golpe, y parecía un parpadeo del gesto.
 *
 * Ahora decide uno solo, con la geometría en la mano: muestra cuando el bloque
 * entró de verdad al viewport y esconde cuando está bien afuera. Son los mismos
 * dos umbrales de antes —no se toca cuándo empieza la entrada— pero no pueden
 * contradecirse, porque los evalúa la misma llamada.
 */
/**
 * UN SOLO VIGÍA PARA TODA LA PÁGINA.
 *
 * El observador de intersección sólo avisa cuando se cruza un umbral, y en una
 * bajada rápida los cruces se juntan en un lote y el bloque puede quedar en el
 * estado equivocado (ver arriba). La red de seguridad es un único listener de
 * scroll, compartido por todos los bloques y limitado a un cuadro por vez, que
 * vuelve a preguntar por la geometría. Uno por bloque sería veinte listeners
 * leyendo el layout en el mismo cuadro.
 */
const bloques = new Set<() => void>();
let reloj: ReturnType<typeof setTimeout> | null = null;

/* El repaso corre por temporizador y no por `requestAnimationFrame`: el cuadro
   se posterga cuando la pestaña no está en primer plano —o cuando el navegador
   lo está corriendo un ensayo automatizado— y el bloque se quedaba en el estado
   viejo hasta el próximo cruce de umbral. 80ms es imperceptible al leer y sigue
   siendo una lectura de layout por vez para toda la página. */
function repasar() {
  if (reloj) return;
  reloj = setTimeout(() => {
    reloj = null;
    for (const decidir of bloques) decidir();
  }, 80);
}

function registrar(decidir: () => void) {
  if (bloques.size === 0) {
    window.addEventListener("scroll", repasar, { passive: true });
    window.addEventListener("resize", repasar, { passive: true });
  }
  bloques.add(decidir);
  return () => {
    bloques.delete(decidir);
    if (bloques.size === 0) {
      window.removeEventListener("scroll", repasar);
      window.removeEventListener("resize", repasar);
    }
  };
}

export function Entra({
  children,
  className,
  demora = 0,
  como = "div",
  umbral = 0.76,
  ...resto
}: {
  children: ReactNode;
  className?: string;
  demora?: number;
  como?: "div" | "section" | "li";
  /* Fracción de la pantalla que el borde de arriba tiene que cruzar para
     revelarse. El 0,76 de siempre sirve a un bloque que ES lo que se mira; uno
     que vive al pie de su sección puede quedar por debajo con la sección
     entera a la vista, y ahí deja un hueco (medido en #permiso a 390,
     25/09/2026). Ése pide uno más bajo. */
  umbral?: number;
} & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    // Con movimiento reducido también se revela, pero sólo con opacidad: sin
    // desplazamiento ni desenfoque (`base.css`). Reducido no es sin respuesta,
    // es sin movimiento (13/09/2026, pasada de movimiento).
    nodo.dataset.entra = "oculto";

    // Los dos umbrales, en fracción de viewport: entra cuando su borde de
    // arriba pasó el `umbral` —el 76 % de la pantalla salvo que el bloque pida
    // otro, o sea cuando ya está donde se mira— y se esconde recién cuando
    // quedó 15 % afuera por arriba o por abajo. En el medio no se toca, que es
    // lo que evita el parpadeo.
    const decidir = () => {
      const r = nodo.getBoundingClientRect();
      const alto = window.innerHeight;
      if (r.top < alto * umbral && r.bottom > 0) {
        nodo.dataset.entra = "visto";
        return;
      }
      if (r.bottom < alto * -0.15 || r.top > alto * 1.15) {
        nodo.dataset.entra = "oculto";
      }
    };

    const soltar = registrar(decidir);
    decidir();
    return soltar;
  }, [umbral]);

  const estilo = { "--demora": `${demora}ms` } as CSSProperties;

  // Dos ramas y no un `createElement` con etiqueta variable: la regla
  // `react-hooks/refs` no puede ver que ahí el ref sólo se pasa, no se lee.
  if (como === "li") {
    return (
      <li ref={ref} className={className} style={estilo} {...resto}>
        {children}
      </li>
    );
  }
  if (como === "section") {
    return (
      <section ref={ref} className={className} style={estilo} {...resto}>
        {children}
      </section>
    );
  }
  return (
    <div ref={ref} className={className} style={estilo} {...resto}>
      {children}
    </div>
  );
}
