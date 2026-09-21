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
import "./masa.css";

/**
 * REGISTRO 2 — MASA. Manda el valor.
 *
 * ── LA TESIS ────────────────────────────────────────────────────────────────
 * La presencia sale de un CORTE DURO de valor a escala de página: un tramo
 * negro a sangre arriba, blanco abajo, y el documento cruzando la frontera. No
 * hay degradado, no hay grano, no hay brillo —la fuerza es la diferencia entre
 * dos superficies planas, que es la forma más barata de energía que existe y la
 * que menos se gasta con el tiempo—.
 *
 * El documento cae mitad sobre negro y mitad sobre blanco, y ése es el trabajo
 * del corte: la frontera pasa POR la prueba, así que no se puede mirar el borde
 * sin mirar el reporte.
 *
 * ── DOS REGLAS QUE ESTE REGISTRO OBLIGA A CUMPLIR ───────────────────────────
 * Sobre el tramo negro no se declara sombra ni anillo oscuro: las tres
 * elevaciones son `rgb(11 13 15 / …)` y ahí no existen. La hoja se separa del
 * negro POR VALOR. Y el botón se invierte a blanco, porque la superficie decide
 * el color y no el componente.
 *
 * ── LO QUE ESTE REGISTRO SACRIFICA ──────────────────────────────────────────
 * Un tramo negro arriba es una decisión que la página entera tiene que
 * sostener: si abajo aparecen dos o tres inversiones más, deja de significar
 * algo y pasa a ser alternancia, que es ritmo y no argumento. Elegirlo es
 * comprometerse a que el negro aparezca dos veces en toda la landing y no más.
 */
export default function RegistroMasa() {
  return (
    <div className="reg r-masa">
      <div className="m-tramo rg-oscuro">
        <Navbar />

        <main>
          <section className="m-heroe">
            <Entra className="rg-marco m-texto">
              <h1 className="m-titular">
                El reporte mensual de tu cliente, hecho. Sale cuando vos decís.
              </h1>
              <p className="rg-bajada m-bajada">
                Nuvlo conecta la cuenta de Meta Ads, calcula las métricas y
                redacta el análisis. Queda en borrador hasta que lo aprobás, y
                sale con tu marca.
              </p>
              <Accion className="m-accion" />
            </Entra>

            {/**
             * El objeto trae superficie completa y opaca, encabezado incluido.
             * Un plano que se superpone con partes transparentes termina con su
             * rótulo escrito sobre lo que tiene atrás; acá además cruzaría del
             * negro al blanco a mitad de palabra.
             */}
            <Entra demora={110} className="rg-marco m-escena">
              <div className="rg-reporte rg-claro m-doc">
                <Encabezado />
                <Banco className="m-banco" />
                <Tabla />
                <Resumen />
                <Acciones />
              </div>
            </Entra>
          </section>
        </main>
      </div>

      <div className="m-resto">
        <div className="rg-marco">
          <NotaEjemplo />
        </div>
      </div>
    </div>
  );
}
