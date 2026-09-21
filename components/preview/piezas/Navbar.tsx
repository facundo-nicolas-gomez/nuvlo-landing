import PanelLink from "@/components/landing/PanelLink";

/**
 * 00 · NAVBAR.
 *
 * Fija, 68px, sobre el carbón del héroe. Los enlaces apuntan a las secciones
 * que EXISTEN en esta entrega: cuando entren El reporte, Precios y Preguntas,
 * entran también sus anclas. Un enlace que no lleva a ningún lado es peor que
 * un enlace que todavía no está.
 *
 * "Iniciar sesión" y "Empezar gratis" van al panel, que es el único destino
 * real que tiene el sitio.
 */
const ENLACES = [
  { href: "#reparto", texto: "Cómo funciona" },
  { href: "#control", texto: "Cómo sale" },
  { href: "#aprobar", texto: "Antes de enviar" },
];

export default function Navbar() {
  return (
    <header className="p-nav">
      <div className="p-marco">
        <div className="p-nav-fila">
          <a className="p-wordmark" href="#inicio">
            Nuvlo
          </a>

          <nav className="p-nav-links" aria-label="Secciones">
            {ENLACES.map((e) => (
              <a className="p-nav-link" href={e.href} key={e.href}>
                {e.texto}
              </a>
            ))}
          </nav>

          <div className="p-nav-der">
            <PanelLink className="p-nav-sesion">Iniciar sesión</PanelLink>
            <PanelLink className="p-btn p-btn-chico">Empezar gratis</PanelLink>
          </div>
        </div>
      </div>
    </header>
  );
}
