import { Code2, DatabaseZap } from "lucide-react";

const groups = [
  {
    number: "01",
    icon: Code2,
    title: "Développement & Technologie",
    skills: [
      "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PHP", "Laravel",
      "React Native", "Expo", "WordPress", "SQL", "Supabase", "Git", "GitHub",
      "Docker", "APIs", "IA générative",
    ],
  },
  {
    number: "02",
    icon: DatabaseZap,
    title: "Agroéconomie & Data",
    skills: [
      "R", "Stata", "SPSS", "Excel", "KoboToolbox", "ODK", "Power BI", "QGIS",
      "Économétrie", "Statistiques", "Analyse de données", "Suivi-évaluation",
      "Évaluation d'impact",
    ],
  },
];

export default function SkillsSection() {
  return (
    <section className="skills" id="competences" aria-labelledby="skills-title">
      <div className="section-heading">
        <p className="eyebrow">Compétences & outils</p>
        <h2 id="skills-title">Les outils derrière <em>mes réalisations.</em></h2>
      </div>
      <p className="skills-lead">
        Des technologies de développement aux outils d’analyse, de collecte et de traitement des
        données, voici l’environnement que j’utilise pour concevoir et mener mes projets.
      </p>
      <div className="skills-grid">
        {groups.map(({ number, icon: Icon, title, skills }) => (
          <article className="skills-group" key={number}>
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
