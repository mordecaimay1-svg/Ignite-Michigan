"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  authLoginSchema,
  authSignupSchema,
  type AuthLoginInput,
  type AuthSignupInput,
} from "@/lib/validations/forms";

export type AuthResult = { success: boolean; message: string };

export async function signIn(input: AuthLoginInput): Promise<AuthResult> {
  const parsed = authLoginSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) return { success: false, message: error.message };
  redirect("/portal");
}

export async function signUp(input: AuthSignupInput): Promise<AuthResult> {
  const parsed = authSignupSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        first_name: parsed.data.firstName,
        last_name: parsed.data.lastName,
        county: parsed.data.county,
      },
    },
  });

  if (error) return { success: false, message: error.message };

  if (data.user && parsed.data.referralCode) {
    const { data: referrer } = await supabase
      .from("member_profiles")
      .select("id")
      .eq("referral_code", parsed.data.referralCode.toUpperCase())
      .single();

    if (referrer) {
      const { data: profile } = await supabase
        .from("member_profiles")
        .select("id")
        .eq("user_id", data.user.id)
        .single();

      if (profile) {
        await supabase
          .from("member_profiles")
          .update({ referred_by: referrer.id })
          .eq("id", profile.id);

        await supabase.from("referrals").insert({
          referrer_id: referrer.id,
          referred_id: profile.id,
        });
      }
    }
  }

  redirect("/portal");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
