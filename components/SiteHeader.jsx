"use client";

import Image from "next/image";
import { Mail, Menu, X } from "lucide-react";
import { forwardRef, useState } from "react";

const links = [
  { href: "/#competences", label: "Compétences" },
  { href: "/#parcours", label: "Parcours" },
  { href: "/#projets", label: "Projets" },
  { href: "/cv", label: "CV" },
];

const SiteHeader = forwardRef(function SiteHeader({ solid = false }, ref) {
  const [menuOpen, setMenuOpen] = useState(false);
  const className = `hero-nav${solid ? " is-solid" : ""}`;

  return (
    <>
      <nav className={className} aria-label="Navigation principale" ref={ref}>
        <a href="/" className="brand" aria-label="Accueil Georgeo Agbahungba">
          <Image src="/media/georgeo-logo-gold.png" alt="Georgeo Agbahungba" width={260} height={173} priority />
        </a>
        <div className="nav-links">
          {links.map((link) => <a href={link.href} key={link.label}>{link.label}</a>)}
        </div>
        <div className="nav-actions">
          <a className="nav-contact" href="/#contact">
            <Mail size={15} aria-hidden="true" />
            <span>Me contacter</span>
          </a>
        </div>
        <button className="mobile-menu-toggle" type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} id="mobile-menu" aria-hidden={!menuOpen}>
        {links.map((link, index) => (
          <a href={link.href} onClick={() => setMenuOpen(false)} key={link.label}><span>0{index + 1}</span>{link.label}</a>
        ))}
        <a href="/#contact" onClick={() => setMenuOpen(false)}><span>0{links.length + 1}</span>Contact</a>
      </div>
    </>
  );
});

export default SiteHeader;
