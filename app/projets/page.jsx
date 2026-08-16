import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ProjectShowcase from "@/components/ProjectShowcase";
import SiteHeader from "@/components/SiteHeader";
import ContactSection from "@/components/ContactSection";
import ChatAssistant from "@/components/ChatAssistant";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Projets",
  description:
    "Projets Agritech, IA, data, web, mobile et automatisation de Georgeo Agbahungba : plateformes, applications et outils métiers.",
  alternates: { canonical: "/projets" },
  openGraph: {
    type: "website",
    url: "https://georgeo-agbahungba.xyz/projets",
    title: "Projets — Georgeo Agbahungba",
    description:
      "Une sélection de projets Agritech, IA, data, web et mobile : des idées rendues tangibles.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Georgeo Agbahungba — Projets" }],
  },
};

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <SiteHeader solid />
      <header className="projects-page-hero">
        <Link href="/#projets"><ArrowLeft aria-hidden="true" /> Retour au portfolio</Link>
        <p className="eyebrow">Réalisations & produits</p>
        <h1>De l’idée<br />à la <em>réalisation.</em></h1>
        <div><span>15 projets</span><p>Agritech, IA, data, web, mobile, cartographie et automatisation : une sélection issue du portfolio et des CV actualisés.</p><ArrowUpRight aria-hidden="true" /></div>
      </header>
      <section className="projects-page-list" aria-label="Tous les projets"><ProjectShowcase full /></section>
      <ContactSection />
      <SiteFooter />
      <ChatAssistant />
    </main>
  );
}
