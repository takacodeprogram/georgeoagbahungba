import Home from "../page";

export const metadata = {
  title: "Georgeo Agbahungba — From fieldwork to product",
  description:
    "I transform problems, data, and ideas into actionable digital solutions. Agroeconomics, Data Engineering, and Development.",
  alternates: { canonical: "/en" },
  openGraph: {
    type: "website",
    url: "https://georgeo-agbahungba.xyz/en",
    title: "Georgeo Agbahungba — From fieldwork to product",
    description:
      "I transform problems, data, and ideas into actionable digital solutions. Agroeconomics, Data Engineering, and Development.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Georgeo Agbahungba — Portfolio" }],
  },
};

export default function EnglishHome() {
  return <Home locale="en" />;
}
