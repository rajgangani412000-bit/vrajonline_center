import Link from "next/link";
import { business, servicesSeed } from "@/lib/seed-data";

export function SiteFooter() {
  return (
    <footer className="border-t bg-slate-950 text-slate-100">
      <div className="container grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <h2 className="text-xl font-bold">{business.name}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
            Digital service center and government service center for Kosamba, Tarsadi, Surat District, and nearby areas.
          </p>
          <p className="mt-4 text-sm">Phone: <a className="underline" href={`tel:${business.phone}`}>{business.phone}</a></p>
          <p className="mt-1 text-sm">{business.location}</p>
        </div>
        <div>
          <h3 className="font-semibold">Pages</h3>
          <div className="mt-3 grid gap-2 text-sm text-slate-300">
            {["About", "Services", "Required Documents", "Government Schemes", "Job Updates", "Admissions", "Blog", "Contact"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase().replaceAll(" ", "-")}`}>
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Top Services</h3>
          <div className="mt-3 grid gap-2 text-sm text-slate-300">
            {servicesSeed.slice(0, 8).map((service) => (
              <Link key={service.slug} href={`/services#${service.slug}`}>
                {service.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <div className="container text-sm text-slate-400">
          Copyright {new Date().getFullYear()} Vraj Online Center. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
