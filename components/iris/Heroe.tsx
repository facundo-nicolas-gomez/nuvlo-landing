"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Boton } from "./Piezas";
import { Aprobacion } from "./Aprobacion";
import {
  CAMPANAS_MUESTRA,
  CUENTAS_META_MUESTRA,
  KPIS_MUESTRA,
  RESUMEN_MUESTRA,
  RUTA_REPORTE_MUESTRA,
} from "@/lib/reporte-muestra";

/**
 * EL HÉROE — EL ESCENARIO DE TRES CAPAS (dueño, 19/09/2026).
 *
 * Reemplaza al héroe de dos columnas —argumento a la izquierda, ventana del
 * informe a la derecha— que se iteró durante toda la pasada sin cerrar. El
 * dueño comparó seis direcciones en `/preview/heroe` y eligió ésta.
 *
 * ── LA FÓRMULA, Y DE DÓNDE SALE ─────────────────────────────────────────────
 * Es la de superhuman.com, medida en su página y no copiada de memoria: su héroe
 * no es la página sino un BLOQUE acotado con fondo propio, y adentro hay tres
 * capas con tratamientos distintos. La jerarquía sale del contraste entre capas,
 * no del tamaño:
 *
 *   atrás     mesh gradient desenfocado (`blur(56px)`)
 *   medio     el tablero de Meta Ads, LAVADO y recortado por los cantos del
 *             panel — es contexto: si se entiende cada número, compite
 *   adelante  UNA card nítida con sombra grande, que ROMPE el canto de la
 *             ventana y se sale hacia el gradiente. Ese solape es la
 *             profundidad; contenida adentro, se aplana todo
 *
 * ── TRES SLIDES, QUE SON LOS TRES PASOS DEL PRODUCTO ────────────────────────
 * No son features inventadas: `PRODUCT.md` define ese recorrido y la sección
 * «Tres pasos» ya lo cuenta. Cada uno tiene su línea, su card y su paleta; la
 * fórmula de capas no cambia.
 *
 * ── LO QUE NO ROTA, Y ES DECISIÓN DEL DUEÑO ─────────────────────────────────
 * El `h1`. El brief pedía que cambiara con el slide y eso dejaba a la página sin
 * UN titular —cambia lo que lee un lector de pantalla y lo que indexa un
 * buscador—, además de que una afirmación que cambia cada siete segundos no es
 * una afirmación. Llega como prop desde `Pagina.tsx`, o sea renderizado en el
 * servidor: la frontera de cliente no se movió.
 *
 * ── LO QUE SE PRESERVÓ DEL HÉROE ANTERIOR ───────────────────────────────────
 * El boceto de comparación tenía un botón falso y una tarjeta de aprobación
 * dibujada. Acá los dos son los de verdad:
 *
 *   - el CTA es `Boton`, que envuelve a `PanelLink` con su lista blanca de
 *     atribución. El alta del sitio es una sola y siempre pasa por ahí;
 *   - el slide 3 monta la `Aprobacion` real, con su estado. Apretar sigue
 *     cambiando la dirección del tablero, que es la única interacción de la
 *     página y lo que prueba el producto sin decirlo;
 * Lo que NO se preservó, y es a propósito: la burbuja del cliente. Era la única
 * voz humana del primer viewport, pero adentro de la pieza rompe la regla que
 * el brief pone como condición —UN solo foco por slide— y su conversación ya
 * vive entera en el Cierre. Una voz humana no vale una jerarquía rota.
 */

const DURACION = 7000;

const SLIDES = [
  {
    tab: "Conectar",
    nota: "Tu cuenta de Meta, una sola vez",
    linea:
      "La cuenta de Meta se conecta una sola vez. Después, cada reporte es elegir el período.",
  },
  {
    tab: "Nuvlo calcula",
    nota: "Los números, antes de que la IA escriba",
    linea:
      "Nuvlo hace los cálculos: la IA recibe los números ya hechos y no calcula ninguno.",
  },
  {
    tab: "Aprobar",
    nota: "Nada sale sin tu aprobación",
    linea:
      "El informe queda en borrador, a la espera de tu aprobación. Hasta entonces, sin enlace público y sin correo.",
  },
];

/**
 * La capa del medio: el Administrador de anuncios. Es el INSUMO, no el
 * entregable, y va lavado a propósito — el foco lo tiene la card.
 *
 * `aria-hidden`: es una reproducción decorativa de una pantalla ajena, y su
 * contenido ya lo dicen la línea del paso y la card. Un lector de pantalla no
 * gana nada leyendo una tabla de la que no se puede hacer nada.
 */
function Tablero({ aprobado }: { aprobado: boolean }) {
  return (
    <div className="i-esc-tablero" aria-hidden="true">
      <div className="i-esc-tablero-barra">
        <span className="i-esc-tablero-marca">Administrador de anuncios</span>
        {/* La dirección acusa el gesto: al aprobar, el informe deja de ser un
            borrador del panel y pasa a tener su página pública. */}
        <span className="i-esc-tablero-cuenta" data-estado={aprobado ? "publico" : "previa"}>
          {aprobado
            ? `panel.nuvloapp.com${RUTA_REPORTE_MUESTRA}`
            : `${CUENTAS_META_MUESTRA[0].nombre} · ${CUENTAS_META_MUESTRA[0].id}`}
        </span>
      </div>

      <div className="i-esc-tablero-cifras">
        {KPIS_MUESTRA.map((k) => (
          <div key={k.etiqueta} className="i-esc-tablero-cifra">
            <span>{k.etiqueta}</span>
            <strong className="i-cifra">{k.valor}</strong>
          </div>
        ))}
      </div>

      <table className="i-esc-tablero-tabla i-cifra">
        <thead>
          <tr>
            <th>Campaña</th>
            <th>Estado</th>
            <th>Inversión</th>
            <th>Conversaciones</th>
            <th>Costo por conv.</th>
          </tr>
        </thead>
        <tbody>
          {CAMPANAS_MUESTRA.map((c) => (
            <tr key={c.nombre}>
              <td>{c.nombre}</td>
              <td>{c.estado}</td>
              <td>{c.inversion}</td>
              <td>{c.conversaciones}</td>
              <td>{c.costo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Slide 1 · la IA escribiendo el resumen.
 *
 * ── SE ESCRIBE POR PALABRA, NO POR LETRA (dueño, 19/09/2026) ────────────────
 * Antes el texto salía de a cuatro caracteres y el frente lo marcaba un relleno
 * de gradiente sobre el párrafo entero. Eran dos defectos: el gradiente teñía
 * palabras completas que ya estaban escritas —«resaltados azules sueltos»— y
 * cortaba el color a mitad de palabra, que es lo que ninguna máquina hace.
 *
 * Ahora la unidad es la palabra, que es la unidad en la que un modelo de verdad
 * emite. Las cuatro del frente llevan acento y lo pierden a medida que el texto
 * avanza: el color viaja con la escritura en vez de quedarse encendido. Con
 * movimiento reducido el texto aparece entero y en tinta, sin frente que marcar.
 */
const PALABRAS_RESUMEN = RESUMEN_MUESTRA[0].split(" ");
/** Cuántas palabras del frente llevan color. Cuatro: menos no se lee como
 *  estela y más tiñe media card. */
const ESTELA = 4;

function CardInsight({ corriendo }: { corriendo: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!corriendo) return;
    // Sin `setN(0)`: la card se remonta con `key` al cambiar de slide, así que
    // el estado ya arranca en cero. Sincrónico acá es un render en cascada.
    let t = 0;
    const id = window.setInterval(() => {
      t += 1;
      setN(t);
      if (t >= PALABRAS_RESUMEN.length) window.clearInterval(id);
    }, 85);
    return () => window.clearInterval(id);
  }, [corriendo]);

  const hasta = corriendo ? n : PALABRAS_RESUMEN.length;

  return (
    <div className="i-esc-card i-hoja-clara">
      <p className="i-esc-card-rotulo">Resumen ejecutivo · escrito por la IA</p>
      <p className="i-esc-card-texto">
        {PALABRAS_RESUMEN.slice(0, hasta).map((palabra, j) => (
          <span
            key={j}
            /* La distancia al frente de escritura, en palabras. El CSS pinta
               las cuatro primeras y de ahí en más la palabra ya es tinta: el
               color viaja con el frente en vez de quedarse encendido. Sin
               atributo cuando el texto está completo —con movimiento reducido
               o terminado de escribir— porque entonces no hay frente. */
            data-frente={
              corriendo && hasta < PALABRAS_RESUMEN.length && hasta - 1 - j < ESTELA
                ? hasta - 1 - j
                : undefined
            }
          >
            {palabra}{" "}
          </span>
        ))}
      </p>
    </div>
  );
}

/** Slide 2 · lo que la IA RECIBE: los números ya hechos. Un solo foco. */
function CardCalculo() {
  return (
    <div className="i-esc-card i-hoja-clara">
      <p className="i-esc-card-rotulo">Lo que recibe la IA · ya calculado</p>
      <ul className="i-esc-calculo">
        {KPIS_MUESTRA.map((k) => (
          <li key={k.etiqueta}>
            <span>{k.etiqueta}</span>
            <strong className="i-cifra">{k.valor}</strong>
            <span className="i-esc-calculo-var" data-sentido={k.sentido}>
              {k.variacion}
            </span>
          </li>
        ))}
      </ul>
      <p className="i-esc-calculo-pie">
        La IA no computa ninguno: los recibe hechos y sólo los redacta.
      </p>
    </div>
  );
}

export function Heroe({ portada }: { portada: ReactNode }) {
  const [i, setI] = useState(0);
  /* Si hay movimiento permitido: lo decide el sistema operativo y es lo único
     que gobierna si el resumen se escribe solo. Hubo un segundo estado —si el
     carrusel avanza— mientras la lista de pasos llevaba barra de progreso;
     sacada la barra nadie lo leía, y un estado que nadie lee es un estado que
     se desincroniza sin que se note. Lo que frena el carrusel cuando el
     visitante toma el mando es el `clearInterval`, que es donde vive el hecho. */
  const [anima, setAnima] = useState(true);
  /* Bandera propia para la línea de tiempo, separada de `anima`: `anima`
     manda sobre la card del insight, que SÍ tiene que seguir andando cuando
     el visitante elige un paso a mano —es el contenido de ese paso—. Lo que
     se apaga es el reloj, no la escena. */
  const [auto, setAuto] = useState(true);
  const [aprobado, setAprobado] = useState(false);
  const temporizador = useRef(0);

  useEffect(() => {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducido.matches) {
      /* Asincrónico: apagarlo sincrónicamente adentro del efecto dispara un
         render en cascada — el componente ya se pintó con la bandera en true. */
      const apagar = window.setTimeout(() => {
        setAnima(false);
        setAuto(false);
      }, 0);
      return () => window.clearTimeout(apagar);
    }
    temporizador.current = window.setInterval(
      () => setI((x) => (x + 1) % SLIDES.length),
      DURACION,
    );
    return () => window.clearInterval(temporizador.current);
  }, []);

  /** Al tocar un tab el carrusel deja de avanzar solo: el visitante tomó el
   *  mando y seguir rotándole la pieza debajo sería pelearle. La barra de
   *  progreso se apaga con él, porque a partir de ahí no mide nada. */
  const tomarElMando = (n: number) => {
    window.clearInterval(temporizador.current);
    /* El comentario de arriba decía desde siempre que la barra se apaga con
       él, y el código no lo hacía: se perdió cuando se sacó la barra vieja y
       nadie lo notó porque no quedaba nada que apagar. Medido el 19/09/2026
       al volver a ponerla: el tramo seguía corriendo después del click. */
    setAuto(false);
    setI(n);
  };

  const s = SLIDES[i];

  return (
    /* ── LA BANDA VA A SANGRE, Y NO ADENTRO DE `.i-marco` (dueño, 19/09/2026:
       «tiene que ocupar todo el ancho») ────────────────────────────────────
       El escenario salió por primera vez como una bandeja: adentro del marco,
       con 40 de margen a cada lado y los cantos redondeados. Eso lo volvía un
       objeto APOYADO en la página, y la referencia hace lo contrario —su héroe
       es una banda de borde a borde y el resto del sitio empieza debajo—. Una
       bandeja se lee como una pieza más; una banda se lee como el lugar donde
       arranca el sitio, que es lo que tiene que pasar en el primer viewport.

       El marco baja un nivel: el fondo es de la pantalla y el CONTENIDO sigue
       midiendo lo que mide todo lo demás (`.i-esc-adentro`). Así la columna del
       argumento queda alineada con la barra y con las secciones de abajo, y lo
       único que se va del cuadro es la ventana, que es lo que tiene que irse.

       La barra no necesita nada: ya se viste sola muestreando qué se pinta
       debajo suyo y buscando `.i-noche`, que esta banda declara. */
    <div className="i-esc i-noche" id="inicio" data-slide={i}>
      {/* ── EL CAMPO VA COMO ELEMENTO, NO COMO PSEUDO (19/09/2026) ────────────
          El degradé del héroe vivió tres tandas en `.i-esc::before` y en las
          tres el dueño dijo que no se veía. No era el color ni el recorrido:
          `.i-noche::before` YA EXISTE —es la capa de grano, a `opacity: 0.14`
          y en `screen`— y las dos reglas caen sobre el mismo pseudo-elemento.
          Con igual especificidad ganaba mi `background`, pero heredaba la
          opacidad y el modo de fusión del grano: el degradé se pintaba al 14%.
          Medido, de x=0 a x=600 el fondo cambiaba cinco unidades.

          Y el daño iba en los dos sentidos: al pisar su `inset` y su `z-index`,
          el héroe se había quedado sin grano.

          Un elemento propio no puede colisionar con nadie. Es la lección cara
          de la tanda: un pseudo-elemento es un espacio de nombres compartido
          entre todas las clases que un nodo lleva encima. */}
      <div className="i-esc-campo" aria-hidden="true" />

      <div className="i-esc-adentro">
        {/* ── EL PANEL SALE DE LA GRILLA (dueño, 19/09/2026) ─────────────────
            Vivía adentro de `.i-esc-pieza`, o sea adentro de una celda de la
            fila, y ahí su alto era el de la fila: arrancaba debajo del aire de
            arriba del marco y quedaba flotando con un margen superior. El dueño
            lo pidió de canto a canto en vertical, y eso quiere decir que su alto
            no es el de una celda sino el del héroe.

            Pasa a colgar del marco y se ubica solo: la mitad derecha del ancho
            de contenido, desde el pie de la barra hasta el fondo de la banda.
            Va PRIMERO en el marcado para que la card —que vive en la celda y
            tiene que pisarlo— pinte encima sin depender sólo de su `z-index`.

            La celda `.i-esc-pieza` se queda: es lo que le da el alto a la fila
            y el sistema de coordenadas de la card. */}
        <div className="i-esc-panel">
          <div className="i-esc-mesh" aria-hidden="true" />
          <div className="i-esc-ventana i-hoja-clara">
            <Tablero aprobado={aprobado} />
          </div>
        </div>

        <div className="i-esc-fila">
          <div className="i-esc-texto">
            {portada}
            {/* Lo único que rota arriba: la línea del paso. */}
            <p className="i-esc-linea" key={i}>
              {s.linea}
            </p>
            <div className="i-esc-acciones">
              <Boton>Empezar gratis</Boton>
              {/* «Ver precios» se fue el 19/09/2026 por pedido del dueño: el
                  renglón fino del héroe tenía TRES enlaces —el atajo a Precios y
                  los dos botones de la norma— compitiendo con el único CTA que la
                  página tiene. Precios sigue a un toque desde la barra, que lo
                  nombra en todo ancho. */}
              <p className="i-chico i-esc-nota">
                <span className="i-cifra">3</span> reportes gratis, sin tarjeta.
              </p>
              {/* ── LOS DOS BOTONES DE LA NORMA SE FUERON DEL HÉROE ───────────
                  Pedido del dueño el 19/09/2026, unas horas después de haberlos
                  traído acá. Con esto **quedan sólo en el pie**, y eso NO es
                  neutro: la Disposición 954/2025 los pide «a simple vista, en
                  lugar destacado y en el primer acceso», y el pie no se ve al
                  entrar. Ese estado exacto ya se shippeó una vez por error y se
                  corrigió el mismo 19/09.

                  Queda anotado acá, y no sólo en los documentos, porque éste es
                  el archivo que alguien abre cuando vuelve a tocar el héroe: si
                  aparece un lugar del primer acceso donde los dos botones no le
                  disputen el renglón al CTA, ahí van. */}
            </div>
          </div>

          {/* La celda es el alto de la fila y el lugar de la card; el panel que
              la card pisa cuelga del marco, arriba. La card queda AFUERA del
              panel a propósito: adentro de una caja que recorta, el solape que
              le da la profundidad sería lo primero en cortarse. */}
          <div className="i-esc-pieza">
            {/* Un solo elemento adelante por slide: el foco no se comparte. */}
            <div className="i-esc-card-lugar" key={i}>
              {i === 0 ? (
                <CardInsight corriendo={anima} />
              ) : i === 1 ? (
                <CardCalculo />
              ) : (
                /* `i-hoja-clara`: es papel blanco adentro de la noche, y sin
                   declararlo sus tintas salen aclaradas sobre blanco. La regla
                   y sus dos precedentes están en `secciones.css`. */
                <Aprobacion
                  className="i-esc-aprobacion i-hoja-clara"
                  aprobado={aprobado}
                  onAprobar={() => setAprobado(true)}
                  onVolver={() => setAprobado(false)}
                />
              )}
            </div>
          </div>
        </div>

        {/* ── LA LÍNEA DE TIEMPO, QUE AHORA CORRE (dueño, 19/09/2026) ────────
            Los puntos se fueron y el tiempo pasa a decirlo la línea: el filete
            que abre cada paso se llena de izquierda a derecha mientras ese paso
            está corriendo, queda lleno cuando ya pasó y vacío si falta. Tres
            filetes, tres tramos, y el recorrido entero se lee de un vistazo.

            **Sí, es una barra de progreso, y el dueño sacó una esta misma mañana**
            —«parece la barra de progreso de un carrusel»—. La pidió dos veces
            igual, así que vuelve, pero no vuelve igual: aquella era TEAL y vivía
            SOBRE la fila activa, o sea el acento haciendo de scrubber encima del
            contenido. Ésta es hueso al 45 %, vive en el filete que ya existía y no
            agrega ni una línea nueva a la composición.

            `data-corriendo` lo apaga todo: con movimiento reducido y cuando el
            visitante toca un paso, la línea deja de correr y los tramos alcanzados
            quedan llenos. Es lo que el propio componente ya decía —«se apaga con
            él, porque a partir de ahí no mide nada»—. */}
        <div className="i-esc-tabs" data-corriendo={auto ? "" : undefined}>
          {SLIDES.map((x, n) => (
            <button
              key={x.tab}
              type="button"
              className="i-esc-tab"
              data-activo={n === i ? "" : undefined}
              data-lugar={n < i ? "leida" : n === i ? "activa" : "falta"}
              onClick={() => tomarElMando(n)}
            >
              <strong>{x.tab}</strong>
              <span>{x.nota}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
