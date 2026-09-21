import { CaretDown, Eye, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";

import { AGENCIA_MUESTRA, CLIENTE_MUESTRA } from "@/lib/reporte-muestra";

/**
 * LAS PIEZAS. Componentes reales del panel, a escala, cada uno como objeto
 * propio con su plano.
 *
 * ── QUÉ ES UNA PIEZA Y QUÉ NO ───────────────────────────────────────────────
 * Una pieza es un componente que el panel tiene hoy, con sus textos literales y
 * sus estados reales. No es una ilustración de una función, ni una caja con un
 * ícono y un título inventados. Si el panel no lo tiene, no está acá.
 *
 * ── DE DÓNDE SALE CADA UNA ──────────────────────────────────────────────────
 *   Chip            `STATUS_STYLES` de `dashboard/reportes/page.tsx`.
 *   FilaListado     la fila del listado, con su avatar, cuenta y período.
 *   Recorrido       `ReportStatus`: PENDING, PROCESSING, DRAFT, DONE.
 *   Kpi             una celda de `report-metrics`.
 *   Modo            `reporting-mode-select`, con sus dos opciones textuales.
 *   Enviar          `send-report-button`, con el destinatario impreso debajo.
 *   EnviarBloqueado el estado sin email del cliente, que el panel muestra ANTES
 *                   de que apretar falle con 400 en el servidor.
 */

export type Estado =
  | "pendiente"
  | "procesando"
  | "borrador"
  | "enviado"
  | "fallo";

const ETIQUETA: Record<Estado, string> = {
  pendiente: "Pendiente",
  procesando: "Procesando",
  borrador: "Borrador",
  enviado: "Enviado",
  fallo: "Falló",
};

export function Chip({ estado }: { estado: Estado }) {
  return (
    <span className={`p-chip p-chip-${estado}`}>
      <i aria-hidden="true" />
      {ETIQUETA[estado]}
    </span>
  );
}

export function FilaListado({ className = "" }: { className?: string }) {
  return (
    <div className={`pz pz-fila ${className}`}>
      <span className="pz-avatar" aria-hidden="true">
        ML
      </span>
      <span className="pz-fila-texto">
        <span className="pz-fila-nombre">{CLIENTE_MUESTRA}</span>
        <span className="pz-fila-cuenta">Lombardi · Prospecting</span>
      </span>
      <span className="pz-fila-der">
        <span className="pz-fila-periodo cifra">1 jul - 31 jul</span>
        <Chip estado="borrador" />
      </span>
    </div>
  );
}

/**
 * EL RECORRIDO. Cuatro estados, y el cuarto TODAVÍA NO PASÓ.
 *
 * Mostrarlo sin ocurrir es el argumento: el visitante ve un informe frenado
 * esperando a una persona. El tramo punteado es el único que necesita a alguien,
 * y por eso es el único que no es continuo.
 */
const HITOS: {
  estado: Estado;
  hora?: string;
  humano?: boolean;
  pendiente?: boolean;
}[] = [
  { estado: "pendiente", hora: "09:12" },
  { estado: "procesando", hora: "09:13" },
  { estado: "borrador", hora: "09:14", humano: true },
  { estado: "enviado", pendiente: true },
];

export function Recorrido({ className = "" }: { className?: string }) {
  return (
    <div className={`pz ${className}`}>
      <div className="pz-cab">
        <span className="pz-titulo">Recorrido</span>
        <span className="pz-dato cifra">3 de 4 estados</span>
      </div>
      <div className="pz-rec-cuerpo">
        <ol className="pz-rec-fila">
          {HITOS.map((hito, i) => (
            <li
              key={hito.estado}
              className={`pz-paso${hito.humano ? " pz-paso-humano" : ""}${
                hito.pendiente ? " pz-paso-pendiente" : ""
              }`}
            >
              <div className="pz-rec-riel" aria-hidden="true">
                <span className="pz-rec-nodo" />
                <span
                  className={`pz-rec-tramo${
                    i === HITOS.length - 1 ? " pz-rec-tramo-vacio" : ""
                  }${hito.humano ? " pz-rec-tramo-humano" : ""}`}
                />
              </div>
              <div className="pz-rec-cuerpo-paso">
                <Chip estado={hito.estado} />
                {hito.hora ? (
                  <time className="pz-rec-hora cifra">{hito.hora}</time>
                ) : (
                  <span className="pz-rec-hora">No salió</span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function Kpi({ className = "" }: { className?: string }) {
  return (
    <div className={`pz pz-kpi ${className}`}>
      <span className="pz-kpi-et">Costo por conversación</span>
      <span className="pz-kpi-val cifra">$ 1.558</span>
      <span className="pz-kpi-var cifra">−10,7%</span>
    </div>
  );
}

export function Modo({ className = "" }: { className?: string }) {
  return (
    <div className={`pz pz-modo ${className}`}>
      <span className="pz-modo-et">Modo de reporte</span>
      <span className="pz-modo-valor">
        Revisar antes de enviar
        <CaretDown className="p-icono" weight="bold" aria-hidden="true" />
      </span>
    </div>
  );
}

export function Enviar({ className = "" }: { className?: string }) {
  return (
    <div className={`pz pz-enviar ${className}`}>
      <span className="p-btn" role="presentation">
        <PaperPlaneTilt className="p-icono" weight="fill" aria-hidden="true" />
        Aprobar y Enviar
      </span>
      <span className="pz-enviar-texto">
        <span className="pz-enviar-destino">
          Se envía a <b>contacto@lombardi.com.ar</b>
        </span>
      </span>
    </div>
  );
}

/**
 * El envío a tamaño grande, para la sección donde es el protagonista.
 */
export function EnvioGrande() {
  return (
    <div className="p-envio">
      <div className="p-envio-doc">
        <div>
          <p className="p-envio-nombre">{CLIENTE_MUESTRA}</p>
          <p className="pz-dato cifra">1 jul 2026 - 31 jul 2026</p>
        </div>
        <Chip estado="borrador" />
      </div>

      <div className="p-envio-acciones">
        <span className="p-btn" role="presentation">
          <PaperPlaneTilt className="p-icono" weight="fill" aria-hidden="true" />
          Aprobar y Enviar
        </span>
        <span className="p-btn p-btn-fantasma" role="presentation">
          <Eye className="p-icono" weight="bold" aria-hidden="true" />
          Ver como cliente
        </span>
      </div>

      <p className="p-envio-destino">
        Se envía a <b>contacto@lombardi.com.ar</b>, firmado por{" "}
        <b>{AGENCIA_MUESTRA}</b>.
      </p>
    </div>
  );
}

export function EnvioBloqueado() {
  return (
    <div className="p-envio-bloqueado">
      <span className="p-btn-inerte" role="presentation">
        <PaperPlaneTilt className="p-icono" weight="fill" aria-hidden="true" />
        Aprobar y Enviar
      </span>
      <p className="p-envio-bloqueado-nota">
        Este cliente no tiene email cargado. El panel lo dice acá y no después de
        que aprietes.
      </p>
    </div>
  );
}
