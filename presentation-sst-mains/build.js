/*
 * Prévention des blessures aux mains — Dhilmar · Mine Éléonore
 * Deck santé-sécurité (français). Charte Dhilmar : fond sombre chaud + ambre, titres serif.
 * Généré avec pptxgenjs. Icônes rendues via react-icons + sharp.
 */
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const React = require("react");
const RD = require("react-dom/server");
const fa = require("react-icons/fa6");

// ---------- Palette Dhilmar ----------
const BG    = "141210"; // fond charbon chaud, presque noir
const BG2   = "1B1712"; // fond alt
const CARD  = "231E17"; // carte
const CARD2 = "2C261D"; // carte accent
const LINE  = "3C352A"; // filet subtil
const AMBER = "F2A93C"; // ambre principal (logo Dhilmar)
const GOLD  = "F7C775"; // or clair (accent)
const AMBERD= "C9852A"; // ambre foncé
const WHITE = "FFFFFF";
const TXT   = "ECE7DD"; // corps
const MUT   = "B4AD9F"; // atténué
const MUT2  = "857E70"; // légende
const DANGER= "E4572E"; // rouge-orangé (danger)
const OKGRN = "8FB35A"; // vert (bonne pratique)

const SERIF = "Cambria";
const SANS  = "Calibri";
const W = 13.333, H = 7.5;

// ---------- Icônes ----------
const _iconCache = new Map();
async function ic(comp, hex, px = 420) {
  const key = (comp && comp.name ? comp.name : String(comp)) + hex + px;
  if (_iconCache.has(key)) return _iconCache.get(key);
  const svg = RD.renderToStaticMarkup(React.createElement(comp, { color: "#" + hex, size: px }));
  const png = await sharp(Buffer.from(svg)).resize(px, px, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const data = "image/png;base64," + png.toString("base64");
  _iconCache.set(key, data);
  return data;
}

const pres = new pptxgen();
pres.defineLayout({ name: "DH", width: W, height: H });
pres.layout = "DH";
pres.author = "Dhilmar — Santé-Sécurité";
pres.title = "Prévention des blessures aux mains — Mine Éléonore";

function bg(s, color = BG) { s.background = { color }; }

// Logo Dhilmar (pastille ambre + triangle « play » + mot-symbole)
function logo(s, x = 0.6, y = 0.42, scale = 1) {
  const d = 0.34 * scale;
  s.addShape("roundRect", { x, y, w: d, h: d, rectRadius: 0.06 * scale, fill: { color: AMBER }, line: { type: "none" } });
  s.addShape("triangle", { x: x + d * 0.3, y: y + d * 0.26, w: d * 0.44, h: d * 0.48, rotate: 90, fill: { color: BG }, line: { type: "none" } });
  s.addText("Dhilmar", { x: x + d + 0.12, y: y - 0.05 * scale, w: 2.4 * scale, h: (d + 0.1), fontFace: SERIF, fontSize: 17 * scale, bold: true, color: WHITE, align: "left", valign: "middle", margin: 0 });
}

function siteTag(s) {
  s.addText([
    { text: "MINE ", options: { color: MUT2 } },
    { text: "ÉLÉONORE", options: { color: AMBER } },
  ], { x: W - 3.2, y: 0.46, w: 2.6, h: 0.3, align: "right", fontFace: SANS, fontSize: 10.5, bold: true, charSpacing: 2, margin: 0 });
}

function footer(s, n) {
  s.addText("Santé-Sécurité · Prévention des blessures aux mains", { x: 0.6, y: H - 0.44, w: 8, h: 0.3, fontFace: SANS, fontSize: 8.5, color: MUT2, align: "left", margin: 0 });
  s.addText(String(n).padStart(2, "0"), { x: W - 1.1, y: H - 0.46, w: 0.5, h: 0.3, fontFace: SERIF, fontSize: 11, color: AMBER, align: "right", margin: 0 });
}

// Bandeau de titre standard (eyebrow + titre)
function head(s, eyebrow, title, opt = {}) {
  const y = opt.y != null ? opt.y : 0.5;
  logo(s);
  siteTag(s);
  s.addText(eyebrow.toUpperCase(), { x: 0.62, y: y + 0.02, w: 10, h: 0.3, fontFace: SANS, fontSize: 12, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
  s.addText(title, { x: 0.6, y: y + 0.34, w: opt.tw || 12.1, h: opt.th || 0.9, fontFace: SERIF, fontSize: opt.fs || 33, bold: true, color: WHITE, margin: 0, lineSpacing: (opt.fs || 33) * 1.05 });
}

async function iconChip(s, x, y, d, comp, ring = AMBER, glyph = AMBER, fillc = null, gscale = 0.52) {
  s.addShape("oval", { x, y, w: d, h: d, fill: fillc ? { color: fillc } : { color: BG2 }, line: { color: ring, width: 1.5 } });
  const gd = d * gscale;
  s.addImage({ data: await ic(comp, glyph), x: x + (d - gd) / 2, y: y + (d - gd) / 2, w: gd, h: gd });
}

// =====================================================================
// SLIDE 1 — Titre
// =====================================================================
async function s1() {
  const s = pres.addSlide(); bg(s);
  // panneau visuel à droite
  s.addShape("rect", { x: 8.7, y: 0, w: W - 8.7, h: H, fill: { color: BG2 }, line: { type: "none" } });
  s.addShape("oval", { x: 9.15, y: 1.6, w: 4.3, h: 4.3, fill: { type: "none" }, line: { color: LINE, width: 1 } });
  s.addShape("oval", { x: 9.75, y: 2.2, w: 3.1, h: 3.1, fill: { color: CARD }, line: { color: AMBERD, width: 1.25 } });
  s.addImage({ data: await ic(fa.FaRegHand, AMBER, 640), x: 10.4, y: 2.75, w: 1.8, h: 1.8 });
  s.addShape("roundRect", { x: 9.55, y: 5.55, w: 3.5, h: 0.5, rectRadius: 0.08, fill: { color: CARD2 }, line: { color: AMBERD, width: 0.75 } });
  s.addText([{ text: "▶  ", options: { color: AMBER } }, { text: "Vidéo d'ouverture Higgsfield", options: { color: TXT } }], { x: 9.55, y: 5.55, w: 3.5, h: 0.5, align: "center", valign: "middle", fontFace: SANS, fontSize: 11, margin: 0 });

  logo(s, 0.6, 0.5, 1.15);
  s.addText([{ text: "MINE ", options: { color: MUT2 } }, { text: "ÉLÉONORE", options: { color: AMBER } }], { x: 0.6, y: 1.05, w: 5, h: 0.3, fontFace: SANS, fontSize: 11, bold: true, charSpacing: 3, margin: 0 });

  s.addText("SANTÉ · SÉCURITÉ AU TRAVAIL", { x: 0.62, y: 2.55, w: 7.8, h: 0.35, fontFace: SANS, fontSize: 13, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
  s.addText("La sécurité\nentre vos mains", { x: 0.55, y: 2.95, w: 8.1, h: 2.0, fontFace: SERIF, fontSize: 52, bold: true, color: WHITE, margin: 0, lineSpacing: 50 });
  s.addText("Prévention des blessures aux mains", { x: 0.6, y: 4.95, w: 7.8, h: 0.5, fontFace: SANS, fontSize: 20, italic: true, color: GOLD, margin: 0 });

  s.addShape("line", { x: 0.62, y: 5.75, w: 3.0, h: 0, line: { color: LINE, width: 1 } });
  s.addText([
    { text: "Rencontre santé-sécurité", options: { color: MUT, breakLine: true, fontSize: 12 } },
    { text: "Dhilmar — Mine Éléonore", options: { color: TXT, bold: true, fontSize: 14 } },
  ], { x: 0.62, y: 5.9, w: 7.5, h: 0.9, fontFace: SANS, margin: 0, lineSpacingMultiple: 1.2 });

  s.addNotes("Ouverture. Ton : sérieux mais bienveillant. Objectif : nos mains sont notre outil no 1 et elles sont exposées chaque jour. Vidéo d'ouverture Higgsfield (tunnel) — voir MEDIA.md pour le lien. Insérer le clip sur cette diapo (glisser-déposer le MP4).");
}

// =====================================================================
// SLIDE 2 — Objectifs (grille 2x2)
// =====================================================================
async function s2() {
  const s = pres.addSlide(); bg(s);
  head(s, "Pourquoi cette rencontre", "Objectifs de la rencontre");
  const items = [
    [fa.FaEye, "Comprendre", "Pourquoi nos mains sont autant exposées dans nos opérations."],
    [fa.FaCrosshairs, "Reconnaître", "Repérer la « ligne de tir » et les points de pincement."],
    [fa.FaMitten, "Choisir", "Sélectionner et porter le bon gant pour chaque tâche."],
    [fa.FaKitMedical, "Réagir", "Réagir vite et déclarer — même une simple égratignure."],
  ];
  const gx = 0.6, gy = 1.95, cw = 6.0, ch = 2.25, gapx = 0.13, gapy = 0.18;
  for (let i = 0; i < 4; i++) {
    const x = gx + (i % 2) * (cw + gapx);
    const y = gy + Math.floor(i / 2) * (ch + gapy);
    s.addShape("roundRect", { x, y, w: cw, h: ch, rectRadius: 0.09, fill: { color: CARD }, line: { color: LINE, width: 1 } });
    await iconChip(s, x + 0.4, y + 0.42, 1.0, items[i][0], AMBER, AMBER, BG2, 0.5);
    s.addText(String(i + 1).padStart(2, "0"), { x: x + cw - 1.2, y: y + 0.28, w: 0.9, h: 0.7, fontFace: SERIF, fontSize: 30, bold: true, color: LINE, align: "right", margin: 0 });
    s.addText(items[i][1], { x: x + 1.6, y: y + 0.44, w: cw - 2.6, h: 0.5, fontFace: SERIF, fontSize: 21, bold: true, color: WHITE, margin: 0 });
    s.addText(items[i][2], { x: x + 1.6, y: y + 1.02, w: cw - 1.9, h: 1.0, fontFace: SANS, fontSize: 14, color: MUT, margin: 0, lineSpacingMultiple: 1.05 });
  }
  footer(s, 2);
  s.addNotes("Cadrer la rencontre. 4 objectifs. Insister : la sécurité des mains n'est pas une contrainte, c'est un réflexe qui protège toute une carrière.");
}

// =====================================================================
// SLIDE 3 — Vos mains, irremplaçables (accroche)
// =====================================================================
async function s3() {
  const s = pres.addSlide(); bg(s);
  head(s, "Ce que nous protégeons", "Vos mains, votre outil le plus précieux");
  // colonne gauche : texte
  s.addText("Irremplaçables.", { x: 0.6, y: 2.15, w: 7.3, h: 0.8, fontFace: SERIF, fontSize: 34, bold: true, color: AMBER, margin: 0 });
  s.addText([
    { text: "27 os, des dizaines de muscles, de tendons, de vaisseaux et de nerfs ", options: { color: TXT } },
    { text: "dans un espace minuscule.", options: { color: TXT, bold: true } },
  ], { x: 0.6, y: 3.0, w: 7.2, h: 1.0, fontFace: SANS, fontSize: 17, margin: 0, lineSpacingMultiple: 1.15 });
  s.addText([
    { text: "Une seule seconde d'inattention peut coûter ", options: { color: TXT } },
    { text: "une mobilité — à vie.", options: { color: GOLD, bold: true, italic: true } },
  ], { x: 0.6, y: 4.0, w: 7.2, h: 0.9, fontFace: SANS, fontSize: 17, margin: 0, lineSpacingMultiple: 1.15 });
  s.addShape("roundRect", { x: 0.6, y: 5.15, w: 7.2, h: 0.95, rectRadius: 0.09, fill: { color: CARD2 }, line: { color: AMBERD, width: 0.75 } });
  await iconChip(s, 0.85, 5.37, 0.52, fa.FaTriangleExclamation, AMBER, AMBER, BG, 0.55);
  s.addText([
    { text: "Contrairement à un outil, ", options: { color: MUT } },
    { text: "vos mains n'ont aucune pièce de rechange.", options: { color: WHITE, bold: true } },
  ], { x: 1.55, y: 5.15, w: 6.1, h: 0.95, valign: "middle", fontFace: SANS, fontSize: 14.5, margin: 0 });

  // colonne droite : deux cartes stat
  const cx = 8.35, cw = 4.35;
  s.addShape("roundRect", { x: cx, y: 1.95, w: cw, h: 2.05, rectRadius: 0.1, fill: { color: CARD }, line: { color: LINE, width: 1 } });
  await iconChip(s, cx + 0.35, 2.25, 0.85, fa.FaBone, AMBER, AMBER, BG2, 0.5);
  s.addText("27", { x: cx + 1.35, y: 2.1, w: 2.8, h: 1.0, fontFace: SERIF, fontSize: 58, bold: true, color: WHITE, align: "left", margin: 0 });
  s.addText("os par main", { x: cx + 1.4, y: 3.05, w: 2.8, h: 0.4, fontFace: SANS, fontSize: 14, color: AMBER, bold: true, margin: 0 });
  s.addText("soit plus du quart des os de tout le corps humain.", { x: cx + 0.35, y: 3.45, w: cw - 0.7, h: 0.5, fontFace: SANS, fontSize: 12.5, color: MUT, margin: 0 });

  s.addShape("roundRect", { x: cx, y: 4.15, w: cw, h: 1.95, rectRadius: 0.1, fill: { color: CARD }, line: { color: LINE, width: 1 } });
  await iconChip(s, cx + 0.35, 4.45, 0.85, fa.FaHeartPulse, DANGER, DANGER, BG2, 0.5);
  s.addText("1 M+", { x: cx + 1.35, y: 4.35, w: 2.9, h: 0.9, fontFace: SERIF, fontSize: 46, bold: true, color: WHITE, align: "left", margin: 0 });
  s.addText("travailleurs traités à l'urgence chaque année pour une blessure à la main (É.-U.).", { x: cx + 0.35, y: 5.2, w: cw - 0.7, h: 0.8, fontFace: SANS, fontSize: 12.5, color: MUT, margin: 0, lineSpacingMultiple: 1.05 });

  footer(s, 3);
  s.addText("Source : OSHA / BLS.", { x: 8.35, y: H - 0.44, w: 4.3, h: 0.3, fontFace: SANS, fontSize: 8.5, italic: true, color: MUT2, align: "right", margin: 0 });
  s.addNotes("Accroche émotionnelle. Faire lever la main : « qui utilise ses mains toute la journée ? ». 27 os par main. Aucune pièce de rechange. Source : anatomie humaine; OSHA/BLS pour le 1 M+.");
}

// =====================================================================
// SLIDE 4 — Les chiffres (4 stats)
// =====================================================================
async function s4() {
  const s = pres.addSlide(); bg(s);
  head(s, "La réalité en chiffres", "Les chiffres qui parlent");
  const stats = [
    ["70 %", "des blessures aux mains surviennent sans aucun gant porté.", "National Safety Council", fa.FaMitten],
    ["71 %", "des blessures aux mains sont évitables avec le bon ÉPI.", "OSHA", fa.FaShieldHalved],
    ["15 %", "des lésions indemnisées au Québec touchent poignets, mains et doigts.", "CNESST", fa.FaHand],
    ["60 %+", "des blessures avec jours perdus : fractures ou amputations.", "NIOSH Mining", fa.FaBone],
  ];
  const gx = 0.6, gy = 1.95, cw = 6.0, ch = 2.2, gapx = 0.13, gapy = 0.18;
  for (let i = 0; i < 4; i++) {
    const x = gx + (i % 2) * (cw + gapx);
    const y = gy + Math.floor(i / 2) * (ch + gapy);
    s.addShape("roundRect", { x, y, w: cw, h: ch, rectRadius: 0.09, fill: { color: CARD }, line: { color: LINE, width: 1 } });
    await iconChip(s, x + cw - 1.15, y + 0.32, 0.8, stats[i][3], AMBERD, AMBER, BG2, 0.5);
    s.addText(stats[i][0], { x: x + 0.36, y: y + 0.24, w: 3.6, h: 1.1, fontFace: SERIF, fontSize: 52, bold: true, color: AMBER, margin: 0 });
    s.addText(stats[i][1], { x: x + 0.4, y: y + 1.32, w: cw - 0.8, h: 0.7, fontFace: SANS, fontSize: 14.5, color: TXT, margin: 0, lineSpacingMultiple: 1.05 });
    s.addText(stats[i][2], { x: x + 0.4, y: y + ch - 0.42, w: cw - 0.8, h: 0.3, fontFace: SANS, fontSize: 10, italic: true, color: MUT2, margin: 0 });
  }
  footer(s, 4);
  s.addNotes("Marteler les chiffres. Le 70 % (aucun gant) et le 71 % (évitable) sont le cœur du message : la très grande majorité de ces blessures sont évitables. Sources indiquées sur chaque carte : NSC, OSHA, CNESST, NIOSH.");
}

// =====================================================================
// SLIDE 5 — Dans nos mines (graphique + cartes)
// =====================================================================
async function s5() {
  const s = pres.addSlide(); bg(s);
  head(s, "Le portrait du secteur minier", "Dans nos mines, la réalité");
  // graphique à barres (types de blessures)
  s.addText("Types de blessures aux mains et doigts (mines)", { x: 0.6, y: 1.95, w: 6.6, h: 0.35, fontFace: SANS, fontSize: 13, bold: true, color: MUT, margin: 0 });
  const chartData = [{ name: "Part", labels: ["Lacérations", "Fractures", "Autres"], values: [53, 26, 21] }];
  s.addChart(pres.ChartType.bar, chartData, {
    x: 0.5, y: 2.35, w: 6.8, h: 3.9, barDir: "bar",
    chartColors: [AMBER], showValue: true, dataLabelColor: BG, dataLabelFontFace: SANS, dataLabelFontSize: 13, dataLabelFontBold: true, dataLabelPosition: "inEnd", dataLabelFormatCode: '0"%"',
    catAxisLabelColor: TXT, catAxisLabelFontFace: SANS, catAxisLabelFontSize: 13, catAxisLineShow: false,
    valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
    valAxisMaxVal: 60, valAxisMinVal: 0, barGapWidthPct: 55, showLegend: false, showTitle: false,
  });
  s.addText("Source : MSHA / NIOSH Mining.", { x: 0.6, y: 6.25, w: 6.6, h: 0.3, fontFace: SANS, fontSize: 9, italic: true, color: MUT2, margin: 0 });

  // cartes à droite
  const cx = 7.7, cw = 5.05;
  s.addShape("roundRect", { x: cx, y: 1.95, w: cw, h: 1.95, rectRadius: 0.1, fill: { color: CARD2 }, line: { color: AMBERD, width: 1 } });
  s.addText([{ text: "13 700 – 16 200 $", options: { color: AMBER, bold: true, fontSize: 30, fontFace: SERIF, breakLine: true } }, { text: "Coût direct médian d'une blessure à la main avec perte de temps.", options: { color: TXT, fontSize: 13, fontFace: SANS } }], { x: cx + 0.35, y: 2.2, w: cw - 0.7, h: 1.5, margin: 0, lineSpacingMultiple: 1.1, valign: "top" });

  s.addShape("roundRect", { x: cx, y: 4.05, w: cw, h: 2.2, rectRadius: 0.1, fill: { color: CARD }, line: { color: LINE, width: 1 } });
  await iconChip(s, cx + 0.35, 4.35, 0.72, fa.FaWaveSquare, AMBER, AMBER, BG2, 0.5);
  s.addText("Vibrations main-bras", { x: cx + 1.2, y: 4.42, w: cw - 1.5, h: 0.45, fontFace: SERIF, fontSize: 18, bold: true, color: WHITE, margin: 0 });
  s.addText([
    { text: "63 % ", options: { color: AMBER, bold: true } },
    { text: "d'engourdissements et ", options: { color: TXT } },
    { text: "34,4 % ", options: { color: AMBER, bold: true } },
    { text: "de douleurs articulaires chez les travailleurs affectés (doigts blancs).", options: { color: TXT } },
  ], { x: cx + 0.35, y: 5.05, w: cw - 0.7, h: 1.05, fontFace: SANS, fontSize: 13.5, margin: 0, lineSpacingMultiple: 1.1 });
  s.addText("Source : IRSST.", { x: cx, y: H - 0.44, w: cw, h: 0.3, fontFace: SANS, fontSize: 8.5, italic: true, color: MUT2, align: "right", margin: 0 });
  footer(s, 5);
  s.addNotes("Les lacérations (53 %) et fractures (26 %) dominent. Le coût médian (13 700–16 200 $) parle aux gestionnaires ET rappelle l'impact humain. Vibrations : enjeu réel avec la foreuse et les outils — gants anti-vibration + rotation des tâches. Sources : MSHA/NIOSH, IRSST.");
}

// =====================================================================
// SLIDE 6 — La ligne de tir (concept + cible)
// =====================================================================
async function s6() {
  const s = pres.addSlide(); bg(s);
  head(s, "Le concept clé", "La « ligne de tir »");
  s.addText([
    { text: "Toute zone où votre main peut être ", options: { color: TXT } },
    { text: "happée, écrasée, coupée ou pincée", options: { color: AMBER, bold: true } },
    { text: " par une énergie — mécanique, hydraulique, électrique ou gravitaire.", options: { color: TXT } },
  ], { x: 0.6, y: 2.1, w: 6.6, h: 1.4, fontFace: SANS, fontSize: 18, margin: 0, lineSpacingMultiple: 1.2 });
  s.addText("Avant chaque geste, posez-vous la question :", { x: 0.6, y: 3.6, w: 6.6, h: 0.4, fontFace: SANS, fontSize: 13, color: MUT, margin: 0 });
  s.addShape("roundRect", { x: 0.6, y: 4.05, w: 6.6, h: 1.05, rectRadius: 0.1, fill: { color: CARD2 }, line: { color: AMBER, width: 1 } });
  s.addText("« Si cette pièce bouge, où va ma main ? »", { x: 0.75, y: 4.05, w: 6.3, h: 1.05, valign: "middle", fontFace: SERIF, fontSize: 21, bold: true, italic: true, color: GOLD, margin: 0 });
  const risks = ["Points de pincement", "Pièces en rotation", "Charges suspendues", "Énergie emmagasinée"];
  for (let i = 0; i < risks.length; i++) {
    const y = 5.45 + Math.floor(i / 2) * 0.5;
    const x = 0.6 + (i % 2) * 3.35;
    s.addText([{ text: "▪  ", options: { color: AMBER } }, { text: risks[i], options: { color: MUT } }], { x, y, w: 3.3, h: 0.4, fontFace: SANS, fontSize: 12.5, margin: 0 });
  }

  // cible concentrique à droite
  const cxC = 10.35, cyC = 4.0; // centre
  const rings = [3.7, 2.85, 2.0, 1.15];
  const ringColors = [LINE, AMBERD, AMBER, DANGER];
  for (let i = 0; i < rings.length; i++) {
    const d = rings[i];
    s.addShape("oval", { x: cxC - d / 2, y: cyC - d / 2, w: d, h: d, fill: i === rings.length - 1 ? { color: CARD2 } : { type: "none" }, line: { color: ringColors[i], width: i === 2 || i === 3 ? 2 : 1.25 } });
  }
  s.addImage({ data: await ic(fa.FaHand, AMBER, 320), x: cxC - 0.42, y: cyC - 0.5, w: 0.84, h: 0.84 });
  s.addText("VOTRE MAIN", { x: cxC - 1.0, y: cyC + 0.42, w: 2.0, h: 0.3, align: "center", fontFace: SANS, fontSize: 9.5, bold: true, color: TXT, charSpacing: 1, margin: 0 });
  const labels = [["ÉCRASEMENT", cxC, cyC - 2.15], ["COUPURE", cxC + 2.55, cyC], ["HAPPEMENT", cxC, cyC + 2.15], ["PINCEMENT", cxC - 2.55, cyC]];
  for (const [t, lx, ly] of labels) {
    s.addText(t, { x: lx - 1.1, y: ly - 0.15, w: 2.2, h: 0.3, align: "center", fontFace: SANS, fontSize: 10, bold: true, color: GOLD, charSpacing: 1, margin: 0 });
  }
  footer(s, 6);
  s.addNotes("Concept central de la présentation. La « ligne de tir » (line of fire) = trajectoire d'une énergie qui peut atteindre la main. Faire nommer aux participants des exemples concrets à Éléonore. Réflexe : « si ça bouge, où va ma main ? »");
}

// =====================================================================
// SLIDE 7 — Causes principales (grille 2x3)
// =====================================================================
async function s7() {
  const s = pres.addSlide(); bg(s);
  head(s, "D'où viennent les blessures", "Les causes principales");
  const items = [
    [fa.FaGears, "Pincement & happement", "Pièces mobiles, engrenages, convoyeurs, points rentrants."],
    [fa.FaScissors, "Outils & lames", "Couteaux, meuleuses, outils à main mal utilisés."],
    [fa.FaWeightHanging, "Manutention & arêtes", "Écrasement, tôle, arêtes vives, charges lourdes."],
    [fa.FaBolt, "Énergie non maîtrisée", "Absence de cadenassage; énergie résiduelle."],
    [fa.FaWaveSquare, "Vibrations", "Outils vibrants : foreuse, marteau, meuleuse."],
    [fa.FaMitten, "Gant absent / inadéquat", "Aucun gant, ou gant non adapté à la tâche."],
  ];
  const gx = 0.6, gy = 1.95, cw = 3.98, ch = 2.28, gapx = 0.12, gapy = 0.16;
  for (let i = 0; i < 6; i++) {
    const x = gx + (i % 3) * (cw + gapx);
    const y = gy + Math.floor(i / 3) * (ch + gapy);
    s.addShape("roundRect", { x, y, w: cw, h: ch, rectRadius: 0.09, fill: { color: CARD }, line: { color: LINE, width: 1 } });
    await iconChip(s, x + 0.35, y + 0.35, 0.85, items[i][0], AMBER, AMBER, BG2, 0.5);
    s.addText(items[i][1], { x: x + 0.35, y: y + 1.28, w: cw - 0.6, h: 0.5, fontFace: SERIF, fontSize: 16, bold: true, color: WHITE, margin: 0 });
    s.addText(items[i][2], { x: x + 0.35, y: y + 1.72, w: cw - 0.55, h: 0.5, fontFace: SANS, fontSize: 11.5, color: MUT, margin: 0, lineSpacingMultiple: 1.02 });
  }
  footer(s, 7);
  s.addNotes("Six familles de causes. La plupart se recoupent avec la ligne de tir. Souligner cadenassage (énergie) et le choix du gant, qui reviennent plus loin.");
}

// =====================================================================
// SLIDE 8 — VIDÉO : le danger en un instant
// =====================================================================
async function videoSlide(n, eyebrow, title, caption, points, note, clip) {
  const s = pres.addSlide(); bg(s);
  head(s, eyebrow, title);
  // cadre vidéo
  const fx = 0.6, fy = 2.0, fw = 8.0, fh = 4.5;
  s.addShape("roundRect", { x: fx, y: fy, w: fw, h: fh, rectRadius: 0.12, fill: { color: "0C0A08" }, line: { color: AMBERD, width: 1.25 } });
  // bouton play
  s.addShape("oval", { x: fx + fw / 2 - 0.75, y: fy + fh / 2 - 0.75, w: 1.5, h: 1.5, fill: { type: "none" }, line: { color: AMBER, width: 2.5 } });
  s.addShape("triangle", { x: fx + fw / 2 - 0.2, y: fy + fh / 2 - 0.34, w: 0.6, h: 0.68, rotate: 90, fill: { color: AMBER }, line: { type: "none" } });
  // pastille VIDÉO
  s.addShape("roundRect", { x: fx + 0.3, y: fy + 0.3, w: 1.5, h: 0.44, rectRadius: 0.08, fill: { color: AMBER }, line: { type: "none" } });
  s.addText("● VIDÉO", { x: fx + 0.3, y: fy + 0.3, w: 1.5, h: 0.44, align: "center", valign: "middle", fontFace: SANS, fontSize: 11, bold: true, color: BG, margin: 0 });
  s.addText("Clip Higgsfield · 5 s", { x: fx + fw - 2.5, y: fy + 0.32, w: 2.2, h: 0.4, align: "right", fontFace: SANS, fontSize: 10.5, color: MUT, margin: 0 });
  s.addText(caption, { x: fx + 0.5, y: fy + fh - 1.0, w: fw - 1.0, h: 0.7, align: "center", fontFace: SERIF, fontSize: 18, italic: true, bold: true, color: GOLD, margin: 0 });

  // panneau droite
  const cx = 8.85, cw = 3.9;
  s.addText("À OBSERVER", { x: cx, y: 2.05, w: cw, h: 0.3, fontFace: SANS, fontSize: 11, bold: true, color: AMBER, charSpacing: 2, margin: 0 });
  for (let i = 0; i < points.length; i++) {
    const y = 2.55 + i * 0.92;
    await iconChip(s, cx, y, 0.5, fa.FaCheck, AMBER, AMBER, BG2, 0.5);
    s.addText(points[i], { x: cx + 0.66, y: y - 0.06, w: cw - 0.66, h: 0.85, valign: "middle", fontFace: SANS, fontSize: 13.5, color: TXT, margin: 0, lineSpacingMultiple: 1.03 });
  }
  s.addShape("roundRect", { x: cx, y: 5.6, w: cw, h: 0.85, rectRadius: 0.08, fill: { color: CARD }, line: { color: LINE, width: 0.75 } });
  s.addText([{ text: "▶  ", options: { color: AMBER } }, { text: note, options: { color: MUT } }], { x: cx + 0.15, y: 5.6, w: cw - 0.3, h: 0.85, valign: "middle", fontFace: SANS, fontSize: 10.5, margin: 0, lineSpacingMultiple: 1.0 });
  footer(s, n);
  s.addNotes("Diapo vidéo. " + caption + " Insérer le clip Higgsfield (" + clip + ") dans le cadre : Insertion > Vidéo > à partir d'un fichier, puis ajuster au cadre. Lien direct du MP4 dans MEDIA.md.");
  return s;
}

// =====================================================================
// SLIDE 9 — Hiérarchie des moyens de prévention (entonnoir)
// =====================================================================
async function s9() {
  const s = pres.addSlide(); bg(s);
  head(s, "L'ordre des priorités", "La hiérarchie des moyens de prévention");
  const levels = [
    ["Élimination", "Retirer complètement le danger.", 8.2],
    ["Substitution", "Remplacer ou réduire l'énergie en jeu.", 7.3],
    ["Ingénierie", "Protecteurs, gardes, outils à distance.", 6.4],
    ["Administratif", "Procédures, cadenassage, formation.", 5.5],
    ["ÉPI — les gants", "La dernière barrière, jamais la première.", 4.6],
  ];
  let y = 1.95;
  for (let i = 0; i < levels.length; i++) {
    const [name, desc, w] = levels[i];
    const x = 0.6;
    const isLast = i === levels.length - 1;
    const frac = i / (levels.length - 1);
    // interpolation couleur sombre -> ambre
    s.addShape("roundRect", { x, y, w, h: 0.86, rectRadius: 0.06, fill: { color: isLast ? AMBER : CARD }, line: { color: isLast ? AMBER : LINE, width: 1 } });
    s.addText(String(i + 1), { x: x + 0.22, y, w: 0.6, h: 0.86, valign: "middle", align: "center", fontFace: SERIF, fontSize: 24, bold: true, color: isLast ? BG : AMBER, margin: 0 });
    s.addText([
      { text: name, options: { color: isLast ? BG : WHITE, bold: true, fontSize: 16, fontFace: SERIF, breakLine: true } },
      { text: desc, options: { color: isLast ? "3A2A10" : MUT, fontSize: 11.5, fontFace: SANS } },
    ], { x: x + 0.95, y, w: w - 1.1, h: 0.86, valign: "middle", margin: 0, lineSpacingMultiple: 1.0 });
    y += 0.86 + 0.12;
  }
  // flèche efficacité décroissante
  s.addShape("line", { x: 9.15, y: 2.15, w: 0, h: 4.6, line: { color: AMBERD, width: 1.5, endArrowType: "triangle" } });
  s.addText("Efficacité\ndécroissante", { x: 9.3, y: 2.05, w: 1.6, h: 0.8, fontFace: SANS, fontSize: 11, bold: true, color: AMBER, margin: 0, lineSpacingMultiple: 0.95 });
  s.addShape("roundRect", { x: 9.35, y: 4.65, w: 3.4, h: 2.1, rectRadius: 0.1, fill: { color: CARD2 }, line: { color: AMBER, width: 1 } });
  await iconChip(s, 9.6, 4.9, 0.6, fa.FaMitten, AMBER, AMBER, BG, 0.55);
  s.addText("Le gant protège —", { x: 9.6, y: 5.6, w: 2.9, h: 0.4, fontFace: SERIF, fontSize: 16, bold: true, color: WHITE, margin: 0 });
  s.addText([{ text: "il ne remplace jamais ", options: { color: MUT } }, { text: "un protecteur ou un cadenassage.", options: { color: GOLD, bold: true } }], { x: 9.6, y: 5.98, w: 2.95, h: 0.7, fontFace: SANS, fontSize: 12, margin: 0, lineSpacingMultiple: 1.05 });
  footer(s, 9);
  s.addNotes("Message clé de culture SST : le gant est en BAS de la hiérarchie. On élimine et on protège la source AVANT de compter sur l'ÉPI. Le gant reste essentiel comme dernière barrière.");
}

// =====================================================================
// SLIDE 10 — Les bons réflexes (checklist + règle d'or)
// =====================================================================
async function s10() {
  const s = pres.addSlide(); bg(s);
  head(s, "Au quotidien", "Les bons réflexes");
  const checks = [
    "Gardez vos mains hors de la ligne de tir.",
    "Cadenassez et déchargez l'énergie avant d'intervenir.",
    "Utilisez poussoirs, crochets et outils — jamais les doigts.",
    "Inspectez vos gants; remplacez-les dès qu'ils sont usés.",
    "Ne retirez jamais un gant près d'une pièce en rotation.",
    "Signalez et neutralisez les points de pincement.",
  ];
  const cx = 0.6, cw = 7.6;
  for (let i = 0; i < checks.length; i++) {
    const y = 2.0 + i * 0.75;
    await iconChip(s, cx, y, 0.52, fa.FaCircleCheck, OKGRN, OKGRN, BG2, 0.62);
    s.addText(checks[i], { x: cx + 0.72, y: y - 0.05, w: cw - 0.72, h: 0.62, valign: "middle", fontFace: SANS, fontSize: 15, color: TXT, margin: 0, lineSpacingMultiple: 1.0 });
  }
  // règle d'or
  const rx = 8.55, rw = 4.2;
  s.addShape("roundRect", { x: rx, y: 2.0, w: rw, h: 4.4, rectRadius: 0.12, fill: { color: CARD2 }, line: { color: AMBER, width: 1.25 } });
  await iconChip(s, rx + rw / 2 - 0.45, 2.35, 0.9, fa.FaTriangleExclamation, AMBER, AMBER, BG, 0.55);
  s.addText("RÈGLE D'OR", { x: rx, y: 3.4, w: rw, h: 0.35, align: "center", fontFace: SANS, fontSize: 12, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
  s.addText("Si vous ne voyez pas vos mains en sécurité,", { x: rx + 0.35, y: 3.85, w: rw - 0.7, h: 1.0, align: "center", fontFace: SERIF, fontSize: 19, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.05 });
  s.addText("ARRÊTEZ.", { x: rx + 0.35, y: 4.95, w: rw - 0.7, h: 0.7, align: "center", fontFace: SERIF, fontSize: 34, bold: true, color: AMBER, margin: 0 });
  s.addText("Aucune tâche n'est urgente au point de risquer une main.", { x: rx + 0.4, y: 5.75, w: rw - 0.8, h: 0.55, align: "center", fontFace: SANS, fontSize: 11.5, italic: true, color: MUT, margin: 0, lineSpacingMultiple: 1.05 });
  footer(s, 10);
  s.addNotes("Checklist des réflexes. Insister sur le cadenassage et le fait de ne jamais retirer un gant près d'une rotation (risque d'entraînement). La règle d'or : le droit et le devoir d'arrêter le travail.");
}

// =====================================================================
// SLIDE 11 — Choisir le bon gant (tableau)
// =====================================================================
async function s11() {
  const s = pres.addSlide(); bg(s);
  head(s, "Le bon outil pour la main", "Choisir le bon gant");
  const th = (t) => ({ text: t, options: { fill: { color: AMBER }, color: BG, bold: true, fontFace: SANS, fontSize: 13, align: "left", valign: "middle" } });
  const rows = [[th("Tâche / risque"), th("Type de gant recommandé"), th("Norme")]];
  const data = [
    ["Manutention, arêtes vives, tôle", "Anti-coupure (HPPE / para-aramide) enduit", "EN 388 (C–F) / ANSI A4–A6"],
    ["Travaux lourds, abrasion", "Cuir / gant renforcé", "EN 388 (abrasion)"],
    ["Huiles, hydrocarbures, produits chimiques", "Nitrile / néoprène étanche", "EN 374"],
    ["Outils vibrants (foreuse, marteau)", "Anti-vibration", "EN ISO 10819"],
    ["Froid, travail extérieur hivernal", "Isolé / doublé", "EN 511"],
    ["Travaux électriques", "Isolant diélectrique", "EN 60903 / ASTM D120"],
  ];
  data.forEach((r, idx) => {
    const rc = idx % 2 === 0 ? CARD : BG2;
    rows.push(r.map((c, ci) => ({ text: c, options: { fill: { color: rc }, color: ci === 2 ? AMBER : TXT, bold: ci !== 0 ? false : false, fontFace: SANS, fontSize: 12.5, align: "left", valign: "middle" } })));
  });
  s.addTable(rows, { x: 0.6, y: 2.0, w: 9.2, colW: [3.3, 3.85, 2.05], rowH: 0.62, border: { type: "solid", color: LINE, pt: 1 }, valign: "middle", margin: [3, 6, 3, 6] });

  // note latérale
  const nx = 10.05, nw = 2.7;
  s.addShape("roundRect", { x: nx, y: 2.0, w: nw, h: 4.35, rectRadius: 0.12, fill: { color: CARD2 }, line: { color: AMBERD, width: 1 } });
  await iconChip(s, nx + nw / 2 - 0.42, 2.35, 0.84, fa.FaMitten, AMBER, AMBER, BG, 0.55);
  s.addText("Le bon gant", { x: nx + 0.2, y: 3.35, w: nw - 0.4, h: 0.4, align: "center", fontFace: SERIF, fontSize: 17, bold: true, color: WHITE, margin: 0 });
  s.addText("= celui qui correspond au RISQUE et à la TÂCHE.", { x: nx + 0.25, y: 3.8, w: nw - 0.5, h: 0.9, align: "center", fontFace: SANS, fontSize: 13, color: GOLD, margin: 0, lineSpacingMultiple: 1.1 });
  s.addText("Un gant usé, troué ou mal ajusté ne protège plus. Inspectez-le avant chaque quart.", { x: nx + 0.25, y: 4.75, w: nw - 0.5, h: 1.4, align: "center", fontFace: SANS, fontSize: 11.5, italic: true, color: MUT, margin: 0, lineSpacingMultiple: 1.1 });
  s.addText("Source : ASP Mines — aide à la sélection des gants.", { x: 0.6, y: H - 0.44, w: 9, h: 0.3, fontFace: SANS, fontSize: 8.5, italic: true, color: MUT2, margin: 0 });
  footer(s, 11);
  s.addNotes("Tableau de sélection. Rappeler qu'un gant anti-coupure NE protège PAS contre les pièces en rotation (risque d'entraînement). Adapter le gant à la tâche. Source : ASP Mines, normes EN 388 / EN 374 / EN ISO 10819 / EN 511.");
}

// =====================================================================
// SLIDE 13 — En cas de blessure (étapes)
// =====================================================================
async function s13() {
  const s = pres.addSlide(); bg(s);
  head(s, "Si un incident survient", "En cas de blessure");
  const steps = [
    [fa.FaHand, "Arrêter & sécuriser", "Stopper la tâche, neutraliser l'énergie, protéger la zone."],
    [fa.FaKitMedical, "Premiers soins", "Secouriste ou infirmerie sans délai."],
    [fa.FaTowerBroadcast, "Signaler", "Aviser le superviseur immédiatement."],
    [fa.FaClipboardCheck, "Déclarer", "Consigner l'événement — même une égratignure."],
  ];
  const gx = 0.6, gw = 2.98, gap = 0.14, gy = 2.1, gh = 2.7;
  for (let i = 0; i < 4; i++) {
    const x = gx + i * (gw + gap);
    s.addShape("roundRect", { x, y: gy, w: gw, h: gh, rectRadius: 0.1, fill: { color: CARD }, line: { color: LINE, width: 1 } });
    s.addText(String(i + 1), { x: x + 0.25, y: gy + 0.2, w: 1.0, h: 0.9, fontFace: SERIF, fontSize: 40, bold: true, color: AMBER, margin: 0 });
    await iconChip(s, x + gw - 1.05, gy + 0.32, 0.72, steps[i][0], AMBERD, AMBER, BG2, 0.5);
    s.addText(steps[i][1], { x: x + 0.28, y: gy + 1.2, w: gw - 0.5, h: 0.5, fontFace: SERIF, fontSize: 16, bold: true, color: WHITE, margin: 0 });
    s.addText(steps[i][2], { x: x + 0.28, y: gy + 1.68, w: gw - 0.45, h: 0.9, fontFace: SANS, fontSize: 12, color: MUT, margin: 0, lineSpacingMultiple: 1.05 });
    if (i < 3) s.addText("›", { x: x + gw - 0.02, y: gy + gh / 2 - 0.35, w: 0.28, h: 0.7, align: "center", valign: "middle", fontFace: SANS, fontSize: 28, bold: true, color: AMBERD, margin: 0 });
  }
  s.addShape("roundRect", { x: 0.6, y: 5.3, w: 12.13, h: 1.0, rectRadius: 0.1, fill: { color: CARD2 }, line: { color: AMBER, width: 1 } });
  await iconChip(s, 0.9, 5.52, 0.56, fa.FaBolt, AMBER, AMBER, BG, 0.55);
  s.addText([
    { text: "Un petit incident déclaré aujourd'hui ", options: { color: WHITE, bold: true } },
    { text: "évite un accident grave demain.", options: { color: GOLD, bold: true, italic: true } },
    { text: "  La déclaration n'est jamais une faute — c'est une force.", options: { color: MUT } },
  ], { x: 1.65, y: 5.3, w: 10.9, h: 1.0, valign: "middle", fontFace: SANS, fontSize: 14.5, margin: 0, lineSpacingMultiple: 1.05 });
  footer(s, 13);
  s.addNotes("Processus en 4 étapes. Message anti-sous-déclaration : déclarer une égratignure ou un « presqu'accident » permet de corriger avant l'accident grave. Rappeler les numéros/infirmerie du site.");
}

// =====================================================================
// SLIDE 14 — Engagement (clôture)
// =====================================================================
async function s14() {
  const s = pres.addSlide(); bg(s);
  s.addShape("rect", { x: 8.9, y: 0, w: W - 8.9, h: H, fill: { color: BG2 }, line: { type: "none" } });
  s.addShape("oval", { x: 9.3, y: 1.9, w: 3.9, h: 3.9, fill: { type: "none" }, line: { color: LINE, width: 1 } });
  s.addShape("oval", { x: 9.85, y: 2.45, w: 2.8, h: 2.8, fill: { color: CARD }, line: { color: AMBERD, width: 1.25 } });
  await iconChip(s, 10.6, 3.2, 1.3, fa.FaHandshake, AMBER, AMBER, CARD, 0.6);
  s.addShape("roundRect", { x: 9.35, y: 5.95, w: 3.6, h: 0.5, rectRadius: 0.08, fill: { color: CARD2 }, line: { color: AMBERD, width: 0.75 } });
  s.addText([{ text: "▶  ", options: { color: AMBER } }, { text: "Vidéo de clôture Higgsfield", options: { color: TXT } }], { x: 9.35, y: 5.95, w: 3.6, h: 0.5, align: "center", valign: "middle", fontFace: SANS, fontSize: 11, margin: 0 });

  logo(s, 0.6, 0.5, 1.1);
  s.addText("NOTRE ENGAGEMENT", { x: 0.62, y: 2.15, w: 7.9, h: 0.35, fontFace: SANS, fontSize: 13, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
  s.addText("Chez Dhilmar, on rentre à la maison avec toutes nos mains.", { x: 0.55, y: 2.6, w: 8.0, h: 2.2, fontFace: SERIF, fontSize: 33, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("La sécurité des mains, c'est l'affaire de chacun — à chaque quart, à chaque geste.", { x: 0.6, y: 4.95, w: 7.9, h: 0.7, fontFace: SANS, fontSize: 15, italic: true, color: GOLD, margin: 0, lineSpacingMultiple: 1.1 });
  s.addShape("line", { x: 0.62, y: 5.85, w: 3.0, h: 0, line: { color: LINE, width: 1 } });
  s.addText([
    { text: "Merci.  ", options: { color: WHITE, bold: true, fontSize: 18, fontFace: SERIF } },
    { text: "Questions & discussion.", options: { color: MUT, fontSize: 14, fontFace: SANS } },
  ], { x: 0.62, y: 6.05, w: 8, h: 0.5, margin: 0 });
  s.addText("Dhilmar — Mine Éléonore · Santé-Sécurité", { x: 0.62, y: H - 0.5, w: 8, h: 0.3, fontFace: SANS, fontSize: 10, color: MUT2, margin: 0 });
  s.addNotes("Clôture. Rappeler l'engagement collectif et le droit d'arrêt de travail. Vidéo de clôture Higgsfield (équipe, lever de soleil) — voir MEDIA.md. Ouvrir la discussion.");
}

(async () => {
  await s1();
  await s2();
  await s3();
  await s4();
  await s5();
  await s6();
  await s7();
  await videoSlide(8, "Vidéo — la ligne de tir", "Le danger en un instant",
    "Une main dans la ligne de tir : ça va vite.",
    ["Où sont les mains par rapport aux pièces mobiles ?", "Le point de pincement était-il visible ?", "Qu'est-ce qui aurait éliminé le risque ?"],
    "Clip fourni : insérez-le dans le cadre.", "danger / ligne de tir");
  await s9();
  await s10();
  await s11();
  await videoSlide(12, "Vidéo — la bonne méthode", "La bonne méthode",
    "Mains protégées, contrôlées, dégagées.",
    ["Gant adapté à la tâche et en bon état.", "Prise ferme, mouvement contrôlé.", "Mains toujours hors de la ligne de tir."],
    "Clip fourni : insérez-le dans le cadre.", "bonne méthode / gants");
  await s13();
  await s14();

  await pres.writeFile({ fileName: "Dhilmar-Prevention-Blessures-Mains.pptx" });
  console.log("OK — deck écrit.");
})().catch((e) => { console.error(e); process.exit(1); });
