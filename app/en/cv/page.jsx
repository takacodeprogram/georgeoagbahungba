import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CvSection from "@/components/CvSection";
import SiteHeader from "@/components/SiteHeader";
import ContactSection from "@/components/ContactSection";
import ChatAssistant from "@/components/ChatAssistant";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "CV",
  description:
    "Download the Agroeconomics, Development, Data Engineering, and Full Profile CVs of Georgeo Agbahungba, in French and English.",
  alternates: { canonical: "/en/cv" },
  openGraph: {
    type: "website",
    url: "https://georgeo-agbahungba.xyz/en/cv",
    title: "CV — Georgeo Agbahungba",
    description:
      "The right profile for the right challenge: Agroeconomics, Development, Data Engineering, and Complete Profile, in FR and EN.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Georgeo Agbahungba — CV" }],
  },
};

export default function CvPage() {
  return (
    <main className="cv-page">
      <SiteHeader solid locale="en" />
      <header className="cv-page-hero">
        <Link href="/en" data-magnetic="0.25"><ArrowLeft aria-hidden="true" /> Back to portfolio</Link>
        <p className="eyebrow" data-anim="up">Professional Journey</p>
        <h1 data-anim="title">The right profile,<br /><em>for the right challenge.</em></h1>
        <p data-anim="up">Agroeconomics, development, data engineering, or hybrid profile: choose the version that fits your needs, in French or English.</p>
      </header>
      <CvSection locale="en" />
      <ContactSection locale="en" />
      <SiteFooter locale="en" />
      <ChatAssistant locale="en" />
    </main>
  );
}
