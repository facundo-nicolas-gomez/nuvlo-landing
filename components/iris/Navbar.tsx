"use client";

import Link from "next/link";
import { BOTONES_LEGALES } from "@/lib/botones-legales";
import { Fragment, useEffect, useRef, useState } from "react";
import { Boton, Wordmark } from "./Piezas";

/**
 * LA NAVEGACIÓN.
 *
 * ── PEGADA, Y CLARA DE PUNTA A PUNTA (dueño, 19/09/2026) ───────────────────
 * Es una hoja clara todo el scroll. Al bajar toma el difuminado y el filete de
 * abajo; el atributo que la viste se escribe desde el evento de scroll y no
 * desde el render, así el HTML del build es el mismo que el del cliente.
 *
 * Hasta hoy hacía dos cosas más, y las dos se fueron con la misma orden
 * —«volvela clara»—: arrancaba TRANSPARENTE sobre el campo del héroe y se daba
 * vuelta a noche encima de los dos tramos oscuros. Eso último costaba tres
 * `elementsFromPoint` por cuadro —hacían falta: el Cierre es un telón `sticky`
 * detrás de `main`, así que su rectángulo dice que está en pantalla mucho antes
 * de que se vea, y sólo esa API contesta qué se está pintando—. Clara siempre,
 * la pregunta no existe: se fueron el atributo, sus quince reglas de CSS y los
 * tres sondeos por cuadro.
 *
 * ── LA SECCIÓN ACTIVA ───────────────────────────────────────────────────────
 * Un `IntersectionObserver` sobre las secciones que la barra nombra marca el
 * enlace activo: dentro de la pista, el enlace se levanta como una hoja (ver
 * «La pista» más abajo).
 *
 * ── DOS GRUPOS, NO TRES PISTAS (10/09/2026) ─────────────────────────────────
 * La barra era una grilla de `1fr auto 1fr` con los enlaces centrados en la
 * pista del medio. Hoy son dos bloques: **marca y navegación juntas a la
 * izquierda, en el mismo eje**, y las acciones a la derecha. Pedido del dueño, y
 * dice mejor lo que la barra es: quién es esto y adónde se puede ir, contra qué
 * se puede hacer. Un centrado obliga además a que el ancho de los enlaces no
 * mueva la marca, que es una restricción que nadie pidió.
 *
 * ── DOS ACCIONES, DOS VERBOS (14/09/2026) ───────────────────────────────────
 * «Ingresar» es para quien ya tiene cuenta: control de texto sin borde, a la
 * raíz del panel y sin atribución (no es el alta). La raíz resuelve sola: con
 * sesión va al tablero, sin sesión al login. «Empezar gratis» sigue siendo el
 * único CTA, por `PanelLink`.
 *
 * Se llamaba «Entrar al panel», y el dueño leía las dos acciones como «dos
 * botones que van casi al mismo lado»: «Entrar» y «Empezar» arrancan igual,
 * miden lo mismo (125 contra 130px) y los dos iban a panel.nuvloapp.com.
 * «Ingresar» cambia la inicial, es el verbo con que LatAm entra a un banco o a
 * Mercado Libre, y es la palabra con que el login del panel se titula: el
 * control y la pantalla a la que lleva dicen lo mismo.
 *
 * ── EN MÓVIL, SIN MENÚ (14/09/2026) ─────────────────────────────────────────
 * Había un `<details>` con las tres anclas y «Entrar al panel» adentro: quien
 * volvía desde el teléfono tenía que adivinar que el ingreso estaba detrás de
 * un ícono. Con el menú, las cuatro piezas no entraban a 360px. Ahora la barra
 * es marca, «Ingresar» y el CTA: las dos acciones a la vista en todo ancho. Las
 * anclas siguen en el pie, y Precios queda a un toque desde el héroe («Ver
 * precios», en `Heroe.tsx`). Es decisión del dueño que sólo en móvil las tres
 * anclas dejen la barra.
 */

/**
 * Las anclas son absolutas —`/#pasos` y no `#pasos`— desde el 11/09/2026,
 * cuando esta barra pasó a coronar también las tres páginas legales. En la home
 * el navegador ve que el documento es el mismo y hace navegación de fragmento
 * igual que con el ancla pelada; en una legal, lleva a la home y cae en la
 * sección. Sin prop «estoy en la home», que es una que alguien se olvida.
 *
 * Lo demás de esta barra ya sabía funcionar sin las secciones: el observador
 * filtra los `id` que no existen y la barrita de «acá estás» se apaga sola,
 * que es exactamente lo que corresponde en una página que no es el recorrido.
 */
const ENLACES = [
  { texto: "Cómo funciona", href: "/#pasos", id: "pasos" },
  // «Aprobar» y no «Aprobación» (24/09/2026): la palabra larga partía la fila
  // en dos renglones a 1.100, donde con los botones legales sobran 44px.
  { texto: "Aprobar", href: "/#control", id: "control" },
  { texto: "Precios", href: "/#precios", id: "precios" },
];

const PANEL = "https://panel.nuvloapp.com";

/* ── LOS DOS BOTONES QUE PIDE LA LEY YA NO ESTÁN ACÁ (dueño, 19/09/2026) ────
   Acá vivían el «Botón de arrepentimiento» y el «Botón de baja de servicio»,
   primero en una franja propia arriba de la fila y después adentro de la fila.
   El dueño los sacó de la barra.

   Queda anotado qué se pierde, porque no es una decisión de diseño: la
   Disposición 954/2025 de la Subsecretaría de Defensa del Consumidor —derogó la
   Resolución 424/2020— los exige «a simple vista, en lugar destacado y en el
   primer acceso», y la barra era la única pieza presente en toda la página y en
   las tres legales. Siguen en el pie (`Pie.tsx`), que es donde estaban además
   de acá, pero el pie no se ve al entrar: eso era exactamente lo que la barra
   resolvía. Los formularios están en el panel, que es el que tiene backend para
   dar el código de identificación en el acto. */

/**
 * ── UNA PASTILLA QUE VIAJA, NO SEIS QUE SE PRENDEN (13/09/2026) ─────────────
 * El hover era un fondo por enlace que aparecía y desaparecía en el lugar: al
 * cruzar la fila con el mouse, tres parpadeos. Ahora es UNA pastilla que se
 * desliza hasta el enlace que está debajo del puntero y se apaga al salir de
 * la navegación. Se mueve escribiendo variables de CSS en el nodo desde el
 * evento, sin estado de React: la barra no re-renderiza por cada movimiento del
 * mouse.
 *
 * ── LA PISTA (16/09/2026) ───────────────────────────────────────────────────
 * El dueño veía la barra «muy básica» y eligió, en modo live, las tres anclas
 * dentro de una pista hundida, como un control segmentado del panel, con un
 * divisor entre la marca y la pista. La pastilla del hover pasa a ser una hoja
 * blanca con filete, y la sección activa también: el enlace activo se levanta
 * como hoja dentro de la pista. La raya de tinta que marcaba «acá estás» se fue
 * con ese cambio: dos marcas para lo mismo eran una de más.
 */
function ubicar(
  capa: HTMLElement | null,
  destino: HTMLElement | null,
  prefijo: string,
) {
  if (!capa) return;
  if (!destino) {
    delete capa.dataset[prefijo];
    return;
  }
  const oculta = !(prefijo in capa.dataset);
  capa.style.setProperty(`--${prefijo}-x`, `${destino.offsetLeft}px`);
  capa.style.setProperty(`--${prefijo}-ancho`, `${destino.offsetWidth}px`);
  // Si estaba apagada, la posición nueva se asienta ANTES de encenderla: con
  // las dos cosas en el mismo cuadro, la transición de posición corría igual
  // y la pieza aparecía viajando desde el primer enlace. Leer una medida fuerza
  // ese asiento.
  if (oculta) void capa.offsetWidth;
  capa.dataset[prefijo] = "";
}

export function Navbar() {
  const barra = useRef<HTMLElement>(null);
  const enlaces = useRef<HTMLElement>(null);
  const [activa, setActiva] = useState<string | null>(null);

  useEffect(() => {
    const nodo = barra.current;
    if (!nodo) return;

    let pedido = 0;
    const vestir = () => {
      // Se viste cuando la franja legal terminó de irse: antes de eso la fila
      // todavía está sobre el campo del héroe y un filete abajo la cortaría.
      if (window.scrollY > 24) nodo.dataset.pegada = "";
      else delete nodo.dataset.pegada;

      // ── Y NO SE DA VUELTA MÁS (dueño, 19/09/2026: «volvela clara») ───────
      // Acá vivía la inversión: tres `elementsFromPoint` por cuadro debajo del
      // borde de la barra para saber si lo que pasa por abajo es noche, y en
      // ese caso darla vuelta. El dueño la quiere clara siempre, así que se fue
      // el atributo, se fueron sus quince reglas de CSS y se fueron los tres
      // sondeos por cuadro. La barra es una hoja y lo que pasa por debajo pasa
      // por debajo: para eso está el difuminado.
    };

    const alCuadro = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        vestir();
      });
    };
    vestir();
    window.addEventListener("scroll", alCuadro, { passive: true });
    window.addEventListener("resize", alCuadro, { passive: true });

    // La sección activa: la que cruza la franja alta de la pantalla.
    const secciones = ENLACES.map((e) => document.getElementById(e.id)).filter(
      (s): s is HTMLElement => s !== null,
    );
    // ── LA BARRITA SE APAGA CUANDO NO ESTÁS EN NINGUNA DE LAS TRES ──────────
    // La barra nombra tres secciones y la página tiene siete con `id`. Con
    // `setActiva` escribiendo sólo al entrar, el último valor se quedaba
    // pegado: en El entregable marcaba «Control», y en Preguntas y en el
    // Cierre marcaba «Precios». Medido, el 47% del scroll con la barrita
    // señalando una sección que no era la que el visitante estaba leyendo
    // (quinta crítica, 08/09/2026).
    //
    // Un «acá estás» que miente la mitad del recorrido es peor que no tener
    // ninguno, así que ahora se lleva el conjunto de las que cruzan la franja
    // y se apaga cuando queda vacío. No se sumó una cuarta ancla: las tres son
    // las que el dueño eligió, y el arreglo es que digan la verdad, no que
    // sean más.
    const cruzando = new Set<string>();
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) cruzando.add(e.target.id);
          else cruzando.delete(e.target.id);
        }
        // En orden de documento, para que dos secciones cruzando a la vez
        // resuelvan siempre igual y no según el orden en que llegó el lote.
        const enFranja = ENLACES.find((e) => cruzando.has(e.id));
        setActiva(enFranja ? enFranja.id : null);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    secciones.forEach((s) => observador.observe(s));

    // La pastilla del hover. `pointerover` burbujea, así que un solo oyente en
    // la navegación alcanza para los tres enlaces. Sólo con un puntero fino: en
    // táctil el hover llega con el toque y sería un destello antes de navegar,
    // y con teclado el foco ya tiene su anillo —animar lo que se hace con
    // teclado lo vuelve lento—.
    const nav = enlaces.current;
    const fino = window.matchMedia("(hover: hover) and (pointer: fine)");
    const alPasar = (e: Event) => {
      if (!fino.matches) return;
      const enlace = (e.target as Element | null)?.closest<HTMLElement>(
        ".i-nav-enlace",
      );
      if (enlace) ubicar(nav, enlace, "pastilla");
    };
    const alSalir = () => ubicar(nav, null, "pastilla");
    nav?.addEventListener("pointerover", alPasar);
    nav?.addEventListener("pointerleave", alSalir);

    return () => {
      window.removeEventListener("scroll", alCuadro);
      window.removeEventListener("resize", alCuadro);
      nav?.removeEventListener("pointerover", alPasar);
      nav?.removeEventListener("pointerleave", alSalir);
      if (pedido) window.cancelAnimationFrame(pedido);
      observador.disconnect();
    };
  }, []);

  return (
    <>
      <header ref={barra} className="i-nav">
        {/* Primera parada del teclado: se saltea la barra entera. Apunta a `main`,
          que lleva ese id en la home y en las tres legales. */}
        <a className="i-saltar" href="#contenido">
          Saltar al contenido
        </a>
        <div className="i-marco i-nav-fila">
          {/* Marca y navegación son UN grupo, en el mismo eje: la barra son dos
            bloques —quién es esto y adónde se puede ir— contra las acciones.
            Antes los enlaces iban centrados en su propia pista de la grilla. */}
          <div className="i-nav-grupo">
            <Wordmark />
            <span className="i-nav-divisor" aria-hidden="true" />

            <nav ref={enlaces} className="i-nav-enlaces" aria-label="Secciones">
              <span className="i-nav-pastilla" aria-hidden="true" />
              {ENLACES.map((e) => (
                <Link
                  key={e.href}
                  className="i-nav-enlace"
                  data-seccion={e.id}
                  href={e.href}
                  data-activo={activa === e.id ? "" : undefined}
                  aria-current={activa === e.id ? "location" : undefined}
                >
                  {e.texto}
                </Link>
              ))}
            </nav>

            {/* ── LOS DOS BOTONES DE LA NORMA, DEL LADO OPUESTO A LAS ACCIONES ──
              Vuelven a la barra el 19/09/2026, después de haber estado en una
              franja propia, adentro de la fila, en el renglón fino del héroe y un
              rato en ningún lado. El dueño los quiso «del lado opuesto a las
              acciones»: van al final del grupo de la izquierda, o sea lo más lejos
              posible del CTA sin salirse de la fila.

              La Disposición 954/2025 los pide «a simple vista, en lugar destacado y
              en el primer acceso», y la barra es la única pieza que está en las
              cinco páginas y en todo el scroll. Por eso vuelven acá y no al héroe:
              el héroe es una sola página.

              En la tinta fina y sin pista: no son navegación del sitio ni una
              acción, son la letra chica que la norma manda mostrar. Por debajo del
              ancho donde la fila deja de tenerlos se apagan; `.i-nav-legales` en
              `secciones.css` dice cuál es ese ancho y qué se pierde. */}
            <p className="i-fino i-nav-legales">
              <Legales />
            </p>
          </div>

          {/* Las acciones en una pista gemela de la de las anclas (16/09/2026):
            ver `.i-nav-acciones` en secciones.css. */}
          <div className="i-nav-acciones">
            <a className="i-nav-entrar" href={PANEL}>
              Ingresar
            </a>
            <Boton chico>Empezar gratis</Boton>
          </div>
        </div>
      </header>

      {/* ── Y CUANDO LA FILA NO PUEDE CON ELLOS, VAN ABAJO (20/09/2026) ─────
          Por debajo de 1100 los dos botones no entran en la fila —medido: pide
          976px y a 1024 le faltan seis— y hasta hoy simplemente se apagaban. Eso
          dejaba al sitio cumpliendo la Disposición 954/2025 en escritorio y no en
          teléfono, que es la única línea de incumplimiento que `PRODUCT.md`
          registra.

          Acá bajan a un renglón propio, y la decisión que importa es que va EN EL
          FLUJO y no pegado: la norma pide «a simple vista, en lugar destacado y en
          el primer acceso», y las tres se cumplen apareciendo arriba de todo al
          entrar. Ninguna pide que sobreviva al scroll. Pegado le comería 44px a
          cada pantalla de teléfono para siempre; en el flujo se va con la página.

          Y va como HERMANO de la barra, no adentro: adentro sumaría altura a la
          fila pegada, que es exactamente la franja que el dueño rechazó el 19/09.
          Ésta es otra pieza —sólo existe donde la barra no da, y no es pegada—.

          Se duplica el marcado a propósito. La copia que no corresponde está en
          `display: none`, que la saca del árbol de accesibilidad, así que un lector
          de pantalla ve una sola. La alternativa era moverlos de padre con CSS, que
          no se puede. */}
      <p className="i-fino i-legales-franja">
        <Legales />
      </p>
    </>
  );
}

/* Los dos botones que la Disposición 954/2025 manda mostrar. Viven en dos
   lugares según el ancho —la fila de la barra o el renglón de abajo— y por eso
   son una pieza: el texto y los destinos se escriben una vez. */
function Legales() {
  return (
    <>
      {BOTONES_LEGALES.map((b, n) => (
        <Fragment key={b.href}>
          {n > 0 && <span aria-hidden="true"> · </span>}
          <a className="i-nav-legal-enlace" href={b.href}>
            {b.texto}
          </a>
        </Fragment>
      ))}
    </>
  );
}
