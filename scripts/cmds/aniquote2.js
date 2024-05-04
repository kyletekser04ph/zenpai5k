const axios = require("axios");

module.exports = {
  config: {
    name: "aniquote2",
    version: "1.0",
    author: "yuki/VM/AM 薛",
    countDown: 0,
    role: 0,
    shortDescription: "Get anime quotes",
    longDescription: {
      en: "get quotes."
    },
    category: "anime",
    guide: {
      en: "{prefix}"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    try { 
      const response = await axios.get(`https://animechan.xyz/api/random`);
      if (response.status === 200 && response.data) {
        const { quote, anime, character } = response.data;
        const message = `⛩️・From: ${anime}\n\n🌸・Quote: ${quote}\n\n✨・By: ${character}`;
        return api.sendMessage(message, event.threadID);
      } else {
        console.error("Failed to fetch anime quote! Go Fuck Yourself");
      }
    } catch (error) {
      console.error("Error fetching anime quote:", error.message);
    }
  }
};