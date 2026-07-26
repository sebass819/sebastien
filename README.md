# Firme SST minière (Québec) — Actifs du projet

Projet de démarrage d'une **firme de santé-sécurité du travail (SST) spécialisée dans le secteur minier québécois**.

**Modèle hybride :** abonnement mensuel de contenu clé en main (réunion SST + présentation interactive + 3-4 affiches) **plus** services-conseils et formation. Clientèle double : grandes sociétés minières et PME / sous-traitants miniers. Marché : tout le Québec (CNESST / LSST / RSSM).

---

## Contenu du dépôt

### `plan-affaires/`
Le plan d'affaires complet, prêt à présenter à des associés, un prêteur ou un organisme d'aide au démarrage.
- **`plan-affaires-sst-minier.docx`** — fichier maître **éditable** (Word).
- **`plan-affaires-sst-minier.pdf`** — version **présentable** (12 pages).
- **`src/`** — sources de génération : `build_plan.js` (docx-js) et `plan.html` (version HTML pour le rendu PDF).

### `prototype-console-sst/`
- **`carte-travail.html`** — prototype cliquable **« Console SST minière »** (page autonome, à ouvrir dans un navigateur). Cinq écrans reliés :
  - **Tableau de bord** — vue d'ouverture : indicateurs du quart (tâches prêtes/bloquées, points bloquants, formations à échéance, équipements à surveiller), liste « à traiter en priorité » et état du parc d'équipement.
  - **Planification du quart** — tableau des tâches par département avec cellules intelligentes (état prêt/bloqué, place de travail + lien plan, état d'équipement avec décompte de maintenance, formations du travailleur).
  - **Carte de travail intelligente** — alignée sur la carte de travail de l'AMQ (FSCT) : analyse de risques (étapes → risques → mesures de contrôle), formule de supervision, signatures.
  - **Matrice de formation** — grille travailleurs × compétences codée par couleur (valide / expire / à réviser / manquante), avec alarme automatique d'assignation.
  - **Référentiel** — RSSM + procédures internes (maquette).
  - **Alertes transversales** — formation manquante, procédure à relire, co-activité/SIMOPS avec priorité, maintenance d'équipement.
  - Version en ligne (Artifact) : https://claude.ai/code/artifact/853dd199-c1f9-4284-ba58-3074b0ca128d

---

## Statut et avertissements
- Le prototype utilise des **données fictives**, à des fins de démonstration (aligner les associés, démarcher des clients). Ce n'est pas un logiciel de production.
- Les projections financières du plan d'affaires sont des **scénarios illustratifs**, à raffiner avec des données réelles.
- Le contenu ne constitue pas un avis professionnel SST, juridique ni comptable. La crédibilité technique repose sur l'association avec un **spécialiste SST crédité**.

---

## Régénérer le plan d'affaires
```bash
cd plan-affaires/src
npm install          # installe docx-js
node build_plan.js   # régénère le .docx
```
Le PDF est produit à partir de `plan.html` (rendu via un navigateur en mode « imprimer en PDF »).
