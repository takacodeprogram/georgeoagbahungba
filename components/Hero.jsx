"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import { contact } from "@/data/portfolio";

const chaptersFR = [
  {
    key: "vision",
    tab: "Vision",
    eyebrow: "Des expertises complémentaires pour un objectif unique",
    title: ["Innover"],
    accent: "pour le développement",
    copy: "Je transforme les problèmes, les données et les idées en solutions numériques exploitables. Agroéconomie, Data Engineering et Développement.",
    orbit: ["TERRAIN", "DATA", "PRODUIT", "IA"],
  },
  {
    key: "agro",
    tab: "Agroéconomie",
    eyebrow: "AGRO • DATA • AGRITECH",
    title: ["L’expertise agricole"],
    accent: "augmentée par la tech",
    copy: "J’analyse les filières agricoles pour comprendre leurs défis, puis je développe les solutions numériques dont elles ont besoin.",
    orbit: ["TERRAIN", "MARCHÉ", "FILIÈRE", "TECH"],
  },
  {
    key: "code",
    tab: "Développement",
    eyebrow: "Web • Mobile • IA • Automatisation",
    title: ["Concevoir. Développer."],
    accent: "Déployer.",
    copy: "Je transforme un besoin en application que l’on peut réellement utiliser, de la première maquette jusqu’à la mise en production.",
    orbit: ["WEB", "MOBILE", "API", "PROD"],
  },
  {
    key: "data-eng",
    tab: "Data Engineering",
    eyebrow: "Pipelines • SQL • Automatisation",
    title: ["Structurer. Connecter."],
    accent: "Fiabiliser.",
    copy: "Je construis les pipelines, modèles SQL et automatisations qui transforment des sources dispersées en données propres, structurées et prêtes à être analysées.",
    orbit: ["ETL", "SQL", "FLUX", "QUALITÉ"],
  },
];

const chaptersEN = [
  {
    key: "vision",
    tab: "Vision",
    eyebrow: "Complementary expertise for a single objective",
    title: ["Innovate"],
    accent: "for development",
    copy: "I turn challenges, data, and ideas into actionable digital solutions. Agroeconomics, Data Engineering, and Development.",
    orbit: ["FIELDWORK", "DATA", "PRODUCT", "AI"],
  },
  {
    key: "agro",
    tab: "Agroeconomics",
    eyebrow: "AGRO • DATA • AGRITECH",
    title: ["Agricultural expertise"],
    accent: "augmented by tech",
    copy: "I analyze agricultural value chains to understand their challenges, then develop the digital solutions they need.",
    orbit: ["FIELDWORK", "MARKETS", "SECTOR", "TECH"],
  },
  {
    key: "code",
    tab: "Development",
    eyebrow: "Web • Mobile • AI • Automation",
    title: ["Design. Develop."],
    accent: "Deploy.",
    copy: "I translate a business need into a production-ready application, from the very first mockups to final release.",
    orbit: ["WEB", "MOBILE", "API", "PROD"],
  },
  {
    key: "data-eng",
    tab: "Data Engineering",
    eyebrow: "Pipelines • SQL • Automation",
    title: ["Structure. Connect."],
    accent: "Secure.",
    copy: "I build the pipelines, SQL models, and automation workflows that turn fragmented sources into clean, structured, and ready-to-analyze data.",
    orbit: ["ETL", "SQL", "STREAMS", "QUALITY"],
  },
];

const frames = [
  { key: "neutral", src: "/media/georgeo-vision.webp", kind: "cover", priority: true },
  { key: "agro", src: "/media/georgeo-agroeconomiste.webp", kind: "cover" },
  { key: "developer", src: "/media/developer-front.webp", kind: "cover" },
  { key: "data-eng", src: "/media/data-engineer.png", kind: "cover" },
];

const TIMELINE_SPAN = 4.5;
const CHAPTER_SWITCH_TIMES = [0, 1.25, 2.25, 3.25];
const CHAPTER_REST_TIMES = [0, 1.77, 2.77, 4.0];

const chapterStops = CHAPTER_SWITCH_TIMES.map((time) => time / TIMELINE_SPAN);
const chapterRestStops = CHAPTER_REST_TIMES.map((time) => time / TIMELINE_SPAN);
const scrollStops = [...chapterRestStops, 1];

export default function Hero({ locale = "fr" }) {
  const storyRef = useRef(null);
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const mediaRef = useRef(null);
  const framesRef = useRef([]);
  const chaptersRef = useRef([]);
  const timelineRef = useRef(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  const isEn = locale === "en";
  const chapters = isEn ? chaptersEN : chaptersFR;

  // Déclaré avant l'effet GSAP : il figure dans ses dépendances, donc le hook
  // doit exister au moment où le corps du composant est évalué (SSR compris).
  const [chapterOffset, setChapterOffset] = useState(-50);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 780px)");
    const update = () => setChapterOffset(media.matches ? 0 : -50);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

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
            snap: coarsePointer
              ? undefined
              : {
                  snapTo: scrollStops,
                  duration: { min: 0.25, max: 0.6 },
                  delay: 0.05,
                  ease: "power2.inOut",
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

        timeline
          .to({}, { duration: 1.0 })
          .to(media, { scale: 1.035, duration: TIMELINE_SPAN, ease: "none" }, 0)
          .to(".hero-orbit", { rotate: 210, duration: TIMELINE_SPAN, ease: "none" }, 0)
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

      // Au tactile, le défilement reste natif : la timeline est déjà scrubbée
      // par le scroll, donc les chapitres s'enchaînent au rythme du doigt. Les
      // onglets restent là pour sauter directement à un chapitre.
      dispose = ((prevDispose) => () => {
        prevDispose();
        safetyTimers.forEach(window.clearTimeout);
        if (onVisible) document.removeEventListener("visibilitychange", onVisible);
      })(dispose);
    }

    init();
    return () => dispose();
  }, [chapterOffset]);

  useEffect(() => {
    const header = navRef.current;
    if (!header) return undefined;
    let state = false;
    const updateNav = () => {
      const active = window.scrollY > window.innerHeight * 0.95;
      if (active !== state) {
        state = active;
        header.classList.toggle("is-solid", active);
      }
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
      <SiteHeader ref={navRef} locale={locale} />

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
          </div>
          <div className="hero-orbit-tags" aria-hidden="true">
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
                  <a className="primary-action" href={isEn ? "/en#projets" : "#projets"}>
                    {isEn ? "View my projects" : "Voir mes projets"} <ArrowDownRight aria-hidden="true" />
                  </a>
                  <a className="text-action" href={`mailto:${contact.email}`}>
                    {isEn ? "Contact me" : "Me contacter"} <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="hero-footerline">
            <span><MapPin size={14} aria-hidden="true" /> Cotonou, Benin</span>
            <span>{isEn ? "Scroll to explore" : "Faites défiler pour explorer"}</span>
            <span className="story-count">{`0${active + 1} — 04`}</span>
          </div>
          <div className="scroll-track" aria-hidden="true"><i className="scroll-progress" /></div>
        </header>
      </div>
    </>
  );
}
