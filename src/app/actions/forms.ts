"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { syncContactToHubSpot } from "@/lib/hubspot";
import { sendTransactionalEmail } from "@/lib/resend";
import { rateLimit } from "@/lib/rate-limit";
import {
  newsletterSchema,
  volunteerSchema,
  eventRsvpSchema,
  type NewsletterInput,
  type VolunteerInput,
  type EventRsvpInput,
} from "@/lib/validations/forms";

export type ActionResult = {
  success: boolean;
  message: string;
};

export async function subscribeNewsletter(
  input: NewsletterInput
): Promise<ActionResult> {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const limit = rateLimit(`newsletter:${parsed.data.email}`, 3, 300_000);
  if (!limit.success) {
    return { success: false, message: "Too many attempts. Please try again later." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("newsletters").upsert(
    {
      email: parsed.data.email,
      first_name: parsed.data.firstName,
      county: parsed.data.county,
      is_active: true,
    },
    { onConflict: "email" }
  );

  if (error) {
    return { success: false, message: "Could not subscribe. Please try again." };
  }

  await syncContactToHubSpot({
    email: parsed.data.email,
    firstname: parsed.data.firstName,
    county: parsed.data.county,
    lifecyclestage: "subscriber",
    lead_source: "website_newsletter",
  });

  revalidatePath("/");
  return { success: true, message: "You're subscribed. Welcome to the movement!" };
}

export async function submitVolunteerApplication(
  input: VolunteerInput
): Promise<ActionResult> {
  const parsed = volunteerSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const limit = rateLimit(`volunteer:${parsed.data.email}`, 5, 300_000);
  if (!limit.success) {
    return { success: false, message: "Too many attempts. Please try again later." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("volunteer_applications").insert({
    first_name: parsed.data.firstName,
    last_name: parsed.data.lastName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    county: parsed.data.county,
    type: parsed.data.type,
    message: parsed.data.message,
  });

  if (error) {
    return { success: false, message: "Submission failed. Please try again." };
  }

  await syncContactToHubSpot({
    email: parsed.data.email,
    firstname: parsed.data.firstName,
    lastname: parsed.data.lastName,
    phone: parsed.data.phone,
    county: parsed.data.county,
    lifecyclestage: "lead",
    lead_source: `volunteer_${parsed.data.type}`,
  });

  await sendTransactionalEmail({
    to: parsed.data.email,
    subject: "Thank you for stepping up — Ignite Michigan",
    html: `<p>Hi ${parsed.data.firstName},</p><p>We received your application to serve with Ignite Michigan. A team member will contact you soon.</p>`,
  });

  revalidatePath("/get-involved");
  return { success: true, message: "Application submitted. We'll be in touch soon!" };
}

export async function registerForEvent(
  input: EventRsvpInput
): Promise<ActionResult> {
  const parsed = eventRsvpSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("event_registrations").insert({
    event_id: parsed.data.eventId,
    user_id: user?.id ?? null,
    first_name: parsed.data.firstName,
    last_name: parsed.data.lastName,
    email: parsed.data.email,
    phone: parsed.data.phone,
  });

  if (error) {
    if (error.code === "23505") {
      return { success: false, message: "You're already registered for this event." };
    }
    return { success: false, message: "Registration failed. Please try again." };
  }

  revalidatePath("/events");
  return { success: true, message: "You're registered! Check your email for details." };
}
