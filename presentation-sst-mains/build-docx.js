/*
 * Génère le document Word « Guide d'animation — texte de la prestation »
 * + la version Markdown (SCRIPT-PRESTATION.md), à partir de script-content.js.
 */
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType,
  LevelFormat, PageNumber, Footer, Header, PositionalTab,
  PositionalTabAlignment, PositionalTabLeader,
} = require("docx");
const C = require("./script-content");

const BRONZE = "B06E12";   // ambre foncé (titres, lisible sur blanc)
const AMBER = "E09A2E";    // ambre accent
const INK = "23201B";      // corps
const MUT = "6B6459";      // atténué
const FILL = "F8EFDD";     // fond léger (encadré « à retenir »)
const RULE = "D8CBB0";

const P = (children, opts = {}) => new Paragraph({ children, ...opts });
const R = (text, opts = {}) => new TextRun({ text, font: "Calibri", color: INK, size: 21, ...opts });

function label(text, color = BRONZE) {
  return P([new TextRun({ text: text.toUpperCase(), font: "Calibri", bold: true, color, size: 17, characterSpacing: 30 })],
    { spacing: { before: 160, after: 40 } });
}

const doc = new Document({
  creator: "Dhilmar — Santé-Sécurité",
  title: "Guide d'animation — Prévention des blessures aux mains",
  styles: {
    default: { document: { run: { font: "Calibri", color: INK, size: 21 } } },
    paragraphStyles: [
      { id: "SlideTitle", name: "SlideTitle", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: "Cambria", bold: true, color: BRONZE, size: 28 },
        paragraph: { spacing: { before: 260, after: 60 }, outlineLevel: 1,
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE, space: 6 } } } },
    ],
  },
  numbering: {
    config: [{ reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
      style: { run: { color: AMBER }, paragraph: { indent: { left: 460, hanging: 260 } } } }] }],
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1200, bottom: 1200, left: 1200, right: 1200 } } },
    footers: {
      default: new Footer({ children: [P([
        new TextRun({ text: "Dhilmar — Mine Éléonore · Santé-Sécurité", font: "Calibri", color: MUT, size: 16 }),
        new TextRun({ children: [new PositionalTab({ alignment: PositionalTabAlignment.RIGHT, leader: PositionalTabLeader.NONE, relativeTo: "margin" })], }),
        new TextRun({ children: ["Page ", PageNumber.CURRENT], font: "Calibri", color: MUT, size: 16 }),
      ])] }),
    },
    children: buildBody(),
  }],
});

function buildBody() {
  const out = [];
  // ---- Page de garde ----
  out.push(P([new TextRun({ text: "SANTÉ · SÉCURITÉ AU TRAVAIL", font: "Calibri", bold: true, color: AMBER, size: 18, characterSpacing: 40 })], { spacing: { before: 400, after: 60 } }));
  out.push(P([new TextRun({ text: C.meta.title, font: "Cambria", bold: true, color: BRONZE, size: 52 })], { spacing: { after: 40 } }));
  out.push(P([new TextRun({ text: C.meta.sub, font: "Cambria", italics: true, color: INK, size: 26 })], { spacing: { after: 120 } }));
  out.push(P([], { border: { bottom: { style: BorderStyle.SINGLE, size: 10, color: BRONZE, space: 1 } }, spacing: { after: 160 } }));
  out.push(P([new TextRun({ text: C.meta.org, font: "Calibri", color: INK, bold: true, size: 22 })], { spacing: { after: 200 } }));

  const metaRows = [
    ["Durée", C.meta.duree],
    ["Public", C.meta.public],
    ["Matériel", C.meta.materiel],
  ];
  out.push(new Table({
    width: { size: 9360, type: WidthType.DXA }, columnWidths: [1900, 7460],
    borders: allBorders("EDE4D2"),
    rows: metaRows.map(([k, v]) => new TableRow({ children: [
      cell(1900, [P([new TextRun({ text: k, font: "Calibri", bold: true, color: BRONZE, size: 20 })])], "FBF5EA"),
      cell(7460, [P([new TextRun({ text: v, font: "Calibri", color: INK, size: 20 })])], "FFFFFF"),
    ] })),
  }));

  // ---- Avant de commencer ----
  out.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 320, after: 80 },
    children: [new TextRun({ text: "Avant de commencer", font: "Cambria", bold: true, color: BRONZE, size: 30 })] }));
  out.push(P([R("Quelques repères pour animer la rencontre :", { italics: true, color: MUT })], { spacing: { after: 80 } }));
  for (const f of C.facilitation) {
    out.push(P([R(f)], { numbering: { reference: "bul", level: 0 }, spacing: { after: 40 } }));
  }

  // ---- Diapositives ----
  for (const s of C.slides) {
    out.push(new Paragraph({ style: "SlideTitle", keepNext: true, children: [
      new TextRun({ text: `Diapo ${String(s.n).padStart(2, "0")}  ·  ${s.title}`, font: "Cambria", bold: true, color: BRONZE, size: 28 }),
      new TextRun({ children: [new PositionalTab({ alignment: PositionalTabAlignment.RIGHT, leader: PositionalTabLeader.DOT, relativeTo: "margin" })] }),
      new TextRun({ text: s.duree, font: "Calibri", italics: true, color: MUT, size: 18 }),
    ] }));

    out.push(label("Vous dites"));
    for (const d of s.dites) {
      const isCue = d.startsWith("[");
      out.push(P([R(d, isCue ? { italics: true, color: AMBER, bold: true } : {})], { spacing: { after: 90 }, alignment: AlignmentType.LEFT }));
    }

    if (s.demandez) {
      out.push(label("Demandez au groupe"));
      out.push(P([R(s.demandez, { italics: true })], { spacing: { after: 60 } }));
    }
    if (s.transition) {
      out.push(P([new TextRun({ text: "↳ Transition : ", font: "Calibri", bold: true, color: MUT, size: 19 }), new TextRun({ text: s.transition, font: "Calibri", italics: true, color: MUT, size: 19 })], { spacing: { before: 40, after: 60 } }));
    }
    // encadré « à retenir »
    out.push(new Table({
      width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360], borders: noBorders(),
      rows: [new TableRow({ children: [new TableCell({
        width: { size: 9360, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: FILL, color: "auto" },
        margins: { top: 90, bottom: 90, left: 160, right: 160 },
        borders: { left: { style: BorderStyle.SINGLE, size: 18, color: AMBER } },
        children: [P([
          new TextRun({ text: "À retenir   ", font: "Calibri", bold: true, color: BRONZE, size: 18, characterSpacing: 20 }),
          new TextRun({ text: s.retenir, font: "Calibri", bold: true, color: INK, size: 21 }),
        ])],
      })] })],
    }));
    out.push(P([], { spacing: { after: 120 } }));
  }
  return out;
}

function cell(w, children, fill) {
  return new TableCell({ width: { size: w, type: WidthType.DXA }, shading: fill ? { type: ShadingType.CLEAR, fill, color: "auto" } : undefined, margins: { top: 70, bottom: 70, left: 120, right: 120 }, children });
}
function allBorders(color) {
  const b = { style: BorderStyle.SINGLE, size: 4, color };
  return { top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b };
}
function noBorders() {
  const n = { style: BorderStyle.NONE, size: 0, color: "auto" };
  return { top: n, bottom: n, left: n, right: n, insideHorizontal: n, insideVertical: n };
}

// ---- Markdown jumeau ----
function buildMd() {
  const L = [];
  L.push(`# ${C.meta.title}`, "", `**${C.meta.sub}**`, "", `_${C.meta.org}_`, "");
  L.push(`- **Durée :** ${C.meta.duree}`, `- **Public :** ${C.meta.public}`, `- **Matériel :** ${C.meta.materiel}`, "");
  L.push("## Avant de commencer", "");
  for (const f of C.facilitation) L.push(`- ${f}`);
  L.push("");
  for (const s of C.slides) {
    L.push(`## Diapo ${String(s.n).padStart(2, "0")} · ${s.title}  \n_${s.duree}_`, "");
    L.push("**Vous dites :**", "");
    for (const d of s.dites) L.push(d, "");
    if (s.demandez) L.push(`**Demandez au groupe :** _${s.demandez}_`, "");
    if (s.transition) L.push(`↳ _Transition : ${s.transition}_`, "");
    L.push(`> **À retenir —** ${s.retenir}`, "");
  }
  return L.join("\n");
}

(async () => {
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync("Dhilmar-Prestation-Blessures-Mains-Script.docx", buf);
  fs.writeFileSync("SCRIPT-PRESTATION.md", buildMd());
  console.log("OK — DOCX + Markdown écrits.");
})().catch((e) => { console.error(e); process.exit(1); });
