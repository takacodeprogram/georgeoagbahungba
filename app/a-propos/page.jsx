import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import SiteHeader from "@/components/SiteHeader";
import ContactSection from "@/components/ContactSection";
import ChatAssistant from "@/components/ChatAssistant";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "À propos",
  description:
    "Georgeo Agbahungba, agroéconomiste, développeur Full Stack et Data Engineer : un parcours construit entre missions agricoles, analyse de données et produits numériques.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    type: "website",
    url: "https://georgeo-agbahungba.xyz/a-propos",
    title: "À propos — Georgeo Agbahungba",
    description:
      "À la croisée de l’agroéconomie et du numérique : collecter, structurer, analyser et transformer la donnée en outils utilisables.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Georgeo Agbahungba — À propos" }],
  },
};

export default function AboutPage() {
  return (
    <main className="cv-page">
      <SiteHeader solid />
      <header className="cv-page-hero">
        <Link href="/" data-magnetic="0.25"><ArrowLeft aria-hidden="true" /> Retour au portfolio</Link>
        <p className="eyebrow" data-anim="up">Qui suis-je</p>
        <h1 data-anim="title">Du terrain<br />au <em>produit.</em></h1>
        <p data-anim="up">Agroéconomie, développement et data engineering : trois expertises qui répondent à une même question — comment transformer un besoin réel en outil qui sert.</p>
      </header>
      <AboutSection />
      <ContactSection />
      <SiteFooter />
      <ChatAssistant />
    </main>
  );
}
