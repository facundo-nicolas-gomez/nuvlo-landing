"use client";

import { useEffect, useRef } from "react";

/**
 * EL SEGUNDO MECANISMO DE MOVIMIENTO: UN CICLO QUE CORRE SOLO.
 *
 * ── POR QUÉ EXISTE OTRO ADEMÁS DE `useProgreso` ────────────────────────────
 * `useProgreso` reparte una posición: escribe `--p` desde el scroll y todo el
 * efecto vive en CSS consumiendo esa variable. Sirve donde el scroll SIGNIFICA
 * algo —el índice del recorrido es, literalmente, un lector de la posición del
 * scroll— y por eso quedó una sola sección atada a él (`movimiento.css`).
 *
 * Acá el eje no es el dedo: es el TIEMPO del producto. Lo que la sección muestra
 * son los estados reales por los que pasa un reporte mientras se genera, y esos
 * estados se suceden solos, duren lo que duren, mire quien mire. Atarlos al
 * scroll diría que el reporte se arma más rápido si bajás más rápido, que es
 * exactamente lo contrario de lo que la sección afirma.
 *
 * Y no alcanza con `Observado`: eso dispara UNA entrada y termina. Esto es un
 * bucle, con ramas distintas según el ciclo, y con una pausa real cuando la
 * sección no está a la vista.
 *
 * ── LO QUE NO HACE, Y ES LA MITAD DEL DISEÑO ───────────────────────────────
 * No tiene `useState`. El componente escribe atributos y texto sobre el DOM
 * dentro de `alAvanzar` y el CSS resuelve el resto, igual que `Observado` y
 * `useProgreso`. Un `setState` por cuadro serían ~60 renders por segundo de un
 * árbol con cuarenta nodos para cambiar un atributo.
 *
 * ── FUERA DE PANTALLA NO CORRE NINGÚN `rAF` ────────────────────────────────
 * El `IntersectionObserver` no atenúa ni saltea cuadros: cancela el
 * `requestAnimationFrame` y guarda cuánto llevaba el ciclo. Al volver, retoma
 * desde ahí. Una página con una animación en bucle corriendo tres pantallas más
 * abajo es tiempo de CPU que nadie ve, y en un portátil se nota en la batería.
 *
 * El estado se puede auditar desde afuera: el nodo lleva
 * `data-ciclo="corriendo" | "pausado"`.
 *
 * ── `prefers-reduced-motion` APAGA, NO ACORTA ──────────────────────────────
 * Y no hace falta ninguna regla que «restaure» nada: el servidor ya emite el
 * estado FINAL del ciclo —el reporte armado, la prosa escrita, la chapa
 * «Borrador»—, así que quien pide menos movimiento recibe la versión completa y
 * quieta, que es la correcta y no una degradada. Lo mismo si el navegador no
 * trae `IntersectionObserver`. Es la misma decisión que toma `Observado`, y la
 * misma razón por la que el neutro de `--p` es 1 y no 0.
 *
 * ── LA DURACIÓN PUEDE CAMBIAR POR CICLO ────────────────────────────────────
 * Se declara como número o como función del número de ciclo, porque las dos
 * ramas que muestra la sección no duran lo mismo y no tienen por qué: cuando la
 * IA no responde el reporte se termina antes —no hay prosa que escribir— y
 * estirar esa rama con relleno para que empate con la otra sería inventar una
 * espera que el producto no tiene.
 */

export function useCiclo<T extends HTMLElement>({
  duracion,
  alAvanzar,
}: {
  /** Milisegundos del ciclo completo. Fija, o decidida por el número de ciclo. */
  duracion: number | ((ciclo: number) => number);
  /**
   * Se llama una vez por cuadro con los milisegundos transcurridos DENTRO del
   * ciclo actual, el número de ciclo desde que arrancó, y el nodo raíz. Todo lo
   * que la sección dibuja sale de esos tres valores: es una función pura del
   * tiempo, así que frenar a la mitad deja el estado a la mitad y no hay una
   * máquina de estados que pueda desincronizarse.
   */
  alAvanzar: (t: number, ciclo: number, raiz: T) => void;
}) {
  const nodo = useRef<T>(null);

  /* Los dos llegan nuevos en cada render y el efecto no puede depender de
     ellos: reengancharía el observador y reiniciaría el ciclo en cada render
     del padre. Se guardan en refs y el bucle lee siempre la última.

     La copia va en un efecto sin lista de dependencias —o sea después de cada
     render— y no en el cuerpo del componente: escribir un ref durante el render
     rompe el modelo concurrente de React, donde un render puede descartarse. El
     valor inicial ya viene del `useRef`, así que en el primer cuadro la
     referencia es la correcta igual. */
  const avanzar = useRef(alAvanzar);
  const duran = useRef(duracion);

  useEffect(() => {
    avanzar.current = alAvanzar;
    duran.current = duracion;
  });

  useEffect(() => {
    const el = nodo.current;
    if (!el) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const dura = (ciclo: number) =>
      typeof duran.current === "function" ? duran.current(ciclo) : duran.current;

    let pedido = 0;
    let ciclo = 0;
    /* El instante en que arrancó el ciclo ACTUAL, no el bucle entero: se
       re-ancla en cada vuelta para que ciclos de distinta duración no obliguen
       a llevar un acumulado global. */
    let ancla = 0;
    let llevaba = 0;

    const cuadro = (ahora: number) => {
      let t = ahora - ancla;
      let d = dura(ciclo);

      /* `while` y no `if`: si la pestaña estuvo en segundo plano el navegador
         no entrega cuadros y al volver puede haber pasado más de un ciclo
         entero. Con un `if` el tiempo sobrante se arrastraría a la vuelta
         siguiente y el ciclo quedaría corrido para siempre. */
      while (t >= d) {
        t -= d;
        ciclo += 1;
        d = dura(ciclo);
        ancla = ahora - t;
      }

      avanzar.current(t, ciclo, el);
      pedido = requestAnimationFrame(cuadro);
    };

    const arrancar = () => {
      if (pedido) return;
      ancla = performance.now() - llevaba;
      el.dataset.ciclo = "corriendo";
      pedido = requestAnimationFrame(cuadro);
    };

    const frenar = () => {
      if (!pedido) return;
      cancelAnimationFrame(pedido);
      pedido = 0;
      llevaba = performance.now() - ancla;
      el.dataset.ciclo = "pausado";
    };

    /* EL REBOBINADO. El servidor emitió el estado final; acá se lleva al
       principio, una sola vez y antes de observar nada. Si la sección está
       abajo del pliegue se queda así —el grafo esperando a que lo miren—, que
       es el estado correcto para algo que todavía no arrancó. */
    el.dataset.ciclo = "pausado";
    avanzar.current(0, 0, el);

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) arrancar();
          else frenar();
        }
      },
      /* Sin `rootMargin`: acá no se busca adelantar la entrada como en
         `Observado` sino no gastar cuadros fuera de pantalla, y el borde del
         viewport es exactamente donde eso empieza a importar. */
      { threshold: 0 },
    );

    observador.observe(el);

    return () => {
      observador.disconnect();
      if (pedido) cancelAnimationFrame(pedido);
      delete el.dataset.ciclo;
    };
  }, []);

  return nodo;
}
