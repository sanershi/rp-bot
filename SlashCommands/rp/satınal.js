const { MessageEmbed } = require("discord.js");
const cdb = require("../../models/env")
const mdb = require("../../models/market")
module.exports = {
    name: "satınal",
    description: "Eşya satın almanızı sağlar.",
    options: [{
        name: "eşya-adı",
        description: "Alınacak eşya adı.",
        type: "STRING",
        required: true
    }, {
        name: "miktar",
        description: "Alınacak eşyadan miktar.",
        type: "NUMBER",
        required: true
    }],
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        const eşya = interaction.options.getString("eşya-adı")
        const miktar = interaction.options.getNumber("miktar")
        let Envanter = await cdb.findOne({ user: interaction.user.id, guild: interaction.guild.id })
        const Market = await mdb.findOne({ guild: interaction.guild.id }, async(err, data) => {
            if(err) return
            let arrayPosition = [...data.item].map(x => x.name).indexOf(eşya)
            if([...data.item].map(x => x.name).indexOf(eşya) === -1) {
                interaction.followUp({content: "<:cross:1012832198342225960> Bu eşya markette bulunmuyor."})
                return
            } else {
                if(Envanter) {
                    if(Envanter.coin === 0 || !Envanter.coin) {
                        interaction.followUp({content: "<:cross:1012832198342225960> Hiç paran yok."})
                        return
                    } else if(Envanter.coin) {
                        if(Envanter.coin < data.item[arrayPosition].price) {
                            interaction.followUp({content: "<:cross:1012832198342225960> Bu eşyaya paran yetmiyor."})
                            return
                        } else if(Envanter.coin >= data.item[arrayPosition].price) {
                            if(miktar) {
                            Envanter.coin -= data.item[arrayPosition].price * miktar
                            Envanter.env.push({
                                name: data.item[arrayPosition].name,
                                more: data.item[arrayPosition].more,
                                price: data.item[arrayPosition].price,
                                amount: miktar,
                                type: data.item[arrayPosition].type,
                            })
                            Envanter.save()
                            return interaction.followUp({content: `<:tik:1012832157410005054> **${eşya}** İsimli ürünü satın aldın.`})
                            } else if(!miktar) {
                            Envanter.coin -= data.item[arrayPosition].price
                            Envanter.env.push(data.item[arrayPosition])
                            Envanter.save()
                            return interaction.followUp({content: `<:tik:1012832157410005054> **${eşya}** İsimli ürünü satın aldın.`})
                            }
                        }
                    }
                }
            }
        })
    },
};
