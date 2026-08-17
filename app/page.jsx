import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Hero from "@/components/Hero";
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
