import PanelLink from "@/components/landing/PanelLink";

/**
 * Cabecera. Una sola línea, 64px, y tres elementos: wordmark, un ancla y el CTA.
 *
 * No hay menú de navegación porque no hay a dónde navegar: la página tiene una
 * sola conversión y las otras secciones están abajo, a un scroll de distancia.
 * Una barra con seis links falsos sería cromo de sitio corporativo sobre un
 * sitio que no lo es.
 */
export default function Encabezado() {
  return (
    <header className="cab">
      <div className="contenedor cab-fila">
        <span className="wordmark">Nuvlo</span>
        <nav className="cab-acciones">
          <a className="cab-ancla" href="#planes">
            Precios
          </a>
          <PanelLink className="barra barra-chica">Empezar gratis</PanelLink>
        </nav>
      </div>
    </header>
  );
}
