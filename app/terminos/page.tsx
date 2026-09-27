import type { Metadata } from "next";
import LegalPage from "@/components/landing/LegalPage";
import { NOMBRE_LEGAL } from "@/lib/nombre-legal";
import {
  PRECIO_ESTANDAR_LABEL,
  PRECIO_WHITE_LABEL_LABEL,
} from "@/lib/precios";

export const metadata: Metadata = {
  title: "Términos del Servicio — Nuvlo",
  description: "Condiciones de uso del servicio de Nuvlo.",
  openGraph: {
    type: "website",
    siteName: "Nuvlo",
    locale: "es_LA",
    url: "https://nuvloapp.com/terminos",
    title: "Términos del Servicio — Nuvlo",
    description: "Condiciones de uso del servicio de Nuvlo.",
  },
};

export default function Terminos() {
  return (
    <LegalPage
      title="Términos del Servicio"
      updated="Última actualización: 24 de septiembre de 2026"
    >
      <p>
        Estos términos regulan el uso de Nuvlo. Crear una cuenta y usar el
        servicio implica aceptarlos.
      </p>

      <h2>El servicio</h2>
      <p>
        Nuvlo es un software por suscripción que genera reportes de rendimiento
        de campañas de Meta Ads para agencias de marketing y media buyers. Nuvlo
        obtiene métricas de las cuentas publicitarias conectadas por el usuario
        y genera un borrador de reporte con asistencia de inteligencia
        artificial. Por defecto, el borrador se revisa y se aprueba antes de
        enviarlo; también se puede activar el envío automático a tus clientes.
      </p>

      <h2>Tu cuenta</h2>
      <p>
        La confidencialidad de tus credenciales de acceso y toda la actividad
        que ocurra en tu cuenta son tu responsabilidad. La información
        proporcionada al registrarse debe ser veraz y mantenerse actualizada.
        Para conectar las cuentas publicitarias de Meta de tus clientes y
        procesar la información asociada, hace falta contar con la
        autorización correspondiente.
      </p>

      <h2>Suscripciones y planes</h2>
      <p>
        Nuvlo se ofrece mediante planes de suscripción mensual que se cobran{" "}
        <strong>por cada cliente cargado en tu cuenta</strong>, sin
        límite de cuentas publicitarias por cliente:
      </p>
      <ul>
        <li>
          <strong>ESTÁNDAR</strong> — {PRECIO_ESTANDAR_LABEL} por cliente, al
          mes.
        </li>
        <li>
          <strong>MARCA BLANCA</strong> — {PRECIO_WHITE_LABEL_LABEL} por cliente,
          al mes — los informes se entregan con tu marca, sin la de Nuvlo.
        </li>
      </ul>
      <p>
        El importe de cada período es el precio del plan multiplicado por la
        cantidad de clientes cargados. Con tarjeta internacional o PayPal, si
        se agrega o se elimina un cliente durante el período, el importe se
        ajusta de forma proporcional al tiempo restante y la diferencia se
        cobra o se acredita en ese momento. Con Mercado Pago el importe no se
        prorratea: cuando cambia la cantidad de clientes o el plan, el
        cambio rige en el momento y el importe nuevo se cobra a partir del
        período siguiente. Con suscripción activa, el mínimo facturable es 1
        cliente.
      </p>
      <p>
        Ofrecemos una prueba gratuita de 3 reportes, sin necesidad de tarjeta.
        Una vez usados, para seguir generando reportes es necesario suscribirse
        a un plan. Las suscripciones se renuevan automáticamente cada mes hasta
        su cancelación, que es posible en cualquier momento y aplica al final
        del período ya pagado. Con cualquier medio de pago, la cancelación se
        hace desde Configuración en el panel, y también con el{" "}
        <a href="https://panel.nuvloapp.com/boton-de-baja">
          botón de baja de servicio
        </a>{" "}
        o escribiendo a{" "}
        <a href="mailto:soporte@nuvloapp.com">soporte@nuvloapp.com</a>.
      </p>

      <h2>Pagos</h2>
      <p>Hay dos formas de pago.</p>
      <p>
        <strong>Con tarjeta internacional o PayPal</strong>, los pagos se procesan a
        través de <strong>Paddle.com</strong>, que actúa como{" "}
        <em>Merchant of Record</em> de Nuvlo. Esto significa que Paddle es el
        vendedor de registro de la transacción: emite la factura, cobra y
        gestiona los impuestos aplicables según tu país. Por eso{" "}
        <strong>
          el cargo en el estado de cuenta de tu tarjeta o banco figura a nombre de Paddle
        </strong>{" "}
        y no de Nuvlo. El pago con PayPal se hace dentro del mismo checkout de
        Paddle, que sigue siendo el vendedor de registro. Los precios están
        expresados en dólares estadounidenses (USD). Suscribirse por esta vía
        implica aceptar también los términos de Paddle como vendedor de
        registro, disponibles en{" "}
        <a
          href="https://www.paddle.com/legal/checkout-buyer-terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          paddle.com/legal/checkout-buyer-terms
        </a>
        .
      </p>
      <p>
        <strong>Con Mercado Pago</strong>, el pago es en pesos argentinos, al
        precio en pesos que muestra el panel al elegir ese medio. Por cada pago se
        emite una factura C que te llega por correo electrónico. Mercado Pago procesa el cobro con la
        tarjeta elegida en su página, y Nuvlo no recibe los datos de tu
        tarjeta.
      </p>

      <h2>Derecho de arrepentimiento y reembolsos</h2>
      <p>
        Es posible arrepentirse de la contratación dentro de los{" "}
        <strong>10 días corridos</strong> desde que se hizo, sin dar motivos, y
        te devolvemos <strong>el total</strong> de lo pagado, por el mismo
        medio de pago, sea cual sea (artículo 34 de la Ley
        24.240). El pedido se hace con el{" "}
        <a href="https://panel.nuvloapp.com/boton-de-arrepentimiento">
          botón de arrepentimiento
        </a>
        , sin registrarte: te damos un código de identificación del pedido en el
        momento.
      </p>
      <p>
        Pasados esos 10 días no realizamos reembolsos de los períodos ya pagados.
        Tu suscripción se puede cancelar en cualquier momento para evitar
        futuros cargos, y antes de pagar hay una prueba gratuita de 3 reportes.
      </p>

      <h2>Uso aceptable</h2>
      <p>El uso de Nuvlo debe ser legal. En particular, no está permitido:</p>
      <ul>
        <li>usar el servicio con fines ilícitos o no autorizados;</li>
        <li>intentar acceder a cuentas o datos de otros usuarios;</li>
        <li>interferir con el funcionamiento de la plataforma;</li>
        <li>conectar cuentas publicitarias sin la debida autorización.</li>
      </ul>

      <h2>Disponibilidad del servicio</h2>
      <p>
        Trabajamos para mantener Nuvlo disponible y funcionando correctamente,
        pero no garantizamos que el servicio esté libre de interrupciones o
        errores. Podemos realizar mantenimiento o actualizaciones que afecten
        temporalmente la disponibilidad.
      </p>

      <h2>Limitación de responsabilidad</h2>
      <p>
        Nuvlo se proporciona &ldquo;tal cual&rdquo;. Los reportes se generan con
        asistencia de IA. Con el envío manual, revisar el contenido antes de
        compartirlo es tu responsabilidad. Con el envío automático activado,
        también lo son esa configuración y el contenido que se envíe. En la
        medida permitida por la ley, no somos responsables de daños indirectos
        derivados del uso del servicio.
      </p>

      <h2>Cancelación de cuenta</h2>
      <p>
        Tu cuenta se puede cancelar en cualquier momento. Podemos suspender o
        cancelar cuentas que incumplan estos términos.
      </p>

      <h2>Cambios a los términos</h2>
      <p>
        Podemos actualizar estos términos ocasionalmente. Te avisaremos de
        cambios significativos a través de la plataforma o por correo.
      </p>

      <h2>Contacto</h2>
      <p>
        Para cualquier consulta sobre estos términos:{" "}
        <a href="mailto:soporte@nuvloapp.com">soporte@nuvloapp.com</a>
      </p>
      {/* Quién se obliga por este texto. Va al pie y no en la apertura por
          decisión del dueño: identifica sin declarar. */}
      <p>Nuvlo · {NOMBRE_LEGAL} · nuvloapp.com</p>
    </LegalPage>
  );
}
