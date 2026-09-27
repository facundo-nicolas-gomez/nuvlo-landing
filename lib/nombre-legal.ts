/**
 * QUIÉN PRESTA EL SERVICIO, CON NOMBRE Y APELLIDO.
 *
 * Nuvlo es una marca, no una persona: atrás hay un titular humano —no una
 * sociedad— y hasta el 27/09/2026 el sitio no lo decía en ninguna parte. Eso
 * costó caro: **Meta rechazó la verificación del negocio** porque el nombre
 * legal declarado en Business Manager no aparecía en el sitio web, que es el
 * cruce que hace su revisor. Sin verificación no hay acceso a la API que el
 * producto necesita, así que este dato no es una cortesía legal: es un
 * requisito de operación.
 *
 * ── DÓNDE, Y EN QUÉ TONO ───────────────────────────────────────────────────
 * En el copyright del pie, que va en todas las páginas, y en el bloque de
 * contacto de los Términos y la Privacidad. **En ninguno de los tres es una
 * frase que se anuncie**: fue «Nuvlo es un servicio de …», en el pie y en la
 * apertura de los Términos, y el dueño la rechazó por sonar a declaración. Un
 * nombre legal adentro de un copyright o de un bloque de contacto informa a
 * quien lo busca sin interrumpir a nadie. Lo que no cambia es que es texto
 * plano y visible: escondido —en un `meta`, en texto oculto— no sirve para lo
 * único que lo motivó.
 *
 * Es una constante y no tres strings porque un nombre legal escrito tres veces
 * es un desajuste esperando: si el titular pasa a ser una sociedad, los tres
 * tienen que cambiar juntos o el cruce de Meta vuelve a fallar por el que quedó
 * atrás. El gemelo del panel —`nuvlo-panel/src/lib/nombre-legal.ts`— declara la
 * misma cadena y nada la cruza con ésta: se cambian en la misma tanda.
 *
 * El nombre va completo y tal cual el documento —los dos nombres y el
 * apellido, con la tilde—: el revisor compara contra la documentación, y
 * «Facundo Gómez» no es lo que ahí figura.
 */
export const NOMBRE_LEGAL = "Facundo Nicolás Gómez";
