const { MessageEmbed } = require("discord.js");
const cdb = require("../../models/env")
const mdb = require("../../models/market")
const gdb = require("../../models/guild")
module.exports = {
    name: "guild",
    description: "Sunucu ayarlarını yapılandırmanızı sağlar",
    options: [{
        name: "açlıkdurum",
        description: "Açlık durumunu açıp kapatmanızı sağlar (\"açık\"/\"kapalı\")",
        type: "STRING",
        required: true
    }, {
        name: "susuzlukdurum",
        description: "Susuzluk durumunu açıp kapatmanızı sağlar (\"açık\"/\"kapalı\")",
        type: "STRING",
        required: true
    }],
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        if (!interaction.member.permissions.has("ADMINISTRATOR") || interaction.user.id !== "1012359798253174926") return interaction.deleteReply({})
        const açlıkdurum = interaction.options.getString("açlıkdurum")?.toLowerCase()
        const susuzlukdurum = interaction.options.getString("susuzlukdurum")?.toLowerCase()
        let deger = ["açık", "kapalı"]
        const db = await gdb.findOne({ guild: interaction.guild.id })
        if(açlıkdurum && !deger.includes(açlıkdurum)) return interaction.followUp({ content: "Açlık durumu sadece \"açık\" veya \"kapalı\" olabilir." }).catch(() => {})
        if(susuzlukdurum && !deger.includes(susuzlukdurum)) return interaction.followUp({ content: "Susuzluk durumu sadece \"açık\" veya \"kapalı\" olabilir." }).catch(() => {})
            await gdb.findOne({ guild: interaction.guild.id }, async(err, data) => {
                if(!data) {
                    const newData = new gdb({
                        guild: interaction.guild.id,
                        açlıkdurum: açlıkdurum === "açık" ? true : false,
                        susuzlukdurum: susuzlukdurum === "açık" ? true : false,
                    })
                    newData.save().catch(() => {})
                    interaction.followUp({ content: "Sunucu ayarları başarıyla ayarlandı." }).catch(() => {})
                } else {
                    if(err) return
                    data.açlıkdurum = açlıkdurum === "açık" ? true : false
                    data.susuzlukdurum = susuzlukdurum === "açık" ? true : false
                    data.save()
                    interaction.followUp({ content: "Sunucu ayarları başarıyla güncellendi." }).catch(() => {})
                }
                
            })

        
    },
};
