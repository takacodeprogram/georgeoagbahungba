import Link from "next/link";
import { ArrowUpRight, Download, Eye, Languages } from "lucide-react";
import { cvs } from "@/data/portfolio";

export default function CvSection({ locale = "fr" }) {
  const isEn = locale === "en";
  return (
    <section className="cv-section" id="cv" aria-labelledby="cv-title">
      <div className="section-heading cv-heading">
        <p className="eyebrow" data-anim="up">{isEn ? "My Journey" : "Mon parcours"}</p>
        <h2 id="cv-title" data-anim="title">
          {isEn ? (
            <>One career.<br /><em>Multiple perspectives.</em></>
          ) : (
            <>Un parcours.<br /><em>Plusieurs angles de lecture.</em></>
          )}
        </h2>
      </div>
      <p className="cv-lead" data-anim="up">
        {isEn 
          ? "Agroeconomics, development, Data Engineering: select the version of my career path that best matches your target context." 
          : "Agroéconomie, développement, Data Engineering : choisissez la version de mon parcours la plus pertinente pour votre contexte."}
      </p>
      <div className="cv-grid">
        {cvs.map((cv) => {
          const title = typeof cv.title === "object" ? (cv.title[locale] || cv.title["fr"]) : cv.title;
          const subtitle = typeof cv.subtitle === "object" ? (cv.subtitle[locale] || cv.subtitle["fr"]) : cv.subtitle;
          const description = typeof cv.description === "object" ? (cv.description[locale] || cv.description["fr"]) : cv.description;

          return (
            <article className="cv-card" data-anim="card" key={title}>
              <span className="cv-number">{cv.number}</span>
              <Languages aria-hidden="true" />
              <h3>{title}</h3>
              <p className="cv-subtitle">{subtitle}</p>
              <p className="cv-desc">{description}</p>
              <div className="cv-actions">
                <a href={isEn ? cv.en : cv.fr} target="_blank" rel="noreferrer">
                  <Eye aria-hidden="true" /> {isEn ? "View" : "Voir"}
                </a>
                <a href={isEn ? cv.en : cv.fr} download>
                  <Download aria-hidden="true" /> {isEn ? "Download" : "Télécharger"}
                </a>
              </div>
            </article>
          );
        })}
      </div>
      <div className="cv-section-footer">
        <Link href={isEn ? "/en/cv" : "/cv"}>
          {isEn ? "View all my CVs" : "Voir tous mes CV"} <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
