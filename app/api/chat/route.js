import { assistantKnowledge, contact, cvs, journey, projects } from "@/data/portfolio";
import { clientKey, rateLimit, tooManyRequests } from "@/lib/rate-limit";

// Chaque requête peut déclencher deux appels facturés à Mistral : un pour la
// réponse, un second si le modèle demande un outil. Les plafonds sont donc
// serrés — un visiteur qui converse normalement reste très en dessous.
const LIMITE_COURTE = { limit: 8, windowMs: 60_000 };
const LIMITE_LONGUE = { limit: 40, windowMs: 60 * 60_000 };

const fallbackAnswers = [
  { match: ["contact", "whatsapp", "téléphone", "telephone", "joindre", "email", "mail"], answer: `Vous pouvez joindre Georgeo sur WhatsApp au ${contact.phoneDisplay} ou par e-mail à ${contact.email}.` },
  { match: ["cv", "curriculum", "télécharger", "telecharger"], answer: `La section CV propose ${cvs.length} versions : ${cvs.map((cv) => cv.title).join(", ")} — chacune en français et en anglais, à télécharger sur la page /cv.` },
  { match: ["agri", "agro", "terrain", "kobo", "anacarde", "soja"], answer: "Georgeo développe notamment des solutions de collecte agricole offline, de visualisation KoboCollect, d’aide à la décision et des plateformes pour les filières agricoles (soja, anacarde)." },
  { match: ["projet", "réalisation", "realisation", "musimaps", "takacode"], answer: "Parmi ses projets : TakaCode, Musimaps, ANOPER Cartes membres, Ire Ayodé, la plateforme filière soja, Content Factory, Lottery dApp et 3D AI Customizer. La page /projets présente la liste complète." },
  { match: ["compétence", "competence", "technologie", "stack", "react", "next", "flutter", "python", "sql", "aws", "google cloud"], answer: "Ses compétences couvrent React, Next.js, Node.js, PHP/Laravel, Flutter, React Native, Python, SQL, Cloud (Google Cloud, AWS), les bases de données, le mobile, l'IA, l'automatisation, la collecte terrain et l'analyse de données." },
];

function fallback(message) {
  const value = message.toLocaleLowerCase("fr");
  return fallbackAnswers.find((item) => item.match.some((word) => value.includes(word)))?.answer
    || "Je peux vous renseigner sur les projets, les compétences, les CV et les coordonnées de Georgeo. Essayez par exemple : « Quels sont ses projets Agritech ? »";
}

/* ---- Outils type MCP : données du site exposées au modèle ---- */
const tools = [
  {
    type: "function",
    function: {
      name: "get_projects",
      description: "Liste les projets et réalisations de Georgeo avec catégorie, description, technologies et lien éventuel.",
      parameters: {
        type: "object",
        properties: { category: { type: "string", description: "Filtre optionnel : Agritech, IA, Web, Mobile, Data, E-commerce, Cartographie, etc." } },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_contact",
      description: "Coordonnées de contact : e-mail, WhatsApp, localisation, GitHub, LinkedIn, sites.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "get_cvs",
      description: "Liste des CV disponibles avec, pour chacun, le titre, le positionnement et les liens français et anglais.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "get_journey",
      description: "Parcours et expériences professionnelles de Georgeo (missions, organisations, périodes).",
      parameters: { type: "object", properties: {} },
    },
  },
];

const toolImpl = {
  get_projects: (args) => {
    const category = args?.category?.toLocaleLowerCase("fr");
    if (!category) return projects;
    return projects.filter((project) =>
      `${project.name} ${project.category} ${project.description} ${project.tags.join(" ")}`
        .toLocaleLowerCase("fr")
        .includes(category),
    );
  },
  get_contact: () => contact,
  get_cvs: () => cvs,
  get_journey: () => journey,
};

function toMistralMessages(messages) {
  return messages.map(({ role, content }) => ({
    role: role === "assistant" ? "assistant" : "user",
    content: String(content).slice(0, 500),
  }));
}

async function mistralChat(messages) {
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.MISTRAL_API_KEY}` },
    body: JSON.stringify({
      model: process.env.MISTRAL_CHAT_MODEL || "mistral-small-latest",
      temperature: 0.4,
      max_tokens: 400,
      messages: [
        { role: "system", content: assistantKnowledge },
        ...toMistralMessages(messages),
      ],
      tools,
      tool_choice: "auto",
    }),
  });

  if (!response.ok) throw new Error(`Mistral ${response.status}`);

  const data = await response.json();
  const choice = data.choices?.[0];
  const toolCalls = choice?.message?.tool_calls;

  // Exécute les outils demandés (équivalent MCP) et renvoie le résultat au modèle.
  if (Array.isArray(toolCalls) && toolCalls.length > 0) {
    const toolMessages = [
      { role: "system", content: assistantKnowledge },
      ...toMistralMessages(messages),
      choice.message,
      ...toolCalls.map((call) => {
        const name = call.function?.name;
        let args = {};
        try { args = JSON.parse(call.function?.arguments || "{}"); } catch { /* ignore */ }
        const result = toolImpl[name] ? JSON.stringify(toolImpl[name](args)) : JSON.stringify({ error: "Outil inconnu" });
        return { role: "tool", tool_call_id: call.id, name, content: result };
      }),
    ];

    const second = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.MISTRAL_API_KEY}` },
      body: JSON.stringify({
        model: process.env.MISTRAL_CHAT_MODEL || "mistral-small-latest",
        temperature: 0.4,
        max_tokens: 400,
        messages: toolMessages,
      }),
    });
    if (!second.ok) throw new Error(`Mistral ${second.status}`);
    const secondData = await second.json();
    return secondData.choices?.[0]?.message?.content || null;
  }

  return choice?.message?.content || null;
}

export async function POST(request) {
  const key = clientKey(request, "chat");
  try {
    // Le plafond est verifie avant toute lecture du corps : une requete
    // refusee ne doit rien coûter, ni en calcul ni en appel externe.
    const courte = rateLimit(key, LIMITE_COURTE);
    if (!courte.ok) return tooManyRequests(courte.retryAfter, "Trop de questions d'affilée. Reprenez dans un instant.");
    const longue = rateLimit(`${key}:h`, LIMITE_LONGUE);
    if (!longue.ok) return tooManyRequests(longue.retryAfter, "Limite horaire atteinte. Écrivez directement à Georgeo sur WhatsApp.");

    const body = await request.json();
    const messages = Array.isArray(body.messages) ? body.messages.slice(-8) : [];
    const lastMessage = messages.at(-1)?.content?.trim();
    if (!lastMessage) return Response.json({ error: "Message requis." }, { status: 400 });
    if (lastMessage.length > 500) return Response.json({ error: "Message trop long." }, { status: 400 });

    if (!process.env.MISTRAL_API_KEY) return Response.json({ message: fallback(lastMessage), mode: "local" });

    const content = await mistralChat(messages);
    return Response.json({ message: content || fallback(lastMessage), mode: "ai" });
  } catch (error) {
    // Sans cette trace, une panne de l'assistant en production etait
    // indiagnosticable : le catch renvoyait un 500 muet.
    console.error("[api/chat]", error);
    return Response.json({ error: "Assistant momentanément indisponible." }, { status: 500 });
  }
}
