module.exports = {
	name: "ready",
	once: true,
	async execute(client, Discord) {
		console.log(`${client.user.tag}, kullanıma hazır.`);
		client.user.setPresence({
			activities: [{ name: `213.238.177.161:22003`, type: `WATCHING` }],
			status: `dnd`,
			allowedMentions: { parse: ["users"], repliedUser: false },
		});		
	},
};
