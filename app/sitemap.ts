import type { MetadataRoute } from "next";
import { blogSeed, business } from "@/lib/seed-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/required-documents",
    "/government-schemes",
    "/job-updates",
    "/admissions",
    "/blog",
    "/contact",
    ...blogSeed.map((post) => `/blog/${post.slug}`)
  ];

  return routes.map((route) => ({
    url: `${business.baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes("blog") ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.75
  }));
}
