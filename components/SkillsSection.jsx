import { Code2, DatabaseZap, LineChart } from "lucide-react";

export default function SkillsSection({ locale = "fr" }) {
  const isEn = locale === "en";

  const groups = [
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
      title: isEn ? "Products & development" : "Produits & développement",
      skills: [
        "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PHP", "Laravel",
        "Flutter", "React Native", "Expo", "WordPress", "Git", "GitHub", "Docker",
        "DevOps", "CI/CD", "Funnel Building",
      ],
    },
  ];

  return (
    <section className="skills" id="competences" aria-labelledby="skills-title">
      <div className="section-heading">
        <p className="eyebrow">{isEn ? "Skills & Tools" : "Compétences & outils"}</p>
        <h2 id="skills-title" data-anim="title">
          {isEn ? (
            <>Skills covering the<br /><em>entire pipeline.</em></>
          ) : (
            <>Des compétences qui <em>couvrent toute la chaîne.</em></>
          )}
        </h2>
      </div>
      <p className="skills-lead" data-anim="up">
        {isEn
          ? "Collecting field data on the ground, designing data pipelines, performing statistical analysis, developing full-stack applications, and deploying to cloud infrastructure: my technical stack handles the full cycle from raw data to digital product."
          : "Collecter une donnée sur le terrain, construire son pipeline, l’analyser, développer l’application qui l’exploite et la déployer : mon environnement technique couvre le parcours complet de l’information jusqu’au produit."}
      </p>
      <div className="skills-grid">
        {groups.map(({ number, icon: Icon, title, skills }) => (
          <article className="skills-group" data-anim="card" key={number}>
            <span className="card-number">{number}</span>
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
