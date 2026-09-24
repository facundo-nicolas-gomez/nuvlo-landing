import { Entra } from "./Entra";

/**
 * EL PERMISO — sólo lectura, dibujado como una válvula (24/09/2026).
 *
 * ── POR QUÉ ES UN DIBUJO Y NO UNA SECCIÓN CON TITULAR ──────────────────────
 * Pedido del dueño: una pieza gráfica, «nada de etiquetas ni bloques de
 * texto». Lo que tiene que quedar dicho es una sola cosa —las métricas salen de
 * la cuenta publicitaria hacia el reporte y nada vuelve— y eso es una
 * DIRECCIÓN, que se dibuja mejor de lo que se escribe. Es un diodo: la vía de
 * ida pasa por el sello; las tres de vuelta mueren contra él.
 *
 * El titular existe igual, para quien lee la página sin verla: va en
 * `i-solo-lectores`. La sección no tiene un solo renglón de prosa visible
 * salvo el dato de la revisión, que es un hecho y no se dibuja.
 *
 * ── LO QUE SE AFIRMA, Y DE DÓNDE SALE ──────────────────────────────────────
 * - `ads_read` es el ÚNICO permiso que pide el panel: `META_SCOPES` en
 *   `nuvlo-panel/src/lib/meta.ts` es `["ads_read"]`, y es lo que
 *   `api/meta/auth/route.ts` manda como `scope`. Si ese arreglo cambia, esta
 *   sección miente: se revisa en la misma tanda.
 * - Que Nuvlo superó la revisión de apps de Meta para ese permiso lo afirma el
 *   dueño (24/09/2026, registrado en `PRODUCT.md`). Se escribe como DATO, en
 *   tinta de pie de figura, y fuera del sello a propósito: adentro del sello
 *   se leería como una chapa de Meta, y no lo es.
 * - Lo que no puede hacer son tres escrituras que `ads_read` no habilita
 *   —crear o editar campañas, pausar o activar anuncios, cambiar
 *   presupuestos—. Son las tres que un trafficker teme, no una lista
 *   exhaustiva de la API.
 *
 * ── EL SELLO ES NUESTRO, Y SE NOTA ─────────────────────────────────────────
 * Sin el logo de Meta y sin su nombre adentro. Dice NUVLO en el aro y va en
 * petróleo: es una MARCA, y `DESIGN.md` pone la marca entre las señales que el
 * acento puede pintar. Es la garantía de Nuvlo sobre lo que Nuvlo construyó
 * —el permiso que pide—, no el aval de nadie más.
 *
 * ── EL ENLACE VA DEBAJO DE LA CUENTA ───────────────────────────────────────
 * Quien corta la conexión es el dueño de la cuenta, así que la llave se dibuja
 * de su lado. Lleva a «Integraciones comerciales» de la configuración de
 * Facebook, donde se ve el permiso concedido y se quita. Es externo: abre en
 * otra pestaña y sin `Referer`, porque no hay nada que Facebook tenga que saber
 * de esta página.
 */

const INTEGRACIONES_FACEBOOK =
  "https://www.facebook.com/settings/?tab=business_tools";

const NO_PUEDE = [
  "Crear o editar campañas",
  "Pausar o activar anuncios",
  "Cambiar presupuestos",
];

export function Permiso() {
  return (
    <section
      className="i-seccion i-permiso"
      id="permiso"
      aria-labelledby="i-h-permiso"
    >
      <div className="i-marco">
        <h2 id="i-h-permiso" className="i-solo-lectores">
          Sólo lectura, garantizado por Nuvlo
        </h2>

        <Entra className="i-permiso-flujo">
          <p className="i-solo-lectores">
            Las métricas viajan en una sola dirección: de la cuenta publicitaria
            al reporte. Nuvlo se conecta con el permiso ads_read, que sólo lee.
          </p>

          <div className="i-permiso-nodo i-permiso-origen" aria-hidden="true">
            <Cuenta />
          </div>

          <div className="i-permiso-via i-permiso-via-ida" aria-hidden="true">
            <span className="i-permiso-pulso" />
            <Punta />
          </div>

          <div className="i-permiso-sello" aria-hidden="true">
            <Sello />
          </div>

          <div className="i-permiso-via i-permiso-via-sale" aria-hidden="true">
            <span className="i-permiso-pulso" />
            <Punta />
          </div>

          <div className="i-permiso-nodo i-permiso-destino" aria-hidden="true">
            <Hoja />
          </div>

          <ul className="i-permiso-vuelta" aria-label="Lo que Nuvlo no puede hacer">
            {NO_PUEDE.map((accion) => (
              <li key={accion} className="i-permiso-carril">
                <span className="i-permiso-trazo" aria-hidden="true">
                  <PuntaVuelta />
                </span>
                <span className="i-permiso-orden">
                  <Candado />
                  <span className="i-permiso-orden-texto">{accion}</span>
                </span>
              </li>
            ))}
          </ul>

          <a
            className="i-permiso-llave"
            href={INTEGRACIONES_FACEBOOK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Llave />
            {/* La flecha va adentro del texto y pegada a la última palabra:
                como hermana del texto en el flex, cuando el renglón partía en
                teléfono quedaba sola contra el borde derecho. */}
            <span>
              Verificá o revocá el acceso en tu{" "}
              <span className="i-permiso-llave-fin">
                Facebook
                <Sale />
              </span>
              <span className="i-solo-lectores"> (se abre en otra pestaña)</span>
            </span>
          </a>

          <p className="i-permiso-dato">
            Nuvlo pasó la revisión de apps de Meta para{" "}
            <code className="i-permiso-codigo">ads_read</code>, y no pide ningún
            otro permiso.
          </p>
        </Entra>
      </div>
    </section>
  );
}

/* ── LOS DIBUJOS ──────────────────────────────────────────────────────────
   Línea de 1,5 en `currentColor` y rellenos por clase, así la superficie
   decide el color y ningún hex queda copiado acá. */

/* La cuenta publicitaria: tres campañas con su interruptor encendido. Los
   interruptores son justo lo que Nuvlo no toca, y por eso llevan candado. */
function Cuenta() {
  const filas = [0, 1, 2];
  return (
    <svg viewBox="0 0 220 168" className="i-permiso-dibujo">
      <rect className="i-permiso-papel" x="1" y="1" width="218" height="166" rx="12" />
      <path className="i-permiso-linea" d="M1 36h218" />
      <circle className="i-permiso-tenue" cx="20" cy="18.5" r="5.5" />
      <rect className="i-permiso-tenue" x="34" y="15" width="64" height="7" rx="3.5" />
      {filas.map((i) => {
        const y = 56 + i * 38;
        return (
          <g key={i}>
            {i > 0 && <path className="i-permiso-linea" d={`M16 ${y - 19}h188`} />}
            <rect className="i-permiso-interruptor" x="16" y={y - 8} width="30" height="16" rx="8" />
            <circle className="i-permiso-perilla" cx="38" cy={y} r="5" />
            <rect className="i-permiso-tenue" x="58" y={y - 3.5} width={[74, 58, 66][i]} height="7" rx="3.5" />
            <rect className="i-permiso-barra" x="150" y={y - 3} width={[46, 30, 38][i]} height="6" rx="3" />
          </g>
        );
      })}
    </svg>
  );
}

/* El reporte: cabeza, banco de cuatro cifras y prosa. Es un pictograma, no el
   informe achicado —ése se muestra siempre a escala de lectura—, y por eso no
   lleva un solo número. */
function Hoja() {
  return (
    <svg viewBox="0 0 220 168" className="i-permiso-dibujo">
      <rect className="i-permiso-papel" x="1" y="1" width="218" height="166" rx="12" />
      <rect className="i-permiso-fuerte" x="18" y="18" width="92" height="9" rx="4.5" />
      <rect className="i-permiso-tenue" x="18" y="33" width="54" height="6" rx="3" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect className="i-permiso-celda" x={18 + i * 47} y="52" width="43" height="40" rx="6" />
          <rect className="i-permiso-tenue" x={25 + i * 47} y="60" width="20" height="5" rx="2.5" />
          <rect className="i-permiso-fuerte" x={25 + i * 47} y="72" width={[26, 22, 28, 18][i]} height="9" rx="3" />
        </g>
      ))}
      <rect className="i-permiso-tenue" x="18" y="108" width="184" height="6" rx="3" />
      <rect className="i-permiso-tenue" x="18" y="122" width="170" height="6" rx="3" />
      <rect className="i-permiso-tenue" x="18" y="136" width="112" height="6" rx="3" />
    </svg>
  );
}

/* El sello. El aro dice la garantía; el centro, el permiso exacto. La tinta
   gastada sale de un ruido que come el trazo en puntos sueltos: es lo que
   separa un sello estampado de un círculo con texto. */
function Sello() {
  return (
    <svg viewBox="0 0 200 200" className="i-permiso-sello-dibujo">
      <defs>
        <filter id="i-sello-tinta" x="-5%" y="-5%" width="110%" height="110%">
          {/* La matriz deja el alfa en 1 para casi todo el ruido y lo baja a 0
              sólo en sus picos: el sello pierde tinta en puntos sueltos. Con
              la pendiente suave de la primera prueba se comía el trazo entero
              y se leía como arena, no como tinta. */}
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="7" result="ruido" />
          <feColorMatrix
            in="ruido"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -7 5.2"
            result="gasto"
          />
          <feComposite in="SourceGraphic" in2="gasto" operator="in" />
        </filter>
        <path id="i-sello-aro" d="M100 100m-73 0a73 73 0 1 1 146 0a73 73 0 1 1-146 0" />
      </defs>
      {/* Torcido nueve grados: un sello derecho es un logo; torcido, alguien
          lo estampó. La torcedura va ACÁ y no en un `transform` de CSS sobre
          el contenedor: con cualquier `transform` retenido ahí —la rotación, o
          la identidad que deja una animación con `both`— Chrome pintaba el
          texto y el ojo corridos y más chicos que los aros, aunque el layout
          medía bien (Playwright, 1024, 24/09/2026). Por eso la animación de
          `secciones.css` es `backwards`. */}
      <g transform="rotate(-9 100 100)">
        <g filter="url(#i-sello-tinta)" className="i-permiso-tinta">
          <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="100" cy="100" r="89" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="57" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text className="i-permiso-aro" fill="currentColor">
            <textPath href="#i-sello-aro" textLength="455" lengthAdjust="spacing">
              SÓLO LECTURA · GARANTIZADO POR NUVLO ·
            </textPath>
          </text>
          {/* El ojo: lee, no toca. */}
          <path
            d="M78 90c6.5-8 14-12 22-12s15.5 4 22 12c-6.5 8-14 12-22 12s-15.5-4-22-12Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="100" cy="90" r="5" fill="currentColor" />
          <text x="100" y="124" textAnchor="middle" className="i-permiso-scope" fill="currentColor">
            ads_read
          </text>
        </g>
      </g>
    </svg>
  );
}

function Punta() {
  return (
    <svg className="i-permiso-punta" width="9" height="14" viewBox="0 0 9 14" fill="none">
      <path d="M1.5 1.5 7 7l-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PuntaVuelta() {
  return (
    <svg className="i-permiso-punta-vuelta" width="8" height="12" viewBox="0 0 8 12" fill="none">
      <path d="M6.5 1.5 2 6l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Candado() {
  return (
    <svg className="i-permiso-candado" width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
      <rect x="1.25" y="6" width="9.5" height="7" rx="1.75" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3.5 6V4.25a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function Llave() {
  return (
    <svg className="i-permiso-llave-icono" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="5" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8.25 8H15M12.5 8v2.5M15 8v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function Sale() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M3 1.5h5.5V7M8.5 1.5 1.5 8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
