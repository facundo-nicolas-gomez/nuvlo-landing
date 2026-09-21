import { EnvioBloqueado, EnvioGrande } from "./Piezas";

/**
 * 04 · ANTES DE QUE SALGA.
 *
 * La última pantalla donde todavía se puede frenar un email que sale a un
 * tercero: el cliente de la agencia, no el usuario de Nuvlo. El producto la
 * trata así, y la sección la muestra a escala grande en vez de describirla.
 *
 * Los dos objetos de la sección son el mismo componente en sus dos estados
 * reales: con email cargado y sin él. El estado deshabilitado no es un adorno
 * de diseño, es producto: sin email el envío falla con 400 en el servidor, y el
 * panel prefiere decirlo antes que después de que aprietes.
 */
export default function Aprobacion() {
  return (
    <section className="p-aprobar" id="aprobar" data-seccion="aprobar">
      <div className="p-marco">
        <div className="p-revela">
          <h2 className="p-titulo-sec">
            El destinatario está impreso debajo del botón.
          </h2>
          <p className="p-bajada">
            Antes de apretar ves a qué dirección sale y con qué firma. Y podés
            abrir el informe tal como lo va a abrir tu cliente.
          </p>
        </div>

        <div className="p-aprobar-grilla p-revela">
          <EnvioGrande />
          <EnvioBloqueado />
        </div>
      </div>
    </section>
  );
}
