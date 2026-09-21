/**
 * EL PIE. Completo.
 *
 * Tres columnas de enlaces reales —producto, legales y contacto—, el wordmark
 * con la línea de posicionamiento, y la nota de que los datos del reporte de
 * muestra son ficticios, que es donde corresponde repetirla una última vez.
 *
 * Blanco táctil: cada enlace mide 44px de alto, y el alto lo pone la caja
 * (`inline-flex` más `min-height`), no el cuerpo del texto. Son objetivos
 * chicos y pegados entre sí justo en las legales, que es lo que alguien abre
 * cuando está decidiendo si confiar.
 */

const COLUMNAS = [
  {
    titulo: "Producto",
    enlaces: [
      { texto: "El reporte", href: "#reporte" },
      { texto: "Control", href: "#control" },
      { texto: "El entregable", href: "#entregable" },
      { texto: "Precios", href: "#planes" },
      { texto: "Preguntas", href: "#preguntas" },
    ],
  },
  {
    titulo: "Legales",
    enlaces: [
      { texto: "Términos", href: "/terminos" },
      { texto: "Privacidad", href: "/privacidad" },
      { texto: "Reembolsos", href: "/reembolsos" },
    ],
  },
  {
    titulo: "Contacto",
    enlaces: [
      { texto: "soporte@nuvloapp.com", href: "mailto:soporte@nuvloapp.com" },
      { texto: "Entrar al panel", href: "https://panel.nuvloapp.com" },
    ],
  },
];

export default function PieSitio() {
  return (
    <footer className="f-pie">
      <div className="d-marco f-fila">
        <div className="f-marca">
          <p className="f-wordmark">Nuvlo</p>
          <p className="t-chico f-linea">
            Reportes de Meta Ads para traffickers que los entregan con su propia
            marca.
          </p>
        </div>

        <div className="f-columnas">
          {COLUMNAS.map((col) => (
            <nav key={col.titulo} aria-labelledby={`f-${col.titulo}`}>
              <p className="t-rotulo" id={`f-${col.titulo}`}>
                {col.titulo}
              </p>
              <ul className="f-enlaces">
                {col.enlaces.map((e) => (
                  <li key={e.texto}>
                    <a href={e.href} className="f-enlace">
                      {e.texto}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="d-marco f-base">
        <p className="t-fino">
          © {new Date().getFullYear()} Nuvlo. Precios en dólares, procesados por
          Paddle.
        </p>
        <p className="t-fino">
          El reporte que se muestra en esta página usa datos ficticios.
        </p>
      </div>
    </footer>
  );
}
