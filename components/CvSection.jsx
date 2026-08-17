import Link from "next/link";
import { ArrowUpRight, Download, Eye, Languages } from "lucide-react";
import { cvs } from "@/data/portfolio";

export default function CvSection() {
  return (
    <section className="cv-section" id="cv" aria-labelledby="cv-title">
      <div className="section-heading cv-heading">
        <p className="eyebrow" data-anim="up">Mon parcours</p>
        <h2 id="cv-title" data-anim="title">Un parcours.<br /><em>Plusieurs angles de lecture.</em></h2>
      </div>
      <p className="cv-lead" data-anim="up">Agroéconomie, développement, Data Engineering : choisissez la version de mon parcours la plus pertinente pour votre contexte.</p>
      <div className="cv-grid">
        {cvs.map((cv) => (
          <article className="cv-card" data-anim="card" key={cv.title}>
            <span className="cv-number">{cv.number}</span>
            <Languages aria-hidden="true" />
            <h3>{cv.title}</h3>
            <p className="cv-subtitle">{cv.subtitle}</p>
            <p className="cv-desc">{cv.description}</p>
            <div className="cv-actions">
              <div><strong>FR</strong><a href={cv.fr} target="_blank" rel="noreferrer"><Eye aria-hidden="true" /> Voir</a><a href={cv.fr} download><Download aria-hidden="true" /> PDF</a></div>
              <div><strong>EN</strong><a href={cv.en} target="_blank" rel="noreferrer"><Eye aria-hidden="true" /> View</a><a href={cv.en} download><Download aria-hidden="true" /> PDF</a></div>
            </div>
          </article>
        ))}
      </div>
      <div className="cv-section-footer">
        <Link href="/cv">Voir tous mes CV <ArrowUpRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
