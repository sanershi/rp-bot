const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "emojiler",
    description: "Sunucuda bulunan bütün emojileri gösterir.",
    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.deleteReply({})
        await interaction.deferReply().catch(() => {})
        const emojiler = interaction.guild.emojis.cache.map(e => e.toString()).join(" ")
        if(!emojiler) return interaction.followUp({content: "Bu sunucuda hiç emoji yok."}).catch(() => {})
        interaction.followUp({ content: interaction.guild.emojis.cache.map(e => e.toString()).join(" ") })

    },
};
