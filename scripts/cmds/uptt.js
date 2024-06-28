const moment = require("moment-timezone");
const uptimeFacts = [
"The only limit to our realization of tomorrow will be our doubts of today.","Every day may not be good, but there's something good in every day.","Success is stumbling from failure to failure with no loss of enthusiasm.","The future belongs to those who believe in the beauty of their dreams.","The only way to do great work is to love what you do.","Don't watch the clock; do what it does. Keep going.","The best way to predict the future is to create it.","The journey of a thousand miles begins with one step.","Believe you can and you're halfway there.","Life is 10% what happens to us and 90% how we react to it." 
];

module.exports = {
    config: {
        name: "uptt",
        version: "1.0",
        author: "Kyle敦. ဗီူ",//don't change the author nigga kung ayaw mong ma pwetan tamo own gawa ko to. 
        countDown: 5,
        role: 0,
        shortDescription: "uptime nigga",
        longDescription: "uptime command to see how your bot running",
        category: "🟢 𝗨𝗽𝘁𝗶𝗺𝗲",
    },
    onStart: async function() {},
    onChat: async function({ event, message, getLang, api, args }) {
        const manilaTime = moment.tz('Asia/Manila');
        const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');
        
        if (event.body && event.body.toLowerCase() === "up") {
            const randomFact = uptimeFacts[Math.floor(Math.random() * uptimeFacts.length)];
 const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));

            return message.reply({
                body: `🤖◉𝗭𝗘𝗣𝗛𝗬𝗥𝗨𝗦 𝗨𝗣𝗧𝗜𝗠𝗘:\n━━━━━━━━━━━━━━━━━━\n📡 𝗨𝗽𝘁𝗶𝗺𝗲: ${hours} 𝗵𝗼𝘂𝗿𝘀\n               ⏰${minutes} 𝗺𝗶𝗻𝘂𝘁𝗲𝘀\n               ⏱️${seconds} 𝘀𝗲𝗰𝗼𝗻𝗱
━━━━━━━━━━━━━━━━━━
    📅 | ⏰ Date And Time: 
     ${formattedDateTime} 
━━━━━━━━━━━━━━━━━━
🟢 𝗨𝗣𝗧𝗜𝗠𝗘 𝗙𝗔𝗖𝗧: ${randomFact}\n`,
            });
        }
    }
};
