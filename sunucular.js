const Discord = require("discord.js");
const db = require("nrc.db")
module.exports = {
calistir: async(client, message, args) => {
	if (message.author.id !== "856438087365427220") return;
		let sunucular = client.guilds.cache
			message.channel.send(`${sunucular.map((r, index) => `**${r}** - (Üye: ${r.memberCount.toLocaleString()} - ID: ${r.id})`).join('\n')}`)
},

name: "sunucular",
description: "",
aliases: ['sws'],
kategori: "",
usage: "",
}