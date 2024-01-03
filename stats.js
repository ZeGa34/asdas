const Discord = require("discord.js");
const mysql = require("mysql");
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
calistir: async(client, message, args) => {
	if (!message.member.permissions.has("ADMINISTRATOR")) return;

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'vatanyedek'
});
let nArray = [];
let nArray2 = [];
let evler = "Sahip Olduğu Her Hangi Bir Mülk Yok"
let araclar = "Sahip Olduğu Her Hangi Bir Araç Yok"
	const statsEmbed = new Discord.MessageEmbed()
	if(isNaN(args[0])){
		sorgu = connection.query(`SELECT * FROM characters WHERE charactername = '${args[0]}'`)
	}else{
		sorgu = connection.query(`SELECT * FROM characters WHERE maskeno = '${args[0]}'`)
	}

sorgu.on('result',function(row){
	var karakterID = row['id'];
	if(!karakterID) return message.channel.send(":x: **Sanırım Böyle Bir Karakter Yok!**");	
	var isim = row['charactername'];
	var saat = row['hoursplayed'];
	var level = row['level'];
	///
	var para = row['money'];
	var bankapara = row['bankmoney'];
	////
	var sağlık = row['health'];
	var karapara = row['karapara'];
	var maske = row['maskeno'];
	var karakterTip = row['karakter_tip'];
	var silahKullanım = row['silah'];
	var m4 = row['m4'];
	var silahhak = row['silahhak'];
		if(karakterTip === 0){karakterTip = "Legal"}else{karakterTip = "İl-Legal"}
	var torbaci = row['torbaci'];
		if(torbaci === 0){torbaci = "Yok"}else{torbaci = "Var"}
	var emlakci = row['emlakci'];
		if(emlakci === 0){emlakci = "Yok"}else{emlakci = "Var"}		
	var acID = row['account'];
	var sorgu2 = connection.query(`SELECT * FROM accounts WHERE id = '${acID}'`);
	sorgu2.on('result',function(row2){
		var kadı = row2['username'];
		var bakiye = row2['bakiye'];
	statsEmbed.setColor("YELLOW")
	statsEmbed.setAuthor({name :`${isim}, Karakter/Hesap Bilgileri`, iconURL: message.guild.iconURL({dynamic: true})})
	statsEmbed.addField("Kullanıcı Adı:", "```"+kadı+"```", true)
	statsEmbed.addField("Oynama Saati:", "```"+saat.toLocaleString()+"```", true)
	statsEmbed.addField("Level:", "```"+level.toLocaleString()+"```", true)
	statsEmbed.addField("Para:", "```"+para.toLocaleString()+"```", true)
	statsEmbed.addField("Banka Parası:", "```"+bankapara.toLocaleString()+"```", true)
	statsEmbed.addField("Bakiye:", "```"+bakiye.toLocaleString()+"```", true)
	statsEmbed.addField("Sağlık:", "```"+sağlık+"%```", true)
	statsEmbed.addField("KaraPara:", "```"+karapara.toLocaleString()+"```", true)
	statsEmbed.addField("Maske NO:", "```"+maske+"```", true)	
	statsEmbed.addField("Karakter Tip:", "```"+karakterTip+"```", true)	
	statsEmbed.addField("Torbacı:", "```"+torbaci+"```", true)	
	statsEmbed.addField("Emlakçı:", "```"+emlakci+"```", true)	
	statsEmbed.addField("Silah Kullanım(Rifle):", "```"+silahKullanım+"```", true)	
	statsEmbed.addField("Silah Kullanım(M4):", "```"+m4+"```", true)	
	statsEmbed.addField("Silah Hak):", "```"+silahhak+"```", true)	
	statsEmbed.setFooter({text:`${message.author.username} tarafından istendi.`, iconURL: message.author.avatarURL({dynamic: true})});
			var sorgu3 = connection.query('SELECT * FROM `vehicles` WHERE `owner` = '+row['id']);
			sorgu3.on('result',function(row3){
			var id = row3['id']
			nArray.push(id)	
			araclar = nArray.join(", ")	
			
});
			var sorgu4 = connection.query('SELECT * FROM `interiors` WHERE `owner` = '+row['id']);
			sorgu4.on('result',function(row4){
			var intID = row4['id']
			nArray2.push(intID)	
			evler = nArray2.join(", ")				
});
});
setTimeout(function(){
statsEmbed.addField("Sahip Olduğu Araçlar;", "```"+araclar+"```")
statsEmbed.addField("Sahip Olduğu Mülkler;", "```"+evler+"```")
message.reply({embeds: [statsEmbed]})	
}, 100)
});		
},

name: "stats",
description: "",
aliases: [],
kategori: "",
usage: "",
}