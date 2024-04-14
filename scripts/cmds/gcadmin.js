const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "gcadmin",
    aliases: ['admininfo'],
    version: "1.0",
    author: "VM/AM 薛",
    countDown: 0,
    role: 0,
    shortDescription: "see the box administrators with box image",
    longDescription: "",
    category: "Group Chat",
    guide: {
      en: "{p} [admininfo|gcadmin]",
    }
  },

  onStart: async function ({ api, event, args }) {
    try {
      let threadInfo = await api.getThreadInfo(event.threadID);
      let qtv = threadInfo.adminIDs.length;
      let sex = threadInfo.approvalMode;
      var pd = sex == false ? 'Turned off' : sex == true ? 'Turned on' : 'VM/AM 薛';

      const imageSrc = encodeURI(threadInfo.imageSrc);
      const imagePath = path.join(__dirname, '/cache/1.png');

      await new Promise((resolve, reject) => {
        request(imageSrc)
          .pipe(fs.createWriteStream(imagePath))
          .on('close', resolve)
          .on('error', reject);
      });

      api.sendMessage(
        {
          body: `Total Administrators: ${qtv}\nInclusion: ${pd}`
        },
        event.threadID,
        event.messageID
      );
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
};