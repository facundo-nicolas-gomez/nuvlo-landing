import PanelLink from "@/components/landing/PanelLink";
import {
  Ventana,
  ListaReportes,
  Lateral,
  DocumentoCompacto,
  Chip,
} from "@/components/preview/mockups/Panel";

/**
 * DIRECCIÓN B — "TALLER". Clara, densa, canto definido.
 *
 * ── LOS DOS OBJETOS, Y POR QUÉ ESTÁN EN ESE ORDEN ───────────────────────────
 * Adelante la aplicación, atrás el entregable. Es la lectura del oficio: el
 * trafficker vive en la lista de reportes, y lo que sale de ahí es el informe
 * que su cliente abre. Si el documento fuera al frente, B contaría la misma
 * historia que C y las dos direcciones dejarían de ser una elección.
 *
 * El documento igual se ve, y eso no era negociable: es el único material
 * citable que tiene el sitio.
 *
 * Las dos políticas de borde conviven: la ventana de adelante lleva canto
 * definido, la de atrás se disuelve hacia el campo.
 */
export default function DireccionB() {
  return (
    <main className="b-portada">
      <header className="b-cab">
        <span className="b-wordmark">Nuvlo</span>
        <PanelLink className="b-boton b-boton-chico">Empezar gratis</PanelLink>
      </header>

      <div className="b-grilla">
        <div className="b-texto">
          <h1 className="b-titular">
            Tu cliente abre el informe. Vos abriste el borrador primero.
          </h1>
          <p className="b-bajada">
            Nuvlo trae las métricas de Meta Ads, calcula y redacta. Queda
            esperándote, y sale cuando lo aprobás.
          </p>
          <div className="b-acciones">
            <PanelLink className="b-boton">Empezar gratis</PanelLink>
            <span className="b-nota">3 reportes, sin tarjeta</span>
          </div>
        </div>

        <div className="b-escena">
          <Ventana
            titulo="Mueblería Lombardi · julio 2026"
            plano="fondo"
            className="b-vent-fondo"
            etiqueta={<Chip estado="borrador" />}
          >
            <div className="b-doc">
              <DocumentoCompacto />
            </div>
          </Ventana>

          <Ventana titulo="Reportes" plano="frente" className="b-vent-frente">
            <div className="b-panel">
              <Lateral />
              <ListaReportes />
            </div>
          </Ventana>
        </div>
      </div>
    </main>
  );
}
