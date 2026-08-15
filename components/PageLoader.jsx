"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const startedAt = performance.now();
    let leaveTimer;
    let removeTimer;

    const finish = () => {
      const minimumDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1150;
      const remaining = Math.max(0, minimumDuration - (performance.now() - startedAt));
      leaveTimer = window.setTimeout(() => {
        setLeaving(true);
        document.body.style.overflow = previousOverflow;
        removeTimer = window.setTimeout(() => setVisible(false), 650);
      }, remaining);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`page-loader${leaving ? " is-leaving" : ""}`} aria-label="Chargement du portfolio" role="status">
      <div className="loader-pulse" aria-hidden="true">
        <Image className="loader-mark" src="/icon.png" alt="" width={112} height={112} priority />
      </div>
    </div>
  );
}
