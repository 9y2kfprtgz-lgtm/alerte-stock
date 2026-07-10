if (html.includes("Just a moment") || html.includes("cf-challenge")) {
  console.log("Cloudflare a bloqué la vérification.");
  process.exit(0);
}

if (html.includes("Rupture de stock")) {
  console.log("Toujours en rupture.");
  process.exit(0);
}

// Seulement ici on notifie
await axios.post(
  `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
  {
    chat_id: process.env.CHAT_ID,
    text: `🎉 Le climatiseur semble disponible !\n\n${URL}`
  }
);