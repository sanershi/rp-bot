const { MessageEmbed } = require("discord.js");
const cdb = require("../../models/env")
const mdb = require("../../models/market")
const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {
    name: "citrine",
    description: ".",
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        interaction.followUp({ content: `**<:Citrine:1012820582754156606>  •  ${randomInteger(1, 50)}**` })
    },
};
