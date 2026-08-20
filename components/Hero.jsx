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
    eyebrow: "IDÉES • DATA • PRODUITS",
    title: ["Transformer les idées"],
    accent: "en solutions utiles.",
    copy: "J’analyse les besoins, structure les données et construis les produits numériques qui permettent de passer de l’idée à l’usage.",
    orbit: ["TERRAIN", "DATA", "PRODUIT", "IA"],
  },
  {
    key: "agro",
    tab: "Agroéconomie",
    eyebrow: "AGROÉCONOMIE • FILIÈRES • AGRITECH",
    title: ["L’expertise agricole"],
    accent: "augmentée par la tech",
    copy: "J’analyse les filières, les marchés et les performances agricoles, puis mobilise la donnée et le numérique pour éclairer les décisions et transformer les pratiques.",
    orbit: ["TERRAIN", "MARCHÉ", "FILIÈRE", "TECH"],
  },
  {
    key: "data-eng",
    tab: "Ingénieur Data",
    eyebrow: "Pipelines • SQL • Automatisation",
    title: ["Structurer. Connecter."],
    accent: "Fiabiliser.",
    copy: "Je construis les pipelines, modèles SQL et automatisations qui transforment des sources dispersées en données propres, structurées et prêtes à être analysées.",
    orbit: ["ETL", "SQL", "FLUX", "QUALITÉ"],
  },
  {
    key: "code",
    tab: "Ingénieur Logiciel",
    eyebrow: "Web • Mobile • IA • Automatisation",
    title: ["Concevoir. Développer."],
    accent: "Déployer.",
    copy: "Je transforme un besoin en application que l’on peut réellement utiliser, de la première maquette jusqu’à la mise en production.",
    orbit: ["WEB", "MOBILE", "API", "PROD"],
  },
];

const chaptersEN = [
  {
    key: "vision",
    tab: "Vision",
    eyebrow: "IDEAS • DATA • PRODUCTS",
    title: ["Turning ideas"],
    accent: "into useful solutions.",
    copy: "I analyze needs, structure data and build digital products that turn ideas into usable solutions.",
    orbit: ["FIELDWORK", "DATA", "PRODUCT", "AI"],
  },
  {
    key: "agro",
    tab: "Agroeconomics",
    eyebrow: "AGRICULTURAL ECONOMICS • VALUE CHAINS • AGRITECH",
    title: ["Agricultural expertise"],
    accent: "augmented by technology",
    copy: "I analyze value chains, markets and agricultural performance, then use data and digital technologies to support better decisions and transform practices.",
    orbit: ["FIELDWORK", "MARKETS", "SECTOR", "TECH"],
  },
  {
    key: "data-eng",
    tab: "Data Engineer",
    eyebrow: "Pipelines • SQL • Automation",
    title: ["Structure. Connect."],
    accent: "Secure.",
    copy: "I build the pipelines, SQL models, and automation workflows that turn fragmented sources into clean, structured, and ready-to-analyze data.",
    orbit: ["ETL", "SQL", "STREAMS", "QUALITY"],
  },
  {
    key: "code",
    tab: "Software Engineer",
    eyebrow: "Web • Mobile • AI • Automation",
    title: ["Design. Develop."],
    accent: "Deploy.",
    copy: "I translate a business need into a production-ready application, from the very first mockups to final release.",
    orbit: ["WEB", "MOBILE", "API", "PROD"],
  },
];

const framesFR = [
  { key: "neutral", src: "/media/georgeo-vision.webp", kind: "cover", priority: true },
  { key: "agro", src: "/media/georgeo-agroeconomiste.webp", kind: "cover" },
  { key: "data-eng", src: "/media/georgeo-ingenieur-data.webp", kind: "cover" },
  { key: "developer", src: "/media/georgeo-ingenieur-logiciel.webp", kind: "cover" },
];

const framesEN = [
  { key: "neutral", src: "/media/georgeo-vision.webp", kind: "cover", priority: true },
  { key: "agro", src: "/media/georgeo-agroeconomiste-en.webp", kind: "cover" },
  { key: "data-eng", src: "/media/georgeo-ingenieur-data-en.webp", kind: "cover" },
  { key: "developer", src: "/media/georgeo-ingenieur-logiciel-en.webp", kind: "cover" },
];

// Le recit occupe une unite de temps par chapitre, plus une demie de repos
// final. Les pages mono-metier n'en affichent que deux, la home quatre : tout
// est donc derive du nombre de chapitres plutot que fige.
function buildTiming(count) {
  const span = count + 0.5;
  const switchTimes = Array.from({ length: count }, (_, i) => (i === 0 ? 0 : i + 0.25));
  const restTimes = Array.from({ length: count }, (_, i) =>
    i === 0 ? 0 : i === count - 1 ? span - 0.5 : i + 0.77,
  );
  return {
    span,
    chapterStops: switchTimes.map((t) => t / span),
    chapterRestStops: restTimes.map((t) => t / span),
    scrollStops: [...restTimes.map((t) => t / span), 1],
  };
}

export default function Hero({ locale = "fr", roleKey = null }) {
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
  const allChapters = isEn ? chaptersEN : chaptersFR;
  const allFrames = isEn ? framesEN : framesFR;

  // Page mono-metier : on garde l'ouverture puis le seul chapitre concerne, en
  // conservant l'appariement chapitre/portrait par leur position d'origine.
  const keep = roleKey ? [0, allChapters.findIndex((c) => c.key === roleKey)] : allChapters.map((_, i) => i);
  const chapters = keep.map((i) => allChapters[i]);
  const frames = keep.map((i) => allFrames[i]);
  const { span: TIMELINE_SPAN, chapterStops, chapterRestStops, scrollStops } = buildTiming(chapters.length);

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
            for (let i = chapterStops.length - 1; i > 0; i--) {
              if (progress >= chapterStops[i]) { next = i; break; }
            }
            if (next !== activeRef.current) {
              activeRef.current = next;
              setActive(next);
            }
          },
        });

        timelineRef.current = timeline;
        timeline.to({}, { duration: 1.0 });
        for (let i = 1; i < chapters.length; i++) {
          showFrame(timeline, i, i);
          changeChapter(timeline, i - 1, i, i + 0.04);
        }

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

      <div className="hero-story" ref={storyRef} style={{ height: `${chapters.length * 90}vh` }}>
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
