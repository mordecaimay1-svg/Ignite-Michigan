import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { EventCard } from "@/components/cards/event-card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import type { Event } from "@/types/database";

const FALLBACK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Statewide Launch Zoom",
    slug: "statewide-launch-zoom",
    description: "Join leaders from across Michigan for our monthly movement briefing.",
    event_type: "zoom",
    status: "published",
    location: null,
    zoom_url: null,
    starts_at: new Date(Date.now() + 7 * 86400000).toISOString(),
    ends_at: null,
    capacity: 500,
    category: "Briefing",
    cover_image: null,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "County Chapter Training",
    slug: "county-chapter-training",
    description: "Learn how to launch and lead a county chapter in your community.",
    event_type: "hybrid",
    status: "published",
    location: "Lansing, MI",
    zoom_url: null,
    starts_at: new Date(Date.now() + 14 * 86400000).toISOString(),
    ends_at: null,
    capacity: 100,
    category: "Training",
    cover_image: null,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function EventsPreviewSection() {
  let events = FALLBACK_EVENTS;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("status", "published")
      .gte("starts_at", new Date().toISOString())
      .order("starts_at", { ascending: true })
      .limit(3);

    if (data?.length) events = data;
  } catch {
    // Use fallback when Supabase is not configured
  }

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--ember)]">
              Upcoming Events
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] sm:text-4xl">
              Take action. Show up. Make a difference.
            </h2>
          </div>
          <Button asChild variant="outline" className="border-[var(--navy)]/20">
            <Link href="/events">View All Events</Link>
          </Button>
        </FadeIn>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => (
            <FadeIn key={event.id} delay={i * 0.1}>
              <EventCard event={event} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
