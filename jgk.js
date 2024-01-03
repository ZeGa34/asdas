const Discord = require("discord.js");
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
calistir: async(client, message, args) => {
	if (message.member.roles.cache.has("") || message.member.permissions.has("ADMINISTRATOR")){
		if(!args[0]) return message.reply(":x: Duyuru içeriğinizi girin.");
	let mesaj = message.content.substring(message.content.indexOf(" ") + 1, message.content.length);	
		const jgkEmbed = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setTitle("Jandarma Genel Müdürlüğü")
		.setThumbnail("https://www.jandarma.gov.tr/kurumlar/jandarma.gov.tr/Jandarma/kurumsal-kimlik/JANDARMA-GENEL-KOMUTANLIGI.png")
		.setDescription(mesaj)
		.setFooter({text: message.author.tag, iconURL: message.author.avatarURL({dynamic: true})})
		message.channel.send({content: "@everyone", embeds:[jgkEmbed]})
		message.delete()
	}else return message.reply(":x: Yetkiniz yok.")
},

name: "jgk",
description: "",
aliases: [],
kategori: "",
usage: "",
}