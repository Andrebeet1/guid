require('dotenv').config();
const { Telegraf } = require('telegraf');
const session = require('telegraf/session'); // Middleware session

// Importation des commandes et actions
const startCommand = require('./commands/start');
const prayerCommand = require('./commands/prayer');
const helpCommand = require('./commands/help');
const askQuestion = require('./actions/askQuestion');
const otherButtons = require('./actions/otherButtons');
const ai = require('./utils/ai'); // L’IA (OpenAI, etc.)

// Initialisation du bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// Middleware session (⚠️ important)
bot.use(session());

// Commandes
bot.start(startCommand);
bot.command('prayer', prayerCommand);
bot.command('help', helpCommand);

// Gestion des boutons callback
bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;

  if (data === 'ask_question') {
    return askQuestion(ctx); // Active le mode "pose ta question"
  }

  return otherButtons(ctx); // Gère d'autres boutons
});

// Gestion des messages texte (pour répondre à la question spirituelle)
bot.on('text', async (ctx) => {
  ctx.session ??= {};

  if (ctx.session.expectingQuestion) {
    const question = ctx.message.text;

    try {
      const response = await ai.ask(question);
      await ctx.reply(`📖 Réponse :\n${response}`);
    } catch (error) {
      console.error("Erreur AI:", error);
      await ctx.reply("⚠️ Une erreur s'est produite en traitant ta question.");
    }

    ctx.session.expectingQuestion = false; // Réinitialiser
  }
});

// Exporter le bot pour usage dans d'autres fichiers (ex : webhook.js)
module.exports = bot;