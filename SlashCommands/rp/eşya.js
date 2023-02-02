const { MessageEmbed } = require("discord.js");
const mdb = require("../../models/market")
module.exports = {
    name: "eşya",
    description: "Markete eşya eklemeyi sağlar.",
    options: [{
        name: "ekle",
        description: "Eşya ismi.",
        type: "STRING",
    }, {
        name: "sil",
        description: "Silinecek eşya ismi.",
        type: "STRING",
    }, {
        name: "fiyat",
        description: "Eşya fiyatını belirler.",
        type: "NUMBER",
    }, {
        name: "açıklama",
        description: "Eşya açıklamasını belirler.",
        type: "STRING",
    }, {
        name: "doyuruculuk",
        description: "Eşyanın doyuruculuk değerini belirler.",
        type: "NUMBER",
    }, {
        name: "tür",
        description: "Eşya türünü belirler.",
        type: "STRING",
        choices: [{
            name: "Su",
            value: "su",
        }, {
            name: "Yemek",
            value: "yemek",
        }, {
            name: "Diğer",
            value: "diğer",
        }],
    },
],
    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.deleteReply({})
        await interaction.deferReply().catch(() => {})
        const Market = await mdb.findOne({ guild: interaction.guild.id })
        const ekle = interaction.options.getString("ekle")
        const sil = interaction.options.getString("sil")
        const fiyat = interaction.options.getNumber("fiyat")
        const açıklama = interaction.options.getString("açıklama")
        const type = interaction.options.getString("tür")
        if(ekle) {
            if(sil) return interaction.followUp({ content: `<:cross:1012832198342225960> Hem ekleyip hem silemezsin` })
            if(!fiyat) return interaction.followUp({ content: `<:cross:1012832198342225960> Fiyat gir` })
            if(!açıklama) return interaction.followUp({ content: `<:cross:1012832198342225960> Açıklama gir` })
            if(isNaN(fiyat)) return interaction.followUp({ content: `<:cross:1012832198342225960> Fiyat sayı/rakam değil.` })
            if(!Market) {
                new mdb({
                    guild: interaction.guild.id,
                    item: [{
                        name: ekle,
                        price: fiyat,
                        more: açıklama,
                        type: type,
                    }]
                }).save()
                return interaction.followUp({ content: `<:tik:1012832157410005054> Marketten başarıyla **${ekle}** adlı eşyayı ekledim.` })
            } else {
                if(Market.item.find(item => item.name == ekle)) return interaction.followUp({ content: `<:cross:1012832198342225960> Bu eşya zaten var.` })
                await mdb.findOne({ guild: interaction.guild.id }, async(err,data) => {
                    if(err) return console.log(err)
                    data.item.push({
                        name: ekle,
                        price: fiyat,
                        more: açıklama,
                        type: type
                    })
                    await data.save()
                    return interaction.followUp({ content: `<:tik:1012832157410005054> Marketten başarıyla **${ekle}** adlı eşyayı ekledim.` })
                })
            }
        } else if(sil) {
            if(ekle) return interaction.followUp({ content: `<:cross:1012832198342225960> Hem silip hem ekleyemezsin` })
            if(fiyat) return interaction.followUp({ content: `<:cross:1012832198342225960> Silinecek eşyanın fiyatını mı giriyorsun?` })
            if(açıklama) return interaction.followUp({ content: `<:cross:1012832198342225960> Silinecek eşyanın açıklamasını girmene gerek yok.` })
            if(!Market) return interaction.followUp({ content: `<:cross:1012832198342225960> Markette bir şey yok.` })
            if(!Market.item.find(item => item.name.toLowerCase() == sil.toLowerCase())) return interaction.followUp({ content: `<:cross:1012832198342225960> Markette böyle bir şey yok.` })
            await mdb.findOne({ guild: interaction.guild.id }, async(err,data) => {
                if(err) return console.log(err)
                if(!data) return interaction.deleteReply({})
                data.item.splice(data.item.findIndex(item => item.name == sil.toLowerCase()), 1)
                await data.save()
                return interaction.followUp({ content: `<:tik:1012832157410005054> Marketten **${sil}** adlı eşyayı kaldırdım.` })
            })
        }
    },
};
