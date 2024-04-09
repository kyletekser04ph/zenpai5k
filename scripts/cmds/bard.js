const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const ytdl = require("ytdl-core");
const yts = require("yt-search");

async function lado(api, event, args, message) {
  try {
    const songName = args.join(" ");
    const searchResults = await yts(songName);

    if (!searchResults.videos.length) {
      message.reply("𝙎𝙤𝙧𝙧𝙮 𝙘𝙪𝙧𝙧𝙚𝙣𝙩𝙡𝙮 𝙩𝙝𝙚 𝙨𝙤𝙣𝙜 𝙞𝙨 𝙣𝙤𝙩 𝙖𝙫𝙖𝙡𝙖𝙞𝙗𝙡𝙚.");
      return;
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;
    const stream = ytdl(videoUrl, { filter: "audioonly" });
    const fileName = `music.mp3`; 
    const filePath = path.join(__dirname, "tmp", fileName);

    stream.pipe(fs.createWriteStream(filePath));

    stream.on('response', () => {
      console.info('[DOWNLOADER]', 'Starting download now!');
    });

    stream.on('info', (info) => {
      console.info('[DOWNLOADER]', `Downloading ${info.videoDetails.title} by ${info.videoDetails.author.name}`);
    });

    stream.on('end', () => {
      const audioStream = fs.createReadStream(filePath);
      message.reply({ attachment: audioStream });
      api.setMessageReaction("✅", event.messageID, () => {}, true);
    });
  } catch (error) {
    console.error("Error:", error);
    message.reply("𝘼𝙣 𝙘𝙤𝙣𝙨𝙤𝙡𝙚 𝙚𝙧𝙧𝙤𝙧 𝙤𝙘𝙘𝙪𝙧𝙚𝙙.");
  }
}

async function kshitiz(api, event, args, message) {
  try {
    const query = args.join(" ");
    const searchResults = await yts(query);

    if (!searchResults.videos.length) {
      message.reply("𝙎𝙤𝙧𝙧𝙮 𝙘𝙪𝙧𝙧𝙚𝙣𝙩𝙡𝙮 𝙩𝙝𝙚 𝙫𝙞𝙙𝙚𝙤 𝙣𝙤𝙩 𝙛𝙤𝙪𝙣𝙙.");
      return;
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;
    const stream = ytdl(videoUrl, { filter: "audioandvideo" }); 
    const fileName = `music.mp4`;
    const filePath = path.join(__dirname, "tmp", fileName);

    stream.pipe(fs.createWriteStream(filePath));

    stream.on('response', () => {
      console.info('[DOWNLOADER]', 'Starting download now!');
    });

    stream.on('info', (info) => {
      console.info('[DOWNLOADER]', `Downloading ${info.videoDetails.title} by ${info.videoDetails.author.name}`);
    });

    stream.on('end', () => {
      const videoStream = fs.createReadStream(filePath);
      message.reply({ attachment: videoStream });
      api.setMessageReaction("✅", event.messageID, () => {}, true);
    });
  } catch (error) {
    console.error(error);
    message.reply("𝙎𝙤𝙧𝙧𝙮 𝙖𝙣 𝙚𝙧𝙧𝙤𝙧 𝙤𝙘𝙘𝙪𝙧𝙚𝙙 𝙩𝙤 𝙩𝙝𝙚 𝙘𝙤𝙣𝙨𝙤𝙡𝙚.");
  }
}

async function b(c, d, e, f) {
  try {
    const g = await axios.get(`https://gemini-ai-pearl-two.vercel.app/kshitiz?prompt=${encodeURIComponent(c)}&uid=${d}&apikey=kshitiz`);
    return g.data.answer;
  } catch (h) {
    throw h;
  }
}

async function i(c) {
  try {
    const j = await axios.get(`https://sdxl-kshitiz.onrender.com/gen?prompt=${encodeURIComponent(c)}&style=3`);
    return j.data.url;
  } catch (k) {
    throw k;
  }
}

async function describeImage(prompt, photoUrl) {
  try {
    const url = `https://sandipbaruwal.onrender.com/gemini2?prompt=${encodeURIComponent(prompt)}&url=${encodeURIComponent(photoUrl)}`;
    const response = await axios.get(url);
    return response.data.answer;
  } catch (error) {
    throw error;
  }
}

async function l({ api, message, event, args }) {
  try {
    const m = event.senderID;
    let n = "";
    let draw = false;
    let sendTikTok = false;
    let sing = false;

    if (args[0].toLowerCase() === "draw") {
      draw = true;
      n = args.slice(1).join(" ").trim();
    } else if (args[0].toLowerCase() === "send") {
      sendTikTok = true;
      n = args.slice(1).join(" ").trim();
    } else if (args[0].toLowerCase() === "sing") {
      sing = true;
      n = args.slice(1).join(" ").trim();
    } else if (event.messageReply && event.messageReply.attachments && event.messageReply.attachments.length > 0) {
      const photoUrl = event.messageReply.attachments[0].url;
      n = args.join(" ").trim();
      const description = await describeImage(n, photoUrl);
      message.reply(`Description: ${description}`);
      return;
    } else {
      n = args.join(" ").trim();
    }

    if (!n) {
      return message.reply("𝙋𝙡𝙚𝙖𝙨𝙚 𝙬𝙧𝙞𝙩𝙚 𝙨𝙤𝙢𝙚𝙩𝙝𝙞𝙣𝙜");
    }

    if (draw) {
      await drawImage(message, n);
    } else if (sendTikTok) {
      await kshitiz(api, event, args.slice(1), message); 
    } else if (sing) {
      await lado(api, event, args.slice(1), message); 
    } else {
      const q = await b(n, m);
      message.reply(q, (r, s) => {
        global.GoatBot.onReply.set(s.messageID, {
          commandName: a.name,
          uid: m 
        });
      });
    }
  } catch (t) {
    console.error("Error:", t.message);
    message.reply("𝙎𝙤𝙧𝙧𝙮 𝙖𝙣 𝙘𝙤𝙣𝙨𝙤𝙡𝙚 𝙚𝙧𝙧𝙤𝙧 𝙤𝙘𝙘𝙪𝙧𝙚𝙙");
  }
}

async function drawImage(message, prompt) {
  try {
    const u = await i(prompt);

    const v = path.join(__dirname, 'cache', `image_${Date.now()}.png`);
    const writer = fs.createWriteStream(v);

    const response = await axios({
      url: u,
      method: 'GET',
      responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    }).then(() => {
      message.reply({
        body: "Generated image:",
        attachment: fs.createReadStream(v)
      });
    });
  } catch (w) {
    console.error("Error:", w.message);
    message.reply("𝙎𝙤𝙧𝙧𝙮 𝙖𝙣 𝙚𝙧𝙧𝙤𝙧 𝙬𝙖𝙨 𝙤𝙘𝙘𝙪𝙧𝙚𝙙 𝙞𝙣 𝘾𝙤𝙣𝙨𝙤𝙡𝙚");
  }
}

const a = {
  name: "gemini",
  aliases: ["bard"],
  version: "4.0",
  author: "vex_kshitiz",
  𝙢𝙤𝙙𝙞𝙛𝙞𝙚𝙙𝙗𝙮:"𝙈𝙧 𝙥𝙚𝙧𝙛𝙚𝙘𝙩",
  countDown: 0,
  role: 0,
  longDescription: "Chat with gemini",
  category: "ai",
  guide: {
    en: "{p}gemini {prompt}"
  }
};

module.exports = {
  config: a,
  handleCommand: l,
  onStart: function ({ api, message, event, args }) {
    return l({ api, message, event, args });
  },
  onReply: function ({ api, message, event, args }) {
    return l({ api, message, event, args });
  }
};