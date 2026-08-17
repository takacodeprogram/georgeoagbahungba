import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu, Database, LayoutTemplate } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import ContactSection from "@/components/ContactSection";
import ChatAssistant from "@/components/ChatAssistant";
import SiteFooter from "@/components/SiteFooter";
import { contact } from "@/data/portfolio";

export const metadata = {
  title: "TakaCode Agency",
  description:
    "Design of web and mobile applications, AI automations, and data systems. From initial scoping to production launch.",
  alternates: { canonical: "/en/agency" },
  openGraph: {
    type: "website",
    url: "https://georgeo-agbahungba.xyz/en/agency",
    title: "TakaCode Agency — Apps, AI & Data",
    description:
      "Design of web and mobile applications, AI automations, and data systems. From initial scoping to production launch.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TakaCode Agency" }],
  },
};

const services = [
  {
    icon: LayoutTemplate,
    title: "Web & mobile applications",
    description:
      "A functional initial version of your product, built to be put into the hands of real users. Next.js, React, Supabase, and Flutter depending on the project requirements.",
  },
  {
    icon: Cpu,
    title: "AI & automation",
    description:
      "Conversational assistants and workflows that take care of repetitive tasks: content generation, document sorting, answering standard requests.",
  },
  {
    icon: Database,
    title: "Data & custom tools",
    description:
      "Offline field data collection with KoboToolbox or ODK, data pipelines, and dashboards. Designed for organizations whose data still lives in Excel spreadsheets.",
  },
];

const steps = [
  "Requirement scoping and definition of deliverables",
  "Mockups centered on actual user journeys",
  "Development in short cycles, with your feedback at each stage",
  "Deployment to production and complete source code handoff",
];

export default function AgencyPage() {
  return (
    <main className="agency-page">
      <SiteHeader solid locale="en" />

      <header className="cv-page-hero">
        <Link href="/en" data-magnetic="0.25"><ArrowLeft aria-hidden="true" /> Back to portfolio</Link>
        <p className="eyebrow">TakaCode Agency</p>
        <h1 data-anim="title">Complex ideas.<br /><em>Concrete products.</em></h1>
        <p className="lead" data-anim="up">
          We design web and mobile applications, AI automations, and data systems for companies, project leaders, and development organizations.
        </p>
        <div className="agency-hero-action">
          <a className="projects-link" href={contact.whatsapp} target="_blank" rel="noreferrer">
            Discuss your project on WhatsApp <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </header>

      <section className="agency-services" aria-labelledby="agency-services-title">
        <p className="eyebrow">Our Expertise</p>
        <h2 id="agency-services-title" data-anim="title">What we <em>build.</em></h2>

        <div className="agency-grid">
          {services.map(({ icon: Icon, title, description }) => (
            <article className="agency-card" data-anim="card" key={title}>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="method" aria-labelledby="agency-method-title">
        <div className="method-grid">
          <div className="method-principles">
            <p className="method-principle">Scope <em>fast.</em></p>
            <p className="method-principle">Deliver <em>well.</em></p>
          </div>
          <div className="method-side">
            <h3 className="method-title" id="agency-method-title">Our methodology</h3>
            <p className="method-copy">
              We look for the shortest path between your idea and a version that your users can actually try. Anything that doesn't contribute to that waits for its turn.
            </p>
            <ul className="agency-steps">
              {steps.map((step) => (
                <li className="agency-step" data-anim="up" key={step}>
                  <CheckCircle2 aria-hidden="true" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="agency-cta" aria-labelledby="agency-cta-title">
        <div className="agency-cta-inner">
          <p className="eyebrow">Ready to launch?</p>
          <h2 id="agency-cta-title" data-anim="title">Let's create your product <em>now.</em></h2>
          <p>
            Prototype, complete business application, or automation of your daily tasks: describe your need, and we will get back to you with a budget and timeline estimation.
          </p>
          <div className="agency-cta-actions">
            <a className="agency-btn agency-btn-solid" data-magnetic="0.3" href={contact.whatsapp} target="_blank" rel="noreferrer">
              Write to us on WhatsApp <ArrowUpRight aria-hidden="true" />
            </a>
            <Link className="agency-btn agency-btn-ghost" data-magnetic="0.3" href="/en#contact">By Email</Link>
          </div>
        </div>
      </section>

      <ContactSection locale="en" />
      <SiteFooter locale="en" />
      <ChatAssistant locale="en" />
    </main>
  );
}
