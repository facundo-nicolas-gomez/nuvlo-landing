import { Navegador } from "./Navegador";
import { Reporte } from "./Reporte";
import { Flotantes } from "./Flotantes";

/**
 * LA ESCENA DEL HÉROE — la ventana, las piezas flotantes y el gesto.
 *
 * ── POR QUÉ EXISTE ESTE ENVOLTORIO ──────────────────────────────────────────
 * La barra de direcciones y la tarjeta de aprobación cuentan el mismo estado,
 * así que el estado no puede vivir en ninguno de los dos. Vivió acá hasta la
 * segunda crítica del 08/09/2026, que encontró una TERCERA voz contando el mismo
 * estado —la pista de la columna izquierda— y quedándose clavada en «Está en
 * borrador» después de aprobar. El estado subió a `Heroe.tsx`, que es el padre
 * común de las tres; esta escena ya no decide, muestra.
 *
 * ── EL GESTO, NO EL BUCLE ───────────────────────────────────────────────────
 * La tarjeta alternaba sola entre «Pendiente de aprobación» y «Aprobado por
 * vos» cada 3s. La crítica del 08/09/2026 encontró que eso hacía que la
 * primera pantalla se contradijera a sí misma: durante la mitad del tiempo
 * decía que el reporte estaba pendiente mientras la barra mostraba la URL
 * pública, que existe recién después de enviar. El dueño eligió la salida:
 * que la tarjeta sea el disparador.
 *
 * Ahora el visitante aprieta «Aprobar y enviar» en el héroe y pasan las dos
 * cosas juntas: la tarjeta se cierra en «Aprobado por vos» y la URL pública
 * aparece en la barra. Es el argumento del producto en un gesto, en el primer
 * viewport, y se apaga un bucle automático.
 *
 * ── LOS DOS ESTADOS SON VERDADEROS ──────────────────────────────────────────
 * Antes de aprobar, lo que se ve no es la página del cliente: es la vista
 * previa del panel (`/reportes/[id]/preview`), que existe de verdad y que
 * `preview-report-button.tsx` describe como «no genera ningún enlace
 * público». Después de aprobar es la página del cliente, con el token. La
 * escena pasa de tu pantalla a la de tu cliente, que es exactamente lo que
 * hace el producto.
 *
 * ── SE PUEDE VOLVER ─────────────────────────────────────────────────────────
 * En el producto enviado es enviado, pero esto es una demostración y el que
 * aprieta quiere comparar las dos direcciones. «Reiniciar el ejemplo» rehace
 * el estado, con la misma etiqueta que en Control: de ejemplo y no de
 * producto.
 *
 * ── SIN JAVASCRIPT ──────────────────────────────────────────────────────────
 * El servidor emite el estado pendiente, que es coherente entero: vista previa
 * en la barra y la tarjeta esperando. El botón no hace nada y no se ve la URL
 * pública, que es el costo asumido de que el gesto exista.
 */
export function Escena({
  aprobado,
  onAprobar,
  onVolver,
}: {
  aprobado: boolean;
  onAprobar: () => void;
  onVolver: () => void;
}) {
  return (
    <>
      {/* El recorte es de la ventana, no de la bandeja: así las piezas
          flotantes pueden salirse por cualquier lado. */}
      <div className="i-ventana-recorte">
        <Navegador aprobado={aprobado}>
          {/* La pila: dos meses anteriores del mismo cliente asomando detrás
              del documento, adentro de la página. Van acá y no detrás de la
              ventana porque son otros INFORMES, no otros navegadores. */}
          <div className="i-ventana-detras-2" aria-hidden="true" />
          <div className="i-ventana-detras" aria-hidden="true" />
          <Reporte />
        </Navegador>
      </div>
      {/* La pregunta del cliente y la aprobación, las dos delante: la segunda
          voz del héroe. */}
      <Flotantes aprobado={aprobado} onAprobar={onAprobar} onVolver={onVolver} />
    </>
  );
}
