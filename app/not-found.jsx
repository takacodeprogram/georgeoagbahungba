import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main className="not-found"><span>404</span><p>Cette piste ne mène nulle part.</p><h1>Revenons au<br /><em>terrain connu.</em></h1><Link href="/"><ArrowLeft aria-hidden="true" /> Retour au portfolio</Link></main>;
}
