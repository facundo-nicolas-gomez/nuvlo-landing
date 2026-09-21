"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import {
  CADENCIA_MUESTRA,
  DISPARADOR_MANUAL_MUESTRA,
  EMAIL_CLIENTE_MUESTRA,
  ESTADOS_MUESTRA,
  KPIS_MUESTRA,
  MODOS_MUESTRA,
  PASOS_GENERACION_MUESTRA,
  PREGUNTA_CONDICION_MUESTRA,
  PROSA_RESPALDO_MUESTRA,
  RESPALDO_ROTULO_MUESTRA,
  RESPUESTA_NO_MUESTRA,
  RESPUESTA_SI_MUESTRA,
  RESUMEN_MUESTRA,
  type ModoMuestra,
} from "@/lib/reporte-muestra";
import { Entra } from "./Entra";
import { useCiclo } from "./useCiclo";

/**
 * SE ARMA — el circuito de generación, corriendo solo sobre un lienzo.
 *
 * ── QUÉ AFIRMA ────────────────────────────────────────────────────────────
 * `PRODUCT.md` fija el diferencial: «la IA no computa ni un solo número».
 * Dicho en viñetas es una promesa como la de cualquiera; puesto como un
 * circuito que corre solo se lee como un hecho. El argumento en palabras está
 * en la bajada, una vez, y el resto lo hace el dibujo.
 *
 * ── LA SEGUNDA PASADA CAMBIÓ LA FORMA, NO LA TOPOLOGÍA ────────────────────
 * La primera versión tenía nodos anchos con ícono, título y subtítulo, y las
 * dos frases del argumento colgadas sobre las aristas. Eran nodos que había que
 * LEER, alineados en filas, con las etiquetas compitiendo por el mismo espacio:
 * un organigrama, no un canvas. Hoy el nodo es una sola línea con el título del
 * paso —lo mínimo para saber en qué anda— y todo el argumento bajó a la bajada.
 * Lo que queda arriba es un dibujo que se mira, no un texto que se lee.
 *
 * Con eso entraron las otras dos decisiones: los nodos ya no comparten línea de
 * base —cada uno cae unos 44px del anterior— y las aristas son curvas con
 * tangente horizontal. Un grafo escalonado con curvas se recorre; una grilla de
 * cajas con codos se escanea.
 *
 * ── LA COLUMNA ÍNDICE ES EL CONTROL ───────────────────────────────────────
 * Las dos pestañas son el MODO del panel, una decisión de producto real
 * (`PRODUCT.md`: el flujo por defecto es manual, el automático es opt-in), y
 * cambian el circuito: el disparador, y a dónde llega la rama que sale bien. Lo
 * que NO cambian es la rama que sale mal, y ése es el remate: si la IA cayó al
 * texto de respaldo, el reporte queda en borrador sin enviar **también en
 * automático**, porque el envío se autoinhibe.
 *
 * ── EL COLOR ──────────────────────────────────────────────────────────────
 * El nodo en curso lleva filete y título en acento, y la arista que le llega se
 * dibuja en acento; al completarse los dos vuelven a tinta y aparece un tilde
 * verde. Las dos reglas que eso levanta —el acento en tres usos, el verde
 * habilitado para estados— están escritas en `base.css` y en la enmienda de los
 * Do's/Don'ts de `DESIGN.md`, con el motivo.
 */

/* ═══════════════════════════════════════════════════════════════════════════
   EL GRAFO

   El modelo es el del bloque de workflow de n8n, REESCRITO para este sistema.
   No se copió el componente, no se instaló nada y no hay una línea de Tailwind
   ni de shadcn en la sección: lo que se tomó es el modelo de datos y el cálculo
   de las curvas, que es lo que hace que un canvas se comporte como un canvas.

   ── QUÉ SE TOMÓ ───────────────────────────────────────────────────────────
     el arreglo de nodos   cada uno con su `sitio` absoluto adentro del lienzo.
                           Las posiciones son la herramienta del escalonado, no
                           una consecuencia de él.
     las aristas           se calculan DESDE las posiciones, con los puntos de
                           control a la mitad del delta horizontal. Eso es lo
                           que deja las tangentes horizontales en los dos
                           puertos y hace que todas las curvas se sientan de la
                           misma familia.
     el SVG de atrás       uno solo, absoluto, con `pointer-events: none`.
     los puertos           un punto de 6px en el borde del que sale o al que
                           entra cada curva.

   ── QUÉ SE DESCARTÓ ───────────────────────────────────────────────────────
   El arrastre, `addNode`, la cabecera y el pie, `motion.div`, las
   `colorClasses` por tipo, el `backdrop-blur`, la opacidad inicial en cero, el
   punteado y el `whileHover`. El flujo es fijo: el visitante lo mira armarse,
   no lo toca.

   ── EL ESCALONADO ES LA COMPOSICIÓN ───────────────────────────────────────
   Ningún nodo comparte la `y` con el anterior: la fila de arriba alterna 40px
   arriba y abajo, el If está más bajo que el nodo del que sale, y sus dos
   salidas están a alturas distintas entre sí. Las dos piezas de producto están
   a otra escala y a otra altura que todo lo demás, que es lo que las separa de
   los pasos sin necesidad de ningún color.

   ── EL RECORRIDO ──────────────────────────────────────────────────────────
   Arranca arriba a la izquierda, corre a la derecha, baja por el canal derecho
   —atravesando las cifras, porque eso es lo que pasa: el motor calcula y esas
   cifras son lo que recibe la IA— y vuelve hacia la izquierda para abrirse en
   dos. Ninguna curva cruza a otra.
   ═══════════════════════════════════════════════════════════════════════════ */

const ESCENA = { ancho: 872, alto: 546 };
/**
 * 220 y no 200: los títulos son literales del panel y el más largo
 * —«Obteniendo métricas del período…»— mide 186px a 12px, que es el piso de
 * tamaño de la casa. A 200 el nodo los cortaba con puntos suspensivos, y un
 * paso que no se puede leer entero no dice en qué anda el circuito.
 */
const NODO = { ancho: 220, alto: 62 };

/**
 * LOS NODOS, uno por paso real del producto.
 *
 * `sitio` es la esquina superior izquierda adentro del lienzo. Las tres
 * verticales del canal derecho —el tercer paso, las cifras y el redactor—
 * comparten el canto derecho a propósito: con delta horizontal cero la cúbica
 * degenera en una recta, así que el pliegue del circuito baja derecho sin que
 * haya que dibujar un caso aparte.
 */
type Nodo = {
  id: string;
  rotulo: string;
  sitio: { x: number; y: number };
  ancho: number;
  alto: number;
  estado: string;
  titulo: ReactNode;
  /** Una pieza de producto reemplaza el cuerpo del nodo por completo. */
  pieza?: ReactNode;
};

/**
 * `puerto` elige de qué canto sale la curva y a cuál entra:
 *
 *   sin puerto   derecho → izquierdo. El caso de adelante.
 *   izq          izquierdo → derecho. El de la fila que vuelve hacia atrás: con
 *                el caso de adelante, una arista hacia la izquierda sale para
 *                la derecha y se dobla encima de su propio nodo.
 *   riel         derecho → derecho. El del pliegue: los dos nodos comparten el
 *                canto, el delta horizontal es cero y la cúbica degenera en una
 *                recta, así que el circuito baja derecho sin un caso aparte.
 */
type Arista = { de: string; a: string; puerto?: "izq" | "riel" };

/** El delta horizontal se mide entre los dos PUERTOS, no entre los centros: es
 *  lo que deja que una arista que vuelve hacia la izquierda salga por el canto
 *  izquierdo del origen y entre por el derecho del destino, con las mismas
 *  tangentes horizontales que una que va para adelante. */
function curva(a: Nodo, b: Nodo, puerto?: "izq" | "riel") {
  const x1 = a.sitio.x + (puerto === "izq" ? 0 : a.ancho);
  const x2 = b.sitio.x + (puerto === "izq" || puerto === "riel" ? b.ancho : 0);
  const y1 = a.sitio.y + a.alto / 2;
  const y2 = b.sitio.y + b.alto / 2;
  /* Los dos puntos de control a la MITAD del delta horizontal. Es la fórmula
     del componente y es lo que deja las tangentes horizontales en los dos
     puertos: la curva sale y entra derecha, y recién en el medio dobla. */
  const m = (x2 - x1) / 2;
  return `M${x1},${y1} C${x1 + m},${y1} ${x2 - m},${y2} ${x2},${y2}`;
}

const SITIO = {
  disparo: { x: 0, y: 40 },
  n1: { x: 300, y: 0 },
  n2: { x: 600, y: 40 },
  n3: { x: 600, y: 160 },
  kpis: { x: 280, y: 172 },
  n4: { x: 0, y: 240 },
  cond: { x: 300, y: 300 },
  si: { x: 600, y: 262 },
  no: { x: 600, y: 374 },
  prosa: { x: 280, y: 420 },
} as const;

/** Las nueve aristas del circuito. */
const ARISTAS: Arista[] = [
  { de: "disparo", a: "n1" },
  { de: "n1", a: "n2" },
  { de: "n2", a: "n3", puerto: "riel" },
  { de: "n3", a: "kpis", puerto: "izq" },
  { de: "kpis", a: "n4", puerto: "izq" },
  { de: "n4", a: "cond" },
  { de: "cond", a: "si" },
  { de: "cond", a: "no" },
  { de: "n4", a: "prosa" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   EL GUION

   Todo más lento y sin un solo corte seco. Las reglas del movimiento, que valen
   para las dos ramas:

     un nodo en curso            1,6 s
     una arista dibujándose      900 ms
     el tilde de completado      400 ms
     la pieza de cifras          600 ms
     el tipeo                    40 ms por carácter
     la resolución del If        1 s
     la pausa final              4 s
     el fundido de salida        800 ms

   Ninguna transición baja de 400 ms y todas usan `--curva`. Un nodo no arranca
   hasta que la arista que le llega terminó de dibujarse: la secuencia se lee
   porque cada cosa espera a la anterior, no porque estén escalonadas a ojo.
   ═══════════════════════════════════════════════════════════════════════════ */

/** Los identificadores de las nueve aristas: `origen-destino`, que es como los
 *  escribe el marcado y como los busca el ciclo. */
type IdArista =
  | "disparo-n1"
  | "n1-n2"
  | "n2-n3"
  | "n3-kpis"
  | "kpis-n4"
  | "n4-cond"
  | "cond-si"
  | "cond-no"
  | "n4-prosa";

const MS_POR_CARACTER = 40;
const CADA_CUANTOS_FALLA = 4;
const DIBUJO = 900;

/**
 * Se tipea la PRIMERA FRASE del resumen, no el párrafo entero.
 *
 * La pieza mide 340px y muestra tres líneas: el párrafo completo son 249
 * caracteres, o sea seis líneas a ese ancho, y recortarlo dejaría el cursor
 * escribiendo abajo del corte, donde no se ve. La primera frase es una unidad
 * cerrada —cita las tres cifras que la tira acaba de imprimir al lado— y entra
 * en tres líneas justas.
 *
 * Sale del dato y no está escrita acá: si cambia el resumen, cambia esto.
 */
const RESUMEN = RESUMEN_MUESTRA[0];
const FRASE = RESUMEN.slice(0, RESUMEN.indexOf(". ") + 1);

type Guion = {
  duracion: number;
  disparo: number;
  /** Para cada arista: en qué ms empieza a dibujarse. `null` = no se dibuja. */
  cables: Partial<Record<IdArista, number | null>>;
  /** Para cada uno de los cuatro pasos: arranque y fin del «en curso». */
  pasos: readonly (readonly [number, number])[];
  kpis: number;
  tipeo: number | null;
  respaldo: number | null;
  condicion: readonly [number, number];
  salida: number;
  fundido: number;
};

const CON_IA: Guion = {
  duracion: 26000,
  disparo: 400,
  cables: {
    "disparo-n1": 400,
    "n1-n2": 2900,
    "n2-n3": 5400,
    "n3-kpis": 7900,
    "kpis-n4": 8500,
    "n4-prosa": 9000,
    "n4-cond": 18000,
    "cond-si": 19900,
    "cond-no": null,
  },
  pasos: [
    [1300, 2900],
    [3800, 5400],
    [6300, 7900],
    [8800, 18000],
  ],
  kpis: 8800,
  tipeo: 9900,
  respaldo: null,
  condicion: [18900, 19900],
  salida: 20800,
  fundido: 25200,
};

/**
 * EL CICLO SIN IA. Más corto a propósito: sin prosa que escribir no hay nada
 * que esperar, y estirarlo con relleno sería inventar una espera que el
 * producto no tiene. Por eso su pausa final son 2 s y no 4.
 */
const SIN_IA: Guion = {
  duracion: 16000,
  disparo: 400,
  cables: {
    "disparo-n1": 400,
    "n1-n2": 2900,
    "n2-n3": 5400,
    "n3-kpis": 7900,
    "kpis-n4": 8500,
    "n4-prosa": 9000,
    "n4-cond": 10000,
    "cond-si": null,
    "cond-no": 11900,
  },
  pasos: [
    [1300, 2900],
    [3800, 5400],
    [6300, 7900],
    [8800, 10000],
  ],
  kpis: 8800,
  tipeo: null,
  respaldo: 9900,
  condicion: [10900, 11900],
  salida: 12800,
  fundido: 15200,
};

/** El cromo liviano de las dos piezas de producto: tres luces y nada más. */
function Barra() {
  return (
    <span className="f-sa-barra" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

type Piezas = {
  disparo: HTMLElement;
  pasos: HTMLElement[];
  condicion: HTMLElement;
  respuesta: HTMLElement;
  salidaSi: HTMLElement;
  salidaNo: HTMLElement;
  kpis: HTMLElement;
  prosa: HTMLElement;
  visible: HTMLElement;
  cola: HTMLElement;
  respaldo: HTMLElement;
  cables: HTMLElement[];
  ultimo: { n: number; respuesta: string };
};

export function SeArma() {
  const piezas = useRef<Piezas | null>(null);
  const fijado = useRef<ModoMuestra | null>(null);

  const raiz = useCiclo<HTMLElement>({
    duracion: (ciclo) =>
      ciclo % CADA_CUANTOS_FALLA === CADA_CUANTOS_FALLA - 1
        ? SIN_IA.duracion
        : CON_IA.duracion,

    alAvanzar: (t, ciclo, seccion) => {
      const p = (piezas.current ??= leerPiezas(seccion));
      const sinIa = ciclo % CADA_CUANTOS_FALLA === CADA_CUANTOS_FALLA - 1;
      const g = sinIa ? SIN_IA : CON_IA;
      const modo = fijado.current ?? (ciclo % 2 === 0 ? "manual" : "auto");

      aplicarModo(seccion, modo);
      seccion.dataset.rama = sinIa ? "no" : "si";
      seccion.dataset.fundido = t >= g.fundido ? "si" : "no";

      p.disparo.dataset.estado = t >= g.disparo ? "hecho" : "espera";

      for (let i = 0; i < p.pasos.length; i += 1) {
        const [ini, fin] = g.pasos[i];
        p.pasos[i].dataset.estado =
          t < ini ? "espera" : t < fin ? "curso" : "hecho";
      }

      /* Cada cable pasa por tres fases: oculto, dibujándose en acento, y hecho
         en tinta media. La segunda dura exactamente lo que dura el trazo. */
      for (const cable of p.cables) {
        const cuando = g.cables[cable.dataset.arista as IdArista];
        /* Cuatro fases, y la distinción entre las dos primeras importa: una
           arista que TODAVÍA no le tocó está sin dibujar —el circuito se arma
           delante tuyo—, mientras que la del ramal que este ciclo NO toma está
           dibujada en filete. Si las dos quedaran sin dibujar, la bifurcación
           del If tendría una sola salida a la vista y dejaría de leerse como
           bifurcación. */
        cable.dataset.fase =
          cuando === undefined || cuando === null
            ? "pendiente"
            : t < cuando
              ? "oculto"
              : t < cuando + DIBUJO
                ? "dibujando"
                : "hecho";
      }

      p.kpis.dataset.oculto = t < g.kpis ? "si" : "no";

      /* EL TIPEO. Un índice sobre el string: `steps()` con `ch` no sirve para
         castellano, donde una «i» y una «ñ» no miden lo mismo. El texto entero
         está siempre en el DOM partido en escrito y cola; la cola queda con
         `visibility: hidden` y sigue ocupando su lugar, así que el bloque mide
         igual a medio escribir que terminado. */
      const n =
        g.tipeo === null
          ? 0
          : Math.max(
              0,
              Math.min(FRASE.length, Math.floor((t - g.tipeo) / MS_POR_CARACTER)),
            );

      if (n !== p.ultimo.n) {
        p.visible.textContent = FRASE.slice(0, n);
        p.cola.textContent = FRASE.slice(n);
        p.ultimo.n = n;
      }
      p.prosa.dataset.tipeando = n > 0 && n < FRASE.length ? "si" : "no";

      /* La pieza aparece cuando su cable termina de dibujarse, no antes: una
         pieza que ya está ahí mientras la línea todavía la está buscando
         rompe el orden de causa que la sección entera está contando. */
      const cablePros = g.cables["n4-prosa"] ?? 0;
      p.prosa.dataset.oculto = t < cablePros + DIBUJO ? "si" : "no";

      const [ini, fin] = g.condicion;
      p.condicion.dataset.estado = t < ini ? "espera" : t < fin ? "curso" : "hecho";

      const respuesta =
        t < fin ? "" : sinIa ? RESPUESTA_NO_MUESTRA : RESPUESTA_SI_MUESTRA;
      if (respuesta !== p.ultimo.respuesta) {
        p.respuesta.textContent = respuesta;
        p.ultimo.respuesta = respuesta;
      }

      const llego = t >= g.salida;
      p.salidaSi.dataset.estado = !sinIa && llego ? "hecho" : "espera";
      p.salidaNo.dataset.estado = sinIa && llego ? "fallo" : "espera";

      /* La prosa de respaldo va con `hidden`, y es la única excepción a no
         ocultar en el servidor: no es contenido que el visitante se pierda sin
         JavaScript, es la OTRA rama del mismo momento. Emitida visible, la
         página mostraría el resumen y su respaldo a la vez, que es un estado
         que el producto no alcanza nunca. */
      p.respaldo.hidden = !(g.respaldo !== null && t >= g.respaldo);
    },
  });

  /* El clic fija el modo hasta el próximo clic y lo aplica en el acto: con
     `prefers-reduced-motion` el ciclo no corre, así que esperar al próximo
     cuadro dejaría las pestañas sin hacer nada. */
  const elegir = useCallback(
    (modo: ModoMuestra) => {
      fijado.current = modo;
      if (raiz.current) aplicarModo(raiz.current, modo);
    },
    [raiz],
  );

  /**
   * LOS NODOS Y LAS ARISTAS.
   *
   * Van adentro del componente porque tres de ellos cambian con el modo y dos
   * llevan las piezas de producto, que son marcado. Las posiciones sí son
   * constantes y están arriba, en `SITIO`.
   */
  const NODOS: Nodo[] = [
    {
      id: "disparo",
      rotulo: "Disparador",
      sitio: SITIO.disparo,
      ...NODO,
      estado: "hecho",
      titulo: (
        <>
          <span className="f-sa-solo-manual">{DISPARADOR_MANUAL_MUESTRA}</span>
          <span className="f-sa-solo-auto">
            {CADENCIA_MUESTRA} · <ProximoReporte />
          </span>
        </>
      ),
    },
    ...[0, 1, 2].map((i) => ({
      id: `n${i + 1}`,
      rotulo: "Paso",
      sitio: [SITIO.n1, SITIO.n2, SITIO.n3][i],
      ...NODO,
      estado: "hecho",
      titulo: PASOS_GENERACION_MUESTRA[i] as ReactNode,
    })),
    {
      /* LA TIRA DE CIFRAS. Está EN el camino y no colgada al costado: el motor
         calcula y esas cifras son literalmente lo que recibe la IA. Aparecen de
         golpe porque el motor devuelve un resultado; un contador subiendo diría
         que se está calculando delante tuyo, que es efecto. */
      id: "kpis",
      rotulo: "",
      sitio: SITIO.kpis,
      ancho: 280,
      alto: 58,
      estado: "hecho",
      titulo: null,
      pieza: (
        <div className="f-sa-pieza">
          <Barra />
          <div className="f-sa-hoja f-reticula f-sa-cifras">
            {KPIS_MUESTRA.map((k) => (
              <span key={k.etiqueta} className="f-sa-cifra f-cifra">
                {k.valor}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "n4",
      rotulo: "Paso",
      sitio: SITIO.n4,
      ...NODO,
      estado: "hecho",
      titulo: PASOS_GENERACION_MUESTRA[3],
    },
    {
      id: "cond",
      rotulo: "Condición",
      sitio: SITIO.cond,
      ...NODO,
      estado: "hecho",
      titulo: (
        <>
          {PREGUNTA_CONDICION_MUESTRA}{" "}
          <span className="f-sa-respuesta f-cifra" data-pieza="respuesta">
            {RESPUESTA_SI_MUESTRA}
          </span>
        </>
      ),
    },
    {
      id: "si",
      rotulo: "Resultado",
      sitio: SITIO.si,
      ...NODO,
      estado: "hecho",
      titulo: (
        <>
          <span className="f-sa-solo-manual">{ESTADOS_MUESTRA[0].nombre}</span>
          <span className="f-sa-solo-auto">
            {ESTADOS_MUESTRA[1].nombre} ·{" "}
            <span className="f-cifra">{EMAIL_CLIENTE_MUESTRA}</span>
          </span>
        </>
      ),
    },
    {
      id: "no",
      rotulo: "Resultado",
      sitio: SITIO.no,
      ...NODO,
      estado: "espera",
      titulo: `${ESTADOS_MUESTRA[0].nombre} · ${RESPALDO_ROTULO_MUESTRA}`,
    },
    {
      id: "prosa",
      rotulo: "",
      sitio: SITIO.prosa,
      ancho: 280,
      alto: 116,
      estado: "hecho",
      titulo: null,
      pieza: (
        <div className="f-sa-pieza">
          <Barra />
          <div className="f-sa-hoja">
            <p className="f-rotulo">Resumen ejecutivo</p>
            <div className="f-sa-prosa-cuerpo">
              <p className="f-sa-parrafo">
                <span data-pieza="visible">{FRASE}</span>
                <span className="f-sa-caret" aria-hidden="true" />
                <span className="f-sa-cola" data-pieza="cola" />
              </p>
              <p className="f-sa-respaldo" data-pieza="respaldo" hidden>
                {PROSA_RESPALDO_MUESTRA}
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const por = (id: string) => NODOS.find((n) => n.id === id)!;

  return (
    <section className="f-seccion f-sa-seccion" id="reporte" ref={raiz} data-modo="manual">
      <div className="f-sa-fila">
        <Entra className="f-sa-indice">
          <h2 className="f-display f-sa-titular">
            El motor calcula. La <span className="f-marca-frase">IA sólo escribe</span>.
          </h2>

          <p className="f-bajada f-sa-bajada">
            Inversión, conversaciones, costo por conversación y CTR los computa el
            motor sobre lo que devuelve Meta: ni un número pasa por la IA. La IA
            recibe esas cifras ya hechas y escribe el resumen, la alerta y el plan
            de acción; si no responde, el reporte nace igual y no sale.
          </p>

          {/* Las pestañas son el MODO del panel y cambian el circuito de verdad:
              el disparador, y a dónde llega la rama que sale bien. */}
          <div className="f-sa-modos" role="tablist" aria-label="Modo de envío">
            {MODOS_MUESTRA.map((m) => (
              <button
                key={m.id}
                type="button"
                role="tab"
                className="f-sa-modo"
                data-modo-boton={m.id}
                aria-selected={m.id === "manual"}
                onClick={() => elegir(m.id)}
              >
                {m.nombre}
              </button>
            ))}
          </div>
        </Entra>

        {/* EL LIENZO. Un contenedor relativo con alto fijo: el del nodo más
            bajo. Sin scroll y sin `overflow`, así que el circuito entra entero o
            no entra —y por eso debajo de 1024 las posiciones se desactivan y los
            nodos vuelven al flujo—. */}
        <div className="f-sa-lienzo" style={{ aspectRatio: `${ESCENA.ancho} / ${ESCENA.alto}` }}>
          <svg
            className="f-sa-cables"
            viewBox={`0 0 ${ESCENA.ancho} ${ESCENA.alto}`}
            aria-hidden="true"
          >
            {ARISTAS.map((c) => (
              <path
                key={`${c.de}-${c.a}`}
                className="f-sa-cable"
                data-arista={`${c.de}-${c.a}`}
                data-fase="hecho"
                d={curva(por(c.de), por(c.a), c.puerto)}
                pathLength={1}
              />
            ))}
          </svg>

          {NODOS.map((n) => (
            <div
              key={n.id}
              className="f-sa-nodo"
              data-pieza={n.id}
              data-estado={n.estado}
              style={{
                left: `${(n.sitio.x / ESCENA.ancho) * 100}%`,
                top: `${(n.sitio.y / ESCENA.alto) * 100}%`,
                width: `${(n.ancho / ESCENA.ancho) * 100}%`,
                height: `${(n.alto / ESCENA.alto) * 100}%`,
              }}
            >
              {n.pieza ?? (
                <div className="f-sa-tarjeta">
                  <p className="f-sa-tipo">{n.rotulo}</p>
                  <p className="f-sa-titulo">{n.titulo}</p>
                  <span className="f-sa-tilde" aria-hidden="true">
                    <svg viewBox="0 0 14 14">
                      <path
                        d="M2.6 7.4 5.6 10.3 11.4 3.9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              )}
              {/* Los puertos: el punto del que sale o al que entra una curva. Sin
                  ellos la línea muere contra el filete y el nodo deja de leerse
                  como nodo de un grafo. */}
              <span className="f-sa-puerto f-sa-puerto-izq" aria-hidden="true" />
              <span className="f-sa-puerto f-sa-puerto-der" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * LA FECHA DEL PRÓXIMO REPORTE — EL ÚNICO DATO QUE CAMBIA ENTRE VISITAS.
 *
 * Regla: hoy + 7 días, no «el próximo lunes». El panel no ancla la programación
 * a un día de la semana: calcula `nextRunAt` desde el momento en que se guardó
 * más la frecuencia.
 *
 * La escribe un efecto y no el render porque es un sitio estático: en el build
 * no existe «hoy», así que escribirla durante el render desajustaría la
 * hidratación. Es lo mismo que hace `PanelLink` con su `href`.
 */
const MESES = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

function ProximoReporte() {
  const nodo = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = nodo.current;
    if (!el) return;
    const d = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    el.textContent = `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()}`;
  }, []);

  return <span className="f-cifra" ref={nodo} />;
}

/** El modo se aplica en un solo lugar porque lo escriben dos: el ciclo en cada
 *  cuadro y el clic de una pestaña. */
function aplicarModo(seccion: HTMLElement, modo: ModoMuestra) {
  if (seccion.dataset.modo === modo) return;
  seccion.dataset.modo = modo;
  for (const b of seccion.querySelectorAll<HTMLElement>("[data-modo-boton]")) {
    b.setAttribute("aria-selected", String(b.dataset.modoBoton === modo));
  }
}

/** Se resuelve una sola vez, en el primer cuadro: cuarenta `querySelector` por
 *  cuadro a sesenta cuadros por segundo serían el costo real de la sección. */
function leerPiezas(seccion: HTMLElement): Piezas {
  const uno = (nombre: string) =>
    seccion.querySelector<HTMLElement>(`[data-pieza="${nombre}"]`)!;

  return {
    disparo: uno("disparo"),
    pasos: ["n1", "n2", "n3", "n4"].map((id) => uno(id)),
    condicion: uno("cond"),
    respuesta: uno("respuesta"),
    salidaSi: uno("si"),
    salidaNo: uno("no"),
    kpis: uno("kpis"),
    prosa: uno("prosa"),
    visible: uno("visible"),
    cola: uno("cola"),
    respaldo: uno("respaldo"),
    cables: [...seccion.querySelectorAll<HTMLElement>("[data-arista]")],
    ultimo: { n: FRASE.length, respuesta: RESPUESTA_SI_MUESTRA },
  };
}
