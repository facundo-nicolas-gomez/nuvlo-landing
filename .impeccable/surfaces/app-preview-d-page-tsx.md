---
version: 1
slug: "app-preview-d-page-tsx"
primary_target: "app/preview/d/page.tsx"
related_targets: []
---

# Landing pública de Nuvlo — rediseño completo

**Alcance:** `/preview/d` (la landing entera, para promover después a `app/page.tsx`).
**Modo del visitante:** Persuade. Éxito = registrarse en `panel.nuvloapp.com/sign-up`.
**Público:** el media buyer / trafficker freelance que hoy arma el reporte a mano.
**Prueba disponible:** sólo el reporte de muestra (`lib/reporte-muestra.ts`), ficticio y rotulado como tal. No hay testimonios, logos, casos ni capturas aprobadas del panel.
**Restricción de material:** la captura de Gmail **no se pega** (decisión del dueño, 03/09/2026). Es referencia de qué información lleva el mail y en qué orden; se redibuja con el sistema de la página. Los colores del mail son de la paleta retirada y no cuentan.

## Direction contract

**THESIS:** El entregable es el argumento. La página prueba el reporte renderizándolo vivo y descompuesto en piezas, nunca ilustrándolo; rechaza el arreglo por defecto de la categoría —la captura decorada del producto flotando sobre una losa— que el brief prohíbe explícitamente. La ronda de direcciones se cerró por la salida permanente: el estándar de la categoría, jugado derecho, con Ramp, Attio y Stripe como vara de acabado. Convención es el compromiso; sin ironía y sin guiño de concepto colado.

**OWN-WORLD:** Claro con negro puntual. Página blanca `#ffffff`, panel hundido `#f4f5f6`, filete `#e3e5e8`, tinta `#0d0f12`, tinta media `#5c626b`, un solo acento azul de tinta `#1550e0` reservado al estado que espera una decisión —la acción primaria es negro sólido, así que el azul nunca compite—. Verde y rojo existen sólo adentro del reporte, asignados por significado de negocio (PRODUCT.md), no por dirección de arte. Una sola familia tipográfica con cifras tabulares reales, pesos 400/500/700, titulares de peso alto y tracking negativo. **Elemento firma: la retícula de un píxel** — todo conjunto de cifras de la página (KPIs del héroe, banco del reporte, tabla de métricas, planes, pie) se arma con `gap-px` sobre el filete y celdas blancas, nunca como tarjetas con borde propio. Un reporte es una grilla de celdas; que la página entera comparta esa retícula hace que cualquier cifra se lea como parte del mismo documento.

**STORY:** El visitante entiende en un viewport que Nuvlo produce un reporte de Meta Ads listo para entregar con su marca; cree que es entregable porque lo está mirando funcionar, no descrito; y se registra a la prueba gratuita. El diferencial que tiene que quedar entendido es estructural: la IA no computa un solo número y el reporte nace borrador y espera su aprobación.

**FIRST VIEWPORT:** Navbar completa a todo el ancho sobre blanco, filete inferior de 1px, contenedor de 1200px: wordmark a la izquierda, enlaces al centro, CTA en negro sólido a la derecha. Debajo, alineado a la izquierda y sin centrar: titular de 2 líneas en el escalón más grande de la página, descripción corta de una o dos líneas en tinta media, y el CTA primario negro con el dato de la prueba (3 reportes, sin tarjeta) impreso al lado. A partir de ~520px entra el reporte como primera prueba: el banco de KPIs sube y se superpone al borde inferior del héroe, con la tabla de métricas en un segundo plano por detrás. Profundidad por planos y superposición, no por sombras grandes.

**FORM:** Estándar de la categoría (salida permanente de la ronda), tomada por el usuario después de ver las siete cartas; vara de acabado Ramp + Attio + Stripe; registro claro con negro puntual. Seed key `da10705b`. Interacción firma: pasar el mouse por una cifra del banco de KPIs enciende su fila de origen en la tabla de métricas, que es otro objeto en otro plano, y muestra de dónde sale el número; más un cambio de vista Borrador → Aprobado → Enviado que mueve el estado real de todas las piezas a la vez. Movimiento con motion/react atado a la entrada de secciones, escalonado por celda, apagado entero con `prefers-reduced-motion` y contenido visible sin JS.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
