const { Client, Collection } = require("discord.js");
const translate = require('@iamtraction/google-translate')
const kino = require("pretty-ms");

const client = new Client({ 
    intents: [
          1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384,
      ]
  }); 
require('discord-modals')(client)
module.exports = client;

client.slashCommands = new Collection();
client.config = require("./config.json");
client.roles = require("./roles.config.json");
require("./handler")(client);

client.login(client.config.token);

Array.prototype.random = function() {
    return this[Math.floor(Math.random() * (this.length - 1))]
};

client.translate = async(text) => {
    const lang = client.config.language ? client.config.language : 'tr'
    const translated = await translate(text, {from: 'en', to: lang});
    return translated.text;
}

const turkishDate = global.turkishDate = (date) => {
    if (!date || typeof date !== "number") return
    let convert = kino(date, { verbose: true })
      .replace("minutes", "Dakika")
      .replace("minute", "Dakika")
      .replace("hours", "Saat")
      .replace("hour", "Saat")
      .replace("seconds", "Saniye")
      .replace("second", "Saniye")
      .replace("days", "Gün")
      .replace("day", "Gün")
      .replace("years", "Yıl")
      .replace("year", "Yıl");
    return convert
  }

  const progressBar = global.progressBar = (value, maxValue, size) => {
    const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
    const emptyProgress = size - progress > 0 ? size - progress : 0;
    
    const progressText = "■".repeat(progress);
    const emptyProgressText = "□".repeat(emptyProgress);
    
    return emptyProgress > 0 ? `■${progressText}${emptyProgressText}□` : `■${progressText}${emptyProgressText}■`;
    };

    client.cross = "<:cross:1012832198342225960>"
    client.tic = "<:tik:1012832157410005054>"