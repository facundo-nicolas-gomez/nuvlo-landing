"use client";

import { useEffect, useRef, useState } from "react";
import {
  AGENCIA_MUESTRA,
  CADENCIA_MUESTRA,
  EMAIL_CLIENTE_MUESTRA,
  HORA_ENVIO_MUESTRA,
  KPIS_MUESTRA,
  PASOS_GENERACION_MUESTRA,
  PROMPT_CAMPANAS_MUESTRA,
  RECORRIDO_MUESTRA,
  RESUMEN_MUESTRA,
  ZONA_ENVIO_MUESTRA,
} from "@/lib/reporte-muestra";
import { Boton } from "./Piezas";
import { Entra } from "./Entra";
import { useFocoAlReemplazo } from "./foco";

/**
 * LA MÁQUINA — el capítulo oscuro deja de explicar el proceso y lo ejecuta.
 *
 * ── POR QUÉ SE REEMPLAZAN DOS SECCIONES POR UNA (dueño, 18/09/2026) ─────────
 * Criterio —«lo que la IA recibe al lado de lo que escribe»— y Control —«nada
 * sale sin que vos lo decidas»— eran dos secciones seguidas con la misma
 * silueta: titular, bajada y un objeto ancho. Se intentó arreglarlas tres
 * veces sin tocar esa forma: una banda que las ataba, una barra de acción al
 * pie, un compactado de la escena. El dueño leyó las tres como lo mismo.
 * «No te guíes por mis decisiones anteriores» fue el permiso para tirar la
 * forma, no sólo para reacomodarla.
 *
 * Las dos secciones afirmaban dos verdades sobre un proceso. Ésta lo corre
 * delante del visitante: los números llegan de Meta, Nuvlo los compara sin IA,
 * la IA recibe nombres de campaña sin una sola cifra y recién ahí escribe, el
 * reporte se arma… **y se frena**. El freno es el producto. `Control.tsx` ya
 * tenía escrito «demostrar, no afirmar», y demostraba solamente el último paso.
 *
 * ── NO HAY BOTÓN DE «GENERAR» ───────────────────────────────────────────────
 * Arranca sola al entrar en pantalla. Un botón para empezar competiría con el
 * único que importa —«Aprobar y enviar»— y, sobre todo, diría lo contrario de
 * lo que la escena afirma: la máquina hace todo sola hasta que te necesita.
 *
 * ── SIN JAVASCRIPT Y CON MOVIMIENTO REDUCIDO ────────────────────────────────
 * El marcado nace con todas las estaciones hechas y el freno puesto, que es el
 * estado final y el contenido completo. La animación sólo aparece cuando el
 * componente monta y escribe `data-corre`: sin eso el CSS muestra todo hecho.
 * No hay contenido que dependa de la animación.
 *
 * ── LO QUE SE MURIÓ, Y POR QUÉ ──────────────────────────────────────────────
 * «Borrador» a escala de cartel (lo dice el freno, y con el destinatario
 * delante), la fila de hitos (la cuenta la línea de estaciones), la línea de
 * firma con el botón en la punta, los dos titulares de sección, y los dos
 * caminos como bloque lado a lado: pasan a una línea de prosa debajo del
 * freno, porque son un ajuste de esta máquina y no un tema aparte.
 */

/** La hora del envío, la misma que muestra el recorrido del panel. */
const HORA_ENVIO = RECORRIDO_MUESTRA.find((h) => h.estado === "Enviado")?.hora;

/** Cuánto dura cada estación. Larga a propósito: lo que se tiene que leer es
 *  la evidencia que deja cada una, no el movimiento. */
const PASO_MS = 950;

const ESTACIONES = [
  {
    titulo: PASOS_GENERACION_MUESTRA[0],
    corto: "Meta",
    nota: "El período elegido y el anterior, directo de Meta.",
  },
  {
    titulo: PASOS_GENERACION_MUESTRA[1],
    corto: "Nuvlo",
    nota: "Sin IA: aritmética sobre los datos que entregó Meta.",
  },
  {
    titulo: PASOS_GENERACION_MUESTRA[2],
    corto: "La IA",
    nota: "Recibe los nombres de campaña sin una sola cifra, y escribe.",
  },
  {
    titulo: PASOS_GENERACION_MUESTRA[3],
    corto: "El reporte",
    nota: "Se arma sin IA y se guarda como borrador.",
  },
];

export function Maquina() {
  const raiz = useRef<HTMLDivElement>(null);
  // Nace terminada: es el estado final, y es lo que se ve sin JavaScript.
  const [paso, setPaso] = useState(ESTACIONES.length);
  const [corre, setCorre] = useState(false);
  const [estado, setEstado] = useState<"borrador" | "enviado">("borrador");
  const enviado = estado === "enviado";
  const cara = useRef<HTMLElement>(null);
  useFocoAlReemplazo(estado, cara);

  useEffect(() => {
    const nodo = raiz.current;
    if (!nodo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let temporizador = 0;
    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((e) => e.isIntersecting)) return;
        observador.disconnect();
        setCorre(true);
        setPaso(0);
        let n = 0;
        const avanzar = () => {
          n += 1;
          setPaso(n);
          if (n < ESTACIONES.length) temporizador = window.setTimeout(avanzar, PASO_MS);
        };
        temporizador = window.setTimeout(avanzar, PASO_MS);
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    observador.observe(nodo);
    return () => {
      observador.disconnect();
      window.clearTimeout(temporizador);
    };
  }, []);

  // ── LA LUZ QUE SIGUE AL CURSOR ────────────────────────────────────────────
  // Lo de Stripe, traducido a este mundo: no es un halo de color —ya se probó
  // en el héroe y se leyó «como suciedad y no como luz» (DESIGN.md)— sino la
  // MISMA luz sin tono que la noche ya tiene lavada encima, al 5,5 %, movida a
  // donde estás mirando. La escena de La lectura ya usa un haz; éste es el
  // mismo material, y lo único que agrega es que lo dirigís vos.
  //
  // Sólo con puntero fino y sin movimiento reducido: en una pantalla táctil no
  // hay «pasar por encima», y el listener sería trabajo por cuadro sin nadie
  // que lo vea.
  useEffect(() => {
    const nodo = raiz.current;
    if (!nodo) return;
    const fino = window.matchMedia("(hover: hover) and (pointer: fine)");
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fino.matches || quieto.matches) return;

    let pedido = 0;
    let x = 0;
    let y = 0;
    const pintar = () => {
      pedido = 0;
      nodo.style.setProperty("--i-maq-x", `${x}px`);
      nodo.style.setProperty("--i-maq-y", `${y}px`);
    };
    const alMover = (e: PointerEvent) => {
      const r = nodo.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (!pedido) pedido = window.requestAnimationFrame(pintar);
    };
    const entrar = () => {
      nodo.dataset.luz = "";
    };
    const salir = () => {
      delete nodo.dataset.luz;
    };

    nodo.addEventListener("pointermove", alMover, { passive: true });
    nodo.addEventListener("pointerenter", entrar);
    nodo.addEventListener("pointerleave", salir);
    return () => {
      nodo.removeEventListener("pointermove", alMover);
      nodo.removeEventListener("pointerenter", entrar);
      nodo.removeEventListener("pointerleave", salir);
      if (pedido) window.cancelAnimationFrame(pedido);
    };
  }, []);

  const frenado = paso >= ESTACIONES.length;
  const lugar = (i: number) =>
    !corre || i < paso ? "hecho" : i === paso ? "curso" : "pendiente";

  return (
    <section
      className="i-seccion i-noche i-maquina"
      id="control"
      aria-labelledby="i-h-maquina"
    >
      <div className="i-marco">
        <Entra className="i-maquina-cabeza">
          <h2 id="i-h-maquina" className="i-display">
            Se hace solo. Y te espera.
          </h2>
          <p className="i-bajada i-cabeza-bajada">
            Nuvlo calcula cada número antes de que la IA escriba una palabra, y
            el reporte queda en borrador, esperándote. Que salga solo es una
            opción, y se programa aparte.
          </p>
        </Entra>

        <Entra demora={160}>
          <div
            ref={raiz}
            className="i-maq"
            data-corre={corre ? "" : undefined}
            data-frenado={frenado ? "" : undefined}
          >
            {/* Las cuatro estaciones, en fila. Es una lista ordenada porque el
                orden ES el argumento: los números existen antes que el texto. */}
            <ol className="i-maq-linea" aria-label="Cómo se arma el reporte">
              {ESTACIONES.map((e, i) => (
                <li key={e.corto} className="i-maq-estacion" data-lugar={lugar(i)}>
                  <p className="i-rotulo i-maq-corto">{e.corto}</p>
                  <p className="i-maq-titulo">{e.titulo}</p>

                  <div className="i-maq-prueba">
                    {i === 0 && (
                      <ul className="i-maq-cifras">
                        {KPIS_MUESTRA.map((k) => (
                          <li key={k.etiqueta}>
                            <span className="i-fino">{k.etiqueta}</span>
                            <span className="i-cifra i-maq-valor">{k.valor}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {i === 1 && (
                      <ul className="i-maq-cifras">
                        {KPIS_MUESTRA.map((k) => (
                          <li key={k.etiqueta}>
                            <span className="i-fino">{k.etiqueta}</span>
                            <span
                              className="i-cifra i-maq-var"
                              data-sentido={k.sentido}
                            >
                              {k.variacion}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {i === 2 && (
                      <>
                        {/* Lo único que recibe: nombres, sin cifras. Es la
                            prueba que Criterio mostraba en dos columnas. */}
                        <ul className="i-maq-campanas">
                          {PROMPT_CAMPANAS_MUESTRA.campanas.map((c) => (
                            <li key={c.nombre} className="i-cita">
                              {c.nombre}
                            </li>
                          ))}
                        </ul>
                        <p className="i-maq-escrito">{RESUMEN_MUESTRA[1]}</p>
                      </>
                    )}

                    {i === 3 && (
                      <ul className="i-maq-partes">
                        <li>Encabezado</li>
                        <li>Resumen ejecutivo</li>
                        <li>Resultados del período</li>
                        <li>Métricas detalladas</li>
                        <li>Plan de acción</li>
                        <li>Firma</li>
                      </ul>
                    )}
                  </div>

                  <p className="i-fino i-maq-nota">{e.nota}</p>
                </li>
              ))}
            </ol>

            {/* ── EL FRENO ────────────────────────────────────────────────
                A todo el ancho y debajo de las cuatro: la máquina llegó hasta
                acá sola y no puede seguir. Es la tesis de `PRODUCT.md`, y acá
                se ejecuta en vez de afirmarse. */}
            <div className="i-maq-freno" aria-live="polite">
              {enviado ? (
                <div
                  className="i-maq-freno-caja"
                  ref={cara as React.RefObject<HTMLDivElement>}
                  tabIndex={-1}
                >
                  <div className="i-maq-dicho">
                    <p className="i-maq-estado" data-estado="enviado">
                      Enviado a las <span className="i-cifra">{HORA_ENVIO}</span>
                    </p>
                    <p className="i-chico i-maq-detalle">
                      Le llegó a{" "}
                      <span className="i-cifra">{EMAIL_CLIENTE_MUESTRA}</span>,
                      firmado por {AGENCIA_MUESTRA}. No se puede deshacer: el
                      correo ya salió.
                    </p>
                  </div>
                  <div className="i-maq-acciones">
                    <Boton chico>Empezar gratis</Boton>
                    <button
                      type="button"
                      className="i-enlace"
                      onClick={() => setEstado("borrador")}
                    >
                      Reiniciar el ejemplo
                    </button>
                    <a className="i-enlace" href="#entregable">
                      Ver el correo enviado
                    </a>
                  </div>
                </div>
              ) : (
                <div className="i-maq-freno-caja">
                  <div className="i-maq-dicho">
                    <p className="i-maq-estado">Aquí se detiene.</p>
                    <p className="i-chico i-maq-detalle">
                      El reporte está listo y en borrador. Sin enlace público y
                      sin correo hasta tu aprobación. Se envía a{" "}
                      <span className="i-cifra">{EMAIL_CLIENTE_MUESTRA}</span>.
                    </p>
                  </div>
                  <div className="i-maq-acciones">
                    <button
                      type="button"
                      ref={cara as React.RefObject<HTMLButtonElement>}
                      className="i-boton"
                      onClick={() => setEstado("enviado")}
                    >
                      Aprobar y enviar
                    </button>
                    <p className="i-fino i-maq-ejemplo">
                      Es el mismo botón del panel, y funciona.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Entra>

        {/* Los dos caminos eran un bloque de dos columnas con su propio flujo.
            Son un ajuste de esta máquina —dónde se frena, o si no se frena—, así
            que van como una línea debajo de ella y no como un tema aparte. */}
        <Entra demora={260}>
          <p className="i-chico i-maquina-modos">
            Dos modos por cuenta publicitaria: revisar cada reporte, o programar
            la frecuencia —{CADENCIA_MUESTRA.toLowerCase()}, a las{" "}
            <span className="i-cifra">{HORA_ENVIO_MUESTRA}</span> de{" "}
            {ZONA_ENVIO_MUESTRA}— para que salga solo. Si la IA no logra
            escribir el análisis, el programado no sale: queda en borrador. El
            modo se elige en la ficha del cliente y se cambia en cualquier
            momento.
          </p>
        </Entra>
      </div>
    </section>
  );
}
