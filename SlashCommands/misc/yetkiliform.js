const { MessageEmbed } = require("discord.js");
const { Modal, TextInputComponent, showModal, SelectMenuComponent } = require('discord-modals')

module.exports = {
    name: "başvuru",
    description: "Yetkili başvurusunda bulunan formu gönderir.",
    run: async (client, interaction, args) => {
        const modal = new Modal()
        .setCustomId('yetkiliform')
        .setTitle('Lütfen formu düzgünce doldurun.')
        .addComponents(
          new TextInputComponent()
          .setCustomId('saat')
          .setLabel('Günde kaç saat aktif olabilirsin.')
          .setStyle('SHORT')
          .setMinLength(1)
          .setMaxLength(4000)
          .setPlaceholder('Buraya giriniz')
          .setRequired(true),
          new TextInputComponent()
          .setCustomId('önceden')
          .setLabel('Daha önce RP sunucularında yetkili oldun mu?')
          .setStyle('SHORT')
          .setMinLength(1)
          .setMaxLength(4000)
          .setPlaceholder('Buraya giriniz')
          .setRequired(true),
          new TextInputComponent()
          .setCustomId('geçmişyetkililik')
          .setLabel('Daha önce yetkili oldunuz mu?')
          .setStyle('SHORT')
          .setMinLength(1)
          .setMaxLength(4000)
          .setPlaceholder('Buraya giriniz')
          .setRequired(true),
          new TextInputComponent()
          .setCustomId('sunucusistemi')
          .setLabel('Sunucunun sistemine ne kadar hakimsin?')
          .setStyle('SHORT')
          .setMinLength(1)
          .setMaxLength(4000)
          .setPlaceholder('Buraya giriniz')
          .setRequired(true),
          
        );
        showModal(modal, { client, interaction });
    },
};
