import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatCard } from "@/components/admin/stat-card";
import { ProfitChart } from "@/components/admin/profit-chart";
import { canViewFinancials, requireUser } from "@/lib/security/permissions";

function monthKey(date: Date) {
  return date.toLocaleString("en-IN", { month: "short" });
}

export default async function DashboardPage() {
  const user = await requireUser();
  const [customers, applications, pvcOrders, reminders, enquiries, payments, expenses] = await Promise.all([
    prisma.customer.findMany({ include: { service: true }, orderBy: { createdAt: "desc" }, take: 8 }),
    prisma.serviceApplication.count(),
    prisma.pvcOrder.count({ where: { status: "PRINT_QUEUE" } }),
    prisma.reminder.findMany({ where: { isCompleted: false }, orderBy: { dueAt: "asc" }, take: 6 }),
    prisma.enquiry.findMany({ where: { isHandled: false }, orderBy: { createdAt: "desc" }, take: 6 }),
    canViewFinancials(user.role) ? prisma.payment.findMany({ orderBy: { paidAt: "asc" } }) : Promise.resolve([]),
    canViewFinancials(user.role) ? prisma.expense.findMany({ orderBy: { spentAt: "asc" } }) : Promise.resolve([])
  ]);

  const totalIncome = payments.reduce((sum, row) => sum + Number(row.amount), 0);
  const totalExpenses = expenses.reduce((sum, row) => sum + Number(row.amount), 0);
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index));
    return { label: monthKey(date), income: 0, expenses: 0, profit: 0, month: date.getMonth(), year: date.getFullYear() };
  });
  for (const row of payments) {
    const bucket = months.find((item) => item.month === row.paidAt.getMonth() && item.year === row.paidAt.getFullYear());
    if (bucket) bucket.income += Number(row.amount);
  }
  for (const row of expenses) {
    const bucket = months.find((item) => item.month === row.spentAt.getMonth() && item.year === row.spentAt.getFullYear());
    if (bucket) bucket.expenses += Number(row.amount);
  }
  const chartData = months.map(({ label, income, expenses: expenseValue }) => ({
    label,
    income,
    expenses: expenseValue,
    profit: income - expenseValue
  }));

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-black">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Customer activity, service tracking, reminders, PVC queue, and financial summary.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Recent Customers" value={String(customers.length)} hint="Latest CRM records shown below" />
        <StatCard label="Applications" value={String(applications)} hint="Total tracked service applications" />
        <StatCard label="PVC Queue" value={String(pvcOrders)} hint="Cards waiting for print" />
        <StatCard label="Open Reminders" value={String(reminders.length)} hint="Pending follow-ups" />
      </div>

      {canViewFinancials(user.role) ? (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard label="Total Income" value={formatCurrency(totalIncome)} />
            <StatCard label="Total Expense" value={formatCurrency(totalExpenses)} />
            <StatCard label="Net Profit" value={formatCurrency(totalIncome - totalExpenses)} />
          </div>
          <ProfitChart data={chartData} />
        </>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-lg border bg-white p-5">
          <h2 className="text-xl font-black">Latest customers</h2>
          <div className="mt-4 grid gap-3">
            {customers.map((customer) => (
              <div key={customer.id} className="rounded-md border bg-slate-50 p-3">
                <p className="font-bold">{customer.name} <span className="text-sm font-normal text-muted-foreground">{customer.customerCode}</span></p>
                <p className="text-sm text-muted-foreground">{customer.service.name} - {customer.status}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-lg border bg-white p-5">
          <h2 className="text-xl font-black">Reminders and enquiries</h2>
          <div className="mt-4 grid gap-3">
            {[...reminders.map((item) => ({ id: item.id, title: item.title, detail: formatDate(item.dueAt) })), ...enquiries.map((item) => ({ id: item.id, title: item.name, detail: item.question }))].slice(0, 8).map((item) => (
              <div key={item.id} className="rounded-md border bg-slate-50 p-3">
                <p className="font-bold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
