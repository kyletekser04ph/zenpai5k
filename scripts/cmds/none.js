module.exports = {
	config: {
			name: "×",
			version: "1.0",
			author: "Kyle敦. ဗီူ",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasm",
			longDescription: "sarcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "×") return message.reply("⚠ 𝗔𝗖𝗖𝗘𝗦𝗦 𝗗𝗘𝗡𝗜𝗘𝗗.\n\n   ∩_∩\n （„• ֊ •„)♡\n┏━∪∪━━━━━━━━━ღ❦ღ┓\n  𝘱𝘭𝘦𝘢𝘴𝘦 𝘵𝘺𝘱𝘦 ×help  𝘵𝘰 𝘴𝘦𝘦 \n   𝘢𝘷𝘢𝘪𝘭𝘢𝘣𝘭𝘦 𝘤𝘰𝘮𝘮𝘢𝘯𝘥𝘴\n\n  𝗢𝘄𝗻𝗲𝗿: 𝗞𝘆𝗹𝗲敦. ဗီူ   \n┗ღ❦ღ━━━━━━━━━━━━┛  ");
}
};
