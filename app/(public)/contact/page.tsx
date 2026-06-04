import type { Metadata } from "next";
import { Phone, MapPin, MessageSquare } from "lucide-react";
import { createEnquiryAction } from "@/lib/actions/enquiry-actions";
import { business, servicesSeed } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Vraj Online Center in Tarsadi, Kosamba for PAN card, Aadhaar guidance, certificates, PVC card printing, xerox, printing, and scanning.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <section className="section bg-white">
      <div className="container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-bold uppercase text-accent">Contact</p>
          <h1 className="mt-2 text-4xl font-black">Talk to Vraj Online Center</h1>
          <div className="mt-8 grid gap-4">
            <a className="focus-ring flex items-center gap-3 rounded-lg border bg-slate-50 p-4" href={`tel:${business.phone}`}>
              <Phone className="size-5 text-primary" aria-hidden />
              {business.phone}
            </a>
            <a className="focus-ring flex items-center gap-3 rounded-lg border bg-slate-50 p-4" href={`https://wa.me/${business.whatsapp}`}>
              <MessageSquare className="size-5 text-primary" aria-hidden />
              WhatsApp Vraj Online Center
            </a>
            <p className="flex items-center gap-3 rounded-lg border bg-slate-50 p-4">
              <MapPin className="size-5 text-primary" aria-hidden />
              {business.location}
            </p>
          </div>
        </div>
        <form action={createEnquiryAction} className="rounded-lg border bg-slate-50 p-6">
          <h2 className="text-2xl font-black">Send enquiry</h2>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold">
              Name
              <input name="name" required minLength={2} />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Mobile
              <input name="mobile" required minLength={10} inputMode="tel" />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Service
              <select name="service">
                {servicesSeed.map((service) => (
                  <option key={service.slug} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Question
              <textarea name="question" required minLength={5} rows={5} />
            </label>
            <button className="focus-ring bg-primary px-5 py-3 font-semibold text-primary-foreground">
              Submit enquiry
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
