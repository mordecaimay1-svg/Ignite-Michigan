import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSessionUser, isAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  const user = await getSessionUser();
  if (!user || !(await isAdmin(user.id, user.email))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") ?? "members";

  const supabase = await createClient();

  if (type === "members") {
    const { data } = await supabase.from("member_profiles").select("*");
    const headers = [
      "first_name",
      "last_name",
      "email",
      "county",
      "role",
      "referral_code",
      "created_at",
    ];
    const rows = (data ?? []).map((m) =>
      headers.map((h) => JSON.stringify((m as Record<string, unknown>)[h] ?? "")).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="ignite-michigan-members.csv"',
      },
    });
  }

  return NextResponse.json({ error: "Unknown export type" }, { status: 400 });
}
