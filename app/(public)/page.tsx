import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Landmark, Printer, ShieldCheck } from "lucide-react";
import { business, servicesSeed } from "@/lib/seed-data";
import { ServiceCard } from "@/components/public/service-card";

export default function HomePage() {
  const featuredServices = servicesSeed.slice(0, 6);

  return (
    <>
      <section className="bg-white">
        <div className="container grid min-h-[calc(100vh-116px)] items-center gap-8 py-10 lg:grid-cols-[1fr_0.92fr]">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-accent">Digital service center in Tarsadi, Kosamba</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Vraj Online Center
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
              Trusted assistance for PAN card, Aadhaar guidance, Ayushman card, certificates, admissions, government job forms, PVC card printing, xerox, printing, and scanning.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/services" className="focus-ring inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground">
                View Services <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a href={`https://wa.me/${business.whatsapp}`} className="focus-ring inline-flex items-center gap-2 rounded-md border bg-white px-5 py-3 font-semibold text-primary">
                WhatsApp Now
              </a>
            </div>
            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["20+", "Services"],
                ["Same day", "Print and scan"],
                ["Local", "Kosamba support"]
              ].map(([value, label]) => (
                <div key={label} className="border-l-4 border-accent pl-4">
                  <dt className="text-2xl font-black">{value}</dt>
                  <dd className="text-sm text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <Image
              src="/images/office-work.svg"
              alt="Organized digital service center workspace"
              width={1200}
              height={800}
              priority
              className="rounded-lg border bg-white shadow-soft"
            />
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase text-accent">Operating desk for digital services</p>
            <h2 className="mt-2 text-3xl font-black">Fast, organized, document-ready service handling</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              { Icon: ShieldCheck, text: "Verified document checklist" },
              { Icon: Landmark, text: "Government form assistance" },
              { Icon: FileText, text: "Application status tracking" },
              { Icon: Printer, text: "PVC, xerox, print, scan" }
            ].map(({ Icon, text }) => (
              <div key={text} className="rounded-lg border bg-white p-5">
                <Icon className="size-8 text-primary" aria-hidden />
                <p className="mt-4 font-semibold">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase text-accent">Popular services</p>
              <h2 className="mt-2 text-3xl font-black">Most requested work at Vraj Online Center</h2>
            </div>
            <Link href="/services" className="focus-ring inline-flex items-center gap-2 rounded-md border px-4 py-2 font-semibold">
              All Services <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {featuredServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-900 text-white">
        <div className="container grid gap-8 md:grid-cols-[1fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-black">Need help with documents today?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Call before visiting for exact document requirements, deadlines, and service charges.
            </p>
          </div>
          <div className="grid gap-3">
            {["PAN Card Service Kosamba", "Aadhaar Update Kosamba", "Ayushman Card Kosamba", "PVC Card Printing Kosamba"].map((keyword) => (
              <p key={keyword} className="flex items-center gap-2 rounded-md bg-white/10 px-4 py-3">
                <CheckCircle2 className="size-5 text-emerald-300" aria-hidden />
                {keyword}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
