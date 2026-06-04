import type { MetadataRoute } from "next";
import { business } from "@/lib/seed-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/secure-admin-login"]
    },
    sitemap: `${business.baseUrl}/sitemap.xml`
  };
}
