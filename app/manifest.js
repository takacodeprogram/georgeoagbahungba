export default function manifest() {
  return {
    name: "Georgeo Agbahungba — Agroéconomie, Tech & IA",
    short_name: "Georgeo",
    description:
      "Portfolio Agritech, IA, data et développement numérique : de l'analyse au produit.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#080b0d",
    theme_color: "#080b0d",
    orientation: "portrait-primary",
    categories: ["portfolio", "technology", "business"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "Georgeo",
      icons: [{ src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
  };
}
