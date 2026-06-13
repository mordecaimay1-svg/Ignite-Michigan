import { createClient } from "@/lib/supabase/server";
import { getSessionUser, getMemberProfile } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function ReferralsPage() {
  const user = await getSessionUser();
  const profile = user ? await getMemberProfile(user.id) : null;
  const supabase = await createClient();

  let referred: { first_name: string; last_name: string; created_at: string }[] =
    [];

  if (profile) {
    const { data: refs } = await supabase
      .from("referrals")
      .select("referred_id")
      .eq("referrer_id", profile.id);

    if (refs?.length) {
      const ids = refs.map((r) => r.referred_id);
      const { data: members } = await supabase
        .from("member_profiles")
        .select("first_name, last_name, created_at")
        .in("id", ids);
      referred = members ?? [];
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Your Connections</h2>
        <p className="text-muted-foreground">
          People you&apos;ve invited to join the Ignite Michigan community.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invited Members</CardTitle>
        </CardHeader>
        <CardContent>
          {referred.length === 0 ? (
            <p className="text-muted-foreground">
              No connections yet. Share your invite link from the dashboard.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referred.map((m, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      {m.first_name} {m.last_name}
                    </TableCell>
                    <TableCell>
                      {new Date(m.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
