"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top ${visible ? "is-visible" : ""}`}
      type="button"
      aria-label="Retour en haut de page"
    >
      <span className="back-to-top-circle">
        <ArrowUp className="back-to-top-arrow" size={16} />
      </span>
      <span className="back-to-top-text">RETOUR EN HAUT</span>
    </button>
  );
}
