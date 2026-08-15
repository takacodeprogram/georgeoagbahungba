import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu, Database, LayoutTemplate } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import ContactSection from "@/components/ContactSection";
import ChatAssistant from "@/components/ChatAssistant";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "TakaCode Agency",
  description:
    "Création d'applications web, mobiles et d'automatisations IA sur-mesure. Transformez vos idées en produits réels livrés en temps record.",
  alternates: { canonical: "/agency" },
  openGraph: {
    type: "website",
    url: "https://georgeo-agbahungba.xyz/agency",
    title: "TakaCode Agency — Solutions Digitales & IA",
    description:
      "Création d'applications web, mobiles et d'automatisations IA sur-mesure. Sans fioritures. Orienté résultat.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TakaCode Agency" }],
  },
};

const services = [
  {
    icon: <LayoutTemplate className="w-8 h-8 text-gold" />,
    title: "MVP Web & Mobile",
    description:
      "Développement rapide et performant de votre produit minimal viable. Stack moderne (Next.js, React, Supabase, Tailwind, Flutter). Conception fluide, robuste et optimisée.",
  },
  {
    icon: <Cpu className="w-8 h-8 text-gold" />,
    title: "IA & Automatisation",
    description:
      "Automatisation de processus complexes avec l'IA. Conception d'agents intelligents, assistants conversationnels sur-mesure et systèmes de génération automatique de contenu.",
  },
  {
    icon: <Database className="w-8 h-8 text-gold" />,
    title: "Data & Solutions Métiers",
    description:
      "Mise en place de systèmes de collecte offline (KoboToolbox/ODK), pipelines de données, dashboards interactifs et digitalisation de processus métier de A à Z.",
  },
];

const steps = [
  "Cadrage express du besoin et définition des livrables clés",
  "Design UI/UX épuré orienté expérience utilisateur",
  "Développement agile avec feedbacks réguliers",
  "Déploiement en production sécurisé et passation complète",
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
          Nous accompagnons les porteurs de projets, les entreprises et les initiatives de développement dans la conception d'applications web, mobiles, et l'intégration de solutions IA & Data intelligentes.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <a
            href="https://wa.me/2290167659717"
            target="_blank"
            rel="noreferrer"
            className="projects-link"
            style={{ display: "inline-flex", gap: "0.5rem", alignItems: "center" }}
          >
            Discuter de votre projet sur WhatsApp <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </header>

      {/* Services Section */}
      <section className="about" style={{ background: "var(--paper-soft)", padding: "5rem 2rem", borderBottom: "1px solid var(--line-light)" }}>
        <p className="eyebrow" style={{ textAlign: "center" }}>Nos Expertises</p>
        <h2 style={{ textAlign: "center", marginBottom: "4rem", fontSize: "2.5rem" }}>Ce que nous <em>bâtissons.</em></h2>
        
        <div className="method-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem", maxWidth: "1200px", margin: "0 auto" }}>
          {services.map((service, idx) => (
            <div
              key={idx}
              style={{
                background: "var(--paper)",
                padding: "2.5rem",
                borderRadius: "8px",
                border: "1px solid var(--line-light)",
                boxShadow: "0 4px 12px rgba(8, 11, 13, 0.03)",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>{service.icon}</div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontFamily: "Playfair Display Variable, serif", fontWeight: 700 }}>{service.title}</h3>
              <p style={{ color: "#4a4f54", lineHeight: "1.6", fontSize: "0.95rem" }}>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process / How we work */}
      <section className="method" style={{ padding: "5rem 2rem" }}>
        <div className="method-grid">
          <div className="method-principles">
            <p className="method-principle">Cadrer <em>vite.</em></p>
            <p className="method-principle">Livrer <em>bien.</em></p>
          </div>
          <div className="method-side">
            <h3 className="method-title">Notre méthode de travail</h3>
            <p className="method-copy" style={{ marginBottom: "2rem" }}>
              Nous ne croyons pas à la complexité inutile. Nous concevons le chemin le plus court pour faire passer votre idée du concept à la réalité fonctionnelle.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {steps.map((step, idx) => (
                <div key={idx} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <CheckCircle2 className="text-gold" style={{ flexShrink: 0, marginTop: "0.2rem" }} size={20} />
                  <span style={{ fontSize: "1rem", fontWeight: "500" }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about" style={{ background: "var(--ink)", color: "#f8f5ed", padding: "6rem 2rem", textAlign: "center", borderTop: "1px solid var(--line-dark)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p className="eyebrow" style={{ color: "var(--acid)" }}>Prêt à lancer ?</p>
          <h2 style={{ color: "#f8f5ed", fontSize: "2.8rem", marginBottom: "2rem" }}>Créons votre produit <em>maintenant.</em></h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", marginBottom: "3rem", lineHeight: "1.7" }}>
            Que ce soit pour un prototype rapide, une application métier complète ou une automatisation de vos processus quotidiens avec l'IA, contactez-nous directement pour estimer le budget et le délai de livraison.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://wa.me/2290167659717"
              target="_blank"
              rel="noreferrer"
              className="projects-link"
              style={{
                display: "inline-flex",
                gap: "0.5rem",
                alignItems: "center",
                background: "var(--acid)",
                color: "var(--ink)",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "4px",
                fontWeight: "700",
              }}
            >
              Nous contacter sur WhatsApp <ArrowUpRight aria-hidden="true" />
            </a>
            <Link
              href="/#contact"
              className="projects-link"
              style={{
                display: "inline-flex",
                gap: "0.5rem",
                alignItems: "center",
                background: "transparent",
                color: "#f8f5ed",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "1rem 2rem",
                borderRadius: "4px",
              }}
            >
              Par e-mail
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />
      <SiteFooter />
      <ChatAssistant />
    </main>
  );
}
