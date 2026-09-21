---
version: 1
slug: "app-reporte-page-tsx"
primary_target: "app/reporte/page.tsx"
related_targets: []
---

# El informe entero, detrás de un enlace (`/reporte`, 19/09/2026)

**Estado: CONSTRUIDA** el mismo día que se escribió el brief. Las tres decisiones de abajo se
tomaron primero y se respetaron todas; lo que sigue registra el encargo, el porqué de cada una
y lo que la construcción resolvió o dejó abierto.

## Lo que la construcción resolvió

- **El marco de navegador SÍ vale a pantalla completa**, que era la pregunta abierta. Se reusó
  entera la composición de «Lo que abre» —`Navegador` + el cabezal de la página pública con la
  marca de la agencia y «Descargar PDF» + `Reporte`—, sin recortar. Reusarla no fue economía:
  si esta página compusiera el informe distinto del que muestra la home, duplicaría el problema
  que vino a cerrar.
- **El ancho es 880**, que es la hoja de 760 más el relleno de `.i-doc-in` y ni un píxel más.
  *La Regla de la Ventana que Mide lo que el Documento Pide* se cumple acá por primera vez sin
  ninguna excusa para recortar.
- **La tabla NO desborda, medido a 320.** El brief avisaba que esta superficie podía obligar a
  reabrir ese aceptado; no hizo falta, porque acá el documento recibe la columna entera en vez
  de la ventana angosta del héroe.
- **El titular, el aviso de ficción, la ventana y el CTA comparten canto izquierdo.** La primera
  versión puso el encabezado a la medida de prosa y quedó centrado 144px adentro del canto de la
  ventana, leyéndose como un bloque suelto. Lo que se alinea es el canto; el tope de lectura lo
  pone cada texto por su cuenta.
- **Un defecto que se vio mirando y no leyendo:** el pie salía CLARO, con sus enlaces pintados
  como prosa. `Pie.tsx` se compone de noche en todo el sitio y necesita el envoltorio
  `.i-noche`, que las legales ya tenían y esta página no. El componente era el mismo; el
  defecto estaba en lo que lo rodea.

**Alcance:** una ruta nueva, `/reporte`, que muestra el informe de muestra **entero y a
escala real**, con el marco de navegador y la URL pública verdadera. Más el enlace que la
lleva, que vive en la home al lado de la escena de El entregable.

**Modo del visitante:** Persuade, pero de segundo tiempo. Esta página no convierte: la
conversión sigue siendo `panel.nuvloapp.com/sign-up` y sigue siendo una sola
(`PRODUCT.md`, principio 5). Acá el visitante viene a **verificar** una promesa que la home
ya le hizo, y el éxito es que vuelva convencido.

## De dónde sale

Lo abrió el dueño el 09/09/2026 y quedó sin construir cinco pasadas seguidas. El argumento
es el mismo desde entonces y sigue en pie:

> La página muestra el documento **tres veces y las tres cortado** —el héroe desde el banco
> de KPI, Control desde el plan, «Lo que abre» sólo el encabezado—, así que **el objeto que
> el trafficker tiene que firmar con su nombre no se ve entero en ningún lado.**

Es la pregunta que más caro sale no contestar: el sitio le pide a alguien que mande ese
documento a su cliente bajo su propia marca, y nunca se lo deja leer completo.

**La *Regla de la Escala de Lectura* no lo prohíbe.** Prohíbe la miniatura —mostrar el
documento tan chico que no se pueda leer—, y eso es lo contrario de lo que esta superficie
hace. No hay conflicto que resolver, había una confusión.

## Las tres decisiones, tomadas el 19/09/2026

El dueño delegó las tres («no lo podés ver vos?»). **Se tomaron con la evidencia que está
abajo, no por gusto: quien las quiera revertir tiene el argumento acá y no hace falta que
las adivine.**

### 1. La URL le habla al plan ESTÁNDAR

`panel.nuvloapp.com/r/8f2c41a9e37b0d5c`, el mismo token que el resto del sitio.

Tres razones, en orden de peso:

- **El sitio ya lo muestra así en dos lados** —`Heroe.tsx:101` y `Navegador.tsx:84`—, y
  `r.nuvloapp.com` aparece **sólo en Precios, como la diferencia que Marca Blanca compra**
  (`Precios.tsx:101`). Elegir el otro host acá haría que el sitio enseñe dos direcciones
  distintas para el mismo objeto, y la de Precios dejaría de ser una diferencia.
- **La única conversión es la prueba gratuita, que no tiene suscripción**, o sea Estándar
  (`PRODUCT.md`). La página tiene que mostrar lo que el visitante va a tener, no lo que
  podría comprar después.
- El pie del informe cierra con «Estudio Bravo · Generado con Nuvlo», que es el cierre del
  Estándar (`report-footer.ts` del panel). Cambiar el host sin cambiar el pie sería un
  informe que se contradice a sí mismo.

### 2. Ruta propia, no adentro de `/`

`/reporte`, sumada a `app/sitemap.ts` —que hoy tiene cuatro entradas escritas a mano y
**sólo anuncia rutas montadas**, así que agregarla es parte de la tanda y no un olvido
posible—.

El motivo es el alto: **el documento entero pasa los 2.000px en teléfono**, sobre una home
que ya mide entre 10 y 12 mil. Meterlo adentro es un 20% más de página para un objeto que
las otras tres apariciones ya presentan.

> **Ésta es la decisión más blanda de las tres y está marcada a propósito.** La alternativa
> —adentro de `/`, al final— tiene un argumento real: el visitante no pierde el hilo. Se
> eligió afuera por el alto, no por convicción. Si el dueño la da vuelta, lo que cambia es
> la ruta y el sitemap; las otras dos decisiones siguen valiendo igual.

**Indexable, y el ejemplo se declara.** No lleva `noindex`: los reportes públicos reales lo
llevan porque son de un cliente, y éste es material de marketing con datos ficticios. Pero
la ficción tiene que estar dicha EN la página —el pie del sitio ya dice «Las cifras de este
sitio son de un ejemplo ficticio» y acá no alcanza con eso, porque alguien puede aterrizar
desde una búsqueda sin haber visto la home—.

### 3. «Ver reporte completo» del mail se queda DIBUJO

Hoy es `<span className="i-mail-boton" aria-hidden="true">` (`Entregable.tsx:231`) y así se
queda. El enlace a esta ruta va **al lado de la escena**, no adentro de la maqueta.

El mail es una **cita de Gmail**. Si el botón dibujado se vuelve enlace, el visitante estaría
tocando el botón de un Gmail de mentira y aterrizando en nuvloapp.com: la cita se rompe, y
encima sería **el único elemento de esa escena que responde**, justo en la sección donde
`DESIGN.md` ya registró el costo de mezclar dibujo con control:

> El visitante aprende ahí que los dibujos no responden y no prueba el que sí.

Un enlace del sitio, afuera del aparato, es honesto: dice que el que ofrece es Nuvlo y no
Gmail. Y de paso no toca `aria-hidden`, que hoy es correcto —un botón dibujado no se anuncia
como botón—.

## Direction contract

**THESIS:** El entregable, entero, sin recortes y sin argumento alrededor. La home ya
argumentó; acá el documento se defiende solo. Lo único que la página agrega al objeto es su
marco de navegador con la URL real y una forma de volver.

**Lo que NO va:** secciones de marketing, un segundo CTA compitiendo, un tour anotado sobre
el documento (eso ya lo hace «El informe, parte por parte»), ni un `hero` propio. Si la
página necesita explicar el documento, el documento está mal.

**Lo que SÍ va, mínimo:** el informe completo; el marco con la URL del Estándar; la marca de
que es un ejemplo ficticio; un solo camino de vuelta; y el CTA único del sitio (`PanelLink`)
al pie, porque quien terminó de leerlo convencido no tiene que buscar dónde registrarse.

## Lo que la tanda que lo construya tiene que resolver

- **De dónde sale el documento.** `DOCUMENTO_MUESTRA` en `lib/reporte-muestra.ts` ya lo
  tiene, y `app/estilos/documento.css` ya lo compone. **Reusar, no rehacer**: si esta página
  compone el informe distinto del que muestra el héroe, el problema que vino a cerrar se
  duplica.
- **Si el marco de navegador vale a pantalla completa.** El cromo existe para que el informe
  se lea como documento y no como zona de la página. En una ruta donde el informe ES la
  página, quizá no haga falta — hay que mirarlo, no deducirlo.
- **El ancho.** El informe real mide 760 (`--medida-doc` y `report-generator.ts`). Acá no hay
  columna que lo apriete, así que es la primera vez que se muestra sin excusa para
  recortarlo. *La Regla de la Ventana que Mide lo que el Documento Pide* aplica entera.
- **Qué pasa en teléfono**, que es donde el documento pasa los 2.000px. Y por debajo de 360
  la tabla de métricas sigue desbordando (abierto conocido y aceptado en `DESIGN.md`): acá
  se ve más que en la home, porque la home corta antes de la tabla en todo el rango de
  teléfono. **Puede que esta superficie obligue a reabrirlo.**

## Lo que quedó sin resolver

- ~~El enlace de vuelta.~~ **Resuelto**: la barra y el pie viajan, como en las legales, y el
  camino de vuelta es el wordmark. No se sumó un «volver» aparte: sería un segundo camino para
  lo mismo, y el brief pedía uno solo.
- **El texto del enlace quedó en «Ver el informe completo»**, que es lo obvio. Se miró dos
  veces como el brief pedía y no apareció nada mejor; queda anotado que nadie lo discutió.
- Si el panel adopta algo de acá. Por la decisión del 19/08/2026 el orden es landing elige →
  panel adopta, pero esta superficie es de marketing y puede que no tenga nada que adoptar.
