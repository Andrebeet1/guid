require('dotenv').config();
const { Telegraf, session } = require('telegraf');

const startCommand = require('./commands/start');
const prayerCommand = require('./commands/prayer');
const helpCommand = require('./commands/help');
const noteCommand = require('./commands/note');

const askQuestion = require('./actions/askQuestion');
const otherButtons = require('./actions/otherButtons');
const ai = require('./utils/ai');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Middleware de session
bot.use(session());

// === Commandes classiques ===
bot.start(startCommand);
bot.command('prayer', prayerCommand);
bot.command('help', helpCommand);
bot.command('note', noteCommand); // ➕ Note du jour

// === Boutons ===
bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;

  if (data === 'ask_question') {
    return askQuestion(ctx);
  }

  if (data === 'prayer') {
    return prayerCommand(ctx);
  }

  if (data === 'note') {
    return noteCommand(ctx);
  }

  if (data === 'help') {
    return helpCommand(ctx);
  }

  return otherButtons(ctx); // pour tout autre bouton futur
});

// === Réception des messages ===
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

// === Export du bot ===
module.exports = bot;