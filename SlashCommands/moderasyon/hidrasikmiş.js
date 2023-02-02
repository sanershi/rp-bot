const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "hidrasikmiş",
    description: "Hidrra siker aga.",
    ownerOnly: true,
    options: [{
        name: "kullanıcı",
        description: "Kullanici.",
        type: "USER",
        required: true
    }],
    run: async (client, interaction, args) => {
        //if (interaction.user.id !== "424613800843673601") return interaction.deleteReply({})
        // await interaction.deferReply().catch(() => {})
        // const user = interaction.options.getUser("kullanıcı")
        // if(user.id === interaction.user.id) return interaction.deleteReply({})
        // if(user.id === client.user.id) return interaction.deleteReply({})
        // const embed = new MessageEmbed()
        // .setImage("https://i.hizliresim.com/al7ii8y.gif")
        // .setColor("RANDOM")
        // interaction.followUp({embeds: [embed]})

        
    },
};
