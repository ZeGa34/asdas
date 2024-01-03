const Discord = require("discord.js");
const {MessageActionRow, MessageButton} = require("discord.js")
const Yargıç = [
"856438087365427220",
]
module.exports = {
calistir: async(client, message, args) => {
	if (Yargıç.includes(message.author.id)){
  let guild = message.guild
  let user = message.mentions.users.first() || client.users.cache.get(args[0])
  if(!user) return message.reply({embeds: [new Discord.MessageEmbed().setColor("RED").setTitle("**Kime?**")]});
  message.guild.members.ban(user, { reason: `${message.author.tag} tarafından YARGI.` });
  const embed = new Discord.MessageEmbed()
    .setColor("ff0000")
    .setDescription(`**${user.username}** sunucudan yasaklandı! "**YARGI**"`)
    .setImage("https://images-ext-1.discordapp.net/external/JBpktfC8xVK733m3WT4hUN8fsAB23_Nvup_rzDH0PMU/https/media.discordapp.net/attachments/939099909892763688/959192053865144391/73c458c4d46de0d20bd952c358e97e15.gif");
message.reply({embeds: [embed]})
}		
},

name: "yargı",
description: "",
aliases: ['siktir', 'sg', 'q'],
kategori: "",
usage: "",
}