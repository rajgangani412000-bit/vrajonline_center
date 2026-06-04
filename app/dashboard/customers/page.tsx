import Link from "next/link";
import { CustomerStatus, Prisma } from "@prisma/client";
import { createCustomerAction, deleteCustomerAction, updateCustomerStatusAction } from "@/lib/actions/customer-actions";
import { prisma } from "@/lib/prisma";
import { canDeleteRecords, requireUser } from "@/lib/security/permissions";
import { formatDate } from "@/lib/utils";

const statuses = ["NEW", "PENDING", "IN_PROCESS", "APPROVED", "DELIVERED", "REJECTED"];

export default async function CustomersPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; status?: string; sort?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const where: Prisma.CustomerWhereInput = {
    AND: [
      params.q
        ? {
            OR: [
              { name: { contains: params.q, mode: "insensitive" } },
              { mobile: { contains: params.q, mode: "insensitive" } },
              { customerCode: { contains: params.q, mode: "insensitive" } }
            ]
          }
        : {},
      params.status ? { status: params.status as CustomerStatus } : {}
    ]
  };

  const [customers, services] = await Promise.all([
    prisma.customer.findMany({
      where,
      include: { service: true },
      orderBy: params.sort === "name" ? { name: "asc" } : { createdAt: "desc" },
      take: 100
    }),
    prisma.service.findMany({ where: { isActive: true }, orderBy: { name: "asc" } })
  ]);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">Customer CRM</h1>
          <p className="mt-2 text-muted-foreground">Search, filter, sort, export, and track service status.</p>
        </div>
        <Link className="focus-ring rounded-md border bg-white px-4 py-2 font-semibold" href="/api/reports/customers?format=csv">
          Export Excel CSV
        </Link>
      </div>

      <form className="grid gap-3 rounded-lg border bg-white p-4 md:grid-cols-[1fr_180px_160px_auto]">
        <input name="q" placeholder="Search name, mobile, ID" defaultValue={params.q || ""} />
        <select name="status" defaultValue={params.status || ""}>
          <option value="">All status</option>
          {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
        </select>
        <select name="sort" defaultValue={params.sort || ""}>
          <option value="">Newest</option>
          <option value="name">Name</option>
        </select>
        <button className="focus-ring bg-primary px-4 py-2 font-semibold text-primary-foreground">Apply</button>
      </form>

      <section className="rounded-lg border bg-white p-5">
        <h2 className="text-xl font-black">Create customer</h2>
        <form action={createCustomerAction} className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <input name="name" placeholder="Name" required />
          <input name="mobile" placeholder="Mobile" required />
          <input name="address" placeholder="Address" required />
          <select name="serviceId" required>
            {services.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}
          </select>
          <input name="documents" placeholder="Documents comma separated" />
          <input name="followUpDate" type="date" />
          <select name="status" defaultValue="NEW">
            {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
          <input name="notes" placeholder="Notes" />
          <button className="focus-ring bg-primary px-4 py-2 font-semibold text-primary-foreground md:col-span-2 xl:col-span-4">
            Save customer
          </button>
        </form>
      </section>

      <div className="table-scroll rounded-lg">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Service</th>
              <th>Follow-up</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.customerCode}</td>
                <td>{customer.name}</td>
                <td>{customer.mobile}</td>
                <td>{customer.service.name}</td>
                <td>{formatDate(customer.followUpDate)}</td>
                <td>
                  <form action={updateCustomerStatusAction} className="flex min-w-44 gap-2">
                    <input type="hidden" name="id" value={customer.id} />
                    <select name="status" defaultValue={customer.status}>
                      {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                    <button className="focus-ring border px-3 py-2 text-sm font-semibold">Save</button>
                  </form>
                </td>
                <td>
                  {canDeleteRecords(user.role) ? (
                    <form action={deleteCustomerAction}>
                      <input type="hidden" name="id" value={customer.id} />
                      <button className="focus-ring text-sm font-semibold text-destructive">Delete</button>
                    </form>
                  ) : (
                    <span className="text-sm text-muted-foreground">Staff access</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
