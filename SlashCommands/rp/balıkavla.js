const { MessageEmbed } = require("discord.js");
const { random } = require("chance-percent");
const cdb = require("../../models/env")
const xdb = require("../../models/xp")

module.exports = {
    name: "balıkavla",
    description: "Balık tutmanızı sağlar",
    cooldown: 60,
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        const Envanter = await cdb.findOne({ user: interaction.user.id, guild: interaction.guild.id })
        const userXP = await xdb.findOne({ user: interaction.user.id, guild: interaction.guild.id })
        if (interaction.member.roles.cache.has(client.roles.balıkçı)) {
                const options = [
                    {value: "Başarısız", percentage: 30},
                    {value: "Mini balık", percentage: 25},
                    {value: "Küçük balık", percentage: 20},
                    {value: "Orta balık", percentage: 12},
                    {value: "Büyük balık", percentage: 8},
                    {value: "Devasa balık", percentage: 5},
                ]
                const result = random(options);
                let mics = [
                    { name: "Başarısız", message: "*Balık yakalamakta başarısız oldun. Oltanı yeniden at bakalım. Haydi Rastgele !*", gif: "https://pa1.narvii.com/5816/b2b48776fccbb433351f587c44b2c5d45608ea04_hq.gif" },
                    { name: "Mini balık", message: "*Ooo oltana bir mini balık geldi. Ne kadar da tatlı. O artık senindir.*",  gif:  "https://4.bp.blogspot.com/-LOfyx4gHqjM/WSYIRvZbkqI/AAAAAAAA1eE/ABCBmQltEX8J77zzXY_tA5m5nGXuYApuQCKgB/s1600/Omake%2BGif%2BAnime%2B-%2BSakura%2BQuest%2B-%2BEpisode%2B8%2B-%2BMaki%2BTries%2Bto%2BCatch%2BChar.gif " },
                    { name: "Küçük balık", message: "*Hmm küçük bir balık geldi ama iyi para eder gibi duruyor. Şanslısın.*",  gif:  "https://i.pinimg.com/originals/ce/b6/03/ceb603df6ccdfe2d1e749ee26de1b519.gif" },
                    { name: "Orta balık", message: "*Orta balık mı?? Yeteneklisin dostum takdir ettim. Güzel bir balık satmaya ne dersin??..*",  gif:  "https://i.kym-cdn.com/photos/images/original/001/724/225/e1d.gif" },
                    { name: "Büyük balık", message: "*Dostum sen bir ustasın. Bu büyük bir balık bunu yakalamak aynı zamanda büyük bir tecrübe ister tebrikler. Satmanı veya koleksiyonuna koymayı tavsiye ederim.*",  gif:  "https://i.kym-cdn.com/photos/images/original/001/466/818/224.gif" },
                    { name: "Devasa balık", message: "*Gelmiş geçmiş en iyi balıkçı diyebilir miyiz? Bence bu şanı sonuna kadar hakkediyorsun. İstersen koleksiyonuna ekle istersen bunu satıp yüksek bir miktar fiyat al. Tebrikler Dostum*",  gif: "https://i.gifer.com/embedded/download/UikL.gif" },
                ]
                
                client.channels.cache.get("1018954210487840769").send(`${client.tic} **${interaction.user.tag}** adlı kullanıcı balık avladı ve **${result}** çıktı!`)
                await interaction.followUp({
                    files: [{
                        attachment: [...mics][[...mics].map(item => item.name).indexOf(result)].gif,
                        name: 'balık.gif'
                    }],
                    content:`${[...mics][[...mics].map(item => item.name).indexOf(result)].message}`,
                });
                if(!userXP) {
                    if(result === "Başarısız") return
                    new xdb({
                        user: interaction.user.id,
                        guild: interaction.guild.id,
                        xp: 2
                    }).save()
                } else {
                    if(result === "Başarısız") return
                    let levelXP = [{ xp: 0, level: 0 }, { xp: 20, level: 1 }, { xp: 40, level: 2 }, { xp: 60, level: 3 }, { xp: 80, level: 3 }, { xp: 100, level: 4 }, { xp: 120 , level: 5}]
                    let xp = [...levelXP][[...levelXP].map(x => x.xp).indexOf(userXP.xp)].xp || 0
                    let nextXP = [...levelXP][[...levelXP].map(x => x.xp).indexOf(userXP.xp)].xp + 20 || 0
                    let nextLevel = [...levelXP][[...levelXP].map(x => x.xp).indexOf(userXP.xp)].level + 1 || 0

                    userXP.xp += 2
                    await userXP.save()

                    if(userXP.xp >= nextXP) {
                        // userXP.level = nextLevel
                        // await userXP.save()
                        await xdb.findOneAndUpdate({ user: interaction.user.id, guild: interaction.guild.id }, { level: nextLevel })
                    }

                }
                if(!Envanter) {
                    if(result === "Başarısız") return 
                    new cdb({
                        user: interaction.user.id,
                        guild: interaction.guild.id,
                        env: { name: result, amount: 1, price: result === "Mini balık" ? 3 : result === "Küçük balık" ? 10 : result === "Orta balık" ? 20 : result === "Büyük balık" ? 35 : result === "Devasa balık" ? 50 : 10 }
                    }).save()
                } else {
                    if(result === "Başarısız") return 
                    await cdb.findOne({guild: interaction.guild.id, user: interaction.user.id}, async (err, data) => {
                        let arrayPosition = [...data.env].map(x => x.name).indexOf(result)
                        if(arrayPosition === -1 || arrayPosition == -1 || arrayPosition === "Yok" || arrayPosition == "Yok") {
                            if(err) return console.log(err)
                            if(!data) return interaction.deleteReply({})
                            data.env.push({ name: result, amount: 1, price: result === "Mini balık" ? 3 : result === "Küçük balık" ? 10 : result === "Orta balık" ? 20 : result === "Büyük balık" ? 35 : result === "Devasa balık" ? 50 : 10 })
                            await data.save()
                        } else if(arrayPosition !== -1 || arrayPosition != -1 || arrayPosition !== "Yok" || arrayPosition != "Yok" || arrayPosition !== undefined || arrayPosition != null || arrayPosition !== undefined || arrayPosition != null) {
                            if(arrayPosition === -1 || arrayPosition == -1 || arrayPosition === "Yok" || arrayPosition == "Yok") return
                            await cdb.findOneAndUpdate({guild: interaction.guild.id, user: interaction.user.id}, { $inc: { [`env.${arrayPosition}.amount`]: 1 } }, { upsert: true });
                        }
                     })
                    }
            } else return interaction.followUp({ content: "Sen bir balıkçı değilsin!" })
    },
};
