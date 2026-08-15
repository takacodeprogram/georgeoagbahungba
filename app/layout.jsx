import "@fontsource-variable/manrope";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://georgeo-agbahungba.xyz"),
  title: {
    default: "Georgeo Agbahungba — Agroéconomie, Agritech & Développement",
    template: "%s — Georgeo Agbahungba",
  },
  description:
    "Agroéconomiste et développeur Full Stack, je combine data, technologie et expertise métier pour concevoir des solutions digitales, Agritech et IA utiles et concrètes.",
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
      "Agroéconomiste et développeur Full Stack, je combine data, technologie et expertise métier pour concevoir des solutions digitales, Agritech et IA utiles et concrètes.",
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
      "Agroéconomiste et développeur Full Stack, je combine data, technologie et expertise métier pour concevoir des solutions digitales, Agritech et IA utiles et concrètes.",
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
  themeColor: "#080b0d",
  colorScheme: "dark light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Georgeo S. R. Agbahungba",
  jobTitle: "Agroéconomiste & Développeur Full Stack",
  url: "https://georgeo-agbahungba.xyz",
  email: "mailto:contact@georgeo-agbahungba.xyz",
  telephone: "+22967659717",
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
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KSFPM6CL');`,
          }}
        />
        {/* End Google Tag Manager */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
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
      </body>
    </html>
  );
}
