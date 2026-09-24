import type { Metadata } from "next";
import LegalPage from "@/components/landing/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidad — Nuvlo",
  description:
    "Cómo Nuvlo recopila, usa y protege tus datos y los de tus clientes.",
  openGraph: {
    type: "website",
    siteName: "Nuvlo",
    locale: "es_AR",
    url: "https://nuvloapp.com/privacidad",
    title: "Política de Privacidad — Nuvlo",
    description:
      "Cómo Nuvlo recopila, usa y protege tus datos y los de tus clientes.",
  },
};

export default function Privacidad() {
  return (
    <LegalPage
      title="Política de Privacidad"
      updated="Última actualización: 16 de septiembre de 2026"
    >
      <p>
        En Nuvlo nos tomamos en serio la privacidad de tus datos y los de tus
        clientes. Esta política explica qué información recopilamos, cómo la
        usamos y cómo la protegemos.
      </p>

      <h2>Quiénes somos</h2>
      <p>
        Nuvlo es un software de generación automática de reportes de Meta Ads
        para agencias de marketing y media buyers freelance. Operamos a través
        del sitio nuvloapp.com.
      </p>

      <h2>Qué información recopilamos</h2>
      <ul>
        <li>
          <strong>Información de tu cuenta:</strong> cuando te registras,
          recopilamos tu nombre, dirección de correo electrónico y los datos
          necesarios para gestionar tu cuenta y suscripción.
        </li>
        <li>
          <strong>Datos de tus clientes:</strong> para generar los reportes,
          almacenamos información que vos cargás sobre tus clientes (nombre,
          correo de contacto, zona horaria).
        </li>
        <li>
          <strong>Datos de Meta Ads:</strong> cuando conectás una cuenta
          publicitaria de Meta, accedemos a las métricas de rendimiento de esas
          campañas (impresiones, alcance, conversiones, costos y métricas
          relacionadas) para generar los reportes. Los tokens de acceso a Meta
          se almacenan cifrados.
        </li>
        <li>
          <strong>Pedidos de arrepentimiento o de baja:</strong> si usás el
          botón de arrepentimiento o el botón de baja de servicio, guardamos el
          correo que dejás, lo que escribas en el pedido, su fecha y el código de
          identificación que te damos, como constancia del pedido.
        </li>
        <li>
          <strong>Datos de uso:</strong> información técnica sobre cómo usás la
          plataforma, para mejorar el servicio y resolver problemas.
        </li>
        <li>
          <strong>De dónde llegaste:</strong> si llegás al registro desde un
          anuncio o un enlace con parámetros de campaña (como utm_source o el
          identificador de clic de Meta o de Google), guardamos esos parámetros
          junto a tu cuenta, una sola vez, para saber qué campañas traen
          registros. No los compartimos con terceros y se eliminan con tu
          cuenta.
        </li>
        <li>
          <strong>Medición y publicidad:</strong> hoy este sitio no carga
          herramientas de medición ni de publicidad de terceros. No usamos
          Google Tag Manager, Google Analytics ni el Pixel de Meta, y navegarlo
          no instala cookies de medición ni envía identificadores técnicos a
          esos proveedores. Si volvemos a incorporar alguna, te pediremos el
          consentimiento antes de cargarla y actualizaremos esta política.
        </li>
        <li>
          <strong>Pagos fallidos:</strong> la página de inicio carga Paddle.js
          y Paddle Retain, dos scripts de Paddle.com, nuestro procesador de
          pagos, que sirven para recuperar suscripciones cuyo pago falló. En esa
          página no te identifican: no les pasamos ningún dato tuyo ni de tu
          cuenta, y no instalan cookies. Como cualquier recurso que se descarga
          de otro servidor, tu navegador le envía a Paddle datos técnicos como
          tu dirección IP y el tipo de navegador. Qué hace Paddle con eso está
          en su política, que enlazamos más abajo.
        </li>
      </ul>

      <h2>Cómo usamos tu información</h2>
      <p>Usamos la información para:</p>
      <ul>
        <li>prestar el servicio de generación de reportes;</li>
        <li>gestionar tu cuenta, suscripción y facturación;</li>
        <li>comunicarnos con vos sobre tu cuenta y el servicio;</li>
        <li>mejorar y mantener la plataforma;</li>
        <li>y medir qué campañas traen nuevos registros.</li>
      </ul>
      <p>No vendemos tus datos ni los de tus clientes a terceros.</p>

      <h2>Inteligencia artificial</h2>
      <p>
        Nuvlo utiliza modelos de inteligencia artificial para redactar el
        análisis y las conclusiones de los reportes a partir de las métricas de
        tus campañas. Por defecto, la IA genera un borrador para que lo revises
        antes de enviarlo; también podés activar el envío automático. El
        contenido generado se procesa con el único fin de crear tus reportes.
      </p>

      <h2>Con quién compartimos información</h2>
      <p>
        Compartimos datos únicamente con los proveedores necesarios para operar
        el servicio:
      </p>
      <ul>
        <li>
          <strong>Paddle.com</strong>, que actúa como{" "}
          <em>Merchant of Record</em>: procesa los pagos de las suscripciones,
          emite las facturas y gestiona los impuestos. Para eso trata los datos
          de pago y facturación que ingresás en su checkout —Nuvlo{" "}
          <strong>no almacena datos de tarjetas</strong>—. Si pagás con PayPal,
          PayPal trata también tus datos de pago según su propia política de
          privacidad. La de Paddle está en{" "}
          <a
            href="https://www.paddle.com/legal/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            paddle.com/legal/privacy
          </a>
          ;
        </li>
        <li>
          <strong>Mercado Pago</strong>, cuando pagás en pesos argentinos:
          procesa el cobro de la suscripción y trata los datos de pago que
          ingresás en su página —Nuvlo <strong>no almacena datos de tarjetas</strong>
          —. El tratamiento de esos datos se rige por la política de privacidad
          de Mercado Pago;
        </li>
        <li>Meta (para obtener las métricas de las campañas que conectás);</li>
        <li>
          y proveedores de infraestructura y correo (alojamiento, envío de
          reportes y notificaciones).
        </li>
      </ul>
      <p>Cada uno accede solo a la información necesaria para su función.</p>

      <h2>Seguridad</h2>
      <p>
        Protegemos tu información con medidas técnicas razonables, incluyendo el
        cifrado de los tokens de acceso a Meta Ads y conexiones seguras. Ningún
        sistema es completamente infalible, pero trabajamos para mantener tus
        datos protegidos.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Podés solicitar acceder, corregir o eliminar tu información personal
        escribiéndonos. Si eliminás tu cuenta, eliminamos los datos asociados
        según nuestros plazos de retención y las obligaciones legales
        aplicables.
      </p>

      <h2>Retención de datos</h2>
      <p>
        Conservamos tu información mientras tu cuenta esté activa. El enlace
        público de un reporte vence a los 90 días; el reporte y sus métricas
        permanecen en tu cuenta hasta que los borres vos, borres el cliente o
        cierres la cuenta. Al cerrar tu cuenta, eliminamos los datos asociados,
        salvo lo que debamos conservar por obligaciones legales.
      </p>

      <h2>Cambios a esta política</h2>
      <p>
        Podemos actualizar esta política ocasionalmente. Te avisaremos de
        cambios significativos a través de la plataforma o por correo.
      </p>

      <h2>Contacto</h2>
      <p>
        Si tenés preguntas sobre esta política o sobre tus datos, escribinos a:{" "}
        <a href="mailto:soporte@nuvloapp.com">soporte@nuvloapp.com</a>
      </p>
    </LegalPage>
  );
}
