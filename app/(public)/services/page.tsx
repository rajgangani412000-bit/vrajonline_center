import type { Metadata } from "next";
import { servicesSeed } from "@/lib/seed-data";
import { ServiceCard } from "@/components/public/service-card";

export const metadata: Metadata = {
  title: "Services",
  description: "Aadhaar, PAN card, Ayushman card, certificates, job forms, admissions, PVC card printing, xerox, printing, and scanning in Kosamba.",
  alternates: { canonical: "/services" }
};

export default function ServicesPage() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase text-accent">Services</p>
          <h1 className="mt-2 text-4xl font-black">Digital and government service catalog</h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">
            Every service includes clear charges, required documents, and expected processing time.
          </p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {servicesSeed.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
