const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "komutlar",
    description: "Botta kaç tane komut sayısı var gösterir.",
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        const slashcommands = client.slashCommands
        interaction.followUp({ content: `Botta **${slashcommands.size}** tane komut var.` })
    },
};
