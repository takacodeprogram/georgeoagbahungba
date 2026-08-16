"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const badges = ["Agroéconomie", "Full Stack", "Data & IA"];

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let context;

    async function init() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      context = gsap.context(() => {
        gsap.utils.toArray("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 36 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
              },
            },
          );
        });
      }, section);
    }

    init();
    return () => context?.revert();
  }, []);

  return (
    <section className="about" id="a-propos" ref={sectionRef} aria-labelledby="about-title">
      <div className="about-grid">
        <div className="about-visual" data-reveal>
          <div className="about-frame">
            <div className="about-photo">
              <Image
                src="/media/georgeo-about.webp"
                alt="Georgeo Agbahungba"
                fill
                sizes="(max-width: 900px) 100vw, 44vw"
              />
            </div>
          </div>
        </div>

        <div className="about-copy">
          <p className="eyebrow">Qui suis-je</p>
          <h2 id="about-title">À propos</h2>
          <h3>À la croisée de l’agroéconomie <em>et du numérique</em></h3>

          <div className="about-badges">
            {badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>

          <p data-reveal>
            Je suis <strong>Georgeo AGBAHUNGBA</strong>, agroéconomiste (Master 2 FSA/UAC), <strong>développeur Full Stack</strong> et <strong>Data Engineer</strong>. Six années passées à construire des produits numériques, sept à travailler la donnée agricole.
          </p>
          <p data-reveal>
            Mon terrain de travail se situe à l’intersection de l’<strong>économie agricole, du code et de la donnée</strong>. J’y conçois des pipelines ETL, je modélise des bases SQL et je conduis des travaux statistiques et économétriques.
          </p>
          <p data-reveal>
            Côté produit, je développe des applications web et mobiles, et j’automatise les tâches répétitives avec l’IA : traitement de documents, génération de contenu, réponses aux demandes courantes.
          </p>
          <p data-reveal>
            Ce double bagage sert un même objectif : rendre exploitable l’information du secteur agricole, depuis la collecte sur le terrain jusqu’à la mise en production de l’outil qui s’en sert.
          </p>
        </div>
      </div>
    </section>
  );
}
