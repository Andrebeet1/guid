require('dotenv').config();
const express = require('express');
const bot = require('./bot');

const app = express();

app.use(bot.webhookCallback('/webhook'));

app.get('/', (req, res) => res.send('Bot spirituel actif !'));

bot.telegram.setWebhook(`${process.env.RENDER_EXTERNAL_URL}/webhook`);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
