import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import CapRotationStory from "@/components/CapRotationStory";
import SkillsSection from "@/components/SkillsSection";
import PortraitSection from "@/components/PortraitSection";
import PageLoader from "@/components/PageLoader";
import ProjectShowcase from "@/components/ProjectShowcase";
import CvSection from "@/components/CvSection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import ChatAssistant from "@/components/ChatAssistant";
import JourneySection from "@/components/JourneySection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <main>
      <PageLoader />
      <Hero />
      <AboutSection />
      <CapRotationStory />
      <SkillsSection />

      <section className="method" id="methode" aria-labelledby="method-title">
        <p className="eyebrow">Ma façon de travailler</p>
        <div className="method-grid">
          <div className="method-principles">
            <p className="method-principle">Le problème <em>d’abord.</em></p>
            <p className="method-principle">La solution <em>ensuite.</em></p>
          </div>
          <div className="method-side">
            <h3 className="method-title" id="method-title">Pas de technologie <em>pour la technologie.</em></h3>
            <p className="method-copy">
              Je pars du besoin réel, des utilisateurs et des contraintes pour déterminer la réponse la
              plus pertinente — qu’elle passe par la donnée, le logiciel, l’analyse ou une combinaison
              de plusieurs approches.
            </p>
          </div>
        </div>
      </section>

      <JourneySection />
      <PortraitSection />

      <section className="projects" id="projets" aria-labelledby="projects-title">
        <div className="section-heading">
          <p className="eyebrow">Projets & produits</p>
          <h2 id="projects-title">Des idées rendues <em>tangibles.</em></h2>
        </div>
        <p className="projects-lead">Une sélection de projets conçus pour répondre à des besoins concrets, explorer de nouveaux usages et transformer des idées en produits fonctionnels.</p>
        <ProjectShowcase />
        <Link className="projects-link" href="/projets">Explorer les projets <ArrowUpRight aria-hidden="true" /></Link>
      </section>

      <CvSection />
      <NewsletterSection />
      <ContactSection />

      <SiteFooter />
      <ChatAssistant />
    </main>
  );
}
