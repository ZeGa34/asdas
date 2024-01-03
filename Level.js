const { Collection } = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
let levels = 1234

module.exports = async (client) => {
  client.on("messageCreate", async message => {
    if (message.author.bot) return;
      await db.add("stats."+message.guild.id+"."+message.member.id+".msg", 1);
      await db.add("stats."+message.guild.id+"."+message.member.id+".xp", 25);
      let user_info = await db.get("stats."+message.guild.id+"."+message.member.id);
      if(!user_info.level) await db.set("stats."+message.guild.id+"."+message.member.id+".level", 1);
      if(user_info.xp>levels*user_info.level){
        await db.add("stats."+message.guild.id+"."+message.member.id+".level", 1);
        await db.set("stats."+message.guild.id+"."+message.member.id+".xp", 25);
        message.reply({content:"🌟 **"+message.author.tag+"** seviye **"+(user_info.level+1)+"**'e yükseldin!"});
      } 
  })
let voiceData = new Collection();
client.on('voiceStateUpdate', async (oldMember, newMember) => {
	if(newMember.member.user.bot) return;
  if(!oldMember.channel){//girdi
    voiceData.set(newMember.id, Date.now());
  }else if(!newMember.channel){//çıktı
     if (voiceData.has(newMember.id)) {
      let time = await Date.now() - voiceData.get(newMember.id)
      await db.add("stats."+newMember.guild.id+"."+newMember.id+".voice", time)
      let newxp = parseInt(time/2000);
      await db.add("stats."+newMember.guild.id+"."+newMember.id+".xp", newxp)
      }
  }
})  
};