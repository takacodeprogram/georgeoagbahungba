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
import BackToTop from "@/components/BackToTop";
import JourneySection from "@/components/JourneySection";
import SiteFooter from "@/components/SiteFooter";

export default function Home({ locale = "fr" }) {
  const isEn = locale === "en";

  return (
    <main>
      <PageLoader />
      <Hero locale={locale} />
      <AboutSection locale={locale} />
      <CapRotationStory locale={locale} />
      <SkillsSection locale={locale} />

      <section className="method" id="methode" aria-labelledby="method-title">
        <p className="eyebrow">{isEn ? "My Way of Working" : "Ma façon de travailler"}</p>
        <div className="method-grid">
          <div className="method-principles">
            <p className="method-principle">
              {isEn ? <>Problem <em>first.</em></> : <>Le problème <em>d’abord.</em></>}
            </p>
            <p className="method-principle">
              {isEn ? <>Solution <em>second.</em></> : <>La solution <em>ensuite.</em></>}
            </p>
          </div>
          <div className="method-side">
            <h3 className="method-title" id="method-title">
              {isEn ? (
                <>No tech for the <em>sake of tech.</em></>
              ) : (
                <>Pas de technologie <em>pour la technologie.</em></>
              )}
            </h3>
            <p className="method-copy">
              {isEn
                ? "I start from the actual need, users, and constraints to determine the most accurate answer. It sometimes involves data, sometimes software, often both at the same time."
                : "Je pars du besoin réel, des utilisateurs et des contraintes pour déterminer la réponse la plus juste. Elle passe parfois par la donnée, parfois par le logiciel, souvent par les deux à la fois."}
            </p>
          </div>
        </div>
      </section>

      <JourneySection locale={locale} />
      <PortraitSection locale={locale} />

      <section className="takacode-promo" id="takacode" aria-labelledby="takacode-promo-title" style={{ padding: "8rem 0 6rem", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="section-heading" style={{ marginBottom: "3rem" }}>
            <p className="eyebrow">{isEn ? "Ecosystem & Flagship Product" : "Écosystème & Produit Phare"}</p>
            <h2>{isEn ? <>Discover <em>TakaCode.</em></> : <>Découvrez <em>TakaCode.</em></>}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: "2rem", color: "var(--paper)", fontFamily: "var(--font-serif)", marginBottom: "1.5rem" }}>
                {isEn ? "Learning by doing powered by AI" : "Apprendre par la pratique avec l'IA"}
              </h3>
              <p style={{ color: "var(--mud)", fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "2rem" }}>
                {isEn
                  ? "TakaCode is a new kind of educational platform designed and developed by Georgeo Agbahungba. It guides the creation of real digital projects with the smart support of AI."
                  : "TakaCode est une plateforme éducative d'un nouveau genre conçue et développée par Georgeo Agbahungba. Elle accompagne la création de projets numériques réels avec le soutien intelligent de l'IA."}
              </p>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                <Link className="primary-action" href={isEn ? "/en/takacode" : "/takacode"} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  {isEn ? "Explore TakaCode" : "Découvrir TakaCode"} <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <a className="text-action" href="https://takacode.app" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  {isEn ? "Visit takacode.app" : "Visiter takacode.app"} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: "340px", aspectRatio: "16/10", overflow: "hidden", borderRadius: "12px", border: "1px solid rgba(216,169,61,0.25)", boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)", marginBottom: "1.5rem" }}>
                <img src="/media/project-takacode.webp" alt="TakaCode Screen Capture" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <strong style={{ display: "block", color: "var(--paper)", fontSize: "1.2rem" }}>
                {isEn ? "Active Platform" : "Plateforme active"}
              </strong>
              <p style={{ color: "var(--mud)", fontSize: "0.95rem", marginTop: "0.5rem", margin: "0.5rem 0 0" }}>
                {isEn
                  ? "A project-oriented approach to bringing web, mobile, and AI automation applications to life."
                  : "Une approche orientée projet pour concrétiser des applications web, mobiles et automatisations IA."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="projects" id="projets" aria-labelledby="projects-title">
        <div className="section-heading">
          <p className="eyebrow">{isEn ? "Projects & Products" : "Projets & produits"}</p>
          <h2 id="projects-title">
            {isEn ? (
              <>Problems turned <em>into products.</em></>
            ) : (
              <>Des problèmes transformés <em>en produits.</em></>
            )}
          </h2>
        </div>
        <p className="projects-lead">
          {isEn
            ? "Applications, platforms, automation, and experiments: a selection of projects where data and technology meet concrete needs."
            : "Applications, plateformes, automatisations et expérimentations : une sélection de projets où la donnée et la technologie répondent à un besoin concret."}
        </p>
        <ProjectShowcase locale={locale} />
        <Link className="projects-link" href={isEn ? "/en/projets" : "/projets"}>
          {isEn ? "Explore all projects" : "Explorer les projets"} <ArrowUpRight aria-hidden="true" />
        </Link>
      </section>

      <CvSection locale={locale} />
      <NewsletterSection locale={locale} />
      <ContactSection locale={locale} />

      <SiteFooter locale={locale} />
      <ChatAssistant locale={locale} />
      <BackToTop />
    </main>
  );
}
