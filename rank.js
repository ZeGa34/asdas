const moment = require("moment")
require("moment-duration-format")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
let levels = 1234
module.exports = {
calistir: async(client, message, args) => {
let stats = await db.get("stats." + message.guild.id);
    let response = "";
    const user = message.mentions.users.first() || message.author
	if(args[0] == "level"){
      if(!stats) return;
      Object.entries(stats).forEach(([id, value]) => {client.stats.set(id, value.level?value.level:0 ) });
      client.stats.sort();
      client.stats.reverse();
      let sayi = 0
      let top10 = await client.stats.map((value, key) => `**\`#${sayi++<9?"0"+sayi:sayi}\`** | <@${key}> \` ${value} level\``).slice(0, 10).join("\n");
      response = `:gem: **__TOP 10 LEVEL LİSTESİ__** 
${top10}
`;
      message.reply({
      embeds: [
        {
          color: "#2f3136",
          description: response,
          author:{
            name: "Sunucu Puan Tabloları",
            icon_url: message.guild.iconURL({dynamic: true})
          },
		  thumbnail: {
			url: client.user.avatarURL({size: 4096})
		  },		  
          footer: { 
            text:`${message.author.tag} tarafından istendi.`,
            icon_url: message.author.avatarURL({dynamic:true})
          }
        }
      ],repliedUser: false
    })
    }else if(args[0] == "ses"){
      if(!stats) return;
      Object.entries(stats).forEach(([id, value]) => {client.stats.set(id, value.voice?value.voice:0 ) });
      client.stats.sort();
      client.stats.reverse();
      let sayi = 0
      let top10 = await client.stats.map((value, key) => `**\`#${sayi++<9?"0"+sayi:sayi}\`** | <@${key}> \` ${moment.utc(value).format("HH:mm:ss")} saat\``).slice(0, 10).join("\n");
      response = `:gem: **__TOP 10 SES LİSTESİ__** 
${top10}
`;
      message.reply({
      embeds: [
        {
          color: "#2f3136",
          description: response,
          author:{
            name: "Sunucu Puan Tabloları",
            icon_url: message.guild.iconURL({dynamic: true})
          },
		  thumbnail: {
			url: client.user.avatarURL({size: 4096})
		  },		  
          footer: { 
            text:`${message.author.tag} tarafından istendi.`,
            icon_url: message.author.avatarURL({dynamic:true})
          }
        }
      ],repliedUser: false
    })
    }else if(args[0] == "mesaj"){
      if(!stats) return;
      Object.entries(stats).forEach(([id, value]) => {client.stats.set(id, value.msg?value.msg:0 ) });
      client.stats.sort();
      client.stats.reverse();
      let sayi = 0
      let top10 = await client.stats.map((value, key) => `**\`#${sayi++<9?"0"+sayi:sayi}\`** | <@${key}> \` ${value} mesaj\``).slice(0, 10).join("\n");
      response = `:gem: **__TOP 10 MESAJ LİSTESİ__** 
${top10}
`;
      message.reply({
      embeds: [
        {
          color: "#2f3136",
          description: response,
          author:{
            name: "Sunucu Puan Tabloları",
            icon_url: message.guild.iconURL({dynamic: true})
          },
		  thumbnail: {
			url: client.user.avatarURL({size: 4096})
		  },		  
          footer: { 
            text:`${message.author.tag} tarafından istendi.`,
            icon_url: message.author.avatarURL({dynamic:true})
          }
        }
      ],repliedUser: false
    })
    }else {
      if(user.bot) return message.reply({content: "‼️ **Botların bilgileri kayıt edilmemektedir.**"});
		if(!stats[user.id]) return message.reply({content:"‼️ **Kullanıcı bilgisi bulunamadı.**"});
      if(!stats[user.id].voice) stats[user.id].voice = 0
      response = `**__${user.tag} üyesine ait istatistik tablosu;__**\n:trophy: **Seviye :** \`${stats[user.id].level}\`\n:speech_balloon: **Mesaj Sayısı :** \`${stats[user.id].msg}\`\n:microphone2: **Ses Saati :** \`${moment.utc(stats[user.id].voice).format("HH:mm:ss")}\`\n:gem: **Toplam XP :** \`${stats[user.id].xp}\`\n:diamonds: **Geren XP :** \`${(levels*stats[user.id].level-stats[user.id].xp)}\``;
      message.reply({
      embeds: [
        {
          color: "#2f3136",
          description: response,
          author:{
            name: "Kullanıcı Puan Tablosu",
            icon_url: message.guild.iconURL({dynamic: true})
          },
          footer: { 
            text:`${message.author.tag} tarafından istendi.`,
            icon_url: message.author.avatarURL({dynamic:true})
          },
          timestamp: new Date()
        } 
      ]
    }) 
    } 
},

name: "rank",
description: "",
aliases: ['level'],
kategori: "",
usage: "",
}