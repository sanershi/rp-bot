const { MessageEmbed } = require("discord.js");
const { Modal, TextInputComponent, showModal } = require('discord-modals')

module.exports = {
    name: "eventfikir",
    description: "Güzel bir event fikrin varsa belirt!",
    run: async (client, interaction, args) => {
        const modal = new Modal()
        .setCustomId('efikir')
        .setTitle('Lütfen event fikrinizi yazın.')
        .addComponents(
          new TextInputComponent()
          .setCustomId('efikri')
          .setLabel('Event fikriniz.')
          .setStyle('LONG')
          .setMinLength(1)
          .setMaxLength(4000)
          .setPlaceholder('Buraya giriniz')
          .setRequired(true),
        );
        showModal(modal, { client, interaction });
    },
};
