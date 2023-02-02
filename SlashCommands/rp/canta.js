const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const cdb = require("../../models/env")
module.exports = {
    name: "çanta",
    description: "Üzerinizde bulunan eşyaları gösterir.",
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        const Envanter = await cdb.findOne({ user: interaction.user.id, guild: interaction.guild.id }, async(err, data) => {
        if(!data) {
            new cdb({
                user: interaction.user.id,
                guild: interaction.guild.id,
                coin: 0,
                item: [],
            }).save()
            return interaction.followUp({ content: `<:cross:1012832198342225960> Çantanda hiç bir şey bulunmadı` })
        }
        if(err) return
        let list = [...data.env].map(function(item) { return `**${item.name}** - ${item.amount}` }).join("\n")
        let page = 1;

        const nextbtn = new MessageButton()
        .setCustomId('next')
        .setLabel("➡️")
        .setStyle('PRIMARY')

        const backbtn = new MessageButton()
        .setCustomId('back')
        .setLabel("⬅️")
        .setStyle('PRIMARY')

        const row = new MessageActionRow()
        .addComponents(backbtn, nextbtn);

        const embed = new MessageEmbed()
        .setAuthor({name: interaction.user.username + " İşte çantanda bulunanlar", iconURL: interaction.user.avatarURL({ dynamic: true })})
        .setDescription(`<:coin:1012820187365515304> Çantanda **${data.coin || 0}** kron çıktı.\n\n${list}`)
        .setColor("RANDOM")
        
        if(list.length <= 220) {
            await interaction.followUp({ embeds: [embed]});
             return
         } else if(list.length > 220) {
             let msg = await interaction.followUp({ embeds: [embed], components: [ row ]});

         const filter = i => i.user.id === interaction.member.id;
         const collector = interaction.channel.createMessageComponentCollector({ filter });

 
         collector.on('collect', async b => {
             if(b.isButton()) {
                 if(b.customId === "next") {
                     if (list.slice((page + 1) * 5 - 5, (page + 1) * 5).length <= 0) return;
                     page += 1;
                     let liste = list.slice(page == 1 ? 0 : page * 5 - 5, page * 5).join("\n─────────────────\n");
                     msg.edit({ embeds: [embed.setDescription(liste)] });
                     await b.deferUpdate()
                 } else if(b.customId === "back") {
                     if (list.slice((page - 1) * 5 - 5, (page - 1) * 5).length <= 0) return;
                     page -= 1;
                     let liste = list.slice(page == 1 ? 0 : page * 5 - 5, page * 5).join("\n─────────────────\n");
                     msg.edit({ embeds: [embed.setDescription(liste)] });
                     await b.deferUpdate()
                 }
             }
         })
         }
        })
        
    },
};
