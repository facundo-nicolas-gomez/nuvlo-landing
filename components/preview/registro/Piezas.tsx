import type { ReactNode } from "react";
import PanelLink from "@/components/landing/PanelLink";
import {
  ACCIONES_MUESTRA,
  AGENCIA_MUESTRA,
  ALERTA_MUESTRA,
  CLIENTE_MUESTRA,
  KPIS_MUESTRA,
  METRICAS_MUESTRA,
  PERIODO_MUESTRA,
  RESUMEN_MUESTRA,
  type Sentido,
} from "@/lib/reporte-muestra";

/**
 * PIEZAS COMPARTIDAS POR LOS TRES REGISTROS.
 *
 * Los tres comparten mundo, datos y copy: lo único que cambia entre ellos es la
 * composición y la escala. Por eso las piezas viven acá una sola vez y cada
 * registro las coloca donde su tesis las necesita. Si cada uno tuviera su
 * propio banco de KPI, la comparación mediría mi prolijidad y no el registro.
 *
 * Los datos salen de `lib/reporte-muestra.ts`. Son ficticios y la página lo
 * dice a la vista del visitante; nunca se reemplazan por datos de una cuenta
 * real. Pero son coherentes: CTR = clics / impresiones, CPC = inversión /
 * clics, costo por conversación = inversión / conversaciones. El visitante es
 * un comprador de medios y lee estas cifras como las lee todos los días.
 */

/* ── LA CÁPSULA DE VARIACIÓN ─────────────────────────────────────────────────
   El tick lo decide el signo. El color lo decide el negocio, y viene dado en
   `sentido` desde `lib/reporte-muestra.ts` —misma regla que `report-metrics.ts`
   en el panel—. Nunca se infiere uno del otro: que la inversión suba no es
   verde, y que el costo por conversación baje sí lo es. */

function tickDe(variacion: string) {
  if (variacion.startsWith("−") || variacion.startsWith("-")) return "baja";
  if (variacion.startsWith("+")) return "sube";
  return "igual";
}

export function Capsula({
  variacion,
  sentido,
}: {
  variacion: string;
  sentido: Sentido;
}) {
  const tick = tickDe(variacion);

  return (
    <span className="rg-capsula" data-sentido={sentido}>
      <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
        {tick === "sube" && <path d="M4 0.8 L7.4 6.4 H0.6 Z" fill="currentColor" />}
        {tick === "baja" && <path d="M4 7.2 L0.6 1.6 H7.4 Z" fill="currentColor" />}
        {tick === "igual" && <rect x="0.6" y="3.3" width="6.8" height="1.4" fill="currentColor" />}
      </svg>
      <span className="cifra">{variacion.replace(/^[+−-]/, "")}</span>
    </span>
  );
}

/* ── NAVEGACIÓN ─────────────────────────────────────────────────────────────
   Barra a todo el ancho: wordmark a la izquierda, enlaces al centro, CTA
   compacta a la derecha. Debajo de 900px los enlaces salen y queda el wordmark
   con la acción, que es lo que un visitante de móvil necesita del cromo. */

const ENLACES = [
  { texto: "El reporte", href: "#reporte" },
  { texto: "Control", href: "#control" },
  { texto: "El entregable", href: "#entregable" },
  { texto: "Precios", href: "#precios" },
];

export function Navbar() {
  return (
    <header className="rg-nav">
      <div className="rg-marco rg-nav-fila">
        <a className="rg-marca" href="#">
          Nuvlo
        </a>
        <nav className="rg-nav-enlaces">
          {ENLACES.map((e) => (
            <a key={e.texto} href={e.href}>
              {e.texto}
            </a>
          ))}
        </nav>
        <PanelLink className="rg-boton rg-boton-chico rg-nav-cta">
          Empezar gratis
        </PanelLink>
      </div>
    </header>
  );
}

/* ── EL ENCABEZADO DEL REPORTE ───────────────────────────────────────────────
   La barra de título dice QUÉ documento es; la chapa dice EN QUÉ ESTADO está.
   Nunca las dos cosas en el mismo lugar. */

export function Encabezado({ estado = "Borrador" }: { estado?: string }) {
  return (
    <div className="rg-r-cabeza">
      <div className="rg-r-quien">
        <p className="rg-r-cliente">{CLIENTE_MUESTRA}</p>
        <p className="rg-r-periodo cifra">
          Reporte de Meta Ads · {PERIODO_MUESTRA}
        </p>
      </div>
      <span className="rg-r-chapa">{estado}</span>
    </div>
  );
}

/* ── EL BANCO DE KPI ────────────────────────────────────────────────────────
   Cuatro celdas sobre la retícula de un píxel, nunca cuatro tarjetas hermanas
   con borde propio. Las cifras comparten línea de base pase lo que pase: la
   caja del rótulo reserva dos líneas siempre. */

export function Banco({ className = "" }: { className?: string }) {
  return (
    <div className={`rg-reticula rg-banco ${className}`}>
      {KPIS_MUESTRA.map((k) => (
        <div key={k.etiqueta} className="rg-kpi">
          <p className="rg-rotulo">{k.etiqueta}</p>
          <p className="rg-kpi-valor cifra">{k.valor}</p>
          <div className="rg-kpi-pie">
            <Capsula variacion={k.variacion} sentido={k.sentido} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── LA TABLA DE MÉTRICAS ───────────────────────────────────────────────────
   Cinco filas con el mes anterior a la vista. Sin período comparable la
   variación quedaría vacía, nunca 0 %: 0 % significa «no cambió» y es otra
   cosa. Acá el período anterior existe, así que todas las filas la traen. */

export function Tabla({ className = "" }: { className?: string }) {
  return (
    <table className={`rg-tabla ${className}`}>
      <thead>
        <tr>
          <th scope="col">Métrica</th>
          <th scope="col">Julio</th>
          <th scope="col">Junio</th>
          <th scope="col">Var.</th>
        </tr>
      </thead>
      <tbody>
        {METRICAS_MUESTRA.map((m) => (
          <tr key={m.metrica}>
            <td>{m.metrica}</td>
            <td className="cifra">{m.actual}</td>
            <td className="cifra rg-anterior">{m.anterior}</td>
            <td>
              <Capsula variacion={m.variacion} sentido={m.sentido} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ── EL RESUMEN EJECUTIVO ───────────────────────────────────────────────────
   Es lo ÚNICO que escribe la IA en el producto real, y por eso es la única
   parte del objeto que se lee como texto redactado. No cita ninguna cifra que
   no esté en la tabla de arriba: en el panel esa invariante es de arquitectura
   —el prompt no recibe los números de campaña—, así que la muestra la respeta
   para no prometer algo distinto de lo que el producto hace.

   La alerta se marca SUBIENDO la superficie y cerrando el filete, nunca con un
   borde grueso de color a la izquierda, que es el recurso de callout que este
   sistema no usa. */

export function Resumen({ className = "" }: { className?: string }) {
  return (
    <div className={`rg-r-prosa ${className}`}>
      <p className="rg-rotulo">Resumen ejecutivo</p>
      {RESUMEN_MUESTRA.map((parrafo) => (
        <p key={parrafo.slice(0, 24)} className="rg-cuerpo rg-r-parrafo">
          {parrafo}
        </p>
      ))}
      <p className="rg-chico rg-r-alerta">{ALERTA_MUESTRA}</p>
    </div>
  );
}

/* ── LAS ACCIONES ───────────────────────────────────────────────────────────
   Hasta tres, numeradas. El ordinal es una pastilla con filete —una marca, no
   una superficie— y el número va en cifras tabulares como cualquier otro. */

export function Acciones({ className = "" }: { className?: string }) {
  return (
    <div className={`rg-r-prosa ${className}`}>
      <p className="rg-rotulo">Acciones sugeridas</p>
      <ol className="rg-r-acciones">
        {ACCIONES_MUESTRA.map((accion, i) => (
          <li key={accion.slice(0, 24)}>
            <span className="rg-r-ordinal cifra" aria-hidden="true">
              {i + 1}
            </span>
            <span className="rg-chico">{accion}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── EL PIE DEL EJEMPLO ─────────────────────────────────────────────────────
   El rótulo de dato ficticio va donde el visitante mira la cifra, no escondido
   al final de la página. La firma de la agencia es verdadera en los dos planes:
   el nombre es requisito duro y sin él el panel no genera ni envía. */

export function NotaEjemplo({ children }: { children?: ReactNode }) {
  return (
    <p className="rg-fino">
      {children ?? (
        <>Ejemplo con datos ficticios. Preparado por {AGENCIA_MUESTRA}.</>
      )}
    </p>
  );
}

/* ── EL BLOQUE DE ACCIÓN ────────────────────────────────────────────────────
   Una sola acción y el dato de la prueba impreso al lado, no como pastilla
   flotando sobre el título. Tres reportes gratis sin tarjeta es `FREE_REPORTS =
   3` en el panel. */

export function Accion({ className = "" }: { className?: string }) {
  return (
    <div className={`rg-accion ${className}`}>
      <PanelLink className="rg-boton">Empezar gratis</PanelLink>
      <p className="rg-chico">3 reportes gratis, sin tarjeta.</p>
    </div>
  );
}
