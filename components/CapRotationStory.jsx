"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const capFramesFR = [
  { key: "agro-front", src: "/media/caps-rotation/cap-agro-front.webp", label: "Agroéconomie" },
  { key: "dev-front", src: "/media/caps-rotation/cap-dev-front.webp", label: "Développement" },
  { key: "data-eng-front", src: "/media/caps-rotation/cap-data-engineer.png", label: "Data Engineering" },
];

const capFramesEN = [
  { key: "agro-front", src: "/media/caps-rotation/cap-agro-front.webp", label: "Agroeconomics" },
  { key: "dev-front", src: "/media/caps-rotation/cap-dev-front.webp", label: "Development" },
  { key: "data-eng-front", src: "/media/caps-rotation/cap-data-engineer.png", label: "Data Engineering" },
];

export default function CapRotationStory({ locale = "fr" }) {
  const storyRef = useRef(null);
  const stageRef = useRef(null);
  const framesRef = useRef([]);
  const copyRef = useRef([]);
  const isEn = locale === "en";
  const capFrames = isEn ? capFramesEN : capFramesFR;

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
        gsap.set(copy[1], { autoAlpha: 0, y: 24 });
        gsap.set(copy[2], { autoAlpha: 0, y: 24 });

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
            let index = 0;
            if (progress >= 0.66) index = 2;
            else if (progress >= 0.33) index = 1;
            const count = stage.querySelector(".cap-count");
            const angle = stage.querySelector(".cap-angle");
            if (count) count.textContent = `0${index + 1} / 03`;
            if (angle) angle.textContent = capFrames[index].label;
          },
        });

        timeline
          .to({}, { duration: 1 })
          
          .to(frames[0], { autoAlpha: 0, scale: 1.03, duration: 0.25, ease: "sine.inOut" }, 1.05)
          .fromTo(frames[1], { autoAlpha: 0, scale: 0.975 }, { autoAlpha: 1, scale: 1, duration: 0.25, ease: "sine.inOut" }, 1.05)
          .to(copy[0], { autoAlpha: 0, y: -16, duration: 0.18, ease: "sine.in" }, 1.08)
          .fromTo(copy[1], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.22, ease: "sine.out" }, 1.26)
          
          .to(frames[1], { autoAlpha: 0, scale: 1.03, duration: 0.25, ease: "sine.inOut" }, 2.3)
          .fromTo(frames[2], { autoAlpha: 0, scale: 0.975 }, { autoAlpha: 1, scale: 1, duration: 0.25, ease: "sine.inOut" }, 2.3)
          .to(copy[1], { autoAlpha: 0, y: -16, duration: 0.18, ease: "sine.in" }, 2.33)
          .fromTo(copy[2], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.22, ease: "sine.out" }, 2.51)
          
          .to(".cap-progress i", { scaleX: 1, duration: 3.0 }, 0)
          .to(".cap-orbit", { rotate: 180, duration: 3.0 }, 0)
          .to({}, { duration: 0.5 });
      }, stage);
    }

    init();
    return () => context?.revert();
  }, [locale]);

  return (
    <section className="cap-story" ref={storyRef} aria-labelledby="cap-story-title">
      <div className="cap-stage" ref={stageRef}>
        <div className="cap-grid" aria-hidden="true" />
        <div className="cap-copy-stack">
          {/* Slide 1 */}
          <div className="cap-copy-panel" ref={(node) => { copyRef.current[0] = node; }}>
            <p className="eyebrow">{isEn ? "01 — Agroeconomics" : "01 — Agroéconomie"}</p>
            <h2 id="cap-story-title">{isEn ? "Analyze to better decide" : "Analyser pour mieux décider"}</h2>
            <p>
              {isEn
                ? "Economic analysis, statistics, econometrics, fieldwork, and monitoring & evaluation (M&E) applied to agricultural issues."
                : "Analyse économique, statistique, économétrie, collecte de données, suivi-évaluation et évaluation d’impact appliqués aux problématiques agricoles."}
            </p>
          </div>
          {/* Slide 2 */}
          <div className="cap-copy-panel" ref={(node) => { copyRef.current[1] = node; }}>
            <p className="eyebrow">{isEn ? "02 — Software Development" : "02 — Développement logiciel"}</p>
            <h2>{isEn ? "Design to better act" : "Concevoir pour mieux agir"}</h2>
            <p>
              {isEn
                ? "Designing applications, platforms, and digital tools to automate workflows, process data, and meet business needs."
                : "Conception d’applications, de plateformes et d’outils digitaux pour automatiser les processus, exploiter les données et répondre à des besoins métiers."}
            </p>
          </div>
          {/* Slide 3 */}
          <div className="cap-copy-panel" ref={(node) => { copyRef.current[2] = node; }}>
            <p className="eyebrow">03 — Data Engineering</p>
            <h2>{isEn ? "Structure to better analyze" : "Structurer pour mieux analyser"}</h2>
            <p>
              {isEn
                ? "Designing architectures, database models, and automated ETL pipelines to secure and streamline complex data flows."
                : "Conception d’architectures, modélisation de bases de données et pipelines ETL automatisés pour fiabiliser et fluidifier les flux de données complexes."}
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
          <span className="cap-count">01 / 03</span>
          <span className="cap-angle">{capFrames[0].label}</span>
          <span>{isEn ? "From analysis to product" : "De l’analyse au produit"}</span>
        </div>
        <div className="cap-progress" aria-hidden="true"><i /></div>
      </div>
    </section>
  );
}
