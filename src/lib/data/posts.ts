import { createClient } from "@/lib/supabase/server";
import type { BlogPost, Category } from "@/types/database";

export async function getPublishedPosts(): Promise<
  (BlogPost & { category?: Category | null })[]
> {
  try {
    const supabase = await createClient();
    const { data: posts } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (!posts?.length) return [];

    const categoryIds = [...new Set(posts.map((p) => p.category_id).filter(Boolean))];
    const { data: categories } = categoryIds.length
      ? await supabase.from("categories").select("*").in("id", categoryIds as string[])
      : { data: [] as Category[] };

    const categoryMap = new Map((categories ?? []).map((c) => [c.id, c]));

    return posts.map((post) => ({
      ...post,
      category: post.category_id ? categoryMap.get(post.category_id) ?? null : null,
    }));
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const supabase = await createClient();
    const { data: post } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (!post) return null;

    let category: Category | null = null;
    if (post.category_id) {
      const { data: cat } = await supabase
        .from("categories")
        .select("*")
        .eq("id", post.category_id)
        .single();
      category = cat;
    }

    return { ...post, category };
  } catch {
    return null;
  }
}
