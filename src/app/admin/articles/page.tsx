import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function AdminArticlesPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Articles</h1>
      <p className="text-sm text-muted-foreground">
        Publish and edit posts via Supabase. Set status to &quot;published&quot; and
        add published_at for live articles.
      </p>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts?.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>
                  <Badge variant={p.status === "published" ? "default" : "secondary"}>
                    {p.status}
                  </Badge>
                </TableCell>
                <TableCell>{p.is_featured ? "Yes" : "—"}</TableCell>
                <TableCell>
                  {p.status === "published" && (
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/news/${p.slug}`}>View</Link>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )) ?? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No articles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
