import Link from "next/link";
import { createPaymentAction } from "@/lib/actions/finance-actions";
import { prisma } from "@/lib/prisma";
import { requireOwner } from "@/lib/security/permissions";
import { formatCurrency, formatDate } from "@/lib/utils";

const methods = ["CASH", "UPI", "BANK"];

export default async function IncomePage() {
  await requireOwner();
  const [payments, customers, services] = await Promise.all([
    prisma.payment.findMany({ include: { customer: true, service: true }, orderBy: { paidAt: "desc" }, take: 100 }),
    prisma.customer.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.service.findMany({ orderBy: { name: "asc" } })
  ]);
  const total = payments.reduce((sum, payment) => sum + Number(payment.amount), 0);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">Income Management</h1>
          <p className="mt-2 text-muted-foreground">Owner-only financial records.</p>
        </div>
        <Link className="focus-ring rounded-md border bg-white px-4 py-2 font-semibold" href="/api/reports/income?format=csv">Export Excel CSV</Link>
      </div>
      <div className="rounded-lg border bg-white p-5">
        <p className="text-sm font-semibold text-muted-foreground">Total income in current table</p>
        <p className="mt-2 text-3xl font-black">{formatCurrency(total)}</p>
      </div>
      <section className="rounded-lg border bg-white p-5">
        <h2 className="text-xl font-black">Add income</h2>
        <form action={createPaymentAction} className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
          <select name="customerId" required>{customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}</select>
          <select name="serviceId" required>{services.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}</select>
          <input name="amount" type="number" min={1} step="0.01" placeholder="Amount" required />
          <input name="paidAt" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required />
          <select name="method" defaultValue="CASH">{methods.map((method) => <option key={method} value={method}>{method}</option>)}</select>
          <input name="notes" placeholder="Notes" />
          <button className="focus-ring bg-primary px-4 py-2 font-semibold text-primary-foreground xl:col-span-6">Save income</button>
        </form>
      </section>
      <div className="table-scroll rounded-lg">
        <table>
          <thead><tr><th>Date</th><th>Customer</th><th>Service</th><th>Method</th><th>Amount</th><th>Notes</th></tr></thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{formatDate(payment.paidAt)}</td>
                <td>{payment.customer.name}</td>
                <td>{payment.service.name}</td>
                <td>{payment.method}</td>
                <td>{formatCurrency(payment.amount.toString())}</td>
                <td>{payment.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
