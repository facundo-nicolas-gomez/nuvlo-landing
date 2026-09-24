import type { Metadata } from "next";
import LegalPage from "@/components/landing/LegalPage";

export const metadata: Metadata = {
  title: "Política de Reembolsos — Nuvlo",
  description:
    "Cómo funcionan la prueba gratuita, los reembolsos y la cancelación en Nuvlo.",
  openGraph: {
    type: "website",
    siteName: "Nuvlo",
    locale: "es_LA",
    url: "https://nuvloapp.com/reembolsos",
    title: "Política de Reembolsos — Nuvlo",
    description:
      "Cómo funcionan la prueba gratuita, los reembolsos y la cancelación en Nuvlo.",
  },
};

export default function Reembolsos() {
  return (
    <LegalPage
      title="Política de Reembolsos"
      updated="Última actualización: 24 de septiembre de 2026"
    >
      <h2>Derecho de arrepentimiento: 10 días</h2>
      <p>
        Es posible arrepentirse de la contratación dentro de los{" "}
        <strong>10 días corridos</strong> desde que se hizo, sin dar motivos.
        Te devolvemos <strong>el total</strong> de lo pagado, por el mismo
        medio de pago. Vale para todos los medios: tarjeta internacional,
        PayPal y Mercado Pago (artículo 34 de la Ley 24.240).
      </p>
      <p>
        El pedido se hace con el{" "}
        <a href="https://panel.nuvloapp.com/boton-de-arrepentimiento">
          botón de arrepentimiento
        </a>
        . No hace falta registrarse ni entrar al panel: basta con dejar un
        correo, y en el momento te damos un código de identificación del
        pedido, que también te llega por correo. Antes de devolver el dinero
        podemos pedir una confirmación de tu identidad.
      </p>

      <h2>Después de los 10 días</h2>
      <p>
        Pasado ese plazo no realizamos reembolsos de los períodos ya pagados.
        Por eso ofrecemos, además, una prueba gratuita de 3 reportes sin
        tarjeta, para evaluar el servicio antes de pagar.
      </p>

      <h2>Cancelación</h2>
      <p>
        Tu suscripción se puede cancelar en cualquier momento. La cancelación
        detiene los futuros cobros, y el acceso se mantiene hasta el final del
        período ya pagado. No se generan cargos adicionales luego de cancelar.
      </p>
      <p>
        Con cualquier medio de pago, la cancelación se hace desde Configuración
        en el panel, y también con el{" "}
        <a href="https://panel.nuvloapp.com/boton-de-baja">
          botón de baja de servicio
        </a>{" "}
        o escribiendo a{" "}
        <a href="mailto:soporte@nuvloapp.com">soporte@nuvloapp.com</a>.
      </p>

      <h2>Excepciones</h2>
      <p>
        Ante un cobro incorrecto o un error de facturación, basta con
        escribirnos: lo revisaremos caso por caso.
      </p>

      <h2>Quién procesa el cobro</h2>
      <p>
        <strong>Con tarjeta internacional o PayPal</strong>, los pagos los procesa{" "}
        <strong>Paddle.com</strong>, que actúa como <em>Merchant of Record</em>:
        es el vendedor de registro de la transacción, emite la factura y
        gestiona los impuestos.{" "}
        <strong>
          Por eso el cargo aparece a nombre de Paddle en el estado de cuenta de tu tarjeta
          o banco
        </strong>
        , no de Nuvlo. Un reembolso se acredita en el mismo medio de pago. Para
        consultas, además de nuestro correo, está{" "}
        <a href="https://paddle.net" target="_blank" rel="noopener noreferrer">
          paddle.net
        </a>
        , el portal de Paddle para compradores, donde se puede identificar un
        cargo, descargar las facturas o cancelar la suscripción.
      </p>
      <p>
        <strong>Con Mercado Pago</strong>, el pago es en pesos argentinos y por
        cada pago se emite una factura C que te llega por correo electrónico. Un
        reembolso se acredita por Mercado Pago, en el mismo medio utilizado.
      </p>

      <h2>Contacto</h2>
      <p>
        Para consultas sobre facturación o cancelaciones:{" "}
        <a href="mailto:soporte@nuvloapp.com">soporte@nuvloapp.com</a>
      </p>
    </LegalPage>
  );
}
