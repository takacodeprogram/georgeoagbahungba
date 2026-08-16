"use client";

import { useEffect, useRef } from "react";

/**
 * `template.jsx` est remonté à chaque navigation, contrairement à `layout.jsx`.
 * C'est le point d'accroche naturel pour un rideau de transition.
 *
 * Le rideau ne masque jamais le contenu au chargement initial : il démarre
 * couvert puis se retire, si bien qu'un échec du script laisse simplement la
 * page visible.
 */
export default function Template({ children }) {
  const curtainRef = useRef(null);

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      curtain.style.display = "none";
      return undefined;
    }

    let tween;
    let cancelled = false;

    import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      tween = gsap.fromTo(
        curtain,
        { scaleY: 1, transformOrigin: "top center" },
        {
          scaleY: 0,
          transformOrigin: "bottom center",
          duration: 0.85,
          ease: "power4.inOut",
          onComplete: () => { curtain.style.pointerEvents = "none"; },
        },
      );
    });

    // Filet de sécurité : si GSAP tarde, le rideau se retire quand même.
    const timer = window.setTimeout(() => {
      curtain.style.transform = "scaleY(0)";
      curtain.style.pointerEvents = "none";
    }, 1400);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      tween?.kill();
    };
  }, []);

  return (
    <>
      <div className="page-curtain" ref={curtainRef} aria-hidden="true" />
      {children}
    </>
  );
}
