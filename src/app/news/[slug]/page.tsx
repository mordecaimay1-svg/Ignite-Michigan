import { notFound } from "next/navigation";
import { format } from "date-fns";
import { SiteLayout } from "@/components/layout/site-layout";
import { Badge } from "@/components/ui/badge";
import { createMetadata } from "@/lib/metadata";
import { getPostBySlug } from "@/lib/data/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return createMetadata({ title: "Article Not Found", noIndex: true });
  return createMetadata({
    title: post.seo_title ?? post.title,
    description: post.seo_description ?? post.excerpt ?? undefined,
    path: `/news/${slug}`,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const category = (post as { category?: { name: string } | null }).category;

  return (
    <SiteLayout>
      <article className="pb-20 pt-32">
        <header className="mx-auto max-w-3xl px-4 sm:px-6">
          {category && (
            <Badge variant="secondary" className="mb-4">
              {category.name}
            </Badge>
          )}
          <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
          {post.published_at && (
            <time className="mt-4 block text-muted-foreground">
              {format(new Date(post.published_at), "MMMM d, yyyy")}
            </time>
          )}
        </header>
        <div className="prose prose-neutral dark:prose-invert mx-auto mt-12 max-w-3xl px-4 sm:px-6">
          <div className="whitespace-pre-wrap text-lg leading-relaxed">
            {post.content}
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
