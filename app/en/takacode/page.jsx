import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GraduationCap, Zap, Users, Code, BookOpen, Star } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import ContactSection from "@/components/ContactSection";
import ChatAssistant from "@/components/ChatAssistant";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "TakaCode — Learning by doing powered by AI",
  description: "Discover TakaCode, Georgeo Agbahungba's learning ecosystem. Transition from an idea to a structured digital project supported by AI.",
  alternates: { canonical: "/en/takacode" },
  openGraph: {
    type: "website",
    url: "https://georgeo-agbahungba.xyz/en/takacode",
    title: "TakaCode — Learning & Creation Ecosystem",
    description: "Go from idea to structured digital project with AI assistance and hands-on learning.",
    images: [{ url: "/media/project-takacode.webp", width: 1200, height: 630, alt: "TakaCode Platform" }],
  },
};

export default function TakaCodePage() {
  return (
    <main className="takacode-page">
      <SiteHeader solid locale="en" />

      <header className="cv-page-hero">
        <Link href="/en" data-magnetic="0.25"><ArrowLeft aria-hidden="true" /> Back to portfolio</Link>
        <Image
          className="takacode-page-logo"
          src="/media/logo_light_4.png"
          alt="TakaCode"
          width={1000}
          height={1000}
          priority
        />
        <p className="eyebrow">Ecosystem & Flagship Product</p>
        <h1 data-anim="title" style={{ marginTop: "0.5rem" }}>TakaCode<br /><em>Learning by doing.</em></h1>
        <p className="lead" data-anim="up">
          Conceived and developed by Georgeo Agbahungba, TakaCode is a new kind of educational platform
          that supports the creation of real-world digital projects assisted by artificial intelligence.
        </p>
        <div className="agency-hero-action">
          <a className="projects-link" href="https://takacode.app" target="_blank" rel="noreferrer">
            Visit the platform takacode.app <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </header>

      <section className="takacode-showcase" aria-labelledby="takacode-showcase-title">
        <div className="takacode-showcase-grid">
          <figure className="takacode-showcase-media">
            <div className="takacode-showcase-frame">
              <Image
                src="/media/project-takacode.webp"
                alt="The TakaCode platform home page"
                width={1000}
                height={507}
                sizes="(max-width: 780px) 92vw, (max-width: 1050px) 88vw, 56vw"
                className="takacode-showcase-img"
                priority
              />
            </div>
          </figure>

          <div className="takacode-showcase-copy">
            <p className="eyebrow">The platform</p>
            <h2 id="takacode-showcase-title" data-anim="title">Live, <em>today.</em></h2>
            <ul className="takacode-showcase-points">
              <li>Guided tracks built around real projects</li>
              <li>AI support at every step of the build</li>
              <li>Web, mobile and automation, all the way to production</li>
            </ul>
            <p className="takacode-showcase-status">
              <span className="takacode-showcase-dot" aria-hidden="true" />
              Active platform
            </p>
            <p className="takacode-showcase-note">
              A project-oriented approach to bringing web, mobile, and AI automation applications to life.
            </p>
          </div>
        </div>
      </section>

      <section className="agency-services" aria-labelledby="takacode-concept-title" style={{ paddingBottom: "2rem" }}>
        <p className="eyebrow">The Concept</p>
        <h2 id="takacode-concept-title" data-anim="title">Why <em>TakaCode?</em></h2>
        <p className="lead-text" style={{ maxWidth: "800px", margin: "1rem auto 3rem", textAlign: "center" }}>
          Passive learning of technologies is often discouraging. TakaCode flips the equation by proposing a
          <strong> project-oriented</strong> model: you bring your idea, the platform provides the learning framework, the community,
          and the AI support to transform it into a functional product.
        </p>

        <div className="agency-grid">
          <article className="agency-card" data-anim="card">
            <GraduationCap aria-hidden="true" />
            <h3>Action-based learning</h3>
            <p>No endless theoretical courses. Every technical concept learned is immediately applied to your digital project.</p>
          </article>
          <article className="agency-card" data-anim="card">
            <Zap aria-hidden="true" />
            <h3>AI-assisted scoping</h3>
            <p>Guided AI prompts and tools to design your application architecture, design your databases, and model your user journeys.</p>
          </article>
          <article className="agency-card" data-anim="card">
            <Users aria-hidden="true" />
            <h3>Active community</h3>
            <p>Join motivated creators, participate in live sessions, theme-based challenges, and share feedback on the project gallery.</p>
          </article>
        </div>
      </section>

      <section className="method" aria-labelledby="takacode-features-title">
        <div className="method-grid">
          <div className="method-principles">
            <p className="method-principle">Build <em>for real.</em></p>
            <p className="method-principle">Share <em>fast.</em></p>
          </div>
          <div className="method-side">
            <h3 className="method-title" id="takacode-features-title">Creation tracks</h3>
            <p className="method-copy">
              TakaCode offers complete learning tracks leading to the release of concrete solutions:
            </p>
            <ul className="agency-steps">
              <li className="agency-step" data-anim="up">
                <Code aria-hidden="true" />
                <span><strong>Websites & Web Apps:</strong> Mastering modern front-end and back-end (React, Next.js, databases).</span>
              </li>
              <li className="agency-step" data-anim="up">
                <Zap aria-hidden="true" />
                <span><strong>AI & Autonomous Agents:</strong> Connecting LLMs to automate processes or create intelligent features.</span>
              </li>
              <li className="agency-step" data-anim="up">
                <BookOpen aria-hidden="true" />
                <span><strong>No-Code & Internal Tools:</strong> Digitalizing workflows without writing code from scratch.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="agency-cta" aria-labelledby="takacode-cta-title" style={{ marginTop: "4rem" }}>
        <div className="agency-cta-inner">
          <p className="eyebrow"><Star size={16} style={{ color: "var(--gold)", fill: "var(--gold)", display: "inline", verticalAlign: "middle", marginRight: "6px" }} /> Join the movement</p>
          <h2 id="takacode-cta-title" data-anim="title">Ready to bring <em>your ideas to life?</em></h2>
          <p>
            Whether you are a complete beginner or a developer looking to structure your project, TakaCode provides you with the resources and network to launch your first product.
          </p>
          <div className="agency-cta-actions">
            <a className="agency-btn agency-btn-solid" data-magnetic="0.3" href="https://takacode.app" target="_blank" rel="noreferrer">
              Discover the platform <ArrowUpRight aria-hidden="true" />
            </a>
            <Link className="agency-btn agency-btn-ghost" data-magnetic="0.3" href="/en#contact">Talk to me about TakaCode</Link>
          </div>
        </div>
      </section>

      <ContactSection locale="en" />
      <SiteFooter locale="en" />
      <ChatAssistant locale="en" />
    </main>
  );
}
