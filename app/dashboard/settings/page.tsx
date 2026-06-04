import { prisma } from "@/lib/prisma";
import { requireOwner } from "@/lib/security/permissions";

export default async function SettingsPage() {
  await requireOwner();
  const settings = await prisma.systemSetting.findMany({ orderBy: { key: "asc" } });
  const auditLogs = await prisma.auditLog.findMany({ include: { actor: true }, orderBy: { createdAt: "desc" }, take: 30 });

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-black">System Settings</h1>
        <p className="mt-2 text-muted-foreground">Owner-only business profile and audit trail.</p>
      </div>
      <section className="rounded-lg border bg-white p-5">
        <h2 className="text-xl font-black">Settings</h2>
        <div className="mt-4 grid gap-3">
          {settings.map((setting) => (
            <div key={setting.id} className="rounded-md border bg-slate-50 p-3">
              <p className="font-bold">{setting.key}</p>
              <pre className="mt-2 overflow-x-auto text-sm text-muted-foreground">{JSON.stringify(setting.value, null, 2)}</pre>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-lg border bg-white p-5">
        <h2 className="text-xl font-black">Audit logs</h2>
        <div className="mt-4 table-scroll rounded-lg">
          <table>
            <thead><tr><th>Time</th><th>Actor</th><th>Action</th><th>Entity</th></tr></thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.createdAt.toLocaleString("en-IN")}</td>
                  <td>{log.actor?.email || "System"}</td>
                  <td>{log.action}</td>
                  <td>{log.entity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
