const { MessageEmbed } = require("discord.js");
const cdb = require("../../models/env")
const ddb = require("../../models/depo")
module.exports = {
    name: "depo",
    description: "Çantanızdaki herhangi bir eşyayı depoya koymanızı sağlar.",
    options: [{
        name: "eşya-adı",
        description: "Depoya konulacak eşya.",
        type: "STRING",
    }, {
        name: "miktar",
        description: "Koyulacak eşyanın miktarı",
        type: "NUMBER",
    }],
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        const eşya = interaction.options.getString("eşya-adı")
        const miktar = interaction.options.getNumber("miktar")
        const Depo = await ddb.findOne({ user: interaction.user.id, guild: interaction.guild.id })
        if(eşya) {
            const Envanter = await cdb.findOne({ user: interaction.user.id, guild: interaction.guild.id }, async(err, data) => {
                if(!data) return interaction.deleteReply({})
                if(err) return
                if([...data.env].map(x => x.name).indexOf(eşya) === -1 || eşya === "Başarısız" || eşya === "başarısız") {
                    interaction.followUp({content: "<:cross:1012832198342225960> Bu eşya çantanda bulunmuyor."})
                    return
                } else {
                    let veri = [...data.env].map(x => x.name).indexOf(eşya)
                    if([...data.env][veri].amount === 0) return interaction.deleteReply({})
                    if(miktar) {
                        if([...data.env][veri].amount < miktar) return interaction.followUp({content: "<:cross:1012832198342225960> Bu eşya çantanızda yeterli miktarda yok."})
                        await cdb.findOneAndUpdate({guild: interaction.guild.id, user: interaction.user.id}, { $inc: { [`env.${veri}.amount`]: -miktar } });
                        if(!Depo) {
                            new ddb({
                                user: interaction.user.id,
                                guild: interaction.guild.id,
                                env: { name: eşya, amount: miktar, price: [...data.env][veri].price  }
                            }).save()
                        } else {
                            const depo = [...Depo.env].map(x => x.name).indexOf(eşya)
                            if(depo === -1 || depo == -1) {
                                Depo.env.push({ name: eşya, amount: miktar, price: [...data.env][veri].price })
                                Depo.save()
                            } else {
                                await ddb.findOneAndUpdate({guild: interaction.guild.id, user: interaction.user.id}, { $inc: { [`env.${depo}.amount`]: +miktar } });
                            }
                        }
                    } else if(!miktar) {
                        await cdb.findOneAndUpdate({guild: interaction.guild.id, user: interaction.user.id}, { $inc: { [`env.${veri}.amount`]: -1 } });
                        if(!Depo) {
                            new ddb({
                                user: interaction.user.id,
                                guild: interaction.guild.id,
                                env: {
                                    name: eşya,
                                    amount: 1,
                                    price: [...data.env][veri].price 
                                }
                            }).save()
                        } else {
                            const depo = [...Depo.env].map(x => x.name).indexOf(eşya)
                            if(depo === -1 || depo == -1) {
                                Depo.env.push({ name: eşya, amount: 1, price: [...data.env][veri].price })
                                Depo.save()
                            } else {
                                await ddb.findOneAndUpdate({guild: interaction.guild.id, user: interaction.user.id}, { $inc: { [`env.${depo}.amount`]: +1 } });
                            }
                        }
                    }
                    if(miktar) {
                        return interaction.followUp({content: `<:tik:1012832157410005054> **${eşya}** isimli eşyadan **${miktar}** adet deponuza konuldu.`})
                    } else if(!miktar) {
                        return interaction.followUp({content: `<:tik:1012832157410005054> **${eşya}** isimli eşyadan **1** adet deponuza konuldu.`})
                    }
                }
            })
        } else {
            await ddb.findOne({ user: interaction.user.id, guild: interaction.guild.id }, async(err, data) => {
                if(!data) {
                    new ddb({
                        user: interaction.user.id,
                        guild: interaction.guild.id,
                        env: [],
                    }).save()
                    return interaction.followUp({ content: `<:cross:1012832198342225960> Çantanda hiç bir şey bulunmadı` })
                }
                if(err) return
                let list = [...data.env].map(x => `**${x.name}** - ${x.amount}`).join("\n") || "Deponda eşya yok."
                if(!list || list === "Deponda eşya yok.") {
                    return interaction.followUp({ content: `<:cross:1012832198342225960> Çantanda hiç bir şey bulunmadı` })
                } else if(list !== "Deponda eşya yok.") {
                const embed = new MessageEmbed()
                .setDescription(`Deponda bunları buldum;\n\n${list}`)
                .setColor("BLURPLE")
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                interaction.followUp({ embeds: [embed] })
                }
            })
        }

        
    },
};
