"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";

const chapters = [
  {
    key: "vision",
    tab: "Vision",
    eyebrow: "Des expertises complémentaires pour un objectif unique",
    title: ["Innover"],
    accent: "pour le développement",
    copy: "Je mets mes compétences au service de projets innovants, avec l’ambition de créer des solutions utiles qui contribuent au développement.",
    orbit: ["AGRO", "CODE", "DATA", "IA"],
  },
  {
    key: "agro",
    tab: "Agroéconomie",
    eyebrow: "AGRO • DATA • AGRITECH",
    title: ["L’expertise agricole"],
    accent: "augmentée par la tech",
    copy: "J’allie expertise agroéconomique, données et technologies numériques pour analyser les enjeux agricoles et développer des solutions adaptées aux réalités du secteur.",
    orbit: ["AGRO", "DATA", "TECH", "TERRAIN"],
  },
  {
    key: "code",
    tab: "Développement",
    eyebrow: "Web • Mobile • IA • Automatisation",
    title: ["Concevoir. Développer."],
    accent: "Déployer.",
    copy: "Je transforme les besoins et les idées en applications, plateformes et solutions digitales fonctionnelles, de la conception jusqu’à la mise en production.",
    orbit: ["WEB", "MOBILE", "IA", "AUTO"],
  },
  {
    key: "data-eng",
    tab: "Data Engineering",
    eyebrow: "Pipelines • SQL • Automatisation",
    title: ["Structurer. Connecter."],
    accent: "Fiabiliser.",
    copy: "Je conçois et déploie des architectures et des pipelines de données (ETL) robustes pour fluidifier et automatiser l’accès à des informations prêtes à l’analyse.",
    orbit: ["ETL", "SQL", "FLUX", "AUTO"],
  },
];

const frames = [
  { key: "neutral", src: "/media/georgeo-vision.webp", kind: "cover", priority: true },
  { key: "agro", src: "/media/georgeo-agroeconomiste.webp", kind: "cover" },
  { key: "developer", src: "/media/developer-front.webp", kind: "cover" },
  { key: "data-eng", src: "/media/data-engineer.png", kind: "cover" },
];

// Repères temporels de la timeline GSAP (en secondes). Chaque chapitre dispose
// d'un palier stable ; les transitions se jouent d'un palier à l'autre.
const TIMELINE_SPAN = 4.5;
// Instant exact où l'ancien texte a disparu et où le nouveau prend la main :
// c'est là que l'onglet et le compteur doivent basculer.
const CHAPTER_SWITCH_TIMES = [0, 1.25, 2.25, 3.25];
// Centre du palier stable de chaque chapitre : point d'arrêt du défilement.
const CHAPTER_REST_TIMES = [0, 1.77, 2.77, 4.0];

const chapterStops = CHAPTER_SWITCH_TIMES.map((time) => time / TIMELINE_SPAN);
const chapterRestStops = CHAPTER_REST_TIMES.map((time) => time / TIMELINE_SPAN);
// Le dernier arrêt (fin du pin) permet de quitter le hero sans jamais rester
// coincé sur le quatrième chapitre.
const scrollStops = [...chapterRestStops, 1];

export default function Hero() {
  const storyRef = useRef(null);
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const mediaRef = useRef(null);
  const framesRef = useRef([]);
  const chaptersRef = useRef([]);
  const timelineRef = useRef(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

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
      const chapterOffset = window.matchMedia("(max-width: 780px)").matches ? 0 : -50;
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
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
            // Sur pointeur fin, ScrollTrigger cale le défilement sur le palier
            // du chapitre le plus proche. Sur mobile c'est le gestionnaire de
            // glissement ci-dessous qui s'en charge, geste par geste.
            snap: coarsePointer
              ? undefined
              : {
                  snapTo: scrollStops,
                  duration: { min: 0.25, max: 0.6 },
                  delay: 0.05,
                  ease: "power2.inOut",
                  // Sans cela, une molette rapide projette la vitesse et saute
                  // plusieurs chapitres : on veut toujours le palier le plus
                  // proche, jamais celui d'après.
                  inertia: false,
                  directional: false,
                },
          },
          onUpdate() {
            const progress = timeline.progress();
            let next = 0;
            if (progress >= chapterStops[3]) next = 3;
            else if (progress >= chapterStops[2]) next = 2;
            else if (progress >= chapterStops[1]) next = 1;
            if (next !== activeRef.current) {
              activeRef.current = next;
              setActive(next);
            }
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

        // Palier final : la timeline mesure alors exactement TIMELINE_SPAN, ce
        // qui rend les repères de chapitre ci-dessus exacts.
        timeline
          .to({}, { duration: 1.0 })
          .to(media, { scale: 1.035, duration: TIMELINE_SPAN, ease: "none" }, 0)
          // `--orbit-spin` suit la rotation du cercle et sert de contre-rotation
          // aux repères, qui restent ainsi lisibles d'un bout à l'autre.
          .to(".hero-orbit", { rotate: 210, "--orbit-spin": 210, duration: TIMELINE_SPAN, ease: "none" }, 0)
          .to(".orbit-core", { rotate: -300, duration: TIMELINE_SPAN, ease: "none" }, 0)
          .to(".scroll-progress", { scaleX: 1, duration: TIMELINE_SPAN, ease: "none" }, 0);

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

      // ---- Mobile : un glissement = un seul chapitre ----------------------
      // Sans cela, l'inertie d'un seul flick traverse plusieurs chapitres d'un
      // coup. On neutralise le défilement natif tant que le hero est épinglé et
      // on anime nous-mêmes le passage au palier suivant.
      let disposeGestures = () => {};

      if (coarsePointer) {
        const travel = () => Math.max(1, story.offsetHeight - window.innerHeight);
        const scrollForStop = (index) => story.offsetTop + travel() * scrollStops[index];
        const nearestStop = () => {
          const progress = (window.scrollY - story.offsetTop) / travel();
          return scrollStops.reduce(
            (best, stop, index) =>
              Math.abs(stop - progress) < Math.abs(scrollStops[best] - progress) ? index : best,
            0,
          );
        };
        // Le hero reste épinglé tant qu'on n'a pas atteint la fin de sa course.
        const isPinned = () => window.scrollY < story.offsetTop + travel() - 2;
        const isInside = () =>
          window.scrollY >= story.offsetTop - 2
          && window.scrollY <= story.offsetTop + travel() + 2;

        const syncLock = () => story.classList.toggle("is-swipe-locked", isPinned());

        let frame = 0;
        let gliding = false;
        const glideTo = (index, duration = 620) => {
          window.cancelAnimationFrame(frame);
          const from = window.scrollY;
          const to = scrollForStop(index);
          if (Math.abs(to - from) < 1) return;
          const startedAt = performance.now();
          gliding = true;
          const step = (now) => {
            const t = Math.min(1, (now - startedAt) / duration);
            const eased = t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2;
            // `behavior: instant` neutralise le `scroll-behavior: smooth` global,
            // sinon chaque image relance une animation native et le glissement
            // n'atteint jamais son palier.
            window.scrollTo({ top: from + (to - from) * eased, behavior: "instant" });
            if (t < 1) {
              frame = window.requestAnimationFrame(step);
            } else {
              gliding = false;
              syncLock();
            }
          };
          frame = window.requestAnimationFrame(step);
        };

        let startY = 0;
        let engaged = false;
        let handled = false;

        const onTouchStart = (event) => {
          if (event.touches.length !== 1) {
            engaged = false;
            return;
          }
          startY = event.touches[0].clientY;
          handled = false;
          engaged = isInside();
        };

        const onTouchMove = (event) => {
          if (!engaged) return;
          // Un chapitre est déjà en route : on absorbe le reste du geste pour
          // qu'aucune inertie ne vienne enchaîner sur le suivant.
          if (gliding || handled) {
            if (event.cancelable) event.preventDefault();
            return;
          }
          const delta = startY - event.touches[0].clientY;
          if (Math.abs(delta) < 8) return;
          const next = nearestStop() + (delta > 0 ? 1 : -1);
          if (next < 0 || next >= scrollStops.length) {
            // Sortie du hero : on rend la main au défilement natif.
            engaged = false;
            return;
          }
          if (event.cancelable) event.preventDefault();
          handled = true;
          glideTo(next);
        };

        const onTouchEnd = () => {
          engaged = false;
        };

        syncLock();
        window.addEventListener("scroll", syncLock, { passive: true });
        window.addEventListener("resize", syncLock);
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("touchend", onTouchEnd, { passive: true });
        window.addEventListener("touchcancel", onTouchEnd, { passive: true });

        disposeGestures = () => {
          window.cancelAnimationFrame(frame);
          story.classList.remove("is-swipe-locked");
          window.removeEventListener("scroll", syncLock);
          window.removeEventListener("resize", syncLock);
          window.removeEventListener("touchstart", onTouchStart);
          window.removeEventListener("touchmove", onTouchMove);
          window.removeEventListener("touchend", onTouchEnd);
          window.removeEventListener("touchcancel", onTouchEnd);
        };
      }

      const previousDispose = dispose;
      dispose = () => {
        document.removeEventListener("visibilitychange", onVisible);
        safetyTimers.forEach((timer) => window.clearTimeout(timer));
        disposeGestures();
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
    window.scrollTo({ top: story.offsetTop + maxTravel * chapterRestStops[index], behavior: "smooth" });
  }

  const orbitLabels = chapters[active].orbit;

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
              aria-selected={index === active}
              className={index === active ? "is-active" : ""}
              key={chapter.key}
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
          {orbitLabels.map((label) => (
            <span key={`${chapters[active].key}-${label}`}>{label}</span>
          ))}
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
          <span className="story-count">{`0${active + 1} — 04`}</span>
        </div>
        <div className="scroll-track" aria-hidden="true"><i className="scroll-progress" /></div>
      </header>
      </div>
    </>
  );
}
