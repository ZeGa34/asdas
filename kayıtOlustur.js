const Discord = require("discord.js");
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
    calistir: async(client, message, args) => {

    if(message.author.id !== "856438087365427220") return message.reply(`Bu komudu kullanmak için yetkin yok`)
		const menu = new Discord.MessageEmbed()
		.setColor("ffffff")
		.setDescription(`Sunucumuza Hoşgeldiniz Discord Adresine Kayıt Olmak İçin <a:onay:818602184957493269> Emojisine Basmanız Yeterlidir`)
		.setImage(message.guild.iconURL({dynamic: true, type: 'png', size: 1024}))
		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('U4RoleplayKayıt')
		.setEmoji("818602184957493269")
		.setStyle('SECONDARY'),	
		);
		message.channel.send({
			embeds: [menu], components: [row]
		});
},

name: "kayıt",
description: "",
aliases: [],
kategori: "",
usage: "",
}