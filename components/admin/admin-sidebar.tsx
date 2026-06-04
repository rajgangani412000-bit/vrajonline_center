import Link from "next/link";
import { BarChart3, BookOpen, CreditCard, FileDown, LayoutDashboard, LockKeyhole, Receipt, Settings, Users, WalletCards, Bell, Landmark } from "lucide-react";
import { Role } from "@prisma/client";
import { logoutAction } from "@/lib/actions/auth-actions";

const links = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["OWNER", "STAFF"] },
  { label: "Customers", href: "/dashboard/customers", icon: Users, roles: ["OWNER", "STAFF"] },
  { label: "Services", href: "/dashboard/services", icon: Landmark, roles: ["OWNER", "STAFF"] },
  { label: "PVC Cards", href: "/dashboard/pvc-cards", icon: CreditCard, roles: ["OWNER", "STAFF"] },
  { label: "Income", href: "/dashboard/income", icon: WalletCards, roles: ["OWNER"] },
  { label: "Expenses", href: "/dashboard/expenses", icon: Receipt, roles: ["OWNER"] },
  { label: "Reminders", href: "/dashboard/reminders", icon: Bell, roles: ["OWNER", "STAFF"] },
  { label: "Blog", href: "/dashboard/blog", icon: BookOpen, roles: ["OWNER"] },
  { label: "Reports", href: "/dashboard/reports", icon: FileDown, roles: ["OWNER"] },
  { label: "Users", href: "/dashboard/users", icon: LockKeyhole, roles: ["OWNER"] },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["OWNER"] },
  { label: "Analytics", href: "/dashboard#analytics", icon: BarChart3, roles: ["OWNER"] }
];

export function AdminSidebar({ role }: { role: Role }) {
  return (
    <aside className="border-r bg-white lg:min-h-screen">
      <div className="sticky top-0 p-4">
        <div className="rounded-lg bg-slate-950 p-4 text-white">
          <p className="text-xs uppercase text-slate-300">Private Admin</p>
          <h1 className="mt-1 text-xl font-black">Vraj OS</h1>
        </div>
        <nav className="mt-4 grid gap-1" aria-label="Admin navigation">
          {links
            .filter((link) => link.roles.includes(role))
            .map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href} className="focus-ring flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-muted">
                  <Icon className="size-4" aria-hidden />
                  {link.label}
                </Link>
              );
            })}
        </nav>
        <form action={logoutAction} className="mt-4">
          <button className="focus-ring w-full border px-3 py-2 text-sm font-semibold text-slate-700">
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
