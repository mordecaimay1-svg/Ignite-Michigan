import { SiteLayout } from "@/components/layout/site-layout";
import { EventCard } from "@/components/cards/event-card";
import { FadeIn } from "@/components/motion/fade-in";
import { createMetadata } from "@/lib/metadata";
import { getPublishedEvents } from "@/lib/data/events";
import type { Event } from "@/types/database";

export const metadata = createMetadata({
  title: "Events",
  description: "Upcoming Ignite Michigan events, Zoom meetings, and trainings.",
  path: "/events",
});

const FALLBACK: Event[] = [
  {
    id: "1",
    title: "Statewide Launch Zoom",
    slug: "statewide-launch-zoom",
    description: "Monthly movement briefing for all members.",
    event_type: "zoom",
    status: "published",
    location: null,
    zoom_url: "https://zoom.us",
    starts_at: new Date(Date.now() + 7 * 86400000).toISOString(),
    ends_at: null,
    capacity: 500,
    category: "Briefing",
    cover_image: null,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default async function EventsPage() {
  const events = (await getPublishedEvents()) || FALLBACK;
  const upcoming = events.filter(
    (e) => new Date(e.starts_at) >= new Date()
  );

  return (
    <SiteLayout>
      <section className="bg-hero-gradient pb-16 pt-32 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-4xl font-bold">Events</h1>
            <p className="mt-4 max-w-xl text-white/80">
              Zoom briefings, county trainings, and statewide gatherings.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          {upcoming.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No upcoming events. Check back soon.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event, i) => (
                <FadeIn key={event.id} delay={i * 0.05}>
                  <EventCard event={event} />
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
