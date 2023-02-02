const { MessageEmbed, Message } = require("discord.js");
const moment = require("moment")
module.exports = {
    name: "sunucubilgi",
    description: "Bulunduğunuz sunucunun bilgisini gösterir.",
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        const embed = new MessageEmbed()
        // .addFields({ name: 'Sunucu adı', value: interaction.guild.name, inline: true })
        // .addFields({ name: 'Sunucu ID', value: interaction.guild.id, inline: true })
        // .addFields({ name: 'Sunucu kuruluş tarihi', value: `<t:${moment(interaction.guild.createdAt).unix()}:R>`, inline: true })
        .addFields({ name: "__**Sunucu bilgileri**__", value: `\`Sunucu:\` ${interaction.guild.name}\n\`Sunucu id:\` ${interaction.guild.id}\n\`Kuruluş:\`<t:${moment(interaction.guild.createdAt).unix()}:R>\n\`Üye sayısı:\` **${interaction.guild.memberCount}** (\`${interaction.guild.members.cache.filter(member => !member.user.bot).size}\`)\n\`Bot sayısı:\` **${interaction.guild.members.cache.filter(m => m.user.bot).size}**`, inline: true })
        .addFields({ name: "__**Kanal bilgileri**__", value: `\`Kanal sayısı:\` **${interaction.guild.channels.cache.size}**\n\`Yazı kanal sayısı:\` **${interaction.guild.channels.cache.filter(c => c.type === "GUILD_TEXT").size}**\n\`Sesli kanal sayısı:\` **${interaction.guild.channels.cache.filter(c => c.type === "GUILD_VOICE").size}**\n\`Kategori sayısı:\` **${interaction.guild.channels.cache.filter(c => c.type === "GUILD_CATEGORY").size}**`, inline: false })
        .addFields({ name: "__**Rol bilgileri**__", value: `\`Rol sayısı:\` **${interaction.guild.roles.cache.size}**`, inline: false })
        .setColor("BLURPLE")
        interaction.followUp({ embeds: [embed] })
    },
};
