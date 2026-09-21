import { Entra } from "@/components/preview/registro/Entra";
import {
  Accion,
  Acciones,
  Banco,
  Encabezado,
  Navbar,
  NotaEjemplo,
  Resumen,
  Tabla,
} from "@/components/preview/registro/Piezas";
import "./escala.css";

/**
 * REGISTRO 1 — ESCALA. Manda el titular.
 *
 * ── LA TESIS ────────────────────────────────────────────────────────────────
 * La presencia sale del CUERPO TIPOGRÁFICO y de nada más. El titular ocupa el
 * primer viewport casi entero, en el escalón más grande que el sistema permite,
 * con las líneas apretadas hasta que el bloque se lee como una sola masa de
 * texto. No hay textura, no hay color de marca, no hay ilustración: hay una
 * afirmación grande, negra y bien dibujada, y debajo el documento asomando.
 *
 * Es el registro de Ramp llevado a su consecuencia: la página confía en que lo
 * que dice alcanza, y lo dice fuerte.
 *
 * ── LO QUE ESTE REGISTRO SACRIFICA ──────────────────────────────────────────
 * El reporte queda subordinado. Se ve el encabezado, los cuatro números y el
 * arranque de la tabla, pero el visitante llega al precio habiendo leído una
 * promesa antes que una prueba. Si lo que hay que proteger es el reporte como
 * prueba viva, éste es el que más lo posterga, y hay que elegirlo sabiéndolo.
 */
export default function RegistroEscala() {
  return (
    <div className="reg r-escala">
      <Navbar />

      <main>
        <section className="e-heroe">
          <Entra className="rg-marco e-texto">
            <h1 className="e-titular">
              El reporte mensual de tu cliente, hecho. Sale cuando vos decís.
            </h1>
            <p className="rg-bajada e-bajada">
              Nuvlo conecta la cuenta de Meta Ads, calcula las métricas y
              redacta el análisis. Queda en borrador hasta que lo aprobás, y
              sale con tu marca.
            </p>
            <Accion className="e-accion" />
          </Entra>

          {/**
           * El recorte. Un documento que se corta tiene que cortarse CONTRA EL
           * BORDE de algo: acá contra el filete que cierra la escena, y el aire
           * que sigue es relleno del pie y no margen de la escena, para que la
           * nota empiece donde termina el corte. Flotando en campo vacío el
           * recorte se lee como un error y no como un documento que sigue.
           */}
          <Entra demora={90} className="rg-marco e-escena">
            <div className="e-recorte">
              <div className="rg-reporte">
                <Encabezado />
                <Banco className="e-banco" />
                <Tabla />
                <Resumen />
                <Acciones />
              </div>
            </div>
          </Entra>
        </section>

        <div className="e-pie">
          <div className="rg-marco">
            <NotaEjemplo />
          </div>
        </div>
      </main>
    </div>
  );
}
