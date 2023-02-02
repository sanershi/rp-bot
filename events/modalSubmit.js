const client = require("../index");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const moment = require("moment")
moment.locale("tr")
const cdb = require("../models/env")
const mdb = require("../models/market")

client.on("modalSubmit", async (modal) => {
    await modal.deferReply({ ephemeral: true })
    const fikri = modal.getTextInputValue("fikri")
    const efikri = modal.getTextInputValue("efikri")
    const saat = modal.getTextInputValue("saat")
    const önceden = modal.getTextInputValue("önceden")
    const geçmişyetkililik = modal.getTextInputValue("geçmişyetkililik")
    const sunucusistemi = modal.getTextInputValue("sunucusistemi")
    if(modal.customId === 'fikir') {
        const embed = new MessageEmbed()
        .setColor("BLURPLE")
        .setAuthor({ name: modal.user.tag, iconURL: modal.user.avatarURL({ dynamic: true }) })
        .setDescription(`**${modal.user.tag}** üyesi <t:${moment(Date.now()).unix()}> tarihinde bir fikrini belirtti.\n\n:white_medium_small_square: ${fikri}`)
        client.channels.cache.get("1018954764270190643").send({
            embeds: [embed]
        }).catch((error) => {
            client.channels.cache.get("1018954764270190643").send({
                content: `**${modal.user.tag}** üyesi <t:${moment(Date.now()).unix()}> tarihinde bir fikrini belirtti.`,
                files: [{
                    attachment: Buffer.from(`${fikri}`),
                    name: `${modal.user.id}_fikir.txt`
                }],
            })
        })
        modal.followUp({ content: "Fikiriniz yetkili ekibimize iletildi." })
    }
    if(modal.customId === 'efikir') {
        const embed = new MessageEmbed()
        .setColor("BLURPLE")
        .setAuthor({ name: modal.user.tag, iconURL: modal.user.avatarURL({ dynamic: true }) })
        .setDescription(`**${modal.user.tag}** üyesi <t:${moment(Date.now()).unix()}> tarihinde bir event fikrini belirtti.\n\n:white_medium_small_square: ${efikri}`)
        client.channels.cache.get("1018954645781102633").send({
            embeds: [embed]
        }).catch(kino => {
            client.channels.cache.get("1018954645781102633").send({
                content: `**${modal.user.tag}** üyesi <t:${moment(Date.now()).unix()}> tarihinde bir event fikrini belirtti.`,
                files: [{
                    attachment: Buffer.from(`${efikri}`),
                    name: `${modal.user.id}_event-fikir.txt`
                }],
            })
        })
        modal.followUp({ content: "Fikiriniz yetkili ekibimize iletildi." })
    }
    if(modal.customId === 'yetkiliform') {
        const embed = new MessageEmbed()
        .setColor("BLURPLE")
        .setAuthor({ name: modal.user.tag, iconURL: modal.user.avatarURL({ dynamic: true }) })
        .setDescription(`${modal.user} üyesi <t:${moment(Date.now()).unix()}> tarihinde yetkili başvurusuna katıldı işte cevapları.\n\n**Günde kaç saat aktif olabilirsin.**\n:white_medium_small_square: ${saat}\n**Daha önce RP sunucularında yetkili oldun mu?**\n:white_medium_small_square: ${önceden}\n**Daha önce yetkili oldunuz mu?**\n:white_medium_small_square: ${geçmişyetkililik}\n**Sunucunun sistemine ne kadar hakimsin?**\n:white_medium_small_square: ${sunucusistemi}`)
        client.channels.cache.get("1018954804166406144").send({
            embeds: [embed]
        }).catch(kino => {
            client.channels.cache.get("1018954804166406144").send({
                content: `${modal.user} üyesi <t:${moment(Date.now()).unix()}> tarihinde yetkili başvurusuna katıldı işte cevapları.`,
                files: [{
                    attachment: Buffer.from(`Günde kaç saat aktif olabilirsin.\n${saat}\n\nDaha önce RP sunucularında yetkili oldun mu?\n${önceden}\n\nDaha önce yetkili oldunuz mu?\n${geçmişyetkililik}\n\nSunucunun sistemine ne kadar hakimsin?\n${sunucusistemi}`),
                    name: `${modal.user.id}_event-fikir.txt`
                }],
            })
        })
        modal.followUp({ content: "Başvurunuz iletildi." })
    } 
    if(modal.customId === "adminmenu") {
        let target = modal.getTextInputValue("id")
        let user = client.users.cache.get(target)
        let member = modal.guild.members.cache.get(target)
        // const ban = new MessageButton()
        //     .setCustomId(`${user.id}-ban`)
        //     .setLabel('Ban')
        //     .setStyle('SUCCESS')
        const para = new MessageButton()
            .setCustomId(`${user.id}-para`)
            .setLabel('Para Menü')
            .setStyle('SUCCESS')

        const row3 = new MessageActionRow()
        .addComponents(para)

        const embed = new MessageEmbed()
        .setColor("#2F3136")
        .setAuthor({ name: user.tag, iconURL: user.avatarURL({ dynamic: true }) })
        .setDescription(`${user} - (\`${user.id} - ${user.tag}\`) kullanıcısı için admin menüsü açıldı. Aşağıda bulunan buttonları kullanarak işlem yapabilirsin.`)
        .setFooter({ text: `Bir sorun çıkarsa lütfen ${client.users.cache.get("1012359798253174926").tag} bildirin.` })
        modal.followUp({ embeds: [embed], components: [row3] })
    } else if(modal.customId === "paraekle") {
        let user = client.users.cache.get(client.id.replace("-p-ekle", ""))
        let miktar = modal.getTextInputValue("miktar")
        var userDb = await cdb.findOne({ user: user.id, guild: modal.guild.id })
        if(!userDb) {
            new cdb({ user: user.id, guild: modal.guild.id, coin: parseInt(miktar) }).save()
        } else {
            userDb.coin += parseInt(miktar)
            await userDb.save()
        }
        return modal.followUp({ content: `<:tik:1012832157410005054> **${user}** kullanıcıya **${miktar}** para eklendi.` })
    } else if(modal.customId === "parasil") {
        let user = client.users.cache.get(client.silid.replace("-p-sil", ""))
        let miktar = modal.getTextInputValue("miktar")
        var userDb = await cdb.findOne({ user: user.id, guild: modal.guild.id })
        if(userDb.coin < miktar || !userDb) return modal.followUp({ content: "<:cross:1012832198342225960> Kullanıcının o kadar parası yok." })
        userDb.coin -= parseInt(miktar)
        await userDb.save()
        return modal.followUp({ content: `<:tik:1012832157410005054> **${user}** kullanıcıya **${miktar}** para silindi.` })
    }
    })