import RolePage from "@/components/RolePage";

export const metadata = {
  title: "Ingénieur Logiciel",
  description:
    "Applications web et mobiles, de la première maquette à la mise en production.",
  alternates: { canonical: "/software" },
  openGraph: {
    type: "website",
    url: "https://georgeo-agbahungba.xyz/software",
    title: "Ingénieur Logiciel — Georgeo Agbahungba",
    description: "Applications web et mobiles, de la première maquette à la mise en production.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ingénieur Logiciel — Georgeo Agbahungba" }],
  },
};

export default function Page() {
  return <RolePage role="software" locale="fr" />;
}
