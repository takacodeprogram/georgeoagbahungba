export const brand = {
  ink: "#080b0d",
};

export const contact = {
  phoneDisplay: "+229 01 67 65 97 17",
  phone: "+2290167659717",
  whatsapp: "https://wa.me/22967659717",
  email: "contact@georgeo-agbahungba.xyz",
  emailAlt: "gagbahungba2019@gmail.com",
  location: "Cotonou, Bénin",
  links: [
    { label: "GitHub", href: "https://github.com/TripleCrownDiamond" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/join-digital-process" },
    { label: "TakaCode", href: "https://takacode.app" },
    { label: "Boutique", href: "https://takacode.store" },
    { label: "X", href: "https://x.com/r_agbahungba" },
  ],
};

export const projects = [
  { 
    name: "TakaCode", 
    url: "https://takacode.app", 
    image: "/media/project-takacode.webp", 
    category: { fr: "Produit IA", en: "AI Product" },
    code: "TK", 
    sectors: ["web-mobile", "ia-auto"], 
    description: {
      fr: "Passer d’une idée à un projet numérique structuré avec l’appui de l’IA et l’apprentissage par la pratique.",
      en: "Go from idea to structured digital project with AI assistance and hands-on learning."
    }, 
    tags: {
      fr: ["IA", "EdTech", "Produit"],
      en: ["AI", "EdTech", "Product"]
    }
  },
  { 
    name: "Musimaps", 
    url: "https://musimaps.app", 
    image: "/media/project-musimaps.webp", 
    category: { fr: "Cartographie & Culture", en: "Mapping & Culture" },
    code: "MM", 
    sectors: ["web-mobile", "data-agri"], 
    description: {
      fr: "Explorer la musique autrement grâce à une cartographie interactive des artistes, scènes et cultures musicales.",
      en: "Explore music differently through an interactive mapping of artists, scenes, and musical cultures."
    }, 
    tags: {
      fr: ["Web", "Mobile", "Géodata"],
      en: ["Web", "Mobile", "Geodata"]
    }
  },
  { 
    name: "Lokali", 
    url: "https://lokali.bj", 
    image: "/media/project-lokali.webp", 
    category: { fr: "Plateforme locale", en: "Local Platform" },
    code: "LO", 
    sectors: ["web-mobile", "data-agri"], 
    description: {
      fr: "Rendre les prix agricoles plus accessibles pour mieux comprendre les marchés et comparer les produits au Bénin.",
      en: "Making agricultural prices more accessible to better understand markets and compare products in Benin."
    }, 
    tags: {
      fr: ["Web", "Prix agricoles", "Bénin"],
      en: ["Web", "Agricultural Prices", "Benin"]
    }
  },
  { 
    name: "Collecte agricole IA", 
    url: null, 
    category: { fr: "Agritech & Data", en: "Agritech & Data" },
    code: "AI", 
    sectors: ["ia-auto", "data-agri"], 
    description: {
      fr: "Solution de collecte terrain offline et géolocalisée pour suivre, analyser et exploiter les données agricoles.",
      en: "Offline and geolocated field data collection solution to track, analyze, and leverage agricultural data."
    }, 
    tags: {
      fr: ["Agritech", "Data", "IA"],
      en: ["Agritech", "Data", "AI"]
    }
  },
  { 
    name: "Content Factory", 
    url: "https://content-factory-rose.vercel.app/login", 
    image: "/media/project-contentfactory.webp", 
    category: { fr: "IA & Automatisation", en: "AI & Automation" },
    code: "CF", 
    sectors: ["web-mobile", "ia-auto"], 
    description: {
      fr: "Automatiser la chaîne éditoriale, de la génération du contenu jusqu’à sa validation, sa planification et sa diffusion.",
      en: "Automate the editorial chain, from content generation to validation, scheduling, and distribution."
    }, 
    tags: {
      fr: ["IA", "Automatisation", "Contenu"],
      en: ["AI", "Automation", "Content"]
    }
  },
  { 
    name: "ANOPER — Cartes membres", 
    url: "https://anoper.bj/card-create-system/", 
    category: { fr: "Solution métier", en: "Business Solution" },
    code: "AN", 
    sectors: ["web-mobile"], 
    description: {
      fr: "Plateforme de gestion pour générer, administrer et exporter les cartes des membres de l’association.",
      en: "Management platform to generate, administer, and export association member cards."
    }, 
    tags: {
      fr: ["Association", "Gestion", "Digitalisation"],
      en: ["Association", "Management", "Digitalization"]
    }
  },
  { 
    name: "Plateforme filière soja", 
    url: "https://platformparcsojaidid-dqhk.vercel.app/", 
    category: { fr: "Agritech", en: "Agritech" },
    code: "SO", 
    sectors: ["web-mobile", "data-agri"], 
    description: {
      fr: "Ressources éducatives pour les acteurs de la filière soja et modernisation de la présence numérique d’IDID.",
      en: "Educational resources for soybean sector actors and modernization of IDID's digital presence."
    }, 
    tags: {
      fr: ["Agritech", "Filière", "Digitalisation"],
      en: ["Agritech", "Value Chain", "Digitalization"]
    }
  },
  { 
    name: "Ire Ayodé", 
    url: "https://ireayode.bj", 
    category: { fr: "Data agricole", en: "Agricultural Data" },
    code: "IA", 
    sectors: ["data-agri"], 
    description: {
      fr: "Visualisation des données KoboCollect des coopératives d’anacarde dans les Collines du Bénin.",
      en: "Visualization of KoboCollect data from cashew cooperatives in the Collines region of Benin."
    }, 
    tags: {
      fr: ["Coopératives", "Data", "Terrain"],
      en: ["Cooperatives", "Data", "Field"]
    }
  },
  { 
    name: "Lottery dApp", 
    url: "https://lottery-nextjs-dapp-triplecrowndiamond.vercel.app/", 
    category: { fr: "Web3", en: "Web3" },
    code: "W3", 
    sectors: ["web-mobile"], 
    description: {
      fr: "Loterie décentralisée pour explorer la blockchain et les contrats intelligents de bout en bout.",
      en: "Decentralized lottery to explore blockchain and smart contracts from end to end."
    }, 
    tags: {
      fr: ["Web3", "Blockchain", "Expérimentation"],
      en: ["Web3", "Blockchain", "Experimentation"]
    }
  },
  { 
    name: "3D AI Customizer", 
    url: "https://project-threejs-ai-customizer-app.onrender.com/", 
    category: { fr: "3D + IA", en: "3D + AI" },
    code: "3D", 
    sectors: ["web-mobile", "ia-auto"], 
    description: {
      fr: "Personnalisateur de t-shirts 3D avec génération de textures par intelligence artificielle.",
      en: "3D t-shirt customizer with texture generation powered by artificial intelligence."
    }, 
    tags: {
      fr: ["3D", "IA", "Expérimentation"],
      en: ["3D", "AI", "Experimentation"]
    }
  },
  { 
    name: "Castro Négocé Inter", 
    url: "https://centurion.castronegoceinter.com/", 
    category: { fr: "Digitalisation", en: "Digitalization" },
    code: "CN", 
    sectors: ["web-mobile"], 
    description: {
      fr: "Digitalisation de l’entreprise et déploiement d’un outil de gestion pour ses boutiques de Cotonou et Lomé.",
      en: "Company digitalization and deployment of a management tool for its Cotonou and Lomé stores."
    }, 
    tags: {
      fr: ["Entreprise", "Gestion", "Web"],
      en: ["Business", "Management", "Web"]
    }
  },
  { 
    name: "Le Rural", 
    url: "https://lerural.bj", 
    image: "/media/project-lerural.webp", 
    category: { fr: "Média agricole", en: "Agricultural Media" },
    code: "LR", 
    sectors: ["web-mobile", "data-agri"], 
    description: {
      fr: "Projet web pour le groupe de presse agricole Le Rural / AIG-Bénin.",
      en: "Web project for the agricultural press group Le Rural / AIG-Benin."
    }, 
    tags: {
      fr: ["Média", "Agriculture", "Web"],
      en: ["Media", "Agriculture", "Web"]
    }
  },
  { 
    name: "IDID ONG", 
    url: "https://ididong.org", 
    image: "/media/project-idid.webp", 
    category: { fr: "Développement", en: "Development" },
    code: "ID", 
    sectors: ["web-mobile", "data-agri"], 
    description: {
      fr: "Présence numérique de l’ONG IDID, partenaire du secteur agricole et territorial.",
      en: "Digital presence of the NGO IDID, partner of the agricultural and territorial sector."
    }, 
    tags: {
      fr: ["ONG", "Agriculture", "Web"],
      en: ["NGO", "Agriculture", "Web"]
    }
  },
  { 
    name: "Data Palace", 
    url: "https://datapalace.com", 
    category: { fr: "Web", en: "Web" },
    code: "DP", 
    sectors: ["web-mobile"], 
    description: {
      fr: "Projet web référencé dans le parcours de réalisations.",
      en: "Web project referenced in the track of achievements."
    }, 
    tags: {
      fr: ["Web", "Produit"],
      en: ["Web", "Product"]
    }
  },
  { 
    name: "Invitation Dot", 
    url: "https://invitation-dot.vercel.app", 
    image: "/media/project-invitation.webp", 
    category: { fr: "Événementiel", en: "Events" },
    code: "ID", 
    sectors: ["web-mobile"], 
    description: {
      fr: "Invitation numérique pour une cérémonie de dot : écran de bienvenue, détails de l'événement et informations pratiques.",
      en: "Digital invitation for a dowry ceremony: welcome screen, event details, and practical information."
    }, 
    tags: {
      fr: ["Web", "Événementiel", "Invitation"],
      en: ["Web", "Events", "Invitation"]
    }
  },
];

export const cvs = [
  { 
    title: { fr: "Agroéconomie & Agritech", en: "Agroeconomics & Agritech" }, 
    subtitle: { fr: "Terrain · Économie rurale · Data · Suivi-évaluation", en: "Fieldwork · Rural Economy · Data · M&E" }, 
    description: {
      fr: "Parcours académique, expériences terrain, analyse de données, suivi-évaluation et projets agricoles.",
      en: "Academic background, fieldwork, data analysis, monitoring & evaluation, and agricultural projects."
    }, 
    fr: "/cv/CV_Agroeconomiste_FR.pdf", 
    en: "/cv/CV_Agroeconomiste_EN.pdf", 
    number: "01" 
  },
  { 
    title: { fr: "Développement & Produit", en: "Development & Product" }, 
    subtitle: { fr: "Full Stack · Mobile · IA · Automatisation", en: "Full Stack · Mobile · AI · Automation" }, 
    description: {
      fr: "Expériences techniques, technologies, produits numériques et projets de développement logiciel.",
      en: "Technical background, tech stacks, digital products, and software engineering projects."
    }, 
    fr: "/cv/CV_Developpeur_FR.pdf", 
    en: "/cv/CV_Developpeur_EN.pdf", 
    number: "02" 
  },
  { 
    title: { fr: "Data Engineering", en: "Data Engineering" }, 
    subtitle: { fr: "Collecte · ETL · SQL · Qualité · Décision", en: "Collection · ETL · SQL · Quality · Decision" }, 
    description: {
      fr: "Chaîne de vie de la donnée agricole : conception des enquêtes, contrôle qualité, modélisation et restitution.",
      en: "Agricultural data life cycle: survey design, quality control, modeling, and output presentation."
    }, 
    fr: "/cv/CV_DataEngineer_FR.pdf", 
    en: "/cv/CV_DataEngineer_EN.pdf", 
    number: "03" 
  },
  { 
    title: { fr: "Profil multidisciplinaire", en: "Multidisciplinary Profile" }, 
    subtitle: { fr: "Agroéconomie · Data · Technologie", en: "Agroeconomics · Data · Technology" }, 
    description: {
      fr: "Une vision complète de mon parcours, de mes compétences et de mes expériences professionnelles.",
      en: "A comprehensive view of my background, skill sets, and professional experiences."
    }, 
    fr: "/cv/CV_Complet_FR.pdf", 
    en: "/cv/CV_Complet_EN.pdf", 
    number: "04" 
  },
];

export const journey = [
  { 
    period: "2015 — 2020", 
    role: { fr: "Terrain & développement rural", en: "Fieldwork & Rural Development" }, 
    org: "REV-Développement · APECDI", 
    detail: {
      fr: "Enquêtes de terrain, animation de filières et suivi-évaluation des projets de développement.",
      en: "Field surveys, value chain animation, and monitoring & evaluation of rural development projects."
    }
  },
  { 
    period: "2019 — 2022", 
    role: { fr: "Développeur web freelance", en: "Freelance Web Developer" }, 
    org: "Digital Process & clients", 
    detail: {
      fr: "Conception et livraison de sites, plateformes métiers et produits numériques de bout en bout.",
      en: "End-to-end design and delivery of websites, business platforms, and digital products."
    }
  },
  { 
    period: "2020 — aujourd’hui", 
    role: { fr: "Fondateur — Solutions Luciole", en: "Founder — Solutions Luciole" }, 
    org: "Solutions Luciole", 
    detail: {
      fr: "Pilotage de produits numériques à la rencontre de l’analyse, du code et de la donnée.",
      en: "Digital product management at the intersection of economic analysis, code, and data."
    }
  },
  { 
    period: "2023 — aujourd’hui", 
    role: { fr: "Produits numériques & IA", en: "Digital Products & AI" }, 
    org: "TakaCode · Musimaps", 
    detail: {
      fr: "Applications, agents IA et exploration cartographique de la musique, apprentissage par la pratique.",
      en: "Apps, AI agents, and interactive cartographic music exploration, learning by doing."
    }
  },
  { 
    period: "2024 — 2026", 
    role: { fr: "Data agricole, Agritech & automatisation", en: "Agricultural Data, Agritech & Automation" }, 
    org: "Missions & clients Agritech", 
    detail: {
      fr: "Audits, enquêtes agricoles, plateformes de filières et automatisations intelligentes spécialisées.",
      en: "Audits, agricultural surveys, value chain platforms, and specialized smart automations."
    }
  },
];

export const skills = {
  dev: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PHP", "Laravel", "Flutter", "React Native", "Expo", "WordPress", "SQL", "Supabase", "Google Cloud", "AWS Cloud", "Git", "GitHub", "Docker", "APIs", "Generative AI", "Funnel Building"],
  agro: ["Python", "SQL", "R", "Stata", "SPSS", "Excel", "KoboToolbox", "ODK", "Power BI", "QGIS", "Econometrics", "Statistics", "Data Analysis", "Agricultural Policy Analysis", "Project Management", "Monitoring & Evaluation", "Impact Evaluation"],
};

export const assistantKnowledge = `
Tu es Georgeo S. R. Agbahungba, ou plutôt son assistant IA conversationnel chaleureux, vivant et passionné.
Exprime-toi de manière naturelle, comme un humain qui présente son travail de façon enthousiaste, sans formules trop formelles, rigides ou robotiques.
Évite les phrases types comme "Je suis l'assistant officiel..." ou "Sur la base des informations...". Reste fluide et direct, comme un collègue ou un partenaire de projet.
N'hésite pas à utiliser un ton complice et professionnel à la fois, avec des retours à la ligne clairs pour une lecture agréable.

PROFIL
Georgeo S. R. Agbahungba est agroéconomiste et développeur Full Stack / Data Engineer à Cotonou au Bénin. Actuellement en Master 2 en Agroéconomie à la Faculté des Sciences Agronomiques de l'Université d'Abomey-Calavi (FSA/UAC). C'est un développeur certifié freeCodeCamp avec plus de 6 ans d'expérience en code et 7+ ans en agronomie. Il combine l'analyse économique et économétrique avec la création d'applications web, mobiles et d'outils digitaux pour fiabiliser et automatiser les flux d'information (ETL). Son objectif : apporter de la valeur concrète au secteur Agritech.

SA MÉTHODE DE TRAVAIL
1. Le problème d'abord. 2. La solution ensuite. 3. Pas de technologie pour la technologie (il cherche la réponse la plus simple et directe au problème réel).

MÉTRIQUES
7+ années en agronomie · 6+ années en développement · ${projects.length}+ projets réalisés · 3 domaines d'expertise (agroéconomie, développement logiciel et data engineering).

COMPÉTENCES
Développement & Technologie : ${skills.dev.join(" · ")}.
Agroéconomie & Data : ${skills.agro.join(" · ")}.

PARCOURS (timeline)
${journey.map((item) => `- ${item.period} : ${item.role.fr} (${item.org}) — ${item.detail.fr}`).join("\n")}

PROJETS (${projects.length})
${projects.map((project) => `- ${project.name} [${project.category.fr}] : ${project.description.fr}${project.url ? " — " + project.url : ""}`).join("\n")}

CV
${cvs.length} CV thématiques sont consultables et téléchargeables en français et en anglais sur la page /cv :
${cvs.map((cv) => `- ${cv.title.fr} — ${cv.subtitle.fr} (${cv.fr})`).join("\n")}

CONTACT
E-mail : ${contact.email} · WhatsApp : ${contact.phoneDisplay} (${contact.whatsapp}) · Localisation : ${contact.location}.
GitHub : ${contact.links[0].href} · LinkedIn : ${contact.links[1].href} · TakaCode : ${contact.links[2].href} · Boutique : ${contact.links[3].href} · X : ${contact.links[4].href}.
`;
