---
version: 1
slug: "app-preview-neto-page-tsx"
primary_target: "app/preview/neto/page.tsx"
related_targets: []
---

# Landing pública de Nuvlo — pasada «neto» (07/09/2026)

**Alcance:** `/preview/neto`, rediseño de cero pedido por el dueño el 07/09/2026
(«Rediseñá la landing completa», y ante las tres lecturas eligió «dirección nueva»).
Sucede a `/preview/firma`, que queda para comparar. Sin promover a `app/page.tsx`.
**Modo del visitante:** Persuade. Éxito = registrarse en `panel.nuvloapp.com/sign-up`.

## Direction contract

**THESIS:** Un solo objeto, mostrado una sola vez, entero y a escala real: el reporte en
borrador como lo ve el trafficker en el panel, con la barra de «Aprobar y Enviar» arriba.
Se queda pegado a la pantalla y viaja por adentro bajo tres notas —qué escribe la IA,
qué calcula Nuvlo, qué decidís vos— que son la tesis de `PRODUCT.md` señalada sobre el
documento en vez de escrita en secciones propias. Reemplaza a cuatro secciones de la
pasada anterior (héroe, Se arma, La máquina, El momento).

**OWN-WORLD:** Piedra y tinta, **sin color de acento**. Lo único cromático de la página
son el verde y el rojo de negocio dentro de las cápsulas del reporte, que no son
nuestros. El negro hace de acento (el botón, dos tramos oscuros como paréntesis) y la
personalidad la cargan la tipografía —Host Grotesk, una familia, tres pesos 400/500/600,
cifras tabulares verificadas— y un solo movimiento. Campo `#f0eee9` con un lavado de luz
(no grano), hoja `#fdfcfa`, tinta `#131312`. Radios 14 (hoja), 8 (interior), pastilla
(botón, chapa, cápsula). Una sola sombra, la de la hoja. Es la primera dirección de la
rama sin hue de acento: las cinco anteriores tuvieron cobalto, ámbar, azul, ámbar
quemado o naranja.

**LO QUE SE CONSERVA DE LAS DECISIONES DEL DUEÑO:** claro con negro puntual; el reporte
con presencia y cortado con fundido, nunca centrado y contenido ni terminado en canto
recto; revelado progresivo; fondo no liso; estándar de categoría, sin metáfora ni
concepto; «cara, minimalista y con personalidad propia».

**STORY:** El visitante ve en un viewport el reporte real con el botón de aprobar y a quién
le llega; baja y el documento le muestra, región por región, qué parte escribió la IA,
qué parte calculó Nuvlo y dónde decide él; lee que nada sale sin su aprobación, ve el
mail que recibe su cliente, el precio por cliente, y se registra.

**FIRST VIEWPORT:** Grilla 5/7. Izquierda: titular en dos líneas («El reporte, hecho. Vos
lo aprobás.»), bajada de 24 palabras, botón negro y «3 reportes gratis, sin tarjeta».
Derecha: la hoja a 607px, real, con la barra del panel arriba, cortada por el borde
inferior con fundido. Navegación de 64px, no fija.

**FORM:** Code-led. Seis secciones, cada una con su familia de layout: héroe anotado con
visor pegado / columna centrada oscura con objeto de tres filas / texto y mail / superficie
partida en dos / titular desplazado con acordeón nativo / cierre oscuro con pie. Los
límites del producto viven en las Preguntas. Movimiento: entrada del héroe (CSS),
revelado por bloque (`IntersectionObserver`), viaje del documento (`transform` con
transición, sin `scroll` listener), todo apagado bajo `prefers-reduced-motion`. Por
debajo de 1024px el documento se muestra entero una vez y las notas siguen debajo.

**MEDIDO (1440×900):** titular 56px en 2 líneas; hoja 607×1273 a 13,5px de cuerpo; el
visor se queda pegado en los cuatro estados (inicio / resumen / cifras / decisión) y la
región señalada entra a 53–64px del borde; contrastes mínimos 5,0:1 (nota de Paddle a
12px) y 5,2:1 (texto terciario sobre hoja hundida); sin overflow horizontal a 1440 ni a
390; las dos rayas visibles son el asunto literal del mail del panel.

**FINISH:** sin revisar por el dueño. `DESIGN.md` sigue documentando D; se reescribe contra
esta pasada si se aprueba. Los cinco valores de rampa que el detector marca contra
`DESIGN.md` (3.5rem, 1.625rem, 2.25rem, 4px, 1px) están persistidos como excepción con ese
motivo en `.impeccable/config.json`.

## Lo que quedó sin resolver

- La decisión de PRODUCT.md que registra este rediseño de cero (07/09/2026) está
  propuesta y no escrita: se muestra antes de guardarse.
- Modo oscuro: la dirección es clara única, con dos tramos oscuros; no hay tema oscuro
  de página, por decisión de la rama y no por omisión.
- Sin fotografía ni captura real del panel: `PRODUCT.md` no las tiene y no se inventan.
