import { SiteLayout } from "@/components/layout/site-layout";
import { ArticleCard } from "@/components/cards/article-card";
import { FadeIn } from "@/components/motion/fade-in";
import { createMetadata } from "@/lib/metadata";
import { getPublishedPosts } from "@/lib/data/posts";

export const metadata = createMetadata({
  title: "News & Articles",
  description: "Movement updates, civic engagement guides, and faith & culture articles.",
  path: "/news",
});

const FALLBACK_POSTS = [
  {
    id: "1",
    title: "Welcome to the Movement",
    slug: "welcome-to-the-movement",
    excerpt: "Why Ignite Michigan exists and how you can take your first step.",
    content: "",
    cover_image: null,
    author_id: null,
    category_id: null,
    status: "published" as const,
    is_featured: true,
    seo_title: null,
    seo_description: null,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: "1", name: "Movement Updates", slug: "movement-updates", description: null, created_at: "" },
  },
];

export default async function NewsPage() {
  const posts = await getPublishedPosts();
  const display = posts.length ? posts : FALLBACK_POSTS;
  const featured = display.find((p) => p.is_featured);
  const rest = display.filter((p) => p.id !== featured?.id);

  return (
    <SiteLayout>
      <section className="bg-hero-gradient pb-16 pt-32 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-4xl font-bold">News & Articles</h1>
            <p className="mt-4 max-w-xl text-white/80">
              Education, updates, and resources for engaged citizens.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          {featured && (
            <FadeIn className="mb-12">
              <ArticleCard
                post={featured}
                categoryName={featured.category?.name}
              />
            </FadeIn>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <FadeIn key={post.id} delay={i * 0.05}>
                <ArticleCard
                  post={post}
                  categoryName={post.category?.name}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
