import { NextResponse } from "next/server";
import { subscribeNewsletter } from "@/app/actions/forms";
import { newsletterSchema } from "@/lib/validations/forms";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  const limit = rateLimit(`api:newsletter:${ip}`, 5, 60_000);
  if (!limit.success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const body = await request.json();
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message },
      { status: 400 }
    );
  }

  const result = await subscribeNewsletter(parsed.data);
  return NextResponse.json(result, {
    status: result.success ? 200 : 400,
  });
}
