const Discord = require("discord.js");
const mysql = require("mysql")
const db = require("nrc.db")
const {MessageActionRow, MessageSelectMenu } = require("discord.js")
module.exports = {
calistir: async(client, message, args) => {
	if(!message.member.permissions.has("ADMINISTRATOR")) return;
	if(!args[0]) return message.reply({content: "**Login adı giriniz.**"});
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'vatanyedek'
});
let nArray = [];
let karakters = "Karakterler Yüklenemedi"
message.reply({embeds: [new Discord.MessageEmbed().setColor("RANDOM").setDescription(`<a:loading3:934004283744092200> **Karakterler Yükleniyor.**`).setFooter({text: `${message.author.tag}, tarafından kullanıldı.`, iconURL: message.author.avatarURL({dynamic: true})})]}).then(msg =>{
sorgu = connection.query(`SELECT * FROM accounts WHERE username = '${args[0]}'`)
sorgu.on('result',function(row){
		var karakterID = row['id'];
		var kullanıcıAdı = row['username'];
			var sorgu3 = connection.query('SELECT * FROM `characters` WHERE `account` = '+karakterID);
			sorgu3.on('result',function(row3){
			var names = row3['charactername']
			nArray.push(names)	
			karakters = nArray.join(":\n")	
			})	
setTimeout(function(){
	if(nArray.length == 0) return msg.edit({embeds: [new Discord.MessageEmbed().setColor("RANDOM").setDescription(`<:X_:934004283202998302> **Bu hesaba bağlı karakter bulunamadı.**`).setFooter({text: `${message.author.tag}, tarafından kullanıldı.`, iconURL: message.author.avatarURL({dynamic: true})})]})
		const gurluRow = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Seçim Yapılmadı')
					.setMinValues(1)
					.setMaxValues(1)
					.addOptions([nArray.map(value => ({
								label: value,
								value: value,
								emoji: "961453615753625640",
							}))
					
					])
			);		
const karakterlerEmbed = new Discord.MessageEmbed()
.setColor("WHITE")
.setTitle(`${kullanıcıAdı} hesabına bağlı ${nArray.length} karakter listelendi.`)
.setDescription(`**__${karakters}:__**`)
.setThumbnail(client.user.avatarURL())
.setFooter({text: `${message.author.tag} tarafından kullanıldı.`, iconURL: message.author.avatarURL({dynamic: true})})
.setImage("https://i.hizliresim.com/6e8xy6b.png")
msg.edit({embeds: [karakterlerEmbed], components: [gurluRow], ephemerel: true})	
}, 2000)						
})
})

//INTERACTION

},

name: "karakterler",
description: "",
aliases: [],
kategori: "",
usage: "",
}