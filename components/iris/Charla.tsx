"use client";

import { useEffect, useRef } from "react";
import {
  AGENCIA_MUESTRA,
  CHARLA_MUESTRA,
  CLIENTE_MUESTRA,
} from "@/lib/reporte-muestra";

/**
 * LA CHARLA — lo que pasa después de que el reporte llega.
 *
 * ── DE DÓNDE VIENE ──────────────────────────────────────────────────────────
 * Es el «Message» de shadcn que el dueño marcó en 21st.dev: un envoltorio de
 * mensaje de conversación con avatar, alineación según quién habla, cabecera
 * y pie. Acá tiene esa misma anatomía —avatar con iniciales, cabecera con
 * nombre y hora, burbuja, alineado a la derecha el trafficker y a la
 * izquierda su cliente— con las clases `i-` y sin Tailwind.
 *
 * ── DÓNDE VIVE ──────────────────────────────────────────────────────────────
 * En el Cierre, a la derecha del remate, con las burbujas flotando sobre la
 * noche, sin caja: la bandeja que tuvo un rato el dueño la sacó el
 * 08/09/2026. Nació en El entregable y la movió el 07/09/2026 porque ahí no
 * era lo que recibe el cliente sino lo que pasa después.
 *
 * ── ENTRA DE A UNO, Y VUELVE A EMPEZAR ──────────────────────────────────────
 * Al entrar al viewport, los mensajes llegan en secuencia: antes de cada uno,
 * el que va a hablar «está escribiendo» (los tres puntos), y al final aparece
 * «Entregado». Después de una pausa larga la charla se borra y vuelve a pasar,
 * en bucle (dueño, 12/09/2026; antes pasaba una vez y quedaba). El bucle no
 * corre a ciegas: antes de cada pasada comprueba que la charla siga
 * descubierta, así que con el telón tapado no hay nada moviéndose. Los
 * tiempos son cortos y la entrada es un fundido con 6px de subida, sin
 * rebote, para que la charla no le saque peso al botón de al lado; por lo
 * mismo, ninguna burbuja es blanca: sólo el botón lo es.
 *
 * Todo el estado vive en atributos `data-` escritos desde el efecto, sin
 * estado de React: el servidor emite la charla entera a la vista, así que
 * sin JavaScript o con movimiento reducido se lee completa desde el
 * principio, y cada mensaje ocupa su lugar desde el primer render, con lo
 * que la columna no cambia de alto y el botón de la izquierda no se mueve.
 *
 * ── DEMOSTRACIÓN, NO TESTIMONIO ─────────────────────────────────────────────
 * Los tres mensajes son `CHARLA_MUESTRA`, ejemplo ficticio y rotulado. El
 * cliente no elogia ni cuenta resultados: pregunta por la alerta del informe
 * y el trafficker contesta con la primera acción del plan. Lo que muestra es
 * el ritual completo —el reporte llega, el cliente lo lee, la conversación
 * pasa a ser sobre decisiones— sin prometer nada que `PRODUCT.md` no sostenga.
 */

/* Los tiempos, en ms: lo que tarda en «escribir» cada mensaje —crece con el
   largo del texto, con piso y techo— y la pausa entre uno y el siguiente. */
const ESCRIBIENDO_MIN = 700;
const ESCRIBIENDO_MAX = 1400;
const PAUSA = 700;
const ARRANQUE = 400;
/* Lo que queda quieta la charla entera antes de borrarse y volver a empezar.
   Es larga a propósito: la secuencia dura unos 5 segundos y lo que se lee es
   la conversación terminada, no el ir y venir. Con menos, el bucle compite con
   el botón de al lado, que es lo que esta sección tiene que hacer clickear. */
const PAUSA_BUCLE = 5200;
/* El respiro entre borrar y volver a arrancar: sin él, el estado `oculto` y el
   `escribiendo` del primer mensaje caen en el mismo cuadro y la charla no se
   ve desaparecer, se ve saltar. */
const RESPIRO = 500;

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function Charla({
  rotulo = "Después del mail · ejemplo ficticio",
}: {
  rotulo?: string;
}) {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodo = raiz.current;
    if (!nodo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mensajes = Array.from(
      nodo.querySelectorAll<HTMLElement>(".i-mensaje"),
    );
    // Recién ahora se esconde: el servidor la emitió entera a la vista.
    nodo.dataset.charla = "espera";
    mensajes.forEach((m) => (m.dataset.estado = "oculto"));

    // Los relojes se borran del registro al dispararse. Con una sola pasada
    // daba igual acumularlos; con el bucle, una lista que sólo crece es una
    // fuga chica y perpetua en una página que puede quedar abierta.
    const relojes = new Set<number>();
    const luego = (fn: () => void, ms: number) => {
      const reloj = window.setTimeout(() => {
        relojes.delete(reloj);
        fn();
      }, ms);
      relojes.add(reloj);
    };

    const reproducir = () => {
      nodo.dataset.charla = "corre";
      let t = ARRANQUE;
      mensajes.forEach((m, i) => {
        // ── EL PRIMERO YA ESTÁ ESCRITO (18/09/2026) ────────────────────────
        // Escribía también el primero, así que durante ~1,5s la columna era un
        // avatar flotando sobre la noche vacía. Y esto es el remate: **el
        // último píxel que el visitante mira**, medio dibujado justo cuando la
        // página cierra el argumento. Ahora se llega a una conversación que ya
        // empezó —que además es lo que uno ve al abrir un chat— y lo que se
        // anima es la respuesta, que es donde está el sentido.
        if (i === 0) {
          luego(() => (m.dataset.estado = "visible"), t);
          t += PAUSA;
          return;
        }
        const largo = CHARLA_MUESTRA[i]?.texto.length ?? 40;
        const escribiendo = Math.min(
          ESCRIBIENDO_MAX,
          Math.max(ESCRIBIENDO_MIN, largo * 12),
        );
        luego(() => (m.dataset.estado = "escribiendo"), t);
        t += escribiendo;
        luego(() => (m.dataset.estado = "visible"), t);
        t += PAUSA;
      });
      const fin = t - PAUSA + 500;
      luego(() => (nodo.dataset.charla = "fin"), fin);
      // El bucle: borra y vuelve a empezar. Si para entonces la charla dejó de
      // estar descubierta, no reproduce nada y sigue preguntando cada pausa;
      // así el bucle no gasta nada mientras nadie lo mira.
      luego(() => {
        nodo.dataset.charla = "espera";
        mensajes.forEach((m) => (m.dataset.estado = "oculto"));
        luego(() => {
          if (revelada()) reproducir();
          else luego(reintentar, PAUSA_BUCLE);
        }, RESPIRO);
      }, fin + PAUSA_BUCLE);
    };

    const reintentar = () => {
      if (revelada()) reproducir();
      else luego(reintentar, PAUSA_BUCLE);
    };

    // Arranca cuando la charla se ve DE VERDAD.
    //
    // No sirve un IntersectionObserver sobre la charla: en el Cierre vive en
    // el telón, que está pegado al fondo de la ventana, así que interseca el
    // viewport desde el primer píxel y la secuencia entera se reproducía al
    // cargar, detrás de la página, terminada antes de que nadie llegara
    // (crítica del 08/09/2026). Lo que hay que mirar es si el telón está
    // descubierto: eso pasa cuando el borde inferior de la página sube por
    // encima del techo de la charla. Fuera del telón —si el componente se
    // reusa en el flujo normal— la cuenta da igual apenas la charla entra.
    const pagina = nodo.closest("main") ?? document.querySelector("main");
    const revelada = () => {
      const caja = nodo.getBoundingClientRect();
      if (caja.top > window.innerHeight) return false;
      if (!pagina) return true;
      return (
        pagina.getBoundingClientRect().bottom <= caja.top + caja.height * 0.35
      );
    };

    let vivo = true;
    const mirar = () => {
      if (!vivo || !revelada()) return;
      vivo = false;
      window.removeEventListener("scroll", mirar);
      window.removeEventListener("resize", mirar);
      reproducir();
    };
    window.addEventListener("scroll", mirar, { passive: true });
    window.addEventListener("resize", mirar, { passive: true });
    mirar();

    return () => {
      vivo = false;
      window.removeEventListener("scroll", mirar);
      window.removeEventListener("resize", mirar);
      relojes.forEach((r) => window.clearTimeout(r));
    };
  }, []);

  return (
    <div ref={raiz} className="i-charla">
      <p className="i-fino i-charla-rotulo">{rotulo}</p>
      <ol className="i-charla-lista">
        {CHARLA_MUESTRA.map((m, i) => {
          const nombre =
            m.de === "trafficker" ? AGENCIA_MUESTRA : CLIENTE_MUESTRA;
          // El pie del mensaje —el «Delivered» del original— sólo en el último
          // saliente, que es donde un chat lo muestra.
          const ultimo =
            i === CHARLA_MUESTRA.length - 1 && m.de === "trafficker";
          return (
            <li key={m.hora} className="i-mensaje" data-de={m.de}>
              <span className="i-mensaje-avatar" aria-hidden="true">
                {iniciales(nombre)}
              </span>
              <div className="i-mensaje-cuerpo">
                <p className="i-mensaje-cabeza">
                  <span className="i-mensaje-nombre">{nombre}</span>
                  <time className="i-fino i-cifra">{m.hora}</time>
                </p>
                <p className="i-mensaje-burbuja">{m.texto}</p>
                {ultimo ? (
                  <p className="i-fino i-mensaje-pie">Entregado</p>
                ) : null}
              </div>
              {/* «Está escribiendo»: los tres puntos, en el lugar de la
                  burbuja, mientras el mensaje todavía no llegó. */}
              <span className="i-mensaje-escribiendo" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
