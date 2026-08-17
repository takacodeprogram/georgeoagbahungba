import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import SiteHeader from "@/components/SiteHeader";
import ContactSection from "@/components/ContactSection";
import ChatAssistant from "@/components/ChatAssistant";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "About",
  description:
    "Georgeo Agbahungba, agroeconomist, Full Stack Developer, and Data Engineer: a career built across agricultural fieldwork, data analytics, and digital products.",
  alternates: { canonical: "/en/a-propos" },
  openGraph: {
    type: "website",
    url: "https://georgeo-agbahungba.xyz/en/a-propos",
    title: "About — Georgeo Agbahungba",
    description:
      "At the crossroads of agroeconomics and technology: collecting, structuring, analyzing, and turning data into usable tools.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Georgeo Agbahungba — About" }],
  },
};

export default function AboutPage() {
  return (
    <main className="cv-page">
      <SiteHeader solid locale="en" />
      <header className="cv-page-hero">
        <Link href="/en" data-magnetic="0.25"><ArrowLeft aria-hidden="true" /> Back to portfolio</Link>
        <p className="eyebrow" data-anim="up">Who I am</p>
        <h1 data-anim="title">From fieldwork<br />to <em>product.</em></h1>
        <p data-anim="up">Agroeconomics, development, and data engineering: three areas of expertise answering one question — how do you turn a real need into a tool that actually serves?</p>
      </header>
      <AboutSection locale="en" />
      <ContactSection locale="en" />
      <SiteFooter locale="en" />
      <ChatAssistant locale="en" />
    </main>
  );
}
