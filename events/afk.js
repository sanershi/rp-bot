const client = require("../index");
const afk = require("../models/afk");
const moment = require("moment");
moment.locale("tr");

client.on("messageCreate", async(message) => {
    if (message.author.bot || !message.guild) return
    const data = await afk.findOne({ guild: message.guild.id, user: message.author.id });
    if (data) {
      const afkData = await afk.findOne({ guild: message.guild.id, user: message.author.id });
      if (message.member.displayName.includes("[AFK]") && message.member.manageable) await message.member.setNickname(message.member.displayName.replace("[AFK]", ""));
      if(!message.mentions.members.first()) message.channel.send(`AFK modundan başarıyla çıktın **${message.author.tag}**, <t:${moment(afkData.time).unix()}:R> afk moduna girmişsin.`).then(m => setTimeout(() => m.delete(), 5000));
      await afk.deleteOne({ guild: message.guild.id, user: message.author.id });
    }
    
    const member = message.mentions.members.first();
    if (!member) return
    const afkData = await afk.findOne({ guild: message.guild.id, user: member.user.id });
    if (!afkData) return
    message.channel.send(`**${member.user.tag}** kullanıcısı, \`${afkData.sebep}\` sebebiyle, <t:${moment(afkData.time).unix()}:R> afk oldu!`).then(m => setTimeout(() => m.delete(), 5000));
})