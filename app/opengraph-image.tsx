import { ImageResponse } from "next/og";
import {
  CLIENTE_MUESTRA,
  COPETE_MUESTRA,
  KPIS_MUESTRA,
  PERIODO_MUESTRA,
  RUTA_REPORTE_MUESTRA,
} from "@/lib/reporte-muestra";

/**
 * IMAGEN SOCIAL (OG), generada por código.
 *
 * ── POR QUÉ SE REHIZO, OTRA VEZ, Y POR EL MISMO MOTIVO ──────────────────────
 * Esta tarjeta ya se había rehecho una vez porque era el único lugar del sitio
 * que seguía mostrando una marca que no existía. Volvió a pasar: hasta el
 * 11/09/2026 pintaba el mundo «Sala de revisión» —campo #f2f2f1, chapa ámbar,
 * acción en tinta— que la promoción de «iris» retiró. Es lo que ve cualquiera a
 * quien le comparten nuvloapp.com por WhatsApp o redes, así que un mundo viejo
 * acá vale más que en cualquier página.
 *
 * Y volvió a pasar una tercera vez, el 18/09/2026: la jornada que enfrió el
 * campo, neutralizó el cromo y las sombras, tomó los tonos de Retool para la
 * noche y afiló la escala de radios pasó entera al lado de este archivo. Se
 * corrigieron ocho colores, una sombra y dos radios.
 *
 * La lección, ya por tercera vez: **esta tarjeta no se entera sola.** No
 * consume tokens —no puede, ver abajo— así que ningún cambio de paleta la
 * alcanza y ningún build la rompe. Cuando cambie el sistema, hay que venir.
 *
 * Tres veces es un patrón, no un descuido: el aviso escrito no alcanza porque
 * quien cambia un token no abre este archivo. **Desde el 18/09/2026 hay alguien
 * mirando**: `scripts/verificar-tarjeta.mjs` cruza cada constante de acá contra
 * `sistema/nuvlo.css` y `app/estilos/base.css` y rompe el CI si alguna quedó
 * atrás. El CI de este repo lo corre antes del build.
 *
 * El vínculo que lee es el `// --token` que va al lado de cada constante, o sea
 * que esa anotación dejó de ser documentación y pasó a ser el contrato: **un
 * valor que sale de la paleta lleva su nombre al lado, o no lo cuida nadie.**
 *
 * ── Y HUBO UNA CUARTA, QUE ES LA QUE ENSEÑA QUÉ NO CUIDA EL CHEQUEO ─────────
 * El 19/09/2026 la revisión encontró la tarjeta atrasada otra vez **con los
 * catorce colores en verde**. Lo que estaba viejo no era la paleta: era el
 * OBJETO. El documento de adentro se había quedado en el encabezado retirado
 * —el copete en versalitas arriba del nombre del cliente—, con la cápsula de
 * variación vieja, sin el rótulo de sección con filete que el dueño eligió el
 * 17/09 y con la mitad del aire que el documento tiene desde ese día. Todo eso
 * el chequeo no lo ve, porque nada de eso es un color.
 *
 * La lección que se suma a las tres de arriba: **el chequeo cuida los valores,
 * no el objeto.** El documento de esta tarjeta tiene que salir de
 * `components/iris/Reporte.tsx` y de `app/estilos/documento.css` leídos, no de
 * memoria — es la misma regla que `PRODUCT.md` fija para los literales del
 * panel. Cada medida de acá abajo dice de qué regla del documento salió.
 *
 * ── LO QUE MUESTRA, Y ES LA TESIS DE LA DIRECCIÓN ───────────────────────────
 * El informe adentro de un marco de navegador **servido en modo oscuro**, con
 * la URL pública real. Es el «el oscuro vive adentro del objeto, no en la
 * página» de `DESIGN.md`: la página es clara y el grafito está en el cromo, y
 * con eso la hoja blanca deja de ser una zona más y se lee como documento.
 *
 * **Sobre el héroe oscuro del 19/09/2026, y por qué esta tarjeta no lo copia.**
 * Ese día el héroe pasó a ser una banda de noche con degradé, mesh desenfocado
 * y vidrio (`.i-esc` en `secciones.css`), o sea que el primer viewport del
 * sitio ya no es claro. No se reprodujo acá por tres motivos, y los tres son
 * verificables: **(a)** lo que la banda muestra adelante es el Administrador de
 * anuncios de Meta —el INSUMO— y no el informe, y lo que esta tarjeta existe
 * para mostrar es el entregable; **(b)** el mesh son cuatro radiales con
 * `blur(52px)` detrás de un vidrio con `saturate(0.3)`, y satori no tiene
 * ninguna de las tres cosas: la copia plana no sería la escena sino una imitación
 * pobre de ella; **(c)** sus tres colores —`--negro-heroe`, `--fondo-medio`,
 * `--fondo-claro`— viven en `secciones.css`, que **el chequeo no lee**, así que
 * anotarlos rompería el CI y no anotarlos dejaría la tarjeta otra vez sin nadie
 * que la mire. La composición clara sigue siendo cita del sitio: es la de El
 * entregable y la de Precios, que muestran este mismo objeto sobre el campo.
 * Si el dueño quiere la tarjeta en la noche del héroe, es una decisión suya y
 * arranca por mover esos tres valores a `base.css`.
 *
 * La URL es `panel.nuvloapp.com/r/…` y no `r.nuvloapp.com`: el host depende del
 * plan, y `r.` es sólo de Marca Blanca. El plan del trial —que es al que esta
 * tarjeta le habla, porque lo que promete es empezar gratis— sale por
 * `panel.nuvloapp.com` (`nuvlo-panel/src/lib/report-public-url.ts`). Es el mismo
 * literal que muestra el marco del sitio en su estado aprobado (`Navegador.tsx`).
 *
 * ── LO QUE ESTA TARJETA NO PUEDE HACER ──────────────────────────────────────
 * Sin argumento `fonts`, `next/og` rasteriza con su tipografía de fábrica: los
 * archivos de Geist los sirve `next/font` desde `.next` y no los expone a este
 * renderer. O sea que la voz tipográfica del sitio no aparece acá. Se asume a
 * conciencia —el mundo lo llevan el color, la composición y la profundidad, que
 * sí viajan— y se decidió no salir a buscar la fuente en el build: sería una
 * dependencia de red nueva en el paso que más caro sale cuando falla.
 *
 * Por lo mismo no se copian los PESOS finos del sitio: el titular del héroe va
 * en 450 desde el 19/09/2026 y acá queda en 600, porque la familia de fábrica
 * no trae ese escalón y pedirlo devuelve el regular. Lo que sí viaja del rol es
 * el tracking y la interlínea, y esos sí están copiados.
 *
 * ── SATORI, NO UN NAVEGADOR ─────────────────────────────────────────────────
 * Esto no se renderiza con CSS de verdad. Sólo flexbox —cada nodo con más de un
 * hijo declara `display: flex` explícito—, sin grid, sin pseudo-elementos y sin
 * `background-image` externo. Por eso no está el grano de los tramos de noche:
 * pedirlo acá sería incrustar el SVG, y no vale un archivo más por una textura
 * que a este tamaño no se ve. La separación entre hijos va con `marginRight` y
 * no con `gap`, que satori resuelve de forma menos previsible.
 *
 * Los dos pseudo-elementos que el documento usa de verdad se dibujan como
 * elementos: el filete que continúa el rótulo de sección (`.i-doc .i-rotulo`
 * lo pone en un `::after`) y el candado del cromo (que en el sitio es un SVG).
 *
 * ── LOS COLORES ESTÁN COPIADOS A MANO ───────────────────────────────────────
 * Son los del sistema, en hex, porque este renderer no tiene cascada y `var()`
 * no existe acá. Cada uno lleva al lado el nombre del token del que salió, que
 * es lo único que permite auditarlos contra el sistema.
 */

export const alt =
  "Nuvlo — El reporte de tu cliente, hecho. Enviarlo es decisión tuya.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Los mismos dos KPI que encabezan el banco del informe. Ficticios, como todo
   dato de muestra del sitio, e internamente consistentes. */
const [inversion, conversaciones] = KPIS_MUESTRA;

/* Los tokens del sistema, a mano. El nombre es la trazabilidad.

   ── PUESTA AL DÍA POR TERCERA VEZ (18/09/2026) ────────────────────────────
   Ocho de los doce que había entonces estaban atrasados y la tarjeta pintaba un mundo cálido
   que el sitio ya no tiene: el campo en marfil `#fffcf8`, las tres tintas y el
   filete con el rojo por encima del azul, la crema del pie en `#f4f3f1`, y el
   cromo del navegador en `#1c2126` / `#292e34` —los mismos dos grises azulados
   que se neutralizaron ESE MISMO DÍA porque no eran los de un navegador de
   verdad—. Coincidían sólo la hoja, el acento y los dos del verde.

   Vale la pena decir qué se rompía, porque no es «un color viejo»: lo que se
   comparte por WhatsApp mostraba un campo cálido al lado de un sitio frío, o
   sea la miniatura y la página no se parecían. */
const CAMPO = "#fbfcfd"; // --color-campo
const HOJA = "#ffffff"; // --color-hoja
const HOJA_HUNDIDA = "#f1f3f6"; // --color-hoja-hundida
const TINTA = "#101519"; // --color-tinta
const TINTA_2 = "#474c52"; // --color-tinta-2
const TINTA_3 = "#666b72"; // --color-tinta-3
const FILETE = "#e5e8ec"; // --color-filete
const ACENTO = "#0f5f6b"; // --color-acento
const GRAFITO = "#202020"; // --color-grafito
const GRAFITO_ALTO = "#2d2d2d"; // --color-grafito-alto
const BUENO = "#157a4a"; // --color-bueno
const BUENO_CAMPO = "#e3f2e9"; // --color-bueno-campo
/* El rojo no lo usa ninguno de los dos KPI que esta tarjeta muestra, y está
   igual: la cápsula del sitio tiene tres estados y el color lo decide el
   NEGOCIO (`sentido`, en `lib/reporte-muestra.ts`). Sin esta rama, el día que
   alguien ponga en «malo» un KPI de muestra la tarjeta lo pintaría en gris sin
   avisar — que es exactamente la clase de silencio que este archivo ya pagó
   cuatro veces. De paso quedan dos valores más bajo el chequeo. */
const MALO = "#b5311e"; // --color-malo
const MALO_CAMPO = "#fbe8e4"; // --color-malo-campo
/* El filete del campo de dirección del cromo. Va en constante y no escrito
   adentro del estilo porque el chequeo sólo mira las CONSTANTES que llevan su
   token anotado al lado: un valor de la paleta enterrado en una propiedad de
   estilo no lo vigila nadie. (Y la anotación no se escribe de ejemplo en un
   comentario: el chequeo la lee con una expresión regular sobre el archivo
   entero y tomaría el ejemplo por un par de verdad. Ya pasó acá mismo.) */
const NOCHE_FILETE = "rgb(233 235 223 / 0.18)"; // --color-noche-filete

/* Y la forma, que tampoco se entera sola: son `--radius-hoja` y `--radius-int`, que el
   18/09/2026 bajaron de 16 y 10 con el paso más filoso de la escala. */
const R_HOJA = "13px"; // --radius-hoja
const R_INT = "8px"; // --radius-int
const R_PASTILLA = "9999px"; // --radius-pastilla

/* ── EL BLANCO DEL CROMO NO SALE DE LA PALETA, Y ESO ES LA CORRECCIÓN ────────
   Acá vivía `SOBRE_NOCHE` (`#e9ebdf`), que es la TINTA DEL CAPÍTULO DE NOCHE
   —La lectura, La máquina, el Cierre— y no la de un navegador. Es un hueso
   cálido, y con el cromo ya neutro desde el 18/09/2026 quedaba como el único
   tinte del objeto: exactamente el defecto que el dueño hizo corregir ESE DÍA
   en `.i-direccion`, donde los tres blancos pasaron de un `rgb(251 242 242)`
   rosado a este `rgb(246 246 246)` sin tinte. La tarjeta se lo quedó.

   Va sin `// --token` a propósito, y no es una excepción nueva: es el mismo
   caso que las tres luces de macOS, que tampoco son de la paleta. Un navegador
   no se pinta con los colores de la marca; el chequeo lo dice en su cabecera
   («lo que no lleva token al lado»). El valor está copiado de `.i-direccion-host`
   y `.i-direccion-token` en `secciones.css`. */
const CROMO_BLANCO = "246, 246, 246";
/* El host más apagado que la ruta, y no al revés: lo que cambia al aprobar es
   la ruta, y es lo que el sitio deja legible (`secciones.css`, 18/09/2026). */
const CROMO_HOST = `rgba(${CROMO_BLANCO}, 0.62)`;
const CROMO_TOKEN = `rgba(${CROMO_BLANCO}, 0.94)`;

/**
 * La cápsula de variación del banco de KPI, como la dibuja `Capsula` en
 * `components/iris/Piezas.tsx`.
 *
 * Dos cosas que la versión anterior de esta tarjeta tenía al revés:
 *
 *  · **El signo no se escribe.** Lo dice el triángulo, y el número va pelado
 *    (`variacion.replace(/^[+−-]/, "")`). Con los dos, la dirección se afirma
 *    dos veces y la cápsula se llena de caracteres que no son el dato.
 *  · **La neutra TAMBIÉN tiene fondo**, el de hoja hundida, con la tinta
 *    segunda. Acá iba sin fondo, y eso rompía el banco: dos cápsulas de formas
 *    distintas se leen como dos cosas distintas, cuando lo único que cambia es
 *    qué significa el número para el negocio.
 *
 * El color lo decide el NEGOCIO y viene dado en `sentido` desde
 * `lib/reporte-muestra.ts`, nunca el signo: que la inversión suba no es verde.
 */
function Capsula({
  variacion,
  sentido,
}: {
  variacion: string;
  sentido: string;
}) {
  const bueno = sentido === "bueno";
  const malo = sentido === "malo";
  /* El mismo `tickDe` del sitio, reducido a los dos casos que el banco de
     muestra produce: el «igual» de «Estable» no aparece en estos datos. */
  const baja = variacion.trimStart().startsWith("−");
  const color = bueno ? BUENO : malo ? MALO : TINTA_2;
  const campo = bueno ? BUENO_CAMPO : malo ? MALO_CAMPO : HOJA_HUNDIDA;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "20px",
        padding: "0 7px 0 6px",
        borderRadius: R_PASTILLA,
        fontSize: "12px",
        fontWeight: 500,
        color,
        backgroundColor: campo,
      }}
    >
      {/* El triángulo de `Capsula`, con su misma geometría. Satori sí rasteriza
          un `<svg>` inline; lo que no tiene es `currentColor`, así que el
          relleno se pasa explícito. */}
      <svg width="8" height="8" viewBox="0 0 9 9" style={{ marginRight: "4px" }}>
        {baja ? (
          <path d="M4.5 8.1 L0.7 1.8 H8.3 Z" fill={color} />
        ) : (
          <path d="M4.5 0.9 L8.3 7.2 H0.7 Z" fill={color} />
        )}
      </svg>
      {variacion.replace(/^[+−-]/, "")}
    </div>
  );
}

/**
 * «$ 486.250» tiene caracteres que no son el dato y que a igual cuerpo compiten
 * con él: el afijo baja a 17 y a la tinta segunda. Es `partirCifra` +
 * `.i-kpi-afijo` de `Reporte.tsx` / `documento.css`, y el corte se hace por
 * forma y no por lista de casos, así sobrevive a que cambie la moneda de la
 * cuenta publicitaria (el panel formatea con `account_currency`).
 */
function Cifra({ valor }: { valor: string }) {
  const m = valor.match(/^(\D*)([\d.,]+)(\D*)$/);
  const antes = m ? m[1].trim() : "";
  const numero = m ? m[2] : valor;
  const despues = m ? m[3].trim() : "";

  /* ── LA LÍNEA DE BASE SE ALINEA A MANO, Y HAY QUE DECIR POR QUÉ ───────────
     En el sitio el afijo y la cifra son dos `span` de la misma línea de texto,
     así que comparten la base sin que nadie la calcule. Acá son dos cajas de
     flex de cuerpos distintos, y `alignItems: "baseline"` no sirve: yoga no
     tiene la base tipográfica de un nodo de texto y la resuelve como el pie de
     su caja de línea, que en el afijo cae ~9px por debajo de la base real. Se
     ve: el `$` queda colgando debajo del número.

     Con las dos cajas a `lineHeight: 1` y alineadas al pie, lo que queda de
     error es la diferencia de descendente entre 26 y 17 —unos 2px— y el `$`,
     que no tiene descendente, se apoya donde tiene que apoyarse. */
  const afijo = {
    fontSize: "17px",
    fontWeight: 500,
    lineHeight: 1,
    color: TINTA_2,
    marginLeft: "1px",
    marginRight: "1px",
    /* Lo que queda de esa diferencia de descendente, compensado: 26 y 17 al
       21% de descendente dan 1,9px. No es un número elegido a ojo. */
    marginBottom: "2px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        margin: "8px 0 10px",
        fontSize: "26px",
        fontWeight: 600,
        lineHeight: 1,
        color: TINTA,
        letterSpacing: "-0.02em",
      }}
    >
      {antes ? <div style={afijo}>{antes}</div> : null}
      <div style={{ display: "flex" }}>{numero}</div>
      {despues ? <div style={afijo}>{despues}</div> : null}
    </div>
  );
}

/** Una celda del banco, con las medidas de `.i-kpi` en `documento.css`. */
function Kpi({
  etiqueta,
  valor,
  variacion,
  sentido,
  pista,
  conFilete,
}: {
  etiqueta: string;
  valor: string;
  variacion: string;
  sentido: string;
  pista?: string;
  conFilete: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flex: 1,
        padding: "22px 20px 24px",
        backgroundColor: HOJA,
        /* La costura del banco es el fondo de filete asomando 1px entre celdas,
           como el `gap: 1px` de `.i-banco`. Un `borderRight` dibujaría la línea
           ADENTRO de la celda blanca y no entre las dos. */
        marginRight: conFilete ? "1px" : 0,
      }}
    >
      <div style={{ fontSize: "13px", color: TINTA_3 }}>{etiqueta}</div>
      <Cifra valor={valor} />
      <Capsula variacion={variacion} sentido={sentido} />
      {/* La derivación que el reporte REAL imprime debajo de la cifra
          (`KpiCell.hint`, en el panel). La traen sólo los KPI que allá la
          tienen, así que una celda la muestra y la otra no: es el documento, no
          un descuido de alineación. */}
      {pista ? (
        <div style={{ fontSize: "12px", color: TINTA_3, marginTop: "10px" }}>
          {pista}
        </div>
      ) : null}
    </div>
  );
}

/** El rótulo de sección del documento: versalitas y un filete que cruza la hoja
 *  hasta el margen. Es lo que el dueño eligió el 17/09/2026 para que un informe
 *  largo se lea por bloques, y lo que esta tarjeta no tenía. */
function RotuloSeccion({ children }: { children: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "18px",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.07em",
        color: TINTA_2,
      }}
    >
      <div style={{ display: "flex", marginRight: "16px" }}>{children}</div>
      {/* El `::after` de `.i-doc .i-rotulo`, que acá tiene que ser un elemento.
          Se sale por el canto derecho con el resto del documento. */}
      <div style={{ display: "flex", flex: 1, height: "1px", backgroundColor: FILETE }} />
    </div>
  );
}

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: CAMPO,
          padding: "0 0 0 72px",
        }}
      >
        {/* ── LA COLUMNA DE TEXTO ──────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "470px",
            marginRight: "56px",
          }}
        >
          {/* El wordmark, pelado: el cuadradito del acento salió el 11/09/2026. */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: TINTA,
              marginBottom: "34px",
            }}
          >
            Nuvlo
          </div>

          {/* ── QUÉ ES Y PARA QUIÉN, ANTES DEL TITULAR ───────────────────────
              Literal de `.i-portada-rotulo` en `Pagina.tsx`. El dueño lo mandó
              poner el 17/09/2026 porque la primera pantalla no decía de qué
              producto se trata ni a quién le habla, y esta tarjeta ES una
              primera pantalla —la que ve alguien a quien le pegan el link en un
              chat— y nunca lo recibió. En el acento porque así lo pinta la
              página clara (`color: var(--color-acento)`).

              Queda en el cuerpo del rol y no escalado como el resto de esta
              columna —la bajada va en 24 donde el sitio pone 17— por una razón
              de largo: a 15 la frase no entra en los 470 de la columna y el
              rótulo se parte en dos renglones, que es lo que un rótulo no
              hace. La línea tiene que entrar entera o no estar. */}
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.07em",
              color: ACENTO,
              marginBottom: "18px",
            }}
          >
            REPORTES DE META ADS PARA QUIEN ATIENDE CLIENTES
          </div>

          {/* El titular del sitio, literal. Es la única afirmación que el repo
              hace sobre el producto (`PRODUCT.md`, 11/09/2026). Tracking e
              interlínea son los del `h1` del héroe desde el 19/09/2026
              (`-0.028em`, 1.2); el peso no, ver la cabecera. */}
          <div
            style={{
              fontSize: "52px",
              fontWeight: 600,
              color: TINTA,
              letterSpacing: "-0.028em",
              lineHeight: 1.12,
            }}
          >
            El reporte de tu cliente, hecho. Enviarlo es decisión tuya.
          </div>

          <div
            style={{
              fontSize: "24px",
              color: TINTA_2,
              lineHeight: 1.45,
              marginTop: "22px",
            }}
          >
            {/* Decía «sin tu visto bueno», que promete una aprobación por
                reporte que el envío automático y el programado no dan. Esta
                frase es verdad en los tres caminos, y es la que el héroe pone
                en el paso «Aprobás vos». */}
            Nuvlo calcula y la IA redacta, con tu firma al pie.
          </div>

          {/* El dominio en el acento: es el único saturado de la página y acá
              marca lo mismo que en el sitio, que es adónde se va. */}
          <div
            style={{
              fontSize: "21px",
              color: ACENTO,
              marginTop: "34px",
            }}
          >
            nuvloapp.com
          </div>
        </div>

        {/* ── LA VENTANA: EL INFORME ADENTRO DEL CROMO OSCURO ──────────────────
            Se sale del borde derecho a propósito: el documento está desplazado
            y cortado por el encuadre, nunca centrado y contenido, que es lo que
            el dueño fijó el 07/09/2026 y lo que `DESIGN.md` llama la Regla de
            la Escala de Lectura. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "720px",
            backgroundColor: GRAFITO,
            borderRadius: `${R_HOJA} 0 0 ${R_HOJA}`,
            /* El plano largo de `--shadow-ventana`, con su retracción de -18px,
               que es lo que la despega del canto. Estaba en `rgba(76, 14, 29,
               0.2)` —vino, +62 de rojo—: teñía contra una bandeja que el sitio
               retiró, igual que los tres tokens de sombra que se neutralizaron
               el 18/09/2026. Acá va un solo plano: el corto, de 2px, no se ve a
               este tamaño y satori resuelve mejor una sombra que tres. */
            boxShadow: "0 28px 56px -18px rgba(20, 20, 20, 0.24)",
          }}
        >
          {/* La barra del navegador: 44 de alto y 14 de relleno, como
              `.i-navegador`. Las tres luces de macOS y la dirección. */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "44px",
              padding: "0 14px",
            }}
          >
            {/* Las tres luces son las de macOS, no una decoración: el marco vale
                en esta página porque es cierto. 11px y 7 de separación, como
                `.i-luces`. Sus colores están sancionados en
                `.impeccable/config.json` y no salen de la paleta. */}
            <div style={{ display: "flex", flexDirection: "row", marginRight: "16px" }}>
              {["#ff5f57", "#febc2e", "#28c840"].map((c, n) => (
                <div
                  key={c}
                  style={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "9999px",
                    backgroundColor: c,
                    marginRight: n < 2 ? "7px" : 0,
                  }}
                />
              ))}
            </div>

            {/* El campo de la dirección, con la URL pública real. `--radius-int`
                y su filete de noche, como `.i-direccion`: acá era una pastilla
                sin borde, que es la forma de una chapa y no la de un campo. */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                height: "28px",
                backgroundColor: GRAFITO_ALTO,
                border: `1px solid ${NOCHE_FILETE}`,
                borderRadius: R_INT,
                padding: "0 12px",
                fontSize: "13px",
              }}
            >
              {/* El candado, dibujado en dos cajas: no hay glifos de íconos acá
                  y el SVG del sitio no se puede importar sin volverlo un `data:`
                  URI, que la CSP de producción no deja cargar. Antes era una
                  sola caja y se leía como un cuadradito; el arco es lo que lo
                  vuelve un candado. En la tinta tercera, como `.i-direccion svg`. */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginRight: "7px",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "4px",
                    border: `1.3px solid ${TINTA_3}`,
                    borderBottom: "0",
                    borderRadius: "3px 3px 0 0",
                  }}
                />
                <div
                  style={{
                    width: "10px",
                    height: "7px",
                    border: `1.1px solid ${TINTA_3}`,
                    borderRadius: "2px",
                  }}
                />
              </div>
              <div style={{ color: CROMO_HOST }}>panel.nuvloapp.com</div>
              <div style={{ color: CROMO_TOKEN }}>{RUTA_REPORTE_MUESTRA}</div>
            </div>
          </div>

          {/* El papel adentro del cromo: la bandeja oscura con 4px de aire y la
              hoja blanca apoyada. Son dos superficies que se leen como UN
              objeto, y es lo que le da interior a la ventana. */}
          <div style={{ display: "flex", padding: "0 4px 4px 4px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                backgroundColor: HOJA,
                borderRadius: `${R_INT} 0 0 ${R_INT}`,
                /* El relleno de `.i-doc-in` (64/60), escalado a lo que la
                   ventana mide acá. El documento subió un escalón de aire el
                   17/09/2026 y esta tarjeta se había quedado en la mitad: con
                   26px de margen el informe se leía apretado justo al lado de
                   un titular de 52. */
                padding: "44px 52px 0",
              }}
            >
              {/* ── 1. EL ENCABEZADO, EN EL ORDEN DEL DOCUMENTO ───────────────
                  El nombre del cliente ARRIBA y el copete debajo como línea de
                  tipo. Acá estaba al revés —«INFORME DE GESTIÓN · META ADS» en
                  versalitas encabezando la hoja—, que es el encabezado que el
                  documento dejó de tener: `Reporte.tsx` lo dice con todas las
                  letras («va debajo del nombre del cliente como línea de tipo,
                  no arriba como rótulo»).

                  Y el copete se importa, no se tipea: es un literal de
                  `buildReportHtml()` del panel y vive en `COPETE_MUESTRA` por
                  eso. Escrito a mano acá estaba además en versalitas, o sea que
                  ni siquiera era el literal. */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "30px",
                  paddingBottom: "28px",
                }}
              >
                <div
                  style={{
                    fontSize: "34px",
                    fontWeight: 600,
                    color: TINTA,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                  }}
                >
                  {CLIENTE_MUESTRA}
                </div>
                <div
                  style={{ fontSize: "14px", color: TINTA_2, marginTop: "8px" }}
                >
                  {COPETE_MUESTRA}
                </div>
                <div
                  style={{ fontSize: "14px", color: TINTA_3, marginTop: "3px" }}
                >
                  {PERIODO_MUESTRA}
                </div>
              </div>

              {/* ── 2. RESULTADOS DEL PERÍODO ─────────────────────────────────
                  Dos KPI reales, no barras grises haciendo de contenido. Son
                  los dos primeros del banco; los otros dos quedan del lado
                  cortado, que es lo que hace el encuadre con todo el documento.

                  El rótulo de sección es del documento y faltaba: sin él el
                  banco flotaba debajo del encabezado sin decir qué era. */}
              <RotuloSeccion>RESULTADOS DEL PERÍODO</RotuloSeccion>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  /* `.i-banco`: caja con filete y las costuras de 1px pintadas
                     por el fondo. Se sale por la derecha, así que sólo lleva
                     los cantos de la izquierda. */
                  border: `1px solid ${FILETE}`,
                  borderRight: "0",
                  borderRadius: `${R_INT} 0 0 ${R_INT}`,
                  backgroundColor: FILETE,
                  overflow: "hidden",
                }}
              >
                <Kpi
                  etiqueta={inversion.etiqueta}
                  valor={inversion.valor}
                  variacion={inversion.variacion}
                  sentido={inversion.sentido}
                  pista={inversion.pista}
                  conFilete
                />
                <Kpi
                  etiqueta={conversaciones.etiqueta}
                  valor={conversaciones.valor}
                  variacion={conversaciones.variacion}
                  sentido={conversaciones.sentido}
                  pista={conversaciones.pista}
                  conFilete={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
