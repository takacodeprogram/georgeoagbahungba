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
            Je suis <strong>Georgeo AGBAHUNGBA</strong>, agroéconomiste (Master 2 FSA/UAC), <strong>développeur Full Stack</strong> et <strong>Data Engineer</strong> avec plus de 6&nbsp;années d’expérience dans la conception de solutions numériques et d'architectures de données.
          </p>
          <p data-reveal>
            J'évolue à l’intersection de l'<strong>analyse, du code et de la donnée</strong>. Je conçois des pipelines de données (ETL) robustes, gère des bases de données SQL complexes et réalise des analyses statistiques et économétriques.
          </p>
          <p data-reveal>
            Côté tech et IA, je bâtis des applications web et mobiles sur-mesure et automatise des flux intelligents pour structurer et valoriser l'information.
          </p>
          <p data-reveal>
            Mon objectif : mettre cette synergie au service des <strong>technologies de la donnée</strong>, de l'<strong>Agritech</strong> et de projets numériques à fort impact, de la collecte de données terrain jusqu'à la mise en production.
          </p>
        </div>
      </div>
    </section>
  );
}
