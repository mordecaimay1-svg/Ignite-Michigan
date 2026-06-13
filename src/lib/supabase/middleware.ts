import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function updateSession(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Supabase is optional for the public marketing site + HubSpot join form.
  // Without credentials, skip auth middleware instead of crashing (MIDDLEWARE_INVOCATION_FAILED).
  if (!isSupabaseConfigured()) {
    if (path.startsWith("/portal") || path.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/get-involved", request.url));
    }

    if (path === "/auth/signup" || path === "/auth/login") {
      return NextResponse.redirect(new URL("/get-involved", request.url));
    }

    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  try {
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isProtected =
      path.startsWith("/portal") || path.startsWith("/admin");
    const isAuthPage = path.startsWith("/auth");

    if (isProtected && !user) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("redirect", path);
      return NextResponse.redirect(url);
    }

    if (isAuthPage && user) {
      const url = request.nextUrl.clone();
      url.pathname = "/portal";
      return NextResponse.redirect(url);
    }

    if (path.startsWith("/admin") && user) {
      const adminEmails = (process.env.ADMIN_EMAILS ?? "")
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);

      const { data: profile } = await supabase
        .from("member_profiles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      const isAdmin =
        profile?.role === "admin" ||
        adminEmails.includes(user.email?.toLowerCase() ?? "");

      if (!isAdmin) {
        const url = request.nextUrl.clone();
        url.pathname = "/portal";
        return NextResponse.redirect(url);
      }
    }
  } catch (error) {
    console.error("[middleware] Supabase session update failed:", error);

    if (path.startsWith("/portal") || path.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/get-involved", request.url));
    }

    return NextResponse.next({ request });
  }

  return supabaseResponse;
}
