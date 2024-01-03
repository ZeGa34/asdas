const Discord = require("discord.js");
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
calistir: async(client, message, args) => {
	if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`:x: Bunu yapabilmek için yetkin yok!`)
	if(!db.has(`${message.guild.id}_${message.author.id}_banYetki`)) return message.reply({embeds: [new Discord.MessageEmbed().setColor("ff0000").setDescription(`:x: Bunu yapabilmek için yetkin yok!`)]})
	let ban = await message.guild.bans.fetch();
	
	let unbanEmbed = new Discord.MessageEmbed()
	let id = args[0]
	if(!id){
		unbanEmbed.setColor("RED")
		unbanEmbed.setDescription("Lütfen bir user ID giriniz.")
		return message.channel.send({embeds: [unbanEmbed]})	
	}
    if (!ban.get(id)) {
      let notbannedembed = new Discord.MessageEmbed()
        .setDescription("<:megafon:812623149602308117> Kullanıcı yasaklanmadı veya böyle bir kişi yok!")
        .setColor("RED");
      message.channel.send({embeds: [notbannedembed]});

      return;
    }	
	if(message.guild.members.unban(id)){
		let kisi = await client.users.fetch(id)
		unbanEmbed.setColor("GREEN")
		unbanEmbed.setAuthor({ name: `${kisi.tag} adlı kullanıcının yasaklanması kaldırıldı`, iconURL: kisi.avatarURL({dynamic: true}) })
	} else {
		unbanEmbed.setDescription("Başarısız giden bir şeyler oldu.")
		message.channel.send({embeds: [unbanEmbed]})
	}
	message.channel.send({embeds: [unbanEmbed]})		
},

name: "unban",
description: "",
aliases: [],
kategori: "",
usage: "",
}