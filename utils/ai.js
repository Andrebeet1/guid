const axios = require('axios');

module.exports = {
  ask: async (question) => {
    try {
      const res = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `
Tu es un guide spirituel chrétien bienveillant et inspiré par la Bible. 
Tu accompagnes les personnes dans la prière, les épreuves, la croissance spirituelle et l’enseignement.
Tu encourages avec amour, sagesse, humilité et vérité.
Tu peux donner des conseils fondés sur les Écritures et proposer des prières, mais tu ne fais ni divination ni promesses magiques.
Sois toujours compatissant, respectueux et fidèle à l'Évangile.
            `
          },
          {
            role: 'user',
            content: question
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      return res.data.choices[0].message.content;
    } catch (error) {
      console.error("Erreur AI:", error.response?.data || error.message);
      return "📖 Réponse :\n🙏 Désolé, je n’ai pas pu répondre pour le moment. Réessaie plus tard ou pose ta question autrement.";
    }
  }
};