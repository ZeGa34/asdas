const { Client, Intents, Collection, MessageAttachment, MessageEmbed, Permissions, Constants, ApplicationCommandPermissionsManager, MessageButton, MessageActionRow } = require('discord.js');
const Discord = require("discord.js");
const client = new Client({ intents: 32767 });
const db = require("nrc.db");
const mysql = require("mysql");
const discordTranscripts = require('discord-html-transcripts');
require("discord-reply");

const { token, logKanal, intKanal, botlistyetkilirol } = require("./config.json");

client.stats = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
require("./handlers/Events.js")(client);
require("./handlers/Level.js")(client);
require(`./utils/komutcalistirici`)(client);

client.on('guildBanAdd', async ban => {
	if(ban.guild.id !== "778236939668160523") return;
  let entry = await ban.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000) return;
  let banlayan = client.users.cache.get(entry.executor.id) 
	if(entry.executor.id === client.user.id) return;
  if(!db.has(`${ban.guild.id}_${banlayan.id}_banYetki`)){
	  ban.guild.members.ban(banlayan, {reason:`${client.user.tag} tarafından: BAN GUARD`});
	  ban.guild.members.unban(ban.user.id)
    let embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`**${banlayan.tag} ban izni olmadan ban attığı için yasaklandı. \n${ban.user.tag} kişisinin banı açıldı.**`)
	.setThumbnail(client.user.avatarURL())
    .setTimestamp()
    ban.guild.channels.cache.get("888427482666119268").send({embeds:[embed]})	  
  }
});
const güvenli = [
	"803750101024768041",
	"741691177270509639",
	"803750101024768041",
	"858845699252551740",
]
client.on("guildMemberUpdate", async (oldMember, newMember) => {
	if(oldMember.guild.id != "778236939668160523") return;
	let entry = await oldMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first())	
	if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000) return;
	let banlayan = client.users.cache.get(entry.executor.id); 	
	if(güvenli.includes(banlayan.id)) return;
		if (oldMember.roles.cache.size < newMember.roles.cache.size) {
			const Embed = new Discord.MessageEmbed();
			Embed.setColor("GREEN");
			newMember.roles.cache.forEach(role => {
				if (!oldMember.roles.cache.has(role.id)) {
					if(role.id !== "918591253770276874") return;
					Embed.setAuthor({name: newMember.user.tag+" Kişisine izinsiz rol verildi.", iconURL: newMember.user.avatarURL()})
					Embed.setDescription(`**Verilen rol:${role} | ${banlayan}, Sunucudan uzaklaştırıldı.**`)
					newMember.guild.members.ban(banlayan, {reason:`Rol Koruması`});
					client.channels.cache.get("886338452545753108").send({embeds: [Embed]});
					if(newMember) return newMember.roles.remove(role)
				}
			});
		}
		if (newMember.roles.cache.size < oldMember.roles.cache.size) {
			const Embed = new Discord.MessageEmbed();
			Embed.setColor("GREEN");
			oldMember.roles.cache.forEach(role => {
				if (!newMember.roles.cache.has(role.id)) {
					if(role.id !== "918591253770276874") return;
					Embed.setAuthor({name: newMember.user.tag+" Kişisinden izinsiz rol alındı.", iconURL: newMember.user.avatarURL()})
					Embed.setDescription(`**Alınan rol:${role} | ${banlayan}, Sunucudan uzaklaştırıldı.**`)
					newMember.guild.members.ban(banlayan, {reason:`Rol Koruması`});
					client.channels.cache.get("886338452545753108").send({embeds: [Embed]});
					if(newMember) return newMember.roles.add(role)
				}
			});
		}		
});
client.on("messageCreate", async message => {
	if(message.guildId != "778236939668160523") return;
	if(message.author.bot) return;
	if (!message.member.permissions.has("MANAGE_ROLES")) return;
	var args = message.content.split(/ +/g).slice(0);
	let özelKomutlar = db.fetch(`özelKomutlar_{message.guild.id}`) 
	let özelKomutum = message.content.substring(message.content.indexOf(".")+1, args[0].length);
	if(!özelKomutlar.includes(özelKomutum)) return;
	 if(message.content.startsWith(prefix)){
		 if(args[1]){
			user = message.mentions.users.first() || message.guild.members.cache.get(args[1]).user
		 }else{
			 user = message.mentions.users.first()
		 }
		if(user){
			let ayarlıRole = db.fetch(`${özelKomutum}_${message.guild.id}`)
			if(message.guild.members.cache.get(user.id).roles.cache.get(ayarlıRole)){
				message.guild.members.cache.get(user.id).roles.remove(ayarlıRole)
				message.reply({embeds: [new Discord.MessageEmbed().setColor("FF0000").setDescription(`**${user.tag}** kişisinden ${message.guild.roles.cache.get(ayarlıRole)} rolü alındı.`).setFooter({text: `${message.author.tag} tarafından kullanıldı.`, iconURL: message.author.avatarURL({dynamic: true})})]})
			}else{
				message.guild.members.cache.get(user.id).roles.add(ayarlıRole)
				message.reply({embeds: [new Discord.MessageEmbed().setColor("GREEN").setDescription(`**${user.tag}** kişisine ${message.guild.roles.cache.get(ayarlıRole)} rolü verildi.`).setFooter({text: `${message.author.tag} tarafından kullanıldı.`, iconURL: message.author.avatarURL({dynamic: true})})]})
			}
		}else return message.reply(`Birini etiketleyin.`)
	 }	
});


const { Modal, TextInputComponent, showModal } = require('discord-modals') 
const discordModals = require('discord-modals') 
discordModals(client); 
client.on('interactionCreate', async (interaction) => {
	if(interaction.customId === "şikayetGönder"){

const gurluModal = new Modal() 
.setCustomId('VatanOyuncuŞikayetleri')
.setTitle('Vatan Roleplay Şikayet Formu')
.addComponents(
  new TextInputComponent() 
  .setCustomId('sikayetci')
  .setLabel('IC adınız.')
  .setStyle('SHORT') 
  .setMinLength(5)
  .setMaxLength(32)
  .setPlaceholder('Osman_Gurlu')
  .setRequired(true)
)
.addComponents(
  new TextInputComponent() 
  .setCustomId('sikayetEdilen')
  .setLabel('Şikayetçi olduğunuz kişinin IC adı.')
  .setStyle('SHORT') 
  .setMinLength(5)
  .setMaxLength(32)
  .setPlaceholder('Dogukan_Aydin')
  .setRequired(true)
)
.addComponents(
  new TextInputComponent() 
  .setCustomId('olayÖrgüsü')
  .setLabel('Olayı detaylı bir şekilde anlatın.')
  .setStyle('LONG') 
  .setMinLength(5)
  .setMaxLength(500)
  .setPlaceholder('Olayı detaylı bir şekilde anlatın.')
  .setRequired(true)
)
.addComponents(
  new TextInputComponent() 
  .setCustomId('resimler')
  .setLabel('Şikayeti destekleyen görüntüler.')
  .setStyle('LONG') 
  .setMinLength(5)
  .setMaxLength(500)
  .setPlaceholder('Linkleri alt alta gönderiniz.')
  .setRequired(true)
)		
		showModal(gurluModal, {
			client: client, 
			interaction: interaction 
		  })
	}
	
	if(interaction.customId === "vrpReddet"){
		if(interaction.member.roles.cache.has(botlistyetkilirol) || interaction.member.permissions.has("ADMINISTRATOR")) {
	const redform = new Modal() 
	.setCustomId('vatan-roleplay-red-formu')
	.setTitle('Şikayet Red Sebep Formu')
	.addComponents(
	new TextInputComponent() 
	.setCustomId('red-sebep')
	.setLabel('Reddetme Sebebinizi Belirtiniz.')
	.setStyle('LONG') 
	.setMinLength(1)
	.setMaxLength(500)
	.setPlaceholder('Yetersiz Kanıt VB.')
	.setRequired(true)
	)
		showModal(redform, {
		client: client, 
		interaction: interaction 
		})
     }else{
        return  interaction.reply({content: "Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!..", ephemeral: true});		 
	 }
	}	
	if(interaction.customId === "vrpOnayla"){
		if(interaction.member.roles.cache.has(botlistyetkilirol) || interaction.member.permissions.has("ADMINISTRATOR")) {
		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('onaylandı')
		.setLabel(`${interaction.member.user.tag} Tarafından Onaylandı`)
		.setStyle('SUCCESS')
		.setDisabled(true)
		);		
		await interaction.update({components: [row] });
		client.users.fetch(db.fetch(`şikayetAçan_${interaction.message.id}`), false).then((user) => {
		user.send(`Açmış olduğunuz şikayet **${interaction.member.user.tag}** tarafından kabul edilmiş ve işlem uygulanmıştır. İyi roller dileriz.`);
		});
     }else{
        return  interaction.reply({content: "Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!..", ephemeral: true});		 
	 }
	}	
	var currentdate = new Date(); 
	if(interaction.customId === "diğerŞikayet"){
		if(currentdate.getHours() < 14) return interaction.reply({content: "Sadece destek saatleri içerisinde destek oluşturabilirsiniz.", ephemeral: true})
		let destekTalebi = "Yok"
      var kanallar = interaction.guild.channels.cache
		kanallar.forEach(b => {
			if(db.fetch(`talepaçtı_${b.id}`) == interaction.member.id){
				destekTalebi = "Var"
			}
		})
        if(destekTalebi == "Yok"){
        let kişi = interaction.member;
        let yetkili = "886317367355920425"
		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('TicketKapat')
		.setLabel('Kapat')
		.setEmoji("927230398658932768")
		.setStyle('DANGER'),	
		);		
        const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`<a:beyaztik:912078833455349811>**${kişi.user.username}, Diğer Sorunlar için destek oluşturdunuz. \nYetkili Ekibimiz en kısa sürede sizinle iletişime geçecektir. \nLütfen sabırla bekleyiniz ve şikayet SS'lerinizi hazırlayınız.**\n`)
		.setThumbnail(client.user.avatarURL())
        .setTimestamp()
        interaction.member.guild.channels.create(`destek-${kişi.user.username}`, {
          type: 'text',
          permissionOverwrites: [{ id: client.user.id, allow: ['VIEW_CHANNEL','MANAGE_CHANNELS','EMBED_LINKS','ATTACH_FILES','ADD_REACTIONS','MENTION_EVERYONE','MANAGE_MESSAGES', 'SEND_MESSAGES']}, {id: interaction.member.guild.id, deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE']}, { id: kişi.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] }, { id: yetkili, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']}]
        }).then(kanal => {
			kanal.send({content:`${interaction.member},${interaction.member.guild.roles.cache.get(yetkili)}`,embeds:[embed], components: [row]}) 
		db.set(`talepaçtı_${kanal.id}`, interaction.member.id)
      interaction.reply({content: `Merhaba ${interaction.member}, Destek talebiniz oluşturulmuştur. ${kanal}`, ephemeral: true});
     })
      }else{interaction.reply({content:`Zaten destek talebiniz bulunuyor.`, ephemeral: true})}	 	  
	}	
	if(interaction.customId === "donateSorular"){
		if(currentdate.getHours() < 14) return interaction.reply({content: "Sadece destek saatleri içerisinde destek oluşturabilirsiniz.", ephemeral: true})
		let destekTalebi = "Yok"
      var kanallar = interaction.guild.channels.cache
		kanallar.forEach(b => {
			if(db.fetch(`talepaçtı_${b.id}`) == interaction.member.id){
				destekTalebi = "Var"
			}
		})
        if(destekTalebi == "Yok"){
        let kişi = interaction.member;
        let yetkili = "886273483582087278"
		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('TicketKapat')
		.setLabel('Kapat')
		.setEmoji("927230398658932768")
		.setStyle('DANGER'),	
		);		
        const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`<a:beyaztik:912078833455349811>**${kişi.user.username}, Donate İşlemleri için destek oluşturdunuz. \nYönetim Ekibimiz en kısa sürede sizinle iletişime geçecektir. \nLütfen sabırla bekleyiniz ve şikayet SS'lerinizi hazırlayınız.**\n`)
		.setThumbnail(client.user.avatarURL())
        .setTimestamp()
        interaction.member.guild.channels.create(`destek-${kişi.user.username}`, {
          type: 'text',
          permissionOverwrites: [{ id: client.user.id, allow: ['VIEW_CHANNEL','MANAGE_CHANNELS','EMBED_LINKS','ATTACH_FILES','ADD_REACTIONS','MENTION_EVERYONE','MANAGE_MESSAGES', 'SEND_MESSAGES']}, {id: interaction.member.guild.id, deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE']}, { id: kişi.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] }, { id: yetkili, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']}]
        }).then(kanal => {
			kanal.send({content:`${interaction.member},${interaction.member.guild.roles.cache.get(yetkili)}`,embeds:[embed], components: [row]}) 
		db.set(`talepaçtı_${kanal.id}`, interaction.member.id)
      interaction.reply({content: `Merhaba ${interaction.member}, Destek talebiniz oluşturulmuştur. ${kanal}`, ephemeral: true});
     })
      }else{interaction.reply({content:`Zaten destek talebiniz bulunuyor.`, ephemeral: true})}	 	  
	}
	
	if(interaction.customId === "TicketKapat"){
		await interaction.reply({content: `**${interaction.user.tag} tarafından destek talebi kapatıldı.**`})
		const attachment = await discordTranscripts.createTranscript(interaction.channel,{fileName: `${interaction.channel.name}.html`});
		interaction.guild.channels.cache.get("961475548226400316").send({files: [attachment]})
		await interaction.channel.delete()
	}
	if(interaction.customId === "VatanRoleplayKayıt"){
		if(!interaction.member.roles.cache.has("886321207492886599")){
		  interaction.member.roles.remove("886323280678633493")
		  interaction.member.roles.add("886321207492886599")
		  interaction.reply({content:"Başarılı şekilde sunucuya kayıt oldunuz, iyi eğlenceler.", ephemeral: true})
		}else{
		  interaction.reply({content:"Sunucu kaydınız zaten yapılmış. Bir sorun ile karşılaştıysanız yetkililere ulaşınız.", ephemeral: true})
		} 	
	}
	if(interaction.customId === "intBasvuru"){
	const intForm = new Modal() 
	.setCustomId('vatan-roleplay-interior-formu')
	.setTitle('İnterior Talep Formu')
	.addComponents(
	new TextInputComponent() 
	.setCustomId('int-creator')
	.setLabel('IC İsminiz')
	.setStyle('SHORT') 
	.setMinLength(5)
	.setMaxLength(60)
	.setRequired(true)
	)
	.addComponents(
	new TextInputComponent() 
	.setCustomId('int-ismi')
	.setLabel('Ev İsmi')
	.setStyle('SHORT') 
	.setMinLength(5)
	.setMaxLength(60)
	.setRequired(true)
	)	
	.addComponents(
	new TextInputComponent() 
	.setCustomId('int-amaç')
	.setLabel('Evi Hangi Amaçla Kullanacaksınız')
	.setStyle('LONG') 
	.setMinLength(5)
	.setMaxLength(150)
	.setRequired(true)
	)	
	.addComponents(
	new TextInputComponent() 
	.setCustomId('int-görseller')
	.setLabel('Evin Konum Görselleri')
	.setStyle('LONG') 
	.setMinLength(5)
	.setMaxLength(150)
	.setRequired(true)
	)		
		showModal(intForm, {
		client: client, 
		interaction: interaction 
		})
	}

	if(interaction.customId === "vrp-intOnayla"){
		if(interaction.member.roles.cache.has(botlistyetkilirol) || interaction.member.permissions.has("ADMINISTRATOR")) {
		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('onaylandı')
		.setLabel(`${interaction.member.user.tag} Tarafından Onaylandı`)
		.setStyle('SUCCESS')
		.setDisabled(true)
		);		
		await interaction.update({components: [row] });
     }else{
        return  interaction.reply({content: "Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!..", ephemeral: true});		 
	 }
	}	

	if(interaction.customId === "vrp-intReddet"){
		if(interaction.member.roles.cache.has(botlistyetkilirol) || interaction.member.permissions.has("ADMINISTRATOR")) {
		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('reddedildi')
		.setLabel(`${interaction.member.user.tag} Tarafından Reddedildi`)
		.setStyle('DANGER')
		.setDisabled(true)
		);		
		await interaction.update({components: [row] });
     }else{
        return  interaction.reply({content: "Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!..", ephemeral: true});		 
	 }
	}		
});


client.on('modalSubmit',async (modal) => {
	if(modal.customId === 'VatanOyuncuŞikayetleri'){
		const sikayetci = modal.getTextInputValue('sikayetci')
		const sikayetEdilen = modal.getTextInputValue('sikayetEdilen')
		const resimler = modal.getTextInputValue('resimler')
		const olayÖrgüsü = modal.getTextInputValue('olayÖrgüsü')
		
		await modal.deferReply({ ephemeral: true })
		modal.followUp({ content: `Başarılı Bir Şekilde Şikayet Oluşturuldu.`, ephemeral: true })
		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('vrpOnayla')
		.setLabel('Onayla')
		.setStyle('SUCCESS'),
		new MessageButton()
		.setCustomId('vrpReddet')
		.setLabel('Reddet')
		.setStyle('DANGER'),
		);
		const embed = new Discord.MessageEmbed()
		.setColor("BLUE")
		.setDescription(`**${modal.user.tag}** Tarafından yeni şikayet oluşturuldu.`)
		.addField("Şikayet Eden:", sikayetci, true)
		.addField("Şikayet Edilen:", sikayetEdilen, true)
		.addField("Olay Örgüsü:", "```"+olayÖrgüsü+"```")
		.addField("Görüntüler:", "```"+resimler+"```")
		client.channels.cache.get(logKanal).send({embeds:[embed],components: [row]}).then(mesaj =>{db.set(`şikayetAçan_${mesaj.id}`, modal.user.id)})
	} 
	if(modal.customId === "vatan-roleplay-red-formu"){
		const redSebeb = modal.getTextInputValue('red-sebep')
		await modal.deferReply({ ephemeral: true })
		modal.followUp({ content: "Şikayet reddedilmiştir.", ephemeral: true })
		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('reddedildi')
		.setLabel(`${modal.user.tag} Tarafından Reddedildi`)
		.setStyle('DANGER')
		.setDisabled(true)
		);		
		
		client.channels.cache.get(logKanal).messages.edit(modal.message.id, {components: [row]})
		client.users.fetch(db.fetch(`şikayetAçan_${modal.message.id}`), false).then((user) => {
		user.send(`Açmış olduğunuz şikayet **"${redSebeb}"** sebebiyle reddedilmiştir. Yanlışlık olduğunu düşünüyorsanız ticket açarak yetkililere ulaşınız. İyi roller dileriz.`);
		});
	}	
	if(modal.customId === 'vatan-roleplay-interior-formu'){
		const talepEden = modal.getTextInputValue('int-creator')
		const evİsmi = modal.getTextInputValue('int-ismi')
		const resimler = modal.getTextInputValue('int-görseller')
		const amaç = modal.getTextInputValue('int-amaç')
		
		await modal.deferReply({ ephemeral: true })
		modal.followUp({ content: `Başarılı Bir Şekilde İnterior Talebi Oluşturuldu.`, ephemeral: true })
		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('vrp-intOnayla')
		.setLabel('Onayla')
		.setStyle('SUCCESS'),
		new MessageButton()
		.setCustomId('vrp-intReddet')
		.setLabel('Reddet')
		.setStyle('DANGER'),
		);
		const embed = new Discord.MessageEmbed()
		.setColor("BLUE")
		.setDescription(`**${modal.user.tag}** Tarafından yeni interior başvurusu.`)
		.addField("Talep Eden:", talepEden, true)
		.addField("İnt İsmi:", evİsmi, true)
		.addField("Kullanım Amacı:", "```"+amaç+"```")
		.addField("Görüntüler:", "```"+resimler+"```")
		client.channels.cache.get(intKanal).send({embeds:[embed],components: [row]}).then(mesaj =>{db.set(`şikayetAçan_${mesaj.id}`, modal.user.id)})
	}		
})

client.on("messageDelete", async message => {
	await db.set(`snipe.mesaj.${message.channel.id}`, message.content)
	await db.set(`snipe.id.${message.channel.id}`, message.author.id)
});

client.on('guildMemberAdd', async member => {
    if(db.fetch(`jail_${member.id}`) == "gurluJail"){
		setTimeout(function(){
        member.roles.cache.forEach(rol =>{
			if (rol.id != member.guild.id){
				member.roles.remove(rol.id)
			}
		}
		);
        member.roles.add("887423154719449149")

        const embed = new Discord.MessageEmbed()
        .setAuthor({name: member.user.tag, iconURL: member.user.avatarURL()})
        .setColor(`#f3c7e1`)
        .setDescription(`**Beni kandıramaz kimse!** \n Korkma bende bazen "Gurlu" tarafından kodlandığımı unutup işler yapıyorum ama aynı senin karşılaştığın durum ile karşılaşıyorum. \nÜzgünüm :(`)
		.setThumbnail(client.user.avatarURL())
        .setTimestamp()
        member.send({embeds: [embed]}).catch((err) => {})
		},10000)
    }
});

// yasakliKullanıcı = [
// "551735102913249301",
// ]

client.on("messageCreate", async msg => {
	if(msg.content == "sunucuAktif"){
		if(msg.author.bot){
			msg.delete()
		const aktifEmbed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setTitle("**Sunucumuz sorunsuz şekilde aktif edilmiştir. \nAktif olan herkesi sunucumuza bekliyoruz. \nSunucu IP Adresimiz: '193.223.107.175'**")
		.setThumbnail(client.user.avatarURL({dynamic: true, type: 'png'}))
		.setImage("https://media.discordapp.net/attachments/880810605773209691/912324845121990726/aktif.gif")
		.setTimestamp()
		msg.channel.send({content: "||@everyone||", embeds: [aktifEmbed]})
		}
	}
	if(msg.author.bot) return;
    if (msg.content.toLowerCase() === 'sa' || msg.content.toLowerCase() === 's.a' || msg.content.toLowerCase() === 'Selamın Aleyküm' || msg.content.toLowerCase() === 'Selamun Aleyküm') {
		if(msg.channel.type === "dm") return;
            const embed = new Discord.MessageEmbed() 
        if(msg.author.id == "803750101024768041" || msg.author.id == "803750101024768041") { 
      embed.setColor("RANDOM")
      embed.setDescription("**Aleyküm Selam Hoşgeldin KRAL**")  
      embed.setImage("https://i.hizliresim.com/8n2iqft.gif")
        }else{
      embed.setColor("RANDOM")
      embed.setDescription(`**Aleyküm Selam hoşgeldin**`)
        }
        msg.reply({embeds: [embed]})
    }
	if (msg.author.id == "803750101024768041"){
		if(msg.content == "sahibin kim"){
			msg.reply("Tabi ki sen, başka birisi olabilir mi? Hiç sanmıyorum.")
		}
	}
	if(msg.channel.id == "958296425177948160"){
		await msg.react("927230364869603358")
		await msg.react("927230398658932768")
	}
	// if(yasakliKullanıcı.includes(msg.author.id)){
		// msg.delete()
		// msg.channel.send({content: `${msg.author}, senin mesaj göndermen yasaklanmış. Zorlama daha fazla.`})
	// }
});

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'vatan'
});
client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;
	if (interaction.customId === 'select') {
		if (!interaction.member.permissions.has("ADMINISTRATOR")) return;
let evler = "Sahip Olduğu Her Hangi Bir Mülk Yok"
let araclar = "Sahip Olduğu Her Hangi Bir Araç Yok"		
	const statsEmbed = new Discord.MessageEmbed()
gurluSorgu = connection.query(`SELECT * FROM characters WHERE charactername = '${interaction.values[0]}'`)	
gurluSorgu.on('result',function(gurluRow){
var karakterID = gurluRow['id'];
	var isim = gurluRow['charactername'];
	var saat = gurluRow['hoursplayed'];
	var level = gurluRow['level'];
	///
	var para = gurluRow['money'];
	var bankapara = gurluRow['bankmoney'];
	////
	var sağlık = gurluRow['health'];
	var karapara = gurluRow['karapara'];
	var maske = gurluRow['maskeno'];
	var karakterTip = gurluRow['karakter_tip'];
	var silahKullanım = gurluRow['silah'];
	var m4 = gurluRow['m4'];
	var silahhak = gurluRow['silahhak'];
		if(karakterTip === 0){karakterTip = "Legal"}else{karakterTip = "İl-Legal"}
	var torbaci = gurluRow['torbaci'];
		if(torbaci === 0){torbaci = "Yok"}else{torbaci = "Var"}
	var emlakci = gurluRow['emlakci'];
		if(emlakci === 0){emlakci = "Yok"}else{emlakci = "Var"}		
	var acID = gurluRow['account'];
	var sorgu2 = connection.query(`SELECT * FROM accounts WHERE id = '${acID}'`);
	sorgu2.on('result',function(row2){
		var kadı = row2['username'];
		var bakiye = row2['bakiye'];
	statsEmbed.setColor("YELLOW")
	statsEmbed.addField("Karakter Adı:", "```"+isim+"```", true)
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
			var sorgu3 = connection.query('SELECT * FROM `vehicles` WHERE `owner` = '+gurluRow['id']);
			let aracArray = [];
			sorgu3.on('result',function(row3){
			var id = row3['id']
			aracArray.push(id)	
			araclar = aracArray.join(", ")	
			
});
			var sorgu4 = connection.query('SELECT * FROM `interiors` WHERE `owner` = '+gurluRow['id']);
			let evArray = [];
			sorgu4.on('result',function(row4){
			var intID = row4['id']
			evArray.push(intID)	
			evler = evArray.join(", ")				
});
});
setTimeout(async function(){
statsEmbed.addField("Sahip Olduğu Araçlar;", "```"+araclar+"```")
statsEmbed.addField("Sahip Olduğu Mülkler;", "```"+evler+"```")
await interaction.reply({embeds: [statsEmbed], ephemeral: true})	
}, 500)	
	
})
	}
});
	

client.login(token).catch((error) =>
	console.error("Lütfen tokeni doğru biçimde girin!\n\n" + error)
);

Promise.prototype.del = (ms) => {
  if (this)
    this.then((m) => {
      if (m.deletable) setTimeout(() => m.delete(), Number(ms));
    });
};

process.on("uncaughtException", (err) => console.error(err.stack));
process.on("unhandledRejection", (err) => console.error(err.stack));
