import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ChatAssistant from "@/components/ChatAssistant";

export const metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

// Destinations proposées plutôt qu'un unique lien de retour : la page 404 doit
// relancer la visite, pas la refermer.
const destinations = [
  { href: "/#projets", label: "Les projets", detail: "Applications, plateformes et outils livrés" },
  { href: "/cv", label: "Les CV", detail: "À télécharger en français et en anglais" },
  { href: "/takacode", label: "TakaCode", detail: "La plateforme et son écosystème" },
  { href: "/#contact", label: "Me contacter", detail: "WhatsApp ou e-mail" },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader solid />
      <main className="not-found">
        <span>404</span>
        <p>Cette piste ne mène nulle part.</p>
        <h1>Revenons au<br /><em>terrain connu.</em></h1>

        <ul className="not-found-links">
          {destinations.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <span className="not-found-label">{item.label} <ArrowUpRight aria-hidden="true" /></span>
                <span className="not-found-detail">{item.detail}</span>
              </Link>
            </li>
          ))}
        </ul>

        <Link className="not-found-home" href="/"><ArrowLeft aria-hidden="true" /> Retour au portfolio</Link>
      </main>
      <SiteFooter />
      <ChatAssistant />
    </>
  );
}
