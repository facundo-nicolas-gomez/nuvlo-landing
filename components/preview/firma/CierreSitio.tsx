"use client";

import { Entra } from "./Entra";
import { Boton, Wordmark } from "./Piezas";

/**
 * EL CIERRE Y EL PIE.
 *
 * ── EL SEGUNDO Y ÚLTIMO TRAMO OSCURO ────────────────────────────────────────
 * Son dos: Control y éste. Dos son un paréntesis —uno abre el argumento del
 * control y el otro lo cierra—; tres serían alternancia, que es ritmo y no
 * significado.
 *
 * ── SIN PROMESA NUEVA ───────────────────────────────────────────────────────
 * El cierre repite la acción del héroe y no agrega un argumento: si hiciera
 * falta una promesa más acá abajo, el problema estaría arriba.
 */

const COLUMNAS = [
  {
    titulo: "Producto",
    enlaces: [
      { texto: "El reporte", href: "#reporte" },
      { texto: "Cómo sale", href: "#flujo" },
      { texto: "Control", href: "#control" },
      { texto: "Precios", href: "#precios" },
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

export function CierreSitio() {
  return (
    <>
      <div className="f-pasaje" aria-hidden="true" />

      <div className="f-oscuro">
        <section className="f-cierre">
          <div className="f-marco">
            <Entra className="f-cierre-texto">
              <h2 className="f-display">
                Hacé el reporte de este mes y{" "}
                <span className="f-marca-frase">fijate</span>.
              </h2>
              <p className="f-bajada f-cierre-bajada">
                Tres reportes gratis, sin tarjeta. Si lo que sale no te sirve
                para mandárselo a un cliente, no perdiste nada.
              </p>
              <div className="f-accion f-cierre-accion">
                <Boton>Empezar gratis</Boton>
                <p className="f-chico">Sólo cuentas de Meta Ads.</p>
              </div>
            </Entra>
          </div>

          {/**
           * El wordmark se recorta contra el borde inferior: se ve la mitad de
           * arriba de las letras. Un nombre entero y centrado sería un logo
           * grande; uno que se corta contra el canto es una firma que la página
           * ya no necesita terminar de decir, porque la cabecera y el pie ya la
           * dijeron.
           *
           * ── EL ÚNICO GESTO DE LA SECCIÓN ──────────────────────────────────
           * Sube desde el corte con el scroll, y nada más. Es el último
           * movimiento de la página y tiene que ser el más chico: acá el
           * visitante ya decidió o ya se fue, y una sección que se luce después
           * de la acción está compitiendo con su propio botón.
           */}
          <Entra className="f-firma-grande">
            <span aria-hidden="true">Nuvlo</span>
          </Entra>
        </section>

        <footer className="f-pie">
          <div className="f-marco f-pie-fila">
            <div className="f-pie-marca">
              <Wordmark />
              <p className="f-fino f-pie-nota">
                Reportes de Meta Ads para que los entregues con tu marca.
              </p>
            </div>

            {COLUMNAS.map((c) => (
              <div key={c.titulo} className="f-pie-columna">
                <p className="f-rotulo">{c.titulo}</p>
                <ul>
                  {c.enlaces.map((e) => (
                    <li key={e.texto}>
                      <a className="f-chico" href={e.href}>
                        {e.texto}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="f-marco">
            <p className="f-fino f-pie-legal">
              © 2026 Nuvlo. Las cifras que se muestran en este sitio son de un
              ejemplo ficticio. Nuvlo no está afiliado a Meta Platforms, Inc.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
