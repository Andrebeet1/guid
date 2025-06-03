const ai = require('../utils/ai');

module.exports = async (ctx) => {
  try {
    const prompt = `
      Tu es un guide spirituel chrétien bienveillant.
      Explique clairement les commandes disponibles dans ce bot :
      - /start : démarrer la conversation
      - /prayer : recevoir une prière personnalisée et inspirante
      - /help : obtenir cette aide
      - Bouton "Poser une question" : poser une question spirituelle à l'assistant
      Rends la réponse simple, chaleureuse et encourageante.
    `;

    const helpMessage = await ai.ask(prompt);
    await ctx.reply(helpMessage);
  } catch (error) {
    console.error("Erreur génération aide :", error);
    await ctx.reply("🙏 Désolé, je n’ai pas pu fournir l’aide. Essaie encore plus tard.");
  }
};