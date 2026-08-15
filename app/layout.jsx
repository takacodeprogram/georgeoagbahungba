import "@fontsource-variable/manrope";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://georgeo-agbahungba.xyz"),
  title: "Georgeo Agbahungba — Agroéconomie, Tech & IA",
  description:
    "Portfolio de Georgeo Agbahungba, agroéconomiste, développeur full stack et entrepreneur tech à Cotonou.",
  keywords: ["Georgeo Agbahungba", "Agroéconomiste", "Développeur Full Stack", "Agritech", "Intelligence artificielle", "Bénin"],
  openGraph: {
    title: "Georgeo Agbahungba — Agroéconomie, Tech & IA",
    description: "Du terrain au code : Agritech, data, IA et produits numériques.",
    url: "https://georgeo-agbahungba.xyz",
    siteName: "Georgeo Agbahungba",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#080b0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
