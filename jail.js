const Discord = require("discord.js");
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
calistir: async(client, message, args) => {
    if (message.member.roles.cache.has("") || message.member.permissions.has("ADMINISTRATOR")){
    let kişi = message.mentions.users.first() || client.users.cache.get(args[0])
    let reason = args.slice(1).join(' ');
        if(!kişi) return message.reply("Kimi jaile göndereceğimi söylemedin!");
        if(!reason) reason = "Sebepsiz"
		 if (message.guild.members.cache.get(kişi.id).permissions.has("MANAGE_GUILD")) return message.channel.send({embeds: [new Discord.MessageEmbed().setColor("RED").setDescription("**Bu komutu yetkililer üzerinde kullanamazsın.**.")]})
            const roles = message.guild.members.cache.get(kişi.id).roles.cache.map(role => role)
			roles.forEach(r => {
				if (r.id === message.guild.id) return;
				if (r.id === "797454452747141152") return;
             message.guild.members.cache.get(kişi.id).roles.remove(r.id)
            })
            db.set(`jail_${kişi.id}`, 'gurluJail')
            db.set(`jailReason_${kişi.id}`, reason)
            db.set(`jailYetkili_${kişi.id}`, message.author.tag)
            message.guild.members.cache.get(kişi.id).roles.add("887423154719449149")
            const embed = new Discord.MessageEmbed()
            .setColor("BLACK")
            .setAuthor({name: message.author.tag, iconURL: message.author.avatarURL()})
            .setDescription(`Al işte! Yine biri jaile yollandı.`)
            .addField(`**Mahkum:**`, kişi.tag, true)
            .addField(`**Hakim:**`, message.author.tag, true)
            .addField(`**Sebep:**`, reason, true)
            .setThumbnail(client.user.avatarURL({dynamic: true, type: 'png'}))
            .setTimestamp()
            message.guild.channels.cache.get("886355155656769547").send({embeds:[embed]})
	message.channel.send(`${kişi} isimli kişi başarıyla hapishaneye gönderildi.`)
	}else return message.reply(`:x: Bunu yapabilmek için yetkin yok!`)		
},

name: "jail",
description: "",
aliases: [],
kategori: "",
usage: "",
}