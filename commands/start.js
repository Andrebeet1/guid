module.exports = (ctx) => {
    ctx.reply('Bienvenue dans le Guide Spirituel 🙏\n\nUtilisez /prayer pour recevoir une prière.\nOu cliquez sur un bouton ci-dessous.', {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Poser une question spirituelle", callback_data: "ask_question" }]
        ]
      }
    });
  };
  