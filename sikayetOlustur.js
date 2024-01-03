const Discord = require("discord.js");
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
    calistir: async(client, message, args) => {

    if(message.author.id !== "856438087365427220") return message.reply(`Bu komudu kullanmak için yetkin yok`)
		const menu = new Discord.MessageEmbed()
    .setColor("ffffff")
	.setTitle("U4 Roleplay | Destek Talebi")
    .setDescription("```Merhaba arkadaşlar.\nOkul dolayısıyla yetkili kadromuz geç saatlere kadar aktif kalamıyor ve sabah erken giremiyor bu sebeple destek talebi saatleri 16.30’da açılacak ve 23.00’da kapanacaktır. Belirtilen saatler dışında açılan taleplerin yanıtlanması uzun sürebilir.\nBu süreçte anlayışlı olmanızı diliyorum. Sizleri seviyoruz.``` \n\n\nKurallar;\n**1  - Ticket açtığınız zaman lütfen **<@&1084841336676556940>** dışında bulunan rolleri etiketlemeyin.\n2 - Gereksiz ticket açanlara işlem uygulanacaktır.\n3 - Ticket üzerinden size yardımcı olmaya çalışan **<@&1084841336676556940>** arkadaşlara lütfen kibar bir dil kullanın.\n\nU4 Roleplay Yönetim Kadrosu**")
	.setImage("")
		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('şikayetGönder')
		.setLabel('Oyuncu Şikayetleri')
		.setEmoji("918593388159328326")
		.setStyle('SECONDARY'),
		new MessageButton()
		.setCustomId('donateSorular')
		.setLabel('Donate Soruları')
		.setEmoji("905527628860100610")
		.setStyle('SECONDARY'),
		new MessageButton()
		.setCustomId('diğerŞikayet')
		.setLabel('Diğer Şikayetler')
		.setEmoji("917865865783963658")
		.setStyle('SECONDARY'),		
		);
		message.channel.send({
			embeds: [menu], components: [row]
		});
},

name: "şikayet",
description: "",
aliases: [],
kategori: "",
usage: "",
}