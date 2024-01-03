const Discord = require("discord.js");
const mysql = require("mysql");
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
calistir: async(client, message, args) => {
if(message.author.id == "" || message.author.id == ""){
	if (isNaN(args[1])) return message.reply(":x: Sadece sayı girebilirsin.");
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'vatanyedek'
});

var sorgu = connection.query(`SELECT * FROM characters WHERE charactername = '${args[0]}'`);
sorgu.on('result',function(row){
	var money = row['money'];
	var chName = row['charactername'];
	connection.connect(function (err) {
		if(!chName) return;
		let eklencekBakiye = Number(args[1])+Number(money)
		let sqlSorgusu = `UPDATE characters SET money = '${eklencekBakiye}' WHERE charactername = '${args[0]}'`;
		  connection.query(sqlSorgusu, function (err, results) {
				const logEmbed = new Discord.MessageEmbed()
				.setColor("WHITE")
				.setDescription(`${message.author} tarafından **${chName}** isimli karaktere **${args[1]}₺** para verildi. \nKarakterin güncel parası: **${eklencekBakiye.toLocaleString()}**`)
				.setTimestamp()
			message.channel.send({embeds: [logEmbed]})	
			client.channels.cache.get("1085173021981036704").send({embeds: [logEmbed]})			
		  });
	});
})
};
},

name: "givemoney",
description: "",
aliases: [],
kategori: "",
usage: "",
}