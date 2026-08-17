import AnimatedMetric from "@/components/AnimatedMetric";
import { journey, projects } from "@/data/portfolio";

export default function JourneySection({ locale = "fr" }) {
  const isEn = locale === "en";

  const metrics = [
    { value: "7+", label: isEn ? "Years in the agricultural sector" : "Années dans le secteur agricole" },
    { value: "6+", label: isEn ? "Years of development experience" : "Années de développement" },
    { value: `${projects.length}+`, label: isEn ? "Projects & products" : "Projets & produits" },
    { value: "3", label: isEn ? "Complementary expertises" : "Expertises complémentaires" },
  ];

  return (
    <section className="journey" id="parcours" aria-labelledby="journey-title">
      <div className="journey-intro">
        <p className="eyebrow">{isEn ? "Experiences" : "Expériences"}</p>
        <h2 id="journey-title" data-anim="title">
          {isEn ? (
            <>Experiences that<br /><em>shaped my practice.</em></>
          ) : (
            <>Des expériences qui ont<br /><em>construit ma pratique.</em></>
          )}
        </h2>
        <p>
          {isEn
            ? "From agricultural fieldwork to software development, then from data to digital products: each experience has added a piece to a unified practice — understanding, structuring, and building."
            : "Du terrain agricole au développement logiciel, puis de la donnée aux produits numériques : chaque expérience a ajouté une pièce à une même pratique — comprendre, structurer et construire."}
        </p>
      </div>
      <div className="metric-strip">
        {metrics.map(({ value, label }) => <AnimatedMetric value={value} label={label} key={label} />)}
      </div>
      <div className="journey-list">
        {journey.map((item, index) => {
          const role = typeof item.role === "object" ? (item.role[locale] || item.role["fr"]) : item.role;
          const detail = typeof item.detail === "object" ? (item.detail[locale] || item.detail["fr"]) : item.detail;

          return (
            <article data-anim="up" key={role}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <time>{item.period}</time>
              <div className="journey-role">
                <h3>{role}</h3>
                <p className="journey-org">{item.org}</p>
                <p className="journey-detail">{detail}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
