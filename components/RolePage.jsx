import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download, Eye } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import ProjectShowcase from "@/components/ProjectShowcase";
import ContactSection from "@/components/ContactSection";
import ChatAssistant from "@/components/ChatAssistant";
import SiteFooter from "@/components/SiteFooter";
import { roles } from "@/data/roles";
import { cvs, skills as skillSets } from "@/data/portfolio";

// Les listes de competences vivent dans SkillsSection, qui les compose pour la
// home. On les reprend ici depuis `data/portfolio.js` pour ne pas dupliquer.
const groupes = {
  data: {
    fr: { titre: "Data Engineering & Cloud", items: ["Python", "SQL", "Supabase", "Google Cloud", "AWS Cloud", "APIs", "Pipelines de données (ETL)", "IA générative / LLMs"] },
    en: { titre: "Data Engineering & Cloud", items: ["Python", "SQL", "Supabase", "Google Cloud", "AWS Cloud", "APIs", "Data Pipelines (ETL)", "Generative AI / LLMs"] },
  },
  software: {
    fr: { titre: "Ingénierie logicielle", items: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PHP", "Laravel", "Flutter", "React Native", "Expo", "WordPress", "Git", "GitHub", "Docker", "DevOps", "CI/CD"] },
    en: { titre: "Software Engineering", items: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PHP", "Laravel", "Flutter", "React Native", "Expo", "WordPress", "Git", "GitHub", "Docker", "DevOps", "CI/CD"] },
  },
};

export default function RolePage({ role: roleKey, locale = "fr" }) {
  const isEn = locale === "en";
  const role = roles[roleKey];
  const groupe = groupes[roleKey][isEn ? "en" : "fr"];
  const cv = cvs[role.cvIndex];
  const t = (o) => (isEn ? o.en : o.fr);
  const home = isEn ? "/en" : "/";

  return (
    <main className="role-page">
      <SiteHeader solid locale={locale} />

      <header className="role-hero">
        <div className="role-hero-copy">
          <Link className="role-back" href={home} data-magnetic="0.25">
            <ArrowLeft aria-hidden="true" /> {isEn ? "Full profile" : "Profil complet"}
          </Link>
          <p className="eyebrow">{t(role.eyebrow)}</p>
          <h1 data-anim="title">
            {t(role.title)}<br /><em>{t(role.accent)}</em>
          </h1>
          <p className="role-lead" data-anim="up">{t(role.lead)}</p>
          <div className="role-actions">
            <a className="primary-action" href={isEn ? cv.en : cv.fr} target="_blank" rel="noreferrer">
              {isEn ? "Read the CV" : "Lire le CV"} <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="text-action" href={isEn ? "/en#contact" : "/#contact"}>
              {isEn ? "Get in touch" : "Me contacter"} <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="role-hero-media" aria-hidden="true">
          <Image src={t(role.portrait)} alt="" width={1672} height={941} priority />
        </div>
      </header>

      <section className="role-method" aria-labelledby="role-method-title">
        <p className="eyebrow">{isEn ? "How I work" : "Ma façon de travailler"}</p>
        <h2 id="role-method-title" data-anim="title">{t(role.method)}</h2>
      </section>

      <section className="role-skills" aria-labelledby="role-skills-title">
        <div className="section-heading">
          <p className="eyebrow">{isEn ? "Stack" : "Environnement technique"}</p>
          <h2 id="role-skills-title" data-anim="title">{groupe.titre}</h2>
        </div>
        <ul className="skills-list role-skills-list">
          {groupe.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="projects" aria-labelledby="role-projects-title">
        <div className="section-heading">
          <p className="eyebrow">{isEn ? "Selected work" : "Réalisations"}</p>
          <h2 id="role-projects-title" data-anim="title">
            {isEn ? <>Built and <em>shipped.</em></> : <>Construits et <em>mis en service.</em></>}
          </h2>
        </div>
        <ProjectShowcase locale={locale} sector={role.sector} limit={6} />
        <Link className="projects-link" href={isEn ? "/en/projets" : "/projets"}>
          {isEn ? "All projects" : "Tous les projets"} <ArrowUpRight aria-hidden="true" />
        </Link>
      </section>

      <section className="role-cv" aria-labelledby="role-cv-title">
        <div className="section-heading">
          <p className="eyebrow">CV</p>
          <h2 id="role-cv-title" data-anim="title">{t(cv.title)}</h2>
        </div>
        <div className="role-cv-card" data-anim="card">
          <p className="cv-subtitle">{t(cv.subtitle)}</p>
          <p className="cv-desc">{t(cv.description)}</p>
          <div className="cv-actions">
            <a href={isEn ? cv.en : cv.fr} target="_blank" rel="noreferrer">
              <Eye aria-hidden="true" /> {isEn ? "View" : "Voir"}
            </a>
            <a href={isEn ? cv.en : cv.fr} download>
              <Download aria-hidden="true" /> {isEn ? "Download" : "Télécharger"}
            </a>
          </div>
        </div>
      </section>

      <ContactSection locale={locale} />
      <SiteFooter locale={locale} />
      <ChatAssistant locale={locale} />
    </main>
  );
}
