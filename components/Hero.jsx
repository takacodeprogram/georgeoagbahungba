"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import SiteHeader from "@/components/SiteHeader";

const chapters = [
  {
    key: "vision",
    tab: "Vision",
    eyebrow: "Des expertises complémentaires pour un objectif unique",
    title: ["Innover"],
    accent: "pour le développement",
    copy: "Je mets mes compétences au service de projets innovants, avec l’ambition de créer des solutions utiles qui contribuent au développement.",
  },
  {
    key: "agro",
    tab: "Agroéconomie",
    eyebrow: "AGRO • DATA • AGRITECH",
    title: ["L’expertise agricole"],
    accent: "augmentée par la tech",
    copy: "J’allie expertise agroéconomique, données et technologies numériques pour analyser les enjeux agricoles et développer des solutions adaptées aux réalités du secteur.",
  },
  {
    key: "code",
    tab: "Développement",
    eyebrow: "Web • Mobile • IA • Automatisation",
    title: ["Concevoir. Développer."],
    accent: "Déployer.",
    copy: "Je transforme les besoins et les idées en applications, plateformes et solutions digitales fonctionnelles, de la conception jusqu’à la mise en production.",
  },
  {
    key: "data-eng",
    tab: "Data Engineering",
    eyebrow: "Pipelines • SQL • Automatisation",
    title: ["Structurer. Connecter."],
    accent: "Fiabiliser.",
    copy: "Je conçois et déploie des architectures et des pipelines de données (ETL) robustes pour fluidifier et automatiser l’accès à des informations prêtes à l’analyse.",
  },
];

const frames = [
  { key: "neutral", src: "/media/georgeo-vision.webp", kind: "cover", priority: true },
  { key: "agro", src: "/media/georgeo-agroeconomiste.webp", kind: "cover" },
  { key: "developer", src: "/media/developer-front.webp", kind: "cover" },
  { key: "data-eng", src: "/media/data-engineer.png", kind: "cover" },
];

const chapterStops = [0, 0.25, 0.5, 0.75];
const chapterJumpStops = [0, 0.38, 0.64, 0.90];

export default function Hero() {
  const storyRef = useRef(null);
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const mediaRef = useRef(null);
  const framesRef = useRef([]);
  const chaptersRef = useRef([]);
  const tabsRef = useRef([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    let dispose = () => {};

    async function init() {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const story = storyRef.current;
      const hero = heroRef.current;
      const media = mediaRef.current;
      const imageFrames = framesRef.current.filter(Boolean);
      const copyFrames = chaptersRef.current.filter(Boolean);
      const tabs = tabsRef.current.filter(Boolean);
      const chapterOffset = window.matchMedia("(max-width: 780px)").matches ? 0 : -50;
      if (!story || !hero || !media) return;

      const safetyTimers = [];
      const reveal = (targets, vars) => {
        const tween = gsap.from(targets, vars);
        safetyTimers.push(
          window.setTimeout(() => {
            gsap.set(targets, { clearProps: "opacity,visibility,transform" });
            tween.kill();
          }, 2600),
        );
        return tween;
      };

      const startEntrance = () => {
        reveal(".brand, .nav-links, .nav-contact, .story-tabs", {
          opacity: 0,
          y: -16,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
        });
        reveal(".chapter-0 .hero-word, .chapter-0 .chapter-copy, .chapter-0 .hero-actions", {
          opacity: 0,
          y: 28,
          duration: 0.9,
          stagger: 0.075,
          ease: "power3.out",
        });
        reveal(imageFrames[0], { opacity: 0, scale: 1.08, duration: 1.15, ease: "power3.out" });
      };

      // Ne jamais laisser le premier slide caché : l'animation d'entrée ne se
      // lance que si le document est visible (rAF actif), sinon on attend
      // qu'il le devienne — le contenu reste affiché par défaut.
      let onVisible = () => {};
      if (document.visibilityState === "visible") {
        startEntrance();
      } else {
        onVisible = () => {
          if (document.visibilityState === "visible") {
            document.removeEventListener("visibilitychange", onVisible);
            startEntrance();
          }
        };
        document.addEventListener("visibilitychange", onVisible);
        safetyTimers.push(window.setTimeout(startEntrance, 1600));
      }

      const context = gsap.context(() => {
        gsap.set(imageFrames, { autoAlpha: 0 });
        gsap.set(imageFrames[0], { autoAlpha: 1 });
        gsap.set(copyFrames, { autoAlpha: 0, yPercent: chapterOffset, y: 34 });
        gsap.set(copyFrames[0], { autoAlpha: 1, yPercent: chapterOffset, y: 0 });

        const showFrame = (timeline, index, at, duration = 0.38) => {
          timeline
            .to(imageFrames[index - 1], { autoAlpha: 0, duration, ease: "sine.inOut" }, at)
            .fromTo(
              imageFrames[index],
              { autoAlpha: 0 },
              { autoAlpha: 1, duration, ease: "sine.inOut" },
              at,
            );
        };

        const changeChapter = (timeline, from, to, at) => {
          timeline
            .to(copyFrames[from], { autoAlpha: 0, y: -12, duration: 0.2, ease: "sine.in" }, at)
            .fromTo(
              copyFrames[to],
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.26, ease: "sine.out" },
              at + 0.2,
            );
        };

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
            let active = 0;
            if (progress >= chapterStops[3]) active = 3;
            else if (progress >= chapterStops[2]) active = 2;
            else if (progress >= chapterStops[1]) active = 1;
            tabs.forEach((tab, index) => {
              tab.classList.toggle("is-active", index === active);
              tab.setAttribute("aria-selected", String(index === active));
            });
            const counter = hero.querySelector(".story-count");
            if (counter) counter.textContent = `${String(Math.min(4, Math.floor(progress * 4) + 1)).padStart(2, "0")} — 04`;
          },
        });

        timelineRef.current = timeline;
        timeline.to({}, { duration: 1.0 });
        showFrame(timeline, 1, 1.0);
        changeChapter(timeline, 0, 1, 1.04);

        showFrame(timeline, 2, 2.0);
        changeChapter(timeline, 1, 2, 2.04);

        showFrame(timeline, 3, 3.0);
        changeChapter(timeline, 2, 3, 3.04);

        timeline
          .to({}, { duration: 1.0 })
          .to(media, { scale: 1.035, duration: 4.0, ease: "none" }, 0)
          .to(".hero-orbit", { rotate: 210, duration: 4.0, ease: "none" }, 0)
          .to(".orbit-core", { rotate: -300, duration: 4.0, ease: "none" }, 0)
          .to(".scroll-progress", { scaleX: 1, duration: 4.0, ease: "none" }, 0);

        const moveX = gsap.quickTo(media, "x", { duration: 0.9, ease: "power3.out" });
        const moveY = gsap.quickTo(media, "y", { duration: 0.9, ease: "power3.out" });
        const onPointerMove = (event) => {
          moveX((event.clientX / window.innerWidth - 0.5) * 12);
          moveY((event.clientY / window.innerHeight - 0.5) * 7);
          hero.style.setProperty("--pointer-x", `${event.clientX}px`);
          hero.style.setProperty("--pointer-y", `${event.clientY}px`);
        };
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        dispose = () => window.removeEventListener("pointermove", onPointerMove);
      }, hero);

      const previousDispose = dispose;
      dispose = () => {
        document.removeEventListener("visibilitychange", onVisible);
        safetyTimers.forEach((timer) => window.clearTimeout(timer));
        previousDispose();
        context.revert();
      };
    }

    init();
    return () => dispose();
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const story = storyRef.current;
    if (!nav || !story) return undefined;

    const updateNav = () => {
      const releasePoint = story.offsetTop + story.offsetHeight - window.innerHeight;
      nav.classList.toggle("is-light", window.scrollY >= releasePoint - 2);
    };

    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);
    return () => {
      window.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
    };
  }, []);

  function jumpToChapter(index) {
    const story = storyRef.current;
    if (!story) return;
    const maxTravel = story.offsetHeight - window.innerHeight;
    window.scrollTo({ top: story.offsetTop + maxTravel * chapterJumpStops[index], behavior: "smooth" });
  }

  return (
    <>
      <SiteHeader ref={navRef} />

      <div className="hero-story" ref={storyRef}>
      <header className="hero" ref={heroRef} id="top">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-pointer-light" aria-hidden="true" />

        <div className="story-tabs" role="tablist" aria-label="Chapitres de mon parcours">
          {chapters.map((chapter, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={index === 0}
              className={index === 0 ? "is-active" : ""}
              key={chapter.key}
              ref={(node) => { tabsRef.current[index] = node; }}
              onClick={() => jumpToChapter(index)}
            >
              <span>0{index + 1}</span>{chapter.tab}
            </button>
          ))}
        </div>

        <div className="hero-media" ref={mediaRef} aria-hidden="true">
          {frames.map((frame, index) => (
            <div
              className={`story-frame frame-${frame.kind}`}
              key={frame.key}
              ref={(node) => { framesRef.current[index] = node; }}
            >
              <Image
                src={frame.src}
                alt=""
                fill
                priority={frame.priority}
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit-core"><i /><i /><i /></div>
          <span>AGRO</span><span>CODE</span><span>DATA</span><span>IA</span>
        </div>

        <div className="hero-chapters">
          {chapters.map((chapter, index) => (
            <div
              className={`hero-chapter chapter-${index}`}
              key={chapter.key}
              ref={(node) => { chaptersRef.current[index] = node; }}
            >
              <p className="chapter-eyebrow">{chapter.eyebrow}</p>
              <h1>
                {chapter.title.map((line) => <span className="hero-word" key={line}>{line}</span>)}
                <em className="hero-word">{chapter.accent}</em>
              </h1>
              <p className="chapter-copy">{chapter.copy}</p>
              <div className="hero-actions">
                <a className="primary-action" href="#projets">Voir mes projets <ArrowDownRight aria-hidden="true" /></a>
                <a className="text-action" href="mailto:contact@georgeo-agbahungba.xyz">Me contacter <ArrowUpRight aria-hidden="true" /></a>
              </div>
            </div>
          ))}
        </div>

        <div className="hero-footerline">
          <span><MapPin size={14} aria-hidden="true" /> Cotonou, Bénin</span>
          <span>Faites défiler pour explorer</span>
          <span className="story-count">01 — 04</span>
        </div>
        <div className="scroll-track" aria-hidden="true"><i className="scroll-progress" /></div>
      </header>
      </div>
    </>
  );
}
