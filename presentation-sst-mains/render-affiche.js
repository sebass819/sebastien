/* Rend l'affiche murale en PDF A3 (impression via Chromium). */
const { chromium } = require("playwright-core");
const path = require("path");
(async () => {
  const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", headless: true, args: ["--no-sandbox"] });
  const p = await b.newPage({ viewport: { width: 1123, height: 1587 }, deviceScaleFactor: 2 });
  await p.goto("file://" + path.join(__dirname, "affiche-a3.html"), { waitUntil: "networkidle" });
  await p.pdf({ path: "Dhilmar-Affiche-A3-Securite-Mains.pdf", format: "A3", printBackground: true, margin: { top: "0", bottom: "0", left: "0", right: "0" } });
  await b.close();
  console.log("OK — Dhilmar-Affiche-A3-Securite-Mains.pdf");
})().catch((e) => { console.error(e); process.exit(1); });
