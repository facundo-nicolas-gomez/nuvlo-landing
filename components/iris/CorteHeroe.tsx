"use client";

import { useEffect } from "react";
import { medirRenglones, parteRenglon } from "./renglones";

/**
 * EL CORTE DEL HÉROE, ATADO AL DOCUMENTO Y NO A UN NÚMERO.
 *
 * ── EL DEFECTO ──────────────────────────────────────────────────────────────
 * La ventana del informe del héroe se recorta por abajo, y ese alto estaba
 * escrito a mano en siete tramos de `secciones.css` (812, 838, 588, 605, 583,
 * 600, 608). Cada uno se calculó midiendo el documento de ese día —«el medio de
 * su hueco más los 40 del degradé»— y **cada vez que la hoja cambió de escala
 * hubo que rehacer los siete**. En la práctica no se rehicieron: la crítica del
 * 18/09/2026 midió a 1440 el clip en 908 y la línea «Datos de Meta Ads · período
 * anterior» de 892,3 a 908,3. Cortada 0,3px antes de terminar, que es lo que se
 * lee como error de recorte y no como decisión.
 *
 * Ya se había pagado dos veces al subir la escala del documento. Un número que
 * hay que recalcular cuando cambia otra cosa se va a quedar viejo; la única
 * salida es no tenerlo.
 *
 * ── LA REGLA ────────────────────────────────────────────────────────────────
 * El CSS declara la INTENCIÓN —qué parte del informe se quiere mostrar— y esto
 * corre el corte hasta el **hueco entre bloques más cercano**, que es donde un
 * corte no puede partir un renglón. El ajuste es un delta chico: no reemplaza
 * la decisión de composición, la hace caer donde no molesta.
 *
 * ── MIDE LOS BLOQUES **Y** VERIFICA LOS RENGLONES ───────────────────────────
 * Los huecos ENTRE bloques del documento —el aire que separa el banco de la
 * tabla, la tabla del plan— son los únicos lugares donde el corte se lee como
 * que el papel sigue: por eso los candidatos son los huecos y no cualquier
 * punto entre renglones, que puede caer entre dos filas de la misma tabla y se
 * lee como una fila comida.
 *
 * **Pero elegir el hueco no alcanza, y eso se descubrió midiendo.** Barriendo
 * diecisiete anchos, dieciséis quedaron limpios y a 719 la nota «Datos de Meta
 * Ads» cae DENTRO del hueco en vez de adentro de su bloque, así que el corte la
 * partía igual. Ahora los huecos se prueban en orden de cercanía y se toma el
 * primero que no parte ningún renglón: el criterio deja de ser una inferencia
 * y pasa a ser una verificación.
 *
 * Esa verificación vive en `renglones.ts`, porque el escenario de La lectura
 * tiene el mismo corte y la misma condición.
 *
 * ── SIN JS ──────────────────────────────────────────────────────────────────
 * `--ajuste-corte` no se escribe y queda la intención sola, que es exactamente
 * el comportamiento anterior. No hay dependencia nueva: hay una corrección.
 */

/** Más que esto no se corrige: si el hueco está tan lejos, la intención del
 *  tramo es otra y moverla sería rediseñar, no ajustar. */
const TOPE_AJUSTE = 90;

export function CorteHeroe() {
  useEffect(() => {
    const escena = document.querySelector<HTMLElement>(".i-heroe-escena");
    const recorte = escena?.querySelector<HTMLElement>(".i-ventana-recorte");
    // El fundido vive en la PÁGINA desde el 18/09/2026, no en el recorte: el
    // recorte se estira 72px por debajo para que la sombra de la ventana caiga,
    // así que su piso ya no es el del fundido. Se mide donde está la máscara.
    const papel = escena?.querySelector<HTMLElement>(".i-ventana-papel");
    if (!escena || !recorte || !papel) return;

    let pedido = 0;

    const ajustar = () => {
      // Se mide sin ajuste puesto, para que la intención del CSS sea siempre el
      // punto de partida y el ajuste no se acumule entre llamadas.
      escena.style.setProperty("--ajuste-corte", "0px");
      const base = papel.getBoundingClientRect();
      const bloques = Array.from(
        recorte.querySelectorAll<HTMLElement>(".i-doc-bloque"),
      )
        .map((b) => {
          const r = b.getBoundingClientRect();
          return { arriba: r.top - base.top, abajo: r.bottom - base.top };
        })
        // Los bloques que la ventana ya dejó arriba no cuentan: el héroe sube el
        // documento y los primeros quedan con coordenadas negativas.
        .filter((b) => b.abajo > 0)
        .sort((a, b) => a.arriba - b.arriba);

      if (bloques.length < 2) return;

      // Los huecos entre un bloque y el siguiente, más el que sigue al último.
      const huecos: { desde: number; hasta: number }[] = [];
      for (let i = 0; i < bloques.length - 1; i++) {
        const desde = bloques[i].abajo;
        const hasta = bloques[i + 1].arriba;
        if (hasta - desde >= 8) huecos.push({ desde, hasta });
      }
      if (!huecos.length) return;

      /* ── SE APUNTA DONDE ARRANCA EL DEGRADÉ, NO DONDE TERMINA EL RECORTE
         (dueño, 18/09/2026: «hacé más prolijo el difuminado de abajo») ───────
         Esto apuntaba a `base.height`, el borde de abajo del recorte. Ahí la
         máscara ya es totalmente transparente: no se ve nada, así que si parte
         un renglón da lo mismo. Lo que muerde es el punto donde el fundido
         EMPIEZA, y ése estaba 72px más arriba sin que nadie lo mirara.

         Medido el 18/09, con el resumen ejecutivo ya visible: el fundido
         arrancaba en 939 y el banco de KPI terminaba en 996, o sea que empezaba
         a comerse el banco por la mitad —las dos pistas quedaban a media
         opacidad, texto real medio legible, que es exactamente lo que la
         décima crítica había hecho corregir—. El borde, mientras tanto, caía
         prolijo en un hueco donde no se ve nada.

         El largo sale de `--degrade`, que declara la propia máscara, así que
         los dos breakpoints (72 y 40) siguen valiendo sin repetir el número. */
      const degrade =
        parseFloat(getComputedStyle(papel).getPropertyValue("--degrade")) || 0;
      const corte = base.height - degrade;

      // Todos los renglones del documento, una sola vez: probar cada candidato
      // contra el DOM sería volver a medir por cada hueco.
      const renglones = medirRenglones(recorte, base.top);

      // Los huecos por cercanía, y el primero que no parta nada.
      const candidatos = huecos
        .map((h) => (h.desde + h.hasta) / 2)
        .sort((a, b) => Math.abs(a - corte) - Math.abs(b - corte));

      let ajuste = 0;
      for (const objetivo of candidatos) {
        const delta = objetivo - corte;
        if (Math.abs(delta) > TOPE_AJUSTE) continue;
        if (parteRenglon(renglones, objetivo)) continue;
        ajuste = Math.round(delta);
        break;
      }
      escena.style.setProperty("--ajuste-corte", `${ajuste}px`);
    };

    const alCuadro = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        ajustar();
      });
    };

    ajustar();
    window.addEventListener("resize", alCuadro, { passive: true });
    // La hoja del héroe usa la familia del sistema: hasta que la fuente carga,
    // los bloques miden otra cosa y el hueco elegido sería el equivocado.
    document.fonts?.ready.then(ajustar).catch(() => {});
    return () => {
      window.removeEventListener("resize", alCuadro);
      if (pedido) window.cancelAnimationFrame(pedido);
    };
  }, []);

  return null;
}
