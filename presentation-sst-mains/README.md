# Prévention des blessures aux mains — Dhilmar · Mine Éléonore

Présentation santé-sécurité (français) pour le secteur minier, aux couleurs de Dhilmar
(fond sombre chaud + ambre, titres serif). Sujet : **la prévention des blessures aux mains**.
Statistiques réelles (NSC, OSHA, MSHA/NIOSH, CNESST, IRSST, ASP Mines) et **vidéos
générées avec Higgsfield**.

## Deux formats

| Fichier | Usage |
|--------|-------|
| **`presentation.html`** | Deck principal — **les 4 vidéos Higgsfield jouent dans les diapos**. Ouvrez-le dans un navigateur (Chrome/Edge/Firefox), puis touche **F** pour le plein écran. Navigation : ◀ ▶ / Espace. |
| **`Dhilmar-Prevention-Blessures-Mains.pptx`** | Version PowerPoint éditable / hors-ligne pour la salle de formation. Design vectoriel; les 2 diapos vidéo contiennent un cadre où **insérer le clip** (voir `MEDIA.md`). |

> La présentation compte **14 diapositives** : titre, objectifs, l'importance des mains,
> les chiffres, le portrait minier, la « ligne de tir », les causes, 2 séquences vidéo,
> la hiérarchie des moyens de prévention, les bons réflexes, le choix des gants, la
> conduite en cas de blessure, et l'engagement de clôture.

## Texte de la prestation (guide d'animation)

Pour **livrer** la rencontre : le script complet, diapo par diapo (ce qu'on dit, les
questions à poser au groupe, les messages clés et le minutage — total ≈ 15-20 min).

| Fichier | Usage |
|--------|-------|
| **`Dhilmar-Prestation-Blessures-Mains-Script.docx`** | Guide d'animation Word, imprimable et éditable. |
| **`SCRIPT-PRESTATION.md`** | Même texte en Markdown (lecture rapide / version). |

Source unique : `script-content.js` → `node build-docx.js` régénère le Word et le Markdown.

## Vidéos

4 clips (1080p, 5 s, sans audio — le présentateur commente par-dessus), générés avec
Higgsfield (Seedance 2.0) à partir d'images cinématographiques (GPT-Image). Liens et
correspondance des diapos : **`MEDIA.md`**. Les clips restent dans votre compte
Higgsfield.

Le deck HTML pointe directement vers ces vidéos (elles se chargent depuis votre poste).
Pour le PPTX : téléchargez le MP4 depuis votre bibliothèque Higgsfield, puis
**Insertion ▸ Vidéo ▸ Vidéo sur mon PC** dans le cadre prévu.

## Sources

Toutes les statistiques sont documentées et attribuées dans **`SOURCES-STATISTIQUES.md`**.

## Régénérer le PPTX

```bash
npm install          # pptxgenjs, sharp, react-icons
node build.js        # -> Dhilmar-Prevention-Blessures-Mains.pptx
```

## Contrôle qualité du deck HTML

```bash
node qa-shots.js     # capture les 14 diapos (Chromium) dans ./qa
```

---
*Note : dans l'environnement de génération, l'accès réseau au CDN de Higgsfield et le
convertisseur LibreOffice étaient restreints; le deck HTML a été validé visuellement via
Chromium et le PPTX via la validation OOXML. Les médias se chargent normalement depuis
votre poste.*
