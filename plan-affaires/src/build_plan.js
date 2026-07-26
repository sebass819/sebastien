const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  TableOfContents, Table, TableRow, TableCell, WidthType, BorderStyle,
  ShadingType, LevelFormat, PageNumber, Header, Footer, PageBreak,
  convertInchesToTwip
} = require("docx");
const fs = require("fs");

// ---- Palette ----
const NAVY = "1B3A5B";
const STEEL = "2F6690";
const ORANGE = "D2691E";
const HEADERBG = "E6EEF3";
const ALTBG = "F5F8FA";
const GREY = "6B7280";
const TEXT = "222222";

const CONTENT_WIDTH = 9360; // 12240 - 2*1440

// ---- Helpers ----
function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text })] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text })] });
}
function p(text, opts = {}) {
  return new Paragraph({
    alignment: opts.align || AlignmentType.JUSTIFIED,
    spacing: { after: opts.after != null ? opts.after : 140, line: 276 },
    children: Array.isArray(text) ? text : [new TextRun({ text, color: TEXT })],
  });
}
function runs(arr) { return p(arr); }
function b(text) { return new TextRun({ text, bold: true, color: TEXT }); }
function t(text) { return new TextRun({ text, color: TEXT }); }
function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bul", level },
    alignment: AlignmentType.LEFT,
    spacing: { after: 60, line: 264 },
    children: Array.isArray(text) ? text : [new TextRun({ text, color: TEXT })],
  });
}
function spacer(size = 120) {
  return new Paragraph({ spacing: { after: size }, children: [new TextRun({ text: "" })] });
}
function noBorders() {
  const none = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  return { top: none, bottom: none, left: none, right: none };
}

// Table builder: headers = [str], rows = [[str|obj]], widths = [dxa]
function makeTable(headers, rows, widths, opts = {}) {
  const border = { style: BorderStyle.SINGLE, size: 4, color: "C9D6DF" };
  const cellMargin = { top: 60, bottom: 60, left: 110, right: 110 };
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((htext, i) =>
      new TableCell({
        width: { size: widths[i], type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY },
        margins: cellMargin,
        children: [new Paragraph({
          alignment: i === 0 ? AlignmentType.LEFT : AlignmentType.LEFT,
          children: [new TextRun({ text: htext, bold: true, color: "FFFFFF", size: 20 })],
        })],
      })
    ),
  });
  const bodyRows = rows.map((row, ri) =>
    new TableRow({
      children: row.map((cell, i) => {
        const isObj = typeof cell === "object" && cell !== null;
        const txt = isObj ? cell.text : cell;
        const bold = isObj ? !!cell.bold : false;
        const align = isObj && cell.align ? cell.align : AlignmentType.LEFT;
        return new TableCell({
          width: { size: widths[i], type: WidthType.DXA },
          shading: ri % 2 === 1 ? { type: ShadingType.CLEAR, color: "auto", fill: ALTBG } : undefined,
          margins: cellMargin,
          children: [new Paragraph({
            alignment: align,
            spacing: { line: 252 },
            children: [new TextRun({ text: txt, bold, color: TEXT, size: 20 })],
          })],
        });
      }),
    })
  );
  return new Table({
    columnWidths: widths,
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    borders: {
      top: border, bottom: border, left: border, right: border,
      insideHorizontal: border, insideVertical: border,
    },
    rows: [headerRow, ...bodyRows],
  });
}

function tableCaption(text) {
  return new Paragraph({
    spacing: { before: 40, after: 160 },
    children: [new TextRun({ text, italics: true, color: GREY, size: 18 })],
  });
}

// ---- Title page ----
const titlePageChildren = [
  new Paragraph({ spacing: { before: 1800 }, children: [] }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [new TextRun({ text: "PLAN D’AFFAIRES", bold: true, color: ORANGE, size: 28, characterSpacing: 40 })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [new TextRun({ text: "Firme de santé et sécurité du travail", bold: true, color: NAVY, size: 52 })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
    children: [new TextRun({ text: "spécialisée dans le secteur minier — Québec", color: NAVY, size: 40 })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    border: { top: { style: BorderStyle.SINGLE, size: 6, color: ORANGE, space: 8 } },
    children: [new TextRun({ text: "" })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text: "Modèle hybride : abonnement de contenu SST mensuel + services-conseils et formation", italics: true, color: STEEL, size: 24 })],
  }),
  new Paragraph({ spacing: { before: 2400 }, children: [] }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [new TextRun({ text: "Document de travail — version 1", color: GREY, size: 22 })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Juillet 2026", color: GREY, size: 22 })],
  }),
  new Paragraph({ children: [new PageBreak()] }),
];

// ---- TOC ----
const tocChildren = [
  new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text: "Table des matières", bold: true, color: NAVY, size: 32 })],
  }),
  new TableOfContents("Table des matières", { hyperlink: true, headingStyleRange: "1-2" }),
  new Paragraph({
    spacing: { before: 160 },
    children: [new TextRun({ text: "Astuce : dans Word, faites un clic droit sur la table et « Mettre à jour les champs » pour actualiser les numéros de page.", italics: true, color: GREY, size: 18 })],
  }),
  new Paragraph({ children: [new PageBreak()] }),
];

// ---- Body ----
const body = [];

// 1. Sommaire exécutif
body.push(h1("1. Sommaire exécutif"));
body.push(p([
  b("Le concept. "),
  t("La firme offre aux entreprises minières du Québec un programme complet de santé et de sécurité du travail (SST), articulé autour d’un produit phare : un « Kit SST mensuel » clé en main qui alimente la réunion de sécurité mensuelle de chaque équipe. Chaque mois, l’abonné reçoit une présentation interactive prête à animer et 3 à 4 affiches prêtes à imprimer, accompagnées d’un guide d’animation, d’une feuille de présence et d’un quiz de validation. Ce contenu récurrent est complété par des services-conseils (audits, analyses de risques, enquêtes d’accident, accompagnement CNESST) et de la formation."),
]));
body.push(p([
  b("Le problème. "),
  t("Le secteur minier demeure l’un des milieux de travail les plus exigeants en matière de prévention, et la modernisation récente du régime québécois de SST a élargi les obligations (programme de prévention, comité de SST, représentant en santé et sécurité) à un nombre beaucoup plus grand d’employeurs. Résultat : les mines et surtout leurs nombreux sous-traitants doivent tenir des rencontres de sécurité régulières et documentées, mais manquent de temps et de matériel de qualité pour le faire mois après mois."),
]));
body.push(p([
  b("La solution et le modèle d’affaires. "),
  t("Un modèle hybride combinant un revenu récurrent (abonnement mensuel à paliers) et des services à plus forte marge (conseil et formation). Le contenu est livré à distance partout au Québec via un portail web, et les services sont rendus sur place selon la région."),
]));
body.push(p([
  b("L’équipe. "),
  t("La firme est fondée par un entrepreneur qui connaît intimement le milieu minier (réseau, réalité terrain, développement d’affaires), associé à un ou des spécialistes détenant des titres et de l’expérience reconnus en SST. Cette complémentarité — connaissance du secteur d’un côté, crédibilité technique de l’autre — est au cœur de la stratégie."),
]));
body.push(p([
  b("Le marché. "),
  t("Le Québec compte une vingtaine de mines actives et des dizaines de projets, auxquels s’ajoute un large bassin de sous-traitants (forage, dynamitage, transport, entretien, construction) qui gravitent autour des sites. Ce sont ces sous-traitants, souvent moins bien outillés en SST, qui constituent le cœur de la clientèle initiale."),
]));
body.push(p([
  b("Le financement. "),
  t("Démarrage autofinancé et allégé : les besoins en capital sont modestes (image de marque, site/portail, logiciels, production du contenu initial). L’investissement de départ estimé se situe autour de 16 000 $ à 26 000 $, réparti entre les associés."),
]));
body.push(p([
  b("Les objectifs (an 1). "),
  t("Valider l’offre avec 2 à 3 clients pilotes, lancer commercialement, atteindre le seuil de rentabilité des frais d’exploitation et bâtir un catalogue de thèmes couvrant l’année."),
]));

// 2. Le projet et l'entreprise
body.push(h1("2. Le projet et l’entreprise"));
body.push(h2("2.1 Mission"));
body.push(p("Rendre la prévention simple, professionnelle et constante dans les entreprises minières du Québec, en fournissant du contenu SST clé en main et un accompagnement crédible, aligné sur la réglementation."));
body.push(h2("2.2 Vision"));
body.push(p("Devenir la référence québécoise du contenu SST minier clé en main — le partenaire qui fait gagner du temps aux responsables de la sécurité tout en élevant la qualité des rencontres mensuelles sur le terrain."));
body.push(h2("2.3 Valeurs"));
body.push(bullet([b("Rigueur : "), t("un contenu exact, à jour et aligné sur la réglementation.")]));
body.push(bullet([b("Terrain : "), t("des outils conçus pour la réalité des travailleurs miniers, pas de la théorie.")]));
body.push(bullet([b("Constance : "), t("la prévention est une habitude mensuelle, pas un événement annuel.")]));
body.push(bullet([b("Bilinguisme : "), t("du contenu offert en français et en anglais, un atout dans plusieurs milieux.")]));
body.push(h2("2.4 Forme juridique et propriété"));
body.push(p([
  t("La firme sera constituée en société par actions (incorporation) afin de protéger le patrimoine des associés et de faciliter le partage de la propriété et l’ajout futur d’associés ou d’employés. Une "),
  b("convention entre actionnaires"),
  t(" sera signée dès le départ pour préciser les rôles, la répartition des parts, la prise de décision, la rémunération et les scénarios de départ. (À valider avec un comptable et un juriste; cette section est informative et ne constitue pas un avis professionnel.)"),
]));

// 3. Équipe
body.push(h1("3. L’équipe entrepreneuriale et la stratégie de crédibilité"));
body.push(p([
  b("Le pivot du projet. "),
  t("Une firme de SST se vend sur la confiance. Le fondateur connaît le milieu minier mais n’est pas un spécialiste SST; la crédibilité technique doit donc être assurée par la structure de l’équipe. C’est pourquoi la firme démarre avec au moins un associé détenant une expertise SST reconnue."),
]));
body.push(h2("3.1 Rôles complémentaires"));
body.push(bullet([b("Fondateur — Direction générale et développement des affaires. "), t("Connaissance du secteur minier, réseau de contacts, relations-clients, ventes, gestion de la production du contenu et des opérations.")]));
body.push(bullet([b("Associé(s) — Direction technique SST. "), t("Titulaire de titres et d’expérience reconnus en SST (technique, certificat ou baccalauréat en SST; expérience de préventionniste ou de conseiller SST; appartenance à une association professionnelle). Garant de la conformité, responsable de la prestation des services-conseils et de la formation, et validateur de tout le contenu diffusé.")]));
body.push(h2("3.2 Stratégie de crédibilité"));
body.push(bullet("S’assurer qu’au moins un associé détient des qualifications SST vérifiables, mises de l’avant dans le matériel de vente."));
body.push(bullet("Nouer des partenariats ponctuels avec des spécialistes (hygiéniste du travail, ingénieur, formateur accrédité) pour les mandats qui l’exigent."));
body.push(bullet("Souscrire une assurance responsabilité professionnelle dès le lancement."));
body.push(bullet([b("Positionnement prudent : "), t("la firme offre du conseil en prévention et du contenu; elle ne prétend pas exécuter des actes réservés (hygiène du travail, ingénierie) qu’elle confie en sous-traitance au besoin.")]));
body.push(bullet("Rehausser la crédibilité personnelle du fondateur par une formation SST de base (ex. cours reconnus en prévention) et l’adhésion aux associations du secteur."));
body.push(bullet("Bâtir une preuve sociale rapide : témoignages de clients pilotes, études de cas, présence professionnelle sur LinkedIn."));

// 4. Marché
body.push(h1("4. Analyse du marché"));
body.push(h2("4.1 Le secteur minier québécois"));
body.push(p([
  t("En 2025, le Québec comptait une vingtaine de mines en exploitation (autour de 21 selon les relevés gouvernementaux les plus récents), auxquelles s’ajoutent quelques sites en maintenance et une trentaine de projets à divers stades de développement. La production se concentre dans l’or (environ huit mines), le fer, le nickel et quelques autres substances (niobium, titane, graphite, etc.). L’"),
  b("Abitibi-Témiscamingue"),
  t(" est le cœur minier de la province (environ sept mines actives), suivie du Nord-du-Québec et de la Côte-Nord."),
]));
body.push(p([
  b("Le bassin réel de clients dépasse largement les mines elles-mêmes. "),
  t("Chaque site fait travailler un écosystème de sous-traitants : forage, dynamitage, transport lourd, entretien mécanique, électricité, construction, services d’urgence. Ces entreprises — souvent des PME — ont les mêmes obligations de prévention, mais rarement une équipe SST à temps plein. C’est un segment nombreux, accessible et mal servi."),
]));
body.push(h2("4.2 Cadre réglementaire (moteur de la demande)"));
body.push(bullet([b("LSST et RSSM. "), t("La Loi sur la santé et la sécurité du travail et le Règlement sur la santé et la sécurité du travail dans les mines encadrent strictement l’industrie : rencontres de sécurité, comités, inspections, formation, tenue de registres.")]));
body.push(bullet([b("Modernisation du régime (loi de 2021). "), t("La réforme a élargi les mécanismes de prévention obligatoires (programme de prévention, comité de SST, représentant en santé et sécurité) à un éventail beaucoup plus large d’employeurs, en déploiement progressif. Cela crée une demande structurelle pour du contenu et de l’accompagnement, particulièrement chez les sous-traitants qui n’étaient pas outillés. (Dates et modalités précises à valider auprès de la CNESST.)")]));
body.push(bullet([b("Enjeux de santé de l’heure. "), t("Poussières de silice cristalline, bruit et vibrations, santé psychologique, fatigue et gestion des quarts : autant de thèmes réglementés et médiatisés qui alimentent le besoin de sensibilisation continue.")]));
body.push(h2("4.3 Ampleur du besoin"));
body.push(p([
  t("Bon an mal an, le secteur minier québécois enregistre de l’ordre de "),
  b("370 lésions professionnelles indemnisées par année"),
  t(" (en forte majorité des accidents), selon le portrait statistique publié par l’association paritaire du secteur (chiffre approximatif, année de référence 2022). Chaque lésion représente un coût humain et financier important et une justification directe d’investir dans la prévention continue — le créneau exact de la firme."),
]));
body.push(h2("4.4 Clientèle cible"));
body.push(bullet([b("PME et sous-traitants miniers (cœur de cible initial). "), t("Peu de ressources SST internes, grand besoin de contenu clé en main, cycle de vente court, prix d’abonnement facilement justifiable.")]));
body.push(bullet([b("Grandes sociétés minières. "), t("Budgets plus importants et exigences élevées, mais cycles de vente plus longs; visées surtout pour les services-conseils, la formation et les abonnements « Sur mesure » multi-sites.")]));

// 5. Concurrence
body.push(h1("5. Concurrence et avantages concurrentiels"));
body.push(h2("5.1 Paysage concurrentiel"));
body.push(bullet([b("L’APSM (association paritaire du secteur minier). "), t("Créée en 1985 en vertu de la Loi sur la SST, elle offre formation, information et conseil technique aux mines, à coût nul ou minime, car financée par une cotisation sectorielle. C’est le joueur incontournable à comprendre et à respecter.")]));
body.push(bullet([b("Consultants et firmes SST généralistes. "), t("Offrent audits, formation et accompagnement, mais rarement spécialisés minier et rarement sous forme de contenu récurrent clé en main.")]));
body.push(bullet([b("Contenu générique en ligne. "), t("Gabarits d’affiches et de causeries gratuits, mais génériques, non adaptés au minier québécois et exigeant beaucoup de temps de mise en forme.")]));
body.push(h2("5.2 Se positionner face à l’APSM : complémenter, pas concurrencer"));
body.push(p("L’APSM offre d’excellents services, mais son contenu est partagé, générique et pensé d’abord pour les mines membres. La firme se distingue en étant le prolongement « clé en main » de cet écosystème :"));
body.push(bullet("Elle cible en priorité les sous-traitants et PME, souvent moins couverts par les services sectoriels."));
body.push(bullet("Elle vend le gain de temps et la qualité de présentation : du contenu prêt à animer, sans travail de mise en forme."));
body.push(bullet("Elle personnalise (marque blanche) aux couleurs, au logo et aux risques propres de chaque client."));
body.push(bullet("Elle assure une constance mensuelle, avec un calendrier annuel structuré."));
body.push(h2("5.3 Avantages concurrentiels durables"));
body.push(bullet([b("Spécialisation minière"), t(" — un contenu qui parle la langue du terrain (souterrain, à ciel ouvert, sous-traitants).")]));
body.push(bullet([b("Clé en main et interactif"), t(" — présentations prêtes à animer, quiz, « trouve le danger », affiches prêtes à imprimer.")]));
body.push(bullet([b("Marque blanche"), t(" — le contenu aux couleurs du client renforce sa propre culture de sécurité.")]));
body.push(bullet([b("Bilingue et à jour"), t(" — un différenciateur au Québec, et une veille réglementaire intégrée.")]));
body.push(bullet([b("Revenu récurrent"), t(" — l’abonnement fidélise et stabilise les revenus.")]));

// 6. Offre
body.push(h1("6. Offre de produits et services"));
body.push(h2("6.1 Produit phare — l’abonnement « Kit SST mensuel »"));
body.push(p("Chaque mois, l’abonné reçoit un ensemble prêt à utiliser pour sa réunion de sécurité :"));
body.push(bullet("Une présentation interactive (sondage, quiz avec pointage, « trouve le danger » sur photo, étude de cas)."));
body.push(bullet("3 à 4 affiches prêtes à imprimer (formats 11 × 17 et 24 × 36)."));
body.push(bullet("Un guide d’animation d’une page pour le superviseur."));
body.push(bullet("Une feuille de présence et un quiz de validation des acquis."));
body.push(bullet("Une causerie éclair (toolbox talk) d’une page pour les équipes sur le terrain."));
body.push(spacer(40));
body.push(makeTable(
  ["Palier", "Prix indicatif", "Inclus"],
  [
    ["Essentiel", "125 – 175 $/mois", "Contenu mensuel standard en français : présentation, 3 affiches, guide, feuille de présence, quiz."],
    ["Pro", "300 – 450 $/mois", "Tout Essentiel + personnalisation marque blanche (logo/couleurs) + version bilingue + soutien + accès au portail."],
    ["Site / Sur mesure", "750 – 2 000 $+/mois", "Contenu adapté au site et aux risques spécifiques (facturé par site) + langues additionnelles + accompagnement d’un conseiller + rapports de participation."],
  ],
  [1700, 1900, 5760]
));
body.push(tableCaption("Grille tarifaire indicative — à ajuster selon le positionnement et les coûts réels."));
body.push(h2("6.2 Services-conseils (à la carte)"));
body.push(bullet("Audits et inspections SST, tournées de conformité."));
body.push(bullet("Analyses de risques et analyses sécuritaires de tâches (AST)."));
body.push(bullet("Enquêtes et analyses d’accident, plans d’action correctifs."));
body.push(bullet("Accompagnement CNESST, soutien aux comités de SST et aux programmes de prévention."));
body.push(h2("6.3 Formation"));
body.push(bullet("Sessions sur mesure (cadenassage, espaces clos, travail en hauteur, SIMDUT, etc.) et animation de rencontres thématiques."));
body.push(h2("6.4 Calendrier des 12 thèmes"));
body.push(p("Un calendrier annuel structure la production et donne de la visibilité aux abonnés (détaillé en annexe A), incluant des modules propres au minier : contrôle de terrain, ventilation, sautage."));

// 7. Mise en marché
body.push(h1("7. Stratégie de mise en marché"));
body.push(h2("7.1 Positionnement"));
body.push(p("« Vos réunions de sécurité, prêtes chaque mois. » La firme se positionne comme le partenaire qui fait gagner du temps aux responsables et élève la qualité de la prévention, à un coût très inférieur à celui d’un conseiller interne (dont le salaire dépasse aisément 56 000 $ à 111 000 $ par année au Québec)."));
body.push(h2("7.2 Prix et justification (les « ancres »)"));
body.push(p("Le prix ne se justifie pas par le coût de production du contenu, mais par ce que le client évite ou économise. Les points de comparaison rendent l’abonnement évident :"));
body.push(makeTable(
  ["Ce que le client paie déjà…", "Coût réel", "Implication"],
  [
    ["Préparer la réunion à l’interne", "150 – 400 $/mois", "4 à 8 h d’un superviseur (35-55 $/h); résultat souvent moyen. Le kit fait mieux, pour moins."],
    ["Un conseiller SST à temps plein", "56 000 – 111 000 $/an", "Hors de portée d’un sous-traitant; le kit livre l’essentiel à une fraction du coût."],
    ["Un consultant qui anime sur place", "800 – 1 200 $/jour", "Une seule rencontre animée dépasse un mois d’abonnement."],
    ["Un seul accident avec perte de temps", "30 000 – 100 000 $+", "Coûts directs + indirects + hausse de cotisation CNESST. La prévention est une assurance bon marché."],
  ],
  [2900, 2100, 4360]
));
body.push(tableCaption("Ordres de grandeur; salaires selon Indeed Québec (2026), tarifs de consultation estimés à valider."));
body.push(p("Trois leviers augmentent le prix moyen :"));
body.push(bullet([b("Facturer par site, pas par entreprise "), t("— une société minière à trois sites représente trois abonnements. C’est le principal multiplicateur de revenus.")]));
body.push(bullet([b("Contenu basé sur de vrais événements du secteur "), t("— s’appuyer sur des accidents et incidents réels (anonymisés) et sur les risques précis du site fait passer l’offre du « générique » au « sur mesure » et justifie le palier supérieur.")]));
body.push(bullet([b("Rabais annuel prépayé "), t("(≈ 2 mois gratuits) — verrouille le revenu récurrent et améliore la trésorerie.")]));
body.push(p("Pour les services et la formation : taux journalier estimé autour de 800 $ à 1 200 $/jour et forfaits de formation de ≈ 1 000 $ à 2 000 $/session (à valider selon le marché)."));
body.push(p([b("Positionnement de départ recommandé : "), t("un revenu moyen mélangé d’environ 250 à 300 $/mois par abonné. À valider auprès de 5 à 10 clients potentiels avant de figer la grille — ce type de service est souvent sous-évalué.")]));
body.push(h2("7.3 Canaux d’acquisition"));
body.push(bullet("Réseau du fondateur dans le milieu minier (approche directe, références)."));
body.push(bullet("LinkedIn et contenu d’expertise (publications, capsules prévention)."));
body.push(bullet("Salons et événements du secteur (ex. Xplor, Québec Mines & Énergie)."));
body.push(bullet("Partenariats avec des fournisseurs et associations gravitant autour des mines."));
body.push(h2("7.4 Offre d’essai"));
body.push(p("Un « Kit SST mensuel » gratuit offert en démonstration à 2 ou 3 clients pilotes (une mine, un ou deux sous-traitants) pour valider la valeur, récolter des témoignages et amorcer le bouche-à-oreille."));

// 8. Opérations
body.push(h1("8. Plan des opérations"));
body.push(bullet([b("Production du contenu. "), t("Rédaction et validation SST par l’associé technique; conception graphique des présentations et affiches (interne ou sous-traitée); révision bilingue.")]));
body.push(bullet([b("Livraison. "), t("Portail web où les abonnés téléchargent le kit du mois; envoi d’une infolettre de rappel; contenu personnalisé pour les paliers Pro et Sur mesure.")]));
body.push(bullet([b("Outils. "), t("Suite bureautique et outils de conception (présentations, affiches), plateforme d’infolettre et de paiement, espace client, comptabilité en ligne.")]));
body.push(bullet([b("Répartition. "), t("Le fondateur pilote ventes, relations-clients et coordination; l’associé technique pilote le contenu, la conformité et les mandats de services.")]));
body.push(bullet([b("Qualité. "), t("Chaque contenu diffusé est validé par un responsable SST crédité avant publication — c’est la garantie de la marque.")]));

// 9. Juridique
body.push(h1("9. Cadre juridique et réglementaire"));
body.push(bullet([b("Constitution. "), t("Société par actions; convention entre actionnaires; immatriculation au Registraire des entreprises du Québec.")]));
body.push(bullet([b("Assurances. "), t("Responsabilité civile et responsabilité professionnelle (erreurs et omissions) dès le départ.")]));
body.push(bullet([b("Propriété intellectuelle. "), t("Le catalogue de contenu est l’actif central et récurrent : gabarits, présentations, affiches et marque doivent être protégés (droits d’auteur, licences d’utilisation encadrées pour les abonnés).")]));
body.push(bullet([b("Conformité et prudence. "), t("Mise en garde claire dans les contrats : le contenu soutient la démarche de prévention du client mais ne remplace pas ses obligations légales ni un avis professionnel spécialisé lorsque requis.")]));

// 10. Financier
body.push(h1("10. Plan financier"));
body.push(p([
  new TextRun({ text: "Avertissement : ", bold: true, color: ORANGE }),
  new TextRun({ text: "les chiffres ci-dessous sont des scénarios illustratifs fondés sur des hypothèses clairement identifiées. Ils servent à cadrer la réflexion et devront être remplacés par vos données réelles (prix négociés, coûts réels, rémunération des associés) avant toute utilisation auprès d’un prêteur.", color: TEXT }),
]));
body.push(h2("10.1 Investissement de départ (estimé)"));
body.push(makeTable(
  ["Poste", "Montant estimé"],
  [
    ["Constitution et frais professionnels initiaux", "1 500 – 3 000 $"],
    ["Image de marque (nom, logo, identité)", "1 500 – 3 000 $"],
    ["Site web et portail abonnés", "2 000 – 5 000 $"],
    ["Logiciels et plateformes (année 1)", "1 500 – 2 500 $"],
    ["Assurance responsabilité professionnelle (année 1)", "1 500 – 3 000 $"],
    ["Production du contenu initial (1er trimestre)", "3 000 – 5 000 $"],
    ["Fonds de roulement et marketing de lancement", "≈ 5 000 $"],
    [{ text: "Total estimé", bold: true }, { text: "≈ 16 000 – 26 000 $", bold: true }],
  ],
  [6360, 3000]
));
body.push(tableCaption("Compatible avec un démarrage autofinancé partagé entre associés."));
body.push(h2("10.2 Hypothèses de revenus"));
body.push(bullet("Revenu moyen par abonné (souvent par site) : ≈ 250 $/mois (3 000 $/an), reflétant un mélange des paliers Essentiel, Pro et Site / Sur mesure."));
body.push(bullet("Services-conseils : taux moyen ≈ 900 – 1 000 $/jour."));
body.push(bullet("Formation : quelques sessions par année à ≈ 1 000 – 2 000 $ chacune."));
body.push(spacer(40));
body.push(makeTable(
  ["Revenus annuels (arrondis)", "Prudent", "Réaliste", "Optimiste"],
  [
    ["Année 1", "≈ 48 000 $", "≈ 72 000 $", "≈ 109 000 $"],
    ["Année 2", "≈ 104 000 $", "≈ 157 000 $", "≈ 245 000 $"],
    ["Année 3", "≈ 170 000 $", "≈ 265 000 $", "≈ 410 000 $"],
  ],
  [3360, 2000, 2000, 2000]
));
body.push(tableCaption("Ex. scénario réaliste an 1 : ≈ 12 abonnés + ≈ 30 jours de services + formation. Hypothèses à ajuster."));
body.push(h2("10.3 Frais d’exploitation annuels (récurrents)"));
body.push(makeTable(
  ["Poste", "Estimation annuelle"],
  [
    ["Logiciels et plateformes", "≈ 3 000 $"],
    ["Assurances", "≈ 2 500 $"],
    ["Sous-traitance graphique (contenu mensuel)", "12 000 – 18 000 $"],
    ["Marketing et représentation", "4 000 – 8 000 $"],
    ["Frais administratifs et comptables", "≈ 3 000 $"],
    ["Déplacements (services sur place)", "3 000 – 8 000 $"],
    [{ text: "Total (hors rémunération des associés)", bold: true }, { text: "≈ 28 000 – 42 000 $", bold: true }],
  ],
  [6360, 3000]
));
body.push(h2("10.4 Seuil de rentabilité"));
body.push(p("Pour couvrir des frais d’exploitation d’environ 35 000 $, il faut l’équivalent d’une douzaine d’abonnements Pro (≈ 350 $/mois), ou un mélange abonnements + services équivalent. Cet objectif est atteignable dès la première année dans le scénario réaliste; au-delà, la marge sert à rémunérer les associés et à réinvestir dans le contenu et le marketing."));

// 11. Échéancier
body.push(h1("11. Échéancier de démarrage (12 mois)"));
body.push(makeTable(
  ["Période", "Jalons"],
  [
    ["Mois 1 – 2", "Entente entre associés, constitution, image de marque, assurance; validation des titres SST de l’associé."],
    ["Mois 2 – 3", "Développement du 1er Kit SST et de 3 thèmes; site web et portail; grille tarifaire."],
    ["Mois 3 – 4", "Programme pilote gratuit (1 mine + 1-2 sous-traitants); collecte de témoignages."],
    ["Mois 4 – 6", "Lancement commercial; démarchage réseau et LinkedIn; premiers abonnements payants."],
    ["Mois 6 – 9", "Catalogue étoffé (6-9 thèmes); premiers mandats de services et de formation."],
    ["Mois 9 – 12", "Bilan; ajustement de l’offre et des prix; atteinte du seuil de rentabilité; planification de l’an 2."],
  ],
  [2200, 7160]
));

// 12. Risques
body.push(h1("12. Analyse des risques et mitigations"));
body.push(makeTable(
  ["Risque", "Mitigation"],
  [
    ["Crédibilité SST (fondateur non-spécialiste)", "Associé crédité, partenariats d’experts, assurance professionnelle, positionnement prudent."],
    ["Concurrence de l’APSM (services gratuits)", "Complémentarité, marque blanche, gain de temps, cibler les sous-traitants moins couverts."],
    ["Dépendance à quelques clients", "Diversifier la base d’abonnés et de mandats; prioriser le revenu récurrent."],
    ["Copie du contenu", "Protéger la PI, mettre à jour en continu, miser sur la relation-client et la personnalisation."],
    ["Cyclicité minière (prix des métaux)", "Le récurrent stabilise; diversification possible vers l’industriel et la construction connexes."],
    ["Évolution réglementaire", "La veille devient un argument de vente : le contenu est toujours à jour."],
  ],
  [3200, 6160]
));

// 13. Annexes
body.push(h1("13. Annexes"));
body.push(h2("Annexe A — Calendrier des 12 thèmes SST"));
body.push(makeTable(
  ["Mois", "Thème"],
  [
    ["Janvier", "Travail par temps froid et conditions hivernales"],
    ["Février", "Cadenassage et contrôle des énergies dangereuses"],
    ["Mars", "Poussières et silice cristalline (silicose)"],
    ["Avril", "Espaces clos"],
    ["Mai", "Travail en hauteur et protection contre les chutes"],
    ["Juin", "Fatigue et gestion des quarts de travail"],
    ["Juillet", "Coup de chaleur et hydratation"],
    ["Août", "Circulation lourde, interaction piéton-machinerie, angles morts"],
    ["Septembre", "Bruit et vibrations"],
    ["Octobre", "Troubles musculo-squelettiques, ergonomie, manutention"],
    ["Novembre", "Premiers soins et intervention d’urgence"],
    ["Décembre", "Santé psychologique et gestion du stress"],
  ],
  [1800, 7560]
));
body.push(tableCaption("Modules souterrain additionnels : contrôle de terrain, ventilation, sautage."));
body.push(h2("Annexe B — Aperçu d’un « Kit SST mensuel »"));
body.push(bullet("Présentation interactive (10-15 diapositives) : rappel du thème, statistiques, « trouve le danger », étude de cas, quiz, engagements."));
body.push(bullet("3 à 4 affiches (11 × 17 et 24 × 36) : un message clé par affiche, visuel fort, QR code, zone personnalisable."));
body.push(bullet("Guide d’animation (1 page), feuille de présence, quiz de validation, causerie éclair (1 page)."));
body.push(h2("Annexe C — Propositions de noms de firme"));
body.push(p("Cinq pistes à valider (disponibilité au Registraire des entreprises du Québec, recherche NUANS et nom de domaine web) :"));
body.push(bullet([b("Boréa SST"), t(" — évoque le Nord et le Québec minier; moderne et sobre.")]));
body.push(bullet([b("Filon Prévention"), t(" — « filon » = veine de minerai; connotation positive (« un bon filon »).")]));
body.push(bullet([b("Roc Sécurité"), t(" — solidité et ancrage minier, facile à retenir.")]));
body.push(bullet([b("Vigie Minière"), t(" — surveillance et prévention, message clair.")]));
body.push(bullet([b("Aplomb SST"), t(" — stabilité et sérieux; clin d’œil à la verticalité des galeries.")]));
body.push(spacer(80));
body.push(new Paragraph({
  border: { top: { style: BorderStyle.SINGLE, size: 4, color: "C9D6DF", space: 6 } },
  spacing: { before: 120 },
  children: [new TextRun({ text: "Document de travail — les données financières sont illustratives et doivent être validées avec un comptable et un juriste avant toute démarche de financement.", italics: true, color: GREY, size: 18 })],
}));

// ---- Assemble ----
const doc = new Document({
  creator: "Firme SST minière",
  title: "Plan d'affaires — Firme de santé et sécurité minière (Québec)",
  description: "Plan d'affaires",
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 22, color: TEXT } },
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: "Calibri", size: 30, bold: true, color: NAVY },
        paragraph: { spacing: { before: 320, after: 140 }, keepNext: true,
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ORANGE, space: 4 } } },
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: "Calibri", size: 24, bold: true, color: STEEL },
        paragraph: { spacing: { before: 220, after: 80 }, keepNext: true },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bul",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
            style: { run: { color: ORANGE }, paragraph: { indent: { left: 460, hanging: 260 } } } },
          { level: 1, format: LevelFormat.BULLET, text: "◦", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 920, hanging: 260 } } } },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
        titlePage: true,
      },
      headers: {
        default: new Header({ children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "D8E2E9", space: 4 } },
          children: [new TextRun({ text: "Plan d’affaires — Firme SST minière", color: GREY, size: 16 })],
        })] }),
        first: new Header({ children: [new Paragraph({ children: [] })] }),
      },
      footers: {
        default: new Footer({ children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Page ", color: GREY, size: 16 }),
            new TextRun({ children: [PageNumber.CURRENT], color: GREY, size: 16 }),
            new TextRun({ text: " sur ", color: GREY, size: 16 }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], color: GREY, size: 16 })],
        })] }),
        first: new Footer({ children: [new Paragraph({ children: [] })] }),
      },
      children: [...titlePageChildren, ...tocChildren, ...body],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(process.argv[2] || "plan-affaires.docx", buf);
  console.log("OK écrit:", process.argv[2] || "plan-affaires.docx", buf.length, "octets");
}).catch((e) => { console.error("ERREUR:", e); process.exit(1); });
