import Link from "next/link";
import { format } from "date-fns";
import { Calendar, MapPin, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types/database";

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  const isZoom = event.event_type === "zoom" || event.event_type === "hybrid";

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="capitalize">
            {event.category ?? event.event_type}
          </Badge>
          {isZoom && (
            <Video className="h-4 w-4 text-muted-foreground" aria-label="Zoom event" />
          )}
        </div>
        <h3 className="mt-2 text-lg font-semibold leading-snug">{event.title}</h3>
      </CardHeader>
      <CardContent className="flex-1 space-y-2 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0" />
          {format(new Date(event.starts_at), "EEEE, MMM d · h:mm a")}
        </p>
        {event.location && (
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" />
            {event.location}
          </p>
        )}
        {event.description && (
          <p className="line-clamp-2 pt-1">{event.description}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/events/${event.slug}`}>View & RSVP</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
