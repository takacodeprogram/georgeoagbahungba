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

      // ---- Contraste sur les surfaces dorées ---------------------------
      // Le curseur est doré : sur la section contact ou un bouton primaire, il
      // se fond dans le fond. On le repasse alors en encre, la couleur que ces
      // surfaces donnent déjà à leur texte.
      const isGold = (r, g, b) => {
        const max = Math.max(r, g, b) / 255;
        const min = Math.min(r, g, b) / 255;
        const light = (max + min) / 2;
        if (light < 0.38) return false;
        const delta = max - min;
        if (!delta) return false;
        const sat = delta / (1 - Math.abs(2 * light - 1));
        if (sat < 0.35) return false;
        let hue = 0;
        if (max === r / 255) hue = ((g - b) / 255 / delta) % 6;
        else if (max === g / 255) hue = (b - r) / 255 / delta + 2;
        else hue = (r - g) / 255 / delta + 4;
        hue *= 60;
        if (hue < 0) hue += 360;
        return hue >= 28 && hue <= 56;
      };

      // On remonte jusqu'au premier fond réellement opaque : c'est lui qu'on voit.
      const onGoldSurface = (node) => {
        for (let el = node; el && el !== document.documentElement; el = el.parentElement) {
          const parts = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
          if (!parts) continue;
          const [r, g, b, a = 1] = parts.map(Number);
          if (a < 0.5) continue;
          return isGold(r, g, b);
        }
        return false;
      };

      let toneTimer = 0;
      const syncTone = (node) => {
        const gold = onGoldSurface(node);
        dot.classList.toggle("is-on-gold", gold);
        ring.classList.toggle("is-on-gold", gold);
      };
      const onOverTone = (event) => {
        // Certaines cibles ne virent au doré qu'au survol, via une transition :
        // on repasse une fois celle-ci terminée.
        window.clearTimeout(toneTimer);
        const { target } = event;
        toneTimer = window.setTimeout(() => syncTone(target), 240);
      };

      const interactive = "a, button, [role='tab'], input, textarea, [data-magnetic]";
      const onOver = (event) => {
        if (event.target.closest(interactive)) ring.classList.add("is-active");
        syncTone(event.target);
      };
      const onOut = (event) => {
        if (event.target.closest(interactive)) ring.classList.remove("is-active");
      };

      document.body.classList.add("has-custom-cursor");
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver);
      document.addEventListener("pointerover", onOverTone);
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
        window.clearTimeout(toneTimer);
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.removeEventListener("pointerover", onOverTone);
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
