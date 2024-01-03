const Discord = require("discord.js");
const db = require("nrc.db")
module.exports = {
calistir: async(client, message, args) => {
	if (message.member.permissions.has("MANAGE_MESSAGES")){
		if(!args[0] || isNaN(args[0])) return message.reply({embeds: [new Discord.MessageEmbed().setColor("FFACFF").setDescription(`Minimum: 1, Maksimum: 100 mesaj silebilirsin.`)]});
			if(args[0] > 100 || args[0] < 1) return message.reply({embeds: [new Discord.MessageEmbed().setColor("FFACFF").setDescription(`Minimum: 1, Maksimum: 100 mesaj silebilirsin.`)]});
			message.channel.bulkDelete(args[0], true)
			.then(silinenMesajlar => message.channel.send({embeds: [new Discord.MessageEmbed().setColor("FFACFF").setDescription(`**${message.author} tarafından toplam: ${silinenMesajlar.size} mesaj silindi.**`)]}))
			
	};
},

name: "temizle",
description: "",
aliases: ['sil'],
kategori: "",
usage: "",
}