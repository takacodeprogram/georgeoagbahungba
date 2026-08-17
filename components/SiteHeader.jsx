"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Menu, X, Globe } from "lucide-react";
import { forwardRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const linksFR = [
  { href: "/#competences", label: "Compétences", hash: "#competences" },
  { href: "/#parcours", label: "Parcours", hash: "#parcours" },
  { href: "/#projets", label: "Projets", hash: "#projets" },
  { href: "/takacode", label: "TakaCode", path: "/takacode" },
  { href: "/cv", label: "CV", path: "/cv" },
  { href: "/agency", label: "Agency", path: "/agency" },
];

const linksEN = [
  { href: "/en#competences", label: "Skills", hash: "#competences" },
  { href: "/en#parcours", label: "Timeline", hash: "#parcours" },
  { href: "/en#projets", label: "Projects", hash: "#projets" },
  { href: "/en/takacode", label: "TakaCode", path: "/en/takacode" },
  { href: "/en/cv", label: "CV", path: "/en/cv" },
  { href: "/en/agency", label: "Agency", path: "/en/agency" },
];

const SiteHeader = forwardRef(function SiteHeader({ solid = false, locale = "fr" }, ref) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");
  const isEn = locale === "en";
  const links = isEn ? linksEN : linksFR;

  useEffect(() => {
    if (pathname !== "/" && pathname !== "/en") {
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
    if (link.hash === "#projets" && (pathname === "/projets" || pathname === "/en/projets")) {
      return true;
    }
    return (pathname === "/" || pathname === "/en") && activeSection === link.hash;
  };

  const className = `hero-nav${solid ? " is-solid" : ""}`;

  return (
    <>
      <nav className={className} aria-label="Navigation principale" ref={ref}>
        <Link href={isEn ? "/en" : "/"} className="brand" aria-label="Accueil Georgeo Agbahungba">
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
        <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
          {/* Lang Selector */}
          <Link
            href={isEn ? pathname.replace(/^\/en/, "") || "/" : `/en${pathname === "/" ? "" : pathname}`}
            className="lang-toggle"
            aria-label={isEn ? "Switch to French" : "Passer en Anglais"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "9.5px",
              fontWeight: "750",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "8px 12px",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.7)",
              borderRadius: "4px",
              transition: "all 200ms ease"
            }}
          >
            <Globe size={12} style={{ color: "var(--gold-bright)" }} />
            <span>{isEn ? "FR" : "EN"}</span>
          </Link>

          <Link
            className={`nav-contact${(pathname === "/" || pathname === "/en") && activeSection === "#contact" ? " active" : ""}`}
            href={isEn ? "/en#contact" : "/#contact"}
          >
            <Mail size={15} aria-hidden="true" />
            <span>{isEn ? "Contact me" : "Me contacter"}</span>
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
        
        {/* Mobile Lang Selector */}
        <Link
          href={isEn ? pathname.replace(/^\/en/, "") || "/" : `/en${pathname === "/" ? "" : pathname}`}
          onClick={() => setMenuOpen(false)}
          className="lang-toggle-mobile"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <span>0{links.length + 1}</span>{isEn ? "Version Française (FR)" : "English Version (EN)"}
        </Link>

        <Link
          href={isEn ? "/en#contact" : "/#contact"}
          onClick={() => setMenuOpen(false)}
          className={(pathname === "/" || pathname === "/en") && activeSection === "#contact" ? "active" : ""}
        >
          <span>0{links.length + 2}</span>Contact
        </Link>
      </div>
    </>
  );
});

export default SiteHeader;
