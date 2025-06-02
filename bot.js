require('dotenv').config();
const { Telegraf } = require('telegraf');
const startCommand = require('./commands/start');
const prayerCommand = require('./commands/prayer');
const helpCommand = require('./commands/help');
const askQuestion = require('./actions/askQuestion');
const otherButtons = require('./actions/otherButtons');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Commandes
bot.start(startCommand);
bot.command('prayer', prayerCommand);
bot.command('help', helpCommand);

// Actions
bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;
  if (data === 'ask_question') return askQuestion(ctx);
  return otherButtons(ctx);
});

// Exporter le bot pour webhook.js
module.exports = bot;
