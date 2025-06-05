const { Markup } = require('telegraf');

module.exports = async (ctx) => {
  const message = `
📝 *Note du jour*

Que cette lecture t'inspire et t'encourage dans ta marche spirituelle 🙏
`;

  await ctx.replyWithMarkdown(
    message,
    Markup.inlineKeyboard([
      Markup.button.url('Lire la note du jour', 'https://anno-jeik.onrender.com/')
    ])
  );
};