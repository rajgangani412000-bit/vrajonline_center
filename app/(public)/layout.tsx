import type { ReactNode } from "react";
import { ChatWidget } from "@/components/public/chat-widget";
import { ContactStrip, SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { StructuredData } from "@/components/public/structured-data";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <StructuredData />
      <ContactStrip />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <ChatWidget />
    </>
  );
}
