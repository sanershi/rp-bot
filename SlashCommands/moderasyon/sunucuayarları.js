const { MessageEmbed } = require("discord.js");
const gdb = require("../../models/guild")
module.exports = {
    name: "sunucuayarlari",
    description: "Sunucu ayarlarını gösterir.",
    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.deleteReply({})
        await interaction.deferReply({}).catch(() => {})
        await gdb.findOne({ guild: interaction.guild.id }, async(err, data) => {
            if(!data) return interaction.deleteReply({})
            if(err) return
            
            const embed = new MessageEmbed()
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setColor("BLURPLE")
            .setDescription(`Merhaba, sunucu ayarlarını aşağıda görebilirsiniz. Kalın ve \`şeklinde\` yazılmış olanlar değiştirilemezdir. *Ancak geliştirici ekibi tarafından değiştirilebilir.*`) 
            .addFields(
                { name: 'Açlık durumu.', value: `${data.açlıkdurum === true ? `${client.tic} Aktif` : `${client.cross} Kapalı`}` },
                { name: 'Susuzluk durumu.', value: `${data.susuzlukdurum === true ? `${client.tic} Aktif` : `${client.cross} Kapalı`}` },
                { name: 'Açlık ve susuzluk değerlerinin azalma süresi.', value: `**\`Her saat (Örn: 20:00, 21:00)\`**` },
                { name: 'Açlık ve susuzluk değerlerinin azalma değeri.', value: `**\`1\`**` },
            )
            interaction.followUp({ embeds: [embed], ephemeral: true })
        })
    },
};
