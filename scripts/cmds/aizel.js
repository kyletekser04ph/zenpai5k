const fs = require('fs');
const path = require('path');
const { drive, getStreamFromURL } = global.utils;


const aizelDataFilePath = path.join(__dirname, 'aizel.json');


function readAizelData() {
  try {
    const data = fs.readFileSync(aizelDataFilePath, 'utf8');
    return JSON.parse(data) || [];
  } catch (error) {
    return [];
  }
}


function writeAizelData(data) {
  fs.writeFileSync(aizelDataFilePath, JSON.stringify(data), 'utf8');
}

module.exports = {
  config: {
    name: 'aizel',
    version: '1.0',
    author: 'perfect',
    role: 2,
    shortDescription: {
      en: 'Manage videos'
    },
    longDescription: {
      en: 'Add and send t videos'
    },
    category: 'custom',
    guide: {
      en: '   {pn} add: Reply to a video to save it'
        + '\n   {pn} send: Fetch a random video'
    }
  },

  onStart: async function ({ args, message, event }) {

    const aizelData = readAizelData();

    switch (args[0]) {
      case 'add': {
        if (event.messageReply && event.messageReply.attachments && event.messageReply.attachments.length > 0) {
          const videoAttachment = event.messageReply.attachments.find(attachment => attachment.type === 'video');

          if (!videoAttachment) {
            return message.reply('Reply to a video to add it to the video collection.');
          }


          const fileName = `aizel_${Date.now()}.mp4`;
          const infoFile = await drive.uploadFile(fileName, 'application/octet-stream', await getStreamFromURL(videoAttachment.url));

          aizelData.push(infoFile.id);
          writeAizelData(aizelData); 
          message.reply('successfully');
        } else {
          message.reply('Reply to the video.');
        }
        break;
      }

      case 'send': {
        if (aizelData.length === 0) {
          return message.reply('collection  empty.');
        }


        if (!aizelData._sentVideos || aizelData._sentVideos.length === aizelData.length) {
          aizelData._sentVideos = [];
        }


        let randomVideoId;
        do {
          randomVideoId = aizelData[Math.floor(Math.random() * aizelData.length)];
        } while (aizelData._sentVideos.includes(randomVideoId));


        const videoStream = await drive.getFile(randomVideoId, 'stream', true);
        message.reply({
          attachment: [videoStream],
        });


        aizelData._sentVideos.push(randomVideoId);
        writeAizelData(aizelData); 

        break;
      }

      default:
        message.SyntaxError();
        break;
    }
  }
};