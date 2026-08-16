import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu, Database, LayoutTemplate } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import ContactSection from "@/components/ContactSection";
import ChatAssistant from "@/components/ChatAssistant";
import SiteFooter from "@/components/SiteFooter";
import { contact } from "@/data/portfolio";

export const metadata = {
  title: "TakaCode Agency",
  description:
    "Conception d'applications web et mobiles, automatisations IA et systèmes de données. Du cadrage à la mise en production.",
  alternates: { canonical: "/agency" },
  openGraph: {
    type: "website",
    url: "https://georgeo-agbahungba.xyz/agency",
    title: "TakaCode Agency — Applications, IA et données",
    description:
      "Conception d'applications web et mobiles, automatisations IA et systèmes de données. Du cadrage à la mise en production.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TakaCode Agency" }],
  },
};

const services = [
  {
    icon: LayoutTemplate,
    title: "Applications web et mobiles",
    description:
      "Une première version fonctionnelle de votre produit, construite pour être mise entre les mains d'utilisateurs réels. Next.js, React, Supabase et Flutter selon ce que le projet demande.",
  },
  {
    icon: Cpu,
    title: "IA et automatisation",
    description:
      "Des assistants conversationnels et des chaînes de traitement qui prennent en charge les tâches répétitives : génération de contenu, tri de documents, réponses aux demandes courantes.",
  },
  {
    icon: Database,
    title: "Données et outils métiers",
    description:
      "Collecte de terrain hors connexion avec KoboToolbox ou ODK, pipelines de données et tableaux de bord. Pour les organisations dont l'information vit encore dans des classeurs Excel.",
  },
];

const steps = [
  "Cadrage du besoin et définition des livrables",
  "Maquettes centrées sur les parcours réels",
  "Développement par cycles courts, avec vos retours à chaque étape",
  "Mise en production et passation complète du code",
];

export default function AgencyPage() {
  return (
    <main className="agency-page">
      <SiteHeader solid />

      <header className="cv-page-hero">
        <Link href="/"><ArrowLeft aria-hidden="true" /> Retour au portfolio</Link>
        <p className="eyebrow">TakaCode Agency</p>
        <h1>Des idées complexes.<br /><em>Des produits concrets.</em></h1>
        <p className="lead">
          Nous concevons des applications web et mobiles, des automatisations IA et des systèmes de
          données pour les entreprises, les porteurs de projets et les organisations de développement.
        </p>
        <div className="agency-hero-action">
          <a className="projects-link" href={contact.whatsapp} target="_blank" rel="noreferrer">
            Parler de votre projet sur WhatsApp <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </header>

      <section className="agency-services" aria-labelledby="agency-services-title">
        <p className="eyebrow">Nos expertises</p>
        <h2 id="agency-services-title">Ce que nous <em>bâtissons.</em></h2>

        <div className="agency-grid">
          {services.map(({ icon: Icon, title, description }) => (
            <article className="agency-card" key={title}>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="method" aria-labelledby="agency-method-title">
        <div className="method-grid">
          <div className="method-principles">
            <p className="method-principle">Cadrer <em>vite.</em></p>
            <p className="method-principle">Livrer <em>bien.</em></p>
          </div>
          <div className="method-side">
            <h3 className="method-title" id="agency-method-title">Notre méthode de travail</h3>
            <p className="method-copy">
              Nous cherchons le chemin le plus court entre votre idée et une version que vos
              utilisateurs peuvent réellement essayer. Ce qui n'y contribue pas attend son tour.
            </p>
            <ul className="agency-steps">
              {steps.map((step) => (
                <li className="agency-step" key={step}>
                  <CheckCircle2 aria-hidden="true" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="agency-cta" aria-labelledby="agency-cta-title">
        <div className="agency-cta-inner">
          <p className="eyebrow">Prêt à lancer ?</p>
          <h2 id="agency-cta-title">Créons votre produit <em>maintenant.</em></h2>
          <p>
            Prototype, application métier complète ou automatisation de vos tâches quotidiennes :
            décrivez-nous le besoin et nous revenons vers vous avec une estimation de budget et de délai.
          </p>
          <div className="agency-cta-actions">
            <a className="agency-btn agency-btn-solid" href={contact.whatsapp} target="_blank" rel="noreferrer">
              Nous écrire sur WhatsApp <ArrowUpRight aria-hidden="true" />
            </a>
            <Link className="agency-btn agency-btn-ghost" href="/#contact">Par e-mail</Link>
          </div>
        </div>
      </section>

      <ContactSection />
      <SiteFooter />
      <ChatAssistant />
    </main>
  );
}
