const Discord = require("discord.js");
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
calistir: async(client, message, args) => {
   if (message.member.roles.cache.has("") || message.member.permissions.has("ADMINISTRATOR")){
    let kişi = message.mentions.users.first() || client.users.cache.get(args[0])
    if(!kişi) return message.reply("Bir kişiyi etiketlemelisin.")
		if(db.get(`jail_${kişi.id}`) == 'gurluJail'){
        let reason = db.get(`jailReason_${kişi.id}`) || "Belirtilmemiş"
        let yetkili = db.get(`jailYetkili_${kişi.id}`) || "Belirtilmemiş"
			const jailEmbed = new Discord.MessageEmbed()
			.setColor("GREEN")
			.setAuthor({name: `${kişi.username} kişisinin jail sebebi`, iconURL:kişi.avatarURL()})
			.setThumbnail(client.user.avatarURL({dynamic: true}))
			.addField("Yetkili", yetkili)
			.addField("Sebep", reason)
			.setFooter({text: `${message.author.tag} tarafından istendi.`, iconURL: message.author.avatarURL()})
			.setTimestamp()
			message.channel.send({embeds: [jailEmbed]})
			
		}else return message.reply(`:x: Bu kişi jail yememiş!`)
	}else  return message.reply(`:x: Bunu yapabilmek için yetkin yok!`)		
},

name: "jailbilgi",
description: "",
aliases: [],
kategori: "",
usage: "",
}