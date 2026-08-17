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
            Je suis <strong>Georgeo AGBAHUNGBA</strong>, agroéconomiste, développeur Full Stack et Data Engineer. Mon parcours s’est construit entre missions agricoles, analyse de données et développement de produits numériques.
          </p>
          <p data-reveal>
            J’interviens sur toute la chaîne de valeur de l’information : collecter, nettoyer, structurer, analyser, automatiser et transformer la donnée en outils utilisables.
          </p>
          <p data-reveal>
            Côté data, je conçois des pipelines ETL, des modèles SQL et des systèmes de traitement destinés à rendre les données plus fiables et exploitables. Côté produit, je développe des applications web et mobiles et j’intègre l’IA lorsque l’automatisation apporte une réelle valeur.
          </p>
          <p data-reveal>
            L’agriculture reste mon terrain de spécialisation privilégié : données de terrain, marchés agricoles, suivi-évaluation, systèmes d’information et Agritech.
          </p>
          <p data-reveal>
            Mon objectif n’est pas d’ajouter de la technologie à un problème. C’est de construire la bonne solution à partir du problème.
          </p>
        </div>
      </div>
    </section>
  );
}
