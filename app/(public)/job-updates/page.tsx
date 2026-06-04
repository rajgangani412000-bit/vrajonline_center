import type { Metadata } from "next";
import { jobUpdates } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "Job Updates",
  description: "Government job form filling, railway forms, admit card download, result print, and document upload support in Kosamba.",
  alternates: { canonical: "/job-updates" }
};

export default function JobUpdatesPage() {
  return (
    <section className="section bg-white">
      <div className="container">
        <p className="text-sm font-bold uppercase text-accent">Job updates</p>
        <h1 className="mt-2 text-4xl font-black">Government job form support</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {jobUpdates.map((item) => (
            <article key={item} className="rounded-lg border bg-slate-50 p-5">
              <h2 className="text-xl font-bold">{item}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Bring your qualification documents, photo, signature, category certificate if applicable, and payment method.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
