"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { projects } from "@/data/portfolio";

const filtersFR = [
  { label: "Tous", value: "all" },
  { label: "Web & Mobile", value: "web-mobile" },
  { label: "IA & Automatisation", value: "ia-auto" },
  { label: "Data & Agritech", value: "data-agri" },
];

const filtersEN = [
  { label: "All", value: "all" },
  { label: "Web & Mobile", value: "web-mobile" },
  { label: "AI & Automation", value: "ia-auto" },
  { label: "Data & Agritech", value: "data-agri" },
];

export default function ProjectShowcase({ limit = 6, full = false, locale = "fr", sector = null }) {
  const [activeFilter, setActiveFilter] = useState("all");
  // `sector` fige le filtre : les pages mono-metier n'affichent que leur domaine
  // et se passent de la barre de filtres.
  const pool = sector ? projects.filter((project) => project.sectors.includes(sector)) : projects;
  const filtered = activeFilter === "all" ? pool : pool.filter((project) => project.sectors.includes(activeFilter));

  // Sort projects with images first on homepage
  const featured = [...pool].sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)));
  const items = full ? filtered : featured.slice(0, limit);

  const filters = locale === "en" ? filtersEN : filtersFR;
  const isEn = locale === "en";

  return (
    <>
      {full && (
        <div className="project-filters" aria-label={isEn ? "Filter projects" : "Filtrer les projets"}>
          {filters.map((filter) => (
            <button 
              type="button" 
              className={filter.value === activeFilter ? "is-active" : ""} 
              onClick={() => setActiveFilter(filter.value)} 
              key={filter.value}
            >
              {filter.label}
            </button>
          ))}
          <span>
            {items.length} {isEn ? `result${items.length > 1 ? "s" : ""}` : `résultat${items.length > 1 ? "s" : ""}`}
          </span>
        </div>
      )}
      <div className="project-gallery">
        {items.map((project, index) => {
          const category = typeof project.category === "object" ? (project.category[locale] || project.category["fr"]) : project.category;
          const description = typeof project.description === "object" ? (project.description[locale] || project.description["fr"]) : project.description;
          const tags = typeof project.tags === "object" && !Array.isArray(project.tags) ? (project.tags[locale] || project.tags["fr"]) : project.tags;

          const inner = (
            <>
              <div className="project-art" aria-hidden="true">
                {project.image ? <img className="project-art-img" src={project.image} alt="" data-parallax="9" /> : <span>{project.code}</span>}
                <i>{String(index + 1).padStart(2, "0")}</i>
              </div>
              <div className="project-info">
                <p>{category}</p>
                <h3>{project.name}</h3>
                <span>{description}</span>
                <ul>
                  {tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
              {project.url && <ArrowUpRight className="project-arrow" aria-hidden="true" />}
            </>
          );
          return project.url ? (
            <a className="project-tile" data-anim="up" href={project.url} target="_blank" rel="noreferrer" key={project.name}>{inner}</a>
          ) : (
            <article className="project-tile" data-anim="up" key={project.name}>{inner}</article>
          );
        })}
        {!full && (
          <Link className="all-projects-card" href={isEn ? "/en/projets" : "/projets"}>
            <span>{`${projects.length}+`}</span>
            <strong>{isEn ? "Discover all my projects" : "Découvrir tous mes projets"}</strong>
            <p>{isEn ? "Delivered applications, platforms and experiments." : "Applications, plateformes et expérimentations livrées."}</p>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        )}
      </div>
    </>
  );
}
