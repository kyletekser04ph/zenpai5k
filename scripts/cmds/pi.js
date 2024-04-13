const axios = require("axios");
let targetMessageID;

module.exports = {
  config: {
    name: 'pi',
    version: '1.0.14',
    author: 'Shikaki & Aliester Crowley',
    countDown: 10,
    role: 0,
    category: 'Ai',
    description: {
      en: 'pi ai : Can use Internet.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },

  onStart: async function ({ api, message, event, args, commandName }) {
    let prompt = args.join(" ");

    if (prompt.toLowerCase() === "clear") {
      const clear = await axios.get(`https://pi.aliestercrowley.com/api/reset?uid=${event.senderID}`);
      message.reply(clear.data.message);
      return;
    }

    let content = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
    targetMessageID = (event.type == "message_reply") ? event.messageReply.messageID : event.messageID;
    if (content != "" && event.type == "message_reply") {
      api.setMessageReaction("⌛", event.messageID, () => { }, true);

      prompt += content;
      const url = `https://pi.aliestercrowley.com/api?prompt=${encodeURIComponent(prompt)}&uid=${targetMessageID}`;

      try {
        const response = await axios.get(url);
        const result = response.data.response;

        api.sendMessage(`${result}`, (err, info) => {
          if (!err) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID,
              replyToMessageID: targetMessageID
            });
          }
        });

        api.setMessageReaction("✅", event.messageID, () => { }, true);
      } catch (error) {
        message.reply('An error occurred.');
        api.setMessageReaction("❌", event.messageID, () => { }, true);
      }
    } else {
      api.setMessageReaction("⌛", event.messageID, () => { }, true);

      const url = `https://pi.aliestercrowley.com/api?prompt=${encodeURIComponent(prompt)}&uid=${event.senderID}`;

      try {
        const response = await axios.get(url);
        const result = response.data.response;

        message.reply(`${result}`, (err, info) => {
          if (!err) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID,
            });
          }
        });

        api.setMessageReaction("✅", event.messageID, () => { }, true);
      } catch (error) {
        message.reply('An error occurred.');
        api.setMessageReaction("❌", event.messageID, () => { }, true);
      }
    }
  },

  onReply: async function ({ api, message, event, Reply, args }) {
    const prompt = args.join(" ");
    let { author, commandName } = Reply;
    if (event.senderID !== author) return;

    api.setMessageReaction("⌛", event.messageID, () => { }, true);

    const url = `https://pi.aliestercrowley.com/api?prompt=${encodeURIComponent(prompt)}&uid=${event.senderID}`;
    try {
      const response = await axios.get(url);

      const content = response.data.response;

      message.reply(`${content}`, (err, info) => {
        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
          });
        }
      });

      api.setMessageReaction("✅", event.messageID, () => { }, true);
    } catch (error) {
      console.error(error.message);
      message.reply("An error occurred.");
      api.setMessageReaction("❌", event.messageID, () => { }, true);
    }
  },
};