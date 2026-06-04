import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { business } from "@/lib/seed-data";

const nav = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Documents", "/required-documents"],
  ["Schemes", "/government-schemes"],
  ["Jobs", "/job-updates"],
  ["Admissions", "/admissions"],
  ["Blog", "/blog"],
  ["Contact", "/contact"]
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="container flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-md" aria-label="Vraj Online Center home">
          <span className="grid size-10 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
            VOC
          </span>
          <span className="leading-tight">
            <span className="block text-base font-bold">{business.name}</span>
            <span className="block text-xs text-muted-foreground">Tarsadi, Kosamba</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Public navigation">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="focus-ring rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-muted">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${business.phone}`}
            className="focus-ring hidden items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold text-primary sm:flex"
          >
            <Phone className="size-4" aria-hidden />
            {business.phone}
          </a>
          <a
            href={`https://wa.me/${business.whatsapp}`}
            className="focus-ring rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t bg-white lg:hidden">
        <nav className="container flex gap-1 overflow-x-auto py-2" aria-label="Mobile public navigation">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="focus-ring whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-700">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function ContactStrip() {
  return (
    <div className="border-b bg-slate-900 text-white">
      <div className="container flex flex-wrap items-center justify-between gap-3 py-2 text-sm">
        <span className="flex items-center gap-2">
          <MapPin className="size-4" aria-hidden />
          {business.location}
        </span>
        <span>Local SEO service area: Kosamba, Tarsadi, Surat District, Gujarat</span>
      </div>
    </div>
  );
}
