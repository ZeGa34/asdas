const Discord = require("discord.js");
module.exports = {
calistir: async(client, message, args) => {
	if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`:x: Bunu yapabilmek için yetkin yok!`)

    let kullanici = args[0];
    if (!kullanici) return message.channel.send("Banlanan Bir kullanıcının ID'sini belirtmen gerek")
    message.guild.bans.fetch()
        .then(bans => {
            if (!bans.has(kullanici)) {
                message.channel.send(`Bu kullanıcı banlanmamış.`)
            }else{
				message.guild.bans.fetch(kullanici).then(({ user, reason }) => {
				const Embed = new Discord.MessageEmbed()
				.setColor('#FFD100')
				.setAuthor({ name: 'Vatan Roleplay | Ban Sorgulama', iconURL: client.user.avatarURL()})
				.setDescription(`**${user.tag}** adlı kullanıcının ban nedeni: \n**${reason || "Neden Belirtilmemiş"}**`)
				message.reply({embeds: [Embed]})
				})						
			}
        })
},

name: "bansorgu",
description: "",
aliases: [],
kategori: "",
usage: "",
}