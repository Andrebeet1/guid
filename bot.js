require('dotenv').config();
const { Telegraf, session } = require('telegraf'); // ✅ bonne syntaxe

const startCommand = require('./commands/start');
const prayerCommand = require('./commands/prayer');
const helpCommand = require('./commands/help');
const askQuestion = require('./actions/askQuestion');
const otherButtons = require('./actions/otherButtons');
const ai = require('./utils/ai');

const bot = new Telegraf(process.env.BOT_TOKEN);

// ✅ Utilisation correcte de session
bot.use(session());

// Commandes
bot.start(startCommand);
bot.command('prayer', prayerCommand);
bot.command('help', helpCommand);

// Boutons
bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;

  if (data === 'ask_question') return askQuestion(ctx);
  return otherButtons(ctx);
});

// Réception des messages
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

// Export
module.exports = bot;