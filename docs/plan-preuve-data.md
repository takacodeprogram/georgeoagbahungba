# Plan — Module de preuve data

Ajouter au portfolio une pièce qui **démontre** le métier de data engineer au lieu de
l'affirmer. Aujourd'hui le site répète « je transforme la donnée en produit » sur
11 sections sans jamais montrer une donnée.

**Forme retenue** : un pipeline qui tourne réellement dans le navigateur, sur des
données synthétiques.
**Emplacement** : page dédiée `/data` (+ `/en/data`), avec une accroche courte sur la home.

---

## 1. Le principe directeur

Un « pipeline animé » qui rejoue une animation en boîte n'est pas une preuve, c'est
une 34ᵉ animation. La règle qui rend ce module crédible tient en une phrase :

> Tout ce que le visiteur voit est réellement calculé, devant lui, à partir d'une
> graine qu'il contrôle.

Trois conséquences non négociables :

- **Une graine modifiable.** Changer la graine régénère les données brutes, le même
  pipeline tourne, le résultat change. C'est ce qui prouve que rien n'est préenregistré.
- **Des règles désactivables.** Chaque règle de nettoyage est un interrupteur. En
  couper une, les chiffres en aval bougent vraiment. Le visiteur peut le casser.
- **Le vrai code affiché.** À côté de chaque règle, la fonction réellement exécutée —
  pas une capture d'écran de code.

## 2. Le scénario

Un export d'enquête agricole type KoboToolbox / ODK — le format exact des missions
terrain. **Indicateur** : rendement par hectare et par région.

Le générateur produit un désordre réaliste, celui qu'on trouve vraiment dans ces exports :

| Défaut injecté | Pourquoi il est réaliste |
|---|---|
| Valeurs manquantes sur la surface cultivée | Question sautée sur le terrain |
| Unités mélangées (kg, sacs, tonnes) | Plusieurs enquêteurs, pas de contrainte de saisie |
| Identifiants répondants dupliqués | Formulaire renvoyé deux fois en zone blanche |
| Dates en trois formats | Saisie manuelle vs horodatage ODK |
| Valeurs aberrantes (rendement ×100) | Faute de frappe sur la virgule |
| Noms de région en casse et accents variables | Champ texte libre au lieu d'une liste |

Le point de démonstration : **la valeur vient des règles de nettoyage, pas du
graphique.** C'est exactement ce qui sépare un data engineer d'un utilisateur de
tableau de bord — et c'est invisible sur tous les portfolios.

## 3. Les quatre étages

1. **Source** — table brute, défauts surlignés, compteur de lignes.
2. **Nettoyage** — une règle = un interrupteur + sa fonction réelle + le nombre de
   lignes qu'elle rejette.
3. **Modèle** — agrégation par région, rendement/ha, score z pour les aberrations.
4. **Sortie** — graphique + carte de qualité qui se réconcilie :
   `1 000 entrées → 43 rejetées → 957 sorties`.

## 4. Architecture technique

**Zéro backend.** Tout est calculé côté client, en fonctions pures.

```
lib/pipeline/
  rng.js        — PRNG à graine (mulberry32, ~5 lignes) : reproductible
  generate.js   — génération des lignes d'enquête synthétiques
  rules.js      — { id, label, code, apply(rows) → { rows, rejected } }
  model.js      — agrégations, rendement/ha, score z

components/data/
  PipelineStage.jsx     — un étage
  RuleToggle.jsx        — interrupteur + code de la règle
  PipelineChart.jsx     — SVG écrit à la main
  QualityScorecard.jsx  — compteurs entrées / rejets / sorties

app/data/page.jsx       — FR
app/en/data/page.jsx    — importe le même composant avec locale="en"
```

**Décisions à tenir :**

- **Pas de librairie de graphiques.** Recharts ou D3, c'est 50 à 100 ko pour un seul
  graphique, sur un site qui embarque déjà GSAP. Un SVG écrit à la main est plus léger
  — et c'est en soi une démonstration de compétence.
- **Fonctions pures = testables.** `npm test` existe déjà (`node --test tests/**/*.test.js`).
  Des tests sur les règles de nettoyage sont un multiplicateur de crédibilité :
  un pipeline testé, c'est le sujet même de la page.
- **1 000 à 5 000 lignes.** Ça tourne en moins de 10 ms, le fil principal ne bronche pas.
  Un Web Worker ne se justifierait qu'au-delà de 100 000 lignes — ne pas y aller.
- **État dans l'URL.** Graine + règles actives sérialisées en query string : le visiteur
  peut partager exactement ce qu'il a obtenu.

## 5. Phasage

| Phase | Contenu | Charge |
|---|---|---|
| **0** | Figer l'indicateur et les défauts à injecter | 30 min |
| **1** | Le moteur : `rng`, `generate`, `rules`, `model` + tests. Aucune UI. | ½ journée |
| **2** | La page : mise en page statique, calcul réel branché, FR seul, sans animation | 1 journée |
| **3** | Interaction : interrupteurs, graine, état URL, carte de qualité | ½ journée |
| **4** | Finition : animation par étage, miroir EN, sitemap, nav, accroche home, passe responsive | ½ journée |

**Point de contrôle après la phase 1.** Livrable : `npm test` au vert et un script node
qui imprime les compteurs avant/après. Si les chiffres ne racontent rien d'intéressant
à ce stade, aucune interface ne les sauvera — mieux vaut réviser le scénario que
construire par-dessus.

## 6. Intégration au site existant

- **Nav** : ajouter l'entrée aux deux tableaux de `components/SiteHeader.jsx` (l. 12 et 21).
- **Accroche home** : un bandeau compact, **1 écran maximum**. La home fait déjà
  24 écrans ; ce module ne doit pas l'allonger. À placer entre `takacode-promo` et `projects`.
- **Sitemap** : `app/sitemap.js` ne liste que 3 URL — il manque déjà `/takacode`,
  `/agency` et toutes les routes `/en`. À corriger en même temps.
- **Design** : réutiliser `.eyebrow`, `.section-heading`, `.primary-action` et le
  padding fluide `clamp(90px, 11vw, 180px) clamp(24px, 7.5vw, 132px)`. Aucun style inline.
- **Accessibilité** : interrupteurs en vraies cases à cocher, alternative tabulaire au
  graphique, région live annonçant les compteurs.
- **`prefers-reduced-motion`** : respecté partout ailleurs sur le site — ici, résultats
  instantanés au lieu de l'animation par étage.

## 7. Risques

**Avoir l'air factice.** C'est le risque principal, et il tue le module s'il se
matérialise. Neutralisé par la graine modifiable et le code visible : ce sont les deux
seules choses qu'une animation en boîte ne peut pas imiter.

**Devenir la 34ᵉ animation.** Neutralisé par la page dédiée et le plafond d'un écran
sur la home.

**L'honnêteté sur les données.** La page doit dire clairement et visiblement
« données synthétiques, générées dans votre navigateur ». Ne jamais laisser entendre
qu'il s'agit de données client réelles — l'ambiguïté ferait perdre exactement la
crédibilité que le module cherche à gagner. Ce qui est démontré ici, c'est
l'ingénierie, pas le contenu.
