const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "avatar",
    description: "Belirtilen kullanıcının avatarını gösterir.",
    options: [{
        name: 'kullanıcı',
        type: 'USER',
        description: 'Avatarı gösterilecek kullanıcıyı belirtir.',
    }],
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        const user = interaction.options.getUser("kullanıcı") || interaction.user
        const embed = new MessageEmbed()
        interaction.followUp({embeds: [embed.setColor("#2F3136").setDescription(`[Resim Adresi](${user.avatarURL({dynamic: true, size: 4096})})`).setImage(user.avatarURL({dynamic: true, size: 4096}))]})
    },
};
