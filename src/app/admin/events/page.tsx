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
import { format } from "date-fns";

export default async function AdminEventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("starts_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        <p className="text-sm text-muted-foreground">
          Manage events in Supabase Table Editor or add an admin create form.
        </p>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events?.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.title}</TableCell>
                <TableCell>
                  {format(new Date(e.starts_at), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="capitalize">{e.event_type}</TableCell>
                <TableCell>
                  <Badge
                    variant={e.status === "published" ? "default" : "secondary"}
                  >
                    {e.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {e.status === "published" && (
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/events/${e.slug}`}>View</Link>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )) ?? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No events
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
