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
              plus juste. Elle passe parfois par la donnée, parfois par le logiciel, souvent par les deux
              à la fois.
            </p>
          </div>
        </div>
      </section>

      <JourneySection />
      <PortraitSection />

      <section className="projects" id="projets" aria-labelledby="projects-title">
        <div className="section-heading">
          <p className="eyebrow">Projets & produits</p>
          <h2 id="projects-title">Des problèmes transformés <em>en produits.</em></h2>
        </div>
        <p className="projects-lead">Applications, plateformes, automatisations et expérimentations : une sélection de projets où la donnée et la technologie répondent à un besoin concret.</p>
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
