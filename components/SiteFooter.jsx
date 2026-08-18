import Image from "next/image";
import Link from "next/link";
import { contact } from "@/data/portfolio";

export default function SiteFooter({ locale = "fr" }) {
  const isEn = locale === "en";
  return (
    <footer className="site-footer">
      <Image className="footer-logo" src="/media/georgeo-logo-white.webp" alt="Georgeo Agbahungba" width={300} height={200} priority />
      <p className="footer-name">Georgeo Agbahungba</p>
      <p className="footer-tagline">
        {isEn ? (
          <>Analyze. Innovate. <em>Develop.</em></>
        ) : (
          <>Analyser. Innover. <em>Développer.</em></>
        )}
      </p>
      <nav aria-label="Liens du pied de page">
        <Link href={isEn ? "/en/projets" : "/projets"}>{isEn ? "Projects" : "Projets"}</Link>
        <Link href={isEn ? "/en/cv" : "/cv"}>CV</Link>
        {/* Seul acces aux versions mono-metier : volontairement discret. */}
        <Link href={isEn ? "/en/data" : "/data"}>{isEn ? "Data Engineer" : "Ingénieur Data"}</Link>
        <Link href={isEn ? "/en/software" : "/software"}>{isEn ? "Software Engineer" : "Ingénieur Logiciel"}</Link>
        <a href={contact.links[0].href} target="_blank" rel="noreferrer">GitHub</a>
        <a href={contact.links[1].href} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={contact.links[3].href} target="_blank" rel="noreferrer">{isEn ? "Store" : "Boutique"}</a>
        <a href={contact.links[4].href} target="_blank" rel="noreferrer">X</a>
      </nav>
      <div className="footer-contact-links">
        <a href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp · {contact.phoneDisplay}</a>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </div>
      <small>{contact.location}</small>
      <small className="footer-copy">
        {isEn 
          ? `© 2026 Georgeo S. R. Agbahungba — All rights reserved.` 
          : `© 2026 Georgeo S. R. Agbahungba — Tous droits réservés.`}
      </small>
    </footer>
  );
}
