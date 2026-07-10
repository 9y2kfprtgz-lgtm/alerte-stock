import { chromium } from "playwright";
import axios from "axios";

const URL = "https://www.optimea.fr/product/climatiseur-split-mobile-midea/";

const browser = await chromium.launch({
  headless: true
});

const page = await browser.newPage();

await page.goto(URL, {
  waitUntil: "domcontentloaded",
  timeout: 60000
});

// attendre un peu que la page se stabilise
await page.waitForTimeout(8000);

const html = await page.content();

await browser.close();

console.log("Page chargée.");

const title = await page.title();
console.log(title);

const html = await page.content();

if (title.includes("Just a moment")) {
    console.log("Cloudflare bloque encore.");
    process.exit(0);
}

const dispo =
    html.includes(">En stock<") ||
    html.includes("En stock") ||
    html.includes("Disponibilité : En stock");

if (dispo) {
    console.log("Produit EN STOCK");

    await axios.post(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
        {
            chat_id: process.env.CHAT_ID,
            text: `🚨 Climatiseur Midea DISPONIBLE !\n${URL}`
        }
    );
} else {
    console.log("Toujours en rupture.");
}