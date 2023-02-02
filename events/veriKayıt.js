const client = require("../index");
const cdb = require("../models/env")
const mdb = require("../models/market")
const sdb = require("../models/su")
const adb = require("../models/açlık")
const moment = require("moment")
moment.locale("tr")

client.on("guildMemberAdd", async (member) => {
    if(member.bot) return;
    if(member.guild.id !== client.config.sunucu) return;
    const data = await cdb.findOne({ guild: client.config.sunucu });
    if (!data) {
        new cdb({ guild: client.config.sunucu, user: member.id, coin: 10000 }).save();
        const guild = client.guilds.cache.get(client.config.sunucu);
        const memberCount = guild.memberCount;
        client.channels.cache.get("1018965423624036455").send({ content: `${client.tic} ${member} sunucuya **<t:${moment(Date.now()).unix()}>** tarihinde katıldı. Sunucu **${memberCount}** kişi. (\`Veri kaydedildi.\`)` });
        return
    }
    const guild = client.guilds.cache.get(client.config.sunucu);
    const memberCount = guild.memberCount;
    client.channels.cache.get("1018965423624036455").send({ content: `${client.tic} ${member} sunucuya **<t:${moment(Date.now()).unix()}>** tarihinde katıldı. Sunucu **${memberCount}** kişi.` });
});