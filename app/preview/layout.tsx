import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Contenedor de prototipos. No aporta estilo ni tipografía: cada dirección trae
 * las suyas en su propio layout, scopeadas bajo su clase raíz, para que se
 * puedan comparar sin que una contamine a la otra.
 */
export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
