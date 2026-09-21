import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";

/**
 * EL BOTÓN DE shadcn/ui, ADAPTADO A LOS TOKENS DE LA LANDING.
 *
 * ── QUÉ SE TOMÓ DE LA BIBLIOTECA ────────────────────────────────────────────
 * La estructura y el comportamiento, que es lo que vale la pena no volver a
 * escribir: el sistema de variantes de `cva`, `asChild` con el `Slot` de Radix
 * —que deja usar el mismo botón como `<button>` o envolviendo un ancla sin
 * anidar dos elementos interactivos—, el `data-slot` para poder apuntarle
 * desde afuera, el apagado de eventos en `disabled`, y las reglas de `[&_svg]`
 * que evitan que un ícono capture el click o se deforme.
 *
 * ── QUÉ SE DEJÓ AFUERA, A PROPÓSITO ─────────────────────────────────────────
 * **Su escala de color y su escala tipográfica, enteras.** El archivo que
 * genera el CLI trae la paleta de shadcn escrita a mano (`bg-oklch(0.205 0 0)`
 * y compañía), sus tamaños (`text-sm`, `h-9`), su radio (`rounded-md`) y sus
 * variantes de modo oscuro. Nada de eso entra: esta página tiene su propia
 * paleta, su propia rampa y un solo radio para lo que se toca. Traer las dos
 * escalas habría significado tener dos sistemas discutiendo en el mismo botón.
 *
 * ── DE DÓNDE SALE LA PIEL, ENTONCES ─────────────────────────────────────────
 * De `.f-boton` y `.f-boton-chico`, que ya existen en `base.css` y son la
 * única definición del botón de esta landing: color, relleno, cuerpo, sombra,
 * el disco de la flecha y el radio `--radio-int` —el mismo de las piezas del
 * reporte—. Acá esas clases entran como el valor de las variantes, así que la
 * biblioteca aporta el andamiaje y la landing sigue aportando el diseño, con
 * un solo lugar donde cambiarlo.
 *
 * Tampoco se declaran `outline-none` ni un anillo de foco propio: el anillo
 * sale de `.firma :focus-visible`, y pisarlo acá dejaría una parada de
 * tabulación sin marcar, que es un piso no negociable del proyecto.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solido: "f-boton",
      },
      size: {
        normal: "",
        chico: "f-boton-chico",
      },
    },
    defaultVariants: {
      variant: "solido",
      size: "normal",
    },
  },
);

function Button({
  className,
  variant = "solido",
  size = "normal",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
