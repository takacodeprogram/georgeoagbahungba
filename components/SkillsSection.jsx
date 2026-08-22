import { Code2, DatabaseZap, LineChart } from "lucide-react";
import { roles } from "@/data/roles";

export default function SkillsSection({ locale = "fr", only = null, roleKey = null }) {
  const isEn = locale === "en";
  const lang = isEn ? "en" : "fr";
  const role = roleKey ? roles[roleKey] : null;

  const allGroups = [
    {
      number: "01",
      icon: LineChart,
      title: isEn ? "Agroeconomics & Analysis" : "Agroéconomie & Analyse",
      skills: [
        "R", "Stata", "SPSS", "Excel", "KoboToolbox", "ODK", "Power BI", "QGIS",
        isEn ? "Econometrics" : "Économétrie",
        isEn ? "Statistics" : "Statistiques",
        isEn ? "Agricultural Policy Analysis" : "Analyse de politiques agricoles",
        isEn ? "Project Management" : "Gestion de projet",
        isEn ? "Monitoring & Evaluation" : "Suivi-évaluation",
        isEn ? "Impact Assessment" : "Évaluation d'impact",
      ],
    },
    {
      number: "02",
      icon: DatabaseZap,
      title: isEn ? "Data Engineering & Cloud" : "Data Engineering & Cloud",
      skills: [
        "Python", "SQL", "Supabase", "Google Cloud", "AWS Cloud", "APIs",
        isEn ? "Data Pipelines (ETL)" : "Pipelines de données (ETL)",
        isEn ? "Generative AI / LLMs" : "IA générative / LLMs",
      ],
    },
    {
      number: "03",
      icon: Code2,
      title: isEn ? "Software Engineering" : "Ingénierie logicielle",
      skills: [
        "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PHP", "Laravel",
        "Flutter", "React Native", "Expo", "WordPress", "Git", "GitHub", "Docker",
        "DevOps", "CI/CD", "Funnel Building",
      ],
    },
  ];

  // `only` isole un groupe pour les pages mono-metier, sans toucher au rendu.
  // Un "01" seul ne numerote rien : sur une page mono-metier le numero saute.
  const groups = only === null ? allGroups : [{ ...allGroups[only], number: null }];

  return (
    <section className="skills" id="competences" aria-labelledby="skills-title">
      <div className="section-heading">
        <p className="eyebrow">{role ? role.skills.eyebrow[lang] : (isEn ? "Skills & Tools" : "Compétences & outils")}</p>
        <h2 id="skills-title" data-anim="title">
          {role ? (
            <>{role.skills.h2[lang][0]} <em>{role.skills.h2[lang][1]}</em></>
          ) : isEn ? (
            <>A complete path<br /><em>from data to product.</em></>
          ) : (
            <>Un parcours complet<br /><em>de la donnée au produit.</em></>
          )}
        </h2>
      </div>
      <p className="skills-lead" data-anim="up">
        {role ? role.skills.lead[lang] : isEn
          ? "Collection, pipelines, analysis, development, and deployment: my skills bridge data with the applications that give it value."
          : "Collecte, pipelines, analyse, développement et déploiement : mes compétences relient la donnée aux applications qui lui donnent de la valeur."}
      </p>
      <div className="skills-grid">
        {groups.map(({ number, icon: Icon, title, skills }) => (
          <article className="skills-group" data-anim="card" key={number}>
            {number && <span className="card-number">{number}</span>}
            <Icon aria-hidden="true" />
            <h3>{title}</h3>
            <ul className="skills-list">
              {skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
