const axios = require('axios');

module.exports = {
  ask: async (question) => {
    try {
      const res = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: 'mistral/mistral-7b-instruct',
        messages: [
          { role: 'system', content: 'Tu es un guide spirituel chrétien bienveillant.' },
          { role: 'user', content: question }
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
      return "🙏 Désolé, je n’ai pas pu répondre. Réessaie plus tard.";
    }
  }
};
