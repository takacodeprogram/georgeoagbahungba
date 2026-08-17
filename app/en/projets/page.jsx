import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ProjectShowcase from "@/components/ProjectShowcase";
import { projects } from "@/data/portfolio";
import SiteHeader from "@/components/SiteHeader";
import ContactSection from "@/components/ContactSection";
import ChatAssistant from "@/components/ChatAssistant";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Projects",
  description:
    "Agritech, AI, data, web, mobile, and automation projects by Georgeo Agbahungba: platforms, applications, and business tools.",
  alternates: { canonical: "/en/projets" },
  openGraph: {
    type: "website",
    url: "https://georgeo-agbahungba.xyz/en/projets",
    title: "Projects — Georgeo Agbahungba",
    description:
      "A selection of Agritech, AI, data, web, and mobile projects: ideas made tangible.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Georgeo Agbahungba — Projects" }],
  },
};

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <SiteHeader solid locale="en" />
      <header className="projects-page-hero">
        <Link href="/en#projets" data-magnetic="0.25"><ArrowLeft aria-hidden="true" /> Back to portfolio</Link>
        <p className="eyebrow">Achievements & Products</p>
        <h1 data-anim="title">From idea<br />to <em>product.</em></h1>
        <div data-anim="up">
          <span>{projects.length} projects</span>
          <p>Agritech, AI, data, web, mobile, mapping, and automation: a curated selection from my portfolio.</p>
          <ArrowUpRight aria-hidden="true" />
        </div>
      </header>
      <section className="projects-page-list" aria-label="All projects">
        <ProjectShowcase full locale="en" />
      </section>
      <ContactSection locale="en" />
      <SiteFooter locale="en" />
      <ChatAssistant locale="en" />
    </main>
  );
}
