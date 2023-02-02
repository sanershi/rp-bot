const { MessageEmbed } = require("discord.js");
const cdb = require("../../models/env")
const sdb = require("../../models/su")
const adb = require("../../models/açlık")
module.exports = {
    name: "kullan",
    description: "Çantanızdaki herhangi bir eşyanızı kullanırsınız.",
    options: [{
        name: "eşya-adı",
        description: "Kullanılacak eşya adı.",
        type: "STRING",
        required: true
    }, {
        name: "miktar",
        description: "Kullanılacak eşya mikart",
        type: "NUMBER",
    }],
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        const eşya = interaction.options.getString("eşya-adı")
        if(!eşya) return interaction.deleteReply({})
        const miktar = interaction.options.getNumber("miktar")
        const suData = await sdb.findOne({ user: interaction.user.id, guild: interaction.guild.id })
        const yemekData = await adb.findOne({ user: interaction.user.id, guild: interaction.guild.id })
        await cdb.findOne({ user: interaction.user.id, guild: interaction.guild.id }, async(err, data) => {
            if(!data) return interaction.deleteReply({})
            if(err) return
            if([...data.env].map(x => x.name).indexOf(eşya) === -1 || eşya === "Başarısız" || eşya === "başarısız") {
                interaction.followUp({content: "<:cross:1012832198342225960> Bu eşya çantanda bulunmuyor."})
                return
            } else {
                let veri = [...data.env].map(x => x.name).indexOf(eşya)
                if(miktar) {
                    if([...data.env][veri].amount === 0) {
                        await cdb.findOneAndUpdate({guild: interaction.guild.id, user: interaction.user.id}, { $pull: { env: { name: eşya } } });
                    } else if([...data.env][veri].amount > 0) {
                        await cdb.findOneAndUpdate({guild: interaction.guild.id, user: interaction.user.id}, { $inc: { [`env.${veri}.amount`]: -miktar } });
                    }
                    if([...data.env][veri].type === "su") {
                        if(suData.susadim !== 10) {
                            let doyur = [...data.env][veri].doyuruculuk * miktar
                            doyur >= 10 ? doyur = 10 : doyur = doyur
                            await sdb.findOneAndUpdate({guild: interaction.guild.id, user: interaction.user.id}, { $inc: { susadim: doyur } });
                        }
                    } else if([...data.env][veri].type === "yemek") {
                        if(yemekData.acıktım !== 10) {
                            let doyurdum = [...data.env][veri].doyuruculuk * miktar
                            doyurdum >= 10 ? doyurdum = 10 : doyurdum = doyurdum
                            await adb.findOneAndUpdate({guild: interaction.guild.id, user: interaction.user.id}, { $inc: { acıktım: doyurdum } });
                        }
                    }
                } else if(!miktar) {
                    if([...data.env][veri].type === "su") {
                        if(suData.susadim !== 10) {
                            let doyurdum1 = [...data.env][veri].doyuruculuk
                            doyurdum1 >= 10 ? doyurdum1 = 10 : doyurdum1 = doyurdum1
                            await sdb.findOneAndUpdate({guild: interaction.guild.id, user: interaction.user.id}, { $inc: { susadim: doyurdum1 } });
                        }
                    } else if([...data.env][veri].type === "yemek") {
                        if(yemekData.acıktım !== 10) {
                            let doyurdum2 = [...data.env][veri].doyuruculuk
                            doyurdum2 >= 10 ? doyurdum2 = 10 : doyurdum2 = doyurdum2
                            await adb.findOneAndUpdate({guild: interaction.guild.id, user: interaction.user.id}, { $inc: { acıktım: doyurdum2 } });
                        }
                    }
                    if([...data.env][veri].amount === 0) {
                        await cdb.findOneAndUpdate({guild: interaction.guild.id, user: interaction.user.id}, { $pull: { env: { name: eşya } } });
                    } else if([...data.env][veri].amount > 0) {
                        await cdb.findOneAndUpdate({guild: interaction.guild.id, user: interaction.user.id}, { $inc: { [`env.${veri}.amount`]: -1 } });
                    }
                    
                }
                if(miktar) {
                    return interaction.followUp({content: `<:tik:1012832157410005054> **${eşya}** isimli eşyadan **${miktar}** adet kullanıldı.`})
                } else if(!miktar) {
                    return interaction.followUp({content: `<:tik:1012832157410005054> **${eşya}** isimli eşyanın kullanılacak miktarı girilmediği için **1** tane kullanıldı.`})
                }
            }
        })
    },
};
