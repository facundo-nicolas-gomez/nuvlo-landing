"use client";

import { useEffect, useRef } from "react";
import { Aprobacion } from "./Aprobacion";
import { CLIENTE_MUESTRA, PREGUNTA_CLIENTE_MUESTRA } from "@/lib/reporte-muestra";

/**
 * LAS DOS PIEZAS FLOTANTES DEL HÉROE.
 *
 * ── QUÉ SON ─────────────────────────────────────────────────────────────────
 * A la izquierda, debajo de la acción y mordiendo el borde de la ventana, la
 * pregunta del cliente que dispara el ritual (`PREGUNTA_CLIENTE_MUESTRA`), en
 * verde de WhatsApp. Abajo a la derecha, sobre el pie de la bandeja, el hito que ya
 * pasó: «Aprobado por vos · 09:22» con el destinatario
 * (`RECORRIDO_MUESTRA[1]`). Las dos delante del informe: la primera versión
 * tenía la burbuja detrás y el dueño la rechazó porque no resaltaba
 * (07/09/2026); una pieza detrás no puede resaltar.
 * En el espacio arman la secuencia: el cliente pregunta, el reporte es la
 * respuesta, y salió porque vos lo aprobaste.
 *
 * ── LA TARJETA ES EL DISPARADOR ─────────────────────────────────────────────
 * Empieza en «Pendiente de aprobación», con el punto naranja que late y el
 * botón del panel; el visitante lo aprieta y la tarjeta se cierra en «Aprobado
 * por vos · 09:22» mientras la barra de direcciones pasa de la vista previa a
 * la página pública del cliente.
 *
 * Antes alternaba sola cada 3s. La crítica del 08/09/2026 encontró que así la
 * primera pantalla se contradecía: la mitad del tiempo decía «pendiente»
 * mientras la barra mostraba una URL pública que existe recién después de
 * enviar. El dueño eligió el gesto en lugar del bucle. El estado vive en
 * `Escena.tsx`, que es el padre común de la ventana y de la tarjeta.
 *
 * Un iPhone con el panel ocupó este lugar unas horas el 07/09/2026; el dueño
 * lo mandó a El entregable, con el mail del cliente en la pantalla.
 *
 * ── DE DÓNDE SALE LA COMPOSICIÓN ────────────────────────────────────────────
 * Referencias vistas en 21st.dev el 07/09/2026: la tarjeta chica de
 * notificación que muerde la esquina de la ventana (Hero with Dashboard
 * Mockup, flexnative) y el par asimétrico delante/detrás (Credit Card Hero,
 * ruixen.ui). La entrada es la de Micro Scale Fade (educalvolpz): fundido con
 * una escala apenas mayor que baja a tamaño normal, sin rebote.
 *
 * ── CUÁNDO ENTRAN: SIEMPRE, Y LA ANIMACIÓN NO ESCONDE NADA (09/09/2026) ─────
 * Entraban únicamente con el primer scroll —rueda, dedo o tecla— y sin
 * respaldo por tiempo: quien no scrolleaba no las veía, y eso estaba asumido
 * por decisión del dueño del 07/09/2026.
 *
 * **Esa decisión dejó de sostenerse el 09/09**, cuando la posición de lectura
 * del héroe se movió a «Resultados del período». Hasta ahí el informe abría por
 * el encabezado con el nombre del cliente y la firma de la agencia, así que la
 * marca estaba en el primer frame aunque estas dos piezas no. Al mover la
 * posición, el brief transfirió ese trabajo acá —«lo sigue cargando la tarjeta
 * de aprobación, que está en el mismo primer viewport»— y las dos decisiones
 * quedaron incompatibles: **la tarjeta estaba en el primer viewport
 * scrolleado, no en el pintado**. Medido a los 3,5s sin scroll, las tres
 * piezas daban `opacity: 0` en 1440, 1024 y 390, y el frame que decide el
 * rebote era titular, párrafo, botón, vacío y una tabla de cifras sin dueño
 * (octava crítica, 09/09/2026).
 *
 * Estuvieron un día a la vista desde el primer frame, con una entrada de sólo
 * `transform`. El dueño las quiso de vuelta escondidas hasta que la escena
 * entra en el viewport (10/09/2026), y ésa es la excepción registrada al
 * Don't de «una animación de entrada no esconde»: ver el efecto de abajo.
 */

export function Flotantes({
  aprobado,
  onAprobar,
  onVolver,
}: {
  aprobado: boolean;
  onAprobar: () => void;
  onVolver: () => void;
}) {
  // ── ENTRAN CON EL SCROLL, POR DECISIÓN DEL DUEÑO (10/09/2026) ─────────────
  // Estuvieron un día visibles desde el primer frame pintado, que es lo que
  // la octava crítica había pedido. El dueño las vio «como contenido del
  // reporte en vez de algo que flota encima» y pidió lo contrario: que
  // aparezcan cuando la escena entra en el viewport, con una entrada.
  //
  // **El estado oculto viene en el HTML**, no lo escribe este efecto: escrito
  // al montar, el primer frame las pintaba enteras y en los 700ms siguientes
  // se desvanecían solas, antes de cualquier gesto —un parpadeo, medido
  // (décima crítica)—. Lo que hacía que sin JavaScript se vieran lo hace
  // ahora el CSS con `scripting: none`, y con movimiento reducido también;
  // ver `.i-flota` en `secciones.css`.
  //
  // ── EL DISPARADOR ES EL PRIMER SCROLL (10/09/2026) ────────────────────────
  // El observador disparaba con el 60 % de la escena en pantalla, y **en una
  // pantalla alta eso pasa al cargar**: las dos piezas aparecían solas antes de
  // que el visitante tocara nada, así que la entrada existía pero nadie la veía.
  // El dueño lo pidió explícito: «que aparezcan con el primer scroll».
  //
  // Hoy el observador exige además que la página se haya movido
  // (`window.scrollY > 0`), y la intención de scroll —rueda, dedo, tecla o el
  // propio evento de scroll— dispara igual. La red de seguridad se conserva para
  // el caso que la motivó en su momento: quien llega con la página ya scrolleada
  // —una recarga a media página, un enlace con ancla— las ve sin tener que
  // moverse de nuevo.
  const raiz = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const nodo = raiz.current;
    if (!nodo) return;
    // Con movimiento reducido el CSS las muestra desde el primer frame, así que
    // el `inert` del marcado tiene que salir aunque el observador no corra: si
    // no, quedan visibles y no operables, que es el defecto al revés.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodo.removeAttribute("inert");
      return;
    }

    // ── Y VUELVE A ENTRAR CADA VEZ (12/09/2026) ────────────────────────────
    // Era una entrada de una sola vez: al primer gesto se mostraban y el
    // observador se desconectaba para siempre. El dueño quiere todo en bucle,
    // así que cuando el héroe se va ENTERO de la pantalla las piezas vuelven a
    // esconderse y el disparador se rearma: volver arriba es volver a verlas
    // entrar. El umbral de salida es 0 —afuera del todo—, no el 60 % de la
    // entrada: con el mismo borde, esconderlas pasaría con el héroe a la vista.
    const EVENTOS = ["wheel", "touchstart", "keydown", "scroll"] as const;
    let observador: IntersectionObserver | undefined;
    let visto = false;
    // Cuánto de la escena se ve. Sin esto el rearme se dispara solo: los
    // oyentes de gesto se vuelven a colgar en mitad de un scroll y el propio
    // evento que sacó al héroe de la pantalla las mostraba de nuevo, lejos de
    // donde están. Medido: se quedaban en el estado visible para siempre.
    let porcion = 1;

    const mostrar = () => {
      if (visto || porcion < 0.6) return;
      visto = true;
      nodo.dataset.flota = "visto";
      nodo.removeAttribute("inert");
      EVENTOS.forEach((e) => window.removeEventListener(e, mostrar));
    };
    const rearmar = () => {
      if (!visto) return;
      visto = false;
      nodo.dataset.flota = "oculto";
      nodo.setAttribute("inert", "");
      EVENTOS.forEach((e) =>
        window.addEventListener(e, mostrar, { passive: true }),
      );
    };

    EVENTOS.forEach((e) =>
      window.addEventListener(e, mostrar, { passive: true }),
    );
    const escena = nodo.closest(".i-heroe-escena");
    if (escena) {
      porcion = 0;
      observador = new IntersectionObserver(
        (entradas) => {
          const ultima = entradas[entradas.length - 1];
          porcion = ultima.intersectionRatio;
          if (porcion === 0) {
            rearmar();
            return;
          }
          // La condición de scroll es lo que hace que la entrada se VEA: sin
          // ella, en una pantalla alta la escena ya cumple el 60 % en el primer
          // frame y las piezas se muestran antes de cualquier gesto.
          if (window.scrollY === 0) return;
          if (ultima.intersectionRatio >= 0.6) mostrar();
        },
        { threshold: [0, 0.6] },
      );
      observador.observe(escena);
    }
    return () => {
      EVENTOS.forEach((e) => window.removeEventListener(e, mostrar));
      observador?.disconnect();
    };
  }, []);

  return (
    /* `inert` acompaña a `data-flota`: mientras las piezas están ocultas el
       subárbol entero sale del orden de tabulación y del árbol de
       accesibilidad. Sin esto el botón de la tarjeta era enfocable e invisible
       (medido: posición 12 de 43 a scroll 0). Lo escribe el efecto junto con el
       estado, para que no haya dos fuentes de verdad. */
    <div ref={raiz} className="i-flotantes" data-flota="oculto" inert>
      {/* La pregunta del cliente: la burbuja y nada más. El canal se reconoce
          por el verde y por la cola; un nombre o una hora sería explicar un
          dibujo que se explica solo. */}
      {/* Quién pregunta va en texto para lectores y no en `aria-label`: un
          `<p>` no tiene rol que lo nombre, y la etiqueta no se anunciaba. */}
      <p className="i-flota i-flota-burbuja">
        <span className="i-solo-lectores">{CLIENTE_MUESTRA} pregunta: </span>
        {PREGUNTA_CLIENTE_MUESTRA.texto}
        {/* La hora adentro, abajo a la derecha, como en el chat. */}
        <span className="i-flota-hora i-cifra">
          {PREGUNTA_CLIENTE_MUESTRA.hora}
        </span>
        {/* La cola, dibujada: un triángulo que sale del borde inferior derecho
            hacia el informe. */}
        <svg
          className="i-flota-cola"
          width="9"
          height="9"
          viewBox="0 0 9 9"
          aria-hidden="true"
        >
          <path d="M0 0v9h9z" fill="currentColor" />
        </svg>
      </p>

      {/* La tarjeta, en su instancia flotante: sobre el margen de página que
          queda a la izquierda del documento, sólo donde ese margen la banca
          (desde 1396). Por debajo la muestra la columna de la acción del
          héroe; ver la cabecera de `Aprobacion.tsx`. */}
      <Aprobacion
        className="i-flota i-flota-aprobado"
        aprobado={aprobado}
        onAprobar={onAprobar}
        onVolver={onVolver}
      />
    </div>
  );
}
