import {
  AGENCIA_MUESTRA,
  ASUNTO_MAIL_MUESTRA,
  BOTON_MAIL_MUESTRA,
  CUERPO_MAIL_MUESTRA,
  DESDE_MUESTRA,
  HASTA_MUESTRA,
  SALUDO_MAIL_MUESTRA,
} from "@/lib/reporte-muestra";
import { Fila } from "./Entra";

/**
 * EL TELÉFONO CON EL CLIENTE DE CORREO.
 *
 * ── EL CHASIS NO ESTÁ DIBUJADO A MANO ──────────────────────────────────────
 * La primera versión lo era —un rectángulo redondeado con relleno— y los
 * detalles chicos se veían sucios: el canto no tenía el doble filo del
 * aparato, las esquinas no seguían la curva real y no había isla dinámica.
 *
 * Ahora la silueta sale del mockup «iPhone 16 Pro» de designali-in, publicado
 * en 21st.dev (`npx shadcn@latest add .../iphone-16-pro`). Se tomó la GEOMETRÍA
 * —las dos siluetas del cuerpo, el rectángulo de pantalla y la isla— y se le
 * cambiaron los colores por los tokens de la página: nada acá está en el negro
 * plano del original.
 *
 * ── LA PANTALLA ES HTML, NO UNA IMAGEN ─────────────────────────────────────
 * El componente original recibe un `src` y mete una imagen adentro. Acá no
 * sirve: el mail tiene que ser texto de verdad —seleccionable, escalable, y
 * sobre todo con los strings reales del panel—. Así que el SVG queda de fondo,
 * el contenido va en un div posicionado sobre el rectángulo de pantalla, y la
 * isla se dibuja en un segundo SVG por encima. Las tres capas comparten el
 * mismo `viewBox`, así que se alinean solas a cualquier tamaño.
 *
 * ── LA ESTRUCTURA DEL CLIENTE SALE DE LA REFERENCIA ────────────────────────
 * Barra de estado, barra de acciones, asunto grande, chip de etiqueta,
 * remitente con avatar y «para mí», el cuerpo sobre fondo hundido, y abajo
 * Responder / Reenviar. Es Gmail en iPhone, que es la captura que bajó el
 * dueño. **La estructura se copia; la paleta no.**
 *
 * ── LOS TEXTOS SON LOS DEL PRODUCTO ────────────────────────────────────────
 * Asunto, remitente, saludo, cuerpo y botón salen de `lib/reporte-muestra.ts`,
 * que los copia de `nuvlo-panel/src/lib/report-email.ts`.
 *
 * ── LO QUE NO HAY, Y ES EL ARGUMENTO ───────────────────────────────────────
 * Ni una marca de Nuvlo en toda la pieza. No es un descuido: el template real
 * no la tiene, y por eso esta sección se muestra entera sin una nota que
 * aclare nada.
 */

/* ── EL CHASIS ──────────────────────────────────────────────────────────────
   Geometría del mockup de 21st.dev; colores nuestros. El rectángulo de pantalla
   va en `--papel` para que lo que asome por detrás del contenido sea del color
   de la hoja y no negro. */

function Chasis() {
  return (
    <svg
      className="f-tel-chasis"
      viewBox="0 0 200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* El canto exterior: es lo que le da el doble filo al aparato. */}
      <path
        fill="var(--tel-canto)"
        d="M196.11,128.09c0-.25-.2-.45-.45-.45-.11.04-.37.03-.69,0V36.69c0-17.84-14.46-32.31-32.31-32.31H37.48C19.63,4.39,5.17,18.85,5.17,36.69v48.99c-.3.02-.55.03-.66-.02-.25,0-.45.2-.45.45,0,0,0,17.29,0,17.29-.03.41.5.49,1.11.48v13.63c-.61,0-1.14.08-1.11.48,0,0,0,28.54,0,28.54-.03.42.5.49,1.11.48v7.95c-.61,0-1.14.08-1.11.48,0,0,0,28.54,0,28.54-.03.42.5.49,1.11.48v178.86c0,17.84,14.46,32.31,32.31,32.31h125.2c17.84,0,32.31-14.46,32.31-32.31v-188.87c.32-.02.58-.03.69.04,1.26.1.03-45.94.45-46.38ZM186.07,362.63c0,13.56-10.99,24.56-24.56,24.56H38.64c-13.56,0-24.56-10.99-24.56-24.56V37.37c0-13.56,10.99-24.56,24.56-24.56h122.87c13.56,0,24.56,10.99,24.56,24.56v325.26Z"
      />
      <path
        fill="var(--tel-cuerpo)"
        d="M161.38,7.29H38.78c-16.54,0-29.95,13.41-29.95,29.95v325.52c0,16.54,13.41,29.95,29.95,29.95h122.6c16.54,0,29.95-13.41,29.95-29.95V37.24c0-16.54-13.41-29.95-29.95-29.95ZM186.07,362.57c0,13.6-11.02,24.62-24.62,24.62H38.7c-13.6,0-24.62-11.02-24.62-24.62V37.43c0-13.6,11.02-24.62,24.62-24.62h122.75c13.6,0,24.62,11.02,24.62,24.62v325.14Z"
      />
      <rect
        fill="var(--papel)"
        x="14.08"
        y="12.81"
        width="171.98"
        height="374.37"
        rx="24.62"
        ry="24.62"
      />
    </svg>
  );
}

/* La isla dinámica va en su propia capa porque la pantalla es HTML y la taparía.
   Mismo `viewBox` que el chasis, así que cae en su lugar sin un solo número
   nuevo. */

function Isla() {
  return (
    <svg
      className="f-tel-isla"
      viewBox="0 0 200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="var(--tel-cuerpo)"
        d="M119.61,33.86h-38.93c-10.48-.18-10.5-15.78,0-15.96,0,0,38.93,0,38.93,0,4.41,0,7.98,3.57,7.98,7.98,0,4.41-3.57,7.98-7.98,7.98Z"
      />
      <path
        fill="var(--tel-lente)"
        d="M118.78,29.21c-4.32.06-4.32-6.73,0-6.66,4.32-.06,4.32,6.73,0,6.66Z"
      />
    </svg>
  );
}

/* ── LOS ÍCONOS DEL CLIENTE ─────────────────────────────────────────────────
   Dibujados, de un solo grosor de trazo. Nada de glifos de texto: un «‹» hereda
   la métrica de la fuente y no se alinea con nada. */

const trazo = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Volver() {
  return (
    <svg width="16" height="16" viewBox="0 0 17 17" aria-hidden="true">
      <path d="M10.5 3.5 5.5 8.5l5 5" {...trazo} />
    </svg>
  );
}

function Archivar() {
  return (
    <svg width="16" height="16" viewBox="0 0 17 17" aria-hidden="true">
      <path d="M2.5 3.5h12v3h-12z" {...trazo} />
      <path d="M3.7 6.5v7h9.6v-7" {...trazo} />
      <path d="M8.5 8.2v3.2M6.9 9.9l1.6 1.6 1.6-1.6" {...trazo} />
    </svg>
  );
}

function Borrar() {
  return (
    <svg width="16" height="16" viewBox="0 0 17 17" aria-hidden="true">
      <path d="M2.8 4.4h11.4" {...trazo} />
      <path d="M6.4 4.4V2.9h4.2v1.5" {...trazo} />
      <path d="M4.3 4.4l.8 9.2h6.8l.8-9.2" {...trazo} />
    </svg>
  );
}

function SinLeer() {
  return (
    <svg width="16" height="16" viewBox="0 0 17 17" aria-hidden="true">
      <path d="M1.9 4.6h10.2v8H1.9z" {...trazo} />
      <path d="m1.9 5.2 5.1 3.9 5.1-3.9" {...trazo} />
      <circle cx="13.6" cy="3.8" r="2.2" fill="currentColor" />
    </svg>
  );
}

function Mas() {
  return (
    <svg width="16" height="16" viewBox="0 0 17 17" aria-hidden="true">
      <circle cx="3.2" cy="8.5" r="1.35" fill="currentColor" />
      <circle cx="8.5" cy="8.5" r="1.35" fill="currentColor" />
      <circle cx="13.8" cy="8.5" r="1.35" fill="currentColor" />
    </svg>
  );
}

function Estrella() {
  return (
    <svg width="17" height="17" viewBox="0 0 19 19" aria-hidden="true">
      <path
        d="m9.5 2.4 2.1 4.4 4.8.6-3.5 3.3.9 4.8-4.3-2.4-4.3 2.4.9-4.8L2.6 7.4l4.8-.6z"
        {...trazo}
      />
    </svg>
  );
}

function Responder() {
  return (
    <svg width="14" height="14" viewBox="0 0 15 15" aria-hidden="true">
      <path d="M5.6 3.2 2 6.8l3.6 3.6" {...trazo} />
      <path d="M2 6.8h6.1a4.4 4.4 0 0 1 4.4 4.4v.6" {...trazo} />
    </svg>
  );
}

function Reenviar() {
  return (
    <svg width="14" height="14" viewBox="0 0 15 15" aria-hidden="true">
      <path d="M9.4 3.2 13 6.8l-3.6 3.6" {...trazo} />
      <path d="M13 6.8H6.9a4.4 4.4 0 0 0-4.4 4.4v.6" {...trazo} />
    </svg>
  );
}

/** La barra de estado del sistema: dice que esto es un teléfono y nada más. La
 *  hora va a la izquierda y las señales a la derecha porque en el medio está la
 *  isla. */
function BarraDeEstado() {
  return (
    <div className="f-tel-estado" aria-hidden="true">
      <span className="f-tel-hora f-cifra">13:03</span>
      <div className="f-tel-senales">
        <svg width="16" height="10" viewBox="0 0 17 11">
          <rect x="0" y="7.5" width="2.6" height="3.5" rx=".8" fill="currentColor" />
          <rect x="4.1" y="5.3" width="2.6" height="5.7" rx=".8" fill="currentColor" />
          <rect x="8.2" y="2.8" width="2.6" height="8.2" rx=".8" fill="currentColor" />
          <rect x="12.3" y=".6" width="2.6" height="10.4" rx=".8" fill="currentColor" />
        </svg>
        <svg width="14" height="10" viewBox="0 0 15 11">
          <path
            d="M1 3.6a9.5 9.5 0 0 1 13 0M3.5 6.3a6 6 0 0 1 8 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="7.5" cy="9.2" r="1.3" fill="currentColor" />
        </svg>
        <svg width="22" height="11" viewBox="0 0 24 12">
          <rect
            x=".7"
            y=".7"
            width="20"
            height="10.6"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".4"
            strokeWidth="1.2"
          />
          <rect x="2.4" y="2.4" width="16.6" height="7.2" rx="1.8" fill="currentColor" />
          <path d="M22.4 4.2v3.6a2 2 0 0 0 0-3.6" fill="currentColor" fillOpacity=".4" />
        </svg>
      </div>
    </div>
  );
}

export function Telefono() {
  return (
    <div className="f-tel">
      <Chasis />

      <div className="f-tel-pantalla">
        <BarraDeEstado />

        <div className="f-tel-acciones" aria-hidden="true">
          <span>
            <Volver />
          </span>
          <span className="f-tel-acciones-der">
            <Archivar />
            <Borrar />
            <SinLeer />
            <Mas />
          </span>
        </div>

        {/**
         * A partir de acá el mail se escribe solo al entrar en pantalla. El
         * orden es el de lectura real: primero de qué se trata, después de
         * quién viene, y recién al final qué dice.
         */}
        <div className="f-tel-hilo">
          <Fila orden={0} className="f-tel-linea f-tel-asunto-fila">
            <h3 className="f-tel-asunto">{ASUNTO_MAIL_MUESTRA}</h3>
            <span className="f-tel-estrella" aria-hidden="true">
              <Estrella />
            </span>
          </Fila>

          <Fila orden={1} className="f-tel-linea">
            <span className="f-tel-etiqueta">Recibidos</span>
          </Fila>

          <Fila orden={2} className="f-tel-linea f-tel-quien">
            <span className="f-tel-avatar" aria-hidden="true">
              EB
            </span>
            <div className="f-tel-quien-texto">
              <p className="f-tel-remitente">{AGENCIA_MUESTRA}</p>
              <p className="f-tel-para">para mí</p>
            </div>
            <span className="f-tel-cuando f-cifra">9:02</span>
          </Fila>

          <div className="f-tel-cuerpo">
            <div className="f-tel-tarjeta">
              <Fila orden={3} como="div" className="f-tel-linea">
                <p className="f-tel-saludo">{SALUDO_MAIL_MUESTRA}</p>
              </Fila>
              <Fila orden={4} como="div" className="f-tel-linea">
                <p className="f-tel-parrafo">
                  {CUERPO_MAIL_MUESTRA.antes}
                  <strong>{DESDE_MUESTRA}</strong>
                  {CUERPO_MAIL_MUESTRA.entre}
                  <strong>{HASTA_MUESTRA}</strong>
                  {CUERPO_MAIL_MUESTRA.despues}
                </p>
              </Fila>
              <Fila orden={5} como="div" className="f-tel-linea f-tel-boton-fila">
                <span className="f-tel-boton">{BOTON_MAIL_MUESTRA}</span>
              </Fila>
            </div>

            <Fila orden={6} como="div" className="f-tel-linea">
              <p className="f-tel-firma">{AGENCIA_MUESTRA}</p>
            </Fila>
          </div>
        </div>

        <div className="f-tel-pie" aria-hidden="true">
          <span className="f-tel-pastilla">
            <Responder />
            Responder
          </span>
          <span className="f-tel-pastilla">
            <Reenviar />
            Reenviar
          </span>
        </div>
      </div>

      <Isla />
    </div>
  );
}
