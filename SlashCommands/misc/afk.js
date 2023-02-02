let afk = require("../../models/afk.js")

module.exports = {
    name: "afk",
    description: "Afk durumuna geçmenizi sağlar.",
    options: [{
        name: 'sebep',
        type: 'STRING',
        description: 'Afk olma sebebini belirtir.',
    }],
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        const afkData = await afk.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        if(afkData && afkData.type) return interaction.deleteReply()
        const reason = interaction.options.getString("sebep") || "Sebep belirtilmedi!";
        if(interaction.member.displayName.includes("[AFK]")) return
        if(reason === "null" || reason === "undefined") return
        let regex = /h?t?t?p?s?:?\/?\/?discord.?gg\/?[a-zA-Z0-9]+/
        let regexSecond = /h?t?t?p?s?:?\/?\/?discorda?p?p?.?com\/?invites\/?[a-zA-Z0-9]+/
        if (regex.test(reason) == true || regexSecond.test(reason) == true) return
        if (reason.includes("@here") || reason.includes("@everyone")) return
        if(interaction.member.manageable) await interaction.member.setNickname("[AFK] " + interaction.member.displayName)
        await interaction.followUp({ content: `Başarıyla AFK moduna geçtin ve sebebini şu şekilde ayarladım. **${reason}**`, ephemeral: true })
        afk({
            user: interaction.user.id,
            guild: interaction.guild.id,
            type: true,
            sebep: reason,
            time: Date.now()
        }).save();
    },
};
