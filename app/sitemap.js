export default function sitemap() {
  const base = "https://georgeo-agbahungba.xyz";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projets`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/cv`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
