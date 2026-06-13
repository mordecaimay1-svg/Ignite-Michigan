import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getSessionUser, getMemberProfile } from "@/lib/auth";
import { StatCard } from "@/components/admin/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Share2, Calendar, Target } from "lucide-react";
import { SITE } from "@/lib/constants";

export default async function PortalDashboardPage() {
  const user = await getSessionUser();
  const profile = user ? await getMemberProfile(user.id) : null;
  const supabase = await createClient();

  let referralCount = 0;
  if (profile) {
    const { count } = await supabase
      .from("referrals")
      .select("*", { count: "exact", head: true })
      .eq("referrer_id", profile.id);
    referralCount = count ?? 0;
  }

  const referralLink = profile
    ? `${SITE.url}/auth/signup?ref=${profile.referral_code}`
    : "";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">
          Your home base for events, connections, and community involvement.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="People Invited"
          value={referralCount}
          icon={Users}
          description="Friends and contacts you've connected"
        />
        <StatCard
          title="Referral Code"
          value={profile?.referral_code ?? "—"}
          icon={Share2}
        />
        <StatCard
          title="County"
          value={profile?.county ?? "Not set"}
          icon={Target}
        />
        <StatCard
          title="Role"
          value={profile?.role ?? "member"}
          icon={Calendar}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Invite Link</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="break-all rounded-lg bg-muted p-3 text-sm font-mono">
              {referralLink || "Complete your profile to get a link"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Share this link to invite others who care about Michigan&apos;s future.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button asChild variant="outline">
              <Link href="/portal/referrals">View Connections</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/events">Browse Events</Link>
            </Button>
            <Button asChild className="btn-movement">
              <Link href="/get-involved">Take Action</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
