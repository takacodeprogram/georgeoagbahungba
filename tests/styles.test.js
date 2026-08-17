import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const racine = join(import.meta.dirname, "..");
const css = readFileSync(join(racine, "app", "globals.css"), "utf8");

/** Contraste WCAG entre deux couleurs RVB. */
function contraste(a, b) {
  const canal = (v) => { const x = v / 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; };
  const lum = ([r, g, b2]) => 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b2);
  const [l1, l2] = [lum(a), lum(b)];
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
/** Compose une couleur semi-transparente par-dessus son fond. */
const sur = (rgb, alpha, fond) => rgb.map((c, i) => Math.round(c * alpha + fond[i] * (1 - alpha)));

const tokens = Object.fromEntries(
  [...css.matchAll(/--([a-z-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]),
);

describe("Jetons de couleur", () => {
  test("les jetons attendus sont définis", () => {
    for (const nom of ["ink", "paper", "gold", "gold-bright", "chalk"]) {
      assert.ok(tokens[nom], `Jeton --${nom} absent`);
    }
  });

  test("le texte clair sur fond sombre respecte le seuil AA", () => {
    const ratio = contraste(hex(tokens.chalk), hex(tokens.ink));
    assert.ok(ratio >= 4.5, `--chalk sur --ink : ${ratio.toFixed(2)}:1`);
  });

  test("le doré vif reste lisible sur fond sombre", () => {
    const ratio = contraste(hex(tokens["gold-bright"]), hex(tokens.ink));
    assert.ok(ratio >= 4.5, `--gold-bright sur --ink : ${ratio.toFixed(2)}:1`);
  });
});

describe("Textes atténués", () => {
  // Ces valeurs étaient toutes sous le seuil : la pire tombait à 2.60:1.
  const cas = [
    [".cv-number", /\.cv-number \{ color: rgba\(255, 255, 255, ([\d.]+)\)/, "ink"],
    [".site-footer small", /\.site-footer small \{[\s\S]*?color: rgba\(255, 255, 255, ([\d.]+)\)/, "ink"],
    [".site-footer .footer-copy", /\.footer-copy \{[\s\S]*?color: rgba\(255, 255, 255, ([\d.]+)\)/, "ink"],
    [".journey-list time", /\.journey-list time \{[^}]*color: rgba\(255, 255, 255, ([\d.]+)\)/, "ink"],
  ];

  for (const [nom, motif, fondToken] of cas) {
    test(`${nom} atteint le seuil AA`, () => {
      const trouve = css.match(motif);
      assert.ok(trouve, `Règle ${nom} introuvable : le test doit être mis à jour`);
      const alpha = Number(trouve[1]);
      const fond = hex(tokens[fondToken]);
      const ratio = contraste(sur([255, 255, 255], alpha, fond), fond);
      assert.ok(ratio >= 4.5, `${nom} : ${ratio.toFixed(2)}:1 avec alpha ${alpha}`);
    });
  }
});

describe("Hygiène de la feuille de style", () => {
  test("aucune classe n'a deux règles concurrentes", () => {
    // `.projects-link` l'était, à 300 lignes d'écart, moitié couleur moitié
    // mise en forme. On ne compte que les règles dont le sélecteur est une
    // classe seule : figurer aussi dans une liste partagée (`.a, .b { }`) est
    // légitime et ne doit pas être signalé.
    const compte = {};
    for (const m of css.matchAll(/(^|\n)([ \t]*)(\.[a-z][\w-]*)\s*\{/g)) {
      if (m[2].length > 0) continue; // indenté : à l'intérieur d'un media query
      const precedent = css.slice(Math.max(0, m.index - 2), m.index + 1);
      if (precedent.includes(",")) continue; // suite d'une liste de sélecteurs
      compte[m[3]] = (compte[m[3]] || 0) + 1;
    }
    const doublons = Object.entries(compte).filter(([, n]) => n > 1).map(([sel, n]) => `${sel} (${n}×)`);
    assert.deepEqual(doublons, [], `Règles concurrentes : ${doublons.join(", ")}`);
  });

  test("aucune classe Tailwind résiduelle dans les composants", () => {
    // Tailwind n'est pas installé : ces classes ne faisaient rien du tout.
    const fichiers = [];
    const parcourir = (dir) => {
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, e.name);
        if (e.isDirectory()) { if (!["node_modules", ".next"].includes(e.name)) parcourir(p); }
        else if (e.name.endsWith(".jsx")) fichiers.push(p);
      }
    };
    parcourir(join(racine, "app"));
    parcourir(join(racine, "components"));

    for (const f of fichiers) {
      const contenu = readFileSync(f, "utf8");
      const suspectes = contenu.match(/className="[^"]*\b(w-\d|h-\d|text-gold|p-\d|m-\d)\b[^"]*"/g);
      assert.equal(suspectes, null, `Classes Tailwind mortes dans ${f} : ${suspectes?.[0]}`);
    }
  });
});
