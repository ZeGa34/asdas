const Discord = require("discord.js");
const mysql = require("mysql");
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
yetkisiOlanlar = [
"",
"",
"",
"",
"",
"",
]
module.exports = {
calistir: async(client, message, args) => {
if(yetkisiOlanlar.includes(message.author.id)){
	if (isNaN(args[1])) return message.reply(":x: Sadece sayı girebilirsin.");
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'vatanyedek'
});

var sorgu = connection.query(`SELECT * FROM accounts WHERE username = '${args[0]}'`);
sorgu.on('result',function(row){
	var acName = row['username'];
	connection.connect(function (err) {
		if(!acName) return;
		let rankSayı = Number(args[1])
			let rankısı = "Oyuncu"
			if(rankSayı == 0) rankısı = "Oyuncu"
			if(rankSayı == 1) rankısı = "Cezalı Admin"
			if(rankSayı == 2) rankısı = "Deneme Admin"
			if(rankSayı == 3) rankısı = "Stajyer Admin"
			if(rankSayı == 4) rankısı = "Kıdemli Admin"
			if(rankSayı == 5) rankısı = "Baş Admin"
			if(rankSayı == 6) rankısı = "Yönetim Ekibi"
			if(rankSayı == 7) rankısı = "Genel Yetkili"
			if(rankSayı == 8) rankısı = "Sunucu Sorumlusu"
			if(rankSayı == 9) rankısı = "Kıdemli Sunucu Sorumlusu"
			if(rankSayı == 10) rankısı = "Sunucu Sahibi"
			if(rankSayı < 0) rankısı = "Rehber"
			if(rankSayı < -5) return message.reply("Verilecek rank sayısı -5 den küçük olamaz");
			if(rankSayı > 10) return message.reply("Verilecek rank sayısı 8 den büyük olamaz");
		let sqlSorgusu = `UPDATE accounts SET admin = '${rankSayı}', adminduty = '0', hiddenadmin = '0' WHERE username = '${args[0]}'`;
		  connection.query(sqlSorgusu, function (err, results) {
				const logEmbed = new Discord.MessageEmbed()
				.setColor("WHITE")
				.setDescription(`${message.author} tarafından **${acName}** isimli hesabın yetkisi **${rankısı}** olarak ayarlandı.`)
				.setTimestamp()
			message.channel.send({embeds: [logEmbed]})				
			client.channels.cache.get("922491872017006652").send({embeds: [logEmbed]})
		  });
	});
})
};	
},

name: "makeadmin",
description: "",
aliases: [],
kategori: "",
usage: "",
}