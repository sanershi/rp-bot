const { MessageEmbed } = require("discord.js");
const cdb = require("../../models/env")
module.exports = {
    name: "sat",
    description: "Çantanda bulunan satılacak eşyanın ismini gir. (tam isim)",
    options: [{
        name: "eşya-adı",
        description: "Satılacak eşya adı.",
        type: "STRING",
        required: true
    }, {
            name: "miktar",
            description: "Satılacak eşya miktarı.",
            type: "NUMBER",
    }],
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        const eşya = interaction.options.getString("eşya-adı").toLowerCase()
        const miktar = interaction.options.getNumber("miktar")
        const Envanter = await cdb.findOne({ user: interaction.user.id, guild: interaction.guild.id }, async(err, data) => {
        if(!data) return interaction.deleteReply({})
        if(err) return
        if([...data.env].map(x => x.name.toLowerCase()).indexOf(eşya.toLowerCase()) === -1) {
            interaction.followUp({content: "<:cross:1012832198342225960> Bu eşya çantanda bulunmuyor."})
            return
        } else {
            let balıkDeger = [{name: "mini balık", price: 3}, {name: "küçük balık", price: 10}, {name: "orta balık", price:  20}, {name: "büyük balık", price:  35}, {name: "devasa balık", price:  100}]
            let veri = [...data.env].map(x => x.name.toLowerCase()).indexOf(eşya.toLowerCase())
            if(eşya.includes("balık")) {
                if(miktar) {
                    data.env.splice(data.env[veri], 1)
                    data.coin += balıkDeger[[...balıkDeger].map(x => x.name.toLowerCase()).indexOf(eşya.toLowerCase())].price * miktar
                    data.save()
                    return interaction.followUp({content: "<:tik:1012832157410005054> Eşyayı sattın eşya değeri kadar para çantana konuldu."})
                } else {
                        data.env.splice(data.env[veri], 1)
                        data.coin += balıkDeger[[...balıkDeger].map(x => x.name.toLowerCase()).indexOf(eşya.toLowerCase())].price
                        data.save()
                        return interaction.followUp({content: "<:tik:1012832157410005054> Eşyayı sattın eşya değeri kadar para çantana konuldu."})
                }
            } else {
                data.env.splice(data.env[veri], 1)
                data.coin += Math.floor([...data.env][veri].price / 100) * 50
                data.save()
                return interaction.followUp({content: "<:tik:1012832157410005054> Eşyayı sattın eşya değeri kadar para çantana konuldu."})
            }
            
        }
        })
        
    },
};
