import Navbar from "@/components/preview/d/Navbar";
import Heroe from "@/components/preview/d/Heroe";
import ReporteVivo from "@/components/preview/d/reporte/ReporteVivo";
import Control from "@/components/preview/d/Control";
import Entregable from "@/components/preview/d/Entregable";
import Limites from "@/components/preview/d/Limites";
import Planes from "@/components/preview/d/Planes";
import Preguntas from "@/components/preview/d/Preguntas";
import Cierre from "@/components/preview/d/Cierre";
import PieSitio from "@/components/preview/d/PieSitio";

/**
 * DIRECCIÓN D — la landing entera.
 *
 * El orden es un argumento, no un temario. Cada tramo existe para sostener el
 * anterior, y el reporte aparece tres veces a profundidades distintas porque es
 * la única prueba que el producto tiene:
 *
 *   Héroe        la tesis, y el reporte EN FRAGMENTO abajo. La prueba antes que
 *                la promesa: se ven cuatro números reales y la tabla asomando.
 *   El reporte   el objeto ENTERO y descompuesto en piezas, interactivo. Acá se
 *                contesta de dónde sale cada cifra, que es el argumento central.
 *   Control      por qué esas cifras son confiables. Tramo negro: la IA redacta
 *                y no calcula, y el reporte espera tu firma.
 *   Entregable   qué recibe el cliente final: el mail con tu marca, la página y
 *                el PDF. El reporte vuelve EN DETALLE.
 *   Límites      lo que el producto no hace. El pasaje tranquilo y sin objeto.
 *   Planes       el precio con su unidad, y la diferencia entre planes
 *                DEMOSTRADA con el pie del informe real.
 *   Preguntas    incluidas las que contestan que no.
 *   Cierre       la misma acción, sin promesa nueva, y la firma en grande.
 *
 * Ninguna sección repite la composición de otra: hay una fila de texto suelto,
 * una superposición de piezas en planos, una cuenta corriente sobre negro, un
 * objeto grande con dos notas, una lista de definición sin superficie, una
 * superficie partida por la retícula, un acordeón contra un titular fijo, y un
 * cierre anclado por el wordmark.
 */
export default function DireccionD() {
  return (
    <>
      <Navbar />
      <main>
        <Heroe />

        <section className="r-seccion" id="reporte">
          <div className="d-marco">
            <ReporteVivo />
          </div>
        </section>

        <Control />
        <Entregable />
        <Limites />
        <Planes />
        <Preguntas />
        <Cierre />
      </main>
      <PieSitio />
    </>
  );
}
