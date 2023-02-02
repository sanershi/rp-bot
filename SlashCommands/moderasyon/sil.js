const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "sil",
    description: "Kanala belirtilen sayı kadar mesaj siler.",
    options: [{
        name: 'silinicek_mesaj_sayısı',
        type: 'NUMBER',
        description: 'Kanalda silinecek mesaj sayısı.',
        required: true
    }],
    run: async (client, interaction, args) => {
        if (!interaction.member.hasPermission("ADMINISTRATOR")) return interaction.deleteReply({})
        await interaction.deferReply().catch(() => {})
        const nmb = interaction.options.getNumber("silinicek_mesaj_sayısı") || 2
        if(nmb > 100 || nmb < 2) return interaction.followUp({content: "100 adetden fazla 2 adetten az mesaj silemezsin."}).catch(() => {})
        interaction.channel.bulkDelete(nmb).catch(() => {})
    },
};
