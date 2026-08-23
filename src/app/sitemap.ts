import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { posts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/journey", "/events", "/trust", "/membership", "/quiz", "/journal", "/join"];

  const pageEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const journalEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/journal/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pageEntries, ...journalEntries];
}
