const Discord = require("discord.js");
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
calistir: async(client, message, args) => {
	if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply({embeds: [new Discord.MessageEmbed().setColor("ff0000").setDescription(`:x: Bunu yapabilmek için yetkin yok!`)]})
		if(!db.has(`${message.guild.id}_${message.author.id}_banYetki`)) return message.reply({embeds: [new Discord.MessageEmbed().setColor("ff0000").setDescription(`:x: Bunu yapabilmek için yetkin yok!`)]})
	if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
	const yetkimyok = new Discord.MessageEmbed()
	.setDescription("**❌ `Üyeleri Engelle` İznine Sahip Olmalıyım!**")
	.setColor("RED")
	return message.reply({embeds: [yetkimyok]})
	}
  if (!args[0]) return message.reply({embeds:[new Discord.MessageEmbed().setThumbnail(client.user.avatarURL()).setColor("RED").setDescription("Geçersiz komut, şu şekilde kullanmayı deneyin:\n `.ban [member] (optional reason)`\n\nArgümanlar:\n`member`: *Kullanıcıdan bahset (@Kişi) veya kullanıcı ID'sini yazın*\n(879742285456220182)\n`reason`: *Metin (boşluk içerebilir)*")]});   
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first() || await client.users.fetch(args[0])
	  if (!reason) reason = "Sebep Belirtilmemiş"
	if(message.guild.members.cache.get(user.id)){
		if (message.guild.members.cache.get(user.id).permissions.has("BAN_MEMBERS")) return message.reply({embeds: [new Discord.MessageEmbed().setColor("RED").setDescription(":x: Ban komutunu bir moderatör üzerinde kullanamazsın.")]})
	}
	message.guild.members.ban(user,{ reason: `${message.author.tag} tarafından ${reason}.` });
  const embed = new Discord.MessageEmbed()
    .setColor("BLACK")
	.setAuthor({ name: `${user.tag} sunucudan yasaklandı! "${reason}!"`, iconURL: user.avatarURL({dynamic: true})})
    .setImage("https://c.tenor.com/1opA46zjv90AAAAC/banned.gif");
	message.reply({embeds: [embed]})		
},

name: "ban",
description: "",
aliases: [],
kategori: "",
usage: "",
}