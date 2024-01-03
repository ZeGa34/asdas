const Discord = require("discord.js");
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
calistir: async(client, message, args) => {
	if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`:x: Bunu yapabilmek için yetkin yok!`)

    message.guild.bans.fetch()
        .then(b => {
			if(b.size === 0) return message.reply({content: `**Açılacak ban yok!**`});
			message.reply({content: `**Banlar açılıyor. \nToplam açılan: ${b.size} kişi.**`})
			b.forEach(ban => {
				message.guild.members.unban(ban.user.id)
			})
        })
},

name: "tunban",
description: "",
aliases: [],
kategori: "",
usage: "",
}