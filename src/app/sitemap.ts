import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/movement",
    "/events",
    "/get-involved",
    "/contact",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const supabase = await createClient();
    const [{ data: events }, { data: posts }] = await Promise.all([
      supabase.from("events").select("slug, updated_at").eq("status", "published"),
      supabase.from("blog_posts").select("slug, updated_at").eq("status", "published"),
    ]);

    dynamicRoutes = [
      ...(events ?? []).map((e) => ({
        url: `${SITE.url}/events/${e.slug}`,
        lastModified: new Date(e.updated_at),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
      ...(posts ?? []).map((p) => ({
        url: `${SITE.url}/news/${p.slug}`,
        lastModified: new Date(p.updated_at),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    // Supabase not configured
  }

  return [...staticRoutes, ...dynamicRoutes];
}
