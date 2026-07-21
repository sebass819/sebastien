/* Extrait une image d'affiche (1re image) de chaque MP4 dans assets/video/ via Chromium.
   Sert d'aperçu (cover) pour les vidéos intégrées au PPTX. */
const { chromium } = require("playwright-core");
const path = require("path"), fs = require("fs");
(async () => {
  const vdir = "assets/video", pdir = "assets/poster";
  fs.mkdirSync(pdir, { recursive: true });
  const files = fs.existsSync(vdir) ? fs.readdirSync(vdir).filter((f) => f.endsWith(".mp4")) : [];
  if (!files.length) { console.log("aucune vidéo dans", vdir); return; }
  const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", headless: true, args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required"] });
  const p = await b.newPage();
  for (const f of files) {
    const abs = "file://" + path.resolve(vdir, f);
    await p.setContent(`<video id=v muted src="${abs}"></video>`);
    const meta = await p.evaluate(async () => {
      const v = document.getElementById("v");
      await new Promise((res, rej) => { v.onloadeddata = res; v.onerror = () => rej(new Error("decode")); setTimeout(res, 12000); });
      try { v.currentTime = Math.min(0.3, (v.duration || 1) / 2); await new Promise((r) => { v.onseeked = r; setTimeout(r, 3000); }); } catch (e) {}
      const c = document.createElement("canvas"); c.width = v.videoWidth || 1280; c.height = v.videoHeight || 720;
      c.getContext("2d").drawImage(v, 0, 0, c.width, c.height);
      return { w: v.videoWidth, h: v.videoHeight, d: v.duration, png: c.toDataURL("image/png") };
    });
    const out = path.join(pdir, f.replace(/\.mp4$/, ".png"));
    fs.writeFileSync(out, Buffer.from(meta.png.split(",")[1], "base64"));
    console.log(f, "->", (meta.w || "?") + "x" + (meta.h || "?"), (meta.d || 0).toFixed(1) + "s", "| poster:", out);
  }
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
