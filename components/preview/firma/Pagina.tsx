import { Entra } from "./Entra";
import {
  Aprobacion,
  BarraNavegador,
  Boton,
  EtiquetaWhatsApp,
  Navbar,
} from "./Piezas";
import {
  Encabezado,
  Metricas,
  PlanDeAccion,
  Resultados,
  Resumen,
} from "./Reporte";
import { SeArma } from "./SeArma";
import { Momento } from "./Momento";
import { Maquina } from "./Maquina";
import { Entregable } from "./Entregable";
import { Limites } from "./Limites";
import { Precios } from "./Precios";
import { Preguntas } from "./Preguntas";
import { CierreSitio } from "./CierreSitio";

/**
 * LA LANDING.
 *
 * ── EL ORDEN ES UN ARGUMENTO, NO UN TEMARIO ─────────────────────────────────
 *   Héroe         la tesis y el documento en fragmento. La prueba antes que la
 *                 promesa.
 *   Se arma       el circuito de generación corriendo solo sobre un lienzo:
 *                 los dos disparadores, los cuatro pasos del panel, los números
 *                 que devuelve el motor y la prosa que escribe la IA, separados
 *                 a la vista. Es la afirmación de `PRODUCT.md` —«la IA no
 *                 computa ni un solo número»— mostrada en vez de escrita, con
 *                 la rama que falla incluida.
 *   La máquina    tramo oscuro: las dos puntas del circuito —el bloque literal
 *                 que Nuvlo le manda a la IA sobre las campañas, sin una cifra
 *                 de la cuenta adentro, y el párrafo que la IA devuelve—, con
 *                 el banco de KPI adelante anclando las cifras que ese párrafo
 *                 nombra.
 *   El momento    la única sección que muestra la APLICACIÓN: los cuatro pasos
 *                 en una tira, y la barra de acción del borrador en grande.
 *   El entregable las tres formas en que le llega el informe al cliente —el
 *                 mail en su teléfono adelante, la página pública y el PDF
 *                 detrás—, y ninguna con una marca nuestra.
 *   Límites       lo que no hace, ordenado por tipo de límite.
 *   Precios       por cliente, al mes, con la diferencia demostrada.
 *   Preguntas     incluidas las que dicen que no.
 *   Cierre        tramo oscuro: la misma acción, sin promesa nueva.
 *
 * ── EL RASGO ────────────────────────────────────────────────────────────────
 * La marca: una forma de estadio en naranja a dos escalas —el punto que abre
 * un ítem o marca un estado, y la regla que abre una sección—. Reemplazó a la
 * serif. Se probó una tercera escala, una barra bajo la frase clave del
 * titular, dos veces en la misma sesión, y las dos veces el dueño la sacó
 * viéndola construida (PRODUCT.md, 04/09/2026, segunda vuelta): el titular se
 * apoya sólo en lo que dice la frase. Aparece más de veinte veces y es lo
 * único naranja de la página.
 *
 * ── EL HÉROE MUESTRA MENOS DOCUMENTO QUE ANTES ──────────────────────────────
 * Sólo encabezado, resumen y los cuatro números. El resto se ve entero en su
 * propia sección, así que amontonarlo también acá servía nada más que para que
 * el fundido se comiera algo.
 */
export function Pagina() {
  return (
    <div className="firma">
      <div className="f-fondo" aria-hidden="true" />

      <Navbar />

      <main>
        <section className="f-heroe">
          {/**
           * EL TITULAR TOMA EL ANCHO ENTERO, y no la columna de texto.
           *
           * Estaba adentro de la columna angosta y ahí «más grande» y «menos
           * apilado» son incompatibles: a 76px en 570px entran cuatro palabras
           * por línea y la frase sale en cinco renglones cortos. Con el ancho
           * del contenedor entran treinta y cuatro caracteres por línea y la
           * misma frase, al mismo cuerpo, se lee en dos.
           *
           * Y ordena la lectura: primero la afirmación entera, después la
           * explicación y la acción a la izquierda, y el documento a la
           * derecha. Antes el ojo tenía que elegir entre tres cosas apiladas.
           */}
          <div className="f-marco">
            <Entra>
              <h1 className="f-portada">
                El reporte mensual de tu cliente, hecho. Sale cuando{" "}
                <span className="f-marca-frase">vos decís</span>.
              </h1>
            </Entra>
          </div>

          <div className="f-marco f-fila">
            <Entra className="f-texto">
              <p className="f-bajada f-bajada-heroe">
                Nuvlo conecta la cuenta de Meta Ads, calcula las métricas y
                redacta el análisis. Queda en borrador hasta que lo aprobás, y
                sale con tu marca.
              </p>
              <div className="f-accion f-accion-heroe">
                <Boton>Empezar gratis</Boton>
                <p className="f-chico">
                  <span className="f-cifra">3</span> reportes gratis, sin
                  tarjeta.
                </p>
              </div>
            </Entra>

            {/**
             * Las hojas de atrás van en blanco a propósito: son los meses
             * anteriores del mismo cliente, que existen y no hace falta
             * dibujar. Inventarles contenido sería inventar producto.
             */}
            <Entra demora={160} className="f-escena">
              <div className="f-pila f-pila-2" aria-hidden="true" />
              <div className="f-pila f-pila-1" aria-hidden="true" />

              {/* El piso existe porque el marco está enmascarado para fundirse
                  con el fondo y una máscara recorta también la sombra del propio
                  elemento. Adentro va una forma vacía que no se ve nunca: lleva
                  el mismo fundido que el marco, y el piso proyecta su sombra con
                  `drop-shadow`, que se calcula sobre ese alfa. Así la sombra se
                  disuelve junto con el documento en vez de quedar como la última
                  silueta visible. */}
              <div className="f-piso" aria-hidden="true">
                <span />
              </div>

              <div className="f-navegador">
                <BarraNavegador />
                <div className="f-recorte">
                  {/**
                   * EL FRAGMENTO: el documento en el orden del reporte real.
                   *
                   * Encabezado, resumen ejecutivo, las cuatro cifras y la
                   * tabla, en el orden que imprime `buildReportHtml()` en el
                   * panel. El resumen estuvo salteado un tiempo —era prosa y
                   * empujaba las cifras abajo del pliegue—, pero saltearlo
                   * mostraba un documento que el producto no genera; lo que se
                   * ajustó en su lugar fue la escala interna.
                   *
                   * El plan de acción está pero NO SE VE, y las dos cosas son
                   * a propósito. No se ve porque cae entero abajo del recorte,
                   * que corta en las primeras filas de la tabla. Y está porque
                   * sin él el documento medía menos que el recorte: terminaba
                   * 8px antes del corte y se le veía el borde inferior y las
                   * esquinas redondeadas justo cuando el fundido todavía no
                   * había terminado de taparlo. Un documento que se corta tiene
                   * que tener algo abajo para cortar; si no, no se corta,
                   * termina.
                   */}
                  <div className="f-reporte">
                    <Encabezado />
                    <Resumen />
                    <Resultados />
                    <Metricas />
                    <PlanDeAccion />
                  </div>
                </div>
              </div>

              <Aprobacion />
              <EtiquetaWhatsApp />
            </Entra>
          </div>
        </section>

        {/* «Se arma» ocupa el lugar de Anatomía y se queda con su `id`, que es
            a donde apunta la barra de navegación. `Anatomia.tsx` y sus estilos
            siguen en el repo, desmontados: el borrado lo confirma el dueño
            aparte. El texto del enlace de la barra —«El reporte»— ya no
            describe a esta sección; eso se cierra en la tanda de la
            navegación. */}
        <SeArma />
        <Maquina />
        <Momento />
        <Entregable />
        <Limites />
        <Precios />
        <Preguntas />
        <CierreSitio />
      </main>
    </div>
  );
}
