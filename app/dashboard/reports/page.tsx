import Link from "next/link";
import { requireOwner } from "@/lib/security/permissions";

const reports = [
  ["Customers", "customers"],
  ["Income", "income"],
  ["Expenses", "expenses"],
  ["Profit", "profit"],
  ["Services", "services"]
];

export default async function ReportsPage() {
  await requireOwner();

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-black">Reports</h1>
        <p className="mt-2 text-muted-foreground">Download PDF and Excel-compatible CSV reports.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map(([label, type]) => (
          <article key={type} className="rounded-lg border bg-white p-5">
            <h2 className="text-xl font-black">{label}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link className="focus-ring rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground" href={`/api/reports/${type}?format=pdf`}>
                PDF
              </Link>
              <Link className="focus-ring rounded-md border px-4 py-2 font-semibold" href={`/api/reports/${type}?format=csv`}>
                Excel CSV
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
