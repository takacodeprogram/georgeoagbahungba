import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GraduationCap, Zap, Users, Code, BookOpen, Star } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import ContactSection from "@/components/ContactSection";
import ChatAssistant from "@/components/ChatAssistant";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "TakaCode — Apprendre par la pratique avec l'IA",
  description: "Découvrez TakaCode, l'écosystème d'apprentissage de Georgeo Agbahungba. Passez d’une idée à un projet numérique structuré avec l’appui de l’IA.",
  alternates: { canonical: "/takacode" },
  openGraph: {
    type: "website",
    url: "https://georgeo-agbahungba.xyz/takacode",
    title: "TakaCode — Écosystème d'Apprentissage & Création",
    description: "Passez d’une idée à un projet numérique structuré avec l’appui de l’IA et l’apprentissage par la pratique.",
    images: [{ url: "/media/project-takacode.webp", width: 1200, height: 630, alt: "TakaCode Platform" }],
  },
};

export default function TakaCodePage() {
  return (
    <main className="takacode-page">
      <SiteHeader solid />

      <header className="cv-page-hero">
        <Link href="/" data-magnetic="0.25"><ArrowLeft aria-hidden="true" /> Retour au portfolio</Link>
        <Image
          className="takacode-page-logo"
          src="/media/logo_light_4.png"
          alt="TakaCode"
          width={1000}
          height={1000}
          priority
        />
        <p className="eyebrow">Écosystème & Produit Phare</p>
        <h1 data-anim="title" style={{ marginTop: "0.5rem" }}>TakaCode<br /><em>Apprendre par la pratique.</em></h1>
        <p className="lead" data-anim="up">
          Conçu et développé par Georgeo Agbahungba, TakaCode est une plateforme éducative d'un nouveau genre
          qui accompagne la création de projets numériques réels assistée par l'intelligence artificielle.
        </p>
        <div className="agency-hero-action">
          <a className="projects-link" href="https://takacode.app" target="_blank" rel="noreferrer">
            Visiter la plateforme takacode.app <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </header>

      <section className="takacode-showcase" aria-labelledby="takacode-showcase-title">
        <div className="takacode-showcase-grid">
          <figure className="takacode-showcase-media">
            <div className="takacode-showcase-frame">
              <Image
                src="/media/project-takacode.webp"
                alt="La page d’accueil de la plateforme TakaCode"
                width={1000}
                height={507}
                sizes="(max-width: 780px) 92vw, (max-width: 1050px) 88vw, 56vw"
                className="takacode-showcase-img"
                priority
              />
            </div>
          </figure>

          <div className="takacode-showcase-copy">
            <p className="eyebrow">La plateforme</p>
            <h2 id="takacode-showcase-title" data-anim="title">En service, <em>aujourd’hui.</em></h2>
            <ul className="takacode-showcase-points">
              <li>Des parcours guidés construits autour de projets réels</li>
              <li>Un accompagnement IA à chaque étape de la réalisation</li>
              <li>Web, mobile et automatisation, jusqu’à la mise en production</li>
            </ul>
            <p className="takacode-showcase-status">
              <span className="takacode-showcase-dot" aria-hidden="true" />
              Plateforme active
            </p>
            <p className="takacode-showcase-note">
              Une approche orientée projet pour concrétiser des applications web, mobiles et automatisations IA.
            </p>
          </div>
        </div>
      </section>

      <section className="agency-services" aria-labelledby="takacode-concept-title" style={{ paddingBottom: "2rem" }}>
        <p className="eyebrow">Le Concept</p>
        <h2 id="takacode-concept-title" data-anim="title">Pourquoi <em>TakaCode ?</em></h2>
        <p className="lead-text" style={{ maxWidth: "800px", margin: "1rem auto 3rem", textAlign: "center" }}>
          L'apprentissage passif des technologies est souvent décourageant. TakaCode inverse l'équation en proposant un modèle
          <strong> orienté projet</strong> : vous apportez votre idée, la plateforme fournit le cadre d'apprentissage, la communauté
          et l'accompagnement IA pour la transformer en produit utilisable.
        </p>

        <div className="agency-grid">
          <article className="agency-card" data-anim="card">
            <GraduationCap aria-hidden="true" />
            <h3>Apprentissage par l'action</h3>
            <p>Pas de cours théoriques sans fin. Chaque notion technique apprise est immédiatement appliquée sur votre projet numérique.</p>
          </article>
          <article className="agency-card" data-anim="card">
            <Zap aria-hidden="true" />
            <h3>Cadrage assisté par IA</h3>
            <p>Des prompts et des outils d'IA guidés pour structurer l'architecture de vos applications, créer vos bases de données et modéliser vos parcours utilisateurs.</p>
          </article>
          <article className="agency-card" data-anim="card">
            <Users aria-hidden="true" />
            <h3>Communauté active</h3>
            <p>Rejoignez des créateurs motivés, participez à des sessions en direct, des défis thématiques et partagez vos retours sur la galerie de projets.</p>
          </article>
        </div>
      </section>

      <section className="method" aria-labelledby="takacode-features-title">
        <div className="method-grid">
          <div className="method-principles">
            <p className="method-principle">Créer <em>réellement.</em></p>
            <p className="method-principle">Partager <em>vite.</em></p>
          </div>
          <div className="method-side">
            <h3 className="method-title" id="takacode-features-title">Les parcours de création</h3>
            <p className="method-copy">
              TakaCode propose des tracks d'apprentissage complets menant à la mise en production de solutions concrètes :
            </p>
            <ul className="agency-steps">
              <li className="agency-step" data-anim="up">
                <Code aria-hidden="true" />
                <span><strong>Websites & Web Apps :</strong> Maîtriser le front-end et le back-end modernes (React, Next.js, bases de données).</span>
              </li>
              <li className="agency-step" data-anim="up">
                <Zap aria-hidden="true" />
                <span><strong>IA & Agents autonomes :</strong> Connecter des LLMs pour automatiser des processus ou créer des fonctionnalités intelligentes.</span>
              </li>
              <li className="agency-step" data-anim="up">
                <BookOpen aria-hidden="true" />
                <span><strong>No-Code & Outils métier :</strong> Digitaliser des flux de travail sans écrire de code de A à Z.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="agency-cta" aria-labelledby="takacode-cta-title" style={{ marginTop: "4rem" }}>
        <div className="agency-cta-inner">
          <p className="eyebrow"><Star size={16} style={{ color: "var(--gold)", fill: "var(--gold)", display: "inline", verticalAlign: "middle", marginRight: "6px" }} /> Rejoindre le mouvement</p>
          <h2 id="takacode-cta-title" data-anim="title">Prêt à donner vie à <em>vos idées ?</em></h2>
          <p>
            Que vous soyez grand débutant ou développeur cherchant à structurer son projet, TakaCode vous apporte les ressources et le réseau pour publier votre premier produit.
          </p>
          <div className="agency-cta-actions">
            <a className="agency-btn agency-btn-solid" data-magnetic="0.3" href="https://takacode.app" target="_blank" rel="noreferrer">
              Découvrir la plateforme <ArrowUpRight aria-hidden="true" />
            </a>
            <Link className="agency-btn agency-btn-ghost" data-magnetic="0.3" href="/#contact">Me parler de TakaCode</Link>
          </div>
        </div>
      </section>

      <ContactSection />
      <SiteFooter />
      <ChatAssistant />
    </main>
  );
}
