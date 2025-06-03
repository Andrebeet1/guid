module.exports = async (ctx) => {
  await ctx.reply(
    `🙏 Bienvenue dans ton guide spirituel ! Que puis-je faire pour toi aujourd'hui ?`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🧘 Pose une question spirituelle", callback_data: "ask_question" }],
          [{ text: "🙏 Demande de prière", callback_data: "prayer_request" }],
          [{ text: "❓ Aide / Informations", callback_data: "help_info" }]
        ]
      }
    }
  );
};