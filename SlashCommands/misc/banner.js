const { MessageEmbed, Client } = require("discord.js");
const client = require("../../index");
const axios = require("axios")
module.exports = {
    name: "banner",
    description: "Belirtilen kullanıcının bannerını gösterir.",
    options: [{
        name: 'kullanıcı',
        type: 'USER',
        description: 'Bannerı gösterilecek kullanıcıyı belirtir.',
    }],
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        const user = interaction.options.getUser("kullanıcı") || interaction.user
        axios.get(`https://discord.com/api/users/${user.id}`, {
        headers: {
          Authorization: `Bot ${client.token}`
        },
      }).then(async(res) => {
        
        const { banner, accent_color } = res.data;

        if (banner) {
          const extension = banner.startsWith("a_") ? ".gif" : ".png";
          const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=2048`;

          const embed = new MessageEmbed()
            .setDescription(`[Banner Adresi](${url})`)
            .setImage(url)
            .setColor(accent_color || "BLURPLE");
      
          await interaction.followUp({embeds: [embed]})
        } else {
        if (accent_color) {
          const embed = new MessageEmbed()
            .setTitle(`Kullanıcının bannerı bulunamadı onun yerine banner rengi bulundu.`)
            .setDescription(`${accent_color}`)
            .setColor(accent_color)

            await interaction.followUp({embeds: [embed]})
      } else {
      interaction.followUp({content: `**${user.tag}** Kullanıcının bannerı bulunamadı`})
      }
    }
  });
    },
};
