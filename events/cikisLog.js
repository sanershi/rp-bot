const client = require("../index");
const moment = require("moment")
moment.locale("tr")

client.on("guildMemberRemove", async (member) => {
    if(member.bot) return;
    const guild = client.guilds.cache.get(client.config.sunucu);
    const memberCount = guild.memberCount;
    client.channels.cache.get("1018965423624036455").send({ content: `${client.cross} ${member} sunucudan **<t:${moment(Date.now()).unix()}>** tarihinde ayrıldı. Sunucu **${memberCount}** kişi.` });
})