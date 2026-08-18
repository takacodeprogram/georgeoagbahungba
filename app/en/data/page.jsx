import RolePage from "@/components/RolePage";

export const metadata = {
  title: "Data Engineer",
  description:
    "Pipelines, SQL models, and automation: the full chain from raw source to a dashboard you can trust.",
  alternates: { canonical: "/en/data" },
  openGraph: {
    type: "website",
    url: "https://georgeo-agbahungba.xyz/en/data",
    title: "Data Engineer — Georgeo Agbahungba",
    description: "Pipelines, SQL models, and automation: the full chain from raw source to a dashboard you can trust.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Data Engineer — Georgeo Agbahungba" }],
  },
};

export default function Page() {
  return <RolePage role="data" locale="en" />;
}
