const ai = require('../utils/ai');

module.exports = async (ctx) => {
  await ctx.reply("🧘 Pose-moi ta question spirituelle.");
  ctx.session ??= {};
  ctx.session.expectingQuestion = true;

  ctx.telegram.on('text', async (messageCtx) => {
    if (ctx.session.expectingQuestion) {
      const question = messageCtx.message.text;
      const response = await ai.ask(question);
      await messageCtx.reply(`📖 Réponse :\n${response}`);
      ctx.session.expectingQuestion = false;
    }
  });
};
