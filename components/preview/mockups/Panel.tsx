import {
  FileText,
  Gear,
  MagnifyingGlass,
  SquaresFour,
  Users,
} from "@phosphor-icons/react/dist/ssr";

import {
  AGENCIA_MUESTRA,
  ALERTA_MUESTRA,
  CLIENTE_MUESTRA,
  KPIS_MUESTRA,
  METRICAS_MUESTRA,
  PERIODO_MUESTRA,
  RESUMEN_MUESTRA,
} from "@/lib/reporte-muestra";

/**
 * MAQUETAS DE LA INTERFAZ REAL DEL PANEL.
 *
 * ── QUÉ SON Y QUÉ NO ────────────────────────────────────────────────────────
 * No son capturas falsas armadas con divs para simular un producto que no
 * existe. Son la reproducción de un producto propio, con la misma información y
 * los mismos estados que el panel tiene hoy en `nuvlo-panel`. Es el criterio que
 * `PRODUCT.md` ya fija para el mockup del reporte, que es upstream del producto
 * real: lo que se diseña acá lo adopta después el panel.
 *
 * ── POR QUÉ ESTA VERSIÓN TIENE MUCHO MÁS ADENTRO ────────────────────────────
 * La anterior se sentía dibujada a mano, y el diagnóstico era correcto: tenía
 * barra de título, cuatro filas y una barra lateral. Una captura de producto de
 * verdad tiene mobiliario: barra de herramientas, buscador, encabezados de
 * columna, avatares, contadores, una fila seleccionada, estados vacíos. Lo que
 * delata a una maqueta no es el borde, es que adentro no pasa nada.
 *
 * Todo el mobiliario que se agrega existe en el panel. Nada de lo de acá abajo
 * es una función inventada.
 *
 * ── DE DÓNDE SALE CADA DATO ─────────────────────────────────────────────────
 *   estados        `ReportStatus`: PENDING, PROCESSING, DRAFT, DONE, FAILED.
 *   etiquetas      `STATUS_STYLES` de `dashboard/reportes/page.tsx`.
 *   navegación     `NAV_ITEMS` de `components/sidebar.tsx`.
 *   fila           cliente, cuenta publicitaria y rango, como arma la lista.
 *   IA de respaldo `Report.iaFallback`: si la IA cayó al texto genérico el
 *                  reporte queda marcado y el envío automático se autoinhibe.
 *   acción         "Aprobar y Enviar", literal de `send-report-button.tsx`,
 *                  con el destinatario impreso debajo.
 *   baja lógica    la lista es el archivo y conserva al cliente dado de baja,
 *                  marcado y no escondido (`deletedAt` en la lista real).
 */

export type EstadoReporte =
  | "pendiente"
  | "procesando"
  | "borrador"
  | "enviado"
  | "fallo";

const ETIQUETA: Record<EstadoReporte, string> = {
  pendiente: "Pendiente",
  procesando: "Procesando",
  borrador: "Borrador",
  enviado: "Enviado",
  fallo: "Falló",
};

export function Chip({ estado }: { estado: EstadoReporte }) {
  return (
    <span className={`chip chip-${estado}`}>
      <span className="chip-punto" aria-hidden="true" />
      {ETIQUETA[estado]}
    </span>
  );
}

/**
 * EL CHROME DE VENTANA.
 *
 * Tres luces de colores y cuerpo. Las luces son la convención que hace que el
 * ojo lea "esto es una captura de una ventana" antes de leer nada más; sin
 * ellas la maqueta se lee como un bloque de la página.
 *
 * ── DOS CROMOS, Y POR QUÉ ───────────────────────────────────────────────────
 * `completo` lleva además título en la barra y un chip a la derecha.
 * `minimo` lleva sólo las luces, que es lo que llevan las capturas de Attio:
 * 32px de barra, tres puntos y nada más. Medido contra las referencias, lo que
 * delata a una maqueta no son las luces sino lo que se le apila encima -barra
 * alta con gradiente, título centrado, chip de estado en la esquina-.
 *
 * Con `minimo` la identidad del documento no se pierde: baja al encabezado de
 * la aplicación, que es donde el panel real la tiene.
 */
export function Ventana({
  titulo,
  children,
  className = "",
  plano = "frente",
  cromo = "completo",
  etiqueta,
}: {
  titulo?: string;
  children: React.ReactNode;
  className?: string;
  plano?: "frente" | "fondo";
  cromo?: "completo" | "minimo";
  /** Chip opcional a la derecha de la barra, como una pestaña de estado. */
  etiqueta?: React.ReactNode;
}) {
  return (
    <div className={`vent vent-${plano} ${className}`}>
      <div className="vent-barra">
        <span className="luces" aria-hidden="true">
          <span className="luz luz-roja" />
          <span className="luz luz-amarilla" />
          <span className="luz luz-verde" />
        </span>
        {cromo === "completo" ? (
          <>
            {titulo ? <span className="vent-titulo">{titulo}</span> : null}
            {etiqueta ? <span className="vent-etiqueta">{etiqueta}</span> : null}
          </>
        ) : null}
      </div>
      <div className="vent-cuerpo">{children}</div>
    </div>
  );
}

const FILAS: {
  cliente: string;
  inicial: string;
  cuenta: string;
  periodo: string;
  estado: EstadoReporte;
  fallback?: boolean;
  baja?: boolean;
  activa?: boolean;
}[] = [
  {
    cliente: CLIENTE_MUESTRA,
    inicial: "ML",
    cuenta: "Lombardi · Prospecting",
    periodo: "1 jul - 31 jul",
    estado: "borrador",
    activa: true,
  },
  {
    cliente: "Acería Nogueira",
    inicial: "AN",
    cuenta: "Nogueira · Retargeting",
    periodo: "1 jul - 31 jul",
    estado: "enviado",
  },
  {
    cliente: "Estudio Pardo",
    inicial: "EP",
    cuenta: "Pardo · Leads",
    periodo: "1 jul - 31 jul",
    estado: "procesando",
  },
  {
    cliente: "Vivero Costanera",
    inicial: "VC",
    cuenta: "Costanera · Mensajes",
    periodo: "1 jul - 31 jul",
    estado: "borrador",
    fallback: true,
  },
  {
    cliente: "Óptica Rivas",
    inicial: "OR",
    cuenta: "Rivas · Tráfico",
    periodo: "1 jun - 30 jun",
    estado: "enviado",
    baja: true,
  },
];

/**
 * La lista de reportes: la pantalla donde el trafficker vive.
 *
 * Con su barra de herramientas y sus encabezados de columna, que es lo que la
 * separa de un listado dibujado. El buscador y el botón de generar existen en el
 * panel; el contador de abajo es el mismo que devuelve la consulta.
 */
export function ListaReportes({ filas = 4 }: { filas?: number }) {
  const visibles = FILAS.slice(0, filas);
  return (
    <div className="app">
      <div className="app-barra">
        <span className="buscador">
          <MagnifyingGlass className="buscador-lupa" weight="bold" aria-hidden="true" />
          Buscar cliente o cuenta
        </span>
        <span className="app-boton">Generar reporte</span>
      </div>

      <div className="tabla">
        <div className="tabla-cabeza">
          <span>Cliente</span>
          <span>Período</span>
          <span className="tabla-der">Estado</span>
        </div>

        {visibles.map((fila) => (
          <div
            className={`fila${fila.activa ? " fila-activa" : ""}`}
            key={fila.cliente}
          >
            <div className="fila-cliente">
              <span className="avatar" aria-hidden="true">
                {fila.inicial}
              </span>
              <span className="fila-texto">
                <span className="fila-nombre">
                  {fila.cliente}
                  {/* El reporte sobrevive a la baja del cliente: la lista es el
                      archivo. Se marca, no se esconde. */}
                  {fila.baja ? <span className="marca-baja">Dado de baja</span> : null}
                </span>
                <span className="fila-cuenta">{fila.cuenta}</span>
              </span>
            </div>
            <span className="fila-periodo cifra">{fila.periodo}</span>
            <span className="fila-estados">
              {fila.fallback ? (
                <span className="chip chip-respaldo">IA de respaldo</span>
              ) : null}
              <Chip estado={fila.estado} />
            </span>
          </div>
        ))}
      </div>

      <div className="app-pie">
        <span>{visibles.length} de 24 reportes</span>
        <span className="app-pie-nav">Anterior · Siguiente</span>
      </div>
    </div>
  );
}

/**
 * La barra lateral. Cuatro destinos, los mismos que `NAV_ITEMS`.
 *
 * Los iconos son de Phosphor y no cuadraditos dibujados a mano. La versión
 * anterior usaba un rectángulo con borde que el ojo leía como casilla de
 * verificación, no como glifo, y eso solo alcanzaba para que la maqueta se
 * viera como wireframe. Un icono de verdad es la diferencia entre "reproducción
 * de una app" y "boceto de una app".
 */
const NAV = [
  { label: "Dashboard", Icono: SquaresFour },
  { label: "Clientes", Icono: Users },
  { label: "Reportes", Icono: FileText },
  { label: "Configuración", Icono: Gear },
];

export function Lateral({ activo = "Reportes" }: { activo?: string }) {
  return (
    <nav className="lateral">
      <span className="lateral-marca">Nuvlo</span>
      <span className="lateral-grupo">Panel</span>
      {NAV.map(({ label: item, Icono }) => (
        <span
          key={item}
          className={`lateral-item${item === activo ? " lateral-activo" : ""}`}
        >
          <Icono className="lateral-icono" weight="regular" aria-hidden="true" />
          {item}
        </span>
      ))}
      <span className="lateral-plan">
        <span className="lateral-plan-nombre">Plan Estándar</span>
        <span className="lateral-plan-dato cifra">4 clientes</span>
      </span>
    </nav>
  );
}

/**
 * EL RECORRIDO, COMO PIEZA DE INTERFAZ.
 *
 * Riel horizontal con nodos sobre la línea, y debajo de cada nodo un bloque con
 * su chip, su hora y su detalle. Es la forma del seguimiento de estados de
 * Resend, con la jerarquía interna que pediste: no es un punto con un texto al
 * costado, cada hito es una pieza con su propio orden de lectura.
 *
 * ── EL TRAMO PUNTEADO ES INFORMACIÓN, NO ADORNO ─────────────────────────────
 * Tres de las cuatro transiciones las hace Nuvlo solo y su tramo es continuo. La
 * que va de Borrador a Enviado es la única que necesita a una persona, y por eso
 * es la única punteada. El corte en la línea ES el argumento del producto.
 */
export const HITOS: {
  estado: EstadoReporte;
  detalle: string;
  hora?: string;
  humano?: boolean;
  /** El estado al que el reporte todavía no llegó. */
  pendiente?: boolean;
}[] = [
  {
    estado: "pendiente",
    hora: "09:12",
    detalle: "Pediste el informe de julio.",
  },
  {
    estado: "procesando",
    hora: "09:13",
    detalle: "Trae las métricas de Meta, calcula y redacta.",
  },
  {
    /**
     * El humano se marca ACÁ y no en el estado siguiente. `DRAFT` es el estado
     * que espera a una persona; `DONE` ya es la consecuencia de que alguien
     * apretó. Marcar el último diría que intervenís después de que salió.
     */
    estado: "borrador",
    hora: "09:14",
    detalle: "Queda esperándote. Nadie lo vio todavía.",
    humano: true,
  },
  {
    /**
     * ESTE PASO TODAVÍA NO PASÓ, y ahí está el argumento.
     *
     * Antes tenía hora propia y decía "Apretaste Aprobar y Enviar", o sea que el
     * reporte ya había salido. Pero la cabecera de la ventana lo muestra en
     * Borrador y el paso anterior dice "te espera a vos" en presente: el mismo
     * reporte estaba en dos estados a la vez y en dos tiempos verbales.
     *
     * Mostrarlo sin ocurrir es además más fuerte: el visitante ve un informe
     * literalmente frenado esperando a una persona, que es lo que vende.
     */
    estado: "enviado",
    detalle: "No salió. Sale cuando aprietes Aprobar y Enviar.",
    pendiente: true,
  },
];

export function Recorrido() {
  return (
    <div className="rec">
      {/* La barra del componente. Sin ella el riel se leía como un esquema
          pegado encima de la app: un diagrama flotando sin contenedor, sin
          encabezado y sin nada que lo ate a la interfaz. Un seguimiento de
          estados en un panel real es un componente con su propio título, su
          propio marco y su propio dato de resumen a la derecha. */}
      <div className="rec-barra">
        <span className="rec-titulo">Recorrido</span>
        <span className="rec-resumen cifra">3 de 4 estados</span>
      </div>
      <ol className="rec-fila">
        {HITOS.map((hito, i) => (
          <li
            className={`rec-paso${hito.humano ? " rec-paso-humano" : ""}${
              hito.pendiente ? " rec-paso-pendiente" : ""
            }`}
            key={hito.estado}
          >
            <div className="rec-riel" aria-hidden="true">
              <span
                className={`rec-tramo rec-tramo-izq${
                  i === 0 ? " rec-tramo-vacio" : ""
                }${HITOS[i - 1]?.humano ? " rec-tramo-humano" : ""}`}
              />
              <span className="rec-nodo" />
              <span
                className={`rec-tramo rec-tramo-der${
                  i === HITOS.length - 1 ? " rec-tramo-vacio" : ""
                }${hito.humano ? " rec-tramo-humano" : ""}`}
              />
            </div>
            <div className="rec-cuerpo">
              <div className="rec-cabeza">
                <Chip estado={hito.estado} />
                {hito.hora ? (
                  <time className="rec-hora cifra">{hito.hora}</time>
                ) : null}
              </div>
              <p className="rec-detalle">{hito.detalle}</p>
              {hito.humano ? (
                <p className="rec-marca">Te espera a vos</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * El momento de aprobar: la última pantalla donde el reporte todavía no salió,
 * con el destinatario impreso debajo del botón.
 */
export function Aprobacion() {
  return (
    <div className="aprob">
      <div className="aprob-encabezado">
        <div>
          <p className="aprob-cliente">{CLIENTE_MUESTRA}</p>
          <p className="aprob-periodo cifra">{PERIODO_MUESTRA}</p>
        </div>
        <Chip estado="borrador" />
      </div>
      <div className="aprob-kpis">
        {KPIS_MUESTRA.slice(0, 4).map((kpi) => (
          <div className="aprob-kpi" key={kpi.etiqueta}>
            <span className="aprob-kpi-et">{kpi.etiqueta}</span>
            <span className="aprob-kpi-val cifra">{kpi.valor}</span>
            <span className={`aprob-kpi-var cifra var-${kpi.sentido}`}>
              {kpi.variacion}
            </span>
          </div>
        ))}
      </div>
      <div className="aprob-accion">
        <span className="aprob-boton">Aprobar y Enviar</span>
        <span className="aprob-destino">
          Se envía a contacto@lombardi.com.ar, firmado por {AGENCIA_MUESTRA}
        </span>
      </div>
    </div>
  );
}

/**
 * EL REPORTE, EN VERSIÓN COMPACTA PARA EL HÉROE.
 *
 * Es el único material citable que tiene el sitio, así que tiene que verse en el
 * primer visual, no dos secciones más abajo. Muestra las secciones reales en su
 * orden real —encabezado, resumen, alerta, KPI, tabla— a escala donde el texto
 * todavía se lee.
 */
export function DocumentoCompacto() {
  return (
    <article className="docm" data-reporte>
      <header className="docm-cabeza">
        <p className="docm-agencia">{AGENCIA_MUESTRA}</p>
        <h3 className="docm-cliente">{CLIENTE_MUESTRA}</h3>
        <p className="docm-periodo cifra">{PERIODO_MUESTRA}</p>
      </header>

      <p className="docm-resumen">{RESUMEN_MUESTRA[0]}</p>

      <aside className="docm-alerta">
        <span className="docm-rotulo">Para tener en cuenta</span>
        <p>{ALERTA_MUESTRA}</p>
      </aside>

      <div className="docm-kpis">
        {KPIS_MUESTRA.map((kpi) => (
          <div className="docm-kpi" key={kpi.etiqueta}>
            <span className="docm-kpi-et">{kpi.etiqueta}</span>
            <span className="docm-kpi-val cifra">{kpi.valor}</span>
            <span className={`docm-kpi-var cifra var-${kpi.sentido}`}>
              {kpi.variacion}
            </span>
          </div>
        ))}
      </div>

      <table className="docm-tabla">
        <thead>
          <tr>
            <th scope="col">Métrica</th>
            <th scope="col">Julio</th>
            <th scope="col">Junio</th>
            <th scope="col">Var.</th>
          </tr>
        </thead>
        <tbody>
          {METRICAS_MUESTRA.slice(0, 4).map((fila) => (
            <tr key={fila.metrica}>
              <th scope="row">{fila.metrica}</th>
              <td className="cifra">{fila.actual}</td>
              <td className="cifra docm-ant">{fila.anterior}</td>
              <td className={`cifra var-${fila.sentido}`}>{fila.variacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
