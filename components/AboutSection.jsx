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
            Je suis <strong>Georgeo AGBAHUNGBA</strong>, titulaire d’un <strong>Master&nbsp;1 en Agroéconomie</strong> à la Faculté des Sciences Agronomiques de l’Université d’Abomey-Calavi (FSA/UAC), actuellement en Master&nbsp;2, et <strong>développeur Full Stack certifié freeCodeCamp</strong> avec plus de <strong>6&nbsp;années d’expérience</strong> dans la conception de solutions digitales.
          </p>
          <p data-reveal>
            Cette double compétence me permet d’évoluer entre <strong>analyse, données et technologie</strong> : statistique, économétrie, collecte et analyse de données, suivi-évaluation de projets et évaluation d’impact.
          </p>
          <p data-reveal>
            Côté tech, je conçois des <strong>applications, plateformes et outils numériques</strong> : digitalisation de processus, automatisation, collecte et gestion de données, solutions métiers.
          </p>
          <p data-reveal>
            Mon objectif : mettre ces compétences au service de solutions <strong>Agritech</strong> qui facilitent le travail des acteurs du secteur et contribuent à la modernisation des activités agricoles.
          </p>
        </div>
      </div>
    </section>
  );
}
