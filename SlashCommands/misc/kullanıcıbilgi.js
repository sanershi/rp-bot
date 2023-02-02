const { interactionEmbed, MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr")
module.exports = {
    name: "kullanıcıbilgi",
    description: "Belirtilen kullanıcının bilgilerini gösterir.",
    options: [{
        name: 'kullanıcı',
        type: 'USER',
        description: 'Avatarı gösterilecek kullanıcıyı belirtir.',
    }],
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        let user = interaction.options.getUser("kullanıcı") || interaction.user
        let member = interaction.guild.members.cache.get(user.id)
        if(user.bot) return interaction.followUp({content: `Kullanıcı bot olduğu için kullanıcı bilgileri gösterilemiyor.`}) 
        let nick;
        if (user.username !== member.displayName) nick = member.displayName
        const embed = new MessageEmbed().setColor("#2F3136").setAuthor({ name: user.tag.replace("`", ""), iconURL: user.avatarURL({dynamic: true, size: 2048}) }).setThumbnail(user.avatarURL({dynamic: true, size: 2048}))
        .addFields({ name: `__**Kullanıcı Bilgisi**__`, value: `\`Profil:\` ${user} - \`(${user.tag} - ${user.id})\`\n\`Oluşturulma Tarihi:\` <t:${moment(user.createdAt).unix()}>\n\n__**Sunucu Bilgisi**__\n\`Takma adı:\` ${nick ? nick : `${member.user.username} [Yok]`}\n\`Katılma Tarihi:\` <t:${moment(member.joinedAt).unix()}>\n\`Katılım Sırası:\` ${(interaction.guild.members.cache.filter(a => a.joinedTimestamp <= member.joinedTimestamp).size).toLocaleString()}/${(interaction.guild.memberCount).toLocaleString()}\n\`Kullanıcının bulunduğu kanal:\` ${member.voice.channel ? `<#${member.voice.channel.id}>` : "**Seste değil.**"}\n\`Rolleri:\` ${member.roles.cache.size <= 5 ? member.roles.cache.filter(x => x.name !== "@everyone").map(x => x).join(', ') : `Listelenemedi! (${member.roles.cache.size})` || "Yok"}` });
             interaction.followUp({ embeds: [embed] })
    },
};
