"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { projects } from "@/data/portfolio";

const filters = [
  { label: "Tous", value: "all" },
  { label: "Web & Mobile", value: "web-mobile" },
  { label: "IA & Automatisation", value: "ia-auto" },
  { label: "Data & Agritech", value: "data-agri" },
];

export default function ProjectShowcase({ limit = 6, full = false }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const filtered = activeFilter === "all" ? projects : projects.filter((project) => project.sectors.includes(activeFilter));
  // Sur la home, mettre en avant les projets avec image (les autres suivent dans l'ordre).
  const featured = [...projects].sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)));
  const items = full ? filtered : featured.slice(0, limit);

  return (
    <>
      {full && (
        <div className="project-filters" aria-label="Filtrer les projets">
          {filters.map((filter) => <button type="button" className={filter.value === activeFilter ? "is-active" : ""} onClick={() => setActiveFilter(filter.value)} key={filter.value}>{filter.label}</button>)}
          <span>{items.length} résultat{items.length > 1 ? "s" : ""}</span>
        </div>
      )}
      <div className="project-gallery">
      {items.map((project, index) => {
        const inner = (
          <>
            <div className="project-art" aria-hidden="true">
              {project.image ? <img className="project-art-img" src={project.image} alt="" /> : <span>{project.code}</span>}
              <i>{String(index + 1).padStart(2, "0")}</i>
            </div>
            <div className="project-info">
              <p>{project.category}</p>
              <h3>{project.name}</h3>
              <span>{project.description}</span>
              <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </div>
            {project.url && <ArrowUpRight className="project-arrow" aria-hidden="true" />}
          </>
        );
        return project.url ? (
          <a className="project-tile" href={project.url} target="_blank" rel="noreferrer" key={project.name}>{inner}</a>
        ) : (
          <article className="project-tile" key={project.name}>{inner}</article>
        );
      })}
      {!full && (
        <Link className="all-projects-card" href="/projets">
          <span>15+</span>
          <strong>Découvrir tous mes projets</strong>
          <p>Applications, plateformes, expérimentations et solutions réalisées.</p>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      )}
      </div>
    </>
  );
}
