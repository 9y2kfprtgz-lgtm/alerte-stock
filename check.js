import { chromium } from "playwright";
import axios from "axios";

const URL = "https://www.optimea.fr/product/climatiseur-split-mobile-midea/";

const browser = await chromium.launch({ headless: true });

const page = await browser.newPage({
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
});

await page.goto(URL, {
  waitUntil: "networkidle",
  timeout: 60000
});

const html = await page.content();
await browser.close();

// On ne notifie que si la page contient explicitement une indication de stock.
const enStock =
  html.includes(">En stock<") ||
  html.includes("En stock") ||
  html.includes("Ajouter au panier");

if (enStock) {
  await axios.post(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
    {
      chat_id: process.env.BOT_TOKEN ? process.env.CHAT_ID : "",
      text: `🎉 Le climatiseur est EN STOCK !\n\n${URL}`
    }
  );

  console.log("Notification envoyée.");
} else {
  console.log("Toujours pas en stock.");
}