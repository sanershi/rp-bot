const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "kilit",
    description: "Yazılan kanalı kilitler.",
    run: async (client, interaction, args) => {
        if (!interaction.member.hasPermission("ADMINISTRATOR")) return interaction.deleteReply({})
        await interaction.deferReply().catch(() => {})
        if(interaction.channel.permissionsFor(interaction.guild.id).has("SEND_MESSAGES")) {
            interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: false });
            interaction.followUp({ content: "Kanal kilitlendi." }).then((m) => setTimeout(() => m.delete(), 5000));
        } else {
            interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: null });
            interaction.followUp({ content: "Kanal kilidi açıldı." }).then((m) => setTimeout(() => m.delete(), 5000));
        }
    },
};
