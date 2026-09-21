/**
 * LOS LÍMITES.
 *
 * La sección que casi ninguna landing tiene, y que en este producto vende: qué
 * NO hace. El visitante está por conectar la cuenta publicitaria de un cliente
 * suyo, y lo que más lo frena no es una duda sobre las funciones sino sobre el
 * riesgo. Decir los límites de frente es más persuasivo que una lista de
 * beneficios, y es lo único honesto: PRODUCT.md prohíbe insinuar plataformas
 * que no existen, incluso con un "próximamente".
 *
 * ── FAMILIA DE COMPOSICIÓN PROPIA ───────────────────────────────────────────
 * Pares de texto en dos columnas, sin superficie y sin objeto. Es la sección
 * más liviana de la página a propósito: viene después del documento a escala
 * real y antes de los precios, y un pasaje denso se gana uno tranquilo.
 * Ninguna otra sección usa esta estructura.
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
    <section className="limites" data-seccion="limites">
      <div className="contenedor">
        <div className="limites-cabeza entra">
          <span className="marca" aria-hidden="true" />
          <h2 className="titular">Lo que Nuvlo no hace.</h2>
        </div>

        <dl className="limites-grilla">
          {LIMITES.map((limite) => (
            <div className="limite" key={limite.titulo}>
              <dt className="limite-titulo">{limite.titulo}</dt>
              <dd className="limite-texto">{limite.texto}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
