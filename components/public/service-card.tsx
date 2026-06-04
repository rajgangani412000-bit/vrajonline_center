import { Clock, FileText, IndianRupee } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function ServiceCard({
  service
}: {
  service: {
    slug: string;
    name: string;
    category: string;
    description: string;
    charges: number;
    processingTime: string;
    documents: readonly string[];
  };
}) {
  return (
    <article id={service.slug} className="rounded-lg border bg-white p-5 shadow-sm scroll-mt-32">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-accent">{service.category}</p>
          <h3 className="mt-1 text-xl font-bold">{service.name}</h3>
        </div>
        <span className="rounded-md bg-muted px-3 py-1 text-sm font-semibold">{formatCurrency(service.charges)}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.description}</p>
      <div className="mt-4 grid gap-3 text-sm">
        <p className="flex gap-2">
          <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
          <span><strong>Processing:</strong> {service.processingTime}</span>
        </p>
        <p className="flex gap-2">
          <IndianRupee className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
          <span><strong>Charges:</strong> {formatCurrency(service.charges)}</span>
        </p>
        <div className="flex gap-2">
          <FileText className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
          <div>
            <strong>Documents:</strong>
            <ul className="mt-2 flex flex-wrap gap-2">
              {service.documents.map((document) => (
                <li key={document} className="rounded-md border bg-slate-50 px-2 py-1 text-xs">
                  {document}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
