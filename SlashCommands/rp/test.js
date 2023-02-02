const { MessageEmbed } = require("discord.js");
const cdb = require("../../models/env")
const mdb = require("../../models/market")
module.exports = {
    name: "test",
    description: "test",
    ownerOnly: true,
    options: [{
        name: "eşya-adı",
        description: "Silinecek eşya adı.",
        type: "STRING",
    }],
    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.deleteReply({})
        await interaction.deferReply().catch(() => {})
        const eşya = interaction.options.getString("eşya-adı")
        const Envanter = await cdb.findOne({ user: interaction.user.id, guild: interaction.guild.id }, async(err, data) => {
            if(!data) return interaction.deleteReply({})
            if(err) return

            })
    },
};
