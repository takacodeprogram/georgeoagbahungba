import { ArrowUpRight, Code2, Mail, MapPin, MessageCircle, Network, Phone } from "lucide-react";
import { contact } from "@/data/portfolio";

export default function ContactSection({ locale = "fr" }) {
  const isEn = locale === "en";
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-orbit" aria-hidden="true"><span>FIELD</span><span>DATA</span><span>PRODUCT</span></div>
      <p className="eyebrow">
        {isEn ? "You have the problem. Let's build the solution." : "Vous avez le problème. Construisons la solution."}
      </p>
      <h2 id="contact-title" data-anim="title">
        {isEn ? (
          <>The need.<br />The data.<br /><em>The solution.</em></>
        ) : (
          <>Le besoin.<br />La donnée.<br /><em>La solution.</em></>
        )}
      </h2>
      <p className="contact-lead">
        {isEn
          ? "Data to leverage, processes to automate, a web or mobile application to build, or an Agritech project to structure: tell me about your needs. We'll start from there."
          : "Données à exploiter, processus à automatiser, application à construire ou projet Agritech à structurer : expliquez-moi le besoin. Nous partirons de là."}
      </p>
      <div className="contact-grid">
        <a className="contact-primary" href={contact.whatsapp} target="_blank" rel="noreferrer">
          <MessageCircle aria-hidden="true" />
          <span>
            {isEn ? "Discuss my project" : "Discuter de mon projet"}
            <small>{contact.phoneDisplay}</small>
          </span>
          <ArrowUpRight aria-hidden="true" />
        </a>
        <a href={`mailto:${contact.email}`}><Mail aria-hidden="true" /><span>E-mail<small>{contact.email}</small></span></a>
        <a href="tel:+2290167659717"><Phone aria-hidden="true" /><span>{isEn ? "Phone" : "Téléphone"}<small>{contact.phoneDisplay}</small></span></a>
        <div><MapPin aria-hidden="true" /><span>{isEn ? "Location" : "Localisation"}<small>{contact.location}</small></span></div>
      </div>
      <div className="social-row">
        <a href={contact.links[0].href} target="_blank" rel="noreferrer"><Code2 aria-hidden="true" /> GitHub</a>
        <a href={contact.links[1].href} target="_blank" rel="noreferrer"><Network aria-hidden="true" /> LinkedIn</a>
        <a href={contact.links[2].href} target="_blank" rel="noreferrer">TakaCode <ArrowUpRight aria-hidden="true" /></a>
        <a href={contact.links[3].href} target="_blank" rel="noreferrer">{isEn ? "Store" : "Boutique"} <ArrowUpRight aria-hidden="true" /></a>
        <a href={contact.links[4].href} target="_blank" rel="noreferrer">X <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </section>
  );
}
