const { chromium } = require("playwright-core");
const path = require("path");
const fs = require("fs");
(async () => {
  const dir = path.join(__dirname, "qa");
  fs.mkdirSync(dir, { recursive: true });
  const browser = await chromium.launch({
    executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    headless: true, args: ["--no-sandbox", "--disable-gpu"],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  // couper vite les requêtes CDN bloquées (elles ne chargeront pas dans ce sandbox)
  await page.route("**/*", (r) => {
    const u = r.request().url();
    if (u.includes("cloudfront.net")) return r.abort();
    return r.continue();
  });
  await page.goto("file://" + path.join(__dirname, "presentation.html"), { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);
  const N = await page.evaluate(() => document.querySelectorAll(".slide").length);
  console.log("slides:", N);
  for (let k = 0; k < N; k++) {
    if (k > 0) await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(dir, "slide-" + String(k + 1).padStart(2, "0") + ".png") });
  }
  await browser.close();
  console.log("QA screenshots OK ->", dir);
})().catch((e) => { console.error(e); process.exit(1); });
