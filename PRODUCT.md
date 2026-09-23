# Product

<!-- impeccable:product-schema 1 -->

Los encabezados están en inglés porque son el esquema de Impeccable; el contenido va en
español, como el resto de los dos repos. Todo lo que dice acá está contrastado contra el
código o fue confirmado por el dueño; cada decisión registrada lleva su fecha. Si
contradice al código, el que está mal es este archivo.

## Platform

web

## Users

**Usuario primario: el media buyer / trafficker freelance.** Trabaja solo, atiende una
cartera propia de anunciantes y hoy arma los reportes a mano: exporta de Meta, cruza en
una planilla, redacta el análisis y lo manda. El sitio le habla a una persona, no a un
equipo, y esa persona es la que decide, paga y aprueba.

Las agencias chicas usan el producto —nada en el modelo de datos lo impide, y las
legales las nombran— pero no son a quien el sitio persuade. Priorizar al freelance es
una decisión, no un descuido.

**Segundo público, que nunca entra al sitio ni al panel: el cliente final de la
agencia.** Recibe un email firmado por la agencia, abre una página pública
(`panel.nuvloapp.com/r/{token}` en Estándar, `r.nuvloapp.com/r/{token}` en Marca Blanca)
y puede bajar el PDF. No tiene cuenta. Es, sin embargo, quien
juzga la calidad del entregable, y por eso la calidad del reporte es un argumento de
venta hacia el usuario primario.

## Product Purpose

Nuvlo genera reportes de rendimiento de campañas de **Meta Ads** para que el trafficker
los entregue con su propia marca. El usuario conecta la cuenta publicitaria de su
cliente, elige un período, y el sistema trae las métricas de Meta, computa los números,
le pide a la IA únicamente la prosa (resumen, alerta y hasta tres acciones), arma el HTML
de forma determinística y lo deja como borrador. El usuario lo aprueba y sale por email;
el cliente final lo lee en una página pública y lo descarga en PDF.

Existe porque el reporte mensual es trabajo obligatorio, repetitivo y no facturable: es
la parte del oficio que consume horas sin agregar estrategia.

**El éxito de este sitio es una sola cosa: que el visitante se registre a la prueba
gratuita en `panel.nuvloapp.com/sign-up`.** No hay segunda conversión.

## Positioning

**El control es el diferencial, y es estructural, no una promesa.**

La IA no computa ni un solo número. `computeReportMetrics` calcula todas las métricas y
variaciones; a la IA se le pasa un resumen **ordinal** de campañas —nombres, posición por
inversión, etiquetas cualitativas, *sin una sola cifra*— y el prompt le prohíbe citar
números que no estén en las métricas ya calculadas. La invariante es de arquitectura: si
el número no entra al prompt, no puede salir en el reporte. Todo número que la IA pueda
mencionar está también en el reporte que el cliente tiene delante.

Encima de eso, el flujo por defecto es `MANUAL`: el reporte **siempre nace como borrador**
y nada sale sin que una persona apriete "Aprobar y enviar", con el destinatario impreso
debajo del botón. El envío automático es opt-in, exige suscripción activa, y **se
autoinhibe** si la IA cayó al texto de respaldo: mandarle prosa genérica al cliente de la
agencia es peor que no mandar nada.

Un competidor puede decir "usamos IA con responsabilidad". No puede decir esto sin
haberlo construido así.

## Operating Context

- **El ritual es mensual o quincenal**, y coincide con el momento en que el trafficker le
  factura a su cliente. La unidad de cobro de Nuvlo —el cliente atendido— es la misma
  unidad que el trafficker factura.
- **Antes de generar, ya está todo configurado:** email del cliente, nombre de la agencia
  (requisito duro: sin él no se genera ni se envía) y modo de reporte por cuenta de Meta.
  Al generar solo se elige el período.
- **Automatización:** las programaciones activas se procesan por hora (GitHub Actions
  llamando al endpoint del cron; el cron diario de Vercel a las 08:00 UTC queda de red de
  seguridad) y cada una sale a la hora local que el usuario eligió para ese cliente
  (`Client.timezone` + `Client.sendHour`, desde el 12/09/2026).
  Las frecuencias son cada 7 días, cada 14 días, o el día 1 de cada mes.
- **El entregable vive en tres formas:** un email mínimo (saludo, período, botón y firma
  de la agencia; el cuerpo no lleva marca de Nuvlo ni contenido del reporte, pero el
  remitente es `"<agencia>" <reportes@nuvloapp.com>` en los dos planes: nombre visible de
  la agencia, dominio de Nuvlo), una página pública `noindex` y fail-closed cuyo enlace
  vence a los 90 días, y un PDF con las mismas secciones.
- **La landing no tiene backend, formularios, pagos ni variables de entorno.** Es un sitio
  estático de marketing que apunta al panel.

## Capabilities and Constraints

**Solo Meta Ads, y no se insinúa lo contrario.** El modelo `AdAccount` guarda
`metaAccountId` y nada más; no hay una sola referencia a Google Ads, TikTok o LinkedIn en
el código. Sumar otra plataforma es una migración de esquema. El sitio **no puede
sugerir más plataformas, ni siquiera con un "próximamente"**.

**Prueba gratuita:** 3 reportes, sin tarjeta (`FREE_REPORTS = 3`). Quien no tiene
suscripción también está topeado a 3 clientes (`MAX_CLIENTES_TRIAL = 3`), que es un freno
antifraude, no un límite comercial.

**Planes** (`lib/precios.ts` en este repo, `src/lib/plans.ts` en el panel):

| Plan | Precio | Diferencia |
|---|---|---|
| Estándar | USD 39 **por cliente, al mes** | El informe cierra con "Generado con Nuvlo" |
| Marca Blanca | USD 69 **por cliente, al mes** | El informe sale solo con la marca de la agencia, y la página pública sale por el host de reportes (`r.nuvloapp.com`) en vez de por el del panel |

- **El precio nunca se muestra sin su unidad.** "$39/mes" a secas se lee como abono fijo y
  es un precio distinto del que se cobra. Se escribe siempre "por cliente, al mes".
- **Ni sin su moneda, que es el mismo error en otro eje.** Se escribe "USD 39", nunca "$39".
  Un `$` pelado no es ambiguo para un lector en México, Colombia o Chile —alcance declarado
  más abajo—: es incorrecto por uno o dos órdenes de magnitud. Y la propia landing se lo
  confirma, porque el reporte de muestra imprime cifras en la moneda de la cuenta
  publicitaria del cliente (el panel formatea con `account_currency`, default `ARS`), así que
  los dos `$` conviven en la misma página. En el sitio se usan los `_LABEL` de
  `lib/precios.ts`.
- **Los precios se importan de `lib/precios.ts`, nunca se tipean.** El CI del panel cruza
  ese archivo y la prosa de los `.md` de los dos repos; la mecánica está en `CLAUDE.md`.
- Sin tope de cuentas publicitarias por cliente. Sin tope de clientes en los planes pagos.

- **El host de reportes NO es de la agencia, y el sitio no puede insinuarlo.**
  `reportPublicBaseUrl` (panel) devuelve un único `NEXT_PUBLIC_REPORT_URL` para todos
  los usuarios de Marca Blanca: es un dominio de Nuvlo, el mismo para todos, y lo único
  que cambia para el cliente final es que el enlace no dice «panel». Publicar en el
  dominio de la agencia **no existe**. La landing decía «por tu propio host de reportes»
  en tres lugares y se corrigió el 12/09/2026; este archivo lo decía en la tabla de
  arriba y es de donde venía.

**Cobro: dos medios (13/09/2026).** Con tarjeta internacional lo procesa **Paddle** como
*Merchant of Record*: el cargo figura a nombre de Paddle en el resumen, precios en USD. En
Argentina también se paga en pesos con **Mercado Pago**: ahí vende el dueño como persona
física (monotributo, factura C por mail), y el sitio **no afirma** cómo figura ese cargo en
el resumen, porque nunca se vio. **Los datos personales del vendedor —nombre, CUIT,
domicilio— no se publican en ninguna pantalla** (decisión del dueño, 14/09/2026), ni acá
ni en el panel. Los precios en pesos viven en el panel, no en este repo.

**PayPal, por Paddle (23/09/2026).** Dentro del checkout de Paddle también se paga con
PayPal: es el mismo cobro, en USD y con Paddle como *Merchant of Record*, no un tercer
proveedor. El sitio **no afirma** cómo figura ese cargo en la cuenta de PayPal, porque
nunca se vio.

**Reembolsos: derecho de arrepentimiento (decisión del dueño, 13/09/2026).** 10 días
corridos desde la contratación, reembolso total, por cualquier medio de pago
(art. 34 de la Ley 24.240). Pasado ese plazo no hay reembolsos del período pago. Se
cancela en cualquier momento, con acceso hasta el fin del período pago. «No hay
reembolsos» a secas ya no es verdad y no se escribe.

**Los dos botones de la Disposición 954/2025** —«Botón de arrepentimiento» y «Botón de
baja de servicio»— viven **en la barra superior, del lado opuesto a las acciones**, y se
repiten en el pie. Los formularios viven en el panel (`/boton-de-arrepentimiento`,
`/boton-de-baja`), que da el código de identificación en el acto; el sitio sólo enlaza.

La barra es la única pieza que cumple las tres cosas que la norma pide a la vez —«a simple
vista, en lugar destacado y en el primer acceso»—: está en las cinco páginas, se ve al entrar
y no se va con el scroll.

**Desde 1.100px viven en la fila de la barra; por debajo, en un renglón propio justo abajo
(20/09/2026).** Entre los dos no queda ningún ancho sin ellos, y con eso **se cerró la única
línea de incumplimiento que este archivo registraba.**

El problema era de medida y no de criterio: con los dos botones la fila pide 976px, a 1.100 le
sobran 45 y a 1.024 le faltan seis. Por debajo de 768 las anclas ya se apagaban y quedaban
marca, «Ingresar» y el CTA, que a 320 van justos: en teléfono **no hay lugar en la fila, con
anclas o sin ellas**, así que apretarla nunca iba a alcanzar. El segundo renglón era
inevitable; lo que quedaba por decidir era dónde.

**Va en el flujo y no pegado, y ésa es la decisión.** La norma pide «a simple vista, en lugar
destacado y en el primer acceso»: las tres se cumplen apareciendo arriba de todo al entrar, y
ninguna pide sobrevivir al scroll. Pegado le comería 44px a cada pantalla de teléfono para
siempre. Y va como hermano de la barra y no adentro, porque adentro sumaría altura a la fila
pegada: eso es la franja que el dueño rechazó el 19/09, y ésta es otra pieza —sólo existe donde
la barra no da, y no se queda—.

Los dos enlaces entraron además al piso táctil de 44px, que hasta hoy no los alcanzaba porque
sólo se veían desde 1.100, o sea nunca bajo un puntero grueso.

El recorrido del 19/09/2026, por si alguna vez se reabre: franja propia → adentro de la fila →
el dueño vació la barra → renglón fino del héroe → afuera del héroe → de vuelta a la barra.
Cada paso tuvo motivo de composición y ninguno fue una decisión sobre la norma; el del 20/09 sí
lo fue.

**El reporte contiene:** encabezado, resumen ejecutivo (más una alerta solo si la IA marcó
una), 4 KPIs (inversión, conversaciones, costo por conversación, CTR), una tabla de
impresiones, alcance, frecuencia, clics y CPC, y hasta 3 acciones numeradas. Sin dato se
escribe `—`, nunca un cero inventado. La variación tiene tres estados que no se confunden
(`computeVariation` en el panel): si falta el dato actual o el anterior, `—`; si el
anterior es 0, «Sin base» (el dato existe, la división no); si el redondeo a un decimal da
0, «Estable». Nunca un 0 % inventado. El color de la variación lo decide el negocio, no la
dirección: que la inversión suba no es verde. Rango máximo de 92 días.

**La zona horaria y la hora de envío se eligen por cliente y se cumplen** (12/09/2026).
Hasta ese día existían en la base y nadie las leía, y el sitio no podía prometerlas; hoy
el cron sólo manda cuando pasó la hora elegida en la zona elegida, así que la pregunta de
la sección Preguntas lo dice. Lo que sigue sin existir: elegir minutos (el tick es por
hora) y un dominio propio de la agencia para el enlace público.

**Medición:** el 23/08/2026 se retiró todo el tracking del sitio (GTM, GA4 y el Pixel de
Meta). Hoy el sitio no carga medición ni scripts de terceros, y `/privacidad` lo
**afirma**. Volver a meter uno es consentimiento previo + CSP + texto legal en la misma
tanda; el detalle de la CSP está en `CLAUDE.md`.

**Lo que sí se guarda es la atribución del alta, y no la toma el sitio** (16/09/2026). Si
el visitante llega al registro con parámetros de campaña (UTM o el click-id de Meta o de
Google), el panel los guarda junto a la cuenta una sola vez, no los comparte con
terceros y los borra con la cuenta; `/privacidad` lo declara. La landing no guarda nada:
sólo los reenvía por la lista blanca de `PanelLink`. La declaración se publicó antes que
el cambio del panel, para que ningún dato se guardara sin estar declarado.

**Terminología:** "cliente" es siempre el anunciante que atiende el usuario (nunca el
usuario). "Reporte" o "informe", no "dashboard". "Cuenta publicitaria" para la de Meta.

## Brand Commitments

- **Nombre:** Nuvlo. Dominios: `nuvloapp.com` (este sitio), `panel.nuvloapp.com` (el
  producto), `r.nuvloapp.com` (reportes públicos). Contacto: `soporte@nuvloapp.com`.
- **Voz:** español rioplatense en voseo, con **alcance LatAm hispanohablante** (decisión
  del dueño, 23/08/2026): Argentina es el núcleo, pero el copy no debe excluir a México,
  Colombia o Chile. No hay plan de versión en inglés.
- **El wordmark lo define este repo y el panel se alinea después.** Lo que la landing
  elija manda, y recién entonces el panel lo adopta en una tanda propia; la landing no
  hereda el estado del otro repo.
- **Decisión del dueño (19/08/2026), todavía vigente:** el mockup del reporte que se
  diseñe en la landing es el que después adopta el reporte real del panel, manteniendo las
  mismas secciones y datos. El diseño del reporte se decide acá.
- **El sitio se juega en el estándar de la categoría, no en un mundo con concepto**
  (decisión del dueño, 03/09/2026, preferencia duradera): se le presentaron siete
  direcciones con mundo propio y las rechazó todas, con lo que se retiró el proceso de
  mundos con concepto. La vara de acabado es **Ramp, Attio y Stripe**: se copia el rigor,
  nunca su sistema visual. Sin metáfora ni concepto, en ningún rediseño.
- **«Cara, minimalista y con personalidad propia»** (decisión del dueño, 04/09/2026, y es
  el criterio con el que juzga). Minimalismo NO es austeridad: pocos elementos, muy
  trabajados, y un acabado que se **vea caro**, no sólo correcto. El dueño dirige el
  estándar y lo juzga en vivo; qué elementos concretos aprobó o rechazó vive en
  `DESIGN.md`, no acá.
- **La pasada vigente es un rediseño de cero, pedido el 07/09/2026.** Ante
  `/preview/neto`, la dirección que estaba en curso, el dueño la rechazó sin revisarla y
  pidió «dirección nueva, de cero»; `/preview/firma`, la anterior, quedó superada en la
  misma decisión. Las dos se conservan sólo para comparar y no se citan como referencia.
  Lo que dijo de neto es criterio y no gusto: **se ve básico y anónimo, le falta color, y
  la tipografía y la composición están flojas.** De ahí sale una regla que ya se le vio
  aplicar dos veces: **una página sin acento se le lee gris, y eso alcanza para rechazarla
  entera** — no es un ajuste pendiente, es un rechazo. La elección del acento nuevo la
  delegó («proponé vos uno nuevo»); cuál salió y por qué vive en `DESIGN.md`.
- **La bajada del héroe dice los dos modos y no promete marca blanca** (12/09/2026).
  Decía «Queda en borrador hasta que lo aprobás, y sale con tu marca», y las dos mitades
  prometían de más: en AUTO el reporte sale sin que nadie lo apruebe (`decideAutoSend`),
  y en Estándar el informe cierra con «<agencia> · Generado con Nuvlo»
  (`report-footer.ts`). Hoy dice «Queda en borrador hasta que lo aprobás —o sale solo,
  si vos lo programás—, firmado por vos», que es verdad en los dos modos y en los dos
  planes. El titular no se tocó: «Sale cuando vos decís» ya cubría los dos. La
  `description` del sitio sigue siendo esta bajada, literal.
- **El sitio hace una sola afirmación, y es la del titular** (11/09/2026, al promover la
  pasada «iris» a la home). El repo venía diciendo tres cosas distintas del mismo
  producto: el `title` del sitio decía «listo en un clic», el titular de la página «El
  reporte de tu cliente, hecho. Sale cuando vos decís.» y el texto alternativo de la
  tarjeta social «ya está escrito». Manda **la del titular**: es la que el dueño aprobó
  mirándola en la página, y es la única de las tres que cumple el principio 2 de acá
  abajo. El `title` viejo decía la velocidad sin el control, que es el orden que ese
  principio prohíbe. La descripción del sitio es la bajada del héroe, literal; si cambia
  el titular, cambian los dos.
- **El Tablero salió de la página** (17/09/2026). La sección mostraba la pantalla de
  Inicio del panel —el mes entero, cliente por cliente— y el dueño la sacó después de
  rechazar seis rediseños en dos rondas. El motivo no fue el dibujo: no es ni el
  entregable ni la aprobación, se metía entre «aprobás» y «le llega», y repetía los
  estados que Control acababa de mostrar con el botón en la mano. Lo que se pierde es el
  argumento del día 1 —a qué clientes les debés el reporte—; si vuelve, vuelve con
  argumento propio y no como pantalla citada.
- **Criterio y Control se fusionaron en una sola sección** (18/09/2026). Eran dos secciones
  seguidas que afirmaban dos verdades sobre el mismo proceso —Nuvlo calcula antes de que la
  IA escriba, y nada sale sin que una persona apruebe— con la misma composición. El dueño
  rechazó tres intentos de arreglarlas por separado y autorizó ignorar sus propias decisiones
  anteriores. Ahora el proceso **se ejecuta** delante del visitante: los números llegan de
  Meta, Nuvlo los compara sin IA, la IA recibe nombres de campaña sin una sola cifra y recién
  entonces escribe, el reporte se arma y **se frena en borrador**. El freno es la tesis, y es
  lo único de la escena que ocupa el ancho entero. El capítulo oscuro pasó de tres secciones
  a dos y de 2.303 a 931px en escritorio. El titular de sección dice «se hace solo y te
  espera» y **no** afirma que siempre frene: en Automático no es cierto, y la bajada dice que
  programarlo lo decidís vos.
- **El fondo del héroe no lleva nada, y el campo quedó en el casi blanco frío** (18/09/2026).
  El dueño pidió «color, vida» y después «que no se vea tan blanco, pero sin caer en lo
  genérico». Se probaron **ocho** tratamientos encima del héroe —lavado petróleo, bandeja,
  haz, un amanecer difuso, una cinta en cuatro variantes y una planilla dibujada debajo del
  informe— y **una novena** sobre el campo mismo, teñirlo de salvia. No quedó ninguna: el
  dueño prefirió el casi blanco frío `#fbfcfd` que ya estaba.
  Las tres lecciones, que valen aunque ningún color haya quedado:
  **(a)** un degradé de fondo no tiene trabajo asignado, así que no hay contra qué medirlo
  —el dueño lo liquidó con «no tienen ningún propósito»—;
  **(b)** un fondo tampoco puede cargar un argumento, porque a esa opacidad nada es
  reconocible y termina distrayendo;
  **(c)** «se ve tan blanco» **no se resuelve poniéndole cosas encima al héroe**. Si el tema
  vuelve, se toca el campo o no se toca nada.
  Y una anterior que sigue en pie: los tres primeros intentos eran el mismo petróleo, que acá
  significa lo accionable, así que como campo compite con el único CTA.
- **La marca blanca no incluye colores de la agencia, y la landing no puede insinuarlo**
  (18/09/2026). Se propuso un héroe que mostrara el mismo informe en dos marcas. Es falso:
  Marca Blanca es que el informe cierre sólo con el nombre de la agencia —sin «Generado con
  Nuvlo»— y que la página pública salga por `r.nuvloapp.com`. El panel **no guarda logo, ni
  iniciales, ni colores**, que es lo que ya había dejado la banda de marca en propuesta
  (17/09) y lo que corrigió la bajada del héroe (12/09). Es la tercera vez que la misma
  promesa de más se intenta desde un ángulo distinto.
- **El mockup del reporte se adelantó a la plantilla real** (17/09/2026). El dueño leyó el
  documento «pobre» y eligió, entre tres tratamientos, subirlo un escalón: cuerpos,
  relleno y rótulos de sección con filete. Las medidas de la landing eran calcadas de
  `report-generator.ts`; desde hoy están por encima, y **el panel las debe adoptar** —es
  el orden que fija la decisión del 19/08/2026, pero hasta que se adopte el informe que
  se ve en el sitio compone distinto del que se manda—.
- **La banda de marca de la agencia queda propuesta, no mostrada** (17/09/2026). Se probó
  encabezar el informe con una banda de color, el nombre de la agencia y un sello de
  iniciales. Se descartó para la landing por tres motivos: el panel no la dibuja, no
  guarda logo ni iniciales de la agencia, y pintada con el petróleo de Nuvlo contradecía
  la promesa de marca blanca. Si el panel la adopta —en tinta neutra, con las iniciales
  derivadas del nombre que ya exige para generar y enviar—, la landing la muestra.
- **El marco de navegador alrededor del reporte es verdad, y por eso se puede usar.** El
  cliente final abre el informe como página pública (`panel.nuvloapp.com/r/{token}` en
  Estándar, `r.nuvloapp.com/r/{token}` en Marca Blanca), así que la barra de direcciones
  lleva una URL real y no un campo decorativo con tres puntitos. Es la diferencia entre
  citar el recurso más gastado de la categoría y mostrar dónde vive el entregable de
  verdad.

## Evidence on Hand

**Lo único citable hoy es el reporte de muestra** (confirmado por el dueño, 23/08/2026).
Se produce de forma determinística con `buildReportHtml()` del panel
(`nuvlo-panel/src/lib/report-generator.ts`) a partir de un `ReportData v1`: mismos datos,
mismo HTML. **Sus datos son ficticios siempre, nunca de un cliente real.**

Otro material disponible:

- El texto legal está vigente y maquetado en `/terminos`, `/privacidad` y `/reembolsos`
  (según la fecha impresa en cada una: 16/09/2026 en `/privacidad`, 14/09/2026 en
  `/terminos` y `/reembolsos`), con los precios importados de `lib/precios.ts`.
- La tarjeta social se genera por código en `app/opengraph-image.tsx`.
- **Los literales de pantalla del panel, verificados uno por uno contra su código el
  08/09/2026** —no de memoria, que es como se habían fijado el 07/09—. La landing los
  muestra como cita del producto y estos existen:
  - Los cuatro pasos de generación —«Pidiendo las métricas a Meta», «Comparando contra el
    período anterior», «Redactando el análisis», «Armando el reporte»— en
    `nuvlo-panel/src/lib/pasos-generacion.ts` (`ETIQUETA_PASO`), que usa el diálogo de
    generar. Reemplazaron a `LOADING_STEPS`; verificado el 13/09/2026. Los puntos
    suspensivos no están en la constante: los agrega el render.
  - «Aprobar y enviar» y «Se envía a » con el destinatario en una pieza aparte, en
    `nuvlo-panel/src/components/send-report-button.tsx`. El botón dice
    «Aprobar y enviar», con minúscula: el panel cambió de caja y la landing se alineó el
    13/09/2026 (dueño: «unificalo con el panel»). Las pasadas históricas de `/preview` conservan
    la mayúscula vieja y no se tocan.
  - «Generar reporte», el disparador manual, en el mismo diálogo.

  Son cita y no copy: si cambian allá, cambian acá.

**Tres cuentas reales, aportadas por el dueño el 19/09/2026.** Posada Quinen (hospedaje),
Destino Andino (turismo) y Go By (alquiler de autos), los tres de San Martín de los Andes y
los tres **negocios familiares**, que es lo que resuelve el permiso para usar nombre y logo.
Se muestran en la sección `#clientes` de la home.

**Y lo que se puede afirmar de ellos es exactamente esto y nada más.** El dueño dijo «tres
clientes que ya tuve»: son anunciantes que ATENDIÓ como trafficker. **No dijo que usen Nuvlo,
ni que tengan cuenta en el panel, ni que hayan recibido un informe generado por el producto.**
**El 20/09/2026 el dueño confirmó que las tres YA RECIBIERON un informe hecho con Nuvlo**, y
con eso se cumplió la condición que este archivo dejaba escrita: el copy sube un escalón, de
«de acá salió» a «esto es lo que reciben». La sección dice ahora «Estas marcas ya reciben sus
informes con Nuvlo».

**Lo que sigue sin poder decir:** que sean usuarias del panel. Quien tiene la cuenta es el
trafficker; ellas reciben el informe. El verbo es «reciben», nunca «usan», y ese renglón es el
que más fácil se rompe de la landing —cambiarlo por «usan Nuvlo» parece un recorte y es una
afirmación distinta y falsa—. Tampoco va en primera del plural, porque el sitio no tiene un
solo «nosotros» en el copy visible.

Antes de esa confirmación el dueño había pedido «algo como *Estas marcas ya confiaron en
nosotros*»: eso era falso y no se escribió. Lo que lo destrabó no fue encontrar una vuelta
mejor a la frase sino preguntar si habían recibido el informe. Si algún día recibieron un informe hecho con el producto, el copy sube un escalón
entero y recién ahí vale la frase de confianza; hasta que alguien lo confirme, no se escribe.

Los archivos viven en `public/clientes/` y se sirven desde el propio dominio, porque la CSP
no admite imágenes externas.

**Van a COLOR**, cada uno con la paleta de su marca. Estuvieron un rato a una tinta —el dueño
lo pidió el 19/09/2026 para que la tira se pareciera a la de Superhuman— y el 20/09 lo dio
vuelta: a color y más grandes. Lo que resolvió el problema que la tinta única venía a resolver
no fue el color sino la GEOMETRÍA —casilleros iguales y alto de tinta parejo—, así que la
conversión dejó de hacer falta.

**Y lo que estos logos prueban NO es adopción.** Los tres son anunciantes, o sea el tipo de
empresa que es cliente de un trafficker, y el que mira la landing es un trafficker: son los
clientes de nuestro cliente. Una tira de logos, que por convención significa «estas empresas
nos compran», acá haría que el visitante vea sus propios clientes y no se reconozca. Por eso
el renglón dice el vínculo en vez de darlo por sentado —«Nuvlo lo hizo un trafficker. Estas
son sus cuentas»— y con eso la tira cambia de trabajo: es prueba de OFICIO, no de adopción.
Los logos dejan de competir con el visitante y pasan a espejarlo.

**Lo que NO existe y no se inventa, ni siquiera como placeholder:** testimonios, casos de
éxito, contadores de usuarios, métricas de adopción, capturas aprobadas del panel, y video o
demo. **Sigue sin haber usuarios citables del panel**, que es distinto de no tener marcas
citables: las tres de arriba reciben el informe, no lo generan. La cuenta es del dueño.

**Y dos cosas que la landing muestra como si fueran del panel y no lo son** (encontrado al
verificar lo de arriba, 08/09/2026):

- **«Completado»**, la palabra con la que la landing marca un paso terminado, **no existe
  en ningún archivo del panel**. El panel marca el paso hecho con un tilde verde y el
  texto en gris, sin ninguna palabra. Se había fijado el 07/09 como literal leído de la
  pantalla; la búsqueda en todo el repo da cero coincidencias.
- **Las cuatro pistas bajo los pasos de generación** —«Las métricas del período, directo
  de Meta» y las otras tres— son copy de la landing. El diálogo del panel renderiza sólo
  la etiqueta del paso; no hay subtítulos.

Ninguna de las dos es grave por lo que dice —las dos son verdad sobre el producto— pero
las dos se presentan como cita y no lo son. La regla que queda: **un literal se verifica
contra el código del panel antes de presentarlo como cita, no contra el recuerdo de haber
visto la pantalla.**

## Product Principles

1. **Nada inventado.** Ni un número, ni un testimonio, ni una plataforma, ni un
   "próximamente". El sitio se sostiene con el producto y su explicación.
2. **El control viene antes que la velocidad.** "Listo en un clic" solo se puede decir
   junto a "vos lo aprobás". Es el diferencial y es lo que hace defendible la IA.
3. **El precio nunca aparece sin su unidad.** Por cliente, al mes.
4. **El entregable es del trafficker, no de Nuvlo.** Todo lo que el sitio prometa sobre el
   reporte tiene que sostenerse cuando la marca que figura arriba no es la nuestra.
5. **Una sola conversión.** Registrarse a la prueba gratuita en el panel. Sin formularios,
   sin backend, sin segundo objetivo compitiendo por atención.

## Accessibility & Inclusion

No hay un estándar formal comprometido con el usuario. Sí hay un piso declarado en
`app/globals.css` y tratado como no negociable: **toda parada de tabulación se ve** —cada
superficie puede afinar el color del anillo de `:focus-visible`, ninguna puede sacarlo— y
ninguna imagen, SVG o video empuja la página a lo ancho.
