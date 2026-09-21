/**
 * LOS LÍMITES. El pasaje tranquilo.
 *
 * La sección que casi ninguna landing tiene y que en este producto vende: qué
 * NO hace. Al visitante lo frena el riesgo, no la falta de funciones, y decir
 * los límites de frente es más persuasivo que una lista de beneficios. Además
 * es lo único honesto: PRODUCT.md prohíbe insinuar plataformas que no existen,
 * ni siquiera con un "próximamente".
 *
 * ── COMPOSICIÓN PROPIA: SIN UNA SOLA SUPERFICIE ─────────────────────────────
 * Ninguna otra sección se ve así. Acá no hay tarjetas, ni cajas, ni bordes que
 * rodeen nada: sólo un número, un título y un texto colgando de un filete
 * superior. Es la sección más liviana de la página a propósito, y viene después
 * del documento a escala real: un pasaje denso se gana uno tranquilo.
 *
 * Las dos columnas están desfasadas en vertical, así que el ojo no las lee como
 * una grilla de seis casilleros iguales.
 */
const LIMITES = [
  {
    titulo: "Sólo Meta Ads",
    texto:
      "No hay Google Ads, TikTok ni LinkedIn, y no están en camino. Si tu operación depende de otra plataforma, hoy Nuvlo no te sirve, y preferimos decírtelo acá y no después de que pruebes.",
  },
  {
    titulo: "El informe no se edita",
    texto:
      "Se aprueba o no se aprueba. Si el análisis no te convence, regeneralo o escribile vos a tu cliente. Preferimos eso antes que un editor a medias que te haga responsable de un texto que parece nuestro.",
  },
  {
    titulo: "Un permiso de lectura, y nada más",
    texto:
      "Sobre las campañas Nuvlo pide ads_read: alcanza para leer métricas y para nada más. No puede pausar, editar ni gastar del presupuesto de tu cliente.",
  },
  {
    titulo: "No hay reembolsos",
    texto:
      "Por eso la prueba son 3 reportes completos y sin tarjeta: la idea es que evalúes antes de pagar. Podés cancelar cuando quieras y mantenés el acceso hasta el fin del período pago.",
  },
  {
    titulo: "El cobro no pasa por nosotros",
    texto:
      "Paddle figura como vendedor: emite la factura y gestiona los impuestos de tu país. Por eso el cargo aparece a su nombre en el resumen y no al nuestro.",
  },
  {
    titulo: "El enlace del informe caduca",
    texto:
      "Vence a los 90 días y ningún buscador indexa la página. El token es aleatorio: a un reporte no se llega tipeando. Preferimos que caduque solo y no que quede abierto para siempre.",
  },
];

export default function Limites() {
  return (
    <section className="c-sec c-limites" data-seccion="limites">
      <div className="c-marco">
        <h2 className="c-titulo-sec c-limites-titulo c-revela">Lo que Nuvlo no hace.</h2>

        <dl className="c-limites-grilla">
          {LIMITES.map((limite, i) => (
            <div className="c-limite" key={limite.titulo}>
              <span className="c-limite-orden cifra" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="c-limite-titulo">{limite.titulo}</dt>
              <dd className="c-limite-texto">{limite.texto}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
