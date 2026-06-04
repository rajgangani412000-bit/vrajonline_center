import type { Metadata } from "next";
import { schemes } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "Government Schemes",
  description: "Government scheme application support for Ayushman Bharat, PM Kisan, Digital Gujarat certificates, scholarships, and ration card services in Kosamba.",
  alternates: { canonical: "/government-schemes" }
};

export default function GovernmentSchemesPage() {
  return (
    <section className="section bg-white">
      <div className="container">
        <p className="text-sm font-bold uppercase text-accent">Government schemes</p>
        <h1 className="mt-2 text-4xl font-black">Scheme guidance and application support</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {schemes.map((scheme) => (
            <article key={scheme} className="rounded-lg border bg-slate-50 p-5">
              <h2 className="text-xl font-bold">{scheme}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Visit with Aadhaar card, mobile number, and scheme-related documents for eligibility review and form guidance.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
