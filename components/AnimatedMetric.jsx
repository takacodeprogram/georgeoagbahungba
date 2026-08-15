"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedMetric({ value, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = parseInt(value, 10);
    const suffix = value.replace(/[\d]/g, "");
    const padTo = value.startsWith("0") ? value.length : 0;

    if (reducedMotion) {
      setDisplay(value);
      setStarted(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started) return;
          setStarted(true);
          const duration = 1400;
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            setDisplay(String(current).padStart(padTo, "0") + suffix);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, started]);

  return (
    <div ref={ref}>
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  );
}
