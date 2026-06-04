import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { requireUser } from "@/lib/security/permissions";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Dashboard | Vraj Online Center",
  robots: { index: false, follow: false }
};

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();

  return (
    <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[260px_1fr]">
      <AdminSidebar role={user.role} />
      <main className="min-w-0 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Signed in as {user.name}</p>
            <p className="text-xs font-bold uppercase text-accent">{user.role}</p>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
