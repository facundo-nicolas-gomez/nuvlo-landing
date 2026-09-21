import { Entra } from "./Entra";
import { Boton, Wordmark } from "./Piezas";

/**
 * EL CIERRE Y EL PIE — el segundo y último tramo oscuro.
 *
 * Repite la acción del héroe y no agrega un argumento: si hiciera falta una
 * promesa más acá abajo, el problema estaría arriba. El pie va en el mismo
 * tramo, sin cambio de valor, porque una página de conversión termina en su
 * botón y no en una franja gris de enlaces.
 */

const COLUMNAS = [
  {
    titulo: "Producto",
    enlaces: [
      { texto: "El reporte", href: "#reporte" },
      { texto: "Control", href: "#control" },
      { texto: "Precios", href: "#precios" },
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

export function Cierre() {
  return (
    <div className="n-oscuro">
      <section className="n-cierre">
        <div className="n-marco">
          <Entra>
            <h2 className="n-display">Hacé el reporte de este mes y fijate.</h2>
            <p className="n-bajada">
              Tres reportes gratis, sin tarjeta. Si lo que sale no te sirve para
              mandárselo a un cliente, no perdiste nada.
            </p>
            <div className="n-accion">
              <Boton>Empezar gratis</Boton>
              <p className="n-chico">Sólo cuentas de Meta Ads.</p>
            </div>
          </Entra>
        </div>
      </section>

      <footer className="n-pie">
        <div className="n-marco n-pie-fila">
          <div>
            <Wordmark />
            <p className="n-chico n-pie-nota">
              Reportes de Meta Ads para que los entregues con tu marca.
            </p>
          </div>

          {COLUMNAS.map((c) => (
            <div key={c.titulo} className="n-pie-columna">
              <p className="n-rotulo">{c.titulo}</p>
              <ul>
                {c.enlaces.map((e) => (
                  <li key={e.texto}>
                    <a className="n-chico" href={e.href}>
                      {e.texto}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="n-marco">
          <p className="n-fino n-pie-legal">
            © 2026 Nuvlo. Las cifras de este sitio son de un ejemplo ficticio.
            Nuvlo no está afiliado a Meta Platforms, Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}
