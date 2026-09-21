/**
 * LOS DOS BOTONES QUE PIDE LA LEY.
 *
 * La Disposición 954/2025 de la Subsecretaría de Defensa del Consumidor —derogó
 * la Resolución 424/2020— exige un «Botón de arrepentimiento» y un «Botón de
 * baja de servicio» «a simple vista, en lugar destacado y en el primer acceso».
 * Los formularios viven en el panel, que es el que tiene backend para dar el
 * código de identificación en el acto; el sitio sólo enlaza.
 *
 * Son una constante y no dos listas porque los usan dos piezas —el héroe, que
 * es lo que se ve en el primer acceso, y el pie, que es donde se los busca— y
 * dos copias de una URL legal son un desajuste esperando.
 *
 * El texto va literal: la norma los llama «botones» por nombre, y es por ese
 * nombre que alguien los busca.
 */
export const BOTONES_LEGALES = [
  {
    texto: "Botón de arrepentimiento",
    href: "https://panel.nuvloapp.com/boton-de-arrepentimiento",
  },
  {
    texto: "Botón de baja de servicio",
    href: "https://panel.nuvloapp.com/boton-de-baja",
  },
] as const;
