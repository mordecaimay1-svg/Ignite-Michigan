import Link from "next/link";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { BlogPost } from "@/types/database";

type ArticleCardProps = {
  post: BlogPost;
  categoryName?: string;
};

export function ArticleCard({ post, categoryName }: ArticleCardProps) {
  return (
    <Card className="group h-full overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        {post.is_featured && (
          <Badge className="mb-2 w-fit bg-[var(--gold)] text-[var(--navy)]">
            Featured
          </Badge>
        )}
        {categoryName && (
          <Badge variant="secondary" className="mb-2 w-fit">
            {categoryName}
          </Badge>
        )}
        <Link href={`/news/${post.slug}`}>
          <h3 className="text-lg font-semibold transition-colors group-hover:text-[var(--gold)]">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent>
        {post.excerpt && (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {post.excerpt}
          </p>
        )}
        {post.published_at && (
          <p className="mt-4 text-xs text-muted-foreground">
            {format(new Date(post.published_at), "MMMM d, yyyy")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
