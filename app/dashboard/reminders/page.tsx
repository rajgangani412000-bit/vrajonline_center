import { completeReminderAction, createReminderAction } from "@/lib/actions/operations-actions";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

const reminderTypes = ["PENDING_CUSTOMER", "PENDING_PAYMENT", "ADMISSION_DEADLINE", "DOCUMENT_COLLECTION"];

export default async function RemindersPage() {
  const [reminders, customers] = await Promise.all([
    prisma.reminder.findMany({ include: { customer: true }, orderBy: [{ isCompleted: "asc" }, { dueAt: "asc" }], take: 100 }),
    prisma.customer.findMany({ orderBy: { createdAt: "desc" }, take: 100 })
  ]);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-black">Reminder & Follow-Up System</h1>
        <p className="mt-2 text-muted-foreground">Pending customers, payments, admission deadlines, and document collection.</p>
      </div>
      <section className="rounded-lg border bg-white p-5">
        <h2 className="text-xl font-black">Create reminder</h2>
        <form action={createReminderAction} className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <select name="customerId"><option value="">No customer</option>{customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}</select>
          <select name="type" defaultValue="PENDING_CUSTOMER">{reminderTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select>
          <input name="title" placeholder="Title" required />
          <input name="dueAt" type="date" required />
          <input name="notes" placeholder="Notes" />
          <button className="focus-ring bg-primary px-4 py-2 font-semibold text-primary-foreground xl:col-span-5">Save reminder</button>
        </form>
      </section>
      <div className="table-scroll rounded-lg">
        <table>
          <thead><tr><th>Due</th><th>Type</th><th>Title</th><th>Customer</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {reminders.map((reminder) => (
              <tr key={reminder.id}>
                <td>{formatDate(reminder.dueAt)}</td>
                <td>{reminder.type}</td>
                <td>{reminder.title}</td>
                <td>{reminder.customer?.name || "-"}</td>
                <td>{reminder.isCompleted ? "Completed" : "Open"}</td>
                <td>
                  {!reminder.isCompleted ? (
                    <form action={completeReminderAction}>
                      <input type="hidden" name="id" value={reminder.id} />
                      <button className="focus-ring border px-3 py-2 text-sm font-semibold">Complete</button>
                    </form>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
