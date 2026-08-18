/**
 * Versions mono-métier du site.
 *
 * Tout le contenu est dérivé de `data/portfolio.js` plutôt que dupliqué : on ne
 * stocke ici que les clés de sélection. Ajouter un projet ou modifier un CV met
 * donc ces pages à jour sans y toucher.
 */
export const roles = {
  data: {
    key: "data",
    // Renvoie vers le chapitre correspondant du hero principal.
    chapterKey: "data-eng",
    portrait: { fr: "/media/georgeo-ingenieur-data.webp", en: "/media/georgeo-ingenieur-data-en.webp" },
    // Index dans `cvs` et dans les groupes de SkillsSection.
    cvIndex: 1,
    skillsGroup: 1,
    sector: "data-agri",
    label: { fr: "Ingénieur Data", en: "Data Engineer" },
    eyebrow: { fr: "Pipelines • SQL • Automatisation", en: "Pipelines • SQL • Automation" },
    title: { fr: "Structurer. Connecter.", en: "Structure. Connect." },
    accent: { fr: "Fiabiliser.", en: "Secure." },
    lead: {
      fr: "Je construis les pipelines, modèles SQL et automatisations qui transforment des sources dispersées en données propres, structurées et prêtes à être analysées.",
      en: "I build the pipelines, SQL models, and automation workflows that turn fragmented sources into clean, structured, and ready-to-analyze data.",
    },
    method: {
      fr: "Une donnée n’a de valeur que si l’on peut s’y fier. Je commence donc par la qualité et la traçabilité, avant tout tableau de bord.",
      en: "Data is only worth what it can be trusted for. I start with quality and traceability, long before any dashboard.",
    },
  },
  software: {
    key: "software",
    chapterKey: "code",
    portrait: { fr: "/media/georgeo-ingenieur-logiciel.webp", en: "/media/georgeo-ingenieur-logiciel-en.webp" },
    cvIndex: 2,
    skillsGroup: 2,
    sector: "web-mobile",
    label: { fr: "Ingénieur Logiciel", en: "Software Engineer" },
    eyebrow: { fr: "Web • Mobile • IA • Automatisation", en: "Web • Mobile • AI • Automation" },
    title: { fr: "Concevoir. Développer.", en: "Design. Develop." },
    accent: { fr: "Déployer.", en: "Deploy." },
    lead: {
      fr: "Je transforme un besoin en application que l’on peut réellement utiliser, de la première maquette jusqu’à la mise en production.",
      en: "I translate a business need into a production-ready application, from the very first mockups to final release.",
    },
    method: {
      fr: "Un produit ne vaut que par son usage. Je pars du parcours réel de l’utilisateur, puis je choisis la technique qui le sert.",
      en: "A product is worth what it gets used for. I start from the real user journey, then pick the technology that serves it.",
    },
  },
};

export const roleKeys = Object.keys(roles);
