import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: members } = await supabase
    .from("member_profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  const csvExport = `/api/admin/export?type=members`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Members</h1>
        <Button asChild variant="outline">
          <Link href={csvExport}>Export CSV</Link>
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>County</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Referral Code</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members?.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-medium">
                  {m.first_name} {m.last_name}
                </TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>{m.county ?? "—"}</TableCell>
                <TableCell>
                  <Badge variant={m.role === "admin" ? "default" : "secondary"}>
                    {m.role}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{m.referral_code}</TableCell>
                <TableCell>
                  {new Date(m.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            )) ?? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No members yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
