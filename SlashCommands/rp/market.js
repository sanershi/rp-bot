const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const mdb = require("../../models/market")
const cdb = require("../../models/env")
module.exports = {
    name: "market",
    description: "Marketi gösterir.",
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        let Envanter = await cdb.findOne({ user: interaction.user.id, guild: interaction.guild.id })
        const Market = await mdb.findOne({ guild: interaction.guild.id })
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

        if(!Market) return interaction.deleteReply({})
        let list = [...Market.item].map(item => `**${item.name}** - ${item.price} kron\n<:yok:1012822022243483738>${item.more}` )
        const embed = new MessageEmbed()
        .setAuthor({name: interaction.guild.name + " Market", iconURL: interaction.user.avatarURL({ dynamic: true })})
        .setDescription(`Unutma çantanda **${Envanter.coin || 0}** kron var.\n\n${list.join("\n─────────────────\n")}`)
        .setColor("RANDOM")

        if(list.length <= 6) {
            await interaction.followUp({ embeds: [embed]});
             return
         } else if(list.length > 6) {
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
    },
};
