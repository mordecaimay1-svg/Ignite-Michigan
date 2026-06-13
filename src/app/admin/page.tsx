import { createClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/admin/stat-card";
import { Users, Calendar, FileText, Mail } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: members },
    { count: events },
    { count: posts },
    { count: subscribers },
  ] = await Promise.all([
    supabase.from("member_profiles").select("*", { count: "exact", head: true }),
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("newsletters").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Overview</h1>
        <p className="text-muted-foreground">
          Manage members, content, and movement analytics.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Members" value={members ?? 0} icon={Users} />
        <StatCard title="Events" value={events ?? 0} icon={Calendar} />
        <StatCard title="Articles" value={posts ?? 0} icon={FileText} />
        <StatCard
          title="Newsletter"
          value={subscribers ?? 0}
          icon={Mail}
          description="Active subscribers"
        />
      </div>
    </div>
  );
}
