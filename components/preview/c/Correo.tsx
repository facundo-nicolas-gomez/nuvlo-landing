import Image from "next/image";

/**
 * EL CORREO. Material real, no simulado.
 *
 * ── QUÉ CAMBIA ACÁ ──────────────────────────────────────────────────────────
 * Todo lo demás en esta página es una reproducción en HTML del producto. Esto
 * no: es una captura de pantalla de Gmail con el email que el panel manda de
 * verdad, tal como le entra al cliente en el teléfono. Es el único píxel de la
 * página que no dibujamos nosotros, y por eso es el que más pesa.
 *
 * ── POR QUÉ VA ANTES DEL INFORME ────────────────────────────────────────────
 * Es el orden real de la experiencia del cliente: primero le llega un mail
 * corto, después abre el informe. La página venía mostrando el entregable sin
 * mostrar cómo llega, que es justo la parte que el trafficker necesita ver
 * antes de poner su nombre encima.
 *
 * ── LO QUE DICEN LOS TRES DATOS DE AL LADO ──────────────────────────────────
 * Cada uno se puede verificar en la captura de al lado o en PRODUCT.md. No hay
 * ninguna afirmación que la imagen no sostenga.
 */
const DATOS = [
  {
    titulo: "El asunto lleva el período",
    texto:
      "Nombre de quien lo manda y el rango exacto del reporte. Tu cliente sabe qué abrió antes de abrirlo.",
  },
  {
    titulo: "El cuerpo no tiene métricas",
    texto:
      "Saludo, período y un botón. Los números están en el informe, no en el mail: un email con cifras adentro se rompe en la mitad de los clientes de correo.",
  },
  {
    titulo: "El enlace vence a los 90 días",
    texto:
      "El botón abre la página del informe, que no la indexa ningún buscador y usa un token aleatorio. A un reporte no se llega tipeando.",
  },
];

export default function Correo() {
  return (
    <section className="c-sec c-correo" data-seccion="correo">
      <div className="c-marco c-correo-grilla">
        <div className="c-correo-voz c-revela">
          <h2 className="c-titulo-sec c-titulo-noche">Primero le llega esto.</h2>
          <p className="c-bajada-sec c-bajada-noche">
            Una captura real del correo que sale del panel, sin retocar.
          </p>

          <dl className="c-datos">
            {DATOS.map((dato) => (
              <div className="c-dato" key={dato.titulo}>
                <dt className="c-dato-titulo">{dato.titulo}</dt>
                <dd className="c-dato-texto">{dato.texto}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* El teléfono: bisel, pantalla hundida y luz encima, que es la
            terminación que le falta a una captura pegada sobre el fondo. */}
        <figure className="c-fono c-revela">
          <div className="c-fono-bisel">
            <div className="c-fono-pantalla">
              <Image
                className="c-fono-captura"
                src="/mockups/image00003.png"
                alt="El correo abierto en Gmail: asunto con el nombre de la agencia y el período, saludo al cliente, y un botón para ver el reporte completo."
                width={1206}
                height={2622}
                sizes="(max-width: 899px) 264px, 320px"
              />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
