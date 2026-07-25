/* Rend l'aide-mémoire une page en PDF (impression A4 via Chromium). */
const { chromium } = require("playwright-core");
const path = require("path");
(async () => {
  const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", headless: true, args: ["--no-sandbox"] });
  const p = await b.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
  await p.goto("file://" + path.join(__dirname, "aide-memoire.html"), { waitUntil: "networkidle" });
  await p.pdf({ path: "Dhilmar-Aide-Memoire-Blessures-Mains.pdf", format: "A4", printBackground: true, margin: { top: "0", bottom: "0", left: "0", right: "0" } });
  await b.close();
  console.log("OK — Dhilmar-Aide-Memoire-Blessures-Mains.pdf");
})().catch((e) => { console.error(e); process.exit(1); });
