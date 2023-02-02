const { MessageEmbed } = require("discord.js");
const cdb = require("../../models/env")
const mdb = require("../../models/market")
module.exports = {
    name: "eval",
    description: "eval",
    botPermissions: ["ADMINISTRATOR"],
    ownerOnly: true,
    options: [{
        name: "kod",
        description: "Kod.",
        type: "STRING",
        required: true
    }],
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        const code = interaction.options.getString("kod")
        const embed = new MessageEmbed(); 
        if(!code) return interaction.deleteReply()
        try {
            let evaled = await eval(code)
            if (evaled.length > 800) {
                evaled = evaled.substring(0, 800) + `...`;
            }
            return interaction.followUp({content: `\`\`\`js\n${evaled}\n\`\`\``});
        } catch (e) {
            console.log(e.stack);
            return interaction.followUp({content: `\`\`\`js\n${e}\n\`\`\``});
        }
    },
};
