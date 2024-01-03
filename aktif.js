const Discord = require("discord.js");
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
calistir: async(client, message, args) => {
if (message.member.permissions.has("ADMINISTRATOR")){
	const aktifEmbed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setTitle("**Sunucumuz sorunsuz şekilde aktif edilmiştir. \nAktif olan herkesi sunucumuza bekliyoruz. \nSunucu IP Adresimiz: '193.223.107.175'**")
		.setThumbnail(client.user.avatarURL({dynamic: true, type: 'png'}))
		.setImage("https://media.discordapp.net/attachments/880810605773209691/912324845121990726/aktif.gif")
		.setTimestamp()
		message.channel.send({content: "||@everyone||", embeds: [aktifEmbed]})
}else return message.reply(`:x: Bunu yapabilmek için yetkin yok!`)		
},

name: "aktif",
description: "",
aliases: [],
kategori: "",
usage: "",
}