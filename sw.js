const Discord = require("discord.js");
const db = require("nrc.db")
const Gamedig = require("gamedig")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
calistir: async(client, message, args) => {
    Gamedig.query({
    type: 'mtasa',
    host: '213.238.177.161',
    }).then((state) => {
	const embed = new Discord.MessageEmbed()
	.setColor("WHITE")
	.setTitle("U4 Roleplay | Sunucu Bilgileri")
	.setDescription(`**Aktif "${state.raw.numplayers}" Oyuncu** \nSunucu IP: 213.238.177.161:22003 \nDiscord: https://discord.gg/u4rp`)
	.setThumbnail(client.user.avatarURL())
	.setFooter({text: `${message.author.tag} Tarafından Kullanıldı`, iconURL: message.author.avatarURL({dynamic: true})})
	.setTimestamp()		
	message.reply({embeds:[embed]}).then(msg =>{ 
	setTimeout(() =>{ 
	if(msg){
	msg.delete()}
	}, 10000)})	
    })			
},

name: "sunucu",
description: "",
aliases: ['sw', 'ip'],
kategori: "",
usage: "",
}