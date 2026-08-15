import Image from "next/image";
import { contact } from "@/data/portfolio";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Image className="footer-logo" src="/media/georgeo-logo-white.webp" alt="Georgeo Agbahungba" width={300} height={200} priority />
      <p className="footer-name">Georgeo Agbahungba</p>
      <p className="footer-tagline">Analyser. Imaginer. <em>Développer.</em></p>
      <nav aria-label="Liens du pied de page">
        <a href="/projets">Projets</a><a href="/cv">CV</a><a href={contact.links[0].href} target="_blank" rel="noreferrer">GitHub</a><a href={contact.links[1].href} target="_blank" rel="noreferrer">LinkedIn</a><a href={contact.links[3].href} target="_blank" rel="noreferrer">Boutique</a><a href={contact.links[4].href} target="_blank" rel="noreferrer">X</a>
      </nav>
      <div className="footer-contact-links">
        <a href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp · {contact.phoneDisplay}</a>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </div>
      <small>{contact.location}</small>
      <small className="footer-copy">© 2026 Georgeo S. R. Agbahungba — Tous droits réservés.</small>
    </footer>
  );
}
