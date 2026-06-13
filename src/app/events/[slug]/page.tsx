import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Calendar, MapPin, Video } from "lucide-react";
import { SiteLayout } from "@/components/layout/site-layout";
import { EventRsvpForm } from "@/components/forms/event-rsvp-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createMetadata } from "@/lib/metadata";
import { getEventBySlug } from "@/lib/data/events";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return createMetadata({ title: "Event Not Found", noIndex: true });
  return createMetadata({
    title: event.title,
    description: event.description ?? undefined,
    path: `/events/${slug}`,
  });
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <SiteLayout>
      <section className="bg-hero-gradient pb-12 pt-32 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-[var(--gold)] text-[var(--navy)]">
            {event.category ?? event.event_type}
          </Badge>
          <h1 className="text-3xl font-bold sm:text-4xl">{event.title}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-white/80">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {format(new Date(event.starts_at), "EEEE, MMMM d, yyyy · h:mm a")}
            </span>
            {event.location && (
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {event.location}
              </span>
            )}
            {(event.event_type === "zoom" || event.zoom_url) && (
              <span className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Zoom / Online
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {event.description && (
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            )}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>RSVP</CardTitle>
            </CardHeader>
            <CardContent>
              <EventRsvpForm eventId={event.id} />
            </CardContent>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}
