const { MessageEmbed } = require("discord.js");
const cdb = require("../../models/env")
const mdb = require("../../models/market")
const sdb = require("../../models/su")
const xdb = require("../../models/xp")
const adb = require("../../models/açlık");
const xmdb = require("../../models/msgxp");
const { InteractionResponseTypes } = require("discord-modals");
const {Irk} = require("../../config.js");
const {Sınıf} = require("../../config.js");
module.exports = {
    name: "durum",
    description: "Mevcut durumunuzu gösterir.",
    options: [{
            name: "kullanıcı",
            description: "Kullanıcıyı gir.",
            type: "USER",
    }] ,
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        const user = interaction.options.getUser("kullanıcı") || interaction.user
        let userWATER = await sdb.findOne({ user: user.id, guild: interaction.guild.id })
        let Envanter = await cdb.findOne({ user: user.id, guild: interaction.guild.id })
        let userXP = await xdb.findOne({ user: user.id, guild: interaction.guild.id })
        let userHUNGRY = await adb.findOne({ user: user.id, guild: interaction.guild.id })
        let userMessageLevel = await xmdb.findOne({ user: user.id, guild: interaction.guild.id })
        let levelXP = [{ xp: 0, level: 0 }, { xp: 20, level: 1 }, { xp: 40, level: 2 }, { xp: 60, level: 3 }, { xp: 80, level: 3 }, { xp: 100, level: 4 }, { xp: 120 , level: 5}]
        let nextXP = userXP ? levelXP.find(o => o.xp >= userXP.xp).xp : 0

        let levelXPm = [{ xp: 0, level: 0 }, { xp: 20, level: 1 }, { xp: 40, level: 2 }, { xp: 60, level: 3 }, { xp: 80, level: 3 }, { xp: 100, level: 4 }, { xp: 120 , level: 5}]
        let nextXPm = userMessageLevel ? userMessageLevel.level >= 5 ? "120 (SON)" : levelXPm.find(o => o.xp >= userMessageLevel.xp)?.xp : 0 || "Bulunamadı"

       // let nextLevel = levelXP.find(o => o.xp >= userXP.xp).level
        // let role = interaction.member.roles.cache.find(r => r.name.toLowerCase() === "insan") ? interaction.member.roles.cache.find(r => r.name.toLowerCase() === "insan").name : interaction.member.roles.cache.find(r => r.name.toLowerCase() === "maymun") ? interaction.member.roles.cache.find(r => r.name.toLowerCase() === "maymun").name : interaction.member.roles.cache.find(r => r.name.toLowerCase() === "dinazor") ? interaction.member.roles.cache.find(r => r.name.toLowerCase() === "dinazor").name : "Yok"
        let irk = interaction.member.roles.cache.find(r => r.id === Irk[0].rol) ? Irk[0].name : interaction.member.roles.cache.find(r => r.id === Irk[1].rol) ? Irk[1].name : interaction.member.roles.cache.find(r => r.id === Irk[2].rol) ? Irk[2].name : "Yok"
        let sinif = interaction.member.roles.cache.find(r => r.id === Sınıf[0].rol) ? Sınıf[0].name : interaction.member.roles.cache.find(r => r.id === Sınıf[1].rol) ? Sınıf[1].name : interaction.member.roles.cache.find(r => r.id === Sınıf[2].rol) ? Sınıf[2].name : interaction.member.roles.cache.find(r => r.id === Sınıf[3].rol) ? Sınıf[3].name : interaction.member.roles.cache.find(r => r.id === Sınıf[4].rol) ? Sınıf[4].name : "Yok"
        const embed = new MessageEmbed()
        .setAuthor({name: user.username.charAt(0).replace("i", "İ").toLocaleUpperCase() + user.username.slice(1).toLocaleLowerCase() + " istatisik", iconURL: user.avatarURL({ dynamic: true })})
        // .setDescription(`**Susuzluk bilgileri (\`${userWATER ? userWATER.susadim : 10}/10\`):**\n💧  ${progressBar(userWATER ? userWATER.susadim : 10, 10, 10)}\n\n**Açlık bilgisileri (\`${userHUNGRY ? userHUNGRY.aciktim : 10}/10\`):**\n🍖 ${progressBar(userHUNGRY ? userHUNGRY.aciktim : 10, 10, 10)}\n\n**Balıkçılık seviye bilgileri (\`${userXP ? userXP.level : 0}\`):**\n🐟 ${progressBar(userXP ? userXP.level : 0, 10, 10)}\n\`Sonraki levele ${userXP ? nextXP - 10 : 20} xp kaldı.\``)
        .setThumbnail(user.avatarURL({ dynamic: true }))
        .setDescription(`:signal_strength:\`Seviye:\` **${userMessageLevel ? userMessageLevel.level : 0}** (\`${userMessageLevel ? userMessageLevel.xp : 0}\`/\`${userMessageLevel ? nextXPm + 20 : 20 || "120 (SON)"}\`) <:x:1013188886744285315>\n<:bos:1013189972863488102><:bos:1013189972863488102><:bos:1013189972863488102><:bos:1013189972863488102>${progressBar(userMessageLevel ? userMessageLevel.level : 0, 10, 8)}\n<:para:1013417035486740490>\`Kron  :\` **${Envanter ? Envanter.coin : 0}**\n:busts_in_silhouette:\`Sınıf :\` ${sinif}\n:bust_in_silhouette:\`Irk   :\` ${irk}\n:pencil2:\`Msg   :\` **${userMessageLevel ? userMessageLevel.xp : 0}**\n\n━━━━━━\`Stats\`━━━━━━\n🐟 ${progressBar(userXP ? userXP.level : 0, 10, 10)} (\`${userXP ? nextXP : 0}\`/\`${userXP ? nextXP + 20 : 20}\`) **${userXP ? userXP.level : 0}**\n🍖 ${progressBar(userHUNGRY ? userHUNGRY.acıktım : 10, 10, 10)} (\`${userHUNGRY ? userHUNGRY.acıktım : 10}\`/\`10\`)\n💧  ${progressBar(userWATER ? userWATER.susadim : 10, 10, 10)} (\`${userWATER ? userWATER.susadim : 10}\`/\`10\`)\n━━━━━━━━━━━━━━━`)
        .setColor("BLURPLE")
        interaction.followUp({embeds: [embed]})
    },
};
