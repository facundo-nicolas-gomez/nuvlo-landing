import type { Metadata } from "next";
import { Navbar } from "@/components/iris/Navbar";
import { Navegador } from "@/components/iris/Navegador";
import { Pie } from "@/components/iris/Pie";
import { Boton } from "@/components/iris/Piezas";
import { Reporte } from "@/components/iris/Reporte";
import { AGENCIA_MUESTRA } from "@/lib/reporte-muestra";

/**
 * EL INFORME, ENTERO.
 *
 * ── DE DÓNDE SALE (dueño, 09/09/2026; construida el 19/09/2026) ─────────────
 * La home muestra el documento TRES veces y las tres cortado —el héroe desde el
 * banco de KPI, Control desde el plan, «Lo que abre» sólo el encabezado—, así
 * que **el objeto que el trafficker tiene que firmar con su nombre no se veía
 * entero en ningún lado**. El dueño lo abrió el 09/09 y quedó sin construir
 * cinco pasadas seguidas.
 *
 * Lo que lo frenaba era una confusión: el brief citaba *La Regla de la Escala
 * de Lectura* como si lo prohibiera. No lo prohíbe. Esa regla prohíbe la
 * MINIATURA —mostrar el documento tan chico que no se pueda leer— y esto es lo
 * contrario. No había conflicto que resolver.
 *
 * ── LO QUE NO LLEVA, Y ES LA MITAD DEL DISEÑO ───────────────────────────────
 * Sin héroe propio, sin secciones de marketing, sin un tour anotado encima del
 * documento —eso ya lo hace «El informe, parte por parte»— y sin un segundo CTA
 * compitiendo. **Si la página necesitara explicar el documento, el documento
 * estaría mal.** La home ya argumentó; acá el objeto se defiende solo.
 *
 * El único camino de vuelta es el wordmark de la barra, que es el que el
 * visitante ya sabe usar. No se le suma un «volver» aparte: sería un segundo
 * camino para lo mismo.
 *
 * ── LA URL ES LA DEL ESTÁNDAR, Y NO ES INDISTINTO ───────────────────────────
 * `panel.nuvloapp.com/r/…`, el mismo token que el resto del sitio. El host de
 * Marca Blanca (`r.nuvloapp.com`) aparece SÓLO en Precios, como la diferencia
 * que ese plan compra; mostrarlo acá haría que el sitio enseñe dos direcciones
 * para el mismo objeto y le sacaría a Precios su diferencia. Además la única
 * conversión es la prueba gratuita, que no tiene suscripción y por lo tanto es
 * Estándar, y el pie del informe cierra con «Generado con Nuvlo», que es el
 * cierre de ese plan: cambiar el host sin cambiar el pie sería un informe que
 * se contradice a sí mismo.
 *
 * ── LA FICCIÓN SE DECLARA ACÁ Y NO SÓLO EN EL PIE ───────────────────────────
 * La página es indexable, así que alguien puede aterrizar desde una búsqueda
 * sin haber visto la home. El pie del sitio ya dice que las cifras son de un
 * ejemplo ficticio, y acá no alcanza con eso: el aviso va arriba del documento,
 * antes de que se lea un solo número.
 */
export const metadata: Metadata = {
  title: "El reporte que recibe tu cliente — Nuvlo",
  description:
    "El reporte de Meta Ads completo, tal como lo abre el cliente que lo recibe: encabezado, resumen, las cuatro cifras, el detalle contra el mes anterior, el plan de acción y la firma. Ejemplo con datos ficticios.",
  alternates: { canonical: "/reporte" },
  openGraph: {
    type: "website",
    siteName: "Nuvlo",
    locale: "es_LA",
    url: "https://nuvloapp.com/reporte",
    title: "El reporte que recibe tu cliente — Nuvlo",
    description:
      "El reporte de Meta Ads completo, tal como lo abre el cliente que lo recibe. Ejemplo con datos ficticios.",
  },
};

export default function PaginaReporte() {
  return (
    <div className="iris i-reporte-pagina">
      <Navbar />

      <main className="i-reporte" id="contenido" tabIndex={-1}>
        <div className="i-marco">
          <div className="i-reporte-cabeza">
            <h1 className="i-reporte-titulo">El reporte que recibe tu cliente</h1>
            <p className="i-chico i-reporte-nota">
              Así lo abre, en su propia página. Las cifras son de un ejemplo
              ficticio: Nuvlo no publica datos de ninguna cuenta real.
            </p>
          </div>

          {/* La misma composición que «Lo que abre» de El entregable, sin
              recortar: el marco de navegador con la URL verdadera, el cabezal
              de la página pública que sirve el panel —la marca de la agencia y
              «Descargar PDF»— y el documento. Se reusa entera a propósito: si
              esta página compusiera el informe distinto del que muestra la
              home, duplicaría el problema que vino a cerrar. */}
          <div className="i-reporte-ventana">
            <Navegador aprobado>
              <div className="i-publica-cabezal" aria-hidden="true">
                <div className="i-publica-cabezal-in">
                  <span className="i-publica-agencia">{AGENCIA_MUESTRA}</span>
                  <span className="i-publica-pdf">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    Descargar PDF
                  </span>
                </div>
              </div>
              <Reporte />
            </Navegador>
          </div>

          {/* El único CTA del sitio, al pie y no arriba: quien llegó hasta acá
              terminó de leer el documento, y es el momento en que la pregunta
              «¿lo quiero mandar yo?» ya se contestó sola. */}
          <div className="i-reporte-cierre">
            <Boton>Empezar gratis</Boton>
            <p className="i-chico i-reporte-cierre-nota">
              <span className="i-cifra">3</span> reportes gratis, sin tarjeta.
            </p>
          </div>
        </div>
      </main>

      {/* El mismo envoltorio que las legales, y por el mismo motivo: `Pie.tsx`
          se compone DE NOCHE en todo el sitio, y sin `.i-noche` sale sobre el
          campo claro con sus enlaces pintados como prosa —vino y subrayados—,
          que es un pie distinto del de las otras cinco páginas. Se vio
          mirando, no leyendo: el componente es el mismo y el defecto estaba en
          lo que lo rodea. */}
      <footer className="i-noche i-legal-pie">
        <Pie />
      </footer>
    </div>
  );
}
