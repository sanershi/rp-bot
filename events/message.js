const client = require("../index");
const xmdb = require("../models/msgxp");

client.on("messageCreate", async (message) => {
    if(message.author.bot || message.guild.id !== client.config.sunucu) return
    let msgxp = await xmdb.findOne({ user: message.author.id, guild: message.guild.id });
    const sunucu = client.guilds.cache.get(client.config.sunucu);
    const kanal = client.channels.cache.get("1019624286052417557");
    if (!msgxp) {
        new xmdb({ user: message.author.id, guild: message.guild.id, xp: 1, level: 0 }).save();
    } else {
        let levelXP = [{ xp: 0, level: 0 }, { xp: 20, level: 1 }, { xp: 40, level: 2 }, { xp: 60, level: 3 }, { xp: 80, level: 3 }, { xp: 100, level: 4 }, { xp: 120 , level: 5}]
        let nextXP = msgxp ? msgxp.level >= 5 ? "" : levelXP.find(o => o.xp >= msgxp.xp)?.xp : 0 || 0
        let nextLEVEL = msgxp ? msgxp.level >= 5 ? "" : levelXP.find(o => o.xp >= msgxp.xp)?.level : 0 || 0

        msgxp.xp += 1
        await msgxp.save()

        if(!msgxp.level >= 5) {
            if(msgxp.xp >= nextXP) {
                await xmdb.findOneAndUpdate({ user: message.author.id, guild: message.guild.id }, { level: nextLEVEL })
                kanal.send({ content: `${message.author}, **${nextLEVEL}** seviyeye ulaştı!` })
            }
        }
    }
});
