import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getSessionUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { Event } from "@/types/database";

export default async function PortalEventsPage() {
  const user = await getSessionUser();
  const supabase = await createClient();

  const { data: registrations } = await supabase
    .from("event_registrations")
    .select("*")
    .eq("user_id", user?.id ?? "")
    .order("created_at", { ascending: false });

  const eventIds = [...new Set((registrations ?? []).map((r) => r.event_id))];
  const { data: events } = eventIds.length
    ? await supabase.from("events").select("id, title, slug, starts_at").in("id", eventIds)
    : { data: [] as Pick<Event, "id" | "title" | "slug" | "starts_at">[] };

  const eventMap = new Map((events ?? []).map((e) => [e.id, e]));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Event Registrations</h2>
        <Button asChild variant="outline">
          <Link href="/events">Browse Events</Link>
        </Button>
      </div>

      {!registrations?.length ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            You haven&apos;t registered for any events yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {registrations.map((reg) => {
            const event = eventMap.get(reg.event_id);
            if (!event) return null;
            return (
              <Card key={reg.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(event.starts_at), "MMM d, yyyy · h:mm a")}
                  </p>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/events/${event.slug}`}>View</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
