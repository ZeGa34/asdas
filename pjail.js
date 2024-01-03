const Discord = require("discord.js");
const db = require("nrc.db")
const mysql = require('mysql');
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
calistir: async(client, message, args) => {
if(message.author.id == "" || message.author.id == ""){
	if (isNaN(args[1])) return message.reply(":x: Jail süresi sadece sayı olabilir.");
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'vatanyedek'
});

if(isNaN(args[0])){
	sorgu = connection.query(`SELECT * FROM characters WHERE charactername = '${args[0]}'`)
}else{
	sorgu = connection.query(`SELECT * FROM characters WHERE maskeno = '${args[0]}'`)
}
sorgu.on('result',function(row){
	var dbid = row['account'];
	var chName = row['charactername'];
		var sorgu2 = connection.query(`SELECT * FROM accounts WHERE id = '${dbid}'`);
		sorgu2.on('result',function(row2){
			var username = row2['username'];
	connection.connect(function (err) {
		if(!chName) return;
		let sqlSorgusu = `UPDATE accounts SET adminjail = '1', adminjail_time = '${args[1]}', adminjail_reason = '${args[2]}', adminjail_by = 'Discord' WHERE username = '${username}'`;
		  connection.query(sqlSorgusu, function (err, results) {
				const logEmbed = new Discord.MessageEmbed()
				.setColor("WHITE")
				.setDescription(`${message.author} tarafından **${chName}**(${username}) kişisine **${args[1]}** dakika jail atıldı.`)
				.setTimestamp()
			message.channel.send({embeds: [logEmbed]})	
			client.channels.cache.get("922502581912227871").send({embeds: [logEmbed]})		
		  });
	});
})
})
};		
},

name: "pjail",
description: "",
aliases: [],
kategori: "",
usage: "",
}