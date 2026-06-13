import { createClient } from "@/lib/supabase/server";

export async function getSessionUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getMemberProfile(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("member_profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
  return data;
}

export async function isAdmin(userId: string, email?: string | null) {
  const profile = await getMemberProfile(userId);
  if (profile?.role === "admin") return true;

  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return adminEmails.includes(email?.toLowerCase() ?? "");
}
