module.exports = async (ctx) => {
  // Initialiser la session si elle n'existe pas
  ctx.session ??= {};

  // Indiquer que le bot attend une question spirituelle
  ctx.session.expectingQuestion = true;

  // Envoyer un message à l'utilisateur
  await ctx.reply("🧘 Pose-moi ta question spirituelle.");
};