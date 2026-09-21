import type { Metadata } from "next";
import LegalPage from "@/components/landing/LegalPage";
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
    locale: "es_AR",
    url: "https://nuvloapp.com/terminos",
    title: "Términos del Servicio — Nuvlo",
    description: "Condiciones de uso del servicio de Nuvlo.",
  },
};

export default function Terminos() {
  return (
    <LegalPage
      title="Términos del Servicio"
      updated="Última actualización: 14 de septiembre de 2026"
    >
      <p>
        Estos términos regulan el uso de Nuvlo. Al crear una cuenta y usar el
        servicio, aceptás estos términos.
      </p>

      <h2>El servicio</h2>
      <p>
        Nuvlo es un software por suscripción que genera reportes de rendimiento
        de campañas de Meta Ads para agencias de marketing y media buyers. Nuvlo
        obtiene métricas de las cuentas publicitarias que conectás y genera un
        borrador de reporte con asistencia de inteligencia artificial. Por
        defecto podés revisar y aprobar el borrador antes de enviarlo; también
        podés activar el envío automático a tus clientes.
      </p>

      <h2>Tu cuenta</h2>
      <p>
        Sos responsable de mantener la confidencialidad de tus credenciales de
        acceso y de toda la actividad que ocurra en tu cuenta. Debés
        proporcionar información veraz al registrarte y mantenerla actualizada.
        Debés tener la autorización necesaria para conectar las cuentas
        publicitarias de Meta de tus clientes y para procesar la información
        asociada.
      </p>

      <h2>Suscripciones y planes</h2>
      <p>
        Nuvlo se ofrece mediante planes de suscripción mensual que se cobran{" "}
        <strong>por cada cliente que tengas cargado en tu cuenta</strong>, sin
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
        cantidad de clientes cargados. Si pagás con tarjeta internacional y
        agregás o eliminás un cliente durante el período, el importe se ajusta de
        forma proporcional al tiempo restante y la diferencia se cobra o se
        acredita en ese momento. Si pagás con Mercado Pago el importe no se
        prorratea: cuando cambia la cantidad de clientes o cambiás de plan, el
        cambio rige en el momento y el importe nuevo se cobra a partir del
        período siguiente. Con suscripción activa, el mínimo facturable es 1
        cliente.
      </p>
      <p>
        Ofrecemos una prueba gratuita de 3 reportes, sin necesidad de tarjeta.
        Una vez que los usaste, para continuar generando reportes deberás
        suscribirte a un plan. Las suscripciones se renuevan
        automáticamente cada mes hasta que las canceles. Podés cancelar en
        cualquier momento; la cancelación aplica al final del período ya pagado.
        Con cualquiera de los dos medios cancelás desde Configuración en el
        panel, y también con el{" "}
        <a href="https://panel.nuvloapp.com/boton-de-baja">
          botón de baja de servicio
        </a>{" "}
        o escribiendo a{" "}
        <a href="mailto:soporte@nuvloapp.com">soporte@nuvloapp.com</a>.
      </p>

      <h2>Pagos</h2>
      <p>Podés pagar de dos formas.</p>
      <p>
        <strong>Con tarjeta internacional</strong>, los pagos se procesan a
        través de <strong>Paddle.com</strong>, que actúa como{" "}
        <em>Merchant of Record</em> de Nuvlo. Esto significa que Paddle es el
        vendedor de registro de la transacción: emite la factura, cobra y
        gestiona los impuestos aplicables según tu país. Por eso{" "}
        <strong>
          el cargo en tu tarjeta o resumen bancario figura a nombre de Paddle
        </strong>{" "}
        y no de Nuvlo. Los precios están expresados en dólares estadounidenses
        (USD). Al suscribirte así también aceptás los términos de Paddle como
        vendedor de registro, disponibles en{" "}
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
        <strong>Con Mercado Pago</strong>, pagás en pesos argentinos, al precio
        en pesos que muestra el panel al elegir ese medio. Por cada pago se
        emite una factura C que te llega por correo electrónico. Mercado Pago procesa el cobro con la
        tarjeta que elijas en su página, y Nuvlo no recibe los datos de tu
        tarjeta.
      </p>

      <h2>Derecho de arrepentimiento y reembolsos</h2>
      <p>
        Podés arrepentirte de la contratación dentro de los{" "}
        <strong>10 días corridos</strong> desde que la hiciste, sin dar motivos,
        y te devolvemos <strong>el total</strong> de lo que pagaste, por el mismo
        medio de pago y con cualquiera de los dos medios (artículo 34 de la Ley
        24.240). Lo pedís con el{" "}
        <a href="https://panel.nuvloapp.com/boton-de-arrepentimiento">
          botón de arrepentimiento
        </a>
        , sin registrarte: te damos un código de identificación del pedido en el
        momento.
      </p>
      <p>
        Pasados esos 10 días no realizamos reembolsos de los períodos ya pagados.
        Podés cancelar tu suscripción en cualquier momento para evitar futuros
        cargos, y antes de pagar tenés una prueba gratuita de 3 reportes.
      </p>

      <h2>Uso aceptable</h2>
      <p>Te comprometés a usar Nuvlo de forma legal y a no:</p>
      <ul>
        <li>usar el servicio para fines ilícitos o no autorizados;</li>
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
        asistencia de IA. Si usás envío manual, sos responsable de revisar el
        contenido antes de compartirlo. Si activás el envío automático, sos
        responsable de esa configuración y del contenido que se envíe. En la
        medida permitida por la ley, no somos responsables de daños indirectos
        derivados del uso del servicio.
      </p>

      <h2>Cancelación de cuenta</h2>
      <p>
        Podés cancelar tu cuenta en cualquier momento. Podemos suspender o
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
    </LegalPage>
  );
}
