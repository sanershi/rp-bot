const client = require("../index");
const cdb = require("../models/env")
const mdb = require("../models/market")
const sdb = require("../models/su")
const adb = require("../models/açlık")
const gdb = require("../models/guild")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { Modal, TextInputComponent, showModal, SelectMenuComponent } = require('discord-modals')
const CronJob = require("cron").CronJob;

client.on("ready", async() => {
    console.log(`${client.user.tag}`);
    client.user.setActivity(`Krallıkları`, { type: "COMPETING" });
    client.user.setStatus("dnd");
    const sunucu = client.guilds.cache.get(client.config.sunucu);

    await gdb.findOne({ guild: sunucu.id }, async(err, data) => {
        if(data) {
            if(data.susuzlukdurum) {
                const eksion = new CronJob("0 */1 * * *", async() => {
                    client.users.cache.forEach(async (m) => {
                        if(m.bot) return
                        if(client.guilds.cache.get(client.config.sunucu).members.cache.get(m.id).roles.cache.has("1013497948417568809")) return
                        await sdb.findOne({ user: m.id, guild: client.config.sunucu }, async(err, data) => {
                            if(err) return
                            if(!data) {
                                new sdb({
                                    user: m.id,
                                    guild: client.config.sunucu,
                                    susadim: 9
                                }).save()
                                client.channels.cache.get("1018957360204615690").send(`${client.tic} **${m}** kullanıcının su değeri azaltıldı.`)
                            } else {
                            if(data.susadim <= 0) return
                            data.susadim -= 1
                            data.save()
                            client.channels.cache.get("1018957360204615690").send(`${client.tic} **${m}** kullanıcının su değeri azaltıldı.`)
                            }
                        })
                })
                  }, null, true, "Europe/Istanbul");
                  eksion.start();
            }
    
              if(data.açlıkdurum) {
                const eksiaciktim = new CronJob("0 */1 * * *", async() => {
                    client.users.cache.forEach(async (m) => {
                        if(m.bot) return
                        if(client.guilds.cache.get(client.config.sunucu).members.cache.get(m.id).roles.cache.has("1013497948417568809")) return
                        await adb.findOne({ user: m.id, guild: client.config.sunucu }, async(err, data) => {
                            if(err) return
                            if(!data) {
                                new adb({
                                    user: m.id,
                                    guild: client.config.sunucu,
                                    acıktım: 9
                                }).save()
                                client.channels.cache.get("1018957729668288634").send(`${client.tic} **${m}** kullanıcının açlık değeri azaltıldı.`)
                            } else {
                            if(data.acıktım <= 0) return
                            data.acıktım -= 1
                            data.save()
                            client.channels.cache.get("1018957729668288634").send(`${client.tic} **${m}** kullanıcının açlık değeri azaltıldı.`)
                            }
                        })
                })
                  }, null, true, "Europe/Istanbul");
                  eksiaciktim.start();
              }
        }
    })
      const saat00 = new CronJob("00 00 * * *", async() => {
        client.channels.cache.get("1012443810472669244").send("00:00")
      }, null, true, "Europe/Istanbul");
      saat00.start();

    client.on('interactionCreate', async(interaction) => {
        let user = client.users.cache.get(interaction.user.id)
        if(interaction.customId ? interaction.customId.includes("-ban") : false) {

        } else if(interaction.customId ? interaction.customId.includes("-para") : false) {
            let user = client.users.cache.get(interaction.customId.replace("-para", ""))
            const db = await cdb.findOne({ user: user.id, guild: interaction.guild.id })

            const paraekle = new MessageButton()
            .setCustomId(`${user.id}-p-ekle`)
            .setLabel('Para ekle')
            .setStyle('SUCCESS')
            const parasil = new MessageButton()
            .setCustomId(`${user.id}-p-sil`)
            .setLabel('Para sil')
            .setStyle('SUCCESS')
            const parakontrol = new MessageButton()
            .setCustomId(`${user.id}-p-kontrol`)
            .setLabel('Para kontrol')
            .setStyle('SUCCESS')

            const row3 = new MessageActionRow()
            .addComponents(parakontrol, paraekle, parasil)

            const embed = new MessageEmbed()
            .setColor("#2F3136")
            .setAuthor({ name: user.tag, iconURL: user.avatarURL({ dynamic: true }) })
            .setDescription(`${user} - (\`${user.tag} - ${user.id}\`) adlı kullanıcının **${db ? db.coin : 0}** parası var. Aşağıdaki bulunan buttonlarla para ekleyebilir, para çıkarabilir ve para kontrolü yapabilirsin.`)
            interaction.reply({ embeds: [embed], ephemeral: true, components: [row3] })
        } else if(interaction.customId ? interaction.customId.includes("-p-ekle") : false) {
            client.id = interaction.customId.replace("-p-ekle", "")
            const modal = new Modal()
            .setCustomId('paraekle')
            .setTitle(`Para ekleme menüsü`)
            .addComponents(
              new TextInputComponent()
              .setCustomId(`miktar`)
              .setLabel(`Para miktar`)
              .setStyle('SHORT')
              .setMinLength(1)
              .setMaxLength(4000)
              .setPlaceholder('Buraya giriniz')
              .setRequired(true),
            );
            showModal(modal, { client, interaction }); 
        } else if(interaction.customId ? interaction.customId.includes("-p-sil") : false) {
            client.silid = interaction.customId.replace("-p-sil", "")
            const modal = new Modal()
            .setCustomId('parasil')
            .setTitle(`Para silme menüsü`)
            .addComponents(
              new TextInputComponent()
              .setCustomId(`miktar`)
              .setLabel(`Silenecek para miktar`)
              .setStyle('SHORT')
              .setMinLength(1)
              .setMaxLength(4000)
              .setPlaceholder('Buraya giriniz')
              .setRequired(true),
            );
            showModal(modal, { client, interaction }); 
        } else if(interaction.customId ? interaction.customId.includes("-p-kontrol") : false) {
            client.kontrolid = interaction.customId.replace("-p-kontrol", "")
            const db = await cdb.findOne({ user: client.kontrolid.replace("-p-kontrol", ""), guild: interaction.guild.id })
            interaction.reply({ content: `<:tik:1012832157410005054> <@${client.kontrolid}> kullanıcının **${db ? db.coin : 0}** parası var.`, ephemeral: true })

        }
    })
});
