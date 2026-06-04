import { createPvcOrderAction, updatePvcStatusAction } from "@/lib/actions/operations-actions";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

const pvcStatuses = ["PRINT_QUEUE", "PRINTED", "DELIVERED"];

export default async function PvcCardsPage() {
  const [orders, customers] = await Promise.all([
    prisma.pvcOrder.findMany({ include: { customer: true }, orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.customer.findMany({ orderBy: { createdAt: "desc" }, take: 100 })
  ]);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-black">PVC Card Management</h1>
        <p className="mt-2 text-muted-foreground">Track print queue, printed cards, and delivered PVC orders.</p>
      </div>
      <section className="rounded-lg border bg-white p-5">
        <h2 className="text-xl font-black">Create PVC order</h2>
        <form action={createPvcOrderAction} className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <select name="customerId" required>
            {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name} - {customer.customerCode}</option>)}
          </select>
          <input name="cardType" placeholder="Card type" required />
          <input name="quantity" type="number" min={1} defaultValue={1} required />
          <select name="status" defaultValue="PRINT_QUEUE">
            {pvcStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
          <input name="notes" placeholder="Notes" />
          <button className="focus-ring bg-primary px-4 py-2 font-semibold text-primary-foreground xl:col-span-5">Save PVC order</button>
        </form>
      </section>
      <div className="table-scroll rounded-lg">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Card Type</th>
              <th>Quantity</th>
              <th>Queued</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNo}</td>
                <td>{order.customer.name}</td>
                <td>{order.cardType}</td>
                <td>{order.quantity}</td>
                <td>{formatDate(order.queuedAt)}</td>
                <td>
                  <form action={updatePvcStatusAction} className="flex min-w-44 gap-2">
                    <input type="hidden" name="id" value={order.id} />
                    <select name="status" defaultValue={order.status}>
                      {pvcStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                    <button className="focus-ring border px-3 py-2 text-sm font-semibold">Save</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
