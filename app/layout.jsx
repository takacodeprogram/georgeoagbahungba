import "@fontsource-variable/manrope";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import Script from "next/script";
import { brand, contact } from "@/data/portfolio";
import MotionLayer from "@/components/MotionLayer";
import CustomCursor from "@/components/CustomCursor";

export const metadata = {
  metadataBase: new URL("https://georgeo-agbahungba.xyz"),
  title: {
    default: "Georgeo Agbahungba — Agroéconomie, Agritech & Développement",
    template: "%s — Georgeo Agbahungba",
  },
  description:
    "Agroéconomiste et développeur Full Stack à Cotonou. Je relie l’économie agricole, le code et la donnée pour construire des outils qui servent au quotidien.",
  keywords: [
    "Georgeo Agbahungba",
    "Agroéconomiste",
    "Développeur Full Stack",
    "Agritech",
    "Intelligence artificielle",
    "Data",
    "Cotonou",
    "Bénin",
    "Portfolio développeur",
    "Suivi-évaluation",
  ],
  authors: [{ name: "Georgeo S. R. Agbahungba" }],
  creator: "Georgeo S. R. Agbahungba",
  publisher: "Georgeo S. R. Agbahungba",
  category: "Portfolio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    url: "https://georgeo-agbahungba.xyz",
    siteName: "Georgeo Agbahungba",
    title: "Georgeo Agbahungba — Agroéconomie, Agritech & Développement",
    description:
      "Agroéconomiste et développeur Full Stack à Cotonou. Je relie l’économie agricole, le code et la donnée pour construire des outils qui servent au quotidien.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Georgeo Agbahungba — Analyser. Innover. Développer.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@r_agbahungba",
    creator: "@r_agbahungba",
    title: "Georgeo Agbahungba — Agroéconomie, Agritech & Développement",
    description:
      "Agroéconomiste et développeur Full Stack à Cotonou. Je relie l’économie agricole, le code et la donnée pour construire des outils qui servent au quotidien.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport = {
  themeColor: brand.ink,
  // Le site n'implémente qu'un seul thème : l'annoncer "dark light" laissait le
  // navigateur rendre ses propres éléments (barres de défilement, remplissage
  // automatique des champs) en clair sur des pages sombres.
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Georgeo S. R. Agbahungba",
  jobTitle: "Agroéconomiste & Développeur Full Stack",
  url: "https://georgeo-agbahungba.xyz",
  email: `mailto:${contact.email}`,
  telephone: contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cotonou",
    addressCountry: "BJ",
  },
  knowsAbout: [
    "Agroéconomie",
    "Économétrie",
    "Statistiques",
    "Développement Full Stack",
    "Agritech",
    "Intelligence artificielle",
    "Data",
  ],
  sameAs: [
    "https://github.com/TripleCrownDiamond",
    "https://www.linkedin.com/in/join-digital-process",
    "https://x.com/r_agbahungba",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Georgeo Agbahungba — Portfolio",
  url: "https://georgeo-agbahungba.xyz",
  inLanguage: "fr",
  description:
    "Portfolio d'agroéconomie, data, IA et développement numérique : de l'analyse au produit.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning>
        {/* Google Tag Manager, chargé par `next/script` : une balise <script>
            écrite à la main dans un composant n'est jamais exécutée côté client. */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KSFPM6CL');`}
        </Script>

        {/* Données structurées : balise rendue par le serveur, comme recommandé
            par la doc, pour qu'elle figure dans le HTML même sans JavaScript.
            `next/script` est écarté ici : il diffère le contenu dans une file
            exécutée côté client, invisible pour les robots. Le contenu est
            échappé, `JSON.stringify` seul n'empêchant pas l'injection HTML. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c") }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KSFPM6CL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <MotionLayer />
        <CustomCursor />
      </body>
    </html>
  );
}
