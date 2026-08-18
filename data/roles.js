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
    about: {
          "h3": {
                "fr": [
                      "Toute la chaîne de la donnée,",
                      "du terrain au tableau de bord"
                ],
                "en": [
                      "The whole data chain,",
                      "from field to dashboard"
                ]
          },
          "p": {
                "fr": [
                      "Je suis <strong>Georgeo AGBAHUNGBA</strong>, ingénieur data. Je conçois les systèmes qui rendent une donnée fiable, depuis sa collecte sur le terrain jusqu’à sa restitution.",
                      "Mon terrain d’origine est agricole : enquêtes, filières, suivi-évaluation. C’est là que j’ai appris qu’une donnée mal collectée ne se rattrape jamais en aval.",
                      "Je construis des pipelines ETL, des modèles SQL et des contrôles qualité automatisés. L’objectif n’est pas le tableau de bord, c’est la confiance qu’on peut lui accorder.",
                      "J’interviens avec Python, SQL, Supabase et les infrastructures cloud, et j’intègre l’IA générative quand elle fait gagner du temps sans coûter en fiabilité."
                ],
                "en": [
                      "I am <strong>Georgeo AGBAHUNGBA</strong>, a data engineer. I design the systems that make data trustworthy, from field collection through to reporting.",
                      "My original ground is agricultural: surveys, value chains, monitoring and evaluation. That is where I learned that badly collected data can never be repaired downstream.",
                      "I build ETL pipelines, SQL models, and automated quality controls. The goal is not the dashboard, it is how much you can trust it.",
                      "I work with Python, SQL, Supabase, and cloud infrastructure, bringing in generative AI where it saves time without costing reliability."
                ]
          },
          "badges": {
                "fr": [
                      "Pipelines ETL",
                      "SQL & Modélisation",
                      "Cloud & Qualité"
                ],
                "en": [
                      "ETL Pipelines",
                      "SQL & Modeling",
                      "Cloud & Quality"
                ]
          }
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
    about: {
          "h3": {
                "fr": [
                      "Du besoin métier",
                      "à l’application en production"
                ],
                "en": [
                      "From business need",
                      "to production software"
                ]
          },
          "p": {
                "fr": [
                      "Je suis <strong>Georgeo AGBAHUNGBA</strong>, ingénieur logiciel. Je conçois et développe des applications web et mobiles, de la première maquette à la mise en service.",
                      "Je travaille sur toute la chaîne : interface, back-end, base de données, déploiement. Un produit livré à moitié n’est pas un produit.",
                      "Mon environnement est JavaScript et TypeScript, React et Next.js côté web, Flutter et React Native côté mobile, avec Docker et l’intégration continue pour la mise en production.",
                      "Je pars toujours du parcours réel de l’utilisateur avant de choisir la technique. La technologie sert le produit, jamais l’inverse."
                ],
                "en": [
                      "I am <strong>Georgeo AGBAHUNGBA</strong>, a software engineer. I design and build web and mobile applications, from the first mockup to release.",
                      "I work across the whole chain: interface, back end, database, deployment. A half-shipped product is not a product.",
                      "My stack is JavaScript and TypeScript, React and Next.js on the web, Flutter and React Native on mobile, with Docker and CI for getting to production.",
                      "I always start from the real user journey before picking the technology. The stack serves the product, never the reverse."
                ]
          },
          "badges": {
                "fr": [
                      "Web & Mobile",
                      "Back-end & API",
                      "DevOps & CI/CD"
                ],
                "en": [
                      "Web & Mobile",
                      "Back end & APIs",
                      "DevOps & CI/CD"
                ]
          }
    },
    method: {
      fr: "Un produit ne vaut que par son usage. Je pars du parcours réel de l’utilisateur, puis je choisis la technique qui le sert.",
      en: "A product is worth what it gets used for. I start from the real user journey, then pick the technology that serves it.",
    },
  },
};

export const roleKeys = Object.keys(roles);
