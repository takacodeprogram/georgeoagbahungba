import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const racine = join(import.meta.dirname, "..");
const hero = readFileSync(join(racine, "components", "Hero.jsx"), "utf8");

/** Relit une constante numérique du composant, sans l'exécuter. */
function tableau(nom) {
  const bloc = hero.match(new RegExp(`const ${nom} = \\[([^\\]]*)\\]`));
  assert.ok(bloc, `Constante ${nom} introuvable dans Hero.jsx`);
  return bloc[1].split(",").map((v) => Number(v.trim())).filter((v) => !Number.isNaN(v));
}

const SPAN = Number(hero.match(/const TIMELINE_SPAN = ([\d.]+)/)?.[1]);
const bascules = tableau("CHAPTER_SWITCH_TIMES");
const paliers = tableau("CHAPTER_REST_TIMES");
const chapitres = [...hero.matchAll(/\n {4}key: "/g)].length;

describe("Repères temporels du hero", () => {
  test("la durée de timeline est définie", () => {
    assert.ok(SPAN > 0, "TIMELINE_SPAN absent ou nul");
  });

  test("il y a autant de repères que de chapitres", () => {
    assert.equal(bascules.length, chapitres, "CHAPTER_SWITCH_TIMES ne couvre pas tous les chapitres");
    assert.equal(paliers.length, chapitres, "CHAPTER_REST_TIMES ne couvre pas tous les chapitres");
  });

  test("les repères restent dans la timeline", () => {
    for (const t of [...bascules, ...paliers]) {
      assert.ok(t >= 0 && t <= SPAN, `Repère ${t} hors de la timeline [0, ${SPAN}]`);
    }
  });

  test("les repères sont strictement croissants", () => {
    for (let i = 1; i < paliers.length; i += 1) {
      assert.ok(paliers[i] > paliers[i - 1], `Palier ${i} (${paliers[i]}) n'avance pas`);
      assert.ok(bascules[i] > bascules[i - 1], `Bascule ${i} (${bascules[i]}) n'avance pas`);
    }
  });

  test("chaque bascule précède le palier qu'elle annonce", () => {
    // L'onglet doit changer pendant la transition, pas après l'arrivée.
    for (let i = 1; i < paliers.length; i += 1) {
      assert.ok(bascules[i] < paliers[i],
        `La bascule ${i} (${bascules[i]}) tombe après son palier (${paliers[i]}) : l'onglet changerait en retard`);
    }
  });

  test("le dernier arrêt laisse sortir du hero", () => {
    assert.ok(paliers.at(-1) < SPAN,
      "Le dernier palier occupe toute la timeline : impossible de quitter le hero");
  });
});

describe("Repères du cercle", () => {
  const jeux = [...hero.matchAll(/orbit: \[([^\]]+)\]/g)]
    .map((m) => m[1].split(",").map((s) => s.trim().replace(/^"|"$/g, "")));

  test("chaque chapitre a son jeu de quatre repères", () => {
    assert.equal(jeux.length, chapitres, "Un chapitre n'a pas de repères");
    jeux.forEach((jeu, i) => assert.equal(jeu.length, 4, `Le chapitre ${i + 1} n'a pas 4 repères`));
  });

  test("aucun mot ne se répète d'un chapitre à l'autre", () => {
    // Demandé explicitement : un vocabulaire distinct par chapitre.
    const tous = jeux.flat();
    const doublons = tous.filter((mot, i) => tous.indexOf(mot) !== i);
    assert.deepEqual([...new Set(doublons)], [], `Repères répétés : ${[...new Set(doublons)].join(", ")}`);
  });

  test("les repères restent courts", () => {
    // Au-delà, le mot déborde du cercle sur mobile.
    for (const mot of jeux.flat()) {
      assert.ok(mot.length <= 9, `« ${mot} » fait ${mot.length} caractères`);
    }
  });
});

describe("Textes des chapitres", () => {
  const textes = [...hero.matchAll(/copy: "([^"]+)"/g)].map((m) => m[1]);

  test("chaque chapitre a un texte", () => {
    assert.equal(textes.length, chapitres);
  });

  test("aucun texte ne déborde sur mobile", () => {
    // Mesuré : au-delà d'environ 150 caractères le bloc sort de l'écran en 375px.
    for (const texte of textes) {
      assert.ok(texte.length <= 150, `Texte de ${texte.length} caractères : « ${texte.slice(0, 50)}… »`);
    }
  });

  test("aucun tiret cadratin en pleine phrase", () => {
    for (const texte of textes) {
      assert.ok(!/[a-zàâçéèêëîïôûùüÿœ] — [a-zàâçéèêëîïôûùüÿœ]/i.test(texte),
        `Tiret en prose : « ${texte.slice(0, 60)}… »`);
    }
  });
});
