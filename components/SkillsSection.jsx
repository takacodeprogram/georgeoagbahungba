import { Code2, DatabaseZap, LineChart } from "lucide-react";

const groups = [
  {
    number: "01",
    icon: LineChart,
    title: "Agroéconomie & Analyse",
    skills: [
      "R", "Stata", "SPSS", "Excel", "KoboToolbox", "ODK", "Power BI", "QGIS",
      "Économétrie", "Statistiques", "Suivi-évaluation", "Évaluation d'impact",
    ],
  },
  {
    number: "02",
    icon: Code2,
    title: "Produits & développement",
    skills: [
      "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PHP", "Laravel",
      "Flutter", "React Native", "Expo", "WordPress", "Git", "GitHub", "Docker",
      "DevOps", "CI/CD", "Funnel Building",
    ],
  },
  {
    number: "03",
    icon: DatabaseZap,
    title: "Data Engineering & Cloud",
    skills: [
      "Python", "SQL", "Supabase", "Google Cloud", "AWS Cloud", "APIs",
      "Pipelines de données (ETL)", "IA générative / LLMs",
    ],
  },
];

export default function SkillsSection() {
  return (
    <section className="skills" id="competences" aria-labelledby="skills-title">
      <div className="section-heading">
        <p className="eyebrow">Compétences & outils</p>
        <h2 id="skills-title" data-anim="title">Des compétences qui <em>couvrent toute la chaîne.</em></h2>
      </div>
      <p className="skills-lead" data-anim="up">
        Collecter une donnée sur le terrain, construire son pipeline, l’analyser, développer l’application qui l’exploite et la déployer : mon environnement technique couvre le parcours complet de l’information jusqu’au produit.
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
