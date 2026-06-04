import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { business } from "@/lib/seed-data";

export const metadata: Metadata = {
  metadataBase: new URL(business.baseUrl),
  title: {
    default: "Vraj Online Center | Digital Service Center in Kosamba",
    template: "%s | Vraj Online Center"
  },
  description:
    "Vraj Online Center in Tarsadi, Kosamba provides PAN card, Aadhaar guidance, Ayushman card, certificates, admissions, government job forms, PVC card printing, xerox, printing, and scanning.",
  applicationName: "Vraj Online Center",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Vraj Online Center",
    title: "Vraj Online Center | Government Service Center Kosamba",
    description:
      "Trusted online center for government forms, certificates, admissions, job forms, PVC printing, and digital services in Tarsadi and Kosamba.",
    url: business.baseUrl
  },
  twitter: {
    card: "summary_large_image",
    title: "Vraj Online Center",
    description: "Digital service center and government form assistance in Kosamba, Gujarat."
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#075985"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
