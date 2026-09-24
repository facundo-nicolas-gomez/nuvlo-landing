import type { Metadata, Viewport } from "next";
import { Geist, Google_Sans } from "next/font/google";
import "./globals.css";

/**
 * EL SISTEMA DE LA DIRECCIÓN VIGENTE, EN EL LAYOUT RAÍZ (11/09/2026).
 *
 * Vivían en `app/preview/iris/layout.tsx` y subieron acá: es el primer paso de
 * la promoción. Van DESPUÉS de `globals.css` y no como `@import` adentro suyo
 * a propósito — el orden de la cascada tiene que quedar igual al que producía
 * el layout anidado (global primero, iris después), y un `@import` sólo puede
 * ir arriba de todo, o sea que habría invertido los dos.
 *
 * `app/estilos/` no es un segmento de ruta: una carpeta bajo `app/` sólo lo es
 * si tiene `page.tsx` o `route.ts`.
 */
import "./estilos/base.css";
import "./estilos/documento.css";
import "./estilos/secciones.css";

/**
 * UNA SOLA FAMILIA: INTER, CON SU EJE DE TAMAÑO ÓPTICO.
 *
 * Subió acá desde `app/preview/iris/layout.tsx` el 11/09/2026, y con eso se
 * fueron Onest y Bricolage, que eran la voz del mundo retirado «Sala de
 * revisión». Cierra de paso los 54,3 KB de fuentes que el layout raíz
 * precargaba en TODAS las rutas para una sola de ellas.
 *
 * ── CÓMO SE LLEGÓ ACÁ, PORQUE EL CAMINO ES EL ARGUMENTO ─────────────────────
 * El dueño fijó que el sitio no mezcla familias. Se probaron 60 caras en un
 * banco de especímenes —`preview/tipos`, borrado con la promoción, que era su
 * condición desde que se armó— y el banco no destrabó nada; lo que destrabó fue
 * preguntarle qué le gusta. Nombró Attio, Linear, Resend y
 * Ramp, y midiendo el `font-family` computado de los cuatro salió que tres son
 * Inter (Attio con Inter Display en titulares, Linear con Inter Variable en
 * todo, Resend con Inter en cuerpo).
 *
 * ── POR QUÉ NO SE VE ANÓNIMA, QUE ERA EL MIEDO ──────────────────────────────
 * Lo que hace que esos sitios se vean caros no es que la cara tenga carácter:
 * es el CORTE DISPLAY en cuerpo grande, el tracking cerrado y la contención del
 * resto del sistema. «Inter Display» no es otra familia —es Inter con el eje
 * `opsz` alto—, así que declarando el eje el navegador lo pide solo.
 *
 * Condición no negociable, medida y no leída de la ficha: «111111», «000000» y
 * «444444» rinden el mismo ancho con `tabular-nums`. Doce de las 60 probadas
 * fallan eso —DM Sans, Cabin, Roboto Slab entre ellas— y desalinean la tabla de
 * métricas fila contra fila. Inter pasa.
 *
 * ── EL WORDMARK, Y ES PROVISORIO ────────────────────────────────────────────
 * Acá vivía el acuerdo entre repos de mantener Bricolage 800 en el wordmark
 * porque el panel se alinea a lo que decida la landing. **El dueño lo dio por
 * viejo el 11/09/2026**: el wordmark pasa a Inter 700 pelado, sin el cuadradito
 * de color que lo acompañaba.
 *
 * **Inter 700 es el estado intermedio, no el destino.** Vale hasta que el SVG
 * de la marca esté regularizado (hoy en `public/marca/`, sin versionar); cuando
 * lo esté, el wordmark pasa a ser ese dibujo y esta nota se cierra. Hasta
 * entonces no se vuelve a abrir la tanda de alineación del panel por el
 * wordmark: se abre una sola vez, con el SVG final.
 *
 * Sin itálica en la instancia del sitio: no se usa en ninguna superficie de
 * marketing, y `next/font` descarga sólo lo que se declara. Las tres páginas
 * legales sí tienen un `<em>` y cargan su propia instancia, sin precarga
 * (`components/landing/LegalPage.tsx`).
 *
 * La fuente se sirve desde el propio origen, así que la CSP cerrada a 'self' de
 * `next.config.ts` no necesita excepciones.
 *
 * ── GEIST, POR DECISIÓN DEL DUEÑO (12/09/2026) ──────────────────────────────
 * Todo lo de arriba es la historia de cómo se llegó a Inter, y se deja porque
 * el método sigue valiendo. La familia ya no: el dueño vio Geist en la pantalla
 * de entrar del panel —que la trajo un componente de 21st— y la pidió como
 * tipografía de Nuvlo para los dos repos. La landing decide y el panel copia,
 * que es el orden de siempre; `sistema/nuvlo.css` lleva la misma línea.
 *
 * Lo que se pierde, y se pierde a sabiendas: **el eje `opsz`**. Geist no lo
 * tiene, así que el titular de 64px y el cuerpo de 15px son la misma forma
 * escalada; el corte Display que hacía que Inter no se leyera anónima acá no
 * existe, y lo que carga esa diferencia pasa a ser el peso, el tracking y el
 * cuerpo. Lo que no se pierde: las cifras tabulares (medido: «111111»,
 * «000000» y «444444» rinden el mismo ancho con `tabular-nums`), que era la
 * condición no negociable. Y las medidas contadas en caracteres —la de la
 * prosa, la del reporte— se remidieron con la familia nueva; los números
 * viven en `DESIGN.md`.
 */
const sans = Geist({
  variable: "--fuente-nuvlo",
  subsets: ["latin"],
  display: "swap",
});

/**
 * La única excepción a la familia única, y no es de la landing: la pantalla
 * del teléfono de El entregable muestra Gmail, y Gmail se compone en Google
 * Sans. Es la tipografía del objeto citado, como las tres luces del marco de
 * navegador son las de macOS. Se sirve desde el propio origen igual que Inter y
 * sólo se aplica dentro de `.i-tel-pantalla`. Pedido del dueño (07/09/2026):
 * «acercala a la de Gmail».
 *
 * ── SIN PRECARGA, Y ES CONSECUENCIA DE HABER SUBIDO AL LAYOUT RAÍZ ──────────
 * Mientras se declaraba en la ruta de preview, precargarla costaba sólo ahí.
 * Declarada en el layout raíz se precarga en TODAS las rutas, y las tres
 * legales no tienen ningún teléfono: pagaban una fuente que no usan.
 *
 * `preload: false` la baja recién cuando el CSS la pide. Lo que se acepta a
 * cambio es un cambio de cara tardío en la pantalla del teléfono, que vive muy
 * por debajo del pliegue y ya declara `display: swap`.
 */
const gmail = Google_Sans({
  variable: "--i-gmail",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
  display: "swap",
  preload: false,
});

/**
 * ── UNA SOLA AFIRMACIÓN, Y ES LA DEL TITULAR (11/09/2026) ───────────────────
 * El repo venía diciendo tres cosas distintas del mismo producto: el `title`
 * decía «listo en un clic», el h1 de la página «hecho. Sale cuando vos decís» y
 * el `alt` de la tarjeta social «ya está escrito». Las tres se escribieron en
 * momentos distintos y ninguna sabía de las otras.
 *
 * Manda la del titular, por dos motivos. Es la que el dueño aprobó mirándola en
 * la página, y es la única de las tres que cumple el segundo principio de
 * `PRODUCT.md`: **«listo en un clic» sólo se puede decir junto a «vos lo
 * aprobás»**. El `title` viejo decía la velocidad sin el control, que es
 * exactamente el orden que ese principio prohíbe.
 *
 * ── LA DESCRIPCIÓN YA NO ES LA BAJADA (18/09/2026) ────────────────────────
 * Fueron el mismo texto a propósito hasta que se vio que hacían dos trabajos
 * distintos. Acá la frase tiene que explicar el producto a alguien que NO vio la
 * página —un resultado de búsqueda, un enlace pegado en un chat— y para eso una
 * lista de capacidades es lo correcto: conecta, calcula, redacta, queda en
 * borrador. En el héroe la misma lista era lo más intercambiable de la página.
 *
 * Así que la frase se queda acá, donde sirve, y el héroe escribe la suya
 * (`Heroe.tsx`). Lo que sigue atado es el TITULAR: `TITULO` es literal el `h1`,
 * y eso sí tiene que cambiar junto.
 *
 * ── Y LA BAJADA SE CORRIGIÓ DOS VECES POR EXACTITUD (12/09/2026) ───────────
 * Decía «Queda en borrador hasta que lo aprobás, y sale con tu marca». Las dos
 * mitades prometían de más:
 *
 *   · «queda en borrador hasta que lo aprobás» es verdad en MANUAL, que es el
 *     modo por defecto (`AdAccount.reportingMode @default(MANUAL)`), y falso en
 *     AUTO: ahí `decideAutoSend` manda el reporte sin que nadie apriete nada.
 *   · «sale con tu marca» es la promesa entera de Marca Blanca puesta en la
 *     bajada del plan barato: en Estándar el informe cierra con
 *     «<agencia> · Generado con Nuvlo» (`report-footer.ts`). Lo que sí es verdad
 *     en los dos planes es que el informe va firmado por el usuario —su nombre
 *     arriba, como remitente y en la firma del mail—.
 *
 * El titular no se tocó: «Sale cuando vos decís» cubre los dos modos, que es
 * justamente por qué era el que mandaba.
 */
// Desde el 24/09/2026 en español neutro y sin voseo, igual que el titular
// (ver `Pagina.tsx`); por lo mismo el `locale` dejó de ser `es_AR`.
const TITULO = "Nuvlo | El reporte de tu cliente, hecho. Enviarlo es decisión tuya.";
const DESCRIPCION =
  "Nuvlo conecta la cuenta de Meta Ads de tu cliente, calcula las métricas y redacta el análisis. Queda en borrador hasta tu aprobación —o sale solo, si está programado—, con tu firma.";

export const metadata: Metadata = {
  metadataBase: new URL("https://nuvloapp.com"),
  title: TITULO,
  description: DESCRIPCION,
  openGraph: {
    type: "website",
    siteName: "Nuvlo",
    locale: "es_LA",
    url: "https://nuvloapp.com",
    title: TITULO,
    description: DESCRIPCION,
  },
};

/**
 * ── EL ÁREA SEGURA, ENCENDIDA (19/09/2026) ──────────────────────────────────
 * `viewport-fit=cover` es lo único que hace que `env(safe-area-inset-*)`
 * devuelva algo distinto de cero. Sin esto, las dos reglas que ya lo usaban
 * —la franja del héroe y la barra pegada de El entregable, en `secciones.css`—
 * estaban escritas pero muertas: calculaban `+0px` en todos los teléfonos.
 *
 * Con `cover`, el campo llega hasta el canto físico de la pantalla —el vidrio
 * redondeado, la barra del indicador— y el contenido se vuelve a meter con
 * `--borde-x`, que ya es el lever único del sitio (mueve el texto y los rieles
 * juntos). Lo que se gana es el teléfono ACOSTADO: sin esto, la primera palabra
 * de cada renglón cae debajo de la muesca.
 *
 * No se tocan `width` ni `initialScale`: Next los trae en su viewport por
 * defecto (`createDefaultViewport`, en `next/dist/lib/metadata`) y exportar
 * este objeto parcial los conserva. Y no se declara `maximumScale` ni
 * `userScalable: false`: bloquear el zoom en un sitio de marketing le saca el
 * aumento a quien lo necesita, que es lo contrario del piso de `PRODUCT.md`.
 */
export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /**
   * `h-full` en el `<html>` y `min-h-full flex flex-col` en el `<body>` eran el
   * andamio del pie pegado del mundo retirado: la cabecera arriba, un
   * `<main class="flex-1">` que empujaba y el pie abajo. Las dos superficies de
   * hoy arman su propia página adentro de `.iris` y ninguna usa `flex-1`, así
   * que se fueron el 11/09/2026. El fondo del `body` lo pinta `body:has(.iris)`
   * en `estilos/base.css`.
   */
  return (
    <html lang="es" className={`${sans.variable} ${gmail.variable} antialiased`}>
      {/**
       * Acá vivía el contrato de dirección incrustado como comentario HTML en
       * el marcado emitido. Se sacó por dos motivos: describía el mundo «Sala de
       * revisión», que está retirado, y —el que importa— un contrato de
       * dirección es material de desarrollo y no se publica al navegador. Vive
       * en `.impeccable/surfaces/`, que es de donde lo leen las revisiones.
       */}
      {/* ── `suppressHydrationWarning` EN EL BODY, Y SÓLO ACÁ (19/09/2026) ─────
          El dev overlay marcaba un issue permanente: el servidor manda `<body>`
          pelado y el cliente lo hidrata con `cz-shortcut-listen="true"` encima.
          Ese atributo no lo escribe nadie en este repo —verificado grepeando
          `app/`, `components/` y `lib/`— : lo inyecta una extensión del
          navegador antes de que React hidrate, así que no hay nada que arreglar
          en el código y el aviso no se puede ganar.

          El escape vale acá porque React lo aplica a UN nivel: silencia los
          atributos y el texto directo de este elemento, no los de sus hijos. O
          sea que tapa exactamente la clase de discordancia que provocan las
          extensiones —que siempre tocan `<html>` o `<body>`— y deja visible
          todo lo que pase adentro de la página, que es lo que sí importa.
          Nada de este repo escribe atributos en el `<body>`, así que no hay
          ninguna discordancia propia que esto pueda estar ocultando. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
