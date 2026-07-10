import axios from "axios";

const URL = "https://www.optimea.fr/product/climatiseur-split-mobile-midea/";

try {
  const { data } = await axios.get(URL, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  if (!data.includes("Rupture de stock")) {
    await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text: `🎉 Le climatiseur Midea est de nouveau en stock !\n\n${URL}`
      }
    );

    console.log("Notification envoyée.");
  } else {
    console.log("Toujours en rupture de stock.");
  }
} catch (err) {
  console.error(err);
  process.exit(1);
}