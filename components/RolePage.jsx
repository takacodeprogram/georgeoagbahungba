import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import PageLoader from "@/components/PageLoader";
import ProjectShowcase from "@/components/ProjectShowcase";
import CvSection from "@/components/CvSection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import ChatAssistant from "@/components/ChatAssistant";
import BackToTop from "@/components/BackToTop";
import SiteFooter from "@/components/SiteFooter";
import { roles } from "@/data/roles";

/**
 * Réplique de la home, resserrée sur un seul métier.
 *
 * Aucun composant ni style propre : ce sont les sections de la page d'accueil,
 * paramétrées. Le hero garde son récit défilant mais n'enchaîne que deux
 * chapitres — l'ouverture puis le métier — et la rotation des casquettes,
 * qui met justement en scène les trois casquettes, est écartée.
 */
export default function RolePage({ role: roleKey, locale = "fr" }) {
  const isEn = locale === "en";
  const role = roles[roleKey];
  const t = (o) => (isEn ? o.en : o.fr);

  return (
    <main>
      <PageLoader />
      <Hero locale={locale} roleKey={role.chapterKey} />
      <AboutSection locale={locale} roleKey={roleKey} />
      <SkillsSection locale={locale} only={role.skillsGroup} />

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
            <h3 className="method-title" id="method-title">{t(role.label)}</h3>
            <p className="method-copy">{t(role.method)}</p>
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
        <p className="projects-lead">{t(role.lead)}</p>
        <ProjectShowcase locale={locale} sector={role.sector} />
        <Link className="projects-link" href={isEn ? "/en/projets" : "/projets"}>
          {isEn ? "Explore all projects" : "Explorer les projets"} <ArrowUpRight aria-hidden="true" />
        </Link>
      </section>

      <CvSection locale={locale} only={role.cvIndex} />
      <NewsletterSection locale={locale} />
      <ContactSection locale={locale} />

      <SiteFooter locale={locale} />
      <ChatAssistant locale={locale} />
      <BackToTop />
    </main>
  );
}
