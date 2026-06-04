import type { Metadata } from "next";
import { business } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "About",
  description: "About Vraj Online Center, a digital service center and government service center in Tarsadi, Kosamba, Gujarat.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <section className="section bg-white">
      <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-bold uppercase text-accent">About us</p>
          <h1 className="mt-2 text-4xl font-black">A dependable local desk for digital and government work</h1>
        </div>
        <div className="space-y-5 text-lg leading-8 text-slate-700">
          <p>
            {business.name} serves customers in Tarsadi, Kosamba, Surat District, and nearby areas with organized form filling, document preparation, tracking, and print services.
          </p>
          <p>
            The center focuses on clear document checklists, transparent charges, timely follow-up, and secure handling of customer information.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Professional", "Trustworthy", "Fast"].map((item) => (
              <div key={item} className="rounded-lg border bg-slate-50 p-4 text-base font-bold text-slate-900">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
