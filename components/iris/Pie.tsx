import Link from "next/link";
import PanelLink from "@/components/landing/PanelLink";
import { Wordmark } from "./Piezas";
import { BOTONES_LEGALES } from "@/lib/botones-legales";

/**
 * Un enlace del pie: `<Link>` si apunta adentro del sitio, `<a>` pelado si sale
 * —el panel, el mailto—. Se decide por el prefijo y no por una bandera en cada
 * entrada, así una fila nueva no puede olvidarse de declararlo.
 *
 * `<Link>` no es una formalidad de lint: desde una página legal, «Cómo
 * funciona» con un `<a>` recarga la home entera, y con esto es una transición
 * del cliente. En la home, donde el destino es el documento actual, Next hace
 * el desplazamiento al fragmento igual que el ancla pelada.
 */
function Enlace({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
  return <a href={href}>{children}</a>;
}

/**
 * EL PIE, Y LO USAN LAS DOS SUPERFICIES DEL SITIO.
 *
 * Estaba adentro de `Cierre.tsx`, donde nació. Se separó el 11/09/2026 porque
 * las tres páginas legales dejaron de correr el mundo retirado y necesitaban
 * un pie: o lo compartían, o el sitio tenía dos pies que se iban a
 * desincronizar en la primera corrección.
 *
 * ── EL CIERRE ES EL TELÓN; ESTO ES SÓLO EL PIE ──────────────────────────────
 * En la home este bloque vive adentro del telón `sticky` del Cierre, debajo
 * del remate y del wordmark gigante. En una legal va solo, en una franja de
 * noche al final del documento: sin telón, sin remate y sin la charla, que son
 * el final de un argumento que en una página de términos no se está dando.
 *
 * ── VA DE NOCHE EN LAS DOS, Y ESO NO ES DECORACIÓN ──────────────────────────
 * Todo el bloque está cableado a la noche: los filetes son `--color-noche-filete`,
 * el botón de volver arriba tiene un borde en blanco translúcido y los enlaces
 * de las listas se pintan con `.i-noche .i-pie-lista a`. Un pie claro no sería
 * este componente con otro fondo: sería un juego de variantes de color nuevo
 * para una superficie que nadie pidió que fuera distinta. Y termina las dos
 * páginas igual, que es lo que uno espera de un pie.
 *
 * ── LAS ANCLAS SON ABSOLUTAS, A PROPÓSITO ───────────────────────────────────
 * `/#pasos` y no `#pasos`. En la home el navegador ve que el documento es el
 * mismo y hace navegación de fragmento igual que con el ancla pelada; en una
 * legal, lleva a la home y cae en la sección. Es lo que permite que no haya una
 * variante por superficie: una prop «estoy en la home» sería una cosa más que
 * alguien puede olvidarse de pasar.
 */

const COLUMNAS = [
  {
    titulo: "Producto",
    enlaces: [
      { texto: "El reporte", href: "/#reporte" },
      { texto: "Cómo funciona", href: "/#pasos" },
      { texto: "Aprobar", href: "/#control" },
      // El espacio duro cierra una huérfana de una palabra, medida y corregida
      // el 09/09/2026 (brief de `.impeccable/`). Va escapado y no literal: un
      // carácter invisible en el fuente se pierde en el primer copiar y pegar.
      { texto: "Lo que recibe tu\u00A0cliente", href: "/#entregable" },
      { texto: "Precios", href: "/#precios" },
      { texto: "Preguntas", href: "/#preguntas" },
    ],
  },
  {
    titulo: "Legal",
    enlaces: [
      { texto: "Términos", href: "/terminos" },
      { texto: "Privacidad", href: "/privacidad" },
      { texto: "Reembolsos", href: "/reembolsos" },
      // Los dos que exige la Disposición 954/2025. Acá es donde se los busca;
      // el que cumple con «a simple vista y en el primer acceso» es el héroe,
      // debajo del CTA (ver `lib/botones-legales.ts`).
      ...BOTONES_LEGALES,
    ],
  },
  {
    titulo: "Contacto",
    enlaces: [
      { texto: "soporte@nuvloapp.com", href: "mailto:soporte@nuvloapp.com" },
    ],
  },
];

function Arriba() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 12V2M2.5 6.5 7 2l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Pie() {
  return (
    <div className="i-marco i-telon-pie">
      <div className="i-pie-columnas">
        <div className="i-pie-marca">
          <Wordmark />
          {/* La misma corrección que el titular de Control: en Automático el
              reporte sale sin visto bueno por reporte. */}
          <p className="i-chico">
            Reportes de Meta Ads con el nombre de tu agencia. Enviarlos es
            decisión tuya.
          </p>
        </div>

        {COLUMNAS.map((c) => (
          <nav key={c.titulo} className="i-pie-columna" aria-label={c.titulo}>
            <p className="i-rotulo i-pie-titulo">{c.titulo}</p>
            <ul className="i-pie-lista">
              {c.enlaces.map((e) => (
                <li key={e.texto}>
                  <Enlace href={e.href}>{e.texto}</Enlace>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav className="i-pie-columna" aria-label="Cuenta">
          <p className="i-rotulo i-pie-titulo">Cuenta</p>
          <ul className="i-pie-lista">
            <li>
              <a href="https://panel.nuvloapp.com">Ingresar</a>
            </li>
            <li>
              <PanelLink>Empezar gratis</PanelLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="i-pie-linea">
        <p className="i-fino i-telon-legal">
          © 2026 Nuvlo. Las cifras de este sitio son de un ejemplo ficticio.
          Nuvlo no está afiliado a Meta Platforms, Inc.
        </p>
        <Link className="i-telon-arriba" href="/#inicio" aria-label="Volver arriba">
          <Arriba />
        </Link>
      </div>
    </div>
  );
}
