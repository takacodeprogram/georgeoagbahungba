"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Couche d'animation commune à toutes les pages.
 *
 * Les composants existants (Hero, AboutSection, CapRotationStory) gardent leurs
 * propres timelines : on ne cible ici que des attributs `data-*` dédiés, de
 * sorte qu'aucun sélecteur ne se chevauche.
 *
 * Rien n'est masqué en CSS. L'état initial est posé par GSAP une fois le script
 * chargé, ce qui garantit que le contenu reste lisible sans JavaScript ou si le
 * chargement échoue.
 */
export default function MotionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    // L'init est asynchrone : sans ce drapeau, un démontage survenu pendant le
    // chargement de GSAP laisserait un contexte vivant, et les éléments figés à
    // l'opacité zéro de leur état de départ.
    let cancelled = false;
    let context = null;
    const cleanups = [];

    const teardown = () => {
      cleanups.splice(0).forEach((fn) => fn());
      context?.revert();
      context = null;
    };

    async function init() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);

      context = gsap.context(() => {
        // ---- Titres : révélation ligne par ligne derrière un masque --------
        document.querySelectorAll("[data-anim='title']").forEach((node) => {
          if (node.dataset.animReady) return;
          node.dataset.animReady = "1";
          const split = new SplitText(node, { type: "lines", mask: "lines" });
          cleanups.push(() => { split.revert(); delete node.dataset.animReady; });
          gsap.from(split.lines, {
            yPercent: 115,
            duration: 1.05,
            ease: "power4.out",
            stagger: 0.09,
            scrollTrigger: { trigger: node, start: "top 88%", once: true },
          });
        });

        // ---- Blocs : montée simple, décalée entre voisins ------------------
        const groups = new Map();
        document.querySelectorAll("[data-anim='up']").forEach((node) => {
          if (node.dataset.animReady) return;
          node.dataset.animReady = "1";
          cleanups.push(() => { delete node.dataset.animReady; });
          const parent = node.parentElement;
          if (!groups.has(parent)) groups.set(parent, []);
          groups.get(parent).push(node);
        });
        groups.forEach((nodes) => {
          gsap.from(nodes, {
            autoAlpha: 0,
            y: 42,
            duration: 0.95,
            ease: "power3.out",
            stagger: 0.085,
            scrollTrigger: { trigger: nodes[0], start: "top 90%", once: true },
          });
        });

        // ---- Cartes : la carte monte pendant qu'un voile doré la balaie ----
        // On n'anime jamais les enfants : ils sont gérés par React, et les
        // laisser à l'opacité zéro sur une timeline interrompue vide la carte.
        document.querySelectorAll("[data-anim='card']").forEach((node, index) => {
          if (node.dataset.animReady) return;
          node.dataset.animReady = "1";

          const veil = document.createElement("i");
          veil.className = "anim-veil";
          node.appendChild(veil);
          cleanups.push(() => { veil.remove(); delete node.dataset.animReady; });

          gsap.timeline({ scrollTrigger: { trigger: node, start: "top 88%", once: true } })
            .fromTo(node, { autoAlpha: 0, y: 34 },
              { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", delay: (index % 3) * 0.08 })
            .fromTo(veil, { scaleX: 0, transformOrigin: "left center" },
              { scaleX: 1, duration: 0.34, ease: "power2.in" }, 0)
            .set(veil, { transformOrigin: "right center" })
            .to(veil, { scaleX: 0, duration: 0.46, ease: "power3.out" });
        });

        // ---- Parallaxe : l'image dérive plus lentement que la page ---------
        document.querySelectorAll("[data-parallax]").forEach((node) => {
          const amount = Number(node.dataset.parallax) || 10;
          gsap.fromTo(node, { yPercent: -amount / 2 }, {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: {
              trigger: node.parentElement || node,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        });
      });

      if (cancelled) teardown();
    }

    init();

    return () => {
      cancelled = true;
      teardown();
    };
  }, [pathname]);

  return null;
}
