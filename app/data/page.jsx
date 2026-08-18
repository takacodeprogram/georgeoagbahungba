import RolePage from "@/components/RolePage";

export const metadata = {
  title: "Ingénieur Data",
  description:
    "Pipelines, modèles SQL et automatisations : la chaîne complète de la donnée brute au tableau de bord fiable.",
  alternates: { canonical: "/data" },
  openGraph: {
    type: "website",
    url: "https://georgeo-agbahungba.xyz/data",
    title: "Ingénieur Data — Georgeo Agbahungba",
    description: "Pipelines, modèles SQL et automatisations : la chaîne complète de la donnée brute au tableau de bord fiable.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ingénieur Data — Georgeo Agbahungba" }],
  },
};

export default function Page() {
  return <RolePage role="data" locale="fr" />;
}
