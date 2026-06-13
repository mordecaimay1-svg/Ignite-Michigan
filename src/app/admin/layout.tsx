import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getSessionUser, isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/auth/login?redirect=/admin");

  const admin = await isAdmin(user.id, user.email);
  if (!admin) redirect("/portal");

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
