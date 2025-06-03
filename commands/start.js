const { Markup } = require('telegraf');

module.exports = async (ctx) => {
  const fullName = ctx.from.first_name || 'Bien-aimé';

  await ctx.reply(
    `🕊️ Bonjour ${fullName} !\n\nJe suis ton assistant spirituel personnel.\nJe peux t'aider à prier, à poser une question, ou à méditer une note du jour.\n\nSélectionne une option ci-dessous 👇`,
    Markup.inlineKeyboard([
      [Markup.button.callback('🙏 Prière du jour', 'prayer')],
      [Markup.button.callback('📖 Note du jour', 'note')],
      [Markup.button.callback('🧘 Poser une question', 'ask_question')],
      [Markup.button.callback('ℹ️ Aide', 'help')],
    ])
  );
};