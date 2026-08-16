import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function PortraitSection() {
  return (
    <section className="portrait" aria-labelledby="portrait-title">
      <div className="portrait-media" aria-hidden="true">
        <Image data-parallax="8"
          src="/media/georgeo-visage.webp"
          alt=""
          width={900}
          height={935}
        />
      </div>
      <div className="portrait-copy">
        <p className="eyebrow">Travaillons ensemble</p>
        <h2 id="portrait-title" data-anim="title">Analyser. Innover.<br /><em>Développer.</em></h2>
        <p>Une idée à cadrer, un outil à construire, des données à remettre en ordre ? Je prends le projet depuis la question de départ jusqu’à sa mise en service.</p>
        <a className="portrait-cta" data-magnetic="0.3" href="#contact">Collaborons sur votre projet <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </section>
  );
}
