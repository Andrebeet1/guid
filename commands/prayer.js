const ai = require('../utils/ai');

module.exports = async (ctx) => {
  try {
    const prompt = `Génère une prière chrétienne touchante, pleine d'espoir, de paix et de réconfort, adaptée à une personne qui cherche du soutien spirituel.`;
    
    const prayer = await ai.ask(prompt);
    await ctx.reply(prayer);
  } catch (error) {
    console.error("Erreur génération prière :", error);
    await ctx.reply("🙏 Désolé, je n’ai pas pu générer la prière. Essaie encore plus tard.");
  }
};