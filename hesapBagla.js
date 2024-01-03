const Discord = require("discord.js");
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
calistir: async(client, message, args) => {
	if(!args[0]) return message.reply(":x: Lütfen hesabınız için tanımlanmış olan kodu giriniz.");
	if(db.has(`hesabıBağlı_${message.author.id}`)) return message.reply(":x: Zaten hesap bağlantısı yapmışsınız.")
		if(message.author.id == "803750101024768041" && args[0] == "652489"){
		db.set(`hesabıBağlı_${message.author.id}`, "Bağlı")
		message.reply(":o: Başarılı şekilde hesabınızı bağladınız.")
		}
		
},

name: "bağlan",
description: "",
aliases: [],
kategori: "",
usage: "",
}