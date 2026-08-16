/**
 * Limitation de débit par fenêtre glissante, en mémoire.
 *
 * Portée : le compteur vit dans l'instance qui l'exécute. En hébergement
 * serverless, plusieurs instances peuvent coexister et un attaquant déterminé
 * obtiendrait donc un multiple de la limite. Cela arrête néanmoins le cas
 * courant — un client qui martèle l'endpoint — sans dépendance ni service
 * externe. Pour un plafond réellement global, brancher un store partagé
 * (Redis) sur la même interface.
 */

const buckets = new Map();
let lastSweep = Date.now();

// Purge périodique : sans elle, la table grossirait indéfiniment au fil des IP.
function sweep(now, windowMs) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, hits] of buckets) {
    const vivants = hits.filter((t) => now - t < windowMs);
    if (vivants.length) buckets.set(key, vivants);
    else buckets.delete(key);
  }
}

/**
 * @param {string} key    identifiant de l'appelant (IP + nom de la route)
 * @param {object} config { limit: nombre d'appels, windowMs: fenêtre en ms }
 * @returns {{ok: boolean, remaining: number, retryAfter: number}}
 */
export function rateLimit(key, { limit, windowMs }) {
  const now = Date.now();
  sweep(now, windowMs);

  const hits = (buckets.get(key) || []).filter((t) => now - t < windowMs);

  if (hits.length >= limit) {
    const retryAfter = Math.max(1, Math.ceil((windowMs - (now - hits[0])) / 1000));
    return { ok: false, remaining: 0, retryAfter };
  }

  hits.push(now);
  buckets.set(key, hits);
  return { ok: true, remaining: limit - hits.length, retryAfter: 0 };
}

/**
 * Identifie l'appelant. Derrière un proxy, `x-forwarded-for` porte la chaîne
 * des relais : le premier élément est le client d'origine.
 */
export function clientKey(request, scope) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "inconnu";
  return `${scope}:${ip}`;
}

/** Réponse 429 normalisée, avec l'en-tête que les clients savent lire. */
export function tooManyRequests(retryAfter, message) {
  return Response.json(
    { error: message },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}
