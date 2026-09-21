/** Precios de marketing (USD). El cobro real lo define Paddle en el panel. */
export const PRECIO_ESTANDAR_USD = 39;
export const PRECIO_WHITE_LABEL_USD = 69;

// SIEMPRE con la moneda escrita. Ver «nunca sin su moneda» en `Precios.tsx`: un
// `$` pelado es incorrecto por uno o dos órdenes de magnitud fuera de EE.UU., y
// el alcance declarado en PRODUCT.md es LatAm. Por eso acá no hay una variante
// con el signo solo: no existe el caso de uso que la justifique.
export const PRECIO_ESTANDAR_LABEL = `USD ${PRECIO_ESTANDAR_USD}`;
export const PRECIO_WHITE_LABEL_LABEL = `USD ${PRECIO_WHITE_LABEL_USD}`;
