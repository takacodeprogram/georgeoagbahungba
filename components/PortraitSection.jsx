import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function PortraitSection() {
  return (
    <section className="portrait" aria-labelledby="portrait-title">
      <div className="portrait-media" aria-hidden="true">
        <Image
          src="/media/georgeo-visage.webp"
          alt=""
          width={1208}
          height={1302}
          unoptimized
        />
      </div>
      <div className="portrait-copy">
        <p className="eyebrow">Travaillons ensemble</p>
        <h2 id="portrait-title">Analyser. Imaginer.<br /><em>Développer.</em></h2>
        <p>Vous avez un besoin, une idée ou un défi à relever ? Je transforme vos objectifs en solutions concrètes, de la première analyse jusqu’à la mise en production.</p>
        <a className="portrait-cta" href="#contact">Collaborons sur votre projet <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </section>
  );
}
