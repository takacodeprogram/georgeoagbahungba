import AnimatedMetric from "@/components/AnimatedMetric";
import { journey, projects } from "@/data/portfolio";

// Le nombre de projets suit la liste réelle, et les domaines suivent les trois
// groupes de compétences affichés plus haut.
const metrics = [
  { value: "7+", label: "Années dans le secteur agricole" },
  { value: "6+", label: "Années de développement" },
  { value: `${projects.length}+`, label: "Projets & produits" },
  { value: "3", label: "Expertises complémentaires" },
];

export default function JourneySection() {
  return (
    <section className="journey" id="parcours" aria-labelledby="journey-title">
      <div className="journey-intro">
        <p className="eyebrow">Expériences</p>
        <h2 id="journey-title" data-anim="title">Des expériences qui ont<br /><em>construit ma pratique.</em></h2>
        <p>Du terrain agricole au développement logiciel, puis de la donnée aux produits numériques : chaque expérience a ajouté une pièce à une même pratique — comprendre, structurer et construire.</p>
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
