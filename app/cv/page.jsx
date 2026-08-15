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
    "Télécharger les CV Agroéconomiste, Développeur et Profil complet de Georgeo Agbahungba en français et en anglais.",
  alternates: { canonical: "/cv" },
  openGraph: {
    type: "website",
    url: "https://georgeo-agbahungba.xyz/cv",
    title: "CV — Georgeo Agbahungba",
    description:
      "Le bon profil, pour le bon défi : CV Agroéconomiste, Développeur et Profil complet en FR et EN.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Georgeo Agbahungba — CV" }],
  },
};

export default function CvPage() {
  return (
    <main className="cv-page">
      <SiteHeader solid />
      <header className="cv-page-hero">
        <Link href="/"><ArrowLeft aria-hidden="true" /> Retour au portfolio</Link>
        <p className="eyebrow">Parcours professionnel</p>
        <h1>Le bon profil,<br /><em>pour le bon défi.</em></h1>
        <p>Agroéconomie, développement ou profil hybride : choisissez la version qui correspond à votre besoin, en français ou en anglais.</p>
      </header>
      <CvSection />
      <ContactSection />
      <SiteFooter />
      <ChatAssistant />
    </main>
  );
}
