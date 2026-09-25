---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# Landing pública de Nuvlo — pasada «iris» (07/09/2026, promovida el 11/09/2026)

**Alcance:** `/` (la home) y, desde el 11/09/2026, también `/terminos`, `/privacidad` y
`/reembolsos`, que corren el mismo sistema y comparten la barra y el pie. Rediseño de cero
pedido por el dueño el 07/09/2026 con `/impeccable` («Rediseñá la landing de Nuvlo
completa»; ante «neto» sin revisar eligió «dirección nueva, de cero»). Sucede a
`/preview/neto` y a `/preview/firma`, que quedan para comparar.
**Promovida el 11/09/2026**: se construyó en `/preview/iris` y pasó a `app/page.tsx`; el
mundo retirado «Sala de revisión» se borró entero en la misma tanda. Lo que queda de la
promoción es el renombre de tokens a `--color-x`, que es tanda propia.
**Modo del visitante:** Persuade. Éxito = registrarse en `panel.nuvloapp.com/sign-up`.

**Lo que el dueño dijo de neto** (07/09/2026, respuesta estructurada, las cuatro): se ve
básico y anónimo; le falta color; el reporte pegado con notas al costado no convence;
tipografía y composición flojas. **Lo que fijó para esta pasada:** clara con dos tramos
oscuros; el reporte con marco de navegador; una sola familia tipográfica. No pidió la
navegación flotante. El color de marca: «proponé vos uno nuevo».

## Direction contract

**THESIS:** El reporte real, en una ventana de navegador con su URL verdadera, apoyado
en un encuadre que lo hace protagonista sin encerrarlo. La página demuestra
el control en vez de afirmarlo: el visitante aprueba el reporte de ejemplo con el mismo
botón del panel. Rechaza el héroe de dos columnas parejas y el reporte pegado con notas.

**OWN-WORLD:** Campo **casi blanco y CÁLIDO `#fffcf8`** —marfil de L 0,991 y croma 0,006— con
hojas de blanco puro y tintas cálidas del mismo hue, **separadas por filete y no por valor**
(el escalón campo→hoja mide 1,02:1, o sea que no se ve); **vino `#8b2b3f`** en la acción y en las
señales; **grafito
`#1c2126`** como oscuro, adentro del cromo del navegador y en los dos tramos de noche. El rasgo
es **dónde vive el oscuro**: en el marco del objeto, no en la página. **Nació con otro color:**
el acento fue el iris `#5646d6` sobre hueso `#f7f6f2` hasta el 10/09/2026 —ver las dos entradas
de esa noche, que es donde está el porqué—. **Inter con su eje `opsz`**, una familia, 400/500/600/700, tabulares medidas
(elegida el 09/09/2026; era Familjen Grotesk). Radios 22 (bandeja), 16 (hoja),
10 (interior), pastilla. Marco de **1440px** (era 1200). El rasgo: **bandeja + objeto
blanco que la desborda** —retirado el 10/09/2026, ver *La Regla de la Bandeja, retirada*— y
el cuadradito del acento en la marca.

**STORY:** Ve el informe como lo abre su cliente, con la URL real; entiende los tres
pasos y que el tercero es suyo; aprueba el ejemplo y ve salir el mail; lee el precio por
cliente y se registra.

**FIRST VIEWPORT:** Titular a todo el ancho en dos líneas —«El reporte de tu cliente,
hecho.» / «Sale cuando vos decís.», con espacio duro para que el balanceo no parta la
primera frase—; debajo, **5/12** con bajada, botón en tinta y «3 reportes gratis, sin tarjeta»,
y la bandeja iris de **741px de alto y 650 de ancho** que sostiene la ventana
(`panel.nuvloapp.com/r/…`, plan Estándar), desplazada y **cortada en seco** por el borde de
la bandeja —el fundido del héroe lo sacó el dueño el 07/09—. Navegación de 64px, en flujo.

**FORM:** Code-led. Canon de categoría fijado en `PRODUCT.md` (03/09/2026, vara Ramp /
Attio / Stripe): sin tirada de `concept-seed` por decisión de marca, no por omisión.
Siete secciones: héroe / tres pasos en una superficie / Control (noche, con la aprobación
interactiva) / El entregable (mail sobre bandeja) / Precios / Preguntas / Cierre (noche)
con pie. Movimiento: entrada del héroe, revelado por bloque, y **la aprobación** —chapa
Borrador → Enviado, el botón se vuelve confirmación—; todo apagado bajo
`prefers-reduced-motion`.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish
review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Revisión de acabado (07/09/2026)

Revisor fresco, dos rondas. Primera: **fix** con ocho arreglos materiales (KPIs
fuera de pantalla en las dos instancias del reporte; texto cortado a mitad de
palabra en móvil; copete sobre el título del informe; afirmación sobre el permiso
de Meta sin respaldo en PRODUCT.md; el mail de El entregable no ejecutaba el
rasgo; la aprobación no mostraba el mail; color demasiado pálido; caja anidada
en Precios). Segunda, sobre las recapturas: siete resueltos, uno parcial —las
citas «En el panel» de Tres pasos siguen sin registro en PRODUCT.md— y una
regresión (un enlace partido en la barra de acción), corregida después con los
enlaces en su propia línea. Capturas en `.impeccable/review/` (desktop.png,
mobile.png, hero-1440.png, control-enviado-1440.png).

## Componentes de 21st.dev (07/09/2026)

El dueño pidió sumar cuatro componentes marcados en su cuenta de 21st.dev y eligió
revestirlos con el sistema iris (sin su Tailwind, lucide ni Radix). **Timeline**
(preetsuthar17) e **Incident Status Timeline** (cnippet.dev) se fundieron en
`components/iris/Recorrido.tsx`: el recorrido del reporte dentro del panel
de Control, con los tres estados reales de `RECORRIDO_MUESTRA` y reaccionando a la
aprobación. **Bento Card** (0xUrvish) llegó por prompt pegado por el dueño y es
`components/iris/Modos.tsx`: en la columna izquierda de Control, con las dos
pestañas reales del panel (`MODOS_MUESTRA`) y los literales del disparador, la salida y la
condición; reemplazó a las tres reglas de texto. **Message** (shadcn) es `components/iris/Charla.tsx`,
debajo del mail en El entregable: la charla entre el trafficker y su cliente después del
envío, con el guion que el dueño aprobó el 07/09/2026 bajo la regla «demostración, no
testimonio» (el cliente no elogia ni cuenta resultados; pregunta por la alerta y el
trafficker contesta con la primera acción del plan). Datos en `CHARLA_MUESTRA`.

Después el dueño pasó un quinto, **Task Steps** (ddoemonn / interior.dev), que es
`components/iris/Generacion.tsx`: los cuatro pasos de generación del panel
avanzando solos, en la segunda fila de Tres pasos, en lugar de las chapas «En el panel»
(la primera fila también las perdió: sus dos frases son los dos primeros pasos de la
lista).

## Las piezas flotantes del héroe (07/09/2026)

Idea del dueño, revisada antes de construir: dos piezas superpuestas al informe, una
detrás (la pregunta del cliente, burbuja sin interfaz de chat) y una delante (la
aprobación), con fundido y escala 1,04→1 sin rebote, al primer scroll. Ajustes que aceptó:
la tarjeta dice «Aprobado por vos · 09:22» y no «esperando», porque la ventana es la
página pública; las dos caen sobre espacio vacío; respaldo de 2s para quien no scrollea.
La primera versión (burbuja blanca detrás de la ventana, tarjeta chica arriba a la
derecha) la rechazó: «no quedaron bien ubicadas ni resaltan, y la de WhatsApp tiene que
ser verde». Quedó: las dos delante, burbuja verde WhatsApp (`--wa`, una línea, sin nombre)
a la izquierda debajo del botón, y tarjeta oscura de 292px arriba a la derecha. Referencias vistas en
21st.dev: Hero with Dashboard Mockup (flexnative), Credit Card Hero (ruixen.ui), Micro
Scale Fade (educalvolpz). Código: `components/iris/Flotantes.tsx`.

## Segunda tanda de 21st.dev (07/09/2026)

El dueño pidió revisar sus marcados y proponer dónde iría cada uno. Entraron, en este
orden y revestidos con iris: **Range Select Calendar** → `Periodo.tsx`, primera fila de
Tres pasos; la matriz del **Pricing Table** → tabla de comparación en Precios (sin el
conmutador ni el plan «Popular»); **Arrow Fill Button** → el hover de todos los `i-boton`
(el disco que llena la pastilla); el resplandor del **Footer column** → detrás del
wordmark del pie; el **Gradient Blur Bg** → retícula al 3,5% sobre la bandeja de noche de
Control, que el dueño después sacó («sacale la textura al fondo»). Se descartaron los cuatro héroes (el héroe ya está decidido), la cita con
esquinas (sería un testimonio), el sidebar (es de aplicación) y los dos calendarios sin
rango.

**Text Loop** (chamaac), pasado por URL: el dueño buscaba «wordmark»; se le desaconsejó en
el wordmark y en el titular (degradé e iris adentro de la letra) y eligió la opción
verdadera: la IA escribiendo la primera frase del resumen bajo la lista de generación
(`Redaccion` en `Generacion.tsx`), sólo tipeo y cursor.

**Status** (diceui), pasado por URL con «usá estos diseños»: la chapa de estado
(`.i-chapa`) adoptó su dibujo, pastilla tintada con punto que late, en iris para Borrador
y en verde para Enviado. El código no era público, pero la ficha expone el `code.demo` y
el `bundle.html` en el CDN, de donde salió la anatomía exacta.

**Navegación y botones (07/09/2026):** la barra pasó a pegada y translúcida al scrollear,
con sección activa y «Entrar al panel»; el dueño pidió cambiar el diseño de los botones y,
ante tres opciones renderizadas, eligió «B · Bloque» (esquinas de 10px, sin flecha, canto
inferior), que reemplaza al Arrow Fill Button.

**Motion Footer** (jahed), pasado por URL: el cierre y el pie pasaron a ser el pie que se
revela por debajo del telón (`Cierre.tsx`, fuera de `main`; `sticky; bottom: 0`), con la
cinta de frases, la pregunta, los enlaces, el wordmark gigante y el botón de volver arriba.
Sin GSAP: el efecto es CSS. La ficha expone `code.demo` y `bundle.html` públicos, de donde
salió la anatomía.

**Hero Section with Device Mockups** (solaceui), pasado por URL junto con las capturas
de Gmail de `public/mockups/` («no las pegues como imagen, usalas solo de referencia»):
el iPhone dibujado en SVG + HTML (`Telefono.tsx`). La primera versión fue en el héroe,
con el panel y «Aprobar y Enviar» en la pantalla, reemplazando la tarjeta; el dueño
esperaba una sección aparte y pidió el mail como lo abre el cliente, dejándome la
ubicación: quedó en El entregable, delante de la bandeja del mail, con el lector de
correo de la captura en la pantalla, y el héroe volvió a la tarjeta. Segunda corrección
del dueño: la letra a 10px se veía borrosa («no lo escales, construilo a tamaño real con su
propia tipografía»), la ventana del mail se queda porque es otro momento (el envío; el
teléfono es la recepción), la charla sale de la sección hacia el Cierre, y el marco pasa a
ser el SVG de Figma que dejó en `public/mockups/`. Quedó a 415px con tipografía en píxeles
fijos, cortado por abajo por la bandeja. Tercera vuelta: los íconos de la barra de estado,
la isla y la cámara son los del SVG de Figma tal como vienen (`iphone-16-plus-light-sobre.svg`,
un segundo SVG con el mismo viewBox por encima de la pantalla, sólo pasados de blanco a
tinta); la hora sigue siendo texto porque es la de la historia. Cuatro cuerpos en la
pantalla (13/15/17/22), la sombra del mail ya no se recorta, la salida por la derecha es
fluida para que el aparato nunca se corte contra la ventana, y en una columna va centrado.
Cuarta vuelta: la batería del SVG sobre blanco perdía el aro: en el archivo el aro es un
`stroke` blanco, no un `fill`, y el primer recolor sólo tocó los `fill` (misma geometría; el
aro pasa a tinta y el aro y la punta suben de opacidad); los glifos del lector se redibujaron en una grilla de 24 con trazo
1,75 y tamaño óptico parejo; y la pantalla se compone en Google Sans (`next/font/google`,
400 y 500, variable `--i-gmail`), la tipografía de Gmail, única excepción a la familia única
porque es la del objeto citado.

**Control sin cabecera del mail (07/09/2026):** el bloque De / Para / Asunto del estado
Enviado se fue de Control porque estaba repetido con «Lo que recibe tu cliente», donde es
el argumento; en Control, el hito «Le llegó a Mueblería Lombardi, firmado por Estudio Bravo»
ya lo dice. Queda «Enviado.», la línea del panel y los dos enlaces.

**Cortes en seco (07/09/2026):** el dueño vio mal resuelto el corte de abajo del teléfono
—se salía 100px de la bandeja y el corte seguía recto sobre el campo— y pidió «lo mismo en
el mockup del hero». Los dos objetos quedan adentro de su bandeja y ella los corta en seco
por su borde con la esquina redondeada; el fundido al tinte del héroe se retiró junto con
el token `bandeja-fundido`, y la bandeja del héroe pasó a 684px para que el corte caiga
entre la banda de KPI y el rótulo siguiente. La hora de la barra de estado va en Inter
600 a 17px, lo más cerca de SF Pro semibold que se puede servir.

**Cierre rehecho y charla como remate (08/09/2026):** el dueño aprobó el reparto en dos
columnas y pidió «rehacé el footer»: fuera la cinta de frases; el remate es la acción a la
izquierda y la charla a la derecha —primero sobre una bandeja de noche, que el dueño sacó
el mismo día: «que las burbujas queden flotando sobre el campo, sin caja», y que entren de a
una con «escribiendo» entre mensajes y «Entregado» al final, una sola vez al entrar al
viewport, cuidando que no le saque peso al CTA (por eso ninguna burbuja es blanca y los
tiempos son cortos)—; el pie pasa a columnas
(Producto, Legal, Contacto, Cuenta) con la línea legal y volver arriba. Las Preguntas ya eran
filas con filete sin tarjetas; se sumó `name` en los `<details>` (uno abierto a la vez) y
la apertura animada con `::details-content`. Teléfono: los dos puntos de la hora se centran
con `font-feature-settings: "case"` de Inter, y el lector se compactó y la bandeja subió a
900px para que «Ver reporte completo» quede entero antes del corte.

## Crítica del 08/09/2026 y su tanda (27/40)

Dual-agent. Resueltos los cinco prioritarios:

1. **[P0] El telón asomaba bajo la barra** y pintaba de noche la franja de arriba de `main`,
   con el wordmark a 1:1 de contraste, en cualquier ventana de menos de ~905px de alto y en
   todos los móviles. Causa: `.i-fondo` (el fondo del tope de la página) quedaba en z 0, el
   mismo del telón, y perdía por orden de DOM. Arreglo: `.i-fondo { z-index: 1 }`.
   Verificado a 1423x780 y 390x840.
2. **[P1] La charla se reproducía al cargar detrás del telón** y terminaba a los 5,4s,
   invisible: el `IntersectionObserver` veía un elemento `sticky` que interseca desde el
   primer píxel. Arreglo: el disparador mira si el borde inferior de `main` subió por encima
   del techo de la charla, con `scroll` y `resize` pasivos.
3. **[P1] El pico no ofrecía la acción:** el estado enviado de Control suma «Eso fue el
   ejemplo. Hacé el tuyo.» y el botón iris, con los dos enlaces debajo.
4. **[P2] La escena de El entregable** lleva rótulos —«Lo que sale» y «Lo que le llega»— para
   que el envío y la recepción se lean sin explicación; el teléfono baja a 434px para no
   pisar el pie del mail y la bandeja crece a 1010px para que su botón entre entero. Medido:
   el teléfono nunca tapó texto del mail, sólo 27px de blanco.
5. **[P2] La copia:** fuera «Claude» y «3 llamadas a la API de Meta en paralelo», que no
   tienen respaldo en `PRODUCT.md`.

Pendiente de la crítica, no resuelto: tap targets del pie a 18px en móvil, longitud de línea
de la nota de Precios (117 caracteres), los tres bucles automáticos sin pausa (WCAG 2.2.2),
las excepciones del detector guardadas por valor y no por sitio (con motivos que apuntan a
componentes que ya no existen, y una sin motivo), y la deriva de `DESIGN.md` en color de
chapa y en botones.

**Índice vertical, construido y rechazado (08/09/2026):** el dueño pidió «un índice tipo el
de Attio, vertical tabs con la sección activa marcada y el contenido cambiando al lado» y me
dejó elegir dónde. Lo puse en Tres pasos, que era la sección con la silueta más adecuada y
la peor columna vacía, y lo rechazó: «volvé a las tres filas apiladas». Revertido en
58ce974. El motivo, dicho después: «no me convencieron las tarjetas de la derecha» —el
índice partía el conjunto en dos objetos con borde propio, que es lo que el Don't de las
tarjetas hermanas ya prohibía. Lo que el índice resolvía sigue abierto: los mil
píxeles de columna izquierda vacía en cuatro secciones, las tres animaciones simultáneas de
Tres pasos, y los bucles automáticos sin control de pausa (WCAG 2.2.2).

**La tarjeta del héroe, disparador (08/09/2026):** hecho. Empieza en «Pendiente de
aprobación» con el botón del panel; al apretarlo se cierra en «Aprobado por vos» y el campo
de dirección pasa de la vista previa del panel a la página pública del cliente. Las dos
rutas son reales: `/reportes/{id}/preview` existe en el panel y no genera enlace público.
Saca la contradicción que marcó la crítica, apaga un bucle automático y pone el gesto del
producto en el primer viewport. Costo asumido: si el visitante no aprieta, no ve la URL
pública, que era un ancla de especificidad; sin JavaScript tampoco.

**Precios con un solo precio (08/09/2026):** hecho. El Estándar solo a la izquierda, lo que
incluye a la derecha —las cuatro filas que la matriz repetía idénticas— y Marca Blanca al
pie en una línea con sus dos diferencias citadas. La matriz de comparación se retiró: con un
solo plan arriba y las diferencias citadas al pie, no quedaba nada que comparar. Era un
componente que el dueño había pedido de 21st.dev el 07/09, así que conviene que lo confirme.

**La cuenta de Precios (08/09/2026):** el dueño pidió un selector de cantidad de clientes
que calcule el total mensual, y antes de construirlo pidió la composición. Quedó adentro de
la hoja como una fila más —no un control flotando arriba, que sería el objeto hermano que
rechazó el día anterior—, con el precio por cliente todavía como número grande y el total un
escalón por debajo, con la multiplicación a la vista. No calcula Marca Blanca, por decisión suya. Arrancaba en 5;
se le mostró cómo quedaba en 10 y lo bajó a 3, que es el tope de clientes de la prueba
gratuita. El riesgo que motivó el cambio quedó dicho: multiplicar hace visible un costo que
hoy se lee de a uno, y el total pide un contexto —lo que él le factura a cada cliente— que
la página no tiene.

## Segunda crítica (08/09/2026, 30/40) y su tanda

Subió de 27 a 30; el P0 anterior está cerrado y apareció uno nuevo, propio. Arrancó por la
tanda de móvil, a pedido del dueño:

1. **[P0] El remate del Cierre era inalcanzable en teléfono.** El telón apilado mide 1457px
   contra un viewport de 840, y un pegado más alto que la ventana deja su borde superior
   fuera de la pantalla en todo scroll: titular y botones quedaban a −549 y −349 SIEMPRE.
   Regresión propia, del rehacer el pie con columnas. Por debajo de 1024px el telón pasa a
   `static`. Verificado: el remate entra entero, y en escritorio nada cambió.
2. **[P2] El corte del héroe partía las cifras de KPI en móvil.** La bandeja de 720px caía
   59px adentro del banco. Baja a 616px, que cae en el aire entre la alerta y el rótulo
   siguiente.
3. **Blancos táctiles.** Los doce enlaces del pie medían 18px y el campo del contador 26.
   Regla nueva atada a `pointer: coarse` Y al ancho —el ancho la hace verificable, porque un
   navegador headless reporta puntero fino—. Medido: 44px.

4. **[P1] El gesto del héroe no se anunciaba y su consecuencia era imperceptible.** Suma la
   invitación en la columna izquierda, el resalte del campo de dirección al aprobar, y
   «Volver a empezar», que faltaba y Control sí tenía.
5. **[P1] Los rótulos de la escena de El entregable no llegaban a AA:** 3,96:1 contra el
   extremo oscuro de la bandeja. Pasan a la segunda tinta, 6,45:1. Rompían una regla que
   DESIGN.md ya tenía escrita.
6. **La nota de Paddle** baja de 44rem a 34rem: corría a 117 caracteres por línea.

7. **[P2] Los dos bucles de Tres pasos.** La lista de generación y el título que escribe
   corrían en paralelo y para siempre. Ahora se encadenan —la lista corre, avisa al
   terminar, y recién ahí arranca el título— y las dos hacen una sola pasada. Medido: la
   lista termina a los 7,8s y el título a los 13,9s, y después queda todo quieto.
8. **El archivo de excepciones del detector, podado.** De 42 entradas quedaron 25: se
   sacaron 17 que ya no suprimían nada (los verdes de WhatsApp de pasadas anteriores, la
   rampa de iris que cambió, el radio del telón móvil que este mismo día dejó de existir) y
   se les escribió el motivo a las 5 vivas que no lo tenían. Ninguna queda sin motivo.

## Las tres preguntas de fondo, resueltas (08/09/2026)

Shape con brief confirmado. El dueño eligió las tres opciones recomendadas y sumó una cuarta
pieza (la objeción por fila).

1. **La bandeja del héroe recupera banda.** La ventana entra a 72/48 en vez de 48/36. El
   texto del informe refluye, así que se volvió a medir el corte: a 684px sigue cayendo en
   el aire, entre la banda de KPI y el rótulo siguiente.
2. **El total lleva denominador.** Una línea en Fino bajo la cifra, sin números nuevos y sin
   repetir la bajada de la sección.
3. **Dos secciones cambian de silueta:** Tres pasos y El entregable pasan a titular a todo
   el ancho con el objeto a doce columnas. Preguntas y Control se quedan partidas a
   propósito: un acordeón a doce columnas daría líneas de más de cien caracteres, y la
   columna izquierda de Control no está vacía.
4. **Cada paso nombra la objeción que contesta**, debajo del título y nunca arriba. Las tres
   frases salen de PRODUCT.md: cómo describe al usuario primario, que al modelo se le pasan
   etiquetas sin una sola cifra, y que el flujo por defecto es manual.

En el camino, la escena de El entregable se recompuso: a doce columnas la diagonal dejaba
los dos objetos desconectados y la bandeja vacía en el medio, así que van lado a lado. El
mail dejó de desbordar y se cerró con las cuatro esquinas. Y con los dos objetos al lado
apareció lo que la diagonal tapaba: el mail mide un tercio de lo que mide la bandeja, así
que apoyado arriba dejaba 304px vacíos debajo, y los dos rótulos estaban a 14px de
diferencia. Los rótulos pasaron a la misma línea y el mail al centro de su mitad, sobre el
mismo eje que el centro visible del teléfono (dueño, 08/09/2026). En móvil el corte del teléfono
pasó de −0,7 a −0,17 del ancho: antes partía una línea al medio y dejaba fuera el botón del
mail, y ahora el botón entra entero y el corte cae en el aire.

## Tercera crítica (08/09/2026, 28/40) y su tanda

Dual-agent. Bajó de 30 a 28 y el build mejoró: el puntaje es absoluto, y lo que cambió es
que dos cosas anotadas como menores, medidas en vivo, resultaron fallas materiales. Cerrado
el P0 anterior; esta corrida no encontró ninguno. El dueño pidió las seis tandas juntas.

1. **[P1] La barra pegada dejaba leer la página a través suyo.** `hoja` al 78% con 14px de
   desenfoque compone un gris ~#cbcac9 sobre la noche: a 2400px de scroll el h2 «Nada sale
   sin tu visto bueno.» atravesaba la barra y se superponía al wordmark, y el nombre del
   documento chocaba contra los enlaces. El 88% del scroll. **Quedó opaca** —el 94% con
   24px de desenfoque se probó y no alcanzó: todavía se leía «`USD 39` por cliente, al mes»
   por encima del wordmark— y sobre los dos tramos de noche se invierte entera, con el CTA
   a hoja. Se aparta del «translúcida» que el dueño pidió el 07/09; se le mostró el motivo y
   **confirmó la barra opaca el 08/09/2026**. Detectar la noche costó una vuelta:
   `elementsFromPoint` devuelve la pila entera y el telón vive detrás de `main` siempre, así
   que hay que mirar sólo el primer elemento pintado.
2. **[P1] El gesto del héroe se contradecía y su acuse era invisible.** La pista vivía en
   `Pagina.tsx`, de servidor, y el estado en `Escena.tsx`: después de aprobar la página
   seguía diciendo «Está en borrador.» a 500px de la tarjeta que decía que se envió. El
   estado subió a `Heroe.tsx`, el padre común de las tres voces, y la pista tiene dos caras.
   El acuse pasó de `iris-luz` (1,06:1) a `iris-campo-2` con filete `iris` y 1,6s, y el
   token a `tinta` en 500. En móvil el token se cortaba sin elipsis: le faltaba `min-width: 0`.
3. **[P2] El entregable decía lo mismo dos veces.** El teléfono pasó del mail abierto a la
   **bandeja de entrada**: el argumento es que en la lista del cliente el remitente es la
   agencia. Las otras filas son siluetas, porque los otros remitentes no existen y no se
   inventan. Sección de 1249 a 1119px (1644 a 1515 en móvil), bandeja de 690 a 560.
4. **[P2] La jerarquía invertía el argumento.** El paso 3 recibió la barra de acción del
   panel a tamaño real en lugar de dos chapas de texto quieto; el precio se compone como una
   sola unidad tipográfica, con la unidad en Título y en tinta plena.
5. **[P2] El sistema se filtraba.** El anillo de foco pasa a la variable `--anillo`, que
   hereda por superficie: el botón de Control salía en 2,57:1 sobre la banda clara del
   panel. Se apagó el halo crema `#fbf3e2` que se colaba de `app/globals.css`. Y la barrita
   del enlace activo y la marca de la pestaña de Modos pasaron de iris a tinta: eran los dos
   únicos usos de iris que el *Don't* no sanciona.
6. **[P2] Cinco bucles sin pausa.** El latido de la chapa y del punto del héroe hacen tres
   pasadas y paran, con nombre propio para el estado enviado. Medido después: **cero
   animaciones corriendo en reposo**. De paso, el hueco de Modos subió a 384/440 para que el
   fundido dejara de comerse la frase de la autoinhibición.

De yapa, por estar rehaciendo la barra: el hamburguesa (38×38) y el CTA de móvil (123×38)
llegaron a 44px; el bloque `pointer: coarse` se los había salteado.

**Lo que encontró la verificación, y no la crítica.** Tres defectos aparecieron recién al
medir lo construido, y los tres eran de la misma familia —una regla aplicada de nombre que
no se cumplía en la práctica—: el 94% de la barra seguía dejando leer; el cursor del título
latía desde el montaje aunque hiciera una sola vuelta, y si se scrolleaba pasando la fila a
mitad de rotación se quedaba en «escribiendo» para siempre; y la fila del teléfono no
recortaba con elipsis porque una columna de grid `auto` se dimensiona al contenido. Ninguno
se habría visto sin medir.

**Dos hallazgos del detector descartados por falsos positivos:** el calendario de `Periodo`
y el wordmark del pie ya llevaban `aria-hidden`. Y uno de la evaluación de evidencia: el
título que escribe no es un bucle indefinido —`Rotacion.tsx` frena en la última palabra—,
lo que se midió fueron los 14s de su pasada única encadenada detrás de la lista.

Verificado: `npm run lint`, `npx tsc --noEmit` y `npm run build` limpios; detector `[]` con
exit 0; cero desborde horizontal a 1440 y 390.

## La bandeja del teléfono, revestida con Gmail (08/09/2026)

Pedido del dueño después de conectar el MCP de Figma; eligió no meter Figma en el circuito
para esto —la referencia buena ya estaba en el repo— y pidió dos cosas: fidelidad a Gmail y
ritmo en las siluetas. La referencia es `public/mockups/image00002.png`, una fila real de
Gmail suya, medida contra la captura a 3x.

**La pantalla citada abre su propio prefijo de tokens.** La excepción tipográfica que ya
existía —Google Sans, la única familia ajena, porque es la del objeto citado— no tenía su
equivalente en color, y la pantalla estaba pintada con los tokens iris: buscador en
`hoja-hundida` (cálido), secundaria en `tinta-3` (violáceo), estrella en gris cálido y el
avatar del remitente en `iris-campo`. Ese último rompía el *Don't* de no meter el iris
adentro del documento —la bandeja del cliente es su mundo, no el nuestro— y el conjunto
hacía que el teléfono se leyera como nuestra interfaz justo en la sección cuyo argumento es
que es la del cliente. Ahora hay `--g-*` declarados en `.i-tel-pantalla` con los grises de
Material, sin existencia fuera de ese árbol. La regla que queda en `DESIGN.md`: **un objeto
citado se cita entero**.

**Densidad y cuerpos, medidos.** Las tres líneas de la fila van al mismo cuerpo (15px) como
en la captura: el tamaño no jerarquiza, lo hacen el peso y el color. Estaban a 15/15/13, que
metía un tercer nivel que la referencia no tiene. Se sacó el `gap` de 2px —el paso lo da el
`line-height` de 1,3, 19-20px de pitch como en la captura—, el avatar bajó a 39px y se alinea
arriba y no al centro, y la fila corría un 13% más suelta que la real.

**Las siluetas tienen ritmo de lista, no de cargador.** Una fila de dos líneas entre dos de
tres, anchos desparejos, la primera barra de cada fila más gruesa y más oscura porque el
remitente pesa más que su vista previa, y un tinte de avatar por fila —azul y rosa, los dos
que no se confunden con nada del sistema—.

Verificado: lint, `tsc` y build limpios; detector `[]` con exit 0.

## La columna izquierda, cerrada (08/09/2026)

`shape` con brief confirmado. **La premisa del pedido no se sostenía**: medidas las cinco
secciones a 1440, no eran cuatro columnas vacías sino una. Tres pasos y El entregable ya
habían pasado a titular a todo el ancho, Precios nunca fue de dos columnas —lo que la
crítica leyó como «340px bajo la hoja» es el aire antes de la banda del CTA— y las dos
mitades de Control están balanceadas al píxel (721 contra 720). La crítica se contradecía:
en un lado decía «la columna izquierda de Control no está vacía» y en otro la contaba entre
las cuatro. Quedaba Preguntas: 161px de contenido en una columna de 349, contra un acordeón
de 533.

El dueño eligió resolverla y eligió la opción recomendada: **no llenarla, moverla.** El
titular se pega y acompaña al lector; el soporte —que hasta ahora se leía ARRIBA de las ocho
preguntas, ofreciendo ayuda antes de que hicieran falta— baja al pie de la columna. Se
descartó llenarla con la evidencia de cada respuesta: cinco de las ocho preguntas tienen
objeto y tres no, y las cinco repetirían objetos que la página ya mostró.

Tres cosas que aparecieron al construir y no en el brief: el pegado no pegaba porque su
bloque contenedor medía lo mismo que el titular (hay que estirar el elemento que lo
contiene); las dos piezas de la columna comparten una sola área de grilla en vez de usar
`order`, para que el orden del DOM sea el orden de lectura en las dos anchuras; y la línea
de soporte caía justo en el borde del corte y saltaba entre una y dos líneas según el ancho
—dos a 1024, una a 1280, dos a 1680—, así que se partió en dos por construcción: la pregunta
arriba y el mail en su propia línea, que además se toca mejor.

**Decisión delegada por el dueño y tomada sobre lo construido:** la línea de soporte queda en
Cuerpo y no baja a Fino. Es la única salida que ofrece la sección y se lee después de que
ocho respuestas no alcanzaron; en la tercera tinta a 12px habría quedado como una nota legal,
y encima el mail es un enlace, así que achicarlo achica el blanco que hay que tocar.

**Cambio de copy, para confirmar:** «Si algo no está acá, escribinos a soporte@nuvloapp.com.»
pasó a «¿Y si no está acá?» con el mail debajo. Al pie de una lista de ocho preguntas, la
frase en forma de pregunta se lee como la novena. No cambia ningún hecho.

Verificado a 1024/1120/1280/1440/1680 y en móvil: el pegado se queda a 88px del tope con la
barra en 65, viaja mientras dura la fila y se va con ella al revelarse el telón; en una
columna el pegado se apaga y el soporte queda después del acordeón; cero desborde; lint,
`tsc`, build y detector limpios.

## El plan de acción, visible (08/09/2026)

El dueño preguntó si el plan de acción —lo único del informe que la IA redacta como consejo—
iba como sección propia o entraba en una existente. Medido primero: **no faltaba, estaba
renderizado dos veces y visible cero píxeles**. Vive a 910px del tope del documento y las dos
bandejas cortan a 591 y 367 de documento visible. Y de paso apareció una duplicación que
nadie había contado: el héroe llegaba hasta «Resultados del período» y Control arrancaba
justo ahí, así que **el banco de KPI se mostraba dos veces**.

Se descartó la sección propia por tres motivos: `PRODUCT.md` no tiene con qué respaldar una
afirmación sobre la CALIDAD del consejo —«lo único citable hoy es el reporte de muestra», sin
testimonios ni casos—; el riesgo es asimétrico, porque poner tres frases de consejo en grande
invita a juzgarlas y si parecen genéricas se pierde al visitante en el peor momento; y el
método de la página es mostrar el objeto, no asegurar valor.

**Hecho: un tercer ancla, `desde="plan"`.** Las dos instancias se reparten el documento —el
héroe el arriba, Control el plan— y ya no se superponen. El criterio: lo que un trafficker
revisa antes de aprobar no es la aritmética sino la prosa que sale firmada con su nombre;
mostrarle las cifras en la pantalla de la aprobación era enseñarle justo la parte que no
revisaría. Verificado: el banco de KPI aparece **una sola vez** en la página.

La bandeja de Control se remidió contra lo nuevo, con dos condiciones en diez anchos (360 a
1680): el plan entero por encima del techo del fundido, y el final del documento por debajo,
para que se disuelva en vez de quedar contenido. Tres altos —720, 654 y 796—, porque el plan
reflúye a más líneas cuanto más angosto es el panel; el fundido bajó de 140 a 96px, porque a
140 el tercer consejo caía adentro del degradé. En el camino se tocó y se revirtió un alto de
664 que dejaba Control desbalanceado (columna izquierda 721 contra 664); con 720 las dos
condiciones se cumplen igual, con 80px de aire, y las columnas vuelven a 721/720.

## El criterio de la IA (08/09/2026)

`shape` con brief confirmado. El hallazgo: la página cubría **un solo eje del miedo a la IA,
y tres veces** —«la IA no ve un solo número» en el paso 2, «si un número no entra al prompt,
no puede salir» en el mismo cuerpo, y «¿La IA puede inventarme un número?» en Preguntas—.
El otro eje, si lo que escribe vale la pena mandarlo, no tenía una línea. Y es el que le
cuesta la reputación al trafficker: nadie teme que la IA invente un CPC, teme quedar mal
delante de su cliente.

La respuesta existía y estaba enterrada: **si la IA no vuelve, el reporte se genera igual y
entero —los números nunca dependieron de ella—, se marca «Resumen genérico» y el envío
automático se autoinhibe.** No es «nuestra IA es buena»: es que el producto sabe cuándo lo
que escribió no sirve y se niega a mandarlo con la firma del usuario. Vivía en la cuarta
línea de la segunda pestaña de la tarjeta de Modos.

Tres movidas, ninguna sección nueva y ningún objeto nuevo:

1. **Control pasa de un freno a dos.** La bajada decía «hay una condición que lo frena» sin
   decir cuál; ahora nombra el segundo freno. Regla de reparto: el PRINCIPIO en la bajada de
   Control, el LITERAL en la pestaña automática de Modos, la CONSECUENCIA en Preguntas. Tres
   ángulos, nunca la misma frase.
2. **Novena pregunta, y contesta que no.** «¿Puedo cambiar lo que escribió antes de
   mandarlo?», en la posición 4, pegada a «¿Qué pasa si no me convence…?», que es su
   continuación literal. Las dos críticas la anotaron como pregunta sin contestar; no estaba
   sin contestar, estaba **sin preguntar**.
3. **La objeción del paso 2 cambia de eje.** De «La IA no ve un solo número» —cierto, y ya
   sostenido por el cuerpo del mismo paso— a **«Escribe el análisis, y sale con tu firma.»**
   El dueño delegó la elección; se eligió ésta y no «Y si no le sale, el reporte se marca y
   no sale solo» porque la segunda repetía el freno que Control acababa de nombrar, y la
   regla de reparto de la movida 1 lo prohíbe.

**Verificado en `nuvlo-panel`, no asumido:** no hay endpoint ni componente de edición (la
API de reportes sólo tiene `generar` y `enviar`), y `PRODUCT.md` no registra ninguna. Sobre
el crédito, el dueño delegó la averiguación: `consumesCredit = reportUser?.paddleSubscriptionId
=== null` (`generate-report.ts:178`), o sea **se consume sólo durante la prueba gratuita,
nunca con suscripción activa**. Eso entró a la respuesta.

**Segundo hecho encontrado y NO escrito, pendiente de decisión del dueño:** el incremento del
crédito está en la misma transacción que crea el reporte y **no exceptúa el respaldo**, así
que un reporte cuya prosa cayó al texto genérico también gasta uno de los tres. Es adverso y
excede lo que el brief contemplaba, así que se deja como decisión suya. Recomendación:
decirlo. La estrategia de credibilidad de la página es decir lo incómodo primero, y un
usuario de prueba que quema un crédito con un reporte de respaldo y no fue avisado es un
reclamo en el peor momento.

**Costo asumido:** Preguntas pasa de ocho filas a nueve, y la crítica ya contaba ocho como un
punto de decisión por encima del límite de la memoria de trabajo. Ninguna de las ocho es
descartable. La bajada de Control pasó de tres líneas a cuatro y su columna quedó 29px más
alta que la bandeja (749 contra 720): invisible, y el 721/720 anterior era coincidencia, no
regla.

Verificado: lint, `tsc`, build y detector limpios; el chequeo de precios del panel también;
la respuesta nueva corre a 74 caracteres por línea, adentro del rango; sin desborde en móvil.

## Cuarta crítica (08/09/2026, 30/40) y su tanda

Dual-agent, y por primera vez la corrida probó el foco de teclado contra el telón revelado
—algo que las tres anteriores nunca habían medido— y encontró ahí la peor falla de la
página. El puntaje quedó plano contra el 30 anterior a pesar de que se cerró todo lo que la
tercera marcó: lo que cambió es qué se buscó.

Los tres P1, hechos juntos:

1. **El foco caía en un pie invisible, cinco paradas seguidas.** El telón es un `sticky`
   detrás de `main`: en pantalla, tapado al 100%, y en el orden de tabulación. Medido, el
   scroll no se movía (5470 en las cinco paradas) y una de las paradas era «Empezar gratis».
   WCAG 2.4.11. Queda `inert` mientras está tapado, con el mismo cálculo que revela el telón.
   El margen de 24px no es precaución: al fondo el borde de `main` y el techo del pie
   coinciden con **0,28px** de diferencia, y a cuchillo el pie quedaba inerte para siempre.
2. **El pico degradaba el plan.** Al pasar a Enviado la barra de acción crece de 84 a 183px
   y la última acción pasaba de 80px de aire a 57 adentro del fundido. Regresión de la tanda
   del plan, que midió diez anchos y un solo estado. La bandeja crece con el estado, con dos
   variables por punto de corte porque en una columna el documento baja 173px en vez de 137.
3. **La instrucción del héroe apuntaba a un botón invisible.** Se ata al mismo atributo que
   revela la tarjeta, con `:has()` sobre la fila.

El barrido de los dos patrones, que el dueño pidió para cerrar la clase y no el caso:

- **El anillo**: el arreglo del 08/09 se aplicó sólo a `.i-panel` y la crítica encontró la
  misma falla intacta en `.i-modos` (2,30:1 y 2,57:1 — el segundo, el mismo número que ese
  arreglo decía haber cerrado). El barrido enumeró **seis superficies claras** heredando el
  anillo equivocado, todas del mismo subárbol. Hoy las islas son dos y las dos lo redeclaran.
- **Las bandejas**: la del héroe SÍ es estable entre estados —la tarjeta se achica al aprobar
  y el corte no se mueve—, así que la clase queda cerrada en una sola bandeja.

Las dos contradicciones de `DESIGN.md`, resueltas a pedido del dueño («resolvelas vos»):

- **El calendario: gana el *Don't*.** Los extremos pasan de discos iris saturados a tinta.
  Es un dibujo y no una acción, y un calendario con más color que el informe invierte la
  tesis del sistema. La banda del rango se queda en `iris-campo-2`, que sí es el rol
  sancionado.
- **La *Named Rule* «nunca centrado ni contenido»: gana el build y la regla se acota.**
  Estaba escrita sin sujeto; leída así también la incumplirían el teléfono y el panel. Lo
  que el dueño rechazó el 07/09 fue el INFORME encogido. La regla ahora dice de qué habla.

Los dos P2 y los dos residuos, después:

- **El clon del paso 3, reemplazado.** Era un clon pixel a pixel del panel de Control a
  340px del que sí funciona, con un botón muerto. Ahora el objeto es la CONSECUENCIA: las
  dos cosas que un borrador no tiene todavía, tachadas. El tachado es la alternativa al
  `opacity` que el sistema prohíbe para decir «pendiente».
- **Las pestañas de Modos tienen forma de control**: filete de un píxel y `tinta-2`.
- **La chapa «Enviado» pasó de 4,38:1 a 5,17.** `--hecho-tinta` bajó dos pasos: el primero
  la dejaba en 4,58, que pasa por 0,08 y es el mismo filo del problema. Medidas las cuatro
  chapas de la página contra su fondo real compuesto: la peor da 4,71.
- **La excepción huérfana del detector, borrada.** De 25 entradas quedan 24: el motivo de la
  de `12px` apuntaba a `.i-tel-mail`, que dejó de existir con la bandeja de entrada.

Verificado: lint, `tsc`, build y detector limpios; el chequeo de precios del panel también.

## Las dos preguntas que dos críticas hicieron y ninguna tanda tocó (08/09/2026)

`shape` con brief y copy confirmados. Las dos venían de la tercera y la cuarta crítica.

**El total llegaba sin escolta.** Diagnóstico corregido al medir: el contexto no faltaba,
estaba susurrado —«Uno por cada cliente al que ya le facturás» en Fino a 12px bajo una cifra
de 28— y además decía la mitad de su propia idea. La otra mitad estaba en `PRODUCT.md` y la
página no la usaba en ningún lado: el reporte mensual es **trabajo no facturable**. El dueño
eligió usarla y aprobó el copy. Sube a Cuerpo. Sigue sin sumar una cifra nueva: se descartó
cruzarlo con «una tarde» de Tres pasos, porque multiplicar una frase cualitativa por la
cantidad de clientes es inventar una cuenta que `PRODUCT.md` no respalda.

**Los 427px del héroe.** Diagnóstico corregido igual: la columna no estaba vacía —bajada,
botón, la línea de la prueba y la pista del gesto son el argumento completo del primer
viewport—, estaba hablando bajo, con un salto de 64px a 19 en una columna de 355. La bajada
crece con un **rol nuevo y documentado**, «Bajada de portada», porque entre 19 y 30px la
escala no tenía nada y el sistema prohíbe el escalón suelto pero permite documentar un rol
que falta.

El tope se midió contando caracteres por línea visual: 43 a 19px, **39 a 22**, 32 a 24 y 32
a 26 con el alto ya casi plano. 22 es el codo. El piso es el de la bajada normal, así que en
teléfono no crece nada —el héroe ya mide 892px contra un viewport de 844 y engordarlo
empeoraría un problema que la cuarta crítica anotó—.

**Lo que resuelve y lo que no, dicho de frente:** la columna pasa de 257 a 304px de contenido
sobre una fila de 684, así que el aire baja de 427 a 380 y no desaparece. Llenar esa fila con
tipografía pediría un cuerpo que arruina la medida. Lo que queda es composición y no hueco, y
queda registrado en `DESIGN.md` para que la próxima crítica no lo vuelva a abrir.

Verificado a 1440, 1024 y 390: sin desborde, el teléfono sin crecer, y el denominador
idéntico con la cifra en tres y en cuatro dígitos. Lint, `tsc`, build y detector limpios.

## La tipografía, elegida por sus referencias (09/09/2026)

El dueño pidió cambiar la tipografía. Se armó `preview/tipos`, un banco que llegó a
**dieciocho direcciones** sobre el mismo contenido real —titular, banco de KPI, tabla,
precio— con el color y el espacio idénticos, para comparar caras y no diseños.

**La condición no negociable se midió, no se asumió.** Se probaron **60 familias** cargando
cada una por separado y comparando `111111`, `000000` y `444444` con `tabular-nums` a 100px.
**Doce no traen el feature** y desalinean la tabla fila contra fila: DM Sans y Cabin (223px
de diferencia), Be Vietnam Pro (195), Commissioner (135), Libre Franklin (134), Instrument
Serif (127), Fraunces (120), Darker Grotesque (115), Wix Madefor Display (114), Wix Madefor
Text (97), Roboto Slab (100) y Aleo (15). Varias eran las candidatas obvias.

**El dueño recorrió el banco rechazando por motivos precisos**, y cada rechazo cerró un eje:
Familjen «parece cortada» —remates en ángulo, aperturas cerradas—; el serif del informe «muy
editorial», lo que mató la vía de dos familias, porque **la separación entre página y
documento sólo se ve con un serif** (medido: en los pares de dos grotescas no se distinguen
las mitades ni buscándolas); y Plus Jakarta Sans, que era la respuesta a «cortada», no lo
convenció.

**Lo que destrabó no fue otra candidata: fue preguntarle qué le gusta.** Nombró Attio,
Linear, Resend y Ramp, y los cuatro se midieron leyendo el `font-family` computado y los
woff2 que pide cada página: Attio usa Inter Display arriba e Inter en el cuerpo, Linear usa
Inter Variable en todo, Resend usa Inter en el cuerpo, Ramp una neogrotesca suiza comercial.
**Tres de cuatro son Inter.** La lección de método: **cuando el rechazo es por gusto tres
veces seguidas, la pregunta útil deja de ser «qué otra propongo» y pasa a ser «qué te gusta
a vos», y la respuesta se mide.**

**Por qué no se lee anónima**, que era el miedo con el que se había descartado Inter: no es
la cara, es el **corte Display**. «Inter Display» no es otra familia — es Inter con el eje
`opsz` alto — y declarando el eje el navegador lo pide solo. Medido: la misma frase a 64px
da 942px con `opsz 14` y **873 con `opsz 32`**.

**Dos instancias de `Inter()` en el mismo layout matan el eje**, y costó encontrarlo: el
reloj del teléfono tenía su propia declaración, `next/font` servía una sola sin `opsz`, y
pedir 14 o 32 daba el mismo ancho al píxel. La elección entera no existía y no se veía. Hoy
el reloj usa la Inter del sitio. **La prueba de que un eje variable está vivo es medir dos
valores del eje, no leer la declaración.**

## El ancho y la recomposición (09/09/2026)

El dueño dijo que los contenedores le quedaban angostos contra sus referencias. Medidas:
**Attio 1440, Linear 1436, Resend 1280**; estábamos en 1200, el más angosto. El marco pasó a
**1440**.

**Lo que no se copió es «todo más ancho».** La banda del titular de Attio mide 912 dentro de
su contenedor de 1440. Sin esa segunda mitad, el ensanche llevaba el párrafo del informe de
79 a ~115 caracteres por línea, así que la bandeja del héroe se topeó en 650px.

> **Corrección (09/09/2026).** Este párrafo decía que con ese tope la medida del informe
> mejoraba «de 75–79 a 56–62». Era falso y era mío: la sonda leía sólo el primer nodo de
> texto de párrafos que llevan `<span>` adentro, o sea media línea. Medido bien, con el
> marco en 1440 el resumen corría a **76–83 caracteres por línea**. El tope de la bandeja
> le da al OBJETO su tamaño de lectura; la medida de la prosa la arregló recién
> `--medida-doc`, abajo.

Después el dueño marcó dos defectos de composición en el héroe y pidió el mismo criterio en
toda la página. El barrido midió carácter por carácter, agrupando por línea visual, en cuatro
anchos:

- **El titular partía «El reporte de tu cliente,» / «hecho. …»**: `text-wrap: balance` iguala
  el largo y no sabe del sentido. Espacio duro, y el único corte legal cae donde termina la
  idea.
- **La bajada en cinco líneas de 30 caracteres**: eran dos causas, la columna de 4/12 **y** un
  tope propio de 24rem que la capaba aunque la columna creciera.
- **Cinco secciones con texto topeado flotando en columnas anchas** — el paso (480 en 918), la
  respuesta (480 en 859), la bandeja (650 en 760). De ahí sale el *Do* nuevo: **la columna se
  declara en su medida y lo que sobra se va al hueco.**
- **Dos columnas apiladas por punto de corte**: Tres pasos a 768 con el texto en 209px (diez
  líneas de 27 caracteres) y Modos a 1024 con 181px. Umbrales movidos a 899 y 1080.

**Dos errores propios que la verificación agarró**, y valen más que los aciertos: declarar el
titular de Preguntas en `1fr` lo dejó igual de ancho que el acordeón —dos columnas parejas,
que la *Regla del Titular a la Izquierda* prohíbe—; y fijar la columna de la bandeja en 650px
rompió el héroe a 1024, dejando la bajada en seis líneas, peor que el problema original. De
ahí: **todo ancho declarado necesita el umbral donde deja de entrar.**

Verificado en ocho anchos de 390 a 1920: bandeja del héroe con 10px de aire y el corte en el
hueco en los seis de escritorio, Control entre 35 y 101px de aire en los dos estados, cero
bloques con problema de composición a 1920, 1440 y 1024, sin desborde horizontal. Lint,
`tsc`, build y detector limpios.

## El P0 de la quinta crítica: la tarjeta y la medida (09/09/2026)

El dueño pidió cerrar el P0 —la tarjeta de aprobación tapando el bloque de identidad del
informe, y el banco de KPI bajo el pliegue a 1440×900— y la medida del párrafo del informe.

**La crítica había medido cajas, y eso cambió el diagnóstico.** Decía «303px del bloque de
identidad». Medida la tinta carácter por carácter, a 1440 se perdían **16 caracteres de una
sola línea** —«26 - 30 jun 2026», la cola del período comparado—: bastante menos de lo
anotado. Pero el barrido de ocho anchos encontró lo que esa medición no había visitado:

    1152  «rdi», «s» y el período entero      — se comía el apellido del cliente
    1024  « Lombardi», «ón · Meta Ads»          — el nombre del cliente y el tipo
     768  las nueve cifras de tres filas de la tabla
     390  «Métricas detalladas» y la fila de encabezados

O sea: **no era un caso de 1440, era una clase presente en todos los anchos**, y la
medición por cajas se equivocaba en los dos sentidos —exageraba donde el margen es ragged y
no veía nada donde el ancho cambia—. De ahí la *Regla de la Pieza que Flota* y tres
`Don't` nuevos en `DESIGN.md`.

**Lo que se hizo.** La tarjeta se apoya en el informe sólo donde la bandeja tiene su ancho
fijo (≥ 1282); entre 1024 y 1281 se corre a la izquierda del documento, fuera de él, y por
debajo de 1024 baja debajo de la bandeja, con 160px reservados en el héroe para que no se
apoye sobre «Tres pasos». Para que entrara a ≥ 1282 la comparación del período bajó de
renglón. Verificado en quince anchos de 390 a 1920, en las dos caras: **cero caracteres
tapados**, sin desborde horizontal y sin chocar con nada de la página.

**La medida.** `--medida-doc: 27rem` sobre el resumen y la alerta: de **76–83 a 59–68
caracteres** por línea. No agrega líneas —los párrafos ya eran cortos para su columna— y
tiene un efecto lateral bueno: por encima de una columna de 432 el resumen dejó de refluír,
así que lo único que mueve el corte de la bandeja es el alto del propio banco. Los tres
tramos de altura se volvieron a derivar (760 / 775 / 796, con límites al píxel en 1049/1050
y 1168/1169) porque el período en dos renglones empujó el informe 19px y el corte había
pasado a comerse los últimos 9 del banco. Desaparece de paso la franja de 12px que el CSS
aceptaba como incubrible.

**El banco de KPI sigue bajo el pliegue, y no es por falta de ajuste.** A 1440×900 termina
198px por debajo. La cuenta: el h1 ocupa 153–284 a todo el ancho y la fila arranca en 348;
el banco cae 573 más abajo del borde de la bandeja. Para terminar en 900 la bandeja tendría
que empezar en 170, y arriba hay 195px de titular. La primera línea de tinta del h1 llega a
849 y la bandeja arranca en 735, así que **hoy no entran al lado**. Quedan dos salidas, las
dos de composición y las dos del dueño:

1. **Meter el h1 en la columna izquierda** y subir la bandeja a la altura del titular. Gana
   los 195px de una, pero el titular pasa de 2 líneas a ~4 y se rehace su corte, que costó
   trabajo.
2. **Sacar el resumen ejecutivo del informe del héroe en escritorio**, como ya se hace en
   teléfono con `[data-arriba]`. Medido: el banco terminaría en ~758, dentro del pliegue.
   El costo es el simétrico del que se aceptó en móvil —ahí se sacrificó «de quién es el
   informe», acá se sacrificaría «la IA escribe esto»—.

Ninguna se tomó desde acá. La cuenta quedó escrita en `secciones.css`, junto con la
corrección de la afirmación vieja —esa hoja decía que «a 900 de alto el primer viewport ya
muestra sus rótulos y sus cifras», y era falso—.

## El banco de KPI arriba del pliegue (09/09/2026)

De las dos salidas que la sección anterior dejó abiertas, el dueño eligió la segunda: **el
héroe arranca el informe en «Resultados del período», en todos los anchos**, con el encabezado
y el resumen leídos por arriba —la misma posición de lectura que ya usaba en teléfono y que
usa Control—. El banco pasó de terminar 198px POR DEBAJO del pliegue a terminar entre 128 y
254px POR ENCIMA, según el ancho.

**Se saltean los dos bloques, no sólo el resumen.** Sacar el resumen dejando el encabezado
—que era lo que la palabra «sacar el resumen» sugíe, y conservaba el nombre del cliente en la
hoja— saltea un bloque DEL MEDIO, y eso lo prohíbe la Regla de la Posición de Lectura: el
héroe estaría mostrando un informe que el panel no emite. `desde` sólo permite saltear desde
el principio.

Lo que se pierde es «de quién es el informe» impreso en la hoja. Lo sigue cargando la tarjeta
de aprobación, que está en el mismo primer viewport y dice «Se envía a
hola@muebleria-lombardi.com», y más abajo El entregable con la bandeja de entrada.

**Lo que se gana además de la altura**: ahora entran los DOS bloques de datos —los cuatro KPI
y la tabla contra el período anterior— antes del corte, que es exactamente lo que la página
viene a decir que la IA no tocó. Antes el corte caía entre el banco y el rótulo de las
métricas; ahora cae entre la tabla y «Plan de acción».

### Tres cosas que el cambio arrastró, y ninguna estaba en el pedido

1. **La tarjeta de aprobación se quedó sin borde derecho donde pararse.** Con el informe
   arrancando en el banco, lo primero del documento es una grilla de celdas de borde a borde:
   sin margen ragged. Medido, la tarjeta tapaba tres etiquetas del banco. Las dos piezas
   flotantes pasaron a la izquierda, ancladas por su borde derecho 12px antes de la tinta
   —`right: calc(100% − 101px)`, la misma cuenta para las dos—, y siguen mordiendo la ventana
   con su relleno. La burbuja además se comía la «F» de «Frecuencia»: estaba anclada por la
   izquierda con ancho `max-content`, así que su borde derecho dependía de su propio texto.
2. **Un filete separador huérfano arriba del documento.** `display: none` saca al hermano del
   render pero no del selector `+`, así que «Resultados del período» seguía heredando el
   filete y los 38px que lo separaban del resumen: quedaba una raya separando el documento de
   nada. No aparece en ninguna medición de solapes; se ve en una captura.
3. **El banco mostraba «$486.25».** Defecto PREVIO que el pliegue venía tapando: cuatro
   columnas fijas con un `@media (max-width: 640px)` que las bajaba a dos. El viewport es mal
   proxy del ancho del banco —a 390 mide 249 y a 1024 mide 409, los dos con la regla de
   cuatro— y a 1024 recortaba 21px de la inversión y 9 de «Conversaciones». Ahora la cuenta la
   hace el objeto: `@container (min-width: 520px)` para cuatro columnas, dos por dos si no.
   De ahí salen dos `Don't` nuevos en `DESIGN.md`: no usar media queries de viewport para la
   forma de un objeto, y no dar por bueno lo que sube al primer viewport sin volver a mirarlo
   ahí —**el pliegue no arregla ni rompe nada, sólo decide quién mira**—.

Los tramos de altura de la bandeja se rederivaron tres veces en la tanda (una por cada uno de
esos arrastres) y quedaron en **627 / 753 / 768**, con límites al píxel en 1041/1042 y
1238/1239. Los dos escalones tienen causas distintas: el de 1239 es el banco pasando a dos
por dos (126px de un saque), el de 1042 es el banco de dos por dos ganando un renglón adentro
de sus celdas.

Verificado en once anchos de escritorio y en las dos caras de la tarjeta: cero caracteres
tapados, cero recortes en el banco, 10px de aire tras la tabla con el corte 10px antes del
rótulo siguiente, la tarjeta dentro del pliegue y sin desborde horizontal. Lint, `tsc` y
build en verde.

## El corte de la tabla en teléfono (09/09/2026)

Eran **dos** cortes, no uno, y el segundo lo encontré mirando la captura después de medir el
primero:

1. **Vertical.** Por debajo de 693 el banco pasa a dos por dos y el documento se estira; con
   la bandeja fija en 616 el corte caía adentro de una fila de la tabla en TODO el rango de
   teléfono: «Frecuencia 3,19» de 430 a 692, «Alcance» a 360, «Impresiones» a 320.
2. **Horizontal.** La tabla mide 307px de ancho mínimo —celdas `nowrap` más tres
   separaciones de 16— contra una ventana de 249 a 390. Medido a 390 se salían del recorte
   «Variación» y las cinco variaciones; a 320, también «Anterior» entera. `overflow-x` la
   deja scrollear, así que no hay pérdida de dato, pero lo que se veía era media columna
   —«ANTERIORV.»— y media columna se lee igual de rota que media fila.

**Un solo arreglo cierra los dos.** El corte pasa al hueco de 20px que hay entre el banco y
el rótulo «Métricas detalladas»: el teléfono muestra los cuatro KPI enteros y nada más, que
es lo que la posición de lectura de teléfono viene diciendo desde el 08/09/2026. Y como la
tabla queda por debajo del corte, el desborde horizontal deja de verse sin haber tocado la
tabla.

**Los tramos se agrupan por el hueco, no por el alto del banco.** Entre 320 y 692 el banco
termina en siete alturas distintas —411, 426, 441, 456, 470, 471, 472 y 489—, pero como el
hueco mide 20px alcanzan tres valores: **428** (490–692), **458** (333–489) y **490**
(320–332). Límites al píxel: 692/693, 489/490 y 332/333. Por debajo de 320 el banco crece un
píxel por píxel y ningún tramo lo sigue; 320 es el piso que se soporta, y queda dicho.

Verificado en diecisiete anchos de 320 a 1023: el corte cae en el hueco en todos, ninguna
fila ni celda de KPI partida, **cero texto del documento fuera del recorte** y sin desborde
horizontal de página. La tarjeta cuelga de la bandeja, se movió con ella y sigue sin tapar
nada ni chocar con «Tres pasos».

## Séptima crítica (09/09/2026, 32/40) y su primera tanda

La más alta de las siete corridas y la primera sin P0 desde el mediodía. El detector CLI dio
`[]` con exit 0, validado contra un archivo sucio de control. De los 32 hallazgos del overlay,
la mayoría son falsos positivos del telón `sticky` y de los recortes deliberados; tres los
adjudiqué midiendo: el texto del informe «tapado» a 430 y 768 no lo está (0 solapes reales
excluyendo lo que el recorte ya oculta), los 2 `svg` sin etiqueta heredan `aria-hidden`, y el
filete de la pestaña inactiva sí era real y peor de lo anotado.

**Cerrado en la primera tanda:** P1 (la premisa en teléfono: el host cede el lugar a la ruta
por `@container`, y la tarjeta sube arriba de la bandeja —de 615px a 88px entre la pista y el
botón—), P4 (el estado de la pestaña de Modos, de 2,03 a 3,31:1), P5 (un solo botón en el
remate) y cinco menores: el `h3` que se servía partido, dos objetivos táctiles, el wordmark a
`href="#"` y la deriva del índice de `/preview`.

**P2, a medias y por decisión medida.** El dueño eligió «mostrarlo en vez de decirlo», y eso
está hecho: los dos pies del informe se ven sobre la hoja en Precios, con la tipografía del
documento, en vez de citarse entre comillas. Lo que **no** se hizo es la tercera vista de la
CABECERA del documento: la crítica la ubicaba en «~90px de bandeja muerta debajo del mail» de
El entregable y ese hueco no existe en escritorio —medido a 1440, el mail y el teléfono
comparten celda y el mail desborda la bandeja 64px—. Ponerla ahí pide recomponer esa escena.

## Octava crítica (09/09/2026, 34/40) y su tanda

Dual-agent. La más alta de las ocho corridas, sin P0 y con el detector CLI en `[]` (exit 0,
validado contra un archivo sucio de control). **El overlay del navegador no corrió**: la
inyección de `detect.js` la bloquea la propia CSP —`script-src 'self'` acepta el inline del
preflight pero rechaza un `<script src>` cross-origin a otro puerto de localhost—, así que la
evidencia es medición directa y no overlay. Queda anotado para las próximas corridas: en este
repo el overlay no es una opción, y no por falta de intento.

El dueño pidió la tanda entera: los dos P1, los tres P2 y los menores.

1. **[P1] El primer frame pintado no tenía marca, ni gesto, ni destinatario.** Medido a los
   3,5s sin scroll: pista, tarjeta y burbuja en `opacity: 0` en 1440, 1024 y 390, con la
   columna izquierda 351 / 329 / 258px vacía sobre el pliegue. **No era reabrir un trade-off
   cerrado**: la decisión del 07/09 («sin respaldo por tiempo, quien no scrollea no las ve»)
   se tomó cuando el informe del héroe abría por el encabezado con el nombre del cliente, y
   el 09/09 la posición de lectura se movió y el brief transfirió ese trabajo a la tarjeta,
   «que está en el mismo primer viewport». Las dos decisiones eran incompatibles: la tarjeta
   estaba en el primer viewport **scrolleado**, no en el **pintado**.

   El dueño eligió, entre cuatro salidas, emitirlas **visibles desde el servidor**. Hoy no hay
   atributo ni efecto que las oculte y la entrada se conserva como animación de `transform`
   —escala 1,03 a 1, con los mismos 240ms entre las dos—. Verificado: `opacity` 1 en los tres
   anchos con `scrollY` en 0. Revierte una decisión suya del 07/09, con su acuerdo.

2. **[P1] El teléfono se comía el final de la única frase del mail entre ~1024 y ~1080.**
   Medido con `Range` carácter por carácter por las dos evaluaciones: 1440 sin solape, 1100
   con 75px de solape de cajas y **cero glifos tapados**, 1060 tapando `listo.` y 1024
   `está listo.`. El tope de `100% - 480` existía desde el 09/09 para la ventana de «Lo que
   abre» y nunca se le aplicó al mail, que comparte fila con el mismo aparato. Hoy lo lleva:
   a 1024 el mail mide 432 y termina en 512 contra un teléfono que arranca en 529, con el
   cuerpo en 55 caracteres por línea; a 1440 no cambia nada. Verificado en los cuatro anchos:
   **cero caracteres tapados**. De acá sale el *Don't* de cerrar una clase en un solo objeto.

3. **[P2] El tachado del paso 3 medía 1,58:1.** `filete-fuerte` con grosor `from-font` (~0,7px
   a 13px) sobre la hoja. Pasa a `tinta-3` con 1,5px declarados: 5,50:1. Es el reemplazo del
   `opacity` prohibido, y había salido más flojo que lo que reemplazaba.

4. **[P2] Los dos pies del informe eran tarjetas hermanas anidadas.** Dos cajas de 637×95 con
   borde, radio y fondo hoja adentro de la hoja de Precios. Hoy son un hueco partido por un
   filete de un píxel, con la mecánica del banco de KPI. Se sacó además el filete distinto del
   de Marca Blanca: era una segunda diferencia entre dos objetos que se diferencian en una.

5. **[P2] `.i-formas` abría 400px de hueco horizontal.** `auto-fit` con `space-between` y sólo
   dos ítems. Hoy son dos pistas declaradas de 30rem con umbral en 768px.

6. **Los menores.** La pestaña de Modos deja de recortar su etiqueta (`scrollWidth` 110 contra
   105; hoy 105 = 105, con el relleno en 8px y corte por sílaba de red); la marca de la pestaña
   activa va al ras del canto y no a un píxel de él (89 = 89); y el bloque de blancos táctiles
   de `secciones.css:1064` suma el acompañante de ancho que los otros dos ya tenían, **que es
   lo que lo hace verificable**: sin él, un barrido headless mide 40px y da por fallados dos
   objetivos que en un teléfono miden 44. La octava crítica cayó justo en eso.

**Dos cosas que se revisaron y se dejaron como estaban, con el número puesto:**

- **La huérfana «con tu marca.» de la bajada del héroe.** Remedida a 1440, la bajada corre
  42 / 53 / 47 / 13 y cae en cuatro líneas. La última es corta pero son tres palabras, así
  que `text-wrap: pretty` la da por legal y el espacio duro las arrastraría juntas al renglón
  anterior. Lo que estaba mal era `DESIGN.md`, que seguía afirmando 48 caracteres y tres
  líneas: números de Familjen sobrevividos al cambio de familia. Corregido ahí.
- **La fila 3 de Tres pasos.** La crítica trajo dos números que no coinciden —418px de vacío a
  la derecha del conjunto contra 89,7px de tinta trailing adentro del bloque— y el segundo es
  el que corresponde: los 418 son la diferencia entre componer en 52rem y componer al ancho de
  las filas 1 y 2, no un hueco adentro de la fila. Se evaluó devolverle el ancho de sus
  hermanas o recortar la banda teñida y no: el ancho cerró los 474px de la séptima crítica, y
  una banda corta adentro de una hoja partida en tres filas se lee como un error de render.

Verificado en navegador después de la tanda: cero caracteres tapados en los cuatro anchos del
mail, cero desborde horizontal en 1440 / 1024 / 390, **cero animaciones corriendo en reposo** a
los 16s, y la entrada terminando en escala 1 con opacidad 1. `lint`, `tsc`, `build` y el
detector, limpios.

## La tanda de los objetos propios (09/09/2026)

El dueño puso `preview/firma` como referencia de profundidad —«me gusta cómo se ve ahí, tiene
más presencia»— y marcó **cuatro secciones que no lo convencían, todas por lo mismo**: «se ven
como tarjetas grandes con tarjetas adentro». Tres pasos metido en una tarjeta gigante, el
mockup izquierdo de Control «muy chico y muestra poco del panel», El entregable, y Precios
para rehacer entera.

**El diagnóstico une las dos cosas.** El sistema tenía un solo recurso de profundidad —una
superficie que contiene— y lo usaba para dos trabajos: poner en escena un objeto de producto y
agrupar contenido de página. Cuando una superficie que contiene aloja un objeto que ya tiene
borde, radio y sombra, el anidado es inevitable. Firma nunca agrupa con una caja: agrupa con
filetes y aire, y gasta borde y sombra en el objeto. De ahí sale *La Regla de la Caja*, y el
dueño eligió la variante que **conserva la bandeja pero sólo para producto**.

**Del héroe de firma se trajeron las tres que no rompen nada medido** (eligió las tres): el
cromo y el papel como dos superficies, la pila de dos hojas atrás, y una sombra de piso
proporcional al objeto en un token propio. Los 8px del aire del papel se devuelven por los
costados —la ventana entra a 68 y sale −40— porque sin eso el banco de KPI bajaba de 532 a 524
y `$486.250` volvía a recortarse. **Medido después: el documento sigue midiendo 612px y los
tramos de la bandeja siguen en 627 / 753 / 768.** No se trajeron el fundido ni el arranque por
el encabezado: son dos decisiones suyas, del 07/09 y del 09/09.

**Las cuatro secciones.** Tres pasos pasó a tres bandas sobre el campo con la fila tuya a
sangre; Control izquierda perdió las tres cajas anidadas y es una hoja sola con las dos
opciones en fila, a escala de lectura; El entregable perdió la bandeja y al teléfono lo corta
el pie de la sección; Precios quedó sin ninguna superficie, con el contador como único objeto
con caja.

**Lo que se llevó puesto sacar una caja, y vale más que el aspecto:** en Modos desaparecieron
el alto fijo de 384/440 y su fundido —que ya se había comido una frase entera una vez—, los
dos umbrales de 640 y 1080 que sólo existían para acostar el riel, y el corte por sílaba de
«Enviar automáticamente». Y el panel recuperó su `tabIndex={0}`, que se había sacado porque el
anillo de foco salía cortado por un recorte que ya no existe.

**Verificado:** barrido de 320 a 1920 en siete anchos con cero desborde horizontal en todos;
ninguna pestaña recortando su etiqueta; el documento del héroe estable en 612; Control con la
columna izquierda en 626 contra 720 de la bandeja (antes era 749 contra 720, o sea que el
desbalance cambió de signo y sigue adentro de lo que el sistema llama canto bajo). `lint`,
`tsc`, `build` y el detector, limpios.

**Preguntas quedó afuera y hay que decir por qué.** El dueño la incluyó entre las secciones a
rehacer, pero medida no tiene el problema que describió: los `details` ya van separados por
filetes, sin superficie y sin caja. No se tocó, y queda preguntado qué le molesta ahí —el
largo, el orden, o que sean nueve—.

## El héroe a la escala de Linear (09/09/2026)

El dueño pidió medir el héroe de Linear y decir qué le faltaba al nuestro. Medido en vivo a
1440×900: fondo `rgb(8,9,10)`, **sombra `none`**, y la pieza ocupando **1440 de 1440 —el ancho
entero del viewport—**, arrancando a los 527px y cortada por el borde inferior de la pantalla.
Se separa del fondo por **valor**, no por elevación. El nuestro le daba a la ventana **622 de
1440, el 43%**, al lado de una columna de texto y apoyada en una bandeja.

**El diagnóstico: era un techo estructural, no un ajuste.** Mientras la bajada, el botón y la
pista vivieran en la misma fila que el objeto, la ventana no podía pasar de la mitad del
ancho. Ninguna sombra arregla eso.

**Lo que se hizo, y el dueño lo aprobó antes:** el argumento entero arriba —la bajada a la
izquierda y la acción con su pista a la derecha, sobre la misma línea— y la ventana debajo a
los 1360 del marco, cortada por el pie de la sección. **El documento va centrado adentro, en
sus 612px de siempre**, sobre una página en `campo`: cromo `#f4f2ee` → página `#f7f6f2` →
documento `#ffffff`, que son los tres escalones de valor que el objeto no tenía. Y es más
fiel, no menos: una página pública de verdad es un documento angosto centrado en una ventana
ancha; la ventana del ancho del documento era la parte menos verdadera del héroe.

**Dos cosas que el cambio arrastró y hubo que resolver midiendo:**

1. **El banco de KPI volvió a caer abajo del pliegue.** Con el texto apilado, el bloque medía
   505px y empujaba la ventana hasta y=658. La acción pasó al lado de la bajada y la ventana
   subió a **y=523** —Linear arranca en 527—, con el banco terminando en 805 contra un pliegue
   de 900.
2. **Los tramos de altura se rederivaron enteros.** Los viejos (627/753/768 y 428/458/490)
   eran de cuando el documento vivía en una bandeja de 650. Hoy el documento no reflúye en
   escritorio, así que **alcanza un solo alto, 608**, y los dos escalones desaparecieron con
   su causa en vez de ajustarse. En angosto quedaron cuatro tramos —640 / 450 / 465 / 480 /
   495— con los límites buscados **por bisección**, al píxel: 679/680, 547/548, 476/477 y
   373/374.

**Y una regla se volvió gratis:** con el documento centrado y topeado, el margen de página a
cada lado mide (ancho − 612)/2 —374px a 1440—, así que las dos piezas flotantes caen siempre
sobre página vacía. *La Regla de la Pieza que Flota* dejó de depender de una cuenta y pasó a
ser una consecuencia de la composición.

**Verificado en 25 anchos de 320 a 1920**, incluidos los ocho límites de tramo por sus dos
lados: el corte cae en un hueco entre bloques en todos, cero solape de la tarjeta sobre el
documento —medido en los dos ejes, que es lo que la primera pasada de la sonda no hacía—,
documento en 612 en todo el escritorio y cero desborde horizontal. `lint`, `tsc`, `build` y el
detector, limpios.

## Novena crítica (10/09/2026, 32/40) y su tanda

Dual-agent, las dos con Chromium propio. Bajó dos puntos desde 34 y **cuatro de los seis
hallazgos eran de la tanda del día anterior**: la regla nueva funcionó donde se aplicó —el
inventario de cajas dio bien en cuatro de cinco secciones— y lo que falló fue la verificación,
que midió lo que la tanda vino a arreglar y no lo que podía romper. Detector `[]`; overlay
bloqueado por la CSP, como ya es un hecho del repo.

1. **[P0] La tarjeta de aprobación se salía de la página entre 1024 y ~1310** —x = −152 a
   1024, botón «nviar» hasta 1205—, porque su anclaje al centro sólo entraba desde 1396.
   **Una tarjeta, dos lugares:** `Aprobacion.tsx` se monta flotando y en la columna de la
   acción, y el CSS muestra una por ancho. Con el mail en su propia línea mide 265 y flota
   desde 1230; por debajo va en flujo, y en 900–1229 al lado de la pista para no costar el
   pliegue. Cero tinta tapada en 13 anchos; cifras del banco arriba del pliegue en todo el
   escritorio.
2. **[P1] La última bandeja no la desbordaba nadie.** Fuera. El panel de Control se para sobre
   la noche y **el documento termina tras el plan** (`hasta="plan"`, la posición de lectura por
   el otro extremo): el panel cierra plano, con la sombra recortada al canto, y **no hay alto
   medido**. El corte en seco pedía treinta bandas —catorce en Borrador y dieciséis en
   Enviado, medidas por bisección— y se prefirió no escribirlas.
3. **[P1] Precios repetía el `space-between` que `.i-formas` acababa de perder**: 801px entre
   el contador y el total, 946 entre la frase y el botón. Hoy 96 y 40.
4. **[P2] El teléfono mostraba 149px de pantalla vacía.** Cinco siluetas en vez de tres, y en
   una columna el corte por fórmula —`260px − 1,86 × tel`— porque el blanco resultó lineal en
   el ancho del aparato; 25px en todo el rango, medido en ocho anchos.
5. **[P2] La ventana del héroe contrastaba 1,00:1 con el fondo** y la burbuja tenía el tope en
   895 contra 900. La página de adentro en `campo-luz`; la burbuja arriba de la tarjeta.
6. **[P3] Las opciones de Modos a 33px en teléfono.** 44 en el bloque táctil.

Menores: el contador acota al escribir y no al blur; la nota de Precios a 26rem (65/65/64/46
caracteres); `.i-entregable-escena`; el DOM de El entregable en orden cronológico —sale →
llega → abre—; y una excepción del detector en línea, con motivo, para la interpolación de
alto de la tarjeta (`interpolate-size` entre dos `auto`, que ya existía y pasaba por estar
escrita en dos líneas).

**Verificado:** 13 anchos de 320 a 1920, los dos estados de Control, cero desborde, cero
animaciones en reposo, `lint`, `tsc`, `build`, detector y chequeo de precios limpios.

**Decisiones que quedan registradas:** la bandeja desaparece del sistema como rasgo —quedan
sus tokens sin uso hasta la promoción—; `hasta` entra a la Regla de la Posición de Lectura con
la misma restricción que `desde`; y `DESIGN.md` suma dos *Don'ts* de método: verificar también
lo que una tanda puede romper, y cerrar un ancho declarado enumerando todas las filas de su
clase sobre el código.

## La pasada del dueño (10/09/2026)

Cuatro observaciones suyas, sin puntaje: «fijate vos cómo resolverlo». Se trabajó como brief
y no como crítica formal. Lo que había detrás de cada una:

1. **«El héroe no se siente integrado: tres anchos, un hueco enorme entre el párrafo y el
   botón, la pista lejísimos del elemento del que habla.»** Las tres eran una causa: la
   partición del argumento en dos columnas del día anterior. Vuelve a **una columna** —bajada
   y botón en 34rem, 40 / 24 / 32 de aire— y **la pista pasa adentro de la tarjeta** como su
   epígrafe, así que va donde va ella. Ventana en y=555, cifras del banco en 756 contra 900;
   a 1024×800, 716 contra 800.
2. **«El reporte y la ventana se ven como dos cosas pegadas. Probá un borde. Volvé a mirar
   firma y el difuminado.»** Dos cosas que nadie había nombrado: **la ventana no tenía sombra**
   —el recorte que la cortaba por abajo medía lo que ella y le recortaba la sombra por los
   cuatro lados— y el pie en seco a 1360 de ancho se leía como una captura. El recorte se
   agrandó 96px, **el difuminado vuelve** (110px de máscara al pie; revierte el corte en seco
   del 07/09, que valía para una ventana de 650 en bandeja), el borde del informe sube al 8% y
   la página de adentro baja a `hoja-hundida`. Las alturas son las de antes más 110.
3. **«En Cómo funciona los tres pasos no siguen la misma estructura.»** Tres rejas distintas
   y tres objetos en tres x. Una reja —30rem más lo que queda, objeto apoyado a la izquierda—
   y los tres objetos en x=636. **La grilla sutil de Attio, que el dueño propuso con dudas, va
   acá y en Precios** —una vertical continua entre las columnas— y no en el héroe ni en
   Control, donde sería decoración. Nueva *Named Rule*.
4. **«Los espaciados no siguen ningún criterio; párrafos que siguen bajando; bloques con
   fondo que terminan en seco.»** Tres pasos de aire y nada más (14 / 44 / 136), escritos como
   *La Regla del Aire*; la banda del CTA de 26 a 44 y despegada de los pies; las dos notas de
   Precios lado a lado en la reja en vez de en escalera; y **el panel de Control entero**, con
   la firma y el pie, en vez de cortado tras el plan —que dejaba 237px de noche vacía—. El
   `hasta="plan"` de la mañana se retiró el mismo día y queda registrado en `DESIGN.md`.

Además: «soltar la estructura donde haga falta sin perder el orden de lectura». Se soltó en
la fila 1 de Tres pasos —la ficha topeada en 22rem y el calendario al lado, no estirada a la
columna— y en las notas de Precios; no se soltó en nada que leyera en orden.

**Verificado:** 12 anchos de 320 a 1920, cero desborde, cero tinta tapada por las piezas
flotantes, los tres objetos de Tres pasos en la misma x en escritorio y en teléfono, las dos
verticales de Precios en el mismo x (464), cero animaciones en reposo; `lint`, `tsc`, `build`,
detector y chequeo de precios limpios.

**Dos observaciones más, en la misma pasada:**

5. **«Las dos tarjetas no se sienten integradas: apiladas a la izquierda, adentro del frame,
   parecen contenido del reporte. Cruzalas en diagonal, que salgan del borde, con elevación,
   y que aparezcan con el scroll.»** El primer intento las puso una a cada lado pero a la
   misma altura —atadas al pliegue— y el dueño vio el problema de fondo: **el marco a 1360 con
   un informe de 612 dejaba bandas vacías**, y las piezas se apoyaban en ellas. La ventana
   pasa a medir su contenido, **804**, centrada; la burbuja se sale 220 arriba a la izquierda y
   la tarjeta 129 abajo a la derecha (la burbuja mide 345, no ~330: a 194 y 206 tapaba la «R»
   de «Resultados»); sombra propia `--sombra-flota`; y **entran con el scroll**, que revierte lo
   del primer frame de la octava crítica por decisión suya, con el costo aceptado de que a
   1440×900 la tarjeta arranque 34px bajo el pliegue. Umbrales: tarjeta desde 1142, burbuja
   desde 1324.
6. **«"Lo que abre" corta al medio de "vs. 1 jun 2026", y los dos bloques tienen tratamientos
   distintos.»** Vuelve a 196 y se disuelve en 56px, con la sombra en un envoltorio de
   `drop-shadow` para que se disuelva con la ventana; y mail y ventana llevan los dos canto de
   un píxel y sombra de ventana.

Verificado: cero caracteres del informe tapados en 1440 / 1324 / 1142 / 1920; umbrales al
píxel en 1324/1323 y 1142/1141; cero desborde en seis anchos; CI y detector limpios.

## Décima crítica (10/09/2026, 31/40) y su tanda

Dos evaluaciones aisladas, cada una con su Chromium. Tendencia 29 → 32 → 34 → 32 → 31. El P0
de la novena quedó cerrado y verificado por las dos; lo que bajó el puntaje no fue acabado
—cero fallas de contraste, cero desborde, blancos ≥44, 42 paradas de foco con anillos de
5,79–7,2:1— sino **eje y jerarquía**, y un parpadeo que la tanda anterior introdujo. El dueño
eligió: la ventana al margen (opción recomendada), todo el alcance, y reacomodar la fila 2.

1. **[P1] Las piezas flotantes se pintaban un frame y se desvanecían** (B, medido 0,27 → 0 en
   700ms, antes de cualquier gesto). El atributo lo escribía el cliente al montar y la
   transición vivía en la pieza. Ahora `Flotantes.tsx` emite `data-flota="oculto"` en el HTML,
   la transición se declara sólo en `visto`, y `@media (scripting: none)` más movimiento
   reducido las muestran. Dos *Don'ts* ganaron su excepción y su corolario.
2. **[P1] El resplandor vivía sólo detrás de la barra** (A: `.i-fondo` 1200px, `main` opaco
   encima; medido a 1440, y=62 lavanda, y=66 campo). El lavado y el resplandor pasan a `main`,
   centrados a la altura de la ventana; `.i-fondo` queda como la franja detrás de la barra.
   *Don't* nuevo: un token que ningún píxel usa se encuentra midiendo el píxel.
3. **[P1] Tres ejes en el héroe** (40 / 318 / 414 a 1440). La ventana arranca en el margen y
   se sale hasta el borde de la pantalla (`right: min(56px, 776px − 50vw)`); h1, bajada,
   botón y ventana en la misma x en todos los anchos (40 / 280 / 32 / 20). **Consecuencia
   dicha al dueño:** las piezas no tienen costado por donde salirse y flotan sobre la página
   de la ventana, cada una en su banda, con la sombra de vuelo; umbrales 1174 y 1334.
4. **[P2] Paso 3 a 300×199** → toma la columna del objeto entera, dos datos lado a lado.
   **[P2] 469px vacíos en la fila 2** → lista al lado del texto, prompt debajo cruzando las dos
   columnas; la vertical pasa a ser un ítem de la reja en la primera fila. **[P2] El epígrafe a
   8px de la tabla** → con la tarjeta sobre la banda derecha quedan 145 de aire. **[P2] El
   pliegue de 768** → `max-height: 820px` cede aire: banco en 761 (era 832). **[P2] La máscara
   dejaba texto a medias** → 72px en escritorio (arranca en 600; la tabla termina en 598 y el
   plan en 618) y 40 apilado (a 390 lo único a medias es el rótulo «Métricas detalladas»).
5. **[P3]** host en teléfono `…nuvloapp.com`; contador `7.5` → 7 y `0` → 1; Escape y toque
   afuera cierran el menú; la primera pregunta llega abierta; «Reiniciar el ejemplo» en los
   dos lugares. **Menor:** el bullet de la chapa en `DESIGN.md` decía «punto iris» contra su
   propio bloque; corregido.

**Decisión, no defecto:** la tarjeta bajo el pliegue a 1440×900 hasta el scroll. **Verificado:**
0 caracteres tapados en 1174 / 1280 / 1366 / 1440 / 1920; primer frame en `opacity: 0` sin
transición hacia oculto; menú, contador y acordeón probados en Chromium; `lint`, `tsc`,
`build`, detector y chequeo de precios limpios.

## Adapt (10/09/2026)

La auditoría técnica dio 15/20 con un P1 de responsive: Control recortado por debajo de
386px. Causa sistémica —trece rejas apiladas con `1fr` pelado— cerrada en todas a la vez;
pestañas de Modos con corte de línea bajo 640; piso de la ficha del borrador topado al 100%.
Verificado en siete anchos, cero desbordes fuera del héroe. Quedan del audit, para otras
tandas: `harden` (enlace de salto, dos `aria-label` prohibidos, foco en la tabla a 320),
`animate` (pausa para secuencias de más de 5s) y `optimize` (`motion` en Modos, CSS y
fuente del mundo retirado).

## El héroe de escritorio, rehecho en seis vueltas (10/09/2026, tarde)

El dueño rechazó la premisa de «composición decidida» y pidió medirla como composición: el
documento de 612 era el 44 % de la ventana a 1440 y el 37 % a 1920, con bandas simétricas de
394 / 514, y ninguna pieza tocaba el marco. La plantilla del panel compone el informe a
860px; seis composiciones rendirizadas; eligió **documento a 860 en ventana de 1052**.
Después pidió una muestra con la escena contra el margen derecho y las piezas a la izquierda
debajo del CTA y la eligió; **reabre a propósito el eje titular–ventana** (40 contra 348). La
burbuja de WhatsApp pasó por seis posiciones —adentro sin tocar el marco; sobre el cromo
entre luces y barra («pegada a todo»); cruzando el borde derecho («apoyada en el vacío»: la
banda cruzada es casi del color de la página); cruzando el izquierdo con la tarjeta debajo
(«amontonadas»); entera sobre la hoja («mal ubicada»)— y quedó **cruzando la esquina
superior derecha sobre cromo vacío**, para lo cual la barra de direcciones del héroe bajó de
420 a 360. La pista vive adentro de la tarjeta como franja superior; la tarjeta, sola, en el
eje del titular mordiendo el canto. Escena subida 40px (64 / 32 / 24 / 24). Doble borde
probado en cinco variantes a 2×; quedó canto 14 % con bisel. Resplandor al 20 %. Umbral de
flotar: 1344. Por la mañana: rejas apiladas con `1fr` pelado corregidas (adapt). Verificado
en 1344 / 1366 / 1440 / 1680 / 1920 con cero glifos tapados, CI y detector limpios.

## El entregable, rebalanceado (10/09/2026, tarde)

El dueño: nueve filas de placeholders grises, el mail real perdido arriba, la pieza más alta y
contrastada dominando cuando tienen que pesar el mail y el informe; sección desbalanceada
(izquierda dos objetos, derecha uno enorme) y las notas de abajo sin seguir las columnas; «me
gustaba más cuando el teléfono se veía cortado». Se cortó el teléfono a la altura del mail
(340 visibles, fundido de 56), siluetas de 8 a 3, y las notas pasaron a la columna del aparato
debajo de él, al lado de «Lo que abre». Se retiró el tope `100% − 480` del mail y la ventana
(daba 120px con la columna nueva) y lo reemplaza la reja. Verificado en 1024 / 1100 / 1200 /
1440 / 1920 / 768 / 390: cero glifos del mail bajo el aparato, mail real entero dentro del
corte, sección de 1539 a 1373px. CI y detector limpios.

## Preguntas (10/09/2026, tarde)

El dueño: «las dos columnas no comparten filas, las líneas caen a distinta altura, no hay
ritmo». Medido: las filas ya eran compartidas; lo que partía el ritmo eran los filetes por
celda, cortados por el hueco de 96. Cada celda extiende su borde 48 hacia el medio y cada fila
es una línea de margen a margen, sólo desde 768. Verificado en 768 / 1440 / 1920 / 390.
Pendiente de decisión: el desnivel de contenido dentro de cada fila (emparejar por largo o
recortar).

## Precios: la composición de 21st.dev, en tres vueltas (10/09/2026, tarde y noche)

La banda del CTA venía mal en dos vueltas —«apelotonados a la izquierda, dos tercios de
color vacío»; con `space-between`, «desconectados»; y el tinte `iris-luz` «si no se ve, no
está haciendo nada: o color de verdad o no va»—. En ese punto el dueño pasó el
«pricing-section-1» de 21st.dev y pidió **la composición entera revestida**, con el cierre
«el botón con la cifra en la fila del total», sin banda.

**Vuelta 1.** `Conmutador.tsx` (radios nativos, perilla de `motion`), `Contador` sin estado,
`Precios.tsx` con plan y clientes levantados y NumberFlow (`@number-flow/react`, instalado; el
total lleva texto accesible propio porque la librería no expone nombre en cliente). **Marca
Blanca entra en la cuenta**, revirtiendo el 08/09. Descartados con motivo: copete con ícono,
fondo y botón azules, precio tachado, `lucide` y `framer-motion`. Tropiezos medidos:
`i-control` chocaba con la clase de la sección Control (129px de relleno heredado) y un tope
viejo de `100% − 480` dejaba el mail en 120px.

**Vuelta 2.** «Quedó tirado a la izquierda» (la reja de 26/24rem dejaba 464px vacíos) → dos
mitades iguales con la vertical al 50 % y el botón en el margen, en el eje del CTA de la barra.
«Los cuadraditos violetas no dicen nada» → el tilde doble en disco iris del componente, SVG
propio.

**Vuelta 3.** Pies como recortes de hoja bajo un título («no queda claro que son dos ejemplos
del pie»); contador a 220 («enorme, el número perdido en el medio»); rejas cerradas por abajo
en Tres pasos y Precios, con verticales de horizontal a horizontal y un filete nuevo arriba del
prompt («parecen líneas incompletas»); grano de película en la noche (7 %) y el héroe (4,5 %)
(«donde lo veas bien, textura sutil»); y la entrada del original traducida a CSS
(`CorteVertical.tsx` y la variante `i-entra-arriba` de `Entra`), servida visible y apagada con
movimiento reducido («ponele la misma animación de entrada»). Tropiezos medidos: el espacio
entre palabras se colapsaba dentro de la caja recortada; el selector de la fila del prompt
apuntaba a la fila 1. Verificado en 1440 / 1024 / 768 / 390, CI y detector limpios.

## El acento, fuera de la familia del violeta (10/09/2026, noche)

**El pedido, textual:** «El acento violeta no me convence, lo siento genérico. Quiero ver
alternativas fuera de esa familia, no variaciones del iris.» Es `colorize` sobre
`/` (la home).

**Lo que se le mostró.** Cuatro acentos construidos sobre la página real —no sobre una tira
de muestras—, con la familia entera de tokens que dependen del acento repintada en cada uno
(el acento y sus tintes, la noche, las tintas —que están tinteadas desde el acento— y el
tinte de las tres sombras), y con el contraste de ocho pares críticos medido antes de
renderizar. Las L de OKLCH se copiaron de la paleta vigente, así el contraste no se movía al
cambiar de hue y la comparación era de color y no de legibilidad.

| | Acento | Noche | Campo | El argumento |
|---|---|---|---|---|
| A · Petróleo | `#027277` | `#011f25` | hueso | El más sobrio; riesgo: es el hue alternativo por defecto del rubro |
| B · Grana | `#a03470` | `#2f0319` | hueso rosado | El hue más lejano de todo lo ocupado; riesgo: vecino del rojo del dato |
| C · Bronce | `#855a1b` | `#261801` | crema | El más editorial; riesgo: comparte familia con el naranja de Borrador |
| D · Tinta y arena | `#207172` sólo en señales | `#251500` | **arcilla** | No cambia de hue: cambia de estrategia |

Se armaron como un andamio (`acentos.css` más `?acento=` en la ruta) para que las viera en
vivo y no sólo en captura.

> **El andamio se retiró con la decisión y hubo que reponerlo el mismo día.** El dueño
> volvió a pedir las URLs y ya no existían. La lección para la próxima comparación:
> **un andamio de comparación se retira cuando el dueño dice que terminó de mirar, no
> cuando elige.** Elegir y querer volver a ver son dos momentos distintos. Hoy repone los
> tres descartados y el iris original, y **cada uno devuelve el botón al acento**, que era su
> estructura: sin eso los cuatro saldrían con el botón del vigente y la comparación no diría
> nada. Mientras estuvo, la ruta se sirvió dinámica (`ƒ`) en vez de estática, que era el costo
> asumido de leer la query. **Se borró entero al cerrar el acento esa misma noche**, y la ruta
> volvió a ser estática.

**Eligió D**, que es la que se le había recomendado en segundo lugar. La recomendación había
sido B por tener el hue más lejano de todo lo tomado; el dueño fue más lejos que eso y se
llevó el cambio de estrategia.

**El diagnóstico que la sostiene, y es lo que hay que recordar.** Lo genérico nunca fue el
violeta: es la estructura «página blanca + botón de color», que es la misma en todo el
software del rubro y que ningún hue arregla. El violeta rechazado era el **sexto** color que
esta rama probaba en ese mismo rol —cobalto, azul de tinta, ámbar, ámbar quemado, naranja,
iris—. **Cuando seis valores fallan en el mismo lugar por el mismo motivo, el problema es el
rol y no el valor.** Así que el color se mudó a la superficie más grande de la página: el
campo pasó de hueso `#f7f6f2` a arcilla `#efeade`, y la acción volvió a la tinta.

**El riesgo, declarado antes de construir:** el dueño ya rechazó una página entera por
leerse gris (neto, 07/09/2026). La defensa no es de gusto sino medible: la de neto era una
piedra **neutra** con cero cromático; ésta lleva croma real en el campo, el petróleo pinta
cinco roles, y el botón subió de 6,5:1 a 18,2:1. **Un campo se juzga por su croma, no por su
valor.**

**Lo que cambió en el código, además de los valores:**

- **Los tokens se renombraron de `--iris*` a `--acento*`.** Un token que se llama como un
  violeta y pinta un petróleo miente sobre el sistema. La carpeta y la clase raíz siguen
  siendo `iris`: nombran la dirección, no el color.
- **`--tinta-alta`, un token nuevo:** el hover del botón. Un botón casi negro no puede
  oscurecerse, así que se aclara, y el escalón es corto (15,1:1 contra 18,2 en reposo).
- **Dos brillos y no uno.** Teñir el fondo del héroe con el acento sobre la arcilla dejaba
  una mancha verdosa a la izquierda del titular —el complemento del campo, leído como
  suciedad y no como luz—. `resplandor` se queda donde el objeto que ilumina es del acento
  (la sombra del marcador de la lista) y nace `luz-heroe`, un haz cálido de la familia del
  campo. **Un halo pertenece a la familia de la superficie que ilumina, no a la del objeto
  que lo emite.**
- **La tinta terciaria bajó** hasta pasar 4,5:1 contra la hoja hundida, que con la arcilla es
  una superficie más oscura que antes: heredada del violeta fallaba ahí por 0,22.
- **El aclarado del acento sobre la noche bajó** de un cian de 7,5:1 a 6,4:1: contra un
  marrón oscuro el valor alto se leía eléctrico y el sistema no tiene ningún otro brillo.
- `--sombra-ventana`, `--sombra-ventana-heroe` y `--sombra-flota` pasaron su tinte de
  `rgb(44 32 110)` a `rgb(3 53 54)`, y la del hover del botón siguió al botón hasta la tinta:
  **una sombra se tiñe desde el objeto que la proyecta.**

**Verificado:** lint, `tsc --noEmit` y `next build` en verde; las siete secciones capturadas
a 1440×980 y a 390×844, más el hover del CTA; ocho pares de contraste medidos por cálculo,
todos ≥ 4,5:1.

**Lo que NO se tocó, a propósito:** el verde y el rojo del dato, el verde del paso hecho, el
naranja de lo pendiente y el verde de WhatsApp. Los cuatro son citas o significados del
negocio y no pertenecen a la paleta del acento.

## El acento, cerrado en once vueltas (10/09/2026, noche)

La entrada de arriba cuenta la primera mitad: el iris rechazado por genérico y el color mudado
al campo. **El dueño miró esa versión un día y siguió.** Lo que sigue es cómo se cerró.

**La secuencia, porque el método es el resultado.** Pidió alternativas fuera del violeta → se
le construyeron cuatro (petróleo, grana, bronce, tinta-y-arena) → eligió tinta-y-arena → dijo
que el grana le gustaba pero era «cosmético, tira a fucsia sobre blanco» → se corrió el hue
hacia el rojo y bajó de luminosidad hasta el **vino** → se le construyeron cuatro más, cada una
con el oscuro en un lugar distinto (zócalo del héroe, el vino como único oscuro, la acción, el
cromo de los objetos) → quedó entre tres → pidió una quinta que combinara dos → y otra que
combinara otras dos → y terminó eligiendo **el cromo oscuro**.

**Once combinaciones, todas construidas sobre la página real y con el contraste medido antes de
renderizar.** Ninguna fue una tira de muestras. Eso es lo que permitió que el dueño decidiera
mirando la página y no imaginándola, y es el método que conviene repetir.

### Lo que quedó

**El acento es el vino `#8b2b3f`** (hue 12, L 0,44, croma 0,13), en la acción y en las
señales. **El oscuro es el grafito `#1c2126`**, y vive en el cromo del navegador y en los dos
tramos de noche. **El campo es casi blanco y cálido `#fffcf8`** —marfil de L 0,991 y croma
0,006—, con la referencia de Attio medida y no supuesta: lo que se copió de Attio es el
**mecanismo** (separar por filete de 1px, no por valor), no su temperatura. El frío `#f6f8fa`
que esta línea afirmó hasta el 11/09/2026 duró unas horas el 10/09 y salió de leer mal un
pedido; la corrección está tres secciones más abajo y `base.css` la narra entera.

El rasgo de la dirección es **dónde vive el oscuro**: adentro del objeto que la página vende, no
en la página. El navegador que muestra el informe se sirve en modo oscuro, y con eso el
documento blanco deja de ser una zona más y se lee como documento.

### Los cuatro defectos que aparecieron construyendo, y sus reglas

1. **El botón de la barra sobre la noche perdía su inversión a blanco por especificidad.** Las
   reglas del andamio medían (0,4,0) contra los (0,2,0) de la regla contextual que ya existía,
   así que en un tema quedaba grafito sobre grafito. **Una regla contextual que existía antes
   puede perder por especificidad sin que nadie la toque**, y se nota en el estado que la
   captura estándar no mira.
2. **El zócalo del héroe arrancaba corrido 138px del borde izquierdo**, porque la escena va
   contra el margen derecho y su centro no es el del viewport. Se estira a los dos lados en vez
   de centrarse.
3. **«Aprobar y Enviar» desaparecía adentro del cromo oscuro:** 1,94:1 con el botón en el
   acento, 1,00:1 cuando botón y barra eran el mismo material.
4. **Y la barra de acción del panel volvió a ser clara** por pedido del dueño, que vio lo que
   el punto 3 sólo insinuaba: «corta el objeto en dos, y el botón queda blanco ahí adentro
   cuando en el resto de la página es vino». **La línea que quedó: el oscuro va en el cromo del
   NAVEGADOR, que es una cita del sistema operativo y existe de verdad en modo oscuro. No en
   cualquier superficie de producto.**

### El riesgo que queda declarado

El campo tiene croma 0,006 —subió dos veces más el 10/09, después de que se escribió esta
línea—: **todavía menos que la piedra de neto (0,007), que el dueño rechazó porque la página se
leía gris**, pero por mucho menos margen del que este párrafo declaraba. Lo que acá no deja que eso pase es que hay dos cosas con peso —el
botón vino y el cromo oscuro—. Si un día el botón pierde el color, el campo tiene que ganar
croma en la misma tanda.

**Verificado:** lint, `tsc --noEmit` y `next build` en verde; las siete secciones capturadas a
1440×980 y a 390×844; once pares de contraste medidos por cálculo. **El andamio se borró**:
`acentos.css`, el parámetro de la ruta y el atributo de la clase raíz.

## Tres correcciones del dueño sobre lo elegido (10/09/2026, cierre)

**1. El campo se separa por FILETE, no por valor.** Interpreté mal un pedido: cuando dijo
«más frío» quería que **la hoja del informe se viera más blanca**, no que la página cambiara
de temperatura. La corrección que eligió es de mecanismo: hoja en blanco puro, campo casi
blanco (croma 0,0035, apenas cálido) y **separación por filete de 1px como en Attio**. El
escalón campo→hoja quedó en 1,035:1, o sea invisible, y eso es a propósito: con la separación
por valor, el campo tenía que quedarse lo bastante oscuro como para que la hoja se despegara,
y eso le ponía un techo al blanco del documento.

Arrastró un ajuste que no estaba en el pedido: **el canto de los objetos subió de 8 % a 13 %**.
Al 8 % medía 1,17:1 contra el campo nuevo y el mail se leía flotando sin borde, sostenido sólo
por su sombra. **Cuando la separación pasa de valor a borde, todos los bordes tienen que poder
verse.**

**2. El revelado sólo se notaba en Precios**, y era cierto: Precios monta nueve envoltorios
escalonados de 300 a 1800 ms y las otras cinco secciones montaban dos —el titular y el objeto
entero—. Más una segunda causa: un envoltorio del alto de una sección intersecta apenas asoma
su borde superior, así que la animación terminaba antes de que el visitante llegara.

Se resolvió sin tocar la estructura: `.i-entra-cascada` hace que animen los **hijos directos**
del envoltorio, escalonados de 0 a 560 ms, y el observador espera un 18 % del viewport en vez
de un 8 %. Está en Tres pasos, Control, El entregable y Preguntas. **No en el Cierre**, cuyo
envoltorio tiene un solo hijo: ahí la cascada le sacaba su propia entrada sin dar nada a
cambio, y se revirtió el mismo día. **Una cascada pide al menos dos hijos.**

**3. Las dos piezas del héroe entran con el primer scroll.** Disparaban con el 60 % de la
escena en pantalla y en un monitor alto eso pasa al cargar: la entrada existía y nadie la veía.
Hoy el observador exige además `window.scrollY > 0` y la intención de scroll dispara igual;
quien llega con la página ya scrolleada las sigue viendo sin moverse. Verificado en el
navegador: sin scroll `opacity: 0`, con 120px de rueda `opacity: 1`.

## La landing se pone al día con el panel, y gana color (13/09/2026)

**El pedido.** El panel sumó pantallas el 11 y el 12/09/2026 —tablero, ficha de cliente
rediseñada, diálogo de generar con calendario, campañas y «Cuándo sale»— y la landing quedó
citando cosas que ya no existían. El dueño pidió primero el diagnóstico sin editar, aprobó
tres tandas y, con la obra en curso, sumó otro pedido: «Tenés libertad para redistribuir…
Cortá los bloques de texto largos, dejá más aire… Meté más color, hoy queda muy blanco. Y la
parte oscura probá otro color de fondo, más lindo que el actual.»

**Lo que era falso y se corrigió.**
- Los cuatro pasos de generación citaban la constante vieja; hoy son `ETIQUETA_PASO` del
  panel, y las pistas se reescribieron para no repetirlos.
- Los atajos del calendario eran tres de seis.
- «Al generar solo se elige el período» (en `PRODUCT.md` y usado como argumento).
- Cuatro frases decían que nada sale sin apretar el botón; el envío programado de un reporte
  —nuevo, sale sin revisión— y el automático lo desmienten. Hoy dicen «por defecto», y la
  tarjeta social dice «Nada sale sin que vos lo decidas».
- `DESIGN.md` seguía describiendo el vino y a Inter en su cabecera de tokens.

**Lo que se construyó.**
- **Fila 1 de Tres pasos = el diálogo «Generar reporte»** (opción A de la propuesta), con la
  ficha bajo el texto y los rótulos reales del panel.
- **Tablero**, sección nueva después de Control (el dueño: «que entre»).
- **Criterio**, la prueba de la IA en sección propia: vivía en la fila 2 y la sección medía
  2.164px.
- **Noche en petróleo nocturno**, elegido entre tres renderizados sobre Control (petróleo,
  azul tinta, ciruela). El grafito queda en el cromo.
- **La bandeja vuelve** en petróleo pálido —héroe como tramo del lavado, Criterio y Tablero—
  con las condiciones de *La Regla de la Bandeja, vuelta*. La de Criterio se construyó con
  aire en los cuatro lados y se corrigió al releer la regla retirada: era caja con caja.
- Textos cortos (Preguntas en dos o tres frases, bajada de Control, notas de Precios y El
  entregable) y `--aire-seccion` más grande.

**Método.** Los literales se verificaron contra el código del panel antes de citarlos. El día
de la escena quedó fijo (`HOY_MUESTRA`, 3 de agosto de 2026) porque dos pantallas dependen
de «hoy». Capturas a 1440, 1024 y 390; lint, tipos y build en verde.

## La pasada de elevación (13/09/2026, noche)

**El pedido.** «Elevá la landing actual, de la navbar al pie. No la rediseñes: subile el
nivel. Sofisticación, personalidad, jerarquía visual; que se sienta caro y medido.» Cinco
frentes: la barra primero, profundidad y textura en lo oscuro, una sección original del
reporte mostrando sus partes, botones y tipografía en todo el recorrido, y ritmo vertical
parejo. Trabajo autónomo, con `critique` hasta que pase.

**Método.** Captura de toda la página a 1440 y 390 y medición del ritmo por sección antes de
tocar nada; después dos rondas de `critique` dual-agent (A diseño, B detector + axe) con su
tanda cada una, y un barrido final de axe, desborde y detector a 1440, 1280 y 390 en la home y
en una legal. Lint, tipos y build en verde.

**Lo que se hizo.**
- **Barra.** La franja legal es una pieza propia de filete a filete y se va con el scroll
  (`top` negativo): la fila pegada vuelve a medir los 64 que asume todo lo que se pega debajo
  —medía 87 y la escena de La lectura quedaba 23px metida—. Una pastilla de hover y una raya de
  sección que viajan en vez de prenderse por enlace; «Entrar al panel» sin borde; toda la fila a
  15px y 36 de alto; anillo claro cuando la barra está sobre la noche; la franja baja si el foco
  entra en ella; enlace «Saltar al contenido».
- **Sistema.** Portada 72, display 48, preguntas en Título. Botón de 52 con texto de 16 (era 56
  con 15), compacto de 36; filo de luz y sombra corta en reposo, hover sólo color, press a 0,97.
- **Noche.** Casi negra en capas (canto de luz, dos haces sin tono, caída a `noche-honda`), grano
  en `screen` al 14 % —en `soft-light` al 7 % no existía—. Criterio vuelve a la noche: el
  capítulo oscuro Lectura → Criterio → Control → Tablero es continuo (*La Regla del Capítulo
  Oscuro* reemplaza a la del Paréntesis).
- **La lectura, quinta vuelta.** La lámina que se levanta: la hoja entera bajo un velo liviano y
  la parte activa por encima, blanca, a escala 1,02 y con sombra; a la izquierda titular, bajada
  y una guía de seis frases que son botones con riel encendido. Sin máscara ni desenfoque.
- **Ritmo.** Un solo aire de sección (`clamp(64px, 6.4vw, 96px)`) y de bloque, sin costuras por
  capítulo.
- **De paso**, defectos previos: el wordmark gigante del pie agregaba 35px de campo claro en
  teléfono (el telón estático dejaba de contenerlo); dos `aria-label` en elementos sin rol; el
  anillo del recorrido recortado por el panel; un renglón de 101 caracteres en el diálogo de
  generar; el nombre del documento del panel cortado en teléfono; la tarjeta social con la crema
  rosada del vino.

**Las dos críticas.** Ronda 1: 19/28. P1: la máscara ensuciaba la hoja de La lectura y Criterio
en claro armaba una cebra; P2: el lado de la lectura temblaba, el anillo sobre la barra oscura
medía 2,6:1, tamaños sueltos. Ronda 2: 19/28 con otro perfil —los P1 anteriores cerrados—: el
velo al 46 % dejaba el papel gris, las hojas fantasma de Control se leían como mancha, el cromo
del Tablero se apagaba. Se corrigieron. **Se rechazaron con motivo:** teñir la noche de petróleo
(el dueño la sacó del petróleo esta tarde por «farmacia»); pasar Criterio a claro (contradice la
ronda 1); el conmutador negro de Precios, la burbuja verde y el telón (piezas aprobadas).

## Tablero, El entregable, movimiento y el literal del botón (13/09/2026, cierre)

Pedido del dueño después de mirar la pasada de elevación: el Tablero con el texto «pegado al
borde izquierdo» y sin eje con la ventana; las skills de Emil Kowalski y de Apple design sobre
toda la página, con entradas «en el momento justo y no apuradas» y Precios más rápido; el botón
con el literal del panel; el desbalance de la columna derecha de El entregable; commit y push.

- **Tablero:** medido, texto y ventana arrancaban en el mismo x; lo que fallaba era la
  relación. Sigue el criterio de las demás secciones: titular, aire de bloque, fila de rótulos
  con filete a todo el marco y ventana entera sobre un haz de luz. Sin pisada ni fundido.
- **El entregable:** columnas de 720 más el resto, y «Lo que abre» con `contain: size`, así el
  alto lo pone la columna de las formas. A 1440 los dos pies coinciden al píxel; a 1280, 1100 y
  1024 también, con un piso de 270px para la ventana.
- **Movimiento:** curva de entrada propia, revelado más largo y más tarde, la cascada que por
  fin suma la demora de su envoltorio, Precios comprimido de ~2,3s a ~0,7s y fundido de opacidad
  con movimiento reducido. Medido en el navegador con salto instantáneo (el `scroll-behavior:
  smooth` global retrasa cualquier sonda que use `scrollTo` sin `behavior: "instant"`).
- **«Aprobar y enviar»:** alineado al panel en toda la landing viva; `/preview` conserva la caja
  vieja a propósito.
- **No se commitea** `public/marca.html` ni `public/marca/`: es el banco de comparación del
  wordmark del 10/09, sin decisión, y en `public/` quedaría publicado.

## El CTA pasa a Glow (13/09/2026, noche)

El dueño pidió «un botón más atractivo para los CTA» y preguntó si se podía buscar en
21st.dev. Se buscó en el catálogo y en sus marcados (no tenía botones guardados); se
descartaron los que traían color fuera del sistema y el Liquid Glass, cuyo mapa de
desplazamiento como `data:` URI la CSP de producción bloquea; y se le advirtió que Interactive
Hover y Motion Button son de la familia del Arrow Fill que descartó el 07/09.

Eligió comparar **Glow** y **Pearl**. Se tomó la anatomía de sus videos (cuadros con
`currentTime`) y los valores exactos del CSS de sus bundles públicos, y se construyeron
revestidos en petróleo detrás de un andamio con `?boton=`. La comparación fue en dos láminas
—héroe en reposo, hover y apretado; barra sobre claro y sobre la noche; cierre— y eligió
**Glow**. El andamio se borró entero en la misma tanda y Glow se escribió en `base.css` con su
porqué.

Lo que apareció al promoverlo: la barra sobre la noche invierte su CTA con el atajo
`background:`, que borraba el degradé —en el andamio no se veía porque el selector pesaba
más—, así que la variante clara declara su imagen. Verificado por estilo computado.

## La hoja real entra al héroe (16/09/2026)

El panel había corregido el reporte que el cliente lee como página propia —hoja de 660,
cuerpo de 16, relleno de 52, prosa a todo el ancho, «Anterior» como segunda línea en angosto—
y la landing seguía con las medidas viejas. Aplicado el 12/09, achicaba la composición del
héroe y el dueño lo revirtió; esta vez se le mostraron primero tres formas de convivir sobre el
héroe a 1440, más la composición de ese momento: **A**, la ventana se ajusta a la hoja (852,
por la Regla de la Ventana que Mide lo que el Documento Pide); **B**, la hoja real agrandada al
130% en la ventana de 1052; **C**, la hoja real centrada en la ventana de 1052. **Eligió A.**

Lo que se hizo: `Reporte.tsx` y `documento.css` toman el marcado y las medidas de `DOC_CSS`
del panel, y la escena del héroe pasa a 852. Todo lo derivado de 1052 se rehízo midiendo en el
navegador: el alto (812 en escritorio, 838 hasta 1023 y cinco tramos de teléfono barridos
píxel a píxel), los cortes donde flotan la burbuja y la tarjeta (1344 → 1144), el tope de la
tarjeta contra la pantalla y la barra de direcciones (después, en modo live, volvió al centro:
ver abajo).

Lo que apareció construyendo: con la hoja tan angosta como la deja la ventana del héroe en un
teléfono (306px a 383 de pantalla), `$486.250` se partía en `$486.25` y un «0». Se agregó un
escalón de hoja angosta —menos relleno por debajo de 340, cifra en 17 por debajo de 280— y el
barrido de 986 anchos quedó en cero cortes fuera del hueco, cero cifras partidas, cero piezas
fuera de la pantalla y cero scroll horizontal. «El entregable» y «La lectura» toman la misma
hoja sin cambios de composición: en «Lo que abre» a 1440 el corte cae ahora en la primera línea
del resumen, porque el cuerpo es más grande.

**Y la hoja se ensanchó a 760 el mismo día.** El dueño vio el resultado y lo rechazó: se había
hecho sin la skill de diseño y la hoja de 660 le quedaba angosta. Se corrió la crítica del
héroe (24/32) y de ahí salieron tres cosas, que el dueño aprobó juntas:

- **Hoja 760, prosa topada.** El panel y la landing pasan a 760 de hoja, con el resumen y el
  plan en 556 (75 caracteres por línea) y la alerta en 594; banco y tabla a todo el ancho. La
  escena del héroe va a 952. Los altos por tramo no cambian: se volvieron a barrer los 986 anchos
  y siguen en cero cortes fuera del hueco, cero cifras partidas, cero piezas afuera y cero
  scroll horizontal. La lectura conserva su prosa a todo el ancho, que fue pedido del dueño.
- **P1, el pliegue de 1366×768.** La primera cifra de plata quedaba partida por el pliegue. El
  `@media (max-height: 820px)` cede 55px más de aire y la tarjeta sube de 130 a 100: al entrar,
  con la franja legal a la vista, cifras 25px arriba del pliegue y tarjeta 33 (en reposo).
- **P1, la pila más ancha que la hoja.** Las dos hojas de atrás estaban escritas en 832 y 798
  —«28 y 62 menos» que la hoja de 860— y con la hoja en 660 asomaban como franjas. Ahora salen
  de la hoja (`min(760px, 100%)` menos 28 y menos 62) y van centradas en todos los anchos.

**La ubicación de las piezas flotantes, revisada en reposo.** Las mediciones anteriores de la
burbuja y la tarjeta se habían tomado con las piezas en su pose de entrada —corridas 24px, 12
abajo, al 98 %—, porque la entrada espera el primer gesto. En reposo aparecieron tres cosas, y
el dueño decidió las tres:

- **La barra centrada a 340 quedaba debajo de la burbuja** (16px). Se había centrado midiendo la
  pose de entrada; vuelve a la izquierda, a 360, a 192px de la burbuja.
- **La tarjeta ya no estaba en el eje del titular**: con la escena en 952 y el tope de −308
  arrancaba hasta 100px a la derecha del botón. Ganó el eje: `left: calc(952px − 100cqw)`, y
  deja de morder la ventana.
- **Con barra de scroll clásica todo corría 15px**: la tarjeta a 25 de la pantalla y, a 1244,
  tapando 6px el banco de KPI. La posición y el corte de flotar se miden ahora sobre el ancho de
  la fila (`.i-heroe-fila` es contenedor): flotan con 1172 de fila, 1252 de pantalla en Mac y
  1267 en Windows. Barrido de 1211 anchos en reposo, de 1920 a 320: tarjeta en el eje en todos,
  a 17 de la tinta como mínimo, burbuja a 24 de la pantalla, siempre una sola instancia de la
  tarjeta, y ningún corte, cifra partida ni scroll horizontal. El estado aprobado mide lo mismo
  de ancho (352).

De paso: `.i-abre .i-doc` sumaba 40 de relleno abajo encima del de `.i-doc-in` desde que el
relleno se mudó al interior; pasa a `.i-abre .i-doc-in`, como estaba pensado.

## Modo live sobre la barra y el héroe (16/09/2026)

El dueño recorrió la página con `impeccable live` y eligió, variante por variante:

- **La barra de navegación** («muy básica»): las anclas en una pista hundida con un divisor
  después de la marca; la hoja blanca que viaja es el hover y la sección activa, y la raya de
  «acá estás» se retiró. Después, «más audaz»: las dos acciones en una pista gemela.
- **La marca** («no me convence la tipografía»): «nuvlo» en minúscula, Geist 800 a −0.06em. Las
  otras dos eran una firma a 600 y versales espaciadas. A 320–332 pisaba «Ingresar»: por debajo
  de 340 baja a 18.
- **La franja legal** («proponeme otro diseño»): fichas con ícono, a la derecha. En teléfono van
  en dos renglones y `--alto-franja` pasa a 69 hasta 439, barrido de 480 a 320 sin que asome al
  pegarse.
- **Las piezas flotantes** («no parecen integradas», después «muy grande»): la tarjeta vuelve a
  morder la ventana a 352 —sale 308, entra 44— y deja el eje del titular donde no caben los dos.
  La barra de direcciones va centrada (360) y la burbuja se aparta: a −58 desde 1540 de pantalla,
  y más angosto sube a −34, apoyada en el canto. Medido en reposo de 1240 a 1920.
- **El layout de la fila** (`layout`, cuatro variantes): lado a lado desde 1440 —bajada y botón
  a la izquierda, ventana a la altura de la bajada— con la tarjeta a 324 de la escena. A
  1440×900 las cifras del banco quedan 417px arriba del pliegue (eran 63), a 1440×768 379, a
  1920×1080 597. Por debajo de 1440, apilado como antes.

Las mediciones de piezas flotantes de las secciones anteriores que dicen «la tarjeta en el eje»
o «la barra a la izquierda» quedaron viejas: manda esta.

## Segunda ronda de modo live (16/09/2026)

El dueño siguió en live sobre casi toda la página. Lo que eligió, con su detalle en DESIGN.md (bloques «Al día» de cada componente):

- **Héroe:** un haz petróleo detrás de la ventana y la tarjeta. Un piso grafito y una bandeja petróleo se leyeron como marco; la noche entera se descartó porque en esta página es el capítulo de adentro del panel.
- **Barra:** pegada vuelve a ser translúcida (86 %, 32px de desenfoque), sin filete y con una sombra larga; la marca y el divisor van en petróleo.
- **Tres pasos:** la línea petróleo arriba de tu paso y su número en círculo; las filas 1 y 2 se aprietan y la tuya se abre.
- **La lectura:** la nota al margen —una línea del título activo a una llave afuera del papel— y el contador «03/06».
- **Criterio:** la entrada baja al 82 % y la salida crece un 12 %.
- **Control:** aprobar es firmar, sobre la hoja; las hojas de atrás asoman más; titular y bajada arriba con el panel y los modos lado a lado; las pestañas en pista a lo ancho.

Lo que no se pudo previsualizar en live y se hizo directo en el código: todo lo que depende del scroll (la barra pegada, La lectura). Descartado: cuatro formas del panel de Control por genéricas y cuatro overdrive del tablero.

Sin verificar en pantalla: el comportamiento con movimiento reducido de la firma, las notas y el contador, y el contraste de Criterio, que es una cuenta.

## Tercera ronda de modo live (17/09/2026)

El dueño trabajó en live sobre casi toda la página. **Cuatro decisiones son de sistema** y su
detalle está en `DESIGN.md`; acá queda lo que se eligió, contra qué, y lo que quedó abierto.

### El bloque: la página deja de ser un rollo — **RETIRADO esa misma tarde**

> **Lo de abajo es historia.** El bloque duró una jornada: lo reemplazó la grilla de dos
> verticales (ver «Cuarta ronda», al final). Lo que sobrevive de esta vuelta es el criterio
> —el carácter lo pone la geometría— y la regla de lo nuestro y lo citado.

Leyó la página **«sin carácter»**: compone bien, pero al lado de sus referencias —Attio y Ramp
por lo claro y nítido, Superhuman por el color detrás del producto— era neutra. Se le mostraron
**tres tratamientos a nivel de página** y eligió que **el carácter lo ponga la geometría, no una
paleta nueva**: cada sección clara que muestra producto —Tres pasos, El entregable, Precios— se
apoya en un bloque con canto de un píxel, radio 28 y márgenes laterales propios (`.i-bloque`).

**El bloque cambió dos veces de superficie en la misma sesión.** Arrancó en `acento-luz` y lo
leyó **«muy clínico»** —celeste a escala de superficie sobre un campo cálido: consultorio—; se
probó un beige; quedó en **papel**: `--bloque: var(--hoja)`, token nuevo en `base.css`. Lo que
lo sostiene es una regla que el sistema ya tenía: **el papel se separa del campo por filete y no
por valor**, ahora a escala de sección.

Descartados con motivo: teñir el campo entero de petróleo (el papel del reporte quedaba teñido
alrededor, y el documento es justo lo que tiene que leerse como documento) y entibiar el campo
con un segundo cálido (caía cerca del naranja de «espera»).

**Y el bloque obligó a decidir qué pasa con los objetos blancos de adentro**, que quedaban
apoyados sobre su mismo valor. La respuesta separó dos clases de objeto y quedó como regla: los
que son **composición nuestra** —el diálogo de generar, la ficha del período— bajan a
`hoja-hundida`; los tres que **citan algo real** —el informe, el mail de Gmail, la pantalla del
teléfono— no se tocan y se separan por canto y sombra, porque un reporte gris no es el reporte
que se manda.

Y trajo su propia regla: puesto el bloque, las líneas que cruzaban la sección chocaban contra su
canto —**«sobran líneas»**—. De ahí *La Regla del Filete y la Superficie*: si hay superficie, el
filete sobra; sin superficie, el filete es lo único que agrupa. Adentro del bloque los filetes se
apagan y las filas suben a 1,5 aires de bloque.

### El Tablero salió de la página

Lo borró: **no era ni el entregable ni la aprobación**, cortaba el paso de «aprobás» a «le llega»
y repetía los estados de Control. Se fueron `Tablero.tsx`, su CSS, los datos `TABLERO_*`, su
bandeja, la chapa `[data-estado="neutro"]` y la segunda excepción de los dos colores del negocio.
El capítulo oscuro **cierra ahora en Control**.

**La lección, que es la más cara de la jornada:** el Tablero consumió **tres rondas de rediseño**
—bandeja, eje compartido con la ventana, fila de rótulos— y ninguna convenció, porque el problema
nunca fue el dibujo. Quedó como *La Regla del Argumento Propio*: cuando ningún dibujo convence,
revisá si la sección tiene argumento propio.

### Control, rediseñado entero

Leyó la sección **«aburrida o chica»** e **«igual a las otras»** —titular arriba y un panel de
papel con pestañas al lado, la misma composición que Lectura y Criterio— y eligió, entre **tres
rediseños completos**, la sección **sin panel**: el estado del reporte en palabra gigante
(`clamp(4rem, 11vw, 11rem)`, naranja `espera` en Borrador y `acento-sobre-noche` en Enviado), el
recorrido en una fila de puntos, la firma a todo el ancho con el botón en la punta, y debajo **los
dos caminos lado a lado** partidos por un filete vertical, con el freno de la IA dibujado como
flujo. Se borraron `Modos.tsx`, `Recorrido.tsx` y `.i-isla` de `base.css`.

Los dos modos salieron de las pestañas por un motivo que vale como regla: **el titular promete
que vos decidís y con pestañas la mitad de la decisión quedaba detrás de un clic.**

### El documento, un escalón más grande

Leyó el reporte **«pobre»** —el problema no era dónde estaba puesto en la página sino el documento
mismo— y eligió, entre tres tratamientos, **la misma información un escalón más grande y con más
aire, sin agregar ni sacar nada**: cliente 34, prosa 17, cifra de KPI 26, tabla 16 con filas de 16,
hoja 64/60/56, y el rótulo de sección a 12px con un filete que cruza hasta el margen (que además
dejó sin trabajo al borde entre bloques, salvo donde el bloque siguiente no tiene rótulo).

Descartados con motivo: las fichas de KPI sobre gris con barras de variación en la tabla (las
barras no las emite la plantilla real) y la banda de marca de la agencia encabezando el documento
(el panel no la dibuja, no guarda logo ni iniciales, y pintada con el petróleo de Nuvlo
contradecía la promesa de marca blanca). **La banda queda propuesta para el panel.**

**Esto adelanta a la plantilla real**, que todavía no lo adoptó: es el orden que fija
`PRODUCT.md` —la landing elige, el panel adopta después— pero hasta que se adopte, el documento
que se ve acá compone distinto del que se manda.

### El resto de la jornada

- **Rótulo de portada** (`.i-portada-rotulo`): «Reportes de Meta Ads para quien atiende clientes»,
  en el acento, arriba del h1. Leyó la primera pantalla y marcó que **no se entiende qué es**. Dice
  «quien atiende clientes» y **no «traffickers freelance»**: nombra al mismo oficio sin cerrarle la
  puerta a las agencias chicas, que usan el producto aunque no sean a quien el sitio persuade. Es la
  única excepción registrada a *La Regla del Rótulo*.
- **El entregable, en tres tiempos**: le llega → lo abre → ve el informe, en dos filas. En tres
  columnas no entraba («quedó todo apretado»: el mail en 370px a 1440 y en 300 a 1280). El teléfono
  se apoya en un filete —con fundido «parecía que se derretía», sobre bandeja propia repetía el
  informe—, el mail se abre **tipo Gmail** (la cabecera De / Para / Asunto era la vista de quien lo
  manda) y la ventana de «Lo que abre» gana bandeja: sola sobre el marfil se leía como un
  rectángulo gris.
- **Precios**: la cuenta **en una frase** con los dos controles adentro, y «Lo que ve tu cliente»
  —una ventana con el host del enlace público y el final real de la página pública— en lugar de los
  dos pies estáticos, que leyó como «no se ve como el pie de un informe».
- **Preguntas**: ocho filas a todo el ancho con la pregunta a la izquierda y la respuesta corta a
  la derecha, 22 de aire por fila.
- **Cierre**: la charla **primero** y más ancha, con la acción a la derecha alineada abajo y la
  charla arriba, a la altura del titular: la historia termina y recién ahí llega la «prueba» del
  título, con el botón al final de la lectura.
  El DOM no cambia —el titular sigue nombrando la sección— y el orden visual lo pone el CSS.

### Lo que el contrato de dirección de arriba ya no describe

El bloque **Direction contract** es el texto del 07/09/2026 y se conserva como se firmó. Tres
partes envejecieron y **manda el código**: el acento es petróleo y no vino (12/09), la familia es
Geist y no Inter con `opsz` (12/09), y la página monta **ocho secciones más el pie-telón** y no
siete. La bandeja no está retirada: quedó **una sola**, la de «Lo que abre».

## Cuarta ronda de modo live (17/09/2026, tarde)

Cinco cambios, todos verificados contra `app/estilos/` y `components/iris/`. Los de sistema
están en `DESIGN.md`; acá queda contra qué se eligió y qué quedó abierto.

### La grilla, en cinco vueltas, y el bloque se va

El dueño señaló la grilla de Attio: las verticales cruzan la página y las horizontales terminan
contra ellas, nunca en el aire.

1. **Dos rieles contra el borde de la pantalla más una horizontal por sección**, en todas. El
   dueño sacó los rieles y acotó dónde van las verticales.
2. **Una columna izquierda fija con los titulares.** La rechazó: **«Attio no tiene los títulos a
   la izquierda»**, y era cierto —la vertical de Attio separa su riel de pasos del visual, no el
   título del contenido—. Se había leído mal la referencia y se copió una estructura que no
   tiene; quedó como *Don't*.
3. **Dos verticales que son los cantos del marco**, a **1320** —las pidió más afuera que los
   1240 de la primera vuelta—, sin rieles de borde, con el **aire de sección mudado de la
   sección al marco** y **sin verticales en el héroe ni en El entregable**. Duró un día: al
   dejar El entregable afuera, las verticales existían de y=1254 a 7272, **faltaban los 1332px
   de esa sección** y volvían de 8604 a 11143. Cuatro puntas libres en el medio de la página.
4. **Lo que quedó (18/09/2026, «no me convence la grilla»):** los rieles dejan de ser el borde
   de una caja y pasan a ser **una capa** —un `::after` por sección, en `z-index: -1`— que corre
   sin cortes y que el contenido cruza por arriba, que es como los hace Attio (medidos, 6465px
   sin un corte). El héroe sigue sin rieles y la costura donde la grilla empieza lleva su
   horizontal a todo el ancho. Abajo de 1000 los rieles se van: a ese ancho serían el canto de
   la pantalla.
5. **Margen propio en vez de sólo un tope** («ensanchala, que entre todo», con Stripe y Cal.com
   sobre la mesa): 24 de margen, 1400 de tope, a 1440 en 24/1401 —los números de Attio— y a 390 en
   24/351, con lo que dejó de hacer falta esconderla en teléfono. Se eligió la regla de Stripe
   —**nada cruza el riel**— sobre la de Cal.com, que manda las horizontales fuera de la pantalla
   con una crucecita en cada cruce. Duró unas horas: con medida propia había que elegir entre
   achicar las escenas del héroe y de El entregable o dejar su texto 24px desalineado del resto.
6. **Lo que quedó (18/09/2026, «mejor alineá todo al ancho completo»):** el riel **deja de tener
   medida** y pasa a ser el canto del texto —el marco menos su relleno—. Todo arranca en el mismo
   x, las cuatro líneas de cada sección salen del mismo `::after` y se encuentran en la esquina, y
   el sistema se mueve con `--borde-x` y con nada más: 40/1385 a 1440, 20/355 a 390. Se borraron
   los dos tokens de la grilla y las trece reglas que estiraban líneas para alcanzarla.

**Salió gratis lo que parecía el trabajo:** medidos antes de tocar nada, la ventana del informe
del héroe ya terminaba en 1385 y el teléfono de El entregable ya arrancaba en 40, que son
exactamente los dos rieles. El contenido ya estaba alineado; lo que no lo estaba era la grilla.

**Y con la grilla se retiró el bloque**: `.i-bloque` no existe en ninguna hoja. Bloque y riel son
dos encuadres del mismo contenido y no conviven. Con él se fue *La Regla del Filete y la
Superficie*, que describía el adentro del bloque. **Abierto:** el token `--bloque` sigue
declarado en `base.css` sin un solo `var(--bloque)` que lo use.

### La bajada del héroe se separa de la `description` (18/09/2026)

La revisión de diseño marcó el segundo párrafo del héroe como **lo menos específico de la página**:
«conecta la cuenta, calcula las métricas y redacta el análisis» lo escribe cualquier herramienta de
reportes.

**La causa era un acoplamiento, no una mala redacción.** Ese párrafo era *literal* la `description`
del sitio, por decisión registrada, y las dos cosas tienen trabajos distintos: una `description`
explica el producto a alguien que **no vio** la página —un resultado de búsqueda, un enlace pegado
en un chat— y para eso una lista de capacidades es lo correcto. Una bajada de héroe tiene que hacer
avanzar el argumento.

La `description` se queda como está y el héroe escribe la suya: **«Las cuentas las hace el sistema
antes de que la IA escriba: recibe los números ya hechos y no calcula ninguno. Vos leés el borrador
y decidís si sale.»** Es la objeción del que ya quedó mal delante de un cliente, es lo que Criterio
después demuestra mostrando el prompt, y no inventa una versión nueva: es la misma afirmación que
Preguntas contesta.

**No se borró el párrafo, se cambió**, y eso también se midió: sin él la columna quedaba en 123px
contra una bandeja de 828 y volvía el «se lee vacía» que ese bloque vino a resolver en su momento.
El problema era el texto, no su lugar. Lo que sigue atado es el TITULAR, que sí es literal el `h1`.

### El atajo a Precios en teléfono (18/09/2026)

La crítica midió el problema: la página mide **17.308px en teléfono** y Precios arranca en el
**11.886**. Catorce pantallas, y el trafficker entra desde el celular a ver cuánto sale.

**Las dos salidas obvias estaban bloqueadas por decisiones ya tomadas**, y eso es lo que define la
forma de la que quedó:

1. **Arriba no hay lugar, y no lo va a haber.** Medido a 390: entre la marca, «Ingresar» y el CTA
   quedan **40px libres** en la fila. Y el espacio no se puede recuperar recortando la franja legal,
   porque `PRODUCT.md` registra que los dos botones de la Disposición 954/2025 van «a simple vista
   en la barra superior».
2. **Un menú ya existió y se retiró** (14/09/2026): el `<details>` dejaba la barra sin «Ingresar»
   entre 768 y 1023.
3. **Un segundo CTA está descartado por escrito**: ese mismo día el dueño eligió resolver Precios
   con un enlace de prosa en el héroe, «no un segundo botón: no compite con el CTA» (`Heroe.tsx`).

Lo que quedó **continúa** la decisión del 14/09 en vez de reemplazarla: es el mismo «Ver precios»,
disponible cuando el del héroe ya salió de la pantalla. Una pastilla de hoja en la zona del pulgar,
sin CTA, sin estado y sin nada que abrir. Aparece en la ventana exacta donde el visitante no tiene
cómo llegar a Precios —de y=781 a y=11.042, medido— y fuera de ahí no existe, así que nunca convive
con lo que repite.

### La lectura: se cortó a tres y volvió a seis, el mismo día (18/09/2026)

La otra mitad del P1 de longitud. La sección medía **2.366px en escritorio y 2.372 en teléfono**
explicando parte por parte un documento que el héroe ya mostró entero, así que se cortó a las tres
partes que ninguna otra sección demuestra mejor: se fueron «Acá escribe la IA» y «Hasta tres
acciones» —las dos las prueba Criterio con el prompt literal— y «Y lo firmás vos», que el
conmutador de Precios dibuja en vivo. Medido con un A/B controlado: 918px menos.

**El dueño lo revirtió, y el argumento es mejor que el que sostenía el corte.** La sección se llama
«El informe, parte por parte»: su contrato con el visitante es la **completitud**, no la selección.
Con tres de seis, lo que el visitante se pregunta no es qué dice cada parte sino **por qué esas
tres y no las otras** — y el informe que está al lado tiene visiblemente más. La no-repetición era
un criterio de quien conoce la página entera; el de la sección es recorrer el documento.

**La regla que queda, y vale más que esta sección:** acortar quitando ítems de una enumeración
rompe la promesa de la enumeración. Si hay que acortar, se acorta cada parte, se acorta el scroll
que cada una ocupa, o se va la sección entera —como se fue el Tablero—; lo que no se hace es
dejarla a medias y que se note.

De aquella tanda sobrevive sólo `--pasos`, porque es una mejora aparte: el alto salía de tres
números escritos a mano en el CSS —5 en la pista, 6 en las marcas, 5 en la cola de teléfono— y
ahora los tres salen de `PASOS.length`. Con seis partes da exactamente la geometría de siempre.

**Abierto:** la página vuelve a 11.983px en escritorio y 17.285 en teléfono. Si la longitud sigue
molestando, el lugar no es la cantidad de partes.

### Tres pasos, rediseñada entera

Rechazó la sección —«probá un rediseño completo»— y eligió, entre tres direcciones, **la
comparación**: lo que hay hoy a la izquierda, la tesis a escala de titular, y a la derecha los
tres pasos con un solo objeto, el diálogo de generar. Descartadas: los tres objetos en fila
cortados al mismo alto y la escena parada en el diálogo solo.

**La columna izquierda no dice cómo trabaja hoy el visitante.** La primera versión decía «hoy
exportás y cruzás en una planilla» y el dueño avisó que esa premisa puede no ser la de su
cliente: hay quien usa un tablero, quien manda un PDF automático, quien lo hace a mano, quien
manda un mensaje con dos números y quien no manda nada. La columna nombra **las salidas** y lo
que todas tienen en común; la bajada también se rehizo por lo mismo. **Abierto:** el dueño
enumeró cinco salidas y la lista renderiza **cuatro** —«un mensaje con dos números, o nada»
junta dos, y «quien le paga a otro» quedó sólo en el comentario de `Pasos.tsx`—. Es decisión de
copy, no de sistema: si la quinta tiene que verse, hay que escribirla.

**Y una corrección de la misma tarde:** el objeto sale del marco por la derecha **sólo desde
1000px**. En teléfono ese margen negativo lo cortaba contra el borde de la pantalla —medido a
390: 18px afuera, y lo que se perdía era el botón «Programar»—.

### Control, rediseñada de nuevo

La palabra del estado bajó de `11vw` a **4,5rem de tope**: a escala de cartel ocupaba media
sección, dejaba la otra media vacía y su naranja competía con el botón. **Volvió el documento**:
a la derecha se ve el final del informe (`Reporte desde="plan"`) sobre papel, tope de 380px,
cortado con máscara de fundido, y el botón quedó **al lado de lo que aprueba**. La sección
prometía que nada sale sin vos y no mostraba lo que sale.

### La lista de generación vuelve, en Criterio

Quedó suelta con el rediseño de Tres pasos y va ahora arriba del prompt (`.i-criterio-orden`),
con sus tintas de noche: es el argumento de Criterio contado como **orden**, que es justo lo que
la sección no tenía cómo mostrar.

### El héroe dice qué es y contra qué se compara

Dos piezas de copy nuevas, las dos pedidas por el dueño: un **rótulo** arriba del titular
—«Reportes de Meta Ads para quien atiende clientes», en el acento— y una **línea debajo del
titular** que dice contra qué se compara. **Anotado y no canonizado:** el rótulo arriba de un
titular es el copete que el propio sistema prohíbe (`DESIGN.md`, *La Regla del Rótulo* y su
*Don't*). Quedó registrado como la única pieza que el build carga por decisión del dueño, **sin
permiso de herencia**: ninguna superficie nueva lo copia, y si aparece un segundo rótulo de
portada, el que sobra es el segundo.

### El revelado de entrada, rehecho

Eran dos IntersectionObserver —uno para mostrar, otro para ocultar— y se pisaban: al bajar
rápido disparaban en el mismo lote, ganaba el de ocultar y el bloque quedaba **invisible con la
sección a la vista**. El dueño lo vio al apretar «Aprobar y enviar». Hoy decide **uno solo** por
geometría, con los mismos dos umbrales (76 % para entrar, 15 % afuera para salir), y hay **un
vigía de scroll compartido por toda la página**, limitado a una lectura de layout cada 80ms.

### Cerrar puntas de línea

Fue el eje de varias vueltas y quedó como *La Regla de la Vertical que Cierra*: la comparación,
el prompt de Criterio y los dos caminos de Control **cierran arriba y abajo**, y sus verticales
corren de horizontal a horizontal.

## Quinta ronda de modo live (19/09/2026): el héroe se rehace entero

El héroe se iteró toda la pasada del 18/09 sin cerrar —se probaron la tabla del informe
encuadrada, la pestaña de navegador, el escalón de valor, la ventana apoyada al modo Linear—
y el dueño cortó con **«empezá de nuevo»** y después **«necesito diseños diferentes»**.
De ahí salieron seis direcciones en `/preview/heroe`, y eligió la **6**.

### La dirección elegida, y de dónde sale

Es la fórmula de superhuman.com, **medida en su página y no copiada de memoria**: su héroe no
es la página sino un bloque con fondo propio, y adentro hay tres capas con tratamientos
distintos. La jerarquía sale del **contraste entre capas**, no del tamaño:

- atrás, un mesh gradient desenfocado;
- en el medio, el Administrador de anuncios **translúcido y recortado** por los cantos del
  panel — es el insumo, no el entregable: si se entiende cada número, compite;
- adelante, **una** card nítida que rompe el canto de la ventana y se sale hacia el gradiente.
  Ese solape ES la profundidad; contenida adentro, se aplana todo.

Tres slides, que son los tres pasos que `PRODUCT.md` define. **El `h1` no rota**: el brief
pedía que cambiara con el slide y eso dejaba a la página sin UN titular —cambia lo que lee un
lector de pantalla y lo que indexa un buscador—, además de que una afirmación que cambia cada
siete segundos no es una afirmación. Lo decidió el dueño.

### Lo que se preservó del héroe anterior, y lo que no

El boceto de comparación tenía un botón falso y una tarjeta de aprobación dibujada. En la
promoción los dos son los de verdad: el CTA es `PanelLink` con su lista blanca de atribución,
y el slide 3 monta la `Aprobacion` real —apretar sigue cambiando la barra de direcciones del
tablero, que es la única interacción de la página y lo que prueba el producto sin decirlo—.

Lo que **no** se preservó, a propósito: la burbuja del cliente. Era la única voz humana del
primer viewport, pero adentro de la pieza rompe la regla que el propio brief pone como
condición —un solo foco por slide— y su conversación ya vive entera en el Cierre.

### La banda, en tres pedidos del dueño

1. **«Tiene que ocupar todo el ancho.»** El escenario salió como bandeja —adentro del marco,
   con margen y cantos redondeados—, y eso lo volvía un objeto apoyado en la página. Pasó a
   banda a sangre: el fondo es de la pantalla y el contenido sigue midiendo el marco.
2. Pegarla a la barra no alcanzó: la barra se vestía de noche pero su fondo seguía siendo el
   campo blanco. La banda le pasa **por debajo**, que es lo de la referencia y lo que el sitio
   ya sabía hacer.
3. **«Que se noten más los colores»** y después **«son tres tonos muy parecidos, y cada uno
   tiene muchos colores»**. Las dos mitades son el mismo error mirado de los dos lados: cada
   slide mezclaba cuatro matices y, mezclando todos de la misma bolsa, los tres terminaban en
   el mismo promedio. Quedó **una familia por slide en cuatro valores** —petróleo, esmeralda,
   violeta—, que son los tres pasos.

### Lo que costó caro y está en `DESIGN.md`

Tres rondas del dueño diciendo «no se ve el degradé» y «lo veo grande» fueron **defectos de
código, no de diseño**: el degradé compartía pseudo-elemento con la capa de grano y se pintaba
al 14%; los tamaños del calendario los pisaba un `font: inherit`; el hover usaba el token de
un estado y daba 4% de luminancia. Las tres se encontraron **midiendo píxeles**, no mirando
capturas. Las reglas quedaron en `DESIGN.md`.

### El diálogo de Generar, terminado

El calendario previsualiza el tramo mientras se elige —era lo único que le faltaba para
comportarse como el control de verdad— y la celda pasó a las medidas del `calendar.tsx` del
panel. **«Programar» quedó apagado** con la línea de ayuda del producto: `puedeProgramar` sale
de `tieneSuscripcionActiva`, así que en el trial —el plan que esta página vende— ese botón
está gris, y mostrarlo encendido prometía una función que el visitante no va a tener.
Campañas dejó de ser control y pasó a ser el dato impreso: el dueño sacó su menú, y un campo
con caja y flecha que no abre es la afordancia muerta que esta sección ya tiene prohibida.

### Nueve variantes descartadas, y por qué

El dueño pidió tres tandas de variantes sobre Tres pasos. Las nueve se descartaron y el motivo
fue el mismo: **le arrancaban a la sección sus clases de layout y reconstruían rejas a mano**.
Las que funcionaron —la última tanda— mueven una sola colocación dentro de la reja existente.
Está como *Don't* en `DESIGN.md`. Los dos primeros pedidos llegaron **sin texto de brief**, así
que los ejes los eligió el agente: para la próxima conviene mandar la nota con el pedido.

## Sexta ronda de modo live (19/09/2026): Tres pasos se recorta, y la barra se aclara

Dos superficies en una sola sesión, las dos por corrección sucesiva del dueño. Ninguna de las
dos empezó como se terminó, y en las dos el cambio que cerró el problema fue estructural y no
de ajuste.

### Tres pasos: el objeto deja de mostrarse entero

**El diagnóstico, medido antes de tocar nada.** Después de quince variantes de dos columnas que
el dueño fue rechazando en tanda —«quedaron mal», «las opciones quedan incompletas y el diseño
es siempre el mismo», «se ven básicas y con mucho aire vacío», «está mal distribuido todo»— la
medición dijo por qué ninguna cerraba: **el diálogo mide 549 de alto y ningún texto que pueda
ir al lado pasa de 424**. En dos columnas sobraba entre 120 y 374px, incluidos los 235 del
original. No era el reparto: era que el objeto se mostraba ENTERO, y entonces su alto es un
dato y no una decisión.

**La dirección elegida** (de tres intensidades de recorte, el dueño eligió la lateral): el
diálogo se apoya en un panel que lo recorta, como el héroe con el Administrador de anuncios y
El entregable con el informe. Tres pasos era la única sección que mostraba una tarjeta completa
flotando en blanco.

**Las cinco correcciones que le siguieron**, en orden, porque cada una descubrió la siguiente:

1. **«El calendario se ve cortado.»** El corte lateral estaba calculado para caer exactamente
   entre dos columnas de la grilla del calendario —prolijo en el píxel— y se rechazó igual. La
   lección quedó en DESIGN.md como *La Regla del Corte*: una tabla tolera perder una columna,
   una grilla de siete no. El corte se mudó abajo.
2. **«Donde dice "Toda la cuenta" no se entiende que es un botón.»** El campo de campañas había
   quedado impreso, sin caja, cuando el dueño le sacó el menú el mismo día. Al lado del
   segmentado, la reja de dos celdas quedaba con una mitad control y la otra texto suelto.
   Vuelve la caja del panel con su flecha y su realce.
3. **«Cerrá la grilla.»** Los días del calendario flotaban sueltos adentro de la caja del
   período: siete columnas sin nada que las contuviera se leen como una lista de números.
   Cierran con su propio filete, con la fila de días de la semana adentro.
4. **«Faltaron las líneas verticales… me refiero a la que mantiene toda la página.»** Primero
   se dibujaron dos verticales adentro de la sección, y era la grilla equivocada. La correcta
   —los dos rieles— **no estaba llegando a la sección**, y el motivo no era de diseño: el
   envoltorio de la tanda de variantes de live metía dos `div` entre `.i-cortina` y la
   `section`, y la regla que dibuja los rieles es de hijo directo. Medido: `border-left` en
   `0px` en Tres pasos y `1px` en las otras seis. Está anotado como *Don't*.
5. **«Mucho aire vacío a la izquierda»** y después **«mostrá la parte de abajo del
   calendario»**. El título y la bajada bajaron a la banda —vivían en un bloque propio por
   encima de todo, donde sólo empujaban— y el texto pasó a ir **centrado** y no repartido con
   `space-between`: repartido, todo el sobrante se juntaba en un hueco de 199px entre dos
   bloques, que es exactamente lo que se ve como agujero.

**Dónde quedó el corte.** En 484, que es el aire entre la fila de campos (termina en 481) y su
nota (arranca en 487). Se ven la cabecera, el calendario entero, la línea que resume el rango y
los dos campos; sangra la nota sola.

### La barra: clara, opaca, más ancha y sin la tira

**«Volvela clara, ensanchala un poco y sacá la tira de arriba.»** La barra arrancaba
transparente sobre el campo del héroe y se daba vuelta a noche encima de los tramos oscuros.
Las dos cosas se fueron: con ellas, doce bloques de CSS, el `:is()` de `base.css` que costó un
día de depuración por especificidad, y tres `elementsFromPoint` por cuadro. La fila subió de 64
a 76.

**Y una segunda corrección:** «se hace traslúcida al pasar por un tramo oscuro». Estaba al 86 %
con 32px de desenfoque desde el 16/09, elegido en modo live entre cuatro difuminados. Eso
funcionaba mientras la barra se daba vuelta —el 14 % que pasaba era del mismo color que su
propio fondo—; clara siempre, ese 14 % arriba de un tramo oscuro es negro. Ningún porcentaje lo
arregla: el problema no es cuánto pasa sino **qué** pasa, y lo que hay debajo cambia tres veces
en el scroll. Es opaca.

**Lo que se perdió, y es de registrar.** La tira llevaba el «Botón de arrepentimiento» y el
«Botón de baja de servicio». Bajaron primero a la fila y después el dueño los sacó de la barra
entera. La Disposición 954/2025 los exige «a simple vista, en lugar destacado y en el primer
acceso»; **hoy existen sólo en el pie**, que no se ve al entrar. Queda anotado en `Navbar.tsx`,
donde vivían, y en DESIGN.md → Navigation.

### Lo que la sesión dejó sin cerrar

- **El bug de Impeccable live** (reporte enviado, recibo `018c0884-fc78-4929-b881-59a358674e27`):
  el descarte automático borró dos veces el bloque original entero reportando éxito, y una
  tercera lo preservó duplicando el espaciado. Mientras eso siga así, en modo fallback hay que
  copiar el bloque original al scratchpad Y escribir la variante `original` a mano.
- **La tanda de `bolder` sobre Tres pasos** (tres variantes: escala de la cifra, la sección en
  la noche, la banda a sangre) se armó y se montó, pero el dueño siguió corrigiendo la base y
  nunca eligió. El envoltorio se sacó porque estaba rompiendo los rieles; las tres direcciones
  quedan descriptas acá por si vuelven.

## Adapt: el teléfono acostado, la muesca y los blancos que faltaban (19/09/2026)

Pedido del dueño: «hacé la página responsive para todos los dispositivos». Lo primero que la
pasada tuvo que registrar es que **la parte cara ya estaba hecha**: medidos los siete anchos
declarados más 320, 360, 414, 480, 600, 834, 1180, 1728 y 1920, en la home y en las tres
legales, y sumando teléfono acostado y iPad acostado, **no hay un solo desborde horizontal**.
Lo que faltaba no era el ancho. Era el alto, la muesca y el dedo.

**1. La escena de La lectura se rompía en todo teléfono acostado.** Sus dos pegados reparten el
alto en `56svh` y `30svh`, medidas correctas mientras la pantalla sea alta; a 390px la barra se
lleva 64, la hoja 218 y a la guía le quedan 108. Se despegaba antes de que terminaran las seis
marcas y escribía el título de la parte **encima del papel**. No se comprimió: para que la guía
entrara había que dejar la hoja en unos 140px, y ahí deja de ser «el informe a escala real y
entero», que es lo único que la sección afirma. Por debajo de 620 de alto y 1024 de ancho se
apaga la coreografía y queda el contenido que `Lectura.tsx` ya documentaba como su estado sin
JavaScript: el documento en el flujo, entero y **en blanco** —se va el velo del 22 %, no sólo la
lámina—, y las seis partes como lista con sus seis explicaciones abiertas. Ver *La Regla de la
Pantalla Baja* en `DESIGN.md`.

**2. Las dos reglas de área segura del repo estaban muertas.** `env(safe-area-inset-*)` devuelve
`0px` mientras el documento no declare `viewport-fit=cover`, y nadie lo declaraba: la franja del
héroe y la barra pegada de El entregable venían sumando cero en todos los teléfonos. Hoy lo
declara `app/layout.tsx` y el margen entra por `--borde-x`
—`max(20|32|40px, env(left), env(right))`—, que es el lever que mueve el texto y los dos rieles
juntos; el pie paga el indicador con `max(28px, env(bottom))`. No se declaró `maximumScale` ni
`userScalable: false`: bloquear el zoom contradice el piso de `PRODUCT.md`.

**3. Tres controles no llegaban al blanco táctil, y dos los pide una norma.** El bloque de
blancos táctiles enumeraba ocho selectores y se había quedado viejo: «Ver precios» medía 72×18 y
los dos botones de la Disposición 954/2025, 151×17 —entraron al héroe el 19/09 y nadie volvió a
pasar la lista—. Con ellos, el enlace de saltar al contenido (41) y el índice de las tres legales
(once entradas de 18px). **Es la quinta vez que este repo cierra un ancho o un piso en la fila
que lo motivó y deja las hermanas afuera**; el `Don't` ya estaba escrito.

En el renglón fino del héroe se eligió caja propia y no una capa invisible encima, que era la
salida que dejaba la composición intacta: los tres enlaces viven en dos renglones separados por
10px, y dos rectángulos de 44 centrados en renglones que distan 27 **se pisan**. Un blanco que se
pisa con otro no es un blanco. El bloque del héroe se alarga 48px en el teléfono —medido a 390, apagando la regla— y se acepta.

Quedan por debajo del piso, a propósito: los controles dibujados de las maquetas del panel
—agrandarlos deforma la cita—, las seis frases de la guía de La lectura, que en angosto llevan
`pointer-events: none`, y los enlaces de prosa legal, que son la excepción de línea de WCAG 2.5.8.

## La franja de 600 a 900, revisada sección por sección (19/09/2026)

Pedido del dueño después de la tanda de `adapt`: «encará la pasada de composición en 600–900».
Es la franja que no es teléfono ni escritorio y que ninguna pasada anterior había mirado por
composición —sólo por desborde—. Se midió el alto de las siete secciones en 600, 700, 768, 834,
900, 1024 y 1280, y el resultado es que **seis de las siete están bien y una no lo estaba**.

**El entregable, corregido.** Entre 880 y 1023 corría la maqueta de teléfono: el aparato
centrado con 230px de campo a cada lado, el mail al ancho entero y el informe casi completo
debajo. 2.039px a 900 contra 1.322 a 1024 —la misma sección, 717px más larga, por 124px de
ancho—. La escena pasa a dos columnas desde 880 con el teléfono en 280 (el mismo movimiento que
ya hacía entre 1024 y 1279, un escalón más abajo) y la calle en 48. Medido con recarga: 2.039 a
879, **1.574 a 880**, 1.646 a 900. La página entera baja de 12.304 a 11.839px.

Un defecto propio, encontrado mirando y no midiendo: al meter las formas en la columna del
teléfono se quedaron con las dos pistas que la regla de 768 les da, o sea dos columnas de
140px. Se cerró llevando también ese umbral a 880 —son la misma decisión—. Y una alarma que
resultó falsa: 280px parecían dejar las formas por debajo del piso de 45 caracteres, y medido
dan 28 por renglón en 3 renglones **igual que a 340**, porque el texto es corto y envuelve
igual. No costó medida.

**Las otras seis se dejan, y cada una con su cuenta** (ver *La Regla del Umbral que se Gana* en
`DESIGN.md`): Tres pasos ya está en el límite aritmético de su umbral de 1000 y bajarlo pediría
el recorte lateral del calendario que el dueño rechazó ese mismo día; La lectura ganaría 85px
por cambiar de maqueta entera y pagaría la escala de lectura del papel; Precios, Control y
Preguntas convergen solas (1.322/1.303, 1.132/1.153, 1.164/1.123); el héroe no se tocó.

**Un hallazgo de método:** las sondas sobre El entregable **tienen que recargar**. Medido
redimensionando sin recargar, la sección da 2.048 a 880 donde con recarga da 1.574: la escena
tiene consultas de contenedor y una cascada de entrada que no se rehacen solas. Las dos primeras
mediciones de esta pasada salieron mal por eso.

## Teclado y táctil: dos defectos de estado (19/09/2026, cierre)

Pedido del dueño con dos partes y un supuesto que la medición dio vuelta.

**El supuesto: «40 tabuladores que no hacen nada».** No los había. El pedido describía el
diálogo de Generar como era hasta el 18/09 —35 días, dos flechas, dos pestañas y un campo,
todos dibujo— y lo que se pedía era sacarlos del orden de tabulación. Medido con una sonda de
DOM sobre la página servida (recorriendo los focusables del documento, descartando `inert`,
`hidden`, `disabled` y `tabindex` negativo): **87 paradas de teclado en la home, 41 dentro del
diálogo, y 39 de esas 41 responden de verdad** desde las tandas del 18 y el 19. Sacarlas
habría deshecho tres decisiones del dueño con fecha y, peor, habría dejado 39 controles que
el mouse opera y el teclado no alcanza: WCAG 2.1.1, nivel A, bastante más caro que el defecto
que venía a arreglar. **No se tocaron.**

**Lo que sí había: dos.** Campañas y «Ahora» eran `<button>` sin `onClick` —les había llegado
el cromo de control y no el comportamiento— y eran las dos únicas paradas muertas de las 87.
Volvieron a ser `<p>` y `<span>` con el dibujo intacto. **No con `tabIndex={-1}`:** eso los
saca del Tab y les deja el rol de botón, o sea la mentira entera más un control que el mouse
aprieta y el teclado no. Medido después: **85 paradas, y la geometría de la ficha idéntica**
—campo y segmentado 40px de alto y el mismo ancho, los segmentos 32, radio 5, las mismas
tintas—. Lo único que cambió a propósito es el cursor, que deja de ser mano. A 390 la cuenta
es 72 y 33, porque la columna de atajos se va por `@container`.

**El `:hover` en táctil.** El pedido hablaba de «más de cien reglas»: son 100 contando
`/preview/**`, que está fuera de alcance y va `noindex`. En el sistema vigente hay **29** —25
en `secciones.css`, 4 en `base.css`, 0 en `documento.css` y en el sistema—. De las 25, 3 ya
estaban gateadas. **Se gatearon 13 y se dejaron 9**, con el criterio y las dos trampas de
implementación escritos como *Don't* en `DESIGN.md`. En una frase: se envuelve lo que MIENTE
un estado —la barra, el calendario, el conmutador, La lectura, los dos campos de Generar— y
lo que MUEVE —«Volver arriba»—; se dejan los enlaces cuyo realce pegado no afirma nada. Las 4
de `base.css` quedaron sin mirar porque el archivo estaba tomado por otra tanda: son
`.i-boton:hover`, `.i-boton-hoja:hover`, su par de noche y `a:not([class]):hover`, las cuatro
sólo color de fondo o de texto sobre elementos que navegan y se llevan la página.

## La banda de marca vuelve, y con ella cambia un copy (19/09/2026)

La landing probó la banda el 17/09 y la descartó **para sí** con tres motivos, dejándola
propuesta para el panel. El panel la adoptó hoy, así que vuelve: el sello con las iniciales de
la agencia y su nombre, sobre un filete, encabezando el documento. **En tinta neutra**, que era
la objeción que importaba. Las medidas salen del panel y no al revés —es la primera vez que
este objeto se adopta en ese orden, porque el dato es suyo—.

**Y obligó a corregir un copy aprobado, que es lo que hay que mirar de esta tanda.** La primera
parte de La lectura decía «Arriba, tu cliente» y cerraba con «Es lo primero que lee cuando abre
el enlace». Con el membrete encima, las dos mitades dejaron de ser verdad. Hoy dice **«Arriba,
tu marca. Tu nombre encabeza el informe. Debajo, el de tu cliente y el período, comparado con el
anterior del mismo largo.»**

La corrección no debilita la sección: el cuarto principio de `PRODUCT.md` dice que el entregable
es del trafficker y no de Nuvlo, y un membrete con su nombre arriba de todo es la prueba más
literal que el documento puede dar. El cliente no se pierde, baja un renglón.

La banda va **adentro** del bloque del encabezado y no como bloque propio: La lectura ilumina
por `data-parte` y promete seis partes, así que un séptimo bloque rompería la enumeración, que
es el contrato de esa sección.

## La tira de marcas, el ancho único y el ritmo recuperado (20/09/2026)

Una jornada larga con el dueño mirando en vivo. Lo que se decidió, y sobre todo **los tres
defectos que se buscaron en el lugar equivocado**, que es lo que esta entrada tiene para enseñar.

**La tira de marcas cambió cuatro veces.** Nació el 19/09 entre El entregable y Precios; hoy se
mudó debajo del héroe, pasó a una tinta —para parecerse a la de Superhuman—, volvió a color al
día siguiente y terminó siendo **dos líneas de punta a punta con dos medianeras, sin fondo**. Lo
que resolvió el problema que la tinta única venía a resolver no fue el color sino la GEOMETRÍA:
casilleros iguales y alto de tinta parejo. El dueño lo dio vuelta él mismo al verlo.

**Y su renglón subió un escalón que este brief tenía previsto.** `PRODUCT.md` dejaba escrito que
si las tres marcas llegaban a recibir un informe hecho con Nuvlo, el copy pasaba de «de acá
salió» a «esto es lo que reciben». El dueño lo confirmó hoy para las tres. Antes de eso había
pedido «algo como *Estas marcas ya confiaron en nosotros*», que era falso y no se escribió: **lo
que destrabó no fue encontrar una vuelta mejor a la frase sino preguntar si el hecho era
cierto.** Se escribieron cuatro renglones y los rechazó a los cuatro; el último había convertido
el pie de foto de tres logos en una declaración sobre quién hizo el producto.

**El ancho de página era doble y nadie lo sabía.** El dueño lo vio como «el héroe es apenitas más
angosto que el resto». No era el héroe: cuatro de las siete piezas grandes terminaban en la
columna y tres salían 16px más, hasta el riel, porque un solo número —`--grilla-vuelo`— hacía dos
trabajos. Partido en dos (`--grilla-vuelo` para las superficies, `--grilla-encuadre` para los
rieles), las siete comparten la columna y la grilla sigue encuadrando por fuera. **Y el cero del
encuadre se probó el mismo día**: la vertical cayó sobre el canto del texto y el dueño marcó la
consecuencia —«todo lo de adentro quedó pegado al riel»—, o sea llegó por el otro camino a la
regla que él mismo había escrito el 18/09.

**Los tres defectos que se buscaron mal, que es lo caro de la jornada:**

- **La mancha negra bajo el informe.** Se buscó cuatro veces en el espaciado —relleno de La
  lectura, de La máquina, de las dos— y estaba en `TOPE_HOJA` de `Lectura.tsx`, un tope simétrico
  que limitaba el recorrido de la hoja arriba y abajo. Arriba separa de la barra; abajo no separa
  de nada, porque el escenario recorta ahí mismo. **Un número simétrico no es un número, son
  dos.**
- **Los logos borrosos.** No era resolución: era un piso de alfa de 0,42 puesto para salvar el
  pin de Go By, que se aplicaba también a los bordes de antialias y los engordaba, más
  `next/image` recomprimiendo a WebP `q=75`. Los logos van `unoptimized`.
- **El hueco debajo de las marcas.** 357px, de los cuales sólo 184 eran la costura. Los otros 173
  salían de Tres pasos: su columna de texto estaba centrada contra el panel —era el único titular
  de la página que no arrancaba donde arranca su sección— y su cuerpo llevaba un relleno de
  arriba que había quedado sin trabajo al irse el filete de apertura.

**El ritmo se rompió y se recuperó en el mismo día.** Persiguiendo la mancha se le pusieron
rellenos a mano a cuatro secciones, y la página quedó con costuras de 48, 66, 184, 56, 128, 184 y
184: el «respiraba a saltos» que `DESIGN.md` registra como arreglado el 13/09, reintroducido en
una tarde. Se sacaron los cuatro, más tres medidas internas que tampoco eran del sistema.
Verificado en 1920, 1440, 1024, 768 y 390: un relleno por sección, una costura, un aire de cabeza
a objeto y uno de titular a bajada. La línea 1494 de este brief —«un solo aire de sección, sin
costuras por sección»— volvió a ser cierta, y estuvo falsa todo el día.

**Método, porque explica dos vueltas perdidas:** el dueño estuvo un tramo mirando la página **sin
recargar**, así que describía el estado viejo y cada informe suyo mandaba a buscar una causa que
ya no existía. Antes de salir a buscar de nuevo, conviene preguntar si recargó.

## El permiso: sólo lectura, dibujado (24/09/2026)

Pedido del dueño: una pieza visual destacada que muestre que Nuvlo se conecta a Meta Ads con
acceso de sólo lectura —un flujo de una sola dirección de la cuenta al reporte—, «nada de
etiquetas ni bloques de texto», sin el logo de Meta y sin decir que Meta avaló nada. Con el
permiso exacto, lo que Nuvlo no puede hacer y un enlace para verificar y revocar el acceso.

**Dónde:** `components/iris/Permiso.tsx`, entre El entregable y Precios. Es la última objeción
antes del precio —¿qué puede hacer con la cuenta?— y no se mete entre «aprobás» y «le llega»,
que fue lo que sacó al Tablero. Después de Tres pasos no podía ir: esa sección termina en su
banda, que desemboca directo en la noche de La lectura.

**Qué es:** un diodo. La cuenta publicitaria (pictograma de tres campañas con su interruptor)
manda un pulso a la derecha que pasa por el sello y llega al reporte (pictograma, sin una
cifra). Debajo, tres órdenes tachadas y con candado —crear o editar campañas, pausar o activar
anuncios, cambiar presupuestos— vuelven hacia la cuenta y mueren contra un muro que cuelga del
sello. La llave —«Verificá o revocá el acceso en tu Facebook»— va debajo de la cuenta, porque
quien corta es quien autorizó, y lleva a Integraciones comerciales de Facebook. Un pie de
figura dice el dato de la revisión de Meta.

**Decisiones:**
- **Sin titular visible**: el `h2` va en `i-solo-lectores`. Es la única sección de la home sin
  titular a la vista, por pedido explícito.
- **El sello va en petróleo**: es una marca, la de Nuvlo, y la marca está entre las señales
  que el acento pinta. Dice NUVLO en el aro; Meta no aparece adentro.
- **La revisión de Meta va fuera del sello**, en tinta de pie de figura: adentro se leería
  como una chapa de Meta.
- **«Sólo», con tilde**, como el resto del sitio; el dueño había sugerido «Solo lectura
  garantizado» como ejemplo.
- **El enlace le habla al visitante** («tu Facebook») y no al anunciante: la conexión la
  autoriza el trafficker con su propio acceso de Meta.

**Lo que no se verificó:** la URL de Integraciones comerciales
(`facebook.com/settings/?tab=business_tools`) no se abrió; Meta la viene mudando al Centro de
cuentas.

### Después, la misma tarde: de dibujo a cita

Todo lo de arriba es historia: el diodo se retiró. El recorrido completo y las reglas que dejó
están en `DESIGN.md` → *El permiso*. En corto:

- **Critique** (`.impeccable/critique/`, 18/32): la especificidad era de categoría y el sello
  se leía notarial, con la marca cabeza abajo en el aro. El dueño: «parece de un estudio
  jurídico».
- **Tarjeta de permisos** propia → **captura real** de la autorización (aportada por el dueño)
  → **campo de color** azul de Meta a petróleo, que quedó → **foco y cable**, que salieron
  («no suma») → **réplica en HTML**, que salió («perdió calidad») → **la captura, recortada**.
- **Lo vigente:** titular visible «Lee las campañas. / No las toca.», bajada con `ads_read` y lo
  que no puede hacer, el dato de la revisión de Meta y el enlace a la ayuda de Meta
  (`facebook.com/help/405094243235242`), que reemplazó al de Configuración porque ése no
  llegaba. A la derecha, la captura sobre el campo, mostrada a 562×287, con un halo y una sola
  animación: la aparición.

**La calidad de la captura, resuelta (25/09/2026).** La primera era 1x y se ablandaba en
pantallas densas. El dueño la volvió a sacar con el zoom del navegador al 175 % —al 200 % la
ventana no entraba—: 991×1182, recortada a 983×502 con el mismo criterio. Se muestra a la misma
medida, así que el diseño no cambió; verificado a densidad 2x en escritorio y 3x en teléfono.
En teléfono el texto de Meta es chico (la ventana mide unos 300px) pero ya no borroso. En la
misma tanda la bajada perdió un tuteo que se le había escapado a la pasada a español neutro:
«Es lo que Meta muestra al conectar la cuenta».

## Lo que quedó sin resolver

> **Auditada entera el 19/09/2026, y el resultado obliga a leerla con desconfianza.** De las
> **17 líneas que se leían como abiertas, 11 no lo estaban**: siete ya cerradas sin tachar, dos
> sin objeto porque la pieza que medían cambió de lugar, y dos que nunca fueron abiertos sino
> decisiones. Dos de las falsas **las escribí yo ese mismo día** y las usé para encargar trabajo;
> una habría sido una regresión de accesibilidad de nivel A si el agente que la recibió no la
> hubiera medido antes de obedecerla.
>
> **La lección, que vale más que las once correcciones:** una línea de esta lista es una
> afirmación sobre el código, y envejece como cualquier otra. **Se verifica contra el código
> antes de citarla, igual que un literal del panel** —que es una regla que este repo ya había
> aprendido en `PRODUCT.md` el 08/09 y que no se le había aplicado a sí mismo—.
>
> Lo que sigue vivo y confirmado: el resto de Control sin contrastar, el presupuesto de acento,
> el informe entero (que desde hoy tiene brief propio), los dos P2 del 16/09 **sin medir**, y el
> movimiento infinito —que son **dos** y no uno: `i-acusa` en `.i-direccion` y nueve nodos con
> `i-escribiendo`—.

**Mal catalogadas: no son abiertos, son cómo es el producto.** «Sin fotografía ni captura real
del panel» es una restricción de `PRODUCT.md`, y «modo oscuro de página: no hay» es una decisión
de la rama. Estaban inflando la lista y haciéndola más difícil de auditar.

- ~~«Aprobar y Enviar» ya no es el literal del panel.~~ **Cerrado el 13/09/2026**: alineado.
- ~~El desbalance de El entregable.~~ **Cerrado el 13/09/2026**: los dos pies coinciden.
- **La franja legal se esconde al bajar** (el dueño pidió dejar los botones como están). Está a la vista al entrar y en el pie, que es lo que
  la Disposición 954/2025 pide («en el primer acceso»); si el dueño la quiere siempre visible, la
  fila pegada tiene que crecer y todo lo que se pega debajo con ella.

- ~~La geometría real del informe en el héroe.~~ **Cerrado el 16/09/2026**: el dueño eligió la
  ventana a la medida de la hoja (ver arriba).
- ~~`sistema/nuvlo.css` tiene los tokens de noche viejos.~~ **Falso, y la línea es lo viejo** (auditado el 19/09/2026): los cinco tokens coinciden con `DESIGN.md` y `verificar-sistema` da `sha256` idéntico contra el panel.
- ~~El entregable sigue todo en blanco.~~ **Cerrado el 17/09/2026**: el dueño lo miró, la escena
  se rehízo en tres tiempos y la ventana de «Lo que abre» ganó la bandeja. La sección va además
  adentro de un bloque.
- ~~El Tablero en teléfono mide unos 1.650px.~~ **Sin objeto desde el 17/09/2026**: la sección se
  borró.
- **El resto del Control no se contrastó contra el panel.** Sigue abierto y cambió de forma: la
  chapa ya no vive en un panel de papel sino sobre la noche, en los dos caminos, con sus tintas
  aclaradas. El panel pasó sus chapas a un punto sin tinte y la landing conserva la pastilla
  tintada.
- ~~Los objetos de adentro del bloque se apoyan sobre su mismo valor.~~ **Cerrado el 17/09/2026**,
  y con regla: **lo que es nuestro se hunde, lo que es cita se separa por canto y sombra.** Bajan a
  `hoja-hundida` el diálogo de generar y la ficha del período; no bajan el informe, el mail de
  Gmail ni la pantalla del teléfono, porque un reporte gris no es el reporte que se manda y un
  Gmail gris no es Gmail. Ver *La Regla de lo Nuestro y lo Citado*.
- ~~El escalón del documento no está adoptado en el panel.~~ **Cerrado el 19/09/2026**: adoptado en `DOC_CSS`, diez reglas, con el HTML de `buildReportHtml()` sin cambiar un byte y 553 tests en verde.
- ~~`app/opengraph-image.tsx` no se revisó en esta pasada.~~ **Revisada el 19/09/2026, y estaba atrasada por CUARTA vez** —esta vez en composición, con los catorce colores en verde—.
- ~~Quedó el script de modo live en `app/layout.tsx`.~~ **Falso** (auditado el 19/09/2026): cero coincidencias de `impeccable-live` ni `localhost:8400`. Se fue y nadie tachó la línea.
- ~~El índice vertical tipo Attio.~~ **Cerrado el 08/09/2026**: se abrió con el argumento
  de la columna vacía, y ese argumento ya no existe. Si se vuelve a abrir tendrá que ser
  por un motivo propio, no por el hueco.


- ~~La decisión de PRODUCT.md que registra este rediseño de cero.~~ **Escrita el
  08/09/2026**, en Brand Commitments. Quedó afuera lo visual que la pasada fijó —los dos
  tramos oscuros, el marco de navegador, la familia única—, porque el propio archivo dice
  que «qué elementos concretos aprobó o rechazó vive en `DESIGN.md`, no acá». Lo que sí
  subió a regla durable es que **una página sin acento se le lee gris y eso alcanza para
  rechazarla entera**: es la tercera vez que el dueño juzga por ese eje (07/09 con neto,
  después de los siete mundos del 03/09 y del «cara, minimalista» del 04/09). Y la
  delegación del acento («proponé vos uno nuevo»), que es un acuerdo de trabajo sobre quién
  elige y por eso pertenece a este archivo; el color que salió, no.
- ~~`DESIGN.md` sigue documentando D.~~ **Falso desde el 07/09/2026**, y la línea quedó
  arrastrada dos días: `DESIGN.md` se reescribió contra iris ese día y se le siguió
  escribiendo encima toda la tanda del 08/09. Corregido junto con `CLAUDE.md`, que tenía la
  misma deriva y peor: apuntaba a `firma` como dirección vigente en seis lugares, incluido
  «superficie nueva se construye con el sistema de firma». Era el archivo que Claude Code
  lee primero, así que mandaba cada sesión nueva a la carpeta equivocada.
- ~~Las citas «En el panel» sin registro en PRODUCT.md.~~ **Cerrado el 08/09/2026, y no
  como se esperaba.** En vez de registrarlas de palabra se verificaron **contra el código
  de `nuvlo-panel`**, archivo por archivo. Los cuatro pasos de generación, «Generar
  reporte», «Aprobar y Enviar» y «Se envía a …» existen, y quedaron en `PRODUCT.md` con su
  ruta: son cita de verdad, y ahora se puede comprobar.

  Pero dos no. **«Completado» no existe en ningún archivo del panel** —cero coincidencias
  en todo el repo—: el panel marca el paso hecho con un tilde verde y el texto en gris, sin
  palabra, que es justamente lo que esta landing ya dibuja al lado. Y **las cuatro pistas
  bajo los pasos son copy de la landing**: el diálogo del panel renderiza sólo la etiqueta.
  Las dos se habían fijado el 07/09 como literales leídos de la pantalla.

  Ninguna es grave por lo que dice —las dos son verdad sobre el producto— pero las dos se
  presentan como cita sin serlo. Quedan anotadas en `PRODUCT.md` y en el comentario de
  `lib/reporte-muestra.ts`. **Pendiente de decisión del dueño:** sacar la palabra
  «Completado», que es lo que haría la página coincidir con el panel. Es un cambio visible
  y él la confirmó personalmente el 07/09, así que no se toca sin que lo vea.
- ~~La columna izquierda vacía en cuatro secciones.~~ **Cerrado el 08/09/2026**: eran
  cuatro en la crítica y una al medirlas. Ver «La columna izquierda, cerrada».
- ~~**El respaldo también consume crédito.**~~ **Cerrado el 08/09/2026.** La cuarta crítica
  hizo notar que la respuesta de «¿Puedo cambiar lo que escribió antes de mandarlo?» ya lo
  cubre: dice «durante la prueba gratuita **cada generación** es uno de tus 3 reportes», sin
  exceptuar ninguna. No hace falta una frase más; una que dijera «y también las que fallan»
  sería subrayar lo que la palabra «cada» ya afirma. El dueño abrió aparte, en `nuvlo-panel`,
  la pregunta de si conviene **exceptuar** esa rama del descuento: es una condición
  (`consumesCredit && !isFallback`), no toca la landing, y quedó pendiente por decisión suya.
- ~~La cabecera del informe sin verse en ningún ancho.~~ **Cerrado el 09/09/2026**: El
  entregable pasó a contar tres tiempos y el del medio —«Lo que abre»— muestra el encabezado
  del documento en su ventana, con la URL pública real del plan Estándar. **Y el hueco que
  supuse inexistente existía**: había medido `.i-mail-recorte`, que tiene márgenes negativos,
  en vez del mail, que termina a 472 en una bandeja de 560. La crítica tenía razón con sus
  ~90px y yo no. De ahí sale el `Don't` de medir el objeto y no el contenedor.
- ~~Tres pasos: 422px y 391px de hueco.~~ **Cerrado a medias el 09/09/2026, y la mitad que
  falta es a propósito.** Remedido, los huecos eran otros y había uno que la crítica no vio:
  **331px a la derecha de la lista de generación**, topeada en 30rem dentro de una columna de
  811. Los dos huecos HORIZONTALES se cerraron —la lista llena su columna, y la fila 3 se
  compone en 52rem en vez de 1235, con 71px de aire entre la tinta y la tarjeta en vez de
  474—. Lo que **no** se cerró es el vacío VERTICAL bajo el texto de las filas 1 y 2 (210 y
  395px): ese es el canto bajo de una columna de texto al lado de un objeto más alto, que es
  la forma que la página usa en todas sus secciones, y no la misma clase que el hueco de
  Preguntas que justificó la pasada de `shape`. Cerrarlo pediría contenido que no existe.
- ~~La sección sigue midiendo 1753px, el 22,5% de la página.~~ **Cerrado a medias el
  10/09/2026, y la objeción de esta línea era falsa.** El prompt fue a todo el ancho de la fila
  sin arruinar la medida: su párrafo ya tenía tope propio de 34rem y lo conserva; lo que se
  ensancha es la mitad de las campañas, que son líneas cortas. La fila 2 baja de 628 a 618 y
  la 3 de 199 a 147. La sección sigue siendo la más larga; bajarla más pide contenido menos
  largo, no otra composición.
- ~~A 1280×720 las cifras del banco terminan 23px bajo el pliegue.~~ **Sin objeto desde el 19/09/2026**: no hay `.i-banco` ni `.i-tabla` adentro de `#reporte`. El héroe se rehizo y muestra el Administrador de anuncios; el banco vive hoy en La lectura y en El entregable.
- ~~Dos P2 de la crítica del 16/09/2026.~~ **Sin objeto, medido el 19/09/2026**: los dos
  describen un héroe que se rehizo entero ese mismo día. Hoy el cuadrante derecho lo ocupa el
  Administrador de anuncios **desde el primer cuadro** —capturado a los 120ms, sin esperar las
  entradas— y no hay ninguna tarjeta de aprobación señalando una barra de acción: lo que flota
  sobre la tabla es el resumen escrito por la IA, que no señala nada.
- ~~El punto que late sin fin contradice el Don't de movimiento infinito.~~ **Cerrado el
  19/09/2026 como EXCEPCIÓN REGISTRADA, no como arreglo.** El dueño pidió el bucle dos veces
  (12/09 y 17/09, esta última eligiendo entre tres variantes), así que cambiarlo habría sido
  rodear una decisión suya. Lo que se hizo fue medir para saber si la decisión es defendible:
  **bajo movimiento reducido no corre ni una**, y las del recorrido **se acotan por cuándo
  corren** (10 fuera de vista, 16 a la vista, 10 al volver). Queda dicho que la letra de
  WCAG 2.2.2 —que pide control de pausa— sigue sin cumplirse. Ver el `Don't` en `DESIGN.md`.
- ~~La página 1 del PDF termina al 60%.~~ **La nota era mía y estaba MAL** (19/09/2026). La
  saqué de una captura donde el viewport cortaba la página. Remedido sobre el render: la
  página 1 llega al **88%** y el corte cae limpio entre dos bloques, que es lo que *La Regla
  del Corte* prescribe. Forzarla a llenarse habría partido un bloque, o sea romper la regla
  para arreglar algo que no estaba roto.
- ~~No hay enlace de salto al contenido: 27 tabulaciones hasta el pie.~~ **Falso** (auditado el 19/09/2026): existe, es la primera parada del teclado (`Navbar.tsx`, `.i-saltar` → `#contenido`), y ese día subió a 44px.
- **El presupuesto de acento creció por excepciones documentadas** —iris, naranja de espera,
  verde hecho, verde WhatsApp, verde/rojo de negocio—; cada una está justificada por separado
  y sumadas «un solo color en dos roles» ya no describe lo que se ve (décima crítica). Es una
  revisión de sistema, no un arreglo.
- **El informe entero, detrás de un enlace. Abierto por el dueño el 09/09/2026 y todavía sin
  construir.** La página muestra el documento tres veces y las tres cortado —el héroe desde el
  banco de KPI, Control desde el plan, «Lo que abre» sólo el encabezado—, así que el objeto que
  el trafficker tiene que firmar con su nombre no se ve entero en ningún lado. La *Regla de la
  Escala de Lectura* prohíbe la miniatura, con razón, pero no obliga a prohibir el documento
  completo. **No es un arreglo, es una superficie nueva**, y por eso no entró en la tanda de la
  octava crítica: hay que decidir a qué plan le habla la URL —`panel.nuvloapp.com/r/…` en
  Estándar contra `r.nuvloapp.com` en Marca Blanca, y la maqueta tiene que elegir—, si la ruta
  vive dentro de `/` (la home) o al lado, y qué pasa con «Ver reporte completo» del mail, que
  hoy es un `span` dibujado bajo `aria-hidden` y que al volverse un enlace deja de ser dibujo.
  Va con brief propio.
- ~~Los 40 tabuladores de las maquetas del panel.~~ **La línea era falsa y la escribí yo el 19/09**, leyendo un diagnóstico anterior al 18/09. Medido: de los 41 focusables del diálogo, **39 responden de verdad**; sacarlos del Tab habría sido una regresión de WCAG 2.1.1 (A). Los 2 que sí estaban muertos se cerraron el mismo día.
- ~~El hover no está gateado por `(hover: hover)`.~~ **Cerrado el 19/09/2026, y la cuenta también era falsa**: «más de cien» eran 100 contando `/preview/**`; en el sistema vigente hay 29. Se gatearon 13 de 25 en `secciones.css` y las 9 que quedan están listadas con motivo.
- Sin fotografía ni captura real del panel: `PRODUCT.md` no las tiene y no se inventan.
- Modo oscuro de página: no hay, por decisión de la rama (clara con dos tramos).
- ~~La palabra «Completado».~~ **Cerrada el 08/09/2026**: el dueño la sacó, y hoy la lista de
  generación marca el paso hecho con el tilde y nada más, como el panel.
- ~~`preview/tipos` ya cumplió y hay que borrarlo.~~ **Borrado el 11/09/2026 con la promoción**, que era su condición. Era el banco de dieciocho direcciones que
  sirvió para elegir; la elección está hecha (Inter con `opsz`) y el banco sólo suma
  superficie que mantener. Se conserva mientras la decisión esté fresca por si el dueño
  quiere volver a comparar; en cuanto se promueva a `app/page.tsx`, se va.
- ~~Ocho huérfanas de una sola palabra.~~ **Cerrado el 09/09/2026**, y la lista había
  envejecido: remedida contra Inter y el marco de 1440, la mitad de las viejas ya no existía
  y había otras. Se cerraron tres con espacio duro —«cuando quieras.», «y programados», «tu
  cliente»— y se dejaron **a propósito** las seis que viven adentro de cadenas que citan al
  panel (las notas del prompt y las pistas de generación): un espacio duro ahí cambiaría una
  cita. Dos más eran falsos positivos de la sonda: `panel.nuvloapp.com.` es un token largo
  que llena su renglón, no una huérfana, y la burbuja del chat corta como corta un chat.
  A 320 aparecen otras seis; 320 es el piso declarado y ahí todo degrada.
- ~~El mail del cliente partido por su guión en Control.~~ **Cerrado el 09/09/2026**: a 1024
  la línea partía en «hola@muebleria-» / «lombardi.com». No era una huérfana tipográfica
  sino un dato ilegíble; `nowrap` sobre la dirección manda el corte al espacio anterior.
- ~~La ficha del cliente aplastada a 38px.~~ **Cerrado el 09/09/2026.** La fila 1 de Tres
  pasos declaraba `minmax(0, 1fr) auto` sin umbral y el período mide 292 fijos, así que la
  ficha se comía el resto: 38×686 a 390 y 430, 91 a 1024, 167 a 1100. Error mío del mismo
  día en que se escribió la regla que lo prohíbe. Se arregló con `flex-wrap` y no con una
  media query, porque el ancho de ese contenedor no es monótono con el viewport —a 899 da 710
  y a 1024 da 411—.
- ~~El párrafo del informe sin tope propio.~~ **Cerrado el 09/09/2026** con
  `--medida-doc: 27rem` sobre el resumen y la alerta: de 76–83 a 59–68 caracteres por
  línea. Esta línea decía «83–85 cuando el marco es fluido» y «56–62 en escritorio», y las
  dos cifras estaban mal por la misma sonda rota. **No hizo falta darle ancho fijo al
  documento**, que era la salida que esta línea proponía y que habría cambiado el objeto que
  el panel adopta: topear la prosa alcanza, y deja el banco y la tabla al ancho entero, que
  es lo correcto para datos.
- ~~El banco de KPI a 198px por debajo del pliegue.~~ **Cerrado el 09/09/2026**: el dueño
  eligió mover la posición de lectura. Hoy termina entre 128 y 254px por ENCIMA del pliegue.
- ~~El corte de la bandeja cae adentro de la tabla en teléfono.~~ **Cerrado el 09/09/2026**,
  y con él el corte horizontal, que no estaba anotado.
- ~~La tabla de métricas no entra en una ventana de teléfono.~~ **Cerrado el 09/09/2026**: el
  dueño eligió sacar «Anterior». Por `@container (min-width: 370px)` la columna se apaga
  entera y la separación entre celdas baja de 16 a 10; la tabla pasa de pedir 308px a pedir
  225 y entra sin scroll desde 360px de pantalla. **El cambio no se ve hoy en la landing** —el
  héroe corta antes de la tabla en todo el rango de teléfono—: es para el informe, que es lo
  que el cliente abre, y para el panel, que lo adopta después.
- ~~Por debajo de 360 la tabla sigue desbordando.~~ **No se reproduce** (medido el 19/09/2026 a 320 y 360: pide 233 y 273, y tiene 233 y 273). El contenedor de 179px que la línea cita era la ventana del héroe, que ya no muestra el informe. **Si se construye `/reporte`, hay que volver a medirlo ahí.**
- ~~La precarga de 54,3 KB de fuentes del mundo retirado.~~ **Cerrada el 11/09/2026**: era que `app/layout.tsx`
  declara Onest y Bricolage sin `preload: false` y les pone las variables al `<html>` en
  todas las rutas. Se cierra solo en la promoción; tocarlo antes le saca la precarga a la
  landing pública, que sí las usa arriba del pliegue.
