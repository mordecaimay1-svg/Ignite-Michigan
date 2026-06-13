import { NextResponse } from "next/server";
import { submitJoinContactToHubSpot } from "@/lib/hubspot/join-contact";
import { rateLimit } from "@/lib/rate-limit";
import { joinIgniteSchema } from "@/lib/validations/join";

/**
 * POST /api/join — Join Ignite Michigan form
 *
 * HubSpot-only flow (no Supabase, no database):
 *   1. Rate-limit by IP
 *   2. Validate body with Zod
 *   3. Upsert contact in HubSpot via HUBSPOT_ACCESS_TOKEN
 *
 * Required env var: HUBSPOT_ACCESS_TOKEN
 */
export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const limit = rateLimit(`api:join:${ip}`, 5, 300_000);
  if (!limit.success) {
    return NextResponse.json(
      { success: false, message: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = joinIgniteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: parsed.error.issues[0]?.message ?? "Invalid input",
      },
      { status: 400 }
    );
  }

  const hubspot = await submitJoinContactToHubSpot(parsed.data);

  if (!hubspot.ok) {
    const status = hubspot.error.includes("not configured") ? 503 : 502;
    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn't save your submission right now. Please try again or email us directly.",
      },
      { status }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Thank you for joining Ignite Michigan! We'll be in touch soon.",
  });
}
