import AnimatedMetric from "@/components/AnimatedMetric";
import { journey, projects } from "@/data/portfolio";

// Le nombre de projets suit la liste réelle, et les domaines suivent les trois
// groupes de compétences affichés plus haut.
const metrics = [
  { value: "7+", label: "Années en agronomie" },
  { value: "6+", label: "Années en développement" },
  { value: `${projects.length}+`, label: "Projets réalisés" },
  { value: "03", label: "Domaines d'expertise" },
];

export default function JourneySection() {
  return (
    <section className="journey" id="parcours" aria-labelledby="journey-title">
      <div className="journey-intro">
        <p className="eyebrow">Expériences</p>
        <h2 id="journey-title" data-anim="title">Des expériences qui ont<br /><em>construit ma pratique.</em></h2>
        <p>Missions de terrain, développement logiciel, traitement de données : chaque étape a laissé une manière de travailler que je continue d'appliquer.</p>
      </div>
      <div className="metric-strip">
        {metrics.map(({ value, label }) => <AnimatedMetric value={value} label={label} key={label} />)}
      </div>
      <div className="journey-list">
        {journey.map((item, index) => (
          <article data-anim="up" key={item.role}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <time>{item.period}</time>
            <div className="journey-role">
              <h3>{item.role}</h3>
              <p className="journey-org">{item.org}</p>
              <p className="journey-detail">{item.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
