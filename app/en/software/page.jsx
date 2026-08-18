import RolePage from "@/components/RolePage";

export const metadata = {
  title: "Software Engineer",
  description:
    "Web and mobile applications, from the first mockup to production.",
  alternates: { canonical: "/en/software" },
  openGraph: {
    type: "website",
    url: "https://georgeo-agbahungba.xyz/en/software",
    title: "Software Engineer — Georgeo Agbahungba",
    description: "Web and mobile applications, from the first mockup to production.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Software Engineer — Georgeo Agbahungba" }],
  },
};

export default function Page() {
  return <RolePage role="software" locale="en" />;
}
