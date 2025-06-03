require('dotenv').config();
const { Telegraf, session } = require('telegraf');

const startCommand = require('./commands/start');
const prayerCommand = require('./commands/prayer');
const helpCommand = require('./commands/help');
const askQuestion = require('./actions/askQuestion');
const otherButtons = require('./actions/otherButtons');
const ai = require('./utils/ai');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Activer la session pour garder le contexte utilisateur
bot.use(session());

// Commande /start affiche le menu avec boutons
bot.start(startCommand);

// Gestion des boutons inline (callback_query)
bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;

  switch (data) {
    case 'ask_question':
      return askQuestion(ctx);

    case 'prayer_request':
      return prayerCommand(ctx);

    case 'help_info':
      return helpCommand(ctx);

    default:
      return otherButtons(ctx);
  }
});

// Gestion des messages texte pour répondre aux questions posées après clic sur "Poser une question"
bot.on('text', async (ctx) => {
  ctx.session ??= {};

  if (ctx.session.expectingQuestion) {
    const question = ctx.message.text;

    try {
      const response = await ai.ask(question);
      await ctx.reply(`📖 Réponse :\n${response}`);
    } catch (error) {
      console.error("Erreur IA :", error);
      await ctx.reply("❌ Une erreur est survenue.");
    }

    ctx.session.expectingQuestion = false;
  }
});

module.exports = bot;