const { MessageEmbed } = require("discord.js");
const cdb = require("../../models/env")
const mdb = require("../../models/market")
const { Modal, TextInputComponent, showModal, SelectMenuComponent } = require('discord-modals')
module.exports = {
    name: "adminmenü",
    description: "Adminler için admin menüsünü gösterir.",
    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.deleteReply({})
        const modal = new Modal()
        .setCustomId('adminmenu')
        .setTitle(`Gelişmiş admin menüsü`)
        .addComponents(
          new TextInputComponent()
          .setCustomId('id')
          .setLabel('İşlem yapacağınız kullanıcının IDsi')
          .setStyle('SHORT')
          .setMinLength(1)
          .setMaxLength(19)
          .setPlaceholder('Buraya giriniz')
          .setRequired(true),
        );
        showModal(modal, { client, interaction });
    },
};
