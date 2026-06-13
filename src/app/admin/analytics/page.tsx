import { createClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/admin/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, UserPlus, ClipboardList } from "lucide-react";

export default async function AdminAnalyticsPage() {
  const supabase = await createClient();

  const [
    { count: referrals },
    { count: applications },
    { count: registrations },
  ] = await Promise.all([
    supabase.from("referrals").select("*", { count: "exact", head: true }),
    supabase
      .from("volunteer_applications")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase.from("event_registrations").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <p className="text-muted-foreground">
        Analytics-ready architecture — connect Google Analytics via{" "}
        <code className="text-xs">NEXT_PUBLIC_GA_MEASUREMENT_ID</code>.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Referrals"
          value={referrals ?? 0}
          icon={TrendingUp}
        />
        <StatCard
          title="Pending Applications"
          value={applications ?? 0}
          icon={ClipboardList}
        />
        <StatCard
          title="Event Registrations"
          value={registrations ?? 0}
          icon={UserPlus}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Growth Tracking</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Connect external analytics (GA4, Plausible, Vercel Analytics) for page
          views and conversion funnels. Member and referral data is stored in
          Supabase for movement-specific metrics.
        </CardContent>
      </Card>
    </div>
  );
}
