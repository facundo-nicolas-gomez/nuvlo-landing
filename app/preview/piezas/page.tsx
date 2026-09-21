import Navbar from "@/components/preview/piezas/Navbar";
import Heroe from "@/components/preview/piezas/Heroe";
import Reparto from "@/components/preview/piezas/Reparto";
import Control from "@/components/preview/piezas/Control";
import Aprobacion from "@/components/preview/piezas/Aprobacion";

/**
 * DIRECCIÓN "C · PIEZAS". Primera entrega: sistema y secciones 00 a 04.
 *
 * Ruta nueva y no reemplazo de /preview/c: el sistema visual es otro
 * (tipografía, color, escala y composición), y B y C quedan intactas para poder
 * comparar las tres.
 *
 *   00  Navbar        oscuro   fija, con la navegación que faltaba
 *   01  Héroe         oscuro   cinco piezas reales del producto en cinco planos
 *   02  Reparto       claro    qué hace solo y qué hacés vos, en dos carriles
 *   03  Control       claro    los dos modos, conmutables
 *   04  Aprobación    claro    el envío a escala grande, en sus dos estados
 *
 * Faltan 05 a 11 (el reporte desarmado, la IA, el correo, los límites, precios,
 * preguntas y el cierre con footer), aprobadas en los bocetos.
 */
export default function DireccionPiezas() {
  return (
    <>
      <Navbar />
      <main>
        <Heroe />
        <Reparto />
        <Control />
        <Aprobacion />
      </main>
    </>
  );
}
