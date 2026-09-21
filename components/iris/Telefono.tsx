import Image from "next/image";
import type React from "react";
import {
  AGENCIA_MUESTRA,
  ASUNTO_MAIL_MUESTRA,
  CUERPO_MAIL_MUESTRA,
  DESDE_MUESTRA,
  HASTA_MUESTRA,
  HORA_LECTURA_MAIL_MUESTRA,
  RECORRIDO_MUESTRA,
  SALUDO_MAIL_MUESTRA,
} from "@/lib/reporte-muestra";

/**
 * EL TELÉFONO — la bandeja de entrada del cliente, con el mail arriba de todo.
 *
 * ── DOS MOMENTOS, NO UNA REPETICIÓN ─────────────────────────────────────────
 * La ventana de al lado muestra el mail: las cabeceras, el cuerpo, el botón.
 * El teléfono muestra el momento anterior —el mail LLEGANDO—, que es el único
 * que la ventana no puede contar.
 *
 * Hasta el 08/09/2026 el teléfono mostraba el mismo mail abierto, y la sección
 * decía una sola cosa dos veces: el mismo saludo, el mismo período en negrita y
 * el mismo botón «Ver reporte completo», lado a lado y en el mismo scroll. Era
 * la sección más larga de la página —1249px en escritorio, 1644 en móvil— para
 * un solo hecho, y el aparato mejor terminado del build no aportaba un dato
 * nuevo (segunda crítica del 08/09/2026). Con la bandeja de entrada el teléfono
 * dice lo que ninguna otra pieza dice: **en la lista del cliente, el remitente
 * es la agencia**. Ése es el argumento entero de la sección, y es el instante en
 * que se decide si el mail se abre.
 *
 * ── EL MARCO ES EL SVG DE FIGMA, LA PANTALLA ES HTML A TAMAÑO REAL ──────────
 * El marco es el `iPhone 16 Plus Light.svg` que el dueño bajó de Figma a
 * `public/mockups/`, como imagen (copiado a `public/preview/` sin el fondo
 * blanco del frame). La pantalla es un div apoyado sobre el hueco del bisel
 * (en el viewBox de 415 × 843: x 11, y 8, 393 × 827, radio 54) y va ENCIMA
 * de la imagen, porque el SVG pinta la pantalla negra. La isla dinámica, la
 * cámara y los íconos de la barra de estado son los del SVG, tal como vienen
 * (dueño, 07/09/2026: «no los redibujes»): van en un segundo SVG con el
 * mismo viewBox, `iphone-16-plus-light-sobre.svg`, por encima de la
 * pantalla, y lo único que cambia es el color, de blanco a tinta, porque la
 * pantalla ya no es negra. La hora sí es texto: es la de la historia.
 *
 * A tamaño real: el aparato mide 415px y la pantalla 393, el ancho CSS de
 * un iPhone; la tipografía va en píxeles fijos, no escalada con el ancho.
 * Una primera versión de 236px con la letra en `em` se veía borrosa a 10px
 * (dueño, 07/09/2026). En pantallas angostas el aparato se achica al ancho
 * disponible y el texto REFLUYE con su cuerpo: no se escala.
 *
 * ── LO QUE MUESTRA ──────────────────────────────────────────────────────────
 * La barra de estado con la hora de lectura; el campo de búsqueda de Gmail con
 * el menú y el avatar del propio cliente; y la lista. La primera fila es la
 * nuestra, sin leer: avatar con las iniciales de la agencia, el remitente en
 * negrita, el asunto, el arranque del cuerpo como vista previa y la hora del
 * envío. Cada string sale de `lib/reporte-muestra.ts`, los mismos de la
 * ventana; la vista previa es el arranque del mismo cuerpo, recortado por la
 * fila, que es exactamente lo que hace un cliente de correo.
 *
 * ── LAS FILAS DE ABAJO NO DICEN NADA, A PROPÓSITO ───────────────────────────
 * Una fila sola no se lee como una bandeja de entrada, y el argumento necesita
 * que se lea así: lo que prueba la marca propia es que el nombre de la agencia
 * aparezca ENTRE los otros remitentes del cliente. Pero los otros remitentes no
 * existen: inventarlos sería poner contenido falso en la única sección que
 * promete que el entregable es de verdad. Así que van como siluetas —barras
 * grises, sin una palabra— que se apagan hacia el corte de la bandeja. Dicen
 * «acá abajo sigue su correo» sin afirmar de quién.
 *
 * El avatar lleva las iniciales de la agencia como en la charla, y no la
 * letra rosa de Gmail: el cliente de correo es del cliente, no nuestro, y lo
 * que no se sabe no se pinta. El del campo de búsqueda, por lo mismo, es un
 * disco liso: es la foto del cliente y no la tenemos.
 */

/* La copia en `public/preview/` es el SVG del dueño byte a byte, salvo el
   rectángulo blanco de fondo que Figma exporta con el frame y que se veía
   como un cuadrado detrás de las esquinas. Si se vuelve a bajar de Figma,
   hay que volver a quitarlo. */
const MARCO = "/preview/iphone-16-plus-light.svg";
const SOBRE = "/preview/iphone-16-plus-light-sobre.svg";

/* La barra de estado: sólo la hora, donde el SVG pone la suya; los íconos
   los trae el sobre. */
function Estado({ hora }: { hora: string }) {
  return (
    <div className="i-tel-estado" aria-hidden="true">
      <span className="i-cifra">{hora}</span>
    </div>
  );
}

/* Los glifos del lector de correo: los de Material en contorno —archivar,
   borrar, marcar como no leído, más—, todos en la misma grilla de 24 con el
   mismo trazo de 1,75 y el mismo tamaño óptico: los cuatro ocupan entre 16 y
   18 de los 24. Se dibujaron a mano para que sean parejos entre sí; la
   primera versión, en una grilla de 16 a trazo 1,5, salía irregular. */
type Glifo = "menu" | "estrella";

const TRAZOS: Record<Glifo, React.ReactNode> = {
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" strokeWidth="2" />,
  estrella: (
    <path d="m12 3.75 2.55 5.35 5.85.7-4.3 4 1.15 5.8L12 16.75l-5.25 2.85 1.15-5.8-4.3-4 5.85-.7z" />
  ),
};

function Glifo({ cual, tamano = 24 }: { cual: Glifo; tamano?: number }) {
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {TRAZOS[cual]}
    </svg>
  );
}

/* Las iniciales de la agencia, como en la charla. */
export function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

/* Las filas que siguen a la nuestra: el resto del correo del cliente, del que
   este repo no sabe nada. El ritmo es el de una lista real y no el de un
   cargador: la segunda fila tiene dos líneas en vez de tres —hay correos sin
   vista previa—, los anchos son desparejos, y cada una lleva su tinte de avatar
   para que se lean como remitentes distintos. La primera barra de cada fila es
   el remitente y va más gruesa. */
const SILUETAS = [
  { tinte: "a", barras: [44, 79, 62] },
  { tinte: "b", barras: [33, 66] },
  { tinte: "c", barras: [50, 71, 57] },
  /* Tres, y no ocho (10/09/2026, tarde). Llegó a ocho para llenar el aparato
     entero, y el dueño lo leyó al revés: «nueve filas de placeholders grises y
     el mail real perdido arriba, chiquito, entre todo ese ruido; el ojo se va
     a los placeholders». El aparato vuelve a cortarse —a la altura del mail en
     escritorio, a 368 en una columna— y por debajo del corte no hay nada que
     llenar: quedan el mail real y la silueta y media que el corte atraviesa. */
];

export function Telefono() {
  const enviado = RECORRIDO_MUESTRA[2];
  const avance = `${SALUDO_MAIL_MUESTRA} ${CUERPO_MAIL_MUESTRA.antes}${DESDE_MUESTRA}${CUERPO_MAIL_MUESTRA.entre}${HASTA_MUESTRA}${CUERPO_MAIL_MUESTRA.despues}`;

  return (
    <div
      className="i-tel"
      role="group"
      aria-label={`La bandeja de entrada del cliente: el mail llega de ${AGENCIA_MUESTRA}`}
    >
      {/* La pantalla va debajo del marco en el DOM y encima en z: el marco
          pinta su pantalla negra y la nuestra la tapa exacta. */}
      <div className="i-tel-pantalla">
        <Estado hora={HORA_LECTURA_MAIL_MUESTRA} />

        <div className="i-tel-bandeja">
          {/* El campo de búsqueda de Gmail: el menú, la frase y el avatar del
              cliente, que es un disco liso porque su foto no la tenemos. */}
          <div className="i-tel-buscar" aria-hidden="true">
            <Glifo cual="menu" tamano={22} />
            <span>Buscar en el correo</span>
            <span className="i-tel-yo" />
          </div>

          <ol className="i-tel-lista">
            <li className="i-tel-fila" data-sin-leer="">
              <span className="i-tel-avatar" aria-hidden="true">
                {iniciales(AGENCIA_MUESTRA)}
              </span>
              <div className="i-tel-fila-texto">
                <p className="i-tel-fila-de">
                  <span className="i-tel-corta">{AGENCIA_MUESTRA}</span>
                  <span className="i-cifra i-tel-fila-hora">
                    {enviado.hora}
                  </span>
                </p>
                <p className="i-tel-fila-asunto">{ASUNTO_MAIL_MUESTRA}</p>
                <p className="i-tel-fila-avance">
                  <span className="i-tel-corta">{avance}</span>
                  <span className="i-tel-estrella" aria-hidden="true">
                    <Glifo cual="estrella" tamano={20} />
                  </span>
                </p>
              </div>
            </li>

            {SILUETAS.map((s, i) => (
              <li
                // Por índice: los tintes se repiten, y una `key` repetida es
                // una advertencia de React y un render que se pisa.
                key={i}
                className="i-tel-fila i-tel-fila-hueca"
                data-tinte={s.tinte}
                aria-hidden="true"
              >
                <span className="i-tel-avatar i-tel-avatar-hueco" />
                <div className="i-tel-fila-texto">
                  {s.barras.map((ancho, j) => (
                    <span
                      key={j}
                      className="i-tel-barrita"
                      style={{ width: `${ancho}%` }}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Image
        className="i-tel-marco"
        src={MARCO}
        alt=""
        width={415}
        height={843}
        unoptimized
        draggable={false}
      />
      {/* El sobre: isla, cámara y barra de estado del SVG, sobre la pantalla. */}
      <Image
        className="i-tel-sobre"
        src={SOBRE}
        alt=""
        width={415}
        height={843}
        unoptimized
        draggable={false}
      />
    </div>
  );
}
