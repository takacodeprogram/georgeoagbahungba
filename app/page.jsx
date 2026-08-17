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

      <section className="takacode-promo" id="takacode" aria-labelledby="takacode-promo-title" style={{ padding: "8rem 0 6rem", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="section-heading" style={{ marginBottom: "3rem" }}>
            <p className="eyebrow">Écosystème & Produit Phare</p>
            <h2 id="takacode-promo-title">Découvrez <em>TakaCode.</em></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: "2rem", color: "var(--paper)", fontFamily: "var(--font-serif)", marginBottom: "1.5rem" }}>Apprendre par la pratique avec l'IA</h3>
              <p style={{ color: "var(--mud)", fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "2rem" }}>
                TakaCode est une plateforme éducative d'un nouveau genre conçue et développée par Georgeo Agbahungba. Elle accompagne la création de projets numériques réels avec le soutien intelligent de l'IA.
              </p>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                <Link className="primary-action" href="/takacode" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  Découvrir TakaCode <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <a className="text-action" href="https://takacode.app" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  Visiter takacode.app <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div style={{ position: "relative", background: "radial-gradient(circle, rgba(216,169,61,0.12) 0%, transparent 70%)", padding: "3rem 2rem", borderRadius: "16px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <img src="/media/takacode-logo-light.png" alt="TakaCode Logo" style={{ height: "65px", width: "auto", display: "block", marginBottom: "1rem" }} />
              <strong style={{ display: "block", marginTop: "0.5rem", color: "var(--paper)", fontSize: "1.2rem" }}>Plateforme active</strong>
              <p style={{ color: "var(--mud)", fontSize: "0.95rem", marginTop: "0.5rem", margin: "0.5rem 0 0" }}>
                Une approche orientée projet pour concrétiser des applications web, mobiles et automatisations IA.
              </p>
            </div>
          </div>
        </div>
      </section>

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
