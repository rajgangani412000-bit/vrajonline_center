import type { Metadata } from "next";
import { admissionServices } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "Admissions",
  description: "ITI admission, college admission, scholarship-linked documents, choice filling, and deadline reminder support near Kosamba.",
  alternates: { canonical: "/admissions" }
};

export default function AdmissionsPage() {
  return (
    <section className="section bg-white">
      <div className="container">
        <p className="text-sm font-bold uppercase text-accent">Admissions</p>
        <h1 className="mt-2 text-4xl font-black">Admission form, choice filling, and deadline follow-up</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {admissionServices.map((item) => (
            <article key={item} className="rounded-lg border bg-slate-50 p-5">
              <h2 className="text-xl font-bold">{item}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Get help with registration, document upload, merit tracking, and admission-related reminders.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
