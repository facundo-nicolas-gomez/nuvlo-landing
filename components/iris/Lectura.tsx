"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Entra } from "./Entra";
import { Reporte } from "./Reporte";
import { medirRenglones, parteRenglon, type Renglon } from "./renglones";

/**
 * LA LECTURA — el informe, parte por parte.
 *
 * ── EL PEDIDO (dueño, 13/09/2026) ───────────────────────────────────────────
 * «El reporte completo a la vista, y a medida que avanzo se va iluminando la
 * parte de la que habla el texto del otro lado. […] el scroll dispara el cambio
 * de estado, no controla el frame de la animación. Scroll-triggered, no
 * scroll-driven. El documento nunca se muestra entero y estático.»
 *
 * ── LO QUE NO FUNCIONÓ, EN ORDEN ────────────────────────────────────────────
 * 1. El informe en su navegador con una franja de luz: «se siente vacía; que
 *    el cambio entre partes sea movimiento real, no sólo iluminar».
 * 2. Seis hojas sueltas en pila sobre la noche: «mucho espacio vacío sin texto
 *    que lo justifique, y todo resuelto con tarjetas sueltas».
 * 3. El plano anotado con cota y foco de cámara: las partes fuera de foco se
 *    desenfocaban y se velaban, y eso se leía como un render roto; el titular
 *    se iba con el scroll y dejaba un escenario con la columna izquierda vacía
 *    y un vidrio con canto duro sobre el margen de la hoja. Pasada de
 *    elevación: «una sección original dedicada al reporte, mostrando sus
 *    partes. Nada estático ni tarjetas iguales pegadas.»
 *
 * ── LA LÁMINA QUE SE LEVANTA ────────────────────────────────────────────────
 * La hoja es UNA, entera, sobre un haz de luz en la noche. Lo que se mueve es
 * la lectura: cuando cambia la parte, la hoja viaja hasta traerla al centro y
 * esa parte se LEVANTA del papel —una lámina blanca, un punto más grande, con
 * sombra propia— mientras el resto del documento queda escrito en fantasma
 * sobre el mismo blanco. No hay desenfoque ni velo gris: el papel sigue siendo
 * papel, y lo que cambia es qué parte está arriba.
 *
 * A la izquierda, la escena entera y no un hueco: el titular, la bajada y una
 * guía vertical con las partes dichas como frases. La activa se despliega
 * con su explicación y un trazo de luz baja por el riel hasta ella. Cada frase
 * es un botón: tocarla lleva el scroll hasta esa parte, así que la guía es
 * también un índice.
 *
 * Nada de esto lee la posición del scroll por cuadro: una marca invisible por
 * parte reparte el recorrido, un `IntersectionObserver` avisa cuál cruzó la mitad de
 * la pantalla, y lo demás son transiciones de CSS.
 *
 * ── SIN ESTADO DE REACT ─────────────────────────────────────────────────────
 * Las medidas se escriben en variables de CSS y en atributos `data-` desde los
 * avisos del observador, como `PanelLink` escribe su `href`. Sin JavaScript se
 * ven la guía completa con todas las explicaciones y la hoja desde arriba, que
 * es contenido completo. La hoja es un dibujo que la guía describe.
 */

type Parte = "encabezado" | "resumen" | "cifras" | "tabla" | "plan" | "cierre";

/**
 * ── SE CORTÓ A TRES Y VOLVIÓ A SEIS, EL MISMO DÍA (18/09/2026) ──────────────
 * La sección medía 2.366px en escritorio explicando parte por parte un documento
 * que el héroe ya mostró entero, así que se cortó a las tres partes que ninguna
 * otra sección demuestra mejor: se fueron «Acá escribe la IA» (lo prueba
 * Criterio con el prompt literal), «Hasta tres acciones» (ídem) y «Y lo firmás
 * vos» (lo dibuja el conmutador de Precios, en vivo).
 *
 * **El dueño lo revirtió, y el argumento es mejor que el mío.** Esta sección se
 * llama «El informe, parte por parte»: su contrato con el visitante es la
 * COMPLETITUD, no la selección. Con tres de seis, lo que se pregunta no es «qué
 * dice cada parte» sino «por qué estas tres y no las otras» — y el informe que
 * está al lado tiene visiblemente más. La no-repetición era mi criterio; el de
 * la sección es recorrer el documento entero.
 *
 * La lección, que vale más que la sección: **acortar quitando ítems de una
 * enumeración rompe la promesa de la enumeración.** Si hay que acortar, se
 * acorta cada parte, o se acorta el scroll que cada una ocupa, o se va la
 * sección entera —como se fue el Tablero—; lo que no se hace es dejarla a medias
 * y que se note.
 *
 * Lo único que quedó de aquella tanda es `--pasos`, y eso porque es una mejora
 * aparte: el alto salía de tres números escritos a mano en el CSS —5 en la
 * pista, 6 en las marcas, 5 en la cola de teléfono— y ahora los tres salen de
 * `PASOS.length`. Con seis partes da exactamente la geometría de siempre.
 */
const PASOS: {
  parte: Parte;
  titulo: string;
  texto: string;
}[] = [
  {
    parte: "encabezado",
    // ── CAMBIÓ CON LA BANDA DE MARCA (19/09/2026) ────────────────────────
    // Decía «Arriba, tu cliente» y cerraba con «Es lo primero que lee cuando
    // abre el enlace». Con el membrete de la agencia encabezando el documento
    // —adoptado en el panel ese mismo día— las dos mitades dejaron de ser
    // verdad: lo primero que lee es el nombre del trafficker.
    //
    // La corrección no debilita la sección, la fortalece: el cuarto principio
    // de `PRODUCT.md` dice que el entregable es del trafficker y no de Nuvlo, y
    // un membrete con su nombre arriba de todo es la prueba más literal de eso
    // que el documento puede dar. El cliente no se pierde, baja un renglón.
    titulo: "Arriba, tu marca.",
    texto:
      "Tu nombre encabeza el informe. Debajo, el de tu cliente y el período, comparado con el anterior del mismo largo.",
  },
  {
    parte: "resumen",
    titulo: "Acá escribe la IA.",
    texto:
      "Dos párrafos y, si hace falta, una alerta. Cada número que menciona ya estaba calculado cuando empezó a escribir.",
  },
  {
    parte: "cifras",
    titulo: "Cuatro cifras que calcula Nuvlo.",
    texto:
      "Inversión, conversaciones, costo por conversación y CTR. El color de la variación lo decide el negocio: que la inversión suba no es verde.",
  },
  {
    parte: "tabla",
    titulo: "El detalle, contra el mes anterior.",
    texto:
      "Si falta un dato, raya. Si el anterior fue cero, «Sin base»; si el cambio redondea a cero, «Estable». Nunca un cero inventado.",
  },
  {
    parte: "plan",
    titulo: "Hasta tres acciones.",
    texto:
      "Lo que el informe recomienda hacer el mes que viene, sin sumar una sola cifra nueva.",
  },
  {
    parte: "cierre",
    titulo: "Y lo firmás vos.",
    texto:
      "Cierra con el nombre de tu agencia. En Estándar agrega «Generado con Nuvlo»; en Marca Blanca, nada más.",
  },
];

/** Cuánto aire deja la hoja arriba y abajo cuando ya no puede centrar la parte. */
const TOPE_HOJA = 40;

/**
 * ── EL CORTE DE ABAJO NO PARTE RENGLONES (dueño, 18/09/2026: «el informe abajo
 *    se ve cortado») ────────────────────────────────────────────────────────
 * La hoja es más alta que el escenario, así que abajo siempre hay un corte. El
 * corte en sí es la decisión de la sección —y por eso no lleva máscara: fundir
 * blanco contra negro dejaba franjas grises—, pero **dónde cae no era decisión
 * de nadie**: salía del centrado de la parte activa. Medido, caía en el peor
 * lugar posible: a 1440 partía al medio la fila de chips de variación, y a 390
 * —donde el escenario mide 56svh y el corte queda en la MITAD de la pantalla,
 * no en el borde— partía la frase «Si sigue en esa».
 *
 * Es la misma regla que ya ganó el héroe, y vive con él en `renglones.ts`: el
 * corte se corre unos píxeles hasta no partir ningún renglón. Acá es más débil a
 * propósito —el héroe elige el hueco entre bloques; este corte no puede elegir
 * su lugar, sólo puede negarse a partir una línea— y el tope es chico para que
 * la parte activa siga centrada.
 *
 * Sólo el corte de abajo: el de arriba lo hace la barra, que desde el 18/09/2026
 * tiene su propia línea, y correrlo comería el aire de `TOPE_HOJA` que la última
 * parte necesita para que la firma no quede pegada al borde.
 */
const TOPE_CORTE = 44;

/**
 * Cuánto aire se le pide al corte además de no partir el renglón. La parte
 * activa lleva `scale(1.02)` (`secciones.css`) y los renglones se miden en
 * estado neutro, así que lo dibujado se corre hasta unos 7px respecto de la
 * medida en el bloque más alto del informe —la tabla—. Sin esta holgura el
 * corte caía limpio en la medida y partido en la pantalla: medido a 390, la
 * cuarta parte cortaba «Datos de Meta Ads · período anterior».
 *
 * Es una holgura y no una preferencia: si con ella no hay lugar, se busca otra
 * vez sin ella antes de resignar el ajuste.
 */
const HOLGURA_CORTE = 7;

export function Lectura() {
  const seccion = useRef<HTMLElement>(null);
  const escenario = useRef<HTMLDivElement>(null);
  const hoja = useRef<HTMLDivElement>(null);
  const guia = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const raiz = seccion.current;
    const marco = escenario.current;
    const papel = hoja.current;
    const lista = guia.current;
    if (!raiz || !marco || !papel || !lista) return;

    const marcas = Array.from(
      raiz.querySelectorAll<HTMLElement>("[data-lectura-marca]"),
    );
    const pasos = Array.from(lista.querySelectorAll<HTMLElement>("li"));
    const rayas = Array.from(
      raiz.querySelectorAll<HTMLElement>(".i-lectura-progreso span"),
    );
    const partes = PASOS.map((p) =>
      papel.querySelector<HTMLElement>(`[data-parte="${p.parte}"]`),
    );
    let actual = 0;

    // Los renglones de la hoja, en coordenadas de la hoja. La medida es
    // invariante a la transformación: `translateY` corre la hoja y sus renglones
    // por igual, así que la resta se cancela y no hace falta sacar el transform
    // para medir (a diferencia del héroe, que sí ajusta una variable de CSS).
    let renglones: Renglon[] = [];
    const medirHoja = () => {
      renglones = medirRenglones(papel, papel.getBoundingClientRect().top);
    };

    // ── LA NOTA AL MARGEN (16/09/2026) ──────────────────────────────────────
    // Una línea sale del título activo de la guía y termina en una llave
    // dibujada afuera del papel, del alto de la parte de la que habla. Las dos
    // columnas se pegan a la misma altura, así que la capa de la nota —pegada
    // también— comparte coordenadas con las dos. Se mide sólo mientras la guía
    // se pliega y la hoja viaja después de un cambio: menos de un segundo, no
    // cada cuadro de scroll.
    const capa = raiz.querySelector<HTMLElement>(".i-lectura-notas");
    const linea = capa?.querySelector<SVGPathElement>(".i-lectura-nota-linea");
    const llave = capa?.querySelector<SVGPathElement>(".i-lectura-nota-llave");
    const nudo = capa?.querySelector<SVGCircleElement>(".i-lectura-nota-nudo");
    let bucle = 0;
    const contador = raiz.querySelector<HTMLElement>(".i-lectura-contador-n");

    const trazar = () => {
      if (!capa || !linea || !llave || !nudo || capa.offsetParent === null) return;
      const titulo = pasos[actual]?.querySelector<HTMLElement>(".i-lectura-titulo");
      const parte = partes[actual];
      if (!titulo || !parte) return;

      const o = capa.getBoundingClientRect();
      const rango = document.createRange();
      rango.selectNodeContents(titulo);
      const renglon = rango.getClientRects()[0] ?? titulo.getBoundingClientRect();
      const b = parte.getBoundingClientRect();
      const papelBorde = papel.getBoundingClientRect().left - o.left;

      const sx = renglon.right - o.left + 14;
      const sy = renglon.top + renglon.height / 2 - o.top;
      const bx = papelBorde - 14;
      // La llave no sale de la capa: una parte más alta que la pantalla (la
      // tabla, en una ventana baja) se marca hasta el borde visible.
      const arriba = Math.min(o.height - 20, Math.max(10, b.top - o.top));
      const abajo = Math.max(arriba + 10, Math.min(o.height - 10, b.bottom - o.top));
      const by = (arriba + abajo) / 2;
      const kx = Math.max(sx + 12, bx - 22);
      const r = Math.min(10, Math.abs(by - sy) / 2);
      const signo = by >= sy ? 1 : -1;

      linea.setAttribute(
        "d",
        `M${sx} ${sy} H${kx - r} Q${kx} ${sy} ${kx} ${sy + signo * r} V${by - signo * r} Q${kx} ${by} ${kx + r} ${by} H${bx}`,
      );
      llave.setAttribute("d", `M${bx + 7} ${arriba} H${bx} V${abajo} H${bx + 7}`);
      nudo.setAttribute("cx", String(bx));
      nudo.setAttribute("cy", String(by));
    };

    const seguir = () => {
      cancelAnimationFrame(bucle);
      const hasta = performance.now() + 900;
      const cuadro = () => {
        trazar();
        if (performance.now() < hasta) bucle = requestAnimationFrame(cuadro);
      };
      cuadro();
    };

    const aplicar = (indice: number) => {
      actual = indice;
      const activa = partes[indice];
      if (!activa) return;

      // La parte activa al centro del escenario, pero la hoja no se despega del
      // borde de ARRIBA: encima del encabezado quedaría noche vacía.
      // `offsetTop` es la posición de maqueta, sin transformaciones, así que la
      // cuenta no depende de dónde quedó la hoja antes.
      //
      // ── ABAJO NO LLEVA TOPE, Y ANTES SÍ (dueño, 20/09/2026) ─────────────
      // El piso era `alto - TOPE_HOJA - papel`, o sea la hoja no podía subir
      // más allá de dejar 40px de noche por debajo. Esos 40 eran la simetría
      // del tope de arriba, pero no hacen el mismo trabajo: arriba separan la
      // hoja de la barra, y abajo no separan de nada —el escenario recorta ahí
      // mismo—, así que lo único que producen es **un rectángulo negro pegado
      // al pie del informe** durante todo el último cuarto del recorrido. El
      // dueño lo marcó tres veces antes de que lo encontrara, porque no es el
      // relleno de la sección: es este número.
      //
      // Sin él, el pie de la hoja llega al canto del escenario y el documento
      // se corta contra el borde de la ventana, que es lo que la ficha del
      // escenario ya dice que tiene que pasar: «la hoja la cortan la barra y el
      // borde de la ventana, como cualquier documento que se está leyendo».
      const alto = marco.clientHeight;
      const centro = activa.offsetTop + activa.offsetHeight / 2;
      const deseado = alto / 2 - centro;
      const minimo = Math.min(TOPE_HOJA, alto - papel.offsetHeight);
      let y = Math.round(Math.max(minimo, Math.min(TOPE_HOJA, deseado)));

      // Dónde corta el borde de abajo del escenario, en coordenadas de la hoja.
      // Fuera de la hoja no corta nada: es el caso de las últimas partes, donde
      // el documento ya termina adentro del escenario.
      const corta = (v: number, holgura: number) => {
        const borde = alto - v;
        return (
          borde > 0 &&
          borde < papel.offsetHeight &&
          parteRenglon(renglones, borde, holgura)
        );
      };
      // Primero con holgura; si el documento no deja lugar, con la condición
      // pelada, que sigue siendo mejor que no corregir.
      for (const holgura of [HOLGURA_CORTE, 0]) {
        if (!renglones.length || !corta(y, holgura)) break;
        for (let d = 1; d <= TOPE_CORTE; d++) {
          if (y - d >= minimo && !corta(y - d, holgura)) { y -= d; break; }
          if (y + d <= TOPE_HOJA && !corta(y + d, holgura)) { y += d; break; }
        }
      }
      raiz.style.setProperty("--i-lectura-y", `${y}px`);

      partes.forEach((parte, j) => {
        if (!parte) return;
        if (j === indice) parte.dataset.activa = "";
        else delete parte.dataset.activa;
      });

      rayas.forEach((raya, j) => {
        raya.dataset.lugar = j === indice ? "activa" : j < indice ? "leida" : "falta";
      });

      if (contador && contador.textContent !== String(indice + 1).padStart(2, "0")) {
        contador.textContent = String(indice + 1).padStart(2, "0");
        // Reinicia la animación de entrada: sacar el atributo, forzar una
        // lectura de maqueta y volver a ponerlo.
        delete contador.dataset.cambio;
        void contador.offsetWidth;
        contador.dataset.cambio = "";
      }

      pasos.forEach((paso, j) => {
        paso.dataset.lugar = j === indice ? "activa" : j < indice ? "leida" : "falta";
        if (j === indice) paso.setAttribute("aria-current", "step");
        else paso.removeAttribute("aria-current");
      });
      // El trazo de luz del riel no se mide: cada paso dibuja su tramo, del
      // punto propio al siguiente, y se enciende entero cuando ya se leyó. Medir
      // en el momento del cambio daba la posición vieja, porque el paso que se
      // pliega todavía no terminó de plegarse.
      seguir();
    };

    raiz.dataset.abierta = "";
    medirHoja();
    aplicar(0);
    // La hoja usa la familia del sistema: hasta que la fuente carga, los
    // renglones están en otro lado y el corte se correría al lugar equivocado.
    document.fonts?.ready
      .then(() => {
        medirHoja();
        aplicar(actual);
      })
      .catch(() => {});
    // El primer estado se escribe sin transición. Recién después del primer
    // cuadro se habilita el movimiento.
    const listo = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        raiz.dataset.lista = "";
      }),
    );

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          const indice = marcas.indexOf(entrada.target as HTMLElement);
          if (indice >= 0 && indice !== actual) aplicar(indice);
        }
      },
      { rootMargin: "-50% 0px -49% 0px" },
    );
    marcas.forEach((m) => observador.observe(m));

    const medida = new ResizeObserver(() => {
      medirHoja();
      aplicar(actual);
    });
    medida.observe(marco);
    medida.observe(papel);

    // Tocar una frase de la guía lleva el scroll hasta su marca: la marca queda
    // en la mitad de la pantalla, que es donde el observador la ve cruzar.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const alTocar = (e: Event) => {
      const boton = (e.target as Element | null)?.closest<HTMLElement>("[data-lectura-ir]");
      if (!boton) return;
      const marca = marcas[Number(boton.dataset.lecturaIr)];
      if (!marca) return;
      const r = marca.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + r.top + r.height / 2 - window.innerHeight / 2,
        behavior: reduce.matches ? "auto" : "smooth",
      });
    };
    lista.addEventListener("click", alTocar);

    // Y una vez más cuando la hoja o la guía terminan de moverse: si el cuadro
    // se atrasó (una pestaña que vuelve, un equipo lento), la nota no queda
    // apuntando a donde estaba la parte a mitad de camino.
    papel.addEventListener("transitionend", trazar);
    lista.addEventListener("transitionend", trazar);

    return () => {
      papel.removeEventListener("transitionend", trazar);
      lista.removeEventListener("transitionend", trazar);
      cancelAnimationFrame(listo);
      cancelAnimationFrame(bucle);
      observador.disconnect();
      medida.disconnect();
      lista.removeEventListener("click", alTocar);
    };
  }, []);

  return (
    <section
      ref={seccion}
      className="i-seccion i-noche i-lectura"
      id="lectura"
      aria-labelledby="i-h-lectura"
      /* El alto de la sección, el de las marcas y el de la cola en teléfono
         salían los tres de un número escrito a mano en el CSS (5, 6 y 5). Al
         pasar de seis partes a tres había que acordarse de los tres. Ahora
         salen de acá, y cambiar `PASOS` alcanza. */
      style={{ "--pasos": PASOS.length } as CSSProperties}
    >
      <div className="i-marco i-lectura-pista">
        {/* Las marcas que reparten el recorrido, una por parte. No se ven. */}
        <div className="i-lectura-marcas" aria-hidden="true">
          {PASOS.map((p) => (
            <span key={p.parte} data-lectura-marca="" />
          ))}
        </div>

        <div className="i-lectura-lado">
          <Entra className="i-lectura-cabeza">
            <h2 id="i-h-lectura" className="i-display">
              El informe, parte por parte.
            </h2>
            <p className="i-bajada i-lectura-bajada">
              Lo que le llega a tu cliente, de arriba abajo: qué calcula Nuvlo,
              qué escribe la IA y qué firma sale al pie.
            </p>
            {/* La parte en la que se está, en grande y apagada. La guía ya lo
                dice para quien lee; esto lo dice de un vistazo. */}
            <p className="i-lectura-contador i-cifra" aria-hidden="true">
              <span className="i-lectura-contador-n">01</span>
              <span className="i-lectura-contador-total">/{String(PASOS.length).padStart(2, "0")}</span>
            </p>
          </Entra>

          <div className="i-lectura-guia-envoltura">
            {/* En teléfono la guía muestra sólo la parte activa; estas seis
                rayas dicen cuántas hay y en cuál se está. */}
            <div className="i-lectura-progreso" aria-hidden="true">
              {PASOS.map((p) => (
                <span key={p.parte} />
              ))}
            </div>

            <ol ref={guia} className="i-lectura-guia" aria-label="Partes del informe">
              {PASOS.map((p, i) => (
                <li
                  key={p.parte}
                  data-lugar={i === 0 ? "activa" : "falta"}
                  aria-current={i === 0 ? "step" : undefined}
                >
                  <button
                    type="button"
                    className="i-lectura-paso"
                    data-lectura-ir={i}
                  >
                    <span className="i-lectura-punto" aria-hidden="true" />
                    <span className="i-lectura-titulo">{p.titulo}</span>
                  </button>
                  <div className="i-lectura-despliegue">
                    <p className="i-lectura-texto">{p.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <p className="i-fino i-lectura-ejemplo">Ejemplo con datos ficticios</p>
        </div>

        <div className="i-lectura-escenario" ref={escenario}>
          {/* `i-hoja-clara`: ver `Control.tsx`. Todo papel blanco que viva
              adentro de `.i-noche` la lleva, y con ella recupera las tintas del
              campo claro. */}
          <div
            className="i-lectura-hoja i-hoja-clara"
            ref={hoja}
            aria-hidden="true"
          >
            <Reporte />
          </div>
        </div>

        {/* La nota al margen: la línea de la guía a la parte y la llave que la
            marca. Es un dibujo sobre las dos columnas; no se toca ni se lee. */}
        <div className="i-lectura-notas" aria-hidden="true">
          <svg className="i-lectura-nota-svg">
            <path className="i-lectura-nota-linea" />
            <path className="i-lectura-nota-llave" />
            <circle className="i-lectura-nota-nudo" r="3" />
          </svg>
        </div>

        <div className="i-lectura-cola" aria-hidden="true" />
      </div>
    </section>
  );
}
