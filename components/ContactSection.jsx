import { ArrowUpRight, Code2, Mail, MapPin, MessageCircle, Network, Phone } from "lucide-react";
import { contact } from "@/data/portfolio";

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-orbit" aria-hidden="true"><span>AGRO</span><span>CODE</span><span>DATA</span><span>IA</span></div>
      <p className="eyebrow">Une idée, un besoin, un défi ?</p>
      <h2 id="contact-title">Faisons grandir<br /><em>votre prochain projet.</em></h2>
      <p className="contact-lead">Un outil à construire, un processus à digitaliser, des données à exploiter, ou simplement une idée à confronter ? Écrivez-moi.</p>
      <div className="contact-grid">
        <a className="contact-primary" href={contact.whatsapp} target="_blank" rel="noreferrer">
          <MessageCircle aria-hidden="true" /><span>Discuter sur WhatsApp<small>{contact.phoneDisplay}</small></span><ArrowUpRight aria-hidden="true" />
        </a>
        <a href={`mailto:${contact.email}`}><Mail aria-hidden="true" /><span>E-mail<small>{contact.email}</small></span></a>
        <a href="tel:+2290167659717"><Phone aria-hidden="true" /><span>Téléphone<small>{contact.phoneDisplay}</small></span></a>
        <div><MapPin aria-hidden="true" /><span>Localisation<small>{contact.location}</small></span></div>
      </div>
      <div className="social-row">
        <a href={contact.links[0].href} target="_blank" rel="noreferrer"><Code2 aria-hidden="true" /> GitHub</a>
        <a href={contact.links[1].href} target="_blank" rel="noreferrer"><Network aria-hidden="true" /> LinkedIn</a>
        <a href={contact.links[2].href} target="_blank" rel="noreferrer">TakaCode <ArrowUpRight aria-hidden="true" /></a>
        <a href={contact.links[3].href} target="_blank" rel="noreferrer">Store <ArrowUpRight aria-hidden="true" /></a>
        <a href={contact.links[4].href} target="_blank" rel="noreferrer">X <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </section>
  );
}
