const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "help",
    description: "Bot komutları.",
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        const slashcommands = client.slashCommands
        interaction.followUp({ content: `**Slash komutları**\n${slashcommands.map(item => item.name + " **-** " + item.description).join("\n")}` })
    },
};
