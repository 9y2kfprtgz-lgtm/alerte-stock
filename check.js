import axios from "axios";

const API =
  "https://www.optimea.fr/wp-json/wc/store/v1/products?slug=climatiseur-split-mobile-midea";

try {
  const { data } = await axios.get(API);

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Produit introuvable.");
  }

  const product = data[0];

  console.log("Nom :", product.name);
  console.log("Stock :", product.stock_status);

  if (product.stock_status === "instock") {
    await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text:
          "🎉 LA CLIM EST EN STOCK !\n\nhttps://www.optimea.fr/product/climatiseur-split-mobile-midea/"
      }
    );

    console.log("Notification envoyée !");
  } else {
    console.log("Toujours en rupture.");
  }
} catch (e) {
  console.error(e.response?.data || e.message);
  process.exit(1);
}