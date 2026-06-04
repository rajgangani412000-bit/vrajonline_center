import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: [{ category: "asc" }, { name: "asc" }] });

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-black">Services</h1>
        <p className="mt-2 text-muted-foreground">Seeded business service catalog used by public SEO, chatbot, and CRM.</p>
      </div>
      <div className="table-scroll rounded-lg">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Charges</th>
              <th>Processing</th>
              <th>Documents</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td className="font-semibold">{service.name}</td>
                <td>{service.category}</td>
                <td>{formatCurrency(service.charges.toString())}</td>
                <td>{service.processingTime}</td>
                <td>{service.documents.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
