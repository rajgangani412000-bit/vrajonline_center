import { createUserAction } from "@/lib/actions/user-actions";
import { prisma } from "@/lib/prisma";
import { requireOwner } from "@/lib/security/permissions";
import { formatDate } from "@/lib/utils";

export default async function UsersPage() {
  await requireOwner();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-black">User Management</h1>
        <p className="mt-2 text-muted-foreground">Owner can create staff users and owner users.</p>
      </div>
      <section className="rounded-lg border bg-white p-5">
        <h2 className="text-xl font-black">Create user</h2>
        <form action={createUserAction} className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <input name="name" placeholder="Name" required />
          <input name="email" type="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Temporary password" required minLength={12} />
          <select name="role" defaultValue="STAFF"><option value="STAFF">Staff</option><option value="OWNER">Owner</option></select>
          <button className="focus-ring bg-primary px-4 py-2 font-semibold text-primary-foreground">Create</button>
        </form>
      </section>
      <div className="table-scroll rounded-lg">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Force Change</th><th>Created</th></tr></thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.forcePasswordChange ? "Yes" : "No"}</td>
                <td>{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
