const Discord = require("discord.js");
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
    calistir: async(client, message, args) => {

    if(message.author.id !== "856438087365427220") return message.reply(`Bu komudu kullanmak için yetkin yok`)
		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('intBasvuru')
		.setLabel('İnterior Başvuru')
		.setEmoji("875148679722459196")
		.setStyle('PRIMARY'),	
		);
		message.channel.send({
			content:"**İnterior başvurusu yapmak için aşağıdaki butona basınız. Önününze gelen paneli doldurup gönderiniz.**", components: [row]
		});
},

name: "intbas",
description: "",
aliases: [],
kategori: "",
usage: "",
}