# Feuille de route — Console SST minière

Vision du produit au-delà du prototype actuel. Sert à aligner les associés et à cadrer les phases de développement (lean / autofinancé : back-end par phases, financé par les premiers clients payants).

---

## État actuel (prototype — données fictives)
Écran d'ouverture · Tableau de bord · Planification du quart · Carte de travail (AMQ / FSCT) · Matrice de formation · Référentiel. Flotte et équipage réalistes.

---

## 1. Intégrations visées (connecteurs)
Se **greffer** aux outils déjà en place dans le milieu minier (ne pas les concurrencer de front) :

- **Système de formation des travailleurs** (ex. « Paelo » — *nom/fournisseur à confirmer*) → importer formations et certifications. Alimente automatiquement la **matrice de compétences** et les **barrières d'assignation** (fini la saisie manuelle, données toujours à jour).
- **MS4M** (gestion de mine / production) → **données en temps réel** : mise à jour automatique des quarts et des **rapports de fin de quart**.
- **Paie** → export des **heures et codes d'activité** vers le système de paie.

> Réalité technique : les intégrations sont du **développement back-end réel**, livré par phases une fois des clients payants acquis. Le prototype en montre l'**intention** via des connecteurs maquettés (statut « connecté / synchronisé »).

---

## 2. Analytique visée
- **Performance des travailleurs** : tâches complétées, production, délais.
- **Fiabilité des équipements** : heures d'utilisation, bris, temps d'arrêt (**délais mécaniques**).
- **Arbitrage « travailleur vs machine »** *(idée forte)* : croiser les bris par **(machine × opérateur)**.
  - Une machine brise sous **tous** les opérateurs → problème de **machine** (à réformer / réviser).
  - Une machine brise surtout sous **un** opérateur → **technique / formation** de l'opérateur (est-il « dur » sur l'équipement?).
  - Livrable : matrice bris/opérateur + tendances + coût des arrêts.
- **Rapports de fin de quart** automatisés (à partir des données temps réel).

---

## 3. Carte de travail (FSCT) — alignement complet
Numériser la structure réelle de la carte de travail :
- **Début de quart** : véhicule + état/condition, lieux de travail #T1–#T5 + tâches, permis particuliers (travail à chaud, espace clos, cadenassage, travailleur seul), EPI et outils requis, **attestation « j'ai les compétences et la formation »** (auto-validée par le système), signatures.
- **Fin de quart** : exécution superviseur (travail conforme?), action positive à souligner, matériel requis prochain quart, **carré rouge** (événement/accident/passé-proche, alarme détecteur de gaz, cadenas personnel retiré, développement à déclarer), commentaires SST, signatures.

---

## Principe directeur
Maquette d'abord (aligner associés + démarcher). Back-end par phases, greffé aux outils existants, financé par les premiers clients. Facturation par module.
