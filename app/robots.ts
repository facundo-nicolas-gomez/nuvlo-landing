import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://nuvloapp.com/sitemap.xml",
    host: "https://nuvloapp.com",
  };
}
