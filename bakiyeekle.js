const Discord = require("discord.js");
const mysql = require("mysql");
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
calistir: async(client, message, args) => {
if(message.author.id == "856438087365427220" || message.author.id == ""){ 
	if (isNaN(args[1])) return message.reply(":x: Sadece sayı girebilirsin.");
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'vatanyedek'
});

var sorgu = connection.query(`SELECT * FROM accounts WHERE username = '${args[0]}'`);
sorgu.on('result',function(row){
	var bakiye = row['bakiye'];
	var acName = row['username'];
	connection.connect(function (err) {
		if(!acName) return;
		let eklencekBakiye = Number(args[1])+Number(bakiye)
		let sqlSorgusu = `UPDATE accounts SET bakiye = '${eklencekBakiye}' WHERE username = '${args[0]}'`;
		  connection.query(sqlSorgusu, function (err, results) {
				const logEmbed = new Discord.MessageEmbed()
				.setColor("WHITE")
				.setThumbnail("https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/ca3f5dc6a7ab4a222b0f1ad100a88b8c/large.gif")
				.setDescription(`${message.author} tarafından **${acName}** isimli hesaba **${args[1]}₺** bakiye eklendi. \nHesabın güncel bakiyesi: **${eklencekBakiye.toLocaleString()}**`)
				.setTimestamp()
			message.channel.send({embeds: [logEmbed]})					
			client.channels.cache.get("1085173021981036704").send({embeds: [logEmbed]})
		  });
	});
})
};
},

name: "bakiyeekle",
description: "",
aliases: [],
kategori: "",
usage: "",
}