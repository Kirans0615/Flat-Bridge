/**
 * Screenshot harness — brief v2 §22.5 requires 360/390/768/1024/1280/1440/
 * 1920 plus one 2560 check for every page before it's called done.
 *
 * Usage: node scripts/screenshots.mjs [url] [outDir]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = process.argv[2] ?? "http://localhost:3000/";
const OUT = process.argv[3] ?? "/tmp/fb-shots";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  ["w360", 360, 800, false],
  ["w390", 390, 844, true],
  ["w768", 768, 1024, false],
  ["w1024", 1024, 800, false],
  ["w1280", 1280, 800, false],
  ["w1440", 1440, 900, true],
  ["w1920", 1920, 1080, false],
  ["w2560", 2560, 1440, false],
];

const browser = await chromium.launch();

for (const [name, width, height, full] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(3500); // let the hero character sequence resolve

  await page.screenshot({ path: `${OUT}/${name}-fold.png` });
  if (full) await page.screenshot({ path: `${OUT}/${name}-full.png`, fullPage: true });

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const flag = overflow > 0 ? "  ✖ HORIZONTAL OVERFLOW" : "  ✓";
  console.log(`${name.padEnd(8)} ${String(width).padStart(4)}px  height=${String(pageHeight).padStart(5)}px  overflow=${overflow}px${flag}`);

  await ctx.close();
}

await browser.close();
