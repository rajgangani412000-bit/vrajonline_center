import type { Metadata } from "next";
import { servicesSeed } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "Required Documents",
  description: "Document checklist for PAN card, Aadhaar guidance, certificates, admissions, job forms, and PVC card printing in Kosamba.",
  alternates: { canonical: "/required-documents" }
};

export default function RequiredDocumentsPage() {
  return (
    <section className="section bg-white">
      <div className="container">
        <p className="text-sm font-bold uppercase text-accent">Required documents</p>
        <h1 className="mt-2 text-4xl font-black">Carry the right documents before visiting</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {servicesSeed.map((service) => (
            <article key={service.slug} className="rounded-lg border bg-slate-50 p-5">
              <h2 className="text-xl font-bold">{service.name}</h2>
              <ul className="mt-3 grid gap-2 text-sm text-slate-700">
                {service.documents.map((document) => (
                  <li key={document}>{document}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
