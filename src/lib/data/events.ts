import { createClient } from "@/lib/supabase/server";
import type { Event } from "@/types/database";

export async function getPublishedEvents(): Promise<Event[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("status", "published")
      .order("starts_at", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    return data;
  } catch {
    return null;
  }
}
