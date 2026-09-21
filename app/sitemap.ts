import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nuvloapp.com";
  const lastModified = new Date();

  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    // `/reporte` va antes que las legales y con prioridad alta: es la única de
    // las cinco que argumenta, y muestra el objeto que el sitio vende.
    { url: `${base}/reporte`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/terminos`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacidad`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/reembolsos`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
