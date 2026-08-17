"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Menu, X } from "lucide-react";
import { forwardRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/#competences", label: "Compétences", hash: "#competences" },
  { href: "/#parcours", label: "Parcours", hash: "#parcours" },
  { href: "/#projets", label: "Projets", hash: "#projets" },
  { href: "/takacode", label: "TakaCode", path: "/takacode" },
  { href: "/branding-studio", label: "Studio", path: "/branding-studio" },
  { href: "/cv", label: "CV", path: "/cv" },
  { href: "/agency", label: "Agency", path: "/agency" },
];

const SiteHeader = forwardRef(function SiteHeader({ solid = false }, ref) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = ["competences", "parcours", "projets", "contact"];
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection("#" + entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0,
    });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  const isLinkActive = (link) => {
    if (link.path) {
      return pathname === link.path;
    }
    if (link.hash === "#projets" && pathname === "/projets") {
      return true;
    }
    return pathname === "/" && activeSection === link.hash;
  };

  const className = `hero-nav${solid ? " is-solid" : ""}`;

  return (
    <>
      <nav className={className} aria-label="Navigation principale" ref={ref}>
        <Link href="/" className="brand" aria-label="Accueil Georgeo Agbahungba">
          <Image src="/media/georgeo-logo-gold.webp" alt="Georgeo Agbahungba" width={260} height={173} priority />
        </Link>
        <div className="nav-links">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className={isLinkActive(link) ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <Link
            className={`nav-contact${pathname === "/" && activeSection === "#contact" ? " active" : ""}`}
            href="/#contact"
          >
            <Mail size={15} aria-hidden="true" />
            <span>Me contacter</span>
          </Link>
        </div>
        <button className="mobile-menu-toggle" type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} id="mobile-menu" aria-hidden={!menuOpen}>
        {links.map((link, index) => (
          <Link
            href={link.href}
            onClick={() => setMenuOpen(false)}
            key={link.label}
            className={isLinkActive(link) ? "active" : ""}
          >
            <span>0{index + 1}</span>{link.label}
          </Link>
        ))}
        <Link
          href="/#contact"
          onClick={() => setMenuOpen(false)}
          className={pathname === "/" && activeSection === "#contact" ? "active" : ""}
        >
          <span>0{links.length + 1}</span>Contact
        </Link>
      </div>
    </>
  );
});

export default SiteHeader;
