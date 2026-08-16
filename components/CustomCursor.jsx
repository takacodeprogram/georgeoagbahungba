"use client";

import { useEffect, useState } from "react";

/**
 * Curseur personnalisé, réservé aux pointeurs fins.
 *
 * Sur mobile il ne se monte jamais : aucun nœud, aucun écouteur, aucun coût.
 * L'attraction magnétique s'applique aux éléments marqués `data-magnetic`.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !calm);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    let dispose = () => {};

    async function init() {
      const { gsap } = await import("gsap");
      const dot = document.querySelector(".cursor-dot");
      const ring = document.querySelector(".cursor-ring");
      if (!dot || !ring) return;

      const moveDotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
      const moveDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
      // L'anneau traîne derrière le point : c'est ce décalage qui donne le poids.
      const moveRingX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
      const moveRingY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (event) => {
        moveDotX(event.clientX);
        moveDotY(event.clientY);
        moveRingX(event.clientX);
        moveRingY(event.clientY);
      };

      const interactive = "a, button, [role='tab'], input, textarea, [data-magnetic]";
      const onOver = (event) => {
        if (event.target.closest(interactive)) ring.classList.add("is-active");
      };
      const onOut = (event) => {
        if (event.target.closest(interactive)) ring.classList.remove("is-active");
      };

      document.body.classList.add("has-custom-cursor");
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver);
      document.addEventListener("pointerout", onOut);

      // ---- Attraction magnétique ---------------------------------------
      const magnets = [...document.querySelectorAll("[data-magnetic]")];
      const magnetCleanups = magnets.map((node) => {
        const pull = Number(node.dataset.magnetic) || 0.32;
        const toX = gsap.quickTo(node, "x", { duration: 0.5, ease: "power3.out" });
        const toY = gsap.quickTo(node, "y", { duration: 0.5, ease: "power3.out" });
        const onEnterMove = (event) => {
          const box = node.getBoundingClientRect();
          toX((event.clientX - (box.left + box.width / 2)) * pull);
          toY((event.clientY - (box.top + box.height / 2)) * pull);
        };
        const onLeave = () => { toX(0); toY(0); };
        node.addEventListener("pointermove", onEnterMove);
        node.addEventListener("pointerleave", onLeave);
        return () => {
          node.removeEventListener("pointermove", onEnterMove);
          node.removeEventListener("pointerleave", onLeave);
          gsap.set(node, { x: 0, y: 0 });
        };
      });

      dispose = () => {
        document.body.classList.remove("has-custom-cursor");
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.removeEventListener("pointerout", onOut);
        magnetCleanups.forEach((fn) => fn());
      };
    }

    init();
    return () => dispose();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />
    </>
  );
}
