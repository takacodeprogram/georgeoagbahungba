import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ProjectShowcase from "@/components/ProjectShowcase";
import SiteHeader from "@/components/SiteHeader";
import ContactSection from "@/components/ContactSection";
import ChatAssistant from "@/components/ChatAssistant";
import SiteFooter from "@/components/SiteFooter";

export const metadata = { title: "Projets — Georgeo Agbahungba", description: "Projets Agritech, IA, data, web, mobile et automatisation de Georgeo Agbahungba." };

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <SiteHeader solid />
      <header className="projects-page-hero">
        <Link href="/#projets"><ArrowLeft aria-hidden="true" /> Retour au portfolio</Link>
        <p className="eyebrow">Réalisations & produits</p>
        <h1>Du terrain<br />à <em>l’écran.</em></h1>
        <div><span>15 projets</span><p>Agritech, IA, data, web, mobile, cartographie et automatisation : une sélection issue du portfolio et des CV actualisés.</p><ArrowUpRight aria-hidden="true" /></div>
      </header>
      <section className="projects-page-list" aria-label="Tous les projets"><ProjectShowcase full /></section>
      <ContactSection />
      <SiteFooter />
      <ChatAssistant />
    </main>
  );
}
