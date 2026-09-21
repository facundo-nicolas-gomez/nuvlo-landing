import Encabezado from "@/components/preview/Encabezado";
import Portada from "@/components/preview/Portada";
import Prueba from "@/components/preview/Prueba";
import Control from "@/components/preview/Control";
import Limites from "@/components/preview/Limites";
import Planes from "@/components/preview/Planes";
import Preguntas from "@/components/preview/Preguntas";
import Cierre from "@/components/preview/Cierre";
import Pie from "@/components/preview/Pie";

/**
 * LA PÁGINA.
 *
 * El orden es un argumento y no una lista de secciones intercambiables:
 *
 *   Portada    la promesa, con el documento ya a la vista
 *   Prueba     el documento entero y legible. Es la única evidencia citable
 *              que tiene el sitio, así que va segundo y ocupa lo que ocupa
 *   Control    quién decide que eso salga, dibujado como un corte en la línea
 *   Límites    qué NO hace, de frente, antes de hablar de plata
 *   Planes     el precio, con la diferencia entre planes mostrada al pie
 *   Preguntas  lo que queda, agrupado por momento de la duda
 *   Cierre     la pregunta del oficio y el único clic que importa
 *
 * Producto antes que proceso: al visitante le va la reputación en el
 * entregable, así que lo primero que necesita juzgar es si la salida sirve
 * para mandársela a su cliente. Recién después importa cómo se produce.
 */
export default function Preview() {
  return (
    <>
      <Encabezado />
      <Portada />
      <Prueba />
      <Control />
      <Limites />
      <Planes />
      <Preguntas />
      <Cierre />
      <Pie />
    </>
  );
}
