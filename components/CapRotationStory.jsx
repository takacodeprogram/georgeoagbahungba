"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const capFrames = [
  { key: "agro-front", src: "/media/caps-rotation/cap-agro-front.webp", label: "Agroéconomie" },
  { key: "dev-front", src: "/media/caps-rotation/cap-dev-front.webp", label: "Développement" },
];

export default function CapRotationStory() {
  const storyRef = useRef(null);
  const stageRef = useRef(null);
  const framesRef = useRef([]);
  const copyRef = useRef([]);

  useEffect(() => {
    let context;

    async function init() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const story = storyRef.current;
      const stage = stageRef.current;
      const frames = framesRef.current.filter(Boolean);
      const copy = copyRef.current.filter(Boolean);
      if (!story || !stage || frames.length !== capFrames.length) return;

      context = gsap.context(() => {
        gsap.set(frames, { autoAlpha: 0, scale: 0.98 });
        gsap.set(frames[0], { autoAlpha: 1, scale: 1 });
        // Le second texte est retiré du flux tant que le premier est affiché :
        // les deux ne peuvent jamais se superposer, même figé à mi-scroll.
        gsap.set(copy[1], { display: "none", autoAlpha: 0, y: 24 });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: story,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
          onUpdate() {
            const progress = timeline.progress();
            const index = progress >= 0.5 ? 1 : 0;
            const count = stage.querySelector(".cap-count");
            const angle = stage.querySelector(".cap-angle");
            if (count) count.textContent = `0${index + 1} / 02`;
            if (angle) angle.textContent = capFrames[index].label;
          },
        });

        timeline
          .to({}, { duration: 1 })
          .to(frames[0], { autoAlpha: 0, scale: 1.03, duration: 0.25, ease: "sine.inOut" }, 1.05)
          .fromTo(frames[1], { autoAlpha: 0, scale: 0.975 }, { autoAlpha: 1, scale: 1, duration: 0.25, ease: "sine.inOut" }, 1.05)
          // Swap séquentiel des textes : le suivant n'est remis dans le flux
          // (display) qu'une fois le précédent entièrement sorti.
          .to(copy[0], { autoAlpha: 0, y: -16, duration: 0.18, ease: "sine.in" }, 1.08)
          .set(copy[1], { display: "block", autoAlpha: 0, y: 14 }, 1.26)
          .to(copy[1], { autoAlpha: 1, y: 0, duration: 0.22, ease: "sine.out" }, 1.28)
          .to(".cap-progress i", { scaleX: 1, duration: 1.6 }, 0)
          .to(".cap-orbit", { rotate: 90, duration: 1.6 }, 0)
          .to({}, { duration: 0.4 });
      }, stage);
    }

    init();
    return () => context?.revert();
  }, []);

  return (
    <section className="cap-story" ref={storyRef} aria-labelledby="cap-story-title">
      <div className="cap-stage" ref={stageRef}>
        <div className="cap-grid" aria-hidden="true" />
        <div className="cap-copy-stack">
          <div className="cap-copy-panel" ref={(node) => { copyRef.current[0] = node; }}>
            <p className="eyebrow">01 — Agroéconomie</p>
            <h2 id="cap-story-title">Analyser pour mieux décider</h2>
            <p>
              Analyse économique, statistique, économétrie, collecte de données, suivi-évaluation et
              évaluation d’impact appliqués aux problématiques agricoles.
            </p>
          </div>
          <div className="cap-copy-panel" ref={(node) => { copyRef.current[1] = node; }}>
            <p className="eyebrow">02 — Développement logiciel</p>
            <h2>Concevoir pour mieux agir</h2>
            <p>
              Conception d’applications, de plateformes et d’outils digitaux pour automatiser les processus,
              exploiter les données et répondre à des besoins métiers.
            </p>
          </div>
        </div>

        <div className="cap-visual" aria-hidden="true">
          <div className="cap-orbit"><i /><i /><i /></div>
          {capFrames.map((frame, index) => (
            <div
              className={`cap-frame cap-frame-${index}`}
              key={frame.key}
              ref={(node) => { framesRef.current[index] = node; }}
            >
              <Image
                src={frame.src}
                alt=""
                fill
                priority={index === 0}
                sizes="(max-width: 780px) 100vw, 62vw"
              />
            </div>
          ))}
        </div>

        <div className="cap-meta">
          <span className="cap-count">01 / 02</span>
          <span className="cap-angle">Agroéconomie</span>
          <span>De l’analyse au produit</span>
        </div>
        <div className="cap-progress" aria-hidden="true"><i /></div>
      </div>
    </section>
  );
}
