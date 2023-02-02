const { MessageEmbed } = require("discord.js");
const cdb = require("../../models/env")
module.exports = {
    name: "harita",
    description: "Haritayı gösterir.",
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        const embed = new MessageEmbed()
        .setImage("https://media.discordapp.net/attachments/841272425903030292/1026931568587059200/GGG.PNG?width=944&height=676")
        .setColor("RANDOM")
        interaction.followUp({embeds: [embed]})        
    },
};
