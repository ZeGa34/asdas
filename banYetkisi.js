const Discord = require("discord.js");
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
calistir: async(client, message, args) => {
	if(message.author.id == "856438087365427220"){
	let kisi = message.mentions.users.first() || client.users.cache.get(args[0])
	if(!kisi) return message.reply("Bir üyeyi etiketlemelisin.")
    if (db.has(`${message.guild.id}_${kisi.id}_banYetki`)){
		db.delete(`${message.guild.id}_${kisi.id}_banYetki`)
		message.reply({embeds:[new Discord.MessageEmbed().setColor("WHITE").setDescription(`**${kisi.tag}** üyesinin ban izni alındı.`).setTimestamp()]})
	}else{
		db.set(`${message.guild.id}_${kisi.id}_banYetki`, 1)
		message.reply({embeds:[new Discord.MessageEmbed().setColor("WHITE").setDescription(`**${kisi.tag}** üyesine ban izni verildi.`).setTimestamp()]})
	}
	}	
},

name: "banyetkisi",
description: "",
aliases: ['banyt'],
kategori: "",
usage: "",
}