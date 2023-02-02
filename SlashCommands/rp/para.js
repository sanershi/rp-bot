const { MessageEmbed } = require("discord.js");
const cdb = require("../../models/env")
module.exports = {
    name: "para",
    description: "Birine para gönderirsin veya kendi parana bakarsın hatta birine para ekleyip silebilirsin.",
    options: [{
        name: "gönder",
        description: "Gönderilecek para miktarı girin.",
        type: "NUMBER",
    },{
        name: "ekle",
        description: "Eklenecek para miktarını girin.",
        type: "NUMBER",
    },{
        name: "sil",
        description: "Silenecek para miktarını girin.",
        type: "NUMBER",
    },{
        name: "kullanıcı",
        description: "Kullanıcıyı gir.",
        type: "USER",
    },{
        name: "rol",
        description: "Rol gir.",
        type: "ROLE",
    }],
    run: async (client, interaction, args) => {
        await interaction.deferReply().catch(() => {})
        const gönder = interaction.options.getNumber("gönder")
        const ekle = interaction.options.getNumber("ekle")
        const sil = interaction.options.getNumber("sil")
        const user = interaction.options.getUser("kullanıcı")
        const rol = interaction.options.getRole("rol")
        var authorDb = await cdb.findOne({ user: interaction.user.id, guild: interaction.guild.id })

        if(gönder) {
            // if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.deleteReply({})
            if(ekle) return interaction.followUp({ content: "<:cross:1012832198342225960> Gönderirken ekleyemezsin." })
            if(!user) return interaction.followUp({ content: "<:cross:1012832198342225960> Lütfen bir kullanıcı gir gir." })
            var userDb = await cdb.findOne({ user: user.id, guild: interaction.guild.id })
            var authorDb = await cdb.findOne({ user: interaction.user.id, guild: interaction.guild.id })
            if(!authorDb) return interaction.followUp({ content: "<:cross:1012832198342225960> Hiç paran yok." })
            if(gönder > authorDb.coin) return interaction.followUp({ content: `<:cross:1012832198342225960> Göndermek istediğin para miktarı kadar paran yok! *${authorDb.coin}*` })
            authorDb.coin -= gönder
            await authorDb.save()
            if(!userDb) {
                new cdb({
                    user: user.id,
                    guild: interaction.guild.id,
                    coin: gönder,
                }).save()
            } else {
                userDb.coin += gönder
                await userDb.save()
            }
            return interaction.followUp({ content: `<:tik:1012832157410005054> Başarıyla **${gönder}** para gönderdin.` })
        } else if(ekle) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.deleteReply({})
            if(user) {
                if(gönder) return interaction.deleteReply({})
                    var userDb = await cdb.findOne({ user: user.id, guild: interaction.guild.id })
                if(!userDb) {
                    new cdb({
                        user: user.id,
                        guild: interaction.guild.id,
                        coin: ekle
                    }).save()
                } else {
                    userDb.coin += ekle
                    await userDb.save()
                }
                return interaction.followUp({ content: `<:tik:1012832157410005054> Başarıyla **${user.username}** kullanıcısına **${ekle}** kron para ekledin.` })
            } else if(rol) {
                if(gönder) return interaction.deleteReply({})
                let role = await interaction.guild.members.cache.filter(x => x.roles.cache.has(rol.id))
                role.forEach(async(member) => {
                    if(member.user.bot) return
                    var userDb = await cdb.findOne({ guild: interaction.guild.id, user: member.id })
                    if(!userDb) {
                        new cdb({
                            user: member.id,
                            guild: interaction.guild.id,
                            coin: ekle
                        }).save()
                    } else {
                        userDb.coin += ekle
                        await userDb.save()
                    }
                });
                return interaction.followUp({ content: `<:tik:1012832157410005054> Başarıyla **${rol.name}** rolüne sahip kullanıcılara **${ekle}** kron para ekledin. (**\`Toplamda ${role.size} kişiye verildi\`**)` })
            }
        } else if(sil) {
            if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.deleteReply({})
            if(!user) return interaction.followUp({ content: "<:cross:1012832198342225960> Lütfen bir kullanıcı gir gir." })
            if(gönder) return interaction.followUp({ content: "<:cross:1012832198342225960> Hem silerken hem gönderemezsin." })
            if(ekle) return interaction.followUp({ content: "<:cross:1012832198342225960> Hem silerken hem ekleyemezsin." })
            var userDb = await cdb.findOne({ user: user.id, guild: interaction.guild.id })
            if(userDb.coin < sil) return interaction.followUp({ content: `<:cross:1012832198342225960> Silmek istediğin para miktarı kadar para yok. *${userDb.coin}*` })
            if(!userDb) {
                new cdb({
                    user: user.id,
                    guild: interaction.guild.id,
                    coin: 0
                }).save()
            } else {
                userDb.coin -= sil
                await userDb.save()
            }
            return interaction.followUp({ content: `<:tik:1012832157410005054> Başarıyla **${user.username}** kullanıcısından **${sil}** kron para silindi.` })
        } else return interaction.followUp({ content: `Çantandan **${authorDb ? authorDb.coin : 0}** kron çıktı.` })
    },
};
