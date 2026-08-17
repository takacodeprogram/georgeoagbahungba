import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { contact, cvs, projects, skills, assistantKnowledge } from "../data/portfolio.js";

const publicDir = join(import.meta.dirname, "..", "public");
const fichierPublic = (url) => join(publicDir, url.replace(/^\//, ""));

describe("CV", () => {
  test("chaque CV pointe vers deux PDF existants", () => {
    for (const cv of cvs) {
      for (const url of [cv.fr, cv.en]) {
        assert.ok(existsSync(fichierPublic(url)), `PDF absent : ${url} (CV « ${cv.title} »)`);
      }
    }
  });

  test("la numérotation suit l'ordre d'affichage", () => {
    cvs.forEach((cv, index) => {
      assert.equal(cv.number, String(index + 1).padStart(2, "0"),
        `« ${cv.title} » porte ${cv.number} alors qu'il est en position ${index + 1}`);
    });
  });

  test("chaque PDF a sa source HTML, pour pouvoir être régénéré", () => {
    for (const cv of cvs) {
      for (const url of [cv.fr, cv.en]) {
        const source = fichierPublic(url).replace(/\.pdf$/, ".html");
        assert.ok(existsSync(source), `Source HTML absente pour ${url}`);
      }
    }
  });
});

describe("Projets", () => {
  test("chaque visuel référencé existe", () => {
    for (const projet of projects) {
      if (!projet.image) continue;
      assert.ok(existsSync(fichierPublic(projet.image)), `Visuel absent : ${projet.image} (${projet.name})`);
    }
  });

  test("les noms sont uniques", () => {
    const noms = projects.map((p) => p.name);
    assert.equal(new Set(noms).size, noms.length, "Deux projets portent le même nom");
  });

  test("chaque projet déclare au moins un secteur connu", () => {
    const connus = new Set(["web-mobile", "ia-auto", "data-agri"]);
    for (const projet of projects) {
      assert.ok(projet.sectors?.length, `${projet.name} n'a aucun secteur`);
      for (const secteur of projet.sectors) {
        assert.ok(connus.has(secteur), `${projet.name} déclare un secteur inconnu : ${secteur}`);
      }
    }
  });
});

describe("Base de connaissances de l'assistant", () => {
  // Ces compteurs ont réellement divergé : l'assistant annonçait
  // « 3 chapitres » et « Trois CV » après l'ajout du Data Engineering.
  test("annonce le bon nombre de CV", () => {
    assert.match(assistantKnowledge, new RegExp(`${cvs.length} CV disponibles`),
      `L'assistant n'annonce pas ${cvs.length} CV`);
  });

  test("cite chaque CV existant", () => {
    for (const cv of cvs) {
      assert.ok(assistantKnowledge.includes(cv.fr), `Le CV « ${cv.title} » manque à la base`);
    }
  });

  test("annonce le bon nombre de projets", () => {
    assert.match(assistantKnowledge, new RegExp(`${projects.length} projets`),
      `L'assistant n'annonce pas ${projects.length} projets`);
  });

  test("ne contient aucun compteur écrit en toutes lettres", () => {
    for (const mot of ["Trois CV", "Deux CV", "2 domaines", "3 chapitres"]) {
      assert.ok(!assistantKnowledge.includes(mot),
        `Compteur figé « ${mot} » : il divergera au prochain ajout`);
    }
  });
});

describe("Contact", () => {
  test("le numéro affiché et le numéro technique concordent", () => {
    const chiffres = contact.phoneDisplay.replace(/\D/g, "");
    assert.equal(`+${chiffres}`, contact.phone,
      "phoneDisplay et phone désignent des numéros différents");
  });

  test("l'e-mail est plausible", () => {
    assert.match(contact.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test("tous les liens externes sont en HTTPS", () => {
    for (const lien of contact.links) {
      assert.match(lien.href, /^https:\/\//, `${lien.label} n'est pas en HTTPS`);
    }
  });
});

describe("Compétences", () => {
  test("aucun doublon à l'intérieur d'un groupe", () => {
    for (const [groupe, liste] of Object.entries(skills)) {
      assert.equal(new Set(liste).size, liste.length, `Doublon dans skills.${groupe}`);
    }
  });
});
