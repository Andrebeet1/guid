module.exports = async (ctx) => {
  const message = `
📝 *Note du jour*

Clique ici pour lire la méditation spirituelle du jour : 
👉 [Lire la note du jour](https://note-ohr8.onrender.com)

Que cette lecture t'inspire et t'encourage dans ta marche spirituelle 🙏
`;
  await ctx.replyWithMarkdown(message);
};