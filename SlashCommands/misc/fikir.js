const { MessageEmbed } = require("discord.js");
const { Modal, TextInputComponent, showModal } = require('discord-modals')

module.exports = {
    name: "fikir",
    description: "Güzel bir fikrin varsa belirt!",
    run: async (client, interaction, args) => {
        const modal = new Modal()
        .setCustomId('fikir')
        .setTitle('Lütfen fikrinizi yazın.')
        .addComponents(
          new TextInputComponent()
          .setCustomId('fikri')
          .setLabel('Fikriniz.')
          .setStyle('LONG')
          .setMinLength(1)
          .setMaxLength(4000)
          .setPlaceholder('Buraya giriniz')
          .setRequired(true),
        );
        showModal(modal, { client, interaction });
    },
};
