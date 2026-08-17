const base = "https://georgeo-agbahungba.xyz";

// Chaque route publique, dans les deux langues. `/branding-studio` en est
// volontairement absente : elle n'est reliée à aucune navigation et n'a pas
// d'équivalent anglais.
const routes = [
  { path: "", priority: 1 },
  { path: "/projets", priority: 0.9 },
  { path: "/cv", priority: 0.8 },
  { path: "/takacode", priority: 0.8 },
  { path: "/agency", priority: 0.7 },
];

export default function sitemap() {
  return routes.flatMap(({ path, priority }) =>
    ["", "/en"].map((prefix) => ({
      url: `${base}${prefix}${path}` || base,
      changeFrequency: "monthly",
      priority: prefix ? Math.max(priority - 0.1, 0.1) : priority,
    })),
  );
}
