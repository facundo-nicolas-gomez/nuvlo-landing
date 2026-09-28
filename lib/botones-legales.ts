/**
 * LOS DOS BOTONES QUE PIDE LA LEY.
 *
 * La Disposición 954/2025 de la Subsecretaría de Defensa del Consumidor —derogó
 * la Resolución 424/2020— exige un «Botón de arrepentimiento» y un «Botón de
 * baja de servicio» «a simple vista, en lugar destacado y en el primer acceso».
 * Los formularios viven en el panel, que es el que tiene backend para dar el
 * código de identificación en el acto; el sitio sólo enlaza.
 *
 * Cada uno es una constante propia porque **desde el 28/09/2026 las dos piezas
 * del sitio ya no muestran lo mismo**: la barra lleva sólo el de
 * arrepentimiento —decisión del dueño— y el pie sigue con los dos. Antes eran
 * una sola lista y las dos la recorrían entera.
 *
 * **Lo que eso cuesta está escrito y no se descubre acá**: la norma pide los
 * DOS «a simple vista, en lugar destacado y en el primer acceso», y la barra
 * era la única pieza del sitio que cumplía las tres a la vez. El pie no se ve
 * al entrar, así que el de baja pasó a estar sólo donde hay que buscarlo. El
 * porqué, y que es una decisión tomada sabiendo esto, en `PRODUCT.md`.
 *
 * El texto va literal: la norma los llama «botones» por nombre, y es por ese
 * nombre que alguien los busca.
 */
export const BOTON_ARREPENTIMIENTO = {
  texto: "Botón de arrepentimiento",
  href: "https://panel.nuvloapp.com/boton-de-arrepentimiento",
} as const;

export const BOTON_BAJA = {
  texto: "Botón de baja de servicio",
  href: "https://panel.nuvloapp.com/boton-de-baja",
} as const;

/** Los dos, en el orden en que la norma los nombra. Hoy sólo los usa el pie. */
export const BOTONES_LEGALES = [BOTON_ARREPENTIMIENTO, BOTON_BAJA] as const;
