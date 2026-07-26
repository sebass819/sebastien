# Projet SST minière — Cahier des charges
### Firme SST + programme « Console SST minière » · synthèse du projet et de toutes les attentes

> Document de référence unique : le projet et **toutes les attentes** exprimées pour le programme.
> Sert à **aligner les associés**, **briefer un développeur (chiffrage)** et **suivre la portée**.
> Toutes les données du prototype sont **fictives**. — *Mise à jour : 26 juillet 2026*

---

## 1. Vision en une page

**La firme.** Une firme de santé-sécurité du travail (SST) spécialisée dans le **secteur minier québécois**. Modèle **hybride** : abonnement mensuel de contenu clé en main (réunion SST + présentation interactive + 3-4 affiches) **plus** services-conseils et formation.

**Le programme.** Une **console SST minière** — un « système d'exploitation » de la sécurité au **quart de travail**, qui **numérise la carte de travail de l'AMQ (FSCT)** et la rend **intelligente** : elle vérifie automatiquement **formation, équipement, co-activité et maintenance** avant qu'un travailleur descende, et se **branche aux outils déjà en place** (formation, gestion de mine, paie).

**Le lien.** Le programme est le **produit numérique différenciateur** de la firme ; il se vend en **add-on** de l'abonnement de contenu, **par module**.

---

## 2. La firme (contexte d'affaires)

| Élément | Détail |
|---|---|
| Secteur / juridiction | Mines du Québec — CNESST, LSST, **RSSM** (Règlement SST dans les mines) |
| Modèle | Hybride : contenu mensuel (abonnement) + conseils/formation + programme numérique (add-on) |
| Clientèle | Grandes sociétés minières **et** PME / sous-traitants miniers |
| Équipe | Fondateur = milieu minier + réseau + développement d'affaires · **associé(s) crédité(s) SST** = expertise et signature technique |
| Financement | Autofinancement, démarrage lean |
| Marché | Tout le Québec |

*Détails complets, prix et scénarios financiers : voir `plan-affaires/`.*

---

## 3. Le programme — vision et positionnement

**Ce que c'est :** un programme intégré qui combine, autour du **quart de travail** :
un **référentiel** (loi des mines RSSM + procédures internes) · la **planification des travaux** · une **matrice de formation** avec alarmes · la **carte de travail** (format AMQ/FSCT) · le **temps → paie** · la **co-activité** (conflits entre départements) · la **gestion des équipements** (bris, maintenance).

**Positionnement :** « **la carte de travail de l'AMQ, numérisée et intelligente** ».
Ne pas concurrencer de front les grands logiciels EHS (Isovision, etc.) → se **greffer** aux outils déjà en place. Le terrain libre : ces outils *capturent* l'information ; le nôtre la **transforme en barrière de sécurité** (et en contenu de prévention).

---

## 4. Mes attentes détaillées (les exigences) — le cœur du document

*Chaque bloc = une attente exprimée. « Prototype » indique l'état actuel.*

### A · Écran d'accueil — Planification du quart
- À l'ouverture, un **tableau de planification du quart** : une ligne = une tâche (développement, muck, forage, boulonnage, transport, cadenassage, espace clos…).
- **3 zones visibles ensemble** : la carte à remplir/imprimer · le tableau de planif mine · des **onglets par département**.
- **Cellules intelligentes** — l'info clé s'affiche dans la cellule :
  - **Travailleur** → ses **formations** s'affichent ; **drapeau** si une **révision de procédure** est due.
  - **Place de travail** → **lien pour imprimer le plan** (plans et devis du chantier).
  - **Équipement** → si **brisé**, l'indiquer avec le **bris** ; si une **maintenance approche**, afficher un **décompte**.
  - **Co-activité** → si un autre département travaille dans le même secteur, l'indiquer et **dire qui est prioritaire**.
- Clic sur une ligne → ouvre la **carte de travail** de cette tâche.
- **Prototype : ✅ fait** (onglets « Tableau de bord » + « Planification »).

### B · Carte de travail — format AMQ / FSCT
- Reproduire la **vraie carte** (*Accueil début de quart*) telle qu'utilisée sur le terrain :
  - **Début de quart** : date / quart / équipe / superviseur / **poste** ; **véhicule + état/condition + stationnement** ; **lieux de travail #T1 à #T5** (plusieurs lieux par carte) + tâche + **situation actuelle** ; **conditions spéciales du jour** ; **permis particuliers** (travail à chaud, espace clos, cadenassage, creusage/proximité ligne électrique, travailleur seul) ; **EPI, matériel et outils requis** ; **attestation** (état d'esprit · **compétences et formation** · directives comprises).
  - **Fin de quart** : exécution superviseur (travail conforme?) · action positive à souligner · matériel pour le prochain quart · **carré rouge** (événement/accident/passé-proche · alarme détecteur de gaz · cadenas personnel retiré · développement à déclarer) · commentaires SST · **signatures**.
- **Intelligence par-dessus** : l'attestation « j'ai les **compétences et la formation** » est **validée ou bloquée automatiquement** par le système (fini le « oui » coché à tort). **Permis et EPI dérivés automatiquement** selon la tâche.
- **Prototype : ✅ fait**, incluant un **exemple réel reproduit** (Sylvie Gauthier — chargement explosif — véhicule EMU-002, niveau 41 — lieux 036 GRO 05 / 051 PSO 114 — rampe fermée 11 h 30–12 h 30 — harnais et longe).

### C · Matrice de formation + barrière automatique
- **Matrice travailleurs × compétences**, codée par couleur (valide / expire bientôt / à réviser / **manquante**).
- **Alarme automatique** si le travailleur **n'a pas la formation** requise, ou **doit réviser une procédure** avant d'utiliser un équipement.
- **Barrière** : la carte de travail concernée reste **bloquée** tant que ce n'est pas réglé.
- **Prototype : ✅ fait** (onglet « Matrice de formation »).

### D · Impression automatique des documents
- Si le travailleur **n'a pas lu** les procédures liées à la tâche (ou n'a pas la formation), **impression automatique** des **procédures** + **plans et devis** joints à la carte.
- **Prototype : ✅ maquetté** (bouton « Imprimer et joindre »).

### E · Référentiel
- **Toute la loi des mines (RSSM)** + **toutes les procédures internes**, consultables et toujours à jour.
- **Prototype : ✅ maquette** (onglet « Référentiel » avec recherche).

### F · Gestion des équipements
- **Bris** signalé et affiché · **maintenance planifiée affichée à l'avance avec un décompte** · lien avec le **cadenassage (LOTO)**.
- Équipement en maintenance = **indisponible** → bloque la tâche qui en dépend.
- **Prototype : ✅ fait** (états dans la planif + « État du parc » au tableau de bord).

### G · Co-activité (SIMOPS)
- Si un autre département travaille dans le **même secteur** → **alarme de conflit** + **qui est prioritaire**.
- **Prototype : ✅ fait**.

### H · Temps & présence → paie
- Saisie des **heures** et du **travail effectué** ; **envoi à la paie** (heures + code d'activité).
- **Prototype : ✅ maquetté**. Le vrai lien paie = intégration (voir I).

### I · Intégrations (se brancher aux outils déjà en place)
- **Formation** — se connecter au système de formation des travailleurs (**« Paelo »** — *nom/fournisseur à confirmer*) pour importer formations et certifications → alimente la matrice.
- **MS4M** — données **en temps réel** → **mise à jour automatique des quarts** et des **rapports de fin de quart**.
- **Paie** — **export** des heures et codes d'activité.
- **Statut : vrai développement back-end, par phases.** Le prototype pourra les **montrer** via des connecteurs maquettés *(à faire)*.

### J · Analytique / statistiques
- **Travailleurs les plus performants** (production, tâches, délais).
- **Délais mécaniques** par travailleur et **délais des machines**.
- **Arbitrage « travailleur vs machine »** — croiser les **bris par (machine × opérateur)** :
  - machine qui brise sous **tous** les opérateurs → problème **machine** (à réformer/réviser) ;
  - machine qui brise surtout sous **un** opérateur → **technique/formation** de l'opérateur (est-il « dur » sur l'équipement?).
- **Rapports de fin de quart** automatisés.
- **Statut : maquettable** *(à faire — vue « Analytique »)*.

### K · Plateforme adaptative / registre d'incidents (Volet 2 — à explorer)
- Capturer **toutes les blessures / passés-proches** sur les sites clients (comme Isovision) et **adapter le contenu de prévention en temps réel** aux risques réels du client.
- Contenu mensuel **basé sur de vrais événements** du secteur → justifie le palier « sur mesure ».
- **Statut : exploration / add-on payant séparé.**

---

## 5. État actuel du prototype

**Console SST minière** — maquette cliquable, **5 écrans reliés** :
1. **Écran d'ouverture** (connexion, choix site / quart).
2. **Tableau de bord** (indicateurs du quart · à traiter en priorité · état du parc).
3. **Planification du quart** (tableau à cellules intelligentes · onglets départements · aperçu carte).
4. **Carte de travail** (format FSCT · début + fin de quart · lieux multiples · attestation intelligente).
5. **Matrice de formation** (compétences × travailleurs · alarmes).
   *+ Référentiel (RSSM + procédures).*

- **Données :** flotte réaliste (jumbos **JU**, boulonneuses Boltec **BO**, chargeuses-navettes **CN**, camions **CA**, jeeps **JP**, foreuses **FO**, unité d'émulsion **EMU**) + équipage (10 travailleurs, métiers, certifications). **Toutes fictives.**
- **Où (dépôt) :** `prototype-console-sst/` — version source + **version autonome** (fichier HTML unique).

⚠️ **C'est une maquette de démonstration** — pour aligner les associés et démarcher. Pas un logiciel de production.

### Comment ouvrir le prototype
- **Fichier autonome** `Console-SST-miniere-autonome.html` → le **télécharger** et l'**ouvrir dans un navigateur** (double-clic). Fonctionne **hors ligne, sans compte**. *(Le plus simple.)*
- **En ligne (Artifact)** : privé — s'ouvre seulement connecté à claude.ai sur le bon compte, dans un navigateur.

---

## 6. Maquette vs vrai développement (pour rester honnête)
- **Maquettable maintenant (sans back-end)** : tous les écrans, la logique de barrières/alarmes sur données fictives, la vue analytique, des connecteurs « fictifs ».
- **Vrai développement back-end (par phases, une fois des clients payants)** : les **intégrations réelles** (Paelo, MS4M, paie), la **persistance** des données, le **multi-utilisateur**, le **mode hors-ligne souterrain** (générer/imprimer en surface avant la descente), la **sécurité et la traçabilité CNESST**.

---

## 7. Feuille de route (lean / autofinancé)
1. **Maquette** *(en cours)* → aligner associés + démarcher.
2. **Pilote semi-manuel** (no-code + IA) avec 1-2 clients payants → valider la valeur réelle.
3. **Développement par module**, financé par les clients ; se **greffer** aux outils existants.
4. **Facturation par module** (chaque module = un prix), en add-on de l'abonnement de contenu.

---

## 8. Glossaire
- **FSCT** — Formule de supervision et carte de travail (AMQ).
- **AMQ** — Association minière du Québec.
- **RSSM** — Règlement sur la SST dans les mines.
- **CNESST** — Commission des normes, de l'équité, de la SST.
- **Co-activité / SIMOPS** — travaux simultanés dans un même secteur.
- **Cadenassage (LOTO)** — contrôle des énergies dangereuses avant intervention.
- **Boutefeu** — personne certifiée au chargement d'explosifs / sautage.
- **Muck / soutirage** — extraction du minerai abattu.
- **Développement / avancement** — creusement des galeries.
- **Jumbo / Boltec / scoop / EMU** — foreuse de développement / boulonneuse / chargeuse-navette / unité d'émulsion.

---

## 9. Questions ouvertes / à confirmer
- Nom exact et fournisseur du **système de formation** (« Paelo » ?).
- **Modules prioritaires** pour le premier client pilote.
- **Nom définitif de la firme** (options : Boréa SST · Filon Prévention · Roc Sécurité · Vigie Minière · Aplomb SST).
- **Champs de carte** à ajouter (date/équipe, numéros de lampe/consigne) pour coller à 100 % à la carte papier.
- Prochaine maquette à construire : **vue Analytique** ou **panneau Intégrations**?
