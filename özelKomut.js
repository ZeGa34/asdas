const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const db = require('nrc.db');
const { readdirSync } = require("fs"); 
module.exports = {
calistir: async(client, message, args, prefix) => {
	// if (!message.member.permissions.has("ADMINISTRATOR")) return;
	if (message.author.id !== "") return;
	if(args[0] == "ekle"){
		if(!args[1]) return message.reply("Lütfen bir komut girin.")
			const isCommandExists = client.commands.get(args[1]) || client.commands.get(client.aliases.get(args[1]));
			if(isCommandExists) return message.reply(`**${args[1]}** isimli komut botunuzda bulunuyor.`)
		if(!args[2]) return message.reply("Lütfen bir rol etiketleyin.")
		let özelKomut = args[1]
		let özelRol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
		if(db.has(`özelKomutlar_{message.guild.id}`)){
			db.push(`özelKomutlar_{message.guild.id}`, özelKomut)
			db.set(`${özelKomut}_${message.guild.id}`, özelRol.id)
		}else{
			db.set(`özelKomutlar_{message.guild.id}`, [özelKomut])
			db.set(`${özelKomut}_${message.guild.id}`, özelRol.id)
		}
		message.reply(`${prefix}${özelKomut} komutu oluşturuldu, vereceği rol: **${özelRol.name}**`)
	}else if(args[0] == "sil"){
		if(!args[1]) return message.reply(`Silmek istediğiniz özel komutu giriniz.`)
		if(db.has(`özelKomutlar_{message.guild.id}`)){
		let özelKomut = args[1]
		if(!db.fetch(`özelKomutlar_{message.guild.id}`).includes(özelKomut)) return;
		db.arrayDeleteVal(`özelKomutlar_{message.guild.id}`, özelKomut)
		db.delete(`${özelKomut}_${message.guild.id}`)
		message.reply(`Başarılı şekilde ${özelKomut} komutu silindi.`)
		}else return message.reply(`Sunucunuzda özel komut bulunmuyor.`)
	}else if(args[0] == "göster"){
		if(db.has(`özelKomutlar_{message.guild.id}`)){
			let özelKomutlarım = db.fetch(`özelKomutlar_{message.guild.id}`)
			const embed = new MessageEmbed()
			.setColor("WHITE")
			.setTitle(`Sunucunuzda bulunan özel komutlar;`)
			.setThumbnail(client.user.avatarURL())
			.setDescription(`**${String(özelKomutlarım.join(`,\n`))},**`)
			.setFooter({text: `${message.author.tag}, tarafından kullanıldı.`, iconURL: message.author.avatarURL({dynamic: true})})
			message.reply({embeds: [embed]})
		}
	}else return message.reply(`${prefix}özel-komut (ekle/sil/göster)`)
},

name: "özelkomut",
description: "",
aliases: ['ök', 'özel-komut'],
kategori: "",
usage: "",
}