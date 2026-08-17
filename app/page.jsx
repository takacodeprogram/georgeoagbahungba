import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
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

      <section className="takacode-promo" id="takacode" aria-labelledby="takacode-promo-title">
        <div className="section-heading takacode-promo-heading">
          <p className="eyebrow">{isEn ? "Ecosystem & Flagship Product" : "Écosystème & Produit Phare"}</p>
          <h2 id="takacode-promo-title">
            {isEn ? <>Discover <em>TakaCode.</em></> : <>Découvrez <em>TakaCode.</em></>}
          </h2>
        </div>

        <div className="takacode-promo-grid">
          <div className="takacode-promo-text">
            <h3 className="takacode-promo-subtitle">
              {isEn ? "Learning by doing powered by AI" : "Apprendre par la pratique avec l’IA"}
            </h3>
            <p className="takacode-promo-copy">
              {isEn
                ? "TakaCode is a new kind of educational platform designed and developed by Georgeo Agbahungba. It guides the creation of real digital projects with the smart support of AI."
                : "TakaCode est une plateforme éducative d’un nouveau genre conçue et développée par Georgeo Agbahungba. Elle accompagne la création de projets numériques réels avec le soutien intelligent de l’IA."}
            </p>
            <ul className="takacode-promo-points">
              <li>{isEn ? "Guided tracks built around real projects" : "Des parcours guidés construits autour de projets réels"}</li>
              <li>{isEn ? "AI support at every step of the build" : "Un accompagnement IA à chaque étape de la réalisation"}</li>
              <li>{isEn ? "Web, mobile and automation, all the way to production" : "Web, mobile et automatisation, jusqu’à la mise en production"}</li>
            </ul>
            <div className="takacode-promo-actions">
              <Link className="primary-action" href={isEn ? "/en/takacode" : "/takacode"}>
                {isEn ? "Explore TakaCode" : "Découvrir TakaCode"} <ArrowUpRight aria-hidden="true" />
              </Link>
              <a className="text-action" href="https://takacode.app" target="_blank" rel="noreferrer">
                {isEn ? "Visit takacode.app" : "Visiter takacode.app"} <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <figure className="takacode-promo-media">
            <div className="takacode-promo-frame">
              <Image
                src="/media/project-takacode.webp"
                alt={isEn ? "The TakaCode platform home page" : "La page d’accueil de la plateforme TakaCode"}
                width={1000}
                height={507}
                sizes="(max-width: 780px) 92vw, (max-width: 1050px) 88vw, 44vw"
                className="takacode-promo-img"
              />
            </div>
            <figcaption className="takacode-promo-caption">
              <span className="takacode-promo-status">
                <span className="takacode-promo-dot" aria-hidden="true" />
                {isEn ? "Active Platform" : "Plateforme active"}
              </span>
              <p>
                {isEn
                  ? "A project-oriented approach to bringing web, mobile, and AI automation applications to life."
                  : "Une approche orientée projet pour concrétiser des applications web, mobiles et automatisations IA."}
              </p>
            </figcaption>
          </figure>
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
