import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function PortraitSection({ locale = "fr" }) {
  const isEn = locale === "en";
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
        <p className="eyebrow">{isEn ? "Let's work together" : "Travaillons ensemble"}</p>
        <h2 id="portrait-title" data-anim="title">
          {isEn ? (
            <>Analyze. Innovate.<br /><em>Develop.</em></>
          ) : (
            <>Analyser. Innover.<br /><em>Développer.</em></>
          )}
        </h2>
        <p>
          {isEn
            ? "Have an idea to scope out, a custom tool to build, or data to clean and structure? I manage the project from the initial question up to deployment and launch."
            : "Une idée à cadrer, un outil à construire, des données à remettre en ordre ? Je prends le projet depuis la question de départ jusqu’à sa mise en service."}
        </p>
        <a className="portrait-cta" data-magnetic="0.3" href="#contact">
          {isEn ? "Let's collaborate on your project" : "Collaborons sur votre projet"} <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
