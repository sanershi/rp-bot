const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "emojiekle",
    description: "Sunucuya yeni bir emoji ekler.",
    options: [{ 
        name: 'emoji_ismi',
        type: 'STRING',
        description: 'Emoji ismini belirtir.',
        required: true
    }, {
        name: 'emoji_url',
        type: 'STRING',
        description: 'Emoji resmi adresini belirtir.',
        required: true
    }],
    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.deleteReply({})
        await interaction.deferReply().catch(() => {})
        const emoji_ismi = interaction.options.getString("emoji_ismi")
        const emoji_url = interaction.options.getString("emoji_url")
        interaction.guild.emojis.create(`${emoji_url}`, `${emoji_ismi}`).then(emoji => interaction.followUp({ content: `\`${emoji_ismi}\` adlı emojiyi sunucuya ekledim.` })).catch(console.error);
    },
};
