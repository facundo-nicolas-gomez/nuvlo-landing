import PanelLink from "@/components/landing/PanelLink";
import { DOCUMENTO_MUESTRA } from "@/lib/reporte-muestra";
import {
  Ventana,
  Recorrido,
  DocumentoCompacto,
  Chip,
} from "@/components/preview/mockups/Panel";
import Control from "@/components/preview/c/Control";
import Correo from "@/components/preview/c/Correo";
import Prueba from "@/components/preview/c/Prueba";
import Limites from "@/components/preview/c/Limites";
import Planes from "@/components/preview/c/Planes";
import Preguntas from "@/components/preview/c/Preguntas";
import Cierre from "@/components/preview/c/Cierre";

/**
 * DIRECCIÓN C - "ESTADOS". La página entera.
 *
 * ── EL RECORRIDO DE VALOR, QUE ES LA ESTRUCTURA DE LA PÁGINA ────────────────
 * El diagnóstico de "se ve plana" no era de composición sino de RANGO: todo el
 * sitio vivía entre #f1f3f6 y #ffffff, seis puntos de valor, 1,06:1. Sin rango
 * no hay con qué modelar y ninguna grilla lo arregla.
 *
 * Así que la página tiene ahora una estructura de luz a lo largo de su
 * longitud, y cada tramo es un movimiento distinto:
 *
 *   1  Portada     claro    la ventana del panel, cortándose contra el borde
 *   2  Control     NEGRO    el hueco de ocho minutos, tipografía como objeto
 *   3  Correo      NEGRO    captura real de Gmail: el mail que sale del panel
 *   4  Prueba      cruce    la hoja sale del negro y baja al claro
 *   5  Límites     claro    sin una sola superficie, el pasaje tranquilo
 *   6  Planes      claro    una superficie partida, no dos tarjetas gemelas
 *   7  Preguntas   claro    titular fijo, grupos que pasan
 *   8  Cierre      NEGRO    cierra el paréntesis
 *
 * Ninguna sección repite la composición de otra, y las dos superposiciones que
 * cruzan un cambio de valor -la ventana bajando al negro, la hoja saliendo de
 * él- son las dos únicas de la página. Un recurso que se usa en todas partes
 * deja de leerse como profundidad y pasa a leerse como manierismo.
 */
export default function DireccionC() {
  return (
    <main className="c-pagina">
      <section className="c-portada" data-seccion="portada">
        <div className="c-marco">
          <header className="c-cab">
            <span className="c-wordmark">Nuvlo</span>
            <PanelLink className="c-boton c-boton-chico">
              Empezar gratis
            </PanelLink>
          </header>

          <div className="c-texto">
            {/* Dato de producto real: `FREE_REPORTS = 3`, sin tarjeta. */}
            <span className="c-pastilla">
              Prueba gratis: 3 reportes, sin tarjeta
            </span>
            <h1 className="c-titular">
              Un reporte pasa por cuatro estados. Vos entrás en uno.
            </h1>
            <p className="c-bajada">
              Nuvlo trae las métricas de Meta Ads, calcula y redacta. Después se
              detiene y te espera.
            </p>
            <div className="c-acciones">
              <PanelLink className="c-boton">Empezar gratis</PanelLink>
            </div>
          </div>

          <div className="c-escena">
            {/* El marco de vidrio: la ventana no apoya directo sobre el campo.
                Es la terminación que separa "captura pegada" de "objeto
                montado", y sirve sobre los dos fondos que atraviesa. */}
            <div className="c-vidrio">
              <Ventana plano="frente" cromo="minimo">
                <header className="c-app-cabeza">
                  <h2 className="c-app-titulo">{DOCUMENTO_MUESTRA}</h2>
                  <Chip estado="borrador" />
                </header>
                <Recorrido />
                <div className="c-vista">
                  <DocumentoCompacto />
                </div>
              </Ventana>
            </div>
          </div>
        </div>
      </section>

      <Control />
      <Correo />
      <Prueba />
      <Limites />
      <Planes />
      <Preguntas />
      <Cierre />
    </main>
  );
}
