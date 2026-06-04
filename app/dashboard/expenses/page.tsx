import Link from "next/link";
import { createExpenseAction } from "@/lib/actions/finance-actions";
import { prisma } from "@/lib/prisma";
import { requireOwner } from "@/lib/security/permissions";
import { formatCurrency, formatDate } from "@/lib/utils";

const categories = ["RENT", "ELECTRICITY", "INTERNET", "PVC_MATERIAL", "PRINTING_COST", "SALARY", "MISCELLANEOUS"];

export default async function ExpensesPage() {
  await requireOwner();
  const expenses = await prisma.expense.findMany({ orderBy: { spentAt: "desc" }, take: 100 });
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">Expense Management</h1>
          <p className="mt-2 text-muted-foreground">Rent, electricity, internet, PVC material, printing cost, salary, and miscellaneous expenses.</p>
        </div>
        <Link className="focus-ring rounded-md border bg-white px-4 py-2 font-semibold" href="/api/reports/expenses?format=csv">Export Excel CSV</Link>
      </div>
      <div className="rounded-lg border bg-white p-5">
        <p className="text-sm font-semibold text-muted-foreground">Total expense in current table</p>
        <p className="mt-2 text-3xl font-black">{formatCurrency(total)}</p>
      </div>
      <section className="rounded-lg border bg-white p-5">
        <h2 className="text-xl font-black">Add expense</h2>
        <form action={createExpenseAction} className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <select name="category" defaultValue="MISCELLANEOUS">{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select>
          <input name="amount" type="number" min={1} step="0.01" placeholder="Amount" required />
          <input name="spentAt" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required />
          <input name="vendor" placeholder="Vendor" />
          <input name="notes" placeholder="Notes" />
          <button className="focus-ring bg-primary px-4 py-2 font-semibold text-primary-foreground xl:col-span-5">Save expense</button>
        </form>
      </section>
      <div className="table-scroll rounded-lg">
        <table>
          <thead><tr><th>Date</th><th>Category</th><th>Vendor</th><th>Amount</th><th>Notes</th></tr></thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{formatDate(expense.spentAt)}</td>
                <td>{expense.category}</td>
                <td>{expense.vendor || "-"}</td>
                <td>{formatCurrency(expense.amount.toString())}</td>
                <td>{expense.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
