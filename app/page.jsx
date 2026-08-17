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
            <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: "340px", aspectRatio: "16/10", overflow: "hidden", borderRadius: "12px", border: "1px solid rgba(216,169,61,0.25)", boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)", marginBottom: "1.5rem" }}>
                <img src="/media/project-takacode.webp" alt="TakaCode Capture d'écran" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <strong style={{ display: "block", color: "var(--paper)", fontSize: "1.2rem" }}>Plateforme active</strong>
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

      <section className="branding-promo" style={{ padding: "8rem 0 6rem", borderTop: "1px solid var(--border)", background: "#080b0d", color: "#f8f5ed", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="section-heading" style={{ marginBottom: "3rem" }}>
            <p className="eyebrow" style={{ color: "var(--gold)" }}>Outil de Design interne</p>
            <h2 id="branding-promo-title" style={{ color: "#f8f5ed" }}>Le Studio <em>de Branding.</em></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div style={{ position: "relative", border: "1px dashed rgba(216,169,61,0.3)", padding: "3rem", borderRadius: "16px", background: "rgba(0,0,0,0.3)" }}>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f56" }} />
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e" }} />
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27c93f" }} />
              </div>
              <strong style={{ fontSize: "1.4rem", color: "var(--gold)", display: "block", fontFamily: "var(--font-serif)", marginBottom: "0.8rem" }}>Créateur de cartes réseaux sociaux</strong>
              <p style={{ color: "var(--mud)", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
                Choisissez votre format (carré, vertical, paysage), chargez vos images, configurez vos textes et téléchargez des visuels prêts à publier aux couleurs de TakaCode ou Georgeo Agbahungba.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "2rem", color: "#f8f5ed", fontFamily: "var(--font-serif)", marginBottom: "1.5rem" }}>Générez vos cartes & bannières en un clic</h3>
              <p style={{ color: "var(--mud)", fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "2rem" }}>
                Un studio en ligne autonome conçu pour maintenir la cohérence de l’identité visuelle sur LinkedIn, X et Instagram.
              </p>
              <Link className="primary-action" href="/branding-studio" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                Ouvrir le Studio <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CvSection />
      <NewsletterSection />
      <ContactSection />

      <SiteFooter />
      <ChatAssistant />
    </main>
  );
}
