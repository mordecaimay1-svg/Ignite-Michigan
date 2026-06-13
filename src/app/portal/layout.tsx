import { PortalSidebar } from "@/components/portal/portal-sidebar";
import { getSessionUser, getMemberProfile } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/auth/login?redirect=/portal");

  const profile = await getMemberProfile(user.id);

  return (
    <div className="flex min-h-screen">
      <PortalSidebar />
      <div className="flex-1 overflow-auto">
        <header className="border-b bg-background px-8 py-4">
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h1 className="text-xl font-semibold">
            {profile
              ? `${profile.first_name} ${profile.last_name}`
              : user.email}
          </h1>
        </header>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
