"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { roles } from "@/data/roles";

const badgesFR = ["Agroéconomie", "Full Stack", "Data & IA"];
const badgesEN = ["Agroeconomics", "Full Stack", "Data & AI"];

export default function AboutSection({ locale = "fr", roleKey = null }) {
  const sectionRef = useRef(null);
  const isEn = locale === "en";
  const lang = isEn ? "en" : "fr";
  // Les pages mono-metier reprennent la section a l’identique et n’echangent
  // que le texte : meme grille, meme photo, meme animation.
  const role = roleKey ? roles[roleKey] : null;
  const badges = role ? role.about.badges[lang] : (isEn ? badgesEN : badgesFR);

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
          <p className="eyebrow">{isEn ? "Who I am" : "Qui suis-je"}</p>
          <h2 id="about-title">{isEn ? "About Me" : "À propos"}</h2>
          <h3>
            {role ? (
              <>{role.about.h3[lang][0]} <em>{role.about.h3[lang][1]}</em></>
            ) : isEn ? (
              <>At the crossroads of agroeconomics <em>and technology</em></>
            ) : (
              <>À la croisée de l’agroéconomie <em>et du numérique</em></>
            )}
          </h3>

          <div className="about-badges">
            {badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>

          {role ? (
            role.about.p[lang].map((texte) => (
              <p data-reveal key={texte.slice(0, 24)} dangerouslySetInnerHTML={{ __html: texte }} />
            ))
          ) : isEn ? (
            <>
              <p data-reveal>
                I am <strong>Georgeo AGBAHUNGBA</strong>, an agroeconomist, Full Stack Developer, and Data Engineer. My career has been built at the intersection of agricultural projects, data analytics, and digital product creation.
              </p>
              <p data-reveal>
                I handle the entire information value chain: collecting, cleaning, structuring, analyzing, automating, and transforming raw data into highly usable tools.
              </p>
              <p data-reveal>
                On the data side, I design ETL pipelines, SQL schemas, and processing scripts to make data reliable and actionable. On the product side, I build web and mobile applications, integrating AI wherever automation adds real, tangible value.
              </p>
              <p data-reveal>
                Agriculture remains my primary field of specialization: field surveys, agricultural markets, monitoring & evaluation, information systems, and Agritech.
              </p>
              <p data-reveal>
                My goal is never to throw technology at a problem. It is to architect the right solution starting from the problem itself.
              </p>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}
