const Discord = require("discord.js");
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
calistir: async(client, message, args) => {
		if(!db.has(`talepaçtı_${message.channel.id}`)) return;
		
		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('TicketKapat')
		.setLabel('Kapat')
		.setEmoji("927230398658932768")
		.setStyle('DANGER'),	
		);		
		message.reply({content:"Destek talebini kapatmak için butona basınız", components: [row]}) 
},

name: "tkapat",
description: "",
aliases: [],
kategori: "",
usage: "",
}